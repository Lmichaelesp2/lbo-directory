import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Auth client — uses anon key, persists session in browser
export const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export async function signUp(email: string, password: string, city: string) {
  const { data, error } = await supabaseAuth.auth.signUp({ email, password });
  if (error || !data.user) return { error };

  // Write to lbo_users table
  const { error: profileError } = await supabaseAuth
    .from('lbo_users')
    .insert({ id: data.user.id, email, city, source: 'lbo' });

  if (profileError) console.error('lbo_users insert error:', profileError);

  // Also subscribe to the LBC Monday newsletter for their city
  if (city) {
    const { error: subError } = await supabaseAuth
      .from('newsletter_subscriptions')
      .upsert({
        user_id:      data.user.id,
        email:        email.trim().toLowerCase(),
        city:         city,
        sub_calendar: null,
        status:       'active',
        source:       'lbo_signup',
      }, { onConflict: 'email,city,sub_calendar' });

    if (subError) console.error('newsletter_subscriptions insert error (lbo):', subError);
  }

  return { data };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabaseAuth.auth.signInWithPassword({ email, password });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabaseAuth.auth.signOut();
  return { error };
}

export async function getUser() {
  // Use getSession for client-side checks — reads from localStorage without a network round-trip
  const { data: { session } } = await supabaseAuth.auth.getSession();
  return session?.user ?? null;
}

export type LboUserProfile = {
  id: string;
  email: string;
  city: string | null;
  role: string;
  org_id: number | null;
};

export async function getLboUserProfile(): Promise<LboUserProfile | null> {
  const user = await getUser();
  if (!user) return null;
  const { data } = await supabaseAuth
    .from('lbo_users')
    .select('id, email, city, role, org_id')
    .eq('id', user.id)
    .single();
  // If no lbo_users row yet (e.g. signed up via LBC), still treat as logged in with default profile
  if (!data) {
    return { id: user.id, email: user.email ?? '', city: null, role: 'member', org_id: null };
  }
  return data as LboUserProfile;
}

export async function getSession() {
  const { data: { session } } = await supabaseAuth.auth.getSession();
  return session;
}
