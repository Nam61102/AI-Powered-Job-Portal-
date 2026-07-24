import React from "react";

interface JobSkeletonProps {
  count?: number;
}

export default function JobSkeleton({ count = 3 }: JobSkeletonProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm animate-pulse flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="flex items-start space-x-4 flex-1">
            {/* Logo skeleton */}
            <div className="w-12 h-12 rounded-xl bg-slate-200 flex-shrink-0" />
            
            {/* Main content skeleton */}
            <div className="space-y-2.5 flex-1 min-w-0">
              <div className="h-4 bg-slate-200 rounded w-1/3" />
              <div className="h-3.5 bg-slate-100 rounded w-1/4" />
              
              {/* Badges skeleton */}
              <div className="flex gap-2 pt-2.5">
                <div className="h-6 bg-slate-100 rounded w-20" />
                <div className="h-6 bg-slate-100 rounded w-24" />
                <div className="h-6 bg-slate-100 rounded w-20" />
              </div>
            </div>
          </div>

          {/* Action Button skeleton */}
          <div className="w-full md:w-32 h-10 bg-slate-200 rounded-lg flex-shrink-0" />
        </div>
      ))}
    </div>
  );
}
