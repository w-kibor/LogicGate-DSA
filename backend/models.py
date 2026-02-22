from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from enum import Enum

class DifficultyEnum(str, Enum):
    EASY = "Easy"
    MEDIUM = "Medium"
    HARD = "Hard"

class ProblemResponse(BaseModel):
    id: str
    title: str
    leetcode_number: int
    difficulty: DifficultyEnum
    pattern: str
    description: str
    time_complexity: str
    space_complexity: str
    concept_focus: str
    link: str

class DailyTripleResponse(BaseModel):
    review: ProblemResponse
    topic: ProblemResponse
    challenge: ProblemResponse

class SubmissionRequest(BaseModel):
    problem_id: str
    user_id: str
    code: str
    strategy: str
    language: str = "python"

class SubmissionResponse(BaseModel):
    id: str
    problem_id: str
    user_id: str
    submitted_at: datetime
    status: str
    passed: bool

class ProgressResponse(BaseModel):
    total_problems_solved: int
    streak_days: int
    patterns_mastered: List[str]
    confidence_scores: dict

class UserProfileResponse(BaseModel):
    user_id: str
    username: str
    created_at: datetime
    total_submissions: int
    current_streak: int
