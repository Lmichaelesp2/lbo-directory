'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Breadcrumb from '@/components/Breadcrumb';
import { supabase } from '@/lib/supabase';

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware',
  'Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky',
  'Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi',
  'Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico',
  'New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania',
  'Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont',
  'Virginia','Washington','West Virginia','Wisconsin','Wyoming',
];

type Step = 'form' | 'success';

export default function ContactPage() {
  const [step, setStep] = useState<Step>('form');
  const [form, setForm] = useState({ name: '', email: '', city: '', state: 'Texas', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.city.trim()) {
      setError('Please fill in your name, email, and city.');
      return;
    }
    setSubmitting(true);
    setError('');
    const { error: dbErr } = await supabase.from('city_interest').insert([{
      name: form.name.trim(),
      email: form.email.trim(),
      city: form.city.trim(),
      state: form.state,
      notes: form.notes.trim() || null,
    }]);
    setSubmitting(false);
    if (dbErr) { setError('Something went wrong. Please try again.'); return; }
    setStep('success');
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 13px', fontSize: '14px', border: '1px solid #e2e8f0',
    borderRadius: '8px', fontFamily: 'var(--font-sans)', color: 'var(--fg-1)',
    background: '#fff', outline: 'none', boxSizing: 'border-box',
  };

  return (
    <>
      <Navigation activeCitySlug={undefined} />
      <Breadcrumb items={[
        { label: 'Local Business Organizations', href: '/' },
        { label: 'Contact' },
      ]} />
      <main style={{ flex: 1 }}>

        {/* Hero */}
        <section style={{ background: 'var(--color-ink)', padding: '40px 32px' }}>
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '34px', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '10px' }}>
              We're expanding — tell us where next
            </h1>
            <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.7, maxWidth: '520px' }}>
              Local Business Organizations currently covers four Texas cities, with more cities and states on the way.
              Let us know which city you'd like to see added and we'll notify you when it goes live.
            </p>
          </div>
        </section>

        <section style={{ maxWidth: '680px', margin: '0 auto', padding: '48px 32px' }}>
          {step === 'success' ? (

            /* ── Success ── */
            <div style={{ background: '#f0fdf9', border: '1px solid #6ee7b7', borderRadius: '12px', padding: '40px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>✓</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 700, color: 'var(--fg-1)', marginBottom: '10px' }}>
                You're on the list!
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--fg-3)', lineHeight: 1.7, marginBottom: '24px' }}>
                We'll email you as soon as we add {form.city}
                {form.state && form.state !== 'Texas' ? `, ${form.state}` : ''} to the directory.
                Thank you for your interest — it helps us prioritize which cities to build next.
              </p>
              <Link href="/" style={{ background: 'var(--color-accent)', color: '#fff', padding: '11px 28px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>
                Back to Directory →
              </Link>
            </div>

          ) : (

            /* ── Form ── */
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'flex-start' }}>

              {/* Left: form */}
              <div style={{ gridColumn: '1 / -1' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 700, color: 'var(--fg-1)', marginBottom: '6px' }}>
                  Notify me when my city is added
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--fg-3)', marginBottom: '28px', lineHeight: 1.6 }}>
                  Already covering San Antonio, Houston, Dallas, and Austin — with Florida and other markets planned for later this year.
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Name + Email */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--fg-2)', display: 'block', marginBottom: '6px' }}>
                        Your name <span style={{ color: 'var(--color-primary)' }}>*</span>
                      </label>
                      <input style={inputStyle} placeholder="Jane Smith" value={form.name} onChange={set('name')} />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--fg-2)', display: 'block', marginBottom: '6px' }}>
                        Email address <span style={{ color: 'var(--color-primary)' }}>*</span>
                      </label>
                      <input type="email" style={inputStyle} placeholder="jane@example.com" value={form.email} onChange={set('email')} />
                    </div>
                  </div>

                  {/* City + State */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--fg-2)', display: 'block', marginBottom: '6px' }}>
                        City you'd like added <span style={{ color: 'var(--color-primary)' }}>*</span>
                      </label>
                      <input style={inputStyle} placeholder="e.g. Miami, Tampa, Denver" value={form.city} onChange={set('city')} />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--fg-2)', display: 'block', marginBottom: '6px' }}>State</label>
                      <select style={{ ...inputStyle, appearance: 'none' }} value={form.state} onChange={set('state')}>
                        {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--fg-2)', display: 'block', marginBottom: '6px' }}>
                      Anything else? <span style={{ color: 'var(--fg-4)', fontWeight: 400 }}>(optional)</span>
                    </label>
                    <textarea
                      style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
                      placeholder="Tell us about your market, or any organizations you'd like to see listed..."
                      value={form.notes}
                      onChange={set('notes')}
                    />
                  </div>

                  {error && (
                    <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#c2410c' }}>
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    style={{ background: 'var(--color-accent)', color: '#fff', padding: '12px 28px', borderRadius: '8px', fontSize: '14px', fontWeight: 700, border: 'none', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1, alignSelf: 'flex-start' }}>
                    {submitting ? 'Submitting…' : 'Notify Me →'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Coming soon cities callout */}
          <div style={{ marginTop: '48px', background: 'var(--color-paper-2)', border: '1px solid var(--color-rule)', borderRadius: '12px', padding: '28px 32px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '8px' }}>Currently live</div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {['San Antonio', 'Houston', 'Dallas', 'Austin'].map(city => (
                <span key={city} style={{ fontSize: '13px', fontWeight: 600, padding: '4px 12px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '100px', color: 'var(--fg-1)' }}>
                  ✓ {city}
                </span>
              ))}
            </div>
            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-4)', marginBottom: '8px' }}>Planned markets</div>
            <p style={{ fontSize: '13px', color: 'var(--fg-3)', lineHeight: 1.7 }}>
              Florida cities (Miami, Tampa, Orlando, Jacksonville), additional Texas markets, and other high-growth metros.
              Expansion is driven by demand — the more signups a city has, the sooner we build it.
            </p>
          </div>
        </section>

      </main>
    </>
  );
}
