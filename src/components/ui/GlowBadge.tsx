/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

interface GlowBadgeProps {
  text: string;
  delay?: number;
}

export default function GlowBadge({ text, delay = 0.2 }: GlowBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="inline-flex items-center gap-2 px-3 py-1 rounded-none border"
      style={{
        background: "rgba(39, 39, 42, 0.4)",
        borderColor: "#3F3F46",
        backdropFilter: "blur(10px)",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Sparkles className="w-3 h-3 text-[#FFFFFF] animate-pulse" />
      <span
        style={{
          fontFamily: "var(--font-display)",
          letterSpacing: "0.22em",
          color: "#FFFFFF",
          fontWeight: 700,
        }}
        className="text-[9px] uppercase tracking-widest pt-0.5"
      >
        {text}
      </span>
    </motion.div>
  );
}
