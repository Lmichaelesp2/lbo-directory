'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import OrgCard from '@/components/OrgCard';
import { supabase, Organization } from '@/lib/supabase';
import { CITY_SLUG_TO_NAME, PUBLIC_CATEGORIES, CITY_CONTENT, CATEGORY_MAP } from '@/lib/config';

const ICON_COLOR: Record<string, { bg: string; color: string }> = {
  blue:   { bg: '#eef3fe', color: '#1652f0' },
  teal:   { bg: '#f0fdf9', color: '#0f6e56' },
  orange: { bg: '#fff7ed', color: '#c2410c' },
  purple: { bg: '#f5f3ff', color: '#534AB7' },
};

const CITY_FAQ: Record<string, { question: string; answer: string }[]> = {
  'San Antonio': [
    { question: 'What kinds of organizations are in the San Antonio directory?', answer: 'San Antonio has a strong chamber network, several active real estate groups, BNI chapters, SCORE mentorship programs, and a growing tech community through groups like Tech Bloc SA. The directory covers all of these — organized by category.' },
    { question: 'How do I find the right organization to join?', answer: 'Use the category filter above to narrow by type, then click into profiles to read descriptions, see membership details, and check how active each group is. Look for organizations tagged "Guest Friendly" if you want to attend before joining.' },
    { question: 'Can I see the events these organizations are hosting?', answer: 'Yes. Subscribe free to the San Antonio weekly newsletter on Local Business Calendars to get every chamber meeting, networking mixer, and business event delivered to your inbox every Monday.' },
    { question: 'How do I get my organization listed or updated?', answer: 'Use the Claim Your Listing button to verify your profile. Once claimed, you can update your description, contact info, logo, and membership details.' },
  ],
  'Houston': [
    { question: 'What kinds of organizations are in the Houston directory?', answer: 'Houston has a deep bench of professional organizations — energy sector groups, diverse chamber networks, real estate associations, and a strong small business ecosystem through SBDC and SCORE chapters. All organized by category in this directory.' },
    { question: 'How do I find the right organization to join?', answer: 'Use the category filter above to narrow by type, then click into profiles to read descriptions and check membership details. Look for organizations tagged "Guest Friendly" if you want to visit before committing.' },
    { question: 'Can I see the events these organizations are hosting?', answer: 'Yes. Subscribe free to the Houston weekly newsletter on Local Business Calendars to get every networking event, chamber meeting, and business gathering delivered to your inbox every Monday.' },
    { question: 'How do I get my organization listed or updated?', answer: 'Click Claim Your Listing on any profile to verify your organization. Once claimed, you control your description, contact info, and membership details.' },
  ],
  'Dallas': [
    { question: 'What kinds of organizations are in the Dallas directory?', answer: 'Dallas has a massive professional network — one of the most active real estate association scenes in Texas, dozens of chamber and civic groups, tech and startup communities, and a robust small business ecosystem. All covered here by category.' },
    { question: 'How do I find the right organization to join?', answer: 'Use the category filter to narrow by type — Real Estate, Technology, Chambers, etc. — then click into profiles to compare descriptions, membership fees, and activity levels.' },
    { question: 'Can I see the events these organizations are hosting?', answer: 'Yes. Subscribe free to the Dallas weekly newsletter on Local Business Calendars to get every upcoming networking event, association meeting, and business mixer delivered to your inbox every Monday.' },
    { question: 'How do I get my organization listed or updated?', answer: 'Use the Claim Your Listing button to verify your profile. Claimed profiles show a verified badge and allow you to update all your org details.' },
  ],
  'Austin': [
    { question: 'What kinds of organizations are in the Austin directory?', answer: 'Austin has a strong tech and startup organization scene — Capital Factory, Tech Bloc, Codeup — alongside active chambers, real estate groups, and a thriving small business community. All organized by category in this directory.' },
    { question: 'How do I find the right organization to join?', answer: 'Use the category filter above to narrow by type. The Technology category is especially strong in Austin. Click into profiles to see descriptions, meeting formats, and membership details before deciding.' },
    { question: 'Can I see the events these organizations are hosting?', answer: 'Yes. Subscribe free to the Austin weekly newsletter on Local Business Calendars to get every tech meetup, chamber event, and networking mixer delivered to your inbox every Monday.' },
    { question: 'How do I get my organization listed or updated?', answer: 'Click Claim Your Listing on any profile to verify your organization. Once claimed, you can update your description, contact info, logo, and membership details.' },
  ],
};

const CITY_SUBSCRIBE_SLUGS: Record<string, string> = {
  'San Antonio': 'san-antonio',
  'Houston': 'houston',
  'Dallas': 'dallas',
  'Austin': 'austin',
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

  const faqItems = CITY_FAQ[cityName] || CITY_FAQ['San Antonio'];
  const subscribeSlug = CITY_SUBSCRIBE_SLUGS[cityName] || citySlug;

  return (
    <>
      <Navigation activeCitySlug={citySlug} />
      <main style={{ flex: 1 }}>

        {/* ── Hero ── */}
        <section className="lbo-hero-section" style={{ background: 'var(--color-paper)', padding: '4rem 2rem 0', borderBottom: '1px solid var(--color-rule)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '3.5rem' }}>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-primary)', marginBottom: '1.25rem' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--color-primary)', display: 'inline-block' }} />
              <Link href="/texas" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Texas Business Directory</Link>
              <span style={{ color: 'var(--fg-4)' }}>·</span>
              {cityName}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'flex-start' }} className="lbo-hero-grid">
              <div>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.25rem, 4.5vw, 3rem)', fontWeight: 600, color: 'var(--fg-1)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '1.25rem' }}>
                  {cityName} Business{' '}
                  <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--color-primary)' }}>Organizations</em>
                </h1>
                {content && (
                  <p style={{ fontSize: '1.05rem', color: 'var(--fg-3)', lineHeight: 1.6, maxWidth: '560px', marginBottom: '2rem' }}>
                    {content.tagline}
                  </p>
                )}
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <a href={`#directory`}
                    style={{ background: 'var(--color-accent)', color: '#fff', padding: '0.85rem 1.75rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none' }}>
                    Browse {cityName} →
                  </a>
                  <a href={`https://www.localbusinesscalendars.com/texas/${subscribeSlug}/subscribe`} target="_blank" rel="noopener noreferrer"
                    style={{ background: '#fff', color: 'var(--color-primary)', padding: '0.85rem 1.75rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', border: '1px solid var(--color-primary)' }}>
                    Get Weekly Events ↗
                  </a>
                </div>
              </div>

              {/* Search input */}
              <div style={{ flexShrink: 0 }}>
                <div style={{ position: 'relative' }}>
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
          </div>
        </section>

        {/* ── Stats strip ── */}
        <section style={{ background: 'var(--color-dark-section)', padding: '0.6rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {[
              [String(orgs.length || '—'), 'organizations listed'],
              ['8', 'categories covered'],
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

        {/* ── Directory ── */}
        <div id="directory" style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 24px' }}>

          {/* City intro */}
          {content && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '40px', alignItems: 'flex-start', marginBottom: '36px', paddingBottom: '32px', borderBottom: '1px solid var(--color-rule)' }}>
              <div>
                <p style={{ fontSize: '14px', color: 'var(--fg-2)', lineHeight: 1.8 }}>
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
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
            {PUBLIC_CATEGORIES.map(cat => {
              const colors = ICON_COLOR[cat.color];
              const isActive = selectedCategory === cat.label;
              return (
                <button key={cat.label}
                  onClick={() => setSelectedCategory(isActive ? null : cat.label)}
                  style={{ background: isActive ? 'var(--color-primary-bg)' : '#fff', border: isActive ? '1.5px solid var(--color-primary)' : '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer', textAlign: 'center', width: '120px', flexShrink: 0 }}>
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

        </div>

        {/* ── Newsletter signup ── */}
        <section style={{ background: 'var(--color-dark-section)', padding: '4rem 2rem' }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748b', marginBottom: '0.5rem' }}>Free Weekly Newsletter</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 600, color: '#fff', lineHeight: 1.3, marginBottom: '0.75rem' }}>
              See what {cityName} organizations are hosting{' '}
              <em style={{ fontStyle: 'italic', fontWeight: 400 }}>every week.</em>
            </h2>
            <p style={{ fontSize: '0.925rem', color: '#94a3b8', lineHeight: 1.7, maxWidth: '600px', marginBottom: '2rem' }}>
              The organizations in this directory host dozens of networking mixers, chamber meetings, and professional gatherings every week in {cityName}. Subscribe free to the Local Business Calendars weekly newsletter and get every event delivered to your inbox every Monday morning.
            </p>
            <a
              href={`https://www.localbusinesscalendars.com/texas/${subscribeSlug}/subscribe`}
              target="_blank"
              rel="noopener noreferrer"
              className="lbo-newsletter-card"
              style={{ maxWidth: '500px' }}
            >
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--fg-1)', marginBottom: '3px' }}>{cityName} Weekly Events Newsletter</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--fg-3)', lineHeight: 1.4 }}>Networking events, chamber mixers & business gatherings — every Monday</div>
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', whiteSpace: 'nowrap', marginLeft: '1rem', flexShrink: 0 }}>
                Subscribe free →
              </span>
            </a>
            <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '1.25rem' }}>
              Free forever · No credit card · Unsubscribe anytime · Powered by{' '}
              <a href="https://www.localbusinesscalendars.com" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: 600 }}>
                Local Business Calendars ↗
              </a>
            </p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ background: 'var(--color-paper-2)', padding: '4rem 2rem' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>FAQ</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '2rem' }}>
              About the {cityName} Directory
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {faqItems.map((item, i) => (
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

        {/* ── Claim CTA ── */}
        <section style={{ background: '#fff', padding: '4rem 2rem' }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div className="lbo-claim-row" style={{ background: 'var(--color-paper-2)', border: '1px solid var(--color-rule)', borderRadius: '12px', padding: '2.25rem 2.5rem' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-accent)', marginBottom: '0.5rem' }}>For organization leaders</div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--fg-1)', marginBottom: '0.6rem' }}>
                  Is your {cityName} organization listed here?
                </h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--fg-3)', lineHeight: 1.7 }}>
                  Claim your listing to take control of how you appear to {cityName} business professionals. Add your logo, update your description, and verify your contact info. Free to request — reviewed within 1–2 days.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', flexShrink: 0 }}>
                <Link href="/claim" style={{ background: 'var(--color-accent)', color: '#fff', padding: '0.85rem 1.75rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                  Claim Your Listing →
                </Link>
                <span style={{ fontSize: '0.7rem', color: 'var(--fg-4)' }}>Free to request · 1–2 day review</span>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
