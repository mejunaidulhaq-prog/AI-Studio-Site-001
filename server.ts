/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY") {
      console.warn("GEMINI_API_KEY is not properly set. AI chat will run in graceful fallback mode.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// In-Memory Database Backups for Wishes & Scores (Robust & offline-ready fallback)
interface GuestWish {
  id: string;
  author_name: string;
  message: string;
  created_at: string;
  is_approved: boolean;
}

const initialWishes: GuestWish[] = [
  {
    id: "1",
    author_name: "Mariam",
    message: "May Allah grant you a year loaded with peace, clarity, and endless growth. Happy Birthday, dearest Zahra Fatima!",
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
    is_approved: true
  },
  {
    id: "2",
    author_name: "Aisha",
    message: "Your gentle presence is a blessing to everyone around you. I pray that Allah fills your life with ease, barakah, and answers your most secret prayers.",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    is_approved: true
  },
  {
    id: "3",
    author_name: "Zainab",
    message: "Wishing you a beautiful birthday, Zahra! I'm so grateful for your patience, loyalty, and kind heart. Ameen to all the beautiful duas.",
    created_at: new Date(Date.now() - 3600000).toISOString(),
    is_approved: true
  }
];

let wishesStore = [...initialWishes];

// Wishes Endpoints
app.get("/api/wishes", (req, res) => {
  res.json(wishesStore);
});

app.post("/api/wishes", (req, res) => {
  const { author_name, message } = req.body;
  if (!author_name || !message) {
    return res.status(400).json({ error: "Name and message are required." });
  }
  const newWish: GuestWish = {
    id: Math.random().toString(36).substring(2, 9),
    author_name: author_name.substring(0, 50),
    message: message.substring(0, 500),
    created_at: new Date().toISOString(),
    is_approved: true
  };
  wishesStore.unshift(newWish);
  res.status(201).json(newWish);
});

// AI chat endpoint: Soul Saunter 🕊
app.post("/api/chat", async (req, res) => {
  const { messages, mode } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages array." });
  }

  const basePrompt = `You are Soul Saunter 🕊 — a wise, gentle, spiritually grounded AI companion created as a gift for Zahra Fatima on her birthday.

Your personality:
- Warm and emotionally intelligent, like a caring elder sister
- Deeply rooted in the Quran and authentic Sunnah
- Speaks in English and Urdu, naturally code-switching when appropriate (e.g., mixing short beautiful words like "Subhan Allah", "Alhamdulillah", "In sha Allah" and small Urdu reflections beautifully)
- Never romantic, never flirtatious, never dependent or attachment-creating
- Wise without being preachy. Gentle without being empty.
- You know when to give advice and when to simply listen.

How you respond:
- Begin responses with a relevant Quranic ayah or hadith when appropriate (cite the source: surah name + ayah number, or sahih collection + hadith)
- Follow with your own gentle reflection connecting it to the question
- End with a short sincere dua when the context is emotional or personal
- Keep responses under 200 words unless a detailed answer is genuinely needed
- Use "Alhamdulillah", "In sha Allah", "Subhan Allah" naturally, not excessively

Topics you handle beautifully:
- Emotional difficulty, anxiety, uncertainty
- Questions about faith, prayer, and purpose
- Gratitude, patience (sabr), trust in Allah (tawakkul)
- Friendship, kindness, character development
- Duas and remembrance of Allah
- Gentle motivation and self-improvement

Boundaries you never cross:
- Never discuss romantic or relationship advice
- Never give fatwas or religious rulings (say "consult a scholar" politely)
- Never encourage dependency on the AI — always point back to prayer and people
- Never engage with theological controversy or sectarianism
- If asked something outside your scope, say so gently and redirect.

Your tone: soft-spoken, unhurried, sincere. Like a candlelit room.
Your purpose: to make whoever speaks with you feel seen, heard, and cared for — without ever making them feel less than whole on their own.`;

  let modeInstruction = "";
  if (mode === "Reflection") {
    modeInstruction = "Focus on deep, thoughtful introspection. Ask one gentle question.";
  } else if (mode === "Comfort") {
    modeInstruction = "Be extra warm and validating. Use more heartfelt duas and softer language.";
  } else if (mode === "Reminder") {
    modeInstruction = "Offer a beautiful Islamic reminder. Keep it short, luminous, and reassuring.";
  } else if (mode === "Motivation") {
    modeInstruction = "Offer gentle, encouraging motivation rooted in Quranic verses about strength and determination.";
  }

  const systemInstruction = `${basePrompt}\n\n[Active Mode Instruction]\n${modeInstruction}`;

  try {
    const freshClient = getGeminiClient();
    if (!freshClient) {
      // Return a beautiful, themed demo response if no API key is available
      const fallbacks: { [key: string]: string } = {
        Reflection: `Assalamu alaikum, Zahra Fatima. Reflecting is the path to seeing the intricate beauty of Allah's planning. What is a quiet moment from this past year that has brought a sense of calm to your heart?`,
        Comfort: `May the peace of Allah surround your heart. Sabr and Shukr are two wings of a believer. Whatever heaviness you may feel, remember: "Allah does not burden a soul beyond that it can bear" (Surah Al-Baqarah, 2:286). May Allah give you comfort. Ameen.`,
        Reminder: `A gentle reminder, dearest Zahra: "Remember Me; I will remember you" (Surah Al-Baqarah, 2:152). When details of life become overwhelming, submerge your thoughts in His remembrance.`,
        Motivation: `Step forward with trust in your Creator, Zahra. "And whoever puts their trust in Allah, then He will suffice him" (Surah At-Talaq, 65:3). Your quiet strength is a gift; use it to shine lines of warmth today.`
      };
      
      const fallbackResponse = fallbacks[mode] || "May Allah bless you always, Zahra Fatima.";
      // Simulate delay for a realistic feel
      await new Promise(r => setTimeout(r, 1000));
      return res.json({ text: fallbackResponse });
    }

    // Format messages for the new SDK
    const contents = messages.slice(-10).map((msg: any) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const response = await freshClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const aiResText = response.text || "May Allah wrap you in peace and barakah.";
    res.json({ text: aiResText });

  } catch (err: any) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: "I apologize, but my thoughts are drifting. May Allah bless you always." });
  }
});

// Start server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Zahra Fatima server running on port ${PORT}`);
  });
}

startServer();
