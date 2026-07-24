import React from 'react';
import { Notification } from '../../types/notification';
import NotificationItem from './NotificationItem';
import NotificationEmpty from './NotificationEmpty';
import NotificationSkeleton from './NotificationSkeleton';

interface NotificationDropdownProps {
  notifications: Notification[];
  loading: boolean;
  onRead: (id: string) => void;
  onMarkAllRead: () => void;
  onDelete: (id: string) => void;
}

export default function NotificationDropdown({
  notifications,
  loading,
  onRead,
  onMarkAllRead,
  onDelete
}: NotificationDropdownProps) {
  const hasUnread = notifications.some((n) => !n.isRead);

  return (
    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-lg border border-slate-200 z-50 overflow-hidden flex flex-col max-h-[80vh]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
        <h3 className="text-sm font-bold text-slate-800">Notifications</h3>
        {hasUnread && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMarkAllRead();
            }}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="overflow-y-auto flex-1 overscroll-contain">
        {loading && notifications.length === 0 ? (
          <NotificationSkeleton />
        ) : notifications.length > 0 ? (
          <div className="flex flex-col">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onRead={onRead}
                onDelete={onDelete}
              />
            ))}
          </div>
        ) : (
          <NotificationEmpty />
        )}
      </div>
    </div>
  );
}
