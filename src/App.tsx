import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { LeetCode } from "./components/LeetCode";
import { Education } from "./components/Education";
import { Credentials } from "./components/Credentials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ResumeModal } from "./components/ResumeModal";
import { AIAssistantModal } from "./components/AIAssistantModal";
import { CyberRunnerGame } from "./components/CyberRunnerGame";
import { Toast } from "./components/Toast";

export default function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);
  const [voiceOpen, setVoiceOpen] = useState<boolean>(false);
  const [gameOpen, setGameOpen] = useState<boolean>(false);

  // Trigger floating toast with auto-dismiss
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3600);
  };

  // Scroll reveal animations observer
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
        el.classList.add("is-revealed");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (gameOpen) {
    return (
      <CyberRunnerGame
        onExitGame={() => {
          setGameOpen(false);
          showToast("Exited 3D Cyber Runner Game");
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#151515] text-white relative selection:bg-[#FF6A00] selection:text-white overflow-x-hidden font-sans">
      {/* Toast Notification Container */}
      <Toast message={toastMessage} />

      {/* Futuristic Background grid lines */}
      <div className="fixed inset-0 grid-lines pointer-events-none z-0 opacity-60" />

      {/* Subtle ambient lighting orbs in theme palette */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#FF6A00]/5 blur-[180px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-1/3 right-0 w-[500px] h-[500px] bg-[#FF8C38]/5 blur-[160px] rounded-full pointer-events-none z-0" />

      {/* Main Header / Navigation */}
      <Header
        onOpenResume={() => setResumeOpen(true)}
        onOpenVoice={() => setVoiceOpen(true)}
        onOpenGame={() => setGameOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 w-full overflow-hidden">
        <Hero
          onOpenResume={() => setResumeOpen(true)}
          onOpenVoice={() => setVoiceOpen(true)}
          onOpenGame={() => setGameOpen(true)}
        />

        <div className="reveal-on-scroll">
          <About />
        </div>

        <div className="reveal-on-scroll">
          <Projects onNotify={showToast} />
        </div>

        <div className="reveal-on-scroll">
          <Skills />
        </div>

        <div className="reveal-on-scroll">
          <LeetCode />
        </div>

        <div className="reveal-on-scroll">
          <Education />
        </div>

        <div className="reveal-on-scroll">
          <Credentials onNotify={showToast} />
        </div>

        <div className="reveal-on-scroll">
          <Contact
            onNotify={showToast}
            onOpenResume={() => setResumeOpen(true)}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Candidate Resume Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        onNotify={showToast}
      />

      {/* Gemini AI Voice & Text Assistant Modal */}
      <AIAssistantModal
        isOpen={voiceOpen}
        onClose={() => setVoiceOpen(false)}
        onNotify={showToast}
      />
    </div>
  );
}
