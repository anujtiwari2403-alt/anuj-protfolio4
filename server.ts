import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { WebSocketServer, WebSocket } from "ws";
import { GoogleGenAI, Modality, type LiveServerMessage } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const port = parseInt(process.env.PORT || "3000", 10);

app.use(express.json());

// Initialize Gemini Client with User-Agent header as required by AI Studio guidelines
const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

const PORTFOLIO_SYSTEM_INSTRUCTION = `You are the official AI Twin & Portfolio Assistant for Anuj Tiwari.
You speak directly with recruiters, engineering managers, and visitors on Anuj's developer portfolio website.

Key facts about Anuj Tiwari:
- Status: B.Tech Computer Science & Engineering (Artificial Intelligence & Machine Learning) student at Technocrats Institute of Technology & Science, Bhopal (Affiliated with Rajiv Gandhi Proudyogiki Vishwavidyalaya - RGPV), Class of 2024–2028.
- Goals: Seeking Software Engineering / SDE / Java Backend / AI Integration Internships.
- Location: Bhopal, Madhya Pradesh, India.
- Email: anujtiwari2403@gmail.com
- GitHub: https://github.com/anujtiwari2403-alt
- LinkedIn: https://www.linkedin.com/in/anuj-tiwari-4905b6335/

Technical Skills & Foundations:
- Core Languages: Java 21 (Primary language), Python, C, C++.
- Computer Science Foundations: Object-Oriented Programming (Encapsulation, Inheritance, Polymorphism, Abstraction, SOLID principles), Data Structures & Algorithms, Clean Architecture, Memory Efficiency.
- LeetCode & Problem Solving: 100-Day DSA Journey with deep practice across Arrays, Two Pointers, Sliding Window, HashMaps, Linked Lists, Binary Trees, and Recursion.
- Web & Tools: HTML5, CSS3/Tailwind, JavaScript/TypeScript, Git & GitHub version control, Linux command line fundamentals, VS Code.
- AI Integration: Prompt Engineering, Gemini API integration, LLM evaluation, and intelligent workflows.

Featured Projects:
1. BankFlow (Banking Management System):
   - Language: Java (OOP principles)
   - Capabilities: Complete account lifecycle, deposit & withdrawal transaction processing, robust custom business exceptions (e.g. InsufficientFundsException), immutable transaction logging, and ledger state consistency.
   - GitHub: https://github.com/anujtiwari2403-alt/BankFlow
2. Smart Placement Tracker:
   - Built with Core Java & DSA to manage student campus recruitment pipelines across Aptitude, Technical, and HR rounds with filtering by status, role, and CGPA.
3. EVM (Electronic Voting Machine):
   - Web application demonstrating secure single-voter integrity, digital ballot interface, anti-double-voting validation, and real-time tallying.
4. 100-Day LeetCode DSA Roadmap:
   - Structured daily problem solving focusing on time and space complexity analysis.

Verified Certifications:
1. Internship in C, C++ & Campus Competitive Programming - Ramraj Technology Solutions Pvt. Ltd. (Sept 2025, Credential ID: RTSPL/PR/2025/0151693)
2. Certificate Program in Prompt Engineering and ChatGPT - IT-ITeS Sector Skills Council, NASSCOM (Sept 2026, Credential ID: FSP/2026/9/10404563)

Guidelines:
- Tone: Professional, enthusiastic, articulate, developer-to-developer, authentic, and polite.
- Be concise (2-4 sentences for voice interactions, structured bullets for technical questions if asked).
- Never fabricate experience or claim years of senior industry experience; be honest about being a driven, proactive B.Tech CSE (AI & ML) student with strong fundamentals.
- If asked about contacting Anuj or hiring him, provide his email anujtiwari2403@gmail.com and LinkedIn profile.`;

// Endpoint: POST /api/chat & POST /api/voice-chat
const handleChat = async (req: express.Request, res: express.Response) => {
  try {
    const { prompt, history } = req.body;

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({ error: "Missing or invalid prompt in request body" });
    }

    if (!apiKey) {
      return res.status(503).json({
        error: "GEMINI_API_KEY is not configured on the server. Please configure it in Settings > Secrets.",
      });
    }

    // Build contents including past context if provided
    const contents: any[] = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const msg of history.slice(-6)) {
        if (msg.sender && msg.text) {
          contents.push({
            role: msg.sender === "user" ? "user" : "model",
            parts: [{ text: String(msg.text) }],
          });
        }
      }
    }
    contents.push({
      role: "user",
      parts: [{ text: prompt.trim() }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: contents,
      config: {
        systemInstruction: PORTFOLIO_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "Hello! I am Anuj Tiwari's portfolio assistant. How can I help you today?";
    res.setHeader("Content-Type", "application/json");
    return res.json({ text: replyText });
  } catch (err: any) {
    console.error("Error in /api/chat handler:", err);
    res.setHeader("Content-Type", "application/json");
    return res.status(500).json({
      error: err?.message || "Failed to generate AI response. Please try again.",
    });
  }
};

app.post("/api/chat", handleChat);
app.post("/api/voice-chat", handleChat);

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(apiKey),
    timestamp: new Date().toISOString(),
  });
});

// Setup WebSocket server for Gemini Live Audio
const wss = new WebSocketServer({ server, path: "/api/live-ws" });

wss.on("connection", async (clientWs: WebSocket) => {
  console.log("Client connected to /api/live-ws");

  if (!apiKey) {
    clientWs.send(
      JSON.stringify({
        error: "GEMINI_API_KEY is not configured on the server. Configure it in Settings > Secrets.",
      })
    );
    clientWs.close();
    return;
  }

  let liveSession: any = null;

  try {
    liveSession = await ai.live.connect({
      model: "gemini-3.8-live",
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: "Zephyr" },
          },
        },
        systemInstruction: PORTFOLIO_SYSTEM_INSTRUCTION,
      },
      callbacks: {
        onmessage: (message: LiveServerMessage) => {
          if (clientWs.readyState !== WebSocket.OPEN) return;

          // Check for audio chunk
          const audioChunk = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          if (audioChunk) {
            clientWs.send(JSON.stringify({ audio: audioChunk }));
          }

          // Check for model text turn if available
          const textChunk = message.serverContent?.modelTurn?.parts?.find((p) => p.text)?.text;
          if (textChunk) {
            clientWs.send(JSON.stringify({ text: textChunk }));
          }

          // Check for user interruption
          if (message.serverContent?.interrupted) {
            clientWs.send(JSON.stringify({ interrupted: true }));
          }
        },
        onerror: (err: any) => {
          console.error("Gemini Live server error:", err);
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(
              JSON.stringify({
                error: err?.message || "Live API audio stream encountered an issue",
              })
            );
          }
        },
        onclose: () => {
          console.log("Gemini Live session closed");
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ closed: true }));
          }
        },
      },
    });

    // Notify client that Gemini Live is connected and ready
    clientWs.send(
      JSON.stringify({
        status: "ready",
        message: "Connected to Gemini 3.8 Live API",
      })
    );

    clientWs.on("message", (raw: Buffer) => {
      try {
        const payload = JSON.parse(raw.toString());
        if (payload.audio && liveSession) {
          liveSession.sendRealtimeInput({
            audio: { data: payload.audio, mimeType: "audio/pcm;rate=16000" },
          });
        } else if (payload.text && liveSession) {
          liveSession.sendRealtimeInput({
            text: payload.text,
          });
        }
      } catch (e) {
        console.error("Error processing incoming WebSocket frame:", e);
      }
    });

    clientWs.on("close", () => {
      console.log("Client closed connection to /api/live-ws");
      try {
        if (liveSession) {
          liveSession.close();
        }
      } catch {}
    });

    clientWs.on("error", (wsErr) => {
      console.error("WebSocket client error:", wsErr);
    });
  } catch (err: any) {
    console.error("Failed to connect to Gemini Live session:", err);
    if (clientWs.readyState === WebSocket.OPEN) {
      clientWs.send(
        JSON.stringify({
          error: `Could not establish real-time connection to Gemini Live: ${err.message || "Unknown error"}`,
        })
      );
    }
  }
});

// Vite middleware in dev or static files in production
const isProd = process.env.NODE_ENV === "production";

if (!isProd) {
  const { createServer: createViteServer } = await import("vite");
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
} else {
  const distDir = path.resolve(__dirname, "dist");
  app.use(express.static(distDir));
  app.get("*", (_req, res) => {
    res.sendFile(path.resolve(distDir, "index.html"));
  });
}

server.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on http://0.0.0.0:${port}`);
});
