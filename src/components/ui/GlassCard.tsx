/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode, useState } from "react";
import { motion } from "motion/react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export default function GlassCard({ children, className = "", onClick, hoverable = false }: GlassCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => { if (hoverable) setIsHovered(true); }}
      onMouseLeave={() => { if (hoverable) setIsHovered(false); }}
      className={`relative transition-all duration-300 ease-out p-6 md:p-8 ${className} ${onClick ? 'cursor-pointer' : ''}`}
      style={{
        background: isHovered
          ? "rgba(22, 22, 24, 0.9)"
          : "rgba(18, 18, 20, 0.75)",
        border: isHovered
          ? "1px solid #71717A"
          : "1px solid #27272A",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderRadius: "4px",
        boxShadow: isHovered
          ? "0 12px 40px rgba(0, 0, 0, 0.5), 0 0 1px rgba(255, 255, 255, 0.15)"
          : "0 6px 20px rgba(0, 0, 0, 0.3)",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      {/* Absolute sharp corner borders for a technical/bold editorial feel */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-zinc-500 rounded-none z-10" />
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-zinc-500 rounded-none z-10" />
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-zinc-500 rounded-none z-10" />
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-zinc-500 rounded-none z-10" />
      
      {children}
    </div>
  );
}
