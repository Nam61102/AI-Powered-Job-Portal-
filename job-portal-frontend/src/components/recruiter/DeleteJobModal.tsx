import React from "react";
import { RecruiterJob } from "@/types/recruiter";

interface DeleteJobModalProps {
  job: RecruiterJob | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isDeleting: boolean;
}

export default function DeleteJobModal({ job, isOpen, onClose, onConfirm, isDeleting }: DeleteJobModalProps) {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Delete Job</h2>
          <p className="text-sm text-slate-500 font-medium">
            Are you sure you want to delete <span className="font-bold text-slate-700">{job.title}</span>? This action cannot be undone and will remove all associated applications.
          </p>
        </div>
        <div className="p-4 bg-slate-50 flex items-center justify-end space-x-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-200 bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete Job"}
          </button>
        </div>
      </div>
    </div>
  );
}
