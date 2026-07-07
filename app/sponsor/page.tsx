import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Partnership | Local Business Organizations',
  description: 'Partner with the Local Business Organizations directory and Local Business Calendars. One partnership, two properties — reach thousands of Texas business professionals in your category.',
};

const CATEGORIES = [
  ['Financial', 'Banking, lending, insurance, and financial services'],
  ['Business Protection', 'Legal, security, and business-protection services'],
  ['Talent & Workforce', 'Hiring, staffing, HR, and workforce development'],
  ['Technology', 'Software, IT services, and technology providers'],
];

export default function SponsorPage() {
  return (
    <>
      <Navigation />
      <Breadcrumb items={[
        { label: 'Local Business Organizations', href: '/' },
        { label: 'Partnership' },
      ]} />
      <main style={{ flex: 1 }}>

        <section style={{ background: 'var(--color-ink)', padding: '3rem 2rem' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 600, color: '#fff', lineHeight: 1.2, marginBottom: '0.75rem' }}>
              One partnership. Two properties. One audience.
            </h1>
            <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: 1.7, maxWidth: '560px' }}>
              A single Community Partnership covers both Local Business Organizations and Local Business Calendars — in your category, across all four Texas cities, reaching the same professionals on both platforms every week.
            </p>
          </div>
        </section>

        <section style={{ maxWidth: '760px', margin: '0 auto', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

          {/* How it works */}
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>How it works</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '0.75rem' }}>
              One partner per category — network-wide
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--fg-3)', lineHeight: 1.8, marginBottom: '1rem' }}>
              There are only four Community Partner spots on the entire network — one per category — and each one appears across all four Texas cities: San Antonio, Austin, Dallas, and Houston. For example, the <strong style={{ color: 'var(--fg-1)' }}>Technology</strong> partner is featured on every city&apos;s organization directory and every city&apos;s weekly events calendar.
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--fg-3)', lineHeight: 1.8 }}>
              Partners don&apos;t rotate and aren&apos;t shared with competitors — your category is exclusively yours for the duration of your partnership.
            </p>
          </div>

          {/* Categories */}
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-4)', marginBottom: '0.75rem' }}>The four partner categories</div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
                <thead>
                  <tr style={{ background: 'var(--color-paper-2)' }}>
                    <th style={{ textAlign: 'left', padding: '0.6rem 1rem', fontWeight: 700, color: 'var(--fg-3)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid var(--color-rule)' }}>Category</th>
                    <th style={{ textAlign: 'left', padding: '0.6rem 1rem', fontWeight: 700, color: 'var(--fg-3)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid var(--color-rule)' }}>Who it fits</th>
                    <th style={{ textAlign: 'center', padding: '0.6rem 0.75rem', fontWeight: 700, color: 'var(--fg-3)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid var(--color-rule)' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {CATEGORIES.map(([cat, desc], i) => (
                    <tr key={cat} style={{ background: i % 2 === 0 ? '#fff' : 'var(--color-paper)' }}>
                      <td style={{ padding: '0.65rem 1rem', fontWeight: 600, color: 'var(--fg-1)', borderBottom: '1px solid var(--color-rule)', whiteSpace: 'nowrap' }}>{cat}</td>
                      <td style={{ padding: '0.65rem 1rem', color: 'var(--fg-3)', borderBottom: '1px solid var(--color-rule)' }}>{desc}</td>
                      <td style={{ textAlign: 'center', padding: '0.65rem 0.75rem', borderBottom: '1px solid var(--color-rule)' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-accent)', background: '#fff7ed', padding: '2px 8px', borderRadius: '4px', whiteSpace: 'nowrap' }}>Open</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* What you get */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '1rem' }}>What your partnership includes</h2>
            <div className="m-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                ['ti-building-community', 'Local Business Organizations', 'Featured in every city\'s organization directory under your category'],
                ['ti-calendar-event',     'Local Business Calendars',     'Featured on every city\'s weekly events calendar under your category'],
                ['ti-mail',              'Weekly email newsletter',       'Included in the Monday events digest sent to subscribers in all four cities'],
                ['ti-lock',              'Exclusive placement',           'No rotation, no competitors — your category is yours for the duration'],
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
              Interested in a partner category?
            </h3>
            <p style={{ fontSize: '0.825rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Reach out and we&apos;ll send you current availability, pricing, and what placement looks like in your category across both platforms.
            </p>
            <a href="mailto:hello@localbusinessorganizations.com"
              style={{ background: 'var(--color-accent)', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>
              Contact Us About Partnership →
            </a>
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--fg-4)', lineHeight: 1.7 }}>
            You can also learn more about partnership on <a href="https://www.localbusinesscalendars.com/partner" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>Local Business Calendars</a>. Both sites share the same partnership structure — one inquiry covers both.
          </p>

        </section>
      </main>
      <Footer />
    </>
  );
}
