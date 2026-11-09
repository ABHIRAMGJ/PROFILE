import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RotateCw, Laptop, Smartphone } from 'lucide-react';

interface DeviceShowcase3DProps {
  projectName: string;
  projectTag: string;
  isDarkMode?: boolean;
}

function createScreenTexture(projectName: string, projectTag: string, isDarkMode: boolean) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Window Frame / Desktop Wallpaper
    const grad = ctx.createLinearGradient(0, 0, 1024, 640);
    grad.addColorStop(0, '#0a0f1d');
    grad.addColorStop(0.5, '#111827');
    grad.addColorStop(1, '#030712');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 640);

    // Browser / Application Header Bar
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 0, 1024, 56);

    // Window controls
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(32, 28, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(60, 28, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(88, 28, 8, 0, Math.PI * 2);
    ctx.fill();

    // URL address pill
    ctx.fillStyle = '#0f172a';
    if (ctx.roundRect) {
      ctx.roundRect(140, 12, 744, 32, 8);
    } else {
      ctx.rect(140, 12, 744, 32);
    }
    ctx.fill();

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`https://${projectName.toLowerCase().replace(/\s+/g, '')}.jaswanth-abhiram.dev`, 512, 33);

    // Main App Content Dashboard Mockup
    ctx.fillStyle = '#06b6d4';
    ctx.font = 'bold 38px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(projectName.toUpperCase(), 64, 130);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '22px system-ui, -apple-system, sans-serif';
    ctx.fillText(projectTag, 64, 170);

    // Grid Cards
    for (let c = 0; c < 3; c++) {
      ctx.fillStyle = '#1e293b';
      if (ctx.roundRect) {
        ctx.roundRect(64 + c * 304, 210, 284, 180, 16);
      } else {
        ctx.rect(64 + c * 304, 210, 284, 180);
      }
      ctx.fill();

      ctx.lineWidth = 2;
      ctx.strokeStyle = c === 0 ? '#06b6d4' : c === 1 ? '#38bdf8' : '#f59e0b';
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 16px monospace';
      ctx.fillText(`TELEMETRY MODULE 0${c + 1}`, 84 + c * 304, 245);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 32px monospace';
      ctx.fillText(c === 0 ? '99.9% P95' : c === 1 ? '0-PII SEC' : '60 FPS', 84 + c * 304, 300);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px system-ui';
      ctx.fillText(c === 0 ? 'Sub-50ms query budget' : c === 1 ? 'Sanitized vectors' : 'Zero frame jank', 84 + c * 304, 345);
    }

    // Bottom Terminal Stream
    ctx.fillStyle = '#020617';
    if (ctx.roundRect) {
      ctx.roundRect(64, 420, 896, 170, 12);
    } else {
      ctx.rect(64, 420, 896, 170);
    }
    ctx.fill();

    ctx.fillStyle = '#22c55e';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('LIVE PRODUCTION PROOF — ALL HEALTH SYSTEMS OPERATIONAL', 88, 455);

    ctx.fillStyle = '#38bdf8';
    ctx.font = '14px monospace';
    ctx.fillText('> [200 OK] Handshake authenticated via JWT Bearer tokens', 88, 490);
    ctx.fillText('> [200 OK] Database pgvector cosine index warm-up completed in 4.2ms', 88, 520);
    ctx.fillText('> [SUCCESS] Real-time telemetry connected to production cluster', 88, 550);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const DeviceShowcase3D: React.FC<DeviceShowcase3DProps> = ({
  projectName,
  projectTag,
  isDarkMode = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [deviceMode, setDeviceMode] = useState<'laptop' | 'mobile'>('laptop');

  const stateRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    deviceGroup: THREE.Group;
    laptopMeshGroup: THREE.Group;
    mobileMeshGroup: THREE.Group;
    rotX: number;
    rotY: number;
    velX: number;
    velY: number;
    isDragging: boolean;
    lastX: number;
    lastY: number;
    animId: number;
  } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 360;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 6.2);

    // Studio lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
    rimLight.position.set(-6, -2, -3);
    scene.add(rimLight);

    const deviceGroup = new THREE.Group();
    scene.add(deviceGroup);

    // 1. LAPBOOK CHASSIS
    const laptopMeshGroup = new THREE.Group();
    deviceGroup.add(laptopMeshGroup);

    const metallicMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.92,
      roughness: 0.18,
    });

    // Base body
    const baseGeo = new THREE.BoxGeometry(4.2, 0.12, 2.8);
    const baseMesh = new THREE.Mesh(baseGeo, metallicMat);
    baseMesh.position.y = -0.06;
    laptopMeshGroup.add(baseMesh);

    // Trackpad
    const padGeo = new THREE.PlaneGeometry(1.2, 0.8);
    const padMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.3 });
    const padMesh = new THREE.Mesh(padGeo, padMat);
    padMesh.rotation.x = -Math.PI / 2;
    padMesh.position.set(0, 0.005, 0.7);
    laptopMeshGroup.add(padMesh);

    // Keyboard well
    const keyGeo = new THREE.PlaneGeometry(3.6, 1.3);
    const keyMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });
    const keyMesh = new THREE.Mesh(keyGeo, keyMat);
    keyMesh.rotation.x = -Math.PI / 2;
    keyMesh.position.set(0, 0.005, -0.45);
    laptopMeshGroup.add(keyMesh);

    // Screen Lid (hinged at z = -1.4)
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0, -1.4);
    lidGroup.rotation.x = Math.PI / 8; // Tilted open lid
    laptopMeshGroup.add(lidGroup);

    // Screen Back
    const lidGeo = new THREE.BoxGeometry(4.2, 2.6, 0.08);
    const lidMesh = new THREE.Mesh(lidGeo, metallicMat);
    lidMesh.position.set(0, 1.3, 0);
    lidGroup.add(lidMesh);

    // Screen Face (displaying project)
    const screenGeo = new THREE.PlaneGeometry(3.9, 2.35);
    const screenTex = createScreenTexture(projectName, projectTag, isDarkMode);
    const screenMat = new THREE.MeshBasicMaterial({ map: screenTex });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 1.3, 0.045);
    lidGroup.add(screenMesh);

    // 2. MOBILE PHONE CHASSIS
    const mobileMeshGroup = new THREE.Group();
    mobileMeshGroup.visible = false;
    deviceGroup.add(mobileMeshGroup);

    const phoneBodyGeo = new THREE.BoxGeometry(1.8, 3.6, 0.14);
    const phoneMesh = new THREE.Mesh(phoneBodyGeo, metallicMat);
    mobileMeshGroup.add(phoneMesh);

    const phoneScreenGeo = new THREE.PlaneGeometry(1.68, 3.42);
    const phoneScreenMat = new THREE.MeshBasicMaterial({ map: screenTex });
    const phoneScreenMesh = new THREE.Mesh(phoneScreenGeo, phoneScreenMat);
    phoneScreenMesh.position.z = 0.075;
    mobileMeshGroup.add(phoneScreenMesh);

    stateRef.current = {
      renderer,
      scene,
      camera,
      deviceGroup,
      laptopMeshGroup,
      mobileMeshGroup,
      rotX: 0.25,
      rotY: -0.35,
      velX: 0,
      velY: 0,
      isDragging: false,
      lastX: 0,
      lastY: 0,
      animId: 0,
    };

    const animate = () => {
      const state = stateRef.current;
      if (!state) return;

      if (!state.isDragging) {
        state.rotY += state.velY;
        state.rotX += state.velX;
        state.velY *= 0.92;
        state.velX *= 0.92;
        // Subtle floating idle oscillation
        state.rotY += 0.003;
      }

      state.rotX = Math.max(-0.6, Math.min(0.6, state.rotX));
      state.deviceGroup.rotation.x = state.rotX;
      state.deviceGroup.rotation.y = state.rotY;

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
  }, [projectName, projectTag, isDarkMode]);

  // Mode Switch
  useEffect(() => {
    if (!stateRef.current) return;
    const { laptopMeshGroup, mobileMeshGroup } = stateRef.current;
    if (deviceMode === 'laptop') {
      laptopMeshGroup.visible = true;
      mobileMeshGroup.visible = false;
    } else {
      laptopMeshGroup.visible = false;
      mobileMeshGroup.visible = true;
    }
  }, [deviceMode]);

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
    state.velY = dx * 0.007;
    state.velX = dy * 0.007;
    state.rotY += state.velY;
    state.rotX += state.velX;
    state.lastX = e.clientX;
    state.lastY = e.clientY;
  };

  const handlePointerUp = () => {
    if (!stateRef.current) return;
    stateRef.current.isDragging = false;
  };

  const resetOrientation = useCallback(() => {
    if (!stateRef.current) return;
    stateRef.current.rotX = 0.25;
    stateRef.current.rotY = -0.35;
    stateRef.current.velX = 0;
    stateRef.current.velY = 0;
  }, []);

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="relative w-full h-[300px] sm:h-[350px] rounded-2xl bg-[#090d16] border border-slate-700/80 shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center select-none"
      title="Interactive 3D Device Showcase — Drag to rotate 360°"
    >
      <div ref={mountRef} className="w-full h-full" />

      {/* Device Mode Switcher */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1 p-1 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700/70 text-xs font-mono">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setDeviceMode('laptop');
          }}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
            deviceMode === 'laptop' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Laptop className="w-3.5 h-3.5" />
          <span>MacBook</span>
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setDeviceMode('mobile');
          }}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
            deviceMode === 'mobile' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Mobile</span>
        </button>
      </div>

      {/* Reset button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          resetOrientation();
        }}
        className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-amber-400 transition-colors border border-slate-700/70 cursor-pointer"
        title="Reset 3D device orientation"
        aria-label="Reset 3D device orientation"
      >
        <RotateCw className="w-3.5 h-3.5" />
      </button>

      {/* Drag instruction */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-slate-700/70 font-mono text-[10px] text-slate-400 pointer-events-none">
        360° Interactive Hardware Inspection
      </div>
    </div>
  );
};
