# 🚀 LogicGate DSA - Quick Start Guide for Tomorrow

Follow these steps to get the system fully functional by tomorrow morning!

## ✅ Prerequisites
- Node.js 18+ installed
- Python 3.9+ installed
- Supabase account (free tier is fine)

---

## 📋 Step-by-Step Setup

### Step 1: Backend Setup (5 minutes)

Navigate to the backend directory:
```bash
cd backend
```

Create a virtual environment:
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python -m venv venv
source venv/bin/activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

### Step 2: Supabase Configuration (10 minutes)

1. Go to [supabase.com](https://supabase.com) and sign up (free)
2. Create a new project
3. Once created, go to **Project Settings** → **API**
4. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **Anon Public Key** (under API Keys)
   - **Service Role Secret** (under API Keys)

### Step 3: Configure Environment Variables

**Backend (`backend/.env`):**
```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your-anon-public-key-here
SUPABASE_SERVICE_KEY=your-service-role-key-here
ENVIRONMENT=development
API_HOST=0.0.0.0
API_PORT=8000
FRONTEND_URL=http://localhost:5173
```

**Frontend (`.env.local`):**
```
VITE_API_URL=http://localhost:8000
VITE_TEST_USER_ID=test-user-001
```

### Step 4: Start Backend Server

From `backend` directory (with venv activated):
```bash
python main.py
```

Expected output:
```
Uvicorn running on http://0.0.0.0:8000
```

Visit [http://localhost:8000/docs](http://localhost:8000/docs) to see the API documentation!

### Step 5: Start Frontend (New Terminal)

From root directory:
```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to see the app!

---

## 🎯 What's Working Now

### Frontend
- ✅ Daily Dashboard fetches 3 problems from backend (Review, Topic, Challenge)
- ✅ Whiteboard Mode to write strategy + code
- ✅ Submit solutions to backend
- ✅ Real-time error handling and loading states
- ✅ Connected to FastAPI backend API

### Backend
- ✅ FastAPI server with CORS configured
- ✅ 20+ LeetCode problems pre-seeded
- ✅ `/api/daily-triple/{user_id}` endpoint
- ✅ `/api/submit` endpoint for code submissions
- ✅ `/api/progress/{user_id}` endpoint for tracking
- ✅ `/api/patterns` endpoint to list all DSA patterns

### Data
- ✅ Pre-seeded with 20+ real LeetCode problems
- ✅ Organized by difficulty and pattern
- ✅ Ready to be pushed to Supabase

---

## 📱 Using the App Tomorrow

1. **Open Dashboard** → See today's 3 problems (refreshes daily for each user)
2. **Select a Problem** → Go to Whiteboard Mode
3. **Write Strategy** → Plain English explanation of your approach
4. **Write Code** → Python code implementation (no autocomplete)
5. **Submit** → Solution is saved to backend
6. **Track Progress** → View stats and streaks

---

## 🌐 Deployment to Vercel (Optional for Tomorrow)

### Backend Deployment

1. Create a `vercel.json` file (already exists)
2. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```
3. Deploy:
   ```bash
   cd backend
   vercel
   ```
4. Set environment variables in Vercel dashboard
5. Get your Vercel URL and update frontend VITE_API_URL

### Frontend Deployment

```bash
npm run build
vercel
```

---

## 🐛 Troubleshooting

**Problems not loading?**
- Check backend is running: `python main.py` in backend directory
- Check VITE_API_URL in frontend `.env.local`
- Check browser console for errors (F12)

**Import errors?**
- Make sure virtual environment is activated: `venv\Scripts\activate` (Windows)
- Reinstall packages: `pip install -r requirements.txt`

**Connection refused?**
- Backend not running on port 8000
- CORS issue - check FRONTEND_URL in backend `.env`

---

## 📚 API Endpoints Reference

### Daily Triple
```
GET /api/daily-triple/{user_id}
```
Returns today's 3 problems

### Submit Solution
```
POST /api/submit
Body: { problem_id, user_id, code, strategy, language }
```

### Get User Progress
```
GET /api/progress/{user_id}
```

### Get All Patterns
```
GET /api/patterns
```

[See full API docs at http://localhost:8000/docs]

---

## 🎉 You're Ready!

Everything is set up and ready to go. Just follow these steps tomorrow morning:

1. Activate backend venv and run `python main.py`
2. Open new terminal, run `npm run dev`
3. Visit http://localhost:5173
4. Start solving! 🚀

**Total setup time: ~20 minutes**

---

Questions? Check the backend README or frontend component code comments!
