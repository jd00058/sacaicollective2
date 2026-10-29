"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { X } from "lucide-react";
import { JOIN_FORM_URL, LUMA_URL } from "@/app/content";
import LogoMark from "./LogoMark";

const copy = {
  join: {
    title: "Save yourself a seat.",
    body: "Leave your details and we'll email you when the next event is posted. That's it.",
    points: ["Event invites for the Sacramento region", "Workshops for every level, beginners included", "A room full of people figuring out AI too"],
  },
  partner: {
    title: "Let's build this together.",
    body: "Venues, sponsors, speakers and partners keep these events open to everyone. Leave your details and mention what you have in mind.",
    points: ["Host an event at your space", "Sponsor a workshop or build day", "Speak, teach or demo for the community"],
  },
};

export default function JoinDialog({ intent, onClose }: { intent: "join" | "partner" | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const c = copy[intent ?? "join"];

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (intent && !dialog.open) {
      dialog.showModal();
      dialog.querySelector<HTMLButtonElement>("[data-close]")?.focus();
    }
    if (!intent && dialog.open) dialog.close();
  }, [intent]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      aria-labelledby="join-title"
      className="join-dialog m-auto w-[min(1040px,calc(100vw-1.5rem))] max-h-[calc(100svh-1.5rem)] overflow-hidden rounded-[28px] bg-ink-2 p-0 text-cream ring-1 ring-cream/10 backdrop:bg-ink/80 backdrop:backdrop-blur-sm"
    >
      {intent && (
        <div className="grid h-[calc(100svh-1.5rem)] grid-rows-[auto_minmax(0,1fr)] md:h-[min(780px,calc(100svh-1.5rem))] md:grid-cols-[0.85fr_1fr] md:grid-rows-1">
          <div className="relative overflow-hidden p-6 pr-16 md:p-10">
            <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-blue/40 blur-[90px]" />
            <div className="relative">
              <LogoMark className="h-11 text-orange" />
              <h2 id="join-title" className="font-display mt-8 text-[clamp(1.6rem,2.9vw,2.4rem)]">
                {c.title}
              </h2>
              <p className="mt-4 max-w-[38ch] text-cream-2">{c.body}</p>
              <ul className="mt-8 hidden space-y-3 text-sm text-cream-2 md:block">
                {c.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-orange" />
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-10 hidden text-sm text-cream-3 md:block">
                Just browsing?{" "}
                <a href={LUMA_URL} target="_blank" rel="noreferrer" className="link-draw text-cream">
                  See the calendar on Luma
                </a>
              </p>
            </div>
          </div>
          <div className="relative min-h-0 overflow-y-auto overscroll-contain bg-cream" data-lenis-prevent>
            <iframe
              src={JOIN_FORM_URL}
              id="inline-oMXF7bIGVIB75TA29WGx"
              title="Join AI Collective Sacramento"
              className="block h-full min-h-[763px] w-full border-0"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-activation-type="alwaysActivated"
              data-deactivation-type="neverDeactivate"
              data-form-name="LP Signup"
              data-height="763"
              data-layout-iframe-id="inline-oMXF7bIGVIB75TA29WGx"
              data-form-id="oMXF7bIGVIB75TA29WGx"
            />
            <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
          </div>
          <button
            type="button"
            onClick={onClose}
            data-close
            aria-label="Close"
            className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-ink/70 text-cream ring-1 ring-cream/15 backdrop-blur transition-colors hover:bg-ink"
          >
            <X className="size-5" />
          </button>
        </div>
      )}
    </dialog>
  );
}
