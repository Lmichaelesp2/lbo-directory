'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import OrgCard from '@/components/OrgCard';
import { supabase, Organization } from '@/lib/supabase';
import { CITY_SLUG_TO_NAME, PUBLIC_CATEGORIES, CITY_CONTENT } from '@/lib/config';

const ICON_COLOR: Record<string, { bg: string; color: string }> = {
  blue:   { bg: '#eef3fe', color: '#1652f0' },
  teal:   { bg: '#f0fdf9', color: '#0f6e56' },
  orange: { bg: '#fff7ed', color: '#c2410c' },
  purple: { bg: '#f5f3ff', color: '#534AB7' },
};

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
      <Navigation activeCitySlug={citySlug} />
      <main style={{ flex: 1 }}>

        {/* City hero */}
        <section style={{ background: '#fff', borderBottom: '1px solid var(--color-rule)', padding: '36px 32px' }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '10px' }}>
              <Link href="/" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>All Cities</Link> › {cityName}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
              <div>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', fontWeight: 700, color: 'var(--fg-1)', lineHeight: 1.15, marginBottom: '6px' }}>
                  <span style={{ color: 'var(--color-primary)' }}>{cityName}</span> Business Organizations
                </h1>
                {content && (
                  <p style={{ fontSize: '13px', color: 'var(--fg-3)', fontWeight: 500, marginBottom: '0' }}>
                    {content.tagline}
                  </p>
                )}
              </div>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--fg-4)', fontSize: '14px', pointerEvents: 'none' }}>🔍</span>
                <input
                  type="text"
                  placeholder={`Search ${cityName} organizations...`}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ background: '#fff', border: '1.5px solid #cbd5e1', borderRadius: '8px', padding: '10px 14px 10px 34px', fontSize: '13px', width: '280px', color: 'var(--fg-1)', outline: 'none', fontFamily: 'var(--font-sans)' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats strip */}
        <section style={{ background: 'var(--color-ink)', padding: '16px 32px' }}>
          <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', gap: '40px', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '32px' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 700, color: '#fff' }}>{orgs.length}</span>
                <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '6px' }}>organizations listed</span>
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 700, color: '#fff' }}>8</span>
                <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '6px' }}>categories covered</span>
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 700, color: '#fff' }}>{Object.keys(counts).length}</span>
                <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '6px' }}>active category types</span>
              </div>
            </div>
          </div>
        </section>

        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 24px' }}>

          {/* City intro */}
          {content && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '40px', alignItems: 'flex-start', marginBottom: '36px', paddingBottom: '32px', borderBottom: '1px solid var(--color-rule)' }}>
              <div>
                <p style={{ fontSize: '14px', color: 'var(--fg-2)', lineHeight: 1.8, marginBottom: '0' }}>
                  {content.intro}
                </p>
              </div>
              <div style={{ minWidth: '220px' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-4)', marginBottom: '10px' }}>What you'll find here</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {content.highlights.map(h => (
                    <div key={h} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '1px' }}>✓</span>
                      <span style={{ fontSize: '12px', color: 'var(--fg-2)', lineHeight: 1.5 }}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Category filter */}
          <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '14px' }}>Browse by category</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '32px' }}>
            {PUBLIC_CATEGORIES.map(cat => {
              const colors = ICON_COLOR[cat.color];
              const isActive = selectedCategory === cat.label;
              return (
                <button key={cat.label}
                  onClick={() => setSelectedCategory(isActive ? null : cat.label)}
                  style={{ background: isActive ? 'var(--color-primary-bg)' : '#fff', border: isActive ? '1.5px solid var(--color-primary)' : '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer', textAlign: 'center' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: colors.bg, color: colors.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
                    <i className={`ti ${cat.icon}`} aria-hidden="true"></i>
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--fg-1)', lineHeight: 1.3 }}>{cat.label}</div>
                  <div style={{ fontSize: '10px', color: 'var(--fg-4)' }}>{counts[cat.label] || 0} orgs</div>
                </button>
              );
            })}
          </div>

          {/* Results header */}
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--color-rule)' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, color: 'var(--fg-1)' }}>
              {selectedCategory ? `${selectedCategory} — ${cityName}` : `All Organizations in ${cityName}`}
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--fg-4)' }}>{filtered.length} organizations</span>
          </div>

          {/* Helper text */}
          {!selectedCategory && !search && (
            <p style={{ fontSize: '13px', color: 'var(--fg-3)', lineHeight: 1.7, marginBottom: '20px' }}>
              Showing all {orgs.length} organizations currently listed for {cityName}. Use the category buttons above to filter by type, or search by name.
              Organizations marked <strong style={{ color: '#065f46' }}>Claimed</strong> have been verified by their leadership team.
            </p>
          )}
          {selectedCategory && (
            <p style={{ fontSize: '13px', color: 'var(--fg-3)', lineHeight: 1.7, marginBottom: '20px' }}>
              Showing {filtered.length} <strong>{selectedCategory}</strong> organizations in {cityName}.{' '}
              <button onClick={() => setSelectedCategory(null)} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', fontSize: '13px', padding: 0, fontFamily: 'var(--font-sans)' }}>
                Clear filter →
              </button>
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
          <div style={{ borderRadius: '10px', padding: '16px 20px', border: '1px solid var(--color-rule)', background: 'var(--color-paper-2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '28px', gap: '16px' }}>
            <p style={{ fontSize: '13px', color: 'var(--fg-3)', margin: 0 }}>
              <strong style={{ color: 'var(--fg-1)' }}>Don't see your city?</strong> We're expanding to Florida and beyond — let us know where to go next.
            </p>
            <Link href="/contact" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Request a city →
            </Link>
          </div>

          {/* Events CTA */}
          <div style={{ background: 'var(--color-ink)', borderRadius: '12px', padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px', gap: '24px' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', fontWeight: 700, color: '#fff', marginBottom: '3px' }}>See what {cityName} organizations have coming up</h3>
              <p style={{ fontSize: '13px', color: '#94a3b8' }}>View upcoming events on the Local Business Calendars.</p>
            </div>
            <a href="https://www.localbusinesscalendars.com" target="_blank" rel="noopener noreferrer"
              style={{ background: 'var(--color-accent)', color: '#fff', padding: '10px 22px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, whiteSpace: 'nowrap', textDecoration: 'none' }}>
              View the Calendar →
            </a>
          </div>

        </div>
      </main>
    </>
  );
}
