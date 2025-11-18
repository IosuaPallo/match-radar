import { useQuery } from '@tanstack/react-query';
import { footballApi } from '@/lib/api';
import { Person } from '@/lib/types';

export const usePersonById = (personId: number | null) => {
  return useQuery({
    queryKey: ['person', personId],
    queryFn: async ({ signal }) => {
      if (!personId) return null;
      try {
        const response = await footballApi.getPersonById(personId, signal);
        return response.data as Person;
      } catch (error: any) {
        if (error?.code === 'ECONNABORTED' || signal?.aborted) {
          throw new Error('Request was cancelled');
        }
        throw error;
      }
    },
    enabled: !!personId,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
    retry: 1,
    retryDelay: (attemptIndex) => Math.min(2000 * Math.pow(2, attemptIndex), 30000),
  });
};
