'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { signUp } from '@/lib/auth';
import { CITIES } from '@/lib/config';

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cityParam = searchParams.get('city') ?? '';
  const [form, setForm] = useState({ email: '', password: '', city: cityParam });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.city) { setError('Please select your city.'); return; }
    setLoading(true);
    setError('');
    const { error: err } = await signUp(form.email, form.password, form.city);
    if (err) {
      const msg = err.message || '';
      if (msg.toLowerCase().includes('already registered') || msg.toLowerCase().includes('already been registered')) {
        setError('__already_registered__');
      } else {
        setError(msg);
      }
      setLoading(false);
      return;
    }
    router.push('/?signup=success');
  }

  return (
    <>
      <Navigation />
      <main style={{ flex: 1, maxWidth: '460px', margin: '0 auto', padding: '56px 24px' }}>

        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '12px' }}>
            Free Account
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 700, color: 'var(--fg-1)', lineHeight: 1.2, marginBottom: '10px' }}>
            See the full directory
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--fg-3)', lineHeight: 1.7 }}>
            Create a free account to unlock complete organization profiles — contact info, descriptions, social links, membership details, and more.
          </p>
        </div>

        {/* What you get */}
        <div style={{ background: 'var(--color-primary-bg)', border: '1px solid #c7d7fd', borderRadius: '10px', padding: '16px 20px', marginBottom: '28px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '10px' }}>What you unlock</div>
          {[
            'Full organization descriptions',
            'Contact info — phone, email, address',
            'Website + social links',
            'Membership type & fee range',
            'Weekly city business digest email',
          ].map(item => (
            <div key={item} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
              <i className="ti ti-check" style={{ color: 'var(--color-primary)', fontSize: '13px', flexShrink: 0 }} />
              <span style={{ fontSize: '13px', color: 'var(--fg-2)' }}>{item}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-1)', display: 'block', marginBottom: '6px' }}>
              Email address <span style={{ color: 'var(--color-primary)' }}>*</span>
            </label>
            <input type="email" required placeholder="you@example.com"
              value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              style={{ width: '100%', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: 'var(--fg-1)', outline: 'none', fontFamily: 'var(--font-sans)', boxSizing: 'border-box' }} />
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-1)', display: 'block', marginBottom: '6px' }}>
              Password <span style={{ color: 'var(--color-primary)' }}>*</span>
            </label>
            <input type="password" required placeholder="At least 8 characters" minLength={8}
              value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              style={{ width: '100%', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: 'var(--fg-1)', outline: 'none', fontFamily: 'var(--font-sans)', boxSizing: 'border-box' }} />
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-1)', display: 'block', marginBottom: '6px' }}>
              Your city <span style={{ color: 'var(--color-primary)' }}>*</span>
            </label>
            <select required value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
              disabled={!!cityParam}
              style={{ width: '100%', background: cityParam ? 'var(--color-primary-bg)' : '#fff', border: `1px solid ${cityParam ? '#c7d7fd' : '#e2e8f0'}`, borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: form.city ? 'var(--fg-1)' : 'var(--fg-4)', outline: 'none', fontFamily: 'var(--font-sans)', boxSizing: 'border-box', appearance: 'none', cursor: cityParam ? 'default' : 'pointer' }}>
              <option value="">Select your city...</option>
              {CITIES.map(c => (
                <option key={c.slug} value={c.name}>{c.name}</option>
              ))}
            </select>
            {cityParam && (
              <p style={{ fontSize: '11px', color: 'var(--color-primary)', marginTop: '4px' }}>
                You'll receive the {cityParam} weekly events email.
              </p>
            )}
          </div>

          {error && error === '__already_registered__' ? (
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '14px 16px', fontSize: '13px', color: '#1e40af', lineHeight: 1.6 }}>
              <strong>You already have an account.</strong>
              <br />
              Your email is registered across both <strong>Local Business Organizations</strong> and <strong>Local Business Calendars</strong> — they share the same login.
              <br /><br />
              <Link href="/login" style={{ color: 'var(--color-primary)', fontWeight: 700, textDecoration: 'underline' }}>
                Sign in here →
              </Link>
            </div>
          ) : error ? (
            <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#be123c' }}>
              {error}
            </div>
          ) : null}

          <button type="submit" disabled={loading}
            style={{ background: 'var(--color-accent)', color: '#fff', border: 'none', borderRadius: '8px', padding: '13px 24px', fontSize: '14px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-sans)', opacity: loading ? 0.7 : 1, marginTop: '4px' }}>
            {loading ? 'Creating account...' : 'Create free account →'}
          </button>

          <p style={{ fontSize: '12px', color: 'var(--fg-4)', textAlign: 'center', lineHeight: 1.6 }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Sign in</Link>
          </p>

        </form>
      </main>
    </>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div style={{ padding: '48px', textAlign: 'center' }}>Loading...</div>}>
      <SignupForm />
    </Suspense>
  );
}
