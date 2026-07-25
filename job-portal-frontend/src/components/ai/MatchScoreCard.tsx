import React from "react";

interface MatchScoreCardProps {
  score: number;
  level: string;
}

export default function MatchScoreCard({ score, level }: MatchScoreCardProps) {
  // Enforce score ranges and colors
  const getColorClasses = (val: number) => {
    if (val >= 90) {
      return {
        text: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        ring: "stroke-emerald-500",
        track: "stroke-emerald-100",
      };
    } else if (val >= 75) {
      return {
        text: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-200",
        ring: "stroke-blue-500",
        track: "stroke-blue-100",
      };
    } else if (val >= 60) {
      return {
        text: "text-orange-500",
        bg: "bg-orange-50",
        border: "border-orange-200",
        ring: "stroke-orange-500",
        track: "stroke-orange-100",
      };
    } else {
      return {
        text: "text-red-600",
        bg: "bg-red-50",
        border: "border-red-200",
        ring: "stroke-red-500",
        track: "stroke-red-100",
      };
    }
  };

  const colors = getColorClasses(score);
  const strokeDashoffset = 251.2 - (251.2 * score) / 100;

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-center p-6 rounded-2xl border ${colors.bg} ${colors.border} gap-6 shadow-sm`}>
      {/* SVG Score Circle */}
      <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r="40"
            className={`${colors.track} fill-transparent`}
            strokeWidth="8"
          />
          <circle
            cx="48"
            cy="48"
            r="40"
            className={`${colors.ring} fill-transparent transition-all duration-1000 ease-out`}
            strokeWidth="8"
            strokeDasharray="251.2"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-2xl font-black text-slate-800">
          {score}%
        </span>
      </div>

      {/* Match details metadata */}
      <div className="text-center sm:text-left space-y-1">
        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
          ATS Matching Result
        </div>
        <h2 className={`text-xl font-extrabold tracking-tight ${colors.text}`}>
          {level}
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Based on matching key resume items against job qualifications.
        </p>
      </div>
    </div>
  );
}
