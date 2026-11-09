import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import {
  RotateCw,
  Play,
  Pause,
  Compass,
  Sparkles,
  Layers,
} from 'lucide-react';

interface HeroSculptureProps {
  isDarkMode: boolean;
  onOpenDocs?: () => void;
  size?: 'standard' | 'small';
}

interface TaggedNode {
  id: string;
  num: string;
  label: string;
  object: THREE.Object3D;
  screenX: number;
  screenY: number;
  visible: boolean;
  isFront: boolean;
}

// 5-word engineering philosophy
export const QUOTE_WORDS = ['Think.', 'Build.', 'Break.', 'Improve.', 'Repeat.'];

export const HeroSculpture: React.FC<HeroSculptureProps> = ({ isDarkMode, onOpenDocs, size = 'standard' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);
  const [tags, setTags] = useState<Array<{ id: string; num: string; label: string; x: number; y: number; visible: boolean; isFront: boolean }>>([]);
  const [activeQuoteIndex, setActiveQuoteIndex] = useState<number>(0);
  const [isDocsOpen, setIsDocsOpen] = useState<boolean>(false);

  // Cycle quote word on interactive moments
  const cycleQuoteWord = useCallback(() => {
    setActiveQuoteIndex((prev) => (prev + 1) % QUOTE_WORDS.length);
  }, []);

  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    mainGroup: THREE.Group;
    rings: Array<{ group: THREE.Group; speed: number; axis: 'x' | 'y' | 'z' }>;
    coreMesh: THREE.Mesh;
    coreLines: THREE.LineSegments;
    taggedNodes: Array<{ id: string; num: string; label: string; obj: THREE.Object3D }>;
    pmremGenerator: THREE.PMREMGenerator;
    materials: {
      chrome: THREE.MeshStandardMaterial;
      darkMetal: THREE.MeshStandardMaterial;
      gold: THREE.MeshStandardMaterial;
      tealGlow: THREE.MeshBasicMaterial;
      lineGlow: THREE.LineBasicMaterial;
    };
    rotX: number;
    rotY: number;
    velX: number;
    velY: number;
    isDragging: boolean;
    lastMouseX: number;
    lastMouseY: number;
    autoRotate: boolean;
    animFrameId: number;
  } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || 540;
    const height = container.clientHeight || 540;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDarkMode ? 1.45 : 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.replaceChildren(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 9.4);

    // Procedural Studio Environment for Physical Chrome & Gold Reflection
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const envScene = new THREE.Scene();
    const envBoxGeo = new THREE.BoxGeometry(20, 20, 20);
    const envBoxMat = new THREE.MeshBasicMaterial({
      color: isDarkMode ? 0x0f172a : 0xf1f5f9,
      side: THREE.BackSide,
    });
    envScene.add(new THREE.Mesh(envBoxGeo, envBoxMat));

    // Studio softbox lights for high-specular metallic reflections
    const addSoftbox = (pos: [number, number, number], color: number, intensity: number) => {
      const geo = new THREE.PlaneGeometry(6, 6);
      const mat = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...pos);
      mesh.lookAt(0, 0, 0);
      envScene.add(mesh);
    };

    addSoftbox([8, 10, 8], 0xffffff, 2.0);
    addSoftbox([-8, -6, 6], 0x38bdf8, 1.2);
    addSoftbox([0, 10, -10], 0xfde047, 1.5);

    const envTarget = pmremGenerator.fromScene(envScene);
    scene.environment = envTarget.texture;

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Materials
    const materials = {
      chrome: new THREE.MeshStandardMaterial({
        color: isDarkMode ? 0xe2e8f0 : 0xf8fafc,
        metalness: 0.98,
        roughness: 0.12,
        envMapIntensity: 2.2,
      }),
      darkMetal: new THREE.MeshStandardMaterial({
        color: 0x07090e,
        metalness: 0.95,
        roughness: 0.18,
        flatShading: true,
        envMapIntensity: 1.8,
      }),
      gold: new THREE.MeshStandardMaterial({
        color: 0xd4af37, // Champagne gold
        metalness: 0.94,
        roughness: 0.16,
        envMapIntensity: 2.2,
      }),
      tealGlow: new THREE.MeshBasicMaterial({
        color: 0x14b8a6,
        transparent: true,
        opacity: 0.9,
      }),
      lineGlow: new THREE.LineBasicMaterial({
        color: 0x2dd4bf,
        transparent: true,
        opacity: 0.85,
      }),
    };

    // 1. Central Core: Refined Compact Faceted Core with Glowing Edges (User mandate: make black core small)
    const coreGroup = new THREE.Group();
    const coreGeo = new THREE.IcosahedronGeometry(0.64, 1);
    const coreMesh = new THREE.Mesh(coreGeo, materials.darkMetal);
    const coreEdges = new THREE.EdgesGeometry(coreGeo);
    const coreLines = new THREE.LineSegments(coreEdges, materials.lineGlow);
    coreGroup.add(coreMesh);
    coreGroup.add(coreLines);

    // Glowing inner energy nucleus
    const seedGeo = new THREE.OctahedronGeometry(0.28);
    const seedMesh = new THREE.Mesh(seedGeo, materials.gold);
    coreGroup.add(seedMesh);

    mainGroup.add(coreGroup);

    // 2. PRIMARY 3D ROTATIONAL GOLDEN SPINDLE AXIS (Contained within frame)
    // User instruction: "The axis is missing, going out of the box. Make it medium. Now it is large, right? Make it small. The inside black part should be small. The axis should be somewhat good. All axes should be visible."
    const axisGroup = new THREE.Group();
    axisGroup.rotation.set(0.48, 0.32, -0.72);

    // Main Gold Axis Shaft (length 5.2 - perfectly visible and framed inside camera frustum)
    const axisShaftGeo = new THREE.CylinderGeometry(0.040, 0.040, 5.2, 32);
    const axisShaft = new THREE.Mesh(axisShaftGeo, materials.gold);
    axisGroup.add(axisShaft);

    // Precision mechanical bushings where the axis enters/exits the core
    const collarTop = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.20, 24), materials.darkMetal);
    collarTop.position.y = 0.85;
    axisGroup.add(collarTop);

    const collarBottom = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.20, 24), materials.darkMetal);
    collarBottom.position.y = -0.85;
    axisGroup.add(collarBottom);

    // Polished gold terminal end caps & glowing beacons at both extremities
    const capGeo = new THREE.CylinderGeometry(0.065, 0.045, 0.26, 24);
    const capTop = new THREE.Mesh(capGeo, materials.gold);
    capTop.position.y = 2.6;
    axisGroup.add(capTop);

    const capBottom = new THREE.Mesh(capGeo, materials.gold);
    capBottom.position.y = -2.6;
    capBottom.rotation.z = Math.PI;
    axisGroup.add(capBottom);

    // Luminous tip beacon spheres
    const tipBeaconGeo = new THREE.SphereGeometry(0.055, 16, 16);
    const tipBeaconTop = new THREE.Mesh(tipBeaconGeo, materials.tealGlow);
    tipBeaconTop.position.y = 2.74;
    axisGroup.add(tipBeaconTop);

    const tipBeaconBottom = new THREE.Mesh(tipBeaconGeo, materials.tealGlow);
    tipBeaconBottom.position.y = -2.74;
    axisGroup.add(tipBeaconBottom);

    // Vernier tick marks along the central axis rod
    const axisTickGeo = new THREE.CylinderGeometry(0.048, 0.048, 0.016, 20);
    const tickPositions = [-2.0, -1.4, -0.9, 0.9, 1.4, 2.0];
    tickPositions.forEach((pos) => {
      const tick = new THREE.Mesh(axisTickGeo, materials.chrome);
      tick.position.y = pos;
      axisGroup.add(tick);
    });

    mainGroup.add(axisGroup);

    // 3. 3-DIMENSIONAL COORDINATE AXES (X, Y, Z GIMBAL ARROWS & LABELS)
    const coordGroup = new THREE.Group();

    // +X Axis (Gold Pointer)
    const xRay = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 2.2, 16), materials.gold);
    xRay.position.x = 1.1;
    xRay.rotation.z = -Math.PI / 2;
    coordGroup.add(xRay);

    const xCone = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.22, 16), materials.gold);
    xCone.position.x = 2.25;
    xCone.rotation.z = -Math.PI / 2;
    coordGroup.add(xCone);

    // +Y Axis (Teal Pointer)
    const yRay = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 2.2, 16), materials.tealGlow);
    yRay.position.y = 1.1;
    coordGroup.add(yRay);

    const yCone = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.22, 16), materials.tealGlow);
    yCone.position.y = 2.25;
    coordGroup.add(yCone);

    // +Z Axis (Chrome Pointer)
    const zRay = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 2.2, 16), materials.chrome);
    zRay.position.z = 1.1;
    zRay.rotation.x = Math.PI / 2;
    coordGroup.add(zRay);

    const zCone = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.22, 16), materials.chrome);
    zCone.position.z = 2.25;
    zCone.rotation.x = Math.PI / 2;
    coordGroup.add(zCone);

    // Equatorial Coordinate Plane Reticle Ring
    const reticleRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.35, 0.010, 8, 96),
      materials.lineGlow
    );
    reticleRing.rotation.x = Math.PI / 2;
    coordGroup.add(reticleRing);

    mainGroup.add(coordGroup);
    const rings: Array<{ group: THREE.Group; speed: number; axis: 'x' | 'y' | 'z' }> = [];
    const taggedNodes: Array<{ id: string; num: string; label: string; obj: THREE.Object3D }> = [];

    // Helper for mechanical ring
    const addOrbitalRing = (
      radius: number,
      tubeRad: number,
      euler: THREE.Euler,
      mat: THREE.Material,
      speed: number
    ) => {
      const tilt = new THREE.Group();
      tilt.rotation.copy(euler);
      const spin = new THREE.Group();
      tilt.add(spin);

      // Main Torus
      const geo = new THREE.TorusGeometry(radius, tubeRad, 20, 160);
      const mesh = new THREE.Mesh(geo, mat);
      spin.add(mesh);

      // Inner thin bevel ring
      const bevelGeo = new THREE.TorusGeometry(radius - tubeRad * 1.5, tubeRad * 0.26, 14, 120);
      const bevel = new THREE.Mesh(bevelGeo, materials.gold);
      spin.add(bevel);

      // Vernier tick marks and hex connector blocks
      const blockGeo = new THREE.BoxGeometry(tubeRad * 3.2, tubeRad * 2.6, tubeRad * 3.4);
      const blockCount = 4;
      for (let i = 0; i < blockCount; i++) {
        const angle = (i / blockCount) * Math.PI * 2;
        const block = new THREE.Mesh(blockGeo, materials.gold);
        block.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
        block.rotation.z = angle;
        spin.add(block);
      }

      // Tick marks
      const tickGeo = new THREE.BoxGeometry(0.014, tubeRad * 1.5, 0.018);
      const tickCount = 48;
      for (let j = 0; j < tickCount; j++) {
        if (j % 6 === 0) continue;
        const ang = (j / tickCount) * Math.PI * 2;
        const tick = new THREE.Mesh(tickGeo, materials.chrome);
        tick.position.set(Math.cos(ang) * radius, Math.sin(ang) * radius, 0);
        tick.rotation.z = ang;
        spin.add(tick);
      }

      mainGroup.add(tilt);
      rings.push({ group: spin, speed, axis: 'z' });
      return spin;
    };

    // EXACT USER MANDATE: Exactly 9 skills total distributed 3-3-3 across 3 orbital axes
    // "Three axes, three, three, three, nine. Nine is good."
    // All 9 skills visible at all times!

    // Axis Ring 1 (Inner Chrome Orbit - Radius 1.60)
    const ringA = addOrbitalRing(1.60, 0.052, new THREE.Euler(0.45, 0.55, 0.2), materials.chrome, 0.0035);
    
    // Skill 1: Backend Systems
    const n1 = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.18, 0.18), materials.darkMetal);
    n1.position.set(Math.cos(0.2) * 1.60, Math.sin(0.2) * 1.60, 0);
    ringA.add(n1);
    taggedNodes.push({ id: 'tag-1', num: '01', label: 'Backend Systems', obj: n1 });

    // Skill 2: Java (DSA & LeetCode) - Correct resume terminology
    const n2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.16), materials.gold);
    n2.position.set(Math.cos(2.3) * 1.60, Math.sin(2.3) * 1.60, 0);
    ringA.add(n2);
    taggedNodes.push({ id: 'tag-2', num: '02', label: 'Java (DSA)', obj: n2 });

    // Skill 3: REST APIs
    const n3 = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.16, 20), materials.tealGlow);
    n3.position.set(Math.cos(4.4) * 1.60, Math.sin(4.4) * 1.60, 0);
    ringA.add(n3);
    taggedNodes.push({ id: 'tag-3', num: '03', label: 'REST APIs', obj: n3 });

    // Axis Ring 2 (Mid Cyan/Teal Orbit - Radius 2.20)
    const ringB = addOrbitalRing(2.20, 0.052, new THREE.Euler(-0.55, 0.85, -0.35), materials.chrome, -0.003);
    const tealLine = new THREE.Mesh(new THREE.TorusGeometry(2.20, 0.015, 12, 180), materials.tealGlow);
    ringB.add(tealLine);

    // Skill 4: Applied AI
    const n4 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.18, 0), materials.gold);
    n4.position.set(Math.cos(0.8) * 2.20, Math.sin(0.8) * 2.20, 0);
    ringB.add(n4);
    taggedNodes.push({ id: 'tag-4', num: '04', label: 'Applied AI', obj: n4 });

    // Skill 5: RAG Systems
    const n5 = new THREE.Mesh(new THREE.OctahedronGeometry(0.18), materials.tealGlow);
    n5.position.set(Math.cos(2.9) * 2.20, Math.sin(2.9) * 2.20, 0);
    ringB.add(n5);
    taggedNodes.push({ id: 'tag-5', num: '05', label: 'RAG Systems', obj: n5 });

    // Skill 6: PostgreSQL
    const n6 = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.16, 24), materials.chrome);
    n6.position.set(Math.cos(5.0) * 2.20, Math.sin(5.0) * 2.20, 0);
    ringB.add(n6);
    taggedNodes.push({ id: 'tag-6', num: '06', label: 'PostgreSQL', obj: n6 });

    // Axis Ring 3 (Outer Gold Horizon Orbit - Radius 2.80)
    const ringC = addOrbitalRing(2.80, 0.046, new THREE.Euler(1.25, -0.35, 0.45), materials.gold, 0.0025);

    // Skill 7: System Design
    const n7 = new THREE.Mesh(new THREE.SphereGeometry(0.18, 20, 20), materials.chrome);
    n7.position.set(Math.cos(1.2) * 2.80, Math.sin(1.2) * 2.80, 0);
    ringC.add(n7);
    taggedNodes.push({ id: 'tag-7', num: '07', label: 'System Design', obj: n7 });

    // Skill 8: Full-Stack (Updated from Testing & CI)
    const n8 = new THREE.Mesh(new THREE.OctahedronGeometry(0.18), materials.tealGlow);
    n8.position.set(Math.cos(3.3) * 2.80, Math.sin(3.3) * 2.80, 0);
    ringC.add(n8);
    taggedNodes.push({ id: 'tag-8', num: '08', label: 'Full-Stack', obj: n8 });

    // Skill 9: Git & GitHub - Correct resume terminology
    const n9 = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.28, 16), materials.gold);
    n9.rotation.z = Math.PI / 4;
    n9.position.set(Math.cos(5.4) * 2.80, Math.sin(5.4) * 2.80, 0);
    ringC.add(n9);
    taggedNodes.push({ id: 'tag-9', num: '09', label: 'Git & GitHub', obj: n9 });

    // 3-Point Studio Lighting
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(5, 7, 7);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(isDarkMode ? 0x38bdf8 : 0x64748b, 1.2);
    fillLight.position.set(-6, -3, 5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xfde047, 1.6);
    rimLight.position.set(3, -6, -6);
    scene.add(rimLight);

    const pointLight = new THREE.PointLight(0x14b8a6, 2.5, 12);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // Ground Contact Shadow Plate
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const sGrad = sCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
      sGrad.addColorStop(0, isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(20, 24, 32, 0.3)');
      sGrad.addColorStop(0.5, isDarkMode ? 'rgba(0, 0, 0, 0.35)' : 'rgba(20, 24, 32, 0.08)');
      sGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = sGrad;
      sCtx.fillRect(0, 0, 256, 256);
    }

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 8),
      new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })
    );
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -3.2;
    scene.add(shadowMesh);

    sceneRef.current = {
      renderer,
      scene,
      camera,
      mainGroup,
      rings,
      coreMesh,
      coreLines,
      taggedNodes,
      pmremGenerator,
      materials,
      rotX: 0.15,
      rotY: -0.35,
      velX: 0,
      velY: 0,
      isDragging: false,
      lastMouseX: 0,
      lastMouseY: 0,
      autoRotate: true,
      animFrameId: 0,
    };

    // Vector helper for project
    const projVector = new THREE.Vector3();

    const animate = () => {
      const state = sceneRef.current;
      if (!state) return;

      // Independent smooth ring rotations
      state.rings.forEach((r) => {
        r.group.rotation.z += r.speed;
      });

      // Core rotation
      state.coreMesh.rotation.y += 0.003;
      state.coreMesh.rotation.x += 0.002;
      state.coreLines.rotation.copy(state.coreMesh.rotation);

      if (!state.isDragging) {
        if (state.autoRotate) {
          state.rotY += 0.003;
        }
        state.rotY += state.velY;
        state.rotX += state.velX;

        state.velY *= 0.94;
        state.velX *= 0.94;
      }

      // Smooth unrestricted 360-degree rotation across both pitch and yaw
      state.mainGroup.rotation.y = state.rotY;
      state.mainGroup.rotation.x = state.rotX;

      state.renderer.render(state.scene, state.camera);

      // Project 3D tags onto 2D screen coordinates with generous margins to prevent clipping
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        state.scene.updateMatrixWorld();
        const projected = state.taggedNodes.map((tn) => {
          tn.obj.getWorldPosition(projVector);
          const isFront = projVector.z > -0.3;
          projVector.project(state.camera);

          const rawX = (projVector.x * 0.5 + 0.5) * w;
          const rawY = (-projVector.y * 0.5 + 0.5) * h;
          const screenX = Math.max(14, Math.min(w - 138, rawX));
          const screenY = Math.max(14, Math.min(h - 50, rawY));

          // User mandate: all 9 skills must remain visible all the same time!
          return {
            id: tn.id,
            num: tn.num,
            label: tn.label,
            x: screenX,
            y: screenY,
            visible: true,
            isFront,
          };
        });
        setTags(projected);
      }

      state.animFrameId = requestAnimationFrame(animate);
    };

    stateRun: {
      const state = sceneRef.current;
      if (!state) break stateRun;
      state.animFrameId = requestAnimationFrame(animate);
    }

    // Resize handler
    const handleResize = () => {
      if (!container || !sceneRef.current) return;
      const w = container.clientWidth || 540;
      const h = container.clientHeight || 540;
      sceneRef.current.camera.aspect = w / h;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animFrameId);
        sceneRef.current.renderer.dispose();
        sceneRef.current.pmremGenerator.dispose();
      }
      container.replaceChildren();
    };
  }, [isDarkMode]);

  // Pointer event handlers for free 360 degree drag
  const onPointerDown = (e: React.PointerEvent) => {
    const state = sceneRef.current;
    if (!state) return;
    state.isDragging = true;
    state.lastMouseX = e.clientX;
    state.lastMouseY = e.clientY;
    state.velX = 0;
    state.velY = 0;
    state.autoRotate = false;
    setIsInteracting(true);
    cycleQuoteWord();
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const state = sceneRef.current;
    if (!state || !state.isDragging) return;
    const dx = e.clientX - state.lastMouseX;
    const dy = e.clientY - state.lastMouseY;
    // Direct, ultra-responsive real-time rotation following the mouse
    state.rotY += dx * 0.009;
    state.rotX += dy * 0.009;
    state.velY = dx * 0.006;
    state.velX = dy * 0.006;
    state.lastMouseX = e.clientX;
    state.lastMouseY = e.clientY;
  };

  const onPointerUp = (e?: React.PointerEvent) => {
    const state = sceneRef.current;
    if (!state) return;
    state.isDragging = false;
    setIsInteracting(false);
    if (e && (e.currentTarget as HTMLElement).releasePointerCapture) {
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
    if (isRotating) {
      setTimeout(() => {
        if (sceneRef.current && !sceneRef.current.isDragging) {
          sceneRef.current.autoRotate = true;
        }
      }, 1200);
    }
  };

  const toggleRotate = () => {
    const state = sceneRef.current;
    if (!state) return;
    const next = !isRotating;
    setIsRotating(next);
    state.autoRotate = next;
    cycleQuoteWord();
  };

  const handleReset = () => {
    const state = sceneRef.current;
    if (!state) return;
    state.rotX = 0.15;
    state.rotY = -0.35;
    state.velX = 0;
    state.velY = 0;
    state.autoRotate = isRotating;
    cycleQuoteWord();
  };

  const handleOpenDocumentation = () => {
    if (onOpenDocs) {
      onOpenDocs();
    } else {
      setIsDocsOpen(true);
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      {/* 3D Visual Stage Container with Increased Padding to Prevent Clipping */}
      <div
        className={`relative w-full ${
          size === 'small'
            ? 'max-w-[340px] sm:max-w-[380px] h-[300px] sm:h-[340px] rounded-2xl'
            : 'aspect-square max-w-[580px] lg:max-w-[650px] rounded-3xl'
        } overflow-visible cursor-grab active:cursor-grabbing transition-transform duration-300 p-2 sm:p-4`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {/* Three.js Canvas Mount */}
        <div ref={mountRef} className="w-full h-full" />

        {/* Floating 2D HUD Tags tracked onto 3D Nodes in real-time - All 9 skills visible */}
        {tags.map((t) => {
          if (!t.visible) return null;
          return (
            <div
              key={t.id}
              className={`absolute pointer-events-none transition-all duration-75 ease-out ${
                t.isFront ? 'z-20 opacity-100 scale-100' : 'z-10 opacity-85 scale-95'
              }`}
              style={{
                transform: `translate3d(${t.x}px, ${t.y}px, 0)`,
                left: 0,
                top: 0,
              }}
            >
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-slate-300/90 dark:border-slate-700/90 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md text-slate-800 dark:text-slate-100 text-xs leading-tight">
                <span className={`w-1.5 h-1.5 rounded-full ${t.isFront ? 'bg-amber-500 animate-pulse' : 'bg-teal-500'}`} />
                <span className="font-mono text-[11px] text-amber-600 dark:text-amber-400 font-bold">{t.num}</span>
                <span className="font-sans font-semibold text-slate-800 dark:text-slate-200">{t.label}</span>
              </div>
            </div>
          );
        })}

        {!webglSupported && (
          <div className="absolute inset-0 flex items-center justify-center text-center p-6 bg-slate-900/80 rounded-2xl text-slate-300">
            <p className="font-mono text-sm">WebGL is unavailable on this device.</p>
          </div>
        )}

        {/* Interactive 3D Control Dock */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-300/80 dark:border-slate-700/80 shadow-lg shadow-black/10 text-slate-700 dark:text-slate-300 transition-all hover:border-amber-500/50">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleRotate();
            }}
            className="relative p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer group"
            title={isRotating ? 'Pause Auto-Rotation' : 'Start Auto-Rotation'}
            aria-label={isRotating ? 'Pause Auto-Rotation' : 'Start Auto-Rotation'}
          >
            {isRotating ? (
              <Pause className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
            ) : (
              <Play className="w-4 h-4 text-teal-500 group-hover:scale-110 transition-transform ml-0.5" />
            )}
            {isRotating && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            )}
          </button>

          <span className="w-px h-4 bg-slate-300 dark:bg-slate-700" />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleReset();
            }}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer group"
            title="Reset 3D Orientation"
            aria-label="Reset 3D Orientation"
          >
            <RotateCw className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 group-hover:text-amber-500 group-hover:rotate-180 transition-all duration-300" />
          </button>

          <span className="w-px h-4 bg-slate-300 dark:bg-slate-700" />

          <div
            className="p-1.5 text-slate-400 dark:text-slate-500 cursor-grab active:cursor-grabbing hover:text-teal-500 transition-colors"
            title="360° Drag & Explore"
            aria-label="360° Drag & Explore"
          >
            <Compass className="w-4 h-4 hover:rotate-45 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
