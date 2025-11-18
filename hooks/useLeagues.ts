import { useQuery } from '@tanstack/react-query';
import { footballApi } from '@/lib/api';
import { League, ApiResponse } from '@/lib/types';

export const useLeagues = (season: number = 2024) => {
  return useQuery({
    queryKey: ['leagues', season],
    queryFn: async () => {
      const response = await footballApi.getLeagues({ season });
      return response.data as ApiResponse<League>;
    },
  });
};

export const useTopScorers = (leagueId: number | null, season: number = 2024) => {
  return useQuery({
    queryKey: ['top-scorers', leagueId, season],
    queryFn: async () => {
      if (!leagueId) return null;
      const response = await footballApi.getLeagueTopScorers(leagueId, season);
      return response.data as ApiResponse<any>;
    },
    enabled: !!leagueId,
  });
};

export const useTopAssists = (leagueId: number | null, season: number = 2024) => {
  return useQuery({
    queryKey: ['top-assists', leagueId, season],
    queryFn: async () => {
      if (!leagueId) return null;
      const response = await footballApi.getLeagueTopAssists(leagueId, season);
      return response.data as ApiResponse<any>;
    },
    enabled: !!leagueId,
  });
};

export const useStandings = (leagueId: number | null, season: number = 2024) => {
  return useQuery({
    queryKey: ['standings', leagueId, season],
    queryFn: async () => {
      if (!leagueId) return null;
      const response = await footballApi.getStandings(leagueId, season);
      return response.data;
    },
    enabled: !!leagueId,
  });
};
