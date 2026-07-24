"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useApplicants } from "@/hooks/useApplicants";
import ApplicantTable from "@/components/recruiter/ApplicantTable";

export default function ApplicantsPage() {
  const params = useParams();
  const jobId = Number(params.id);
  const { applicants, loading, updateStatus } = useApplicants(jobId);

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-bold">Loading applicants...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Job Applicants
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review candidates and update their application status.
          </p>
        </div>

        <Link
          href="/recruiter/jobs"
          className="px-5 py-2.5 rounded-lg text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
        >
          Back to Jobs
        </Link>
      </div>

      <ApplicantTable 
        applicants={applicants} 
        onStatusChange={updateStatus} 
      />
    </div>
  );
}
