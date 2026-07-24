import React from "react";

interface EmptyJobsProps {
  onResetFilters?: () => void;
}

export default function EmptyJobs({ onResetFilters }: EmptyJobsProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-12 text-center shadow-sm max-w-xl mx-auto my-8 flex flex-col items-center justify-center space-y-4">
      <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-4xl shadow-inner animate-bounce duration-1000">
        🔍
      </div>
      <h3 className="text-lg font-bold text-slate-800">No Jobs Found</h3>
      <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
        We couldn't find any job opportunities that match your current search query or filter selection. Try adjusting your parameters or clearing the filters.
      </p>
      {onResetFilters && (
        <button
          onClick={onResetFilters}
          className="mt-2 px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm focus:outline-none"
        >
          Reset All Filters
        </button>
      )}
    </div>
  );
}
