"use client";

import React, { useState } from "react";
import { useInterviews } from "@/hooks/useInterviews";
import InterviewTable from "@/components/interviews/InterviewTable";
import InterviewModal from "@/components/interviews/InterviewModal";
import InterviewEmpty from "@/components/interviews/InterviewEmpty";
import InterviewSkeleton from "@/components/interviews/InterviewSkeleton";
import { Interview } from "@/types/interview";
import { InterviewFormData } from "@/components/interviews/InterviewForm";

export default function RecruiterInterviewsPage() {
  const { interviews, loading, error, updateInterview, cancelInterview } = useInterviews("RECRUITER");
  
  const [editingInterview, setEditingInterview] = useState<Interview | null>(null);
  const [isCancellingId, setIsCancellingId] = useState<number | null>(null);

  const handleEditSubmit = async (data: InterviewFormData) => {
    if (!editingInterview) return;
    await updateInterview(editingInterview.id, data);
    setEditingInterview(null);
  };

  const handleCancelInterview = async (id: number) => {
    setIsCancellingId(id);
    try {
      await cancelInterview(id);
    } finally {
      setIsCancellingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Scheduled Interviews</h1>
        <InterviewSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Scheduled Interviews</h1>
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200">
          <p className="font-semibold text-sm">Error loading interviews: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight leading-tight">Scheduled Interviews</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Manage and track your candidate interviews</p>
        </div>
      </div>

      {interviews.length === 0 ? (
        <InterviewEmpty message="No interviews scheduled yet." />
      ) : (
        <InterviewTable 
          interviews={interviews} 
          onEdit={setEditingInterview} 
          onCancel={handleCancelInterview} 
          isCancellingId={isCancellingId}
        />
      )}

      {editingInterview && (
        <InterviewModal
          isOpen={true}
          onClose={() => setEditingInterview(null)}
          onSubmit={handleEditSubmit}
          initialData={editingInterview}
          title="Edit Interview"
        />
      )}
    </div>
  );
}
