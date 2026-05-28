'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Organization } from '@/lib/supabase';
import { getUser } from '@/lib/auth';

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').trim();
}

function getInitials(name: string): string {
  return name.split(' ').filter(Boolean).slice(0, 3).map(w => w[0]).join('').toUpperCase();
}

export default function OrgDetailModal({ org, onClose }: { org: Organization; onClose: () => void }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    getUser().then(user => setIsLoggedIn(!!user));
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on backdrop click
  function handleBackdrop(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onClose();
  }

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (isLoggedIn === null) return null;

  return (
    <div onClick={handleBackdrop} style={{
      position: 'fixed', inset: 0, background: 'rgba(10,22,40,0.55)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
    }}>
      <div style={{
        background: '#fff', borderRadius: '14px', width: '100%', maxWidth: '560px',
        maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(10,22,40,.25)',
        position: 'relative',
      }}>
        {/* Close button */}
        <button onClick={onClose} style={{
          position: 'absolute', top: '14px', right: '14px', background: 'var(--color-paper)',
          border: '1px solid var(--color-rule)', borderRadius: '6px', width: '28px', height: '28px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '14px', color: 'var(--fg-3)',
        }}>×</button>

        {/* Header */}
        <div style={{ padding: '28px 28px 20px', borderBottom: '1px solid var(--color-rule)' }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'var(--color-primary-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: 'var(--color-primary)', flexShrink: 0, letterSpacing: '0.02em' }}>
              {getInitials(org.name)}
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 700, color: 'var(--fg-1)', lineHeight: 1.2, marginBottom: '6px' }}>
                {org.name}
              </h2>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                {org.category && (
                  <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-primary)', background: 'var(--color-primary-bg)', padding: '2px 8px', borderRadius: '100px' }}>
                    {org.category}
                  </span>
                )}
                <span style={{ fontSize: '12px', color: 'var(--fg-4)' }}>{org.city}</span>
                {org.how_active && (
                  <span style={{ fontSize: '12px', color: 'var(--fg-4)' }}>· {org.how_active}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Public info — always visible */}
        <div style={{ padding: '20px 28px' }}>
          {org.description && (
            <p style={{ fontSize: '13px', color: 'var(--fg-2)', lineHeight: 1.7, marginBottom: '20px' }}>
              {stripHtml(org.description)}
            </p>
          )}

          {org.home_page && (
            <a href={org.home_page} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '13px', color: 'var(--color-primary)', fontWeight: 500, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '20px' }}>
              <i className="ti ti-external-link" style={{ fontSize: '13px' }} />
              Visit website
            </a>
          )}

          {/* Gated content */}
          {isLoggedIn ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <hr style={{ border: 'none', borderTop: '1px solid var(--color-rule)', margin: '4px 0' }} />

              {/* Contact info */}
              {(org.group_contact || org.group_email || org.group_phone_number) && (
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-4)', marginBottom: '8px' }}>Contact</div>
                  {org.group_contact && <div style={{ fontSize: '13px', color: 'var(--fg-2)', marginBottom: '4px' }}>{org.group_contact}</div>}
                  {org.group_email && <a href={`mailto:${org.group_email}`} style={{ fontSize: '13px', color: 'var(--color-primary)', display: 'block', marginBottom: '4px' }}>{org.group_email}</a>}
                  {org.group_phone_number && <div style={{ fontSize: '13px', color: 'var(--fg-2)' }}>{org.group_phone_number}</div>}
                </div>
              )}

              {/* Address */}
              {org.group_address && (
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-4)', marginBottom: '6px' }}>Address</div>
                  <div style={{ fontSize: '13px', color: 'var(--fg-2)' }}>{org.group_address}{org.group_zipcode ? `, ${org.group_zipcode}` : ''}</div>
                </div>
              )}

              {/* Membership */}
              {(org.membership_type || org.membership_fee_range) && (
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-4)', marginBottom: '8px' }}>Membership</div>
                  {org.membership_type && <div style={{ fontSize: '13px', color: 'var(--fg-2)', marginBottom: '4px' }}><strong>Type:</strong> {org.membership_type}</div>}
                  {org.membership_fee_range && <div style={{ fontSize: '13px', color: 'var(--fg-2)' }}><strong>Fee range:</strong> {org.membership_fee_range}</div>}
                </div>
              )}

              {/* Details */}
              {(org.industries_served || org.typical_title || org.event_format || org.primary_value) && (
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-4)', marginBottom: '8px' }}>Details</div>
                  {org.industries_served && <div style={{ fontSize: '13px', color: 'var(--fg-2)', marginBottom: '4px' }}><strong>Industries:</strong> {org.industries_served}</div>}
                  {org.typical_title && <div style={{ fontSize: '13px', color: 'var(--fg-2)', marginBottom: '4px' }}><strong>Typical member:</strong> {org.typical_title}</div>}
                  {org.event_format && <div style={{ fontSize: '13px', color: 'var(--fg-2)', marginBottom: '4px' }}><strong>Event format:</strong> {org.event_format}</div>}
                  {org.primary_value && <div style={{ fontSize: '13px', color: 'var(--fg-2)' }}><strong>Primary value:</strong> {org.primary_value}</div>}
                </div>
              )}

              {/* Social links */}
              {(org.facebook_url || org.linkedin_url || org.instagram_url) && (
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-4)', marginBottom: '8px' }}>Social</div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {org.linkedin_url && <a href={org.linkedin_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: 'var(--color-primary)', textDecoration: 'none' }}>LinkedIn ↗</a>}
                    {org.facebook_url && <a href={org.facebook_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: 'var(--color-primary)', textDecoration: 'none' }}>Facebook ↗</a>}
                    {org.instagram_url && <a href={org.instagram_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: 'var(--color-primary)', textDecoration: 'none' }}>Instagram ↗</a>}
                  </div>
                </div>
              )}

              {/* Claim CTA */}
              <div style={{ background: 'var(--color-paper)', border: '1px solid var(--color-rule)', borderRadius: '8px', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginTop: '4px' }}>
                <span style={{ fontSize: '12px', color: 'var(--fg-3)' }}>Is this your organization?</span>
                <a href="/claim" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-accent)', textDecoration: 'none' }}>Claim listing →</a>
              </div>
            </div>
          ) : (
            /* Login gate */
            <div style={{ background: 'var(--color-paper)', border: '1px solid var(--color-rule)', borderRadius: '10px', padding: '24px', textAlign: 'center', marginTop: '8px' }}>
              <div style={{ fontSize: '16px', marginBottom: '8px' }}>🔒</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', fontWeight: 700, color: 'var(--fg-1)', marginBottom: '6px' }}>
                Full profile is members only
              </div>
              <p style={{ fontSize: '13px', color: 'var(--fg-3)', lineHeight: 1.6, marginBottom: '16px' }}>
                Create a free account to see contact info, membership details, social links, and more for every organization.
              </p>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <button onClick={() => router.push('/signup')}
                  style={{ background: 'var(--color-accent)', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
                  Create free account →
                </button>
                <button onClick={() => router.push('/login')}
                  style={{ background: '#fff', color: 'var(--color-primary)', border: '1px solid var(--color-primary)', borderRadius: '8px', padding: '10px 20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
                  Sign in
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
