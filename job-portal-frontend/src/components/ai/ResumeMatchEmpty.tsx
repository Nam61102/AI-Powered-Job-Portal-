import React from "react";

export default function ResumeMatchEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 text-2xl shadow-sm border border-slate-100">
        📭
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-bold text-slate-800">No Analysis Available</h3>
        <p className="text-xs text-slate-500 max-w-sm">
          We couldn't retrieve the match analysis. Please check your connection or try matches on another job opening.
        </p>
      </div>
    </div>
  );
}
