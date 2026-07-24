import React from "react";

interface ApplyButtonProps {
  hasApplied: boolean;
  applyLoading: boolean;
  onApply: () => void;
  className?: string;
}

export default function ApplyButton({
  hasApplied,
  applyLoading,
  onApply,
  className = "",
}: ApplyButtonProps) {
  if (hasApplied) {
    return (
      <button
        disabled
        className={`px-6 py-3 rounded-lg text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 cursor-not-allowed flex items-center justify-center space-x-1.5 shadow-inner transition-all ${className}`}
      >
        <span>Applied ✓</span>
      </button>
    );
  }

  return (
    <button
      onClick={onApply}
      disabled={applyLoading}
      className={`px-6 py-3 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-75 disabled:cursor-not-allowed transition-all shadow-sm flex items-center justify-center space-x-2 ${className}`}
    >
      {applyLoading ? (
        <>
          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Applying...</span>
        </>
      ) : (
        <span>Apply Now</span>
      )}
    </button>
  );
}
