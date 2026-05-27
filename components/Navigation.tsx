'use client';
import Link from 'next/link';
import { CITIES } from '@/lib/config';

export default function Navigation({ activeCitySlug }: { activeCitySlug?: string }) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  }).toUpperCase();

  return (
    <header style={{ borderBottom: '1px solid var(--color-rule)', background: '#fff' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem 0.75rem', borderBottom: '1px solid var(--color-rule)', background: '#fff' }}>
        <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', color: 'var(--fg-4)' }}>{today}</span>

        <Link href="/" style={{ textAlign: 'center', textDecoration: 'none' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-ink)', letterSpacing: '-0.04em', fontFamily: 'var(--font-sans)', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
            <span style={{ color: 'var(--color-primary)' }}>Local</span> Business Organizations
          </div>
          <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-4)', marginTop: '4px' }}>
            Business Organizations · By City &amp; Category
          </div>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--color-accent)', display: 'inline-block' }}></span>
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>588 Organizations</span>
        </div>
      </div>

      {/* Nav bar */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', height: '48px', background: '#fff' }}>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <Link href="/" style={{ fontSize: '13px', fontWeight: !activeCitySlug ? 600 : 500, color: !activeCitySlug ? 'var(--fg-1)' : 'var(--fg-2)', padding: '4px 12px', borderRadius: '6px', textDecoration: 'none' }}>
            All Cities
          </Link>
          {CITIES.map(city => (
            <Link key={city.slug} href={`/${city.slug}`}
              style={{ fontSize: '13px', fontWeight: activeCitySlug === city.slug ? 600 : 500, color: activeCitySlug === city.slug ? 'var(--fg-1)' : 'var(--fg-2)', padding: '4px 12px', borderRadius: '6px', textDecoration: 'none' }}>
              {city.name}
            </Link>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <a href="https://www.localbusinesscalendars.com" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)', padding: '4px 12px', borderRadius: '6px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Events Calendar ↗
          </a>
          <Link href="/contact" style={{ fontSize: '13px', fontWeight: 500, color: 'var(--fg-2)', padding: '4px 12px', borderRadius: '6px', textDecoration: 'none' }}>
            More Cities →
          </Link>
          <Link href="/claim" style={{ background: 'var(--color-accent)', color: '#fff', padding: '7px 18px', borderRadius: '6px', fontSize: '13px', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.01em', whiteSpace: 'nowrap' }}>
            Claim Your Listing →
          </Link>
        </div>
      </nav>
    </header>
  );
}
