import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Texas Business Network | Now Forming — Statewide Membership',
  description: 'Texas Business Network is a statewide membership network connecting chambers, networking groups, and professional associations across every major Texas city. Now forming — claim your listing to join.',
};

const CHAPTERS = [
  { city: 'San Antonio', slug: 'san-antonio', status: 'founding' },
  { city: 'Houston',     slug: 'houston',     status: 'forming'  },
  { city: 'Dallas',      slug: 'dallas',      status: 'forming'  },
  { city: 'Austin',      slug: 'austin',      status: 'forming'  },
];

export default function TexasBusinessOrganizationsPage() {
  return (
    <>
      <Navigation />
      <main style={{ flex: 1 }}>

        {/* Hero */}
        <section style={{ background: 'var(--color-ink)', padding: '64px 32px 56px', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.12)', borderRadius: '100px', padding: '5px 14px', marginBottom: '24px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', flexShrink: 0 }}></span>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,.7)' }}>Now Forming · Founding Members Welcome</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.25rem, 5vw, 3.25rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: '20px' }}>
              Texas Business Network
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,.65)', lineHeight: 1.75, maxWidth: '600px', marginBottom: '32px' }}>
              A statewide membership network connecting chambers of commerce, professional associations, and networking groups across every major Texas city. One network. Four cities. Thousands of organizations.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/claim"
                style={{ background: 'var(--color-accent)', color: '#fff', padding: '13px 28px', borderRadius: '8px', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>
                Claim your listing to join →
              </Link>
              <Link href="/"
                style={{ background: 'rgba(255,255,255,.08)', color: '#fff', padding: '13px 28px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,.15)' }}>
                Browse the directory
              </Link>
            </div>
          </div>
        </section>

        {/* What is TBN */}
        <section style={{ padding: '64px 32px', maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '14px' }}>What is TBN?</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--fg-1)', lineHeight: 1.2, marginBottom: '16px' }}>
                One network for every business organization in Texas
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--fg-3)', lineHeight: 1.8, marginBottom: '16px' }}>
                The Texas Business Network (TBN) is a statewide membership network built on top of the Local Business Organizations directory. When your organization claims its listing, you become part of both your <strong style={{ color: 'var(--fg-1)' }}>local city chapter</strong> and the broader <strong style={{ color: 'var(--fg-1)' }}>Texas Business Network</strong>.
              </p>
              <p style={{ fontSize: '14px', color: 'var(--fg-3)', lineHeight: 1.8 }}>
                Membership is free to start. Our goal is to create a verified, current, and connected record of every active business organization across the state — something that has never existed before.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                ['🏛', 'City Chapters', "Each city has its own chapter — San Antonio, Houston, Dallas, and Austin. Your organization is a member of your city's chapter automatically when you join."],
                ['🌐', 'Statewide Network', 'All city chapters roll up into the Texas Business Network, creating cross-city visibility and connection across the state.'],
                ['✓', 'Verified Listings', 'Members have verified, claimed listings — not just scraped data. The right person is accountable for keeping information current.'],
                ['📬', 'Quarterly Check-ins', 'We reach out every 90 days to confirm your contact info is still accurate. Stale data is the enemy of a useful directory.'],
              ].map(([icon, title, desc]) => (
                <div key={title} style={{ background: '#fff', border: '1px solid var(--color-rule)', borderRadius: '10px', padding: '16px 18px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '18px', flexShrink: 0, marginTop: '1px' }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--fg-1)', marginBottom: '4px' }}>{title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--fg-3)', lineHeight: 1.6 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid var(--color-rule)', margin: '0 32px' }} />

        {/* City chapters */}
        <section style={{ padding: '64px 32px', maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '14px' }}>City Chapters</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--fg-1)', lineHeight: 1.2, marginBottom: '32px' }}>
            Four Texas cities. One network.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {CHAPTERS.map(ch => (
              <div key={ch.city} style={{ background: '#fff', border: '1px solid var(--color-rule)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--fg-1)' }}>{ch.city}</h3>
                  <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', padding: '3px 10px', borderRadius: '100px', background: ch.status === 'founding' ? '#fef3c7' : 'var(--color-primary-bg)', color: ch.status === 'founding' ? '#92400e' : 'var(--color-primary)' }}>
                    {ch.status === 'founding' ? 'Founding Chapter' : 'Now Forming'}
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--fg-3)', lineHeight: 1.6, margin: 0 }}>
                  {ch.city} chapter of the Texas Business Network — open to all verified business organizations in the {ch.city} metro area.
                </p>
                <Link href={`/texas/${ch.slug}`} style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)', textDecoration: 'none', marginTop: '4px' }}>
                  Browse {ch.city} organizations →
                </Link>
              </div>
            ))}
          </div>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid var(--color-rule)', margin: '0 32px' }} />

        {/* How to join */}
        <section style={{ padding: '64px 32px', maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '14px' }}>How to Join</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--fg-1)', lineHeight: 1.2, marginBottom: '32px' }}>
            Three steps to membership
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '36px' }}>
            {[
              ['1', 'Find your organization', 'Search for your organization in the Local Business Organizations directory. We already have 500+ Texas organizations listed.'],
              ['2', 'Claim your listing', 'Submit a claim request with your contact information. Our team verifies your connection to the organization within 1–2 business days.'],
              ['3', 'You are a member', 'Once approved, your organization becomes a verified member of your city chapter and the Texas Business Network. Free to start.'],
            ].map(([num, title, desc]) => (
              <div key={num} style={{ background: '#fff', border: '1px solid var(--color-rule)', borderRadius: '12px', padding: '24px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 800, fontFamily: 'var(--font-serif)', marginBottom: '14px' }}>{num}</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--fg-1)', marginBottom: '8px' }}>{title}</div>
                <div style={{ fontSize: '13px', color: 'var(--fg-3)', lineHeight: 1.7 }}>{desc}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link href="/claim"
              style={{ background: 'var(--color-accent)', color: '#fff', padding: '13px 32px', borderRadius: '8px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>
              Claim your listing →
            </Link>
            <p style={{ fontSize: '12px', color: 'var(--fg-4)', marginTop: '12px' }}>Free membership · No dues · Verification required</p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
