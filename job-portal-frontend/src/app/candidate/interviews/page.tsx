"use client";

import React from "react";
import { useInterviews } from "@/hooks/useInterviews";
import InterviewDetails from "@/components/interviews/InterviewDetails";
import InterviewSkeleton from "@/components/interviews/InterviewSkeleton";
import InterviewEmpty from "@/components/interviews/InterviewEmpty";

export default function CandidateInterviewsPage() {
  const { interviews, loading, error } = useInterviews("CANDIDATE");

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">My Interviews</h1>
        <div className="space-y-6">
          <InterviewSkeleton />
          <InterviewSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">My Interviews</h1>
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200">
          <p className="font-semibold text-sm">Error loading interviews: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight leading-tight">My Interviews</h1>
        <p className="text-slate-500 font-medium text-sm mt-1">View your upcoming and past interview schedules.</p>
      </div>

      {interviews.length === 0 ? (
        <InterviewEmpty message="You don't have any interviews scheduled yet." />
      ) : (
        <div className="space-y-6">
          {interviews.map((interview) => (
            <InterviewDetails key={interview.id} interview={interview} />
          ))}
        </div>
      )}
    </div>
  );
}
