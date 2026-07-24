"use client";

import { useAuth } from "@/hooks/useAuth";
import NotificationBell from "../notifications/NotificationBell";


interface HeaderProps {
  role: "candidate" | "recruiter" | "admin";
}

export default function Header({ role }: HeaderProps) {
  const { user } = useAuth();

  return (
    <header className="h-16 border-b border-slate-200 px-6 flex items-center justify-between bg-white sticky top-0 z-40">
      {/* LEFT / MIDDLE PART */}
      <div className="flex items-center space-x-6 flex-1 max-w-lg">
        {role === "recruiter" && (
          <span className="font-extrabold text-slate-800 tracking-tight text-base hidden sm:inline mr-2">
            EliteRecruit
          </span>
        )}
        

      </div>

      {/* RIGHT WIDGETS */}
      <div className="flex items-center space-x-4 pl-4">

        {role === "admin" && (
          <button className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm">
            Create New
          </button>
        )}

        {/* Dynamic header icons */}
        <div className="flex items-center space-x-4 text-slate-500">
          <NotificationBell />

          
          {role === "candidate" && (
            <button className="hover:text-slate-800 cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
          )}

          {(role === "recruiter" || role === "admin") && (
            <button className="hover:text-slate-800 cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          )}

          {(role === "candidate" || role === "admin") && (
            <button className="hover:text-slate-800 cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          )}
        </div>

        {/* User avatar display */}
        <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center font-bold text-slate-500 text-xs relative">
          <img
            src="/alex_rivers.png"
            alt={user?.name || "Alex Rivers"}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <span className="absolute inset-0 flex items-center justify-center bg-slate-100 font-bold text-slate-500 text-xs select-none -z-10">
            {user?.name?.charAt(0) || "U"}
          </span>
        </div>
      </div>
    </header>
  );
}