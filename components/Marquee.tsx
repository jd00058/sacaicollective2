import { topics } from "@/app/content";

export default function Marquee() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {topics.map((t) => (
        <li key={t} className="flex items-center whitespace-nowrap">
          <span className="font-display px-6 text-[clamp(1.1rem,2.2vw,1.75rem)]">{t}</span>
          <span aria-hidden className="size-2.5 rounded-full bg-orange" />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Topics we cover" className="marquee relative overflow-hidden border-y border-cream/10 bg-ink py-6">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </section>
  );
}
