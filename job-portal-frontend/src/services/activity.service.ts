import axiosInstance from "../lib/axios";
import { ActivityResponse } from "../types/activity";

export const getActivities = async (): Promise<ActivityResponse> => {
  const response = await axiosInstance.get('/activity');
  return response.data;
};
