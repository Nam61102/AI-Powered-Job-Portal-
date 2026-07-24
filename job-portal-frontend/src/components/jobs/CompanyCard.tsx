import React from "react";
import { Company } from "@/types/job";

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  const companyName = company?.companyName || "Unknown Company";
  const companyLogoText = companyName.charAt(0).toUpperCase();
  const website = company?.website || "#";

  // Stable color picker based on company name
  const colors = [
    "bg-blue-600",
    "bg-indigo-600",
    "bg-amber-600",
    "bg-rose-600",
    "bg-emerald-600",
  ];
  const colorIndex = companyName.charCodeAt(0) % colors.length;
  const logoBg = colors[colorIndex];

  // Professional biography fallback
  const getCompanyDescription = (name: string) => {
    return `${name} is an industry-leading company dedicated to building next-generation digital products, fostering workplace diversity, and engineering highly scalable enterprise solutions.`;
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm space-y-4">
      <div className="flex items-center space-x-3.5">
        {company?.logo ? (
          <img
            src={company.logo}
            alt={companyName}
            className="w-12 h-12 rounded-xl object-cover border border-slate-100 flex-shrink-0"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className={`w-12 h-12 rounded-xl text-white font-extrabold flex items-center justify-center text-sm flex-shrink-0 shadow-sm ${logoBg}`}>
            {companyLogoText}
          </div>
        )}
        
        <div>
          <h3 className="font-bold text-slate-800 text-sm">{companyName}</h3>
          {website !== "#" && (
            <a
              href={website.startsWith("http") ? website : `https://${website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1 mt-0.5"
            >
              Visit Website 🌐
            </a>
          )}
        </div>
      </div>

      <div className="border-t border-slate-100 pt-3">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
          About Company
        </h4>
        <p className="text-xs text-slate-500 leading-relaxed font-medium">
          {getCompanyDescription(companyName)}
        </p>
      </div>
    </div>
  );
}
