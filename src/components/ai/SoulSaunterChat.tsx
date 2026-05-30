/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Music, VolumeX, Mic, Compass } from "lucide-react";
import { ChatMessage } from "../../types";

export default function SoulSaunterChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "init",
      sender: "assistant",
      text: "Assalamu alaikum, Zahra Fatima. I am Soul Saunter 🕊, your spiritually grounded companion created specifically for your birthday. I am here to share peace, Quranic comfort, gentle reflections, and duas with you. How is your heart doing today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [mode, setMode] = useState<"Reflection" | "Comfort" | "Reminder" | "Motivation">("Reflection");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const threadEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    threadEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || loading) return;

    if (!textToSend) setInputText("");

    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substring(2, 9),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          mode
        })
      });

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: Math.random().toString(36).substring(2, 9),
        sender: "assistant",
        text: data.text || "May Allah continuous bless your path with ease and light. Ameen.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: Math.random().toString(36).substring(2, 9),
        sender: "assistant",
        text: "I apologize, Zahra. My voice is drifting under the clouds right now, but I pray for your continuous ease. Alhamdulillah always.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Web Speech API Integration
  const startSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please enjoy typing!");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (transcript) {
        setInputText(transcript);
      }
    };

    recognition.onerror = (event: any) => {
      console.warn("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left panel: Chat interface (8 cols) */}
      <div className="lg:col-span-8 flex flex-col h-[calc(100vh-190px)] min-h-[480px]">
        {/* Mode Selector Row */}
        <div className="flex flex-wrap items-center gap-2.5 mb-5 px-1 py-1 overflow-x-auto select-none no-scrollbar">
          {(["Reflection", "Comfort", "Reminder", "Motivation"] as const).map((m) => {
            const isActive = mode === m;
            return (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="px-4 py-1.5 rounded-full text-[10px] tracking-widest uppercase transition-all duration-500 whitespace-nowrap"
                style={{
                  background: isActive ? "rgba(201, 169, 110, 0.12)" : "rgba(255, 255, 255, 0.015)",
                  border: isActive ? "1px solid rgba(201, 169, 110, 0.38)" : "1px solid rgba(201, 169, 110, 0.08)",
                  color: isActive ? "#e8c896" : "rgba(245, 240, 235, 0.5)",
                }}
              >
                {m}
              </button>
            );
          })}
        </div>

        {/* Message Lists Area */}
        <div className="flex-1 overflow-y-auto px-1 py-2 space-y-4 no-scrollbar border-b border-white/5 pr-2 mb-4">
          {messages.map((msg) => {
            const isBot = msg.sender === "assistant";
            return (
              <div
                key={msg.id}
                className={`flex mx-2 ${isBot ? "justify-start" : "justify-end"}`}
              >
                <div
                  className="max-w-[85%] rounded-2xl p-5 relative leading-relaxed transition-all duration-500"
                  style={{
                    background: isBot
                      ? "rgba(255, 255, 255, 0.022)"
                      : "rgba(201, 169, 110, 0.045)",
                    border: isBot
                      ? "1px solid rgba(201, 169, 110, 0.12)"
                      : "1px solid rgba(201, 169, 110, 0.28)",
                    borderTopLeftRadius: isBot ? "4px" : "16px",
                    borderTopRightRadius: isBot ? "16px" : "4px",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <p
                    className="text-xs md:text-[13px] font-light leading-relaxed whitespace-pre-line text-white/90"
                    style={{
                      fontFamily: isBot ? "'Barlow', sans-serif" : "'Barlow', sans-serif",
                    }}
                  >
                    {msg.text}
                  </p>
                  <div className="flex items-center justify-between gap-4 mt-2.5 opacity-40">
                    <span className="text-[9px] uppercase tracking-widest text-[#e8c896]">
                      {isBot ? "🕊 SOUL SAUNTER" : "ZAHRA"}
                    </span>
                    <span className="text-[9px] text-zinc-400 font-mono">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex justify-start mx-2">
              <div
                className="rounded-2xl p-4 flex items-center gap-2"
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(201, 169, 110, 0.12)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#e8c896] animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#e8c896] animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#e8c896] animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
          <div ref={threadEndRef} />
        </div>

        {/* Input Bar Form container */}
        <div className="relative">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 w-full p-2.5 rounded-2xl"
            style={{
              background: "rgba(255, 255, 255, 0.025)",
              border: "1px solid rgba(201, 169, 110, 0.18)",
              backdropFilter: "blur(10px)",
            }}
          >
            <button
              type="button"
              onClick={startSpeechRecognition}
              className={`p-2 rounded-full transition-all duration-300 ${isListening ? "text-red-400 animate-pulse bg-red-400/10" : "text-[#c9a96e] hover:bg-white/5"}`}
              title="Speak voice input"
            >
              <Mic className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Speak with Soul Saunter... ask for comforting reflections or duas"
              className="flex-1 bg-transparent px-2 text-xs md:text-sm focus:outline-none placeholder-zinc-500 text-zinc-200"
            />
            <button
              type="submit"
              className="p-2.5 rounded-full text-[#090912] transition-all duration-300 flex items-center justify-center cursor-pointer"
              style={{
                background: "#e8c896",
              }}
              disabled={loading || !inputText.trim()}
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Right panel: Orb + Mode description (4 cols) */}
      <div className="hidden lg:flex lg:col-span-4 flex-col gap-6 select-none bg-white/[0.015] border border-white/5 rounded-2xl p-6 relative">
        <div className="flex flex-col items-center justify-center p-6 h-48 relative overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-radial from-[#c9a96e]/10 to-transparent flex items-center justify-center">
            {/* Elegant oscillating orb wireframe utilizing CSS animation keyframes */}
            <div
              className={`w-28 h-28 rounded-full border border-[#e8c896]/30 relative flex items-center justify-center ${loading ? "animate-spin-slow duration-[30s]" : "animate-pulse"}`}
              style={{
                boxShadow: loading
                  ? "0 0 35px rgba(251, 191, 36, 0.25), inset 0 0 20px rgba(201,169,110,0.15)"
                  : "0 0 25px rgba(201, 169, 110, 0.12), inset 0 0 15px rgba(255,255,255,0.02)",
              }}
            >
              <div className="w-20 h-20 rounded-full border border-dashed border-[#e8c896]/15 animate-ping opacity-30" />
              <Compass className="w-6 h-6 absolute text-[#e8c896]/60 animate-spin-slow" />
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2
            className="text-[22px] italic tracking-widest text-[#e8c896]"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            🕊 Soul Saunter
          </h2>
          <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 block mt-1">
            Guardian of Zahra's Comfort
          </span>
        </div>

        <div className="text-xs text-zinc-400 font-light space-y-3 leading-relaxed border-t border-white/5 pt-4">
          <p className="flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-[#e8c896] shrink-0" />
            <span>
              <strong>Reflection:</strong> Guides introspection through targeted Quranic verses and questions.
            </span>
          </p>
          <p className="flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-[#e8c896] shrink-0" />
            <span>
              <strong>Comfort:</strong> Bestows warm validation, soft empathy, and sincere protective prayers.
            </span>
          </p>
          <p className="flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-[#e8c896] shrink-0" />
            <span>
              <strong>Reminder:</strong> Light-bearing capsules of Islamic wisdom to calm everyday storms.
            </span>
          </p>
          <p className="flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-[#e8c896] shrink-0" />
            <span>
              <strong>Motivation:</strong> Sincere spurs of action emphasizing Sabr (patience) and Tawakkul (trust).
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
