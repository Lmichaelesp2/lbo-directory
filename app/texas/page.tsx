import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { CITIES, CITY_CONTENT } from '@/lib/config';

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

const TEXAS_TESTIMONIALS = [
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

const TEXAS_FAQ = [
  {
    question: 'Is it free to browse the directory?',
    answer: 'Yes — browsing is completely free. Create a free account to unlock full profiles including contact info, descriptions, social links, and membership details.',
  },
  {
    question: 'Which Texas cities are covered?',
    answer: 'We currently cover San Antonio, Houston, Dallas, and Austin — with 588+ verified organizations across all four cities. More Texas cities and other states are coming soon.',
  },
  {
    question: 'How do I claim my organization\'s listing?',
    answer: 'Click "Claim Your Listing" on any organization profile or use the link in the navigation. Free to request — reviewed and verified within 1–2 business days.',
  },
  {
    question: 'Can I see the events these organizations host?',
    answer: 'Yes. Many organizations in this directory host weekly events tracked on Local Business Calendars. Subscribe free to get every upcoming event in your city delivered every Monday morning.',
  },
  {
    question: 'How do you find and verify organizations?',
    answer: 'We research local organizations through public records, event platforms, city resources, and direct outreach. Each profile is manually reviewed before being added to the directory.',
  },
];

const CITY_NEWSLETTERS = [
  { name: 'San Antonio', slug: 'san-antonio', tagline: 'Chamber events, mixers & professional networking' },
  { name: 'Austin',      slug: 'austin',      tagline: 'Tech meetups, startups & professional networking' },
  { name: 'Dallas',      slug: 'dallas',      tagline: 'DFW networking, real estate & business events' },
  { name: 'Houston',     slug: 'houston',     tagline: 'Energy sector, chamber & professional networking' },
];

export default function TexasPage() {
  return (
    <>
      <Navigation activeCitySlug={undefined} activeState="texas" />
      <Breadcrumb items={[
        { label: 'Local Business Organizations', href: '/' },
        { label: 'Texas' },
      ]} />
      <main style={{ flex: 1 }}>

        {/* ── 1. Hero ── */}
        <section className="lbo-hero-section" style={{ background: 'var(--color-paper)', padding: '4rem 2rem 0', borderBottom: '1px solid var(--color-rule)' }}>
          <div className="lbo-hero-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 320px', gap: '3rem', alignItems: 'start', paddingBottom: '3.5rem' }}>

            <div>
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

        {/* ── 3. What's in the directory (cities + categories combined) ── */}
        <section style={{ background: 'var(--color-paper-2)', padding: '4rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>4 Texas Cities</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '0.5rem' }}>
              Find organizations in your city
            </h2>
            <p style={{ fontSize: '0.925rem', color: 'var(--fg-3)', lineHeight: 1.7, marginBottom: '1.75rem', maxWidth: '560px' }}>
              Each city has its own directory, organized by category. Browse all organizations, filter by type, and discover who's active in your market.
            </p>

            {/* City cards */}
            <div className="lbo-city-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '1.5rem' }}>
              {[
                { ...CITIES[0], abbr: 'SA' },
                { ...CITIES[1], abbr: 'HOU' },
                { ...CITIES[2], abbr: 'DAL' },
                { ...CITIES[3], abbr: 'AUS' },
              ].map(city => (
                <Link key={city.slug} href={`/texas/${city.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#fff8f5', border: '1px solid #f5d5c8', borderRadius: '12px', padding: '24px', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', bottom: '-10px', right: '10px', fontSize: '4rem', fontWeight: 800, color: '#c2410c', opacity: 0.07, letterSpacing: '-0.05em', lineHeight: 1, pointerEvents: 'none', fontFamily: 'var(--font-sans)' }}>
                      {city.abbr}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', position: 'relative' }}>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--fg-1)' }}>{city.name}</h3>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-accent)', background: '#fff', padding: '3px 10px', borderRadius: '100px', border: '1px solid #f5d5c8' }}>{city.count} orgs</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--fg-3)', lineHeight: 1.6, marginBottom: '14px', position: 'relative' }}>
                      {CITY_CONTENT[city.name]?.tagline}
                    </p>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-accent)', fontWeight: 600, position: 'relative' }}>Browse {city.name} organizations →</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Category cards */}
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

        {/* ── 4. Testimonials ── */}
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
              {TEXAS_TESTIMONIALS.map(t => (
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

        {/* ── 5. Newsletter signup ── */}
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

        {/* ── 6. FAQ ── */}
        <section style={{ background: 'var(--color-paper-2)', padding: '4rem 2rem' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>FAQ</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '2rem' }}>
              Frequently Asked Questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {TEXAS_FAQ.map((item, i) => (
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

        {/* ── 7. Claim CTA ── */}
        <section style={{ background: '#fff', padding: '4rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
          </div>
        </section>

      </main>
      <Footer stateName="Texas" />
    </>
  );
}
