import React from "react";
import { Interview } from "@/types/interview";
import InterviewStatusBadge from "./InterviewStatusBadge";
import JoinMeetingButton from "./JoinMeetingButton";

interface InterviewDetailsProps {
  interview: Interview;
}

export default function InterviewDetails({ interview }: InterviewDetailsProps) {
  const job = interview.application?.job;
  const company = job?.company;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-1">{job?.title || "Unknown Job"}</h2>
          <p className="text-sm font-medium text-slate-500">{company?.companyName || "Unknown Company"}</p>
        </div>
        <InterviewStatusBadge status={interview.status} />
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Schedule Details</h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-slate-700">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mr-3 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">{new Date(interview.interviewDate).toLocaleDateString()}</p>
                  <p className="text-xs text-slate-500">Date</p>
                </div>
              </div>
              
              <div className="flex items-center text-sm text-slate-700">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mr-3 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">{interview.interviewTime}</p>
                  <p className="text-xs text-slate-500">Time</p>
                </div>
              </div>

              <div className="flex items-center text-sm text-slate-700">
                <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mr-3 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">{interview.mode === "ONLINE" ? "Online" : "In-Person"}</p>
                  <p className="text-xs text-slate-500">Mode</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Location & Instructions</h3>
            
            {interview.mode === "ONLINE" && interview.meetingLink ? (
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4">
                <p className="text-sm text-slate-700 font-medium mb-3">This is an online interview. Please join the meeting at the scheduled time.</p>
                <div className="flex items-center">
                  <JoinMeetingButton meetingLink={interview.meetingLink} />
                </div>
              </div>
            ) : interview.mode === "OFFLINE" && interview.address ? (
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                <p className="text-sm text-slate-700 font-medium mb-1">Office Location:</p>
                <p className="text-sm text-slate-600">{interview.address}</p>
              </div>
            ) : null}

            {interview.notes && (
              <div className="mt-4 bg-orange-50/50 border border-orange-100 rounded-xl p-4">
                <h4 className="text-xs font-bold text-orange-800 mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                  </svg>
                  Note from Recruiter
                </h4>
                <p className="text-sm text-orange-700">{interview.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
