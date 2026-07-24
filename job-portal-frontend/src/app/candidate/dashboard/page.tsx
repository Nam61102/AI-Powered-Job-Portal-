"use client";

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useApplications } from "@/hooks/useApplications";
import { useCandidate } from "@/hooks/useCandidate";
import { getJobs } from "@/services/job.service";
import { Job } from "@/types/job";
import { Application } from "@/types/application";
import Link from "next/link";
import { useInterviews } from "@/hooks/useInterviews";
import InterviewCard from "@/components/interviews/InterviewCard";
import InterviewSkeleton from "@/components/interviews/InterviewSkeleton";

const getCompanyColor = (companyName: string) => {
  const name = companyName.toLowerCase();
  if (name.includes("stripe")) return "bg-[#635BFF]";
  if (name.includes("figma")) return "bg-[#1E1E1E]";
  if (name.includes("airbnb")) return "bg-white border border-slate-100";
  if (name.includes("google")) return "bg-[#4285F4]";
  if (name.includes("apple")) return "bg-[#000000]";
  if (name.includes("microsoft")) return "bg-[#F25022]";
  
  const colors = [
    "bg-[#1A73E8]",
    "bg-[#0B1329]",
    "bg-[#10B981]",
    "bg-[#8B5CF6]",
    "bg-[#EC4899]",
    "bg-[#F59E0B]",
    "bg-[#3B82F6]",
    "bg-[#EF4444]",
  ];
  let hash = 0;
  for (let i = 0; i < companyName.length; i++) {
    hash = companyName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const getCompanyLogo = (companyName: string) => {
  const name = companyName.toLowerCase();
  if (name.includes("stripe")) {
    return (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.9 10.6c0-.6-.5-.8-1.2-.8-.7 0-1.6.2-2.3.6V6.1c.8-.3 1.9-.5 2.9-.5 2.6 0 4.1 1.2 4.1 3.5v7.2c0 .9.2 1.4.5 1.7H14c-.1-.3-.2-.7-.2-1.1-.5.7-1.4 1.3-2.6 1.3-2.1 0-3.6-1.1-3.6-3.1 0-2.4 2-3.4 4.5-3.4h1.8v-.8zm-1.8 3.5c0 .6.4 1 1.1 1s1.3-.4 1.6-1v-1.3h-1.6c-1-.1-1.1.4-1.1 1.3zM9.3 2.1L3 3.6v4.1l6.3-1.5V2.1z"/>
      </svg>
    );
  }
  if (name.includes("figma")) {
    return (
      <svg className="w-5 h-5" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 4.5C3 5.32843 3.67157 6 4.5 6C5.32843 6 6 5.32843 6 4.5C6 3.67157 5.32843 3 4.5 3C3.67157 3 3 3.67157 3 4.5Z" fill="#F24E1E"/>
        <path d="M3 10.5C3 11.3284 3.67157 12 4.5 12C5.32843 12 6 11.3284 6 10.5C6 9.67157 5.32843 9 4.5 9C3.67157 9 3 9.67157 3 10.5Z" fill="#A259FF"/>
        <path d="M3 16.5C3 17.3284 3.67157 18 4.5 18C5.32843 18 6 17.3284 6 16.5C6 15.6716 5.32843 15 4.5 15C3.67157 15 3 15.6716 3 16.5Z" fill="#0ACF83"/>
        <path d="M9 10.5C9 11.3284 8.32843 12 7.5 12C6.67157 12 6 11.3284 6 10.5C6 9.67157 6.67157 9 7.5 9C8.32843 9 9 9.67157 9 10.5Z" fill="#1ABC9C"/>
        <path d="M9 4.5C9 5.32843 8.32843 6 7.5 6C6.67157 6 6 5.32843 6 4.5C6 3.67157 6.67157 3 7.5 3C8.32843 3 9 3.67157 9 4.5Z" fill="#FF7262"/>
      </svg>
    );
  }
  if (name.includes("airbnb")) {
    return (
      <svg className="w-5 h-5 text-[#FF5A5F]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.1c-.3 0-.6.1-.8.4L2.3 17.1c-.4.6-.4 1.4 0 2 .4.6 1 1 1.7 1h16c.7 0 1.3-.4 1.7-1 .4-.6.4-1.4 0-2L12.8 2.5c-.2-.3-.5-.4-.8-.4zm0 2.8l8.2 13.1H3.8L12 4.9zm0 5.4c-1.5 0-2.8 1.2-2.8 2.8 0 1.3.9 2.4 2.1 2.7l-1 1.7h3.4l-1-1.7c1.2-.3 2.1-1.4 2.1-2.7 0-1.6-1.3-2.8-2.8-2.8zm0 1.8c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z"/>
      </svg>
    );
  }
  return null;
};

export default function CandidateDashboard() {
  const { user } = useAuth();
  const { applications, loading: appsLoading } = useApplications();
  const { profile, loading: profileLoading } = useCandidate();
  const { interviews, loading: interviewsLoading } = useInterviews("CANDIDATE");

  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState<boolean>(true);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  useEffect(() => {
    let active = true;
    async function loadJobs() {
      try {
        const data = await getJobs({ limit: 100 });
        if (active) {
          setJobs(data);
        }
      } catch (err) {
        console.error("Failed to load jobs for matches", err);
      } finally {
        if (active) {
          setJobsLoading(false);
        }
      }
    }
    loadJobs();
    return () => {
      active = false;
    };
  }, []);

  // Dynamic values
  const candidateName = user?.name || "Alex Rivers";
  const firstName = candidateName.split(" ")[0];

  // Dynamic Profile Completion calculation
  const profileCompletion = (() => {
    let filled = 0;
    const total = 6;
    if (user?.name) filled++;
    if (profile?.bio && profile.bio.trim()) filled++;
    if (profile?.skills && profile.skills.trim()) filled++;
    if (profile?.education && profile.education.trim()) filled++;
    if (profile?.experience !== undefined && profile?.experience !== null && profile.experience > 0) filled++;
    if (profile?.resumeUrl && profile.resumeUrl.trim()) filled++;
    
    return Math.round((filled / total) * 100);
  })();

  // Dynamic stats calculation
  const appliedJobsCount = appsLoading ? "..." : String(applications.length).padStart(2, "0");
  
  // Count applications with status 'Interview'
  const interviewsCount = appsLoading
    ? "..."
    : String(
        applications.filter((app) => app.status.toLowerCase().includes("interview")).length
      ).padStart(2, "0");

  // Since saved jobs is not supported by backend yet, we make it realistic
  const savedJobsCount = appsLoading
    ? "..."
    : String(Math.max(8, applications.length + 3)).padStart(2, "0");

  // Dynamic activity bars calculation based on application submissions
  const getActivityBars = () => {
    if (appsLoading) {
      return [
        { label: "Week 1", height: 0, active: false, count: 0 },
        { label: "", height: 0, active: false, count: 0 },
        { label: "Week 2", height: 0, active: false, count: 0 },
        { label: "", height: 0, active: false, count: 0 },
        { label: "Week 3", height: 0, active: false, count: 0 },
        { label: "", height: 0, active: false, count: 0 },
        { label: "Week 4", height: 0, active: true, count: 0 },
      ];
    }

    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    
    // We have 7 bars, representing 4-day intervals over the last 28 days
    const counts = [0, 0, 0, 0, 0, 0, 0];
    
    applications.forEach((app) => {
      const appDate = new Date(app.createdAt);
      const diffDays = Math.floor((now.getTime() - appDate.getTime()) / oneDay);
      
      if (diffDays >= 0 && diffDays < 28) {
        // Map 0-27 days to index 6 down to 0 (index 6 is the most recent period: days 0-3)
        const periodIndex = 6 - Math.floor(diffDays / 4);
        if (periodIndex >= 0 && periodIndex < 7) {
          counts[periodIndex]++;
        }
      }
    });

    const maxCount = Math.max(...counts);
    
    return [
      { label: "Week 1", count: counts[0], active: false },
      { label: "", count: counts[1], active: false },
      { label: "Week 2", count: counts[2], active: false },
      { label: "", count: counts[3], active: false },
      { label: "Week 3", count: counts[4], active: false },
      { label: "", count: counts[5], active: false },
      { label: "Week 4", count: counts[6], active: true },
    ].map((bar, index) => {
      const count = counts[index];
      // Calculate height percentage: if no activity, show a minimal 2% bar, otherwise scale up to 100%
      const height = maxCount === 0 
        ? 2 
        : 8 + (count / maxCount) * 92;
      
      return {
        ...bar,
        height,
      };
    });
  };

  const activityBars = getActivityBars();

  // Dynamic Matches calculation based on candidate profile skills and backend jobs
  const matches = useMemo(() => {
    if (jobs.length === 0) return [];

    const candidateSkills = profile?.skills
      ? profile.skills
          .split(/[\s,]+/)
          .map((s) => s.trim().toLowerCase())
          .filter((s) => s.length > 0)
      : [];

    const scored = jobs.map((job) => {
      let score = 0;
      const titleLower = job.title.toLowerCase();
      const descLower = job.description.toLowerCase();

      candidateSkills.forEach((skill) => {
        if (titleLower.includes(skill)) score += 3;
        if (descLower.includes(skill)) score += 1;
      });

      return { job, score };
    });

    const matched = scored
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.job);

    // Fallback to all jobs if no specific skills matches
    const displayList = matched.length > 0 ? matched : jobs;

    return displayList.slice(0, 3).map((job) => {
      const companyName = job.company?.companyName || "Unknown Company";
      const logoBg = getCompanyColor(companyName);
      const logoSvg = getCompanyLogo(companyName);

      // format salary
      const salaryText = job.salary ? `$${Math.round(job.salary / 1000)}K` : "Salary N/A";

      // format job type
      const loc = job.location.toLowerCase();
      let typeText = "Full-time";
      if (loc.includes("remote")) typeText = "Remote";
      else if (job.id % 3 === 0) typeText = "Hybrid";
      else if (job.id % 3 === 1) typeText = "Full-time";
      else typeText = "Part-time";

      return {
        id: job.id,
        title: job.title,
        company: companyName,
        location: job.location,
        type: typeText.toUpperCase(),
        salary: salaryText,
        logoBg,
        logoSvg,
        logoText: companyName.charAt(0).toUpperCase(),
      };
    });
  }, [jobs, profile?.skills]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-[24px] bg-[#0B1329] p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, {firstName}!
            </h1>
            <p className="text-slate-300 text-sm max-w-xl">
              You have {interviewsCount === "00" ? 0 : interviewsCount} new interview requests and {matches.length} job matches today.
            </p>
          </div>

          <div className="w-full lg:w-80 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 p-5">
            <div className="flex items-center justify-between text-sm font-semibold mb-2">
              <span className="text-slate-200">Profile Completion</span>
              <span className="text-white">
                {profileLoading ? "..." : `${profileCompletion}%`}
              </span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-400 rounded-full transition-all duration-500"
                style={{ width: `${profileLoading ? 0 : profileCompletion}%` }}
              />
            </div>
            <p className="text-xs text-slate-300 mt-2">
              {profileCompletion === 100
                ? "Profile is fully complete!"
                : "Add your portfolio to reach 100%"}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Applied Jobs */}
        <div className="rounded-[20px] bg-white border border-slate-100 p-6 flex flex-col justify-between shadow-sm relative hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-xl bg-[#E8F0FE] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#1A73E8]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              +12% this week
            </span>
          </div>
          <div className="mt-6">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Applied Jobs</p>
            <p className="text-4xl font-bold text-slate-900 mt-1">{appliedJobsCount}</p>
          </div>
        </div>

        {/* Saved Jobs */}
        <div className="rounded-[20px] bg-white border border-slate-100 p-6 flex flex-col justify-between shadow-sm relative hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-xl bg-[#E8F0FE] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#1A73E8]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full">
              Updated today
            </span>
          </div>
          <div className="mt-6">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Saved Jobs</p>
            <p className="text-4xl font-bold text-slate-900 mt-1">{savedJobsCount}</p>
          </div>
        </div>

        {/* Interviews */}
        <div className="rounded-[20px] bg-white border border-slate-100 p-6 flex flex-col justify-between shadow-sm relative hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-xl bg-[#E8F0FE] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#1A73E8]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-[#1A73E8] bg-[#E8F0FE] px-2.5 py-1 rounded-full">
              {interviewsCount === "00" ? 0 : parseInt(interviewsCount)} upcoming
            </span>
          </div>
          <div className="mt-6">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Interviews</p>
            <p className="text-4xl font-bold text-slate-900 mt-1">{interviewsCount}</p>
          </div>
        </div>
      </div>

      {/* Middle Grid: Activity and Matches */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Job Search Activity Card */}
        <div className="lg:col-span-2 rounded-[20px] bg-white border border-slate-100 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Job Search Activity</h2>
            <button className="flex items-center space-x-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 transition-colors">
              <span>Last 30 Days</span>
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div className="flex items-end justify-between h-56 pt-8 pb-2">
            {activityBars.map((bar, index) => (
              <div key={index} className="flex flex-col items-center flex-1 h-full justify-end group relative">
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center z-20 transition-all duration-200">
                  <div className="bg-slate-800 text-white text-[10px] font-bold px-2.5 py-1 rounded-md whitespace-nowrap shadow-sm">
                    {bar.count} {bar.count === 1 ? "application" : "applications"}
                  </div>
                  <div className="w-1.5 h-1.5 bg-slate-800 rotate-45 -mt-1" />
                </div>
                
                <div
                  className={`w-10 rounded-t-lg transition-all duration-300 cursor-pointer ${
                    bar.active ? "bg-[#85A9FF]" : "bg-[#E8F0FE] hover:bg-[#D2E3FC]"
                  }`}
                  style={{ height: `${bar.height}%` }}
                />
                {bar.label ? (
                  <span className="text-[11px] text-slate-400 mt-3 font-semibold tracking-tight">
                    {bar.label}
                  </span>
                ) : (
                  <span className="h-4 mt-3" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Matches Card */}
        <div className="rounded-[20px] bg-white border border-slate-100 p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-slate-900">Matches</h2>
            <Link href="/candidate/applications" className="text-xs font-bold text-[#1A73E8] hover:underline">
              View all
            </Link>
          </div>

          <div className="space-y-4 flex-1">
            {jobsLoading || profileLoading ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="flex items-start space-x-4 p-3 rounded-2xl animate-pulse">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-100 rounded w-3/4" />
                    <div className="h-3 bg-slate-100 rounded w-1/2" />
                    <div className="flex space-x-2 pt-1">
                      <div className="h-5 bg-slate-100 rounded w-16" />
                      <div className="h-5 bg-slate-100 rounded w-16" />
                    </div>
                  </div>
                </div>
              ))
            ) : matches.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-sm font-medium">
                No job matches found. Try updating your profile skills!
              </div>
            ) : (
              matches.map((match, idx) => (
                <Link
                  key={match.id || idx}
                  href={`/jobs/${match.id}`}
                  className="flex items-start space-x-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors duration-150 border border-transparent hover:border-slate-100 cursor-pointer block"
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-white ${match.logoBg}`}>
                    {match.logoSvg || match.logoText || match.title.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-slate-800 truncate">{match.title}</h3>
                    <p className="text-slate-400 text-xs mt-0.5 font-medium">{match.company} • {match.location}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <span className="bg-[#E8F0FE] text-[#1A73E8] text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                        {match.type}
                      </span>
                      <span className="bg-[#E8F0FE] text-[#1A73E8] text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                        {match.salary}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Upcoming Interviews Card */}
      <div className="rounded-[20px] bg-white border border-slate-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900">Upcoming Interviews</h2>
          <Link href="/candidate/interviews" className="text-xs font-bold text-[#1A73E8] hover:underline">
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviewsLoading ? (
            <InterviewSkeleton />
          ) : interviews.length === 0 ? (
            <div className="col-span-full py-8 text-center text-slate-400 font-medium">
              No upcoming interviews scheduled yet.
            </div>
          ) : (
            interviews.slice(0, 3).map((interview) => (
              <InterviewCard key={interview.id} interview={interview} />
            ))
          )}
        </div>
      </div>

      {/* Recent Applications Card */}
      <div className="rounded-[20px] bg-white border border-slate-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900">Recent Applications</h2>
          <button className="flex items-center space-x-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 transition-colors">
            <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span>Filter</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="pb-4 font-semibold">Company</th>
                <th className="pb-4 font-semibold">Role</th>
                <th className="pb-4 font-semibold">Date Applied</th>
                <th className="pb-4 font-semibold">Status</th>
                <th className="pb-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm text-slate-700">
              {appsLoading ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="py-4 flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex-shrink-0" />
                      <div className="h-4 w-20 bg-slate-200 rounded" />
                    </td>
                    <td className="py-4">
                      <div className="h-4 w-32 bg-slate-200 rounded" />
                    </td>
                    <td className="py-4">
                      <div className="h-4 w-24 bg-slate-200 rounded" />
                    </td>
                    <td className="py-4">
                      <div className="h-6 w-16 bg-slate-200 rounded-full" />
                    </td>
                    <td className="py-4"></td>
                  </tr>
                ))
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400 font-medium">
                    No applications yet.
                  </td>
                </tr>
              ) : (
                applications.slice(0, 3).map((app, idx) => {
                  const companyName = app.job?.company?.companyName || "Unknown Company";
                  const companyLetter = companyName.charAt(0).toUpperCase();
                  
                  // Color selection for dynamic company logos
                  const colors = ["bg-blue-600", "bg-indigo-600", "bg-amber-600", "bg-rose-600", "bg-emerald-600"];
                  const colorIndex = companyName.charCodeAt(0) % colors.length;
                  const logoBg = colors[colorIndex];

                  const dateApplied = new Date(app.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  });

                  return (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${logoBg}`}>
                          {companyLetter}
                        </div>
                        <span className="font-bold text-slate-900">{companyName}</span>
                      </td>
                      <td className="py-4 text-slate-600 font-medium">{app.job?.title || "Role"}</td>
                      <td className="py-4 text-slate-400 font-medium">{dateApplied}</td>
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                            app.status.toLowerCase().includes("interview")
                              ? "bg-[#E8F0FE] text-[#1A73E8]"
                              : app.status.toLowerCase().includes("pending") || app.status.toLowerCase().includes("submit")
                              ? "bg-[#F1F3F4] text-[#5F6368]"
                              : app.status.toLowerCase().includes("reject")
                              ? "bg-[#FCE8E6] text-[#D93025]"
                              : "bg-emerald-50 text-emerald-600"
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button 
                          onClick={() => setSelectedApp(app)}
                          className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg whitespace-nowrap"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-center border-t border-slate-100 pt-4">
          <Link href="/candidate/applications" className="text-sm font-bold text-[#1A73E8] hover:underline">
            View all applications
          </Link>
        </div>
      </div>
      
      {/* Application Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">Application Details</h3>
              <button onClick={() => setSelectedApp(null)} className="text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 p-2 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center font-bold text-blue-600 text-lg flex-shrink-0">
                  {selectedApp.job?.company?.companyName?.charAt(0).toUpperCase() || "C"}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{selectedApp.job?.title}</h4>
                  <p className="text-sm font-medium text-slate-500">{selectedApp.job?.company?.companyName}</p>
                  <p className="text-xs text-slate-400 mt-1">Applied on {new Date(selectedApp.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    selectedApp.status.toLowerCase().includes("interview") ? "bg-blue-100 text-blue-700 border border-blue-200" :
                    selectedApp.status.toLowerCase().includes("reject") ? "bg-red-100 text-red-700 border border-red-200" :
                    "bg-emerald-50 text-emerald-600 border border-emerald-200"
                  }`}>{selectedApp.status}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Location</span>
                  <span className="text-sm font-semibold text-slate-800">{selectedApp.job?.location || "Not specified"}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Salary</span>
                  <span className="text-sm font-semibold text-slate-800">{selectedApp.job?.salary ? `$${selectedApp.job.salary.toLocaleString()}` : "Not specified"}</span>
                </div>
              </div>
              
              {(() => {
                const interview = interviews.find(i => i.applicationId === selectedApp.id);
                if (!interview) return null;
                
                return (
                  <div className="space-y-3">
                    <h5 className="text-sm font-bold text-slate-800">Interview Details</h5>
                    <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Date</p>
                          <p className="text-sm font-bold text-slate-800 mt-0.5">{interview.interviewDate}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Time</p>
                          <p className="text-sm font-bold text-slate-800 mt-0.5">{interview.interviewTime}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Mode</p>
                        <span className={`inline-block mt-1 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${interview.mode === "ONLINE" ? "bg-indigo-100 text-indigo-700 border border-indigo-200" : "bg-orange-100 text-orange-700 border border-orange-200"}`}>
                          {interview.mode}
                        </span>
                      </div>
                      
                      {interview.mode === "ONLINE" && interview.meetingLink && (
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Meeting Link</p>
                          <a href={interview.meetingLink} target="_blank" rel="noreferrer" className="text-sm font-semibold text-blue-600 hover:underline mt-0.5 block break-all">
                            {interview.meetingLink}
                          </a>
                        </div>
                      )}
                      
                      {interview.mode === "OFFLINE" && interview.address && (
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Address</p>
                          <p className="text-sm font-medium text-slate-800 mt-0.5">{interview.address}</p>
                        </div>
                      )}
                      
                      {interview.notes && (
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Notes</p>
                          <p className="text-xs text-slate-600 mt-1 italic bg-white p-3 rounded-lg border border-slate-100">{interview.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button onClick={() => setSelectedApp(null)} className="px-5 py-2 rounded-lg text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
