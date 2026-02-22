import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Code2 } from 'lucide-react';

const cheatsheetData = [
  {
    category: 'Arrays',
    snippets: [
      { label: 'Two Pointers', code: 'left, right = 0, len(arr)-1' },
      { label: 'Sliding Window', code: 'sum += arr[end]; end++' }
    ]
  },
  {
    category: 'Strings',
    snippets: [
      { label: 'Reverse', code: 's[::-1]' },
      { label: 'Join', code: '\'\'.join(chars)' }
    ]
  },
  {
    category: 'Graphs',
    snippets: [
      { label: 'DFS', code: 'visited.add(node)' },
      { label: 'BFS', code: 'queue = deque([start])' }
    ]
  },
  {
    category: 'Trees',
    snippets: [
      { label: 'Inorder', code: 'left → root → right' },
      { label: 'Level Order', code: 'use queue for BFS' }
    ]
  },
  {
    category: 'DP',
    snippets: [
      { label: 'Memoization', code: '@cache decorator' },
      { label: 'Bottom-up', code: 'dp[i] = dp[i-1] + ...' }
    ]
  }
];

export function SyntaxCheatsheet() {
  return (
    <Card className="border-2 border-border bg-card h-full">
      <CardHeader className="border-b border-border pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <Code2 className="w-5 h-5 text-indigo" />
          Syntax Cheat Sheet
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="p-4 space-y-4">
            {cheatsheetData.map((section) => (
              <div key={section.category} className="space-y-2">
                <h4 className="text-sm text-indigo-light border-b border-border pb-1">
                  {section.category}
                </h4>
                <div className="space-y-2">
                  {section.snippets.map((snippet, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="text-xs text-muted-foreground">
                        {snippet.label}
                      </div>
                      <div className="bg-muted border border-border rounded p-2 font-mono text-xs text-foreground">
                        {snippet.code}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
