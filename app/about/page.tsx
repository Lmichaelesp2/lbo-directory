import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'About | Local Business Organizations',
  description: 'Learn about Local Business Organizations — a curated directory of chambers, associations, and networking groups across Texas and beyond.',
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <Breadcrumb items={[
        { label: 'Local Business Organizations', href: '/' },
        { label: 'About' },
      ]} />
      <main style={{ flex: 1 }}>
        <section style={{ background: 'var(--color-ink)', padding: '3rem 2rem' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 600, color: '#fff', lineHeight: 1.2, marginBottom: '0.75rem' }}>
              About Local Business Organizations
            </h1>
            <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: 1.7 }}>
              A directory built for business professionals who want to know who's active in their market.
            </p>
          </div>
        </section>

        <section style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '0.75rem' }}>What this is</h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--fg-3)', lineHeight: 1.8 }}>
                Local Business Organizations is a curated directory of chambers of commerce, professional associations, networking groups, and trade organizations — organized by city and category. It's built for business professionals who want to know what organizations exist in their market, without having to piece it together from a dozen different websites.
              </p>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '0.75rem' }}>Part of a larger ecosystem</h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--fg-3)', lineHeight: 1.8 }}>
                This directory is a companion to <a href="https://www.localbusinesscalendars.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Local Business Calendars</a> — a free weekly calendar of networking events, chamber mixers, and business gatherings across Texas. Many of the organizations listed here host the events tracked on that site. Together, they give you a complete picture of the business community in your city: who the organizations are, and what they're hosting.
              </p>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '0.75rem' }}>How it's maintained</h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--fg-3)', lineHeight: 1.8 }}>
                We research and build profiles for business organizations across each city we cover. Organization leaders can claim their listing to update their information, add a logo, and verify their contact details. Claiming is free. We review every claim request to keep the directory accurate.
              </p>
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '0.75rem' }}>Where we're headed</h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--fg-3)', lineHeight: 1.8 }}>
                We currently cover four Texas cities — San Antonio, Houston, Dallas, and Austin — with Florida and other markets in the pipeline. Expansion is driven by demand: the more interest we see in a city, the sooner we build it. If your city isn't listed yet, <Link href="/contact" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>let us know</Link>.
              </p>
            </div>

            <div style={{ background: 'var(--color-paper-2)', border: '1px solid var(--color-rule)', borderRadius: '12px', padding: '1.5rem 1.75rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-accent)', marginBottom: '0.5rem' }}>Get in touch</div>
              <p style={{ fontSize: '0.875rem', color: 'var(--fg-3)', lineHeight: 1.7, marginBottom: '1rem' }}>
                Questions, feedback, or want to add your organization? We'd love to hear from you.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Link href="/contact" style={{ background: 'var(--color-accent)', color: '#fff', padding: '0.65rem 1.25rem', borderRadius: '8px', fontSize: '0.825rem', fontWeight: 700, textDecoration: 'none' }}>
                  Contact Us →
                </Link>
                <Link href="/claim" style={{ background: '#fff', color: 'var(--color-primary)', padding: '0.65rem 1.25rem', borderRadius: '8px', fontSize: '0.825rem', fontWeight: 600, textDecoration: 'none', border: '1px solid var(--color-primary)' }}>
                  Claim Your Listing →
                </Link>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
