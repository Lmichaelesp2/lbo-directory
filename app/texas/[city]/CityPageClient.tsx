'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import OrgCard from '@/components/OrgCard';
import { supabase, Organization } from '@/lib/supabase';
import { CITY_SLUG_TO_NAME, PUBLIC_CATEGORIES, CITY_CONTENT } from '@/lib/config';


export default function CityPageClient() {
  const params = useParams();
  const citySlug = params.city as string;
  const cityName = CITY_SLUG_TO_NAME[citySlug as keyof typeof CITY_SLUG_TO_NAME];
  const content = CITY_CONTENT[cityName];

  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cityName) return;
    setLoading(true);
    supabase
      .from('organizations')
      .select('id, name, city, public_category, home_page, logo_url, claimed, how_active')
      .eq('city', cityName)
      .not('public_category', 'is', null)
      .not('archive', 'eq', true)
      .order('name')
      .then(({ data }) => {
        setOrgs((data as Organization[]) || []);
        const c: Record<string, number> = {};
        (data || []).forEach((o: any) => { if (o.public_category) c[o.public_category] = (c[o.public_category] || 0) + 1; });
        setCounts(c);
        setLoading(false);
      });
  }, [cityName]);

  const filtered = orgs.filter(o => {
    const matchCat = !selectedCategory || o.public_category === selectedCategory;
    const matchSearch = !search || o.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (!cityName) return <div style={{ padding: '48px', textAlign: 'center' }}>City not found.</div>;

  return (
    <>
      <Navigation activeCitySlug={citySlug} activeState="texas" activeCityName={cityName} />
      <main style={{ flex: 1 }}>

        {/* City hero — matches Texas page layout */}
        <section className="lbo-hero-section" style={{ background: 'var(--color-paper)', padding: '4rem 2rem 0', borderBottom: '1px solid var(--color-rule)' }}>
          <div className="lbo-hero-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 320px', gap: '3rem', alignItems: 'start', paddingBottom: '3.5rem' }}>

            <div>
              {/* Breadcrumb */}
              <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-4)', marginBottom: '1.25rem' }}>
                <Link href="/" style={{ color: 'var(--fg-4)', textDecoration: 'none' }}>All States</Link>
                <span style={{ margin: '0 6px' }}>›</span>
                <Link href="/texas" style={{ color: 'var(--fg-4)', textDecoration: 'none' }}>Texas</Link>
                <span style={{ margin: '0 6px' }}>›</span>
                <span style={{ color: 'var(--fg-2)' }}>{cityName}</span>
              </div>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-primary)', marginBottom: '1.25rem' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--color-primary)', display: 'inline-block' }} />
                {cityName} Business Directory · Texas
              </div>

              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.25rem, 4.5vw, 3rem)', fontWeight: 600, color: 'var(--fg-1)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '1.25rem' }}>
                The business organizations that matter{' '}
                <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--color-primary)' }}>in {cityName}.</em>
              </h1>

              {content && (
                <p style={{ fontSize: '1.05rem', color: 'var(--fg-3)', lineHeight: 1.6, maxWidth: '560px', marginBottom: '2rem' }}>
                  {content.intro}
                </p>
              )}

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <a href="#organizations" style={{ background: 'var(--color-accent)', color: '#fff', padding: '0.85rem 1.75rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none' }}>
                  Browse {cityName} →
                </a>
                <a href="https://www.localbusinesscalendars.com" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#fff', color: 'var(--color-primary)', padding: '0.85rem 1.75rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', border: '1px solid var(--color-primary)' }}>
                  See Upcoming Events ↗
                </a>
              </div>
            </div>

            {/* Right panel — category counts */}
            <div className="lbo-hero-city-panel" style={{ background: '#fff', border: '1px solid var(--color-rule)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(10,22,40,.07)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-3)', padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--color-rule)', background: 'var(--color-paper-2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Browse by category</span>
                <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>{loading ? '—' : orgs.length} orgs</span>
              </div>
              {PUBLIC_CATEGORIES.filter(c => c.label !== 'Other').map((cat, i) => (
                <button key={cat.label}
                  onClick={() => setSelectedCategory(selectedCategory === cat.label ? null : cat.label)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.7rem 1.25rem', borderBottom: '1px solid var(--color-rule)', width: '100%', background: selectedCategory === cat.label ? 'var(--color-primary-bg)' : 'transparent', border: 'none', borderBottom: '1px solid var(--color-rule)', cursor: 'pointer', textAlign: 'left' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 500, color: selectedCategory === cat.label ? 'var(--color-primary)' : 'var(--fg-1)' }}>{cat.label}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary)', background: 'var(--color-primary-bg)', padding: '2px 8px', borderRadius: '100px' }}>
                    {loading ? '—' : (counts[cat.label] || 0)}
                  </span>
                </button>
              ))}
              <button
                onClick={() => setSelectedCategory(selectedCategory === 'Other' ? null : 'Other')}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.7rem 1.25rem', width: '100%', background: selectedCategory === 'Other' ? 'var(--color-primary-bg)' : 'transparent', border: 'none', borderBottom: '1px solid var(--color-rule)', cursor: 'pointer', textAlign: 'left' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 500, color: selectedCategory === 'Other' ? 'var(--color-primary)' : 'var(--fg-3)', fontStyle: 'italic' }}>+ More categories</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--fg-4)', background: 'var(--color-paper-2)', padding: '2px 8px', borderRadius: '100px' }}>
                  {loading ? '—' : (counts['Other'] || 0)}
                </span>
              </button>
              {/* Search */}
              <div style={{ padding: '0.75rem 1.25rem' }}>
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
        <section style={{ background: 'var(--color-ink)', padding: '0.6rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {[
              [loading ? '—' : String(orgs.length), 'organizations listed'],
              ['4', 'categories'],
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

        <div id="organizations" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 2rem' }}>

          {/* What you'll find here — moved inline below hero */}
          {content && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-rule)' }}>
              {content.highlights.map(h => (
                <div key={h} style={{ display: 'flex', gap: '6px', alignItems: 'center', background: 'var(--color-paper-2)', border: '1px solid var(--color-rule)', borderRadius: '100px', padding: '4px 12px' }}>
                  <span style={{ color: 'var(--color-primary)', fontSize: '11px' }}>✓</span>
                  <span style={{ fontSize: '0.775rem', color: 'var(--fg-2)', fontWeight: 500 }}>{h}</span>
                </div>
              ))}
            </div>
          )}

          {/* Category filter pills */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '1.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-4)', marginRight: '4px' }}>Filter:</span>
            {PUBLIC_CATEGORIES.map(cat => {
              const isActive = selectedCategory === cat.label;
              const label = cat.label === 'Other' ? '+ More' : cat.label;
              return (
                <button key={cat.label}
                  onClick={() => setSelectedCategory(isActive ? null : cat.label)}
                  style={{ background: isActive ? 'var(--color-primary)' : '#fff', color: isActive ? '#fff' : 'var(--fg-2)', border: isActive ? '1px solid var(--color-primary)' : '1px solid #e2e8f0', borderRadius: '100px', padding: '5px 14px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  {label} {counts[cat.label] ? `(${counts[cat.label]})` : ''}
                </button>
              );
            })}
            {selectedCategory && (
              <button onClick={() => setSelectedCategory(null)} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', fontSize: '0.8rem', padding: '5px 8px', fontFamily: 'var(--font-sans)' }}>
                Clear ×
              </button>
            )}
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {filtered.map(org => <OrgCard key={org.id} org={org} lean />)}
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

          {/* Events CTA */}
          <div style={{ background: 'var(--color-ink)', borderRadius: '12px', padding: '1.5rem 1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem', gap: '24px' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '3px' }}>See what {cityName} organizations have coming up</h3>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>View upcoming events on Local Business Calendars — updated weekly, free to browse.</p>
            </div>
            <a href="https://www.localbusinesscalendars.com" target="_blank" rel="noopener noreferrer"
              style={{ background: 'var(--color-accent)', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 700, whiteSpace: 'nowrap', textDecoration: 'none', flexShrink: 0 }}>
              View the Calendar →
            </a>
          </div>

        </div>
      </main>
      <Footer citySlug={citySlug} cityName={cityName} />
    </>
  );
}
