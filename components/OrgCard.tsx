'use client';
import { useState } from 'react';
import { Organization } from '@/lib/supabase';
import OrgDetailModal from './OrgDetailModal';

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').trim();
}

function getInitials(name: string): string {
  return name.split(' ').filter(Boolean).slice(0, 3).map(w => w[0]).join('').toUpperCase();
}

const CATEGORY_ICONS: Record<string, string> = {
  'Chamber & Networking': 'ti-building-community',
  'Technology':           'ti-cpu',
  'Real Estate':          'ti-building',
  'Small Business':       'ti-briefcase',
  'Other':                'ti-dots-circle-horizontal',
};

const CATEGORY_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  'Chamber & Networking': { bg: '#eef3fe', color: '#1652f0', border: '#c7d9fc' },
  'Technology':           { bg: '#ede9fe', color: '#6d28d9', border: '#c4b5fd' },
  'Real Estate':          { bg: '#ecfdf5', color: '#065f46', border: '#6ee7b7' },
  'Small Business':       { bg: '#fff7ed', color: '#c2410c', border: '#fed7aa' },
  'Other':                { bg: '#f0f9ff', color: '#0369a1', border: '#bae6fd' },
};

export default function OrgCard({ org, lean = false }: { org: Organization; lean?: boolean }) {
  const [showModal, setShowModal] = useState(false);

  const catColors = CATEGORY_COLORS[org.category || ''] || CATEGORY_COLORS['Other'];
  const catIcon = CATEGORY_ICONS[org.category || ''] || 'ti-dots-circle-horizontal';
  const description = org.description ? stripHtml(org.description) : null;

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        style={{
          background: '#fff',
          border: '1px solid var(--color-rule)',
          borderLeft: `3px solid ${catColors.color}`,
          borderRadius: '10px',
          padding: '14px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          cursor: 'pointer',
          transition: 'box-shadow 0.15s, border-color 0.15s',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(10,22,40,.10)';
          (e.currentTarget as HTMLDivElement).style.borderColor = catColors.color;
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
          (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-rule)';
          (e.currentTarget as HTMLDivElement).style.borderLeftColor = catColors.color;
        }}
      >
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          {/* Icon avatar */}
          <div style={{
            width: '36px', height: '36px', borderRadius: '8px', flexShrink: 0,
            background: catColors.bg, border: `1px solid ${catColors.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <i className={`ti ${catIcon}`} style={{ fontSize: '16px', color: catColors.color }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-1)', lineHeight: 1.3, marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {org.name}
            </div>
            {org.category && (
              <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: catColors.color, background: catColors.bg, padding: '2px 7px', borderRadius: '100px' }}>
                {org.category}
              </span>
            )}
          </div>
        </div>

        {/* Description — always shown, hard truncated at 2 lines */}
        {description ? (
          <p style={{
            fontSize: '12px', color: 'var(--fg-3)', lineHeight: 1.55, margin: 0,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {description}
          </p>
        ) : (
          <p style={{ fontSize: '12px', color: 'var(--fg-4)', lineHeight: 1.55, margin: 0, fontStyle: 'italic' }}>
            Login to view full profile →
          </p>
        )}

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--color-rule)', marginTop: 'auto' }}>
          <span style={{ fontSize: '12px', color: catColors.color, fontWeight: 600 }}>View details →</span>
          <span style={{ fontSize: '10px', fontWeight: 500, padding: '2px 7px', borderRadius: '100px', background: 'var(--color-paper-2)', color: 'var(--fg-4)', border: '1px solid var(--color-rule)' }}>
            {org.city}
          </span>
        </div>
      </div>

      {showModal && <OrgDetailModal org={org} onClose={() => setShowModal(false)} />}
    </>
  );
}
