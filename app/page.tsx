'use client';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { CITIES, PUBLIC_CATEGORIES } from '@/lib/config';

const STATS = [
  { number: '588+', label: 'Verified organization profiles' },
  { number: '4', label: 'Texas cities covered' },
  { number: '8', label: 'Business categories' },
  { number: '800+', label: 'Event sources monitored' },
];

const WHAT_WE_TRACK = [
  'Chambers of commerce',
  'Professional networking groups',
  'Industry associations',
  'Real estate organizations',
  'Technology groups & meetups',
  'Community & civic organizations',
  'Construction & trade associations',
  'Healthcare & professional societies',
];

const CITY_DESCRIPTIONS: Record<string, string> = {
  'San Antonio': 'A thriving business community anchored by chambers, veteran organizations, and one of Texas\'s most active networking scenes.',
  'Houston':     'The largest business ecosystem in Texas — oil & gas, healthcare, technology, and hundreds of professional associations.',
  'Dallas':      'A powerhouse of finance, real estate, and technology organizations driving North Texas business forward.',
  'Austin':      'The fastest-growing business community in Texas, led by technology groups, startups, and innovation networks.',
};

export default function HomePage() {
  return (
    <>
      <Navigation activeCitySlug={undefined} />
      <main style={{ flex: 1 }}>

        {/* Hero */}
        <section style={{ padding: '56px 32px 48px', maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--color-primary)', display: 'inline-block' }}></span>
                Texas Business Directory · 4 Cities
              </div>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.25rem, 4.5vw, 3rem)', fontWeight: 600, color: 'var(--fg-1)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '20px' }}>
                The local business organizations of Texas,{' '}
                <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--color-primary)' }}>all in one place.</em>
              </h1>
              <p style={{ fontSize: '1.05rem', color: 'var(--fg-3)', lineHeight: 1.6, maxWidth: '560px', marginBottom: '12px' }}>
                Local Business Organizations is a curated directory of chambers, networking groups, professional associations, trade organizations, and more — spanning San Antonio, Houston, Dallas, and Austin.
              </p>
              <p style={{ fontSize: '1.05rem', color: 'var(--fg-3)', lineHeight: 1.6, maxWidth: '560px', marginBottom: '12px' }}>
                Whether you're looking to grow your network, find your industry's association, or connect with the right organizations in your city — this is where you start.
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--fg-4)', lineHeight: 1.6, maxWidth: '560px', marginBottom: '28px' }}>
                Many of the organizations in this directory host the events listed each week on{' '}
                <a href="https://www.localbusinesscalendars.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>
                  Local Business Calendars
                </a>.
              </p>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Link href="/san-antonio" style={{ background: 'var(--color-accent)', color: '#fff', padding: '11px 24px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>
                  Browse Organizations →
                </Link>
                <a href="https://www.localbusinesscalendars.com" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#fff', color: 'var(--color-primary)', padding: '11px 24px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, textDecoration: 'none', border: '1px solid var(--color-primary)' }}>
                  See Upcoming Events ↗
                </a>
              </div>
            </div>

            {/* City panel */}
            <div style={{ background: '#fff', border: '1px solid var(--color-rule)', borderRadius: '12px', overflow: 'hidden', minWidth: '240px', boxShadow: '0 2px 12px rgba(10,22,40,.07)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-3)', padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--color-rule)', background: 'var(--color-paper-2)' }}>Browse by city</div>
              {CITIES.map((city, i) => (
                <Link key={city.slug} href={`/${city.slug}`} style={{ textDecoration: 'none' }}>
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
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {STATS.map((stat, i) => (
              <>
                <span key={stat.label} style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,.65)' }}>
                  <strong style={{ color: 'rgba(255,255,255,.65)' }}>{stat.number}</strong> {stat.label}
                </span>
                {i < STATS.length - 1 && <span style={{ color: 'rgba(255,255,255,.3)', fontWeight: 300 }}>|</span>}
              </>
            ))}
          </div>
        </section>

        {/* Events CTA — bridge to LocalBusinessCalendars.com */}
        <section style={{ padding: '24px 32px 0', maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ background: 'var(--color-ink)', borderRadius: '12px', padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: '#64748b', marginBottom: '6px' }}>From Organizations to Events</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                Want to see what these organizations are hosting?
              </h3>
              <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6 }}>
                Local Business Calendars tracks every networking event, chamber mixer, and business gathering across Texas — updated weekly, free to browse.
              </p>
            </div>
            <a href="https://www.localbusinesscalendars.com" target="_blank" rel="noopener noreferrer"
              style={{ background: 'var(--color-accent)', color: '#fff', padding: '11px 24px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, whiteSpace: 'nowrap', textDecoration: 'none', flexShrink: 0 }}>
              View This Week's Events →
            </a>
          </div>
        </section>

        {/* City cards */}
        <section style={{ padding: '48px 32px', maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '8px' }}>4 Texas Cities</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '8px' }}>
            Find organizations in your city
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--fg-3)', lineHeight: 1.7, marginBottom: '28px', maxWidth: '560px' }}>
            Each city has its own directory, organized by category. Click your city to browse all organizations, filter by type, and discover who's active in your market.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
            {CITIES.map(city => (
              <Link key={city.slug} href={`/${city.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 700, color: 'var(--fg-1)' }}>{city.name}</h3>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)', background: 'var(--color-primary-bg)', padding: '3px 10px', borderRadius: '100px' }}>{city.count} orgs</span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--fg-3)', lineHeight: 1.6, marginBottom: '14px' }}>
                    {CITY_DESCRIPTIONS[city.name]}
                  </p>
                  <span style={{ fontSize: '13px', color: 'var(--color-accent)', fontWeight: 600 }}>Browse {city.name} organizations →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid var(--color-rule)', margin: '0 32px' }} />

        {/* What we track */}
        <section style={{ padding: '48px 32px', maxWidth: '960px', margin: '0 auto', display: 'flex', gap: '64px', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '8px' }}>What we track</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '12px' }}>
              The types of business organizations we track
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--fg-3)', lineHeight: 1.7, marginBottom: '24px' }}>
              We research and maintain profiles for a wide range of business organizations across Texas — so you have one place to start instead of hunting across a dozen different websites.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {WHAT_WE_TRACK.map(item => (
                <div key={item} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ color: 'var(--color-primary)', fontSize: '13px', flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: '13px', color: 'var(--fg-2)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div style={{ minWidth: '260px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '12px' }}>8 Categories</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {PUBLIC_CATEGORIES.map(cat => (
                <div key={cat.label} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', fontWeight: 500, color: 'var(--fg-1)' }}>
                  {cat.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid var(--color-rule)', margin: '0 32px' }} />

        {/* Claim CTA */}
        <section style={{ padding: '48px 32px', maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ background: 'var(--color-paper-2)', border: '1px solid var(--color-rule)', borderRadius: '12px', padding: '36px 40px', display: 'flex', gap: '40px', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-accent)', marginBottom: '8px' }}>For organization leaders</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '10px' }}>
                Is your organization listed here?
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--fg-3)', lineHeight: 1.7, marginBottom: '0' }}>
                If your organization is in our directory, you can claim your listing and take control of how you appear to thousands of Texas business professionals. Add your logo, update your description, and make sure your contact information is accurate. Claiming is free to request — our team reviews every submission.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', flexShrink: 0 }}>
              <Link href="/claim" style={{ background: 'var(--color-accent)', color: '#fff', padding: '12px 28px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap', textAlign: 'center' }}>
                Claim Your Listing →
              </Link>
              <span style={{ fontSize: '11px', color: 'var(--fg-4)', textAlign: 'center' }}>Free to request · 1–2 day review</span>
            </div>
          </div>
        </section>

        {/* More cities coming */}
        <section style={{ padding: '0 32px 48px', maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ background: 'var(--color-paper-2)', border: '1px solid var(--color-rule)', borderRadius: '12px', padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '6px' }}>Expanding soon</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700, color: 'var(--fg-1)', marginBottom: '4px' }}>
                Don't see your city yet?
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--fg-3)', lineHeight: 1.6 }}>
                We're currently in four Texas cities, with Florida and other markets coming soon. Tell us which city you'd like added and we'll notify you when it's live.
              </p>
            </div>
            <Link href="/contact" style={{ background: 'var(--color-primary)', color: '#fff', padding: '11px 24px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, whiteSpace: 'nowrap', textDecoration: 'none', flexShrink: 0 }}>
              Request Your City →
            </Link>
          </div>
        </section>

        {/* Footer ticker */}
        <div style={{ background: 'var(--color-ink)', padding: '10px 32px', display: 'flex', gap: '32px', alignItems: 'center', justifyContent: 'center' }}>
          {[['588+', 'Verified Profiles'], ['4', 'Texas Cities'], ['8', 'Categories'], ['800+', 'Event Sources']].map(([val, label], i) => (
            <span key={i} style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#475569' }}>
              <strong style={{ color: '#94a3b8' }}>{val}</strong> {label}
            </span>
          ))}
        </div>

      </main>
    </>
  );
}
