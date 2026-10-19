import React, { useState, useEffect } from "react";
import { sound } from "../utils/sound";

interface HeaderProps {
  onOpenResume: () => void;
  onOpenVoice: () => void;
  onOpenGame: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenResume,
  onOpenVoice,
  onOpenGame,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSound = () => {
    const next = !soundActive;
    setSoundActive(next);
    sound.setEnabled(next);
  };

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "LeetCode", href: "#dsa" },
    { label: "Education", href: "#education" },
    { label: "Certifications", href: "#credentials" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-[#151515]/95 backdrop-blur-xl border-white/10 shadow-2xl py-3"
          : "bg-[#151515]/75 backdrop-blur-md border-white/5 py-4"
      }`}
    >
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between gap-3">
        {/* Brand logo & title */}
        <a
          href="#"
          onClick={() => sound.playClick()}
          className="flex items-center gap-2.5 sm:gap-3 group shrink min-w-0"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF6A00] group-hover:scale-125 transition-transform shadow-[0_0_12px_#FF6A00] shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="font-sans text-[15px] sm:text-[16px] font-bold text-white group-hover:text-[#FF8C38] transition-colors tracking-tight truncate">
              Anuj Tiwari
            </span>
            <span className="font-sans text-[11px] sm:text-[12px] text-[#B8B8B8] font-normal truncate">
              Software Developer
              <span className="hidden sm:inline"> · CSE (AI & ML)</span>
            </span>
          </div>
        </a>

        {/* Quick status pill - visible on larger viewports */}
        <div className="hidden xl:flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#202020] border border-white/10 font-sans text-[13px] text-[#B8B8B8] backdrop-blur-md">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse" />
            <span className="text-white font-medium">Open to internships</span>
          </span>
          <span className="text-zinc-600">·</span>
          <span>Bhopal, MP</span>
          <span className="text-zinc-600">·</span>
          <span className="text-[#FF8C38] font-medium">B.Tech 2024–2028</span>
        </div>

        {/* Actions & Navigation */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 shrink-0">
          <nav className="hidden lg:flex items-center gap-6 font-sans text-[14px] sm:text-[15px] font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => sound.playClick()}
                className="text-[#B8B8B8] hover:text-[#FF6A00] transition-colors tracking-normal"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* AI Voice Assistant launcher */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenVoice();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FF6A00]/10 hover:bg-[#FF6A00]/20 border border-[#FF6A00]/40 text-[#FF8C38] font-sans text-xs font-semibold transition-all shadow-sm active:scale-95"
            title="Talk with Anuj's AI Twin via Gemini Live"
          >
            <span className="material-symbols-outlined text-[16px] text-[#FF6A00] animate-pulse">
              mic
            </span>
            <span className="hidden sm:inline">Voice Assistant</span>
          </button>

          {/* 3D Game button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenGame();
            }}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#202020] hover:bg-white/10 border border-white/10 text-zinc-300 font-sans text-xs font-medium transition-all"
            title="Launch 3D Cyber Runner Game"
          >
            <span className="material-symbols-outlined text-[15px] text-[#FF8C38]">
              sports_esports
            </span>
            <span className="hidden lg:inline">3D Game</span>
          </button>

          {/* Resume button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenResume();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#202020] hover:bg-white/10 border border-white/10 text-white font-sans text-xs font-medium transition-all"
            title="View Candidate Resume"
          >
            <span className="material-symbols-outlined text-[15px] text-zinc-400">
              description
            </span>
            <span>Resume</span>
          </button>

          {/* Procedural Sound toggle */}
          <button
            onClick={toggleSound}
            className={`hidden sm:flex items-center justify-center w-8 h-8 rounded-full border transition-all ${
              soundActive
                ? "bg-[#FF6A00]/15 border-[#FF6A00]/50 text-[#FF8C38]"
                : "bg-[#202020] border-white/10 text-zinc-500 hover:text-zinc-300"
            }`}
            title="Toggle procedural UI audio feedback"
          >
            <span className="material-symbols-outlined text-[15px]">
              {soundActive ? "volume_up" : "volume_off"}
            </span>
          </button>

          {/* Primary CTA button */}
          <a
            href="#contact"
            onClick={() => sound.playClick()}
            className="px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#FF6A00] text-white font-sans text-xs sm:text-[14px] font-bold hover:bg-[#FF8C38] transition-all duration-300 flex items-center gap-1 sm:gap-1.5 shadow-[0_0_20px_rgba(255,106,0,0.35)] shrink-0 active:scale-95"
          >
            <span>Let's Connect</span>
            <span className="material-symbols-outlined text-[14px] sm:text-[15px]">
              arrow_forward
            </span>
          </a>

          {/* Mobile hamburger button */}
          <button
            onClick={() => {
              sound.playClick();
              setMenuOpen(!menuOpen);
            }}
            className="lg:hidden p-2 rounded-xl bg-[#202020] border border-white/10 text-zinc-300 hover:text-white shrink-0 active:scale-95"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-xl">
              {menuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#151515]/98 border-b border-white/10 px-4 sm:px-6 py-5 space-y-4 backdrop-blur-2xl font-sans max-w-full overflow-hidden animate-fadeIn">
          <div className="flex flex-col gap-1 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  sound.playClick();
                  setMenuOpen(false);
                }}
                className="py-2.5 px-3 rounded-lg text-zinc-200 hover:text-white hover:bg-[#202020] flex items-center justify-between font-medium transition-colors"
              >
                <span>{link.label}</span>
                <span className="material-symbols-outlined text-xs text-[#FF6A00]">
                  chevron_right
                </span>
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5 text-xs">
            <button
              onClick={() => {
                onOpenVoice();
                setMenuOpen(false);
              }}
              className="py-2.5 px-4 rounded-xl bg-[#FF6A00]/15 border border-[#FF6A00]/40 text-[#FF8C38] flex items-center justify-between font-semibold"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-[#FF6A00]">
                  mic
                </span>
                <span>Gemini Live Voice Chat</span>
              </span>
              <span className="material-symbols-outlined text-xs">
                arrow_forward
              </span>
            </button>

            <button
              onClick={() => {
                onOpenResume();
                setMenuOpen(false);
              }}
              className="py-2.5 px-4 rounded-xl bg-[#202020] border border-white/10 text-white flex items-center justify-between font-medium"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-zinc-400">
                  description
                </span>
                <span>View Full Resume</span>
              </span>
              <span className="material-symbols-outlined text-xs">
                arrow_forward
              </span>
            </button>

            <button
              onClick={() => {
                onOpenGame();
                setMenuOpen(false);
              }}
              className="py-2.5 px-4 rounded-xl bg-[#202020] border border-white/10 text-[#B8B8B8] flex items-center justify-between font-medium"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-[#FF8C38]">
                  sports_esports
                </span>
                <span>Play 3D Cyber Runner</span>
              </span>
              <span className="material-symbols-outlined text-xs">
                arrow_forward
              </span>
            </button>

            <button
              onClick={toggleSound}
              className="py-2.5 px-4 rounded-xl bg-[#202020] border border-white/10 text-zinc-300 flex items-center justify-between font-medium"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">
                  {soundActive ? "volume_up" : "volume_off"}
                </span>
                <span>Audio Effects: {soundActive ? "ON" : "OFF"}</span>
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
