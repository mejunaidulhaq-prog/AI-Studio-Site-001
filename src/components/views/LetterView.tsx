/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, BookOpen, Heart, Sparkles } from "lucide-react";

export default function LetterView() {
  const [isOpen, setIsOpen] = useState(false);

  // Staggered sequence paragraphs
  const paragraphs = [
    "Today is a very beautiful day, I don't know what to say you, I've litreally no words you've been such an amazing fellow. In a very short time the bond that I've shared with you I can't explain in words. Through thick and thin thorugh happiness and sorrows you were with me more than a friend. Infact, I've got no friend just got some people in name of friend. I don't know what to say you how to wish you that's why just created this small website for you. I know its not that good you know just trying to learn right now, not good at web development. I hope you'll like it. And yeah Thank you so much fo everything you've done. I can't express my feelings in words, I'm just speachless. Your loyalty, your patience, your silent way of caring for people without expecting anything in return — these are not minor ornaments. You, dearest Zahra Fatima, are one of those rare, precious souls.",
    "Just wanna say that I pray that Allah Almighty bless you with everything, I pray that he guides you through every part of your life he fulfills your all wishes, he gives you many more than you pray for. I pray that Almighty Allah bless you with effortless ease, beautiful health, and endless barakah. That every door of goodness you deserve swings wide open for you. That your gentle heart always finds absolute peace in His remembrance.",
    "On this beautiful 31st of May and every single day: may you fully know your own worth. May you always feel supported, protected, and appreciated by those who are blessed to stand in your gentle light."
  ];

  return (
    <div className="max-w-3xl mx-auto px-6" id="letter-view-container">
      {/* PAGE HEADER */}
      <div className="text-center py-4 mb-4 select-text">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9a96e]">
          The Sacred Envelope
        </span>
        <h1 className="text-4xl md:text-5xl text-[#e8c896]" style={{ fontFamily: "'Instrument Serif', serif" }}>
          A LETTER OF WORTH
        </h1>
        <p className="text-zinc-500 font-light text-xs max-w-sm mx-auto mt-2 leading-relaxed">
          A sincere tribute set to parchment. Tap the envelope seal to break the wax and unfold her letter.
        </p>
      </div>

      {/* ENVELOPE SECTOR */}
      <div className="relative flex justify-center my-6 min-h-[460px]">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Closed Envelope Card */
            <motion.div
              key="closed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, y: -40 }}
              transition={{ duration: 0.6 }}
              onClick={() => setIsOpen(true)}
              className="w-full max-w-md p-8 rounded-3xl cursor-pointer flex flex-col items-center justify-center text-center gap-6 relative"
              style={{
                background: "rgba(255, 255, 255, 0.025)",
                border: "2px solid rgba(201, 169, 110, 0.25)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* Wax Seal detail */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center relative transition duration-500 hover:scale-110"
                style={{
                  background: "radial-gradient(circle, #6b0f2a 0%, #3d0518 100%)",
                  border: "2px solid #e8c896",
                  boxShadow: "0 0 20px rgba(107, 15, 42, 0.6)",
                }}
              >
                <div className="absolute w-12 h-12 rounded-full border border-dashed border-[#e8c896]/20" />
                <Mail className="w-6 h-6 text-[#e8c896]" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#c9a96e]">
                  Broken Wax Wax
                </span>
                <h3 className="text-xl text-[#f5f0eb]">
                  To: Zahra Fatima
                </h3>
                <p className="text-xs font-light text-zinc-400 max-w-[240px] leading-relaxed mx-auto">
                  May this letter bring a gentle smile to your face. Click to break wax seal.
                </p>
              </div>
            </motion.div>
          ) : (
            /* Opened Letter Sheet (Paper-textured) */
            <motion.div
              key="opened"
              initial={{ y: 80, opacity: 0, rotateX: -12 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-2xl rounded-lg p-10 md:p-14 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #fbf7f0 0%, #ede2cb 100%)",
                color: "#2c1c0e",
                borderRadius: "4px",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3), 0 2px 10px rgba(0, 0, 0, 0.15), inset 0 0 40px rgba(44, 28, 14, 0.04)",
              }}
            >
              {/* Gold Filigree Line Top */}
              <div className="w-20 h-[1px] bg-[#2c1c0e]/15 mx-auto mb-8 absolute top-8 inset-x-0" />

              {/* Salutation */}
              <div className="mb-6">
                <p
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontStyle: "italic",
                    letterSpacing: "0.05em",
                  }}
                  className="text-2xl md:text-3xl font-serif text-[#6b1e32]"
                >
                  Dear Zahra,
                </p>
              </div>

              {/* Staggered Paragraph blocks */}
              <div className="space-y-6 text-xs md:text-sm font-light leading-relaxed pr-2 select-text text-zinc-800">
                {paragraphs.map((para, pIdx) => (
                  <motion.p
                    key={pIdx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.95, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.35 + pIdx * 0.4 }}
                  >
                    {para}
                  </motion.p>
                ))}
              </div>

              {/* Closing Signatures */}
              <div className="mt-10 pt-6 border-t border-[#2c1c0e]/10 flex flex-col items-end">
                <p className="text-xs uppercase tracking-widest text-zinc-500 font-mono scale-90">
                  With sincere dua and warmth,
                </p>
                <p
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontStyle: "italic",
                    letterSpacing: "0.08em",
                  }}
                  className="text-2xl text-[#6b1e32] mt-1"
                >
                  A Friend Who Sees Your Worth
                </p>
              </div>

              {/* Back to envelope seal button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute left-6 bottom-6 text-[10px] tracking-widest font-mono text-zinc-400 hover:text-[#6b1e32] transition uppercase"
              >
                &larr; Reseal Envelope
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
