import { User } from "./candidate";

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

export interface Application {
  id: number;
  status: string;
  jobId: number;
  candidateId: number;
  createdAt: string;
  job: Job;
  candidate?: User;
}
