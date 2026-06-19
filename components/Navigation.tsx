'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { CITIES } from '@/lib/config';
import { supabaseAuth, signOut } from '@/lib/auth';
import type { User } from '@supabase/supabase-js';

function LboCitiesDropdown({ activeCitySlug }: { activeCitySlug?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isActive = CITIES.some(c => c.slug === activeCitySlug);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ fontSize: '13px', fontWeight: isActive ? 600 : 500, color: isActive ? 'var(--fg-1)' : 'var(--fg-2)', padding: '4px 12px', borderRadius: '6px', background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', gap: '4px' }}>
        Cities
        <span style={{ fontSize: '10px', color: 'var(--fg-4)' }}>▾</span>
      </button>
      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, background: '#fff', border: '1px solid var(--color-rule)', borderRadius: '10px', boxShadow: '0 4px 20px rgba(10,22,40,.10)', minWidth: '160px', zIndex: 100, overflow: 'hidden' }}>
          {CITIES.map(city => (
            <Link key={city.slug} href={`/texas/${city.slug}`}
              onClick={() => setOpen(false)}
              style={{ display: 'block', padding: '0.6rem 1rem', fontSize: '13px', fontWeight: activeCitySlug === city.slug ? 700 : 500, color: activeCitySlug === city.slug ? 'var(--color-primary)' : 'var(--fg-1)', textDecoration: 'none', borderBottom: '1px solid var(--color-rule)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-paper)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              {city.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navigation({ activeCitySlug, activeState, activeCityName }: { activeCitySlug?: string; activeState?: string; activeCityName?: string }) {
  const [moreOpen, setMoreOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabaseAuth.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabaseAuth.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  }).toUpperCase();

  const subtitle = activeCityName
    ? `${activeCityName} Business Organizations · Texas`
    : activeState === 'texas'
      ? 'Texas Business Organizations · By City & Category'
      : 'Business Organizations · By City & Category';

  const NAV_LINKS = [
    { href: '/texas',        label: 'Texas' },
    ...CITIES.map(c => ({ href: `/texas/${c.slug}`, label: c.name })),
  ];

  const MORE_LINKS = [
    { href: 'https://www.localbusinesscalendar.com', label: 'Events Calendar ↗', external: true, primary: true },
    // { href: '/event-networking-method', label: 'Event Networking Method', external: false, primary: false }, // hidden until rollout
    { href: '/about',   label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/help',    label: 'Help' },
    { href: '/sponsor', label: 'Sponsorship' },
    { href: '/claim',   label: 'Claim Your Listing' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms',   label: 'Terms & Conditions' },
  ];

  return (
    <header className="lbo-header">
      {/* Top bar */}
      <div className="lbo-nav-topbar">
        <div className="lbo-nav-topbar-inner">
          <span className="lbo-nav-dateline">{today}</span>

          <Link href="/" style={{ textAlign: 'center', textDecoration: 'none' }}>
            <div className="lbo-nav-wordmark" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-ink)', letterSpacing: '-0.04em', fontFamily: 'var(--font-sans)', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
              {activeCityName ? (
                <><span style={{ color: 'var(--color-primary)' }}>{activeCityName}</span> Business Organizations</>
              ) : (
                <><span style={{ color: 'var(--color-primary)' }}>Local</span> Business Organizations</>
              )}
            </div>
            <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-4)', marginTop: '4px' }}>
              {subtitle}
            </div>
          </Link>

          {/* Desktop: org count | Mobile: hamburger */}
          <div className="lbo-nav-orgcount" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--color-primary)', display: 'inline-block' }}></span>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-primary)' }}>588 Organizations</span>
          </div>

          <button
            className="lbo-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            {menuOpen
              ? <i className="ti ti-x" style={{ fontSize: '1.25rem' }} />
              : <i className="ti ti-menu-2" style={{ fontSize: '1.25rem' }} />
            }
          </button>
        </div>
      </div>

      {/* Desktop nav bar */}
      <nav className="lbo-nav-bar">
        <div className="lbo-nav-links-inner">
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            {/* Texas */}
            <Link href="/texas"
              style={{ fontSize: '13px', fontWeight: activeState === 'texas' && !activeCitySlug ? 600 : 500, color: activeState === 'texas' && !activeCitySlug ? 'var(--fg-1)' : 'var(--fg-2)', padding: '4px 12px', borderRadius: '6px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Texas
            </Link>

            {/* Cities dropdown */}
            <LboCitiesDropdown activeCitySlug={activeCitySlug} />

            <Link href="/about"
              style={{ fontSize: '13px', fontWeight: 500, color: 'var(--fg-2)', padding: '4px 12px', borderRadius: '6px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              About
            </Link>
            <Link href="/contact"
              style={{ fontSize: '13px', fontWeight: 500, color: 'var(--fg-2)', padding: '4px 12px', borderRadius: '6px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Contact
            </Link>
            <Link href="/help"
              style={{ fontSize: '13px', fontWeight: 500, color: 'var(--fg-2)', padding: '4px 12px', borderRadius: '6px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Help
            </Link>

            {/* More dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setMoreOpen(o => !o)}
                onBlur={() => setTimeout(() => setMoreOpen(false), 150)}
                style={{ fontSize: '13px', fontWeight: 500, color: 'var(--fg-2)', padding: '4px 12px', borderRadius: '6px', background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                More
                <span style={{ fontSize: '10px', color: 'var(--fg-4)' }}>▾</span>
              </button>
              {moreOpen && (
                <div style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, background: '#fff', border: '1px solid var(--color-rule)', borderRadius: '10px', boxShadow: '0 4px 20px rgba(10,22,40,.10)', minWidth: '180px', zIndex: 100, overflow: 'hidden' }}>
                  {[
                    { href: '/texas-business-network', label: 'Texas Business Network' },
                    { href: '/sponsor', label: 'Sponsorship' },
                    { href: '/privacy', label: 'Privacy Policy' },
                    { href: '/terms',   label: 'Terms & Conditions' },
                  ].map(item => (
                    <Link key={item.href} href={item.href}
                      style={{ display: 'block', padding: '0.6rem 1rem', fontSize: '13px', fontWeight: 500, color: 'var(--fg-1)', textDecoration: 'none', borderBottom: '1px solid var(--color-rule)' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-paper)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lbo-nav-right" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {/* Cross-link to LBC */}
            <a href="https://www.localbusinesscalendar.com" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)', padding: '4px 12px', borderRadius: '6px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Events Calendar ↗
            </a>
            {user ? (
              <>
                <a href="https://www.localbusinesscalendars.com/account" target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-2)', padding: '7px 14px', borderRadius: '6px', textDecoration: 'none', whiteSpace: 'nowrap', border: '1px solid var(--color-rule)' }}>
                  My Account
                </a>
                <button onClick={async () => { await signOut(); setUser(null); window.location.href = '/'; }}
                  style={{ background: 'none', border: '1px solid var(--color-rule)', borderRadius: '6px', padding: '6px 14px', fontSize: '12px', fontWeight: 600, color: 'var(--fg-3)', cursor: 'pointer', fontFamily: 'var(--font-sans)', whiteSpace: 'nowrap' }}>
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/login"
                  style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-2)', padding: '7px 14px', borderRadius: '6px', textDecoration: 'none', whiteSpace: 'nowrap', border: '1px solid var(--color-rule)' }}>
                  Sign in
                </Link>
                <Link href="/signup"
                  style={{ background: 'var(--color-accent)', color: '#fff', padding: '7px 18px', borderRadius: '6px', fontSize: '13px', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.01em', whiteSpace: 'nowrap' }}>
                  Create free account →
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile slide-down menu */}
      {menuOpen && (
        <div className="lbo-mobile-menu" onClick={() => setMenuOpen(false)}>
          {/* Cities section */}
          <div className="lbo-mobile-menu-section">
            <div className="lbo-mobile-menu-label">Directory</div>
            {NAV_LINKS.map(item => (
              <Link key={item.href} href={item.href} className="lbo-mobile-menu-link"
                style={{ fontWeight: activeCitySlug && item.href.includes(activeCitySlug) ? 700 : 500 }}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="lbo-mobile-menu-divider" />
          {/* All other links */}
          <div className="lbo-mobile-menu-section">
            <div className="lbo-mobile-menu-label">More</div>
            {MORE_LINKS.map(item => (
              item.external
                ? <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer"
                    className="lbo-mobile-menu-link"
                    style={{ color: item.primary ? 'var(--color-primary)' : undefined, fontWeight: item.primary ? 600 : 500 }}>
                    {item.label}
                  </a>
                : <Link key={item.href} href={item.href} className="lbo-mobile-menu-link">
                    {item.label}
                  </Link>
            ))}
          </div>
          <div className="lbo-mobile-menu-divider" />
          <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {user ? (
              <>
                <div style={{ fontSize: '12px', color: 'var(--fg-4)', marginBottom: '4px' }}>{user.email}</div>
                <a href="https://www.localbusinesscalendars.com/account" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'block', background: 'var(--color-paper)', border: '1px solid var(--color-rule)', borderRadius: '6px', padding: '10px 16px', fontSize: '13px', fontWeight: 600, color: 'var(--fg-1)', textDecoration: 'none' }}>
                  My Account &amp; Subscriptions ↗
                </a>
                <button onClick={async () => { await signOut(); setUser(null); setMenuOpen(false); window.location.href = '/'; }}
                  style={{ background: 'none', border: '1px solid var(--color-rule)', borderRadius: '6px', padding: '10px 16px', fontSize: '13px', fontWeight: 600, color: 'var(--fg-2)', cursor: 'pointer', fontFamily: 'var(--font-sans)', textAlign: 'left' }}>
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/signup" className="lbo-mobile-claim-btn">
                  Create free account →
                </Link>
                <Link href="/login"
                  style={{ display: 'block', textAlign: 'center', fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)', padding: '10px', textDecoration: 'none' }}>
                  Sign in
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
