/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AppView } from "./types";

// Layout & Global Elements
import Navbar from "./components/layout/Navbar";
import PageWrapper from "./components/layout/PageWrapper";

// Modular View Imports
import HomeView from "./components/views/HomeView";
import StoryView from "./components/views/StoryView";
import GardenView from "./components/views/GardenView";
import CakeView from "./components/views/CakeView";
import LetterView from "./components/views/LetterView";
import CompanionView from "./components/views/CompanionView";
import ConstellationView from "./components/views/ConstellationView";
import GamesView from "./components/views/GamesView";
import DuaView from "./components/views/DuaView";
import EndingView from "./components/views/EndingView";

// Audio related features
import { Volume2, VolumeX } from "lucide-react";

export default function App() {
  const [currentView, setView] = useState<AppView>('home');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneNodeRef = useRef<OscillatorNode | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);

  // RULE 9 — Dynamic link injection for Google Fonts
  useEffect(() => {
    const fontLinkRef = document.createElement("link");
    fontLinkRef.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,700;0,800;0,900;1,400&family=Barlow:wght@200;300;400;500;600;700;800;900&family=Instrument+Serif:ital,wght@0,400;1,400&display=swap";
    fontLinkRef.rel = "stylesheet";
    document.head.appendChild(fontLinkRef);

    return () => {
      document.head.removeChild(fontLinkRef);
    };
  }, []);

  // Web Audio Synth engine: handles drones and chimes natively (no external assets)
  const initAudio = () => {
    if (audioCtxRef.current) return;
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtxClass();
      audioCtxRef.current = ctx;

      // Soft ambient 60Hz drone (Sound Design Notes)
      const droneOsc = ctx.createOscillator();
      droneOsc.type = "sine";
      droneOsc.frequency.value = 60; // 60Hz drone deep calming frequency

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 120; // Cut off high frequency noise

      const droneGain = ctx.createGain();
      droneGain.gain.setValueAtTime(0.025, ctx.currentTime); // very soft gain 0.025

      droneOsc.connect(filter);
      filter.connect(droneGain);
      droneGain.connect(ctx.destination);
      droneOsc.start();

      droneNodeRef.current = droneOsc;
      droneGainRef.current = droneGain;
    } catch (err) {
      console.warn("Web Audio API is not supported in this frame environment.", err);
    }
  };

  const handleToggleSound = () => {
    if (!soundEnabled) {
      initAudio();
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      if (droneGainRef.current && audioCtxRef.current) {
        droneGainRef.current.gain.setTargetAtTime(0.025, audioCtxRef.current.currentTime, 0.5);
      }
      setSoundEnabled(true);
      playTransitionChime(440, 660); // sweet dual startup chime
    } else {
      if (droneGainRef.current && audioCtxRef.current) {
        droneGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.5);
      }
      setSoundEnabled(false);
    }
  };

  // Play micro transition frequencies sweeps
  const playTransitionChime = (fromFreq = 220, toFreq = 440) => {
    if (!soundEnabled || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(fromFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(toFreq, ctx.currentTime + 0.6);

      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.65);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.7);
    } catch (e) {
      // safe fallback
    }
  };

  // Handle page state changing with clean transitions and sound sweeps
  const handleSetView = (newView: AppView) => {
    playTransitionChime(330, 520);
    setView(newView);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PageWrapper>
      {/* GLOBAL NAVBAR STATE MANAGER */}
      <Navbar currentView={currentView} setView={handleSetView} />

      {/* RENDER ACTIVE SCREEN LAYOUTS */}
      <div className="flex-1 w-full flex items-center justify-center mt-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as any }}
            className="w-full h-full flex items-center justify-center"
          >
            {currentView === 'home' && <HomeView setView={handleSetView} />}
            {currentView === 'story' && <StoryView />}
            {currentView === 'garden' && <GardenView />}
            {currentView === 'cake' && <CakeView />}
            {currentView === 'letter' && <LetterView />}
            {currentView === 'companion' && <CompanionView />}
            {currentView === 'constellation' && <ConstellationView />}
            {currentView === 'games' && <GamesView />}
            {currentView === 'dua' && <DuaView />}
            {currentView === 'ending' && <EndingView setView={handleSetView} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* FLOATING AMBIENT MUZAK AUDIO WIDGETS TRIGGER (MUTE/UNMUTE) */}
      <div className="fixed bottom-6 right-6 z-[99]">
        <button
          onClick={handleToggleSound}
          className="w-11 h-11 rounded-full flex items-center justify-center shadow-2xl border transition-all duration-300 cursor-pointer hover:scale-[1.08]"
          style={{
            background: soundEnabled
              ? "rgba(201, 169, 110, 0.25)"
              : "rgba(255, 255, 255, 0.025)",
            borderColor: soundEnabled
              ? "rgba(201, 169, 110, 0.6)"
              : "rgba(251, 191, 36, 0.15)",
            color: "#e8c896",
            boxShadow: soundEnabled
              ? "0 0 20px rgba(201, 169, 110, 0.3)"
              : "0 4px 15px rgba(0,0,0,0.4)",
          }}
          title={soundEnabled ? "Mute Ambient Synth" : "Enable Ambient Synth"}
        >
          {soundEnabled ? <Volume2 className="w-4.5 h-4.5" /> : <VolumeX className="w-4.5 h-4.5" />}
        </button>
      </div>
    </PageWrapper>
  );
}
