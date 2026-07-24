import React from "react";

interface JobSearchProps {
  value: string;
  onChange: (val: string) => void;
}

export default function JobSearch({ value, onChange }: JobSearchProps) {
  return (
    <div className="relative w-full shadow-sm rounded-xl">
      <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </span>
      <input
        type="text"
        placeholder="Search jobs by title, company, or keywords..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200/80 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 placeholder-slate-400 transition-all font-semibold"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 font-bold text-xs"
        >
          ✕
        </button>
      )}
    </div>
  );
}
