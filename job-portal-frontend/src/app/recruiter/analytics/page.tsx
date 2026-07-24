"use client";

import { useMemo } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import AnalyticsCards from "@/components/recruiter/analytics/AnalyticsCards";
import ApplicationChart from "@/components/recruiter/analytics/ApplicationChart";
import TopJobCard from "@/components/recruiter/analytics/TopJobCard";
import RecentApplicationsTable from "@/components/recruiter/analytics/RecentApplicationsTable";
import AnalyticsSkeleton from "@/components/recruiter/analytics/AnalyticsSkeleton";
import EmptyAnalytics from "@/components/recruiter/analytics/EmptyAnalytics";
import toast from "react-hot-toast";

export default function RecruiterAnalyticsPage() {
  const { analytics, loading, error, refetch } = useAnalytics();

  const hasAnalytics = Boolean(analytics && analytics.overview.totalJobs > 0);

  const summary = useMemo(() => {
    if (!analytics) {
      return null;
    }

    return {
      overview: analytics.overview,
      topJob: analytics.topJob,
      recentApplications: analytics.recentApplications,
      applicationsPerMonth: analytics.applicationsPerMonth,
    };
  }, [analytics]);

  if (error) {
    toast.error(error);
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Recruiter Analytics</h1>
          <p className="text-sm text-slate-500">Track hiring performance and recruitment statistics.</p>
        </div>
        <AnalyticsSkeleton />
      </div>
    );
  }

  if (!analytics || !summary) {
    return (
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Recruiter Analytics</h1>
          <p className="text-sm text-slate-500">Track hiring performance and recruitment statistics.</p>
        </div>
        <EmptyAnalytics />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Recruiter Analytics</h1>
          <p className="mt-1 text-sm text-slate-500">Track hiring performance and recruitment statistics.</p>
        </div>
        <button
          type="button"
          onClick={() => refetch()}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          Refresh
        </button>
      </div>

      <AnalyticsCards overview={summary.overview} />

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <ApplicationChart data={summary.applicationsPerMonth} />
        <TopJobCard topJob={summary.topJob} />
      </div>

      <RecentApplicationsTable applications={summary.recentApplications} />

      {!hasAnalytics ? <EmptyAnalytics /> : null}
    </div>
  );
}
