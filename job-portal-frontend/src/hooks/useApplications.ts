import { useState, useEffect, useCallback } from "react";
import { getMyApplications } from "@/services/application.service";
import { Application } from "@/types/application";

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    setError(null);
    try {
      const data = await getMyApplications();
      setApplications(data);
    } catch (err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } }; message?: string };
      const errMsg = errorObj.response?.data?.message || errorObj.message || "Failed to load applications";
      setError(errMsg);
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Avoid calling setState synchronously during layout/render/effect loop
    const timer = setTimeout(() => {
      fetchApplications();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchApplications]);

  return {
    applications,
    loading,
    error,
    refetch: () => fetchApplications(true),
  };
}
