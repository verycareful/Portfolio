"use client";

// Quantum Ambient Background
// Floating qubit orbs + tiny gate tokens + faint entanglement lines.
// Very subtle — meant to sit behind hero content without competing.
// Interactions: mouse repulsion (same feel as the original particle system).

import { useRef, useEffect, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  kind: "qubit" | "gate";
  label?: string; // for gate tokens
  phase: number;
  phaseSpeed: number;
  radius: number;
  measured: boolean;
  measureTimer: number;
}

const GATE_LABELS = ["H", "X", "RZ", "Y", "S", "T"];
const QUBIT_COUNT = 14;
const GATE_COUNT = 8;
const CONNECT_DIST = 220; // px — entanglement line distance
const REPULSE_RADIUS = 140;
const REPULSE_STRENGTH = 0.022;

export default function QuantumCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);

  // Use window-level listeners so events work even though the parent
  // wrapper has pointer-events:none (needed to not block hero buttons).
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!canvasRef.current) return;
    const r = canvasRef.current.getBoundingClientRect();
    // Only track when cursor is over the hero canvas area
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    if (x >= 0 && x <= r.width && y >= 0 && y <= r.height) {
      mouseRef.current = { x, y };
    } else {
      mouseRef.current = { x: -9999, y: -9999 };
    }
  }, []);

  const handleClick = useCallback((e: MouseEvent) => {
    if (!canvasRef.current) return;
    const r = canvasRef.current.getBoundingClientRect();
    const mx = e.clientX - r.left;
    const my = e.clientY - r.top;
    if (mx < 0 || mx > r.width || my < 0 || my > r.height) return;
    // Click near a qubit → briefly "measure" it (flashes orange)
    for (const p of particlesRef.current) {
      if (p.kind !== "qubit") continue;
      const d = Math.hypot(p.x - mx, p.y - my);
      if (d < p.radius + 14) {
        p.measured = true;
        p.measureTimer = 2.0;
        break;
      }
    }
  }, []);

  useEffect(() => {
    const container = canvasRef.current?.parentElement;
    if (!canvasRef.current || !container) return;
    const canvas = canvasRef.current;

    const setSize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    setSize();

    const spawn = () => {
      const W = canvas.width;
      const H = canvas.height;
      const particles: Particle[] = [];

      for (let i = 0; i < QUBIT_COUNT; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          kind: "qubit",
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.6 + Math.random() * 1.0,
          radius: 5 + Math.random() * 4,
          measured: false,
          measureTimer: 0,
        });
      }
      for (let i = 0; i < GATE_COUNT; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          kind: "gate",
          label: GATE_LABELS[i % GATE_LABELS.length],
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.3 + Math.random() * 0.5,
          radius: 10,
          measured: false,
          measureTimer: 0,
        });
      }
      particlesRef.current = particles;
    };
    spawn();

    // Attach to window so events fire even through pointer-events:none parent
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    const ctx = canvas.getContext("2d")!;
    let lastT = performance.now();

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      const now = performance.now();
      const dt = Math.min((now - lastT) * 0.001, 0.05);
      lastT = now;
      const t = now * 0.001;
      const W = canvas.width;
      const H = canvas.height;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, W, H);

      const ps = particlesRef.current;

      // ── Update positions ────────────────────────────────────────────
      for (const p of ps) {
        p.phase += p.phaseSpeed * dt;

        // Mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const d = Math.hypot(dx, dy);
        if (d < REPULSE_RADIUS && d > 0.1) {
          const force = REPULSE_STRENGTH * (1 - d / REPULSE_RADIUS);
          p.vx += (dx / d) * force;
          p.vy += (dy / d) * force;
        }

        // Soft boundary wrap
        p.x += p.vx;
        p.y += p.vy;
        // Damp velocity toward drift speed
        p.vx *= 0.998;
        p.vy *= 0.998;

        if (p.x < -20) p.x = W + 20;
        if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20;
        if (p.y > H + 20) p.y = -20;

        if (p.measured) {
          p.measureTimer -= dt;
          if (p.measureTimer <= 0) p.measured = false;
        }
      }

      // ── Draw entanglement lines between close qubits ────────────────
      for (let i = 0; i < ps.length; i++) {
        if (ps[i].kind !== "qubit") continue;
        for (let j = i + 1; j < ps.length; j++) {
          if (ps[j].kind !== "qubit") continue;
          const dx = ps[i].x - ps[j].x;
          const dy = ps[i].y - ps[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.22;
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.strokeStyle = `rgba(45,156,219,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // ── Draw gate tokens ────────────────────────────────────────────
      for (const p of ps) {
        if (p.kind !== "gate") continue;
        const pulse = 0.4 + 0.2 * Math.sin(t * 1.2 + p.phase);
        const size = 18;
        const alpha = pulse * 0.55;

        ctx.save();
        ctx.translate(p.x, p.y);
        // Very faint box
        ctx.strokeStyle = `rgba(45,156,219,${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.strokeRect(-size / 2, -size / 2, size, size);
        // Label
        ctx.font = `bold 8px 'JetBrains Mono', monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = `rgba(45,156,219,${alpha * 1.4})`;
        ctx.fillText(p.label ?? "", 0, 0);
        ctx.restore();
      }

      // ── Draw qubit orbs ─────────────────────────────────────────────
      for (const p of ps) {
        if (p.kind !== "qubit") continue;
        const pulse = 0.5 + 0.3 * Math.sin(t * 1.8 + p.phase);
        const r = p.radius;

        ctx.save();
        ctx.translate(p.x, p.y);

        if (p.measured) {
          // Collapsed: orange dot, no ring
          const a = Math.min(1, p.measureTimer / 0.4) * 0.7;
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(242,153,74,${a})`;
          ctx.fill();
        } else {
          // Superposition: blue dot + spinning ring
          const alpha = 0.28 + pulse * 0.25;

          // Core dot
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(45,156,219,${alpha})`;
          ctx.fill();

          // Outer ring (superposition indicator)
          const ringR = r * 1.9;
          ctx.save();
          ctx.rotate(p.phase);
          ctx.beginPath();
          ctx.arc(0, 0, ringR, 0, Math.PI * 1.6); // not full circle → spinning feel
          ctx.strokeStyle = `rgba(45,156,219,${alpha * 0.55})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.restore();
        }

        ctx.restore();
      }
    };

    animate();

    const onResize = () => {
      setSize();
      spawn();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove, handleClick]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{ zIndex: 0, cursor: "default" }}
      aria-hidden="true"
    />
  );
}
