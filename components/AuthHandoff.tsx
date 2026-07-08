'use client';

import { useEffect } from 'react';
import { supabaseAuth } from '@/lib/auth';

// Hosts of the sister site (Local Business Calendars). A logged-in visitor
// clicking any link to one of these should stay logged in over there.
const SISTER_HOSTS = [
  'localbusinesscalendars.com',
  'www.localbusinesscalendars.com',
  'businesscalendar.link',
  'www.businesscalendar.link',
];

/**
 * Cross-site single sign-on, both directions.
 *
 * Both sites share one Supabase project, but browser sessions are per-domain, so
 * a login on one site isn't visible on the other. This bridges that:
 *
 *   RECEIVE — if we arrive with the session in the URL hash
 *     (#lbo_at=<access_token>&lbo_rt=<refresh_token>), adopt it and clear the hash.
 *   SEND — when a logged-in visitor clicks any link to the sister site, append
 *     the current session to that link's hash so the other site can adopt it.
 *
 * The hash is never sent to a server (nor included in the Referer header), and is
 * stripped on arrival. This mirrors Supabase's own magic-link flow.
 */
export default function AuthHandoff() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // ── RECEIVE ──────────────────────────────────────────────────────────────
    const hash = window.location.hash;
    if (hash && hash.indexOf('lbo_at=') !== -1) {
      const p = new URLSearchParams(hash.slice(1));
      const access_token = p.get('lbo_at');
      const refresh_token = p.get('lbo_rt');
      if (access_token && refresh_token) {
        supabaseAuth.auth
          .setSession({ access_token, refresh_token })
          .catch(() => { /* invalid/expired — leave logged out */ })
          .finally(() => {
            const clean = window.location.pathname + window.location.search;
            window.history.replaceState(null, '', clean);
          });
      }
    }

    // ── SEND ─────────────────────────────────────────────────────────────────
    // Keep the current tokens in a local ref so the click handler stays sync.
    let tokens: { at: string; rt: string } | null = null;
    supabaseAuth.auth.getSession().then(({ data }) => {
      if (data.session?.access_token && data.session?.refresh_token) {
        tokens = { at: data.session.access_token, rt: data.session.refresh_token };
      }
    });
    const { data: sub } = supabaseAuth.auth.onAuthStateChange((_e, session) => {
      tokens = session?.access_token && session?.refresh_token
        ? { at: session.access_token, rt: session.refresh_token }
        : null;
    });

    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (!tokens) return;
      const anchor = (e.target as HTMLElement)?.closest?.('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;
      let url: URL;
      try { url = new URL(href, window.location.href); } catch { return; }
      if (!SISTER_HOSTS.includes(url.hostname)) return;
      if (url.hash.indexOf('lbo_at=') !== -1) return; // already carrying a session

      url.hash = `lbo_at=${encodeURIComponent(tokens.at)}&lbo_rt=${encodeURIComponent(tokens.rt)}`;
      e.preventDefault();
      if (anchor.target === '_blank') {
        window.open(url.toString(), '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = url.toString();
      }
    }

    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      sub.subscription.unsubscribe();
    };
  }, []);

  return null;
}
