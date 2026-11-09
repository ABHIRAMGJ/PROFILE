import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RotateCw, Play, Pause, Compass, Eye, Sparkles, Layers } from 'lucide-react';

interface SDLC3DStepsStageProps {
  activeIndex: number;
  onHoverIndex: (index: number) => void;
  onSelectIndex: (index: number) => void;
  isDarkMode?: boolean;
}

export const SDLC_SIX_PHASES = [
  { id: 'requirement', num: '01', name: 'Requirement gathering', shortName: 'Requirement gathering', color: '#06b6d4', glowHex: 0x06b6d4 },
  { id: 'planning', num: '02', name: 'Planning', shortName: 'Planning', color: '#f59e0b', glowHex: 0xf59e0b },
  { id: 'design', num: '03', name: 'Designing', shortName: 'Designing', color: '#a855f7', glowHex: 0xa855f7 },
  { id: 'development', num: '04', name: 'Development', shortName: 'Development', color: '#3b82f6', glowHex: 0x3b82f6 },
  { id: 'testing', num: '05', name: 'Testing', shortName: 'Testing', color: '#10b981', glowHex: 0x10b981 },
  { id: 'deployment', num: '06', name: 'Deployment', shortName: 'Deployment', color: '#ec4899', glowHex: 0xec4899 },
];

/**
 * Creates ultra-crisp procedural canvas texture for the front plaque on each block
 */
function createBlockPlaqueTexture(stepNum: string, name: string, color: string, isActive: boolean) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 190;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Background gradient with glass effect
    const grad = ctx.createLinearGradient(0, 0, 512, 190);
    if (isActive) {
      grad.addColorStop(0, 'rgba(15, 23, 42, 0.98)');
      grad.addColorStop(1, 'rgba(30, 41, 59, 0.96)');
    } else {
      grad.addColorStop(0, 'rgba(10, 15, 28, 0.92)');
      grad.addColorStop(1, 'rgba(15, 23, 42, 0.88)');
    }
    ctx.fillStyle = grad;

    if (ctx.roundRect) {
      ctx.roundRect(8, 8, 496, 174, 22);
    } else {
      ctx.rect(8, 8, 496, 174);
    }
    ctx.fill();

    // Border with neon accent
    ctx.lineWidth = isActive ? 8 : 4;
    ctx.strokeStyle = isActive ? '#ffffff' : color;
    ctx.stroke();

    // Subtle inner grid line for high-tech aesthetic
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.beginPath();
    ctx.moveTo(24, 95);
    ctx.lineTo(488, 95);
    ctx.stroke();

    // Phase Number Badge
    ctx.fillStyle = color;
    if (ctx.roundRect) {
      ctx.roundRect(24, 42, 74, 90, 16);
    } else {
      ctx.rect(24, 42, 74, 90);
    }
    ctx.fill();

    // Step Number Text
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 46px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(stepNum, 61, 88);

    // Phase Name Text (dynamically scaled so longer names like REQUIREMENT GATHERING fit crisply)
    const fontSize = name.length > 15 ? 30 : name.length > 10 ? 36 : 46;
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(name.toUpperCase(), 118, 88);

    // Active status indicator dot
    if (isActive) {
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(460, 88, 8, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates floating 3D billboard badge sprite above each pillar
 */
function createFloatingBadgeTexture(stepNum: string, name: string, color: string, isActive: boolean) {
  const canvas = document.createElement('canvas');
  canvas.width = 384;
  canvas.height = 100;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = isActive ? 'rgba(15, 23, 42, 0.96)' : 'rgba(10, 15, 28, 0.88)';
    if (ctx.roundRect) {
      ctx.roundRect(6, 6, 372, 88, 18);
    } else {
      ctx.rect(6, 6, 372, 88);
    }
    ctx.fill();

    ctx.lineWidth = isActive ? 5 : 3;
    ctx.strokeStyle = isActive ? '#ffffff' : color;
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.font = 'bold 34px monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(`0${stepNum}`, 24, 50);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(name, 96, 50);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

export const SDLC3DStepsStage: React.FC<SDLC3DStepsStageProps> = ({
  activeIndex,
  onHoverIndex,
  onSelectIndex,
  isDarkMode = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [cameraView, setCameraView] = useState<'isometric' | 'focus' | 'blueprint'>('isometric');
  const [isAutoTour, setIsAutoTour] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  // References to keep 3D loop, camera fly-through, and raycaster synchronized
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    stageGroup: THREE.Group;
    pillars: THREE.Group[];
    artifacts: THREE.Object3D[];
    plaques: THREE.Mesh[];
    baseRings: THREE.Mesh[];
    topPlatforms: THREE.Mesh[];
    sprites: THREE.Sprite[];
    // Single traveling photon ball
    singleBall: THREE.Mesh;
    singleBallAura: THREE.Mesh;
    singleBallRing: THREE.Mesh;
    singleBallLight: THREE.PointLight;
    ballProgress: number;
    activeLight: THREE.PointLight;
    laserCurve: THREE.CatmullRomCurve3;
    laserPath: THREE.Line;
    dustParticles: THREE.Points;
    stepPositions: THREE.Vector3[];
    rotY: number;
    rotX: number;
    velX: number;
    velY: number;
    isDragging: boolean;
    lastMouseX: number;
    lastMouseY: number;
    autoRotate: boolean;
    targetCamPos: THREE.Vector3;
    targetLookAt: THREE.Vector3;
    currentLookAt: THREE.Vector3;
    animFrameId: number;
    raycaster: THREE.Raycaster;
    mouse: THREE.Vector2;
    interactiveMeshes: THREE.Object3D[];
  } | null>(null);

  // Pillar positions in ascending isometric steps (Step 1 -> Step 6)
  const STEP_COORDS = [
    { x: -5.6, z: -2.3, h: 1.5 },
    { x: -3.3, z: -1.4, h: 2.3 },
    { x: -1.1, z: -0.5, h: 3.1 },
    { x: 1.1, z: 0.5, h: 3.9 },
    { x: 3.3, z: 1.4, h: 4.7 },
    { x: 5.6, z: 2.3, h: 5.5 },
  ];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || 640;
    const height = container.clientHeight || 560;

    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDarkMode ? 1.35 : 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    // Studio Environment map for authentic PBR metal reflections
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();
    } catch {
      // fallback
    }

    // Cinematic Isometric Camera setup
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    const initialCamPos = new THREE.Vector3(0, 8.2, 14.8);
    const initialLookAt = new THREE.Vector3(0, 2.6, 0);
    camera.position.copy(initialCamPos);
    camera.lookAt(initialLookAt);

    // Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(isDarkMode ? 0x1e293b : 0xf8fafc, isDarkMode ? 1.5 : 1.8);
    scene.add(ambientLight);

    const keySunLight = new THREE.DirectionalLight(isDarkMode ? 0x93c5fd : 0xffedd5, 3.2);
    keySunLight.position.set(10, 16, 12);
    keySunLight.castShadow = !isSoftwareGl;
    if (keySunLight.shadow) {
      keySunLight.shadow.mapSize.width = 2048;
      keySunLight.shadow.mapSize.height = 2048;
      keySunLight.shadow.bias = -0.0001;
      keySunLight.shadow.camera.near = 0.5;
      keySunLight.shadow.camera.far = 40;
      keySunLight.shadow.camera.left = -12;
      keySunLight.shadow.camera.right = 12;
      keySunLight.shadow.camera.top = 12;
      keySunLight.shadow.camera.bottom = -12;
    }
    scene.add(keySunLight);

    const cyanRimLight = new THREE.DirectionalLight(0x38bdf8, 2.2);
    cyanRimLight.position.set(-12, 8, -10);
    scene.add(cyanRimLight);

    const amberFillLight = new THREE.DirectionalLight(0xf59e0b, 1.4);
    amberFillLight.position.set(0, -2, 12);
    scene.add(amberFillLight);

    // Active spotlight tracking focused pillar
    const activeLight = new THREE.PointLight(0x38bdf8, 4.8, 14, 1.5);
    activeLight.position.set(0, 4, 0);
    scene.add(activeLight);

    // Main Group containing all stepped stage elements
    const stageGroup = new THREE.Group();
    scene.add(stageGroup);

    // Reflective Tech Floor with Grid
    const gridHelper = new THREE.GridHelper(24, 32, isDarkMode ? 0x38bdf8 : 0x0284c7, isDarkMode ? 0x1e293b : 0xe2e8f0);
    gridHelper.position.y = -0.01;
    stageGroup.add(gridHelper);

    // Floor Reflection Plate
    const floorGeo = new THREE.PlaneGeometry(28, 28);
    const floorMat = new THREE.MeshStandardMaterial({
      color: isDarkMode ? 0x070a12 : 0xf1f5f9,
      roughness: 0.22,
      metalness: 0.88,
      transparent: true,
      opacity: isDarkMode ? 0.95 : 0.88,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -0.02;
    floorMesh.receiveShadow = true;
    stageGroup.add(floorMesh);

    // Ambient floating dust particles in the isometric space
    const particleCount = 120;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount; p++) {
      dustPositions[p * 3] = (Math.random() - 0.5) * 22;
      dustPositions[p * 3 + 1] = Math.random() * 8 + 0.2;
      dustPositions[p * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.08,
      transparent: true,
      opacity: 0.65,
    });
    const dustParticles = new THREE.Points(dustGeo, dustMat);
    stageGroup.add(dustParticles);

    // High-tech Materials Library
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: isDarkMode ? 0x141b2a : 0xe2e8f0,
      metalness: 0.92,
      roughness: 0.18,
      envMapIntensity: 2.2,
    });

    const pillars: THREE.Group[] = [];
    const artifacts: THREE.Object3D[] = [];
    const plaques: THREE.Mesh[] = [];
    const baseRings: THREE.Mesh[] = [];
    const topPlatforms: THREE.Mesh[] = [];
    const sprites: THREE.Sprite[] = [];
    const interactiveMeshes: THREE.Object3D[] = [];
    const stepPositions: THREE.Vector3[] = [];

    // Helper: Build the 6 Ascending Step Pillars with Names on Each Block
    STEP_COORDS.forEach((c, idx) => {
      const pGroup = new THREE.Group();
      pGroup.position.set(c.x, 0, c.z);
      (pGroup as any).stepIndex = idx;

      const pColorHex = SDLC_SIX_PHASES[idx].glowHex;

      // 1. Column Main Box
      const colWidth = 1.52;
      const colDepth = 1.52;
      const colGeo = new THREE.BoxGeometry(colWidth, c.h, colDepth);
      const colMesh = new THREE.Mesh(colGeo, darkMetalMat.clone());
      colMesh.position.y = c.h / 2;
      colMesh.castShadow = true;
      colMesh.receiveShadow = true;
      (colMesh as any).stepIndex = idx;
      pGroup.add(colMesh);
      interactiveMeshes.push(colMesh);

      // Glowing edges for high-tech contouring
      const edgeGeo = new THREE.EdgesGeometry(colGeo);
      const edgeGlowMat = new THREE.LineBasicMaterial({
        color: pColorHex,
        transparent: true,
        opacity: idx === activeIndex ? 0.95 : 0.45,
      });
      const edgeLines = new THREE.LineSegments(edgeGeo, edgeGlowMat);
      edgeLines.position.copy(colMesh.position);
      pGroup.add(edgeLines);

      // 2. Pillar Top Illuminated Cap Platform
      const topCapGeo = new THREE.BoxGeometry(colWidth + 0.08, 0.08, colDepth + 0.08);
      const topCapMat = new THREE.MeshStandardMaterial({
        color: pColorHex,
        emissive: pColorHex,
        emissiveIntensity: idx === activeIndex ? 0.8 : 0.25,
        roughness: 0.1,
        metalness: 0.9,
      });
      const topCap = new THREE.Mesh(topCapGeo, topCapMat);
      topCap.position.y = c.h + 0.04;
      pGroup.add(topCap);
      topPlatforms.push(topCap);

      // 3. Front Face Plaque with the EXACT PHASE NAME on each block
      const plaqueW = 1.4;
      const plaqueH = 0.54;
      const plaqueGeo = new THREE.PlaneGeometry(plaqueW, plaqueH);
      const plaqueTexture = createBlockPlaqueTexture(
        String(idx + 1),
        SDLC_SIX_PHASES[idx].name,
        SDLC_SIX_PHASES[idx].color,
        idx === activeIndex
      );
      const plaqueMat = new THREE.MeshBasicMaterial({
        map: plaqueTexture,
        transparent: true,
        opacity: 0.98,
        side: THREE.DoubleSide,
      });
      const plaqueMesh = new THREE.Mesh(plaqueGeo, plaqueMat);
      plaqueMesh.position.set(0, Math.max(0.42, c.h - 0.4), colDepth / 2 + 0.025);
      (plaqueMesh as any).stepIndex = idx;
      pGroup.add(plaqueMesh);
      plaques.push(plaqueMesh);
      interactiveMeshes.push(plaqueMesh);

      // 4. Base Pedestal Halo Ring
      const ringGeo = new THREE.TorusGeometry(1.25, 0.045, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: pColorHex,
        transparent: true,
        opacity: idx === activeIndex ? 0.95 : 0.28,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.y = 0.05;
      pGroup.add(ringMesh);
      baseRings.push(ringMesh);

      // 5. Floating 3D Holographic Artifact on Top of Column
      const topY = c.h + 0.72;
      stepPositions.push(new THREE.Vector3(c.x, topY, c.z));

      let artifact: THREE.Object3D;

      if (idx === 0) {
        // Requirement: Holographic Data Crystal with rotating wireframe coordinate ring
        const group = new THREE.Group();
        const geo = new THREE.OctahedronGeometry(0.44, 0);
        const mat = new THREE.MeshStandardMaterial({
          color: pColorHex,
          metalness: 0.95,
          roughness: 0.1,
          emissive: pColorHex,
          emissiveIntensity: 0.5,
        });
        const crystal = new THREE.Mesh(geo, mat);
        const wire = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: 0xffffff }));
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.02, 12, 48), new THREE.MeshBasicMaterial({ color: pColorHex }));
        ring.rotation.x = Math.PI / 3;
        group.add(crystal, wire, ring);
        artifact = group;
      } else if (idx === 1) {
        // Planning: Modular Isometric Architecture Matrix (3 cubes with floating satellite)
        const group = new THREE.Group();
        const boxGeo = new THREE.BoxGeometry(0.26, 0.26, 0.26);
        const mat = new THREE.MeshStandardMaterial({ color: pColorHex, metalness: 0.9, roughness: 0.15, emissive: pColorHex, emissiveIntensity: 0.45 });
        const c1 = new THREE.Mesh(boxGeo, mat);
        const c2 = new THREE.Mesh(boxGeo, mat);
        c2.position.set(0.2, 0.24, 0);
        const c3 = new THREE.Mesh(boxGeo, mat);
        c3.position.set(-0.2, -0.16, 0.18);
        const satGeo = new THREE.SphereGeometry(0.08, 16, 16);
        const sat = new THREE.Mesh(satGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
        sat.position.set(0, 0.42, 0);
        group.add(c1, c2, c3, sat);
        artifact = group;
      } else if (idx === 2) {
        // Design: Spatial Wireframe Torus Knot + Viewport Bounding Frame
        const group = new THREE.Group();
        const geo = new THREE.TorusKnotGeometry(0.3, 0.08, 80, 16);
        const mat = new THREE.MeshStandardMaterial({
          color: pColorHex,
          metalness: 0.98,
          roughness: 0.08,
          emissive: pColorHex,
          emissiveIntensity: 0.5,
        });
        const knot = new THREE.Mesh(geo, mat);
        const frameGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8);
        const frameEdges = new THREE.LineSegments(new THREE.EdgesGeometry(frameGeo), new THREE.LineBasicMaterial({ color: 0xc084fc, transparent: true, opacity: 0.6 }));
        group.add(knot, frameEdges);
        artifact = group;
      } else if (idx === 3) {
        // Development: Glowing Terminal Code Monolith / Faceted Icosahedron
        const group = new THREE.Group();
        const geo = new THREE.IcosahedronGeometry(0.42, 0);
        const mat = new THREE.MeshStandardMaterial({
          color: pColorHex,
          metalness: 0.95,
          roughness: 0.12,
          emissive: pColorHex,
          emissiveIntensity: 0.55,
        });
        const monolith = new THREE.Mesh(geo, mat);
        const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: 0x60a5fa }));
        group.add(monolith, edges);
        artifact = group;
      } else if (idx === 4) {
        // Testing: Dual-ring Orbital Security Gyroscope with shield polygon
        const group = new THREE.Group();
        const coreGeo = new THREE.DodecahedronGeometry(0.36, 0);
        const coreMat = new THREE.MeshStandardMaterial({ color: pColorHex, metalness: 0.92, roughness: 0.14, emissive: pColorHex, emissiveIntensity: 0.5 });
        const coreMesh = new THREE.Mesh(coreGeo, coreMat);
        const r1 = new THREE.Mesh(new THREE.TorusGeometry(0.58, 0.02, 12, 48), new THREE.MeshBasicMaterial({ color: 0x34d399 }));
        r1.rotation.x = Math.PI / 3;
        const r2 = new THREE.Mesh(new THREE.TorusGeometry(0.68, 0.02, 12, 48), new THREE.MeshBasicMaterial({ color: 0xa7f3d0 }));
        r2.rotation.y = Math.PI / 4;
        group.add(coreMesh, r1, r2);
        artifact = group;
      } else {
        // Deployment: Radiant Rocket / Ascension Star + Dual Cones & Ion Ring
        const group = new THREE.Group();
        const starGeo = new THREE.OctahedronGeometry(0.44, 0);
        const starMat = new THREE.MeshStandardMaterial({ color: pColorHex, metalness: 0.98, roughness: 0.08, emissive: pColorHex, emissiveIntensity: 0.6 });
        const starMesh = new THREE.Mesh(starGeo, starMat);
        const jetGeo = new THREE.ConeGeometry(0.2, 0.45, 16);
        const jetMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
        const jet = new THREE.Mesh(jetGeo, jetMat);
        jet.rotation.x = Math.PI;
        jet.position.y = -0.38;
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.64, 0.022, 12, 48), new THREE.MeshBasicMaterial({ color: 0xf472b6 }));
        ring.rotation.x = Math.PI / 2;
        group.add(starMesh, jet, ring);
        artifact = group;
      }

      artifact.position.y = topY;
      (artifact as any).baseY = topY;
      (artifact as any).stepIndex = idx;
      pGroup.add(artifact);
      artifacts.push(artifact);
      interactiveMeshes.push(artifact);

      // 6. Crisp Floating 3D Billboard Sprite with Block Name
      const spriteTexture = createFloatingBadgeTexture(
        String(idx + 1),
        SDLC_SIX_PHASES[idx].name,
        SDLC_SIX_PHASES[idx].color,
        idx === activeIndex
      );
      const spriteMat = new THREE.SpriteMaterial({ map: spriteTexture, transparent: true, depthWrite: false });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(1.55, 0.44, 1);
      sprite.position.set(0, topY + 0.88, 0);
      (sprite as any).stepIndex = idx;
      pGroup.add(sprite);
      sprites.push(sprite);
      interactiveMeshes.push(sprite);

      stageGroup.add(pGroup);
      pillars.push(pGroup);
    });

    // 7. Stepped Laser Connection Trail (Curved ribbon from Step 1 to Step 6)
    const curvePoints: THREE.Vector3[] = [];
    stepPositions.forEach((pt, i) => {
      curvePoints.push(new THREE.Vector3(pt.x, pt.y, pt.z));
      if (i < stepPositions.length - 1) {
        const next = stepPositions[i + 1];
        curvePoints.push(new THREE.Vector3((pt.x + next.x) / 2, Math.max(pt.y, next.y) + 0.38, (pt.z + next.z) / 2));
      }
    });

    const laserCurve = new THREE.CatmullRomCurve3(curvePoints);
    const laserCurvePoints = laserCurve.getPoints(160);
    const laserGeo = new THREE.BufferGeometry().setFromPoints(laserCurvePoints);
    const laserMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.75,
    });
    const laserPath = new THREE.Line(laserGeo, laserMat);
    stageGroup.add(laserPath);

    // 8. USER MANDATE: EXACTLY ONE BALL MOVING BOTTOM TO TOP, DISAPPEARING AND REPEATING
    const ballGeo = new THREE.SphereGeometry(0.2, 28, 28);
    const ballMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 2.6,
      roughness: 0.08,
      metalness: 0.95,
      transparent: true,
      opacity: 1.0,
    });
    const singleBall = new THREE.Mesh(ballGeo, ballMat);
    stageGroup.add(singleBall);

    // Translucent glowing aura surrounding the single ball
    const auraGeo = new THREE.SphereGeometry(0.34, 20, 20);
    const auraMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.55,
      wireframe: true,
    });
    const singleBallAura = new THREE.Mesh(auraGeo, auraMat);
    singleBall.add(singleBallAura);

    // Orbital Energy Ring around single ball
    const ringGeo = new THREE.TorusGeometry(0.42, 0.015, 12, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 });
    const singleBallRing = new THREE.Mesh(ringGeo, ringMat);
    singleBall.add(singleBallRing);

    // Dedicated PointLight riding with the ball
    const singleBallLight = new THREE.PointLight(0x38bdf8, 4.0, 5.0, 1.8);
    singleBall.add(singleBallLight);

    // Raycaster for direct mouse hover on 3D pillars
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);

    sceneRef.current = {
      renderer,
      scene,
      camera,
      stageGroup,
      pillars,
      artifacts,
      plaques,
      baseRings,
      topPlatforms,
      sprites,
      singleBall,
      singleBallAura,
      singleBallRing,
      singleBallLight,
      ballProgress: 0.0,
      activeLight,
      laserCurve,
      laserPath,
      dustParticles,
      stepPositions,
      rotY: 0.12,
      rotX: 0.06,
      velX: 0,
      velY: 0,
      isDragging: false,
      lastMouseX: 0,
      lastMouseY: 0,
      autoRotate: true,
      targetCamPos: initialCamPos.clone(),
      targetLookAt: initialLookAt.clone(),
      currentLookAt: initialLookAt.clone(),
      animFrameId: 0,
      raycaster,
      mouse,
      interactiveMeshes,
    };

    // Animation Loop
    let clock = new THREE.Clock();
    const ballPos = new THREE.Vector3();

    const animate = () => {
      const state = sceneRef.current;
      if (!state) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Inertia & drag update
      if (!state.isDragging) {
        state.rotY += state.velX;
        state.rotX += state.velY;
        state.velX *= 0.92;
        state.velY *= 0.92;

        if (state.autoRotate) {
          state.rotY += 0.0032;
        }
      }

      state.rotX = Math.max(-0.25, Math.min(0.45, state.rotX));
      stageGroup.rotation.y = state.rotY;
      stageGroup.rotation.x = state.rotX;

      // Animate floating artifacts (bobbing + spinning)
      state.artifacts.forEach((art, i) => {
        const baseY = (art as any).baseY || 1;
        const speed = 1.6 + i * 0.2;
        art.position.y = baseY + Math.sin(elapsed * speed + i) * 0.12;
        art.rotation.y += 0.016 * (i % 2 === 0 ? 1 : -1);
        art.rotation.x += 0.008;

        const isActive = i === activeIndex;
        const targetScale = isActive ? 1.25 : 1.0;
        art.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      });

      // Update base rings and top platform opacity
      state.baseRings.forEach((ring, i) => {
        const mat = ring.material as THREE.MeshBasicMaterial;
        const targetOpacity = i === activeIndex ? 0.95 : 0.25;
        mat.opacity += (targetOpacity - mat.opacity) * 0.1;
      });

      state.topPlatforms.forEach((plat, i) => {
        const mat = plat.material as THREE.MeshStandardMaterial;
        const targetIntensity = i === activeIndex ? 0.9 : 0.25;
        mat.emissiveIntensity += (targetIntensity - mat.emissiveIntensity) * 0.1;
      });

      // Drift dust particles gently
      const dustAttr = state.dustParticles.geometry.attributes.position;
      const positions = dustAttr.array as Float32Array;
      for (let p = 0; p < positions.length; p += 3) {
        positions[p + 1] += Math.sin(elapsed + positions[p]) * 0.002;
      }
      dustAttr.needsUpdate = true;

      // USER REQUIREMENT: EXACTLY ONE BALL MOVING BOTTOM TO TOP, DISAPPEARING AND REPEATING
      state.ballProgress += delta * 0.24;

      if (state.ballProgress >= 1.0) {
        state.ballProgress = 0.0;
      }

      // Calculate position along curve
      laserCurve.getPointAt(state.ballProgress, ballPos);
      state.singleBall.position.copy(ballPos);

      // Disappear smoothly at top (progress > 0.88), reappear smoothly at bottom (progress < 0.12)
      let ballOpacity = 1.0;
      let ballScale = 1.0;

      if (state.ballProgress > 0.88) {
        const fade = (1.0 - state.ballProgress) / 0.12;
        ballOpacity = Math.max(0, fade);
        ballScale = Math.max(0.01, fade);
      } else if (state.ballProgress < 0.1) {
        const fadeIn = state.ballProgress / 0.1;
        ballOpacity = Math.max(0, fadeIn);
        ballScale = Math.max(0.01, fadeIn);
      }

      const bMat = state.singleBall.material as THREE.MeshStandardMaterial;
      bMat.opacity = ballOpacity;
      const aMat = state.singleBallAura.material as THREE.MeshBasicMaterial;
      aMat.opacity = ballOpacity * 0.55;
      state.singleBallLight.intensity = 4.0 * ballOpacity;
      state.singleBall.scale.set(ballScale, ballScale, ballScale);

      // Rotate aura and ring for energetic shimmer
      state.singleBallAura.rotation.y += 0.05;
      state.singleBallAura.rotation.x += 0.03;
      state.singleBallRing.rotation.z += 0.06;
      state.singleBallRing.rotation.x += 0.04;

      // Position spotlight above active step
      const activeStepPos = state.stepPositions[activeIndex] || state.stepPositions[0];
      state.activeLight.position.lerp(
        new THREE.Vector3(activeStepPos.x, activeStepPos.y + 1.8, activeStepPos.z),
        0.08
      );
      state.activeLight.color.setHex(SDLC_SIX_PHASES[activeIndex]?.glowHex || 0x38bdf8);

      // Smooth Cinematic Camera Fly-Through
      camera.position.lerp(state.targetCamPos, 0.05);
      state.currentLookAt.lerp(state.targetLookAt, 0.05);
      camera.lookAt(state.currentLookAt);

      state.renderer.render(state.scene, state.camera);
      state.animFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !sceneRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
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
      }
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isDarkMode]);

  // Update plaque textures and camera position when active index or camera view changes
  useEffect(() => {
    if (!sceneRef.current) return;
    const { plaques, sprites, targetCamPos, targetLookAt } = sceneRef.current;

    // Update plaque textures
    plaques.forEach((plaque, idx) => {
      const isActive = idx === activeIndex;
      const newTexture = createBlockPlaqueTexture(
        String(idx + 1),
        SDLC_SIX_PHASES[idx].name,
        SDLC_SIX_PHASES[idx].color,
        isActive
      );
      (plaque.material as THREE.MeshBasicMaterial).map = newTexture;
      (plaque.material as THREE.MeshBasicMaterial).needsUpdate = true;
    });

    // Update sprite textures
    sprites.forEach((sprite, idx) => {
      const isActive = idx === activeIndex;
      const newTexture = createFloatingBadgeTexture(
        String(idx + 1),
        SDLC_SIX_PHASES[idx].name,
        SDLC_SIX_PHASES[idx].color,
        isActive
      );
      (sprite.material as THREE.SpriteMaterial).map = newTexture;
      (sprite.material as THREE.SpriteMaterial).needsUpdate = true;
    });

    const coord = STEP_COORDS[activeIndex] || STEP_COORDS[0];

    if (cameraView === 'isometric') {
      targetCamPos.set(
        coord.x * 0.35,
        7.6 + coord.h * 0.28,
        14.2 + (activeIndex === 0 || activeIndex === 5 ? 0.8 : 0)
      );
      targetLookAt.set(coord.x * 0.28, coord.h * 0.5 + 1.2, coord.z * 0.28);
    } else if (cameraView === 'focus') {
      // Close up inspection on active pillar
      targetCamPos.set(coord.x * 0.85, coord.h + 2.4, coord.z + 5.8);
      targetLookAt.set(coord.x, coord.h + 0.6, coord.z);
    } else if (cameraView === 'blueprint') {
      // High-angle architectural blueprint view
      targetCamPos.set(0, 16.5, 4.5);
      targetLookAt.set(0, 2.0, 0);
    }
  }, [activeIndex, cameraView]);

  // Auto-tour timer
  useEffect(() => {
    if (!isAutoTour) return;
    const interval = setInterval(() => {
      onSelectIndex((activeIndex + 1) % SDLC_SIX_PHASES.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isAutoTour, activeIndex, onSelectIndex]);

  // Pointer Interaction Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!sceneRef.current) return;
    sceneRef.current.isDragging = true;
    sceneRef.current.lastMouseX = e.clientX;
    sceneRef.current.lastMouseY = e.clientY;
    sceneRef.current.velX = 0;
    sceneRef.current.velY = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const state = sceneRef.current;
    if (!state) return;

    if (state.isDragging) {
      const dx = e.clientX - state.lastMouseX;
      const dy = e.clientY - state.lastMouseY;
      state.velX = dx * 0.006;
      state.velY = dy * 0.006;
      state.rotY += state.velX;
      state.rotX += state.velY;
      state.lastMouseX = e.clientX;
      state.lastMouseY = e.clientY;
      return;
    }

    const rect = mountRef.current?.getBoundingClientRect();
    if (!rect) return;

    state.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    state.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    state.raycaster.setFromCamera(state.mouse, state.camera);
    const intersects = state.raycaster.intersectObjects(state.interactiveMeshes, true);

    if (intersects.length > 0) {
      let obj: THREE.Object3D | null = intersects[0].object;
      while (obj && (obj as any).stepIndex === undefined && obj.parent) {
        obj = obj.parent;
      }
      if (obj && (obj as any).stepIndex !== undefined) {
        const hoveredIdx = (obj as any).stepIndex;
        if (hoveredIdx >= 0 && hoveredIdx < SDLC_SIX_PHASES.length) {
          onHoverIndex(hoveredIdx);
        }
      }
    }
  };

  const handlePointerUp = () => {
    if (!sceneRef.current) return;
    sceneRef.current.isDragging = false;
  };

  const toggleRotate = useCallback(() => {
    if (!sceneRef.current) return;
    const next = !isRotating;
    setIsRotating(next);
    sceneRef.current.autoRotate = next;
  }, [isRotating]);

  const handleReset = useCallback(() => {
    if (!sceneRef.current) return;
    sceneRef.current.rotX = 0.06;
    sceneRef.current.rotY = 0.12;
    sceneRef.current.velX = 0;
    sceneRef.current.velY = 0;
    setCameraView('isometric');
    sceneRef.current.targetCamPos.set(0, 8.2, 14.8);
    sceneRef.current.targetLookAt.set(0, 2.6, 0);
  }, []);

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="relative w-full h-[470px] sm:h-[530px] lg:h-[600px] flex items-center justify-center select-none overflow-hidden cursor-grab active:cursor-grabbing rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-[#060910] shadow-2xl group"
      title="Interactive 3D Stepped Isometric Stage — Click or Drag to inspect"
    >
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="relative z-10 w-full h-full" />

      {/* Cybernetic Grid Overlay for Depth */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#060910]/40 to-[#060910]/80 pointer-events-none z-10" />

      {/* Futuristic Stage HUD Header */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 pointer-events-none">
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md font-mono text-[11px] text-slate-300 shadow-md">
          <span className="w-2 h-2 rounded-full bg-teal-400" />
          <span>3D ISOMETRIC LIFECYCLE</span>
        </span>
        <span className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md font-mono text-[10px] text-slate-400">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>KINETIC DATA PIPELINE</span>
        </span>
      </div>

      {/* Top Right Floating Action Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-full border border-slate-700/80 shadow-lg">
        {/* Auto Tour Toggle */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsAutoTour((prev) => !prev);
          }}
          className={`px-2.5 py-1 rounded-full font-mono text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
            isAutoTour
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title={isAutoTour ? 'Pause automated tour' : 'Start automated 6-phase tour'}
        >
          <Eye className="w-3 h-3" />
          <span>{isAutoTour ? 'Touring' : 'Tour'}</span>
        </button>

        <span className="w-px h-3.5 bg-slate-700" />

        {/* Camera Views Preset Switcher */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setCameraView('isometric');
            }}
            className={`px-2 py-1 rounded-full font-mono text-[10px] transition-colors cursor-pointer ${
              cameraView === 'isometric' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Isometric Overview"
          >
            ISO
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setCameraView('focus');
            }}
            className={`px-2 py-1 rounded-full font-mono text-[10px] transition-colors cursor-pointer ${
              cameraView === 'focus' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Close-Up Focus"
          >
            FOCUS
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setCameraView('blueprint');
            }}
            className={`px-2 py-1 rounded-full font-mono text-[10px] transition-colors cursor-pointer ${
              cameraView === 'blueprint' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Blueprint Top-Down"
          >
            PLAN
          </button>
        </div>

        <span className="w-px h-3.5 bg-slate-700" />

        {/* Rotate Toggle */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleRotate();
          }}
          className="p-1.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-amber-400 cursor-pointer transition-colors"
          title={isRotating ? 'Pause rotation' : 'Resume rotation'}
          aria-label={isRotating ? 'Pause rotation' : 'Resume rotation'}
        >
          {isRotating ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-teal-400" />}
        </button>

        {/* Reset Camera */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleReset();
          }}
          className="p-1.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-amber-400 cursor-pointer transition-colors"
          title="Reset camera orientation"
          aria-label="Reset camera orientation"
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Horizontal Interactive Stepper HUD Bar with exact names */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 w-[94%] sm:w-auto flex items-center justify-center">
        <div className="flex items-center gap-1 sm:gap-1.5 p-1.5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 shadow-2xl overflow-x-auto max-w-full">
          {SDLC_SIX_PHASES.map((step, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={step.id}
                type="button"
                onMouseEnter={() => onHoverIndex(idx)}
                onClick={() => onSelectIndex(idx)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg shadow-blue-500/30 scale-105'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
                title={`Focus Step 0${idx + 1}: ${step.name}`}
              >
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                    isSelected ? 'bg-white text-blue-700 font-extrabold' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {idx + 1}
                </span>
                <span className="font-sans font-medium text-[11px] sm:text-xs">
                  {step.shortName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {!webglSupported && (
        <div className="absolute inset-0 flex items-center justify-center p-6 bg-slate-900 text-slate-300">
          <p className="font-mono text-sm">WebGL is unavailable on this device.</p>
        </div>
      )}
    </div>
  );
};
