import React from "react";
import { sound } from "../utils/sound";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#121212] border-t border-white/10 py-12 sm:py-16 relative z-10 text-xs font-sans">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6A00]" />
            <span className="font-bold text-white text-sm">Anuj Tiwari</span>
          </div>
          <span className="text-[#B8B8B8]">
            B.Tech CSE (AI & ML) · Technocrats Institute (RGPV) · 2024–2028
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-[#B8B8B8]">
          <a href="#about" onClick={() => sound.playClick()} className="hover:text-white transition-colors">
            About
          </a>
          <span>·</span>
          <a href="#projects" onClick={() => sound.playClick()} className="hover:text-white transition-colors">
            Projects
          </a>
          <span>·</span>
          <a href="#skills" onClick={() => sound.playClick()} className="hover:text-white transition-colors">
            Skills
          </a>
          <span>·</span>
          <a href="#credentials" onClick={() => sound.playClick()} className="hover:text-white transition-colors">
            Credentials
          </a>
          <span>·</span>
          <a href="#contact" onClick={() => sound.playClick()} className="hover:text-white transition-colors">
            Contact
          </a>
        </div>

        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-full bg-[#202020] hover:bg-[#FF6A00] text-zinc-300 hover:text-white border border-white/10 transition-colors"
          title="Back to Top"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
        </button>
      </div>
    </footer>
  );
};
