"""
LeetCode Problems Seed Data
This data is based on common LeetCode problems organized by DSA patterns
"""

LEETCODE_PROBLEMS = [
    # Hash Table / Hash Set
    {
        "title": "Two Sum",
        "leetcode_number": 1,
        "difficulty": "Easy",
        "pattern": "Hash Table",
        "description": "Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target. You may assume that each input has exactly one solution, and you may not use the same element twice.",
        "time_complexity": "O(n)",
        "space_complexity": "O(n)",
        "concept_focus": "Hash Map Lookup",
        "link": "https://leetcode.com/problems/two-sum/"
    },
    {
        "title": "Contains Duplicate",
        "leetcode_number": 217,
        "difficulty": "Easy",
        "pattern": "Hash Table",
        "description": "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
        "time_complexity": "O(n)",
        "space_complexity": "O(n)",
        "concept_focus": "Hash Set Membership",
        "link": "https://leetcode.com/problems/contains-duplicate/"
    },
    {
        "title": "Valid Anagram",
        "leetcode_number": 242,
        "difficulty": "Easy",
        "pattern": "Hash Table",
        "description": "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
        "time_complexity": "O(n)",
        "space_complexity": "O(1)",
        "concept_focus": "Character Frequency Counting",
        "link": "https://leetcode.com/problems/valid-anagram/"
    },
    # Sliding Window
    {
        "title": "Longest Substring Without Repeating Characters",
        "leetcode_number": 3,
        "difficulty": "Medium",
        "pattern": "Sliding Window",
        "description": "Given a string s, find the length of the longest substring without repeating characters.",
        "time_complexity": "O(n)",
        "space_complexity": "O(min(m, n))",
        "concept_focus": "Window Expansion & Contraction",
        "link": "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
    },
    {
        "title": "Best Time to Buy and Sell Stock",
        "leetcode_number": 121,
        "difficulty": "Easy",
        "pattern": "Sliding Window",
        "description": "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction.",
        "time_complexity": "O(n)",
        "space_complexity": "O(1)",
        "concept_focus": "Min-Max Tracking",
        "link": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
    },
    {
        "title": "Sliding Window Maximum",
        "leetcode_number": 239,
        "difficulty": "Hard",
        "pattern": "Sliding Window",
        "description": "You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.",
        "time_complexity": "O(n)",
        "space_complexity": "O(k)",
        "concept_focus": "Deque-based Window Max",
        "link": "https://leetcode.com/problems/sliding-window-maximum/"
    },
    # Trees / BFS
    {
        "title": "Binary Tree Level Order Traversal",
        "leetcode_number": 102,
        "difficulty": "Medium",
        "pattern": "BFS / Trees",
        "description": "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
        "time_complexity": "O(n)",
        "space_complexity": "O(w)",
        "concept_focus": "Queue-based BFS",
        "link": "https://leetcode.com/problems/binary-tree-level-order-traversal/"
    },
    {
        "title": "Binary Tree Inorder Traversal",
        "leetcode_number": 94,
        "difficulty": "Easy",
        "pattern": "DFS / Trees",
        "description": "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
        "time_complexity": "O(n)",
        "space_complexity": "O(h)",
        "concept_focus": "DFS Stack Pattern",
        "link": "https://leetcode.com/problems/binary-tree-inorder-traversal/"
    },
    {
        "title": "Maximum Depth of Binary Tree",
        "leetcode_number": 104,
        "difficulty": "Easy",
        "pattern": "DFS / Trees",
        "description": "Given the root of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
        "time_complexity": "O(n)",
        "space_complexity": "O(h)",
        "concept_focus": "Recursive DFS",
        "link": "https://leetcode.com/problems/maximum-depth-of-binary-tree/"
    },
    # Two Pointers
    {
        "title": "Two Sum II - Input Array Is Sorted",
        "leetcode_number": 167,
        "difficulty": "Medium",
        "pattern": "Two Pointers",
        "description": "Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number.",
        "time_complexity": "O(n)",
        "space_complexity": "O(1)",
        "concept_focus": "Convergent Pointers",
        "link": "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/"
    },
    {
        "title": "Container With Most Water",
        "leetcode_number": 11,
        "difficulty": "Medium",
        "pattern": "Two Pointers",
        "description": "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water.",
        "time_complexity": "O(n)",
        "space_complexity": "O(1)",
        "concept_focus": "Area Maximization",
        "link": "https://leetcode.com/problems/container-with-most-water/"
    },
    {
        "title": "Valid Palindrome",
        "leetcode_number": 125,
        "difficulty": "Easy",
        "pattern": "Two Pointers",
        "description": "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",
        "time_complexity": "O(n)",
        "space_complexity": "O(1)",
        "concept_focus": "Bidirectional Traversal",
        "link": "https://leetcode.com/problems/valid-palindrome/"
    },
    # Dynamic Programming
    {
        "title": "Climbing Stairs",
        "leetcode_number": 70,
        "difficulty": "Easy",
        "pattern": "Dynamic Programming",
        "description": "You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
        "time_complexity": "O(n)",
        "space_complexity": "O(1)",
        "concept_focus": "DP State Transition",
        "link": "https://leetcode.com/problems/climbing-stairs/"
    },
    {
        "title": "House Robber",
        "leetcode_number": 198,
        "difficulty": "Medium",
        "pattern": "Dynamic Programming",
        "description": "You are a professional robber planning to rob houses along a street. You cannot rob two adjacent houses. Given an integer array nums representing the amount of money in each house, return the maximum amount of money you can rob without alerting the police.",
        "time_complexity": "O(n)",
        "space_complexity": "O(1)",
        "concept_focus": "Max Subproblem Selection",
        "link": "https://leetcode.com/problems/house-robber/"
    },
    {
        "title": "Coin Change",
        "leetcode_number": 322,
        "difficulty": "Medium",
        "pattern": "Dynamic Programming",
        "description": "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount.",
        "time_complexity": "O(n*m)",
        "space_complexity": "O(m)",
        "concept_focus": "Bottom-Up DP",
        "link": "https://leetcode.com/problems/coin-change/"
    },
    # Graphs
    {
        "title": "Number of Islands",
        "leetcode_number": 200,
        "difficulty": "Medium",
        "pattern": "Graph / DFS",
        "description": "Given an m x n 2D binary grid grid which represents a map of 1s (land) and 0s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
        "time_complexity": "O(m*n)",
        "space_complexity": "O(m*n)",
        "concept_focus": "Connected Components",
        "link": "https://leetcode.com/problems/number-of-islands/"
    },
    {
        "title": "Course Schedule",
        "leetcode_number": 207,
        "difficulty": "Medium",
        "pattern": "Graph / Topological Sort",
        "description": "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Return true if you can finish all courses.",
        "time_complexity": "O(V+E)",
        "space_complexity": "O(V+E)",
        "concept_focus": "Cycle Detection",
        "link": "https://leetcode.com/problems/course-schedule/"
    },
    # Linked Lists
    {
        "title": "Reverse Linked List",
        "leetcode_number": 206,
        "difficulty": "Easy",
        "pattern": "Linked List",
        "description": "Given the head of a singly linked list, reverse the list, and return the reversed list.",
        "time_complexity": "O(n)",
        "space_complexity": "O(1)",
        "concept_focus": "Pointer Manipulation",
        "link": "https://leetcode.com/problems/reverse-linked-list/"
    },
    {
        "title": "Merge Two Sorted Lists",
        "leetcode_number": 21,
        "difficulty": "Easy",
        "pattern": "Linked List",
        "description": "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the two lists.",
        "time_complexity": "O(n+m)",
        "space_complexity": "O(1)",
        "concept_focus": "Two Pointer Merge",
        "link": "https://leetcode.com/problems/merge-two-sorted-lists/"
    },
    # Binary Search
    {
        "title": "Binary Search",
        "leetcode_number": 704,
        "difficulty": "Easy",
        "pattern": "Binary Search",
        "description": "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.",
        "time_complexity": "O(log n)",
        "space_complexity": "O(1)",
        "concept_focus": "Search Space Halving",
        "link": "https://leetcode.com/problems/binary-search/"
    },
    {
        "title": "Search Insert Position",
        "leetcode_number": 35,
        "difficulty": "Easy",
        "pattern": "Binary Search",
        "description": "Given a sorted array and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.",
        "time_complexity": "O(log n)",
        "space_complexity": "O(1)",
        "concept_focus": "Boundary Finding",
        "link": "https://leetcode.com/problems/search-insert-position/"
    },
]

def get_pattern_problems(pattern: str):
    """Get all problems for a specific pattern"""
    return [p for p in LEETCODE_PROBLEMS if p["pattern"] == pattern]

def get_all_patterns():
    """Get unique DSA patterns"""
    return list(set(p["pattern"] for p in LEETCODE_PROBLEMS))

def get_problems_by_difficulty(difficulty: str):
    """Get all problems for a specific difficulty"""
    return [p for p in LEETCODE_PROBLEMS if p["difficulty"] == difficulty]
