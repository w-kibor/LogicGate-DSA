import React from 'react';
import { Badge } from './ui/badge';

interface ComplexityBadgeProps {
  time?: string;
  space?: string;
  size?: 'sm' | 'default';
}

export function ComplexityBadge({ time, space, size = 'default' }: ComplexityBadgeProps) {
  return (
    <div className="flex gap-2 items-center">
      {time && (
        <Badge 
          variant="outline" 
          className="border-indigo/40 bg-indigo/10 text-indigo-light font-mono text-xs px-2 py-0.5"
        >
          Time: {time}
        </Badge>
      )}
      {space && (
        <Badge 
          variant="outline" 
          className="border-indigo/40 bg-indigo/10 text-indigo-light font-mono text-xs px-2 py-0.5"
        >
          Space: {space}
        </Badge>
      )}
    </div>
  );
}
