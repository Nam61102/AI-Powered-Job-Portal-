import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { JobFormData } from "@/types/recruiter";
import { useRouter } from "next/navigation";
import { Company } from "@/types/company";

interface JobFormProps {
  initialData?: JobFormData | null;
  onSubmit: (data: JobFormData) => Promise<void>;
  isLoading: boolean;
  companies?: Company[];
}

export default function JobForm({ initialData, onSubmit, isLoading, companies }: JobFormProps) {
  const router = useRouter();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<JobFormData>({
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      salary: initialData?.salary || "",
      location: initialData?.location || "",
      companyId: initialData?.companyId || (companies && companies.length > 0 ? companies[0].id : undefined),
    }
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-bold text-slate-700">Job Title</label>
        <input
          {...register("title", { required: "Job title is required" })}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
          placeholder="e.g. Senior Frontend Engineer"
        />
        {errors.title && <p className="text-xs text-red-500 font-semibold">{errors.title.message}</p>}
      </div>

      {companies && companies.length > 0 && (
        <div className="space-y-2">
          <label className="block text-sm font-bold text-slate-700">Company</label>
          <select
            {...register("companyId", { required: "Company is required", valueAsNumber: true })}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
          >
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.companyName}
              </option>
            ))}
          </select>
          {errors.companyId && <p className="text-xs text-red-500 font-semibold">{errors.companyId.message}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-bold text-slate-700">Salary (per year)</label>
          <input
            type="number"
            {...register("salary", { 
              required: "Salary is required",
              valueAsNumber: true,
              min: { value: 0, message: "Salary must be positive" }
            })}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
            placeholder="e.g. 120000"
          />
          {errors.salary && <p className="text-xs text-red-500 font-semibold">{errors.salary.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold text-slate-700">Location</label>
          <input
            {...register("location", { required: "Location is required" })}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
            placeholder="e.g. New York, Remote"
          />
          {errors.location && <p className="text-xs text-red-500 font-semibold">{errors.location.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-bold text-slate-700">Job Description & Requirements</label>
        <textarea
          {...register("description", { required: "Description is required" })}
          rows={6}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
          placeholder="Describe the role, responsibilities, and qualifications..."
        />
        {errors.description && <p className="text-xs text-red-500 font-semibold">{errors.description.message}</p>}
      </div>

      <div className="flex items-center space-x-3 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? "Saving..." : (initialData ? "Update Job" : "Post Job")}
        </button>
        <button
          type="button"
          onClick={() => router.push("/recruiter/jobs")}
          className="px-6 py-2.5 border border-slate-200 text-slate-700 font-bold text-sm rounded-lg hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
