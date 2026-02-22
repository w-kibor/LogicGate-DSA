import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp } from 'lucide-react';

const patternData = [
  { pattern: 'Arrays', confidence: 85, total: 45 },
  { pattern: 'Strings', confidence: 75, total: 32 },
  { pattern: 'Trees', confidence: 70, total: 28 },
  { pattern: 'Graphs', confidence: 55, total: 18 },
  { pattern: 'DP', confidence: 45, total: 15 },
  { pattern: 'Backtracking', confidence: 60, total: 20 },
  { pattern: 'Greedy', confidence: 80, total: 25 },
  { pattern: 'Binary Search', confidence: 90, total: 30 }
];

export function ConfidenceRadar() {
  return (
    <Card className="border-2 border-border bg-card">
      <CardHeader className="border-b border-border pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <TrendingUp className="w-5 h-5 text-indigo" />
          Confidence Radar by Pattern
        </CardTitle>
        <p className="text-xs text-muted-foreground mt-1">
          Your mastery level across DSA patterns (%)
        </p>
      </CardHeader>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={patternData}>
            <PolarGrid stroke="#27272a" />
            <PolarAngleAxis 
              dataKey="pattern" 
              tick={{ fill: '#a1a1aa', fontSize: 12 }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]}
              tick={{ fill: '#71717a', fontSize: 10 }}
            />
            <Radar
              name="Confidence"
              dataKey="confidence"
              stroke="#6366f1"
              fill="#6366f1"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#18181b',
                border: '2px solid #27272a',
                borderRadius: '8px',
                padding: '8px 12px'
              }}
              labelStyle={{ color: '#f4f4f5' }}
              itemStyle={{ color: '#818cf8' }}
              formatter={(value: number, name: string, props: any) => [
                `${value}% (${props.payload.total} problems)`,
                'Confidence'
              ]}
            />
          </RadarChart>
        </ResponsiveContainer>

        {/* Pattern Stats */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {patternData.map((item) => (
            <div
              key={item.pattern}
              className="flex items-center justify-between p-2 bg-muted/50 border border-border rounded"
            >
              <span className="text-xs text-muted-foreground">{item.pattern}</span>
              <div className="flex items-center gap-2">
                <div className="text-xs text-foreground">{item.total} solved</div>
                <div 
                  className="text-xs px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: `rgba(99, 102, 241, ${item.confidence / 100})`,
                    color: item.confidence > 60 ? '#fff' : '#818cf8'
                  }}
                >
                  {item.confidence}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
