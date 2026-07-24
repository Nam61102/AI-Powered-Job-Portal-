import React from "react";
import Link from "next/link";
import { Job } from "@/types/job";
import { getJobType, getJobExperience } from "@/hooks/useJobs";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const companyName = job.company?.companyName || "Unknown Company";
  const companyLogoText = companyName.charAt(0).toUpperCase();

  // Stable color picker based on company name
  const colors = [
    "bg-blue-600",
    "bg-indigo-600",
    "bg-amber-600",
    "bg-rose-600",
    "bg-emerald-600",
  ];
  const colorIndex = companyName.charCodeAt(0) % colors.length;
  const logoBg = colors[colorIndex];

  // Formatting salary (e.g. 120000 -> $120,000 / yr or $120k)
  const formatSalary = (val: number) => {
    if (!val) return "Salary Neg.";
    if (val >= 1000) {
      return `$${(val / 1000).toFixed(0)}k`;
    }
    return `$${val}`;
  };

  const jobType = getJobType(job);
  const experience = getJobExperience(job);

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200/80 hover:shadow-md hover:border-blue-200 transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
      <div className="flex items-start space-x-4 flex-1 min-w-0">
        {/* Company Logo representation */}
        {job.company?.logo ? (
          <img
            src={job.company.logo}
            alt={companyName}
            className="w-12 h-12 rounded-xl object-cover border border-slate-100 flex-shrink-0"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className={`w-12 h-12 rounded-xl text-white font-extrabold flex items-center justify-center text-sm flex-shrink-0 shadow-sm ${logoBg}`}>
            {companyLogoText}
          </div>
        )}

        <div className="space-y-1.5 flex-1 min-w-0">
          <Link href={`/jobs/${job.id}`}>
            <h3 className="text-base font-bold text-slate-800 hover:text-blue-600 cursor-pointer transition-colors truncate">
              {job.title}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 font-semibold flex items-center gap-1">
            <span>{companyName}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-400 font-medium">{job.location}</span>
          </p>
          
          {/* Metadata Badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="bg-slate-50 border border-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
              {jobType}
            </span>
            <span className="bg-slate-50 border border-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
              {formatSalary(job.salary)}
            </span>
            <span className="bg-slate-50 border border-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
              {experience}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 w-full md:w-auto">
        <Link
          href={`/jobs/${job.id}`}
          className="block w-full md:w-auto px-6 py-2.5 text-center text-xs font-bold text-blue-600 border border-blue-200 hover:bg-blue-50/50 rounded-lg hover:border-blue-300 transition-all shadow-sm bg-white"
        >
          View Job
        </Link>
      </div>
    </div>
  );
}
