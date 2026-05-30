/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import GlassCard from "../ui/GlassCard";
import ScrollIndicator from "../ui/ScrollIndicator";
import { Sparkles, Flower2, Gift, Check, RefreshCw, Star, Heart } from "lucide-react";

export default function GamesView() {
  const [activeTab, setActiveTab] = useState<"roses" | "candles" | "puzzle" | "breath" | "bouquet">("roses");

  return (
    <div className="max-w-4xl mx-auto px-6" id="games-view-container">
      {/* HEADER SECTION */}
      <div className="text-center py-4 mb-4 select-text">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9a96e]">
          Playful Tributes
        </span>
        <h1 className="text-4xl md:text-5xl text-[#e8c896]" style={{ fontFamily: "'Instrument Serif', serif" }}>
          SANCTUARY GAMES
        </h1>
        <p className="text-zinc-500 font-light text-xs max-w-sm mx-auto mt-2 leading-relaxed">
          Five lightweight, respectful digital interactions crafted around roses, stars, candles, and peaceful breathing patterns.
        </p>
      </div>

      {/* GAME SELECTOR TABS */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 border-b border-white/5 pb-4 select-none">
        {(["roses", "candles", "puzzle", "breath", "bouquet"] as const).map((tab) => {
          const labelsMap = {
            roses: "Rose Collection 🌸",
            candles: "Candle Lighting 🕯",
            puzzle: "Constellation Puzzle ✨",
            breath: "Breathing Orb 🌬",
            bouquet: "Build a Bouquet 💐"
          };
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-full text-[11px] tracking-widest uppercase transition-all duration-300"
              style={{
                background: isActive ? "rgba(201, 169, 110, 0.15)" : "rgba(255,255,255,0.01)",
                border: isActive ? "1px solid rgba(201, 169, 110, 0.35)" : "1px solid rgba(255,255,255,0.05)",
                color: isActive ? "#e8c896" : "rgba(245, 240, 235, 0.5)",
              }}
            >
              {labelsMap[tab]}
            </button>
          );
        })}
      </div>

      {/* ACTIVE GAME WRAPER STATE */}
      <div className="min-h-[440px] flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          {activeTab === "roses" && <RoseCollectionGame key="roses-game" />}
          {activeTab === "candles" && <CandleLightingGame key="candles-game" />}
          {activeTab === "puzzle" && <ConstellationPuzzleGame key="puzzle-game" />}
          {activeTab === "breath" && <BreathingOrbGame key="breath-game" />}
          {activeTab === "bouquet" && <BuildBouquetGame key="bouquet-game" />}
        </AnimatePresence>
      </div>

      <div className="text-center mt-12 pb-6">
        <ScrollIndicator label="Float her golden duas" />
      </div>
    </div>
  );
}

// ==========================================
// GAME 1: ROSE COLLECTION
// ==========================================
function RoseCollectionGame() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [fallingItems, setFallingItems] = useState<{ id: number; x: number; size: number; speed: number }[]>([]);

  useEffect(() => {
    if (!gameStarted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    // Spawn falling roses dynamically
    const spawner = setInterval(() => {
      setFallingItems((prev) => [
        ...prev,
        {
          id: Math.random(),
          x: Math.random() * 85 + 5,
          size: Math.random() * 16 + 24,
          speed: Math.random() * 2.5 + 1.8,
        }
      ]);
    }, 750);

    return () => {
      clearInterval(timer);
      clearInterval(spawner);
    };
  }, [gameStarted, timeLeft]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setFallingItems([]);
    setGameStarted(true);
  };

  const handleCollect = (id: number) => {
    setScore((prev) => prev + 1);
    setFallingItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <GlassCard className="w-full max-w-xl text-center py-8 relative overflow-hidden h-[420px] flex flex-col justify-between">
      {!gameStarted ? (
        <div className="my-auto space-y-4">
          <Flower2 className="w-12 h-12 text-[#e8c896] mx-auto animate-pulse" />
          <h3 className="text-2xl font-serif italic text-[#e8c896]">Rose Fall Collector</h3>
          <p className="text-xs text-zinc-400 font-light max-w-sm mx-auto leading-relaxed">
            Beautiful roses representing quiet appreciation are falling from the skies. Tap as many as you can in 30 seconds!
          </p>
          <button
            onClick={startGame}
            className="px-6 py-2.5 bg-[#e8c896] text-[#090912] rounded-full text-xs tracking-widest uppercase cursor-pointer"
          >
            Start Gathering
          </button>
        </div>
      ) : timeLeft > 0 ? (
        <div className="relative flex-1 flex flex-col">
          {/* Header scores */}
          <div className="flex justify-between items-center text-xs font-mono tracking-wider border-b border-white/5 pb-2.5 mb-2">
            <span className="text-[#e8c896]">Score: {score} roses</span>
            <span className="text-red-400">Time Left: {timeLeft}s</span>
          </div>

          {/* Falling field wrapper */}
          <div className="flex-1 relative overflow-hidden bg-black/10 rounded-xl border border-white/5">
            {fallingItems.map((item) => (
              <motion.button
                key={item.id}
                initial={{ y: -40, x: `${item.x}%`, rotate: 0 }}
                animate={{ y: 340, rotate: 360 }}
                transition={{ duration: item.speed, ease: "linear" }}
                onClick={() => handleCollect(item.id)}
                className="absolute text-2xl cursor-pointer p-1"
                style={{
                  top: 0,
                  fontSize: `${item.size}px`,
                }}
              >
                🌸
              </motion.button>
            ))}
          </div>
        </div>
      ) : (
        <div className="my-auto space-y-4">
          <Check className="w-12 h-12 text-green-400 mx-auto" />
          <h3 className="text-2xl font-serif italic text-green-400">Gathering Complete!</h3>
          <p className="text-sm text-zinc-200">
            You successfully collected <strong className="text-[#e8c896] font-mono">{score}</strong> majestic roses.
          </p>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto italic font-light">
            &ldquo;Each flower gathered is an echo of her goodness drifting backwards onto those she supports.&rdquo;
          </p>
          <button
            onClick={startGame}
            className="px-5 py-2 hover:bg-white/5 transition border border-[#c9a96e]/30 text-[#e8c896] rounded-full text-xs tracking-widest uppercase cursor-pointer flex items-center gap-1.5 mx-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Re-Gather
          </button>
        </div>
      )}
    </GlassCard>
  );
}

// ==========================================
// GAME 2: CANDLE LIGHTING
// ==========================================
function CandleLightingGame() {
  const [lit, setLit] = useState<boolean[]>([false, false, false, false, false]);
  const [completed, setCompleted] = useState(false);

  const toggleCandle = (index: number) => {
    setLit((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  useEffect(() => {
    if (lit.every((l) => l === true)) {
      setCompleted(true);
    }
  }, [lit]);

  const resetGame = () => {
    setLit([false, false, false, false, false]);
    setCompleted(false);
  };

  return (
    <GlassCard className="w-full max-w-xl text-center py-8 relative overflow-hidden h-[420px] flex flex-col justify-between">
      <div className="my-auto space-y-6">
        <div>
          <h3 className="text-2xl font-serif italic text-[#e8c896] mb-1">Covenant of Fire</h3>
          <p className="text-xs text-[#c9a96e]/70 uppercase tracking-widest font-mono">
            Tap all five candles to illuminate the room
          </p>
        </div>

        {/* Row of candles */}
        <div className="flex items-end justify-center gap-6 h-32 select-none">
          {lit.map((state, idx) => (
            <div
              key={idx}
              onClick={() => toggleCandle(idx)}
              className="flex flex-col items-center cursor-pointer group scale-100 duration-300 hover:scale-[1.05]"
            >
              <div className="relative h-16 w-4 bg-[#6b0f2a] rounded-t-sm border border-[#e8c896]/30">
                {/* Lit Wick flamer indicator */}
                {state && (
                  <motion.div
                    animate={{
                      scale: [1, 1.15, 1],
                      y: [0, -2, 0],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-[-15px] inset-x-0 mx-auto w-3.5 h-6 rounded-full"
                    style={{
                      background: "radial-gradient(circle, #ff9a3c 0%, #ff6a00 100%)",
                      boxShadow: "0 0 15px #ff9a3c",
                    }}
                  />
                )}
                {/* Unlit tiny wick stick */}
                <div className="absolute top-[-4px] inset-x-0 mx-auto w-0.5 h-1 bg-zinc-800" />
              </div>
              <span className="text-[9px] font-mono text-zinc-500 mt-1.5 uppercase uppercase">Candle {idx + 1}</span>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {completed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl border border-[#c9a96e]/20 bg-[#c9a96e]/5 relative max-w-md mx-auto"
            >
              <p className="text-xs text-[#e8c896] font-light leading-relaxed">
                &ldquo;Indeed, with every difficulty, there is relief. O Allah, make Zahra Fatima's path illuminated with absolute clarity. Grant her ease, keep her close, and bless her steps from east to west. Ameen.&rdquo;
              </p>
              <button
                onClick={resetGame}
                className="mt-3 text-[10px] tracking-widest text-zinc-400 hover:text-white uppercase font-mono"
              >
                Let Them Glow Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GlassCard>
  );
}

// ==========================================
// GAME 3: CONSTELLATION PUZZLE
// ==========================================
function ConstellationPuzzleGame() {
  const [visited, setVisited] = useState<number[]>([]);
  const [puzzleComplete, setPuzzleComplete] = useState(false);

  const starNodes = [
    { label: "Patience", index: 0, x: 20, y: 30 },
    { label: "Loyalty", index: 1, x: 50, y: 15 },
    { label: "Tranquility", index: 2, x: 80, y: 30 },
    { label: "Grace", index: 3, x: 65, y: 65 },
    { label: "Sincerity", index: 4, x: 35, y: 65 },
  ];

  const handleStarClick = (idx: number) => {
    if (puzzleComplete) return;

    if (visited.includes(idx)) {
      // Clear sequence if double clicked
      setVisited([]);
      return;
    }

    const next = [...visited, idx];
    setVisited(next);

    // If connected all 5 stars, puzzle complete
    if (next.length === 5) {
      setPuzzleComplete(true);
    }
  };

  return (
    <GlassCard className="w-full max-w-xl text-center py-8 relative overflow-hidden h-[420px] flex flex-col justify-between">
      <div className="my-auto space-y-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-serif italic text-[#e8c896] mb-1">Star Link Constellation</h3>
          <p className="text-xs text-zinc-400 font-light max-w-sm mx-auto">
            {!puzzleComplete
              ? "Link all five virtues in sequence by tapping them directly to create a luminous completed constellation!"
              : "Constellation of Traits bindings is complete!"}
          </p>
        </div>

        {/* Constellation Connector stage */}
        <div className="flex-1 relative border border-white/5 rounded-xl bg-black/15 min-h-[200px] select-none mx-2 my-2">
          {/* SVG Vector paths layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {visited.map((startIdx, i) => {
              if (i === visited.length - 1) return null;
              const endIdx = visited[i + 1];
              const start = starNodes[startIdx];
              const end = starNodes[endIdx];
              return (
                <line
                  key={i}
                  x1={`${start.x}%`}
                  y1={`${start.y}%`}
                  x2={`${end.x}%`}
                  y2={`${end.y}%`}
                  stroke="#e8c896"
                  strokeWidth="1.5"
                  className="animate-pulse"
                />
              );
            })}
          </svg>

          {/* Render star dots */}
          {starNodes.map((node) => {
            const isClicked = visited.includes(node.index);
            const clickIndex = visited.indexOf(node.index) + 1;
            return (
              <button
                key={node.index}
                onClick={() => handleStarClick(node.index)}
                className="absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 cursor-pointer outline-none"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                }}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 border ${isClicked ? "bg-[#e8c896] border-[#e8c896]" : "bg-[#090912] border-[#c9a96e]/40"}`}
                  style={{
                    boxShadow: isClicked ? "0 0 15px #e8c896" : "none",
                  }}
                >
                  {isClicked ? (
                    <span className="text-[10px] font-bold text-[#090912] font-mono leading-none pt-0.5">{clickIndex}</span>
                  ) : (
                    <Star className="w-2.5 h-2.5 text-[#c9a96e]" />
                  )}
                </div>
                <span className="text-[9px] tracking-widest uppercase font-mono text-zinc-400 block mt-1">{node.label}</span>
              </button>
            );
          })}
        </div>

        <div className="h-10">
          <AnimatePresence>
            {puzzleComplete ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center gap-2"
              >
                <span className="text-xs text-green-400 font-light flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 fill-red-400 text-red-400" />
                  &ldquo;A radiant, star-bound map binds her character virtues beautifully.&rdquo;
                </span>
                <span
                  onClick={() => {
                    setVisited([]);
                    setPuzzleComplete(false);
                  }}
                  className="text-[9px] uppercase tracking-widest text-[#c9a96e] border-b border-[#c9a96e]/30 cursor-pointer ml-3 pt-0.5"
                >
                  Reset Stars
                </span>
              </motion.div>
            ) : visited.length > 0 ? (
              <span
                onClick={() => setVisited([])}
                className="text-[9px] uppercase tracking-widest text-zinc-500 cursor-pointer border-b border-white/5 pt-0.5 font-mono"
              >
                X Cancel connections ({visited.length}/5 connected)
              </span>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </GlassCard>
  );
}

// ==========================================
// GAME 4: BREATHING ORB
// ==========================================
function BreathingOrbGame() {
  const [phrase, setPhrase] = useState("Breathe in...");
  const [breatheCount, setBreatheCount] = useState(0);

  useEffect(() => {
    // A 12-second pattern (4s Breathe in, 4s Hold, 4s Breathe out)
    const interval = setInterval(() => {
      setBreatheCount((prev) => {
        const next = (prev + 1) % 3;
        const phraseMap = ["Breathe in...", "Hold...", "Breathe out..."];
        setPhrase(phraseMap[next]);
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <GlassCard className="w-full max-w-xl text-center py-10 relative overflow-hidden h-[420px] flex flex-col justify-between">
      <div className="my-auto space-y-6">
        <div>
          <h3 className="text-2xl font-serif italic text-[#e8c896] mb-1">The Breathing Sanctuary</h3>
          <p className="text-xs text-zinc-400 font-light max-w-sm mx-auto leading-relaxed">
            Take a silent, appreciative pause. Let going of the digital speed. Sync your breathing with the glowing cosmic orb below.
          </p>
        </div>

        {/* Animated breathing orb */}
        <div className="h-44 flex items-center justify-center relative select-none">
          <motion.div
            animate={{
              scale: breatheCount === 0 ? 1.45 : breatheCount === 1 ? 1.45 : 0.85,
            }}
            transition={{
              duration: 4.0,
              ease: "easeInOut",
            }}
            className="w-24 h-24 rounded-full border border-[#e8c896]/40 flex items-center justify-center relative duration-500"
            style={{
              background: "rgba(201, 169, 110, 0.04)",
              boxShadow: "0 0 30px rgba(201,169,110,0.15), inset 0 0 20px rgba(255,255,255,0.01)",
            }}
          >
            {/* Glowing radial pulse */}
            <div className="absolute inset-2 rounded-full bg-radial from-[#c9a96e]/12 to-transparent blur-md" />
            <span
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                letterSpacing: "0.12em",
              }}
              className="text-white text-base z-10 animate-fade pt-1"
            >
              {phrase}
            </span>
          </motion.div>
        </div>

        <p className="text-[10px] font-mono tracking-widest text-[#c9a96e]/75 uppercase">
          🌿 Peace be on your mind and clarity on your chest.
        </p>
      </div>
    </GlassCard>
  );
}

// ==========================================
// GAME 5: BUILD A BOUQUET
// ==========================================
function BuildBouquetGame() {
  const [addedFlowers, setAddedFlowers] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);

  const flowersList = [
    { type: "Rose", emoji: "🌹", quality: "Graceful Compassion" },
    { type: "Lavender", emoji: "🪻", quality: "Tranquil Sincerity" },
    { type: "Jasmine", emoji: "🌼", quality: "Quiet Nobility" },
    { type: "Lilac", emoji: "🪻", quality: "Gentle Patience" },
    { type: "Lily", emoji: "💮", quality: "Loyal Pureness" }
  ];

  const handleAddFlower = (type: string) => {
    if (addedFlowers.includes(type) || addedFlowers.length >= 5) return;
    setAddedFlowers((prev) => [...prev, type]);
  };

  const handleComplete = () => {
    setFinished(true);
  };

  const resetBouquet = () => {
    setAddedFlowers([]);
    setFinished(false);
  };

  return (
    <GlassCard className="w-full max-w-xl text-center py-8 relative overflow-hidden h-[420px] flex flex-col justify-between">
      {!finished ? (
        <div className="flex-1 flex flex-col justify-between gap-4">
          <div>
            <h3 className="text-2xl font-serif italic text-[#e8c896] mb-1">Handcrafted Bouquet Builder</h3>
            <p className="text-xs text-zinc-400 font-light max-w-sm mx-auto leading-relaxed">
              Tap flowers to add them into the crystal vase. Each flower added holds a specific virtue representing Zahra's values.
            </p>
          </div>

          {/* Combined Visual bouquet container and vase */}
          <div className="flex-1 relative flex flex-col items-center justify-center min-h-[140px] border border-white/5 rounded-xl bg-black/15 my-1 justify-end pb-3 select-none">
            {/* Added flowers emojis floats */}
            <div className="flex justify-center items-end gap-1 h-14 relative bottom-[-4px]">
              {addedFlowers.map((fl, idx) => {
                const item = flowersList.find(f => f.type === fl);
                return (
                  <motion.span
                    key={fl}
                    initial={{ y: 20, scale: 0, opacity: 0 }}
                    animate={{ y: 0, scale: 1.15, opacity: 1 }}
                    className="text-3xl"
                    style={{
                      transform: `rotate(${(idx - (addedFlowers.length - 1) / 2) * 12}deg)`,
                    }}
                  >
                    {item?.emoji}
                  </motion.span>
                );
              })}
            </div>

            {/* Crystal Vase design */}
            <div
              className="w-16 h-18 border-2 border-[#e8c896]/45 rounded-b-2xl rounded-t-[4px] relative bg-white/[0.03] flex items-center justify-center"
              style={{
                boxShadow: "0 4px 15px rgba(201, 169, 110, 0.15)",
              }}
            >
              <div className="w-12 h-0.5 bg-[#e8c896]/30 absolute top-2" />
              <span className="text-[10px] font-bold text-[#e8c896]/55 tracking-widest font-mono">VASE</span>
            </div>
          </div>

          {/* Flowers trigger chips row */}
          <div className="space-y-3.5">
            <div className="flex flex-wrap justify-center gap-1.5 px-2">
              {flowersList.map((f) => {
                const isSelected = addedFlowers.includes(f.type);
                return (
                  <button
                    key={f.type}
                    onClick={() => handleAddFlower(f.type)}
                    disabled={isSelected || addedFlowers.length >= 5}
                    className={`px-3 py-1.5 rounded-full text-[10px] tracking-widest uppercase transition-all duration-300 ${isSelected ? "opacity-30 line-through text-zinc-500" : "hover:bg-amber-400/5 text-zinc-300"}`}
                    style={{
                      background: "rgba(255,255,255,0.012)",
                      border: "1px solid rgba(201, 169, 110, 0.12)",
                    }}
                  >
                    {f.emoji} {f.type}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-center items-center gap-4">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#c9a96e]">
                Flowers: {addedFlowers.length}/5
              </span>
              <button
                onClick={handleComplete}
                disabled={addedFlowers.length === 0}
                className="px-5 py-2 bg-[#e8c896] text-[#090912] rounded-full text-xs tracking-widest uppercase cursor-pointer flex items-center gap-1 select-none font-medium disabled:opacity-30"
              >
                Bundle Bouquet
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="my-auto space-y-4">
          <Sparkles className="w-12 h-12 text-[#e8c896] mx-auto animate-bounce" />
          <h3 className="text-2xl font-serif italic text-[#e8c896]">Your Beautiful Bouquet is Ready!</h3>
          <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed italic">
            &ldquo;We compiled your selections: {addedFlowers.join(", ")}. Together they fuse into a magnificent array of {addedFlowers.map(f => flowersList.find(x => x.type === f)?.quality).join(", ")}. May Allah preserve your natural grace and reward your noble manners with peace always. Ameen!&rdquo;
          </p>
          <button
            onClick={resetBouquet}
            className="px-5 py-2 hover:bg-white/5 transition border border-[#c9a96e]/30 text-[#e8c896] rounded-full text-xs tracking-widest uppercase cursor-pointer flex items-center gap-1.5 mx-auto font-mono"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset flowers
          </button>
        </div>
      )}
    </GlassCard>
  );
}
