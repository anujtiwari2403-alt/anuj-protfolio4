import React, { useState } from "react";
import { sound } from "../utils/sound";

export const LeetCode: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>("All");

  const topics = [
    { name: "All", count: "100 Days Target" },
    { name: "Arrays", count: "Prefix & Sliding Window" },
    { name: "Strings", count: "Parsing & Anagrams" },
    { name: "HashMaps", count: "O(1) Lookups" },
    { name: "Two Pointers", count: "Opposite & Fast/Slow" },
    { name: "Linked Lists", count: "Pointers & Cycles" },
    { name: "Trees", count: "DFS & BFS Traversal" },
    { name: "Recursion", count: "Backtracking Basics" },
  ];

  const problems: Record<number, { title: string; topic: string; difficulty: "Easy" | "Medium" | "Hard" }> = {
    1: { title: "Two Sum", topic: "HashMaps", difficulty: "Easy" },
    2: { title: "Best Time to Buy & Sell Stock", topic: "Arrays", difficulty: "Easy" },
    3: { title: "Contains Duplicate", topic: "HashMaps", difficulty: "Easy" },
    4: { title: "Product of Array Except Self", topic: "Arrays", difficulty: "Medium" },
    5: { title: "Valid Palindrome", topic: "Two Pointers", difficulty: "Easy" },
    6: { title: "3Sum", topic: "Two Pointers", difficulty: "Medium" },
    7: { title: "Container With Most Water", topic: "Two Pointers", difficulty: "Medium" },
    8: { title: "Longest Substring Without Repeating Characters", topic: "Strings", difficulty: "Medium" },
    9: { title: "Valid Parentheses", topic: "Strings", difficulty: "Easy" },
    10: { title: "Binary Search", topic: "Arrays", difficulty: "Easy" },
    11: { title: "Search in Rotated Sorted Array", topic: "Arrays", difficulty: "Medium" },
    12: { title: "Reverse Linked List", topic: "Linked Lists", difficulty: "Easy" },
    13: { title: "Merge Two Sorted Lists", topic: "Linked Lists", difficulty: "Easy" },
    14: { title: "Linked List Cycle", topic: "Linked Lists", difficulty: "Easy" },
    15: { title: "Maximum Depth of Binary Tree", topic: "Trees", difficulty: "Easy" },
    16: { title: "Invert Binary Tree", topic: "Trees", difficulty: "Easy" },
    17: { title: "Same Tree", topic: "Trees", difficulty: "Easy" },
    18: { title: "Subtree of Another Tree", topic: "Trees", difficulty: "Easy" },
    19: { title: "Lowest Common Ancestor of a BST", topic: "Trees", difficulty: "Medium" },
    20: { title: "Combination Sum", topic: "Recursion", difficulty: "Medium" },
    21: { title: "Word Search", topic: "Recursion", difficulty: "Medium" },
    22: { title: "Climbing Stairs", topic: "Recursion", difficulty: "Easy" },
    23: { title: "Coin Change", topic: "Recursion", difficulty: "Medium" },
    24: { title: "Group Anagrams", topic: "Strings", difficulty: "Medium" },
    25: { title: "Top K Frequent Elements", topic: "HashMaps", difficulty: "Medium" },
    26: { title: "Merge Intervals", topic: "Arrays", difficulty: "Medium" },
    27: { title: "Set Matrix Zeroes", topic: "Arrays", difficulty: "Medium" },
    28: { title: "Longest Palindromic Substring", topic: "Strings", difficulty: "Medium" },
  };

  const filteredProblems = Object.entries(problems).filter(([_, prob]) => {
    if (selectedTopic === "All") return true;
    return prob.topic === selectedTopic;
  });

  return (
    <section id="dsa" className="py-20 md:py-32 border-b border-white/10 relative">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-baseline justify-between mb-12 sm:mb-16 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="font-sans font-light text-2xl sm:text-4xl text-white/20 tracking-tight">
              04
            </span>
            <div>
              <span className="text-xs sm:text-[13px] text-[#FF6A00] font-sans font-semibold tracking-normal block">
                04 · Problem solving
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-[46px] font-bold text-white tracking-[-0.025em] leading-[1.15] mt-1 break-words">
                100 Days of LeetCode.
              </h2>
            </div>
          </div>
          <span className="text-xs sm:text-[13px] text-[#B8B8B8] hidden sm:inline-block font-sans">
            DSA Streak & Routine
          </span>
        </div>

        {/* Overview Banner */}
        <div className="rounded-3xl bg-[#202020] border border-white/10 p-6 sm:p-8 mb-10 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6A00]/15 border border-[#FF6A00]/30 text-xs font-semibold text-[#FF8C38]">
              <span className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse" />
              <span>Active 100-Day Problem Solving Commitment</span>
            </div>
            <p className="text-sm sm:text-base text-[#B8B8B8] max-w-2xl leading-relaxed">
              Consistently practicing classical algorithmic problem solving in Java. Strengthening mental models for two-pointer traversals, sliding windows, tree recursions, and constant-time HashMap caching.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0 font-mono">
            <div className="p-4 rounded-2xl bg-[#151515] border border-white/5 text-center min-w-[110px]">
              <span className="font-extrabold text-2xl sm:text-3xl text-white block">Day 35+</span>
              <span className="text-[11px] text-[#FF8C38] uppercase">Active Streak</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#151515] border border-white/5 text-center min-w-[110px]">
              <span className="font-extrabold text-2xl sm:text-3xl text-[#FF6A00] block">100</span>
              <span className="text-[11px] text-[#B8B8B8] uppercase">Goal Days</span>
            </div>
          </div>
        </div>

        {/* Topic Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {topics.map((t) => (
            <button
              key={t.name}
              onClick={() => {
                sound.playClick();
                setSelectedTopic(t.name);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedTopic === t.name
                  ? "bg-[#FF6A00] text-white shadow-md"
                  : "bg-[#202020] text-[#B8B8B8] hover:text-white border border-white/5"
              }`}
            >
              <span>{t.name}</span>
            </button>
          ))}
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {filteredProblems.map(([num, prob]) => (
            <div
              key={num}
              className="p-4 rounded-2xl bg-[#202020] border border-white/5 hover:border-[#FF6A00]/40 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-mono text-[#FF8C38] font-bold">#{num}</span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                    prob.difficulty === "Easy"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  }`}
                >
                  {prob.difficulty}
                </span>
              </div>
              <h4 className="font-bold text-sm text-white leading-snug">{prob.title}</h4>
              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] text-[#B8B8B8]">
                <span className="font-mono">{prob.topic}</span>
                <span className="text-[#FF6A00] font-medium">Java Solved ✓</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
