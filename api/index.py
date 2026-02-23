"""
Vercel serverless function entry point for FastAPI backend
This file is used by Vercel to route requests to the FastAPI application
"""

import os
import sys

# Add project root to path so backend can be imported as a package
project_root = os.path.dirname(os.path.dirname(__file__))
if project_root not in sys.path:
    sys.path.insert(0, project_root)

# Import the FastAPI app from backend
from backend.main import app

# Export for Vercel
export_app = app

# Handler for Vercel
async def handler(request):
    return await app(request)
