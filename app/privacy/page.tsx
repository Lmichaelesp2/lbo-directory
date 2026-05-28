import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Privacy Policy | Local Business Organizations',
};

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <Breadcrumb items={[
        { label: 'Local Business Organizations', href: '/' },
        { label: 'Privacy Policy' },
      ]} />
      <main style={{ flex: 1 }}>
        <section style={{ background: 'var(--color-ink)', padding: '3rem 2rem' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 600, color: '#fff', lineHeight: 1.2 }}>Privacy Policy</h1>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem' }}>Last updated: May 2026</p>
          </div>
        </section>

        <section style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

          {[
            {
              title: 'What we collect',
              body: 'We collect information you provide directly — such as your name, email address, city, and any notes submitted through our contact or claim forms. We also collect basic analytics data (page views, traffic sources) to understand how the site is used. We do not sell or share your personal information with third parties for marketing purposes.',
            },
            {
              title: 'How we use your information',
              body: 'We use contact form submissions to respond to your inquiry and, if applicable, to notify you when new cities are added to the directory. Claim request information is used solely to verify and process your listing claim. We may use aggregated, anonymized data to improve the site.',
            },
            {
              title: 'Cookies and analytics',
              body: 'This site uses standard analytics tools to track page visits and traffic patterns. These tools may set cookies in your browser. We do not use advertising cookies or third-party tracking for ad targeting. You can disable cookies in your browser settings at any time.',
            },
            {
              title: 'Data retention',
              body: 'We retain contact and claim form submissions as long as necessary to fulfill the purpose for which they were collected. You may request deletion of your data at any time by contacting us.',
            },
            {
              title: 'Third-party services',
              body: 'This site uses Supabase for database storage and Vercel for hosting. These services have their own privacy policies. Organization information in the directory is sourced from public records and organization websites.',
            },
            {
              title: 'Contact',
              body: 'If you have questions about this privacy policy or want to request deletion of your data, contact us at hello@localbusinessorganizations.com.',
            },
          ].map(({ title, body }) => (
            <div key={title}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '0.6rem' }}>{title}</h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--fg-3)', lineHeight: 1.8 }}>{body}</p>
            </div>
          ))}

        </section>
      </main>
      <Footer />
    </>
  );
}
