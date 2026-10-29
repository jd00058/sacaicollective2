import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { partners } from "@/app/content";
import JoinButton from "./JoinButton";

export type PartnerLogo = { src: string; name: string };

export default function Partners({ logos }: { logos: PartnerLogo[] }) {
  const empty = Math.max(0, partners.slots - logos.length);

  return (
    <section id="partners" aria-labelledby="partners-title" className="relative border-t border-cream/10 bg-ink px-gutter py-[clamp(6rem,12vw,9rem)]">
      <div className="mx-auto grid max-w-[1400px] gap-14 md:grid-cols-[1fr_1.15fr] md:gap-20">
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

        <ul className="grid grid-cols-2 gap-px self-center overflow-hidden rounded-[24px] bg-cream/10 ring-1 ring-cream/10 sm:grid-cols-3">
          {logos.map((logo) => (
            <li key={logo.src} className="relative grid aspect-[3/2] place-items-center bg-ink p-8">
              <Image src={logo.src} alt={logo.name} fill sizes="200px" className="object-contain p-8 opacity-80 brightness-0 invert" />
            </li>
          ))}
          {Array.from({ length: empty }, (_, i) => (
            <li key={`slot-${i}`} className="grid aspect-[3/2] place-items-center bg-ink p-6 text-center text-[0.8rem] text-cream-3">
              <span>
                <span className="mx-auto mb-2 block h-4 w-16 rounded-full bg-cream/10" aria-hidden />
                Partner logo
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
