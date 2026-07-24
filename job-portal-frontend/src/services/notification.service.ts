import api from "@/lib/axios";
import { NotificationResponse, UnreadCountResponse } from "../types/notification";

export const getNotifications = async (): Promise<NotificationResponse> => {
  const response = await api.get("/notifications");
  return response.data;
};

export const getUnreadCount = async (): Promise<UnreadCountResponse> => {
  const response = await api.get("/notifications/count");
  return response.data;
};

export const markAsRead = async (id: string) => {
  const response = await api.put(`/notifications/${id}/read`);
  return response.data;
};

export const markAllRead = async () => {
  const response = await api.put("/notifications/read-all");
  return response.data;
};

export const deleteNotification = async (id: string) => {
  const response = await api.delete(`/notifications/${id}`);
  return response.data;
};
