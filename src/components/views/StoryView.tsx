/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import BlurText from "../ui/BlurText";
import GlassCard from "../ui/GlassCard";
import ScrollIndicator from "../ui/ScrollIndicator";
import { BookOpen, Sparkles, Heart, HelpCircle, Compass } from "lucide-react";

export default function StoryView() {
  const steps = [
    {
      season: "Season of Gentle Quietness",
      time: "First Encounters",
      desc: "Zahra Fatima has always carried a unique quality—she doesn't seek the spotlight, nor does she try to drown other voices. Instead, her warmth manifests in the calm gaps, in listening carefully, and in making everyone around her feel at ease, quietly and sincerely.",
      icon: Compass
    },
    {
      season: "Season of Sabr & Sincerity",
      time: "The Pillars of Trust",
      desc: "True friendship is forged in the silence of understanding. Her patience (Sabr) is a protective shield, allowing others room to express their doubts and fears without judgment. She gives counsel, not fatwas, guiding gently like a glowing wick in a candlelit room.",
      icon: HelpCircle
    },
    {
      season: "Season of Steadfast Loyalty",
      time: "The Sacred Covenant",
      desc: "Season after season, silence after silence, she remains. Loyalty isn't about grand announcements; it is the quiet reassurance of knowing that some people remain when the world wanders. Dearest Zahra stays steady, loyal to those she cares for deeply.",
      icon: Heart
    },
    {
      season: "Season of Constant Light",
      time: "Spiritual Elevation",
      desc: "To care without expecting equivalent returns is a beautiful, rare spiritual elevation. Her sincere duas reach beyond her own sight, showering barakah, comfort, and protection onto the lives of those she loves. It is a reflection of a soul that seeks beauty.",
      icon: Sparkles
    },
    {
      season: "Season of Tranquil Birthdays",
      time: "31 May Sanctuary",
      desc: "Her birth was a quiet dawn that brought soft lines of comfort to those around her. This website serves as a living, glowing testimony of that light, celebrating another beautiful year of her presence, her wisdom, and her irreplaceable self.",
      icon: BookOpen
    }
  ];

  const quotes = [
    "&ldquo;There are some people who are like quiet rain: you don't hear them arrive, but they make everything around them blossom.&rdquo;",
    "&ldquo;Loyalty and gentle character are the golden cosmetics of a truly spiritual soul.&rdquo;",
    "&ldquo;Zahra: the luminous flower. True to her name, she opens when the night is quietest and shines with an exquisite, subtle grace.&rdquo;"
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 select-text" id="story-view-container">
      {/* HEADER TITLE */}
      <div className="text-center py-8">
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-[0.9]">
          HER <span className="text-zinc-500 italic font-serif lowercase font-light">story</span>
        </h1>
        <p className="text-xs uppercase tracking-[0.22em] text-zinc-500 mt-3 font-bold">
          A narrative tribute to a luminous soul
        </p>
      </div>

      {/* TIMELINE */}
      <div className="relative border-l border-zinc-800 my-16 ml-4 md:ml-12 space-y-12 pr-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline Connector node */}
              <div
                className="absolute left-[-11px] top-1 w-[22px] h-[22px] rounded-none flex items-center justify-center border transition-all duration-300 hover:scale-125"
                style={{
                  background: "#0F0F10",
                  borderColor: "#71717A",
                }}
              >
                <Icon className="w-2.5 h-2.5 text-white" />
              </div>

              {/* Box Details */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#71717A]">
                  {step.time}
                </span>
                <h3 className="text-xl font-bold uppercase text-white tracking-tight">
                  {step.season}
                </h3>
                <p className="text-xs md:text-sm font-medium text-zinc-400 leading-relaxed max-w-2xl">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CINEMATIC QUOTES PANELS */}
      <div className="space-y-8 my-20">
        <div className="text-center mb-6">
          <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
            Resonant Reminders
          </span>
          <h2 className="text-3xl font-black text-white mt-1 uppercase tracking-tight">
            Quiet <span className="text-zinc-500 italic font-serif lowercase font-light">echoes</span>
          </h2>
        </div>

        {quotes.map((quote, qIdx) => (
          <motion.div
            key={qIdx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="text-center py-10 px-8 relative overflow-hidden group">
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  lineHeight: 1.5,
                }}
                className="text-lg md:text-xl text-white uppercase tracking-tight max-w-2xl mx-auto"
                dangerouslySetInnerHTML={{ __html: quote }}
              />
              <div className="absolute right-4 bottom-4 w-8 h-8 opacity-5">
                <Sparkles className="w-full h-full text-white" />
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <ScrollIndicator label="Continue along her sanctuaries" />
      </div>
    </div>
  );
}
