/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import CanvasWrapper from "../layout/CanvasWrapper";
import ConstellationScene from "../three/ConstellationScene";
import GlassCard from "../ui/GlassCard";
import ScrollIndicator from "../ui/ScrollIndicator";
import { Star, Sparkles, AlertCircle } from "lucide-react";

export default function ConstellationView() {
  const [activeStarId, setActiveStarId] = useState<string | null>(null);

  const starAttributes: { [key: string]: { trait: string; text: string } } = {
    Kindness: {
      trait: "Quiet Kindness",
      text: "The way she gives without keeping score — quietly extraordinary. Her kindness does not ask for attention; it simply warms."
    },
    Loyalty: {
      trait: "Steady Loyalty",
      text: "She stays. Through seasons, through silences, through shifting climates. Her loyalty is a beautiful, unbreakable anchor."
    },
    Warmth: {
      trait: "Enchanted Warmth",
      text: "Rooms feel different when she enters them. Lighter, softer, and filled with a humble and welcoming aura."
    },
    Patience: {
      trait: "Resilient Patience",
      text: "She holds space for others with a depth of Sabr few people know how to cultivate. A truly serene pillar."
    },
    Care: {
      trait: "Meticulous Care",
      text: "Her delicate attention to the small details of others' lives reveals a vast, caring heart that notes what others overlook."
    },
    Strength: {
      trait: "Humble Strength",
      text: "There is a quiet, powerful force inside true gentleness. Zahra carries both beautifully, navigating with deep faith (Tawakkul)."
    },
    Peace: {
      trait: "Serene Peace",
      text: "Being near her is like standing in a pristine courtyard garden after fresh morning rain. It brings stillness to busy minds."
    }
  };

  const handleSelectStar = (id: string) => {
    setActiveStarId(id);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 select-text" id="constellation-view-container">
      {/* HEADER SECTION */}
      <div className="text-center py-4 mb-4">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9a96e]">
          The Attribute Sky Map
        </span>
        <h1 className="text-4xl md:text-5xl text-[#e8c896]" style={{ fontFamily: "'Instrument Serif', serif" }}>
          MEMORY CONSTELLATIONS
        </h1>
        <p className="text-zinc-500 font-light text-xs max-w-sm mx-auto mt-2 leading-relaxed">
          Tap each of the seven stellar cores to parse the deep, Irreplaceable qualities that map her beautiful character.
        </p>
      </div>

      {/* THREEJS CONSTELLATION CELL */}
      <div className="relative my-8">
        <CanvasWrapper height={470}>
          <ConstellationScene onSelectStar={handleSelectStar} activeStarId={activeStarId} />
        </CanvasWrapper>

        {/* Dynamic attribute overlay */}
        <AnimatePresence mode="wait">
          {activeStarId && (
            <motion.div
              key={activeStarId}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-x-4 bottom-6 md:inset-x-12 md:bottom-12 max-w-md mx-auto pointer-events-auto z-10"
            >
              <GlassCard className="p-6 md:p-8 relative border-[#e8c896]/30 shadow-2xl bg-black/75 backdrop-blur-md">
                <button
                  onClick={() => setActiveStarId(null)}
                  className="absolute top-3.5 right-4 text-xs font-mono text-zinc-400 hover:text-[#e8c896] transition"
                  aria-label="Close star description"
                >
                  ✕ CLOSE
                </button>

                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-[#e8c896] fill-[#e8c896]/20 animate-spin-slow" />
                  <span
                    style={{
                      fontFamily: "'Instrument Serif', Georgia, serif",
                      fontStyle: "italic",
                      letterSpacing: "0.15em",
                    }}
                    className="text-lg md:text-xl text-[#e8c896]"
                  >
                    The Star of {starAttributes[activeStarId].trait}
                  </span>
                </div>

                <p
                  className="text-xs md:text-sm font-light text-zinc-100/90 leading-relaxed italic"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  &ldquo;{starAttributes[activeStarId].text}&rdquo;
                </p>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* INFO HINTS BAR */}
      <div className="max-w-xl mx-auto flex items-center gap-3 px-4 py-3.5 rounded-xl border border-[#c9a96e]/10 bg-white/[0.005]">
        <AlertCircle className="w-5 h-5 text-[#e8c896] shrink-0" />
        <span className="text-[11px] font-light text-zinc-500 leading-relaxed">
          Interactive tip: Drag anywhere on the galactic canvas to rotate her trait sphere and explore from multiple celestial angles.
        </span>
      </div>

      <div className="mt-12 text-center">
        <ScrollIndicator label="Proceed forward to challenge mini games" />
      </div>
    </div>
  );
}
