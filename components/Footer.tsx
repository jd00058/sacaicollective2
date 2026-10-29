"use client";

import { useEffect, useState } from "react";
import { footer, LUMA_URL, nav } from "@/app/content";
import { useSite } from "./Providers";
import SeatMark from "./SeatMark";

function useSacramentoTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/Los_Angeles" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Footer() {
  const { openJoin } = useSite();
  const time = useSacramentoTime();

  return (
    <footer className="relative overflow-hidden border-t border-cream/10 bg-ink px-gutter pt-16">
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <SeatMark className="size-9 text-cream" />
          <p className="mt-6 max-w-[44ch] text-cream-2">{footer.line}</p>
        </div>
        <nav aria-label="Footer" className="text-sm">
          <p className="text-cream-3">Explore</p>
          <ul className="mt-4 space-y-2.5">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="link-draw text-cream">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="text-sm">
          <p className="text-cream-3">Get involved</p>
          <ul className="mt-4 space-y-2.5">
            <li>
              <button type="button" onClick={() => openJoin()} className="link-draw text-cream">
                Join the collective
              </button>
            </li>
            <li>
              <a href={LUMA_URL} target="_blank" rel="noreferrer" className="link-draw text-cream">
                Events on Luma
              </a>
            </li>
            <li>
              <button type="button" onClick={() => openJoin("partner")} className="link-draw text-cream">
                Partner with us
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1400px] flex-wrap items-center justify-between gap-4 border-t border-cream/10 py-6 text-[0.8rem] text-cream-3">
        <p>
          © {new Date().getFullYear()} AI Collective Sacramento · {footer.chapter}
        </p>
        <p className="tabular-nums" suppressHydrationWarning>
          Sacramento{time ? `, ${time}` : ""}
        </p>
      </div>

      <p
        aria-hidden
        className="font-display pointer-events-none mx-auto -mb-[0.2em] max-w-[1400px] select-none text-center text-[clamp(4rem,17.5vw,16rem)] font-extrabold leading-[0.8] text-cream/[0.06]"
        style={{ fontVariationSettings: '"opsz" 96, "wdth" 75', letterSpacing: "-0.04em" }}
      >
        Sacramento
      </p>
    </footer>
  );
}
