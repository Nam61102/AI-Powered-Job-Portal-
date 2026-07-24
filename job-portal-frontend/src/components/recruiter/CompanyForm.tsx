import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Company, CompanyFormData } from "@/types/company";

interface CompanyFormProps {
  initialData?: Company | null;
  onSubmit: (data: CompanyFormData) => Promise<void>;
  isLoading: boolean;
}

export default function CompanyForm({ initialData, onSubmit, isLoading }: CompanyFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CompanyFormData>({
    defaultValues: {
      companyName: initialData?.companyName || "",
      website: initialData?.website || "",
    }
  });

  useEffect(() => {
    if (initialData) {
      reset({
        companyName: initialData.companyName,
        website: initialData.website,
      });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-bold text-slate-700">Company Name</label>
        <input
          {...register("companyName", { required: "Company name is required" })}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
          placeholder="e.g. Acme Corp"
        />
        {errors.companyName && <p className="text-xs text-red-500 font-semibold">{errors.companyName.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-bold text-slate-700">Website URL</label>
        <input
          {...register("website", { required: "Website is required" })}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
          placeholder="https://acme.com"
        />
        {errors.website && <p className="text-xs text-red-500 font-semibold">{errors.website.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="px-6 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {isLoading ? "Saving..." : "Save Company"}
      </button>
    </form>
  );
}
