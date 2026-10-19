import React, { useState } from "react";
import { HeroCanvas } from "./HeroCanvas";
import { sound } from "../utils/sound";
import profilePhoto from "../assets/anuj-tiwari.png";
import { TiltCard } from "./TiltCard";

interface HeroProps {
  onOpenResume: () => void;
  onOpenVoice: () => void;
  onOpenGame: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenResume,
  onOpenVoice,
  onOpenGame,
}) => {
  const [imgSrc, setImgSrc] = useState<string>(profilePhoto || "/anuj-tiwari.png");
  const [imgError, setImgError] = useState<boolean>(false);
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 flex flex-col justify-between border-b border-white/10 glow-divider overflow-hidden"
    >
      {/* 3D background canvas */}
      <HeroCanvas />

      {/* Background watermark text */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-full select-none pointer-events-none text-center overflow-hidden z-0 opacity-[0.035]">
        <h1 className="font-sans font-black text-[18vw] leading-none tracking-tighter text-stroke-subtle">
          Anuj Tiwari
        </h1>
      </div>

      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-10 items-center relative z-10 my-auto">
        {/* Left Column: Headings & Intros */}
        <div className="lg:col-span-7 flex flex-col gap-6 md:gap-7 min-w-0">
          {/* Status Badges */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#202020] border border-white/10 text-xs sm:text-[13px] text-white font-medium backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#FF6A00]" />
              <span>Hello, I'm Anuj Tiwari</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6A00]/10 border border-[#FF6A00]/30 text-xs sm:text-[13px] text-[#FF8C38] font-semibold backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse" />
              <span>Open to internship opportunities</span>
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-3 min-w-0">
            <div className="text-xs sm:text-[15px] text-[#FF8C38] font-semibold tracking-normal flex flex-wrap items-center gap-2">
              <span>B.Tech CSE (AI & ML) · Java & Python · Software Development</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[64px] font-extrabold text-white tracking-[-0.03em] leading-[1.08] break-words">
              Building software with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A00] to-[#FF8C38]">
                Java, OOP
              </span>{" "}
              & AI integration.
            </h1>
            <p className="font-sans text-[15px] sm:text-[18px] text-[#B8B8B8] leading-[1.7] max-w-2xl font-normal pt-1">
              Undergraduate engineer at Technocrats Institute of Technology & Science, Bhopal. Focused on object-oriented system design, algorithmic problem solving, and building dependable software applications.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            <a
              href="#projects"
              onClick={() => sound.playClick()}
              className="px-6 sm:px-7 py-3 rounded-full bg-[#FF6A00] hover:bg-[#FF8C38] text-white font-sans text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 shadow-[0_0_24px_rgba(255,106,0,0.4)] active:scale-95"
            >
              <span>Explore Projects</span>
              <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
            </a>

            <button
              onClick={() => {
                sound.playClick();
                onOpenVoice();
              }}
              className="px-5 sm:px-6 py-3 rounded-full bg-[#202020] hover:bg-white/10 text-[#FF8C38] border border-[#FF6A00]/40 font-sans text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px] text-[#FF6A00] animate-pulse">mic</span>
              <span>Talk with AI Twin</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onOpenResume();
              }}
              className="px-5 sm:px-6 py-3 rounded-full bg-[#202020] hover:bg-white/10 text-white border border-white/10 font-sans text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px] text-zinc-400">description</span>
              <span>View Resume</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-white/10 max-w-xl">
            <div className="space-y-0.5">
              <span className="font-bold text-xl sm:text-2xl text-white">Java 21</span>
              <span className="text-[11px] sm:text-xs text-[#B8B8B8] block">Core & OOP Architecture</span>
            </div>
            <div className="space-y-0.5">
              <span className="font-bold text-xl sm:text-2xl text-[#FF8C38]">100 Days</span>
              <span className="text-[11px] sm:text-xs text-[#B8B8B8] block">LeetCode DSA Practice</span>
            </div>
            <div className="space-y-0.5">
              <span className="font-bold text-xl sm:text-2xl text-white">2024–28</span>
              <span className="text-[11px] sm:text-xs text-[#B8B8B8] block">B.Tech CSE (AI & ML)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Profile Card with 3D Layered Depth */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <TiltCard
            maxTilt={9}
            scale={1.025}
            className="relative w-full max-w-[380px] rounded-3xl bg-[#202020] border border-white/10 p-5 sm:p-6 shadow-2xl transition-all duration-300 hover:border-[#FF6A00]/50 group"
          >
            {/* Glowing ambient halo */}
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[#FF6A00]/25 via-[#FF8C38]/15 to-transparent blur-2xl opacity-40 group-hover:opacity-100 transition-opacity pointer-events-none" />

            {/* Profile image with 3D elevation */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#151515] border border-white/10 mb-5 depth-layer-1">
              {!imgError ? (
                <img
                  src={imgSrc}
                  alt="Anuj Tiwari — Software Developer"
                  onError={() => {
                    if (imgSrc !== "/anuj-tiwari.png") {
                      setImgSrc("/anuj-tiwari.png");
                    } else {
                      setImgError(true);
                    }
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#202020] via-[#1a1a1a] to-[#151515] p-6 text-center space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-[#FF6A00]/20 border border-[#FF6A00]/40 flex items-center justify-center text-[#FF6A00]">
                    <span className="font-extrabold text-2xl font-mono">AT</span>
                  </div>
                  <div>
                    <span className="font-bold text-white text-sm block">Anuj Tiwari</span>
                    <span className="text-[11px] text-[#FF8C38]">Software Developer</span>
                  </div>
                </div>
              )}
              {/* Subtle bottom gradient to ensure name pill contrast without dimming portrait */}
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#151515]/90 via-[#151515]/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/95 bg-[#151515]/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 depth-layer-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse" />
                  <span>Anuj Tiwari</span>
                </span>
                <span className="text-[#FF8C38]">B.Tech 2024-28</span>
              </div>
            </div>

            {/* Candidate details with layered elevation */}
            <div className="space-y-3 font-sans text-xs depth-layer-2">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-[#B8B8B8]">Institution</span>
                <span className="font-semibold text-white">Technocrats Institute (RGPV)</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-[#B8B8B8]">Focus</span>
                <span className="font-semibold text-[#FF8C38]">Java 21 · OOP Architecture</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-[#B8B8B8]">Current Status</span>
                <span className="font-semibold text-white">Actively Seeking Internships</span>
              </div>
            </div>

            {/* Social Links with depth */}
            <div className="pt-4 mt-2 flex items-center justify-between gap-2 border-t border-white/10 depth-layer-2">
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/anujtiwari2403-alt"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="px-3.5 py-1.5 rounded-xl bg-[#151515] hover:bg-white/10 text-white border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
                  title="GitHub Profile"
                >
                  <span>GitHub</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/anuj-tiwari-4905b6335/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="px-3.5 py-1.5 rounded-xl bg-[#151515] hover:bg-[#FF6A00] hover:text-white text-[#FF8C38] border border-[#FF6A00]/30 text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
                  title="LinkedIn Profile"
                >
                  <span>LinkedIn</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </a>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  onOpenGame();
                }}
                className="p-2 rounded-xl bg-[#151515] hover:bg-white/10 text-[#FF8C38] border border-white/10 transition-colors active:scale-95"
                title="Easter egg: 3D Cyber Runner Game"
              >
                <span className="material-symbols-outlined text-[16px]">sports_esports</span>
              </button>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};
