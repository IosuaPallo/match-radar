import axios, { AxiosInstance, AxiosError } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api-football-v1.p.rapidapi.com/v3';
const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '';

// Extract hostname from RAPIDAPI_HOST env var (handle both full URL and hostname)
let rapidApiHost = process.env.NEXT_PUBLIC_RAPIDAPI_HOST || 'api-football-v1.p.rapidapi.com';
if (rapidApiHost.includes('http')) {
  try {
    rapidApiHost = new URL(rapidApiHost).hostname || 'api-football-v1.p.rapidapi.com';
  } catch {
    rapidApiHost = 'api-football-v1.p.rapidapi.com';
  }
}

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'x-rapidapi-key': RAPIDAPI_KEY,
    'x-rapidapi-host': rapidApiHost,
  },
});

// Simple request queue to limit concurrent requests
class RequestQueue {
  private queue: Array<() => Promise<any>> = [];
  private activeRequests = 0;
  private readonly maxConcurrent = 2; // Only 2 concurrent requests
  private readonly requestDelay = 1000; // 1 second delay between requests

  async add<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          await this.delayRequest();
          const result = await fn();
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          this.activeRequests--;
          this.processQueue();
        }
      });
      this.processQueue();
    });
  }

  private processQueue(): void {
    if (this.queue.length === 0 || this.activeRequests >= this.maxConcurrent) {
      return;
    }
    this.activeRequests++;
    const fn = this.queue.shift();
    if (fn) {
      fn();
    }
  }

  private delayRequest(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.requestDelay));
  }
}

const requestQueue = new RequestQueue();

// No retry logic in interceptor - let react-query handle retries
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    throw error;
  }
);

export const footballApi = {
  // Matches
  getMatches: (params: Record<string, any>) =>
    requestQueue.add(() => apiClient.get('/fixtures', { params })),

  getMatchDetails: (matchId: number) =>
    requestQueue.add(() => apiClient.get(`/fixtures`, { params: { id: matchId } })),

  getMatchLineups: (matchId: number) =>
    requestQueue.add(() => apiClient.get(`/fixtures/lineups`, { params: { fixture: matchId } })),

  getMatchStatistics: (matchId: number) =>
    requestQueue.add(() => apiClient.get(`/fixtures/statistics`, { params: { fixture: matchId } })),

  getMatchEvents: (matchId: number) =>
    requestQueue.add(() => apiClient.get(`/fixtures/events`, { params: { fixture: matchId } })),

  // Teams
  getTeams: (params: Record<string, any>) =>
    requestQueue.add(() => apiClient.get('/teams', { params })),

  getTeamById: (teamId: number) =>
    requestQueue.add(() => apiClient.get('/teams', { params: { id: teamId } })),

  getTeamPlayers: (teamId: number, season: number) =>
    requestQueue.add(() => apiClient.get('/players', { params: { team: teamId, season } })),

  getTeamStatistics: (leagueId: number, teamId: number, season: number) =>
    requestQueue.add(() => apiClient.get('/teams/statistics', {
      params: { league: leagueId, team: teamId, season }
    })),

  // Players
  getPlayers: (params: Record<string, any>) =>
    requestQueue.add(() => apiClient.get('/players', { params })),

  getPlayerById: (playerId: number) =>
    requestQueue.add(() => apiClient.get('/players', { params: { id: playerId } })),

  getPlayerStatistics: (playerId: number, season: number) =>
    requestQueue.add(() => apiClient.get('/players', { params: { id: playerId, season } })),

  // Leagues
  getLeagues: (params: Record<string, any> = {}) =>
    requestQueue.add(() => apiClient.get('/leagues', { params })),

  getLeagueStandings: (leagueId: number, season: number) =>
    requestQueue.add(() => apiClient.get('/standings', { params: { league: leagueId, season } })),

  getLeagueTopScorers: (leagueId: number, season: number) =>
    requestQueue.add(() => apiClient.get('/players/topscorers', {
      params: { league: leagueId, season }
    })),

  getLeagueTopAssists: (leagueId: number, season: number) =>
    requestQueue.add(() => apiClient.get('/players/topassists', {
      params: { league: leagueId, season }
    })),

  // Standings
  getStandings: (leagueId: number, season: number) =>
    requestQueue.add(() => apiClient.get('/standings', { params: { league: leagueId, season } })),
};

export default apiClient;
