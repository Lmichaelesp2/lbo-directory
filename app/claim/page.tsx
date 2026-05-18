'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { supabase } from '@/lib/supabase';

type Step = 'search' | 'form' | 'success';

type OrgResult = {
  id: number;
  name: string;
  city: string;
  public_category: string | null;
  claimed: boolean;
};

export default function ClaimPage() {
  const [step, setStep] = useState<Step>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<OrgResult[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<OrgResult | null>(null);
  const [searching, setSearching] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [error, setError] = useState('');

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearching(true);
    const { data } = await supabase
      .from('organizations')
      .select('id, name, city, public_category, claimed')
      .ilike('name', `%${searchQuery}%`)
      .not('public_category', 'is', null)
      .limit(10);
    setResults((data as OrgResult[]) || []);
    setSearching(false);
  }

  function selectOrg(org: OrgResult) {
    setSelectedOrg(org);
    setStep('form');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedOrg) return;
    setSubmitting(true);
    setError('');

    const { error: err } = await supabase.from('claim_requests').insert({
      org_id: selectedOrg.id,
      org_name: selectedOrg.name,
      contact_name: form.name,
      contact_email: form.email,
      contact_phone: form.phone || null,
      message: form.message || null,
      status: 'pending',
    });

    if (err) {
      setError('Something went wrong. Please try again or email us directly.');
      setSubmitting(false);
      return;
    }

    setStep('success');
    setSubmitting(false);
  }

  return (
    <>
      <Navigation />
      <main style={{ flex: 1, maxWidth: '640px', margin: '0 auto', padding: '48px 24px' }}>

        {/* Step 1 — Search */}
        {step === 'search' && (
          <>
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '10px' }}>
                <Link href="/" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Home</Link> › Claim Your Listing
              </div>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 700, color: 'var(--fg-1)', marginBottom: '10px' }}>
                Claim your organization listing
              </h1>
              <p style={{ fontSize: '14px', color: 'var(--fg-3)', lineHeight: 1.7 }}>
                Search for your organization below. Once you submit your claim request, our team will review it and reach out within 1–2 business days.
              </p>
            </div>

            {/* What you get */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px 24px', marginBottom: '32px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-4)', marginBottom: '14px' }}>What you get with a claimed listing</div>
              {[
                ['Enhanced profile', 'Add your logo, full description, and social links'],
                ['Priority placement', 'Claimed listings appear at the top of category results'],
                ['Direct contact info', 'Show your phone, email, and address on your profile'],
                ['Coming soon — $99/year', 'Full paid features launching soon'],
              ].map(([title, desc]) => (
                <div key={title} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ color: 'var(--color-primary)', fontSize: '14px', marginTop: '1px' }}>✓</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-1)' }}>{title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--fg-3)' }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Search form */}
            <form onSubmit={handleSearch}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-1)', display: 'block', marginBottom: '6px' }}>
                Search for your organization
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Type your organization name..."
                  style={{ flex: 1, background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: 'var(--fg-1)', outline: 'none', fontFamily: 'var(--font-sans)' }}
                />
                <button type="submit" disabled={searching}
                  style={{ background: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)', whiteSpace: 'nowrap' }}>
                  {searching ? 'Searching...' : 'Search'}
                </button>
              </div>
            </form>

            {/* Results */}
            {results.length > 0 && (
              <div style={{ marginTop: '16px' }}>
                {results.map(org => (
                  <div key={org.id}
                    style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px 16px', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--fg-1)' }}>{org.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--fg-3)' }}>{org.city} · {org.public_category}</div>
                    </div>
                    {org.claimed ? (
                      <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '100px', background: '#d1fae5', color: '#065f46', whiteSpace: 'nowrap' }}>Already claimed</span>
                    ) : (
                      <button onClick={() => selectOrg(org)}
                        style={{ background: 'var(--color-accent)', color: '#fff', border: 'none', borderRadius: '6px', padding: '7px 16px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)', whiteSpace: 'nowrap' }}>
                        Claim this →
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {results.length === 0 && searchQuery && !searching && (
              <p style={{ marginTop: '16px', fontSize: '13px', color: 'var(--fg-3)' }}>
                No results found. Your organization may not be in our directory yet — <Link href="mailto:hello@localbusinessorganizations.com" style={{ color: 'var(--color-primary)' }}>contact us</Link> to get listed.
              </p>
            )}
          </>
        )}

        {/* Step 2 — Contact form */}
        {step === 'form' && selectedOrg && (
          <>
            <div style={{ marginBottom: '28px' }}>
              <button onClick={() => setStep('search')} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '13px', cursor: 'pointer', fontFamily: 'var(--font-sans)', marginBottom: '16px', padding: 0 }}>
                ← Back to search
              </button>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 700, color: 'var(--fg-1)', marginBottom: '8px' }}>
                Claim your listing
              </h1>
              <div style={{ background: 'var(--color-primary-bg)', border: '1px solid #c7d7fd', borderRadius: '8px', padding: '12px 16px' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-1)' }}>{selectedOrg.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--fg-3)' }}>{selectedOrg.city} · {selectedOrg.public_category}</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'Your full name', key: 'name', type: 'text', required: true, placeholder: 'Jane Smith' },
                { label: 'Your email address', key: 'email', type: 'email', required: true, placeholder: 'jane@yourorg.com' },
                { label: 'Your phone number (optional)', key: 'phone', type: 'tel', required: false, placeholder: '(210) 555-0100' },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-1)', display: 'block', marginBottom: '6px' }}>{field.label}</label>
                  <input
                    type={field.type}
                    required={field.required}
                    placeholder={field.placeholder}
                    value={form[field.key as keyof typeof form]}
                    onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                    style={{ width: '100%', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: 'var(--fg-1)', outline: 'none', fontFamily: 'var(--font-sans)' }}
                  />
                </div>
              ))}

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-1)', display: 'block', marginBottom: '6px' }}>
                  Anything you'd like us to know? (optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Your role, what you'd like to update on your listing, etc."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  style={{ width: '100%', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: 'var(--fg-1)', outline: 'none', fontFamily: 'var(--font-sans)', resize: 'vertical' }}
                />
              </div>

              {error && <p style={{ fontSize: '13px', color: 'var(--color-accent)', fontWeight: 500 }}>{error}</p>}

              <button type="submit" disabled={submitting}
                style={{ background: 'var(--color-accent)', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px 24px', fontSize: '14px', fontWeight: 700, cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-sans)', opacity: submitting ? 0.7 : 1 }}>
                {submitting ? 'Submitting...' : 'Submit Claim Request →'}
              </button>

              <p style={{ fontSize: '12px', color: 'var(--fg-4)', textAlign: 'center' }}>
                Our team will review your request and contact you within 1–2 business days.
              </p>
            </form>
          </>
        )}

        {/* Step 3 — Success */}
        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 700, color: 'var(--fg-1)', marginBottom: '12px' }}>
              Request received!
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--fg-3)', lineHeight: 1.7, maxWidth: '400px', margin: '0 auto 32px' }}>
              We've got your claim request for <strong>{selectedOrg?.name}</strong>. Our team will review it and reach out to you within 1–2 business days.
            </p>
            <Link href="/" style={{ background: 'var(--color-primary)', color: '#fff', padding: '11px 24px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>
              Back to Directory →
            </Link>
          </div>
        )}

      </main>
    </>
  );
}
