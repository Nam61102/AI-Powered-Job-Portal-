import { useState, useCallback, useEffect } from 'react';
import { Notification } from '../types/notification';
import {
  getNotifications,
  getUnreadCount,
  markAsRead as markAsReadService,
  markAllRead as markAllReadService,
  deleteNotification as deleteNotificationService,
} from '../services/notification.service';
import toast from 'react-hot-toast'; // Assume react-hot-toast is used, standard for Next.js unless sonner is used. I'll use a generic fallback if not present, but toast is specified.

export const useNotifications = (isAuthenticated: boolean) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUnreadCount = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const data = await getUnreadCount();
      if (data.success) {
        setUnreadCount(data.count);
      }
    } catch (err: any) {
      console.error("Failed to fetch unread count:", err);
    }
  }, [isAuthenticated]);

  const fetchNotifications = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getNotifications();
      if (data.success) {
        setNotifications(data.notifications);
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to fetch notifications';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchUnreadCount();
  }, [fetchUnreadCount]);

  const markAsRead = useCallback(async (id: string) => {
    try {
      // Optimistic update
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));

      await markAsReadService(id);
    } catch (err: any) {
      toast.error("Failed to mark notification as read");
      // Revert on failure
      fetchNotifications();
      fetchUnreadCount();
    }
  }, [fetchNotifications, fetchUnreadCount]);

  const markAllRead = useCallback(async () => {
    try {
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
      
      await markAllReadService();
      toast.success("All notifications marked as read");
    } catch (err: any) {
      toast.error("Failed to mark all as read");
      fetchNotifications();
      fetchUnreadCount();
    }
  }, [fetchNotifications, fetchUnreadCount]);

  const deleteNotification = useCallback(async (id: string) => {
    try {
      const notificationToDelete = notifications.find(n => n.id === id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      if (notificationToDelete && !notificationToDelete.isRead) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }

      await deleteNotificationService(id);
      toast.success("Notification deleted");
    } catch (err: any) {
      toast.error("Failed to delete notification");
      fetchNotifications();
      fetchUnreadCount();
    }
  }, [notifications, fetchNotifications, fetchUnreadCount]);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    refetch: fetchNotifications,
    markAsRead,
    markAllRead,
    deleteNotification,
  };
};
