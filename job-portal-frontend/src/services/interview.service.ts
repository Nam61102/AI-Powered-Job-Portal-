import api from "@/lib/axios";
import { Interview, ScheduleInterviewPayload, UpdateInterviewPayload } from "@/types/interview";

export const interviewService = {
  scheduleInterview: async (payload: ScheduleInterviewPayload): Promise<Interview> => {
    const response = await api.post("/interviews/schedule", payload);
    return response.data;
  },

  getRecruiterInterviews: async (): Promise<Interview[]> => {
    const response = await api.get("/interviews");
    return response.data?.interviews || response.data || [];
  },

  getCandidateInterviews: async (): Promise<Interview[]> => {
    const response = await api.get("/interviews/my");
    return response.data?.interviews || response.data || [];
  },

  getInterviewById: async (id: number): Promise<Interview> => {
    const response = await api.get(`/interviews/${id}`);
    return response.data;
  },

  updateInterview: async (id: number, payload: UpdateInterviewPayload): Promise<Interview> => {
    const response = await api.put(`/interviews/${id}`, payload);
    return response.data;
  },

  updateInterviewStatus: async (id: number, status: string): Promise<Interview> => {
    const response = await api.patch(`/interviews/${id}/status`, { status });
    return response.data;
  },

  cancelInterview: async (id: number): Promise<void> => {
    await api.delete(`/interviews/${id}`);
  },
};
