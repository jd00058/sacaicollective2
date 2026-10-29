"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { closing, LUMA_URL } from "@/app/content";
import { useSite } from "./Providers";
import Magnetic from "./Magnetic";

const SEATS = 30;
const R = 46; // ring radius, in % of the box

// Deterministic scatter, rounded so server and client render identical attributes.
const round = (n: number) => Math.round(n * 100) / 100;
const scatter = (i: number) => {
  const a = Math.sin(i * 12.9898) * 43758.5453;
  const b = Math.sin(i * 78.233) * 12345.6789;
  return { x: round((a - Math.floor(a)) * 140 - 20), y: round((b - Math.floor(b)) * 140 - 20) };
};

export default function Closing() {
  const { openJoin } = useSite();
  const ring = useRef<HTMLDivElement>(null);
  const inView = useInView(ring, { once: true, margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="closing-title" className="relative overflow-hidden bg-ink px-gutter py-[clamp(6rem,14vw,10rem)]">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[40%] size-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/25 blur-[140px]" />

      <div ref={ring} className="relative mx-auto aspect-square w-[min(92vw,760px)]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
          {Array.from({ length: SEATS }, (_, i) => {
            const a = (i / SEATS) * Math.PI * 2 - Math.PI / 2;
            const x = round(50 + Math.cos(a) * R);
            const y = round(50 + Math.sin(a) * R);
            const open = i === 0;
            const from = scatter(i + 1);
            const settled = { cx: x, cy: y, opacity: 1 };
            return (
              <g key={i}>
                {open && (
                  <circle cx={x} cy={y} r={1.6} fill="var(--color-orange)" className={inView || reduce ? "seat-pulse" : "opacity-0"} />
                )}
                <motion.circle
                  r={open ? 1.6 : 0.95}
                  fill={open ? "var(--color-orange)" : "var(--color-cream)"}
                  initial={reduce ? settled : { cx: from.x, cy: from.y, opacity: 0 }}
                  animate={inView || reduce ? settled : undefined}
                  transition={{ duration: 1.6, delay: open ? 1.4 : (i / SEATS) * 0.7, ease: [0.16, 1, 0.3, 1] }}
                />
              </g>
            );
          })}
        </svg>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={inView || reduce ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute left-1/2 top-[4%] -translate-x-1/2 -translate-y-[calc(100%+0.9rem)] whitespace-nowrap text-sm font-medium text-orange"
        >
          your seat ↓
        </motion.p>

        <div className="absolute inset-0 grid place-items-center">
          <h2 id="closing-title" data-reveal className="font-display text-center text-[clamp(3rem,11vw,6rem)] font-bold">
            Pull up
            <br />a chair.
          </h2>
        </div>
      </div>

      <div className="relative mx-auto mt-12 flex max-w-[640px] flex-col items-center text-center">
        <p data-reveal className="max-w-[44ch] text-lg text-cream-2">
          {closing.body}
        </p>
        <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties} className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <Magnetic>
            <button
              type="button"
              onClick={() => openJoin()}
              className="group inline-flex h-14 items-center gap-3 rounded-full bg-orange pl-7 pr-2 text-base font-semibold text-ink transition-colors duration-300 hover:bg-cream"
            >
              {closing.primary}
              <span className="grid size-10 place-items-center rounded-full bg-ink text-cream transition-transform duration-500 ease-out-expo group-hover:rotate-[-45deg]">
                <ArrowRight className="size-4" aria-hidden />
              </span>
            </button>
          </Magnetic>
          <a href={LUMA_URL} target="_blank" rel="noreferrer" className="link-draw inline-flex items-center gap-1.5 py-1 font-medium text-cream">
            {closing.secondary} <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
