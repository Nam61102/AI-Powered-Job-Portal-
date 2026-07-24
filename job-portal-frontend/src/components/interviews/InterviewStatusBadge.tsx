import React from "react";
import { InterviewStatus } from "@/types/interview";

interface InterviewStatusBadgeProps {
  status: InterviewStatus;
}

export default function InterviewStatusBadge({ status }: InterviewStatusBadgeProps) {
  const getBadgeStyle = () => {
    switch (status) {
      case "SCHEDULED":
        return "bg-blue-50 text-blue-600 border border-blue-200";
      case "COMPLETED":
        return "bg-emerald-50 text-emerald-600 border border-emerald-200";
      case "RESCHEDULED":
        return "bg-orange-50 text-orange-600 border border-orange-200";
      case "CANCELLED":
        return "bg-red-50 text-red-600 border border-red-200";
      default:
        return "bg-slate-50 text-slate-600 border border-slate-200";
    }
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider ${getBadgeStyle()}`}>
      {status}
    </span>
  );
}
