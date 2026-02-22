import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { BookOpen, Code2, CheckCircle2, RotateCcw, Loader2, AlertCircle } from 'lucide-react';
import apiClient, { Problem } from '../../services/api-client';

interface WhiteboardModeProps {
  problemId?: string;
}

// Hardcoded test user
const TEST_USER_ID = import.meta.env.VITE_TEST_USER_ID || 'test-user-001';

export function WhiteboardMode({ problemId = 'problem_234' }: WhiteboardModeProps) {
  const [strategy, setStrategy] = useState('');
  const [code, setCode] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loadingProblem, setLoadingProblem] = useState(true);

  useEffect(() => {
    const loadProblem = async () => {
      try {
        setLoadingProblem(true);
        const data = await apiClient.getProblem(problemId);
        setProblem(data);
      } catch (err) {
        console.error('Error loading problem:', err);
        // Use default problem if API fails
        setProblem(null);
      } finally {
        setLoadingProblem(false);
      }
    };

    loadProblem();
  }, [problemId]);

  const handleReset = () => {
    setStrategy('');
    setCode('');
    setIsSubmitted(false);
    setSuccess(false);
    setError(null);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);
      setSuccess(false);

      if (!strategy.trim() || !code.trim()) {
        setError('Please fill in both strategy and code before submitting');
        return;
      }

      await apiClient.submitSolution(
        problemId,
        TEST_USER_ID,
        code,
        strategy,
        'python'
      );

      setIsSubmitted(true);
      setSuccess(true);
      
      // Show success for 2 seconds then reset if user wants
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit solution';
      setError(errorMessage);
      console.error('Error submitting solution:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-1">Whiteboard Mode</h2>
          <p className="text-sm text-muted-foreground">
            Think through the logic first, then code manually
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="border-2 border-border"
            disabled={isSubmitting}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !strategy.trim() || !code.trim()}
            className={`${
              isSubmitted
                ? 'bg-success hover:bg-success/90'
                : 'bg-indigo hover:bg-indigo-dark'
            } border-2 ${isSubmitted ? 'border-success' : 'border-indigo-light'}`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : isSubmitted ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Submitted
              </>
            ) : (
              'Submit Solution'
            )}
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert className="border-destructive bg-destructive/10">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Success Alert */}
      {success && (
        <Alert className="border-success bg-success/10">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>Solution submitted successfully! 🎉</AlertDescription>
        </Alert>
      )}

      {/* Current Problem */}
      {loadingProblem ? (
        <Card className="border-2 border-indigo/50 bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading problem...
            </div>
          </CardContent>
        </Card>
      ) : problem ? (
        <Card className="border-2 border-indigo/50 bg-card/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">
                {problem.leetcode_number}. {problem.title}
              </CardTitle>
              <div className="flex gap-2">
                <Badge
                  className={`${
                    problem.difficulty === 'Easy'
                      ? 'bg-success/20 text-success border border-success/50'
                      : problem.difficulty === 'Medium'
                      ? 'bg-warning/20 text-warning border border-warning/50'
                      : 'bg-destructive/20 text-destructive border border-destructive/50'
                  }`}
                >
                  {problem.difficulty}
                </Badge>
                <Badge variant="outline" className="border-indigo/40 text-indigo-light">
                  {problem.pattern}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">{problem.description}</p>
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-muted-foreground">Time:</span> {problem.time_complexity}
              </div>
              <div>
                <span className="text-muted-foreground">Space:</span> {problem.space_complexity}
              </div>
              <div>
                <span className="text-muted-foreground">Focus:</span> {problem.concept_focus}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-2 border-indigo/50 bg-card/50">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">
              Problem not found. Using default problem.
            </div>
          </CardContent>
        </Card>
      )}

      {/* Split View */}
      <div className="grid grid-cols-2 gap-4 h-[calc(100vh-16rem)]">
        {/* Strategy Panel */}
        <Card className="border-2 border-border bg-card flex flex-col">
          <CardHeader className="border-b border-border pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="w-5 h-5 text-indigo" />
              Plain English Strategy
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              Explain your approach in simple terms before coding
            </p>
          </CardHeader>
          <CardContent className="flex-1 p-4">
            <Textarea
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
              placeholder="1. What pattern does this problem use?
2. What are the edge cases?
3. Step-by-step approach:
   - First, I will...
   - Then, I will...
   - Finally..."
              className="h-full resize-none border-2 border-border bg-background font-mono text-sm focus:border-indigo focus-visible:ring-0"
            />
          </CardContent>
        </Card>

        {/* Code Panel */}
        <Card className="border-2 border-border bg-card flex flex-col">
          <CardHeader className="border-b border-border pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Code2 className="w-5 h-5 text-indigo" />
              Manual Notepad
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              No autocomplete - write your solution from scratch
            </p>
          </CardHeader>
          <CardContent className="flex-1 p-4">
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="# Write your solution here
def isPalindrome(head):
    # Your code here
    pass"
              className="h-full resize-none border-2 border-border bg-background font-mono text-sm focus:border-indigo focus-visible:ring-0"
              spellCheck={false}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
