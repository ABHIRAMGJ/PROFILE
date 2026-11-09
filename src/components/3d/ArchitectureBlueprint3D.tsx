import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Send, Play, RotateCw, Activity, ShieldCheck, Database, Cpu, Globe, Server, CheckCircle2 } from 'lucide-react';

interface ArchitectureBlueprint3DProps {
  isDarkMode?: boolean;
}

interface NodeData {
  id: string;
  name: string;
  role: string;
  pos: [number, number, number];
  color: number;
  icon: string;
  metrics: {
    latency: string;
    throughput: string;
    uptime: string;
    tech: string;
  };
}

const NODES_DATA: NodeData[] = [
  {
    id: 'client',
    name: 'Client Applications',
    role: 'Web, Mobile, REST Consumer',
    pos: [-4.2, 0, 0],
    color: 0x38bdf8, // Sky
    icon: 'globe',
    metrics: { latency: '18ms TTFB', throughput: '12k Daily Req', uptime: '100%', tech: 'React / TypeScript / Tailwind' },
  },
  {
    id: 'gateway',
    name: 'API Gateway & Auth',
    role: 'Rate Limiter & JWT Validation',
    pos: [-2.1, 0.4, 0.6],
    color: 0xf59e0b, // Amber
    icon: 'shield',
    metrics: { latency: '1.2ms', throughput: '450 req/sec', uptime: '99.98%', tech: 'FastAPI / Pydantic / CORS' },
  },
  {
    id: 'cache',
    name: 'Redis Cache Layer',
    role: 'Session & Query In-Memory Store',
    pos: [0, 1.8, -0.4],
    color: 0xef4444, // Red/Rose
    icon: 'server',
    metrics: { latency: '0.4ms Read', throughput: '92% Hit Ratio', uptime: '99.99%', tech: 'Redis In-Memory Key-Value' },
  },
  {
    id: 'backend',
    name: 'Backend Microservices',
    role: 'Core Business Logic & Parsers',
    pos: [0, -0.2, 0],
    color: 0x14b8a6, // Teal
    icon: 'cpu',
    metrics: { latency: '14ms Avg', throughput: '380 req/sec', uptime: '99.95%', tech: 'Java / Python / Async Endpoints' },
  },
  {
    id: 'postgres',
    name: 'PostgreSQL Database',
    role: 'ACID Relational Storage',
    pos: [2.3, -1.4, -0.6],
    color: 0x3b82f6, // Blue
    icon: 'database',
    metrics: { latency: '3.1ms Query', throughput: 'Pool Size 20', uptime: '99.99%', tech: 'PostgreSQL / B-Tree Indexes' },
  },
  {
    id: 'vector',
    name: 'Vector Database & RAG',
    role: 'Semantic Cosine Embeddings',
    pos: [2.4, 1.3, 0.8],
    color: 0x8b5cf6, // Purple
    icon: 'cpu',
    metrics: { latency: '24ms K-NN', throughput: '1536-dim embeddings', uptime: '99.9%', tech: 'ChromaDB / Pinecone / RAG' },
  },
  {
    id: 'llm',
    name: 'LLM Inference Engine',
    role: 'Evaluation & Context Generation',
    pos: [4.4, 0.2, 0],
    color: 0xec4899, // Pink
    icon: 'cpu',
    metrics: { latency: '320ms Stream', throughput: 'Streaming Tokens', uptime: '99.8%', tech: 'Gemini 2.5 Flash / OpenAI' },
  },
];

export const ArchitectureBlueprint3D: React.FC<ArchitectureBlueprint3DProps> = ({ isDarkMode = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<NodeData>(NODES_DATA[3]); // Default Backend
  const [packetCount, setPacketCount] = useState(0);
  const [isSimulating, setIsSimulating] = useState(true);

  const sceneStateRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    mainGroup: THREE.Group;
    nodeMeshes: { [id: string]: THREE.Mesh };
    packets: Array<{ mesh: THREE.Mesh; path: THREE.CatmullRomCurve3; progress: number; speed: number }>;
    animId: number;
    isDragging: boolean;
    lastMouseX: number;
    lastMouseY: number;
    rotX: number;
    rotY: number;
  } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 700;
    const height = 400;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.replaceChildren(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 9.8);

    const mainGroup = new THREE.Group();
    mainGroup.rotation.x = 0.25;
    mainGroup.rotation.y = -0.3;
    scene.add(mainGroup);

    // Subtle isometric grid on ground
    const gridHelper = new THREE.GridHelper(16, 16, isDarkMode ? 0x334155 : 0xcbd5e1, isDarkMode ? 0x1e293b : 0xe2e8f0);
    gridHelper.position.y = -2.6;
    mainGroup.add(gridHelper);

    // Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, isDarkMode ? 1.4 : 1.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    const nodeMeshes: { [id: string]: THREE.Mesh } = {};

    // Build Node Meshes
    NODES_DATA.forEach((node) => {
      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(...node.pos);

      // Core Solid Block
      const geo = new THREE.BoxGeometry(0.85, 0.85, 0.85);
      const mat = new THREE.MeshStandardMaterial({
        color: node.color,
        metalness: 0.8,
        roughness: 0.2,
      });
      const mesh = new THREE.Mesh(geo, mat);
      nodeGroup.add(mesh);
      nodeMeshes[node.id] = mesh;

      // Outer Glowing Wireframe Wire
      const wireGeo = new THREE.EdgesGeometry(geo);
      const wireMat = new THREE.LineBasicMaterial({
        color: isDarkMode ? 0xffffff : 0x0f172a,
        transparent: true,
        opacity: 0.7,
      });
      const wire = new THREE.LineSegments(wireGeo, wireMat);
      nodeGroup.add(wire);

      // Ground Anchor Pin
      const pinGeo = new THREE.CylinderGeometry(0.015, 0.015, node.pos[1] - (-2.6), 8);
      const pinMat = new THREE.LineBasicMaterial({ color: node.color, transparent: true, opacity: 0.4 });
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.y = -(node.pos[1] - (-2.6)) / 2;
      nodeGroup.add(pin);

      // Beacon ring under node on floor
      const ringGeo = new THREE.RingGeometry(0.35, 0.42, 24);
      const ringMat = new THREE.MeshBasicMaterial({ color: node.color, side: THREE.DoubleSide, transparent: true, opacity: 0.4 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = -(node.pos[1] - (-2.6));
      nodeGroup.add(ring);

      mainGroup.add(nodeGroup);
    });

    // Connection Pipes & Splines
    const connections: Array<[string, string]> = [
      ['client', 'gateway'],
      ['gateway', 'backend'],
      ['backend', 'cache'],
      ['backend', 'postgres'],
      ['backend', 'vector'],
      ['vector', 'llm'],
    ];

    const splinePaths: THREE.CatmullRomCurve3[] = [];

    connections.forEach(([fromId, toId]) => {
      const n1 = NODES_DATA.find((n) => n.id === fromId);
      const n2 = NODES_DATA.find((n) => n.id === toId);
      if (!n1 || !n2) return;

      const p1 = new THREE.Vector3(...n1.pos);
      const p2 = new THREE.Vector3(...n2.pos);
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      mid.y += 0.45; // Curved arch

      const curve = new THREE.CatmullRomCurve3([p1, mid, p2]);
      splinePaths.push(curve);

      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.035, 8, false);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: isDarkMode ? 0x475569 : 0x94a3b8,
        metalness: 0.5,
        roughness: 0.4,
        transparent: true,
        opacity: 0.6,
      });
      const tube = new THREE.Mesh(tubeGeo, tubeMat);
      mainGroup.add(tube);
    });

    // Luminous Data Packets traveling along the pipelines
    const packets: Array<{ mesh: THREE.Mesh; path: THREE.CatmullRomCurve3; progress: number; speed: number }> = [];
    const packetGeo = new THREE.SphereGeometry(0.1, 12, 12);

    splinePaths.forEach((path, idx) => {
      for (let i = 0; i < 2; i++) {
        const pMat = new THREE.MeshBasicMaterial({
          color: idx % 2 === 0 ? 0xf59e0b : 0x14b8a6,
        });
        const pMesh = new THREE.Mesh(packetGeo, pMat);
        mainGroup.add(pMesh);
        packets.push({
          mesh: pMesh,
          path,
          progress: (i * 0.5 + idx * 0.2) % 1,
          speed: 0.006 + (idx % 3) * 0.002,
        });
      }
    });

    sceneStateRef.current = {
      renderer,
      scene,
      camera,
      mainGroup,
      nodeMeshes,
      packets,
      animId: 0,
      isDragging: false,
      lastMouseX: 0,
      lastMouseY: 0,
      rotX: 0.25,
      rotY: -0.3,
    };

    const animate = () => {
      const state = sceneStateRef.current;
      if (!state) return;

      // Animate packets
      state.packets.forEach((pkt) => {
        pkt.progress += pkt.speed;
        if (pkt.progress > 1) pkt.progress = 0;
        const pt = pkt.path.getPoint(pkt.progress);
        pkt.mesh.position.copy(pt);
      });

      // Gentle auto-rotation if not dragging
      if (!state.isDragging) {
        state.rotY += 0.0015;
      }

      state.mainGroup.rotation.y = state.rotY;
      state.mainGroup.rotation.x = state.rotX;

      state.renderer.render(state.scene, state.camera);
      state.animId = requestAnimationFrame(animate);
    };

    if (sceneStateRef.current) {
      sceneStateRef.current.animId = requestAnimationFrame(animate);
    }

    const handleResize = () => {
      if (!container || !sceneStateRef.current) return;
      const w = container.clientWidth || 700;
      sceneStateRef.current.camera.aspect = w / 400;
      sceneStateRef.current.camera.updateProjectionMatrix();
      sceneStateRef.current.renderer.setSize(w, 400);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (sceneStateRef.current) {
        cancelAnimationFrame(sceneStateRef.current.animId);
        sceneStateRef.current.renderer.dispose();
      }
      container.replaceChildren();
    };
  }, [isDarkMode]);

  // Dispatch interactive packet burst
  const handleDispatchQuery = () => {
    setPacketCount((prev) => prev + 1);
    const state = sceneStateRef.current;
    if (!state) return;

    // Fast-pulse packets
    state.packets.forEach((p) => {
      p.speed = 0.022;
      setTimeout(() => {
        p.speed = 0.007;
      }, 1600);
    });
  };

  // Pointer drag controls for 3D exploration
  const onPointerDown = (e: React.PointerEvent) => {
    const s = sceneStateRef.current;
    if (!s) return;
    s.isDragging = true;
    s.lastMouseX = e.clientX;
    s.lastMouseY = e.clientY;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const s = sceneStateRef.current;
    if (!s || !s.isDragging) return;
    const dx = e.clientX - s.lastMouseX;
    const dy = e.clientY - s.lastMouseY;
    s.rotY += dx * 0.006;
    s.rotX += dy * 0.006;
    s.lastMouseX = e.clientX;
    s.lastMouseY = e.clientY;
  };

  const onPointerUp = () => {
    const s = sceneStateRef.current;
    if (!s) return;
    s.isDragging = false;
  };

  return (
    <div className="w-full rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white/90 dark:bg-slate-900/85 backdrop-blur-xl shadow-2xl p-6 sm:p-8 space-y-6 laser-border-glow overflow-hidden relative">
      {/* Top Header & Simulation Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase font-bold text-amber-600 dark:text-amber-400">
              Interactive 3D Pipeline
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mt-0.5">
            System Architecture Blueprint
          </h3>
          <p className="font-sans text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real request flow from Client through Gateway, Redis, PostgreSQL, and Vector RAG pipeline
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleDispatchQuery}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-mono text-xs font-bold shadow-md shadow-amber-500/20 transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Simulate Request ({packetCount > 0 ? `${packetCount} sent` : 'Push Packet'})</span>
          </button>
        </div>
      </div>

      {/* 3D Canvas Stage */}
      <div
        className="w-full h-[400px] relative rounded-2xl bg-slate-950/5 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 cursor-grab active:cursor-grabbing overflow-hidden"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div ref={mountRef} className="w-full h-full" />

        {/* Orbit Instructions Overlay */}
        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-400 flex items-center gap-1.5 pointer-events-none">
          <RotateCw className="w-3 h-3 text-amber-500" />
          <span>Click & Drag to Rotate 3D Architecture</span>
        </div>
      </div>

      {/* Node Selector Pills & Detailed Telemetry Inspector */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {NODES_DATA.map((n) => {
            const isSelected = selectedNode.id === n.id;
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => setSelectedNode(n)}
                className={`px-3 py-1.5 rounded-xl border font-mono text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-900 dark:border-slate-100 shadow-sm'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-500/50'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: `#${n.color.toString(16).padStart(6, '0')}` }}
                />
                <span>{n.name}</span>
              </button>
            );
          })}
        </div>

        {/* Node Telemetry Box */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <span className="text-slate-400 dark:text-slate-500 uppercase text-[10px] block">Service</span>
            <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">{selectedNode.name}</span>
            <span className="text-[11px] text-amber-600 dark:text-amber-400 font-sans block">{selectedNode.role}</span>
          </div>

          <div>
            <span className="text-slate-400 dark:text-slate-500 uppercase text-[10px] block">Latency</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">{selectedNode.metrics.latency}</span>
            <span className="text-[11px] text-slate-500 block">p95 benchmark</span>
          </div>

          <div>
            <span className="text-slate-400 dark:text-slate-500 uppercase text-[10px] block">Throughput / Uptime</span>
            <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">{selectedNode.metrics.throughput}</span>
            <span className="text-[11px] text-slate-500 block">{selectedNode.metrics.uptime} SLA</span>
          </div>

          <div>
            <span className="text-slate-400 dark:text-slate-500 uppercase text-[10px] block">Technology Stack</span>
            <span className="font-bold text-sky-600 dark:text-sky-400 text-xs">{selectedNode.metrics.tech}</span>
            <span className="text-[11px] text-slate-500 block">Verified production</span>
          </div>
        </div>
      </div>
    </div>
  );
};
