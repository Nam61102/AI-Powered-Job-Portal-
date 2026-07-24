import { useState, useCallback, useEffect } from "react";
import { Interview, ScheduleInterviewPayload, UpdateInterviewPayload } from "@/types/interview";
import { interviewService } from "@/services/interview.service";
import toast from "react-hot-toast";

type Role = "RECRUITER" | "CANDIDATE" | "NONE";

export const useInterviews = (role: Role = "NONE") => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInterviews = useCallback(async () => {
    if (role === "NONE") {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      let data: Interview[];
      if (role === "RECRUITER") {
        data = await interviewService.getRecruiterInterviews();
      } else {
        data = await interviewService.getCandidateInterviews();
      }
      setInterviews(Array.isArray(data) ? data : []);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Failed to fetch interviews";
      setError(msg);
      // Let's handle generic errors via toast based on status (400, 401, 403, 404, 500)
      if (err.response?.status) {
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  }, [role]);

  useEffect(() => {
    if (role !== "NONE") {
      fetchInterviews();
    }
  }, [fetchInterviews, role]);

  const scheduleInterview = async (payload: ScheduleInterviewPayload) => {
    try {
      const newInterview = await interviewService.scheduleInterview(payload);
      toast.success("Interview scheduled successfully!");
      return newInterview;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Failed to schedule interview";
      toast.error(msg);
      throw new Error(msg);
    }
  };

  const updateInterview = async (id: number, payload: UpdateInterviewPayload) => {
    try {
      const updated = await interviewService.updateInterview(id, payload);
      setInterviews((prev) => prev.map((inv) => (inv.id === id ? updated : inv)));
      toast.success("Interview updated successfully!");
      return updated;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Failed to update interview";
      toast.error(msg);
      throw new Error(msg);
    }
  };

  const cancelInterview = async (id: number) => {
    try {
      await interviewService.cancelInterview(id);
      setInterviews((prev) => prev.filter((inv) => inv.id !== id));
      toast.success("Interview cancelled successfully!");
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Failed to cancel interview";
      toast.error(msg);
      throw new Error(msg);
    }
  };

  return {
    interviews,
    loading,
    error,
    refetch: fetchInterviews,
    scheduleInterview,
    updateInterview,
    cancelInterview,
  };
};
