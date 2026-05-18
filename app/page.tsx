'use client';
import { Suspense } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { CITIES, PUBLIC_CATEGORIES } from '@/lib/config';

export default function HomePage() {
  return (
    <>
      <Navigation activeCitySlug={undefined} />
      <main style={{ flex: 1 }}>

        {/* Hero */}
        <section style={{ padding: '56px 32px 48px', maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--color-primary)', display: 'inline-block' }}></span>
            588 Organizations Across Texas
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '42px', fontWeight: 700, color: 'var(--fg-1)', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            Discover the organizations<br /><em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>behind</em> local business.
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--fg-3)', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto 40px' }}>
            Chambers, networking groups, professional associations, and more — every business organization in Texas, organized by city and category.
          </p>

          {/* City cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '48px' }}>
            {CITIES.map(city => (
              <Link key={city.slug} href={`/${city.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '28px 16px', textAlign: 'center', transition: 'border-color 0.15s', cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '#e2e8f0')}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, color: 'var(--fg-1)', marginBottom: '6px' }}>{city.name}</div>
                  <div style={{ fontSize: '13px', color: 'var(--color-primary)', fontWeight: 600 }}>{city.count} organizations</div>
                  <div style={{ marginTop: '16px', fontSize: '12px', color: 'var(--color-accent)', fontWeight: 600 }}>Browse →</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid var(--color-rule)' }} />

        {/* Categories preview */}
        <section style={{ padding: '40px 32px', maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '16px' }}>8 Categories</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
            {PUBLIC_CATEGORIES.map(cat => (
              <div key={cat.label} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--fg-1)' }}>{cat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Events CTA */}
        <section style={{ maxWidth: '960px', margin: '0 auto', padding: '0 32px 48px' }}>
          <div style={{ background: 'var(--color-ink)', borderRadius: '12px', padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>See what these organizations have coming up</h3>
              <p style={{ fontSize: '13px', color: 'var(--fg-4)' }}>Browse upcoming events from every organization on the Local Business Calendars.</p>
            </div>
            <a href="https://www.localbusinesscalendars.com" target="_blank" rel="noopener noreferrer"
              style={{ background: 'var(--color-accent)', color: '#fff', padding: '11px 24px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, whiteSpace: 'nowrap', textDecoration: 'none' }}>
              View the Calendar →
            </a>
          </div>
        </section>

        {/* Footer ticker */}
        <div style={{ background: 'var(--color-ink)', padding: '10px 32px', display: 'flex', gap: '32px', alignItems: 'center', justifyContent: 'center' }}>
          {[['588', 'Organizations'], ['4', 'Texas Cities'], ['8', 'Categories']].map(([val, label], i) => (
            <span key={i} style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#475569' }}>
              <strong style={{ color: '#94a3b8' }}>{val}</strong> {label}
            </span>
          ))}
        </div>
      </main>
    </>
  );
}
