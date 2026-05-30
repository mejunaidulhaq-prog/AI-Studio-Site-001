/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  useDisplayFont?: boolean;
}

export default function BlurText({ text, delay = 0.5, className = "", useDisplayFont = false }: BlurTextProps) {
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      filter: "blur(12px)", 
      y: 15 
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as any, // Fine-tuned cubic bezier for elegant smoothness
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`inline-flex flex-wrap justify-center gap-x-2 md:gap-x-4 ${className}`}
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap">
          {word.split("").map((char, charIdx) => (
            <motion.span
              variants={itemVariants}
              key={charIdx}
              className="inline-block"
              style={{
                fontFamily: useDisplayFont ? "var(--font-display)" : "'Instrument Serif', Georgia, serif",
                fontStyle: useDisplayFont ? "normal" : "italic",
                letterSpacing: useDisplayFont ? "-0.04em" : "0.18em",
                fontWeight: useDisplayFont ? 900 : 300,
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
}
