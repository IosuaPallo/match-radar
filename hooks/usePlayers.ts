import { useQuery } from '@tanstack/react-query';
import { footballApi } from '@/lib/api';
import { Player, ApiResponse } from '@/lib/types';

interface UsePlayersParams {
  search?: string;
  season?: number;
  teamId?: number;
  leagueId?: number;
}

export const usePlayers = (params: UsePlayersParams = {}) => {
  return useQuery({
    queryKey: ['players', params],
    queryFn: async () => {
      const response = await footballApi.getPlayers(params);
      return response.data as ApiResponse<Player>;
    },
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(2000 * Math.pow(2, attemptIndex), 60000),
  });
};

export const usePlayerById = (playerId: number | null) => {
  return useQuery({
    queryKey: ['player', playerId],
    queryFn: async () => {
      if (!playerId) return null;
      const response = await footballApi.getPlayerById(playerId);
      return response.data as ApiResponse<Player>;
    },
    enabled: !!playerId,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(2000 * Math.pow(2, attemptIndex), 60000),
  });
};

export const usePlayerStatistics = (playerId: number | null, season: number = 2024) => {
  return useQuery({
    queryKey: ['player-stats', playerId, season],
    queryFn: async () => {
      if (!playerId) return null;
      const response = await footballApi.getPlayerStatistics(playerId, season);
      return response.data as ApiResponse<Player>;
    },
    enabled: !!playerId,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(2000 * Math.pow(2, attemptIndex), 60000),
  });
};
