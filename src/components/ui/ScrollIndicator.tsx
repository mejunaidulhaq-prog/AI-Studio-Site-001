/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

interface ScrollIndicatorProps {
  label?: string;
}

export default function ScrollIndicator({ label = "Scroll down to saunter" }: ScrollIndicatorProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span
        style={{
          fontFamily: "'Barlow', sans-serif",
          letterSpacing: "0.2em",
          color: "rgba(245, 240, 235, 0.4)",
        }}
        className="text-[9px] uppercase tracking-widest"
      >
        {label}
      </span>
      <div 
        className="w-5 h-8 rounded-full flex justify-center p-1 border"
        style={{
          borderColor: "rgba(201, 169, 110, 0.25)",
          background: "rgba(255, 255, 255, 0.02)",
        }}
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-1 h-2 rounded-full"
          style={{
            background: "#c9a96e",
          }}
        />
      </div>
    </div>
  );
}
