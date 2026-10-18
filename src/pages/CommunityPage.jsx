import { ArrowRight, Info, MessageSquarePlus, ShieldCheck, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHeader, Section, SectionHeading } from '../components/Layout'
import { Button } from '../components/Button'
import { Disclaimer } from '../components/Disclaimer'
import { Avatar, FeatureList, RevealList } from '../components/Primitives'
import { QuoteMark } from '../components/Luxury'
import { Reveal } from '../components/Reveal'
import {
  COMMUNITY_STATS,
  EXPECTATIONS,
  GUIDELINES,
  JOIN_STEPS,
  TESTIMONIALS,
} from '../data/community'
import { PILLARS } from '../data/site'

/** Icon lookup keyed by the `icon` field on each expectation. */
const EXPECTATION_ICONS = {
  'shield-check': ShieldCheck,
  'message-square-plus': MessageSquarePlus,
  users: Users,
  info: Info,
}

export function CommunityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Community"
        title="A community with a standard attached."
        body="Real members, honest stories, and one set of rules held in common. This is the centre of Market Stewards, not a support channel beside it."
        meta={
          <>
            <span>{COMMUNITY_STATS[0].value} members</span>
            <span aria-hidden="true">·</span>
            <span>Moderated by the community team</span>
          </>
        }
        actions={
          <Button to="/contact" variant="primary" icon={Users} iconPosition="right">
            Join the Community
          </Button>
        }
      />

      {/* How the community works */}
      <Section tight tone="tint" labelledBy="how-title">
        <SectionHeading
          eyebrow="How it works"
          title="People here read each other's work."
          body="The mechanism is simple and it is the whole point: somebody brings a trade, a plan, or a question, and somebody else reads it properly and responds."
          headingId="how-title"
        />
        <ul className="grid grid--3">
          {PILLARS.map((pillar, index) => (
            <Reveal as="li" key={pillar.key} className="pillar" delay={index * 0.07}>
              <span className="pillar__index display-face">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="pillar__title">{pillar.title}</h3>
              <p className="pillar__body">{pillar.body}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Real member testimonials */}
      <Section labelledBy="voices-title">
        <SectionHeading
          eyebrow="Member stories"
          title="In their words."
          body="Five members on where they started, what changed, and what they would tell someone thinking about joining."
          headingId="voices-title"
        />
        <ul className="grid grid--3 voices">
          {TESTIMONIALS.map((member, index) => (
            <Reveal as="li" key={member.id} className="voice" delay={Math.min(index * 0.06, 0.3)}>
              <QuoteMark className="voice__mark" />
              <blockquote className="voice__quote">
                <p>{member.quote}</p>
                <footer className="voice__by">
                  <Avatar
                    name={member.name}
                    initials={member.initials}
                    tone={member.tone}
                    size="sm"
                  />
                  <span className="voice__id">
                    <span className="small strong">{member.name}</span>
                    <span className="xs subtle">{member.role}</span>
                  </span>
                </footer>
              </blockquote>
            </Reveal>
          ))}

          {/* Sixth cell closes the 3-column grid with a call to join. */}
          <Reveal as="li" className="voice voice--cta" delay={0.32}>
            <div className="stack" style={{ gap: 'var(--sp-3)' }}>
              <h3 className="voice__cta-title">Your story starts here.</h3>
              <p className="small muted">
                Introduce yourself in the feed and someone will follow up. No sign-up form, no
                payment screen.
              </p>
            </div>
            <Button to="/contact" variant="primary" icon={ArrowRight} iconPosition="right">
              Join the community
            </Button>
          </Reveal>
        </ul>
      </Section>

      {/* Community guidelines + size */}
      <Section labelledBy="guidelines-title">
        <SectionHeading
          eyebrow="Community guidelines"
          title="The standards we hold to."
          body="Every member agrees to these before posting. They are enforced, not aspirational — they are what keeps the feed worth reading."
          headingId="guidelines-title"
        />
        <div className="with-rail">
          <div className="panel" id="guidelines">
            <div className="panel__body">
              <ol className="guidelines">
                {GUIDELINES.map((rule) => (
                  <li key={rule.title} className="guideline">
                    <span>
                      <strong className="guideline__title">{rule.title}</strong>
                      {rule.body}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="panel__foot">
              These rules are enforced. Repeated promotion of guaranteed returns, paid signals, or
              financial manipulation results in removal from the community.
            </div>
          </div>

          <aside className="rail rail--sticky" aria-label="Community size">
            <div className="panel">
              <div className="panel__head">
                <h2 className="panel__title">
                  <Users
                    size={16}
                    aria-hidden="true"
                    style={{ display: 'inline', marginRight: 8, color: 'var(--c-primary)' }}
                  />
                  Community size
                </h2>
              </div>
              <div className="panel__body">
                <ul className="stack" style={{ gap: 'var(--sp-4)' }}>
                  {COMMUNITY_STATS.map((stat) => (
                    <li key={stat.label} className="stack" style={{ gap: 0 }}>
                      <span className="strong num" style={{ fontSize: 'var(--fs-lg)' }}>
                        {stat.value}
                      </span>
                      <span className="xs muted">{stat.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* How to join */}
      <Section tone="tint" labelledBy="join-title">
        <SectionHeading
          eyebrow="Joining"
          title="There is no sign-up form. You start by saying hello."
          body="Membership is confirmed by conversation, not by a payment screen. Send a short introduction and someone will follow up about circles and sessions."
          headingId="join-title"
          aside={
            <Button to="/contact" variant="primary" icon={ArrowRight} iconPosition="right">
              Introduce yourself
            </Button>
          }
        />

        <RevealList
          as="ol"
          className="path"
          items={JOIN_STEPS}
          render={(step) => (
            <li key={step.id} className="path__step">
              <span className="path__marker display-face">{step.step}</span>
              <div className="stack" style={{ gap: 'var(--sp-2)' }}>
                <h3 className="path__title">{step.title}</h3>
                <p className="small muted">{step.body}</p>
                <p className="xs subtle">{step.detail}</p>
              </div>
            </li>
          )}
        />
      </Section>

      {/* What we ask of you */}
      <Section labelledBy="expect-title">
        <div className="split">
          <div className="stack stack--lg">
            <SectionHeading
              eyebrow="What we ask of you"
              title="Five things, and they are not negotiable."
              body="The community is only as honest as the people in it. These are the standards members agree to before they post anything."
              headingId="expect-title"
              stack
            />
            <Reveal delay={0.14}>
              <Button to="/about" variant="secondary" icon={ArrowRight} iconPosition="right">
                Read our values
              </Button>
            </Reveal>
          </div>

          <Reveal className="feature-panel" delay={0.1}>
            <FeatureList
              items={EXPECTATIONS.map((item) => ({ ...item, icon: EXPECTATION_ICONS[item.icon] }))}
            />
          </Reveal>
        </div>
      </Section>

      <Section tight tone="sunken">
        <Disclaimer />
        <div className="cluster" style={{ marginTop: 'var(--sp-6)' }}>
          <Link to="/insights" className="link">
            Look at the market data
          </Link>
          <Link to="/about" className="link">
            Read what we stand for
          </Link>
        </div>
      </Section>
    </>
  )
}
