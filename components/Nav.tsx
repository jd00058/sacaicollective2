"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "motion/react";
import { nav } from "@/app/content";
import { useSite } from "./Providers";
import SeatMark from "./SeatMark";

export default function Nav() {
  const { openJoin } = useSite();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 600 && y > prev && !menu);
  });

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 px-gutter pt-3"
        style={{ zIndex: "var(--z-nav)" }}
      >
        <nav
          aria-label="Main"
          className={`mx-auto flex h-14 max-w-[1400px] items-center justify-between rounded-full pl-4 pr-1.5 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
            scrolled ? "bg-ink/75 shadow-[0_0_0_1px_rgb(245_240_230/0.08)] backdrop-blur-xl" : "bg-transparent"
          }`}
        >
          <a href="#top" className="flex items-center gap-2.5" aria-label="AI Collective Sacramento, back to top">
            <SeatMark className="size-7 text-cream" />
            <span className="font-display text-[1.05rem] font-semibold leading-none tracking-[-0.02em]">
              AI Collective <span className="text-cream/65">Sacramento</span>
            </span>
          </a>

          <div className="hidden items-center gap-8 text-sm text-cream-2 md:flex">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="link-draw py-1 transition-colors hover:text-cream">
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => openJoin()}
              className="h-11 rounded-full bg-cream px-5 text-sm font-semibold text-ink transition-[background-color,transform] duration-300 hover:bg-orange active:scale-[0.97]"
            >
              Join
            </button>
            <button
              type="button"
              onClick={() => setMenu((m) => !m)}
              aria-expanded={menu}
              aria-controls="mobile-menu"
              aria-label={menu ? "Close menu" : "Open menu"}
              className="grid size-11 place-items-center rounded-full text-cream ring-1 ring-cream/15 md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span className={`absolute left-0 top-0 h-px w-4 bg-current transition-transform duration-300 ${menu ? "translate-y-1.5 rotate-45" : ""}`} />
                <span className={`absolute bottom-0 left-0 h-px w-4 bg-current transition-transform duration-300 ${menu ? "-translate-y-1.5 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 flex flex-col justify-end bg-blue px-gutter pb-10 md:hidden"
            style={{ zIndex: "calc(var(--z-nav) - 1)" }}
          >
            <ul className="space-y-1">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a href={item.href} onClick={() => setMenu(false)} className="font-display block py-1 text-[clamp(2.6rem,12vw,4rem)] font-bold">
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                setMenu(false);
                openJoin();
              }}
              className="mt-10 h-14 rounded-full bg-orange text-base font-semibold text-ink"
            >
              Join the collective
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
