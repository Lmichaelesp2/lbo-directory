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
    name: 'Colorado',
    slug: 'colorado',
    cities: ['Denver', 'Colorado Springs', 'Boulder'],
    orgCount: 'Coming soon',
    live: false,
  },
];

const WHAT_WE_TRACK = [
  'Chambers of commerce',
  'Professional networking groups',
  'Industry & trade associations',
  'Real estate organizations',
  'Technology groups & meetups',
  'Community & civic organizations',
  'Construction & trade associations',
  'Healthcare & professional societies',
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
                  Browse Texas →
                </Link>
                <a href="https://www.localbusinesscalendars.com" target="_blank" rel="noopener noreferrer"
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
                <div key={state.slug} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1.25rem', borderBottom: i < STATES.length - 1 ? '1px solid var(--color-rule)' : 'none', opacity: state.live ? 1 : 0.5 }}>
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

        {/* States section */}
        <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Coverage</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '0.5rem' }}>
            States we cover
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--fg-3)', lineHeight: 1.7, marginBottom: '1.75rem', maxWidth: '560px' }}>
            We're starting in Texas and expanding city by city. Each state gets its own directory, each city its own page — built to work as a standalone resource for anyone searching for local business organizations in that market.
          </p>
          <div className="lbo-city-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
            {STATES.map(state => (
              <div key={state.slug} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', opacity: state.live ? 1 : 0.6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--fg-1)' }}>{state.name}</h3>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: state.live ? 'var(--color-primary)' : 'var(--fg-4)', background: state.live ? 'var(--color-primary-bg)' : 'var(--color-paper-2)', padding: '3px 10px', borderRadius: '100px' }}>
                    {state.orgCount}
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--fg-4)', marginBottom: state.live ? '14px' : '0' }}>
                  {state.cities.join(' · ')}
                </p>
                {state.live && (
                  <Link href={`/${state.slug}`} style={{ fontSize: '0.8rem', color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'none' }}>
                    Browse {state.name} organizations →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid var(--color-rule)', margin: '0 2rem' }} />

        {/* What we track */}
        <section className="lbo-track-grid" style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '4rem', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>What we track</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '0.75rem' }}>
              Every type of local business organization
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--fg-3)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              We research and verify profiles for a wide range of organizations — so you have one place to find who's active in your market, instead of hunting across a dozen different websites.
            </p>
            <div className="lbo-track-checklist" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {WHAT_WE_TRACK.map(item => (
                <div key={item} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ color: 'var(--color-primary)', fontSize: '13px', flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--fg-2)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ minWidth: '260px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>Also connected to</div>
            <div style={{ background: '#fff', border: '1px solid var(--color-rule)', borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--fg-1)', marginBottom: '0.4rem' }}>Local Business Calendars</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--fg-3)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                Many of the organizations in this directory host weekly events tracked on our sister site — free to browse, delivered every Monday.
              </p>
              <a href="https://www.localbusinesscalendars.com" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textDecoration: 'none' }}>
                Visit Local Business Calendars ↗
              </a>
            </div>
          </div>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid var(--color-rule)', margin: '0 2rem' }} />

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
