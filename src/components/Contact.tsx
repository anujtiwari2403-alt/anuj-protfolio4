import React, { useState } from "react";
import { sound } from "../utils/sound";

interface ContactProps {
  onNotify: (msg: string) => void;
  onOpenResume: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onNotify, onOpenResume }) => {
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const emailAddress = "anujtiwari2403@gmail.com";

  const copyEmail = () => {
    sound.playClick();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(emailAddress).then(() => {
        sound.playSuccess();
        onNotify(`Email copied to clipboard: ${emailAddress}`);
      }).catch(() => {
        onNotify(`Email: ${emailAddress}`);
      });
    } else {
      onNotify(`Email: ${emailAddress}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !message) {
      onNotify("Please complete all fields before sending.");
      return;
    }
    sound.playSuccess();
    setSubmitted(true);
    onNotify("Message registered! Thanks for reaching out, Anuj will reply shortly.");
    setSenderName("");
    setSenderEmail("");
    setMessage("");
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-baseline justify-between mb-12 sm:mb-16 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="font-sans font-light text-2xl sm:text-4xl text-white/20 tracking-tight">
              07
            </span>
            <div>
              <span className="text-xs sm:text-[13px] text-[#FF6A00] font-sans font-semibold tracking-normal block">
                07 · Contact & connect
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-[46px] font-bold text-white tracking-[-0.025em] leading-[1.15] mt-1 break-words">
                Let's connect.
              </h2>
            </div>
          </div>
          <span className="text-xs sm:text-[13px] text-[#B8B8B8] hidden sm:inline-block font-sans">
            Direct communication
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: Direct info */}
          <div className="lg:col-span-5 space-y-8 font-sans">
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Start a conversation.
              </h3>
              <p className="text-[#B8B8B8] text-sm sm:text-base leading-relaxed">
                Have an internship opportunity, a project idea, or a reason to connect? I am actively checking messages and would love to hear from you.
              </p>
            </div>

            {/* Email Card with 1-click Copy */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#202020] border border-white/10 space-y-3">
              <span className="text-xs text-[#B8B8B8] uppercase tracking-wider font-semibold block">
                Direct Email Address
              </span>
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm sm:text-base font-bold text-white font-mono truncate">
                  {emailAddress}
                </span>
                <button
                  onClick={copyEmail}
                  className="px-3 py-1.5 rounded-lg bg-[#FF6A00]/20 hover:bg-[#FF6A00] hover:text-white text-[#FF8C38] text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0"
                  title="Copy email to clipboard"
                >
                  <span className="material-symbols-outlined text-[15px]">content_copy</span>
                  <span className="hidden sm:inline">Copy</span>
                </button>
              </div>
            </div>

            {/* Social & Resume Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href="https://www.linkedin.com/in/anuj-tiwari-4905b6335/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="p-4 rounded-2xl bg-[#202020] border border-white/10 hover:border-[#FF6A00]/40 transition-all flex items-center justify-between group"
              >
                <div>
                  <span className="text-xs text-[#B8B8B8] block">Professional</span>
                  <span className="font-bold text-white text-sm group-hover:text-[#FF8C38] transition-colors">
                    LinkedIn Profile
                  </span>
                </div>
                <span className="material-symbols-outlined text-[#FF6A00] text-sm">open_in_new</span>
              </a>

              <a
                href="https://github.com/anujtiwari2403-alt"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="p-4 rounded-2xl bg-[#202020] border border-white/10 hover:border-[#FF6A00]/40 transition-all flex items-center justify-between group"
              >
                <div>
                  <span className="text-xs text-[#B8B8B8] block">Code Repositories</span>
                  <span className="font-bold text-white text-sm group-hover:text-[#FF8C38] transition-colors">
                    GitHub Profile
                  </span>
                </div>
                <span className="material-symbols-outlined text-[#FF6A00] text-sm">open_in_new</span>
              </a>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onOpenResume();
              }}
              className="w-full py-3.5 rounded-2xl bg-[#202020] hover:bg-white/10 border border-white/10 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px] text-[#FF6A00]">description</span>
              <span>Open Complete Candidate Resume</span>
            </button>
          </div>

          {/* Right Column: Message Form */}
          <div className="lg:col-span-7 w-full">
            <div className="p-6 sm:p-10 rounded-3xl bg-[#202020] border border-white/10 shadow-2xl font-sans">
              <h3 className="font-bold text-xl sm:text-2xl text-white mb-2">Send a Message</h3>
              <p className="text-xs sm:text-sm text-[#B8B8B8] mb-6">
                Fill out the form below to reach out directly regarding opportunities or collaboration.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-white block">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Recruiter or Engineering Lead"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#151515] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#FF6A00] transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-white block">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#151515] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#FF6A00] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white block">Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your internship opportunity, team requirements, or project..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#151515] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#FF6A00] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#FF6A00] hover:bg-[#FF8C38] text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(255,106,0,0.35)] flex items-center justify-center gap-2 active:scale-98"
                >
                  <span>Submit Message</span>
                  <span className="material-symbols-outlined text-[16px]">send</span>
                </button>

                {submitted && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 animate-fadeIn">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    <span>Message received! Thank you for reaching out to Anuj.</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
