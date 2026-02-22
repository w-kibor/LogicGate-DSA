import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from routes import daily_triple, submission, progress

load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="LogicGate DSA Backend",
    description="Backend for DSA Mastery Tracker",
    version="0.1.0"
)

# CORS Configuration
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
VERCEL_URL = os.getenv("VERCEL_URL")

origins = [
    FRONTEND_URL,
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5174",  # Added for Vite dev server default
]

# Add Vercel deployment URL if available
if VERCEL_URL:
    origins.append(f"https://{VERCEL_URL}")
    # Also add www version
    origins.append(f"https://www.{VERCEL_URL}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(daily_triple.router, prefix="/api", tags=["daily-triple"])
app.include_router(submission.router, prefix="/api", tags=["submissions"])
app.include_router(progress.router, prefix="/api", tags=["progress"])

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "ok",
        "message": "LogicGate DSA Backend is running",
        "version": "0.1.0"
    }

@app.get("/health")
async def health():
    """Health check endpoint for deployment"""
    return {
        "status": "healthy",
        "service": "logicgate-dsa-backend"
    }

@app.get("/api/status")
async def api_status():
    """API status endpoint"""
    return {
        "status": "online",
        "environment": os.getenv("ENVIRONMENT", "development")
    }

if __name__ == "__main__":
    import uvicorn
    
    host = os.getenv("API_HOST", "0.0.0.0")
    port = int(os.getenv("API_PORT", 8000))
    environment = os.getenv("ENVIRONMENT", "development")
    
    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=(environment == "development")
    )
