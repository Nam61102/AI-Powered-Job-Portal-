import React from "react";
import AnalyticsCard from "@/components/recruiter/analytics/AnalyticsCard";
import { AnalyticsOverview } from "@/types/analytics";

interface AnalyticsCardsProps {
  overview: AnalyticsOverview;
}

const cards = [
  {
    key: "totalJobs",
    title: "Total Jobs",
    getValue: (overview: AnalyticsOverview) => overview.totalJobs,
    subtitle: "Jobs posted by your company",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    accentClassName: "bg-blue-50 text-blue-600",
  },
  {
    key: "activeJobs",
    title: "Active Jobs",
    getValue: (overview: AnalyticsOverview) => overview.activeJobs,
    subtitle: "Currently receiving applications",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    accentClassName: "bg-emerald-50 text-emerald-600",
  },
  {
    key: "closedJobs",
    title: "Closed Jobs",
    getValue: (overview: AnalyticsOverview) => overview.closedJobs,
    subtitle: "Jobs no longer active",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    accentClassName: "bg-slate-100 text-slate-700",
  },
  {
    key: "applications",
    title: "Applications",
    getValue: (overview: AnalyticsOverview) => overview.totalApplications,
    subtitle: "Total applications received",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
    ),
    accentClassName: "bg-violet-50 text-violet-600",
  },
  {
    key: "pending",
    title: "Pending",
    getValue: (overview: AnalyticsOverview) => overview.pending,
    subtitle: "Awaiting review",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    accentClassName: "bg-amber-50 text-amber-600",
  },
  {
    key: "shortlisted",
    title: "Shortlisted",
    getValue: (overview: AnalyticsOverview) => overview.shortlisted,
    subtitle: "Qualified candidates",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    accentClassName: "bg-emerald-50 text-emerald-600",
  },
  {
    key: "rejected",
    title: "Rejected",
    getValue: (overview: AnalyticsOverview) => overview.rejected,
    subtitle: "Disqualified candidates",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    accentClassName: "bg-rose-50 text-rose-600",
  },
  {
    key: "hired",
    title: "Hired",
    getValue: (overview: AnalyticsOverview) => overview.hired,
    subtitle: "Successful hires",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    accentClassName: "bg-indigo-50 text-indigo-600",
  },
];

export default function AnalyticsCards({ overview }: AnalyticsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <AnalyticsCard
          key={card.key}
          title={card.title}
          value={card.getValue(overview)}
          subtitle={card.subtitle}
          icon={card.icon}
          accentClassName={card.accentClassName}
        />
      ))}
    </div>
  );
}
