import React from "react";
import Link from "next/link";
import { RecruiterJob } from "@/types/recruiter";

interface RecruiterJobCardProps {
  job: RecruiterJob;
  onDeleteClick: (job: RecruiterJob) => void;
}

export default function RecruiterJobCard({ job, onDeleteClick }: RecruiterJobCardProps) {
  const formatSalary = (val: number) => {
    if (!val) return "Salary Neg.";
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`;
    return `$${val}`;
  };

  const applicationsCount = job._count?.applications || 0;

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow">
      <div className="flex-1 min-w-0 space-y-1.5">
        <h3 className="text-base font-bold text-slate-800 truncate">{job.title}</h3>
        <p className="text-xs font-semibold text-slate-500 flex items-center gap-2">
          <span>{job.location}</span>
          <span className="text-slate-300">•</span>
          <span className="text-blue-600">{formatSalary(job.salary)} / yr</span>
        </p>

        <div className="flex items-center gap-4 pt-2 text-xs font-bold">
          <Link href={`/recruiter/jobs/${job.id}/applicants`} className="text-emerald-600 hover:underline flex items-center gap-1">
            <span>👥</span> {applicationsCount} Applicants
          </Link>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500">Posted {new Date(job.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <Link
          href={`/recruiter/jobs/${job.id}/edit`}
          className="px-4 py-2 text-xs font-bold text-blue-600 border border-blue-200 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          Edit
        </Link>
        <button
          onClick={() => onDeleteClick(job)}
          className="px-4 py-2 text-xs font-bold text-red-600 border border-red-200 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
