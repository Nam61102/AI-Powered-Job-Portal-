"use client";

import React, { useCallback } from "react";
import CandidateLayout from "@/components/layouts/CandidateLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import JobSearch from "@/components/jobs/JobSearch";
import JobFilters from "@/components/jobs/JobFilters";
import JobList from "@/components/jobs/JobList";
import { useJobs } from "@/hooks/useJobs";

export default function JobsPage() {
  const {
    jobs,
    loading,
    error,
    page,
    setPage,
    limit,
    search,
    setSearch,
    location,
    setLocation,
    minSalary,
    setMinSalary,
    experience,
    setExperience,
    jobType,
    setJobType,
  } = useJobs();

  const handleResetFilters = useCallback(() => {
    setSearch("");
    setLocation("");
    setMinSalary("");
    setExperience("");
    setJobType("");
    setPage(1);
  }, [setSearch, setLocation, setMinSalary, setExperience, setJobType, setPage]);

  return (
    <ProtectedRoute allowedRoles={["candidate"]}>
      <CandidateLayout>
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Top Headline */}
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore Opportunities
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Find and apply for premium roles tailored to your professional skills.
            </p>
          </div>

          {/* Search Header */}
          <div className="w-full">
            <JobSearch value={search} onChange={setSearch} />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-sm text-red-600 font-semibold bg-red-50 border border-red-100 p-4 rounded-lg text-center shadow-sm">
              {error}
            </div>
          )}

          {/* Main Filter + Listings Container */}
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Filters Sidebar */}
            <JobFilters
              location={location}
              setLocation={setLocation}
              minSalary={minSalary}
              setMinSalary={setMinSalary}
              experience={experience}
              setExperience={setExperience}
              jobType={jobType}
              setJobType={setJobType}
              onClear={handleResetFilters}
            />

            {/* Listings Grid */}
            <div className="flex-1 w-full space-y-6">
              <JobList
                jobs={jobs}
                loading={loading}
                onResetFilters={handleResetFilters}
              />

              {/* Pagination Controls */}
              {!loading && jobs.length > 0 && (
                <div className="flex items-center justify-between border-t border-slate-200/80 pt-6 mt-4">
                  <button
                    onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
                  >
                    ← Previous
                  </button>
                  <span className="text-xs font-semibold text-slate-500">
                    Page {page}
                  </span>
                  <button
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={jobs.length < limit}
                    className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CandidateLayout>
    </ProtectedRoute>
  );
}
