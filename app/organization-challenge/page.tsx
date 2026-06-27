import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'The Organization Challenge | Local Business Organizations',
  description: 'Find, evaluate, and commit to the 3–4 organizations that will actually build your network. A four-stage challenge built on the Local Business Networking Method.',
  alternates: { canonical: '/organization-challenge' },
};

const STAGES = [
  {
    number: '1',
    pillar: 'People',
    title: 'Define who you want in your network',
    body: 'Before you look at a single organization, get clear on exactly who belongs in your network. Prospects who will buy from you. Referral partners who will send you clients. Connectors who open doors to many. The more specific you are about the person, the easier it is to find the rooms where they already gather — and the organizations that will actually build your business.',
    callout: 'The mistake most people make is joining organizations first and figuring out who they want to meet later. Reverse it.',
    checks: [
      'Write out your ideal prospect — industry, role, company size',
      'Identify your best referral partner types',
      'Name 3–5 connectors already in your network worth deepening',
    ],
  },
  {
    number: '2',
    pillar: 'People',
    title: 'Research — map every organization where your people gather',
    body: 'Build the widest possible map before you commit to anything. Chambers of commerce, industry associations, networking groups, trade organizations, civic groups — find them all. The goal at this stage is not to filter, it\'s to discover. You can\'t evaluate what you don\'t know exists. Cast wide, then narrow.',
    callout: 'The Local Business Organizations directory is built for exactly this step — 588+ verified organizations across Texas organized by city and category.',
    checks: [
      'Browse the directory by city and category',
      'List every org where your target personas are likely to be',
      'Note which ones have subgroups, committees, or industry-specific tracks',
    ],
  },
  {
    number: '3',
    pillar: 'Participation',
    title: 'Evaluate — attend before you commit',
    body: 'Never join an organization without attending as a guest first. One visit tells you more than any website. When you\'re in the room, you\'re not just networking — you\'re evaluating. Four things determine whether this organization is worth your time and membership investment:',
    evalCriteria: [
      {
        label: 'Are your people actually in the room?',
        detail: 'Not just sometimes — consistently. The right organization has a reliable, recurring membership that matches your target network.',
      },
      {
        label: 'Are there subgroups, committees, or industry tracks?',
        detail: 'The best organizations have internal structure — ambassador programs, industry councils, committees, leadership tracks — that let you go deeper than just attending monthly meetings.',
      },
      {
        label: 'Is there a real path to active membership?',
        detail: 'You\'re not looking for a place to pay dues and show up occasionally. You want an organization where you can take on a visible role and become someone people know.',
      },
      {
        label: 'Is the investment worth what you see?',
        detail: 'Time and money are finite. A $500/year membership in the right organization is worth more than five $100 memberships in the wrong ones.',
      },
    ],
    callout: 'Commit narrow. The method recommends 3–4 organizations — not 10. Depth in a few places outperforms a shallow presence everywhere.',
    checks: [
      'Attend at least one event at each org as a guest',
      'Ask members directly: what do you get out of being here?',
      'Identify at least one committee or subgroup you could join',
    ],
  },
  {
    number: '4',
    pillar: 'Relationships',
    title: 'Get Active — build relationships through the organization\'s structure',
    body: 'Joining an organization is not the finish line — it\'s the starting line. Relationship building inside an organization doesn\'t happen through email and social media. It happens through the internal channels that the organization itself provides. The more embedded you become in the structure, the more relationships compound around you automatically.',
    activeChannels: [
      {
        label: 'Committees',
        detail: 'Join a committee and you\'re suddenly working alongside the same people every month toward a shared goal. Nothing builds trust faster than doing something together.',
      },
      {
        label: 'Ambassador & volunteer programs',
        detail: 'These roles put you at the front of the room — greeting new members, welcoming guests, representing the organization. High visibility, high trust, zero sales pitch needed.',
      },
      {
        label: 'Industry subgroups & councils',
        detail: 'Many organizations have subgroups for specific industries or roles. These are smaller, tighter rooms where you can become a recognized name much faster than in the full membership.',
      },
      {
        label: 'Leadership tracks',
        detail: 'Board positions, committee chairs, event leadership. These are the roles that turn you from a member into a pillar — someone others introduce to newcomers and send referrals toward.',
      },
    ],
    callout: 'Stay top of mind by re-sharing what you\'re already doing. Post about the meetings you attend, the committees you serve on, the events you help run. You\'re already there — let your network see it.',
    checks: [
      'Join at least one committee or subgroup in each committed org',
      'Volunteer for an event, orientation, or ambassador role',
      'Post about your involvement — a photo, a recap, a takeaway',
    ],
  },
];

export default function OrganizationChallengePage() {
  return (
    <>
      <Navigation />
      <main>

        {/* Hero */}
        <section style={{ background: 'var(--color-paper)', borderBottom: '1px solid var(--color-rule)', padding: '4rem 2rem 3.5rem' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '0.75rem' }}>
              The Organization Challenge
            </p>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.15, marginBottom: '1.25rem', color: 'var(--fg-1)' }}>
              Find the right 3–4 organizations. Go deep. Build your network from the inside.
            </h1>
            <p style={{ fontSize: '1.125rem', lineHeight: 1.7, color: 'var(--fg-2)', marginBottom: '2rem' }}>
              Most professionals join too many organizations and go deep in none of them. This four-stage challenge walks you through finding, evaluating, and committing to the organizations that will actually build the right network for your business — using the Local Business Networking Method.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#stage-1" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'var(--color-accent)', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: 8, fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none' }}>
                Start the challenge →
              </a>
              <Link href="/texas" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', border: '1px solid var(--color-rule)', color: 'var(--fg-2)', padding: '0.75rem 1.5rem', borderRadius: 8, fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none' }}>
                Browse organizations first
              </Link>
            </div>
          </div>
        </section>

        {/* The goal */}
        <section style={{ background: 'var(--color-paper-2)', borderBottom: '1px solid var(--color-rule)', padding: '2.5rem 2rem' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <p style={{ color: 'var(--fg-2)', fontSize: '1.05rem', lineHeight: 1.75 }}>
              Most professionals join too many organizations and go deep in none of them. This challenge is about doing the opposite — selecting fewer organizations, committing fully, and becoming the kind of member people remember and refer. The relationships that grow your business come from depth, not breadth.
            </p>
          </div>
        </section>

        {/* Stages */}
        {STAGES.map((stage, i) => (
          <section
            key={stage.number}
            id={`stage-${stage.number}`}
            style={{
              background: i % 2 === 0 ? 'var(--color-paper)' : 'var(--color-paper-2)',
              borderBottom: '1px solid var(--color-rule)',
              padding: '4rem 2rem',
              scrollMarginTop: '80px',
            }}
          >
            <div style={{ maxWidth: 720, margin: '0 auto' }}>

              {/* Stage header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'var(--color-ink)', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, flexShrink: 0,
                }}>
                  {stage.number}
                </div>
                <div>
                  <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '0.1rem' }}>
                    Stage {stage.number} · {stage.pillar}
                  </p>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', lineHeight: 1.2, color: 'var(--fg-1)', margin: 0 }}>
                    {stage.title}
                  </h2>
                </div>
              </div>

              <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--fg-2)', marginBottom: '1.5rem' }}>
                {stage.body}
              </p>

              {/* Eval criteria (stage 3) */}
              {stage.evalCriteria && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                  {stage.evalCriteria.map(c => (
                    <div key={c.label} style={{ border: '1px solid var(--color-rule)', borderRadius: 10, padding: '1.125rem 1.25rem', background: '#fff' }}>
                      <p style={{ fontWeight: 600, color: 'var(--fg-1)', marginBottom: '0.35rem' }}>{c.label}</p>
                      <p style={{ color: 'var(--fg-3)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>{c.detail}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Active channels (stage 4) */}
              {stage.activeChannels && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                  {stage.activeChannels.map(c => (
                    <div key={c.label} style={{ border: '1px solid var(--color-rule)', borderRadius: 10, padding: '1.125rem 1.25rem', background: '#fff' }}>
                      <p style={{ fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.35rem', fontSize: '0.92rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{c.label}</p>
                      <p style={{ color: 'var(--fg-2)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>{c.detail}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Callout */}
              <div style={{ background: 'var(--color-primary-bg)', border: '1px solid #c7d7fc', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
                <p style={{ color: 'var(--color-primary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                  {stage.callout}
                </p>
              </div>

              {/* Checklist */}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {stage.checks.map(check => (
                  <li key={check} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', color: 'var(--fg-2)', fontSize: '0.95rem' }}>
                    <span style={{ color: 'var(--color-accent)', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>✓</span>
                    {check}
                  </li>
                ))}
              </ul>

            </div>
          </section>
        ))}

        {/* The method */}
        <section style={{ background: 'var(--color-ink)', padding: '4rem 2rem' }}>
          <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5b82f7', marginBottom: '0.75rem' }}>
              Built on the method
            </p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', color: '#fff', marginBottom: '1rem' }}>
              The Organization Challenge is one part of a bigger system
            </h2>
            <p style={{ color: '#c7d0dd', lineHeight: 1.7, marginBottom: '2rem', fontSize: '1.05rem' }}>
              Finding the right organizations is the People and Participation pillars of the Local Business Networking Method. The full method also covers Content — staying top of mind between meetings — and Relationships — maintaining every connection until they become a customer or refer one. The Organization Challenge gets you into the right rooms. The full method turns those rooms into real business.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/event-networking-method" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'var(--color-accent)', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: 8, fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none' }}>
                See the full method →
              </Link>
            </div>
          </div>
        </section>

        {/* TBN CTA */}
        <section style={{ background: 'var(--color-paper)', borderTop: '1px solid var(--color-rule)', padding: '4rem 2rem' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '0.75rem' }}>
              Texas Business Network
            </p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', marginBottom: '1rem', color: 'var(--fg-1)' }}>
              Want help doing this with expert guidance behind you?
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--fg-2)', marginBottom: '1.75rem' }}>
              The Texas Business Network is an exclusive membership for professionals committed to growing their business through the right relationships in Texas. We do the research. We tell you which organizations to join, which events to attend, and how to get active inside them. An AI assistant checks in with you weekly to keep you on pace. You do the networking.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/texas-business-network" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'var(--color-ink)', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: 8, fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none' }}>
                Learn about the Texas Business Network →
              </Link>
              <Link href="/texas" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', border: '1px solid var(--color-rule)', color: 'var(--fg-2)', padding: '0.75rem 1.5rem', borderRadius: 8, fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none' }}>
                Browse organizations in your city
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
