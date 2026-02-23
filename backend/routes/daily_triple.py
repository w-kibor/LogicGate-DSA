from fastapi import APIRouter, HTTPException
from datetime import datetime, timedelta
import random

from backend.models import DailyTripleResponse, ProblemResponse, DifficultyEnum
from backend.data.seed_data import LEETCODE_PROBLEMS, get_pattern_problems, get_all_patterns
from backend.supabase_config import get_supabase

router = APIRouter()
supabase = get_supabase()

def get_user_daily_state(user_id: str) -> dict:
    """Return a minimal daily state placeholder for now."""
    return {
        "user_id": user_id,
        "last_generated": None,
    }

def problem_to_response(problem: dict, problem_id: str) -> ProblemResponse:
    """Convert problem dict to response model"""
    return ProblemResponse(
        id=problem_id,
        title=problem["title"],
        leetcode_number=problem["leetcode_number"],
        difficulty=DifficultyEnum(problem["difficulty"]),
        pattern=problem["pattern"],
        description=problem["description"],
        time_complexity=problem["time_complexity"],
        space_complexity=problem["space_complexity"],
        concept_focus=problem["concept_focus"],
        link=problem["link"]
    )

@router.get("/daily-triple/{user_id}", response_model=DailyTripleResponse)
async def get_daily_triple(user_id: str):
    """
    Get the daily triple for a user:
    - Review: Problem from 3 days ago
    - Topic: Problem from current active pattern
    - Challenge: Random hard/medium problem
    """
    
    if not LEETCODE_PROBLEMS:
        raise HTTPException(status_code=500, detail="No problems available")
    
    state = get_user_daily_state(user_id)
    
    # Review: Random Easy problem
    review_problem = random.choice([p for p in LEETCODE_PROBLEMS if p["difficulty"] == "Easy"])
    review_id = f"problem_{review_problem['leetcode_number']}"
    
    # Topic: Random from the DSA patterns (simulating active pattern)
    topic_problem = random.choice(LEETCODE_PROBLEMS)
    topic_id = f"problem_{topic_problem['leetcode_number']}"
    
    # Challenge: Random Medium or Hard problem
    challenge_options = [p for p in LEETCODE_PROBLEMS if p["difficulty"] in ["Medium", "Hard"]]
    challenge_problem = random.choice(challenge_options) if challenge_options else random.choice(LEETCODE_PROBLEMS)
    challenge_id = f"problem_{challenge_problem['leetcode_number']}"
    
    return DailyTripleResponse(
        review=problem_to_response(review_problem, review_id),
        topic=problem_to_response(topic_problem, topic_id),
        challenge=problem_to_response(challenge_problem, challenge_id)
    )

@router.get("/problems/pattern/{pattern}", response_model=list[ProblemResponse])
async def get_problems_by_pattern(pattern: str):
    """Get all problems for a specific DSA pattern"""
    problems = get_pattern_problems(pattern)
    
    if not problems:
        raise HTTPException(status_code=404, detail=f"Pattern '{pattern}' not found")
    
    return [
        problem_to_response(p, f"problem_{p['leetcode_number']}")
        for p in problems
    ]

@router.get("/patterns", response_model=list[str])
async def get_patterns():
    """Get all available DSA patterns"""
    return sorted(get_all_patterns())

@router.get("/problems/{problem_id}", response_model=ProblemResponse)
async def get_problem(problem_id: str):
    """Get a specific problem by ID"""
    # Parse problem_id format: "problem_123"
    try:
        number = int(problem_id.split("_")[1])
    except (IndexError, ValueError):
        raise HTTPException(status_code=400, detail="Invalid problem ID format")
    
    problem = next((p for p in LEETCODE_PROBLEMS if p["leetcode_number"] == number), None)
    
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")
    
    return problem_to_response(problem, problem_id)
