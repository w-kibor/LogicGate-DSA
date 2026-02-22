from fastapi import APIRouter, HTTPException
from datetime import datetime
from models import SubmissionRequest, SubmissionResponse
from supabase_config import get_supabase
import uuid

router = APIRouter()
supabase = get_supabase()

@router.post("/submit", response_model=SubmissionResponse)
async def submit_solution(submission: SubmissionRequest):
    """
    Submit a solution for a problem
    Stores strategy + code together for review in Supabase
    """
    
    try:
        submission_id = str(uuid.uuid4())
        
        # Insert into Supabase submissions table
        result = supabase.table("submissions").insert({
            "id": submission_id,
            "problem_id": submission.problem_id,
            "user_id": submission.user_id,
            "code": submission.code,
            "strategy": submission.strategy,
            "language": submission.language,
            "submitted_at": datetime.now().isoformat(),
            "status": "pending",
            "passed": False
        }).execute()
        
        return SubmissionResponse(
            id=submission_id,
            problem_id=submission.problem_id,
            user_id=submission.user_id,
            submitted_at=datetime.now(),
            status="pending",
            passed=False
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to submit solution: {str(e)}")

@router.get("/submissions/{user_id}", response_model=list[SubmissionResponse])
async def get_user_submissions(user_id: str):
    """Get all submissions for a user"""
    try:
        result = supabase.table("submissions").select("*").eq("user_id", user_id).execute()
        
        submissions = result.data if result.data else []
        
        return [
            SubmissionResponse(
                id=s["id"],
                problem_id=s["problem_id"],
                user_id=s["user_id"],
                submitted_at=datetime.fromisoformat(s["submitted_at"]),
                status=s["status"],
                passed=s["passed"]
            )
            for s in submissions
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch submissions: {str(e)}")

@router.get("/submissions/{user_id}/{problem_id}", response_model=list[SubmissionResponse])
async def get_problem_submissions(user_id: str, problem_id: str):
    """Get all submissions for a specific problem by a user"""
    try:
        result = supabase.table("submissions").select("*").eq("user_id", user_id).eq("problem_id", problem_id).execute()
        
        submissions = result.data if result.data else []
        
        return [
            SubmissionResponse(
                id=s["id"],
                problem_id=s["problem_id"],
                user_id=s["user_id"],
                submitted_at=datetime.fromisoformat(s["submitted_at"]),
                status=s["status"],
                passed=s["passed"]
            )
            for s in submissions
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch submissions: {str(e)}")
