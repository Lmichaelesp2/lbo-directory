import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Sponsorship | Local Business Organizations',
  description: 'Sponsor the Local Business Organizations directory and Local Business Calendars. One sponsorship, two properties — reach thousands of business professionals in your city and category.',
};

const CITIES = ['San Antonio', 'Houston', 'Dallas', 'Austin'];
const CATEGORIES = ['Chamber & Networking', 'Real Estate', 'Technology', 'Small Business'];

export default function SponsorPage() {
  return (
    <>
      <Navigation />
      <Breadcrumb items={[
        { label: 'Local Business Organizations', href: '/' },
        { label: 'Sponsorship' },
      ]} />
      <main style={{ flex: 1 }}>

        <section style={{ background: 'var(--color-ink)', padding: '3rem 2rem' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 600, color: '#fff', lineHeight: 1.2, marginBottom: '0.75rem' }}>
              One sponsorship. Two properties. One audience.
            </h1>
            <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: 1.7, maxWidth: '560px' }}>
              A single sponsorship covers both Local Business Organizations and Local Business Calendars — in your city, in your category, reaching the same professionals across both platforms every week.
            </p>
          </div>
        </section>

        <section style={{ maxWidth: '760px', margin: '0 auto', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

          {/* How it works */}
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>How it works</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '0.75rem' }}>
              City × Category sponsorship
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--fg-3)', lineHeight: 1.8, marginBottom: '1rem' }}>
              Each sponsorship slot is defined by a city and a category. For example, the <strong style={{ color: 'var(--fg-1)' }}>San Antonio Technology</strong> sponsor is featured across both platforms — on the San Antonio organizations directory and on the San Antonio technology events calendar — giving you consistent, ongoing visibility with the exact audience you're trying to reach.
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--fg-3)', lineHeight: 1.8 }}>
              There are four category slots per city, and four cities — 16 total slots across Texas. Sponsors don't rotate; you own your slot for the duration of your sponsorship.
            </p>
          </div>

          {/* Grid: cities x categories */}
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-4)', marginBottom: '0.75rem' }}>Available slots — Texas</div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
                <thead>
                  <tr style={{ background: 'var(--color-paper-2)' }}>
                    <th style={{ textAlign: 'left', padding: '0.6rem 1rem', fontWeight: 700, color: 'var(--fg-3)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid var(--color-rule)' }}>Category</th>
                    {CITIES.map(c => (
                      <th key={c} style={{ textAlign: 'center', padding: '0.6rem 0.75rem', fontWeight: 700, color: 'var(--fg-3)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid var(--color-rule)' }}>{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CATEGORIES.map((cat, i) => (
                    <tr key={cat} style={{ background: i % 2 === 0 ? '#fff' : 'var(--color-paper)' }}>
                      <td style={{ padding: '0.65rem 1rem', fontWeight: 600, color: 'var(--fg-1)', borderBottom: '1px solid var(--color-rule)' }}>{cat}</td>
                      {CITIES.map(city => (
                        <td key={city} style={{ textAlign: 'center', padding: '0.65rem 0.75rem', borderBottom: '1px solid var(--color-rule)' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-accent)', background: '#fff7ed', padding: '2px 8px', borderRadius: '4px' }}>Open</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* What you get */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '1rem' }}>What your sponsorship includes</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                ['ti-building-community', 'Local Business Organizations', 'Featured in your city\'s organization directory under your category'],
                ['ti-calendar-event',     'Local Business Calendars',     'Featured on your city\'s weekly events calendar under your category'],
                ['ti-mail',              'Weekly email newsletter',       'Included in the Monday events digest sent to subscribers in your city'],
                ['ti-lock',              'Consistent placement',          'No rotation — your slot is yours for the duration of your sponsorship'],
              ].map(([icon, title, desc]) => (
                <div key={title} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem 1.25rem', position: 'relative', overflow: 'hidden' }}>
                  <i className={`ti ${icon}`} style={{ position: 'absolute', bottom: '-4px', right: '6px', fontSize: '2.25rem', color: '#c2410c', opacity: 0.15, pointerEvents: 'none' }} aria-hidden="true" />
                  <div style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--fg-1)', marginBottom: '0.3rem', position: 'relative' }}>{title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--fg-3)', lineHeight: 1.6, position: 'relative' }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ background: 'var(--color-ink)', borderRadius: '12px', padding: '2rem 2.25rem' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', marginBottom: '0.5rem' }}>Community supported</div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
              Interested in a sponsorship slot?
            </h3>
            <p style={{ fontSize: '0.825rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Reach out and we'll send you current availability, pricing, and what placement looks like in your city and category. Cross-city packages available.
            </p>
            <a href="mailto:hello@localbusinessorganizations.com"
              style={{ background: 'var(--color-accent)', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>
              Contact Us About Sponsorship →
            </a>
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--fg-4)', lineHeight: 1.7 }}>
            You can also learn more about sponsorship on <a href="https://www.localbusinesscalendar.com/sponsor" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>Local Business Calendars</a>. Both sites share the same sponsorship structure — one inquiry covers both.
          </p>

        </section>
      </main>
      <Footer />
    </>
  );
}
