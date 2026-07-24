import api from "@/lib/axios";
import {
  CandidateProfile,
  CandidateProfileResponse,
  CandidateProfileUpdateResponse,
  ResumeUploadResponse,
} from "@/types/candidate";

export const getProfile = async (): Promise<CandidateProfile> => {
  const res = await api.get<CandidateProfile>("/candidate/profile");
  return res.data;
};

export const createProfile = async (
  data: Omit<CandidateProfile, "id" | "userId" | "user">
): Promise<CandidateProfileResponse> => {
  const res = await api.post<CandidateProfileResponse>("/candidate/profile", data);
  return res.data;
};

export const updateProfile = async (
  data: Omit<CandidateProfile, "id" | "userId" | "user">
): Promise<CandidateProfileUpdateResponse> => {
  const res = await api.put<CandidateProfileUpdateResponse>("/candidate/profile", data);
  return res.data;
};

export const uploadResume = async (
  formData: FormData
): Promise<ResumeUploadResponse> => {
  const res = await api.post<ResumeUploadResponse>("/upload/resume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const uploadProfilePicture = async (
  formData: FormData
): Promise<{ message: string; url: string }> => {
  const res = await api.post<{ message: string; url: string }>("/upload/profile-picture", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const parseResume = async (
  formData: FormData
): Promise<{ message: string; parsedData: { skills: string; education: string } }> => {
  const res = await api.post<{ message: string; parsedData: { skills: string; education: string } }>("/upload/parse-resume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};