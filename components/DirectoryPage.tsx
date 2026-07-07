'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Organization } from '@/lib/supabase';
import { CITIES, PUBLIC_CATEGORIES, LBC_URL, CITY_SLUG_TO_NAME, CATEGORY_MAP } from '@/lib/config';
import OrgCard from './OrgCard';

const ICON_COLOR: Record<string, { bg: string; color: string }> = {
  blue:   { bg: '#eef3fe', color: '#1652f0' },
  teal:   { bg: '#f0fdf9', color: '#0f6e56' },
  orange: { bg: '#fff7ed', color: '#c2410c' },
  purple: { bg: '#f5f3ff', color: '#534AB7' },
};

export default function DirectoryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const citySlug = searchParams.get('city');
  const selectedCity = citySlug ? (CITY_SLUG_TO_NAME[citySlug as keyof typeof CITY_SLUG_TO_NAME] || 'San Antonio') : 'San Antonio';
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState<Record<string, number>>({});

  // Load orgs for selected city via API route (uses service role, no row cap)
  useEffect(() => {
    setLoading(true);
    fetch(`/api/organizations?city=${encodeURIComponent(selectedCity)}`)
      .then(r => r.json())
      .then((data: Organization[]) => {
        setOrgs(data || []);
        const c: Record<string, number> = {};
        (data || []).forEach(o => {
          const label = o.category ? CATEGORY_MAP[o.category] : null;
          if (label) c[label] = (c[label] || 0) + 1;
        });
        setCounts(c);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedCity]);

  // Filter orgs
  const filtered = orgs.filter(o => {
    const displayCat = o.category ? CATEGORY_MAP[o.category] : null;
    const matchCat = !selectedCategory || displayCat === selectedCategory;
    const matchSearch = !search || o.name.toLowerCase().includes(search.toLowerCase()) || (o.description || '').toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const cityCount = CITIES.find(c => c.name === selectedCity)?.count || 0;

  return (
    <main style={{ flex: 1 }}>
      {/* Hero */}
      <section style={{ padding: '48px 32px 40px', maxWidth: '960px', margin: '0 auto', display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--color-primary)', display: 'inline-block' }}></span>
            527 Organizations Across Texas
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '38px', fontWeight: 700, color: 'var(--fg-1)', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            Discover the organizations <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>behind</em> local business.
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--fg-3)', lineHeight: 1.7, maxWidth: '440px', marginBottom: '24px' }}>
            Chambers, networking groups, professional associations, and more — every business organization in San Antonio, Dallas, Houston, and Austin, all in one place.
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder={`Search organizations in ${selectedCity}...`}
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', width: '280px', color: 'var(--fg-1)', outline: 'none', fontFamily: 'var(--font-sans)' }}
            />
          </div>
        </div>

        {/* City counts panel */}
        <div style={{ background: '#fff', border: '1px solid var(--color-rule)', borderRadius: '12px', padding: '20px', minWidth: '220px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-4)', marginBottom: '14px' }}>Organizations by City</div>
          {CITIES.map(city => (
            <div key={city.slug} onClick={() => { setSelectedCategory(null); router.push(`/?city=${city.slug}`); }}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f1f5f9', cursor: 'pointer' }}>
              <span style={{ fontSize: '14px', fontWeight: selectedCity === city.name ? 600 : 500, color: selectedCity === city.name ? 'var(--color-primary)' : 'var(--fg-1)' }}>{city.name}</span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)' }}>{city.count} orgs</span>
            </div>
          ))}
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--color-rule)' }} />

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 24px' }}>
        {/* City tabs */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '28px' }}>
          {CITIES.map(city => (
            <button key={city.slug} onClick={() => { setSelectedCategory(null); router.push(`/?city=${city.slug}`); }}
              style={{ fontSize: '13px', fontWeight: selectedCity === city.name ? 600 : 500, color: selectedCity === city.name ? '#fff' : '#475569', padding: '7px 16px', borderRadius: '100px', border: '1px solid', borderColor: selectedCity === city.name ? 'var(--color-ink)' : '#e2e8f0', background: selectedCity === city.name ? 'var(--color-ink)' : '#fff', cursor: 'pointer' }}>
              {city.name}
            </button>
          ))}
        </div>

        {/* Category grid */}
        <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '14px' }}>Browse by category</div>
        <div className="m-2col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '36px' }}>
          {PUBLIC_CATEGORIES.map(cat => {
            const colors = ICON_COLOR[cat.color];
            const isActive = selectedCategory === cat.label;
            return (
              <button key={cat.label} onClick={() => setSelectedCategory(isActive ? null : cat.label)}
                style={{ background: isActive ? 'var(--color-primary-bg)' : '#fff', border: isActive ? '1.5px solid var(--color-primary)' : '1px solid #e2e8f0', borderRadius: '10px', padding: '14px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '7px', cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: colors.bg, color: colors.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px' }}>
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
            {selectedCategory || 'All Organizations'} — {selectedCity}
          </h2>
          <span style={{ fontSize: '12px', color: 'var(--fg-4)' }}>{filtered.length} organizations</span>
        </div>

        {/* Org grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '48px', color: 'var(--fg-4)', fontSize: '14px' }}>Loading organizations...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px', color: 'var(--fg-4)', fontSize: '14px' }}>No organizations found.</div>
        ) : (
          <div className="m-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {filtered.map(org => <OrgCard key={org.id} org={org} />)}
          </div>
        )}

        {/* Events CTA */}
        <div style={{ background: 'var(--color-ink)', borderRadius: '12px', padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '40px', gap: '24px' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>See what these organizations have coming up</h3>
            <p style={{ fontSize: '13px', color: 'var(--fg-4)' }}>Browse upcoming events from every organization on the Local Business Calendars.</p>
          </div>
          <a href={LBC_URL} target="_blank" rel="noopener noreferrer"
            style={{ background: 'var(--color-accent)', color: '#fff', padding: '11px 24px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, whiteSpace: 'nowrap', textDecoration: 'none' }}>
            View the Calendar →
          </a>
        </div>
      </div>

      {/* Footer ticker */}
      <div style={{ background: 'var(--color-ink)', padding: '10px 32px', display: 'flex', gap: '32px', alignItems: 'center', justifyContent: 'center', marginTop: '40px' }}>
        {[['Vol. 1 · May 2026', ''], ['527', 'Organizations Tracked'], ['4', 'Texas Cities'], ['8', 'Categories']].map(([val, label], i) => (
          <span key={i} style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#475569' }}>
            {label ? <><strong style={{ color: '#94a3b8' }}>{val}</strong> {label}</> : val}
          </span>
        ))}
      </div>
    </main>
  );
}
