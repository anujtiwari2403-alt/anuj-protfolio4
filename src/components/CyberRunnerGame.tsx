import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { sound } from "../utils/sound";

interface CyberRunnerGameProps {
  onExitGame: () => void;
}

export const CyberRunnerGame: React.FC<CyberRunnerGameProps> = ({ onExitGame }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gameState, setGameState] = useState<"title" | "playing" | "gameover">("title");
  const [stats, setStats] = useState({
    score: 0,
    shield: 100,
    crystals: 0,
    speed: 35,
    distance: 0,
  });

  const gameStateRef = useRef<"title" | "playing" | "gameover">("title");
  const playerLaneRef = useRef<number>(0); // -1: left, 0: center, 1: right

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    const mount = containerRef.current;
    if (!mount) return;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x151515, 0.015);

    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0, 4.5, 9);
    camera.lookAt(0, 1.5, -10);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    } catch {
      return;
    }

    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x151515);
    mount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xff6a00, 1.8);
    dirLight.position.set(0, 15, 10);
    scene.add(dirLight);

    // Track Group
    const trackWidth = 8;
    const trackSegmentLength = 20;
    const trackGroup = new THREE.Group();
    scene.add(trackGroup);

    const trackSegments: THREE.Mesh[] = [];
    for (let i = 0; i < 15; i++) {
      const planeGeo = new THREE.PlaneGeometry(trackWidth, trackSegmentLength);
      const planeMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x202020 : 0x181818,
        roughness: 0.8,
        metalness: 0.2,
      });
      const segment = new THREE.Mesh(planeGeo, planeMat);
      segment.rotation.x = -Math.PI / 2;
      segment.position.z = -i * trackSegmentLength;

      // Track edge rails with orange glow
      const railGeo = new THREE.BoxGeometry(0.2, 0.4, trackSegmentLength);
      const railMat = new THREE.MeshBasicMaterial({ color: 0xff6a00 });
      const leftRail = new THREE.Mesh(railGeo, railMat);
      leftRail.position.set(-trackWidth / 2, 0.2, 0);
      segment.add(leftRail);

      const rightRail = new THREE.Mesh(railGeo, railMat);
      rightRail.position.set(trackWidth / 2, 0.2, 0);
      segment.add(rightRail);

      trackGroup.add(segment);
      trackSegments.push(segment);
    }

    // Player Ship (Futuristic hovercraft)
    const playerGroup = new THREE.Group();
    const bodyGeo = new THREE.ConeGeometry(0.8, 2.2, 4);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.7,
      roughness: 0.2,
    });
    const playerMesh = new THREE.Mesh(bodyGeo, bodyMat);
    playerMesh.rotation.x = Math.PI / 2;
    playerMesh.rotation.z = Math.PI / 4;
    playerGroup.add(playerMesh);

    // Thruster light
    const thrusterLight = new THREE.PointLight(0xff6a00, 2, 8);
    thrusterLight.position.set(0, 0, 1.2);
    playerGroup.add(thrusterLight);

    playerGroup.position.set(0, 0.8, 0);
    scene.add(playerGroup);

    // Obstacles and Collectibles
    const obstacles: THREE.Mesh[] = [];
    const crystals: THREE.Mesh[] = [];

    const spawnObstacle = (zPos: number) => {
      const lane = [-2.4, 0, 2.4][Math.floor(Math.random() * 3)];
      const boxGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
      const boxMat = new THREE.MeshStandardMaterial({
        color: 0xff4444,
        emissive: 0x991111,
      });
      const obs = new THREE.Mesh(boxGeo, boxMat);
      obs.position.set(lane, 0.6, zPos);
      scene.add(obs);
      obstacles.push(obs);
    };

    const spawnCrystal = (zPos: number) => {
      const lane = [-2.4, 0, 2.4][Math.floor(Math.random() * 3)];
      const octaGeo = new THREE.OctahedronGeometry(0.6);
      const octaMat = new THREE.MeshStandardMaterial({
        color: 0xff8c38,
        emissive: 0xff6a00,
        emissiveIntensity: 0.6,
      });
      const crystal = new THREE.Mesh(octaGeo, octaMat);
      crystal.position.set(lane, 0.8, zPos);
      scene.add(crystal);
      crystals.push(crystal);
    };

    for (let i = 1; i < 15; i++) {
      if (Math.random() > 0.4) spawnObstacle(-i * 18);
      if (Math.random() > 0.3) spawnCrystal(-i * 14);
    }

    // Keyboard Controls
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStateRef.current !== "playing") return;

      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        if (playerLaneRef.current > -1) {
          playerLaneRef.current -= 1;
          sound.playClick();
        }
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        if (playerLaneRef.current < 1) {
          playerLaneRef.current += 1;
          sound.playClick();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Resize handler
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Game loop
    let animId: number;
    let clock = new THREE.Clock();
    let currentScore = 0;
    let currentShield = 100;
    let currentCrystals = 0;
    let distanceRun = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (gameStateRef.current === "playing") {
        const speed = 28 + Math.min(distanceRun * 0.02, 35);
        distanceRun += speed * delta;
        currentScore += Math.round(speed * delta * 5);

        // Smoothly interpolate player X to target lane
        const targetX = playerLaneRef.current * 2.4;
        playerGroup.position.x += (targetX - playerGroup.position.x) * 12 * delta;
        playerGroup.rotation.z = (playerGroup.position.x - targetX) * 0.15;

        // Move track segments backward
        trackSegments.forEach((seg) => {
          seg.position.z += speed * delta;
          if (seg.position.z > trackSegmentLength) {
            seg.position.z -= trackSegments.length * trackSegmentLength;
          }
        });

        // Move and test obstacles
        for (let i = obstacles.length - 1; i >= 0; i--) {
          const obs = obstacles[i];
          obs.position.z += speed * delta;
          obs.rotation.x += delta * 2;
          obs.rotation.y += delta * 2;

          // Collision check
          if (
            Math.abs(obs.position.z - playerGroup.position.z) < 1.2 &&
            Math.abs(obs.position.x - playerGroup.position.x) < 1.2
          ) {
            currentShield -= 35;
            sound.playClick();
            scene.remove(obs);
            obstacles.splice(i, 1);
            spawnObstacle(-trackSegments.length * trackSegmentLength * 0.8);

            if (currentShield <= 0) {
              setGameState("gameover");
              return;
            }
          } else if (obs.position.z > 10) {
            scene.remove(obs);
            obstacles.splice(i, 1);
            spawnObstacle(-trackSegments.length * trackSegmentLength * 0.8);
          }
        }

        // Move and test crystals
        for (let i = crystals.length - 1; i >= 0; i--) {
          const crystal = crystals[i];
          crystal.position.z += speed * delta;
          crystal.rotation.y += delta * 3;

          // Pickup check
          if (
            Math.abs(crystal.position.z - playerGroup.position.z) < 1.2 &&
            Math.abs(crystal.position.x - playerGroup.position.x) < 1.2
          ) {
            currentCrystals += 1;
            currentScore += 250;
            sound.playSuccess();
            scene.remove(crystal);
            crystals.splice(i, 1);
            spawnCrystal(-trackSegments.length * trackSegmentLength * 0.8);
          } else if (crystal.position.z > 10) {
            scene.remove(crystal);
            crystals.splice(i, 1);
            spawnCrystal(-trackSegments.length * trackSegmentLength * 0.8);
          }
        }

        setStats({
          score: currentScore,
          shield: Math.max(0, currentShield),
          crystals: currentCrystals,
          speed: Math.round(speed),
          distance: Math.round(distanceRun),
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);

      obstacles.forEach((o) => scene.remove(o));
      crystals.forEach((c) => scene.remove(c));

      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const startGame = () => {
    sound.playClick();
    setStats({ score: 0, shield: 100, crystals: 0, speed: 35, distance: 0 });
    playerLaneRef.current = 0;
    setGameState("playing");
  };

  const moveLane = (dir: -1 | 1) => {
    if (gameState !== "playing") return;
    if (dir === -1 && playerLaneRef.current > -1) {
      playerLaneRef.current -= 1;
      sound.playClick();
    } else if (dir === 1 && playerLaneRef.current < 1) {
      playerLaneRef.current += 1;
      sound.playClick();
    }
  };

  return (
    <div className="fixed inset-0 z-[150] bg-[#151515] flex flex-col font-sans select-none overflow-hidden">
      {/* 3D Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />

      {/* Top HUD */}
      <div className="relative z-10 px-4 sm:px-8 py-4 flex items-center justify-between bg-gradient-to-b from-[#151515]/90 to-transparent">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF6A00] animate-pulse" />
          <span className="font-bold text-white text-sm sm:text-base tracking-wide">
            3D Cyber Runner · DSA Harvest
          </span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 font-mono text-xs sm:text-sm">
          <div className="text-white">
            <span className="text-[#B8B8B8] text-[10px] block">SCORE</span>
            <span className="font-bold tabular-nums">{stats.score.toLocaleString()}</span>
          </div>
          <div className="text-[#FF8C38]">
            <span className="text-[#B8B8B8] text-[10px] block">SHIELD</span>
            <span className="font-bold tabular-nums">{stats.shield}%</span>
          </div>
          <div className="text-[#FF6A00]">
            <span className="text-[#B8B8B8] text-[10px] block">CRYSTALS</span>
            <span className="font-bold tabular-nums">{stats.crystals}</span>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onExitGame();
            }}
            className="px-3 py-1.5 rounded-xl bg-[#202020] hover:bg-white/10 text-white text-xs border border-white/10 transition-colors"
          >
            Exit Game
          </button>
        </div>
      </div>

      {/* Title Overlay */}
      {gameState === "title" && (
        <div className="relative z-20 flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl bg-[#202020]/95 border border-white/20 shadow-2xl text-center space-y-6 backdrop-blur-xl">
            <div className="w-14 h-14 rounded-2xl bg-[#FF6A00]/20 border border-[#FF6A00]/40 flex items-center justify-center mx-auto text-[#FF6A00]">
              <span className="material-symbols-outlined text-3xl">sports_esports</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                CYBER RUNNER 3D
              </h2>
              <p className="text-xs sm:text-sm text-[#B8B8B8]">
                Dodge runtime bugs, collect DSA knowledge crystals, and harvest algorithmic points!
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#151515] border border-white/5 text-xs text-left space-y-1.5 text-[#B8B8B8]">
              <span className="text-white font-bold block mb-1">Controls:</span>
              <p>• Left / Right Arrow keys or A / D to steer lanes.</p>
              <p>• On mobile: Use the on-screen left/right buttons below.</p>
            </div>
            <button
              onClick={startGame}
              className="w-full py-3.5 rounded-full bg-[#FF6A00] hover:bg-[#FF8C38] text-white font-bold text-sm tracking-wider transition-all shadow-[0_0_25px_rgba(255,106,0,0.4)] active:scale-95"
            >
              LAUNCH GAME
            </button>
          </div>
        </div>
      )}

      {/* Game Over Overlay */}
      {gameState === "gameover" && (
        <div className="relative z-20 flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl bg-[#202020]/95 border border-white/20 shadow-2xl text-center space-y-6 backdrop-blur-xl">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center mx-auto text-rose-400">
              <span className="material-symbols-outlined text-3xl">sentiment_dissatisfied</span>
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                SESSION CONCLUDED
              </h2>
              <p className="text-xs text-[#B8B8B8]">Shield depleted by runtime obstacles.</p>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-[#151515] border border-white/5 text-left text-xs">
              <div>
                <span className="text-[10px] text-[#B8B8B8] block">FINAL SCORE</span>
                <span className="font-bold text-lg text-white font-mono">{stats.score.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#B8B8B8] block">DISTANCE</span>
                <span className="font-bold text-lg text-[#FF8C38] font-mono">{stats.distance}m</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={startGame}
                className="w-full py-3.5 rounded-full bg-[#FF6A00] hover:bg-[#FF8C38] text-white font-bold text-xs sm:text-sm tracking-wider transition-all shadow-[0_0_20px_rgba(255,106,0,0.35)] active:scale-95"
              >
                PLAY AGAIN
              </button>
              <button
                onClick={onExitGame}
                className="w-full py-2.5 text-xs text-[#B8B8B8] hover:text-white transition-colors"
              >
                Return to Anuj's Portfolio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Touch Controls for steering */}
      {gameState === "playing" && (
        <div className="relative z-20 mt-auto p-4 flex items-center justify-between max-w-sm mx-auto w-full gap-4 sm:hidden pb-8">
          <button
            onClick={() => moveLane(-1)}
            className="flex-1 py-4 rounded-2xl bg-[#202020]/90 border border-white/20 text-white font-bold flex items-center justify-center active:scale-95 text-lg"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <button
            onClick={() => moveLane(1)}
            className="flex-1 py-4 rounded-2xl bg-[#202020]/90 border border-white/20 text-white font-bold flex items-center justify-center active:scale-95 text-lg"
          >
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      )}
    </div>
  );
};
