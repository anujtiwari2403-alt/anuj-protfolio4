import React, { useState } from "react";
import { sound } from "../utils/sound";
import { TiltCard } from "./TiltCard";

export const About: React.FC = () => {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<Array<{ cmd: string; res: string; color?: string }>>([
    {
      cmd: "whoami",
      res: "Anuj Tiwari // B.Tech CSE (AI & ML) Student & Software Development Enthusiast",
      color: "text-white font-medium",
    },
    {
      cmd: "echo $CORE_STACK",
      res: '["Java 21", "OOP Architecture", "Data Structures", "Algorithms", "Python", "Web_Fundamentals"]',
      color: "text-[#FF8C38] font-medium",
    },
    {
      cmd: "git status",
      res: "Branch: main • 100-Days-DSA: Streak Active • Projects: BankFlow, Smart-Placement-Tracker, EVM",
      color: "text-emerald-400 font-medium",
    },
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputVal.trim().toLowerCase();
    if (!trimmed) return;

    sound.playClick();
    let reply = "";
    let color = "text-zinc-300";

    if (trimmed === "help") {
      reply = "Available commands: whoami, stack, projects, leetcode, education, contact, clear";
      color = "text-[#FF6A00]";
    } else if (trimmed === "whoami") {
      reply = "Anuj Tiwari // B.Tech CSE (AI & ML) student at Technocrats Institute of Technology & Science (RGPV) 2024–2028";
      color = "text-white font-medium";
    } else if (trimmed === "stack" || trimmed === "skills") {
      reply = "Primary: Java 21, OOP, DSA | Languages: Python, C, C++ | Tools: Git, GitHub, Linux, Gemini API";
      color = "text-[#FF8C38]";
    } else if (trimmed === "projects") {
      reply = "1. BankFlow (Java OOP Banking Management)  2. Smart Placement Tracker (Core Java + DSA)  3. EVM (Web Voting Machine)";
      color = "text-emerald-400";
    } else if (trimmed === "leetcode") {
      reply = "Active 100-Day LeetCode Challenge: Arrays, Strings, HashMaps, Two Pointers, Trees, and Recursion.";
      color = "text-[#FF8C38]";
    } else if (trimmed === "education") {
      reply = "Bachelor of Technology in CSE (AI & ML) at Technocrats Institute of Technology & Science, Bhopal (RGPV) 2024–2028.";
      color = "text-zinc-200";
    } else if (trimmed === "contact") {
      reply = "Email: anujtiwari2403@gmail.com • LinkedIn: in/anuj-tiwari-4905b6335 • GitHub: anujtiwari2403-alt";
      color = "text-[#FF6A00]";
    } else if (trimmed === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    } else {
      reply = `Command not recognized: "${trimmed}". Type "help" for a list of available commands.`;
      color = "text-rose-400";
    }

    setHistory((prev) => [...prev, { cmd: inputVal, res: reply, color }]);
    setInputVal("");
  };

  return (
    <section id="about" className="py-20 md:py-32 border-b border-white/10 relative">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-baseline justify-between mb-12 sm:mb-16 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="font-sans font-light text-2xl sm:text-4xl text-white/20 tracking-tight">
              01
            </span>
            <div>
              <span className="text-xs sm:text-[13px] text-[#FF6A00] font-sans font-semibold tracking-normal block">
                01 · About & philosophy
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-[46px] font-bold text-white tracking-[-0.025em] leading-[1.15] mt-1 break-words">
                A little about me.
              </h2>
            </div>
          </div>
          <span className="text-xs sm:text-[13px] text-[#B8B8B8] hidden sm:inline-block font-sans">
            Personal overview
          </span>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Bio text */}
          <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8 min-w-0">
            <div className="space-y-5 sm:space-y-6 text-[#B8B8B8] font-sans text-[15px] sm:text-[18px] leading-[1.75]">
              <p className="text-white font-medium text-base sm:text-[19px] leading-relaxed">
                I am a B.Tech CSE (AI & ML) student with a strong interest in Software Development, Data Structures & Algorithms, and Artificial Intelligence.
              </p>
              <p>
                I am currently building my skills in Java, Object-Oriented Programming, Data Structures & Algorithms, Python, and Web Development through hands-on learning and projects.
              </p>
              <p>
                I have developed{" "}
                <span className="text-white font-semibold underline decoration-[#FF6A00] decoration-2 underline-offset-4">
                  BankFlow
                </span>
                , a Banking Management System built using Java and OOP concepts, which helped me apply programming fundamentals to a practical software solution. I am also continuously improving my problem-solving skills through regular LeetCode practice.
              </p>
              <p>
                I am exploring AI/ML and AI integration while strengthening my software development fundamentals.
              </p>
            </div>

            {/* Core Values / Strengths pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4">
              <div className="p-4 rounded-2xl bg-[#202020] border border-white/5 space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-[#FF6A00] font-bold block">
                  Core Principle
                </span>
                <span className="font-semibold text-white text-sm block">OOP Integrity</span>
                <p className="text-xs text-[#B8B8B8] leading-normal">
                  Encapsulation, abstraction, clean class design, and maintainable structure.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#202020] border border-white/5 space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-[#FF8C38] font-bold block">
                  Problem Solving
                </span>
                <span className="font-semibold text-white text-sm block">Algorithmic Rigor</span>
                <p className="text-xs text-[#B8B8B8] leading-normal">
                  Daily DSA practice with attention to Big-O time and space trade-offs.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#202020] border border-white/5 space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-white font-bold block">
                  Growth Mindset
                </span>
                <span className="font-semibold text-white text-sm block">Active Learning</span>
                <p className="text-xs text-[#B8B8B8] leading-normal">
                  Eager to receive mentorship, collaborate, and contribute on production teams.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Terminal Card */}
          <div className="lg:col-span-5 w-full">
            <TiltCard
              maxTilt={5}
              scale={1.015}
              className="rounded-2xl bg-[#202020] border border-white/10 shadow-2xl overflow-hidden font-mono text-xs hover:border-[#FF6A00]/40 transition-colors"
            >
              {/* Terminal Title Bar */}
              <div className="bg-[#181818] px-4 py-3 border-b border-white/10 flex items-center justify-between depth-layer-1">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="text-[11px] text-[#B8B8B8] ml-2 font-medium">anuj@workstation:~</span>
                </div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">bash v5.2</span>
              </div>

              {/* Terminal Body */}
              <div className="p-4 sm:p-5 space-y-3.5 max-h-[360px] overflow-y-auto depth-layer-2">
                {history.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <span className="text-[#FF6A00] font-bold">$</span>
                      <span className="text-white font-medium">{item.cmd}</span>
                    </div>
                    <div className={`pl-4 leading-relaxed ${item.color || "text-zinc-300"}`}>
                      {item.res}
                    </div>
                  </div>
                ))}

                {/* Input prompt */}
                <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2 border-t border-white/5">
                  <span className="text-[#FF6A00] font-bold">$</span>
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="type 'help' or command..."
                    className="bg-transparent text-white focus:outline-none flex-1 placeholder:text-zinc-600 font-mono text-xs"
                  />
                  <button
                    type="submit"
                    className="px-2.5 py-1 rounded bg-[#FF6A00]/20 hover:bg-[#FF6A00]/30 text-[#FF8C38] text-[11px] font-bold active:scale-95 transition-transform"
                  >
                    Run
                  </button>
                </form>
              </div>

              <div className="bg-[#181818] px-4 py-2 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500 depth-layer-1">
                <span>Tip: Type 'help' to inspect available system commands</span>
                <span className="text-[#FF6A00]">● Online</span>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};
