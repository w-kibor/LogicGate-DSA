/**
 * API Client for LogicGate DSA Backend
 * Handles all HTTP communication with the FastAPI backend
 */

// ✅ Uses the Vercel variable if it exists, otherwise defaults to local
const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000'; 
export interface Problem {
  id: string;
  title: string;
  leetcode_number: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  pattern: string;
  description: string;
  time_complexity: string;
  space_complexity: string;
  concept_focus: string;
  link: string;
}

export interface DailyTriple {
  review: Problem;
  topic: Problem;
  challenge: Problem;
}

export interface Submission {
  id: string;
  problem_id: string;
  user_id: string;
  code: string;
  strategy: string;
  submitted_at: string;
  status: string;
  passed: boolean;
}

export interface UserProgress {
  total_problems_solved: number;
  streak_days: number;
  patterns_mastered: string[];
  confidence_scores: Record<string, number>;
}

export interface UserProfile {
  user_id: string;
  username: string;
  created_at: string;
  total_submissions: number;
  current_streak: number;
}

class APIClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    method: string,
    endpoint: string,
    body?: unknown
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || `API Error: ${response.statusText}`);
    }

    return response.json();
  }

  // Daily Triple Endpoints
  async getDailyTriple(userId: string): Promise<DailyTriple> {
    return this.request<DailyTriple>('GET', `/api/daily-triple/${userId}`);
  }

  async getPatterns(): Promise<string[]> {
    return this.request<string[]>('GET', '/api/patterns');
  }

  async getProblemsByPattern(pattern: string): Promise<Problem[]> {
    return this.request<Problem[]>('GET', `/api/problems/pattern/${pattern}`);
  }

  async getProblem(problemId: string): Promise<Problem> {
    return this.request<Problem>('GET', `/api/problems/${problemId}`);
  }

  // Submission Endpoints
  async submitSolution(
    problemId: string,
    userId: string,
    code: string,
    strategy: string,
    language: string = 'python'
  ): Promise<Submission> {
    return this.request<Submission>('POST', '/api/submit', {
      problem_id: problemId,
      user_id: userId,
      code,
      strategy,
      language,
    });
  }

  async getUserSubmissions(userId: string): Promise<Submission[]> {
    return this.request<Submission[]>('GET', `/api/submissions/${userId}`);
  }

  async getProblemSubmissions(
    userId: string,
    problemId: string
  ): Promise<Submission[]> {
    return this.request<Submission[]>(
      'GET',
      `/api/submissions/${userId}/${problemId}`
    );
  }

  // Progress Endpoints
  async getUserProgress(userId: string): Promise<UserProgress> {
    return this.request<UserProgress>('GET', `/api/progress/${userId}`);
  }

  async getUserProfile(userId: string): Promise<UserProfile> {
    return this.request<UserProfile>('GET', `/api/profile/${userId}`);
  }

  async updateStreak(userId: string, days: number = 1): Promise<UserProgress> {
    return this.request<UserProgress>(
      'PATCH',
      `/api/progress/${userId}/streak`,
      { days }
    );
  }

  async markPatternMastered(userId: string, pattern: string): Promise<unknown> {
    return this.request<unknown>(
      'POST',
      `/api/progress/${userId}/pattern-mastered`,
      { pattern }
    );
  }

  async updateConfidence(
    userId: string,
    pattern: string,
    score: number
  ): Promise<unknown> {
    return this.request<unknown>(
      'POST',
      `/api/progress/${userId}/confidence`,
      { pattern, score }
    );
  }

  // Health Check
  async healthCheck(): Promise<{ status: string }> {
    return this.request('GET', '/health');
  }
}

// Export singleton instance
export const apiClient = new APIClient();
export const setAPIBaseURL = (url: string) => {
  apiClient['baseUrl'] = url;
};

export default apiClient;
