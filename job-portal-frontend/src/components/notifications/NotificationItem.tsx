import React, { useState } from 'react';
import { Notification } from '../../types/notification';

interface NotificationItemProps {
  notification: Notification;
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function NotificationItem({ notification, onRead, onDelete }: NotificationItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " mins ago";
    return Math.floor(seconds) + " secs ago";
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'APPLICATION':
        return (
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
        );
      case 'SHORTLISTED':
      case 'HIRED':
        return (
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
        );
      case 'REJECTED':
      case 'BLOCKED':
        return (
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </div>
        );
      case 'INTERVIEW':
        return (
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
        );
      default:
        return (
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        );
    }
  };

  return (
    <div 
      className={`relative flex items-start p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer ${!notification.isRead ? 'bg-blue-50/50' : 'bg-white'}`}
      onClick={() => {
        if (!notification.isRead) onRead(notification.id);
        setIsExpanded(!isExpanded);
      }}
    >
      {getIcon(notification.type)}
      
      <div className="ml-3 flex-1">
        <div className="flex justify-between items-start">
          <p className={`text-sm font-semibold ${!notification.isRead ? 'text-slate-900' : 'text-slate-700'}`}>
            {notification.title}
          </p>
          <p className="text-xs text-slate-400 ml-2 whitespace-nowrap">
            {getRelativeTime(notification.createdAt)}
          </p>
        </div>
        <p className={`text-sm text-slate-500 mt-1 ${isExpanded ? '' : 'line-clamp-2'}`}>
          {notification.message}
        </p>
      </div>

      <div className="ml-3 flex flex-col items-center justify-between space-y-2">
        {!notification.isRead && (
          <div className="h-2.5 w-2.5 bg-blue-500 rounded-full mt-1"></div>
        )}
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDelete(notification.id);
          }}
          className="text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 lg:opacity-100"
          title="Delete"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
