"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { formats } from "@/app/content";
import Photo, { type ResolvedPhoto } from "./Photo";

export default function Formats({ photos }: { photos: Record<string, ResolvedPhoto> }) {
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 160, damping: 22, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 160, damping: 22, mass: 0.5 });

  return (
    <section id="formats" className="relative bg-ink px-gutter py-[clamp(6rem,14vw,11rem)]">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
          <h2 data-reveal className="font-display text-[clamp(2rem,5.1vw,4rem)]">
            {formats.title}
          </h2>
          <p data-reveal style={{ "--d": "120ms" } as React.CSSProperties} className="max-w-[44ch] text-lg text-cream-2 md:justify-self-end">
            {formats.body}
          </p>
        </div>

        <ul
          ref={listRef}
          className="relative mt-16 border-t border-cream/12 md:mt-24"
          onPointerMove={(e) => {
            if (e.pointerType !== "mouse" || !listRef.current) return;
            const r = listRef.current.getBoundingClientRect();
            x.set(e.clientX - r.left);
            y.set(e.clientY - r.top);
          }}
          onPointerLeave={() => setActive(null)}
        >
          {formats.items.map((item, i) => (
            <li
              key={item.name}
              data-reveal
              style={{ "--d": `${i * 80}ms` } as React.CSSProperties}
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
              className="group border-b border-cream/12"
            >
              <div className="grid gap-5 py-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_auto] md:items-center md:gap-10 md:py-10">
                <h3 className="font-display flex items-center gap-4 text-[clamp(1.6rem,3.9vw,3.2rem)] transition-[transform,color] duration-700 ease-out-expo md:group-hover:translate-x-4 md:group-hover:text-orange">
                  {item.name}
                </h3>
                <div className="md:hidden">
                  <Photo photo={photos[item.photo]} className="aspect-[4/3] rounded-2xl" sizes="100vw" />
                </div>
                <div>
                  <p className="max-w-[40ch] text-cream-2">{item.line}</p>
                  <p className="mt-3 text-sm text-cream-3">
                    Good for: <span className="text-cream">{item.goodFor}</span>
                  </p>
                </div>
                <ArrowUpRight
                  aria-hidden
                  className="hidden size-8 text-cream-3 transition-[transform,color] duration-700 ease-out-expo group-hover:rotate-45 group-hover:text-orange md:block"
                />
              </div>
            </li>
          ))}

          {/* Cursor-following preview, desktop only */}
          <motion.div
            aria-hidden
            style={{ x, y }}
            className="pointer-events-none absolute left-0 top-0 hidden md:block"
          >
            <AnimatePresence>
              {active !== null && (
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.85, rotate: -4, filter: "blur(8px)" }}
                  animate={{ opacity: 1, scale: 1, rotate: tilt(active), filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: 0, top: 0 }}
                >
                  <Photo photo={photos[formats.items[active].photo]} className="aspect-[4/5] w-[min(22vw,320px)] rounded-2xl shadow-2xl shadow-black/60" sizes="320px" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </ul>
      </div>
    </section>
  );
}

const tilt = (n: number) => [-3, 2.5, -1.5, 3][n % 4];
