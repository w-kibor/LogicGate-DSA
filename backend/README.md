# 🚀 LogicGate DSA Backend Setup

## Prerequisites
- Python 3.9+
- pip or conda package manager
- Supabase account (set up your project and get credentials)

## Quick Start

### 1. Create Virtual Environment
```bash
cd backend
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables
Create `.env` file in the `backend` directory (copy from `.env.example`):

```bash
# Copy the template
cp .env.example .env

# Edit .env with your Supabase credentials
```

**Required Environment Variables:**
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_role_key
FRONTEND_URL=http://localhost:5173
```

### 4. Run Development Server
```bash
python main.py
```

The API will be available at `http://localhost:8000`

### API Documentation
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

---

## 📋 API Endpoints

### Daily Triple
- `GET /api/daily-triple/{user_id}` - Get today's 3 problems (Review, Topic, Challenge)
- `GET /api/patterns` - Get all available DSA patterns
- `GET /api/problems/pattern/{pattern}` - Get problems for a pattern
- `GET /api/problems/{problem_id}` - Get specific problem

### Submissions
- `POST /api/submit` - Submit a solution
- `GET /api/submissions/{user_id}` - Get user's submissions
- `GET /api/submissions/{user_id}/{problem_id}` - Get submissions for a problem

### Progress
- `GET /api/progress/{user_id}` - Get user progress summary
- `GET /api/profile/{user_id}` - Get user profile
- `PATCH /api/progress/{user_id}/streak` - Update streak
- `POST /api/progress/{user_id}/pattern-mastered` - Mark pattern as mastered
- `POST /api/progress/{user_id}/confidence` - Update pattern confidence

---

## 🌐 Deployment to Vercel

### Prerequisites
- Vercel CLI: `npm i -g vercel`
- GitHub repository connected

### Deploy
```bash
vercel
```

Follow the prompts and add environment variables:
- SUPABASE_URL
- SUPABASE_KEY
- SUPABASE_SERVICE_KEY
- FRONTEND_URL (your production frontend URL)

---

## 📚 Project Structure

```
backend/
├── main.py                 # FastAPI app entry point
├── models.py              # Pydantic data models
├── supabase_config.py     # Supabase client setup
├── requirements.txt       # Python dependencies
├── routes/
│   ├── daily_triple.py    # Daily problem endpoints
│   ├── submission.py      # Submission endpoints
│   └── progress.py        # Progress tracking endpoints
└── data/
    └── seed_data.py       # LeetCode problems dataset (20+ problems)
```

---

## 🔗 Next Steps

1. Install dependencies locally
2. Set up Supabase project and get credentials
3. Create `.env` file with credentials
4. Run `python main.py` to start server
5. Connect frontend to backend APIs
6. Deploy to Vercel

---

## ❓ Troubleshooting

**ModuleNotFoundError:**
```bash
# Ensure virtual environment is activated
# Then reinstall dependencies
pip install -r requirements.txt
```

**Connection error to Supabase:**
- Check SUPABASE_URL and SUPABASE_KEY in .env
- Ensure your Supabase project is active

**CORS errors:**
- Add your frontend URL to FRONTEND_URL in .env
