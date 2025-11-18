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
    queryFn: async ({ signal }) => {
      try {
        if (competitionCode) {
          const response = await footballApi.getMatchesByCompetition(competitionCode, apiParams, signal);
          return response.data as MatchResponse;
        } else {
          const response = await footballApi.getMatches(apiParams, signal);
          return response.data as MatchResponse;
        }
      } catch (error: any) {
        if (error?.code === 'ECONNABORTED' || signal?.aborted) {
          throw new Error('Request was cancelled');
        }
        throw error;
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
    queryFn: async ({ signal }) => {
      if (!matchId) return null;
      try {
        const response = await footballApi.getMatchDetails(matchId, signal);
        return response.data as Match;
      } catch (error: any) {
        if (error?.code === 'ECONNABORTED' || signal?.aborted) {
          throw new Error('Request was cancelled');
        }
        throw error;
      }
    },
    enabled: !!matchId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    retryDelay: (attemptIndex) => Math.min(2000 * Math.pow(2, attemptIndex), 30000),
  });
};
