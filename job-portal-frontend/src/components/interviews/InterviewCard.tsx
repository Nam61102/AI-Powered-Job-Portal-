import React from "react";
import { Interview } from "@/types/interview";
import InterviewStatusBadge from "./InterviewStatusBadge";
import JoinMeetingButton from "./JoinMeetingButton";

interface InterviewCardProps {
  interview: Interview;
}

export default function InterviewCard({ interview }: InterviewCardProps) {
  const job = interview.application?.job;
  const company = job?.company;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1">
            {job?.title || "Unknown Job"}
          </h3>
          <p className="text-xs text-slate-500 font-medium">{company?.companyName || "Unknown Company"}</p>
        </div>
        <InterviewStatusBadge status={interview.status} />
      </div>

      <div className="space-y-3 mb-5">
        <div className="flex items-center text-sm text-slate-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2 text-slate-400 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
          </svg>
          <span className="font-medium">{new Date(interview.interviewDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-sm text-slate-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2 text-slate-400 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">{interview.interviewTime}</span>
        </div>
        
        {interview.mode === "OFFLINE" && interview.address && (
          <div className="flex items-start text-sm text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2 mt-0.5 text-slate-400 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span className="font-medium flex-1">{interview.address}</span>
          </div>
        )}
        
        {interview.notes && (
          <div className="flex items-start text-sm text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2 mt-0.5 text-slate-400 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <span className="text-xs">{interview.notes}</span>
          </div>
        )}
      </div>

      {interview.mode === "ONLINE" && interview.meetingLink && interview.status === "SCHEDULED" && (
        <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end">
          <JoinMeetingButton meetingLink={interview.meetingLink} />
        </div>
      )}
    </div>
  );
}
