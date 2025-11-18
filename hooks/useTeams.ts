import { useQuery } from '@tanstack/react-query';
import { footballApi } from '@/lib/api';
import { TeamDetail, TeamsResponse } from '@/lib/types';

export const useTeamById = (teamId: number | null) => {
  return useQuery({
    queryKey: ['team', teamId],
    queryFn: async ({ signal }) => {
      if (!teamId) return null;
      try {
        const response = await footballApi.getTeamById(teamId, signal);
        return response.data as TeamDetail;
      } catch (error: any) {
        if (error?.code === 'ECONNABORTED' || signal?.aborted) {
          throw new Error('Request was cancelled');
        }
        throw error;
      }
    },
    enabled: !!teamId,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
    retry: 1,
    retryDelay: (attemptIndex) => Math.min(2000 * Math.pow(2, attemptIndex), 30000),
  });
};

export const useTeamsByCompetition = (competitionCode: string | null) => {
  return useQuery({
    queryKey: ['teams', competitionCode],
    queryFn: async ({ signal }) => {
      if (!competitionCode) return null;
      try {
        const response = await footballApi.getTeamsByCompetition(competitionCode, signal);
        return response.data as TeamsResponse;
      } catch (error: any) {
        if (error?.code === 'ECONNABORTED' || signal?.aborted) {
          throw new Error('Request was cancelled');
        }
        throw error;
      }
    },
    enabled: !!competitionCode,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
    retry: 1,
    retryDelay: (attemptIndex) => Math.min(2000 * Math.pow(2, attemptIndex), 30000),
  });
};
