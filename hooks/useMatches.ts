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
  });
};
