import { useState, useEffect, useCallback } from "react";
import {
  getProfile,
  createProfile,
  updateProfile,
  uploadResume,
  uploadProfilePicture,
  parseResume,
} from "@/services/candidate.service";
import { CandidateProfile } from "@/types/candidate";
import toast from "react-hot-toast";

export function useCandidate() {
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [profileExists, setProfileExists] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);

  const fetchProfile = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    setError(null);
    try {
      const data = await getProfile();
      setProfile(data);
      setProfileExists(true);
    } catch (err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string }; status?: number }; message?: string };
      // If profile is not found (404), it means profile does not exist yet.
      if (errorObj.response && errorObj.response.status === 404) {
        setProfile(null);
        setProfileExists(false);
      } else {
        const errMsg = errorObj.response?.data?.message || errorObj.message || "Failed to load profile";
        setError(errMsg);
      }
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  const saveProfile = useCallback(
    async (formData: Omit<CandidateProfile, "id" | "userId" | "user">) => {
      setLoading(true);
      setError(null);
      try {
        if (profileExists) {
          const res = await updateProfile(formData);
          setProfile(res.updatedProfile);
          toast.success(res.message || "Profile updated successfully!");
        } else {
          const res = await createProfile(formData);
          setProfile(res.profile);
          setProfileExists(true);
          toast.success(res.message || "Profile created successfully!");
        }
        return true;
      } catch (err: unknown) {
        const errorObj = err as { response?: { data?: { message?: string } }; message?: string };
        const errMsg = errorObj.response?.data?.message || errorObj.message || "Failed to save profile";
        setError(errMsg);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [profileExists]
  );

  const uploadResumeFile = useCallback(async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const res = await uploadResume(formData);
      
      // If profile exists, update local state resumeUrl
      if (profileExists && profile) {
        setProfile({
          ...profile,
          resumeUrl: res.url,
        });
      } else {
        // If profile doesn't exist, we construct a skeleton profile with the resumeUrl
        // so that it can be submitted when saving profile
        setProfile((prev) => {
          if (prev) {
            return { ...prev, resumeUrl: res.url };
          }
          return {
            id: 0,
            userId: 0,
            skills: "",
            education: "",
            experience: 0,
            resumeUrl: res.url,
          };
        });
      }

      toast.success("Resume uploaded successfully!");
      return res.url;
    } catch (err: unknown) {
      // Error toast is already displayed by Axios interceptor
      throw err;
    } finally {
      setUploading(false);
    }
  }, [profileExists, profile]);

  const uploadProfilePicFile = useCallback(async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadProfilePicture(formData);
      
      if (profileExists && profile) {
        setProfile({ ...profile, profilePicture: res.url });
      }
      toast.success("Profile picture updated!");
      return res.url;
    } catch (err: unknown) {
      throw err;
    } finally {
      setUploading(false);
    }
  }, [profileExists, profile]);

  const parseResumeFile = useCallback(async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await parseResume(formData);
      toast.success("Resume parsed successfully!");
      return res.parsedData;
    } catch (err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } } };
      toast.error(errorObj.response?.data?.message || "Failed to parse resume");
      throw err;
    }
  }, []);

  useEffect(() => {
    // Avoid calling setState synchronously during the layout/render/effect loop
    const timer = setTimeout(() => {
      fetchProfile();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchProfile]);

  return {
    profile,
    loading,
    error,
    profileExists,
    uploading,
    refetch: () => fetchProfile(true),
    saveProfile,
    uploadResumeFile,
    uploadProfilePicFile,
    parseResumeFile,
    setProfile,
  };
}
