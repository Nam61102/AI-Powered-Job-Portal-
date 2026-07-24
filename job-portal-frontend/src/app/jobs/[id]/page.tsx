"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import CandidateLayout from "@/components/layouts/CandidateLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import JobDetailsCard from "@/components/jobs/JobDetailsCard";
import CompanyCard from "@/components/jobs/CompanyCard";
import { useJob } from "@/hooks/useJob";

export default function JobDetailsPage() {
  const params = useParams();
  const jobId = Number(params.id);
  const { job, loading, error, hasApplied, applyLoading, apply } = useJob(jobId);

  return (
    <ProtectedRoute allowedRoles={["candidate"]}>
      <CandidateLayout>
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Back Navigation */}
          <div>
            <Link
              href="/jobs"
              className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors gap-1.5"
            >
              <span>←</span>
              <span>Back to Job Search</span>
            </Link>
          </div>

          {loading ? (
            /* Loading State */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
              <div className="lg:col-span-2 space-y-6 bg-white p-6 rounded-xl border border-slate-100 h-96">
                <div className="h-6 w-1/3 bg-slate-200 rounded"></div>
                <div className="h-4 w-1/4 bg-slate-100 rounded"></div>
                <div className="space-y-3 pt-6">
                  <div className="h-3 w-full bg-slate-100 rounded"></div>
                  <div className="h-3 w-full bg-slate-100 rounded"></div>
                  <div className="h-3 w-4/5 bg-slate-100 rounded"></div>
                </div>
              </div>
              <div className="space-y-6 bg-white p-6 rounded-xl border border-slate-100 h-64">
                <div className="h-12 w-12 rounded-lg bg-slate-200"></div>
                <div className="h-4 w-1/2 bg-slate-200 rounded"></div>
                <div className="h-3 w-3/4 bg-slate-100 rounded"></div>
              </div>
            </div>
          ) : error ? (
            /* Error State */
            <div className="text-sm text-red-600 font-semibold bg-red-50 border border-red-100 p-6 rounded-lg text-center shadow-sm">
              {error}
            </div>
          ) : job ? (
            /* Job Details Layout Grid */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* Job Details Card */}
              <div className="lg:col-span-2 w-full">
                <JobDetailsCard
                  job={job}
                  hasApplied={hasApplied}
                  applyLoading={applyLoading}
                  onApply={apply}
                />
              </div>

              {/* Sidebar Company Card */}
              <div className="w-full">
                <CompanyCard company={job.company} />
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-500 font-semibold bg-slate-50 border border-slate-200/80 p-6 rounded-lg text-center shadow-sm">
              Job not found.
            </div>
          )}
        </div>
      </CandidateLayout>
    </ProtectedRoute>
  );
}
