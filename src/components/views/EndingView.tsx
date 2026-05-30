/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import BlurText from "../ui/BlurText";
import { Compass, Sparkles, Heart } from "lucide-react";
import { AppView } from "../../types";

interface EndingViewProps {
  setView: (view: AppView) => void;
}

export default function EndingView({ setView }: EndingViewProps) {
  return (
    <div className="max-w-4xl mx-auto px-6 h-[80vh] flex flex-col items-center justify-center text-center relative" id="ending-view-container">
      {/* Decorative center Sparkle core */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="mb-8"
      >
        <div
          className="w-14 h-14 rounded-none flex items-center justify-center border animate-pulse relative"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            borderColor: "#3F3F46",
          }}
        >
          <Sparkles className="w-5 h-5 text-white" />
        </div>
      </motion.div>

      {/* Main spiritual wish */}
      <div className="mb-4">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">
          May Allah bless your <br />
          <span className="text-zinc-500 italic font-serif lowercase font-light">journey always.</span>
        </h2>
      </div>

      {/* Primary quotes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.95 }}
        transition={{ duration: 2.0, delay: 2.4 }}
        className="space-y-4 max-w-xl mx-auto my-6 select-text"
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            fontSize: "clamp(1.5rem, 4vw, 2.8rem)",
            lineHeight: 1.2,
          }}
          className="text-white uppercase leading-none"
        >
          &ldquo;Some souls leave <span className="text-zinc-500 italic font-serif lowercase font-light">softness</span> wherever they go.&rdquo;
        </p>

        <p
          style={{
            fontFamily: "var(--font-display)",
            letterSpacing: "0.18em",
          }}
          className="text-[10px] uppercase text-zinc-500 font-bold tracking-widest pt-4"
        >
          — Written for Zahra Fatima, 31st May
        </p>
      </motion.div>

      {/* Return Home Pill button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.0, delay: 3.2 }}
        className="mt-8"
      >
        <button
          onClick={() => setView('home')}
          className="px-8 py-4 rounded-none cursor-pointer text-xs font-bold tracking-widest uppercase flex items-center gap-2 transition-all duration-300 bg-white border border-white text-black hover:bg-zinc-200"
        >
          <Compass className="w-4 h-4" />
          Return Home
        </button>
      </motion.div>

      {/* Elegant foot copyright notes */}
      <div className="absolute bottom-4 inset-x-0 mx-auto opacity-30 select-text">
        <span className="text-[9px] uppercase tracking-widest text-[#E4E4E7]/70 flex items-center justify-center gap-1.5 font-bold">
          <Heart className="w-2.5 h-2.5 text-white fill-white" /> Craft with respect · 2026 May Sanctuary
        </span>
      </div>
    </div>
  );
}
