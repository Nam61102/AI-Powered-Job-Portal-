export interface User {
  id: number;
  name: string;
  email: string;
  role: "candidate" | "recruiter" | "admin";
  isBlocked?: boolean;
}

export interface CandidateProfile {
  id: number;
  userId: number;
  skills: string;
  education: string;
  experience: number;
  resumeUrl: string;
  bio?: string;
  profilePicture?: string;
  workExperiences?: any[];
  certifications?: any[];
  languages?: any[];
  socialLinks?: any;
  user?: User;
}

export interface CandidateProfileResponse {
  message: string;
  profile: CandidateProfile;
}

export interface CandidateProfileUpdateResponse {
  message: string;
  updatedProfile: CandidateProfile;
}

export interface ResumeUploadResponse {
  message: string;
  url: string;
}
