export interface Company {
  id: number;
  companyName: string;
  website: string;
  logo: string | null;
  userId: number;
}

export interface Job {
  id: number;
  title: string;
  description: string;
  salary: number;
  location: string;
  createdAt: string;
  companyId: number;
  company: Company;
}

export type JobResponse = Job;
export type JobsResponse = Job[];
