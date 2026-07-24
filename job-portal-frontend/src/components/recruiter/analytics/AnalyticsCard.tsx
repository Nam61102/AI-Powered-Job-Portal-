import React from "react";

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  accentClassName?: string;
}

export default function AnalyticsCard({
  title,
  value,
  subtitle,
  icon,
  accentClassName = "bg-blue-50 text-blue-600",
}: AnalyticsCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${accentClassName}`}>
          {icon}
        </div>
      </div>
      {subtitle ? <p className="mt-3 text-sm text-slate-500">{subtitle}</p> : null}
    </div>
  );
}
