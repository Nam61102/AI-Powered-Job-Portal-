import React from "react";

interface MissingSkillsProps {
  skills: string[];
}

export default function MissingSkills({ skills }: MissingSkillsProps) {
  if (!skills || skills.length === 0) {
    return (
      <div className="text-slate-400 text-xs font-semibold py-2">
        No missing requirements detected.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 pt-1">
      {skills.map((skill, idx) => (
        <span
          key={idx}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200/80 shadow-sm"
        >
          <span className="text-[10px]">⚠</span>
          {skill}
        </span>
      ))}
    </div>
  );
}
