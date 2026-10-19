import React, { useState } from "react";
import { sound } from "../utils/sound";
import { TiltCard } from "./TiltCard";

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    {
      id: "languages",
      title: "Programming Languages",
      desc: "Core languages used for systems design, OOP architecture, and algorithmic implementation.",
      icon: "terminal",
      skills: [
        { name: "Java 21", badge: "Primary", desc: "Object-oriented systems, class hierarchies, business exceptions" },
        { name: "Python", badge: "Scripting", desc: "Scripting, rapid prototyping, and AI/ML experiments" },
        { name: "C", badge: "Systems", desc: "Low-level memory pointers, struct architectures" },
        { name: "C++", badge: "Competitive", desc: "Competitive programming, STL vectors, algorithmic speed" },
      ],
    },
    {
      id: "foundations",
      title: "Computer Science Foundations",
      desc: "Architectural principles that guide maintainable, scalable, and memory-efficient software.",
      icon: "account_tree",
      skills: [
        { name: "Object-Oriented Programming", badge: "Core", desc: "Encapsulation, inheritance, polymorphism, abstraction" },
        { name: "Data Structures", badge: "DSA", desc: "Arrays, Two Pointers, Linked Lists, Trees, HashMaps" },
        { name: "Algorithms", badge: "Analysis", desc: "Binary search, sliding window, recursion, Big-O" },
        { name: "Software Design", badge: "Architecture", desc: "Modular separation of concerns, clean code practices" },
      ],
    },
    {
      id: "tooling",
      title: "Web & Developer Tools",
      desc: "Daily tools and modern web frameworks used to ship functional applications.",
      icon: "code",
      skills: [
        { name: "HTML5 & Modern CSS", badge: "Web", desc: "Semantic markup, Tailwind utility architecture" },
        { name: "JavaScript & TypeScript", badge: "Frontend", desc: "React hooks, typed state, async API calls" },
        { name: "Git & GitHub", badge: "VCS", desc: "Branching strategies, commits, repository tracking" },
        { name: "Linux & Terminal", badge: "Environment", desc: "Bash command line, script automation, POSIX tools" },
      ],
    },
    {
      id: "ai",
      title: "AI Integration & Workflows",
      desc: "Leveraging state-of-the-art models for real-time multimodal audio and smart features.",
      icon: "neurology",
      skills: [
        { name: "Gemini 3.8 API", badge: "GenAI", desc: "Server-side integration via official @google/genai SDK" },
        { name: "Gemini Live Audio", badge: "Real-Time", desc: "WebSocket bidirectional PCM audio streaming (16kHz / 24kHz)" },
        { name: "Prompt Engineering", badge: "NASSCOM", desc: "Certified program in ChatGPT and structured prompt design" },
        { name: "Multimodal Systems", badge: "Architecture", desc: "Bridging client voice capture to server-authoritative models" },
      ],
    },
  ];

  const filtered = activeCategory === "all" ? categories : categories.filter((c) => c.id === activeCategory);

  return (
    <section id="skills" className="py-20 md:py-32 border-b border-white/10 relative">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-baseline justify-between mb-12 sm:mb-16 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="font-sans font-light text-2xl sm:text-4xl text-white/20 tracking-tight">
              03
            </span>
            <div>
              <span className="text-xs sm:text-[13px] text-[#FF6A00] font-sans font-semibold tracking-normal block">
                03 · Technical skills
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-[46px] font-bold text-white tracking-[-0.025em] leading-[1.15] mt-1 break-words">
                Tools & technologies.
              </h2>
            </div>
          </div>
          <span className="text-xs sm:text-[13px] text-[#B8B8B8] hidden sm:inline-block font-sans">
            Core capabilities
          </span>
        </div>

        <p className="font-sans text-[15px] sm:text-[18px] text-[#B8B8B8] max-w-2xl leading-[1.75] mb-8 font-normal">
          An honest, transparent view of the technologies, foundations, and engineering tools I study and use daily in my projects.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            { id: "all", label: "All Technologies" },
            { id: "languages", label: "Languages" },
            { id: "foundations", label: "CS Foundations" },
            { id: "tooling", label: "Web & Tools" },
            { id: "ai", label: "AI & Gemini" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sound.playClick();
                setActiveCategory(tab.id);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeCategory === tab.id
                  ? "bg-[#FF6A00] text-white shadow-[0_0_15px_rgba(255,106,0,0.3)]"
                  : "bg-[#202020] text-[#B8B8B8] hover:text-white border border-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filtered.map((cat) => (
            <TiltCard
              key={cat.id}
              maxTilt={5}
              scale={1.015}
              className="rounded-3xl bg-[#202020] border border-white/10 p-6 sm:p-8 space-y-6 shadow-xl hover:border-[#FF6A00]/40 transition-all duration-300"
            >
              <div className="flex items-center gap-3 depth-layer-1">
                <div className="w-10 h-10 rounded-2xl bg-[#FF6A00]/15 border border-[#FF6A00]/30 flex items-center justify-center text-[#FF6A00]">
                  <span className="material-symbols-outlined text-xl">{cat.icon}</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg sm:text-xl text-white">{cat.title}</h3>
                  <p className="text-xs text-[#B8B8B8] leading-tight">{cat.desc}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 depth-layer-2">
                {cat.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3.5 rounded-2xl bg-[#151515] border border-white/5 hover:border-white/20 transition-all space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs sm:text-sm">{skill.name}</span>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#FF6A00]/10 text-[#FF8C38] border border-[#FF6A00]/20">
                        {skill.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#B8B8B8] leading-snug">{skill.desc}</p>
                  </div>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};
