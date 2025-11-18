import { useQuery } from '@tanstack/react-query';
import { footballApi } from '@/lib/api';
import { Match, ApiResponse } from '@/lib/types';

interface UseMatchesParams {
  leagueId?: number;
  season?: number;
  from?: string;
  to?: string;
  status?: 'live' | 'finished' | 'scheduled';
  teamId?: number;
}

export const useMatches = (params: UseMatchesParams = {}) => {
  return useQuery({
    queryKey: ['matches', params],
    queryFn: async () => {
      const response = await footballApi.getMatches(params);
      return response.data as ApiResponse<Match>;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useMatchDetails = (matchId: number | null) => {
  return useQuery({
    queryKey: ['match', matchId],
    queryFn: async () => {
      if (!matchId) return null;
      const response = await footballApi.getMatchDetails(matchId);
      return response.data as ApiResponse<Match>;
    },
    enabled: !!matchId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useMatchLineups = (matchId: number | null) => {
  return useQuery({
    queryKey: ['match-lineups', matchId],
    queryFn: async () => {
      if (!matchId) return null;
      const response = await footballApi.getMatchLineups(matchId);
      return response.data;
    },
    enabled: !!matchId,
    staleTime: 10 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useMatchStatistics = (matchId: number | null) => {
  return useQuery({
    queryKey: ['match-stats', matchId],
    queryFn: async () => {
      if (!matchId) return null;
      const response = await footballApi.getMatchStatistics(matchId);
      return response.data;
    },
    enabled: !!matchId,
    staleTime: 10 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
