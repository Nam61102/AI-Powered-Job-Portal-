export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  receiverId: number;
  createdAt: string;
}

export interface NotificationResponse {
  success: boolean;
  notifications: Notification[];
}

export interface UnreadCountResponse {
  success: boolean;
  count: number;
}
