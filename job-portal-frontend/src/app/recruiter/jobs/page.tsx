"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRecruiterJobs } from "@/hooks/useRecruiterJobs";
import DeleteJobModal from "@/components/recruiter/DeleteJobModal";
import { RecruiterJob } from "@/types/recruiter";

export default function JobsPage() {
  const { jobs, loading, deleteJob } = useRecruiterJobs();
  const [selectedJob, setSelectedJob] = useState<RecruiterJob | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const confirmDelete = async () => {
    if (selectedJob) {
      setIsDeleting(true);
      try {
        await deleteJob(selectedJob.id);
        setSelectedJob(null);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((j) =>
      j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.company?.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [jobs, searchTerm]);

  if (loading && jobs.length === 0) {
    return <div className="p-8 text-center text-slate-500 font-bold">Loading your jobs...</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 space-y-6 bg-[#f8f9fa] min-h-screen">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm font-medium text-slate-500 mb-2">
        <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        <span className="text-blue-600 font-bold mx-2">Dashboard</span> / 
        <span className="text-slate-800 font-bold ml-2">Active Jobs</span>
      </div>

      {/* Header Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">Active Jobs</h1>
        <p className="text-sm text-slate-500 mt-1 font-medium">View, edit, or delete the job listings posted by your company</p>
      </div>

      {/* Add Button */}
      <div className="flex justify-end">
        <Link
          href="/recruiter/jobs/create"
          className="flex items-center px-5 py-2.5 bg-[#293285] text-white font-bold text-sm rounded-lg hover:bg-opacity-90 transition-all shadow-sm"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
          Add Job
        </Link>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex items-center">
        <svg className="w-5 h-5 text-blue-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input 
          type="text" 
          placeholder="Search jobs by title, location or company..." 
          className="w-full pl-3 py-1 outline-none text-sm font-medium text-slate-700 placeholder-slate-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Data Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-4 px-6 text-xs font-bold text-slate-500 tracking-wider">
                  <div className="flex items-center space-x-1 cursor-pointer">
                    <span>ID</span>
                    <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 5l-7 7h14l-7-7zm0 14l7-7H5l7 7z"/></svg>
                  </div>
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 tracking-wider">
                  <div className="flex items-center space-x-1 cursor-pointer">
                    <span>TITLE</span>
                    <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 5l-7 7h14l-7-7zm0 14l7-7H5l7 7z"/></svg>
                  </div>
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 tracking-wider">
                  <div className="flex items-center space-x-1 cursor-pointer">
                    <span>LOCATION</span>
                    <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 5l-7 7h14l-7-7zm0 14l7-7H5l7 7z"/></svg>
                  </div>
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 tracking-wider">
                  <div className="flex items-center space-x-1 cursor-pointer">
                    <span>COMPANY</span>
                    <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 5l-7 7h14l-7-7zm0 14l7-7H5l7 7z"/></svg>
                  </div>
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 tracking-wider">
                  <div className="flex items-center space-x-1 cursor-pointer">
                    <span>APPLICATIONS</span>
                    <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 5l-7 7h14l-7-7zm0 14l7-7H5l7 7z"/></svg>
                  </div>
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 tracking-wider text-center">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-sm text-slate-500 font-medium">No jobs found</td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 text-sm font-semibold text-slate-600">
                      # {job.id}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800">{job.title}</span>
                        <span className="text-xs text-slate-500 font-medium">${job.salary.toLocaleString()} / yr</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#eef2ff] text-slate-700 font-bold text-xs uppercase tracking-wider">
                        {job.location}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                       <span className="text-sm font-semibold text-slate-700">{job.company?.companyName || "Unknown"}</span>
                    </td>
                    <td className="py-4 px-6 text-sm font-medium">
                      <span className="inline-flex items-center justify-center px-2 py-1 rounded bg-blue-50 text-blue-700 font-bold text-xs">
                        {job._count?.applications || 0} Apps
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center space-x-6">
                        <Link href={`/recruiter/jobs/${job.id}/edit`} className="text-[#3b82f6] hover:opacity-70 transition-opacity">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        </Link>
                        <button onClick={() => setSelectedJob(job)} className="text-[#ef4444] hover:opacity-70 transition-opacity">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteJobModal
        job={selectedJob}
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
