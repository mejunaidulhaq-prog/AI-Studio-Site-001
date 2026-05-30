/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import SoulSaunterChat from "../ai/SoulSaunterChat";
import ScrollIndicator from "../ui/ScrollIndicator";

export default function CompanionView() {
  return (
    <div className="w-full" id="companion-view-container">
      {/* HEADER SECTION */}
      <div className="text-center py-4 mb-4 px-6 select-text">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9a96e]">
          Spiritual Companion Area
        </span>
        <h1 className="text-4xl md:text-5xl text-[#e8c896]" style={{ fontFamily: "'Instrument Serif', serif" }}>
          🕊 SOUL SAUNTER
        </h1>
        <p className="text-zinc-500 font-light text-xs max-w-sm mx-auto mt-2 leading-relaxed">
          A wise, gentle AI sister designed to offer sincere Quranic reminders, comfort, and protective duas to your heart.
        </p>
      </div>

      {/* CORE CHAT INTERFACE */}
      <div className="py-2">
        <SoulSaunterChat />
      </div>

      {/* FOOTER DECORATION */}
      <div className="text-center mt-12 px-6">
        <ScrollIndicator label="Elevate to the constellations" />
      </div>
    </div>
  );
}
