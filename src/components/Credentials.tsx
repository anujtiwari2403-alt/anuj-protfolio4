import React from "react";
import { sound } from "../utils/sound";
import { TiltCard } from "./TiltCard";

interface CredentialsProps {
  onNotify: (msg: string) => void;
}

export const Credentials: React.FC<CredentialsProps> = ({ onNotify }) => {
  const copyId = (id: string, name: string) => {
    sound.playClick();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(id).then(() => {
        sound.playSuccess();
        onNotify(`Credential ID copied: ${id}`);
      }).catch(() => {
        onNotify(`Credential ID: ${id}`);
      });
    } else {
      onNotify(`Credential ID: ${id}`);
    }
  };

  return (
    <section id="credentials" className="py-20 md:py-32 border-b border-white/10 relative">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 md:px-12 space-y-16">
        {/* Section Header */}
        <div className="flex items-baseline justify-between mb-12 sm:mb-16 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="font-sans font-light text-2xl sm:text-4xl text-white/20 tracking-tight">
              06
            </span>
            <div>
              <span className="text-xs sm:text-[13px] text-[#FF6A00] font-sans font-semibold tracking-normal block">
                06 · Certifications & credentials
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-[46px] font-bold text-white tracking-[-0.025em] leading-[1.15] mt-1 break-words">
                Verified credentials.
              </h2>
            </div>
          </div>
          <span className="text-xs sm:text-[13px] text-[#B8B8B8] hidden sm:inline-block font-sans">
            Verified certifications
          </span>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
          {/* Cert 1 */}
          <TiltCard
            maxTilt={6}
            scale={1.02}
            className="p-6 sm:p-10 rounded-3xl bg-[#202020] border border-white/10 flex flex-col justify-between space-y-6 hover:border-[#FF6A00]/40 transition-all shadow-xl"
          >
            <div className="space-y-4 depth-layer-1">
              <div className="flex items-center justify-between text-xs sm:text-[13px]">
                <span className="text-[#FF8C38] font-bold">Certification 01</span>
                <span className="text-[#B8B8B8]">September 2025</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight leading-snug">
                Internship in C, C++ & Campus Competitive Programming
              </h3>
              <div className="flex items-center gap-2 text-zinc-300 font-sans text-xs sm:text-sm">
                <span className="material-symbols-outlined text-[#FF6A00] text-[18px]">business</span>
                <span>Ramraj Technology Solutions Pvt. Ltd.</span>
              </div>

              {/* Credential ID Card */}
              <div className="p-4 rounded-2xl bg-[#151515] border border-white/10 text-xs flex items-center justify-between depth-layer-2">
                <div className="space-y-0.5">
                  <span className="text-[#B8B8B8] block text-[11px] font-sans">Credential ID:</span>
                  <span className="text-white font-semibold font-mono text-xs sm:text-sm">
                    RTSPL/PR/2025/0151693
                  </span>
                </div>
                <button
                  onClick={() => copyId("RTSPL/PR/2025/0151693", "Ramraj Internship")}
                  className="p-2.5 rounded-xl bg-[#202020] hover:bg-[#FF6A00] hover:text-white text-zinc-300 transition-colors active:scale-95"
                  title="Copy Credential ID"
                >
                  <span className="material-symbols-outlined text-sm">content_copy</span>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5 text-xs depth-layer-1">
              <span className="px-3 py-1 rounded-lg bg-[#151515] text-white font-medium">C</span>
              <span className="px-3 py-1 rounded-lg bg-[#151515] text-white font-medium">C++</span>
              <span className="px-3 py-1 rounded-lg bg-[#151515] text-[#FF8C38] font-medium">
                Competitive Programming
              </span>
            </div>
          </TiltCard>

          {/* Cert 2 */}
          <TiltCard
            maxTilt={6}
            scale={1.02}
            className="p-6 sm:p-10 rounded-3xl bg-[#202020] border border-white/10 flex flex-col justify-between space-y-6 hover:border-[#FF6A00]/40 transition-all shadow-xl"
          >
            <div className="space-y-4 depth-layer-1">
              <div className="flex items-center justify-between text-xs sm:text-[13px]">
                <span className="text-[#FF8C38] font-bold">Certification 02</span>
                <span className="text-[#B8B8B8]">September 2026</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight leading-snug">
                Certificate Program in Prompt Engineering and ChatGPT
              </h3>
              <div className="flex items-center gap-2 text-zinc-300 font-sans text-xs sm:text-sm">
                <span className="material-symbols-outlined text-[#FF6A00] text-[18px]">verified_user</span>
                <span>IT-ITeS Sector Skills Council, NASSCOM</span>
              </div>

              {/* Credential ID Card */}
              <div className="p-4 rounded-2xl bg-[#151515] border border-white/10 text-xs flex items-center justify-between depth-layer-2">
                <div className="space-y-0.5">
                  <span className="text-[#B8B8B8] block text-[11px] font-sans">Credential ID:</span>
                  <span className="text-[#FF8C38] font-semibold font-mono text-xs sm:text-sm">
                    FSP/2026/9/10404563
                  </span>
                </div>
                <button
                  onClick={() => copyId("FSP/2026/9/10404563", "NASSCOM Prompt Engineering")}
                  className="p-2.5 rounded-xl bg-[#202020] hover:bg-[#FF6A00] hover:text-white text-zinc-300 transition-colors active:scale-95"
                  title="Copy Credential ID"
                >
                  <span className="material-symbols-outlined text-sm">content_copy</span>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5 text-xs depth-layer-1">
              <span className="px-3 py-1 rounded-lg bg-[#151515] text-white font-medium">
                Prompt Engineering
              </span>
              <span className="px-3 py-1 rounded-lg bg-[#151515] text-[#FF8C38] font-medium">
                NASSCOM Verified
              </span>
              <span className="px-3 py-1 rounded-lg bg-[#151515] text-white font-medium">
                AI Integration
              </span>
            </div>
          </TiltCard>
        </div>

        {/* Callout Banner: Ready to learn. Ready to build. */}
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-[#202020] border border-white/10 relative overflow-hidden shadow-2xl font-sans">
          <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-[#FF6A00]/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6A00]/15 border border-[#FF6A00]/30 text-[#FF8C38] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse" />
              <span>Hiring Availability</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-black text-white tracking-tight leading-[1.1]">
              Ready to learn. <br />
              Ready to build.
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#B8B8B8] leading-[1.75] font-normal">
              Currently seeking Software Engineering, Java Development, and AI Integration internship opportunities. I bring strong programming foundations, a disciplined problem-solving habit, and genuine eagerness to build real-world software.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#contact"
                onClick={() => sound.playClick()}
                className="px-6 sm:px-8 py-3.5 rounded-full bg-[#FF6A00] hover:bg-[#FF8C38] text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-[0_0_25px_rgba(255,106,0,0.4)] active:scale-95"
              >
                Let's Talk
              </a>
              <a
                href="https://github.com/anujtiwari2403-alt"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="px-6 py-3.5 rounded-full bg-[#151515] hover:bg-white/10 text-white border border-white/10 font-medium text-xs sm:text-sm transition-all"
              >
                Explore GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
