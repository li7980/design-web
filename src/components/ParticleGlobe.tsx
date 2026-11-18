import { useEffect, useRef } from 'react';
import { Language } from '../data/portfolioData';

interface ParticleGlobeProps {
  lang: Language;
}

interface SpherePoint {
  x: number;
  y: number;
  z: number;
  isLand: boolean;
}

// Lightweight procedural land density approximation for clean continental particle clustering
function isContinentalCluster(lat: number, lon: number): boolean {
  const n1 = Math.sin(lat * 3.1 + 0.4) * Math.cos(lon * 2.2 - 0.3);
  const n2 = Math.sin(lat * 5.7 - 1.1) * Math.sin(lon * 4.3 + 0.8) * 0.55;
  const n3 = Math.cos(lat * 9.2 + lon * 6.1) * 0.25;
  return n1 + n2 + n3 > 0.14;
}

function buildSpherePoints(count: number): SpherePoint[] {
  const pts: SpherePoint[] = [];
  const goldenRatio = (1 + Math.sqrt(5)) / 2;

  for (let i = 0; i < count; i++) {
    const t = i / count;
    const inclination = Math.acos(1 - 2 * t);
    const azimuth = (2 * Math.PI * i) / goldenRatio;

    const x = Math.sin(inclination) * Math.cos(azimuth);
    const y = Math.cos(inclination);
    const z = Math.sin(inclination) * Math.sin(azimuth);

    const lat = Math.PI / 2 - inclination;
    const lon = azimuth % (2 * Math.PI);
    const isLand = isContinentalCluster(lat, lon);

    pts.push({ x, y, z, isLand });
  }
  return pts;
}

const SPHERE_POINTS = buildSpherePoints(1450);

const HUB_NODES = [
  { label: 'Zurich', lat: 0.82, lon: 0.15, code: 'ZRH' },
  { label: 'Shanghai', lat: 0.54, lon: 2.12, code: 'SHA' },
  { label: 'Tokyo', lat: 0.62, lon: 2.44, code: 'TYO' },
];

export function ParticleGlobe({ lang }: ParticleGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragRef = useRef({
    isDragging: false,
    lastX: 0,
    lastY: 0,
    rotY: 0.4,
    rotX: 0.22,
    velY: 0.0026,
    velX: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    let tick = 0;
    const render = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.34;

      ctx.clearRect(0, 0, w, h);

      const state = dragRef.current;
      if (!state.isDragging && !prefersReduced) {
        state.rotY += state.velY;
        state.rotX += state.velX;
        state.velY += (0.0025 - state.velY) * 0.04;
        state.velX *= 0.94;
      }

      // 1. Subtle cosmic radial halo behind the globe (cyan upper-left to violet bottom-right)
      const halo = ctx.createRadialGradient(
        cx - radius * 0.25,
        cy - radius * 0.25,
        radius * 0.1,
        cx,
        cy,
        radius * 1.65
      );
      halo.addColorStop(0, 'rgba(125, 211, 252, 0.22)');
      halo.addColorStop(0.5, 'rgba(129, 140, 248, 0.10)');
      halo.addColorStop(1, 'rgba(5, 7, 14, 0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.65, 0, Math.PI * 2);
      ctx.fill();

      // Outer faint geodesic wireframe ring
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.14)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.16, 0, Math.PI * 2);
      ctx.stroke();

      const cosY = Math.cos(state.rotY);
      const sinY = Math.sin(state.rotY);
      const cosX = Math.cos(state.rotX);
      const sinX = Math.sin(state.rotX);

      // 2. Project 3D dotted sphere points
      for (let i = 0; i < SPHERE_POINTS.length; i++) {
        const p = SPHERE_POINTS[i];
        // Rotate Y
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        // Rotate X
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        if (z2 < -0.25 && !p.isLand) continue;

        const depth = (z2 + 1) / 2; // 0..1
        const px = cx + x1 * radius;
        const py = cy + y2 * radius;

        // Color blends from ice-cyan (#7DD3FC) top-left to lavender-violet (#A78BFA) bottom-right
        const mix = Math.max(0, Math.min(1, (x1 + y2 + 1.2) / 2.4));
        const r = Math.round(125 + (167 - 125) * mix);
        const g = Math.round(211 + (139 - 211) * mix);
        const b = Math.round(252 + (250 - 252) * mix);

        const alpha = p.isLand
          ? Math.max(0.08, depth * 0.92)
          : Math.max(0.04, depth * 0.22);

        const dotSize = p.isLand ? 0.9 + depth * 1.05 : 0.7;

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(px, py, dotSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Draw tilted luminous orbital rings around the sphere
      const drawOrbit = (
        tiltZ: number,
        tiltX: number,
        rx: number,
        ry: number,
        color: string,
        satSpeed: number
      ) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(tiltZ);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Orbiting luminous satellite node
        const angle = tick * satSpeed + tiltX;
        const sx = Math.cos(angle) * rx;
        const sy = Math.sin(angle) * ry;
        ctx.fillStyle = '#E0F2FE';
        ctx.beginPath();
        ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(125, 211, 252, 0.35)';
        ctx.beginPath();
        ctx.arc(sx, sy, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      };

      drawOrbit(-0.34, 0.4, radius * 1.46, radius * 0.38, 'rgba(125, 211, 252, 0.42)', 0.018);
      drawOrbit(-0.22, 2.4, radius * 1.32, radius * 0.31, 'rgba(167, 139, 250, 0.34)', -0.013);

      // 4. Project global studio hubs onto sphere surface with clean callout lines
      HUB_NODES.forEach((hub, idx) => {
        const hx = Math.cos(hub.lat) * Math.cos(hub.lon);
        const hy = -Math.sin(hub.lat);
        const hz = Math.cos(hub.lat) * Math.sin(hub.lon);

        const x1 = hx * cosY - hz * sinY;
        const z1 = hx * sinY + hz * cosY;
        const y2 = hy * cosX - z1 * sinX;
        const z2 = hy * sinX + z1 * cosX;

        if (z2 > 0.05) {
          const px = cx + x1 * radius;
          const py = cy + y2 * radius;
          const dirX = x1 >= 0 ? 1 : -1;
          const lx = px + dirX * 36;
          const ly = py + (idx === 1 ? 18 : -22);

          ctx.strokeStyle = 'rgba(125, 211, 252, 0.55)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(lx, ly);
          ctx.lineTo(lx + dirX * 24, ly);
          ctx.stroke();

          ctx.fillStyle = '#7DD3FC';
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.font = '500 10px "JetBrains Mono", monospace';
          ctx.fillStyle = '#E2E8F0';
          ctx.textAlign = dirX > 0 ? 'left' : 'right';
          ctx.fillText(hub.code, lx + dirX * 28, ly + 3);
        }
      });

      tick += 1;
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div
      className="relative w-full h-full min-h-[340px] lg:min-h-[450px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
      onPointerDown={(e) => {
        dragRef.current.isDragging = true;
        dragRef.current.lastX = e.clientX;
        dragRef.current.lastY = e.clientY;
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!dragRef.current.isDragging) return;
        const dx = e.clientX - dragRef.current.lastX;
        const dy = e.clientY - dragRef.current.lastY;
        dragRef.current.rotY += dx * 0.007;
        dragRef.current.rotX = Math.max(-0.8, Math.min(0.8, dragRef.current.rotX + dy * 0.006));
        dragRef.current.velY = dx * 0.0025;
        dragRef.current.velX = dy * 0.002;
        dragRef.current.lastX = e.clientX;
        dragRef.current.lastY = e.clientY;
      }}
      onPointerUp={(e) => {
        dragRef.current.isDragging = false;
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      }}
      aria-label={
        lang === 'zh'
          ? '可拖拽旋转的全球设计节点三维粒子地球仪'
          : 'Interactive draggable 3D particle globe showing global studio nodes'
      }
      role="img"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Subtle bottom-right interaction hint */}
      <div className="pointer-events-none absolute bottom-3 right-3 px-2.5 py-1 rounded bg-[#0C1222]/80 border border-[#1E263D] text-[10px] font-mono-tabular text-[#94A3B8]">
        {lang === 'zh' ? '拖拽旋转地球仪' : 'Drag to Rotate'}
      </div>
    </div>
  );
}
