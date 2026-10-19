import React, { useState, useEffect, useRef } from "react";
import { sound } from "../utils/sound";

interface Message {
  sender: "user" | "model";
  text: string;
}

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify: (msg: string) => void;
}

type LiveState = "idle" | "connecting" | "listening" | "speaking" | "disconnected" | "error";

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  onNotify,
}) => {
  const [liveState, setLiveState] = useState<LiveState>("idle");
  const [isLiveActive, setIsLiveActive] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "model",
      text: "Hello! I am Anuj Tiwari's AI Twin powered by Gemini 3.8. Ask me anything about my software projects, Java skills, LeetCode DSA practice, or internship availability!",
    },
  ]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [inputPrompt, setInputPrompt] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [lastFailedPrompt, setLastFailedPrompt] = useState<string | null>(null);

  // Audio Contexts & WebSocket Refs
  const wsRef = useRef<WebSocket | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const audioQueueRef = useRef<Float32Array[]>([]);
  const isPlayingAudioRef = useRef<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const suggestedPrompts = [
    "Tell me about your BankFlow project.",
    "What is your DSA & LeetCode routine?",
    "What internship roles are you seeking?",
    "Why did you choose Java and OOP?",
  ];

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, liveState]);

  // Clean up on modal close
  useEffect(() => {
    if (!isOpen) {
      stopLiveSession();
    }
  }, [isOpen]);

  // PCM encoding: Float32Array (-1.0 to 1.0) -> Int16Array -> Base64 (16kHz mono)
  const encodePcmToBase64 = (float32Data: Float32Array): string => {
    const len = float32Data.length;
    const int16 = new Int16Array(len);
    for (let i = 0; i < len; i++) {
      const s = Math.max(-1, Math.min(1, float32Data[i]));
      int16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    const uint8 = new Uint8Array(int16.buffer);
    let binary = "";
    for (let i = 0; i < uint8.byteLength; i++) {
      binary += String.fromCharCode(uint8[i]);
    }
    return btoa(binary);
  };

  // Play queued PCM chunks (24kHz mono)
  const playNextPcmChunk = () => {
    if (audioQueueRef.current.length === 0 || !outputAudioCtxRef.current) {
      isPlayingAudioRef.current = false;
      if (isLiveActive) {
        setLiveState("listening");
      }
      return;
    }

    isPlayingAudioRef.current = true;
    setLiveState("speaking");

    const chunk = audioQueueRef.current.shift()!;
    const ctx = outputAudioCtxRef.current;
    const buffer = ctx.createBuffer(1, chunk.length, 24000);
    buffer.getChannelData(0).set(chunk);

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.onended = () => {
      playNextPcmChunk();
    };
    source.start();
  };

  // Decode PCM base64 from model
  const handleIncomingAudioChunk = (base64Pcm: string) => {
    try {
      const binary = atob(base64Pcm);
      const uint8 = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        uint8[i] = binary.charCodeAt(i);
      }
      const int16 = new Int16Array(uint8.buffer);
      const float32 = new Float32Array(int16.length);
      for (let i = 0; i < int16.length; i++) {
        float32[i] = int16[i] / 32768.0;
      }
      audioQueueRef.current.push(float32);
      if (!isPlayingAudioRef.current) {
        playNextPcmChunk();
      }
    } catch (err) {
      console.error("Error decoding PCM audio chunk:", err);
    }
  };

  // Start Gemini Live WebSocket Session
  const startLiveSession = async () => {
    sound.playClick();
    setLiveState("connecting");
    setErrorMessage(null);

    try {
      // 1. Output audio context (24kHz)
      if (!outputAudioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        outputAudioCtxRef.current = new AudioCtx({ sampleRate: 24000 });
      }
      if (outputAudioCtxRef.current.state === "suspended") {
        await outputAudioCtxRef.current.resume();
      }

      // 2. Connect WebSocket to /api/live-ws
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const wsUrl = `${protocol}//${window.location.host}/api/live-ws`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = async () => {
        setIsLiveActive(true);
        setLiveState("listening");
        onNotify("Connected to Gemini 3.8 Live API");

        // 3. Microphone input capture (16kHz)
        try {
          if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error("Microphone access is not supported in this browser environment.");
          }

          const stream = await navigator.mediaDevices.getUserMedia({
            audio: {
              channelCount: 1,
              sampleRate: 16000,
              echoCancellation: true,
              noiseSuppression: true,
            },
          });
          micStreamRef.current = stream;

          const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
          const inputCtx = new AudioCtx({ sampleRate: 16000 });
          inputAudioCtxRef.current = inputCtx;

          const sourceNode = inputCtx.createMediaStreamSource(stream);
          const processor = inputCtx.createScriptProcessor(4096, 1, 1);
          scriptProcessorRef.current = processor;

          processor.onaudioprocess = (e) => {
            if (ws.readyState === WebSocket.OPEN) {
              const inputData = e.inputBuffer.getChannelData(0);
              const base64Pcm = encodePcmToBase64(inputData);
              ws.send(JSON.stringify({ audio: base64Pcm }));
            }
          };

          sourceNode.connect(processor);
          processor.connect(inputCtx.destination);
        } catch (micErr: any) {
          console.warn("Microphone not available, continuing with text-over-live mode:", micErr);
          onNotify("Microphone access unavailable. You can use text chat with Live API.");
        }
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.audio) {
            handleIncomingAudioChunk(data.audio);
          }

          if (data.text) {
            setMessages((prev) => {
              const lastMsg = prev[prev.length - 1];
              if (lastMsg && lastMsg.sender === "model") {
                return [...prev.slice(0, -1), { sender: "model", text: lastMsg.text + " " + data.text }];
              }
              return [...prev, { sender: "model", text: data.text }];
            });
          }

          if (data.interrupted) {
            audioQueueRef.current = [];
            isPlayingAudioRef.current = false;
            setLiveState("listening");
          }

          if (data.error) {
            setErrorMessage(data.error);
            setLiveState("error");
          }
        } catch (err) {
          console.error("Error processing WebSocket message:", err);
        }
      };

      ws.onerror = (event) => {
        console.error("WebSocket connection error:", event);
        setErrorMessage("Could not establish real-time WebSocket connection to Live API. Please try again or use text chat.");
        setLiveState("error");
      };

      ws.onclose = () => {
        stopLiveSession();
        setLiveState("disconnected");
      };
    } catch (err: any) {
      console.error("Failed to start Live session:", err);
      setErrorMessage(err?.message || "Live session initialization failed");
      setLiveState("error");
    }
  };

  // Clean up all audio nodes and connections
  const stopLiveSession = () => {
    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
      scriptProcessorRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
      micStreamRef.current = null;
    }
    if (inputAudioCtxRef.current) {
      inputAudioCtxRef.current.close().catch(() => {});
      inputAudioCtxRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    audioQueueRef.current = [];
    isPlayingAudioRef.current = false;
    setIsLiveActive(false);
    setLiveState("idle");
  };

  // Send Text Message to AI Assistant
  const handleSendText = async (promptToSend: string) => {
    const text = promptToSend.trim();
    if (!text || isSending) return;

    sound.playClick();
    setErrorMessage(null);
    setLastFailedPrompt(null);
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInputPrompt("");

    // If Live WebSocket is open, send via WebSocket
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ text }));
      setLiveState("speaking");
      return;
    }

    // Otherwise send via HTTP POST endpoint (/api/chat)
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          prompt: text,
          history: messages,
        }),
      });

      const contentType = response.headers.get("content-type") || "";

      if (!response.ok) {
        let serverErrorMsg = `Server returned HTTP ${response.status}`;
        if (contentType.includes("application/json")) {
          const errorData = await response.json();
          serverErrorMsg = errorData.error || serverErrorMsg;
        } else {
          const rawText = await response.text();
          // Avoid dumping raw HTML error page
          if (rawText.includes("<!DOCTYPE") || rawText.includes("<html")) {
            serverErrorMsg = `API endpoint unavailable (HTTP ${response.status}). Ensure the backend server is running.`;
          } else if (rawText) {
            serverErrorMsg = rawText.slice(0, 150);
          }
        }
        throw new Error(serverErrorMsg);
      }

      if (!contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response. Please verify backend endpoint.");
      }

      const data = await response.json();
      if (!data || typeof data.text !== "string") {
        throw new Error("Invalid response format received from assistant API.");
      }

      setMessages((prev) => [...prev, { sender: "model", text: data.text }]);

      // If speech synthesis is available in browser and not in Live mode, provide speech option
      if ("speechSynthesis" in window && !isLiveActive) {
        try {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(data.text);
          utterance.rate = 1.05;
          utterance.pitch = 1.0;
          window.speechSynthesis.speak(utterance);
        } catch {}
      }
    } catch (err: any) {
      console.error("Error in assistant chat request:", err);
      const safeMsg = err?.message || "Failed to connect to AI Assistant. Please check your network and try again.";
      setErrorMessage(safeMsg);
      setLastFailedPrompt(text);
    } finally {
      setIsSending(false);
    }
  };

  const handleRetry = () => {
    if (lastFailedPrompt) {
      handleSendText(lastFailedPrompt);
    } else if (isLiveActive || liveState === "error") {
      startLiveSession();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[140] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl max-h-[92vh] sm:max-h-[85vh] rounded-3xl bg-[#202020] border border-white/20 p-4 sm:p-6 shadow-2xl flex flex-col font-sans text-xs">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#FF6A00] animate-pulse shrink-0" />
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">Anuj's AI Twin & Voice Assistant</h3>
              <p className="text-[11px] text-[#FF8C38] font-mono">
                Powered by Gemini 3.8 (<code className="text-white">gemini-3.8-flash</code> & <code className="text-white">gemini-3.8-live</code>)
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              stopLiveSession();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-[#B8B8B8] hover:text-white transition-colors shrink-0"
            title="Close Assistant"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {/* Live Voice Orb Visualizer */}
        <div className="flex flex-col items-center justify-center py-3 sm:py-4 space-y-2 shrink-0">
          <div className="relative flex items-center justify-center">
            {/* Animated glowing waves */}
            <div
              className={`absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border transition-all duration-500 ${
                liveState === "speaking"
                  ? "border-[#FF6A00] scale-125 opacity-70 animate-ping"
                  : liveState === "listening"
                  ? "border-[#FF8C38] scale-110 opacity-50 animate-pulse"
                  : "border-white/10 scale-100 opacity-20"
              }`}
            />

            {/* Central Orb Button */}
            <button
              onClick={isLiveActive ? stopLiveSession : startLiveSession}
              className={`relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center gap-0.5 transition-all shadow-2xl active:scale-95 ${
                liveState === "speaking"
                  ? "bg-gradient-to-tr from-[#FF6A00] to-[#FF8C38] text-white shadow-[0_0_35px_rgba(255,106,0,0.6)]"
                  : isLiveActive
                  ? "bg-gradient-to-tr from-[#FF8C38] to-[#FF6A00] text-white shadow-[0_0_25px_rgba(255,140,56,0.4)]"
                  : "bg-[#151515] hover:bg-white/10 text-white border border-white/15"
              }`}
              title={isLiveActive ? "Stop Live Session" : "Start Real-Time Voice Conversation"}
            >
              <span className="material-symbols-outlined text-xl sm:text-2xl">
                {liveState === "speaking" ? "graphic_eq" : isLiveActive ? "mic" : "mic_none"}
              </span>
              <span className="text-[9px] uppercase tracking-wider font-bold">
                {liveState === "speaking"
                  ? "Speaking"
                  : liveState === "listening"
                  ? "Listening"
                  : liveState === "connecting"
                  ? "Connecting"
                  : "Start Voice"}
              </span>
            </button>
          </div>

          <div className="text-center space-y-0.5">
            <span className="text-[#B8B8B8] text-[11px] block font-medium">
              {liveState === "connecting"
                ? "Connecting to Gemini 3.8 Live WebSocket..."
                : liveState === "speaking"
                ? "Gemini Live is speaking via 24kHz real-time audio"
                : liveState === "listening"
                ? "Microphone streaming active — speak now"
                : liveState === "error"
                ? "Voice connection error. You can retry or chat via text below."
                : "Click microphone orb to start real-time two-way voice chat"}
            </span>
          </div>
        </div>

        {/* Conversation Message List (scrolls independently) */}
        <div className="flex-1 min-h-[160px] max-h-[260px] sm:max-h-[300px] overflow-y-auto space-y-3 p-3 sm:p-4 rounded-2xl bg-[#151515] border border-white/10 text-xs">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col space-y-1 ${
                msg.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <span className="text-[10px] text-[#B8B8B8] uppercase tracking-wider font-mono">
                {msg.sender === "user" ? "You" : "Anuj's AI Twin (Gemini 3.8)"}
              </span>
              <div
                className={`p-3 rounded-2xl max-w-[85%] font-sans text-xs sm:text-[13px] leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-[#FF6A00] text-white rounded-tr-none shadow-sm font-medium"
                    : "bg-[#202020] text-zinc-100 border border-white/10 rounded-tl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isSending && (
            <div className="flex items-center gap-2 p-2.5 text-[#FF8C38] font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-[#FF6A00] animate-ping" />
              <span>Gemini 3.8 is generating response...</span>
            </div>
          )}

          {/* Error Message Box */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-rose-400 shrink-0">error</span>
                <span>{errorMessage}</span>
              </div>
              <button
                onClick={handleRetry}
                className="px-3 py-1 rounded-lg bg-rose-500 text-white font-bold text-[11px] self-start sm:self-center shrink-0 hover:bg-rose-600 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Pills */}
        <div className="flex flex-wrap gap-1.5 pt-3 shrink-0">
          {suggestedPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendText(prompt)}
              disabled={isSending}
              className="px-2.5 py-1.5 rounded-lg bg-[#151515] hover:bg-[#FF6A00]/20 hover:text-white text-[#B8B8B8] border border-white/10 text-[10px] sm:text-[11px] font-medium transition-colors text-left"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Text Input Form (sticks to bottom, mobile keyboard friendly) */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendText(inputPrompt);
          }}
          className="flex items-center gap-2 pt-3 border-t border-white/10 shrink-0"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Type a message or question for Anuj's AI..."
            disabled={isSending}
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#151515] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#FF6A00] placeholder:text-zinc-500 transition-colors"
          />
          <button
            type="submit"
            disabled={isSending || !inputPrompt.trim()}
            className="px-4 py-2.5 rounded-xl bg-[#FF6A00] hover:bg-[#FF8C38] disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 shrink-0 shadow-md active:scale-95"
          >
            <span>Send</span>
            <span className="material-symbols-outlined text-[16px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
