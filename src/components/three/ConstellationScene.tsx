/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ConstellationSceneProps {
  onSelectStar: (starId: string) => void;
  activeStarId: string | null;
}

export default function ConstellationScene({ onSelectStar, activeStarId }: ConstellationSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const starfieldRef = useRef<THREE.Points>(null);

  const [hoveredStar, setHoveredStar] = useState<string | null>(null);

  // Slow galactic coordinate breathing
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(time * 0.04) * 0.05;
      groupRef.current.rotation.y = time * 0.02;
    }
    if (starfieldRef.current) {
      starfieldRef.current.rotation.y = time * 0.005;
    }
  });

  const constellationStars = [
    { id: "Kindness", name: "Kindness", pos: [-3.5, 1.5, 0] },
    { id: "Loyalty", name: "Loyalty", pos: [-1.5, 3.0, 0] },
    { id: "Warmth", name: "Warmth", pos: [1.2, 2.8, 0] },
    { id: "Patience", name: "Patience", pos: [3.2, 1.2, 0] },
    { id: "Care", name: "Care", pos: [2.5, -1.5, 0] },
    { id: "Strength", name: "Strength", pos: [-0.5, -2.8, 0] },
    { id: "Peace", name: "Peace", pos: [-3.0, -0.8, 0] },
  ];

  // Map coordinate connections sequential lines (kindness -> loyalty -> warmth -> patience -> care -> strength -> peace -> kindness)
  const starConnections = [
    [-3.5, 1.5, 0, -1.5, 3.0, 0],
    [-1.5, 3.0, 0, 1.2, 2.8, 0],
    [1.2, 2.8, 0, 3.2, 1.2, 0],
    [3.2, 1.2, 0, 2.5, -1.5, 0],
    [2.5, -1.5, 0, -0.5, -2.8, 0],
    [-0.5, -2.8, 0, -3.0, -0.8, 0],
    [-3.0, -0.8, 0, -3.5, 1.5, 0],
  ];

  // Procedural 3D particle points positions (3000 stars)
  const starfieldPositions = useRef<Float32Array | null>(null);
  if (!starfieldPositions.current) {
    const array = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      const radius = 25 + Math.random() * 45;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      array[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      array[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      array[i * 3 + 2] = radius * Math.cos(phi);
    }
    starfieldPositions.current = array;
  }

  // Draw Line Segment Geometry
  const linePoints = useRef<THREE.BufferGeometry | null>(null);
  if (!linePoints.current) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starConnections.flat());
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    linePoints.current = geometry;
  }

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 10]} intensity={1} color="#c9a96e" />

      {/* Deep Space Background Particle Cloud (RULE 5) */}
      <points ref={starfieldRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starfieldPositions.current!, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#f5f0eb"
          transparent
          opacity={0.65}
          sizeAttenuation
        />
      </points>

      {/* Galactic Constellation Object Core */}
      <group ref={groupRef}>
        {/* Connector Neon Lines */}
        <lineSegments geometry={linePoints.current!}>
          <lineBasicMaterial
            color="#c9a96e"
            linewidth={1.5}
            transparent
            opacity={0.35}
          />
        </lineSegments>

        {/* Major Quality Stars of Zahra */}
        {constellationStars.map((star) => {
          const isSelected = activeStarId === star.id;
          const isHovered = hoveredStar === star.id;
          // Interpolate visual scale on selection / hover
          const targetScale = isSelected ? 1.6 : isHovered ? 1.35 : 1.0;

          return (
            <group
              key={star.id}
              position={star.pos as [number, number, number]}
              onClick={(e) => {
                e.stopPropagation();
                onSelectStar(star.id);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = "pointer";
                setHoveredStar(star.id);
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                document.body.style.cursor = "default";
                setHoveredStar(null);
              }}
            >
              {/* Star Core */}
              <mesh scale={[targetScale, targetScale, targetScale]}>
                <sphereGeometry args={[0.13, 16, 16]} />
                <meshStandardMaterial
                  color="#e8c896"
                  emissive="#c9a96e"
                  emissiveIntensity={isSelected || isHovered ? 2.5 : 1.0}
                />
              </mesh>

              {/* Radiant Star Corona Halo */}
              {(isHovered || isSelected) && (
                <mesh>
                  <ringGeometry args={[0.22, 0.28, 16]} />
                  <meshBasicMaterial color="#e8c896" transparent opacity={0.6} />
                </mesh>
              )}
            </group>
          );
        })}
      </group>
    </>
  );
}
