import { useQuery } from '@tanstack/react-query';
import { footballApi } from '@/lib/api';
import { Competition, StandingResponse, ScorersResponse } from '@/lib/types';

export const useCompetitions = () => {
  return useQuery({
    queryKey: ['competitions'],
    queryFn: async () => {
      const response = await footballApi.getCompetitions();
      return response.data as { competitions: Competition[] };
    },
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
    retry: 1,
    retryDelay: (attemptIndex) => Math.min(2000 * Math.pow(2, attemptIndex), 30000),
  });
};

export const useStandings = (competitionCode: string | null) => {
  return useQuery({
    queryKey: ['standings', competitionCode],
    queryFn: async () => {
      if (!competitionCode) return null;
      const response = await footballApi.getStandingsByCompetition(competitionCode);
      return response.data as StandingResponse;
    },
    enabled: !!competitionCode,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    retry: 1,
    retryDelay: (attemptIndex) => Math.min(2000 * Math.pow(2, attemptIndex), 30000),
  });
};

export const useTopScorers = (competitionCode: string | null) => {
  return useQuery({
    queryKey: ['top-scorers', competitionCode],
    queryFn: async () => {
      if (!competitionCode) return null;
      const response = await footballApi.getScorersByCompetition(competitionCode);
      return response.data as ScorersResponse;
    },
    enabled: !!competitionCode,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    retry: 1,
    retryDelay: (attemptIndex) => Math.min(2000 * Math.pow(2, attemptIndex), 30000),
  });
};

export const useTopAssists = (competitionCode: string | null) => {
  return useQuery({
    queryKey: ['top-assists', competitionCode],
    queryFn: async () => {
      if (!competitionCode) return null;
      const response = await footballApi.getScorersByCompetition(competitionCode);
      // Filter and sort by assists
      const data = response.data as ScorersResponse;
      const withAssists = data.scorers.filter((s) => s.assists && s.assists > 0);
      return {
        ...data,
        scorers: withAssists.sort((a, b) => (b.assists || 0) - (a.assists || 0)),
      };
    },
    enabled: !!competitionCode,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    retry: 1,
    retryDelay: (attemptIndex) => Math.min(2000 * Math.pow(2, attemptIndex), 30000),
  });
};
