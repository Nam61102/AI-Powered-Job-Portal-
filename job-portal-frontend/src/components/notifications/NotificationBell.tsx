import React, { useState, useRef, useEffect } from 'react';
import { useNotifications } from '../../hooks/useNotifications';
import NotificationBadge from './NotificationBadge';
import NotificationDropdown from './NotificationDropdown';
import { useAuth } from '@/hooks/useAuth';

export default function NotificationBell() {
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const {
    notifications,
    unreadCount,
    loading,
    refetch,
    markAsRead,
    markAllRead,
    deleteNotification
  } = useNotifications(isAuthenticated);

  useEffect(() => {
    if (isOpen) {
      refetch(); // refresh data when opening
    }
  }, [isOpen, refetch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button 
        className="relative hover:text-slate-800 cursor-pointer text-slate-500 focus:outline-none"
        onClick={toggleDropdown}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <NotificationBadge count={unreadCount} />
      </button>

      {isOpen && (
        <NotificationDropdown
          notifications={notifications}
          loading={loading}
          onRead={markAsRead}
          onMarkAllRead={markAllRead}
          onDelete={deleteNotification}
        />
      )}
    </div>
  );
}
