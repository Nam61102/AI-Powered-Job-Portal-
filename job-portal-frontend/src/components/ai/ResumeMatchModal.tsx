import React, { useEffect } from "react";
import { ResumeMatchResult } from "@/types/ai";
import MatchScoreCard from "./MatchScoreCard";
import MatchedSkills from "./MatchedSkills";
import MissingSkills from "./MissingSkills";
import StrengthCard from "./StrengthCard";
import WeaknessCard from "./WeaknessCard";
import SuggestionCard from "./SuggestionCard";
import RecommendedCourses from "./RecommendedCourses";
import ResumeMatchEmpty from "./ResumeMatchEmpty";

interface ResumeMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ResumeMatchResult | null;
}

export default function ResumeMatchModal({ isOpen, onClose, data }: ResumeMatchModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle Escape key close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#fafbfc] rounded-2xl border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col transform transition-all duration-300 scale-100">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xl">📊</span>
            <h2 className="text-base font-extrabold text-slate-800 tracking-tight leading-tight">
              Resume Matching Report
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all font-black text-sm"
          >
            ✕
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow">
          {!data ? (
            <ResumeMatchEmpty />
          ) : (
            <>
              {/* Score card component */}
              <MatchScoreCard score={data.score} level={data.level} />

              {/* Summary text */}
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 space-y-2">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest text-[11px]">
                  Evaluation Summary
                </h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  {data.summary}
                </p>
              </div>

              {/* Skills breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 space-y-3">
                  <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-widest text-[11px] border-b border-emerald-50 pb-2">
                    Matched Skills
                  </h3>
                  <MatchedSkills skills={data.matchedSkills} />
                </div>
                <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 space-y-3">
                  <h3 className="text-xs font-bold text-rose-800 uppercase tracking-widest text-[11px] border-b border-rose-50 pb-2">
                    Missing Skills
                  </h3>
                  <MissingSkills skills={data.missingSkills} />
                </div>
              </div>

              {/* Strengths & Deficiencies */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StrengthCard strengths={data.strengths} />
                <WeaknessCard weaknesses={data.weaknesses} />
              </div>

              {/* Suggestions */}
              <SuggestionCard suggestions={data.suggestions} />

              {/* Learning resource options */}
              <RecommendedCourses courses={data.recommendedCourses} />
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end px-6 py-4 bg-white border-t border-slate-100 gap-3 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
