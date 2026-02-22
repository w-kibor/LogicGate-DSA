import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ComplexityBadge } from './complexity-badge';
import { CheckCircle2, Circle, ExternalLink, Target } from 'lucide-react';

interface DailyProblemCardProps {
  type: 'Review' | 'Topic-Specific' | 'Challenge';
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  pattern: string;
  timeComplexity: string;
  spaceComplexity: string;
  leetcodeNumber: number;
  description: string;
  conceptFocus?: string;
}

const difficultyColors = {
  Easy: 'text-success border-success/50 bg-success/10',
  Medium: 'text-warning border-warning/50 bg-warning/10',
  Hard: 'text-destructive border-destructive/50 bg-destructive/10'
};

const typeIcons = {
  Review: '🔄',
  'Topic-Specific': '🎯',
  Challenge: '⚡'
};

export function DailyProblemCard({
  type,
  title,
  difficulty,
  pattern,
  timeComplexity,
  spaceComplexity,
  leetcodeNumber,
  description,
  conceptFocus
}: DailyProblemCardProps) {
  const [understood, setUnderstood] = useState(false);

  return (
    <Card className="border-2 border-border bg-card hover:border-indigo/50 transition-all duration-300 group">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{typeIcons[type]}</span>
            <div>
              <CardTitle className="text-lg">
                {leetcodeNumber}. {title}
              </CardTitle>
              <CardDescription className="text-xs mt-1">{type}</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className={difficultyColors[difficulty]}>
            {difficulty}
          </Badge>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">
            {pattern}
          </Badge>
          {conceptFocus && (
            <Badge variant="outline" className="text-xs border-indigo/30 text-indigo-light">
              <Target className="w-3 h-3 mr-1" />
              {conceptFocus}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        <ComplexityBadge time={timeComplexity} space={spaceComplexity} />

        <div className="flex gap-2 pt-2">
          <Button
            onClick={() => setUnderstood(!understood)}
            className={`flex-1 ${
              understood 
                ? 'bg-indigo hover:bg-indigo-dark border-2 border-indigo-light' 
                : 'bg-muted hover:bg-muted/80 text-foreground border-2 border-border'
            } transition-all duration-300`}
          >
            {understood ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Logic Understood!
              </>
            ) : (
              <>
                <Circle className="w-4 h-4 mr-2" />
                I Understand the Logic
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="border-2 border-border hover:border-indigo hover:bg-indigo/10"
            onClick={() => window.open(`https://leetcode.com/problems/`, '_blank')}
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
