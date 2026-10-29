import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { partners } from "@/app/content";
import JoinButton from "./JoinButton";

export type PartnerLogo = { src: string; name: string; width: number; height: number };

// Wall columns at the base, sm and lg breakpoints. Each layout's last row is topped up with open seats.
const COLUMNS = [2, 3, 5] as const;

// Similar visual weight for every logo: width grows a little faster than the square root of the
// aspect ratio, so long wordmarks (thin strokes, small type) aren't dwarfed by square marks.
const logoWidth = ({ width, height }: PartnerLogo) => `${Math.min(64, 30 * (width / height) ** 0.6)}%`;

export default function Partners({ logos }: { logos: PartnerLogo[] }) {
  const missing = COLUMNS.map((c) => (c - (logos.length % c)) % c);
  const seatClass = (i: number) =>
    [i < missing[0] ? "grid" : "hidden", i < missing[1] ? "sm:grid" : "sm:hidden", i < missing[2] ? "lg:grid" : "lg:hidden"].join(" ");
  const m = partners.managing;

  return (
    <section id="partners" aria-labelledby="partners-title" className="relative border-t border-cream/10 bg-ink px-gutter py-[clamp(6rem,12vw,9rem)]">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 md:grid-cols-[1fr_1.15fr] md:items-center md:gap-16">
          <div>
            <h2 id="partners-title" data-reveal className="font-display text-[clamp(1.9rem,4.4vw,3.5rem)]">
              {partners.title}
            </h2>
            <p data-reveal style={{ "--d": "100ms" } as React.CSSProperties} className="mt-6 max-w-[44ch] text-lg text-cream-2">
              {partners.body}
            </p>
            <div data-reveal style={{ "--d": "180ms" } as React.CSSProperties}>
              <JoinButton
                intent="partner"
                className="group mt-9 inline-flex h-14 items-center gap-3 rounded-full px-7 font-semibold text-cream ring-1 ring-cream/25 transition-colors duration-300 hover:bg-cream hover:text-ink"
              >
                {partners.cta}
                <ArrowRight className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" aria-hidden />
              </JoinButton>
            </div>
          </div>

          {/* Sac Tech Week in its own colours: void card, violet halo, white rabbit that hops on hover. */}
          <a
            href={m.href}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal="clip"
            style={{ "--r": "28px", "--d": "120ms" } as React.CSSProperties}
            className="stw-card group @container relative block overflow-hidden rounded-[28px] ring-1 ring-[#c7a8ff]/15 transition-[box-shadow] duration-500 hover:ring-[#c7a8ff]/35"
          >
            <div className="relative flex flex-col gap-8 p-8 @md:flex-row @md:items-center @md:gap-10 @md:p-10">
              <div className="relative aspect-[715/575] w-36 shrink-0 @md:w-44">
                <div aria-hidden className="stw-halo pointer-events-none absolute -inset-[70%] rounded-full" />
                <Image src="/brand/stw-rabbit.png" alt="" fill sizes="176px" className="stw-rabbit object-contain" />
                <Image src="/brand/stw-letters.png" alt="" fill sizes="176px" className="object-contain" />
              </div>
              <div className="relative">
                <p>
                  <span className="block text-base font-medium text-cream-2">{m.role}</span>
                  <span className="mt-2 block font-display text-[clamp(1.6rem,3.2vw,2.5rem)] leading-[1.3] text-cream">{m.name}</span>
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#c7a8ff]">
                  {m.linkLabel}
                  <ArrowUpRight
                    className="size-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </span>
              </div>
            </div>
          </a>
        </div>

        {logos.length > 0 && (
          <ul
            data-reveal
            style={{ "--d": "120ms" } as React.CSSProperties}
            className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-[24px] bg-cream/10 ring-1 ring-cream/10 sm:grid-cols-3 md:mt-20 lg:grid-cols-5"
          >
            {logos.map((logo) => (
              <li key={logo.src} className="group grid aspect-[3/2] place-items-center bg-ink">
                <div className="relative" style={{ width: logoWidth(logo), aspectRatio: `${logo.width} / ${logo.height}` }}>
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    fill
                    sizes="(min-width: 1024px) 170px, (min-width: 640px) 150px, 110px"
                    className="object-contain opacity-70 brightness-0 invert transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>
              </li>
            ))}
            {Array.from({ length: Math.max(...missing) }, (_, i) => (
              <li key={`seat-${i}`} className={`${seatClass(i)} aspect-[3/2] bg-ink`}>
                <JoinButton
                  intent="partner"
                  className="grid size-full place-content-center justify-items-center gap-3 text-[0.8rem] text-cream-3 transition-colors duration-300 hover:bg-cream/[0.03] hover:text-cream"
                >
                  <span className="size-2.5 rounded-full bg-orange ring-4 ring-orange/20" aria-hidden />
                  <span>
                    {partners.openSeat}
                    <span className="sr-only">: partner with us</span>
                  </span>
                </JoinButton>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
