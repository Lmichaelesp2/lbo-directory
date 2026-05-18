'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import OrgCard from '@/components/OrgCard';
import { supabase, Organization } from '@/lib/supabase';
import { CITY_SLUG_TO_NAME, PUBLIC_CATEGORIES } from '@/lib/config';

const ICON_COLOR: Record<string, { bg: string; color: string }> = {
  blue:   { bg: '#eef3fe', color: '#1652f0' },
  teal:   { bg: '#f0fdf9', color: '#0f6e56' },
  orange: { bg: '#fff7ed', color: '#c2410c' },
  purple: { bg: '#f5f3ff', color: '#534AB7' },
};

const CATEGORY_SLUGS: Record<string, string> = {
  'Chambers & Networking':    'chambers-networking',
  'Community & Education':    'community-education',
  'Technology':               'technology',
  'Real Estate':              'real-estate',
  'Construction & Industry':  'construction-industry',
  'Healthcare':               'healthcare',
  'Professional Organizations': 'professional-organizations',
  'More Organizations':       'more-organizations',
};

export default function CityPage() {
  const params = useParams();
  const citySlug = params.city as string;
  const cityName = CITY_SLUG_TO_NAME[citySlug as keyof typeof CITY_SLUG_TO_NAME];

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
        <section style={{ background: 'var(--color-ink)', padding: '40px 32px' }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5b82f7', marginBottom: '10px' }}>
              <Link href="/" style={{ color: '#5b82f7', textDecoration: 'none' }}>All Cities</Link> › {cityName}
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px' }}>
              <div>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: '8px' }}>
                  {cityName} Business Organizations
                </h1>
                <p style={{ fontSize: '14px', color: '#94a3b8' }}>
                  {orgs.length} organizations · Browse by category or search below
                </p>
              </div>
              <input
                type="text"
                placeholder={`Search ${cityName} organizations...`}
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', width: '260px', color: '#fff', outline: 'none', fontFamily: 'var(--font-sans)' }}
              />
            </div>
          </div>
        </section>

        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 24px' }}>

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
              {selectedCategory || 'All Organizations'} — {cityName}
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--fg-4)' }}>{filtered.length} organizations</span>
          </div>

          {/* Org grid — lean cards, no description */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '48px', color: 'var(--fg-4)' }}>Loading organizations...</div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px', color: 'var(--fg-4)' }}>No organizations found.</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {filtered.map(org => <OrgCard key={org.id} org={org} lean />)}
            </div>
          )}

          {/* Events CTA */}
          <div style={{ background: 'var(--color-ink)', borderRadius: '12px', padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '40px', gap: '24px' }}>
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
