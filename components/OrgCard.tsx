import { Organization } from '@/lib/supabase';

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').trim();
}

function getInitials(name: string): string {
  return name.split(' ').filter(Boolean).slice(0, 3).map(w => w[0]).join('').toUpperCase();
}

export default function OrgCard({ org }: { org: Organization }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        {org.logo_url ? (
          <img src={org.logo_url} alt={org.name} style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'contain', border: '1px solid #e2e8f0', flexShrink: 0 }} />
        ) : (
          <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'var(--color-primary-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', flexShrink: 0, letterSpacing: '0.02em' }}>
            {getInitials(org.name)}
          </div>
        )}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--fg-1)', lineHeight: 1.3, marginBottom: '4px' }}>{org.name}</div>
          {org.public_category && (
            <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-primary)', background: 'var(--color-primary-bg)', padding: '2px 7px', borderRadius: '100px' }}>
              {org.public_category}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      {org.description && (
        <p style={{ fontSize: '12px', color: 'var(--fg-3)', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {stripHtml(org.description)}
        </p>
      )}

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid #f1f5f9', marginTop: 'auto' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {org.home_page && (
            <a href={org.home_page} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: 'var(--color-primary)', fontWeight: 500 }}>
              Visit website →
            </a>
          )}
        </div>
        <span style={{ fontSize: '10px', fontWeight: 600, padding: '3px 8px', borderRadius: '100px', background: org.claimed ? '#d1fae5' : '#f1f5f9', color: org.claimed ? '#065f46' : '#475569' }}>
          {org.claimed ? 'Claimed' : 'Unclaimed'}
        </span>
      </div>
    </div>
  );
}
