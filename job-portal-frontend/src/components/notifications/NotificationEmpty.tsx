import React from 'react';

export default function NotificationEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center px-4">
      <div className="mb-3 h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
        <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </div>
      <p className="text-sm font-semibold text-slate-700">No notifications yet</p>
      <p className="text-xs text-slate-500 mt-1">When you get notifications, they'll show up here.</p>
    </div>
  );
}
