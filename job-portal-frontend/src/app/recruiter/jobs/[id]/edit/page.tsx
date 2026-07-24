"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import JobForm from "@/components/recruiter/JobForm";
import { JobFormData } from "@/types/recruiter";
import { updateJob, getJobById } from "@/services/recruiter.service";
import toast from "react-hot-toast";

export default function EditJobPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = Number(params.id);

  const [initialData, setInitialData] = useState<JobFormData | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const job = await getJobById(jobId);
        setInitialData({
          title: job.title,
          description: job.description,
          salary: job.salary,
          location: job.location,
        });
      } catch (error: any) {
        toast.error("Failed to load job details");
        router.push("/recruiter/jobs");
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchJob();
  }, [jobId, router]);

  const handleSubmit = async (data: JobFormData) => {
    setIsSubmitting(true);
    try {
      await updateJob(jobId, data);
      toast.success("Job updated successfully!");
      router.push("/recruiter/jobs");
    } catch (error: any) {
      toast.error(error.message || "Failed to update job");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingData) {
    return <div className="p-8 text-center text-slate-500 font-bold">Loading job details...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Edit Job Listing
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Update the details of your job listing below.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
        <JobForm 
          initialData={initialData} 
          onSubmit={handleSubmit} 
          isLoading={isSubmitting} 
        />
      </div>
    </div>
  );
}
