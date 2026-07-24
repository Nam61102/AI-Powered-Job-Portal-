import React from "react";
import { RecentApplication } from "@/types/analytics";

interface RecentApplicationsTableProps {
  applications: RecentApplication[];
}

const statusClasses: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700",
  shortlisted: "bg-emerald-50 text-emerald-700",
  rejected: "bg-rose-50 text-rose-700",
  hired: "bg-indigo-50 text-indigo-700",
  accepted: "bg-emerald-50 text-emerald-700",
  screening: "bg-sky-50 text-sky-700",
  interview: "bg-violet-50 text-violet-700",
};

export default function RecentApplicationsTable({ applications }: RecentApplicationsTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-5">
        <h2 className="text-lg font-bold text-slate-900">Recent Applications</h2>
        <p className="text-sm text-slate-500">Latest applications received by your team</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50/70">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Candidate
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Job
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Applied Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {applications.map((application) => (
              <tr key={`${application.candidateName}-${application.jobTitle}-${application.appliedAt}`} className="hover:bg-slate-50/60">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-slate-900">
                  {application.candidateName}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                  {application.jobTitle}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusClasses[application.status.toLowerCase()] || "bg-slate-100 text-slate-700"}`}>
                    {application.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                  {new Date(application.appliedAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
