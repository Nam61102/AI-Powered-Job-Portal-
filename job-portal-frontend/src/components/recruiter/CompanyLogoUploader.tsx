import React, { useState } from "react";
import { Company } from "@/types/company";

interface CompanyLogoUploaderProps {
  company: Company;
  onUpload: (file: File) => Promise<string>;
}

export default function CompanyLogoUploader({ company, onUpload }: CompanyLogoUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [imageError, setImageError] = useState(false);

  React.useEffect(() => {
    setImageError(false);
  }, [company.logo]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        setIsUploading(true);
        await onUpload(file);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="flex items-center space-x-6">
      <div className="w-24 h-24 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-center overflow-hidden bg-slate-50 flex-shrink-0">
        {company.logo && !imageError ? (
          <img 
            src={company.logo} 
            alt="Company Logo" 
            className="w-full h-full object-cover" 
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-3xl font-extrabold text-slate-300">
            {company.companyName?.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-bold text-slate-800">Company Logo</h3>
        <p className="text-xs text-slate-500 font-medium">Upload your company logo (PNG, JPG).</p>
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />
          <button
            type="button"
            disabled={isUploading}
            className="px-4 py-2 border border-slate-200 text-xs font-bold text-slate-700 bg-white rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            {isUploading ? "Uploading..." : "Upload Logo"}
          </button>
        </div>
      </div>
    </div>
  );
}
