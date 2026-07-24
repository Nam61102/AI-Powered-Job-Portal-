import { useState, useEffect, useCallback } from "react";
import { RecruiterJob, JobFormData } from "@/types/recruiter";
import { getRecruiterJobs, deleteJob as apiDeleteJob, updateJob as apiUpdateJob } from "@/services/recruiter.service";
import api from "@/lib/axios";
import { useCompany } from "./useCompany";
import toast from "react-hot-toast";

export const useRecruiterJobs = () => {
  const { company, loading: companyLoading } = useCompany();
  const [jobs, setJobs] = useState<RecruiterJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    if (companyLoading) return;
    
    if (!company) {
      setJobs([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      // Fetch all jobs
      const allJobs = await getRecruiterJobs(500); 
      const myJobs = allJobs;
      
      // Fetch applicant counts for each job since backend getJobs doesn't include _count
      const jobsWithCounts = await Promise.all(
        myJobs.map(async (job) => {
          try {
            const apps = await api.get(`/applications/job/${job.id}`);
            return { ...job, _count: { applications: apps.data.length } };
          } catch (e) {
            return { ...job, _count: { applications: 0 } };
          }
        })
      );
      
      setJobs(jobsWithCounts);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  }, [company, companyLoading]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const deleteJob = async (id: number) => {
    try {
      await apiDeleteJob(id);
      setJobs(jobs.filter(job => job.id !== id));
      toast.success("Job deleted successfully");
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Failed to delete job";
      toast.error(msg);
      throw new Error(msg);
    }
  };

  const updateJob = async (id: number, data: JobFormData) => {
    try {
      const updatedJob = await apiUpdateJob(id, data);
      setJobs(jobs.map(job => (job.id === id ? { ...job, ...updatedJob } : job)));
      toast.success("Job updated successfully");
      return updatedJob;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Failed to update job";
      toast.error(msg);
      throw new Error(msg);
    }
  };

  return {
    jobs,
    loading: loading || companyLoading,
    error,
    deleteJob,
    updateJob,
    refetch: fetchJobs,
  };
};
