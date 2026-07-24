import React from "react";
import { TopJob } from "@/types/analytics";

interface TopJobCardProps {
  topJob: TopJob;
}

export default function TopJobCard({ topJob }: TopJobCardProps) {
  const percentage = topJob.applications > 0 ? Math.min(100, Math.round((topJob.applications / Math.max(1, topJob.applications)) * 100)) : 0;

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">Top Performing Job</p>
          <h3 className="mt-2 text-xl font-bold text-slate-900">{topJob.title || "No data yet"}</h3>
        </div>
        <div className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600">
          {topJob.applications} apps
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
          <span>Application volume</span>
          <span>{topJob.applications} applications</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: `${percentage}%` }} />
        </div>
      </div>
    </div>
  );
}
