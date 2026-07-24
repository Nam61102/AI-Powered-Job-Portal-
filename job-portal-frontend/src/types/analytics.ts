export interface AnalyticsOverview {
  totalJobs: number;
  activeJobs: number;
  closedJobs: number;
  totalApplications: number;
  pending: number;
  shortlisted: number;
  rejected: number;
  hired: number;
}

export interface TopJob {
  id: string | number | null;
  title: string | null;
  applications: number;
}

export interface RecentApplication {
  candidateName: string;
  jobTitle: string;
  status: string;
  appliedAt: string;
}

export interface MonthlyApplications {
  month: string;
  count: number;
}

export interface AnalyticsResponse {
  overview: AnalyticsOverview;
  topJob: TopJob;
  recentApplications: RecentApplication[];
  applicationsPerMonth: MonthlyApplications[];
}
