import api from "@/lib/axios";
import { ResumeMatchResponse } from "@/types/ai";

/**
 * Sends request to backend to perform resume matching with a job description.
 * Uses the default axios instance.
 * 
 * @param jobId - The ID of the job to match the candidate's resume against.
 * @returns The structured AI Resume Match response.
 */
export const resumeMatch = async (jobId: number): Promise<ResumeMatchResponse> => {
  const res = await api.post<ResumeMatchResponse>("/ai/resume-match", { jobId });
  return res.data;
};
