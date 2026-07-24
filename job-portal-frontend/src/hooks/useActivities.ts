import { useState, useEffect, useCallback } from 'react';
import { getActivities } from '../services/activity.service';
import { Activity } from '../types/activity';
import toast from 'react-hot-toast';

export const useActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getActivities();
      setActivities(data.activities);
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to fetch activities';
      setError(msg);
      
      const status = err.response?.status;
      if (status === 401) toast.error('Unauthorized access');
      else if (status === 403) toast.error('Forbidden');
      else if (status === 404) toast.error('Activities not found');
      else if (status >= 500) toast.error('Server Error: ' + msg);
      else toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return {
    activities,
    loading,
    error,
    refetch: fetchActivities,
  };
};
