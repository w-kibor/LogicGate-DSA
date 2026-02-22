import React from 'react';
import { Progress } from './ui/progress';

interface PatternProgressProps {
  pattern: string;
  completed: number;
  total: number;
  color?: string;
}

export function PatternProgress({ pattern, completed, total, color = '#6366f1' }: PatternProgressProps) {
  const percentage = (completed / total) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">{pattern}</span>
        <span className="text-xs text-muted-foreground">{completed}/{total}</span>
      </div>
      <div className="relative h-2 bg-muted rounded-full overflow-hidden border border-border">
        <div 
          className="h-full transition-all duration-500 rounded-full"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}40`
          }}
        />
      </div>
    </div>
  );
}
