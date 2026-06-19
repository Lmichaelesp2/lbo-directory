import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const city = request.nextUrl.searchParams.get('city');
  if (!city) return NextResponse.json({ error: 'city required' }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from('organizations')
    .select('id, name, city, category, group_type, description, home_page, calendar_website, facebook_url, instagram_url, linkedin_url, how_active, verified, group_address, group_zipcode, group_contact, group_email, group_phone_number, typical_title, membership_type, membership_fee_range, industries_served, event_format, event_size, formality, primary_value, guest_friendly, founded_year, national_affiliate, ai_match_tags')
    .eq('city', city)
    .not('archive', 'eq', true)
    .order('name')
    .limit(1000);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
