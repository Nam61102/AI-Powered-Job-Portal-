import api from "@/lib/axios";
import { JobsResponse, JobResponse } from "@/types/job";
import { Application } from "@/types/application";

export const getJobs = async (params?: {
  page?: number;
  limit?: number;
  location?: string;
  minSalary?: number;
  search?: string;
}): Promise<JobsResponse> => {
  const res = await api.get<JobsResponse>("/jobs", { params });
  return res.data;
};

export const getJobById = async (id: number): Promise<JobResponse> => {
  const res = await api.get<JobResponse>(`/jobs/${id}`);
  return res.data;
};

export const applyJob = async (jobId: number): Promise<{ message: string; application: Application }> => {
  const res = await api.post<{ message: string; application: Application }>("/applications/apply", { jobId });
  return res.data;
};
