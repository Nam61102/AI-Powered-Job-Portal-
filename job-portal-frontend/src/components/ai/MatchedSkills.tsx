import React from "react";

interface MatchedSkillsProps {
  skills: string[];
}

export default function MatchedSkills({ skills }: MatchedSkillsProps) {
  if (!skills || skills.length === 0) {
    return (
      <div className="text-slate-400 text-xs font-semibold py-2">
        No exact matching skills found.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 pt-1">
      {skills.map((skill, idx) => (
        <span
          key={idx}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-sm"
        >
          <span className="text-[10px]">✓</span>
          {skill}
        </span>
      ))}
    </div>
  );
}
