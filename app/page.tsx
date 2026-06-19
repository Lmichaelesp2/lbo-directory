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
  { name: 'Texas',   slug: 'texas',   cities: ['San Antonio', 'Houston', 'Dallas', 'Austin'], orgCount: '588+',        live: true  },
  { name: 'Florida', slug: 'florida', cities: ['Miami', 'Orlando', 'Tampa', 'Jacksonville'],  orgCount: 'Coming soon', live: false },
  { name: 'Georgia', slug: 'georgia', cities: ['Atlanta', 'Savannah', 'Augusta'],             orgCount: 'Coming soon', live: false },
  { name: 'Ohio',    slug: 'ohio',    cities: ['Columbus', 'Cleveland', 'Cincinnati'],         orgCount: 'Coming soon', live: false },
];

const TESTIMONIALS = [
  {
    quote: 'I had no idea how many organizations were active in San Antonio until I found this directory. It completely changed how I approach networking.',
    name: 'Rachel M.',
    location: 'San Antonio, TX',
  },
  {
    quote: 'Finally a single place to see every chamber, association, and networking group in Houston. This saved me hours of searching.',
    name: 'David K.',
    location: 'Houston, TX',
  },
  {
    quote: 'I used this to find three new organizations to join in Austin. The category breakdown made it easy to find exactly the right fit.',
    name: 'Priya S.',
    location: 'Austin, TX',
  },
];

const FAQ_ITEMS = [
  {
    question: 'Is it free to browse the directory?',
    answer: 'Yes — browsing the directory is completely free. Create a free account to unlock full profiles including contact info, descriptions, social links, and membership details.',
  },
  {
    question: 'How do I claim my organization\'s listing?',
    answer: 'Click "Claim Your Listing" on any organization profile or use the link in the navigation. Free to request — reviewed and verified within 1–2 business days.',
  },
  {
    question: 'How do you find and verify organizations?',
    answer: 'We research local organizations through public records, event platforms, city resources, and direct outreach. Each profile is manually reviewed before being added to the directory.',
  },
  {
    question: 'Which cities and states do you cover?',
    answer: 'We currently cover four major Texas cities — San Antonio, Houston, Dallas, and Austin — with 588+ verified organizations. More states are coming soon.',
  },
  {
    question: 'Can I see the events these organizations host?',
    answer: 'Yes. Many organizations in this directory host weekly events tracked on our sister site, Local Business Calendars. Subscribe free to get every upcoming event in your city delivered every Monday morning.',
  },
];

const CITY_NEWSLETTERS = [
  { name: 'San Antonio', slug: 'san-antonio', tagline: 'Chamber events, mixers & professional networking' },
  { name: 'Austin',      slug: 'austin',      tagline: 'Tech meetups, startups & professional networking' },
  { name: 'Dallas',      slug: 'dallas',      tagline: 'DFW networking, real estate & business events' },
  { name: 'Houston',     slug: 'houston',     tagline: 'Energy sector, chamber & professional networking' },
];

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main style={{ flex: 1 }}>

        {/* ── 1. Hero ── */}
        <section className="lbo-hero-section" style={{ background: 'var(--color-paper)', padding: '4rem 2rem 0', borderBottom: '1px solid var(--color-rule)' }}>
          <div className="lbo-hero-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 320px', gap: '3rem', alignItems: 'start', paddingBottom: '3.5rem' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-primary)', marginBottom: '1.25rem' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--color-primary)', display: 'inline-block' }} />
                Business Organizations Directory · Texas
              </div>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.25rem, 4.5vw, 3rem)', fontWeight: 600, color: 'var(--fg-1)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '1.25rem' }}>
                The business organizations that matter{' '}
                <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#042C53' }}>in your city.</em>
              </h1>
              <p style={{ fontSize: '1.05rem', color: 'var(--fg-3)', lineHeight: 1.6, maxWidth: '560px', marginBottom: '2rem' }}>
                A curated directory of chambers of commerce, professional associations, networking groups, and trade organizations — organized by city and category so you know who's out there and where to plug in.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <Link href="/texas" style={{ background: 'var(--color-accent)', color: '#fff', padding: '0.85rem 1.75rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none' }}>
                  Browse Organizations →
                </Link>
                <a href="https://www.localbusinesscalendars.com" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#fff', color: 'var(--color-primary)', padding: '0.85rem 1.75rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', border: '1px solid var(--color-primary)' }}>
                  See This Week's Events ↗
                </a>
              </div>
            </div>

            {/* States panel */}
            <div className="lbo-hero-city-panel" style={{ background: '#fff', border: '1px solid var(--color-rule)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(10,22,40,.07)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-3)', padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--color-rule)', background: 'var(--color-paper-2)' }}>
                Browse by state
              </div>
              {STATES.map((state) => (
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

        {/* ── 2. Stats strip ── */}
        <section style={{ background: 'var(--color-dark-section)', padding: '0.6rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {[
              ['588+', 'Organizations verified'],
              ['4',    'Texas cities covered'],
              ['8',    'Industry categories'],
              ['Free', 'To browse & join'],
            ].map(([val, label], i, arr) => (
              <>
                <span key={label} style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,.65)' }}>
                  <strong>{val}</strong> {label}
                </span>
                {i < arr.length - 1 && <span style={{ color: 'rgba(255,255,255,.3)', fontWeight: 300 }}>|</span>}
              </>
            ))}
          </div>
        </section>

        {/* ── 3. How it works (3 steps) ── */}
        <section style={{ background: '#fff', padding: '4rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>How it works</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '1.75rem' }}>
              Find Where to Plug In — in 3 Steps
            </h2>
            <div className="lbo-steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {[
                { n: '1', head: 'Browse by city', body: 'Choose your city and see every chamber, association, networking group, and trade organization active in your market — all in one place.' },
                { n: '2', head: 'Filter by category', body: 'Narrow by category — Networking, Technology, Real Estate, Small Business, Chambers — to find the right organizations for your industry and goals.' },
                { n: '3', head: 'Join and get involved', body: 'Find the organizations that match your goals, join the ones that fit, and participate consistently. That\'s how you build real relationships and become a known presence in your local business community.' },
              ].map(step => (
                <div key={step.n} style={{ background: 'var(--color-paper-2)', border: '1px solid var(--color-rule)', borderRadius: '12px', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', bottom: '-12px', right: '10px', fontSize: '4.5rem', fontWeight: 800, color: 'var(--color-primary)', opacity: 0.07, lineHeight: 1, pointerEvents: 'none', fontFamily: 'var(--font-sans)', letterSpacing: '-0.05em' }}>{step.n}</div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 700, color: 'var(--fg-1)', marginBottom: '0.5rem', position: 'relative' }}>{step.head}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--fg-3)', lineHeight: 1.6, position: 'relative' }}>{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. What we track (categories) ── */}
        <section style={{ background: 'var(--color-paper-2)', padding: '4rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>What we track</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '0.5rem' }}>
              The organizations that shape your local business community
            </h2>
            <p style={{ fontSize: '0.925rem', color: 'var(--fg-3)', lineHeight: 1.7, marginBottom: '1.75rem', maxWidth: '600px' }}>
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
                  <i className={`ti ${cat.icon}`} style={{ position: 'absolute', bottom: '-4px', right: '6px', fontSize: '2.25rem', color: 'var(--fg-1)', opacity: 0.07, pointerEvents: 'none' }} />
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--fg-1)', marginBottom: '4px', position: 'relative' }}>{cat.label}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--fg-3)', lineHeight: 1.5, position: 'relative' }}>{cat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. Testimonials ── */}
        <section style={{ background: '#fff', padding: '4rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: '0.75rem' }}>
              What people are saying
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--fg-1)', lineHeight: 1.3, marginBottom: '2rem', maxWidth: '600px' }}>
              Professionals across Texas are using this directory{' '}
              <em style={{ fontStyle: 'italic', fontWeight: 400 }}>to find where they belong.</em>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="lbo-testimonial-grid">
              {TESTIMONIALS.map(t => (
                <div key={t.name} style={{ background: 'var(--color-paper-2)', border: '1px solid var(--color-rule)', borderRadius: '12px', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '2px', marginBottom: '0.75rem' }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="var(--color-accent)" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  <blockquote style={{ fontSize: '0.875rem', color: 'var(--fg-2)', lineHeight: 1.65, marginBottom: '1rem', fontStyle: 'italic' }}>"{t.quote}"</blockquote>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--fg-1)' }}>— {t.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--fg-4)', marginTop: '2px' }}>{t.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. States we cover ── */}
        <section style={{ background: 'var(--color-paper-2)', padding: '4rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Where we cover</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '0.5rem' }}>
              States in the directory
            </h2>
            <p style={{ fontSize: '0.925rem', color: 'var(--fg-3)', lineHeight: 1.7, marginBottom: '1.75rem', maxWidth: '560px' }}>
              Starting with Texas — four major cities, 588+ organizations verified. More states coming soon.
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
          </div>
        </section>

        {/* ── 7. Newsletter signup + LBC connection (combined) ── */}
        <section style={{ background: 'var(--color-dark-section)', padding: '4rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748b', marginBottom: '0.5rem' }}>Free Weekly Newsletter</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 600, color: '#fff', lineHeight: 1.3, marginBottom: '0.75rem' }}>
              See what these organizations are hosting{' '}
              <em style={{ fontStyle: 'italic', fontWeight: 400 }}>every week.</em>
            </h2>
            <p style={{ fontSize: '0.925rem', color: '#94a3b8', lineHeight: 1.7, maxWidth: '600px', marginBottom: '2rem' }}>
              The organizations in this directory host hundreds of networking mixers, chamber meetings, tech meetups, and real estate gatherings every week. Subscribe free to your city's weekly newsletter on Local Business Calendars and get every event delivered to your inbox every Monday morning.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '1.25rem' }} className="lbo-newsletter-grid">
              {CITY_NEWSLETTERS.map(city => (
                <a
                  key={city.slug}
                  href={`https://www.localbusinesscalendars.com/texas/${city.slug}/subscribe`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lbo-newsletter-card"
                >
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--fg-1)', marginBottom: '3px' }}>{city.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--fg-3)', lineHeight: 1.4 }}>{city.tagline}</div>
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', whiteSpace: 'nowrap', marginLeft: '1rem', flexShrink: 0 }}>
                    Subscribe free →
                  </span>
                </a>
              ))}
            </div>
            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Free forever · No credit card · Unsubscribe anytime · Powered by{' '}
              <a href="https://www.localbusinesscalendars.com" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: 600 }}>
                Local Business Calendars ↗
              </a>
            </p>
          </div>
        </section>

        {/* ── 8. Sponsor teaser ── */}
        <section style={{ background: '#fff', padding: '4rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ background: 'var(--color-dark-section)', borderRadius: '16px', padding: '3rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#64748b', marginBottom: '0.75rem' }}>Community Supported</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 600, color: '#fff', lineHeight: 1.3, marginBottom: '1rem', maxWidth: '600px', margin: '0 auto 1rem' }}>
                Local Business Organizations Is Free — and Sponsors Make That Possible
              </h2>
              <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto 1.75rem' }}>
                Thousands of business professionals use this directory every week to find organizations, research their local market, and decide where to invest their time. Sponsors keep it free for everyone — with exclusive category visibility and a direct connection to the professionals in their space.
              </p>
              <Link href="/sponsor" style={{ display: 'inline-block', background: 'var(--color-accent)', color: '#fff', padding: '0.85rem 1.75rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none' }}>
                Learn About Sponsorship →
              </Link>
            </div>
          </div>
        </section>

        {/* ── 9. FAQ ── */}
        <section style={{ background: 'var(--color-paper-2)', padding: '4rem 2rem' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>FAQ</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '2rem' }}>
              Frequently Asked Questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {FAQ_ITEMS.map((item, i) => (
                <details key={i} style={{ borderTop: '1px solid var(--color-rule)', padding: '1.1rem 0' }}>
                  <summary style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--fg-1)', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                    <span>{item.question}</span>
                    <span style={{ fontSize: '1.1rem', color: 'var(--fg-4)', flexShrink: 0, userSelect: 'none' }}>+</span>
                  </summary>
                  <p style={{ fontSize: '0.875rem', color: 'var(--fg-3)', lineHeight: 1.7, marginTop: '0.75rem', paddingRight: '1.5rem' }}>
                    {item.answer}
                  </p>
                </details>
              ))}
              <div style={{ borderTop: '1px solid var(--color-rule)' }} />
            </div>
          </div>
        </section>

        {/* ── 10. Claim CTA ── */}
        <section style={{ background: '#fff', padding: '4rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
