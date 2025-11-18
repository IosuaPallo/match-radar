import axios, { AxiosInstance } from 'axios';

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
