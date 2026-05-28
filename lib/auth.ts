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
  const { data: { user } } = await supabaseAuth.auth.getUser();
  return user;
}

export async function getSession() {
  const { data: { session } } = await supabaseAuth.auth.getSession();
  return session;
}
