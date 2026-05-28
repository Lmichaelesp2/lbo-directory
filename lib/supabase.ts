import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || supabaseAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

export type Organization = {
  id: number;
  name: string;
  city: string;
  category: string | null;
  group_type: string | null;
  description: string | null;
  home_page: string | null;
  calendar_website: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  linkedin_url: string | null;
  how_active: string | null;
  verified: boolean | null;
  archive: boolean | null;
  group_address: string | null;
  group_zipcode: number | null;
  group_contact: string | null;
  group_email: string | null;
  group_phone_number: string | null;
  internal_type: string | null;
  member_type: string | null;
  typical_title: string | null;
  membership_type: string | null;
  membership_fee_range: string | null;
  industries_served: string | null;
  event_format: string | null;
  event_size: string | null;
  formality: string | null;
  primary_value: string | null;
  guest_friendly: string | null;
  founded_year: string | null;
  national_affiliate: string | null;
  ai_notes: string | null;
  ai_match_tags: string | null;
  tier: string | null;
  notes: string | null;
};
