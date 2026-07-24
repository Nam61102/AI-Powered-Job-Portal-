'use client';
import React, { memo } from 'react';
import ActivityItem from './ActivityItem';
import { Activity } from '../../types/activity';

interface ActivityTimelineProps {
  activities: Activity[];
  loading: boolean;
}

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ activities, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full overflow-hidden">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-4 p-4 border-b border-gray-100 animate-pulse">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
            <div className="flex flex-col flex-grow space-y-2">
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/6"></div>
              </div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mt-2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center w-full">
        <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h3 className="text-lg font-medium text-gray-900">No recent activity</h3>
        <p className="text-gray-500 mt-1">Actions performed will appear here in a timeline.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full overflow-hidden">
      {activities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </div>
  );
};

export default memo(ActivityTimeline);
