/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode, useEffect, useRef } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";

interface PageWrapperProps {
  children: ReactNode;
  canvasHeight?: number;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle Classes
    class Petal {
      x = Math.random() * width;
      y = Math.random() * height - height;
      size = Math.random() * 8 + 6;
      speedY = Math.random() * 0.8 + 0.4;
      speedX = Math.random() * 0.5 - 0.25;
      rotation = Math.random() * Math.PI * 2;
      rotationSpeed = Math.random() * 0.02 - 0.01;
      opacity = Math.random() * 0.6 + 0.3;

      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y / 30) * 0.15;
        this.rotation += this.rotationSpeed;

        if (this.y > height) {
          this.y = -20;
          this.x = Math.random() * width;
          this.opacity = Math.random() * 0.6 + 0.3;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        
        // Draw a delicate crimson rose petal
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-this.size, -this.size, -this.size * 1.5, this.size / 2, 0, this.size * 1.5);
        ctx.bezierCurveTo(this.size * 1.5, this.size / 2, this.size, -this.size, 0, 0);
        
        const gradient = ctx.createRadialGradient(0, 0, 2, 0, this.size, this.size);
        gradient.addColorStop(0, "#9b1a2a"); // Dark Crimson
        gradient.addColorStop(0.6, "#6b0f2a"); // Maroon mid
        gradient.addColorStop(1, "#3d0518"); // Maroon deep
        ctx.fillStyle = gradient;
        ctx.fill();

        // Delicate stroke
        ctx.strokeStyle = "rgba(232, 200, 150, 0.25)"; // Rose Gold accent
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.restore();
      }
    }

    class GoldDust {
      x = Math.random() * width;
      y = Math.random() * height;
      size = Math.random() * 1.8 + 0.5;
      speedY = Math.random() * 0.2 + 0.05;
      speedX = Math.random() * 0.1 - 0.05;
      opacity = Math.random() * 0.7 + 0.15;
      pulseSpeed = Math.random() * 0.02 + 0.01;
      pulseDir = 1;

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        
        // Pulse opacity
        this.opacity += this.pulseSpeed * this.pulseDir;
        if (this.opacity > 0.8) this.pulseDir = -1;
        if (this.opacity < 0.15) this.pulseDir = 1;

        if (this.y < -10) {
          this.y = height + 10;
          this.x = Math.random() * width;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        ctx.fillStyle = "#e8c896"; // Rose Gold light
        ctx.shadowBlur = this.size * 4;
        ctx.shadowColor = "#ff9a3c"; // Candle glow glow
        ctx.fill();
        ctx.restore();
      }
    }

    const numPetals = isMobile ? 12 : 28;
    const numDust = isMobile ? 25 : 65;
    const petals: Petal[] = Array.from({ length: numPetals }, () => new Petal());
    const dust: GoldDust[] = Array.from({ length: numDust }, () => new GoldDust());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Render cosmic ambient dust
      dust.forEach((d) => {
        d.update();
        d.draw();
      });

      // Render rose petals
      petals.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return (
    <div
      className="relative min-h-screen text-[#E4E4E7] select-none"
      style={{
        backgroundColor: "#0F0F10",
        background: `
          radial-gradient(ellipse at 80% 10%, #1c1c24 0%, transparent 60%),
          radial-gradient(ellipse at 15% 90%, #1f1118 0%, transparent 55%),
          #0F0F10
        `,
        overflowX: "hidden",
        isolation: "isolate",
      }}
    >
      {/* Decorative Bold Theme Dots Background Grid */}
      <div className="absolute inset-0 bold-theme-dots opacity-25 pointer-events-none" style={{ zIndex: 0 }} />

      {/* Layer 0: Atmospheric Experience Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-screen pointer-events-none"
        style={{
          zIndex: 1,
        }}
      />

      {/* Layer 2: Main Wrapper */}
      <main
        className="relative flex flex-col pt-20 pb-16 min-h-screen"
        style={{
          zIndex: 2,
        }}
        id="app-main-content"
      >
        {children}
      </main>
    </div>
  );
}
