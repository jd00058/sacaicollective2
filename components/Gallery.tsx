import { gallery } from "@/app/content";
import Photo, { type ResolvedPhoto } from "./Photo";

export default function Gallery({ photos }: { photos: Record<string, ResolvedPhoto> }) {
  const [room, conversation, laughing, group] = gallery.shots.map((k) => photos[k]);
  const r = { "--r": "24px" } as React.CSSProperties;

  return (
    <section aria-labelledby="gallery-title" className="relative bg-ink px-gutter pb-[clamp(6rem,14vw,11rem)]">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
          <h2 id="gallery-title" data-reveal className="font-display text-[clamp(2.8rem,7vw,5.5rem)] font-bold">
            {gallery.title}
          </h2>
          <p data-reveal style={{ "--d": "120ms" } as React.CSSProperties} className="max-w-[42ch] text-lg text-cream-2 md:justify-self-end">
            {gallery.body}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-12 md:gap-5">
          <div data-reveal="clip" style={r} className="md:col-span-7 md:row-span-2">
            <Photo photo={room} className="aspect-[4/5] h-full w-full rounded-[24px] md:aspect-auto md:min-h-[640px]" sizes="(min-width: 768px) 58vw, 100vw" />
          </div>
          <div data-reveal="clip" style={{ ...r, "--d": "120ms" } as React.CSSProperties} className="md:col-span-5">
            <Photo photo={conversation} className="aspect-[4/3] w-full rounded-[24px]" sizes="(min-width: 768px) 42vw, 100vw" />
          </div>
          <div data-reveal="clip" style={{ ...r, "--d": "220ms" } as React.CSSProperties} className="md:col-span-5">
            <Photo photo={laughing} className="aspect-[4/3] w-full rounded-[24px]" sizes="(min-width: 768px) 42vw, 100vw" />
          </div>
          <div data-reveal="clip" style={r} className="md:col-span-12">
            <Photo photo={group} className="aspect-[4/3] w-full rounded-[24px] md:aspect-[21/8]" sizes="100vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
