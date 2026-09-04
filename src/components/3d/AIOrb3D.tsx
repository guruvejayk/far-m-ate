import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { VoiceState } from '../../types';

interface AIOrb3DProps {
  state: VoiceState;
}

export const AIOrb3D: React.FC<AIOrb3DProps> = ({ state }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 160;
    const height = container.clientHeight || 160;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.appendChild(renderer.domElement);

    // Color map based on voice state
    let colorHex = 0x10b981; // idle: emerald
    if (state === 'listening') colorHex = 0x06b6d4; // cyan listening
    if (state === 'processing') colorHex = 0x8b5cf6; // purple processing
    if (state === 'thinking') colorHex = 0xf59e0b; // amber thinking
    if (state === 'speaking') colorHex = 0x10b981; // emerald speaking
    if (state === 'error') colorHex = 0xef4444; // red error

    const group = new THREE.Group();
    scene.add(group);

    // Dynamic Central Particle Sphere
    const particleCount = 200;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.1 + (Math.random() - 0.5) * 0.2;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: colorHex,
      size: 0.08,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const orbPoints = new THREE.Points(geo, mat);
    group.add(orbPoints);

    // Inner glowing sphere
    const innerGeo = new THREE.SphereGeometry(0.7, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({
      color: colorHex,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerSphere);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();
      const speed = state === 'speaking' || state === 'listening' ? 2.5 : 1.0;

      group.rotation.y = t * 0.4 * speed;
      group.rotation.x = t * 0.2 * speed;

      const pulse = state === 'speaking' ? Math.sin(t * 8) * 0.15 : Math.sin(t * 3) * 0.05;
      group.scale.set(1 + pulse, 1 + pulse, 1 + pulse);

      const pos = geo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const ox = originalPositions[i * 3];
        const oy = originalPositions[i * 3 + 1];
        const oz = originalPositions[i * 3 + 2];
        const wave = Math.sin(t * 4 + i) * (state === 'listening' ? 0.1 : 0.04);

        pos[i * 3] = ox * (1 + wave);
        pos[i * 3 + 1] = oy * (1 + wave);
        pos[i * 3 + 2] = oz * (1 + wave);
      }
      geo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [state]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div ref={containerRef} className="w-[120px] h-[120px]" />
    </div>
  );
};
