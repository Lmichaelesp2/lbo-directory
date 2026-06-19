'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import OrgCard from '@/components/OrgCard';
import { supabase, Organization } from '@/lib/supabase';
import { CITY_SLUG_TO_NAME, PUBLIC_CATEGORIES, CITY_CONTENT, CATEGORY_MAP } from '@/lib/config';


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
      .select('id, name, city, category, group_type, description, home_page, calendar_website, facebook_url, instagram_url, linkedin_url, how_active, verified, group_address, group_zipcode, group_contact, group_email, group_phone_number, typical_title, membership_type, membership_fee_range, industries_served, event_format, event_size, formality, primary_value, guest_friendly, founded_year, national_affiliate, ai_match_tags')
      .eq('city', cityName)
      .not('archive', 'eq', true)
      .order('name')
      .limit(1000)
      .then(({ data }) => {
        setOrgs((data as Organization[]) || []);
        const c: Record<string, number> = {};
        (data || []).forEach((o: any) => {
          const label = o.category ? CATEGORY_MAP[o.category] : null;
          if (label) c[label] = (c[label] || 0) + 1;
        });
        setCounts(c);
        setLoading(false);
      });
  }, [cityName]);

  const filtered = orgs.filter(o => {
    const displayCat = o.category ? CATEGORY_MAP[o.category] : null;
    const matchCat = !selectedCategory || displayCat === selectedCategory;
    const matchSearch = !search || o.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
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
                <a href="https://www.localbusinesscalendar.com" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#fff', color: 'var(--color-primary)', padding: '0.85rem 1.75rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', border: '1px solid var(--color-primary)' }}>
                  See Upcoming Events ↗
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

          {/* Category filter */}
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-4)', marginBottom: '0.75rem' }}>
              Filter by category
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
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
            <a href="https://www.localbusinesscalendar.com" target="_blank" rel="noopener noreferrer"
              style={{ background: 'var(--color-accent)', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 700, whiteSpace: 'nowrap', textDecoration: 'none', flexShrink: 0 }}>
              View the Calendar →
            </a>
          </div>

        </div>
      </main>
      {/* Event Networking Method strip — hidden until rollout */}

      <Footer citySlug={citySlug} cityName={cityName} />
    </>
  );
}
