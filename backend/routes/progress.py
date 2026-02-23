from fastapi import APIRouter, HTTPException
from datetime import datetime
import uuid

from backend.models import ProgressResponse, UserProfileResponse
from backend.supabase_config import get_supabase

router = APIRouter()

def get_or_create_user(user_id: str):
    """Get or create user profile in Supabase"""
    try:
        supabase = get_supabase()
        # Try to get existing user
        result = supabase.table("user_progress").select("*").eq("user_id", user_id).execute()
        
        if result.data and len(result.data) > 0:
            return result.data[0]
        
        # Create new user if doesn't exist
        new_user = {
            "user_id": user_id,
            "username": f"User_{user_id[:8]}",
            "total_submissions": 0,
            "current_streak": 0,
            "patterns_mastered": [],
            "confidence_scores": {}
        }
        
        supabase.table("user_progress").insert(new_user).execute()
        return new_user
        
    except Exception as e:
        print(f"Error in get_or_create_user: {e}")
        # Return default if error
        return {
            "user_id": user_id,
            "username": f"User_{user_id[:8]}",
            "total_submissions": 0,
            "current_streak": 0,
            "patterns_mastered": [],
            "confidence_scores": {}
        }

@router.get("/progress/{user_id}", response_model=ProgressResponse)
async def get_user_progress(user_id: str):
    """Get user's progress summary"""
    try:
        supabase = get_supabase()
        user = get_or_create_user(user_id)
        
        # Count solved problems (unique problems by user)
        submissions = supabase.table("submissions").select("problem_id").eq("user_id", user_id).eq("passed", True).execute()
        
        solved_problems = set(s["problem_id"] for s in submissions.data) if submissions.data else set()
        
        return ProgressResponse(
            total_problems_solved=len(solved_problems),
            streak_days=user.get("current_streak", 0),
            patterns_mastered=user.get("patterns_mastered", []),
            confidence_scores=user.get("confidence_scores", {})
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch progress: {str(e)}")

@router.get("/profile/{user_id}", response_model=UserProfileResponse)
async def get_user_profile(user_id: str):
    """Get detailed user profile"""
    try:
        supabase = get_supabase()
        user = get_or_create_user(user_id)
        
        submissions = supabase.table("submissions").select("*").eq("user_id", user_id).execute()
        
        return UserProfileResponse(
            user_id=user["user_id"],
            username=user.get("username", ""),
            created_at=datetime.now().isoformat(),
            total_submissions=len(submissions.data) if submissions.data else 0,
            current_streak=user.get("current_streak", 0)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch profile: {str(e)}")

@router.patch("/progress/{user_id}/streak", response_model=ProgressResponse)
async def update_streak(user_id: str, days: int = 1):
    """Update user's streak"""
    try:
        supabase = get_supabase()
        user = get_or_create_user(user_id)
        new_streak = max(user.get("current_streak", 0) + days, 0)
        
        supabase.table("user_progress").update({
            "current_streak": new_streak
        }).eq("user_id", user_id).execute()
        
        submissions = supabase.table("submissions").select("problem_id").eq("user_id", user_id).eq("passed", True).execute()
        solved_problems = set(s["problem_id"] for s in submissions.data) if submissions.data else set()
        
        return ProgressResponse(
            total_problems_solved=len(solved_problems),
            streak_days=new_streak,
            patterns_mastered=user.get("patterns_mastered", []),
            confidence_scores=user.get("confidence_scores", {})
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update streak: {str(e)}")

@router.post("/progress/{user_id}/pattern-mastered")
async def mark_pattern_mastered(user_id: str, pattern: str):
    """Mark a pattern as mastered"""
    try:
        supabase = get_supabase()
        user = get_or_create_user(user_id)
        patterns_mastered = user.get("patterns_mastered", [])
        
        if pattern not in patterns_mastered:
            patterns_mastered.append(pattern)
        
        supabase.table("user_progress").update({
            "patterns_mastered": patterns_mastered
        }).eq("user_id", user_id).execute()
        
        return {
            "message": f"Pattern '{pattern}' marked as mastered",
            "patterns_mastered": patterns_mastered
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to mark pattern mastered: {str(e)}")

@router.post("/progress/{user_id}/confidence")
async def update_confidence(user_id: str, pattern: str, score: float):
    """Update confidence score for a pattern (0-100)"""
    try:
        supabase = get_supabase()
        user = get_or_create_user(user_id)
        
        if score < 0:
            score = 0
        if score > 100:
            score = 100
        
        confidence_scores = user.get("confidence_scores", {})
        confidence_scores[pattern] = score
        
        supabase.table("user_progress").update({
            "confidence_scores": confidence_scores
        }).eq("user_id", user_id).execute()
        
        return {
            "message": f"Confidence score for '{pattern}' updated to {score}",
            "confidence_scores": confidence_scores
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update confidence: {str(e)}")
