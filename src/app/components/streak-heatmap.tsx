import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Flame } from 'lucide-react';

// Generate mock data for the last 12 weeks
const generateHeatmapData = () => {
  const data = [];
  const today = new Date();
  
  for (let week = 11; week >= 0; week--) {
    const weekData = [];
    for (let day = 0; day < 7; day++) {
      const date = new Date(today);
      date.setDate(date.getDate() - (week * 7 + (6 - day)));
      
      // Random activity level (0-4)
      const level = Math.floor(Math.random() * 5);
      weekData.push({
        date: date.toISOString().split('T')[0],
        level,
        count: level === 0 ? 0 : level
      });
    }
    data.push(weekData);
  }
  
  return data;
};

const getLevelColor = (level: number) => {
  const colors = [
    'bg-muted border-border',
    'bg-indigo/20 border-indigo/30',
    'bg-indigo/40 border-indigo/50',
    'bg-indigo/60 border-indigo/70',
    'bg-indigo border-indigo-light'
  ];
  return colors[level] || colors[0];
};

export function StreakHeatmap() {
  const heatmapData = generateHeatmapData();
  const currentStreak = 7;
  const longestStreak = 23;
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <Card className="border-2 border-border bg-card">
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Flame className="w-5 h-5 text-indigo" />
            Daily Streak Tracker
          </CardTitle>
          <div className="flex gap-4">
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Current Streak</div>
              <div className="flex items-center gap-1">
                <Flame className="w-4 h-4 text-warning" />
                <span className="text-lg text-warning">{currentStreak}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Longest Streak</div>
              <div className="text-lg text-indigo-light">{longestStreak}</div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Heatmap Grid */}
          <div className="flex gap-1">
            {/* Day labels */}
            <div className="flex flex-col gap-1 text-[10px] text-muted-foreground justify-start pt-4">
              {days.map((day, i) => (
                <div key={day} className="h-3 flex items-center">
                  {i % 2 === 1 && day}
                </div>
              ))}
            </div>
            
            {/* Heatmap cells */}
            <div className="flex-1">
              <div className="flex gap-1">
                {heatmapData.map((week, weekIdx) => (
                  <div key={weekIdx} className="flex flex-col gap-1">
                    {week.map((day, dayIdx) => (
                      <div
                        key={`${weekIdx}-${dayIdx}`}
                        className={`w-3 h-3 rounded-sm border ${getLevelColor(day.level)} transition-all hover:scale-125 cursor-pointer`}
                        title={`${day.date}: ${day.count} problems`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`w-3 h-3 rounded-sm border ${getLevelColor(level)}`}
                />
              ))}
            </div>
            <span className="text-muted-foreground">More</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
