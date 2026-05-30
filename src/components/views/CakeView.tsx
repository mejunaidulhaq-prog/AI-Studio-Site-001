/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import CanvasWrapper from "../layout/CanvasWrapper";
import CakeScene from "../three/CakeScene";
import GlassCard from "../ui/GlassCard";
import ScrollIndicator from "../ui/ScrollIndicator";
import { Sparkles, Heart } from "lucide-react";

export default function CakeView() {
  const [blownStatus, setBlownStatus] = useState<boolean[]>([false, false, false]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string; size: number; delay: number }[]>([]);

  const handleBlowCandle = (index: number) => {
    setBlownStatus((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  useEffect(() => {
    // Audit if all 3 candles are blown
    if (blownStatus.every((b) => b === true)) {
      setShowCelebration(true);
      
      // Sprout 40 floating colorful stardust confetti particles programmatically
      const colors = ["#e8c896", "#c9a96e", "#9b1a2a", "#1a2f7a", "#ff9a3c"];
      const generated = Array.from({ length: 45 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100, // percentage x width
        y: Math.random() * -20 - 5, // offset top height
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        delay: Math.random() * 2,
      }));
      setParticles(generated);
    }
  }, [blownStatus]);

  const resetCandles = () => {
    setBlownStatus([false, false, false]);
    setShowCelebration(false);
    setParticles([]);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 relative select-text" id="cake-view-container">
      {/* HEADER */}
      <div className="text-center py-4 mb-3">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9a96e]">
          The Celebration Core
        </span>
        <h1 className="text-4xl md:text-5xl text-[#e8c896]" style={{ fontFamily: "'Instrument Serif', serif" }}>
          SWEETENED DUAS
        </h1>
        <p className="text-zinc-500 font-light text-xs max-w-sm mx-auto mt-2 leading-relaxed">
          Drag to orbit the golden cake layers. Tap each of the three candles directly to blow out the flames.
        </p>
      </div>

      {/* 3D CANVAS & CELEBRATION */}
      <div className="relative my-6 max-w-[560px] mx-auto">
        <CanvasWrapper height={430}>
          <CakeScene blownStatus={blownStatus} onBlowCandle={handleBlowCandle} />
        </CanvasWrapper>

        {/* Confetti Particle Emitters Layer */}
        {showCelebration && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-2">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ y: "0%", x: `${p.x}%`, rotate: 0 }}
                animate={{
                  y: "110%",
                  x: `${p.x + (Math.random() * 15 - 7.5)}%`,
                  rotate: 360,
                }}
                transition={{
                  duration: Math.random() * 2.5 + 2,
                  repeat: Infinity,
                  ease: "easeIn",
                  delay: p.delay,
                }}
                className="absolute w-2 h-2 rounded-lg opacity-80"
                style={{
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  background: p.color,
                  top: "-10px",
                }}
              />
            ))}
          </div>
        )}

        {/* Modal Celebration / Dua Card */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-4 top-1/2 -translate-y-1/2 p-2 z-10"
            >
              <GlassCard className="text-center p-8 md:p-10 border-[#e8c896]/40 shadow-2xl bg-black/85 backdrop-blur-xl">
                <div className="w-12 h-12 rounded-full border border-[#e8c896]/30 flex items-center justify-center mx-auto mb-4 bg-amber-400/5">
                  <Sparkles className="w-5 h-5 text-[#e8c896] animate-pulse" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-serif italic text-[#e8c896] mb-3">
                  Barakah & Peace
                </h3>

                <p className="text-xs md:text-sm font-light text-zinc-100/90 leading-relaxed max-w-sm mx-auto italic mb-6">
                  &ldquo;May Allah fill your year with barakah, effortless ease, serene health, and unmatched peace of mind. May all your secret prayers find their beautiful answers. Ameen.&rdquo;
                </p>

                <div className="flex flex-col items-center gap-3">
                  <button
                    onClick={resetCandles}
                    className="px-6 py-2.5 text-[10px] tracking-widest uppercase rounded-full cursor-pointer transition w-full max-w-[180px]"
                    style={{
                      background: "rgba(201,169,110,0.12)",
                      border: "1px solid rgba(201,169,110,0.3)",
                      color: "#e8c896",
                    }}
                  >
                    Melt Candles Again
                  </button>
                  <span className="text-[9px] uppercase tracking-widest text-[#c9a96e]/70 flex items-center gap-1 mt-1">
                    <Heart className="w-3 h-3 text-[#9b1a2a]" /> WITH UNFINISHED APPRECIATION
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-center mt-4">
        <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
          {blownStatus.every(b => b === true)
            ? "✨ All candles are extinguished!"
            : `⚡ Candles blown: ${blownStatus.filter(b => b === true).length} of 3`}
        </p>
      </div>

      <div className="mt-12 text-center">
        <ScrollIndicator label="Open her handwritten letter" />
      </div>
    </div>
  );
}
