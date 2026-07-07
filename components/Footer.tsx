import Link from 'next/link';

interface FooterProps {
  citySlug?: string;
  cityName?: string;
  stateName?: string;
}

export default function Footer({ citySlug, cityName, stateName }: FooterProps) {
  const brandDesc = cityName
    ? `A curated directory of chambers, associations, networking groups, and trade organizations in ${cityName} — organized by category so you know who's active in your market.`
    : stateName
      ? `A curated directory of chambers, associations, networking groups, and trade organizations across ${stateName} — organized by city and category.`
      : 'A curated directory of chambers, associations, networking groups, and trade organizations — organized by city and category so you know who\'s out there and where to plug in.';

  return (
    <footer className="lbo-footer">

      {/* City / state nav strip */}
      {citySlug ? (
        <nav className="lbo-footer-nav">
          <Link href="/texas/san-antonio" className="lbo-footer-nav-link">San Antonio</Link>
          <Link href="/texas/houston"     className="lbo-footer-nav-link">Houston</Link>
          <Link href="/texas/dallas"      className="lbo-footer-nav-link">Dallas</Link>
          <Link href="/texas/austin"      className="lbo-footer-nav-link">Austin</Link>
        </nav>
      ) : (
        <nav className="lbo-footer-nav">
          <Link href="/texas" className="lbo-footer-nav-link">Texas Organizations</Link>
          <span className="lbo-footer-nav-soon">More states coming soon</span>
        </nav>
      )}

      {/* Main footer grid */}
      <div className="lbo-footer-body">

        {/* Brand col */}
        <div className="lbo-footer-brand">
          <div className="lbo-footer-wordmark">
            <span style={{ color: 'var(--color-primary)' }}>{cityName || stateName || 'Local'}</span>{' '}Business Organizations
          </div>
          <p className="lbo-footer-desc">{brandDesc}</p>
          <a href="https://www.localbusinesscalendars.com" target="_blank" rel="noopener noreferrer" className="lbo-footer-cal-link">
            See upcoming events on Local Business Calendars ↗
          </a>
        </div>

        {/* Directory col */}
        <div className="lbo-footer-col">
          <div className="lbo-footer-col-heading">Directory</div>
          <Link href="/texas"             className="lbo-footer-link">Texas</Link>
          <Link href="/texas/san-antonio" className="lbo-footer-link">San Antonio</Link>
          <Link href="/texas/houston"     className="lbo-footer-link">Houston</Link>
          <Link href="/texas/dallas"      className="lbo-footer-link">Dallas</Link>
          <Link href="/texas/austin"      className="lbo-footer-link">Austin</Link>
          <Link href="/contact"           className="lbo-footer-link">Request a city</Link>
        </div>

        {/* Company col */}
        <div className="lbo-footer-col">
          <div className="lbo-footer-col-heading">Company</div>
          <Link href="/about"   className="lbo-footer-link">About</Link>
          <Link href="/contact" className="lbo-footer-link">Contact</Link>
          <Link href="/claim"   className="lbo-footer-link">Claim Your Listing</Link>
          <Link href="/sponsor" className="lbo-footer-link">Partnership</Link>
          <Link href="/privacy" className="lbo-footer-link">Privacy Policy</Link>
          <Link href="/terms"   className="lbo-footer-link">Terms &amp; Conditions</Link>
          <a href="https://www.localbusinesscalendars.com/account" target="_blank" rel="noopener noreferrer" className="lbo-footer-link">Manage My Subscriptions ↗</a>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="lbo-footer-bottom">
        <p className="lbo-footer-copy">
          © 2026 Local Business Organizations ·{' '}
          <Link href="/texas/san-antonio" className="lbo-footer-copy-link">San Antonio</Link> ·{' '}
          <Link href="/texas/houston"     className="lbo-footer-copy-link">Houston</Link> ·{' '}
          <Link href="/texas/dallas"      className="lbo-footer-copy-link">Dallas</Link> ·{' '}
          <Link href="/texas/austin"      className="lbo-footer-copy-link">Austin</Link>
        </p>
        <p className="lbo-footer-disclaimer">
          Independently maintained. Not affiliated with any listed organization. Verify information directly with each organization.
        </p>
      </div>

    </footer>
  );
}
