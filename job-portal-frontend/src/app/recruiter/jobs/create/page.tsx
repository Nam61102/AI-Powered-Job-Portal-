"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import JobForm from "@/components/recruiter/JobForm";
import { JobFormData } from "@/types/recruiter";
import { createJob } from "@/services/recruiter.service";
import { useCompany } from "@/hooks/useCompany";
import toast from "react-hot-toast";

export default function CreateJobPage() {
  const router = useRouter();
  const { company, companies, loading: companyLoading } = useCompany();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: JobFormData) => {
    if (!company) {
      toast.error("You must create a company profile first before posting a job.");
      router.push("/recruiter/company");
      return;
    }

    setIsSubmitting(true);
    try {
      await createJob({ ...data, companyId: data.companyId || company.id });
      toast.success("Job posted successfully!");
      router.push("/recruiter/jobs");
    } catch (error: any) {
      toast.error(error.message || "Failed to post job");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (companyLoading) {
    return <div className="p-8 text-center text-slate-500 font-bold">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Post a New Job
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Fill out the details below to publish a new job listing for {company?.companyName}.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
        <JobForm onSubmit={handleSubmit} isLoading={isSubmitting} companies={companies} />
      </div>
    </div>
  );
}
