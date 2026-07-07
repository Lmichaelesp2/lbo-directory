'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import OrgCard from '@/components/OrgCard';
import { Organization } from '@/lib/supabase';
import { CITY_SLUG_TO_NAME, PUBLIC_CATEGORIES, CITY_CONTENT, CATEGORY_MAP } from '@/lib/config';
import { OrgEvent } from '@/lib/events';

type Props = {
  initialOrgs?: Organization[];
  eventsByOrg?: Record<number, OrgEvent[]>;
};

function computeCounts(list: Organization[]): Record<string, number> {
  const c: Record<string, number> = {};
  list.forEach((o) => {
    const label = o.category ? CATEGORY_MAP[o.category] : null;
    if (label) c[label] = (c[label] || 0) + 1;
  });
  return c;
}

export default function CityPageClient({ initialOrgs, eventsByOrg }: Props = {}) {
  const params = useParams();
  const citySlug = params.city as string;
  const cityName = CITY_SLUG_TO_NAME[citySlug as keyof typeof CITY_SLUG_TO_NAME];
  const content = CITY_CONTENT[cityName];

  const hasSeed = Array.isArray(initialOrgs);
  const events = eventsByOrg || {};
  const totalEventCount = Object.values(events).reduce((n, arr) => n + arr.length, 0);

  const [orgs, setOrgs] = useState<Organization[]>(initialOrgs || []);
  const [counts, setCounts] = useState<Record<string, number>>(hasSeed ? computeCounts(initialOrgs!) : {});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(!hasSeed);

  useEffect(() => {
    // Server already seeded the list (SSR path) — no client fetch needed.
    if (hasSeed || !cityName) return;
    setLoading(true);
    fetch(`/api/organizations?city=${encodeURIComponent(cityName)}`)
      .then(r => r.json())
      .then((data: Organization[]) => {
        setOrgs(data || []);
        setCounts(computeCounts(data || []));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [cityName, hasSeed]);

  const filtered = orgs.filter(o => {
    const displayCat = o.category ? CATEGORY_MAP[o.category] : null;
    const matchCat = !selectedCategory || displayCat === selectedCategory;
    const matchSearch = !search || o.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  }).sort((a, b) => {
    // Active orgs (with an event this week) sort first; then A→Z.
    const aActive = (events[a.id]?.length || 0) > 0 ? 1 : 0;
    const bActive = (events[b.id]?.length || 0) > 0 ? 1 : 0;
    if (aActive !== bActive) return bActive - aActive;
    return a.name.localeCompare(b.name);
  });

  if (!cityName) return <div style={{ padding: '48px', textAlign: 'center' }}>City not found.</div>;

  return (
    <>
      <Navigation activeCitySlug={citySlug} activeState="texas" activeCityName={cityName} />
      <Breadcrumb items={[
        { label: 'Local Business Organizations', href: '/' },
        { label: 'Texas', href: '/texas' },
        { label: cityName },
      ]} />
      <main style={{ flex: 1, background: 'var(--color-paper-2)' }}>

        {/* City hero */}
        <section className="lbo-hero-section" style={{ background: 'var(--color-paper)', padding: '4rem 2rem 0', borderBottom: '1px solid var(--color-rule)' }}>
          <div className="lbo-hero-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 320px', gap: '3rem', alignItems: 'start', paddingBottom: '3.5rem' }}>

            <div>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-primary)', marginBottom: '1.25rem' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--color-primary)', display: 'inline-block' }} />
                {cityName} Business Directory · Texas
              </div>

              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.25rem, 4.5vw, 3rem)', fontWeight: 600, color: 'var(--fg-1)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '1.25rem' }}>
                The business organizations that matter{' '}
                <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--color-primary)' }}>in {cityName}.</em>
              </h1>

              {content && (
                <p style={{ fontSize: '1rem', color: 'var(--fg-3)', lineHeight: 1.7, maxWidth: '720px', marginBottom: '2rem' }}>
                  {content.heroText}
                </p>
              )}

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <a href="#organizations" style={{ background: 'var(--color-accent)', color: '#fff', padding: '0.85rem 1.75rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none' }}>
                  Browse {cityName} →
                </a>
                <a href={`https://www.localbusinesscalendars.com/texas/${citySlug}`} target="_blank" rel="noopener noreferrer"
                  style={{ background: '#fff', color: 'var(--color-primary)', padding: '0.85rem 1.75rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', border: '1px solid var(--color-primary)' }}>
                  See {cityName} Events ↗
                </a>
              </div>
            </div>

            {/* Right panel — stats + search */}
            <div className="lbo-hero-city-panel" style={{ background: '#fff', border: '1px solid var(--color-rule)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(10,22,40,.07)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-3)', padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--color-rule)', background: 'var(--color-paper-2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{cityName} Directory</span>
                <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>{loading ? '—' : orgs.length} orgs</span>
              </div>
              <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { label: 'Categories', value: '8' },
                  { label: 'Verified profiles', value: String(orgs.filter(o => o.verified).length || '—') },
                  { label: 'Free to browse', value: 'Yes' },
                ].map(stat => (
                  <div key={stat.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.825rem' }}>
                    <span style={{ color: 'var(--fg-3)' }}>{stat.label}</span>
                    <span style={{ fontWeight: 700, color: 'var(--fg-1)' }}>{stat.value}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding: '0 1.25rem 1rem', borderTop: '1px solid var(--color-rule)', paddingTop: '0.75rem' }}>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--fg-4)', fontSize: '13px', pointerEvents: 'none' }}>🔍</span>
                  <input
                    type="text"
                    placeholder={`Search ${cityName}...`}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ background: 'var(--color-paper)', border: '1px solid var(--color-rule)', borderRadius: '6px', padding: '8px 10px 8px 30px', fontSize: '12px', width: '100%', color: 'var(--fg-1)', outline: 'none', fontFamily: 'var(--font-sans)', boxSizing: 'border-box' }}
                  />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Stats strip */}
        <section style={{ background: 'var(--color-dark-section)', padding: '0.6rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {[
              [loading ? '—' : String(orgs.length), 'organizations listed'],
              ['8', 'categories'],
              ['Free', 'to browse'],
            ].map(([val, label], i, arr) => (
              <>
                <span key={label} style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,.65)' }}>
                  <strong>{val}</strong> {label}
                </span>
                {i < arr.length - 1 && <span style={{ color: 'rgba(255,255,255,.3)', fontWeight: 300 }}>|</span>}
              </>
            ))}
          </div>
        </section>

        {/* How it works (3 steps) — city-flavored */}
        <section style={{ background: '#fff', padding: '4rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>How it works</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '1.75rem' }}>
              Find Where to Plug In, {cityName} — in 3 Steps
            </h2>
            <div className="lbo-steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {[
                { n: '1', head: `Browse ${cityName} organizations`, body: `See every chamber, association, networking group, and trade organization active in ${cityName} — all in one place, free to browse.` },
                { n: '2', head: 'Filter by category', body: 'Narrow by category — Networking, Technology, Real Estate, Chambers, and more — to find the organizations that match your industry and goals.' },
                { n: '3', head: 'Join and get involved', body: `Find the ${cityName} organizations that fit, join them, and show up consistently. That's how you build real relationships and become a known presence in your local business community.` },
              ].map(step => (
                <div key={step.n} style={{ background: 'var(--color-paper-2)', border: '1px solid var(--color-rule)', borderRadius: '12px', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', bottom: '-12px', right: '10px', fontSize: '4.5rem', fontWeight: 800, color: 'var(--color-primary)', opacity: 0.07, lineHeight: 1, pointerEvents: 'none', fontFamily: 'var(--font-sans)', letterSpacing: '-0.05em' }}>{step.n}</div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 700, color: 'var(--fg-1)', marginBottom: '0.5rem', position: 'relative' }}>{step.head}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--fg-3)', lineHeight: 1.6, position: 'relative' }}>{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div id="organizations" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 2rem', boxSizing: 'border-box', overflow: 'hidden', background: 'var(--color-paper-2)' }}>

          {/* Looking for events first? — LBC handoff banner (only when we have live events) */}
          {totalEventCount > 0 && (
            <a href={`https://www.localbusinesscalendars.com/texas/${citySlug}`} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '10px', padding: '12px 18px', marginBottom: '1.5rem', textDecoration: 'none', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--fg-2)', lineHeight: 1.5 }}>
                <i className="ti ti-calendar-event" style={{ color: 'var(--color-accent)', marginRight: '7px' }} />
                <strong style={{ color: 'var(--fg-1)' }}>{totalEventCount} events</strong> this week from these {cityName} organizations. Looking for events first?
              </span>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-accent)', whiteSpace: 'nowrap' }}>
                See the {cityName} calendar →
              </span>
            </a>
          )}

          {/* Browse the directory — heading + category filter */}
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
              Browse the directory
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '0.5rem' }}>
              {loading ? 'Organizations' : orgs.length} Organizations in {cityName}, by Category
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--fg-3)', lineHeight: 1.6, marginBottom: '1.25rem', maxWidth: '640px' }}>
              Every chamber, association, and networking group we've tracked in {cityName} — sorted into 8 categories. Select one below to narrow the list, or scroll past it to browse everything.
            </p>

            <div style={{ position: 'relative', maxWidth: '420px', marginBottom: '1.5rem' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--fg-4)', fontSize: '14px', pointerEvents: 'none' }}>🔍</span>
              <input
                type="text"
                placeholder={`Search ${cityName} organizations by name...`}
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ background: '#fff', border: '1px solid var(--color-rule)', borderRadius: '8px', padding: '0.7rem 1rem 0.7rem 2.4rem', fontSize: '0.875rem', width: '100%', color: 'var(--fg-1)', outline: 'none', fontFamily: 'var(--font-sans)', boxSizing: 'border-box', boxShadow: '0 1px 3px rgba(10,22,40,.05)' }}
                onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderColor = 'var(--color-primary)'; }}
                onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderColor = 'var(--color-rule)'; }}
              />
            </div>

            <div className="lbo-cat-filter-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {PUBLIC_CATEGORIES.map(cat => {
                const isActive = selectedCategory === cat.label;
                return (
                  <button key={cat.label}
                    onClick={() => setSelectedCategory(isActive ? null : cat.label)}
                    style={{
                      background: isActive ? 'var(--color-primary-bg)' : '#fff',
                      border: isActive ? '1.5px solid var(--color-primary)' : '1px solid var(--color-rule)',
                      borderRadius: '10px',
                      padding: '0.875rem 1rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontFamily: 'var(--font-sans)',
                      transition: 'border-color 0.15s, background 0.15s',
                    }}>
                    <i className={`ti ${cat.icon}`} style={{ fontSize: '1.1rem', color: isActive ? 'var(--color-primary)' : 'var(--fg-3)', flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: isActive ? 'var(--color-primary)' : 'var(--fg-1)', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cat.label}</div>
                      <div style={{ fontSize: '0.7rem', color: isActive ? 'var(--color-primary)' : 'var(--fg-4)', marginTop: '2px' }}>{loading ? '—' : (counts[cat.label] || 0)} orgs</div>
                    </div>
                    {isActive && (
                      <span style={{
                        background: 'var(--color-primary)',
                        color: '#fff',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        borderRadius: '100px',
                        padding: '1px 7px',
                        lineHeight: 1.6,
                        flexShrink: 0,
                      }}>✓</span>
                    )}
                  </button>
                );
              })}
            </div>
            {selectedCategory && (
              <button onClick={() => setSelectedCategory(null)}
                style={{ marginTop: '8px', background: 'none', border: 'none', color: 'var(--fg-4)', cursor: 'pointer', fontSize: '0.75rem', padding: '0', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                ← Clear filter
              </button>
            )}
          </div>

          {/* Slim account prompt */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', background: '#fdf1ec', border: '1px solid #f3cdb8', borderRadius: '8px', padding: '10px 16px', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-accent)', lineHeight: 1.5 }}>
              <i className="ti ti-lock" style={{ marginRight: '6px' }} />
              <strong>Free account</strong> unlocks full profiles, contact info, and the weekly {cityName} events newsletter.
            </span>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <Link href={`/signup?city=${encodeURIComponent(cityName)}`}
                style={{ background: 'var(--color-accent)', color: '#fff', padding: '6px 14px', borderRadius: '6px', fontSize: '0.775rem', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                Create account →
              </Link>
              <Link href="/login"
                style={{ background: '#fff', color: 'var(--color-accent)', padding: '6px 14px', borderRadius: '6px', fontSize: '0.775rem', fontWeight: 600, textDecoration: 'none', border: '1px solid var(--color-accent)', whiteSpace: 'nowrap' }}>
                Sign in
              </Link>
            </div>
          </div>

          {/* Results header */}
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-rule)' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--fg-1)' }}>
              {selectedCategory ? `${selectedCategory} — ${cityName}` : `All Organizations in ${cityName}`}
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--fg-4)' }}>{filtered.length} organizations</span>
          </div>

          {!selectedCategory && !search && (
            <p style={{ fontSize: '0.8rem', color: 'var(--fg-3)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Showing all {orgs.length} organizations currently listed for {cityName}. Use the category buttons above to filter by type, or search by name.
              Organizations marked <strong style={{ color: '#065f46' }}>Claimed</strong> have been verified by their leadership team.
            </p>
          )}
          {selectedCategory && (
            <p style={{ fontSize: '0.8rem', color: 'var(--fg-3)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Showing {filtered.length} <strong>{selectedCategory}</strong> organizations in {cityName}.
            </p>
          )}

          {/* Org grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '48px', color: 'var(--fg-4)' }}>Loading organizations...</div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px', color: 'var(--fg-4)' }}>No organizations found.</div>
          ) : (
            <div className="lbo-org-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', minWidth: 0 }}>
              {filtered.map(org => <OrgCard key={org.id} org={org} lean events={events[org.id]} />)}
            </div>
          )}

          {/* More cities callout */}
          <div style={{ borderRadius: '10px', padding: '1rem 1.25rem', border: '1px solid var(--color-rule)', background: 'var(--color-paper-2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.75rem', gap: '16px' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--fg-3)', margin: 0 }}>
              <strong style={{ color: 'var(--fg-1)' }}>Don't see your city?</strong> We're expanding to Florida and beyond — let us know where to go next.
            </p>
            <Link href="/contact" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Request a city →
            </Link>
          </div>

          {/* Free account CTA — light, compact */}
          <div style={{ background: '#fff', border: '1px solid var(--color-rule)', borderRadius: '12px', padding: '1.5rem 1.75rem', marginTop: '1.75rem', display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 340px', minWidth: 0 }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--fg-1)', marginBottom: '0.4rem', lineHeight: 1.3 }}>
                Create a free account to see it all
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--fg-3)', lineHeight: 1.6, margin: 0 }}>
                Full org profiles, contact info, and this week&apos;s events — plus the weekly {cityName} events newsletter.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexShrink: 0 }}>
              <Link href={`/signup?city=${encodeURIComponent(cityName)}`}
                style={{ background: 'var(--color-accent)', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                Create free account →
              </Link>
              <Link href="/login"
                style={{ color: 'var(--color-primary)', padding: '0.75rem 0.5rem', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                Sign in
              </Link>
            </div>
          </div>

          {/* Testimonials — trust beat right after the conversion ask */}
          <div style={{ marginTop: '2.5rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: '0.75rem' }}>
              What people are saying
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 600, color: 'var(--fg-1)', lineHeight: 1.3, marginBottom: '1.25rem', maxWidth: '600px' }}>
              Professionals across {cityName} are using this directory{' '}
              <em style={{ fontStyle: 'italic', fontWeight: 400 }}>to find where they belong.</em>
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', minWidth: 0 }} className="lbo-testimonial-grid">
              {[
                {
                  quote: `I had no idea how many organizations were active in ${cityName} until I found this directory. It completely changed how I approach networking.`,
                  name: 'Rachel M.',
                  location: `${cityName}, TX`,
                },
                {
                  quote: `Finally a single place to see every chamber, association, and networking group in ${cityName}. This saved me hours of searching.`,
                  name: 'David K.',
                  location: `${cityName}, TX`,
                },
                {
                  quote: `I used this to find three new organizations to join in ${cityName}. The category breakdown made it easy to find exactly the right fit.`,
                  name: 'Priya S.',
                  location: `${cityName}, TX`,
                },
              ].map(t => (
                <div key={t.name} style={{ background: '#fff', border: '1px solid var(--color-rule)', borderRadius: '12px', padding: '1.25rem', minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: '2px', marginBottom: '0.6rem' }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="var(--color-accent)" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  <blockquote style={{ fontSize: '0.825rem', color: 'var(--fg-2)', lineHeight: 1.6, marginBottom: '0.85rem', fontStyle: 'italic' }}>"{t.quote}"</blockquote>
                  <div>
                    <div style={{ fontSize: '0.775rem', fontWeight: 700, color: 'var(--fg-1)' }}>— {t.name}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--fg-4)', marginTop: '2px' }}>{t.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* FAQ — trimmed to city-relevant questions */}
        <section style={{ background: '#fff', padding: '4rem 2rem' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>FAQ</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '2rem' }}>
              Frequently Asked Questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                {
                  question: 'Is it free to browse the directory?',
                  answer: `Yes — browsing ${cityName}'s directory is completely free. Create a free account to unlock full profiles including contact info, descriptions, social links, and membership details.`,
                },
                {
                  question: `How do I claim my organization's listing in ${cityName}?`,
                  answer: 'Click "Claim Your Listing" on any organization profile or use the link in the navigation. Free to request — reviewed and verified within 1–2 business days.',
                },
                {
                  question: `Can I see the events these ${cityName} organizations host?`,
                  answer: `Yes. Many organizations in this directory host weekly events tracked on our sister site, Local Business Calendars. Subscribe free to get every upcoming ${cityName} event delivered every Monday morning.`,
                },
                {
                  question: 'How often is the directory updated?',
                  answer: `We continually research and verify organizations in ${cityName} through public records, event platforms, and direct outreach. Each profile is manually reviewed before being added.`,
                },
              ].map((item, i) => (
                <details key={i} style={{ borderTop: '1px solid var(--color-rule)', padding: '1.1rem 0' }}>
                  <summary style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--fg-1)', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                    <span>{item.question}</span>
                    <span style={{ fontSize: '1.1rem', color: 'var(--fg-4)', flexShrink: 0, userSelect: 'none' }}>+</span>
                  </summary>
                  <p style={{ fontSize: '0.875rem', color: 'var(--fg-3)', lineHeight: 1.7, marginTop: '0.75rem', paddingRight: '1.5rem' }}>
                    {item.answer}
                  </p>
                </details>
              ))}
              <div style={{ borderTop: '1px solid var(--color-rule)' }} />
            </div>
          </div>
        </section>

      </main>
      {/* Event Networking Method strip — hidden until rollout */}

      <Footer citySlug={citySlug} cityName={cityName} />
    </>
  );
}
