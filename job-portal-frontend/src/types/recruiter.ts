import { Job } from "./job";

export interface RecruiterJob extends Job {
  _count?: {
    applications: number;
  };
}

export type ApplicationStatus = 
  | "PENDING" 
  | "SCREENING" 
  | "SHORTLISTED" 
  | "INTERVIEW" 
  | "ACCEPTED" 
  | "REJECTED" 
  | "HIRED";

export interface CandidateProfile {
  id: number;
  skills: string;
  education: string;
  experience: number;
  resumeUrl: string;
}

export interface ApplicantUser {
  id: number;
  name: string;
  email: string;
  candidateProfile: CandidateProfile | null;
}

export interface Applicant {
  id: number;
  status: string;
  jobId: number;
  candidateId: number;
  createdAt: string;
  candidate: ApplicantUser;
}

export interface JobFormData {
  title: string;
  description: string;
  salary: number | "";
  location: string;
  companyId?: number;
}
