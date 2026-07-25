import React from "react";
import { RecommendedCourse } from "@/types/ai";

interface RecommendedCoursesProps {
  courses: RecommendedCourse[];
}

export default function RecommendedCourses({ courses }: RecommendedCoursesProps) {
  if (!courses || courses.length === 0) return null;

  const formatLink = (str: string) => {
    const trimmed = str.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return trimmed;
    }
    // Simple regex check for typical domain-like strings
    if (/^[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+([/?#].*)?$/.test(trimmed)) {
      return `https://${trimmed}`;
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <span className="text-indigo-500 text-lg">🎓</span>
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest text-[11px]">
          Recommended Learning Resources
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {courses.map((course, idx) => {
          const url = formatLink(course.resource);
          return (
            <div key={idx} className="bg-slate-50 border border-slate-100 rounded-lg p-3.5 flex flex-col justify-between space-y-2">
              <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold w-fit uppercase tracking-wider">
                {course.skill}
              </span>
              <div className="text-sm font-bold text-slate-800">
                {url ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 hover:underline transition-colors flex items-center gap-1.5"
                  >
                    <span>{course.resource}</span>
                    <span className="text-[10px] text-blue-400">🔗</span>
                  </a>
                ) : (
                  <span className="text-slate-700 font-semibold">{course.resource}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
