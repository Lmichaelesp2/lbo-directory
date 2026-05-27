'use client';
import Link from 'next/link';
import { useState } from 'react';
import { CITIES } from '@/lib/config';

export default function Navigation({ activeCitySlug, activeState, activeCityName }: { activeCitySlug?: string; activeState?: string; activeCityName?: string }) {
  const [moreOpen, setMoreOpen] = useState(false);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  }).toUpperCase();

  const subtitle = activeCityName
    ? `${activeCityName} Business Organizations · Texas`
    : activeState === 'texas'
      ? 'Texas Business Organizations · By City & Category'
      : 'Business Organizations · By City & Category';

  return (
    <header style={{ borderBottom: '1px solid var(--color-rule)', background: '#fff', position: 'sticky', top: 0, zIndex: 50 }}>
      {/* Top bar */}
      <div style={{ borderBottom: '1px solid var(--color-rule)', background: '#fff' }}>
        <div className="lbo-nav-topbar-inner">
          <span className="lbo-nav-dateline" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', color: 'var(--fg-4)' }}>{today}</span>

          <Link href="/" style={{ textAlign: 'center', textDecoration: 'none' }}>
            <div className="lbo-nav-wordmark" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-ink)', letterSpacing: '-0.04em', fontFamily: 'var(--font-sans)', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
              <span style={{ color: 'var(--color-primary)' }}>Local</span> Business Organizations
            </div>
            <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-4)', marginTop: '4px' }}>
              {subtitle}
            </div>
          </Link>

          <div className="lbo-nav-orgcount" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--color-accent)', display: 'inline-block' }}></span>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>588 Organizations</span>
          </div>
        </div>
      </div>

      {/* Nav bar */}
      <nav style={{ background: '#fff' }}>
        <div className="lbo-nav-links-inner">
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <Link href="/texas"
              style={{ fontSize: '13px', fontWeight: activeState === 'texas' && !activeCitySlug ? 600 : 500, color: activeState === 'texas' && !activeCitySlug ? 'var(--fg-1)' : 'var(--fg-2)', padding: '4px 12px', borderRadius: '6px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Texas
            </Link>
            {CITIES.map(city => (
              <Link key={city.slug} href={`/texas/${city.slug}`}
                style={{ fontSize: '13px', fontWeight: activeCitySlug === city.slug ? 600 : 500, color: activeCitySlug === city.slug ? 'var(--fg-1)' : 'var(--fg-2)', padding: '4px 12px', borderRadius: '6px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                {city.name}
              </Link>
            ))}
          </div>

          <div className="lbo-nav-right" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <a href="https://www.localbusinesscalendars.com" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)', padding: '4px 12px', borderRadius: '6px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Events Calendar ↗
            </a>

            {/* More dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setMoreOpen(o => !o)}
                onBlur={() => setTimeout(() => setMoreOpen(false), 150)}
                style={{ fontSize: '13px', fontWeight: 500, color: 'var(--fg-2)', padding: '4px 12px', borderRadius: '6px', background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                More
                <span style={{ fontSize: '10px', color: 'var(--fg-4)' }}>▾</span>
              </button>
              {moreOpen && (
                <div style={{ position: 'absolute', top: 'calc(100% + 6px)', right: 0, background: '#fff', border: '1px solid var(--color-rule)', borderRadius: '10px', boxShadow: '0 4px 20px rgba(10,22,40,.10)', minWidth: '180px', zIndex: 100, overflow: 'hidden' }}>
                  {[
                    { href: '/about',   label: 'About' },
                    { href: '/contact', label: 'Contact' },
                    { href: '/sponsor', label: 'Sponsorship' },
                    { href: '/claim',   label: 'Claim Your Listing' },
                    { href: '/privacy', label: 'Privacy Policy' },
                    { href: '/terms',   label: 'Terms & Conditions' },
                  ].map(item => (
                    <Link key={item.href} href={item.href}
                      style={{ display: 'block', padding: '0.6rem 1rem', fontSize: '13px', fontWeight: 500, color: 'var(--fg-1)', textDecoration: 'none', borderBottom: '1px solid var(--color-rule)' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-paper)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/claim"
              style={{ background: 'var(--color-accent)', color: '#fff', padding: '7px 18px', borderRadius: '6px', fontSize: '13px', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.01em', whiteSpace: 'nowrap' }}>
              Claim Your Listing →
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
