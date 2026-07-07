'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Organization } from '@/lib/supabase';
import { getLboUserProfile, LboUserProfile } from '@/lib/auth';
import { OrgEvent, formatEventDate, formatEventTime, lbcCityUrl } from '@/lib/events';

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').trim();
}

function getInitials(name: string): string {
  return name.split(' ').filter(Boolean).slice(0, 3).map(w => w[0]).join('').toUpperCase();
}

const CATEGORY_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  'Community/Edu':     { bg: '#eef3fe', color: '#1652f0', border: '#c7d9fc' },
  'Technology':        { bg: '#ede9fe', color: '#6d28d9', border: '#c4b5fd' },
  'Real Estate':       { bg: '#fff7ed', color: '#c2410c', border: '#fed7aa' },
  'Networking':        { bg: '#f0fdf9', color: '#0f6e56', border: '#6ee7b7' },
  'Chambers':          { bg: '#eef3fe', color: '#1652f0', border: '#c7d9fc' },
  'Const/Design/Mfg': { bg: '#fff7ed', color: '#c2410c', border: '#fed7aa' },
  'Co-Working':        { bg: '#f0fdf9', color: '#0f6e56', border: '#6ee7b7' },
  'Fed/State/Local':   { bg: '#f5f3ff', color: '#534AB7', border: '#c4b5fd' },
  'Healthcare':        { bg: '#f0fdf9', color: '#0f6e56', border: '#6ee7b7' },
  'Professional Svcs': { bg: '#eef3fe', color: '#1652f0', border: '#c7d9fc' },
  'Financial':         { bg: '#f0fdf9', color: '#0f6e56', border: '#6ee7b7' },
  'Financial Services':{ bg: '#f0fdf9', color: '#0f6e56', border: '#6ee7b7' },
  'Other':             { bg: '#f0f9ff', color: '#0369a1', border: '#bae6fd' },
};

function Chip({ label, color = 'var(--color-primary)', bg = 'var(--color-primary-bg)' }: { label: string; color?: string; bg?: string }) {
  return (
    <span style={{ display: 'inline-block', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '100px', background: bg, color, whiteSpace: 'nowrap' }}>
      {label}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em', color: 'var(--fg-4)', marginBottom: '10px' }}>
      {children}
    </div>
  );
}

function InfoRow({ icon, label, value, href }: { icon: string; label: string; value: string; href?: string }) {
  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '8px' }}>
      <i className={`ti ti-${icon}`} style={{ fontSize: '14px', color: 'var(--fg-4)', flexShrink: 0, marginTop: '1px', width: '16px', textAlign: 'center' }} />
      <div style={{ flex: 1 }}>
        <span style={{ fontSize: '11px', color: 'var(--fg-4)', display: 'block', marginBottom: '1px' }}>{label}</span>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: '13px', color: 'var(--color-primary)', fontWeight: 500, textDecoration: 'none', wordBreak: 'break-word' }}>
            {value}
          </a>
        ) : (
          <span style={{ fontSize: '13px', color: 'var(--fg-1)', fontWeight: 500 }}>{value}</span>
        )}
      </div>
    </div>
  );
}

export default function OrgDetailModal({ org, events, onClose }: { org: Organization; events?: OrgEvent[]; onClose: () => void }) {
  const router = useRouter();
  const [profile, setProfile] = useState<LboUserProfile | null | undefined>(undefined);

  useEffect(() => {
    getLboUserProfile().then(p => setProfile(p));
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  function handleBackdrop(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onClose();
  }

  if (profile === undefined) return null;

  const isLoggedIn = !!profile;
  const isOwner = isLoggedIn && profile.org_id === org.id;
  const catColors = CATEGORY_COLORS[org.category || ''] || CATEGORY_COLORS['Other'];

  const quickFacts: string[] = [];
  if (org.founded_year) quickFacts.push(`Est. ${org.founded_year}`);
  if (org.how_active) quickFacts.push(org.how_active);
  if (org.national_affiliate) quickFacts.push(org.national_affiliate);
  if (org.guest_friendly === 'Yes' || org.guest_friendly === 'yes') quickFacts.push('Guest friendly');

  return (
    <div onClick={handleBackdrop} style={{
      position: 'fixed', inset: 0, background: 'rgba(10,22,40,0.6)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
    }}>
      <div style={{
        background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '580px',
        maxHeight: '88vh', overflowY: 'auto', boxShadow: '0 24px 64px rgba(10,22,40,.28)',
        position: 'relative',
      }}>

        {/* Close */}
        <button onClick={onClose} style={{
          position: 'absolute', top: '14px', right: '14px', background: 'var(--color-paper)',
          border: '1px solid var(--color-rule)', borderRadius: '6px', width: '28px', height: '28px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          fontSize: '14px', color: 'var(--fg-3)', zIndex: 10,
        }}>×</button>

        {/* Org-owner banner */}
        {isOwner && (
          <div style={{ background: '#d1fae5', borderRadius: '16px 16px 0 0', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="ti ti-building-community" style={{ color: '#065f46', fontSize: '15px' }} />
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#065f46' }}>This is your organization listing</span>
            </div>
            <a href="/claim" style={{ fontSize: '11px', fontWeight: 700, color: '#065f46', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Manage listing →
            </a>
          </div>
        )}

        {/* Header */}
        <div style={{ padding: '24px 28px 18px', borderBottom: '1px solid var(--color-rule)' }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', paddingRight: '24px' }}>
            <div style={{
              width: '52px', height: '52px', borderRadius: '12px', flexShrink: 0,
              background: catColors.bg, border: `1.5px solid ${catColors.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '13px', fontWeight: 700, color: catColors.color, letterSpacing: '0.02em',
            }}>
              {getInitials(org.name)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, color: 'var(--fg-1)', lineHeight: 1.2, marginBottom: '8px' }}>
                {org.name}
              </h2>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                {org.category && (
                  <Chip label={org.category} color={catColors.color} bg={catColors.bg} />
                )}
                <span style={{ fontSize: '12px', color: 'var(--fg-4)' }}>{org.city}, TX</span>
                {org.verified && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '11px', fontWeight: 600, color: '#065f46', background: '#d1fae5', padding: '2px 8px', borderRadius: '100px' }}>
                    <i className="ti ti-rosette-discount-check" style={{ fontSize: '11px' }} /> Verified
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick facts strip */}
          {quickFacts.length > 0 && (
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '14px' }}>
              {quickFacts.map(f => (
                <span key={f} style={{ fontSize: '11px', color: 'var(--fg-3)', background: 'var(--color-paper)', border: '1px solid var(--color-rule)', borderRadius: '100px', padding: '3px 10px', fontWeight: 500 }}>
                  {f}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Upcoming this week — event details are members-only; count is the public hook */}
          {events && events.length > 0 && (
            <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '10px', padding: '16px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', gap: '10px' }}>
                <SectionLabel>Upcoming this week</SectionLabel>
                {isLoggedIn && (
                  <a href={lbcCityUrl(org.city)} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-accent)', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    View on the calendar →
                  </a>
                )}
              </div>

              {isLoggedIn ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {events.map(ev => {
                    const time = formatEventTime(ev.start_time);
                    return (
                      <div key={ev.id} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <div style={{ flexShrink: 0, width: '58px', textAlign: 'center', background: '#fff', border: '1px solid #fed7aa', borderRadius: '8px', padding: '5px 0' }}>
                          <div style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-accent)', lineHeight: 1.2 }}>
                            {formatEventDate(ev.start_date).split(' ')[0]}
                          </div>
                          <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--fg-1)', lineHeight: 1.1 }}>
                            {formatEventDate(ev.start_date).split(' ')[2]}
                          </div>
                          <div style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--fg-4)', lineHeight: 1.2 }}>
                            {formatEventDate(ev.start_date).split(' ')[1]}
                          </div>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--fg-1)', lineHeight: 1.35, marginBottom: '2px' }}>
                            {ev.website ? (
                              <a href={ev.website} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--fg-1)', textDecoration: 'none' }}>{ev.name}</a>
                            ) : ev.name}
                          </div>
                          <div style={{ fontSize: '11px', color: 'var(--fg-3)', lineHeight: 1.5 }}>
                            {time && <span>{time}</span>}
                            {time && ev.event_address && <span> · </span>}
                            {ev.event_address && <span>{ev.event_address}</span>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Logged-out: lock the event details, show count + sign-in prompt */
                <div style={{ display: 'flex', gap: '13px', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff', border: '1px solid #fed7aa', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <i className="ti ti-lock" style={{ fontSize: '17px', color: 'var(--color-accent)' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--fg-1)', marginBottom: '2px' }}>
                      {events.length} {events.length === 1 ? 'event' : 'events'} this week
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--fg-3)', lineHeight: 1.5, margin: '0 0 10px' }}>
                      Sign in to your free account to see this week&apos;s events — dates, times, and locations.
                    </p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <button onClick={() => router.push(`/signup${org.city ? `?city=${encodeURIComponent(org.city)}` : ''}`)}
                        style={{ background: 'var(--color-accent)', color: '#fff', border: 'none', borderRadius: '7px', padding: '8px 16px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
                        Create free account →
                      </button>
                      <button onClick={() => router.push('/login')}
                        style={{ background: '#fff', color: 'var(--color-accent)', border: '1px solid var(--color-accent)', borderRadius: '7px', padding: '8px 14px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
                        Sign in
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {isLoggedIn ? (
            <>
              {/* Description — logged in only */}
              {org.description && (
                <p style={{ fontSize: '13px', color: 'var(--fg-2)', lineHeight: 1.75, margin: 0 }}>
                  {stripHtml(org.description)}
                </p>
              )}

              {/* Website — logged in only */}
              {org.home_page && (
                <div>
                  <a href={org.home_page} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none', background: 'var(--color-primary-bg)', padding: '7px 14px', borderRadius: '8px' }}>
                    <i className="ti ti-external-link" style={{ fontSize: '13px' }} />
                    Visit website
                  </a>
                </div>
              )}
            </>
          ) : null}

          {isLoggedIn ? (
            <>
              {/* Who It's For */}
              {(org.typical_title || org.industries_served || org.membership_type || org.membership_fee_range) && (
                <div style={{ background: 'var(--color-paper)', border: '1px solid var(--color-rule)', borderRadius: '10px', padding: '16px 18px' }}>
                  <SectionLabel>Who It&apos;s For</SectionLabel>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                    {org.typical_title && (
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                        <span style={{ fontSize: '11px', color: 'var(--fg-4)', minWidth: '110px', flexShrink: 0 }}>Typical member</span>
                        <span style={{ fontSize: '13px', color: 'var(--fg-1)', fontWeight: 500 }}>{org.typical_title}</span>
                      </div>
                    )}
                    {org.industries_served && (
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                        <span style={{ fontSize: '11px', color: 'var(--fg-4)', minWidth: '110px', flexShrink: 0 }}>Industries</span>
                        <span style={{ fontSize: '13px', color: 'var(--fg-1)', fontWeight: 500 }}>{org.industries_served}</span>
                      </div>
                    )}
                    {org.membership_type && (
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                        <span style={{ fontSize: '11px', color: 'var(--fg-4)', minWidth: '110px', flexShrink: 0 }}>Membership</span>
                        <span style={{ fontSize: '13px', color: 'var(--fg-1)', fontWeight: 500 }}>{org.membership_type}</span>
                      </div>
                    )}
                    {org.membership_fee_range && (
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                        <span style={{ fontSize: '11px', color: 'var(--fg-4)', minWidth: '110px', flexShrink: 0 }}>Fee range</span>
                        <span style={{ fontSize: '13px', color: 'var(--fg-1)', fontWeight: 500 }}>{org.membership_fee_range}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* What To Expect */}
              {(org.event_format || org.event_size || org.formality || org.primary_value || org.ai_match_tags) && (
                <div style={{ background: 'var(--color-paper)', border: '1px solid var(--color-rule)', borderRadius: '10px', padding: '16px 18px' }}>
                  <SectionLabel>What To Expect</SectionLabel>
                  {(org.event_format || org.event_size || org.formality || org.ai_match_tags) && (
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: org.primary_value ? '12px' : '0' }}>
                      {org.event_format && <Chip label={org.event_format} />}
                      {org.event_size && <Chip label={org.event_size} />}
                      {org.formality && <Chip label={org.formality} />}
                      {org.ai_match_tags && org.ai_match_tags.split(',').slice(0, 4).map(t => (
                        <Chip key={t.trim()} label={t.trim()} color="var(--fg-3)" bg="var(--color-paper-2)" />
                      ))}
                    </div>
                  )}
                  {org.primary_value && (
                    <p style={{ fontSize: '12px', color: 'var(--fg-3)', lineHeight: 1.6, margin: 0, paddingTop: (org.event_format || org.event_size || org.formality) ? '10px' : '0', borderTop: (org.event_format || org.event_size || org.formality) ? '1px solid var(--color-rule)' : 'none' }}>
                      {org.primary_value}
                    </p>
                  )}
                </div>
              )}

              {/* Get Connected */}
              {(org.group_contact || org.group_email || org.group_phone_number || org.group_address) && (
                <div style={{ background: 'var(--color-paper)', border: '1px solid var(--color-rule)', borderRadius: '10px', padding: '16px 18px' }}>
                  <SectionLabel>Get Connected</SectionLabel>
                  {org.group_contact && <InfoRow icon="user" label="Contact" value={org.group_contact} />}
                  {org.group_email && <InfoRow icon="mail" label="Email" value={org.group_email} href={`mailto:${org.group_email}`} />}
                  {org.group_phone_number && <InfoRow icon="phone" label="Phone" value={org.group_phone_number} href={`tel:${org.group_phone_number}`} />}
                  {org.group_address && <InfoRow icon="map-pin" label="Address" value={`${org.group_address}${org.group_zipcode ? `, ${org.group_zipcode}` : ''}`} />}
                </div>
              )}

              {/* Find Them Online */}
              {(org.linkedin_url || org.facebook_url || org.instagram_url || org.calendar_website) && (
                <div style={{ background: 'var(--color-paper)', border: '1px solid var(--color-rule)', borderRadius: '10px', padding: '16px 18px' }}>
                  <SectionLabel>Find Them Online</SectionLabel>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {org.linkedin_url && (
                      <a href={org.linkedin_url} target="_blank" rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#0a66c2', background: '#e8f0fe', border: '1px solid #c7d9fc', padding: '6px 14px', borderRadius: '8px', textDecoration: 'none' }}>
                        <i className="ti ti-brand-linkedin" style={{ fontSize: '13px' }} /> LinkedIn
                      </a>
                    )}
                    {org.facebook_url && (
                      <a href={org.facebook_url} target="_blank" rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#1877f2', background: '#e7f3ff', border: '1px solid #bfdbfe', padding: '6px 14px', borderRadius: '8px', textDecoration: 'none' }}>
                        <i className="ti ti-brand-facebook" style={{ fontSize: '13px' }} /> Facebook
                      </a>
                    )}
                    {org.instagram_url && (
                      <a href={org.instagram_url} target="_blank" rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#c2185b', background: '#fce4ec', border: '1px solid #f8bbd0', padding: '6px 14px', borderRadius: '8px', textDecoration: 'none' }}>
                        <i className="ti ti-brand-instagram" style={{ fontSize: '13px' }} /> Instagram
                      </a>
                    )}
                    {org.calendar_website && (
                      <a href={org.calendar_website} target="_blank" rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: 'var(--color-primary)', background: 'var(--color-primary-bg)', border: '1px solid #c7d9fc', padding: '6px 14px', borderRadius: '8px', textDecoration: 'none' }}>
                        <i className="ti ti-calendar" style={{ fontSize: '13px' }} /> Events calendar
                      </a>
                    )}
                  </div>
                </div>
              )}

            </>
          ) : (
            /* Login gate */
            <div style={{ background: 'linear-gradient(135deg, var(--color-paper) 0%, #f0f4ff 100%)', border: '1px solid var(--color-rule)', borderRadius: '12px', padding: '20px 20px', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-primary-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <i className="ti ti-lock" style={{ fontSize: '18px', color: 'var(--color-primary)' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', fontWeight: 700, color: 'var(--fg-1)', marginBottom: '4px' }}>
                  Full profile is members only
                </div>
                <p style={{ fontSize: '12px', color: 'var(--fg-3)', lineHeight: 1.5, margin: '0 0 12px' }}>
                  Free account unlocks: description, contact info, membership details, social links, and more.
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => router.push(`/signup${org.city ? `?city=${encodeURIComponent(org.city)}` : ''}`)}
                    style={{ background: 'var(--color-accent)', color: '#fff', border: 'none', borderRadius: '7px', padding: '8px 16px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
                    Create free account →
                  </button>
                  <button onClick={() => router.push('/login')}
                    style={{ background: '#fff', color: 'var(--color-primary)', border: '1px solid var(--color-primary)', borderRadius: '7px', padding: '8px 14px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
                    Sign in
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Claim link — always visible, hidden only for confirmed owners */}
          {!isOwner && (
            <div style={{ textAlign: 'center', paddingTop: '4px' }}>
              <a href="/claim" style={{ fontSize: '11px', color: 'var(--fg-4)', textDecoration: 'none' }}>
                Is this your organization? <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Claim this listing →</span>
              </a>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
