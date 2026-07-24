import api from "@/lib/axios";
import { Company, CompanyFormData } from "@/types/company";
import { RecruiterJob, Applicant, JobFormData } from "@/types/recruiter";

// Company APIs
export const getMyCompany = async (): Promise<Company | null> => {
  // Since there is no direct `/api/company/my` and `/api/company` returns all companies,
  // we will fetch all and then the hook will filter for the logged-in user's company,
  // OR we rely on updating `/api/company/update` which automatically uses the user's company if no ID is passed.
  // Actually, we can fetch all companies and return the one matching the current user.
  // But wait, the recruiter dashboard needs their company.
  const response = await api.get<{ companies: Company[] }>("/company");
  return response.data.companies[0] || null; // Will filter properly in hook using user ID
};

export const getCompanies = async (): Promise<Company[]> => {
  const response = await api.get<{ companies: Company[] }>("/company");
  return response.data.companies;
};

export const getCompanyById = async (id: number): Promise<Company> => {
  const response = await api.get<{ company: Company }>(`/company/${id}`);
  return response.data.company;
};

export const createCompany = async (data: CompanyFormData): Promise<Company> => {
  const response = await api.post<{ message: string; company: Company }>("/company/create", data);
  return response.data.company;
};

export const updateCompany = async (data: CompanyFormData, id?: number): Promise<Company> => {
  const url = id ? `/company/${id}` : "/company/update";
  const response = await api.put<{ message: string; updatedCompany: Company }>(url, data);
  return response.data.updatedCompany;
};

export const uploadCompanyLogo = async (file: File, companyId: number): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("companyId", companyId.toString());
  const response = await api.post<{ url: string }>("/upload/logo", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.url;
};

export const deleteCompany = async (id: number): Promise<void> => {
  await api.delete(`/company/${id}`);
};

// Jobs APIs
export const createJob = async (data: JobFormData & { companyId: number }): Promise<RecruiterJob> => {
  const response = await api.post<{ message: string; job: RecruiterJob }>("/jobs/create", data);
  return response.data.job;
};

export const getRecruiterJobs = async (limit: number = 100): Promise<RecruiterJob[]> => {
  const response = await api.get<RecruiterJob[]>(`/jobs?limit=${limit}`);
  return response.data; // Hook will filter by companyId
};

export const getJobById = async (id: number): Promise<RecruiterJob> => {
  const response = await api.get<RecruiterJob>(`/jobs/${id}`);
  return response.data;
};

export const updateJob = async (id: number, data: JobFormData): Promise<RecruiterJob> => {
  const response = await api.put<{ message: string; job: RecruiterJob }>(`/jobs/${id}`, data);
  return response.data.job;
};

export const deleteJob = async (id: number): Promise<void> => {
  await api.delete(`/jobs/${id}`);
};

// Applicants APIs
export const getApplicants = async (jobId: number): Promise<Applicant[]> => {
  const response = await api.get<Applicant[]>(`/applications/job/${jobId}`);
  return response.data;
};

export const updateApplicationStatus = async (applicationId: number, status: string): Promise<void> => {
  await api.put("/applications/status", { applicationId, status });
};
