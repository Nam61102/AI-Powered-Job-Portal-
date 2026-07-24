import React from "react";
import JobCard from "./JobCard";
import JobSkeleton from "./JobSkeleton";
import EmptyJobs from "./EmptyJobs";
import { Job } from "@/types/job";

interface JobListProps {
  jobs: Job[];
  loading: boolean;
  onResetFilters?: () => void;
}

export default function JobList({ jobs, loading, onResetFilters }: JobListProps) {
  if (loading) {
    return <JobSkeleton count={3} />;
  }

  if (jobs.length === 0) {
    return <EmptyJobs onResetFilters={onResetFilters} />;
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
