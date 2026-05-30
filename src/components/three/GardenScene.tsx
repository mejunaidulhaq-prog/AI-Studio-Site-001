/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GardenSceneProps {
  onSelectRose: (messageIndex: number) => void;
}

export default function GardenScene({ onSelectRose }: GardenSceneProps) {
  const gardenGroupRef = useRef<THREE.Group>(null);
  const butterfliesRef = useRef<THREE.Group>(null);
  const firefliesRef = useRef<THREE.Group>(null);

  // Slow ocean rotation of the garden
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (gardenGroupRef.current) {
      gardenGroupRef.current.rotation.y = Math.sin(time * 0.1) * 0.08;
    }

    // Orbit butterflies around the center features
    if (butterfliesRef.current) {
      butterfliesRef.current.children.forEach((b, idx) => {
        const radius = 2.5 + idx * 0.4;
        const speed = 0.8 + idx * 0.15;
        const angle = time * speed + idx * Math.PI * 0.5;
        b.position.x = Math.cos(angle) * radius;
        b.position.z = Math.sin(angle) * radius;
        b.position.y = 0.5 + Math.sin(time * 2 + idx) * 0.3;
      });
    }

    // Wander fireflies within bounding range
    if (firefliesRef.current) {
      firefliesRef.current.children.forEach((f, idx) => {
        f.position.y = 0.3 + Math.sin(time * 1.5 + idx) * 0.4;
        f.position.x += Math.sin(time * 0.5 + idx) * 0.005;
        f.position.z += Math.cos(time * 0.5 + idx) * 0.005;
      });
    }
  });

  // Unique Rose definitions with explicit coordinates
  const roseCoordinates = [
    { pos: [0, -0.3, 0], scale: 1.1, index: 0, title: "Center Miracle" },
    { pos: [-1.8, -0.4, -0.8], scale: 0.9, index: 1, title: "Kindness Rose" },
    { pos: [-2.2, -0.4, 0.4], scale: 0.8, index: 2, title: "Loyalty Rose" },
    { pos: [1.9, -0.4, -0.9], scale: 0.9, index: 3, title: "Patience Rose" },
    { pos: [2.3, -0.4, 0.5], scale: 0.85, index: 4, title: "Strength Rose" },
    { pos: [-1.1, -0.45, 1.2], scale: 0.75, index: 5, title: "Peace Rose" },
    { pos: [1.2, -0.45, 1.3], scale: 0.75, index: 6, title: "Grace Rose" }
  ];

  return (
    <>
      {/* Fog effect inside R3F */}
      <color attach="background" args={["#090912"]} />
      <fogExp2 attach="fog" color="#090912" density={0.07} />

      {/* Atmospheric Lights */}
      <ambientLight intensity={0.4} color="#1a0a2e" />
      <directionalLight position={[5, 8, 3]} intensity={1.2} color="#c8c0f0" castShadow />
      <directionalLight position={[-4, 2, -2]} intensity={0.5} color="#6b0f2a" />
      
      {/* Point Lights casting beautiful, warm radial hues */}
      <pointLight position={[0, 0.8, 0]} intensity={1.5} color="#ff9a3c" distance={6} />
      <pointLight position={[-2, 0.5, 1]} intensity={0.8} color="#c9a96e" distance={5} />
      <pointLight position={[2, 0.5, -1]} intensity={0.8} color="#9b1a2a" distance={5} />

      <group ref={gardenGroupRef}>
        {/* Floor Bed */}
        <mesh position={[0, -0.8, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[25, 25]} />
          <meshStandardMaterial
            color="#090912"
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>

        {/* Delicate procedural Rose meshes inside group */}
        {roseCoordinates.map((rose, i) => (
          <group
            key={i}
            position={rose.pos as [number, number, number]}
            scale={[rose.scale, rose.scale, rose.scale]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectRose(rose.index);
            }}
          >
            {/* Stem */}
            <mesh position={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.018, 0.022, 0.8, 8]} />
              <meshStandardMaterial color="#1f3d1f" roughness={0.8} />
            </mesh>

            {/* Leaves */}
            <mesh position={[-0.08, 0.45, 0]} rotation={[0, 0, 0.5]}>
              <coneGeometry args={[0.05, 0.15, 3]} />
              <meshStandardMaterial color="#2d5c2d" />
            </mesh>
            <mesh position={[0.08, 0.35, 0]} rotation={[0, 0, -0.5]}>
              <coneGeometry args={[0.05, 0.15, 3]} />
              <meshStandardMaterial color="#2d5c2d" />
            </mesh>

            {/* Glowing Bloom Inner Core */}
            <mesh position={[0, 0.82, 0]}>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial
                color="#c9a96e"
                emissive="#6b0f2a"
                emissiveIntensity={1.2}
                roughness={0.3}
              />
            </mesh>
            
            {/* Flowing Outer Petals */}
            {Array.from({ length: 5 }).map((_, petalIdx) => (
              <mesh
                key={petalIdx}
                position={[
                  Math.sin((petalIdx / 5) * Math.PI * 2) * 0.06,
                  0.83,
                  Math.cos((petalIdx / 5) * Math.PI * 2) * 0.06,
                ]}
                rotation={[0.3, (petalIdx / 5) * Math.PI * 2, 0.2]}
              >
                <coneGeometry args={[0.1, 0.16, 4]} />
                <meshStandardMaterial
                  color={i === 0 ? "#e8c896" : "#9b1a2a"}
                  roughness={0.4}
                />
              </mesh>
            ))}

            {/* Selection indicator ring on mouse hover / highlight */}
            <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.22, 0.25, 16]} />
              <meshBasicMaterial color="#e8c896" opacity={0.3} transparent />
            </mesh>
          </group>
        ))}

        {/* ORBITING BUTTERFLIES (4) */}
        <group ref={butterfliesRef}>
          {Array.from({ length: 4 }).map((_, i) => (
            <group key={i} position={[0, 0.5, 0]}>
              {/* Left Wing */}
              <mesh position={[-0.07, 0, 0]} rotation={[0, 0.5, -0.3]}>
                <boxGeometry args={[0.12, 0.01, 0.15]} />
                <meshBasicMaterial color="#e8c896" />
              </mesh>
              {/* Right Wing */}
              <mesh position={[0.07, 0, 0]} rotation={[0, -0.5, 0.3]}>
                <boxGeometry args={[0.12, 0.01, 0.15]} />
                <meshBasicMaterial color="#e8c896" />
              </mesh>
              {/* Body */}
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.01, 0.01, 0.12, 8]} />
                <meshBasicMaterial color="#1a2f7a" />
              </mesh>
            </group>
          ))}
        </group>

        {/* FIREFLIES GLOWS (12) */}
        <group ref={firefliesRef}>
          {Array.from({ length: 12 }).map((_, i) => {
            const x = (Math.random() - 0.5) * 6;
            const z = (Math.random() - 0.5) * 6;
            return (
              <mesh key={i} position={[x, 0.2, z]}>
                <sphereGeometry args={[0.024, 8, 8]} />
                <meshBasicMaterial color="#ff9a3c" />
              </mesh>
            );
          })}
        </group>
      </group>
    </>
  );
}
