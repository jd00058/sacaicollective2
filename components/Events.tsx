import Image from "next/image";
import { ArrowUpRight, CalendarDays, MapPin, Users } from "lucide-react";
import { events, LUMA_URL } from "@/app/content";
import { formatDate, type LumaEvent } from "@/lib/luma";
import JoinButton from "./JoinButton";
import SeatMark from "./SeatMark";

export default function Events({ upcoming, past }: { upcoming: LumaEvent[]; past: LumaEvent[] }) {
  const [next, ...later] = upcoming;

  return (
    <section id="events" className="relative bg-ink px-gutter py-[clamp(6rem,14vw,11rem)]">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-end">
          <h2 data-reveal className="font-display max-w-[14ch] text-[clamp(2.8rem,7vw,5.5rem)] font-bold">
            {events.title}
          </h2>
          <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties} className="md:justify-self-end">
            <p className="max-w-[38ch] text-lg text-cream-2">{events.body}</p>
            <a href={LUMA_URL} target="_blank" rel="noreferrer" className="link-draw mt-5 inline-flex items-center gap-1.5 py-1 font-medium text-cream">
              luma.com/sacaic <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>

        <div className="mt-14 md:mt-20">{next ? <NextEvent event={next} /> : <Planning />}</div>

        {later.length > 0 && (
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {later.map((e) => (
              <PastRow key={e.id} event={e} upcoming />
            ))}
          </ul>
        )}

        {past.length > 0 && (
          <div className="mt-20 md:mt-28">
            <h3 data-reveal className="text-sm font-medium text-cream-3">
              {events.pastLabel}
            </h3>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {past.map((e, i) => (
                <PastRow key={e.id} event={e} delay={i * 90} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

function NextEvent({ event }: { event: LumaEvent }) {
  const d = formatDate(event);
  return (
    <article data-reveal className="grid overflow-hidden rounded-[28px] bg-navy ring-1 ring-cream/10 md:grid-cols-[1.2fr_1fr]">
      <div className="flex flex-col justify-between gap-10 p-7 md:p-12">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-medium text-orange">
            <span className="size-2 rounded-full bg-orange" aria-hidden /> Next event
          </p>
          <h3 className="font-display mt-5 text-[clamp(2rem,4.4vw,3.6rem)] font-bold leading-[1]">{event.name}</h3>
          <dl className="mt-6 space-y-2 text-cream-2">
            <div className="flex items-center gap-2.5">
              <dt className="sr-only">When</dt>
              <CalendarDays className="size-4" aria-hidden />
              <dd>
                {d.weekday}, {d.full} at {d.time}
              </dd>
            </div>
            {event.place && (
              <div className="flex items-center gap-2.5">
                <dt className="sr-only">Where</dt>
                <MapPin className="size-4" aria-hidden />
                <dd>{event.place}</dd>
              </div>
            )}
          </dl>
        </div>
        <a
          href={event.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-14 w-fit items-center gap-3 rounded-full bg-orange px-7 font-semibold text-ink transition-colors duration-300 hover:bg-cream"
        >
          RSVP on Luma <ArrowUpRight className="size-4" aria-hidden />
        </a>
      </div>
      {event.cover && (
        <div className="relative min-h-[280px]">
          <Image src={event.cover} alt="" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
        </div>
      )}
    </article>
  );
}

function Planning() {
  return (
    <div data-reveal className="relative grid overflow-hidden rounded-[28px] bg-navy ring-1 ring-cream/10 md:grid-cols-[1.4fr_1fr]">
      <div aria-hidden className="pointer-events-none absolute -bottom-1/2 -right-1/4 size-[60vmax] rounded-full bg-blue/35 blur-[110px]" />
      <div className="relative p-7 md:p-12">
        <p className="inline-flex items-center gap-2.5 text-sm font-medium text-orange">
          <span className="relative flex size-2.5" aria-hidden>
            <span className="seat-pulse absolute inline-flex size-full rounded-full bg-orange" />
            <span className="relative inline-flex size-2.5 rounded-full bg-orange" />
          </span>
          Next event
        </p>
        <h3 className="font-display mt-5 max-w-[16ch] text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1]">{events.emptyTitle}</h3>
        <p className="mt-5 max-w-[44ch] text-lg text-cream-2">{events.emptyBody}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href={LUMA_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-14 items-center gap-2.5 rounded-full bg-orange px-7 font-semibold text-ink transition-colors duration-300 hover:bg-cream"
          >
            Follow the calendar <ArrowUpRight className="size-4" aria-hidden />
          </a>
          <JoinButton className="inline-flex h-14 items-center rounded-full px-7 font-semibold text-cream ring-1 ring-cream/25 transition-colors duration-300 hover:bg-cream hover:text-ink">
            Get the invite by email
          </JoinButton>
        </div>
      </div>
      <div className="relative hidden place-items-center p-12 md:grid">
        <SeatMark className="size-[min(22vw,260px)] text-cream/85" />
      </div>
    </div>
  );
}

function PastRow({ event, delay = 0, upcoming = false }: { event: LumaEvent; delay?: number; upcoming?: boolean }) {
  const d = formatDate(event);
  return (
    <li data-reveal style={{ "--d": `${delay}ms` } as React.CSSProperties}>
      <a
        href={event.url}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center gap-5 rounded-[22px] bg-ink-2 p-3 pr-6 ring-1 ring-cream/8 transition-[background-color,box-shadow] duration-500 hover:bg-navy hover:ring-cream/15"
      >
        <div className="relative size-24 shrink-0 overflow-hidden rounded-[14px] bg-navy md:size-28">
          {event.cover && (
            <Image
              src={event.cover}
              alt=""
              fill
              sizes="112px"
              className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
            />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-cream-3">
            {upcoming ? `${d.weekday}, ` : ""}
            {d.month} {d.day}
            {!upcoming && `, ${new Date(event.startAt).getFullYear()}`}
          </p>
          <p className="font-display mt-1 text-[1.35rem] font-semibold leading-tight tracking-[-0.02em]">{event.name}</p>
          <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-cream-3">
            {event.place && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5" aria-hidden /> {event.place}
              </span>
            )}
            {event.guests > 0 && (
              <span className="inline-flex items-center gap-1.5">
                <Users className="size-3.5" aria-hidden /> {event.guests} {upcoming ? "going" : "went"}
              </span>
            )}
          </p>
        </div>
        <ArrowUpRight
          aria-hidden
          className="size-5 shrink-0 text-cream-3 transition-[transform,color] duration-500 ease-out-expo group-hover:rotate-45 group-hover:text-orange"
        />
      </a>
    </li>
  );
}
