"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "motion/react";
import { photoEvents, photos as photoData, room } from "@/app/content";
import Photo, { type ResolvedPhoto } from "./Photo";

// Right after the dots gather into a network, the real room opens up: the photo
// grows from a framed card to full bleed, pins, and the line lands on top of it.
// Reduced motion gets the finished state with no pinning (see globals.css).
export default function RoomReveal({ photos }: { photos: Record<string, ResolvedPhoto> }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });

  const inset = useTransform(scrollYProgress, [0.05, 0.55], [12, 0]);
  const radius = useTransform(scrollYProgress, [0.05, 0.55], [28, 0]);
  const clipPath = useMotionTemplate`inset(${inset}% ${inset}% ${inset}% ${inset}% round ${radius}px)`;
  const scale = useTransform(scrollYProgress, [0.05, 0.55], [1.18, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.5, 0.72], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.5, 0.72], [36, 0]);

  const photo = photos[room.photo];

  return (
    <section ref={ref} aria-labelledby="room-title" className="room-reveal relative h-[200svh] bg-ink">
      <div className="room-reveal-pin sticky top-0 h-svh overflow-hidden">
        <motion.div style={{ clipPath }} className="room-reveal-frame absolute inset-0">
          <motion.div style={{ scale }} className="room-reveal-frame absolute inset-0">
            <Photo photo={photo} sizes="100vw" className="h-full w-full" />
          </motion.div>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/5" />
        </motion.div>

        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="room-reveal-text absolute inset-x-0 bottom-0 px-gutter pb-[clamp(2.5rem,7vh,5rem)]"
        >
          <div className="mx-auto max-w-[1400px]">
            <h2 id="room-title" className="font-display text-[clamp(2.2rem,6.6vw,4.4rem)]">
              <span className="block">{room.title[0]}</span>
              <span className="block text-orange">{room.title[1]}</span>
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
              <p className="max-w-[52ch] text-lg text-cream md:text-xl">{room.body}</p>
              <p className="w-fit rounded-full bg-ink/70 px-3 py-1.5 text-xs font-medium text-cream-2 ring-1 ring-cream/15">
                {photoEvents[photoData[room.photo].event]}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
