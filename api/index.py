"""
Vercel serverless function entry point for FastAPI backend
This file is used by Vercel to route requests to the FastAPI application
"""

import sys
import os

# Add backend to path so we can import it
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

# Import the FastAPI app from backend
from main import app

# Export for Vercel
export_app = app

# Handler for Vercel
async def handler(request):
    return await app(request)
