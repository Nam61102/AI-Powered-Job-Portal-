import { useState, useEffect, useCallback } from "react";
import { Applicant } from "@/types/recruiter";
import { getApplicants, updateApplicationStatus as apiUpdateStatus } from "@/services/recruiter.service";
import toast from "react-hot-toast";

export const useApplicants = (jobId?: number) => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplicants = useCallback(async () => {
    if (!jobId) {
      setApplicants([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getApplicants(jobId);
      setApplicants(data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to fetch applicants");
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    fetchApplicants();
  }, [fetchApplicants]);

  const updateStatus = async (applicationId: number, status: string) => {
    try {
      await apiUpdateStatus(applicationId, status);
      setApplicants(prev =>
        prev.map(app =>
          app.id === applicationId ? { ...app, status } : app
        )
      );
      toast.success(`Applicant status updated to ${status}`);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Failed to update status";
      toast.error(msg);
      throw new Error(msg);
    }
  };

  return {
    applicants,
    loading,
    error,
    updateStatus,
    refetch: fetchApplicants,
  };
};
