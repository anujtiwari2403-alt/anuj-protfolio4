import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export const HeroCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Check WebGL support
    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = mount.clientWidth || window.innerWidth;
    let height = mount.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 0, 80);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
      mount.appendChild(renderer.domElement);
    } catch {
      setHasWebGL(false);
      return;
    }

    // 1. FLOATING PARTICLE FIELD
    const particleCount = isMobile ? 140 : 380;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const primaryOrange = new THREE.Color(0xFF6A00);
    const secondaryOrange = new THREE.Color(0xFF8C38);
    const brightWhite = new THREE.Color(0xFFFFFF);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      positions[idx] = (Math.random() - 0.5) * 170;
      positions[idx + 1] = (Math.random() - 0.5) * 120;
      positions[idx + 2] = (Math.random() - 0.5) * 95;

      const rand = Math.random();
      const col = rand > 0.55 ? primaryOrange : rand > 0.25 ? secondaryOrange : brightWhite;
      colors[idx] = col.r;
      colors[idx + 1] = col.g;
      colors[idx + 2] = col.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 1.5 : 2.0,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particleCloud = new THREE.Points(particleGeo, particleMat);
    scene.add(particleCloud);

    // 2. CELESTIAL ROTATING 3D GROUP (SPHERE & TORUS RINGS)
    const celestialGroup = new THREE.Group();
    celestialGroup.position.set(isMobile ? 0 : 28, isMobile ? -4 : 3, -10);

    // Outer Wireframe Sphere / Icosahedron
    const sphereGeo = new THREE.IcosahedronGeometry(isMobile ? 12 : 16, isMobile ? 1 : 2);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xFF6A00,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    celestialGroup.add(sphereMesh);

    // Inner Wireframe Octahedron Core
    const coreGeo = new THREE.OctahedronGeometry(isMobile ? 7 : 9, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xFF8C38,
      wireframe: true,
      transparent: true,
      opacity: 0.36,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    celestialGroup.add(coreMesh);

    // Ring 1 (Equatorial Orange Torus)
    const ringGeo1 = new THREE.TorusGeometry(isMobile ? 16 : 22, 0.45, 14, 70);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xFF6A00,
      wireframe: true,
      transparent: true,
      opacity: 0.32,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    celestialGroup.add(ringMesh1);

    // Ring 2 (Inclined Warm White Torus)
    const ringGeo2 = new THREE.TorusGeometry(isMobile ? 18 : 25, 0.35, 12, 60);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 4;
    celestialGroup.add(ringMesh2);

    // Inner Central Point Light
    const pointLight = new THREE.PointLight(0xFF6A00, 3.5, 45);
    celestialGroup.add(pointLight);

    scene.add(celestialGroup);

    // 3. DYNAMIC OSCILLATING SINE WAVE LINES
    const wavePoints1: THREE.Vector3[] = [];
    const wavePoints2: THREE.Vector3[] = [];
    for (let i = 0; i <= 60; i++) {
      const x = (i / 60 - 0.5) * 170;
      wavePoints1.push(new THREE.Vector3(x, 0, 0));
      wavePoints2.push(new THREE.Vector3(x, 0, 0));
    }

    const waveGeo1 = new THREE.BufferGeometry().setFromPoints(wavePoints1);
    const waveMat1 = new THREE.LineBasicMaterial({
      color: 0xFF6A00,
      transparent: true,
      opacity: 0.4,
    });
    const waveLine1 = new THREE.Line(waveGeo1, waveMat1);
    waveLine1.position.set(0, -18, -15);
    scene.add(waveLine1);

    const waveGeo2 = new THREE.BufferGeometry().setFromPoints(wavePoints2);
    const waveMat2 = new THREE.LineBasicMaterial({
      color: 0xFF8C38,
      transparent: true,
      opacity: 0.28,
    });
    const waveLine2 = new THREE.Line(waveGeo2, waveMat2);
    waveLine2.position.set(0, -22, -20);
    scene.add(waveLine2);

    // 4. MOUSE & TOUCH INTERACTIVE PARALLAX
    let targetMouseX = 0;
    let targetMouseY = 0;
    let smoothMouseX = 0;
    let smoothMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - window.innerWidth / 2) * 8e-4;
      targetMouseY = (e.clientY - window.innerHeight / 2) * 8e-4;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetMouseX = (e.touches[0].clientX - window.innerWidth / 2) * 6e-4;
        targetMouseY = (e.touches[0].clientY - window.innerHeight / 2) * 6e-4;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    const handleResize = () => {
      if (!mount) return;
      width = mount.clientWidth || window.innerWidth;
      height = mount.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // 5. ANIMATION LOOP
    let animId: number;
    let elapsedTime = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      smoothMouseX += (targetMouseX - smoothMouseX) * 0.06;
      smoothMouseY += (targetMouseY - smoothMouseY) * 0.06;

      const motionFactor = prefersReducedMotion ? 0.2 : 1.0;
      elapsedTime += 0.012 * motionFactor;

      // Rotate group and inner geometries
      celestialGroup.rotation.y += (0.0035 + smoothMouseX * 0.8) * motionFactor;
      celestialGroup.rotation.x += (0.002 + smoothMouseY * 0.8) * motionFactor;

      ringMesh1.rotation.z += 0.004 * motionFactor;
      ringMesh2.rotation.y -= 0.0035 * motionFactor;
      coreMesh.rotation.y -= 0.006 * motionFactor;
      coreMesh.rotation.z += 0.004 * motionFactor;

      particleCloud.rotation.y = smoothMouseX * 12 + elapsedTime * 0.05;
      particleCloud.rotation.x = -smoothMouseY * 12 + elapsedTime * 0.02;

      // Update oscillating sine wave positions
      const pos1 = waveGeo1.attributes.position;
      const pos2 = waveGeo2.attributes.position;
      for (let i = 0; i <= 60; i++) {
        const r = i / 60;
        const y1 = Math.sin(r * 8 + elapsedTime * 2 + smoothMouseX * 4) * 4.5 + Math.cos(r * 4 - elapsedTime) * 2;
        pos1.setY(i, y1);

        const y2 = Math.cos(r * 6 - elapsedTime * 1.5 - smoothMouseY * 3) * 3.5 + Math.sin(r * 3 + elapsedTime) * 1.8;
        pos2.setY(i, y2);
      }
      pos1.needsUpdate = true;
      pos2.needsUpdate = true;

      // Smooth camera tilt parallax
      camera.position.x = smoothMouseX * 35;
      camera.position.y = -smoothMouseY * 35;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);

      particleGeo.dispose();
      particleMat.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      waveGeo1.dispose();
      waveMat1.dispose();
      waveGeo2.dispose();
      waveMat2.dispose();

      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  if (!hasWebGL) {
    return (
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-50 bg-radial-gradient" aria-hidden="true">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full border border-[#FF6A00]/30 animate-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full border border-[#FF8C38]/25 animate-ping" />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-90"
      aria-hidden="true"
    />
  );
};
