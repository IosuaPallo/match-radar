import { useQuery } from '@tanstack/react-query';
import { footballApi } from '@/lib/api';
import { Match, MatchResponse } from '@/lib/types';

interface UseMatchesParams {
  competitionCode?: string;
  from?: string;
  to?: string;
  status?: 'TIMED' | 'LIVE' | 'IN_PLAY' | 'PAUSED' | 'FINISHED' | 'POSTPONED' | 'CANCELLED' | 'SUSPENDED';
  season?: number;
}

export const useMatches = (params: UseMatchesParams = {}) => {
  const { competitionCode, ...apiParams } = params;

  return useQuery({
    queryKey: ['matches', params],
    queryFn: async () => {
      if (competitionCode) {
        const response = await footballApi.getMatchesByCompetition(competitionCode, apiParams);
        return response.data as MatchResponse;
      } else {
        const response = await footballApi.getMatches(apiParams);
        return response.data as MatchResponse;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 1,
    retryDelay: (attemptIndex) => Math.min(2000 * Math.pow(2, attemptIndex), 30000),
  });
};

export const useMatchDetails = (matchId: number | null) => {
  return useQuery({
    queryKey: ['match', matchId],
    queryFn: async () => {
      if (!matchId) return null;
      const response = await footballApi.getMatchDetails(matchId);
      return response.data as Match;
    },
    enabled: !!matchId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    retryDelay: (attemptIndex) => Math.min(2000 * Math.pow(2, attemptIndex), 30000),
  });
};
