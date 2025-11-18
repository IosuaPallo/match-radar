import { useQuery } from '@tanstack/react-query';
import { footballApi } from '@/lib/api';
import { TeamStats, ApiResponse } from '@/lib/types';

export const useTeamById = (teamId: number | null) => {
  return useQuery({
    queryKey: ['team', teamId],
    queryFn: async () => {
      if (!teamId) return null;
      const response = await footballApi.getTeamById(teamId);
      return response.data as ApiResponse<any>;
    },
    enabled: !!teamId,
  });
};

export const useTeamPlayers = (teamId: number | null, season: number = 2024) => {
  return useQuery({
    queryKey: ['team-players', teamId, season],
    queryFn: async () => {
      if (!teamId) return null;
      const response = await footballApi.getTeamPlayers(teamId, season);
      return response.data as ApiResponse<any>;
    },
    enabled: !!teamId,
  });
};

export const useTeamStatistics = (
  leagueId: number | null,
  teamId: number | null,
  season: number = 2024
) => {
  return useQuery({
    queryKey: ['team-stats', leagueId, teamId, season],
    queryFn: async () => {
      if (!leagueId || !teamId) return null;
      const response = await footballApi.getTeamStatistics(leagueId, teamId, season);
      return response.data as ApiResponse<any>;
    },
    enabled: !!leagueId && !!teamId,
  });
};
