import { useState, useEffect, useCallback } from "react";
import { getJobById, applyJob } from "@/services/job.service";
import { getMyApplications } from "@/services/application.service";
import { Job } from "@/types/job";
import toast from "react-hot-toast";

export function useJob(id: number) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [applyLoading, setApplyLoading] = useState<boolean>(false);
  const [hasApplied, setHasApplied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJobDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Parallelize fetching job details and candidate applications
      const [jobData, applications] = await Promise.all([
        getJobById(id),
        getMyApplications(),
      ]);
      setJob(jobData);
      
      const applied = applications.some((app) => Number(app.jobId) === id);
      setHasApplied(applied);
    } catch (err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } }; message?: string };
      const errMsg = errorObj.response?.data?.message || errorObj.message || "Failed to load job details";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleApply = useCallback(async () => {
    if (hasApplied) return;
    setApplyLoading(true);
    try {
      await applyJob(id);
      setHasApplied(true);
      toast.success("Applied successfully! ✓");
    } catch (err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } }; message?: string };
      const errMsg = errorObj.response?.data?.message || errorObj.message || "Failed to apply for this job";
      // The Axios interceptor already fires toast.error for many status codes.
      // Show toast if not handled or to make it explicit.
    } finally {
      setApplyLoading(false);
    }
  }, [id, hasApplied]);

  useEffect(() => {
    fetchJobDetails();
  }, [fetchJobDetails]);

  return {
    job,
    loading,
    error,
    applyLoading,
    hasApplied,
    apply: handleApply,
    refetch: fetchJobDetails,
  };
}
