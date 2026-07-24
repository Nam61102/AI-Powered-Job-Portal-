import api from "@/lib/axios";

export const registerUser = async (
  data: Record<string, unknown>
) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (
  data: Record<string, unknown>
) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};