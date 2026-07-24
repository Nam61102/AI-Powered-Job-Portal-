import api from "@/lib/axios";
import { Application } from "@/types/application";

export const getMyApplications = async (): Promise<Application[]> => {
  const res = await api.get<Application[]>("/applications/my");
  return res.data;
};