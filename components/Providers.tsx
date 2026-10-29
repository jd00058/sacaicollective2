"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import JoinDialog from "./JoinDialog";

type JoinIntent = "join" | "partner";

type SiteContext = {
  openJoin: (intent?: JoinIntent) => void;
  lenis: React.RefObject<Lenis | null>;
};

const Ctx = createContext<SiteContext | null>(null);

export function useSite() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSite must be used inside <Providers>");
  return ctx;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const lenis = useRef<Lenis | null>(null);
  const [intent, setIntent] = useState<JoinIntent | null>(null);

  // Smooth scrolling, skipped entirely for reduced-motion users.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const instance = new Lenis({ autoRaf: true, lerp: 0.11, anchors: { offset: -24 } });
    lenis.current = instance;
    return () => {
      instance.destroy();
      lenis.current = null;
    };
  }, []);

  // Scroll reveals: tag elements with data-reveal and they ease in the first time they enter view.
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window) || document.visibilityState === "hidden") {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const openJoin = useCallback((next: JoinIntent = "join") => setIntent(next), []);
  const close = useCallback(() => setIntent(null), []);

  useEffect(() => {
    if (intent) lenis.current?.stop();
    else lenis.current?.start();
  }, [intent]);

  return (
    <Ctx.Provider value={{ openJoin, lenis }}>
      {children}
      <JoinDialog intent={intent} onClose={close} />
    </Ctx.Provider>
  );
}
