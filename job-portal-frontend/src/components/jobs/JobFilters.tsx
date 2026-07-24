import React from "react";

interface JobFiltersProps {
  location: string;
  setLocation: (val: string) => void;
  minSalary: string;
  setMinSalary: (val: string) => void;
  experience: string;
  setExperience: (val: string) => void;
  jobType: string;
  setJobType: (val: string) => void;
  onClear: () => void;
}

export default function JobFilters({
  location,
  setLocation,
  minSalary,
  setMinSalary,
  experience,
  setExperience,
  jobType,
  setJobType,
  onClear,
}: JobFiltersProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm space-y-6 flex-shrink-0 w-full lg:w-64 h-fit">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="font-bold text-slate-800 text-sm tracking-tight flex items-center gap-1.5">
          <span>⚙️</span> Filters
        </h3>
        <button
          onClick={onClear}
          className="text-xs font-semibold text-blue-600 hover:underline hover:text-blue-700"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        {/* Location Filter */}
        <div className="space-y-2">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Location
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-xs">
              📍
            </span>
            <input
              type="text"
              placeholder="e.g. Pune, San Francisco"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-lg bg-[#f0f2f5] border-0 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 placeholder-slate-400 transition-all font-medium"
            />
          </div>
        </div>

        {/* Min Salary Filter */}
        <div className="space-y-2">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Min Salary
          </label>
          <select
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#f0f2f5] border-0 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 transition-all font-semibold"
          >
            <option value="">Any Salary</option>
            <option value="50000">$50,000+</option>
            <option value="80000">$80,000+</option>
            <option value="100000">$100,000+</option>
            <option value="120000">$120,000+</option>
            <option value="150000">$150,000+</option>
          </select>
        </div>

        {/* Experience Level Filter */}
        <div className="space-y-2">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Experience
          </label>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#f0f2f5] border-0 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 transition-all font-semibold"
          >
            <option value="">Any Experience</option>
            <option value="entry">Entry Level (0-2 years)</option>
            <option value="mid">Mid Level (3-5 years)</option>
            <option value="senior">Senior Level (5+ years)</option>
          </select>
        </div>

        {/* Job Type Filter */}
        <div className="space-y-2">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Job Type
          </label>
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#f0f2f5] border-0 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 transition-all font-semibold"
          >
            <option value="">Any Type</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
      </div>
    </div>
  );
}
