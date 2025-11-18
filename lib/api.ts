import axios, { AxiosInstance, AxiosError } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api-football-v1.p.rapidapi.com/v3';
const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '';
const RAPIDAPI_HOST = process.env.NEXT_PUBLIC_RAPIDAPI_HOST || 'https://api-football-v1.p.rapidapi.com/v3';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'x-rapidapi-key': RAPIDAPI_KEY,
    'x-rapidapi-host': RAPIDAPI_HOST,
  },
});

// Add retry logic with exponential backoff
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second base delay

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config;
    if (!config) throw error;

    // Get retry count from config
    const retryCount = (config as any).retryCount || 0;

    // Retry on 429 (Too Many Requests) and 500 (Internal Server Error)
    if ((error.response?.status === 429 || error.response?.status === 500) && retryCount < MAX_RETRIES) {
      (config as any).retryCount = retryCount + 1;

      // Exponential backoff: 1s, 2s, 4s
      const delay = RETRY_DELAY * Math.pow(2, retryCount);
      await new Promise((resolve) => setTimeout(resolve, delay));

      return apiClient(config);
    }

    throw error;
  }
);

export const footballApi = {
  // Matches
  getMatches: (params: Record<string, any>) =>
    apiClient.get('/fixtures', { params }),

  getMatchDetails: (matchId: number) =>
    apiClient.get(`/fixtures`, { params: { id: matchId } }),

  getMatchLineups: (matchId: number) =>
    apiClient.get(`/fixtures/lineups`, { params: { fixture: matchId } }),

  getMatchStatistics: (matchId: number) =>
    apiClient.get(`/fixtures/statistics`, { params: { fixture: matchId } }),

  getMatchEvents: (matchId: number) =>
    apiClient.get(`/fixtures/events`, { params: { fixture: matchId } }),

  // Teams
  getTeams: (params: Record<string, any>) =>
    apiClient.get('/teams', { params }),

  getTeamById: (teamId: number) =>
    apiClient.get('/teams', { params: { id: teamId } }),

  getTeamPlayers: (teamId: number, season: number) =>
    apiClient.get('/players', { params: { team: teamId, season } }),

  getTeamStatistics: (leagueId: number, teamId: number, season: number) =>
    apiClient.get('/teams/statistics', { 
      params: { league: leagueId, team: teamId, season } 
    }),

  // Players
  getPlayers: (params: Record<string, any>) =>
    apiClient.get('/players', { params }),

  getPlayerById: (playerId: number) =>
    apiClient.get('/players', { params: { id: playerId } }),

  getPlayerStatistics: (playerId: number, season: number) =>
    apiClient.get('/players', { params: { id: playerId, season } }),

  // Leagues
  getLeagues: (params: Record<string, any> = {}) =>
    apiClient.get('/leagues', { params }),

  getLeagueStandings: (leagueId: number, season: number) =>
    apiClient.get('/standings', { params: { league: leagueId, season } }),

  getLeagueTopScorers: (leagueId: number, season: number) =>
    apiClient.get('/players/topscorers', { 
      params: { league: leagueId, season } 
    }),

  getLeagueTopAssists: (leagueId: number, season: number) =>
    apiClient.get('/players/topassists', { 
      params: { league: leagueId, season } 
    }),

  // Standings
  getStandings: (leagueId: number, season: number) =>
    apiClient.get('/standings', { params: { league: leagueId, season } }),
};

export default apiClient;
