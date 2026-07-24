"use client";

import { useState, useEffect, useMemo } from "react";
import { useCompany } from "@/hooks/useCompany";
import CompanyForm from "@/components/recruiter/CompanyForm";
import CompanyLogoUploader from "@/components/recruiter/CompanyLogoUploader";
import { CompanyFormData, Company } from "@/types/company";

export default function CompanyPage() {
  const { company, companies, setCompany, loading, createCompany, updateCompany, uploadLogo, removeCompany } = useCompany();
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!loading && companies.length === 0) {
      setIsCreating(true);
      setShowForm(true);
    }
  }, [loading, companies.length]);

  const handleSubmit = async (data: CompanyFormData) => {
    if (isCreating || !company) {
      await createCompany(data);
    } else {
      await updateCompany(data, company.id);
    }
    setShowForm(false);
    setIsCreating(false);
  };

  const handleEdit = (comp: Company) => {
    setCompany(comp);
    setIsCreating(false);
    setShowForm(true);
  };

  const handleCreateNew = () => {
    setCompany(null);
    setIsCreating(true);
    setShowForm(true);
  };

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this company?")) {
      await removeCompany(id);
    }
  };

  const filteredCompanies = useMemo(() => {
    return companies.filter(c => 
      c.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.website?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [companies, searchTerm]);

  if (loading && companies.length === 0) {
    return <div className="p-8 text-center text-slate-500 font-bold">Loading company profile...</div>;
  }

  if (showForm) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <button 
          onClick={() => setShowForm(false)}
          className="text-sm font-bold text-slate-500 hover:text-slate-800 flex items-center mb-4"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back to Companies
        </button>
        <div className="bg-white rounded-2xl border border-slate-200/60 p-8 shadow-sm">
           <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-slate-100">
             <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
             <h2 className="text-xl font-bold text-slate-800">
               {isCreating ? "New Company Details" : "Edit Company Details"}
             </h2>
           </div>
           
           {!isCreating && company && (
             <div className="mb-10 bg-slate-50/50 rounded-xl p-6 border border-slate-100/80">
               <CompanyLogoUploader company={company} onUpload={uploadLogo} />
             </div>
           )}
          <div className="max-w-2xl">
            <CompanyForm 
              initialData={isCreating ? null : company} 
              onSubmit={handleSubmit} 
              isLoading={loading} 
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 space-y-6 bg-[#f8f9fa] min-h-screen">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm font-medium text-slate-500 mb-2">
        <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        <span className="text-blue-600 font-bold mx-2">Dashboard</span> / 
        <span className="text-slate-800 font-bold ml-2">Companies</span>
      </div>

      {/* Header Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">Companies</h1>
        <p className="text-sm text-slate-500 mt-1 font-medium">Manage organization companies and structures</p>
      </div>

      {/* Add Button */}
      <div className="flex justify-end">
        <button
          onClick={handleCreateNew}
          className="flex items-center px-5 py-2.5 bg-[#293285] text-white font-bold text-sm rounded-lg hover:bg-opacity-90 transition-all shadow-sm"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
          Add Company
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex items-center">
        <svg className="w-5 h-5 text-blue-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input 
          type="text" 
          placeholder="Search companies by name, code or description..." 
          className="w-full pl-3 py-1 outline-none text-sm font-medium text-slate-700 placeholder-slate-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Data Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-4 px-6 text-xs font-bold text-slate-500 tracking-wider">
                  <div className="flex items-center space-x-1 cursor-pointer">
                    <span>ID</span>
                    <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 5l-7 7h14l-7-7zm0 14l7-7H5l7 7z"/></svg>
                  </div>
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 tracking-wider">
                  <div className="flex items-center space-x-1 cursor-pointer">
                    <span>NAME</span>
                    <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 5l-7 7h14l-7-7zm0 14l7-7H5l7 7z"/></svg>
                  </div>
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 tracking-wider">
                  <div className="flex items-center space-x-1 cursor-pointer">
                    <span>CODE</span>
                    <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 5l-7 7h14l-7-7zm0 14l7-7H5l7 7z"/></svg>
                  </div>
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 tracking-wider">
                  <div className="flex items-center space-x-1 cursor-pointer">
                    <span>DESCRIPTION</span>
                    <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 5l-7 7h14l-7-7zm0 14l7-7H5l7 7z"/></svg>
                  </div>
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 tracking-wider text-center">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCompanies.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-sm text-slate-500 font-medium">No companies found</td>
                </tr>
              ) : (
                filteredCompanies.map((comp) => (
                  <tr key={comp.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 text-sm font-semibold text-slate-600">
                      # {comp.id}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-7 h-7 rounded-lg bg-[#eef2ff] text-blue-600 flex items-center justify-center flex-shrink-0 overflow-hidden border border-blue-100">
                          {comp.logo ? (
                            <img src={comp.logo} alt={comp.companyName} className="w-full h-full object-cover" />
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                          )}
                        </div>
                        <span className="font-semibold text-slate-800">{comp.companyName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#eef2ff] text-slate-700 font-bold text-xs uppercase tracking-wider">
                        {comp.companyName?.substring(0, 3)}{comp.id}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm font-medium">
                      {comp.website ? (
                        <a 
                          href={comp.website.startsWith('http') ? comp.website : `https://${comp.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-700 hover:underline transition-colors"
                        >
                          {comp.website}
                        </a>
                      ) : (
                        <span className="text-slate-500">NA</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center space-x-6">
                        <button onClick={() => handleEdit(comp)} className="text-[#3b82f6] hover:opacity-70 transition-opacity">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        </button>
                        <button onClick={(e) => handleDelete(e, comp.id)} className="text-[#ef4444] hover:opacity-70 transition-opacity">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
