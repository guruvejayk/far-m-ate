import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { VerificationStatus } from '../../types';

interface HologramShield3DProps {
  status: VerificationStatus;
  scanning?: boolean;
}

export const HologramShield3D: React.FC<HologramShield3DProps> = ({
  status,
  scanning = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.appendChild(renderer.domElement);

    // Dynamic Color Palette based on verification status
    let primaryColorHex = 0x06b6d4; // Cyan
    if (status === 'verified') primaryColorHex = 0x10b981; // Emerald
    if (status === 'suspicious') primaryColorHex = 0xf59e0b; // Amber
    if (status === 'counterfeit') primaryColorHex = 0xef4444; // Red

    const group = new THREE.Group();
    scene.add(group);

    // Outer Gyroscope Rings
    const ringGeo1 = new THREE.TorusGeometry(2.4, 0.03, 16, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: primaryColorHex,
      transparent: true,
      opacity: 0.7,
      wireframe: true,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    group.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.0, 0.025, 16, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 3;
    group.add(ring2);

    // Central 3D Hexagonal Security Shield
    const shape = new THREE.Shape();
    const sides = 6;
    const radius = 1.3;
    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI) / sides;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();

    const extrudeSettings = { depth: 0.2, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.05, bevelThickness: 0.05 };
    const shieldGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const shieldMat = new THREE.MeshStandardMaterial({
      color: primaryColorHex,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.85,
      wireframe: scanning,
    });
    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    shieldMesh.position.z = -0.1;
    group.add(shieldMesh);

    // Internal Hologram Core
    const coreGeo = new THREE.IcosahedronGeometry(0.75, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    // Laser Scanning Plane
    const planeGeo = new THREE.PlaneGeometry(4.5, 0.08);
    const planeMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    });
    const laserBeam = new THREE.Mesh(planeGeo, planeMat);
    scene.add(laserBeam);

    // Lighting
    const pointLight = new THREE.PointLight(primaryColorHex, 3, 10);
    pointLight.position.set(0, 0, 3);
    scene.add(pointLight);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();

      ring1.rotation.x = t * 0.6;
      ring1.rotation.y = t * 0.4;
      ring2.rotation.y = -t * 0.7;
      ring2.rotation.z = t * 0.3;

      shieldMesh.rotation.y = Math.sin(t * 0.8) * 0.3;
      core.rotation.x = t;
      core.rotation.y = t * 1.2;

      // Laser scanning animation
      if (scanning) {
        laserBeam.visible = true;
        laserBeam.position.y = Math.sin(t * 3.5) * 2.2;
      } else {
        laserBeam.visible = false;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });

    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [status, scanning]);

  return (
    <div className="relative w-full h-[260px] flex items-center justify-center">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};
