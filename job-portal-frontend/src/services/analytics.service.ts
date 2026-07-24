import api from "@/lib/axios";
import { AnalyticsResponse } from "@/types/analytics";

export const getAnalytics = async (): Promise<AnalyticsResponse> => {
  const res = await api.get<AnalyticsResponse>("/recruiter/analytics");
  return res.data;
};
