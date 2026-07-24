"use client";

import { useState } from "react";
import { useApplications } from "@/hooks/useApplications";
import { useInterviews } from "@/hooks/useInterviews";
import { Application } from "@/types/application";

export default function ApplicationsPage() {
  const { applications, loading, error } = useApplications();
  const { interviews } = useInterviews("CANDIDATE");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
        {/* Title and Top Section */}
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Applied Jobs
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track and monitor the status of all your submitted job applications.
          </p>
        </div>

        {/* Applications Card/Table Container */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm">
          {loading ? (
            /* Skeletons */
            <div className="space-y-4">
              <div className="h-6 w-full bg-slate-100 animate-pulse rounded"></div>
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-14 w-full bg-slate-50/50 animate-pulse rounded border-b border-slate-100 flex items-center justify-between px-4">
                  <div className="flex items-center space-x-3 w-1/4">
                    <div className="w-8 h-8 rounded-lg bg-slate-200"></div>
                    <div className="h-4 w-20 bg-slate-200 rounded"></div>
                  </div>
                  <div className="h-4 w-32 bg-slate-200 rounded w-1/4"></div>
                  <div className="h-4 w-24 bg-slate-200 rounded w-1/4"></div>
                  <div className="h-6 w-16 bg-slate-200 rounded-full w-1/12"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-sm text-red-600 font-semibold bg-red-50 border border-red-100 p-4 rounded-lg text-center">
              {error}
            </div>
          ) : applications.length === 0 ? (
            /* Premium Empty State */
            <div className="py-16 flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-4">
              <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-3xl shadow-inner">
                ✉️
              </div>
              <h2 className="text-lg font-bold text-slate-800">
                No Applications Yet
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                {"You haven't submitted any job applications yet. Go to the jobs page to find and apply for roles that match your profile."}
              </p>
            </div>
          ) : (
            /* Applications Table */
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <th className="pb-3 font-semibold">Company</th>
                    <th className="pb-3 font-semibold">Role</th>
                    <th className="pb-3 font-semibold">Date Applied</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">&nbsp;</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-600">
                  {applications.map((app) => {
                    const companyName = app.job.company.companyName;
                    const companyLogoText = companyName.charAt(0).toUpperCase();

                    // Stable color picker based on company name
                    const colors = [
                      "bg-blue-600",
                      "bg-indigo-600",
                      "bg-amber-600",
                      "bg-rose-600",
                      "bg-emerald-600",
                    ];
                    const colorIndex = companyName.charCodeAt(0) % colors.length;
                    const logoBg = colors[colorIndex];

                    const formattedDate = new Date(app.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    });

                    let badgeStyle = "bg-slate-100 text-slate-600 border border-slate-200/60";
                    const statusLower = app.status.toLowerCase();
                    if (
                      statusLower.includes("interview") || 
                      statusLower === "shortlisted" || 
                      statusLower === "accepted"
                    ) {
                      badgeStyle = "bg-blue-50 text-blue-600 border border-blue-100";
                    } else if (
                      statusLower.includes("reject") || 
                      statusLower === "rejected"
                    ) {
                      badgeStyle = "bg-red-50 text-red-500 border border-red-100";
                    }

                    return (
                      <tr key={app.id} className="hover:bg-slate-50/50">
                        <td className="py-4 flex items-center space-x-3 font-bold text-slate-800">
                          <div className={`w-8 h-8 rounded-lg ${app.job.company.logo ? 'bg-transparent border border-slate-100' : logoBg} text-white flex items-center justify-center text-xs font-bold overflow-hidden flex-shrink-0`}>
                            {app.job.company.logo ? (
                              <img src={app.job.company.logo} alt={companyName} className="w-full h-full object-cover" />
                            ) : (
                              companyLogoText
                            )}
                          </div>
                          <span>{companyName}</span>
                        </td>
                        <td className="py-4 font-medium text-slate-700">{app.job.title}</td>
                        <td className="py-4 text-slate-400 font-medium">{formattedDate}</td>
                        <td className="py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase ${badgeStyle}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="py-4 text-right text-slate-400 font-bold">
                          <button 
                            onClick={() => setSelectedApp(app as any)}
                            className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg whitespace-nowrap"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
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
                const interview = interviews?.find(i => i.applicationId === selectedApp.id);
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
