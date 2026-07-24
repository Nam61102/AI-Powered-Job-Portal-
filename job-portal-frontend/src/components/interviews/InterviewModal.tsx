import React, { useEffect, useState } from "react";
import InterviewForm, { InterviewFormData } from "./InterviewForm";

interface InterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: InterviewFormData) => Promise<void>;
  initialData?: Partial<InterviewFormData>;
  title?: string;
}

export default function InterviewModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData, 
  title = "Schedule Interview" 
}: InterviewModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (data: InterviewFormData) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={!isLoading ? onClose : undefined}
      ></div>

      {/* Modal content */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">{title}</h2>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <InterviewForm 
            initialData={initialData} 
            onSubmit={handleSubmit} 
            onCancel={onClose}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
