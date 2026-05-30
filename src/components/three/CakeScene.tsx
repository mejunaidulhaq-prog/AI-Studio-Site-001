/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface CakeSceneProps {
  blownStatus: boolean[];
  onBlowCandle: (index: number) => void;
}

export default function CakeScene({ blownStatus, onBlowCandle }: CakeSceneProps) {
  const cakeGroupRef = useRef<THREE.Group>(null);

  // Rotate cake slowly (RULE 5)
  useFrame(() => {
    if (cakeGroupRef.current) {
      cakeGroupRef.current.rotation.y += 0.005;
    }
  });

  // Candle angles and coordinate mapping
  const candlesConfig = [
    { angle: 0, color: "#ff9a3c" },
    { angle: (2 * Math.PI) / 3, color: "#ff9a3c" },
    { angle: (4 * Math.PI) / 3, color: "#ff9a3c" },
  ];

  return (
    <>
      <OrbitControls
        enableZoom={false}
        minPolarAngle={0.4}
        maxPolarAngle={1.4}
      />

      {/* Lighting Configuration */}
      <ambientLight intensity={0.5} color="#1a1a3e" />
      <directionalLight position={[3, 4, 2]} intensity={1.2} color="#c9a96e" />
      <pointLight position={[-2, -1, 2]} intensity={0.6} color="#880e4f" distance={6} />
      <pointLight position={[0, 3.5, 0]} intensity={0.4} color="#ff9a3c" distance={4} />

      <group ref={cakeGroupRef} position={[0, -1.2, 0]}>
        {/* Tier 1: Bottom Tier */}
        <mesh position={[0, 0.46, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.35, 1.52, 0.92, 48]} />
          <meshStandardMaterial
            color="#3d0518" // Maroon deep
            roughness={0.2}
            metalness={0.1}
          />
        </mesh>
        
        {/* Frosting Ring 1 */}
        <mesh position={[0, 0.92, 0]}>
          <torusGeometry args={[1.35, 0.07, 8, 48]} />
          <meshStandardMaterial color="#c9a96e" roughness={0.1} />
        </mesh>
        
        {/* Gold Trim 1 */}
        <mesh position={[0, 0.90, 0]}>
          <torusGeometry args={[1.33, 0.028, 6, 48]} />
          <meshStandardMaterial color="#e8c896" metalness={0.8} roughness={0.1} />
        </mesh>

        {/* Tier 2: Middle Tier */}
        <mesh position={[0, 1.35, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.98, 1.13, 0.86, 48]} />
          <meshStandardMaterial
            color="#1a2f7a" // Royal Blue mid
            roughness={0.3}
            metalness={0.05}
          />
        </mesh>

        {/* Frosting Ring 2 */}
        <mesh position={[0, 1.78, 0]}>
          <torusGeometry args={[0.98, 0.07, 8, 48]} />
          <meshStandardMaterial color="#c9a96e" roughness={0.1} />
        </mesh>

        {/* Gold Trim 2 */}
        <mesh position={[0, 1.76, 0]}>
          <torusGeometry args={[0.96, 0.028, 6, 48]} />
          <meshStandardMaterial color="#e8c896" metalness={0.8} roughness={0.1} />
        </mesh>

        {/* Tier 3: Top Tier */}
        <mesh position={[0, 2.18, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.65, 0.79, 0.8, 48]} />
          <meshStandardMaterial
            color="#6b0f2a" // Maroon mid
            roughness={0.25}
            metalness={0.1}
          />
        </mesh>

        {/* Gold Trim 3 */}
        <mesh position={[0, 2.56, 0]}>
          <torusGeometry args={[0.63, 0.028, 6, 48]} />
          <meshStandardMaterial color="#e8c896" metalness={0.9} roughness={0.05} />
        </mesh>

        {/* Decorative Icosahedron Roses (6) */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          const radius = 1.25;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          return (
            <mesh key={i} position={[x, 0.92, z]}>
              <icosahedronGeometry args={[0.11, 1]} />
              <meshStandardMaterial color="#9b1a2a" roughness={0.5} />
            </mesh>
          );
        })}

        {/* Decorative Middle Roses (4) */}
        {Array.from({ length: 4 }).map((_, i) => {
          const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
          const radius = 0.85;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          return (
            <mesh key={i} position={[x, 1.78, z]}>
              <icosahedronGeometry args={[0.09, 1]} />
              <meshStandardMaterial color="#e8c896" roughness={0.4} />
            </mesh>
          );
        })}

        {/* CANDLES */}
        {candlesConfig.map((cfg, idx) => {
          const radius = 0.40;
          const x = Math.cos(cfg.angle) * radius;
          const z = Math.sin(cfg.angle) * radius;
          const isBlown = blownStatus[idx];

          return (
            <group
              key={idx}
              position={[x, 2.58, z]}
              onClick={(e) => {
                e.stopPropagation();
                onBlowCandle(idx);
              }}
            >
              {/* Candle Stick */}
              <mesh position={[0, 0.19, 0]}>
                <cylinderGeometry args={[0.045, 0.045, 0.38, 12]} />
                <meshStandardMaterial color="#e8c896" roughness={0.4} />
              </mesh>

              {/* Flame (Visible only if NOT blown) */}
              {!isBlown && (
                <group position={[0, 0.41, 0]}>
                  {/* Outer Flame Glow */}
                  <mesh>
                    <coneGeometry args={[0.045, 0.16, 8]} />
                    <meshBasicMaterial color="#ff9a3c" />
                  </mesh>
                  {/* Inner Core */}
                  <mesh position={[0, -0.02, 0]} scale={0.6}>
                    <coneGeometry args={[0.045, 0.16, 8]} />
                    <meshBasicMaterial color="#ff6a00" />
                  </mesh>
                  {/* Local Warm Candle Light */}
                  <pointLight
                    intensity={1.5}
                    distance={2.5}
                    color="#ff9a3c"
                    castShadow
                  />
                </group>
              )}
            </group>
          );
        })}
      </group>
    </>
  );
}
