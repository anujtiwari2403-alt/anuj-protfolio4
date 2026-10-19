import React, { useState, useEffect } from "react";
import { sound } from "../utils/sound";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify: (msg: string) => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  onNotify,
}) => {
  const [pdfAvailable, setPdfAvailable] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen) {
      fetch("/Anuj_Tiwari_Resume.pdf", { method: "HEAD" })
        .then((res) => {
          setPdfAvailable(res.ok);
        })
        .catch(() => {
          setPdfAvailable(false);
        });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-sans">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#202020] border border-white/20 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6A00]/20 border border-[#FF6A00]/40 flex items-center justify-center text-[#FF8C38]">
              <span className="material-symbols-outlined text-xl">description</span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Anuj Tiwari — Curriculum Vitae</h3>
              <p className="text-xs text-[#FF8C38] font-medium">B.Tech CSE (AI & ML) · Batch 2024–2028</p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#B8B8B8] hover:text-white transition-colors"
            title="Close"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* Candidate Overview */}
        <div className="space-y-4 text-xs sm:text-sm text-[#B8B8B8]">
          <div className="p-4 rounded-2xl bg-[#151515] border border-white/10 space-y-2">
            <span className="text-[11px] uppercase tracking-wider text-[#FF6A00] font-bold block">
              Candidate Profile
            </span>
            <p className="text-white leading-relaxed font-normal">
              Undergraduate engineer at Technocrats Institute of Technology & Science (RGPV), pursuing Bachelor of Technology in Computer Science & Engineering (Artificial Intelligence & Machine Learning). Actively developing software systems with Java 21, object-oriented design, algorithmic rigor, and AI model workflows.
            </p>
          </div>

          {/* Education Breakdown */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">Education</span>
            <div className="p-3.5 rounded-xl bg-[#151515] border border-white/5 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">B.Tech in CSE (Artificial Intelligence & Machine Learning)</span>
                <span className="text-[#FF8C38] font-mono">2024 – 2028</span>
              </div>
              <p className="text-xs text-zinc-400">
                Technocrats Institute of Technology & Science, Bhopal • Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV)
              </p>
            </div>
          </div>

          {/* Technical Competencies */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Technical Competencies
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-[#151515] border border-white/5">
                <span className="font-semibold text-white block mb-0.5">Core Languages & OOP</span>
                <p className="text-zinc-400">Java 21, Python, C, C++, Encapsulation, Polymorphism, Abstraction</p>
              </div>
              <div className="p-3 rounded-xl bg-[#151515] border border-white/5">
                <span className="font-semibold text-white block mb-0.5">Data Structures & Algorithms</span>
                <p className="text-zinc-400">Arrays, Two Pointers, Sliding Window, Trees, Recursion, HashMaps</p>
              </div>
              <div className="p-3 rounded-xl bg-[#151515] border border-white/5">
                <span className="font-semibold text-white block mb-0.5">Software & Web Tooling</span>
                <p className="text-zinc-400">HTML5/Tailwind, JavaScript, Git & GitHub, Linux, VS Code</p>
              </div>
              <div className="p-3 rounded-xl bg-[#151515] border border-white/5">
                <span className="font-semibold text-white block mb-0.5">AI Integration</span>
                <p className="text-zinc-400">Gemini 3.8 API, Prompt Engineering (NASSCOM), Multimodal Live Audio</p>
              </div>
            </div>
          </div>

          {/* Key Projects */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">Featured Projects</span>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-[#151515] border border-white/5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">BankFlow — Banking Management System</span>
                  <span className="text-[#FF8C38] text-[11px] font-mono">Java · OOP</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  Designed full banking operations with deposit/withdrawal transactions, ledger accountability, and custom business exceptions.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#151515] border border-white/5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">Smart Placement Tracker</span>
                  <span className="text-[#FF8C38] text-[11px] font-mono">Core Java · DSA</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  Candidate pipeline tracking tool filtering student recruitment stages with custom sorting algorithms.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-[#B8B8B8] font-mono">
            {pdfAvailable ? "Official PDF Document Ready" : "Document Rendered from Source"}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/Anuj_Tiwari_Resume.pdf"
              download="Anuj_Tiwari_Resume.pdf"
              onClick={() => {
                sound.playSuccess();
                onNotify("Downloading official resume PDF...");
              }}
              className="px-5 py-2.5 rounded-xl bg-[#FF6A00] hover:bg-[#FF8C38] text-white font-bold text-xs transition-all shadow-md flex items-center gap-1.5 active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Download Resume PDF</span>
            </a>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
