import React from "react";

interface DashboardCardsProps {
  totalJobs: number;
  totalApplicants: number;
  shortlistedCandidates: number;
}

export default function DashboardCards({ totalJobs, totalApplicants, shortlistedCandidates }: DashboardCardsProps) {
  // Simple conversion rate mock based on shortlisted vs total
  const convRate = totalApplicants > 0 ? Math.round((shortlistedCandidates / totalApplicants) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Stat 1 */}
      <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between h-40">
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
            💼
          </div>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
            Active
          </span>
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-400">TOTAL JOBS POSTED</div>
          <div className="text-4xl font-extrabold text-slate-900 mt-1">{totalJobs}</div>
        </div>
      </div>

      {/* Stat 2 */}
      <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between h-40">
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
            👥
          </div>
          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
            Received
          </span>
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-400">TOTAL APPLICANTS</div>
          <div className="text-4xl font-extrabold text-slate-900 mt-1">{totalApplicants}</div>
        </div>
      </div>

      {/* Stat 3 */}
      <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between h-40">
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
            ✅
          </div>
          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
            {convRate}% conv. rate
          </span>
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-400">SHORTLISTED CANDIDATES</div>
          <div className="text-4xl font-extrabold text-slate-900 mt-1">{shortlistedCandidates}</div>
        </div>
      </div>
    </div>
  );
}
