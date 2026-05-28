import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Local Business Organizations — The Directory for Every City',
  description: 'Find every chamber of commerce, professional association, networking group, and trade organization in your city. Currently covering Texas, with more states coming soon.',
  openGraph: {
    title: 'Local Business Organizations',
    description: 'Every local business organization, every city. Chambers, associations, networking groups, and trade organizations — organized by city and category.',
    url: 'https://www.localbusinessorganizations.com',
    siteName: 'Local Business Organizations',
  },
};

const STATES = [
  {
    name: 'Texas',
    slug: 'texas',
    cities: ['San Antonio', 'Houston', 'Dallas', 'Austin'],
    orgCount: '588+',
    live: true,
  },
  {
    name: 'Florida',
    slug: 'florida',
    cities: ['Miami', 'Orlando', 'Tampa', 'Jacksonville'],
    orgCount: 'Coming soon',
    live: false,
  },
  {
    name: 'Georgia',
    slug: 'georgia',
    cities: ['Atlanta', 'Savannah', 'Augusta'],
    orgCount: 'Coming soon',
    live: false,
  },
  {
    name: 'Ohio',
    slug: 'ohio',
    cities: ['Columbus', 'Cleveland', 'Cincinnati'],
    orgCount: 'Coming soon',
    live: false,
  },
];


export default function HomePage() {
  return (
    <>
      <Navigation />
      <main style={{ flex: 1 }}>

        {/* Hero */}
        <section className="lbo-hero-section" style={{ background: 'var(--color-paper)', padding: '4rem 2rem 0', borderBottom: '1px solid var(--color-rule)' }}>
          <div className="lbo-hero-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 320px', gap: '3rem', alignItems: 'start', paddingBottom: '3.5rem' }}>

            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-primary)', marginBottom: '1.25rem' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--color-primary)', display: 'inline-block' }} />
                Business Organizations Directory
              </div>

              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.25rem, 4.5vw, 3rem)', fontWeight: 600, color: 'var(--fg-1)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '1.25rem' }}>
                The business organizations that matter{' '}
                <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--color-primary)' }}>in your city.</em>
              </h1>

              <p style={{ fontSize: '1.05rem', color: 'var(--fg-3)', lineHeight: 1.6, maxWidth: '560px', marginBottom: '2rem' }}>
                A curated directory of chambers of commerce, professional associations, networking groups, and trade organizations — organized by city and category so you know who's out there and where to plug in.
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <Link href="/texas" style={{ background: 'var(--color-accent)', color: '#fff', padding: '0.85rem 1.75rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none' }}>
                  Browse Organizations →
                </Link>
                <a href="https://www.localbusinesscalendar.com" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#fff', color: 'var(--color-primary)', padding: '0.85rem 1.75rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', border: '1px solid var(--color-primary)' }}>
                  See Upcoming Events ↗
                </a>
              </div>
            </div>

            {/* States panel */}
            <div className="lbo-hero-city-panel" style={{ background: '#fff', border: '1px solid var(--color-rule)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(10,22,40,.07)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-3)', padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--color-rule)', background: 'var(--color-paper-2)' }}>
                Browse by state
              </div>
              {STATES.map((state, i) => (
                <div key={state.slug} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--color-rule)', opacity: state.live ? 1 : 0.5 }}>
                  {state.live ? (
                    <Link href={`/${state.slug}`} style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-1)', textDecoration: 'none' }}>{state.name}</Link>
                  ) : (
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--fg-1)' }}>{state.name}</span>
                  )}
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: state.live ? 'var(--color-primary)' : 'var(--fg-4)' }}>
                    {state.orgCount}
                  </span>
                </div>
              ))}
              <Link href="/contact" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1.25rem', textDecoration: 'none' }}>
                <span style={{ fontSize: '0.825rem', fontWeight: 500, color: 'var(--color-primary)', fontStyle: 'italic' }}>Request a city →</span>
              </Link>
            </div>

          </div>
        </section>

        {/* Stats strip */}
        <section style={{ background: 'var(--color-ink)', padding: '0.6rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {[['588+', 'Verified profiles'], ['4', 'Texas cities'], ['8', 'Categories'], ['800+', 'Event sources monitored']].map(([val, label], i, arr) => (
              <>
                <span key={label} style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,.65)' }}>
                  <strong>{val}</strong> {label}
                </span>
                {i < arr.length - 1 && <span style={{ color: 'rgba(255,255,255,.3)', fontWeight: 300 }}>|</span>}
              </>
            ))}
          </div>
        </section>

        {/* What we track */}
        <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>What we track</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '0.5rem' }}>
            The organizations that shape your local business community
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--fg-3)', lineHeight: 1.7, marginBottom: '1.75rem', maxWidth: '600px' }}>
            From chambers and trade associations to networking groups and professional societies — we pull them together so you can see the full picture of who's active in your market.
          </p>
          <div className="lbo-cat-grid">
            {[
              { label: 'Chamber +',        sub: 'Chambers, associations & civic groups',  icon: 'ti-building-community' },
              { label: 'Technology +',     sub: 'Tech, startups & innovation groups',      icon: 'ti-cpu' },
              { label: 'Real Estate +',    sub: 'Real estate, construction & design',      icon: 'ti-building' },
              { label: 'Small Business +', sub: 'Small biz, finance & professional svcs',  icon: 'ti-briefcase' },
              { label: '+ More',           sub: 'Healthcare, civic & other industries',    icon: 'ti-layout-grid' },
            ].map(cat => (
              <div key={cat.label} style={{ background: '#fff', border: '1px solid var(--color-rule)', borderRadius: '12px', padding: '18px 16px', position: 'relative', overflow: 'hidden' }}>
                <i className={`ti ${cat.icon}`} style={{ position: 'absolute', bottom: '-4px', right: '6px', fontSize: '2.25rem', color: '#c2410c', opacity: 0.18, pointerEvents: 'none' }} />
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--fg-1)', marginBottom: '4px', position: 'relative' }}>{cat.label}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--fg-3)', lineHeight: 1.5, position: 'relative' }}>{cat.sub}</div>
              </div>
            ))}
          </div>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid var(--color-rule)', margin: '0 2rem' }} />

        {/* States we cover */}
        <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Where we cover</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '0.5rem' }}>
            States in the directory
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--fg-3)', lineHeight: 1.7, marginBottom: '1.75rem', maxWidth: '560px' }}>
            We're starting with Texas — four major cities, 588+ organizations already verified. More states are coming soon.
          </p>
          <div className="lbo-city-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
            {[
              { ...STATES[0], abbr: 'TX' },
              { ...STATES[1], abbr: 'FL' },
              { ...STATES[2], abbr: 'GA' },
              { ...STATES[3], abbr: 'OH' },
            ].map(state => (
              <div key={state.slug} style={{ background: state.live ? '#fff8f5' : 'var(--color-paper-2)', border: `1px solid ${state.live ? '#f5d5c8' : 'var(--color-rule)'}`, borderRadius: '12px', padding: '24px', opacity: state.live ? 1 : 0.55, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', bottom: '-10px', right: '12px', fontSize: '4rem', fontWeight: 800, color: state.live ? '#c2410c' : 'var(--fg-1)', opacity: 0.07, letterSpacing: '-0.05em', lineHeight: 1, pointerEvents: 'none', fontFamily: 'var(--font-sans)' }}>
                  {state.abbr}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', position: 'relative' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--fg-1)' }}>{state.name}</h3>
                  <span style={{ fontSize: '0.7rem', fontWeight: 600, color: state.live ? 'var(--color-accent)' : 'var(--fg-4)', background: '#fff', padding: '3px 10px', borderRadius: '100px', border: `1px solid ${state.live ? '#f5d5c8' : 'var(--color-rule)'}`, whiteSpace: 'nowrap' }}>
                    {state.orgCount}
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--fg-3)', lineHeight: 1.6, marginBottom: '14px', position: 'relative' }}>
                  {state.cities.join(' · ')}
                </p>
                {state.live ? (
                  <Link href={`/${state.slug}`} style={{ fontSize: '0.8rem', color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'none', position: 'relative' }}>
                    Browse {state.name} →
                  </Link>
                ) : (
                  <span style={{ fontSize: '0.8rem', color: 'var(--fg-4)', fontWeight: 500, position: 'relative' }}>Coming soon</span>
                )}
              </div>
            ))}
          </div>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid var(--color-rule)', margin: '0 2rem' }} />

        {/* LBC connection — full width dark band */}
        <section style={{ background: 'var(--color-ink)', padding: '3rem 2rem', margin: '0' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748b', marginBottom: '0.5rem' }}>Part of the Local Business Network</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 600, color: '#fff', marginBottom: '0.4rem' }}>
                Also on Local Business Calendars
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6, maxWidth: '520px' }}>
                Many of the organizations in this directory host weekly events tracked on our sister site — free to browse, delivered every Monday morning.
              </p>
            </div>
            <a href="https://www.localbusinesscalendar.com" target="_blank" rel="noopener noreferrer"
              style={{ background: 'var(--color-primary)', color: '#fff', padding: '0.85rem 1.75rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
              Browse This Week's Events ↗
            </a>
          </div>
        </section>

        {/* Claim CTA */}
        <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div className="lbo-claim-row" style={{ background: 'var(--color-paper-2)', border: '1px solid var(--color-rule)', borderRadius: '12px', padding: '2.25rem 2.5rem' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-accent)', marginBottom: '0.5rem' }}>For organization leaders</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '0.6rem' }}>
                Is your organization listed here?
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--fg-3)', lineHeight: 1.7 }}>
                Claim your listing to take control of how you appear to thousands of local business professionals. Add your logo, update your description, and verify your contact info. Free to request — reviewed within 1–2 days.
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
      <Footer />
    </>
  );
}
