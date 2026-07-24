import { useCallback, useEffect, useState } from "react";
import { getAnalytics } from "@/services/analytics.service";
import { AnalyticsResponse } from "@/types/analytics";

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getAnalytics();
      setAnalytics(data);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load analytics";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return {
    analytics,
    loading,
    error,
    refetch: fetchAnalytics,
  };
}
