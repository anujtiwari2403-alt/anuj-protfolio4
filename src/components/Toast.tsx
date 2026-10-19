import React from "react";

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[200] max-w-sm px-4 py-3 rounded-2xl bg-[#202020] border border-[#FF6A00]/40 text-white text-xs sm:text-sm font-sans shadow-2xl shadow-[#FF6A00]/10 flex items-center gap-3 animate-bounce">
      <span className="w-2 h-2 rounded-full bg-[#FF6A00] animate-ping shrink-0" />
      <span className="font-medium text-white/95 leading-snug">{message}</span>
    </div>
  );
};
