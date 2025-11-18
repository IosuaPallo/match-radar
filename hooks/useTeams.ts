import { useQuery } from '@tanstack/react-query';
import { footballApi } from '@/lib/api';
import { TeamDetail, TeamsResponse } from '@/lib/types';

export const useTeamById = (teamId: number | null) => {
  return useQuery({
    queryKey: ['team', teamId],
    queryFn: async () => {
      if (!teamId) return null;
      const response = await footballApi.getTeamById(teamId);
      return response.data as TeamDetail;
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
    queryFn: async () => {
      if (!competitionCode) return null;
      const response = await footballApi.getTeamsByCompetition(competitionCode);
      return response.data as TeamsResponse;
    },
    enabled: !!competitionCode,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
    retry: 1,
    retryDelay: (attemptIndex) => Math.min(2000 * Math.pow(2, attemptIndex), 30000),
  });
};
