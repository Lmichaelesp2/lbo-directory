import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Help | Local Business Organizations',
  description: 'How to use the Local Business Organizations directory — browsing, categories, claiming your listing, and more.',
};

const SECTIONS = [
  {
    icon: 'ti-building-community',
    title: 'What is Local Business Organizations?',
    body: 'Local Business Organizations is a curated directory of chambers of commerce, professional associations, networking groups, and trade organizations — organized by city and category. Instead of piecing together who\'s active in your market from a dozen different websites, everything is in one place.',
  },
  {
    icon: 'ti-map-pin',
    title: 'Browsing by city',
    body: 'We currently cover four Texas cities — San Antonio, Houston, Dallas, and Austin — each with its own directory page. Use the city links in the navigation bar at the top to jump directly to a city, or start at the Texas overview page to see all four at once.',
  },
  {
    icon: 'ti-layout-grid',
    title: 'Browsing by category',
    body: 'Each city directory is organized into categories: Chamber & Networking, Technology, Real Estate, Small Business, and Other. Use the category filter on any city page to narrow down the list to the type of organization you\'re looking for.',
  },
  {
    icon: 'ti-id-badge',
    title: 'Claiming your listing',
    body: 'If your organization is already listed, you can claim it to take control of how you appear in the directory. Claiming lets you update your description, add a logo, verify your contact information, and connect your event calendar. It\'s free to request and reviewed within 1–2 business days.',
  },
  {
    icon: 'ti-circle-plus',
    title: 'Adding a missing organization',
    body: 'Don\'t see your organization listed? Use the Contact page to submit it. Include the organization name, city, category, and website. We review all submissions and add qualifying organizations to the directory.',
  },
  {
    icon: 'ti-calendar',
    title: 'Connecting to Local Business Calendars',
    body: 'Many of the organizations in this directory host weekly events tracked on our sister site, Local Business Calendars. Look for the "See Upcoming Events" link on any organization profile, or visit localbusinesscalendars.com to browse this week\'s networking events, chamber mixers, and business gatherings across Texas.',
  },
  {
    icon: 'ti-message-circle',
    title: 'Still have questions?',
    body: 'We\'re happy to help. Use the Contact page to send us a message or email us directly at louis@localbusinesscalendars.com. We respond the same day.',
  },
];

export default function HelpPage() {
  return (
    <>
      <Navigation />
      <Breadcrumb items={[
        { label: 'Local Business Organizations', href: '/' },
        { label: 'Help' },
      ]} />
      <main style={{ flex: 1 }}>

        {/* Hero */}
        <section style={{ background: 'var(--color-ink)', padding: '3rem 2rem' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 600, color: '#fff', lineHeight: 1.2, marginBottom: '0.75rem' }}>
              Help & Getting Started
            </h1>
            <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: 1.7 }}>
              Everything you need to know to get the most out of the directory.
            </p>
          </div>
        </section>

        {/* Sections */}
        <section style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {SECTIONS.map((s, i) => (
              <div key={i} style={{ position: 'relative', overflow: 'hidden', background: '#fff', border: '1px solid var(--color-rule)', borderRadius: '12px', padding: '1.5rem 1.75rem' }}>
                <i className={`ti ${s.icon}`} style={{ position: 'absolute', bottom: '-4px', right: '6px', fontSize: '2.25rem', color: '#c2410c', opacity: 0.15, pointerEvents: 'none' }} aria-hidden="true" />
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '0.5rem', position: 'relative' }}>{s.title}</h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--fg-3)', lineHeight: 1.8, position: 'relative' }}>{s.body}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ marginTop: '2.5rem', background: 'var(--color-paper-2)', border: '1px solid var(--color-rule)', borderRadius: '12px', padding: '1.5rem 1.75rem' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-accent)', marginBottom: '0.5rem' }}>Ready to explore?</div>
            <p style={{ fontSize: '0.875rem', color: 'var(--fg-3)', lineHeight: 1.7, marginBottom: '1rem' }}>
              Browse organizations in your city — or claim your listing if you lead one.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/texas" style={{ background: 'var(--color-accent)', color: '#fff', padding: '0.65rem 1.25rem', borderRadius: '8px', fontSize: '0.825rem', fontWeight: 700, textDecoration: 'none' }}>
                Browse Texas →
              </Link>
              <Link href="/claim" style={{ background: '#fff', color: 'var(--color-primary)', padding: '0.65rem 1.25rem', borderRadius: '8px', fontSize: '0.825rem', fontWeight: 600, textDecoration: 'none', border: '1px solid var(--color-primary)' }}>
                Claim Your Listing →
              </Link>
              <Link href="/contact" style={{ background: '#fff', color: 'var(--fg-2)', padding: '0.65rem 1.25rem', borderRadius: '8px', fontSize: '0.825rem', fontWeight: 600, textDecoration: 'none', border: '1px solid var(--color-rule)' }}>
                Contact Us →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
