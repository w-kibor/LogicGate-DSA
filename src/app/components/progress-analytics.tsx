import React from 'react';
import { StreakHeatmap } from './streak-heatmap';
import { ConfidenceRadar } from './confidence-radar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { BarChart3, Trophy, Clock, Target } from 'lucide-react';

const stats = [
  {
    label: 'Total Solved',
    value: '247',
    icon: Target,
    color: 'text-indigo',
    bgColor: 'bg-indigo/10',
    change: '+12 this week'
  },
  {
    label: 'Avg. Time per Problem',
    value: '28m',
    icon: Clock,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    change: '-5m improvement'
  },
  {
    label: 'Success Rate',
    value: '82%',
    icon: Trophy,
    color: 'text-success',
    bgColor: 'bg-success/10',
    change: '+3% this month'
  },
  {
    label: 'Patterns Mastered',
    value: '5/8',
    icon: BarChart3,
    color: 'text-indigo-light',
    bgColor: 'bg-indigo-light/10',
    change: '2 in progress'
  }
];

export function ProgressAnalytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-2">Progress Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Track your growth and identify areas for improvement
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-2 border-border bg-card hover:border-indigo/50 transition-all">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className={`p-2 rounded ${stat.bgColor}`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <Badge variant="outline" className="text-xs border-border">
                    {stat.change}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Heatmap */}
      <StreakHeatmap />

      {/* Radar Chart */}
      <ConfidenceRadar />

      {/* Recent Activity */}
      <Card className="border-2 border-border bg-card">
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-3">
            {[
              { date: 'Today, 2:30 PM', problem: 'Binary Tree Level Order Traversal', result: 'Solved', time: '25m' },
              { date: 'Today, 11:15 AM', problem: 'Two Sum', result: 'Reviewed', time: '8m' },
              { date: 'Yesterday, 9:45 PM', problem: 'Longest Palindromic Substring', result: 'Attempted', time: '45m' },
              { date: 'Yesterday, 3:20 PM', problem: 'Valid Parentheses', result: 'Solved', time: '12m' }
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted/30 border border-border rounded hover:border-indigo/30 transition-all"
              >
                <div className="flex-1">
                  <div className="text-sm">{activity.problem}</div>
                  <div className="text-xs text-muted-foreground mt-1">{activity.date}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className={
                      activity.result === 'Solved'
                        ? 'border-success/50 bg-success/10 text-success'
                        : activity.result === 'Reviewed'
                        ? 'border-indigo/50 bg-indigo/10 text-indigo-light'
                        : 'border-warning/50 bg-warning/10 text-warning'
                    }
                  >
                    {activity.result}
                  </Badge>
                  <div className="text-xs text-muted-foreground font-mono w-12 text-right">
                    {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
