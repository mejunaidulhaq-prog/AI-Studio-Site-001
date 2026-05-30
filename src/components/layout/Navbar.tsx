/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Menu, X, Sparkles, Compass } from "lucide-react";
import { AppView } from "../../types";

interface NavbarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

export default function Navbar({ currentView, setView }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<AppView | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks: { id: AppView; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'story', label: 'Story' },
    { id: 'garden', label: 'Garden 🌸' },
    { id: 'cake', label: 'Cake 🎂' },
    { id: 'letter', label: 'Letter ✉️' },
    { id: 'companion', label: 'Soul Saunter 🕊' },
    { id: 'constellation', label: 'Constellation ✨' },
    { id: 'games', label: 'Games 🧩' },
    { id: 'dua', label: 'Dua 🤲' },
    { id: 'ending', label: 'Ending 🌅' },
  ];

  return (
    <nav
      id="global-navbar"
      className="fixed top-0 left-0 w-full transition-all duration-300 ease-in-out"
      style={{
        height: scrolled ? "64px" : "80px",
        background: scrolled
          ? "rgba(10, 10, 11, 0.95)"
          : "rgba(15, 15, 16, 0.35)",
        backdropFilter: scrolled ? "blur(24px)" : "blur(8px)",
        borderBottom: scrolled
          ? "1px solid #27272A"
          : "1px solid rgba(255, 255, 255, 0.03)",
        zIndex: 50,
      }}
    >
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        {/* Left: Logo */}
        <div
          onClick={() => {
            setView('home');
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-3 cursor-pointer group"
          id="nav-logo"
        >
          <div
            className="w-10 h-10 rounded-none flex items-center justify-center transition-all duration-300"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid #3F3F46",
            }}
          >
            <span
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                color: "#FFFFFF",
              }}
              className="text-2xl pt-0.5"
            >
              z
            </span>
          </div>
          <div className="flex flex-col">
            <span
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "0.12em",
                color: "#FFFFFF",
                fontWeight: 900,
              }}
              className="text-base leading-none pt-1"
            >
              ZAHRA FATIMA
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 leading-none mt-1">
              31 May Sanctuary
            </span>
          </div>
        </div>

        {/* Center: Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1.5" id="nav-desktop-links">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            const isHovered = hoveredLink === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setView(link.id)}
                onMouseEnter={() => setHoveredLink(link.id)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative px-3 py-1.5 text-[10px] transition-all duration-300 rounded-none uppercase font-bold"
                style={{
                  color: isActive ? "#FFFFFF" : "rgba(228, 228, 231, 0.6)",
                  fontFamily: "var(--font-display)",
                  letterSpacing: "0.1em",
                  background: isHovered
                    ? "rgba(255, 255, 255, 0.05)"
                    : "transparent",
                  border: isActive
                    ? "1px solid #71717A"
                    : "1px solid transparent",
                }}
              >
                {isActive && (
                  <span className="inline-block w-1 h-1 bg-white mr-1.5 align-middle animate-ping" />
                )}
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Right: Sound / Experience trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView('companion')}
            className="hidden md:flex items-center gap-1.5 px-4 py-2 text-[10px] uppercase font-bold rounded-none transition-all duration-300"
            style={{
              background: "#FFFFFF",
              color: "#000000",
              border: "1px solid #FFFFFF",
              letterSpacing: "0.15em",
            }}
          >
            <Compass className="w-3.5 h-3.5 text-black" />
            SOUL SAUNTER
          </button>

          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#E4E4E7] transition"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed top-0 left-0 w-full h-screen bg-[#0F0F10]/98 backdrop-blur-xl flex flex-col justify-center px-10 gap-6 z-40 transition-all duration-300"
          style={{
            zIndex: 40,
          }}
        >
          <div className="flex flex-col divide-y divide-[#27272A] gap-4">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setView(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className="py-3 text-left flex items-center justify-between transition-all"
                  style={{
                    color: isActive ? "#FFFFFF" : "rgba(228, 228, 231, 0.7)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      letterSpacing: "0.1em",
                      fontWeight: 800,
                    }}
                    className="text-xl uppercase"
                  >
                    {link.label}
                  </span>
                  {isActive && <Sparkles className="w-5 h-5 text-white animate-pulse" />}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => {
                setView('companion');
                setMobileMenuOpen(false);
              }}
              className="px-6 py-3 w-full text-center text-xs font-bold rounded-none uppercase"
              style={{
                background: "#FFFFFF",
                border: "1px solid #FFFFFF",
                color: "#000000",
                letterSpacing: "0.15em",
              }}
            >
              TALK TO SOUL SAUNTER 🕊
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
