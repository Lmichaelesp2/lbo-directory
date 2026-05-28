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

export default function OrgCard({ org, lean = false }: { org: Organization; lean?: boolean }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: lean ? '14px' : '16px', display: 'flex', flexDirection: 'column', gap: '8px', cursor: 'pointer', transition: 'border-color 0.15s, box-shadow 0.15s' }}
        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-primary)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(10,22,40,.08)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#e2e8f0'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
      >
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '7px', background: 'var(--color-primary-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: 'var(--color-primary)', flexShrink: 0, letterSpacing: '0.02em' }}>
            {getInitials(org.name)}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: lean ? '13px' : '14px', fontWeight: 600, color: 'var(--fg-1)', lineHeight: 1.3, marginBottom: '3px', whiteSpace: lean ? 'nowrap' : 'normal', overflow: lean ? 'hidden' : 'visible', textOverflow: lean ? 'ellipsis' : 'clip' }}>
              {org.name}
            </div>
            {org.category && (
              <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-primary)', background: 'var(--color-primary-bg)', padding: '2px 6px', borderRadius: '100px' }}>
                {org.category}
              </span>
            )}
          </div>
        </div>

        {/* Description — only in full mode */}
        {!lean && org.description && (
          <p style={{ fontSize: '12px', color: 'var(--fg-3)', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {stripHtml(org.description)}
          </p>
        )}

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #f1f5f9', marginTop: 'auto' }}>
          <span style={{ fontSize: '12px', color: 'var(--color-primary)', fontWeight: 500 }}>View details →</span>
          <span style={{ fontSize: '10px', fontWeight: 600, padding: '2px 7px', borderRadius: '100px', background: 'var(--color-paper)', color: 'var(--fg-4)', border: '1px solid var(--color-rule)' }}>
            {org.city}
          </span>
        </div>
      </div>

      {showModal && <OrgDetailModal org={org} onClose={() => setShowModal(false)} />}
    </>
  );
}
