import React, { useState, useEffect } from 'react';
import { DailyProblemCard } from './daily-problem-card';
import { PatternProgress } from './pattern-progress';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Target, Calendar, Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import apiClient, { DailyTriple, Problem } from '../../services/api-client';

interface DailyProblemProps {
  type: 'Review' | 'Topic-Specific' | 'Challenge';
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  pattern: string;
  timeComplexity: string;
  spaceComplexity: string;
  leetcodeNumber: number;
  description: string;
  conceptFocus: string;
}

const convertProblemToDailyFormat = (problem: Problem, type: 'Review' | 'Topic-Specific' | 'Challenge'): DailyProblemProps => ({
  type,
  id: problem.id,
  title: problem.title,
  difficulty: problem.difficulty,
  pattern: problem.pattern,
  timeComplexity: problem.time_complexity,
  spaceComplexity: problem.space_complexity,
  leetcodeNumber: problem.leetcode_number,
  description: problem.description,
  conceptFocus: problem.concept_focus
});

const patterns = [
  { pattern: 'Arrays & Strings', completed: 42, total: 50, color: '#6366f1' },
  { pattern: 'Trees & Graphs', completed: 28, total: 40, color: '#818cf8' },
  { pattern: 'Dynamic Programming', completed: 15, total: 35, color: '#a5b4fc' },
  { pattern: 'Backtracking', completed: 12, total: 20, color: '#10b981' }
];

// Hardcoded test user (replace with auth in future)
const TEST_USER_ID = import.meta.env.VITE_TEST_USER_ID || 'test-user-001';

export function DailyDashboard() {
  const [dailyProblems, setDailyProblems] = useState<DailyProblemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDailyTriple = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data: DailyTriple = await apiClient.getDailyTriple(TEST_USER_ID);
        
        const problems: DailyProblemProps[] = [
          convertProblemToDailyFormat(data.review, 'Review'),
          convertProblemToDailyFormat(data.topic, 'Topic-Specific'),
          convertProblemToDailyFormat(data.challenge, 'Challenge')
        ];
        
        setDailyProblems(problems);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load daily problems';
        setError(errorMessage);
        console.error('Error loading daily triple:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDailyTriple();
  }, []);

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Daily Focus Dashboard</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            {today}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Daily Goal</div>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo" />
            <span className="text-2xl">{loading ? '-' : dailyProblems.length}/3</span>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert className="border-destructive bg-destructive/10">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error} - Make sure the backend server is running at http://localhost:8000
          </AlertDescription>
        </Alert>
      )}

      {/* Daily Triple Cards */}
      <div>
        <h2 className="text-xl mb-4 flex items-center gap-2">
          <span className="text-indigo">⚡</span>
          Today's Triple Challenge
        </h2>
        
        {loading ? (
          <div className="flex items-center justify-center p-8 bg-card border-2 border-border rounded-lg">
            <Loader2 className="w-6 h-6 animate-spin text-indigo mr-2" />
            <span className="text-muted-foreground">Loading today's problems...</span>
          </div>
        ) : dailyProblems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {dailyProblems.map((problem, index) => (
              <DailyProblemCard key={index} {...problem} />
            ))}
          </div>
        ) : (
          <Alert className="border-yellow-600 bg-yellow-50/10">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              No problems available. Check your backend connection.
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Pattern Progress */}
      <Card className="border-2 border-border bg-card">
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="text-base">Pattern Completion Progress</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Track your mastery across key DSA patterns
          </p>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          {patterns.map((pattern, index) => (
            <PatternProgress key={index} {...pattern} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
