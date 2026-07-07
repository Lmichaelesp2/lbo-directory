import { Organization } from '@/lib/supabase';

const ORG_FIELDS = [
  'id', 'name', 'city', 'category', 'group_type', 'description', 'home_page', 'calendar_website',
  'facebook_url', 'instagram_url', 'linkedin_url', 'how_active', 'verified', 'group_address',
  'group_zipcode', 'group_contact', 'group_email', 'group_phone_number', 'typical_title',
  'membership_type', 'membership_fee_range', 'industries_served', 'event_format', 'event_size',
  'formality', 'primary_value', 'guest_friendly', 'founded_year', 'national_affiliate', 'ai_match_tags',
].join(',');

/**
 * Server-side fetch of active organizations for a city — mirrors /api/organizations
 * so the SSR-seeded list matches what the client route would have loaded.
 * Returns [] on any failure so the page still renders.
 */
export async function getOrgsForCity(cityName: string): Promise<Organization[]> {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!SUPABASE_URL || !SERVICE_KEY) return [];

  const params = new URLSearchParams({
    select: ORG_FIELDS,
    city: `eq.${cityName}`,
    order: 'name.asc',
    limit: '1000',
  });
  params.append('or', '(archive.is.null,archive.eq.false)');

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/organizations?${params}`, {
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        Accept: 'application/json',
      },
      next: { revalidate: 21600 },
    });
    if (!res.ok) return [];
    return (await res.json()) as Organization[];
  } catch {
    return [];
  }
}
