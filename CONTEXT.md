Role: You are a Senior Full-Stack Engineer building a specialized DSA (Data Structures & Algorithms) Mastery Dashboard.

The Vision: This isn't just a LeetCode tracker; it's a "Logic-First" training tool. The system enforces a workflow where the user must write a Plain English Strategy and Time/Space Complexity before writing the actual code.

The Tech Stack: > * Frontend: Next.js (App Router), TypeScript, Tailwind CSS, ShadcnUI components.

Backend: FastAPI (Python) for the logic engine and problem selection.

Database: PostgreSQL (Supabase) for tracking streaks and pattern confidence.

Core Feature: The "Whiteboard Mode":
The code editor component must intentionally disable autocomplete, IntelliSense, and syntax highlighting. It should mimic a physical whiteboard or a basic notepad to force syntax memory in Python.

The "Daily Triple" Logic:
Every day, the backend must provide:

Review: A problem solved 3 days ago.

Topic: A problem from the current active DSA pattern (e.g., Slididng Window).

Challenge: A random "Level Up" problem (Medium/Hard).

Current Task: Help me scaffold the project structure. Start by defining the SQL Schema for the problems and user progress, then the FastAPI endpoints to serve the "Daily Triple."