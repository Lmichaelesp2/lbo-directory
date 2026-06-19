import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(request: NextRequest) {
  const city = request.nextUrl.searchParams.get('city');
  if (!city) return NextResponse.json({ error: 'city required' }, { status: 400 });

  // Use raw fetch with Prefer: count=exact and range header to bypass PostgREST row caps
  const fields = [
    'id','name','city','category','group_type','description','home_page','calendar_website',
    'facebook_url','instagram_url','linkedin_url','how_active','verified','group_address',
    'group_zipcode','group_contact','group_email','group_phone_number','typical_title',
    'membership_type','membership_fee_range','industries_served','event_format','event_size',
    'formality','primary_value','guest_friendly','founded_year','national_affiliate','ai_match_tags'
  ].join(',');

  const params = new URLSearchParams({
    select: fields,
    city: `eq.${city}`,
    order: 'name.asc',
    limit: '1000',
  });
  // Exclude only explicitly archived orgs (archive=true); treat NULL as active
  params.append('or', '(archive.is.null,archive.eq.false)');

  const res = await fetch(`${SUPABASE_URL}/rest/v1/organizations?${params}`, {
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Accept': 'application/json',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ error: text }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
