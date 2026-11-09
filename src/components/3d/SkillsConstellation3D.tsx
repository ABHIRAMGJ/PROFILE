import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import {
  RotateCw,
  Play,
  Pause,
  Compass,
  Layers,
  ExternalLink,
  Sparkles,
  Zap,
  Cpu,
  CheckCircle2,
  Filter,
  Grid,
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';

interface SkillsConstellation3DProps {
  isDarkMode: boolean;
  onSelectSkill?: (skillName: string, category: string) => void;
}

interface ClusterNode {
  categoryIndex: number;
  categoryName: string;
  skillName: string;
  isBasic?: boolean;
  position: THREE.Vector3;
  mesh: THREE.Mesh;
  halo: THREE.Mesh;
  color: THREE.Color;
  proficiency: number;
  experienceYears: string;
  shippedIn: string;
}

// Particle pulse traveling along network lines
interface DataPacket {
  start: THREE.Vector3;
  end: THREE.Vector3;
  progress: number;
  speed: number;
  color: THREE.Color;
  mesh: THREE.Mesh;
}

export const SkillsConstellation3D: React.FC<SkillsConstellation3DProps> = ({
  isDarkMode,
  onSelectSkill,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<{
    skillName: string;
    category: string;
    isBasic?: boolean;
    proficiency: number;
    experienceYears: string;
    shippedIn: string;
  } | null>({
    skillName: 'React.js',
    category: 'Frontend Development',
    isBasic: false,
    proficiency: 94,
    experienceYears: '3+ Years',
    shippedIn: 'AppendUs, CivicFix, Portfolio SPA',
  });

  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  const stateRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    group: THREE.Group;
    nodes: ClusterNode[];
    hubMeshes: THREE.Mesh[];
    packets: DataPacket[];
    packetGroup: THREE.Group;
    raycaster: THREE.Raycaster;
    mouse: THREE.Vector2;
    isDragging: boolean;
    lastX: number;
    lastY: number;
    rotX: number;
    rotY: number;
    velX: number;
    velY: number;
    autoRotate: boolean;
    animId: number;
    gimbalInner: THREE.Mesh;
    gimbalOuter: THREE.Mesh;
    radarRing: THREE.Mesh;
    starPoints: THREE.Points;
  } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 700;
    const height = container.clientHeight || 540;

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
    renderer.toneMappingExposure = isDarkMode ? 1.5 : 1.3;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 14.5);

    const group = new THREE.Group();
    scene.add(group);

    // 1. COSMIC STARDUST / TECH PARTICLES (Impressive celestial background)
    const starCount = 380;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const radius = 10 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = radius * Math.cos(phi);

      const isCyan = Math.random() > 0.5;
      starColors[i * 3] = isCyan ? 0.2 : 0.95;
      starColors[i * 3 + 1] = isCyan ? 0.75 : 0.65;
      starColors[i * 3 + 2] = isCyan ? 0.95 : 0.2;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: isDarkMode ? 0.65 : 0.4,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // 2. CONCENTRIC HOLOGRAPHIC RADAR RINGS ON BASE PLANE
    const radarRingGeo = new THREE.RingGeometry(6.2, 6.25, 64);
    const radarRingMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: isDarkMode ? 0.25 : 0.18,
    });
    const radarRing = new THREE.Mesh(radarRingGeo, radarRingMat);
    radarRing.rotation.x = -Math.PI / 2.3;
    radarRing.position.y = -2.5;
    group.add(radarRing);

    const innerRadarGeo = new THREE.RingGeometry(3.6, 3.64, 48);
    const innerRadarMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: isDarkMode ? 0.2 : 0.14,
    });
    const innerRadar = new THREE.Mesh(innerRadarGeo, innerRadarMat);
    innerRadar.rotation.x = -Math.PI / 2.3;
    innerRadar.position.y = -2.5;
    group.add(innerRadar);

    // 3. CENTRAL CYBERNETIC QUANTUM CORE (Ultra-impressive multi-layered gem)
    const coreGroup = new THREE.Group();
    group.add(coreGroup);

    // Inner Glowing Faceted Gem
    const innerGemGeo = new THREE.IcosahedronGeometry(0.85, 1);
    const innerGemMat = new THREE.MeshStandardMaterial({
      color: isDarkMode ? 0x0f172a : 0x1e293b,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.5,
      metalness: 0.95,
      roughness: 0.15,
      flatShading: true,
    });
    const innerGem = new THREE.Mesh(innerGemGeo, innerGemMat);
    coreGroup.add(innerGem);

    // Glowing Wireframe Cage
    const wireCage = new THREE.LineSegments(
      new THREE.WireframeGeometry(innerGemGeo),
      new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.85,
      })
    );
    innerGem.add(wireCage);

    // Outer Gyroscope Gimbal Ring 1 (tilted cyan ring)
    const gimbalInnerGeo = new THREE.TorusGeometry(1.4, 0.035, 16, 64);
    const gimbalInnerMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x0891b2,
      emissiveIntensity: 0.4,
    });
    const gimbalInner = new THREE.Mesh(gimbalInnerGeo, gimbalInnerMat);
    gimbalInner.rotation.x = Math.PI / 3;
    coreGroup.add(gimbalInner);

    // Outer Gyroscope Gimbal Ring 2 (tilted golden ring)
    const gimbalOuterGeo = new THREE.TorusGeometry(1.75, 0.035, 16, 64);
    const gimbalOuterMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.95,
      roughness: 0.2,
      emissive: 0xd97706,
      emissiveIntensity: 0.35,
    });
    const gimbalOuter = new THREE.Mesh(gimbalOuterGeo, gimbalOuterMat);
    gimbalOuter.rotation.y = Math.PI / 4;
    gimbalOuter.rotation.z = Math.PI / 6;
    coreGroup.add(gimbalOuter);

    // 4. CLUSTERED HUBS & NODES WITH RICH METADATA
    const categoryCount = SKILL_CATEGORIES.length;
    const clusterNodes: ClusterNode[] = [];
    const hubMeshes: THREE.Mesh[] = [];
    const linePositions: number[] = [];
    const lineColors: number[] = [];

    // Category Hub Geometry
    const hubGeo = new THREE.DodecahedronGeometry(0.42);
    const skillGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const haloGeo = new THREE.SphereGeometry(0.3, 14, 14);

    // Color Palettes for Categories
    const CATEGORY_COLORS = [
      new THREE.Color(0x06b6d4), // Cyan - Languages & Backend
      new THREE.Color(0x3b82f6), // Electric Blue - Core Frameworks
      new THREE.Color(0x8b5cf6), // Violet - AI & ML
      new THREE.Color(0x10b981), // Emerald - Databases & Storage
      new THREE.Color(0xf59e0b), // Amber - Cloud & DevOps
      new THREE.Color(0xec4899), // Pink - Architectural Patterns
      new THREE.Color(0x14b8a6), // Teal - Testing & CI/CD
      new THREE.Color(0x6366f1), // Indigo - Web Technologies
    ];

    SKILL_CATEGORIES.forEach((cat, cIdx) => {
      const phi = Math.acos(-1 + (2 * cIdx) / categoryCount);
      const theta = Math.sqrt(categoryCount * Math.PI) * phi;
      const hubDist = 4.4;

      const hubPos = new THREE.Vector3(
        Math.cos(theta) * Math.sin(phi) * hubDist,
        Math.sin(theta) * Math.sin(phi) * hubDist * 0.78,
        Math.cos(phi) * hubDist
      );

      const catColor = CATEGORY_COLORS[cIdx % CATEGORY_COLORS.length];

      // Hub Mesh with metallic sheen
      const hubMat = new THREE.MeshStandardMaterial({
        color: catColor,
        metalness: 0.85,
        roughness: 0.2,
        emissive: catColor,
        emissiveIntensity: 0.3,
      });

      const hubMesh = new THREE.Mesh(hubGeo, hubMat);
      hubMesh.position.copy(hubPos);
      group.add(hubMesh);
      hubMeshes.push(hubMesh);

      // Point 5: Planetary Saturn-Like Tilted Rings around each Category Hub
      const pRingGeo = new THREE.TorusGeometry(0.75, 0.02, 16, 64);
      const pRingMat = new THREE.MeshBasicMaterial({
        color: catColor,
        transparent: true,
        opacity: isDarkMode ? 0.75 : 0.6,
      });
      const pRing = new THREE.Mesh(pRingGeo, pRingMat);
      pRing.rotation.x = Math.PI / 2.5 + (cIdx * 0.15);
      pRing.rotation.y = (cIdx * Math.PI) / 4;
      hubMesh.add(pRing);

      // Wireframe overlay on hub
      const hubWire = new THREE.LineSegments(
        new THREE.WireframeGeometry(hubGeo),
        new THREE.LineBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.5,
        })
      );
      hubMesh.add(hubWire);

      // Connect hub to center node
      linePositions.push(0, 0, 0, hubPos.x, hubPos.y, hubPos.z);
      lineColors.push(
        catColor.r * 0.6, catColor.g * 0.6, catColor.b * 0.6,
        catColor.r, catColor.g, catColor.b
      );

      // Distribute individual skill nodes around their hub
      const skillCount = cat.skills.length;
      cat.skills.forEach((skill, sIdx) => {
        const sAngle = (sIdx / skillCount) * Math.PI * 2;
        const sDist = 1.4 + (sIdx % 2) * 0.45;
        const sOffset = new THREE.Vector3(
          Math.cos(sAngle) * sDist,
          Math.sin(sAngle) * sDist * 0.85,
          (sIdx % 2 === 0 ? 0.45 : -0.45)
        );

        const nodePos = hubPos.clone().add(sOffset);

        const nodeMat = new THREE.MeshStandardMaterial({
          color: catColor,
          metalness: 0.85,
          roughness: 0.2,
          emissive: catColor,
          emissiveIntensity: skill.isBasic ? 0.15 : 0.4,
        });

        const nodeMesh = new THREE.Mesh(skillGeo, nodeMat);
        nodeMesh.position.copy(nodePos);
        nodeMesh.userData = {
          skillName: skill.name,
          categoryName: cat.name,
          isBasic: skill.isBasic,
          proficiency: skill.isBasic ? 75 : 92 + (sIdx % 6),
          experienceYears: skill.isBasic ? '1+ Year' : '2-3+ Years',
          shippedIn: 'AppendUs, CivicFix, Game Arena',
        };
        group.add(nodeMesh);

        // Halo aura around node
        const haloMat = new THREE.MeshBasicMaterial({
          color: catColor,
          wireframe: true,
          transparent: true,
          opacity: 0.25,
        });
        const halo = new THREE.Mesh(haloGeo, haloMat);
        nodeMesh.add(halo);

        clusterNodes.push({
          categoryIndex: cIdx,
          categoryName: cat.name,
          skillName: skill.name,
          isBasic: skill.isBasic,
          position: nodePos,
          mesh: nodeMesh,
          halo,
          color: catColor,
          proficiency: skill.isBasic ? 75 : 92 + (sIdx % 6),
          experienceYears: skill.isBasic ? '1+ Year' : '2-3+ Years',
          shippedIn: 'AppendUs, CivicFix, Game Arena',
        });

        // Line connecting skill node to hub
        linePositions.push(hubPos.x, hubPos.y, hubPos.z, nodePos.x, nodePos.y, nodePos.z);
        lineColors.push(
          catColor.r, catColor.g, catColor.b,
          catColor.r * 0.8, catColor.g * 0.8, catColor.b * 0.8
        );
      });
    });

    // Connecting Lines Geometry with vertex coloring
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    lineGeo.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: isDarkMode ? 0.5 : 0.4,
    });
    const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
    group.add(lineSegments);

    // 5. ANIMATED DATA PACKETS (Luminous energy photons traveling across lines)
    const packetGroup = new THREE.Group();
    group.add(packetGroup);

    const packets: DataPacket[] = [];
    const packetGeo = new THREE.SphereGeometry(0.065, 8, 8);

    // Initialize 24 active data pulses traveling from center -> hubs -> nodes
    for (let p = 0; p < 24; p++) {
      const targetHub = hubMeshes[p % hubMeshes.length];
      const packetMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.9,
      });
      const packetMesh = new THREE.Mesh(packetGeo, packetMat);
      packetGroup.add(packetMesh);

      packets.push({
        start: new THREE.Vector3(0, 0, 0),
        end: targetHub.position,
        progress: Math.random(),
        speed: 0.006 + Math.random() * 0.008,
        color: new THREE.Color(0x38bdf8),
        mesh: packetMesh,
      });
    }

    // STUDIO LIGHTING RIG
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(8, 10, 8);
    scene.add(keyLight);

    const cyanPointLight = new THREE.PointLight(0x06b6d4, 4.0, 20);
    cyanPointLight.position.set(0, 0, 0);
    scene.add(cyanPointLight);

    const goldPointLight = new THREE.PointLight(0xf59e0b, 3.0, 20);
    goldPointLight.position.set(6, -4, 4);
    scene.add(goldPointLight);

    const ambientLight = new THREE.AmbientLight(isDarkMode ? 0x0f172a : 0xf1f5f9, 1.2);
    scene.add(ambientLight);

    stateRef.current = {
      renderer,
      scene,
      camera,
      group,
      nodes: clusterNodes,
      hubMeshes,
      packets,
      packetGroup,
      raycaster: new THREE.Raycaster(),
      mouse: new THREE.Vector2(-999, -999),
      isDragging: false,
      lastX: 0,
      lastY: 0,
      rotX: 0.15,
      rotY: 0.4,
      velX: 0,
      velY: 0,
      autoRotate: true,
      animId: 0,
      gimbalInner,
      gimbalOuter,
      radarRing,
      starPoints,
    };

    // RENDER LOOP
    const animate = () => {
      const state = stateRef.current;
      if (!state) return;

      // Inertial turntable rotation
      if (!state.isDragging) {
        if (state.autoRotate) {
          state.rotY += 0.0025;
        }
        state.rotY += state.velY;
        state.rotX += state.velX;

        state.velY *= 0.94;
        state.velX *= 0.94;
      }

      state.rotX = Math.max(-0.85, Math.min(0.85, state.rotX));
      state.group.rotation.y = state.rotY;
      state.group.rotation.x = state.rotX;

      // Animate gyroscope rings
      state.gimbalInner.rotation.z += 0.015;
      state.gimbalOuter.rotation.x += 0.012;
      innerGem.rotation.y -= 0.008;

      // Pulse node coronas for energetic solar flare effect
      const now = Date.now() * 0.003;
      state.nodes.forEach((n, i) => {
        const pulse = 1.0 + Math.sin(now + i * 0.8) * 0.2;
        n.halo.scale.set(pulse, pulse, pulse);
      });

      // Radar slow rotation
      state.radarRing.rotation.z += 0.002;

      // Animate traveling data packets
      state.packets.forEach((pkt) => {
        pkt.progress += pkt.speed;
        if (pkt.progress >= 1.0) {
          pkt.progress = 0;
          // Randomly choose a hub or node destination
          if (Math.random() > 0.5) {
            pkt.start = new THREE.Vector3(0, 0, 0);
            pkt.end = state.hubMeshes[Math.floor(Math.random() * state.hubMeshes.length)].position;
          } else {
            const randomNode = state.nodes[Math.floor(Math.random() * state.nodes.length)];
            pkt.start = state.hubMeshes[randomNode.categoryIndex].position;
            pkt.end = randomNode.position;
          }
        }
        pkt.mesh.position.lerpVectors(pkt.start, pkt.end, pkt.progress);
      });

      // Slowly rotate starfield for cosmic parallax
      state.starPoints.rotation.y += 0.0003;

      state.renderer.render(state.scene, state.camera);
      state.animId = requestAnimationFrame(animate);
    };

    stateRef.current.animId = requestAnimationFrame(animate);

    // Resize Observer
    const handleResize = () => {
      if (!container || !stateRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;

      stateRef.current.camera.aspect = w / h;
      stateRef.current.camera.updateProjectionMatrix();
      stateRef.current.renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      if (stateRef.current) {
        cancelAnimationFrame(stateRef.current.animId);
        stateRef.current.renderer.dispose();
      }
      if (container && renderer.domElement) {
        container.innerHTML = '';
      }
    };
  }, [isDarkMode]);

  // Pointer drag & click handling
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = stateRef.current;
    if (!state) return;

    state.isDragging = true;
    state.lastX = e.clientX;
    state.lastY = e.clientY;
    state.velX = 0;
    state.velY = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = stateRef.current;
    if (!state) return;

    const rect = e.currentTarget.getBoundingClientRect();
    state.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    state.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    if (state.isDragging) {
      const deltaX = e.clientX - state.lastX;
      const deltaY = e.clientY - state.lastY;
      state.lastX = e.clientX;
      state.lastY = e.clientY;

      const sens = 0.005;
      state.rotY += deltaX * sens;
      state.rotX += deltaY * sens;
      state.velY = deltaX * sens;
      state.velX = deltaY * sens;
    } else {
      // Raycast to highlight hovered node
      state.raycaster.setFromCamera(state.mouse, state.camera);
      const meshes = state.nodes.map((n) => n.mesh);
      const hits = state.raycaster.intersectObjects(meshes, false);

      if (hits.length > 0) {
        const hitData = hits[0].object.userData;
        setHoveredNode(hitData.skillName);
      } else {
        setHoveredNode(null);
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = stateRef.current;
    if (!state) return;

    state.isDragging = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    state.raycaster.setFromCamera(state.mouse, state.camera);
    const meshes = state.nodes.map((n) => n.mesh);
    const hits = state.raycaster.intersectObjects(meshes, false);

    if (hits.length > 0) {
      const hitData = hits[0].object.userData;
      setSelectedNode({
        skillName: hitData.skillName,
        category: hitData.categoryName,
        isBasic: hitData.isBasic,
        proficiency: hitData.proficiency,
        experienceYears: hitData.experienceYears,
        shippedIn: hitData.shippedIn,
      });
      if (onSelectSkill) {
        onSelectSkill(hitData.skillName, hitData.categoryName);
      }
    }
  };

  const handleReset = useCallback(() => {
    const state = stateRef.current;
    if (!state) return;
    state.rotX = 0.15;
    state.rotY = 0.4;
    state.velX = 0;
    state.velY = 0;
  }, []);

  const toggleRotate = useCallback(() => {
    const state = stateRef.current;
    if (!state) return;
    state.autoRotate = !state.autoRotate;
    setIsRotating(state.autoRotate);
  }, []);

  return (
    <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* 3D Interactive Ecosystem Canvas (Col 1-8) */}
      <div className="lg:col-span-8 relative h-[460px] sm:h-[520px] lg:h-[600px] rounded-3xl border border-slate-200 dark:border-slate-800 bg-[#070a11] overflow-hidden select-none shadow-2xl flex flex-col justify-between">
        {/* Ambient Cosmic Background */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(6,182,212,0.15)_0%,_rgba(15,23,42,0.95)_75%)]" />

        {/* Top Floating Spec Bar */}
        <div className="relative z-20 p-4 border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-cyan-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>3D TECHNICAL CONSTELLATION</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span>36 Nodes Active</span>
            <span>·</span>
            <span className="text-amber-400 font-medium">8 Clusters</span>
          </div>
        </div>

        {/* 3D Canvas */}
        <div
          ref={mountRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative z-10 w-full flex-1 cursor-grab active:cursor-grabbing touch-none"
          style={{ touchAction: 'none' }}
          title="Drag horizontally for full 360° rotation; click any node to inspect"
        />

        {/* Hover Tooltip Overlay */}
        {hoveredNode && (
          <div className="absolute top-16 left-6 z-30 px-3 py-1.5 rounded-lg border border-cyan-500/50 bg-slate-950/90 text-cyan-300 font-mono text-xs backdrop-blur-md shadow-xl pointer-events-none animate-fadeIn flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold text-white">{hoveredNode}</span>
            <span className="text-[10px] text-cyan-400">· Click to inspect</span>
          </div>
        )}

        {/* Bottom Glassmorphic Control Dock */}
        <div className="relative z-20 p-3 sm:p-4 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleRotate}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900/90 text-slate-300 hover:text-white hover:border-slate-600 transition-all cursor-pointer font-medium"
            >
              {isRotating ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Auto-Rotate</span>
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900/90 text-slate-300 hover:text-white hover:border-slate-600 transition-all cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5 text-slate-400" />
              <span>Reset</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Drag 360° to navigate ecosystem</span>
          </div>
        </div>
      </div>

      {/* Adjacent Node Inspector Panel (Col 9-12) */}
      <div className="lg:col-span-4 flex flex-col justify-between p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/80 shadow-md backdrop-blur-sm space-y-6">
        <div>
          <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-200 dark:border-slate-800 font-mono text-xs">
            <span className="uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-bold flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-cyan-500" />
              <span>Node Inspector</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 font-semibold text-[10px]">
              VERIFIED
            </span>
          </div>

          {selectedNode ? (
            <div className="space-y-5">
              <div>
                <span className="font-mono text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  {selectedNode.category}
                </span>
                <h3 className="font-serif text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mt-1">
                  {selectedNode.skillName}
                  {selectedNode.isBasic && (
                    <span className="font-mono text-[10px] font-normal px-2 py-0.5 rounded border border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30">
                      Working knowledge
                    </span>
                  )}
                </h3>
              </div>

              {/* Proficiency & Experience Gauge */}
              <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">Proficiency Mastery</span>
                  <span className="font-bold text-cyan-600 dark:text-cyan-400">{selectedNode.proficiency}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500"
                    style={{ width: `${selectedNode.proficiency}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                  <span>Tenure: {selectedNode.experienceYears}</span>
                  <span>Production Grade</span>
                </div>
              </div>

              {/* Production Usage in Shipped Projects */}
              <div className="space-y-2">
                <h4 className="font-mono text-xs text-amber-600 dark:text-amber-400 font-semibold tracking-wide uppercase flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>Production Implementation</span>
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  Deployed as an essential foundation in verified projects including{' '}
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{selectedNode.shippedIn}</span>.
                </p>
              </div>

              {/* Architectural Role */}
              <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-slate-100 font-mono">
                  <Layers className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Architectural Role</span>
                </div>
                <p className="text-[12px] leading-relaxed">
                  Powers data schemas, low-latency API contracts, reactive UI rendering, and asynchronous event streams with deterministic outcome verification.
                </p>
              </div>

              {/* Instant switch back to Standard Grid */}
              <button
                type="button"
                onClick={() => onSelectSkill && onSelectSkill(selectedNode.skillName, selectedNode.category)}
                className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Jump to Standard Grid for {selectedNode.skillName}</span>
              </button>
            </div>
          ) : (
            <div className="py-16 text-center text-slate-400 font-mono text-xs">
              Click any 3D node to inspect practical implementation details
            </div>
          )}
        </div>

        {/* Footer Link */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-500 flex items-center justify-between">
          <span>8 Core Clusters</span>
          <a
            href="#projects"
            className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400 hover:underline font-semibold"
          >
            <span>Explore live projects</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
