/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import CanvasWrapper from "../layout/CanvasWrapper";
import GardenScene from "../three/GardenScene";
import GlassCard from "../ui/GlassCard";
import ScrollIndicator from "../ui/ScrollIndicator";
import { Info, Sparkles, Flower } from "lucide-react";

export default function GardenView() {
  const [activeMessageIndex, setActiveMessageIndex] = useState<number | null>(null);

  const roseMessages = [
    {
      title: "Center Miracle",
      text: "Some people make the world softer simply by existing. Zahra Fatima is one of those rare, irreplaceable entities.",
    },
    {
      title: "Kindness",
      text: "Her kindness doesn't ask for anything in return; it simply flows quietly, making everything around it feel a bit lighter.",
    },
    {
      title: "Loyalty",
      text: "A soul this gentle is rare and irreplaceable. She safeguards silent trust like a sacred cove.",
    },
    {
      title: "Patience",
      text: "Sabr (patience) is her quiet sanctuary. She stays steady through life's shifting seasons with deep faith.",
    },
    {
      title: "Strength",
      text: "There is immense strength in true gentleness, an elegant power that does not yell yet is felt by all.",
    },
    {
      title: "Peace",
      text: "Being near her quiet presence is like walking in a tranquil garden during a soft morning breeze.",
    },
    {
      title: "Grace",
      text: "Her soft, warm speech and humble intentions bloom beautifully, traveling further than she will ever fully realize.",
    }
  ];

  const handleSelectRose = (index: number) => {
    setActiveMessageIndex(index);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 select-text" id="garden-view-container">
      {/* SECTION HEADER */}
      <div className="text-center py-4 mb-4">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9a96e]">
          Interactive Sanctuary
        </span>
        <h1 className="text-4xl md:text-5xl text-[#e8c896]" style={{ fontFamily: "'Instrument Serif', serif" }}>
          THE MOONLIFT GARDEN
        </h1>
        <p className="text-zinc-500 font-light text-xs max-w-sm mx-auto mt-2 leading-relaxed">
          Tap onto the glowing roses below to reveal silent reflections hidden in this digital flower bed.
        </p>
      </div>

      {/* 3D CANVAS WRAPPER (height defined as per RULE 6) */}
      <div className="relative my-8">
        <CanvasWrapper height={480}>
          <GardenScene onSelectRose={handleSelectRose} />
        </CanvasWrapper>

        {/* Floating Framer Motion Overlay (Safe outside core canvas rendering space, zIndex: 10) */}
        <AnimatePresence mode="wait">
          {activeMessageIndex !== null && (
            <motion.div
              key={activeMessageIndex}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-x-4 bottom-6 md:inset-x-12 md:bottom-12 max-w-lg mx-auto pointer-events-auto z-10"
            >
              <GlassCard className="p-6 md:p-8 relative border-[#c9a96e]/30 shadow-2xl bg-black/60 backdrop-blur-md">
                <button
                  onClick={() => setActiveMessageIndex(null)}
                  className="absolute top-3.5 right-4 text-xs font-mono text-zinc-400 hover:text-[#e8c896] transition"
                  aria-label="Close message"
                >
                  ✕ CLOSE
                </button>

                <div className="flex items-center gap-2 mb-3">
                  <Flower className="w-4 h-4 text-[#e8c896]" />
                  <span
                    style={{
                      fontFamily: "'Instrument Serif', Georgia, serif",
                      fontStyle: "italic",
                      letterSpacing: "0.15em",
                    }}
                    className="text-lg md:text-xl text-[#e8c896]"
                  >
                    Rose of {roseMessages[activeMessageIndex].title}
                  </span>
                </div>

                <p
                  className="text-xs md:text-sm font-light text-zinc-100/90 leading-relaxed italic"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  &ldquo;{roseMessages[activeMessageIndex].text}&rdquo;
                </p>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FOOTER TIPS CARD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10 max-w-3xl mx-auto">
        <div className="flex gap-3 px-4 py-4 rounded-xl border border-[#c9a96e]/10 bg-white/[0.008]">
          <Info className="w-5 h-5 text-[#e8c896] shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#c9a96e]">
              Visual Navigation
            </span>
            <p className="text-[11px] font-light text-zinc-400 leading-relaxed">
              Drag on screen to pivot the moonbeams. Fireflies drift slowly, while butterflies orbit the center miracle rose. Click roses to reveal.
            </p>
          </div>
        </div>
        <div className="flex gap-3 px-4 py-4 rounded-xl border border-[#c9a96e]/10 bg-white/[0.008]">
          <Sparkles className="w-5 h-5 text-[#c9a96e] shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#c9a96e]">
              Respectful Tributes
            </span>
            <p className="text-[11px] font-light text-zinc-400 leading-relaxed">
              Every quality matches specific attributes observed in her gentle manners. True nobility does not seek noise.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <ScrollIndicator label="Proceed forward to her cake" />
      </div>
    </div>
  );
}
