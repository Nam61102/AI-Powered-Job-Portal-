import React from "react";

export default function InterviewSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm animate-pulse space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-200 rounded w-1/3"></div>
          <div className="h-3 bg-slate-200 rounded w-1/4"></div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-3 bg-slate-200 rounded w-full"></div>
        <div className="h-3 bg-slate-200 rounded w-5/6"></div>
        <div className="h-3 bg-slate-200 rounded w-4/6"></div>
      </div>
      <div className="flex space-x-2 pt-4">
        <div className="h-8 bg-slate-200 rounded w-24"></div>
        <div className="h-8 bg-slate-200 rounded w-24"></div>
      </div>
    </div>
  );
}
