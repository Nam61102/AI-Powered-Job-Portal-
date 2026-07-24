import React from "react";
import { Job } from "@/types/job";
import ApplyButton from "./ApplyButton";
import { getJobType, getJobExperience } from "@/hooks/useJobs";

interface JobDetailsCardProps {
  job: Job;
  hasApplied: boolean;
  applyLoading: boolean;
  onApply: () => void;
}

export default function JobDetailsCard({
  job,
  hasApplied,
  applyLoading,
  onApply,
}: JobDetailsCardProps) {
  const jobType = getJobType(job);
  const experience = getJobExperience(job);

  const formatSalary = (val: number) => {
    if (!val) return "Negotiable";
    return `$${val.toLocaleString()}`;
  };

  // Parse description and requirements dynamically
  const { descriptionParagraphs, requirements } = React.useMemo(() => {
    const lines = job.description.split("\n");
    const reqs: string[] = [];
    const descs: string[] = [];
    let isReqSection = false;

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      const lower = trimmed.toLowerCase();
      if (
        lower.includes("requirement") ||
        lower.includes("qualification") ||
        lower.includes("what you") ||
        lower.includes("what we need") ||
        lower.includes("skills required")
      ) {
        isReqSection = true;
        return;
      }

      if (isReqSection || trimmed.startsWith("-") || trimmed.startsWith("*")) {
        reqs.push(trimmed.replace(/^[-*\s]+/, ""));
      } else {
        descs.push(trimmed);
      }
    });

    // Provide default fallback requirements if none parsed
    if (reqs.length === 0) {
      reqs.push(
        "Strong understanding of modern development patterns and industry practices.",
        "Excellent communication and collaboration skills to work in agile teams.",
        "Ability to write clean, reusable, and self-documenting code.",
        "Proactive problem-solving attitude and willingness to learn new technologies."
      );
    }

    return {
      descriptionParagraphs: descs.length > 0 ? descs : [job.description],
      requirements: reqs,
    };
  }, [job]);

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-6 md:p-8 space-y-8">
      {/* Header Info Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="space-y-3">
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {job.title}
          </h1>
          
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="bg-[#E8F0FE] text-[#0056cc] px-3 py-1 rounded-md font-bold uppercase tracking-wider">
              {job.location}
            </span>
            <span className="bg-[#E8F0FE] text-[#0056cc] px-3 py-1 rounded-md font-bold uppercase tracking-wider">
              {formatSalary(job.salary)} / yr
            </span>
            <span className="bg-[#E8F0FE] text-[#0056cc] px-3 py-1 rounded-md font-bold uppercase tracking-wider">
              {jobType}
            </span>
            <span className="bg-[#E8F0FE] text-[#0056cc] px-3 py-1 rounded-md font-bold uppercase tracking-wider">
              {experience}
            </span>
          </div>
        </div>

        <div className="flex-shrink-0 w-full md:w-auto">
          <ApplyButton
            hasApplied={hasApplied}
            applyLoading={applyLoading}
            onApply={onApply}
            className="w-full md:w-auto px-7 py-3"
          />
        </div>
      </div>

      {/* Description Section */}
      <div className="space-y-3.5">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest text-[11px]">
          Job Description
        </h3>
        <div className="text-slate-600 text-sm leading-relaxed space-y-3.5 font-medium">
          {descriptionParagraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </div>

      {/* Requirements Section */}
      <div className="space-y-4 pt-2">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest text-[11px]">
          Requirements & Qualifications
        </h3>
        <ul className="space-y-2.5 text-slate-600 text-sm font-medium">
          {requirements.map((req, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-blue-600 mr-2.5 flex-shrink-0">✓</span>
              <span>{req}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
