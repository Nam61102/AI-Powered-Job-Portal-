import React, { useState } from "react";
import { ApplicationStatus } from "@/types/recruiter";

interface StatusDropdownProps {
  currentStatus: string;
  onStatusChange: (newStatus: string) => Promise<void>;
}

export default function StatusDropdown({ currentStatus, onStatusChange }: StatusDropdownProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const statuses: ApplicationStatus[] = [
    "PENDING",
    "SCREENING",
    "SHORTLISTED",
    "INTERVIEW",
    "ACCEPTED",
    "REJECTED",
    "HIRED"
  ];

  const getBadgeStyle = (status: string) => {
    switch (status.toUpperCase()) {
      case "SHORTLISTED":
      case "ACCEPTED":
      case "HIRED":
        return "bg-emerald-50 text-emerald-600 border border-emerald-100";
      case "SCREENING":
      case "INTERVIEW":
        return "bg-blue-50 text-blue-600 border border-blue-100";
      case "REJECTED":
        return "bg-red-50 text-red-500 border border-red-100";
      default:
        return "bg-slate-100 text-slate-600 border border-slate-200/60";
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val !== currentStatus) {
      try {
        setIsUpdating(true);
        await onStatusChange(val);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  return (
    <div className="relative inline-block">
      <select
        value={currentStatus.toUpperCase()}
        onChange={handleChange}
        disabled={isUpdating}
        className={`px-2.5 py-1 rounded-full text-[9px] font-bold appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 pr-6 ${getBadgeStyle(currentStatus)} disabled:opacity-50`}
      >
        {statuses.map((status) => (
          <option key={status} value={status} className="bg-white text-slate-800">
            {status}
          </option>
        ))}
      </select>
      {/* Dropdown chevron */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-slate-400">
        <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
}
