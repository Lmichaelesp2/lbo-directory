import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Local Business Organizations',
};

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <Breadcrumb items={[
        { label: 'Local Business Organizations', href: '/' },
        { label: 'Terms & Conditions' },
      ]} />
      <main style={{ flex: 1 }}>
        <section style={{ background: 'var(--color-ink)', padding: '3rem 2rem' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 600, color: '#fff', lineHeight: 1.2 }}>Terms &amp; Conditions</h1>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem' }}>Last updated: May 2026</p>
          </div>
        </section>

        <section style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

          {[
            {
              title: 'Use of this site',
              body: 'Local Business Organizations provides a directory of business organizations for informational purposes. By using this site, you agree to these terms. The directory is provided as-is. We make no guarantees about the completeness, accuracy, or timeliness of any information listed.',
            },
            {
              title: 'Organization listings',
              body: 'Organization profiles are compiled from publicly available information. We do our best to keep listings accurate, but we cannot guarantee that all information is current or complete. If you find an error, please contact us and we\'ll review it promptly.',
            },
            {
              title: 'Claiming a listing',
              body: 'By submitting a claim request, you confirm that you are authorized to represent the organization you are claiming. Submitting false or misleading information may result in your claim being denied and your request being removed from our system.',
            },
            {
              title: 'Intellectual property',
              body: 'The content, design, and structure of this site are owned by Local Business Organizations. Organization names, logos, and descriptions remain the property of their respective owners. We do not claim ownership of any third-party trademarks or intellectual property included in organization profiles.',
            },
            {
              title: 'Limitation of liability',
              body: 'We are not liable for any damages arising from your use of this site or reliance on information in the directory. We are not affiliated with any organizations listed and do not endorse any organization, product, or service.',
            },
            {
              title: 'Changes to these terms',
              body: 'We may update these terms from time to time. Continued use of the site after changes are posted constitutes acceptance of the updated terms.',
            },
            {
              title: 'Contact',
              body: 'Questions about these terms? Contact us at hello@localbusinessorganizations.com.',
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
