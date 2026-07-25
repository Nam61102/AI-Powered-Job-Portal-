import React from "react";

interface WeaknessCardProps {
  weaknesses: string[];
}

export default function WeaknessCard({ weaknesses }: WeaknessCardProps) {
  if (!weaknesses || weaknesses.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <span className="text-amber-500 text-lg">⚠</span>
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest text-[11px]">
          Areas for Improvement
        </h3>
      </div>
      <ul className="space-y-3 text-slate-600 text-sm font-medium">
        {weaknesses.map((weak, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <span className="text-amber-500 flex-shrink-0 mt-0.5">⚠</span>
            <span>{weak}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
