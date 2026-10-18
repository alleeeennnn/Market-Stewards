import { useState } from 'react'
import { Compass, HandCoins, ShieldCheck, Target } from 'lucide-react'
import { Crumbs, PageHeader, Section, SectionHeading } from '../components/Layout'
import { Button } from '../components/Button'
import { Disclaimer } from '../components/Disclaimer'
import { Reveal } from '../components/Reveal'
import { FOUNDER_CREDENTIALS, MILESTONES, PRINCIPLES, STORY, TEAM, VALUES } from '../data/about'
import { BRAND } from '../data/site'

const VALUE_ICONS = {
  'shield-check': ShieldCheck,
  'hand-coins': HandCoins,
  compass: Compass,
  target: Target,
}

/**
 * Founder spotlight. Portrait loads from /founder(1).jpg in public/ —
 * a clean photo of just the person. Falls back to initials if missing.
 */
function FounderCard({ member }) {
  const [photoOk, setPhotoOk] = useState(true)

  return (
    <Reveal className="founder">
      <figure className="founder__frame">
        {photoOk && member.photo ? (
          <img
            src={member.photo}
            alt={`Portrait of ${member.name}`}
            loading="lazy"
            onError={() => setPhotoOk(false)}
            className="founder__photo"
          />
        ) : (
          <span className="founder__fallback" aria-hidden="true">
            {member.initials}
          </span>
        )}
        <span className="founder__ring" aria-hidden="true" />
        <span className="founder__tick founder__tick--tl" aria-hidden="true" />
        <span className="founder__tick founder__tick--tr" aria-hidden="true" />
        <span className="founder__tick founder__tick--bl" aria-hidden="true" />
        <span className="founder__tick founder__tick--br" aria-hidden="true" />
        <figcaption className="founder__plate">
          <span className="founder__name">{member.name}</span>
          <span className="founder__title">{member.role}</span>
        </figcaption>
      </figure>
      <div className="stack founder__copy" style={{ gap: 'var(--sp-4)' }}>
        <div className="stack" style={{ gap: 'var(--sp-2)' }}>
          <p className="eyebrow">Why he teaches this way</p>
          <p className="card__body" style={{ fontSize: 'var(--fs-md)' }}>
            {member.bio}
          </p>
        </div>
        <ul className="card__list">
          {FOUNDER_CREDENTIALS.map((item) => (
            <li key={item} className="card__list-item">
              <span
                style={{
                  width: '0.4rem',
                  height: '0.4rem',
                  borderRadius: '50%',
                  background: 'var(--ms-green-300)',
                  marginTop: '0.55rem',
                }}
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}

export function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A standard worth stewarding."
        body={BRAND.summary}
        meta={
          <>
            <span>Founded in the Philippines</span>
            <span aria-hidden="true">·</span>
            <span>411 steward members</span>
            <span aria-hidden="true">·</span>
            <span>{BRAND.tagline}</span>
          </>
        }
        actions={
          <>
            <Button to="/community" variant="primary">
              Join the community
            </Button>
            <Button to="/contact" variant="ghost">
              Talk to us
            </Button>
          </>
        }
      />

      {/* Mission and vision */}
      <Section labelledBy="mission">
        <div className="stack stack--lg">
          <Reveal className="statement" id="mission">
            <p className="statement__label">Mission</p>
            <p className="statement__text">{BRAND.mission}</p>
          </Reveal>

          <Reveal className="statement" delay={0.1} id="vision">
            <p className="statement__label">Vision</p>
            <p className="statement__text">{BRAND.vision}</p>
          </Reveal>
        </div>
      </Section>

      {/* Story */}
      <Section tone="tint" labelledBy="story-title">
        <div className="split">
          <div className="stack stack--lg">
            <SectionHeading
              eyebrow={STORY.eyebrow}
              title={STORY.title}
              headingId="story-title"
              stack
            />
            {STORY.paragraphs.map((paragraph, index) => (
              <Reveal key={index} delay={0.1 + index * 0.06}>
                <p className="lede">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="feature-panel" delay={0.12}>
            <h3 className="eyebrow eyebrow--plain">How we got here</h3>
            <ol className="timeline">
              {MILESTONES.map((milestone) => (
                <li key={milestone.year} className="timeline__item">
                  <span className="timeline__date">{milestone.year}</span>
                  <span className="small strong">{milestone.title}</span>
                  <span className="xs muted">{milestone.body}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      {/* Values */}
      <Section labelledBy="values-title">
        <SectionHeading
          eyebrow="What we stand for"
          title="Four commitments, written down."
          body="These are the standards we hold ourselves to as well as the ones we ask members to hold. If we break one, say so."
          headingId="values-title"
        />

        <ul className="value-grid">
          {VALUES.map((value, index) => {
            const Icon = VALUE_ICONS[value.icon] ?? ShieldCheck
            return (
              <Reveal as="li" key={value.key} className="card card--accent" delay={index * 0.07}>
                <span className="card__icon" aria-hidden="true">
                  <Icon size={20} />
                </span>
                <h3 className="card__title">{value.title}</h3>
                <p className="card__body">{value.body}</p>
                <p className="xs subtle">{value.detail}</p>
              </Reveal>
            )
          })}
        </ul>
      </Section>

      {/* Principles */}
      <Section tone="inverse" labelledBy="principles-title">
        <div className="split">
          <div className="stack stack--lg">
            <SectionHeading
              eyebrow="Non-negotiables"
              title="What we will never do."
              body="These are not values statements. They are the specific things we refuse to do, however much reach or revenue they would bring."
              headingId="principles-title"
              stack
              className="section--inverse"
            />
            <ul className="card__list" style={{ color: 'var(--c-ink-inverse-muted)' }}>
              {PRINCIPLES.map((principle) => (
                <li key={principle} className="card__list-item">
                  <span
                    style={{
                      width: '0.4rem',
                      height: '0.4rem',
                      borderRadius: '50%',
                      background: 'var(--ms-green-300)',
                      marginTop: '0.55rem',
                    }}
                    aria-hidden="true"
                  />
                  <span>{principle}</span>
                </li>
              ))}
            </ul>
          </div>

          <Reveal className="card card--inverse" delay={0.1}>
            <p className="eyebrow eyebrow--inverse">Why this matters</p>
            <p style={{ color: 'var(--c-ink-inverse)', fontSize: 'var(--fs-lg)', fontWeight: 600, lineHeight: 1.4 }}>
              Trading is one of the few fields where the most profitable behaviour for a teacher is
              the one that keeps students poor.
            </p>
            <p className="small">
              Selling certainty pays better than teaching risk. We have chosen the harder business
              because the alternative is not a business — it is an extraction.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Founder */}
      <Section labelledBy="founder-title">
        <SectionHeading
          eyebrow="The founder"
          title="One person, accountable for the standard."
          body="No committee, no placeholders. The strategies taught here are the ones the founder trades."
          headingId="founder-title"
        />

        {TEAM.map((member) => (
          <FounderCard key={member.id} member={member} />
        ))}
      </Section>

      <Section tight tone="sunken">
        <Disclaimer />
        <Crumbs items={[{ label: 'Home', to: '/' }, { label: 'About' }]} />
      </Section>
    </>
  )
}
