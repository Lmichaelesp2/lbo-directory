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
  'Community/Edu':     'ti-school',
  'Technology':        'ti-device-laptop',
  'Real Estate':       'ti-building',
  'Networking':        'ti-users',
  'Chambers':          'ti-building-community',
  'Const/Design/Mfg': 'ti-tools',
  'Co-Working':        'ti-home',
  'Fed/State/Local':   'ti-flag',
  'Healthcare':        'ti-heart-rate-monitor',
  'Professional Svcs': 'ti-briefcase',
  'Financial':         'ti-coin',
  'Financial Services':'ti-coin',
  'Career/HR':         'ti-layout-grid',
  'Hospitality':       'ti-layout-grid',
  'Other':             'ti-layout-grid',
};


export default function OrgCard({ org, lean = false }: { org: Organization; lean?: boolean }) {
  const [showModal, setShowModal] = useState(false);

  const catIcon = CATEGORY_ICONS[org.category || ''] || 'ti-dots-circle-horizontal';

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        style={{
          background: '#fff',
          border: '1px solid var(--color-rule)',
          borderRadius: '10px',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          boxShadow: '0 1px 4px rgba(10,22,40,.06)',
          transition: 'box-shadow 0.15s, border-color 0.15s',
          minWidth: 0,
          width: '100%',
          boxSizing: 'border-box',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(10,22,40,.10)';
          (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-primary)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
          (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-rule)';
        }}
      >
        {/* Ghost icon */}
        <i className={`ti ${catIcon}`} style={{ fontSize: '1.6rem', color: 'var(--color-primary)', opacity: 0.18, flexShrink: 0 }} />

        {/* Name + category */}
        <div style={{ flex: '1 1 auto', minWidth: 0, overflow: 'hidden' }}>
          <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--fg-1)', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '3px' }}>
            {org.name}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden' }}>
            {org.category && (
              <span style={{ fontSize: '9.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {org.category}
              </span>
            )}
            <span style={{ fontSize: '9.5px', color: 'var(--fg-4)', whiteSpace: 'nowrap', flexShrink: 0 }}>· {org.city}</span>
          </div>
        </div>

        {/* View details */}
        <span style={{ fontSize: '10.5px', color: 'var(--color-primary)', fontWeight: 600, flexShrink: 0 }}>View →</span>
      </div>

      {showModal && <OrgDetailModal org={org} onClose={() => setShowModal(false)} />}
    </>
  );
}
