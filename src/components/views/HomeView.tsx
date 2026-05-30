/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { AppView } from "../../types";
import GlowBadge from "../ui/GlowBadge";
import BlurText from "../ui/BlurText";
import CanvasWrapper from "../layout/CanvasWrapper";
import CakeScene from "../three/CakeScene";
import ScrollIndicator from "../ui/ScrollIndicator";
import { ArrowRight, Compass, Heart, MessageSquare, BookOpen, Star, Sparkles, Smile, Flower2, Gift } from "lucide-react";

interface HomeViewProps {
  setView: (view: AppView) => void;
}

export default function HomeView({ setView }: HomeViewProps) {
  // Navigation matrix maps for the 9 inner nodes
  const nodes: { id: AppView; label: string; desc: string; icon: any }[] = [
    { id: 'story', label: "Her Story", desc: "A cinematic vertical timeline tracking her seasons of patience and grace.", icon: BookOpen },
    { id: 'garden', label: "3D Flower Garden", desc: "Interactive moonlit flower bed where roses hold deeply tranquil whispers.", icon: Flower2 },
    { id: 'cake', label: "Interactive Cake", desc: "A gorgeous three-tier cake with real candle-blowing mechanics and sweet celebrations.", icon: Gift },
    { id: 'letter', label: "Handwritten Letter", desc: "A quiet, comforting fold-out letter penned with deep appreciation.", icon: MessageSquare },
    { id: 'companion', label: "Companion: Soul Saunter", desc: "Wise, gentle, Islamic-grounded AI sister designed to speak peace to her heart.", icon: Compass },
    { id: 'constellation', label: "Constellation of Traits", desc: "A radiant stellar map where each star honors. her irreplaceable qualities.", icon: Star },
    { id: 'games', label: "Enchanted Mini Games", desc: "Five lightweight interactive puzzles crafted around roses and candles.", icon: Smile },
    { id: 'dua', label: "Floating Lanz & Duas", desc: "Send protective prayers upwards as glowing geometric lanterns float to the heavens.", icon: Heart },
    { id: 'ending', label: "Cinematic Ending", desc: "Final celestial credits celebrating her birth with stars and roses.", icon: Sparkles },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6" id="home-view-container">
      {/* HERO SECTION */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center text-center gap-6 relative">
        <GlowBadge text="31 MAY · A Day That Brought Warmth Into Many Hearts" />

        {/* Dynamic 3D Cake Preview inside Hero (Super polished & interactive) */}
        <div className="w-full max-w-[460px] mx-auto opacity-95">
          <CanvasWrapper height={320}>
            <CakeScene blownStatus={[false, false, false]} onBlowCandle={() => {}} />
          </CanvasWrapper>
        </div>

        {/* Name Title */}
        <div className="mt-2 select-text">
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9]">
            ZAHRA <br />
            <span className="text-zinc-500 italic font-serif font-light lowercase">Fatima</span>
          </h1>
        </div>

        {/* Taglines */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="text-xs md:text-sm tracking-[0.15em] uppercase font-bold max-w-[620px] mx-auto text-zinc-400 leading-relaxed"
        >
          &ldquo;Some souls leave softness wherever they go.&rdquo;
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.48, y: 0 }}
          transition={{ duration: 1.2, delay: 2.2 }}
          className="text-xs max-w-[500px] mx-auto leading-relaxed px-4 font-medium text-zinc-500"
        >
          Welcome to your handcrafted digital sanctuary. A peaceful, respectful space honoring your loyal companion, your patience, and your radiant light on this beautiful day.
        </motion.p>

        {/* Button Row */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-6"
        >
          <button
            onClick={() => setView('story')}
            className="px-8 py-4 text-xs tracking-widest uppercase rounded-none cursor-pointer flex items-center gap-2 transition-all duration-300 font-bold hover:bg-zinc-200"
            style={{
              background: "#FFFFFF",
              border: "1px solid #FFFFFF",
              color: "#000000",
            }}
          >
            Begin Journey
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
          <button
            onClick={() => {
              const el = document.getElementById("sanctuary-itinerary");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 text-xs tracking-widest uppercase rounded-none cursor-pointer transition-all duration-300 font-bold bg-transparent border border-zinc-700 text-white hover:bg-zinc-900/40 hover:border-zinc-500"
          >
            Explore Sanctuary Details
          </button>
        </motion.div>

        <div className="mt-12">
          <ScrollIndicator label="Scroll for itinerary" />
        </div>
      </section>

      {/* QUALITIES SECTION */}
      <section className="py-20 border-t border-zinc-800 select-text" id="sanctuary-itinerary">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold">
            Handcrafted Map
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3 tracking-tighter uppercase">
            Sanctuary <span className="text-zinc-500 italic font-serif lowercase font-light">itinerary</span>
          </h2>
          <p className="text-zinc-500 font-medium text-xs max-w-md mx-auto mt-3 leading-relaxed">
            Nine beautifully organized sections containing interactive stories, companion guides, and creative games tailored just for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nodes.map((node, idx) => {
            const IconComponent = node.icon;
            return (
              <motion.div
                key={node.id}
                onClick={() => setView(node.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative cursor-pointer p-6 rounded-none transition-all duration-300 hover:border-zinc-500 bg-[#161618]/60"
                style={{
                  border: "1px solid #27272A",
                }}
              >
                <div className="flex items-center gap-3.5 mb-3.5">
                  <div className="w-9 h-9 rounded-none flex items-center justify-center bg-zinc-800/40 border border-zinc-700 group-hover:border-white transition duration-300">
                    <IconComponent className="w-4 h-4 text-white group-hover:scale-110 transition duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight group-hover:translate-x-1 transition duration-300">
                    {node.label}
                  </h3>
                </div>
                <p className="text-xs font-medium text-zinc-400 group-hover:text-zinc-300 transition duration-300 leading-relaxed pr-1">
                  {node.desc}
                </p>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 flex items-center gap-1 mt-4 group-hover:text-white transition duration-300 font-bold">
                  Enter Step {idx + 1} &rarr;
                </span>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
