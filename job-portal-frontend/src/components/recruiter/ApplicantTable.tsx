import React, { useState } from "react";
import { Applicant } from "@/types/recruiter";
import StatusDropdown from "./StatusDropdown";
import InterviewModal from "../interviews/InterviewModal";
import { useInterviews } from "@/hooks/useInterviews";
import { InterviewFormData } from "../interviews/InterviewForm";

interface ApplicantTableProps {
  applicants: Applicant[];
  onStatusChange: (applicationId: number, status: string) => Promise<void>;
}

export default function ApplicantTable({ applicants, onStatusChange }: ApplicantTableProps) {
  const [selectedAppId, setSelectedAppId] = useState<number | null>(null);
  const { scheduleInterview } = useInterviews();

  if (applicants.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200/80 p-8 text-center shadow-sm">
        <p className="text-sm font-semibold text-slate-500">No applicants yet.</p>
      </div>
    );
  }

  const handleScheduleSubmit = async (data: InterviewFormData) => {
    if (!selectedAppId) return;
    await scheduleInterview({
      applicationId: selectedAppId,
      ...data,
    });
    await onStatusChange(selectedAppId, "INTERVIEW");
    setSelectedAppId(null);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm">
      <div className="overflow-x-auto">
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
            {applicants.map((app) => {
              const initials = app.candidate.name.charAt(0).toUpperCase();
              const profile = app.candidate.candidateProfile;

              return (
                <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
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
                    {profile ? `${profile.experience} Years` : "N/A"}
                  </td>
                  <td className="py-4">
                    <div className="flex items-center space-x-3">
                      <StatusDropdown
                        currentStatus={app.status}
                        onStatusChange={(status) => onStatusChange(app.id, status)}
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
                    {profile?.resumeUrl ? (
                      <a
                        href={profile.resumeUrl}
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
              );
            })}
          </tbody>
        </table>
      </div>

      <InterviewModal
        isOpen={selectedAppId !== null}
        onClose={() => setSelectedAppId(null)}
        onSubmit={handleScheduleSubmit}
      />
    </div>
  );
}
