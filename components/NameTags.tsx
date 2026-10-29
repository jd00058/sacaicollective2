"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Hand } from "lucide-react";
import { who } from "@/app/content";

const bands: Record<string, { band: string; hello: string }> = {
  orange: { band: "bg-orange", hello: "text-ink" },
  ember: { band: "bg-ember", hello: "text-cream" },
  ink: { band: "bg-ink", hello: "text-cream" },
  navy: { band: "bg-navy", hello: "text-cream" },
};

// Fixed, hand-tuned tilts so the scatter looks slapped-on rather than random on every render.
const tilts = [-6, 4, -2.5, 7, -4.5, 2, -7, 5, -1.5];
const drops = [0, 28, -10, 18, -24, 8, 22, -14, 4];

export default function NameTags() {
  const board = useRef<HTMLDivElement>(null);
  const inView = useInView(board, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [top, setTop] = useState<number | null>(null);
  // Phones get a tighter two-column scatter with smaller vertical offsets.
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section id="who" className="relative overflow-hidden bg-blue px-gutter py-[clamp(6rem,14vw,10rem)]">
      <div aria-hidden className="pointer-events-none absolute -right-1/4 -top-1/2 size-[80vmax] rounded-full bg-blue-hi/30 blur-[140px]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-1/2 -left-1/4 size-[70vmax] rounded-full bg-blue-deep blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
          <h2 data-reveal className="font-display text-[clamp(2.8rem,7.4vw,6rem)] font-bold">
            {who.title}
          </h2>
          <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
            <p className="max-w-[40ch] text-lg text-cream">{who.body}</p>
            <p className="mt-5 hidden items-center gap-2 text-sm text-cream/85 md:flex">
              <Hand className="size-4" aria-hidden /> {who.hint}
            </p>
          </div>
        </div>

        <div ref={board} className="relative mt-12 flex flex-wrap justify-center gap-x-2.5 gap-y-5 py-4 sm:gap-x-4 sm:gap-y-6 md:mt-20 md:gap-x-6 md:gap-y-10 md:py-6">
          {who.tags.map((tag, i) => {
            const tone = bands[tag.tone];
            return (
              <motion.div
                key={tag.role}
                drag={!reduce}
                dragConstraints={board}
                dragElastic={0.18}
                dragTransition={{ power: 0.25, timeConstant: 260 }}
                onPointerDown={() => setTop(i)}
                initial={reduce ? false : { opacity: 0, scale: 1.25, rotate: tilts[i] * 2.4, y: -30 }}
                animate={
                  inView || reduce
                    ? { opacity: 1, scale: 1, rotate: tilts[i] * (compact ? 0.6 : 1), y: drops[i] * (compact ? 0.25 : 1) }
                    : undefined
                }
                transition={{ delay: reduce ? 0 : 0.08 * i, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={reduce ? undefined : { scale: 1.04, rotate: tilts[i] * 0.4 }}
                whileDrag={{ scale: 1.08, rotate: 0, cursor: "grabbing" }}
                style={{ zIndex: top === i ? 2 : 1 }}
                className="w-[calc(50%-0.4rem)] max-w-[264px] cursor-grab touch-pan-y select-none overflow-hidden rounded-[14px] bg-cream text-ink shadow-[0_24px_50px_-20px_rgb(0_0_0/0.55),0_2px_0_rgb(0_0_0/0.08)] sm:w-[264px] sm:rounded-[18px]"
              >
                <div className={`${tone.band} px-3.5 pb-2 pt-3 sm:px-5 sm:pb-2.5 sm:pt-3.5`}>
                  <p className={`font-display text-[1.5rem] font-extrabold leading-none sm:text-[2.1rem] tracking-[-0.02em] ${tone.hello}`}>HELLO</p>
                  <p className={`mt-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] sm:text-[0.7rem] ${tone.hello} opacity-80`}>I&apos;m</p>
                </div>
                <div className="px-3.5 pb-3 pt-2.5 sm:px-5 sm:pb-4 sm:pt-3">
                  <p className="font-marker text-[1.1rem] leading-[1.15] text-ink sm:text-[1.65rem]">{tag.role}</p>
                  <p className="mt-2 border-t border-ink/12 pt-2 text-[0.72rem] leading-snug text-ink/75 sm:mt-3 sm:pt-2.5 sm:text-[0.78rem]">
                    Here for: {tag.want}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
