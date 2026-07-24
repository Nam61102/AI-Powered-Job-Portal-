'use client';
import React from 'react';
import ActivityTimeline from '@/components/recruiter/ActivityTimeline';
import { useActivities } from '@/hooks/useActivities';
import { Toaster } from 'react-hot-toast';

export default function ActivityPage() {
  const { activities, loading } = useActivities();

  return (
    <div className="w-full">
      <Toaster position="top-right" />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Activity Timeline</h1>
        <p className="text-sm text-gray-500 mt-1">
          A history of recent actions you have performed.
        </p>
      </div>
      
      <ActivityTimeline activities={activities} loading={loading} />
    </div>
  );
}
