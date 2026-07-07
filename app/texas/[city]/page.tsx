import { Metadata } from 'next';
import { CITY_SLUG_TO_NAME, CITY_CONTENT, CitySlug } from '@/lib/config';
import CityPageClient from './CityPageClient';
import { getOrgsForCity } from '@/lib/orgsServer';
import { getUpcomingEventsByOrg, eventsEnabledForSlug, OrgEvent } from '@/lib/events';
import { Organization } from '@/lib/supabase';

// 6h ISR (matches LBC). On-demand /api/revalidate refreshes immediately after a pipeline push.
export const revalidate = 21600;

type Props = { params: { city: string } };

// Build Organization + Event JSON-LD (@graph) for orgs that have events this week.
function buildJsonLd(cityName: string, citySlug: string, orgs: Organization[], eventsByOrg: Record<number, OrgEvent[]>): string {
  const lboBase = `https://www.localbusinessorganizations.com/texas/${citySlug}`;
  const graph: any[] = [];

  for (const org of orgs) {
    const evs = eventsByOrg[org.id];
    if (!evs || evs.length === 0) continue;

    const orgId = `${lboBase}#org-${org.id}`;
    graph.push({
      '@type': 'Organization',
      '@id': orgId,
      name: org.name,
      ...(org.home_page ? { url: org.home_page } : {}),
      address: { '@type': 'PostalAddress', addressLocality: cityName, addressRegion: 'TX', addressCountry: 'US' },
    });

    for (const ev of evs) {
      const time = ev.start_time && /^\d{1,2}:\d{2}/.test(ev.start_time) ? ev.start_time.slice(0, 5) : null;
      const startDate = time ? `${ev.start_date}T${time}:00` : ev.start_date;
      graph.push({
        '@type': 'Event',
        name: ev.name,
        startDate,
        eventStatus: 'https://schema.org/EventScheduled',
        organizer: { '@id': orgId },
        ...(ev.website ? { url: ev.website } : {}),
        ...(ev.event_address
          ? { location: { '@type': 'Place', name: ev.event_address, address: `${ev.event_address}, ${cityName}, TX` } }
          : { location: { '@type': 'Place', name: `${cityName}, TX`, address: `${cityName}, TX` } }),
      });
    }
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cityName = CITY_SLUG_TO_NAME[params.city as CitySlug];
  const content = cityName ? CITY_CONTENT[cityName] : null;

  if (!cityName || !content) {
    return { title: 'City Not Found | Local Business Organizations' };
  }

  return {
    title: content.seoTitle,
    description: content.seoDescription,
    openGraph: {
      title: content.seoTitle,
      description: content.seoDescription,
      url: `https://www.localbusinessorganizations.com/texas/${params.city}`,
      siteName: 'Local Business Organizations',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: content.seoTitle,
      description: content.seoDescription,
    },
    alternates: {
      canonical: `https://www.localbusinessorganizations.com/texas/${params.city}`,
    },
  };
}

export default async function CityPage({ params }: Props) {
  const cityName = CITY_SLUG_TO_NAME[params.city as CitySlug];

  // One-city-first rollout: only enabled slugs get server-seeded orgs + events + JSON-LD.
  // Every other city keeps the existing client-fetch behavior untouched.
  if (!cityName || !eventsEnabledForSlug(params.city)) {
    return <CityPageClient />;
  }

  const [orgs, eventsByOrg] = await Promise.all([
    getOrgsForCity(cityName),
    getUpcomingEventsByOrg(cityName),
  ]);

  const jsonLd = buildJsonLd(cityName, params.city, orgs, eventsByOrg);
  const hasEvents = Object.keys(eventsByOrg).length > 0;

  return (
    <>
      {hasEvents && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}
      <CityPageClient initialOrgs={orgs} eventsByOrg={eventsByOrg} />
    </>
  );
}
