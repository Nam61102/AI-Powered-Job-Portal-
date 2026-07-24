export type InterviewMode = "ONLINE" | "OFFLINE";
export type InterviewStatus = "SCHEDULED" | "COMPLETED" | "CANCELLED" | "RESCHEDULED";

export interface Interview {
  id: number;
  applicationId: number;
  interviewDate: string;
  interviewTime: string;
  mode: InterviewMode;
  meetingLink?: string;
  address?: string;
  notes?: string;
  status: InterviewStatus;
  createdAt?: string;
  updatedAt?: string;
  
  // Relations
  application?: {
    id: number;
    candidate: {
      name: string;
      email: string;
    };
    job: {
      title: string;
      company: {
        companyName: string;
      };
    };
  };
}

export interface InterviewResponse {
  message?: string;
  interview?: Interview;
  interviews?: Interview[];
}

export interface ScheduleInterviewPayload {
  applicationId: number;
  interviewDate: string;
  interviewTime: string;
  mode: InterviewMode;
  meetingLink?: string;
  address?: string;
  notes?: string;
}

export interface UpdateInterviewPayload {
  interviewDate?: string;
  interviewTime?: string;
  mode?: InterviewMode;
  meetingLink?: string;
  address?: string;
  notes?: string;
}
