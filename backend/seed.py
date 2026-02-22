#!/usr/bin/env python3
"""
Seed LeetCode problems to Supabase database
Run this script to populate the problems table with seed data
"""

import sys
from dotenv import load_dotenv
from supabase_config import get_supabase
from data.seed_data import LEETCODE_PROBLEMS

load_dotenv()

def seed_problems():
    """Seed problems to Supabase"""
    supabase = get_supabase()
    
    print(f"🌱 Seeding {len(LEETCODE_PROBLEMS)} LeetCode problems to Supabase...")
    
    try:
        # First, clear existing problems (optional - comment out to keep existing)
        # supabase.table("problems").delete().neq("id", "").execute()
        
        # Insert all problems
        for problem in LEETCODE_PROBLEMS:
            problem_doc = {
                "id": f"problem_{problem['leetcode_number']}",
                "title": problem["title"],
                "leetcode_number": problem["leetcode_number"],
                "difficulty": problem["difficulty"],
                "pattern": problem["pattern"],
                "description": problem["description"],
                "time_complexity": problem["time_complexity"],
                "space_complexity": problem["space_complexity"],
                "concept_focus": problem["concept_focus"],
                "link": problem["link"]
            }
            
            try:
                # Try to insert (ignore if already exists)
                supabase.table("problems").insert(problem_doc).execute()
                print(f"✅ Seeded: {problem['title']}")
            except Exception as e:
                if "duplicate" in str(e).lower():
                    print(f"⏭️  Already exists: {problem['title']}")
                else:
                    print(f"⚠️  Error seeding {problem['title']}: {str(e)}")
        
        print("\n✅ Seeding complete!")
        print(f"📊 Total problems in database: {len(LEETCODE_PROBLEMS)}")
        
    except Exception as e:
        print(f"❌ Error connecting to Supabase: {str(e)}")
        print("Make sure your .env file has valid SUPABASE_URL and SUPABASE_KEY")
        sys.exit(1)

if __name__ == "__main__":
    seed_problems()
