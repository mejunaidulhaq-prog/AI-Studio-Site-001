/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import GlassCard from "../ui/GlassCard";
import ScrollIndicator from "../ui/ScrollIndicator";
import { Heart, Sparkles, Send, CheckCircle } from "lucide-react";
import { GuestWish } from "../../types";

export default function DuaView() {
  const [wishes, setWishes] = useState<GuestWish[]>([]);
  const [nameInput, setNameInput] = useState("");
  const [msgInput, setMsgInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Fetch wishes from Express API on mount
  const fetchWishes = async () => {
    try {
      const response = await fetch("/api/wishes");
      const data = await response.json();
      setWishes(data);
    } catch (err) {
      console.warn("Unable to fetch wishes from backend, using graceful offline fallbacks.", err);
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  const handleCreateWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !msgInput.trim() || submitting) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author_name: nameInput,
          message: msgInput,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setNameInput("");
        setMsgInput("");
        fetchWishes(); // Re-fetch current roster
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const sacredDuas = [
    {
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ",
      translit: "Allahumma inni as'aluka al-'afwa wal-'afiyah fid-dunya wal-akhirah",
      trans: "O Allah, I ask You for forgiveness and protection in this life and the Next.",
      pill: "Pardon & Well-being"
    },
    {
      arabic: "رَّبِّ زِدْنِي عِلْمًا وَارْزُقْنِي فَهْمًا",
      translit: "Rabbi zidni 'ilma wa arzuqni fahma",
      trans: "My Lord, increase me in knowledge and grant me deep understanding.",
      pill: "Knowledge & Wisdom"
    },
    {
      arabic: "اللَّهُمَّ بَارِكْ لَهَا فِي عُمْرِهَا وَعِلْمِهَا وَعَمَلِهَا",
      translit: "Allahumma barik laha fi 'umriha wa 'ilmiha wa 'amaliha",
      trans: "O Allah, bless her in her lifespan, her knowledge, and her deeds.",
      pill: "Spiritual Blessing"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 select-text" id="dua-view-container">
      {/* HEADER SECTION */}
      <div className="text-center py-4 mb-4 select-text">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9a96e]">
          The Sacred Vault
        </span>
        <h1 className="text-4xl md:text-5xl text-[#e8c896]" style={{ fontFamily: "'Instrument Serif', serif" }}>
          SINCERE DUAS & TRIBUTES
        </h1>
        <p className="text-zinc-500 font-light text-xs max-w-sm mx-auto mt-2 leading-relaxed">
          Sincere, protective prayers typed programmatically to guard her barakah. Submit your name and birthday wish to the living guestbook.
        </p>
      </div>

      {/* THREE SACRED DUAS */}
      <div className="space-y-6 max-w-3xl mx-auto my-12" id="sacred-duas-grid">
        {sacredDuas.map((dua, i) => (
          <GlassCard key={i} className="p-6 relative text-center overflow-hidden border-[#c9a96e]/15">
            <span className="text-[9px] uppercase tracking-widest text-[#e8c896] font-mono border border-[#e8c896]/30 px-3 py-1 rounded-full inline-block mb-4">
              {dua.pill}
            </span>
            <p className="text-2xl md:text-3xl font-serif text-[#e8c896] mb-3 leading-relaxed tracking-normal select-text">
              {dua.arabic}
            </p>
            <p className="text-[11px] font-mono tracking-wide text-zinc-400 mb-1">
              &ldquo;{dua.translit}&rdquo;
            </p>
            <p className="text-xs font-light text-zinc-300 leading-relaxed max-w-xl mx-auto italic">
              &ldquo;{dua.trans}&rdquo;
            </p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-16 pt-8 border-t border-white/5">
        {/* LEFT: Guestbook Wishes board (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4.5 h-4.5 text-[#e8c896]" />
            <span
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                letterSpacing: "0.15em",
              }}
              className="text-2xl text-[#f5f0eb]"
            >
              Living Guestbook
            </span>
          </div>

          <div className="space-y-4 overflow-y-auto max-h-[480px] pr-2 no-scrollbar" id="wishes-scroller">
            {wishes.map((w) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-5 rounded-2xl border"
                style={{
                  background: "rgba(255,255,255,0.015)",
                  borderColor: "rgba(201, 169, 110, 0.12)",
                }}
              >
                <p className="text-xs md:text-sm font-light text-zinc-200 leading-relaxed italic">
                  &ldquo;{w.message}&rdquo;
                </p>
                <div className="flex items-center justify-between mt-3 text-[10px] tracking-widest text-[#e8c896]/65 border-t border-white/5 pt-2 font-mono uppercase">
                  <span>From: {w.author_name}</span>
                  <span className="text-zinc-500">{new Date(w.created_at).toLocaleDateString()}</span>
                </div>
              </motion.div>
            ))}
            {wishes.length === 0 && (
              <p className="text-xs text-zinc-500 italic mt-4 text-center">
                Sailing lanterns through the sky... guestbook is empty. Be the first to submit a tribute below!
              </p>
            )}
          </div>
        </div>

        {/* RIGHT: Input Form block (5 cols) */}
        <div className="lg:col-span-5 bg-white/[0.012] border border-white/5 rounded-2xl p-6 relative">
          <div className="mb-4">
            <span className="text-[9px] uppercase font-mono tracking-widest text-[#c9a96e]">
              Sign Sanctuary guestbook
            </span>
            <h3
              style={{ fontFamily: "'Instrument Serif', serif" }}
              className="text-xl italic text-white/90 font-serif leading-none mt-1"
            >
              Add Your Sincere Wish
            </h3>
          </div>

          <form onSubmit={handleCreateWish} className="space-y-4 text-zinc-300">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">Your Name</label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="e.g., Mariam / A Friend"
                required
                maxLength={50}
                className="w-full bg-white/[0.02] border border-[#c9a96e]/20 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-[#e8c896] outline-none placeholder-zinc-600 text-[#f5f0eb]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">Personal message (Under 500 characters)</label>
              <textarea
                value={msgInput}
                onChange={(e) => setMsgInput(e.target.value)}
                placeholder="Write your beautiful birthday tribute or dua for Zahra Fatima..."
                required
                maxLength={500}
                rows={4}
                className="w-full bg-white/[0.02] border border-[#c9a96e]/20 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-[#e8c896] outline-none placeholder-zinc-600 text-[#f5f0eb] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting || !nameInput.trim() || !msgInput.trim()}
              className="w-full py-3 bg-[#e8c896] hover:bg-[#e8c896]/95 text-[#090912] rounded-full text-xs tracking-widest uppercase cursor-pointer transition flex items-center justify-center gap-1.5 font-medium disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Send className="w-3.5 h-3.5" />
              {submitting ? "Sending Lantern..." : "Float My Wish"}
            </button>
          </form>

          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="mt-4 flex items-center gap-2 text-green-400 text-xs font-light p-3 bg-green-500/5 rounded-xl border border-green-500/20"
              >
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Your wish has been launched upwards like a quiet lantern. Alhamdulillah!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-12 text-center">
        <ScrollIndicator label="Proceed forward to the cinematic ending" />
      </div>
    </div>
  );
}
