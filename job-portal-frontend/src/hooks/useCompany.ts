import { useState, useEffect, useCallback } from "react";
import { Company, CompanyFormData } from "@/types/company";
import { getCompanies, createCompany as apiCreateCompany, updateCompany as apiUpdateCompany, uploadCompanyLogo as apiUploadLogo, deleteCompany as apiDeleteCompany } from "@/services/recruiter.service";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

export const useCompany = () => {
  const { user } = useAuth();
  const [company, setCompany] = useState<Company | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompany = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      setError(null);
      // Fetch all companies and filter the one belonging to the logged-in user
      const companies = await getCompanies();
      const userCompanies = companies.filter((c) => c.userId === user.id);
      setCompanies(userCompanies);
      setCompany(userCompanies.length > 0 ? userCompanies[0] : null);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to fetch company");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCompany();
  }, [fetchCompany]);

  const createCompany = async (data: CompanyFormData) => {
    try {
      setLoading(true);
      const newCompany = await apiCreateCompany(data);
      setCompany(newCompany);
      setCompanies(prev => [...prev, newCompany]);
      toast.success("Company created successfully!");
      return newCompany;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Failed to create company";
      toast.error(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const updateCompany = async (data: CompanyFormData, id?: number) => {
    try {
      setLoading(true);
      const targetId = id || company?.id;
      const updatedCompany = await apiUpdateCompany(data, targetId);
      
      if (company?.id === targetId || !company) {
        setCompany(updatedCompany);
      }
      setCompanies(prev => prev.map(c => c.id === targetId ? updatedCompany : c));
      
      toast.success("Company updated successfully!");
      return updatedCompany;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Failed to update company";
      toast.error(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const uploadLogo = async (file: File) => {
    try {
      if (!company) throw new Error("No company selected");
      const url = await apiUploadLogo(file, company.id);
      // Immediately update local state so preview works
      setCompany({ ...company, logo: url });
      // Update companies list as well
      setCompanies(prev => prev.map(c => c.id === company.id ? { ...c, logo: url } : c));
      
      toast.success("Logo uploaded successfully!");
      return url;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Failed to upload logo";
      toast.error(msg);
      throw new Error(msg);
    }
  };

  const removeCompany = async (id: number) => {
    try {
      setLoading(true);
      await apiDeleteCompany(id);
      setCompanies(prev => prev.filter(c => c.id !== id));
      if (company?.id === id) {
        setCompany(null);
      }
      toast.success("Company deleted successfully!");
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Failed to delete company";
      toast.error(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    company,
    companies,
    setCompany,
    loading,
    error,
    refetch: fetchCompany,
    createCompany,
    updateCompany,
    uploadLogo,
    removeCompany,
  };
};
