"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "motion/react";

// Each dot is a person. At the top of the page they drift on their own; as the
// visitor scrolls through the story they find each other, link up and gather
// into one network. The cursor connects whatever it passes, like a host
// introducing people at a meetup.

type Dot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  kind: 0 | 1 | 2; // cream, orange, blue
  tx: number; // gathered position, as a fraction of the cluster radius
  ty: number;
  seed: number;
};

const COLORS = ["245,240,230", "255,106,43", "126,139,255"];
const smooth = (a: number, b: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export default function PeopleField({ progress, className = "" }: { progress: MotionValue<number>; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let dots: Dot[] = [];
    const pointer = { x: -9999, y: -9999, active: false };
    let raf = 0;
    let visible = true;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(Math.min(150, Math.max(56, (w * h) / 9500)));
      const golden = Math.PI * (3 - Math.sqrt(5));
      dots = Array.from({ length: count }, (_, i) => {
        const roll = Math.random();
        const kind: Dot["kind"] = roll < 0.07 ? 1 : roll < 0.17 ? 2 : 0;
        // Sunflower layout gives an even, organic disc for the gathered state.
        const rr = Math.sqrt((i + 0.5) / count);
        const a = i * golden;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: kind === 1 ? 2.6 + Math.random() * 1.2 : 1.1 + Math.random() * 1.4,
          kind,
          tx: Math.cos(a) * rr,
          ty: Math.sin(a) * rr,
          seed: Math.random() * 1000,
        };
      });
    };

    const frame = (time: number) => {
      const p = progress.get();
      const link = 0.12 + smooth(0.12, 0.7, p) * 0.88;
      const gather = smooth(0.3, 0.85, p);
      const fade = 1 - smooth(0.9, 1, p) * 0.5;
      const mobile = w < 768;
      const cx = mobile ? w * 0.5 : w * 0.7;
      const cy = mobile ? h * 0.62 : h * 0.52;
      const radius = Math.min(w, h) * (mobile ? 0.42 : 0.36);
      const maxLink = (mobile ? 70 : 96) * link + 18;

      ctx.clearRect(0, 0, w, h);

      for (const d of dots) {
        if (!reduce) {
          // Wander: a slow, per-dot sine drift so no two move alike.
          const t = time * 0.00018 + d.seed;
          d.vx += Math.cos(t * 1.3) * 0.006 * (1 - gather);
          d.vy += Math.sin(t * 0.9) * 0.006 * (1 - gather);
          // Pull toward the gathered network.
          const gx = cx + d.tx * radius + Math.cos(t * 2) * 6;
          const gy = cy + d.ty * radius + Math.sin(t * 2.4) * 6;
          d.vx += (gx - d.x) * 0.0016 * gather;
          d.vy += (gy - d.y) * 0.0016 * gather;
          // Gentle drift away from the cursor so it never sits on top of a dot.
          if (pointer.active) {
            const dx = d.x - pointer.x;
            const dy = d.y - pointer.y;
            const dist2 = dx * dx + dy * dy;
            if (dist2 < 6400 && dist2 > 1) {
              const f = (1 - dist2 / 6400) * 0.12;
              const dist = Math.sqrt(dist2);
              d.vx += (dx / dist) * f;
              d.vy += (dy / dist) * f;
            }
          }
          d.vx *= 0.96;
          d.vy *= 0.96;
          d.x += d.vx;
          d.y += d.vy;
          if (gather < 0.5) {
            if (d.x < -20) d.x = w + 20;
            if (d.x > w + 20) d.x = -20;
            if (d.y < -20) d.y = h + 20;
            if (d.y > h + 20) d.y = -20;
          }
        }
      }

      // Links between people who have found each other.
      ctx.lineWidth = 1;
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 > maxLink * maxLink) continue;
          const alpha = (1 - Math.sqrt(dist2) / maxLink) * 0.32 * link * fade;
          const warm = a.kind === 1 || b.kind === 1;
          ctx.strokeStyle = `rgba(${warm ? COLORS[1] : COLORS[0]},${warm ? alpha * 1.3 : alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // The cursor introduces nearby people to each other.
      if (pointer.active) {
        for (const d of dots) {
          const dx = d.x - pointer.x;
          const dy = d.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 170) continue;
          ctx.strokeStyle = `rgba(${COLORS[1]},${(1 - dist / 170) * 0.55 * fade})`;
          ctx.beginPath();
          ctx.moveTo(pointer.x, pointer.y);
          ctx.lineTo(d.x, d.y);
          ctx.stroke();
        }
      }

      for (const d of dots) {
        const c = COLORS[d.kind];
        if (d.kind === 1) {
          ctx.fillStyle = `rgba(${c},${0.16 * fade})`;
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.r * 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(${c},${(d.kind === 0 ? 0.78 : 0.95) * fade})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduce && visible) raf = requestAnimationFrame(frame);
    };

    build();
    raf = requestAnimationFrame(frame);

    const ro = new ResizeObserver(() => {
      build();
      if (reduce) requestAnimationFrame(frame);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was && !reduce) raf = requestAnimationFrame(frame);
    });
    io.observe(canvas);

    const unsub = reduce ? progress.on("change", () => requestAnimationFrame(frame)) : () => {};

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = pointer.y >= 0 && pointer.y <= rect.height;
    };
    const onLeave = () => (pointer.active = false);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      unsub();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [progress]);

  return <canvas ref={canvasRef} className={`block h-full w-full ${className}`} aria-hidden="true" />;
}
