import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { DailyDashboard } from './components/daily-dashboard';
import { WhiteboardMode } from './components/whiteboard-mode';
import { ProgressAnalytics } from './components/progress-analytics';
import { SyntaxCheatsheet } from './components/syntax-cheatsheet';
import { Code2, LayoutDashboard, TrendingUp, BookOpen } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-background dark">
      {/* Header */}
      <header className="border-b-2 border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo rounded-lg flex items-center justify-center border-2 border-indigo-light">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl">DSA Mastery Tracker</h1>
                <p className="text-xs text-muted-foreground">
                  Logic over Syntax • Consistency over Intensity
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-indigo/10 border border-indigo/30 rounded text-xs text-indigo-light">
                Big Tech Ready 🎯
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex gap-6">
          {/* Main Content Area */}
          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6 border-2 border-border bg-muted/50 p-1">
                <TabsTrigger 
                  value="dashboard"
                  className="data-[state=active]:bg-indigo data-[state=active]:text-white data-[state=active]:border-2 data-[state=active]:border-indigo-light"
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Daily Focus
                </TabsTrigger>
                <TabsTrigger 
                  value="whiteboard"
                  className="data-[state=active]:bg-indigo data-[state=active]:text-white data-[state=active]:border-2 data-[state=active]:border-indigo-light"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Whiteboard
                </TabsTrigger>
                <TabsTrigger 
                  value="analytics"
                  className="data-[state=active]:bg-indigo data-[state=active]:text-white data-[state=active]:border-2 data-[state=active]:border-indigo-light"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Analytics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="mt-0">
                <DailyDashboard />
              </TabsContent>

              <TabsContent value="whiteboard" className="mt-0">
                <WhiteboardMode />
              </TabsContent>

              <TabsContent value="analytics" className="mt-0">
                <ProgressAnalytics />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Syntax Cheat Sheet */}
          {activeTab === 'whiteboard' && (
            <div className="w-80">
              <SyntaxCheatsheet />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t-2 border-border bg-card/50 mt-12">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div>Built with FastAPI + Next.js • Styled with Tailwind CSS</div>
            <div className="flex items-center gap-4">
              <span>© 2026 DSA Mastery Tracker</span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
                System Active
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
