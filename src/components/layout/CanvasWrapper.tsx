/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

interface CanvasWrapperProps {
  height: number;
  children: React.ReactNode;
}

function LoaderOverlay() {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center bg-transparent backdrop-blur-sm transition-all duration-500"
      style={{
        zIndex: 5,
        background: "rgba(9, 9, 18, 0.4)",
      }}
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className="w-10 h-10 rounded-full animate-spin"
          style={{
            border: "2px dashed rgba(201, 169, 110, 0.4)",
            borderTopColor: "#e8c896",
          }}
        />
        <span
          style={{
            fontFamily: "'Barlow', sans-serif",
            letterSpacing: "0.15em",
            color: "rgba(245, 240, 235, 0.6)",
          }}
          className="text-[10px] uppercase"
        >
          Rendering Sanctuary...
        </span>
      </div>
    </div>
  );
}

export default function CanvasWrapper({ height, children }: CanvasWrapperProps) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: `${height}px`,
        overflow: "hidden",
        isolation: "isolate",
        zIndex: 1,
      }}
      className="rounded-2xl border border-white/5 bg-white/[0.015]"
    >
      <Suspense fallback={<LoaderOverlay />}>
        <Canvas
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          style={{ background: "transparent" }}
          dpr={[1, 2]}
        >
          {children}
        </Canvas>
      </Suspense>
    </div>
  );
}
