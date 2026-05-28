'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Breadcrumb from '@/components/Breadcrumb';
import { supabase } from '@/lib/supabase';

type Step = 'search' | 'form' | 'success';

type OrgResult = {
  id: number;
  name: string;
  city: string;
  category: string | null;
  home_page: string | null;
};

export default function ClaimPage() {
  const [step, setStep] = useState<Step>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<OrgResult[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<OrgResult | null>(null);
  const [searching, setSearching] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    title: '',
    email: '',
    emailNote: '',
    phone: '',
    website: '',
    linkedin: '',
    howYouKnow: '',
    message: '',
  });
  const [error, setError] = useState('');

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearching(true);
    const { data } = await supabase
      .from('organizations')
      .select('id, name, city, category, home_page')
      .ilike('name', `%${searchQuery}%`)
      .not('category', 'is', null)
      .limit(10);
    setResults((data as OrgResult[]) || []);
    setSearching(false);
  }

  function selectOrg(org: OrgResult) {
    setSelectedOrg(org);
    setStep('form');
    // Pre-fill website from org data
    if (org.home_page) setForm(f => ({ ...f, website: org.home_page || '' }));
  }

  // Detect if email domain matches org website
  function emailMatchesWebsite(): boolean {
    if (!form.email || !selectedOrg?.home_page) return true;
    try {
      const domain = new URL(selectedOrg.home_page).hostname.replace('www.', '');
      const emailDomain = form.email.split('@')[1];
      return emailDomain === domain;
    } catch { return true; }
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
      message: [
        form.title ? `Title/Role: ${form.title}` : '',
        form.emailNote ? `Email note: ${form.emailNote}` : '',
        form.linkedin ? `LinkedIn: ${form.linkedin}` : '',
        form.howYouKnow ? `How they know the org: ${form.howYouKnow}` : '',
        form.message ? `Additional notes: ${form.message}` : '',
      ].filter(Boolean).join('\n'),
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

  const emailMatches = emailMatchesWebsite();

  return (
    <>
      <Navigation />
      <Breadcrumb items={[
        { label: 'Local Business Organizations', href: '/' },
        { label: 'Claim Your Listing' },
      ]} />
      <main style={{ flex: 1, maxWidth: '660px', margin: '0 auto', padding: '48px 24px' }}>

        {/* Step 1 — Search */}
        {step === 'search' && (
          <>
            <div style={{ marginBottom: '28px' }}>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 700, color: 'var(--fg-1)', marginBottom: '12px' }}>
                Claim your organization listing
              </h1>
              <p style={{ fontSize: '14px', color: 'var(--fg-3)', lineHeight: 1.7, marginBottom: '8px' }}>
                Your organization is already listed in the Local Business Organizations directory. Claiming your listing lets you take ownership of it — update your information, add your logo, and make sure the right details are front and center for anyone looking you up.
              </p>
              <p style={{ fontSize: '14px', color: 'var(--fg-3)', lineHeight: 1.7 }}>
                To get started, search for your organization below. Our team will review your request and reach out within <strong style={{ color: 'var(--fg-1)' }}>1–2 business days</strong>.
              </p>
            </div>

            {/* What you get */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px 24px', marginBottom: '28px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-4)', marginBottom: '14px' }}>What a claimed listing includes</div>
              {[
                ['Your logo', 'Your organization logo displayed prominently on your listing'],
                ['Full description', 'Tell your story — who you are, who you serve, and what makes you unique'],
                ['Contact details', 'Phone number, email address, and physical address if applicable'],
                ['Social links', 'LinkedIn, Facebook, Instagram — all in one place'],
                ['Priority placement', 'Claimed listings appear above unclaimed ones in search results'],
                ['Coming soon — $99/year', 'Paid enhanced features launching soon. Early claimants get first access.'],
              ].map(([title, desc]) => (
                <div key={title} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <i className="ti ti-check" style={{ color: 'var(--color-accent)', fontSize: '0.95rem', flexShrink: 0, marginTop: '2px', lineHeight: 1 }} aria-hidden="true" />
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-1)' }}>{title} — </span>
                    <span style={{ fontSize: '13px', color: 'var(--fg-3)' }}>{desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Search */}
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

            {results.length > 0 && (
              <div style={{ marginTop: '16px' }}>
                {results.map(org => (
                  <div key={org.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px 16px', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--fg-1)' }}>{org.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--fg-3)' }}>{org.city} · {org.category}</div>
                      {org.home_page && <div style={{ fontSize: '11px', color: 'var(--fg-4)', marginTop: '2px' }}>{org.home_page}</div>}
                    </div>
                      <button onClick={() => selectOrg(org)}
                        style={{ background: 'var(--color-accent)', color: '#fff', border: 'none', borderRadius: '6px', padding: '7px 16px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)', whiteSpace: 'nowrap' }}>
                        Claim this →
                      </button>
                  </div>
                ))}
              </div>
            )}

            {results.length === 0 && searchQuery && !searching && (
              <p style={{ marginTop: '16px', fontSize: '13px', color: 'var(--fg-3)' }}>
                No results found. Your organization may not be listed yet —{' '}
                <a href="mailto:hello@localbusinessorganizations.com" style={{ color: 'var(--color-primary)' }}>contact us</a> to get added.
              </p>
            )}
          </>
        )}

        {/* Step 2 — Contact form */}
        {step === 'form' && selectedOrg && (
          <>
            <button onClick={() => setStep('search')} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '13px', cursor: 'pointer', fontFamily: 'var(--font-sans)', marginBottom: '20px', padding: 0 }}>
              ← Back to search
            </button>

            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 700, color: 'var(--fg-1)', marginBottom: '8px' }}>
              Tell us about yourself
            </h1>

            {/* Selected org */}
            <div style={{ background: 'var(--color-primary-bg)', border: '1px solid #c7d7fd', borderRadius: '8px', padding: '12px 16px', marginBottom: '24px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-1)' }}>{selectedOrg.name}</div>
              <div style={{ fontSize: '12px', color: 'var(--fg-3)' }}>{selectedOrg.city} · {selectedOrg.category}</div>
            </div>

            {/* Verification notice */}
            <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: '8px', padding: '14px 16px', marginBottom: '24px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#92400e', marginBottom: '4px' }}>How we verify your claim</div>
              <p style={{ fontSize: '13px', color: '#78350f', lineHeight: 1.6 }}>
                To confirm you represent this organization, we ask that you use your <strong>organization's email address</strong> (e.g. you@{selectedOrg.home_page ? (() => { try { return new URL(selectedOrg.home_page).hostname.replace('www.',''); } catch { return 'yourorg.com'; } })() : 'yourorg.com'}). If you use a personal email (Gmail, Yahoo, etc.), please explain why in the field below. We may follow up by phone or LinkedIn to complete verification.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

              {/* Name */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-1)', display: 'block', marginBottom: '6px' }}>Your full name <span style={{ color: 'var(--color-accent)' }}>*</span></label>
                <input type="text" required placeholder="Jane Smith"
                  value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  style={{ width: '100%', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: 'var(--fg-1)', outline: 'none', fontFamily: 'var(--font-sans)' }} />
              </div>

              {/* Title */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-1)', display: 'block', marginBottom: '6px' }}>Your title / role at the organization <span style={{ color: 'var(--color-accent)' }}>*</span></label>
                <input type="text" required placeholder="Executive Director, President, Marketing Manager, etc."
                  value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  style={{ width: '100%', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: 'var(--fg-1)', outline: 'none', fontFamily: 'var(--font-sans)' }} />
              </div>

              {/* Email */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-1)', display: 'block', marginBottom: '6px' }}>
                  Your email address <span style={{ color: 'var(--color-accent)' }}>*</span>
                  {' '}<span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--fg-4)' }}>(preferably your organization domain)</span>
                </label>
                <input type="email" required placeholder="you@yourorganization.com"
                  value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  style={{ width: '100%', background: '#fff', border: `1px solid ${!emailMatches && form.email ? '#fcd34d' : '#e2e8f0'}`, borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: 'var(--fg-1)', outline: 'none', fontFamily: 'var(--font-sans)' }} />
                {!emailMatches && form.email && (
                  <p style={{ fontSize: '12px', color: '#92400e', marginTop: '4px' }}>
                    ⚠ This email doesn't match your organization's website domain. Please explain below.
                  </p>
                )}
              </div>

              {/* Email note — shown if email doesn't match */}
              {(!emailMatches && form.email) && (
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-1)', display: 'block', marginBottom: '6px' }}>
                    Why are you using a personal email? <span style={{ color: 'var(--color-accent)' }}>*</span>
                  </label>
                  <input type="text" required placeholder="e.g. I'm a volunteer, the org doesn't have staff emails, etc."
                    value={form.emailNote} onChange={e => setForm(f => ({ ...f, emailNote: e.target.value }))}
                    style={{ width: '100%', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: 'var(--fg-1)', outline: 'none', fontFamily: 'var(--font-sans)' }} />
                </div>
              )}

              {/* Phone */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-1)', display: 'block', marginBottom: '6px' }}>
                  Best phone number to reach you <span style={{ color: 'var(--color-accent)' }}>*</span>
                  {' '}<span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--fg-4)' }}>(we may call to verify)</span>
                </label>
                <input type="tel" required placeholder="(210) 555-0100"
                  value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  style={{ width: '100%', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: 'var(--fg-1)', outline: 'none', fontFamily: 'var(--font-sans)' }} />
              </div>

              {/* LinkedIn */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-1)', display: 'block', marginBottom: '6px' }}>
                  Your LinkedIn profile URL <span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--fg-4)' }}>(optional but helpful for verification)</span>
                </label>
                <input type="url" placeholder="https://linkedin.com/in/yourname"
                  value={form.linkedin} onChange={e => setForm(f => ({ ...f, linkedin: e.target.value }))}
                  style={{ width: '100%', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: 'var(--fg-1)', outline: 'none', fontFamily: 'var(--font-sans)' }} />
              </div>

              {/* How do you know */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-1)', display: 'block', marginBottom: '6px' }}>
                  How are you connected to this organization? <span style={{ color: 'var(--color-accent)' }}>*</span>
                </label>
                <textarea required rows={2}
                  placeholder="e.g. I'm the Executive Director, I founded this group, I manage their marketing, etc."
                  value={form.howYouKnow} onChange={e => setForm(f => ({ ...f, howYouKnow: e.target.value }))}
                  style={{ width: '100%', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: 'var(--fg-1)', outline: 'none', fontFamily: 'var(--font-sans)', resize: 'vertical' }} />
              </div>

              {/* Anything else */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-1)', display: 'block', marginBottom: '6px' }}>
                  Anything else you'd like us to know? <span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--fg-4)' }}>(optional)</span>
                </label>
                <textarea rows={3}
                  placeholder="What you'd like to update, questions about the process, etc."
                  value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  style={{ width: '100%', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: 'var(--fg-1)', outline: 'none', fontFamily: 'var(--font-sans)', resize: 'vertical' }} />
              </div>

              {error && <p style={{ fontSize: '13px', color: 'var(--color-accent)', fontWeight: 500 }}>{error}</p>}

              <button type="submit" disabled={submitting}
                style={{ background: 'var(--color-accent)', color: '#fff', border: 'none', borderRadius: '8px', padding: '13px 24px', fontSize: '14px', fontWeight: 700, cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-sans)', opacity: submitting ? 0.7 : 1 }}>
                {submitting ? 'Submitting...' : 'Submit Claim Request →'}
              </button>

              <p style={{ fontSize: '12px', color: 'var(--fg-4)', textAlign: 'center', lineHeight: 1.6 }}>
                By submitting you confirm you are authorized to represent this organization. Our team will review your request and contact you within 1–2 business days.
              </p>
            </form>
          </>
        )}

        {/* Step 3 — Success */}
        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '28px' }}>✓</div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 700, color: 'var(--fg-1)', marginBottom: '12px' }}>
              Request received!
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--fg-3)', lineHeight: 1.7, maxWidth: '420px', margin: '0 auto 12px' }}>
              We've received your claim request for <strong style={{ color: 'var(--fg-1)' }}>{selectedOrg?.name}</strong>.
            </p>
            <p style={{ fontSize: '14px', color: 'var(--fg-3)', lineHeight: 1.7, maxWidth: '420px', margin: '0 auto 32px' }}>
              Our team will review your information and reach out within <strong style={{ color: 'var(--fg-1)' }}>1–2 business days</strong> to confirm your listing and walk you through next steps.
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
