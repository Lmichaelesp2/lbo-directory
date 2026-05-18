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
  public_category: string | null;
  group_type: string | null;
  description: string | null;
  home_page: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  linkedin_url: string | null;
  logo_url: string | null;
  claimed: boolean;
  claimed_at: string | null;
  paid_through: string | null;
  how_active: string | null;
  verified: boolean | null;
  archive: boolean | null;
};
