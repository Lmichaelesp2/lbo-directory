'use client';
import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { signIn } from '@/lib/auth';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: err } = await signIn(form.email, form.password);
    if (err) {
      setError('Invalid email or password. Please try again.');
      setLoading(false);
      return;
    }
    router.push(redirectTo);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-1)', display: 'block', marginBottom: '6px' }}>
          Email address
        </label>
        <input type="email" required placeholder="you@example.com"
          value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          style={{ width: '100%', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: 'var(--fg-1)', outline: 'none', fontFamily: 'var(--font-sans)', boxSizing: 'border-box' }} />
      </div>

      <div>
        <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-1)', display: 'block', marginBottom: '6px' }}>
          Password
        </label>
        <input type="password" required placeholder="Your password"
          value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          style={{ width: '100%', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: 'var(--fg-1)', outline: 'none', fontFamily: 'var(--font-sans)', boxSizing: 'border-box' }} />
      </div>

      {error && (
        <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#be123c' }}>
          {error}
        </div>
      )}

      <button type="submit" disabled={loading}
        style={{ background: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: '8px', padding: '13px 24px', fontSize: '14px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-sans)', opacity: loading ? 0.7 : 1, marginTop: '4px' }}>
        {loading ? 'Signing in...' : 'Sign in →'}
      </button>

      <p style={{ fontSize: '12px', color: 'var(--fg-4)', textAlign: 'center', lineHeight: 1.6 }}>
        Don't have an account?{' '}
        <Link href="/signup" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Create one free</Link>
      </p>
    </form>
  );
}

export default function LoginPage() {
  return (
    <>
      <Navigation />
      <main style={{ flex: 1, maxWidth: '420px', margin: '0 auto', padding: '56px 24px' }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '12px' }}>
            Welcome back
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 700, color: 'var(--fg-1)', lineHeight: 1.2, marginBottom: '10px' }}>
            Sign in to your account
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--fg-3)', lineHeight: 1.7 }}>
            Access full organization profiles for your city.
          </p>
        </div>
        <Suspense fallback={<div style={{ padding: '20px', color: 'var(--fg-4)', fontSize: '13px' }}>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </main>
    </>
  );
}
