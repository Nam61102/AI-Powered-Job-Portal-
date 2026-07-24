import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { InterviewMode } from "@/types/interview";

export interface InterviewFormData {
  interviewDate: string;
  interviewTime: string;
  mode: InterviewMode;
  meetingLink?: string;
  address?: string;
  notes?: string;
}

interface InterviewFormProps {
  initialData?: Partial<InterviewFormData>;
  onSubmit: (data: InterviewFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function InterviewForm({ initialData, onSubmit, onCancel, isLoading }: InterviewFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<InterviewFormData>({
    defaultValues: {
      mode: "ONLINE",
      ...initialData,
    },
  });

  const mode = watch("mode");

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data: InterviewFormData) => {
    // Clean up data based on mode before submitting
    if (data.mode === "ONLINE") {
      data.address = "";
    } else {
      data.meetingLink = "";
    }
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Date */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Interview Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            {...register("interviewDate", { required: "Date is required" })}
            className={`w-full px-3 py-2 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
              errors.interviewDate ? "border-red-300 bg-red-50" : "border-slate-200 bg-slate-50/50"
            }`}
          />
          {errors.interviewDate && (
            <p className="mt-1 text-[10px] text-red-500 font-medium">{errors.interviewDate.message}</p>
          )}
        </div>

        {/* Time */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Interview Time <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            {...register("interviewTime", { required: "Time is required" })}
            className={`w-full px-3 py-2 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
              errors.interviewTime ? "border-red-300 bg-red-50" : "border-slate-200 bg-slate-50/50"
            }`}
          />
          {errors.interviewTime && (
            <p className="mt-1 text-[10px] text-red-500 font-medium">{errors.interviewTime.message}</p>
          )}
        </div>
      </div>

      {/* Mode Selection */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-2">
          Interview Mode <span className="text-red-500">*</span>
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value="ONLINE"
              {...register("mode", { required: "Mode is required" })}
              className="text-blue-600 focus:ring-blue-500 w-4 h-4"
            />
            <span className="text-sm font-semibold text-slate-600">Online</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value="OFFLINE"
              {...register("mode")}
              className="text-blue-600 focus:ring-blue-500 w-4 h-4"
            />
            <span className="text-sm font-semibold text-slate-600">Offline</span>
          </label>
        </div>
      </div>

      {/* Dynamic Fields Based on Mode */}
      {mode === "ONLINE" && (
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Meeting Link <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            placeholder="https://meet.google.com/..."
            {...register("meetingLink", { 
              required: mode === "ONLINE" ? "Meeting link is required" : false 
            })}
            className={`w-full px-3 py-2 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
              errors.meetingLink ? "border-red-300 bg-red-50" : "border-slate-200 bg-slate-50/50"
            }`}
          />
          {errors.meetingLink && (
            <p className="mt-1 text-[10px] text-red-500 font-medium">{errors.meetingLink.message}</p>
          )}
        </div>
      )}

      {mode === "OFFLINE" && (
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Office Address <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={2}
            placeholder="Enter full office address..."
            {...register("address", { 
              required: mode === "OFFLINE" ? "Office address is required" : false 
            })}
            className={`w-full px-3 py-2 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none ${
              errors.address ? "border-red-300 bg-red-50" : "border-slate-200 bg-slate-50/50"
            }`}
          />
          {errors.address && (
            <p className="mt-1 text-[10px] text-red-500 font-medium">{errors.address.message}</p>
          )}
        </div>
      )}

      {/* Notes */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">
          Notes (Optional)
        </label>
        <textarea
          rows={2}
          placeholder="Any instructions for the candidate..."
          {...register("notes")}
          className="w-full px-3 py-2 text-sm border border-slate-200 bg-slate-50/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100 mt-6">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-5 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm shadow-blue-500/30 transition-all disabled:opacity-50 flex items-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            "Save Interview"
          )}
        </button>
      </div>
    </form>
  );
}
