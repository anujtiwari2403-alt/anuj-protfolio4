import React from "react";

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 md:py-32 border-b border-white/10 relative">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 md:px-12 space-y-16">
        {/* Section Header */}
        <div className="flex items-baseline justify-between mb-12 sm:mb-16 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="font-sans font-light text-2xl sm:text-4xl text-white/20 tracking-tight">
              05
            </span>
            <div>
              <span className="text-xs sm:text-[13px] text-[#FF6A00] font-sans font-semibold tracking-normal block">
                05 · Academic foundation
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-[46px] font-bold text-white tracking-[-0.025em] leading-[1.15] mt-1 break-words">
                Academic foundation.
              </h2>
            </div>
          </div>
          <span className="text-xs sm:text-[13px] text-[#B8B8B8] hidden sm:inline-block font-sans">
            RGPV State Technological University
          </span>
        </div>

        {/* Degree Card */}
        <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-[#202020] border border-white/10 shadow-2xl font-sans space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-8 border-b border-white/10">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6A00]/15 border border-[#FF6A00]/30 text-[#FF8C38] text-xs font-semibold">
                <span>Undergraduate Degree · B.Tech</span>
              </div>
              <h3 className="text-xl sm:text-3xl lg:text-[32px] font-bold text-white tracking-tight leading-tight">
                Bachelor of Technology — Computer Science & Engineering (Artificial Intelligence & Machine Learning)
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-zinc-300 font-sans text-sm sm:text-base pt-1">
                <span className="font-semibold text-white">Technocrats Institute of Technology & Science</span>
                <span className="text-zinc-600">·</span>
                <span className="text-[#B8B8B8]">Bhopal, Madhya Pradesh</span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#B8B8B8] font-normal">
                Affiliated with Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV).
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#151515] border border-white/5 text-left lg:text-right shrink-0 space-y-1">
              <span className="text-xs text-[#B8B8B8] font-medium block">Duration</span>
              <div className="font-bold text-xl sm:text-2xl text-[#FF8C38] tabular-nums font-mono">
                Sept 2024 – July 2028
              </div>
              <span className="text-xs text-white block font-medium">4-Year Full-Time Program</span>
            </div>
          </div>

          {/* Curriculum Areas */}
          <div className="space-y-4">
            <span className="text-xs sm:text-sm text-white font-semibold block uppercase tracking-wider">
              Relevant Learning Areas & Foundations
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {[
                "Java",
                "OOP Concepts",
                "Data Structures",
                "Algorithms",
                "Git & GitHub",
                "Python",
                "Web Fundamentals",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#151515] border border-white/5 text-center text-xs sm:text-[13px] font-medium text-white hover:border-[#FF6A00]/40 transition-colors"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
