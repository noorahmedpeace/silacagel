"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const createSeededValue = (index: number, offset: number) => {
  const value = Math.sin(index * 12.9898 + offset * 78.233) * 43758.5453;
  return value - Math.floor(value);
};

function Particles({ count = 5000 }) {
  const mesh = useRef<THREE.Points>(null);
  const mousePosition = useRef(new THREE.Vector3(0, 0, 0));

  const initialPositions = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (createSeededValue(i, 1) - 0.5) * 20;
      positions[i * 3 + 1] = (createSeededValue(i, 2) - 0.5) * 20;
      positions[i * 3 + 2] = (createSeededValue(i, 3) - 0.5) * 10;
    }

    return positions;
  }, [count]);

  const resetXPositions = useMemo(() => {
    return Array.from({ length: count }, (_, index) => (createSeededValue(index, 4) - 0.5) * 20);
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;

    mousePosition.current.x += (state.pointer.x * 10 - mousePosition.current.x) * 0.1;
    mousePosition.current.y += (state.pointer.y * 10 - mousePosition.current.y) * 0.1;

    const positions = mesh.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];
      const dx = mousePosition.current.x - x;
      const dy = mousePosition.current.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 4) {
        positions[i3] += dx * 0.01;
        positions[i3 + 1] += dy * 0.01;
      }

      positions[i3 + 1] += 0.02;

      if (positions[i3 + 1] > 10) {
        positions[i3 + 1] = -10;
        positions[i3] = resetXPositions[i];
      }
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y += 0.001;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[initialPositions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#8FB1CC"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export const MoisturePhysics = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "auto",
      }}
    >
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <Particles count={5000} />
      </Canvas>
    </div>
  );
};
