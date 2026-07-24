"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useCandidate } from "@/hooks/useCandidate";

function CandidateSidebarProfile({ user }: { user: any }) {
  const { profile } = useCandidate();
  
  // Extracting job role from skills or using a fallback
  const firstSkill = profile?.skills ? profile.skills.split(',')[0].trim() : "Candidate";
  const jobRole = firstSkill; // Using the first skill as a generic job role / headline. We can also just use "Candidate" if none.

  return (
    <div className="flex flex-col items-center py-4 border-b border-slate-100">
      <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center font-bold text-slate-500 text-lg mb-2 relative">
        {profile?.profilePicture ? (
          <img
            src={profile.profilePicture}
            alt={user?.name || "Candidate"}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center bg-slate-100 font-bold text-slate-500 text-lg select-none -z-10">
            {user?.name?.charAt(0) || "C"}
          </span>
        )}
      </div>
      <h3 className="font-bold text-slate-800 text-sm mt-2">
        {user?.name || "Candidate"}
      </h3>
      <p className="text-xs text-slate-400 mt-0.5 max-w-[200px] truncate px-2 text-center" title={jobRole}>
        {jobRole}
      </p>
    </div>
  );
}

interface SidebarProps {
  role: "candidate" | "recruiter" | "admin";
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  // Helper to check active state
  const isActive = (path: string) => pathname === path;

  // Active styles helper
  const linkStyle = (path: string) => {
    const base = "flex items-center space-x-3 -mx-5 px-7 py-3 text-sm font-semibold transition-all duration-150 relative";
    if (isActive(path)) {
      return `${base} bg-[#E8F0FE] text-[#0056cc] border-r-[3px] border-[#0056cc]`;
    }
    return `${base} text-slate-500 hover:text-slate-900 hover:bg-slate-50`;
  };

  if (role === "candidate") {
    return (
      <aside className="w-64 h-screen sticky top-0 border-r border-slate-200 bg-white flex flex-col justify-between p-5">
        <div className="space-y-6">
          {/* Logo */}
          <Link href="/" className="text-xl font-extrabold text-slate-900 tracking-tight block px-2">
            EliteTalent
          </Link>

          {/* Candidate Profile Panel */}
          <CandidateSidebarProfile user={user} />

          {/* Navigation Links */}
          <nav className="space-y-1">
            <Link href="/candidate/dashboard" className={linkStyle("/candidate/dashboard")}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span>Dashboard</span>
            </Link>
            <Link href="/jobs" className={linkStyle("/jobs")}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Find Jobs</span>
            </Link>
            <Link href="/candidate/applications" className={linkStyle("/candidate/applications")}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Applications</span>
            </Link>
            <a href="#" className="flex items-center space-x-3 -mx-5 px-7 py-3 text-sm font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-50">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>Messages</span>
            </a>
            <Link href="/candidate/profile" className={linkStyle("/candidate/profile")}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>My Profile</span>
            </Link>
          </nav>

          {/* Sidebar CTA */}
          <div className="pt-2">
            <button className="w-full py-2.5 rounded-lg text-xs font-bold text-white bg-[#0056cc] hover:bg-[#0044aa] transition-colors shadow-sm">
              Post Resume
            </button>
          </div>
        </div>

        {/* Bottom Panel */}
        <div className="space-y-1">
          <a href="#" className="flex items-center space-x-3 -mx-5 px-7 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-950 hover:bg-slate-50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Settings</span>
          </a>
          <a href="#" className="flex items-center space-x-3 -mx-5 px-7 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-950 hover:bg-slate-50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Help</span>
          </a>
          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 -mx-5 px-7 py-2.5 text-xs font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors text-left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    );
  }

  if (role === "recruiter") {
    return (
      <aside className="w-64 h-screen sticky top-0 border-r border-slate-200 bg-white flex flex-col justify-between p-5">
        <div className="space-y-6">
          {/* Recruiter Brand Logo Block */}
          <div className="flex items-center space-x-3 px-2">
            <div className="w-9 h-9 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800 leading-tight">Global Tech Solutions</h2>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Enterprise Plan</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 pt-4">
            <Link href="/recruiter/dashboard" className={linkStyle("/recruiter/dashboard")}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              <span>Dashboard</span>
            </Link>
            <Link href="/recruiter/jobs" className={linkStyle("/recruiter/jobs")}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <span>Active Jobs</span>
            </Link>
            <Link href="/recruiter/company" className={linkStyle("/recruiter/company")}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              <span>Company</span>
            </Link>
            <Link href="/recruiter/analytics" className={linkStyle("/recruiter/analytics")}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              <span>Analytics</span>
            </Link>
            <Link href="/recruiter/activity" className={linkStyle("/recruiter/activity")}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
              <span>Activity</span>
            </Link>

          </nav>
        </div>

        {/* Bottom Panel */}
        <div className="space-y-4">
          <button className="w-full py-2.5 rounded-lg text-xs font-bold text-blue-600 border border-blue-200 hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            <span>Invite Team</span>
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    );
  }

  // Admin Sidebar
  return (
    <aside className="w-64 h-screen sticky top-0 border-r border-slate-200 bg-white flex flex-col justify-between p-5">
      <div className="space-y-6">
        {/* Admin Brand Logo Block */}
        <div className="flex items-center space-x-3 px-2">
          <div className="w-9 h-9 rounded bg-slate-900 text-white flex items-center justify-center text-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800 leading-tight">Enterprise Portal</h2>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Global Admin</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1 pt-4">
          <Link href="/admin/users" className={linkStyle("/admin/users")}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            <span>Users</span>
          </Link>
          <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            <span>Jobs</span>
          </a>
          <Link href="/admin/dashboard" className={linkStyle("/admin/dashboard")}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
            <span>Revenue</span>
          </Link>
          <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            <span>Reports</span>
          </a>

        </nav>
      </div>

      {/* Bottom Panel */}
      <div className="space-y-4">
        <button className="w-full py-2.5 rounded-lg text-xs font-bold text-white bg-slate-950 hover:bg-slate-900 transition-colors shadow-sm flex items-center justify-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 11l7-7 7 7M5 19l7-7 7 7" /></svg>
          <span>Upgrade Plan</span>
        </button>
        <a href="#" className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-950 hover:bg-slate-50">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Help Center</span>
        </a>
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}