import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Sponsorship | Local Business Organizations',
  description: 'Sponsor the Local Business Organizations directory and reach thousands of business professionals in San Antonio, Houston, Dallas, and Austin.',
};

export default function SponsorPage() {
  return (
    <>
      <Navigation />
      <main style={{ flex: 1 }}>
        <section style={{ background: 'var(--color-ink)', padding: '3rem 2rem' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5b82f7', marginBottom: '0.75rem' }}>
              <Link href="/" style={{ color: '#5b82f7', textDecoration: 'none' }}>Home</Link> › Sponsorship
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 600, color: '#fff', lineHeight: 1.2, marginBottom: '0.75rem' }}>
              Reach Texas business professionals
            </h1>
            <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: 1.7 }}>
              Local Business Organizations and Local Business Calendars together reach thousands of business professionals across four Texas cities each week.
            </p>
          </div>
        </section>

        <section style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 2rem' }}>

          <div style={{ background: 'var(--color-paper-2)', border: '1px solid var(--color-rule)', borderRadius: '12px', padding: '1.75rem 2rem', marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Community supported</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '0.75rem' }}>
              Sponsorships keep both sites free
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--fg-3)', lineHeight: 1.75 }}>
              Both Local Business Organizations and Local Business Calendars are free to use. Sponsorships are how we keep them that way. Sponsors get consistent, prominent visibility in front of an engaged audience of business professionals — the same people looking for organizations to join, events to attend, and connections to make in their city.
            </p>
          </div>

          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '1rem' }}>Sponsorship structure</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--fg-3)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
            Each city has four category sponsorship slots: Chamber &amp; Networking, Real Estate, Technology, and Small Business. Sponsors are featured in the city directory, the weekly events calendar, and the Monday email newsletter — giving you consistent, ongoing visibility with your target market.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '2rem' }}>
            {['Chamber & Networking', 'Real Estate', 'Technology', 'Small Business'].map(cat => (
              <div key={cat} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem 1.25rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--fg-1)' }}>
                {cat}
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--color-ink)', borderRadius: '12px', padding: '1.75rem 2rem', marginBottom: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
              Interested in sponsoring?
            </h3>
            <p style={{ fontSize: '0.825rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '1rem' }}>
              Reach out and we'll send you current availability, pricing, and placement details for the cities you're interested in.
            </p>
            <a href="mailto:hello@localbusinessorganizations.com"
              style={{ background: 'var(--color-accent)', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>
              Contact Us About Sponsorship →
            </a>
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--fg-4)', lineHeight: 1.7 }}>
            Sponsorships are also available on the companion site <a href="https://www.localbusinesscalendars.com/sponsor" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>Local Business Calendars</a>. Cross-property packages spanning both sites are available — ask us about bundled pricing.
          </p>

        </section>
      </main>
      <Footer />
    </>
  );
}
