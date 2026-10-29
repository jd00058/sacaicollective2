import { LUMA_CALENDAR_ID } from "@/app/content";

export type LumaEvent = {
  id: string;
  name: string;
  url: string;
  startAt: string;
  timezone: string;
  place: string | null;
  guests: number;
  cover: string | null;
};

// Used when Luma can't be reached at build/revalidate time, so the section never renders empty.
const SNAPSHOT_PAST: LumaEvent[] = [
  {
    id: "n8n-g5r2",
    name: "n8n Sacramento Community Meetup",
    url: "https://luma.com/n8n-g5r2",
    startAt: "2026-06-20T01:00:00.000Z",
    timezone: "America/Los_Angeles",
    place: "Sacramento, CA",
    guests: 30,
    cover: "https://images.lumacdn.com/uploads/5j/fcd8704f-7b1b-4fde-b90e-63fcca70940c.jpg",
  },
  {
    id: "aic-branding",
    name: "Brand Building With AI (w/ The AI Collective)",
    url: "https://luma.com/aic-branding",
    startAt: "2026-06-17T01:00:00.000Z",
    timezone: "America/Los_Angeles",
    place: "Rancho Cordova, CA",
    guests: 0,
    cover: "https://images.lumacdn.com/uploads/kj/2b50c6d9-03b6-4c3b-9bac-ff73e8282194.jpg",
  },
];

type Entry = {
  guest_count?: number;
  event: {
    api_id: string;
    name: string;
    url: string;
    start_at: string;
    timezone?: string;
    cover_url?: string | null;
    geo_address_info?: { city_state?: string; city?: string } | null;
  };
};

async function fetchPeriod(period: "future" | "past"): Promise<LumaEvent[]> {
  const url = `https://api2.luma.com/calendar/get-items?calendar_api_id=${LUMA_CALENDAR_ID}&period=${period}&pagination_limit=20`;
  const res = await fetch(url, { next: { revalidate: 1800 }, signal: AbortSignal.timeout(6000) });
  if (!res.ok) throw new Error(`Luma ${period} ${res.status}`);
  const data = (await res.json()) as { entries?: Entry[] };
  return (data.entries ?? []).map(({ event, guest_count }) => ({
    id: event.api_id,
    name: event.name,
    url: `https://luma.com/${event.url}`,
    startAt: event.start_at,
    timezone: event.timezone ?? "America/Los_Angeles",
    place: event.geo_address_info?.city_state ?? event.geo_address_info?.city ?? null,
    guests: guest_count ?? 0,
    cover: event.cover_url ?? null,
  }));
}

export async function getEvents(): Promise<{ upcoming: LumaEvent[]; past: LumaEvent[] }> {
  const [upcoming, past] = await Promise.allSettled([fetchPeriod("future"), fetchPeriod("past")]);
  return {
    upcoming: upcoming.status === "fulfilled" ? upcoming.value.sort((a, b) => a.startAt.localeCompare(b.startAt)) : [],
    past:
      past.status === "fulfilled" && past.value.length > 0
        ? past.value.sort((a, b) => b.startAt.localeCompare(a.startAt)).slice(0, 4)
        : SNAPSHOT_PAST,
  };
}

export function formatDate(e: LumaEvent) {
  const d = new Date(e.startAt);
  const tz = e.timezone;
  return {
    month: d.toLocaleString("en-US", { month: "short", timeZone: tz }),
    day: d.toLocaleString("en-US", { day: "numeric", timeZone: tz }),
    weekday: d.toLocaleString("en-US", { weekday: "long", timeZone: tz }),
    time: d.toLocaleString("en-US", { hour: "numeric", minute: "2-digit", timeZone: tz }),
    full: d.toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: tz }),
  };
}
