import { gallery, photoEvents, photos as photoData } from "@/app/content";
import Photo, { type ResolvedPhoto } from "./Photo";

// A masonry wall of candid moments from past events. Tall and wide frames keep the
// photos' own shapes, and each one is captioned with the event it came from
// (on hover where there's a mouse; small phones rely on the footnote).
export default function Gallery({ photos }: { photos: Record<string, ResolvedPhoto> }) {
  return (
    <section aria-labelledby="gallery-title" className="relative bg-ink px-gutter pb-[clamp(6rem,14vw,11rem)]">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
          <h2 id="gallery-title" data-reveal className="font-display text-[clamp(2rem,5.1vw,4rem)]">
            {gallery.title}
          </h2>
          <p data-reveal style={{ "--d": "120ms" } as React.CSSProperties} className="max-w-[42ch] text-lg text-cream-2 md:justify-self-end">
            {gallery.body}
          </p>
        </div>

        <ul className="mt-14 columns-2 gap-3 sm:gap-4 md:mt-20 lg:columns-3 lg:gap-5">
          {gallery.shots.map((key, i) => {
            const data = photoData[key];
            return (
              <li
                key={key}
                data-reveal="clip"
                style={{ "--r": "20px", "--d": `${(i % 4) * 90}ms` } as React.CSSProperties}
                className="mb-3 break-inside-avoid sm:mb-4 lg:mb-5"
              >
                <figure className="group relative">
                  <Photo
                    photo={photos[key]}
                    sizes="(min-width: 1024px) 30vw, 50vw"
                    className={`w-full rounded-[20px] [&_img]:transition-transform [&_img]:duration-[1.2s] [&_img]:ease-out-expo group-hover:[&_img]:scale-[1.04] ${
                      data.ratio === "2/3" ? "aspect-[2/3]" : "aspect-[3/2]"
                    }`}
                  />
                  <figcaption className="pointer-events-none absolute bottom-3.5 left-3.5 hidden whitespace-nowrap rounded-full bg-ink/75 px-3 py-1 text-xs font-medium text-cream transition-[opacity,translate] duration-500 ease-out-expo sm:block [@media(hover:hover)]:translate-y-1 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100">
                    {photoEvents[data.event]}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>

        <p data-reveal className="mt-6 text-sm text-cream-3 md:mt-8">
          {gallery.footnote}
        </p>
      </div>
    </section>
  );
}
