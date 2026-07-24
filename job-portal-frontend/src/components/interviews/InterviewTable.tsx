import React from "react";
import { Interview } from "@/types/interview";
import InterviewStatusBadge from "./InterviewStatusBadge";

interface InterviewTableProps {
  interviews: Interview[];
  onEdit: (interview: Interview) => void;
  onCancel: (id: number) => void;
  isCancellingId: number | null;
}

export default function InterviewTable({ interviews, onEdit, onCancel, isCancellingId }: InterviewTableProps) {
  if (interviews.length === 0) {
    return null; // Parent component should handle empty state
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <th className="pb-3 font-semibold">Candidate</th>
              <th className="pb-3 font-semibold">Job Title</th>
              <th className="pb-3 font-semibold">Date & Time</th>
              <th className="pb-3 font-semibold">Mode</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-600">
            {interviews.map((interview) => {
              const candidate = interview.application?.candidate;
              const job = interview.application?.job;
              const initials = candidate?.name ? candidate.name.charAt(0).toUpperCase() : "?";

              return (
                <tr key={interview.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-4 flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold border border-slate-200 shrink-0">
                      {initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 leading-tight">{candidate?.name || "Unknown Candidate"}</h4>
                      <span className="text-[10px] text-slate-400">{candidate?.email || "Unknown Email"}</span>
                    </div>
                  </td>
                  <td className="py-4 font-medium text-slate-700">
                    {job?.title || "Unknown Job"}
                  </td>
                  <td className="py-4">
                    <div className="font-medium text-slate-800">{new Date(interview.interviewDate).toLocaleDateString()}</div>
                    <div className="text-[10px] text-slate-400">{interview.interviewTime}</div>
                  </td>
                  <td className="py-4 font-medium text-slate-500">
                    <span className="inline-flex items-center">
                      {interview.mode === "ONLINE" ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>
                          Online
                        </>
                      ) : (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
                          Offline
                        </>
                      )}
                    </span>
                  </td>
                  <td className="py-4">
                    <InterviewStatusBadge status={interview.status} />
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEdit(interview)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Interview"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm("Are you sure you want to cancel this interview?")) {
                            onCancel(interview.id);
                          }
                        }}
                        disabled={isCancellingId === interview.id || interview.status === "CANCELLED" || interview.status === "COMPLETED"}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Cancel Interview"
                      >
                        {isCancellingId === interview.id ? (
                          <svg className="animate-spin h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
