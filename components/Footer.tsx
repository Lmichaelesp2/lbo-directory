import Link from 'next/link';

interface FooterProps {
  citySlug?: string;
  cityName?: string;
}

export default function Footer({ citySlug, cityName }: FooterProps) {
  return (
    <footer style={{ background: 'var(--color-ink)', color: 'rgba(255,255,255,.6)', fontFamily: 'var(--font-sans)', fontSize: '0.8rem', lineHeight: 1.7 }}>

      {/* City / state nav strip */}
      {citySlug ? (
        <nav style={{ borderBottom: '1px solid rgba(255,255,255,.08)', padding: '1rem 2rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <Link href="/texas/san-antonio" style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff', background: 'rgba(255,255,255,.08)', padding: '0.4rem 1rem', borderRadius: '6px', textDecoration: 'none' }}>San Antonio</Link>
          <Link href="/texas/houston"     style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff', background: 'rgba(255,255,255,.08)', padding: '0.4rem 1rem', borderRadius: '6px', textDecoration: 'none' }}>Houston</Link>
          <Link href="/texas/dallas"      style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff', background: 'rgba(255,255,255,.08)', padding: '0.4rem 1rem', borderRadius: '6px', textDecoration: 'none' }}>Dallas</Link>
          <Link href="/texas/austin"      style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff', background: 'rgba(255,255,255,.08)', padding: '0.4rem 1rem', borderRadius: '6px', textDecoration: 'none' }}>Austin</Link>
        </nav>
      ) : (
        <nav style={{ borderBottom: '1px solid rgba(255,255,255,.08)', padding: '1rem 2rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/texas" style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff', background: 'rgba(255,255,255,.08)', padding: '0.4rem 1rem', borderRadius: '6px', textDecoration: 'none' }}>Texas Organizations</Link>
          <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,.25)', padding: '0.4rem 1rem' }}>More states coming soon</span>
        </nav>
      )}

      {/* Main footer content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2.5rem 2rem', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '3rem' }}>

        {/* Brand */}
        <div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '0.6rem', fontFamily: 'var(--font-sans)' }}>
            <span style={{ color: 'var(--color-primary)' }}>Local</span> Business Organizations
          </div>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,.5)', lineHeight: 1.7, maxWidth: '340px', marginBottom: '1rem' }}>
            A curated directory of chambers, associations, networking groups, and trade organizations — organized by city and category so you know who's out there and where to plug in.
          </p>
          <a href="https://www.localbusinesscalendars.com" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-primary)', textDecoration: 'none' }}>
            See upcoming events on Local Business Calendars ↗
          </a>
        </div>

        {/* Directory */}
        <div>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,.35)', marginBottom: '0.75rem' }}>Directory</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link href="/texas" style={{ color: 'rgba(255,255,255,.6)', textDecoration: 'none', fontSize: '0.8rem' }}>Texas</Link>
            <Link href="/texas/san-antonio" style={{ color: 'rgba(255,255,255,.6)', textDecoration: 'none', fontSize: '0.8rem' }}>San Antonio</Link>
            <Link href="/texas/houston"     style={{ color: 'rgba(255,255,255,.6)', textDecoration: 'none', fontSize: '0.8rem' }}>Houston</Link>
            <Link href="/texas/dallas"      style={{ color: 'rgba(255,255,255,.6)', textDecoration: 'none', fontSize: '0.8rem' }}>Dallas</Link>
            <Link href="/texas/austin"      style={{ color: 'rgba(255,255,255,.6)', textDecoration: 'none', fontSize: '0.8rem' }}>Austin</Link>
            <Link href="/contact"           style={{ color: 'rgba(255,255,255,.6)', textDecoration: 'none', fontSize: '0.8rem' }}>Request a city</Link>
          </div>
        </div>

        {/* Company */}
        <div>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,.35)', marginBottom: '0.75rem' }}>Company</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link href="/about"   style={{ color: 'rgba(255,255,255,.6)', textDecoration: 'none', fontSize: '0.8rem' }}>About</Link>
            <Link href="/contact" style={{ color: 'rgba(255,255,255,.6)', textDecoration: 'none', fontSize: '0.8rem' }}>Contact</Link>
            <Link href="/claim"   style={{ color: 'rgba(255,255,255,.6)', textDecoration: 'none', fontSize: '0.8rem' }}>Claim Your Listing</Link>
            <Link href="/sponsor" style={{ color: 'rgba(255,255,255,.6)', textDecoration: 'none', fontSize: '0.8rem' }}>Sponsorship</Link>
            <Link href="/privacy" style={{ color: 'rgba(255,255,255,.6)', textDecoration: 'none', fontSize: '0.8rem' }}>Privacy Policy</Link>
            <Link href="/terms"   style={{ color: 'rgba(255,255,255,.6)', textDecoration: 'none', fontSize: '0.8rem' }}>Terms &amp; Conditions</Link>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', padding: '1.25rem 2rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,.3)', margin: 0 }}>
          © 2026 Local Business Organizations · <Link href="/texas/san-antonio" style={{ color: 'rgba(255,255,255,.3)', textDecoration: 'none' }}>San Antonio</Link> · <Link href="/texas/houston" style={{ color: 'rgba(255,255,255,.3)', textDecoration: 'none' }}>Houston</Link> · <Link href="/texas/dallas" style={{ color: 'rgba(255,255,255,.3)', textDecoration: 'none' }}>Dallas</Link> · <Link href="/texas/austin" style={{ color: 'rgba(255,255,255,.3)', textDecoration: 'none' }}>Austin</Link>
        </p>
        <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,.2)', margin: 0, maxWidth: '480px', textAlign: 'right' }}>
          This directory is independently maintained and not affiliated with any listed organization. Verify information directly with each organization.
        </p>
      </div>

    </footer>
  );
}
