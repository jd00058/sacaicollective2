"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "motion/react";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { hero, story } from "@/app/content";
import PeopleField from "./PeopleField";
import Magnetic from "./Magnetic";
import { useSite } from "./Providers";

// Hero + story share one sticky canvas, so the dots that start the page alone
// are the same dots that end it connected.
export default function Opening() {
  const wrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });

  return (
    <div ref={wrap} className="relative">
      <div className="sticky top-0 -mb-[100svh] h-svh overflow-hidden" aria-hidden="true">
        <div className="pointer-events-none absolute -left-[20%] top-[-30%] size-[70vmax] rounded-full bg-blue/25 blur-[120px]" />
        <div className="pointer-events-none absolute -right-[25%] bottom-[-40%] size-[60vmax] rounded-full bg-blue-deep/30 blur-[140px]" />
        <PeopleField progress={scrollYProgress} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>
      <Hero />
      <Intro />
      <Steps />
    </div>
  );
}

function Hero() {
  const { openJoin } = useSite();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative flex h-svh min-h-[640px] flex-col justify-end px-gutter pb-8 pt-28 md:pb-10">
      <motion.div style={{ y, opacity }} className="mx-auto w-full max-w-[1400px]">
        <h1 className="font-display text-[clamp(2.4rem,12.2vw,6rem)] font-bold">
          {hero.lines.map((line, i) => (
            <span key={line} className="hero-line">
              <span style={{ "--i": i } as React.CSSProperties} className={i === hero.lines.length - 1 ? "text-orange" : undefined}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <p className="fade-in max-w-[46ch] text-[1.05rem] text-cream-2 md:text-lg" style={{ "--d": "650ms" } as React.CSSProperties}>
            {hero.body}
          </p>
          <div className="fade-in flex flex-wrap items-center gap-x-6 gap-y-4" style={{ "--d": "800ms" } as React.CSSProperties}>
            <Magnetic>
              <button
                type="button"
                onClick={() => openJoin()}
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-orange pl-7 pr-2 text-base font-semibold text-ink transition-colors duration-300 hover:bg-cream"
              >
                {hero.primary}
                <span className="grid size-10 place-items-center rounded-full bg-ink text-cream transition-transform duration-500 ease-out-expo group-hover:rotate-[-45deg]">
                  <ArrowRight className="size-4" />
                </span>
              </button>
            </Magnetic>
            <a href="#events" className="link-draw py-1 text-base font-medium text-cream">
              {hero.secondary}
            </a>
          </div>
        </div>

        <div className="fade-in mt-10 flex items-center justify-between border-t border-cream/10 pt-5 text-[0.8rem] text-cream-3 md:mt-14" style={{ "--d": "1000ms" } as React.CSSProperties}>
          <span>{hero.footnote}</span>
          <span className="hidden sm:inline">38.58° N, 121.49° W</span>
          <span className="inline-flex items-center gap-2">
            Scroll <ArrowDownRight className="size-3.5" />
          </span>
        </div>
      </motion.div>
    </section>
  );
}

function Intro() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = story.intro.split(" ");

  return (
    <section id="why" className="relative px-gutter pb-[18vh] pt-[22vh]">
      <div className="mx-auto max-w-[1400px]">
        <p ref={ref} className="font-display max-w-[22ch] text-[clamp(2rem,4.6vw,3.9rem)] leading-[1.04]">
          {words.map((word, i) =>
            reduce ? (
              <span key={i}>{word} </span>
            ) : (
              <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                {word}
              </Word>
            ),
          )}
        </p>
        <p data-reveal className="font-display mt-10 text-[clamp(2rem,4.6vw,3.9rem)] leading-[1.04] text-orange">
          {story.turn}
        </p>
      </div>
    </section>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{" "}
    </motion.span>
  );
}

function Steps() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  if (reduce) {
    return (
      <section className="relative px-gutter pb-32">
        <ol className="mx-auto max-w-[1400px] space-y-20">
          {story.steps.map((s, i) => (
            <li key={s.from}>
              <StepCounter index={i} />
              <p className="font-display mt-6 text-[clamp(1.6rem,3.6vw,2.8rem)] font-semibold text-cream-3 line-through decoration-orange decoration-2">{s.from}</p>
              <p className="font-display text-[clamp(3.2rem,9vw,6rem)] font-bold">{s.to}</p>
              <p className="mt-4 max-w-[40ch] text-lg text-cream-2">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[330svh]" aria-label="How the community helps">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden px-gutter">
        <div className="relative mx-auto h-[min(72svh,560px)] w-full max-w-[1400px]">
          {story.steps.map((s, i) => (
            <Step key={s.from} index={i} total={story.steps.length} step={s} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCounter({ index }: { index: number }) {
  return (
    <p className="flex items-center gap-3 text-sm text-cream-3">
      <span className="tabular-nums text-cream">0{index + 1}</span>
      <span className="h-px w-10 bg-cream/25" />
      <span className="tabular-nums">0{story.steps.length}</span>
    </p>
  );
}

function Step({
  index,
  total,
  step,
  progress,
}: {
  index: number;
  total: number;
  step: (typeof story.steps)[number];
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const span = end - start;
  const at = (t: number) => start + span * t;
  const first = index === 0;
  const last = index === total - 1;

  const opacity = useTransform(
    progress,
    [at(0), at(0.1), at(0.88), at(1)],
    [first ? 1 : 0, 1, 1, last ? 1 : 0],
  );
  const lift = useTransform(progress, [at(0), at(0.1), at(0.88), at(1)], [first ? 0 : 40, 0, 0, last ? 0 : -40]);
  const strike = useTransform(progress, [at(0.12), at(0.4)], [0, 1]);
  const dim = useTransform(progress, [at(0.12), at(0.4)], [1, 0.4]);
  const reveal = useTransform(progress, [at(0.32), at(0.62)], ["105%", "0%"]);
  const bodyOpacity = useTransform(progress, [at(0.48), at(0.68)], [0, 1]);
  const bodyY = useTransform(progress, [at(0.48), at(0.68)], [16, 0]);

  return (
    <motion.div style={{ opacity, y: lift }} className="absolute inset-0 flex flex-col justify-center">
      <StepCounter index={index} />
      <motion.p style={{ opacity: dim }} className="font-display relative mt-8 w-fit text-[clamp(1.8rem,4.2vw,3.25rem)] font-semibold text-cream-2">
        {step.from}
        <motion.span
          aria-hidden
          style={{ scaleX: strike }}
          className="absolute left-[-0.08em] right-[-0.08em] top-[54%] h-[0.09em] origin-left rounded-full bg-orange"
        />
      </motion.p>
      <p className="font-display overflow-hidden pb-[0.08em] text-[clamp(2.4rem,13.5vw,6rem)] font-bold">
        <motion.span style={{ y: reveal }} className="inline-block">
          {step.to}
        </motion.span>
      </p>
      <motion.p style={{ opacity: bodyOpacity, y: bodyY }} className="mt-6 max-w-[38ch] text-lg text-cream-2 md:text-xl">
        {step.body}
      </motion.p>
    </motion.div>
  );
}
