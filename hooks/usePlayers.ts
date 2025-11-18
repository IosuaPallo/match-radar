import { useQuery } from '@tanstack/react-query';
import { footballApi } from '@/lib/api';
import { Person } from '@/lib/types';

export const usePersonById = (personId: number | null) => {
  return useQuery({
    queryKey: ['person', personId],
    queryFn: async () => {
      if (!personId) return null;
      const response = await footballApi.getPersonById(personId);
      return response.data as Person;
    },
    enabled: !!personId,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
    retry: 1,
    retryDelay: (attemptIndex) => Math.min(2000 * Math.pow(2, attemptIndex), 30000),
  });
};
