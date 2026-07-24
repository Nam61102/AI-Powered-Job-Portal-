import React from 'react';

export default function NotificationSkeleton() {
  return (
    <div className="flex flex-col">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-start p-4 border-b border-slate-100 animate-pulse">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-slate-200"></div>
          <div className="ml-3 flex-1 space-y-2 py-1">
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-3 bg-slate-200 rounded w-full"></div>
            <div className="h-3 bg-slate-200 rounded w-1/2 mt-2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
