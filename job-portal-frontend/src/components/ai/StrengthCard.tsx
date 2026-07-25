import React from "react";

interface StrengthCardProps {
  strengths: string[];
}

export default function StrengthCard({ strengths }: StrengthCardProps) {
  if (!strengths || strengths.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <span className="text-emerald-500 text-lg">✔</span>
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest text-[11px]">
          Key Strengths
        </h3>
      </div>
      <ul className="space-y-3 text-slate-600 text-sm font-medium">
        {strengths.map((str, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <span className="text-emerald-500 flex-shrink-0 mt-0.5">✓</span>
            <span>{str}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
