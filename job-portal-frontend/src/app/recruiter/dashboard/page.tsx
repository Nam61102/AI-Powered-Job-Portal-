"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import DashboardCards from "@/components/recruiter/DashboardCards";
import { useRecruiterJobs } from "@/hooks/useRecruiterJobs";
import StatusDropdown from "@/components/recruiter/StatusDropdown";
import { useEffect, useState } from "react";
import { Applicant } from "@/types/recruiter";
import api from "@/lib/axios";
import InterviewModal from "@/components/interviews/InterviewModal";
import { useInterviews } from "@/hooks/useInterviews";
import { InterviewFormData } from "@/components/interviews/InterviewForm";

export default function RecruiterDashboard() {
  const { user } = useAuth();
  const { jobs, loading } = useRecruiterJobs();
  const [allApplicants, setAllApplicants] = useState<Applicant[]>([]);
  const [applicantsLoading, setApplicantsLoading] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState<number | null>(null);
  const { scheduleInterview } = useInterviews();

  useEffect(() => {
    const fetchAllApplicants = async () => {
      if (!jobs || jobs.length === 0) return;
      setApplicantsLoading(true);
      try {
        const appsPromises = jobs.map((job) => api.get(`/applications/job/${job.id}`));
        const appsResponses = await Promise.all(appsPromises);
        
        let all: Applicant[] = [];
        appsResponses.forEach((res: any) => {
          all = [...all, ...res.data];
        });
        
        // Sort by newest
        all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setAllApplicants(all);
      } catch (error) {
        console.error("Failed to fetch all applicants", error);
      } finally {
        setApplicantsLoading(false);
      }
    };
    
    if (jobs.length > 0) {
      fetchAllApplicants();
    }
  }, [jobs]);

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-bold">Loading dashboard...</div>;
  }

  const totalJobs = jobs.length;
  const totalApplicants = allApplicants.length;
  const shortlistedCandidates = allApplicants.filter(
    (app) => app.status.toLowerCase() === "shortlisted" || app.status.toLowerCase() === "hired" || app.status.toLowerCase() === "accepted"
  ).length;

  const recentApplicants = allApplicants.slice(0, 5);

  const getBadgeStyle = (status: string) => {
    switch (status.toUpperCase()) {
      case "SHORTLISTED":
      case "ACCEPTED":
      case "HIRED":
        return "bg-emerald-50 text-emerald-600 border border-emerald-100";
      case "SCREENING":
      case "INTERVIEW":
        return "bg-blue-50 text-blue-600 border border-blue-100";
      case "REJECTED":
        return "bg-red-50 text-red-500 border border-red-100";
      default:
        return "bg-slate-100 text-slate-600 border border-slate-200/60";
    }
  };

  const handleStatusChange = async (appId: number, status: string) => {
    try {
      await api.put('/applications/status', { applicationId: appId, status });
      setAllApplicants(prev => prev.map(a => a.id === appId ? { ...a, status } : a));
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const handleScheduleSubmit = async (data: InterviewFormData) => {
    if (!selectedAppId) return;
    await scheduleInterview({
      applicationId: selectedAppId,
      ...data,
    });
    await handleStatusChange(selectedAppId, "INTERVIEW");
    setSelectedAppId(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title and Top Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Recruiter Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Welcome back, {user?.name}! Here's what's happening with your hiring pipelines today.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <Link href="/recruiter/jobs/create" className="px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-sm">
            <span>+</span>
            <span>Post a New Job</span>
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      <DashboardCards 
        totalJobs={totalJobs} 
        totalApplicants={totalApplicants} 
        shortlistedCandidates={shortlistedCandidates} 
      />

      {/* Recent Applicants Section */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-800">Recent Applicants</h2>
          <a href="/recruiter/jobs" className="text-xs font-bold text-blue-600 hover:text-blue-700">View Jobs</a>
        </div>

        <div className="overflow-x-auto">
          {applicantsLoading ? (
            <div className="py-8 text-center text-xs text-slate-400 font-bold">Loading applicants...</div>
          ) : recentApplicants.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400 font-bold">No recent applications found.</div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[700px] table-fixed">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="pb-3 font-semibold w-[35%]">Candidate</th>
                  <th className="pb-3 font-semibold w-[15%]">Experience</th>
                  <th className="pb-3 font-semibold w-[25%]">Status</th>
                  <th className="pb-3 font-semibold w-[25%] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-600">
                {recentApplicants.map((app) => {
                  const initials = app.candidate.name.charAt(0).toUpperCase();
                  return (
                    <tr key={app.id} className="hover:bg-slate-50/50">
                      <td className="py-4 flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold border border-slate-200 shrink-0">
                          {initials}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 leading-tight">{app.candidate.name}</h4>
                          <span className="text-[10px] text-slate-400">{app.candidate.email}</span>
                        </div>
                      </td>
                      <td className="py-4 text-slate-500 font-medium">
                        {app.candidate.candidateProfile ? `${app.candidate.candidateProfile.experience} Years` : "N/A"}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <StatusDropdown 
                            currentStatus={app.status} 
                            onStatusChange={(status) => handleStatusChange(app.id, status)} 
                          />
                        </div>
                      </td>
                      <td className="py-4 text-right space-x-2 flex items-center justify-end">
                        {app.status === "INTERVIEW" && (
                          <button
                            onClick={() => setSelectedAppId(app.id)}
                            className="px-3 py-1.5 border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded-lg transition-colors inline-block"
                          >
                            Schedule Interview
                          </button>
                        )}
                        {app.candidate.candidateProfile?.resumeUrl ? (
                          <a
                            href={app.candidate.candidateProfile.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-1.5 border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-[10px] font-bold rounded-lg transition-colors inline-block"
                          >
                            Resume
                          </a>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-medium px-3.5 py-1.5">No Resume</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
      
      <InterviewModal
        isOpen={selectedAppId !== null}
        onClose={() => setSelectedAppId(null)}
        onSubmit={handleScheduleSubmit}
      />
    </div>
  );
}
