import axios, { AxiosInstance, AxiosError } from 'axios';

// Use local proxy instead of external API (handles CORS and keeps API key server-side)
const API_BASE_URL = '/api/football';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Request queue to respect 10 requests per minute rate limit
class RequestQueue {
  private queue: Array<() => Promise<any>> = [];
  private activeRequests = 0;
  private readonly maxConcurrent = 1; // Only 1 concurrent request to stay within rate limit
  private readonly requestDelay = 6000; // 6 second delay between requests (10 requests per minute = 1 request every 6 seconds)

  async add<T>(fn: (signal?: AbortSignal) => Promise<T>, signal?: AbortSignal): Promise<T> {
    return new Promise((resolve, reject) => {
      if (signal?.aborted) {
        reject(new Error('Request was cancelled'));
        return;
      }

      const abortHandler = () => {
        reject(new Error('Request was cancelled'));
      };

      signal?.addEventListener('abort', abortHandler);

      this.queue.push(async () => {
        try {
          if (signal?.aborted) {
            throw new Error('Request was cancelled');
          }
          await this.delayRequest();
          const result = await fn(signal);
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          signal?.removeEventListener('abort', abortHandler);
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
    if (error.code !== 'ECONNABORTED') {
      throw error;
    }
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
