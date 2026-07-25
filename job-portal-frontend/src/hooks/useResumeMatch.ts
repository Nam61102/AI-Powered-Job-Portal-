import { useState, useCallback } from "react";
import { resumeMatch } from "@/services/ai.service";
import { ResumeMatchResult } from "@/types/ai";
import toast from "react-hot-toast";

/**
 * Custom React Hook to manage AI Resume Match state, loading state,
 * error state, refetch capability, and toast error notifications.
 */
export const useResumeMatch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resumeMatchData, setResumeMatchData] = useState<ResumeMatchResult | null>(null);

  const fetchResumeMatch = useCallback(async (jobId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await resumeMatch(jobId);
      if (response.success && response.data) {
        setResumeMatchData(response.data);
        return response.data;
      } else {
        throw new Error("Invalid response data format.");
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || "An unexpected error occurred while analyzing your resume.";
      setError(errMsg);
      toast.error(errMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(async (jobId: number) => {
    return await fetchResumeMatch(jobId);
  }, [fetchResumeMatch]);

  const clearData = useCallback(() => {
    setResumeMatchData(null);
    setError(null);
  }, []);

  return {
    loading,
    error,
    resumeMatchData,
    resumeMatch: fetchResumeMatch,
    refetch,
    clearData,
  };
};
