import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Farm3DSceneProps {
  activeCrop?: string;
  onSelectCrop?: (crop: string) => void;
  interactive?: boolean;
}

export const Farm3DScene: React.FC<Farm3DSceneProps> = ({
  activeCrop = 'Tomato',
  onSelectCrop,
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a150f, 0.035);

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 340;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 10, 15);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x8bc34a, 0.7);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff3e0, 1.8);
    sunLight.position.set(12, 20, 10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    const pointLight = new THREE.PointLight(0x10b981, 2, 25);
    pointLight.position.set(0, 4, 0);
    scene.add(pointLight);

    // Ground: Terraced Soil Plots
    const groundGroup = new THREE.Group();
    scene.add(groundGroup);

    // Farm Base Plane
    const soilGeo = new THREE.BoxGeometry(16, 0.6, 12);
    const soilMat = new THREE.MeshStandardMaterial({
      color: 0x1f291e,
      roughness: 0.9,
      metalness: 0.1,
    });
    const ground = new THREE.Mesh(soilGeo, soilMat);
    ground.position.y = -0.3;
    ground.receiveShadow = true;
    groundGroup.add(ground);

    // Grid Crop Plots
    const plots = [
      { name: 'Tomato', color: 0xef4444, plantColor: 0x22c55e, x: -4, z: -2 },
      { name: 'Wheat', color: 0xeab308, plantColor: 0x84cc16, x: 0, z: -2 },
      { name: 'Rice', color: 0x10b981, plantColor: 0x15803d, x: 4, z: -2 },
      { name: 'Cotton', color: 0x38bdf8, plantColor: 0x4ade80, x: -2, z: 2 },
      { name: 'Maize', color: 0xf59e0b, plantColor: 0x65a30d, x: 2, z: 2 },
    ];

    const plotMeshes: { mesh: THREE.Mesh; name: string }[] = [];

    plots.forEach((p) => {
      // Plot soil bed
      const bedGeo = new THREE.BoxGeometry(3.2, 0.25, 3.2);
      const bedMat = new THREE.MeshStandardMaterial({
        color: activeCrop === p.name ? 0x2e4933 : 0x1a261a,
        roughness: 0.8,
      });
      const bed = new THREE.Mesh(bedGeo, bedMat);
      bed.position.set(p.x, 0.12, p.z);
      bed.receiveShadow = true;
      groundGroup.add(bed);
      plotMeshes.push({ mesh: bed, name: p.name });

      // Rows of crops / plants
      for (let rx = -1; rx <= 1; rx += 1) {
        for (let rz = -1; rz <= 1; rz += 1) {
          const stemGeo = new THREE.CylinderGeometry(0.04, 0.06, 0.8, 6);
          const stemMat = new THREE.MeshStandardMaterial({ color: 0x166534 });
          const stem = new THREE.Mesh(stemGeo, stemMat);
          stem.position.set(p.x + rx * 0.9, 0.45, p.z + rz * 0.9);
          stem.castShadow = true;
          groundGroup.add(stem);

          // Foliage
          const foliageGeo = new THREE.DodecahedronGeometry(0.35, 1);
          const foliageMat = new THREE.MeshStandardMaterial({
            color: p.plantColor,
            roughness: 0.6,
          });
          const foliage = new THREE.Mesh(foliageGeo, foliageMat);
          foliage.position.set(p.x + rx * 0.9, 0.85, p.z + rz * 0.9);
          foliage.castShadow = true;
          groundGroup.add(foliage);

          // Fruit / Bloom marker
          if (p.name === 'Tomato') {
            const fruitGeo = new THREE.SphereGeometry(0.12, 8, 8);
            const fruitMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.3 });
            const fruit = new THREE.Mesh(fruitGeo, fruitMat);
            fruit.position.set(p.x + rx * 0.9 + 0.15, 0.7, p.z + rz * 0.9);
            groundGroup.add(fruit);
          }
        }
      }

      // Sentinel pin/beacon for active crop
      if (activeCrop === p.name) {
        const ringGeo = new THREE.RingGeometry(1.8, 2.0, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x10b981,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.8,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = -Math.PI / 2;
        ring.position.set(p.x, 0.28, p.z);
        groundGroup.add(ring);
      }
    });

    // Atmospheric Floating Spores / Particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 18;
      positions[i + 1] = Math.random() * 6 + 0.5;
      positions[i + 2] = (Math.random() - 0.5) * 14;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x6ee7b7,
      size: 0.12,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // AI Scanner Ring Drone Hologram
    const scannerGeo = new THREE.TorusGeometry(1.6, 0.04, 16, 64);
    const scannerMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.8,
    });
    const scannerRing = new THREE.Mesh(scannerGeo, scannerMat);
    scannerRing.rotation.x = Math.PI / 2;
    scannerRing.position.set(0, 3.2, 0);
    scene.add(scannerRing);

    // Raycaster for click selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (event: MouseEvent) => {
      if (!interactive || !onSelectCrop) return;
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(plotMeshes.map((p) => p.mesh));

      if (intersects.length > 0) {
        const found = plotMeshes.find((p) => p.mesh === intersects[0].object);
        if (found) {
          onSelectCrop(found.name);
        }
      }
    };

    if (interactive) {
      renderer.domElement.addEventListener('click', handleClick);
    }

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Gentle rotation & hover
      groundGroup.rotation.y = Math.sin(elapsedTime * 0.15) * 0.1;
      scannerRing.position.y = 2.8 + Math.sin(elapsedTime * 1.5) * 0.5;
      scannerRing.rotation.z = elapsedTime * 0.8;

      const pos = particleGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        pos[i] += Math.sin(elapsedTime + i) * 0.005;
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });

    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (interactive) {
        renderer.domElement.removeEventListener('click', handleClick);
      }
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      soilGeo.dispose();
      soilMat.dispose();
    };
  }, [activeCrop, interactive, onSelectCrop]);

  return (
    <div className="relative w-full h-full min-h-[300px] overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-900 border border-emerald-950/60 shadow-2xl">
      <div ref={containerRef} className="w-full h-full cursor-pointer" />
      <div className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-emerald-500/20 text-xs text-emerald-300 font-mono flex items-center gap-2 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        Live 3D Field Sentinel • Active Plot: {activeCrop}
      </div>
      <div className="absolute bottom-3 right-3 bg-neutral-900/80 backdrop-blur-md px-3 py-1 rounded-md text-[11px] text-neutral-400 font-mono border border-neutral-800 pointer-events-none">
        Interactive 3D Simulation
      </div>
    </div>
  );
};
