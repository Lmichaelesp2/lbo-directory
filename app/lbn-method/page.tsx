import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'How It Works — The LBN Method | Local Business Organizations',
  description: 'The Local Business Networking Method — four steps that turn the organizations you join into real business relationships. People, Content, Participation, Relationships.',
  alternates: { canonical: '/lbn-method' },
};

const PILLARS = [
  {
    number: '1',
    name: 'People',
    tagline: 'Know who you want in your network before you look at a single organization.',
    body: 'The biggest mistake professionals make when joining organizations is joining the most visible ones instead of the most valuable ones. Before you browse a directory listing, write down exactly who belongs in your network — your ideal prospect, your best referral partner types, the connectors who open doors to many people. That profile is your filter. The right organization for you is the one your people already belong to. Without that clarity, you will join organizations that feel productive but do not build the right relationships.',
    insight: 'The more specific your target, the easier it is to evaluate any organization. Does this room have my people in it? That is the only question that matters at this stage.',
    actions: [
      'Write out your ideal prospect — industry, role, company size',
      'Identify your best referral partner types',
      'Use the directory to find organizations where these people are likely to be members',
    ],
  },
  {
    number: '2',
    name: 'Content',
    tagline: 'Turn your organizational involvement into content that keeps you visible.',
    body: 'The organizations you belong to give you a continuous stream of content — meetings you attend, committees you serve on, events you help run, speakers you interact with. You do not need to produce anything from scratch. Post about what you are already doing inside these organizations. A photo from a chamber committee meeting. A recap of an industry council session. A takeaway from an event your organization hosted. The people in your network who are not members will see who is active. The people who are members will share it and associate you with showing up.',
    insight: 'Your organizational involvement is already happening. Documenting it is the only step most people skip — and it\'s the one that keeps you top of mind between meetings.',
    actions: [
      'Post once per meeting or event — a photo, a recap, or one takeaway',
      'Tag the organizations and people you interact with',
      'Share upcoming events your organizations are hosting before they happen',
    ],
  },
  {
    number: '3',
    name: 'Participation',
    tagline: 'Go deep in a few organizations. Keep an eye on the wider event landscape.',
    body: 'Participation means two things. The first is depth — identifying a small number of organizations to commit to fully, attending their events consistently, joining a committee, taking on a visible role. The second is breadth — keeping an eye on the wider business event calendar for rooms worth entering that exist outside your committed organizations. Commit narrow, scan wide. The goal is not to attend as many events as possible. It is to become a known, reliable presence in the rooms that matter, while never becoming blind to new ones.',
    insight: 'Depth in a few organizations outperforms shallow membership in many. The relationships that turn into business form through repeated contact with the same people over time.',
    actions: [
      'Commit to a small number of organizations and attend their events consistently',
      'Join at least one committee or subgroup in each organization you join',
      'Attend outside events occasionally to stay aware of rooms you have not yet explored',
    ],
  },
  {
    number: '4',
    name: 'Relationships',
    tagline: 'Build the system that keeps every connection warm over time.',
    body: 'Organizations give you the room. What you do after each meeting and event determines whether the relationships compound. Follow up within 48 hours of meeting someone — reference something specific from your conversation. Then maintain contact over time across email, LinkedIn, and the next time you are in the same room. A small percentage of your network is ready to buy or refer at any given moment. Your follow-up system is what makes sure you are the first person they think of when that moment arrives. The organizations you are active in provide the recurring touchpoints — your job is to make sure the follow-up happens consistently between them.',
    insight: 'Organizational involvement gives you repeated access to the same people. The follow-up is what turns repeated contact into a relationship that produces business.',
    actions: [
      'Follow up within 48 hours of meeting someone at an organizational event',
      'Build a simple system — email, LinkedIn, or a spreadsheet — to stay warm with key connections',
      'Let your organizational involvement be visible — attendance and follow-up together build the relationship',
    ],
  },
];

export default function LBNMethodPage() {
  return (
    <>
      <Navigation />
      <main>

        {/* Hero */}
        <section style={{ background: 'var(--color-paper)', borderBottom: '1px solid var(--color-rule)', padding: '4rem 2rem 3.5rem' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '0.75rem' }}>
              The LBN Method
            </p>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.15, marginBottom: '1.25rem', color: 'var(--fg-1)' }}>
              How the Local Business Networking Method works.
            </h1>
            <p style={{ fontSize: '1.125rem', lineHeight: 1.7, color: 'var(--fg-2)', marginBottom: '2rem' }}>
              Four steps — People, Content, Participation, Relationships — that turn the organizations you join into real business relationships. Not a checklist you finish. A loop that keeps turning.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#pillar-1" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'var(--color-accent)', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: 8, fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none' }}>
                See the method →
              </a>
              <Link href="/organization-challenge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', border: '1px solid var(--color-rule)', color: 'var(--fg-2)', padding: '0.75rem 1.5rem', borderRadius: 8, fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none' }}>
                Take the Organization Challenge
              </Link>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section style={{ background: 'var(--color-paper-2)', borderBottom: '1px solid var(--color-rule)', padding: '2.5rem 2rem' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <p style={{ color: 'var(--fg-2)', fontSize: '1.05rem', lineHeight: 1.75, margin: 0 }}>
              The Local Business Networking Method is built around the organizations you join and the events you attend inside them. Four steps make that process repeatable — so the time and money you invest in organizational membership produces real business relationships instead of just a list of dues paid.
            </p>
          </div>
        </section>

        {/* Loop graphic */}
        <section style={{ background: 'var(--color-ink)', padding: '2.5rem 2rem' }}>
          <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', color: '#fff', letterSpacing: '0.02em', margin: 0 }}>
              People &nbsp;→&nbsp; Content &nbsp;→&nbsp; Participation &nbsp;→&nbsp; Relationships
            </p>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.75rem', letterSpacing: '0.04em' }}>
              ↺ &nbsp; then back to People — the loop feeds itself
            </p>
          </div>
        </section>

        {/* Pillars */}
        {PILLARS.map((pillar, i) => (
          <section
            key={pillar.number}
            id={`pillar-${pillar.number}`}
            style={{
              background: i % 2 === 0 ? 'var(--color-paper)' : 'var(--color-paper-2)',
              borderBottom: '1px solid var(--color-rule)',
              padding: '4rem 2rem',
              scrollMarginTop: '80px',
            }}
          >
            <div style={{ maxWidth: 720, margin: '0 auto' }}>

              {/* Pillar header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{
                  minWidth: 56, height: 56, borderRadius: '50%',
                  background: 'var(--color-ink)', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-serif)', fontSize: '1.375rem', fontWeight: 700, flexShrink: 0,
                }}>
                  {pillar.number}
                </div>
                <div>
                  <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '0.2rem' }}>
                    Step {pillar.number} of 4
                  </p>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.375rem, 3vw, 1.875rem)', lineHeight: 1.2, color: 'var(--fg-1)', margin: 0 }}>
                    {pillar.name}
                  </h2>
                </div>
              </div>

              <p style={{ fontSize: '1.05rem', fontStyle: 'italic', color: 'var(--color-accent)', marginBottom: '1.25rem', lineHeight: 1.5, fontFamily: 'var(--font-serif)' }}>
                "{pillar.tagline}"
              </p>

              {/* Video placeholder */}
              <div style={{ background: 'var(--color-ink)', borderRadius: 12, padding: '2rem', marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <div style={{ width: 0, height: 0, borderTop: '9px solid transparent', borderBottom: '9px solid transparent', borderLeft: '16px solid #fff', marginLeft: '3px' }} />
                </div>
                <div>
                  <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem', margin: 0, marginBottom: '0.2rem' }}>
                    {pillar.name} — How it works
                  </p>
                  <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: 0 }}>Video · ~90 seconds</p>
                </div>
              </div>

              <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--fg-2)', marginBottom: '1.5rem' }}>
                {pillar.body}
              </p>

              {/* Insight callout */}
              <div style={{ background: 'var(--color-primary-bg)', border: '1px solid #c7d7fc', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
                <p style={{ color: 'var(--color-primary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                  {pillar.insight}
                </p>
              </div>

              {/* Action steps */}
              <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-4)', marginBottom: '0.6rem' }}>
                Action steps
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {pillar.actions.map(action => (
                  <li key={action} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', color: 'var(--fg-2)', fontSize: '0.95rem' }}>
                    <span style={{ color: 'var(--color-accent)', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>→</span>
                    {action}
                  </li>
                ))}
              </ul>

            </div>
          </section>
        ))}

        {/* How it fits together */}
        <section style={{ background: 'var(--color-ink)', padding: '4rem 2rem' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5b82f7', marginBottom: '0.75rem' }}>
              How it fits together
            </p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', color: '#fff', marginBottom: '1.25rem' }}>
              These four steps are a loop, not a checklist.
            </h2>
            <p style={{ color: '#c7d0dd', lineHeight: 1.75, fontSize: '1.05rem', marginBottom: '1rem' }}>
              <strong style={{ color: '#fff' }}>People</strong> tells you which organizations to evaluate. <strong style={{ color: '#fff' }}>Content</strong> keeps you visible between meetings. <strong style={{ color: '#fff' }}>Participation</strong> is where the relationships form — showing up to your organization's events consistently, getting active in the structure. <strong style={{ color: '#fff' }}>Relationships</strong> is the system that keeps every connection warm until they buy or send someone who does.
            </p>
            <p style={{ color: '#c7d0dd', lineHeight: 1.75, fontSize: '1.05rem' }}>
              Then the loop feeds itself. The relationships you maintain reveal new organizations worth exploring. The organizations you join put you in rooms with people who become part of your network. The content you produce about your involvement pulls more of the right people toward you.
            </p>
          </div>
        </section>

        {/* CTA — Challenge */}
        <section style={{ background: 'var(--color-paper)', borderTop: '1px solid var(--color-rule)', padding: '4rem 2rem' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '0.75rem' }}>
              Put it into practice
            </p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', marginBottom: '1rem', color: 'var(--fg-1)' }}>
              Ready to run the method? Take the Organization Challenge.
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--fg-2)', marginBottom: '1.75rem' }}>
              The Organization Challenge walks you through the method in four stages — Define, Research, Evaluate, Get Active — with specific actions at each step. It is designed to take you from a blank list to deep, active membership in the organizations that will actually build your business.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/organization-challenge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'var(--color-accent)', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: 8, fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none' }}>
                Start the Organization Challenge →
              </Link>
              <Link href="/texas" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', border: '1px solid var(--color-rule)', color: 'var(--fg-2)', padding: '0.75rem 1.5rem', borderRadius: 8, fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none' }}>
                Browse organizations in your city
              </Link>
            </div>
          </div>
        </section>

        {/* TBN CTA */}
        <section style={{ background: 'var(--color-paper-2)', borderTop: '1px solid var(--color-rule)', padding: '4rem 2rem' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '0.75rem' }}>
              Texas Business Network
            </p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', marginBottom: '1rem', color: 'var(--fg-1)' }}>
              Want someone to run the method with you?
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--fg-2)', marginBottom: '1.75rem' }}>
              The Texas Business Network is an exclusive membership for professionals committed to growing their business through the right relationships in Texas. We do the research — telling you which organizations to join, which events to attend, and how to get active inside them. An AI assistant checks in weekly to keep you on pace.
            </p>
            <Link href="/texas-business-network" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'var(--color-ink)', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: 8, fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none' }}>
              Learn about the Texas Business Network →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
