import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RotateCw, Compass, Sparkles, Layers } from 'lucide-react';

interface BentoMetricsCube3DProps {
  isDarkMode?: boolean;
}

const CUBE_FACES = [
  { label: 'DELOITTE INTAKE', value: 'Analyst Trainee', sub: 'Technical Recruitment Passed', color: '#06b6d4', code: 'PROD-01' },
  { label: 'LEETCODE SOLVED', value: '160+ Problems', sub: 'Data Structures & Algorithms', color: '#f59e0b', code: 'DSA-02' },
  { label: 'RESEARCH & RAG', value: 'IEEE Published', sub: 'First-Author Conference Paper', color: '#8b5cf6', code: 'IEEE-03' },
  { label: 'SHIPPED SYSTEMS', value: '4 Live Products', sub: 'Full-Stack Deployed Systems', color: '#10b981', code: 'LIVE-04' },
  { label: 'ENGINEERING CGPA', value: '9.31 / 10.0', sub: 'B.Tech CSE (2022–2026)', color: '#3b82f6', code: 'MBU-05' },
  { label: 'TEST RELIABILITY', value: '>92% CI Coverage', sub: 'Deterministic Automated Gates', color: '#ec4899', code: 'GATE-06' },
];

function createLargeFaceTexture(face: (typeof CUBE_FACES)[0], isDarkMode: boolean) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Outer plate background
    ctx.fillStyle = isDarkMode ? '#080d19' : '#f8fafc';
    ctx.fillRect(0, 0, 1024, 1024);

    // Rounded metallic bezel card
    ctx.fillStyle = isDarkMode ? '#0f172a' : '#ffffff';
    if (ctx.roundRect) {
      ctx.roundRect(40, 40, 944, 944, 64);
    } else {
      ctx.rect(40, 40, 944, 944);
    }
    ctx.fill();

    // Bold Neon Accent Border
    ctx.lineWidth = 18;
    ctx.strokeStyle = face.color;
    ctx.stroke();

    // Top Header Badge Box
    ctx.fillStyle = face.color;
    if (ctx.roundRect) {
      ctx.roundRect(80, 90, 220, 60, 20);
    } else {
      ctx.rect(80, 90, 220, 60);
    }
    ctx.fill();

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 32px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(face.code, 190, 120);

    // Glowing Indicator Node
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(920, 120, 18, 0, Math.PI * 2);
    ctx.fill();

    // Label Header
    ctx.fillStyle = face.color;
    ctx.font = 'bold 46px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(face.label, 80, 240);

    // Main Value (Huge, crisp & bold)
    ctx.fillStyle = isDarkMode ? '#f8fafc' : '#0f172a';
    ctx.font = 'bold 84px system-ui, -apple-system, sans-serif';
    ctx.fillText(face.value, 80, 440);

    // Divider Line
    ctx.fillStyle = isDarkMode ? '#334155' : '#cbd5e1';
    ctx.fillRect(80, 520, 864, 8);

    // Subtitle Description
    ctx.fillStyle = isDarkMode ? '#94a3b8' : '#475569';
    ctx.font = 'normal 42px system-ui, -apple-system, sans-serif';
    ctx.fillText(face.sub, 80, 640);

    // Bottom Verified Seal Bar
    ctx.fillStyle = isDarkMode ? '#1e293b' : '#f1f5f9';
    if (ctx.roundRect) {
      ctx.roundRect(80, 780, 864, 120, 28);
    } else {
      ctx.rect(80, 780, 864, 120);
    }
    ctx.fill();

    ctx.lineWidth = 4;
    ctx.strokeStyle = isDarkMode ? '#334155' : '#e2e8f0';
    ctx.stroke();

    ctx.fillStyle = face.color;
    ctx.font = 'bold 36px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('✓ EMPIRICALLY VERIFIED ENGINEERING RECORD', 512, 850);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const BentoMetricsCube3D: React.FC<BentoMetricsCube3DProps> = ({ isDarkMode = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);

  const stateRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    cube: THREE.Mesh;
    rings: THREE.Mesh[];
    rotX: number;
    rotY: number;
    velX: number;
    velY: number;
    isDragging: boolean;
    lastX: number;
    lastY: number;
    autoRotate: boolean;
    animId: number;
  } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 640;
    const height = container.clientHeight || 560;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDarkMode ? 1.4 : 1.2;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 7.2);

    // Studio lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, isDarkMode ? 1.5 : 1.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.8);
    dirLight.position.set(8, 10, 8);
    scene.add(dirLight);

    const cyanRim = new THREE.DirectionalLight(0x38bdf8, 2.2);
    cyanRim.position.set(-8, -6, -4);
    scene.add(cyanRim);

    const amberFill = new THREE.DirectionalLight(0xf59e0b, 1.4);
    amberFill.position.set(0, -5, 6);
    scene.add(amberFill);

    // Create 6 large texture faces
    const materials = CUBE_FACES.map((face) => {
      const tex = createLargeFaceTexture(face, isDarkMode);
      return new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.18,
        metalness: 0.85,
        envMapIntensity: 1.8,
      });
    });

    // Enlarge the cube geometry to 3.4 size so it is bold and prominent
    const cubeGeo = new THREE.BoxGeometry(3.4, 3.4, 3.4);
    const cube = new THREE.Mesh(cubeGeo, materials);
    scene.add(cube);

    // Glowing edge cage
    const wireGeo = new THREE.EdgesGeometry(cubeGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.85,
    });
    const wireframe = new THREE.LineSegments(wireGeo, wireMat);
    cube.add(wireframe);

    // Dual concentric orbital gyroscope rings
    const ring1Geo = new THREE.TorusGeometry(3.3, 0.035, 16, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.65 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(3.6, 0.035, 16, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.55 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.z = Math.PI / 6;
    scene.add(ring2);

    stateRef.current = {
      renderer,
      scene,
      camera,
      cube,
      rings: [ring1, ring2],
      rotX: 0.35,
      rotY: 0.5,
      velX: 0,
      velY: 0,
      isDragging: false,
      lastX: 0,
      lastY: 0,
      autoRotate: true,
      animId: 0,
    };

    const animate = () => {
      const state = stateRef.current;
      if (!state) return;

      if (!state.isDragging) {
        state.rotY += state.velX;
        state.rotX += state.velY;
        state.velX *= 0.93;
        state.velY *= 0.93;

        if (state.autoRotate) {
          state.rotY += 0.005;
          state.rotX += 0.0025;
        }
      }

      state.rotX = Math.max(-0.9, Math.min(0.9, state.rotX));
      state.cube.rotation.x = state.rotX;
      state.cube.rotation.y = state.rotY;

      ring1.rotation.z += 0.006;
      ring1.rotation.x += 0.003;
      ring2.rotation.y += 0.004;
      ring2.rotation.z -= 0.005;

      state.renderer.render(state.scene, state.camera);
      state.animId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container || !stateRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      stateRef.current.camera.aspect = w / h;
      stateRef.current.camera.updateProjectionMatrix();
      stateRef.current.renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (stateRef.current) {
        cancelAnimationFrame(stateRef.current.animId);
        stateRef.current.renderer.dispose();
      }
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isDarkMode]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!stateRef.current) return;
    stateRef.current.isDragging = true;
    stateRef.current.lastX = e.clientX;
    stateRef.current.lastY = e.clientY;
    stateRef.current.velX = 0;
    stateRef.current.velY = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const state = stateRef.current;
    if (!state || !state.isDragging) return;
    const dx = e.clientX - state.lastX;
    const dy = e.clientY - state.lastY;
    state.velX = dx * 0.008;
    state.velY = dy * 0.008;
    state.rotY += state.velX;
    state.rotX += state.velY;
    state.lastX = e.clientX;
    state.lastY = e.clientY;
  };

  const handlePointerUp = () => {
    if (!stateRef.current) return;
    stateRef.current.isDragging = false;
  };

  const resetOrientation = useCallback(() => {
    if (!stateRef.current) return;
    stateRef.current.rotX = 0.35;
    stateRef.current.rotY = 0.5;
    stateRef.current.velX = 0;
    stateRef.current.velY = 0;
  }, []);

  const toggleRotate = useCallback(() => {
    if (!stateRef.current) return;
    const next = !isRotating;
    setIsRotating(next);
    stateRef.current.autoRotate = next;
  }, [isRotating]);

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="relative w-full h-[480px] sm:h-[540px] lg:h-[620px] rounded-3xl bg-gradient-to-b from-[#090e1a] via-[#050811] to-[#090e1a] border border-slate-700/80 shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center select-none"
      title="Interactive 3D Bento Metrics Cube — Drag to rotate 360°"
    >
      <div ref={mountRef} className="w-full h-full" />

      {/* Futuristic Floating Header */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md font-mono text-[11px] text-slate-200 shadow-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>3D BENTO METRICS CUBE</span>
        </span>
        <span className="hidden sm:inline-block px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md font-mono text-[10px] text-slate-400">
          6 VERIFIED FACES ACTIVE
        </span>
      </div>

      {/* Floating Action Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-full border border-slate-700/80 shadow-lg">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleRotate();
          }}
          className="p-1.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
          title={isRotating ? 'Pause rotation' : 'Resume rotation'}
          aria-label={isRotating ? 'Pause rotation' : 'Resume rotation'}
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
        </button>
        <span className="w-px h-3.5 bg-slate-700" />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            resetOrientation();
          }}
          className="p-1.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
          title="Reset cube orientation"
          aria-label="Reset cube orientation"
        >
          <RotateCw className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Floating Instruction Pill */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700/80 font-mono text-[11px] text-slate-300 shadow-xl pointer-events-none whitespace-nowrap">
        <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
        <span>360° Drag & Explore Verified Milestones</span>
      </div>
    </div>
  );
};
