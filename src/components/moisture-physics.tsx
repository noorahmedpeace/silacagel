"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Particles({ count = 5000 }) {
  const mesh = useRef<THREE.Points>(null);
  const mousePosition = useRef(new THREE.Vector3(0, 0, 0));

  // Generate random initial positions for the moisture particles
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 20; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    
    // Smoothly track mouse position for the "gravity" effect
    mousePosition.current.x += ((state.pointer.x * 10) - mousePosition.current.x) * 0.1;
    mousePosition.current.y += ((state.pointer.y * 10) - mousePosition.current.y) * 0.1;

    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    
    // Slow drift & gravity attraction
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];

      // Distance from mouse gravity point
      const dx = mousePosition.current.x - x;
      const dy = mousePosition.current.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // If particle is close, slightly pull it toward the mouse (Simulating moisture draw)
      if (dist < 4) {
        positions[i3] += dx * 0.01;
        positions[i3 + 1] += dy * 0.01;
      }

      // Natural upward drift
      positions[i3 + 1] += 0.02;

      // Reset particle if it drifts too high
      if (positions[i3 + 1] > 10) {
        positions[i3 + 1] = -10;
        positions[i3] = (Math.random() - 0.5) * 20;
      }
    }
    
    mesh.current.geometry.attributes.position.needsUpdate = true;
    // Slow global rotation
    mesh.current.rotation.y += 0.001;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#8FB1CC"
        transparent={true}
        opacity={0.6}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export const MoisturePhysics = () => {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "auto" }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <Particles count={5000} />
      </Canvas>
    </div>
  );
};
