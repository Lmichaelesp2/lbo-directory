import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { CITIES, PUBLIC_CATEGORIES, CITY_CONTENT } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Texas Business Organizations | Chambers, Associations & Networking Groups',
  description: 'Browse 588+ business organizations across San Antonio, Houston, Dallas, and Austin. Chambers of commerce, professional associations, networking groups, trade organizations, and more.',
  openGraph: {
    title: 'Texas Business Organizations',
    description: 'Every local business organization in Texas — chambers, associations, networking groups, and more. Browse by city and category.',
    url: 'https://www.localbusinessorganizations.com/texas',
    siteName: 'Local Business Organizations',
  },
  alternates: { canonical: 'https://www.localbusinessorganizations.com/texas' },
};

const TEXAS_STATS = [
  { number: '588+', label: 'Verified organization profiles' },
  { number: '4',    label: 'Texas cities covered' },
  { number: '8',    label: 'Business categories' },
  { number: '800+', label: 'Event sources monitored' },
];

export default function TexasPage() {
  return (
    <>
      <Navigation activeCitySlug={undefined} activeState="texas" />
      <main style={{ flex: 1 }}>

        {/* Hero */}
        <section className="lbo-hero-section" style={{ background: 'var(--color-paper)', padding: '4rem 2rem 0', borderBottom: '1px solid var(--color-rule)' }}>
          <div className="lbo-hero-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 320px', gap: '3rem', alignItems: 'start', paddingBottom: '3.5rem' }}>

            <div>
              {/* Breadcrumb */}
              <div style={{ fontSize: '13px', fontWeight: 400, color: 'var(--fg-4)', marginBottom: '1.5rem' }}>
                <Link href="/" style={{ color: 'var(--fg-4)', textDecoration: 'none' }}>Local Business Organizations</Link>
                <span style={{ margin: '0 6px' }}>›</span>
                <span style={{ color: 'var(--fg-3)' }}>Texas</span>
              </div>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-primary)', marginBottom: '1.25rem' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--color-primary)', display: 'inline-block' }} />
                Texas Business Directory · 4 Cities
              </div>

              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.25rem, 4.5vw, 3rem)', fontWeight: 600, color: 'var(--fg-1)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '1.25rem' }}>
                The business organizations that matter{' '}
                <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--color-primary)' }}>across Texas.</em>
              </h1>

              <p style={{ fontSize: '1.05rem', color: 'var(--fg-3)', lineHeight: 1.6, maxWidth: '560px', marginBottom: '2rem' }}>
                Chambers, networking groups, professional associations, and trade organizations — browse local business organizations across San Antonio, Houston, Dallas, and Austin, organized by city and category.
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <Link href="/texas/san-antonio" style={{ background: 'var(--color-accent)', color: '#fff', padding: '0.85rem 1.75rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none' }}>
                  Browse Texas →
                </Link>
                <a href="https://www.localbusinesscalendars.com" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#fff', color: 'var(--color-primary)', padding: '0.85rem 1.75rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', border: '1px solid var(--color-primary)' }}>
                  See Upcoming Events ↗
                </a>
              </div>
            </div>

            {/* City panel */}
            <div className="lbo-hero-city-panel" style={{ background: '#fff', border: '1px solid var(--color-rule)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(10,22,40,.07)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-3)', padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--color-rule)', background: 'var(--color-paper-2)' }}>
                Browse by city
              </div>
              {CITIES.map((city, i) => (
                <Link key={city.slug} href={`/texas/${city.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1.25rem', borderBottom: i < CITIES.length - 1 ? '1px solid var(--color-rule)' : 'none' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-1)' }}>{city.name}</span>
                    <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--color-primary)' }}>{city.count} orgs</span>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </section>

        {/* Stats strip */}
        <section style={{ background: 'var(--color-ink)', padding: '0.6rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {TEXAS_STATS.map((stat, i) => (
              <>
                <span key={stat.label} style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,.65)' }}>
                  <strong>{stat.number}</strong> {stat.label}
                </span>
                {i < TEXAS_STATS.length - 1 && <span style={{ color: 'rgba(255,255,255,.3)', fontWeight: 300 }}>|</span>}
              </>
            ))}
          </div>
        </section>

        {/* City cards */}
        <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>4 Texas Cities</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '0.5rem' }}>
            Find organizations in your city
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--fg-3)', lineHeight: 1.7, marginBottom: '1.75rem', maxWidth: '560px' }}>
            Each city has its own directory, organized by category. Click your city to browse all organizations, filter by type, and discover who's active in your market.
          </p>
          <div className="lbo-city-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
            {CITIES.map(city => (
              <Link key={city.slug} href={`/texas/${city.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--fg-1)' }}>{city.name}</h3>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-primary)', background: 'var(--color-primary-bg)', padding: '3px 10px', borderRadius: '100px' }}>{city.count} orgs</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--fg-3)', lineHeight: 1.6, marginBottom: '14px' }}>
                    {CITY_CONTENT[city.name]?.tagline}
                  </p>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-accent)', fontWeight: 600 }}>Browse {city.name} organizations →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid var(--color-rule)', margin: '0 2rem' }} />

        {/* Categories */}
        <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>What we track</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '1.75rem' }}>
            8 categories of business organizations
          </h2>
          <div className="lbo-cat-grid">
            {PUBLIC_CATEGORIES.map(cat => (
              <div key={cat.label} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px 16px', fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-1)' }}>
                {cat.label}
              </div>
            ))}
          </div>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid var(--color-rule)', margin: '0 2rem' }} />

        {/* Events bridge */}
        <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div className="lbo-cta-row" style={{ background: 'var(--color-ink)', borderRadius: '12px', padding: '2rem 2.5rem', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#64748b', marginBottom: '0.5rem' }}>From Organizations to Events</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>
                Want to see what these organizations are hosting?
              </h3>
              <p style={{ fontSize: '0.825rem', color: '#94a3b8', lineHeight: 1.6 }}>
                Local Business Calendars tracks every networking event, chamber mixer, and business gathering across Texas — updated weekly, free to browse.
              </p>
            </div>
            <a href="https://www.localbusinesscalendars.com" target="_blank" rel="noopener noreferrer"
              style={{ background: 'var(--color-accent)', color: '#fff', padding: '0.85rem 1.5rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 700, whiteSpace: 'nowrap', textDecoration: 'none', flexShrink: 0 }}>
              View This Week's Events →
            </a>
          </div>
        </section>

        {/* Claim CTA */}
        <section style={{ padding: '0 2rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div className="lbo-claim-row" style={{ background: 'var(--color-paper-2)', border: '1px solid var(--color-rule)', borderRadius: '12px', padding: '2.25rem 2.5rem' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-accent)', marginBottom: '0.5rem' }}>For organization leaders</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '0.6rem' }}>
                Is your organization listed here?
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--fg-3)', lineHeight: 1.7 }}>
                Claim your listing to take control of how you appear to thousands of Texas business professionals. Add your logo, update your description, and verify your contact info. Free to request — reviewed within 1–2 days.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', flexShrink: 0 }}>
              <Link href="/claim" style={{ background: 'var(--color-accent)', color: '#fff', padding: '0.85rem 1.75rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                Claim Your Listing →
              </Link>
              <span style={{ fontSize: '0.7rem', color: 'var(--fg-4)' }}>Free to request · 1–2 day review</span>
            </div>
          </div>
        </section>

      </main>
      <Footer stateName="Texas" />
    </>
  );
}
