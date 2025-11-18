import axios, { AxiosInstance, AxiosError } from 'axios';

const API_BASE_URL = process.env.FOOTBALL_DATA_API_BASE_URL || 'https://api.football-data.org/v4';
const API_KEY = process.env.FOOTBALL_DATA_API_KEY || '';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-Auth-Token': API_KEY,
  },
});

// Request queue to respect 10 requests per minute rate limit
class RequestQueue {
  private queue: Array<() => Promise<any>> = [];
  private activeRequests = 0;
  private readonly maxConcurrent = 1; // Only 1 concurrent request to stay within rate limit
  private readonly requestDelay = 6000; // 6 second delay between requests (10 requests per minute = 1 request every 6 seconds)

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

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    throw error;
  }
);

export const footballApi = {
  // Matches
  getMatches: (params: Record<string, any>) =>
    requestQueue.add(() => apiClient.get('/matches', { params })),

  getMatchesByCompetition: (competitionCode: string, params: Record<string, any> = {}) =>
    requestQueue.add(() => apiClient.get(`/competitions/${competitionCode}/matches`, { params })),

  getMatchDetails: (matchId: number) =>
    requestQueue.add(() => apiClient.get(`/matches/${matchId}`)),

  // Teams
  getTeamsByCompetition: (competitionCode: string) =>
    requestQueue.add(() => apiClient.get(`/competitions/${competitionCode}/teams`)),

  getTeamById: (teamId: number) =>
    requestQueue.add(() => apiClient.get(`/teams/${teamId}`)),

  // Standings
  getStandingsByCompetition: (competitionCode: string) =>
    requestQueue.add(() => apiClient.get(`/competitions/${competitionCode}/standings`)),

  // Scorers/Players
  getScorersByCompetition: (competitionCode: string) =>
    requestQueue.add(() => apiClient.get(`/competitions/${competitionCode}/scorers`)),

  getPersonById: (personId: number) =>
    requestQueue.add(() => apiClient.get(`/persons/${personId}`)),

  // Competitions
  getCompetitions: () =>
    requestQueue.add(() => apiClient.get('/competitions')),

  getCompetitionById: (competitionCode: string) =>
    requestQueue.add(() => apiClient.get(`/competitions/${competitionCode}`)),
};

export default apiClient;
