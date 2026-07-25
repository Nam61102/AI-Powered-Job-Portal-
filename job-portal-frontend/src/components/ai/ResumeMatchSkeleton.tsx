import React from "react";

export default function ResumeMatchSkeleton() {
  return (
    <div className="space-y-6 py-4 animate-pulse">
      {/* Loading header */}
      <div className="flex flex-col items-center justify-center space-y-3 pb-6 border-b border-slate-100">
        <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
        </div>
        <div className="h-6 w-48 bg-slate-200 rounded"></div>
        <div className="h-4 w-32 bg-slate-100 rounded"></div>
      </div>

      {/* Loading body */}
      <div className="space-y-4">
        <div className="h-4 w-1/4 bg-slate-200 rounded"></div>
        <div className="h-3 w-full bg-slate-100 rounded"></div>
        <div className="h-3 w-full bg-slate-100 rounded"></div>
        <div className="h-3 w-5/6 bg-slate-100 rounded"></div>
      </div>

      <hr className="border-slate-100" />

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-slate-150 p-4 rounded-xl space-y-3">
          <div className="h-4 w-1/3 bg-slate-200 rounded"></div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            <div className="h-6 w-16 bg-slate-100 rounded-md"></div>
            <div className="h-6 w-20 bg-slate-100 rounded-md"></div>
            <div className="h-6 w-14 bg-slate-100 rounded-md"></div>
          </div>
        </div>
        
        <div className="border border-slate-150 p-4 rounded-xl space-y-3">
          <div className="h-4 w-1/3 bg-slate-200 rounded"></div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            <div className="h-6 w-18 bg-slate-100 rounded-md"></div>
            <div className="h-6 w-12 bg-slate-100 rounded-md"></div>
            <div className="h-6 w-24 bg-slate-100 rounded-md"></div>
          </div>
        </div>
      </div>

      {/* Recommendations skeleton */}
      <div className="border border-slate-150 p-4 rounded-xl space-y-3">
        <div className="h-4 w-1/4 bg-slate-200 rounded"></div>
        <div className="h-3 w-full bg-slate-100 rounded"></div>
        <div className="h-3 w-4/5 bg-slate-100 rounded"></div>
      </div>
    </div>
  );
}
