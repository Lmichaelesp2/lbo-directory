// Events layer for LBO org-first pages.
// Reads the same Supabase project as the calendar site (events.group_id → organizations.id).
// Free tier: one week of events surfaced per org.

export type OrgEvent = {
  id: number;
  name: string;
  start_date: string;   // YYYY-MM-DD
  start_time: string | null;
  end_time: string | null;
  event_address: string | null;
  website: string | null;
  group_id: number;
};

// One-city-first rollout: only these city slugs get the events feature (teaser + modal + JSON-LD).
// Add the other slugs here to roll out: 'houston', 'dallas', 'austin'.
export const EVENTS_ENABLED_CITY_SLUGS: string[] = ['san-antonio'];

export function eventsEnabledForSlug(slug: string): boolean {
  return EVENTS_ENABLED_CITY_SLUGS.includes(slug);
}

const CITY_NAME_TO_SLUG: Record<string, string> = {
  'San Antonio': 'san-antonio',
  'Houston': 'houston',
  'Dallas': 'dallas',
  'Austin': 'austin',
};

export function citySlugForName(cityName: string): string | null {
  return CITY_NAME_TO_SLUG[cityName] || null;
}

export function lbcCityUrl(cityName: string): string {
  const slug = citySlugForName(cityName);
  return slug
    ? `https://www.localbusinesscalendars.com/texas/${slug}`
    : 'https://www.localbusinesscalendars.com';
}

// Parse a YYYY-MM-DD date string as a *local* calendar date (no timezone shift).
function parseYmd(ymd: string): Date {
  const [y, m, d] = ymd.split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

// "Tue Jul 14"
export function formatEventDate(ymd: string): string {
  const dt = parseYmd(ymd);
  return dt.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

// "8:30 AM" from "08:30"
export function formatEventTime(time: string | null): string | null {
  if (!time) return null;
  const [hStr, mStr] = time.split(':');
  let h = Number(hStr);
  const m = Number(mStr || 0);
  if (Number.isNaN(h)) return null;
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${String(m).padStart(2, '0')} ${ampm}`;
}

// One-line card teaser: "Tue Jul 14 · Monthly Lunch Mixer"
export function eventTeaser(ev: OrgEvent, maxName = 42): string {
  const name = ev.name.length > maxName ? ev.name.slice(0, maxName - 1).trimEnd() + '…' : ev.name;
  return `${formatEventDate(ev.start_date)} · ${name}`;
}

/**
 * Fetch this week's events (today → today+6) for a city, grouped by org id (group_id).
 * Server-only: uses the service key. Returns {} on any failure so the page still renders.
 */
export async function getUpcomingEventsByOrg(
  cityName: string
): Promise<Record<number, OrgEvent[]>> {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!SUPABASE_URL || !SERVICE_KEY) return {};

  const today = new Date();
  const iso = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const start = iso(today);
  const end = iso(new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000));

  const fields = ['id', 'name', 'start_date', 'start_time', 'end_time', 'event_address', 'website', 'group_id'].join(',');
  const params = new URLSearchParams({
    select: fields,
    city_calendar: `eq.${cityName}`,
    start_date: `gte.${start}`,
    order: 'start_date.asc,start_time.asc',
    limit: '1000',
  });
  params.append('start_date', `lte.${end}`);
  params.append('group_id', 'not.is.null');
  // Skip cancelled events if the flag is set.
  params.append('or', '(cancelled.is.null,cancelled.eq.false)');

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/events?${params}`, {
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        Accept: 'application/json',
      },
      // 6h ISR — matches the page revalidate window.
      next: { revalidate: 21600 },
    });
    if (!res.ok) return {};
    const rows = (await res.json()) as OrgEvent[];
    const byOrg: Record<number, OrgEvent[]> = {};
    for (const ev of rows) {
      if (ev.group_id == null) continue;
      (byOrg[ev.group_id] ||= []).push(ev);
    }
    return byOrg;
  } catch {
    return {};
  }
}
