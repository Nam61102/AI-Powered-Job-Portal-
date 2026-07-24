"use client";

import { useAuth } from "@/hooks/useAuth";
import { useCandidate } from "@/hooks/useCandidate";
import { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Image from "next/image";
import toast from "react-hot-toast";

interface ProfileFormData {
  bio: string;
  skills: string;
  education: string;
  experience: number;
  resumeUrl: string;
  workExperiences: { company: string; role: string; startDate: string; endDate: string; description: string }[];
  certifications: { name: string; issuer: string; issueDate: string }[];
  languages: { name: string; proficiency: string }[];
  socialLinks: { linkedIn: string; github: string; portfolio: string };
}

export default function ProfilePage() {
  const { user } = useAuth();
  const {
    profile,
    loading,
    error,
    uploading,
    saveProfile,
    uploadResumeFile,
    uploadProfilePicFile,
    parseResumeFile,
  } = useCandidate();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const picInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<ProfileFormData>({
    defaultValues: {
      bio: "",
      skills: "",
      education: "",
      experience: 0,
      resumeUrl: "",
      workExperiences: [],
      certifications: [],
      languages: [],
      socialLinks: { linkedIn: "", github: "", portfolio: "" },
    },
  });

  const { fields: workFields, append: appendWork, remove: removeWork } = useFieldArray({ control, name: "workExperiences" });
  const { fields: certFields, append: appendCert, remove: removeCert } = useFieldArray({ control, name: "certifications" });
  const { fields: langFields, append: appendLang, remove: removeLang } = useFieldArray({ control, name: "languages" });

  const resumeUrl = watch("resumeUrl");
  
  // Profile completeness calc
  const [progress, setProgress] = useState(0);
  
  const wBio = watch("bio");
  const wSkills = watch("skills");
  const wEdu = watch("education");
  const wExp = watch("experience");
  const wRes = watch("resumeUrl");

  useEffect(() => {
    let filled = 0;
    const total = 6;
    if (user?.name) filled++;
    if (wBio) filled++;
    if (wSkills) filled++;
    if (wEdu) filled++;
    if (wExp > 0) filled++;
    if (wRes) filled++;
    
    setProgress(Math.round((filled / total) * 100));
  }, [user?.name, wBio, wSkills, wEdu, wExp, wRes]);

  // Populate form fields when profile is fetched
  useEffect(() => {
    if (profile) {
      setValue("bio", profile.bio || "");
      setValue("skills", profile.skills || "");
      setValue("education", profile.education || "");
      setValue("experience", profile.experience || 0);
      setValue("resumeUrl", profile.resumeUrl || "");
      setValue("workExperiences", profile.workExperiences || []);
      setValue("certifications", profile.certifications || []);
      setValue("languages", profile.languages || []);
      setValue("socialLinks", profile.socialLinks || { linkedIn: "", github: "", portfolio: "" });
    }
  }, [profile, setValue]);

  const onSubmit = async (data: ProfileFormData) => {
    await saveProfile({
      bio: data.bio,
      skills: data.skills,
      education: data.education,
      experience: Number(data.experience),
      resumeUrl: data.resumeUrl,
      workExperiences: data.workExperiences,
      certifications: data.certifications,
      languages: data.languages,
      socialLinks: data.socialLinks,
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const uploadedUrl = await uploadResumeFile(file);
      setValue("resumeUrl", uploadedUrl);
      
      // Trigger parsing
      toast.success("Extracting skills and education...");
      const parsedData = await parseResumeFile(file);
      if (parsedData.skills) setValue("skills", parsedData.skills);
      if (parsedData.education) setValue("education", parsedData.education);
      
    } catch (err) {
      console.error("Failed to upload resume file:", err);
    }
  };
  
  const handlePicChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await uploadProfilePicFile(file);
    } catch (err) {
      console.error("Failed to upload profile picture:", err);
    }
  };

  const triggerFileUpload = () => fileInputRef.current?.click();
  const triggerPicUpload = () => picInputRef.current?.click();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title & Progress Section */}
      <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              My Profile
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Update your professional information, education, experience, and resume.
            </p>
          </div>
          
          <div className="w-full md:w-64 bg-slate-50 p-4 rounded-lg border border-slate-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Profile Completeness</span>
              <span className="text-xs font-bold text-blue-600">{progress}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {loading && !profile ? (
        /* Profile Loading Skeleton */
        <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200/80 shadow-sm space-y-6 animate-pulse">
          <div className="h-10 bg-slate-100 rounded-lg"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 md:p-8 rounded-xl border border-slate-200/80 shadow-sm space-y-6">
          
          {/* Avatar & Basic Info */}
          <div className="flex flex-col md:flex-row gap-6 border-b border-slate-100 pb-6">
            <div className="flex flex-col items-center gap-3">
              <div className="relative group w-24 h-24 rounded-full border-4 border-slate-50 overflow-hidden shadow-sm cursor-pointer" onClick={triggerPicUpload}>
                {profile?.profilePicture ? (
                  <Image src={profile.profilePicture} alt="Profile" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 text-3xl font-bold uppercase">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs font-bold">Edit</span>
                </div>
              </div>
              <input type="file" ref={picInputRef} onChange={handlePicChange} accept="image/*" className="hidden" />
            </div>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">Full Name</label>
                <input type="text" value={user?.name || ""} disabled className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-100 text-sm text-slate-500 cursor-not-allowed font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">Email Address</label>
                <input type="text" value={user?.email || ""} disabled className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-100 text-sm text-slate-500 cursor-not-allowed font-medium" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Professional Summary (Bio)</label>
                <textarea placeholder="Write a short pitch about yourself..." {...register("bio")} className="w-full px-4 py-3 rounded-lg bg-[#f0f2f5] border-0 text-sm focus:ring-2 focus:ring-blue-500/20 text-slate-800 h-24 resize-none font-medium" />
              </div>
            </div>
          </div>

          {/* Rest of Profile Fields Form */}
          <div className="space-y-6 border-b border-slate-100 pb-6">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider text-[11px]">Candidate Profile</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Education</label>
                <input type="text" placeholder="e.g. B.S. in Computer Science" className="w-full px-4 py-3 rounded-lg bg-[#f0f2f5] border-0 text-sm focus:ring-2 focus:ring-blue-500/20 text-slate-800 font-medium" required {...register("education")} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Total Years of Experience</label>
                <input type="number" min="0" placeholder="e.g. 5" className="w-full px-4 py-3 rounded-lg bg-[#f0f2f5] border-0 text-sm focus:ring-2 focus:ring-blue-500/20 text-slate-800 font-medium" required {...register("experience")} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Skills</label>
              <textarea placeholder="e.g. React, TypeScript, Next.js, Node.js" className="w-full px-4 py-3 rounded-lg bg-[#f0f2f5] border-0 text-sm focus:ring-2 focus:ring-blue-500/20 text-slate-800 h-28 resize-none font-medium" required {...register("skills")} />
            </div>
          </div>

          {/* Work Experience Section */}
          <div className="space-y-4 border-b border-slate-100 pb-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider text-[11px]">Work Experience Timeline</h3>
              <button type="button" onClick={() => appendWork({ company: "", role: "", startDate: "", endDate: "", description: "" })} className="text-xs font-bold text-blue-600 hover:text-blue-700">+ Add Experience</button>
            </div>
            {workFields.map((field, index) => (
              <div key={field.id} className="p-4 bg-slate-50 border border-slate-100 rounded-lg space-y-4 relative group">
                <button type="button" onClick={() => removeWork(index)} className="absolute top-4 right-4 text-xs font-bold text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">Remove</button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Company</label>
                    <input type="text" {...register(`workExperiences.${index}.company` as const)} className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-sm" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Role</label>
                    <input type="text" {...register(`workExperiences.${index}.role` as const)} className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-sm" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Start Date</label>
                    <input type="month" {...register(`workExperiences.${index}.startDate` as const)} className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-sm" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">End Date</label>
                    <input type="month" {...register(`workExperiences.${index}.endDate` as const)} className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-sm" placeholder="Leave empty if current" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                    <textarea {...register(`workExperiences.${index}.description` as const)} className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-sm h-20 resize-none" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Certifications & Languages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-slate-100 pb-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider text-[11px]">Certifications</h3>
                <button type="button" onClick={() => appendCert({ name: "", issuer: "", issueDate: "" })} className="text-xs font-bold text-blue-600 hover:text-blue-700">+ Add</button>
              </div>
              {certFields.map((field, index) => (
                <div key={field.id} className="p-4 bg-slate-50 border border-slate-100 rounded-lg space-y-3 relative group">
                  <button type="button" onClick={() => removeCert(index)} className="absolute top-2 right-2 text-xs font-bold text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">Remove</button>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Name</label>
                    <input type="text" {...register(`certifications.${index}.name` as const)} className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-sm" required />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Issuer</label>
                      <input type="text" {...register(`certifications.${index}.issuer` as const)} className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-sm" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Date</label>
                      <input type="month" {...register(`certifications.${index}.issueDate` as const)} className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider text-[11px]">Languages</h3>
                <button type="button" onClick={() => appendLang({ name: "", proficiency: "Native" })} className="text-xs font-bold text-blue-600 hover:text-blue-700">+ Add</button>
              </div>
              {langFields.map((field, index) => (
                <div key={field.id} className="p-4 bg-slate-50 border border-slate-100 rounded-lg space-y-3 relative group flex items-end gap-2">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Language</label>
                    <input type="text" {...register(`languages.${index}.name` as const)} className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-sm" required />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Proficiency</label>
                    <select {...register(`languages.${index}.proficiency` as const)} className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-sm">
                      <option value="Basic">Basic</option>
                      <option value="Conversational">Conversational</option>
                      <option value="Fluent">Fluent</option>
                      <option value="Native">Native</option>
                    </select>
                  </div>
                  <button type="button" onClick={() => removeLang(index)} className="px-2 py-2 text-red-500 hover:bg-red-50 rounded-lg">🗑️</button>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4 border-b border-slate-100 pb-6">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider text-[11px]">Social & Portfolio Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">LinkedIn URL</label>
                <input type="url" {...register("socialLinks.linkedIn")} className="w-full px-3 py-2 rounded-lg bg-[#f0f2f5] border-0 text-sm focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">GitHub URL</label>
                <input type="url" {...register("socialLinks.github")} className="w-full px-3 py-2 rounded-lg bg-[#f0f2f5] border-0 text-sm focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Portfolio Website</label>
                <input type="url" {...register("socialLinks.portfolio")} className="w-full px-3 py-2 rounded-lg bg-[#f0f2f5] border-0 text-sm focus:ring-2 focus:ring-blue-500/20" />
              </div>
            </div>
          </div>

          {/* Resume Section */}
          <div className="bg-[#f8fafc] p-5 rounded-xl border border-slate-200/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Professional Resume</h4>
              {resumeUrl ? (
                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-slate-500">Current Resume:</span>
                  <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline flex items-center gap-1">View Uploaded Resume 📄</a>
                </div>
              ) : (
                <p className="text-[11px] text-slate-400 font-medium">No resume uploaded yet. Upload a PDF or Word document.</p>
              )}
            </div>

            <div>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf,.doc,.docx" className="hidden" />
              <button type="button" onClick={triggerFileUpload} disabled={uploading} className="px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-75 disabled:cursor-not-allowed">
                {uploading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
                    <span>Uploading/Parsing...</span>
                  </>
                ) : (
                  <>
                    <span>📤</span>
                    <span>Upload Resume</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {error && <div className="text-xs text-red-600 font-semibold bg-red-50 border border-red-100 p-3.5 rounded-lg">{error}</div>}

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
            <button type="submit" disabled={isSubmitting || uploading} className="px-6 py-3 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm focus:outline-none flex items-center space-x-2 disabled:opacity-75 disabled:cursor-not-allowed">
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save Profile</span>
              )}
            </button>
          </div>

        </form>
      )}
    </div>
  );
}
