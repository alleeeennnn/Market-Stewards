import {
  ArrowRight,
  BookOpen,
  Compass,
  HeartHandshake,
  LineChart,
  Scale,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react'
import { Button } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { Section, SectionHeading } from '../components/Layout'
import { Disclaimer } from '../components/Disclaimer'
import { Sparkline } from '../components/Charts'
import { LiveBadge } from '../components/LiveBadge'
import { useLiveMarket } from '../hooks/useLiveMarket'
import { FeatureList } from '../components/Primitives'
import { Backdrop, Sheen } from '../components/animated/Backdrop'
import { BlurText } from '../components/animated/BlurText'
import { Marquee } from '../components/animated/Marquee'
import { ShinyText } from '../components/animated/ShinyText'
import { CountUp } from '../components/animated/CountUp'
import { SpotlightCard } from '../components/animated/SpotlightCard'
import { BRAND, PILLARS } from '../data/site'
import { formatPercent, formatPrice } from '../lib/format'

const PILLAR_ICONS = { discipline: Compass, purpose: Target, impact: HeartHandshake }

const HOME_TRUST = [
  { value: 411, label: 'Current members' },
  { text: 'Dupoin', label: 'Partnered by' },
  { value: 0, prefix: '₱', label: 'Monthly cost' },
]

/**
 * The homepage snapshot drops the lessons and sessions figures — the page
 * now leads with members, the partnership, and the zero-cost promise.
 */
const HOME_COMMUNITY_STATS = [
  { value: '411', label: 'Steward members', hint: 'Across the Philippines' },
  { value: '0', label: 'Paid signals', hint: 'We do not sell them' },
]

function TrustMetric({ value, text, suffix = '', prefix = '', label }) {
  return (
    <span className="hero__trust-item">
      <span className={text ? 'hero__trust-value hero__trust-value--text' : 'hero__trust-value num'}>
        {text ?? <CountUp to={value} prefix={prefix} suffix={suffix} duration={1.8} />}
      </span>
      <span className="hero__trust-label">{label}</span>
    </span>
  )
}

/**
 * Hero visual: the live gold price, drawn from the real spot feed.
 *
 * Deliberately a study panel, not a broker terminal — no order buttons, no
 * balance, no P/L ticker. The chart shows prices sampled while the page has
 * been open and says so, because there is no key-less history source for
 * metals and drawing a fake daily series around a real price would be worse
 * than showing a short honest window.
 */
/**
 * Live instrument cards. Shares the same hook instance as the tape, so the
 * figures on this page and in the tape can never disagree.
 */
function InstrumentGrid() {
  const { rows, status, lastUpdated, error } = useLiveMarket()

  return (
    <div className="stack stack--lg">
      <div className="cluster" style={{ justifyContent: 'space-between' }}>
        <LiveBadge status={status} lastUpdated={lastUpdated} />
        {error ? <span className="xs subtle">{error}</span> : null}
      </div>

      <ul className="grid grid--4">
        {rows.slice(0, 8).map((row, i) => {
          const direction =
            row.series.length > 1 ? (row.series[row.series.length - 1] >= row.series[0] ? 'up' : 'down') : 'flat'
          const move =
            row.series.length > 1 && row.series[0] !== 0
              ? ((row.series[row.series.length - 1] - row.series[0]) / row.series[0]) * 100
              : null

          return (
            <Reveal as="li" key={row.id} delay={i * 0.04}>
              <SpotlightCard as="article" className="card card--flat" style={{ gap: 'var(--sp-3)' }}>
                <div className="cluster" style={{ justifyContent: 'space-between' }}>
                  <span className="strong">{row.short}</span>
                  {row.series.length > 1 ? (
                    <Sparkline series={row.series} direction={direction} width={70} height={22} />
                  ) : null}
                </div>
                <span className="num" style={{ fontWeight: 700, fontSize: 'var(--fs-lg)' }}>
                  {formatPrice(row.quote?.price, row.precision)}
                </span>
                {move != null ? (
                  <span className={`delta delta--${move >= 0 ? 'up' : 'down'}`}>{formatPercent(move)}</span>
                ) : (
                  <span className="xs subtle">awaiting first sample</span>
                )}
              </SpotlightCard>
            </Reveal>
          )
        })}
      </ul>
    </div>
  )
}

export function HomePage() {
  return (
    <>
      <section className="hero">
        <video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/Market-Stewards/art/hero-noir.jpg"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src="/Market-Stewards/art/hero-loop.webm" type="video/webm" />
          <source src="/Market-Stewards/art/hero-loop.mp4" type="video/mp4" />
        </video>
        <div className="hero__plate" data-higgsfield-slot="hero-plate" aria-hidden="true" />
        <Backdrop tone="light" gridWidth={48} />
        <div className="shell hero__inner">
          <div className="hero__content">
            <Reveal as="p" className="eyebrow hero__eyebrow" distance={8} duration={0.4}>
              Trading education · Community · Stewardship
            </Reveal>

            <h1 className="hero__title">
              <BlurText text="Trade With Discipline." as="span" className="balance" />
              <em className="hero__title-accent">
                <ShinyText
                  text="Live With Purpose."
                  speed={3.8}
                  color="var(--ms-green-200)"
                  shineColor="var(--ms-white)"
                />
              </em>
            </h1>

            <Reveal delay={0.18}>
              <p className="hero__lede">
                Build the knowledge, discipline, and principles needed to become a financially wise
                trader.
              </p>
            </Reveal>

            <Reveal className="hero__cta" delay={0.26}>
              <Button
                to="/community"
                variant="primary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                className="btn--shimmer"
              >
                Join the Community
              </Button>
              <Button to="/insights" variant="outline-inverse" size="lg" icon={LineChart}>
                See Market Insights
              </Button>
            </Reveal>

            <Reveal className="hero__trust" delay={0.34}>
              {HOME_TRUST.map((metric) => (
                <TrustMetric key={metric.label} {...metric} />
              ))}
            </Reveal>
          </div>

        </div>
      </section>

      {/* Values ticker */}
      <div className="ticker">
        <Marquee durationSeconds={54}>
          {[...PILLARS.map((p) => p.title), 'Education over hype', 'No paid signals', 'Respect', 'Integrity', 'Long-term wealth'].map(
            (item) => (
              <span key={item} className="ticker__item">
                <span className="ticker__diamond" aria-hidden="true" />
                {item}
              </span>
            ),
          )}
        </Marquee>
      </div>

      {/* Three pillars */}
      <Section labelledBy="pillars-title">
        <SectionHeading
          eyebrow="What we build"
          title="Three things we hold you to."
          body="Every lesson, every workshop, and every community review comes back to these three ideas."
          headingId="pillars-title"
        />

        <ul className="pillars">
          {PILLARS.map((pillar, index) => {
            const Icon = PILLAR_ICONS[pillar.key]
            return (
              <Reveal as="li" key={pillar.key} className="pillar" delay={index * 0.08}>
                <span className="pillar__index display-face">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="card__icon" aria-hidden="true">
                  <Icon size={20} />
                </span>
                <h3 className="pillar__title">{pillar.title}</h3>
                <p className="pillar__body">{pillar.body}</p>
                <p className="xs subtle">{pillar.detail}</p>
              </Reveal>
            )
          })}
        </ul>
      </Section>

      {/* More than trading */}
      <Section tone="tint" labelledBy="more-title">
        <div className="feature-split">
          <div className="stack stack--lg">
            <SectionHeading
              eyebrow="More than trading"
              title="More Than Trading."
              body="Market Stewards is a community focused on structured trading education, financial wisdom, stewardship, and personal development."
              headingId="more-title"
              stack
            />
            <Reveal delay={0.16}>
              <p className="lede">
                Most trading communities are a chat room that occasionally shares a chart. This is a
                standard of conduct and a genuine conversation — the charts are the least important
                part of it.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <Button to="/about" variant="secondary" icon={ArrowRight} iconPosition="right">
                Read our story
              </Button>
            </Reveal>
          </div>

          <Reveal className="feature-panel" delay={0.12}>
            <FeatureList
              items={[
                {
                  title: 'Education that starts with risk',
                  body: 'Fundamentals, position sizing, stops, and trading psychology — in that order, because that is the order that keeps people solvent.',
                  icon: BookOpen,
                },
                {
                  title: 'Honest numbers, not flattering ones',
                  body: 'Win rate, expectancy, and drawdown discussed openly, including the sessions where the numbers were ugly.',
                  icon: Scale,
                },
                {
                  title: 'A community with rules',
                  body: 'Respect, integrity, and education over hype. No guaranteed-profit claims, and no paid signals — everything is free.',
                  icon: ShieldCheck,
                },
                {
                  title: 'A purpose beyond profit',
                  body: 'We talk about what the money is for — families, communities, and legacy — not only what it returned.',
                  icon: HeartHandshake,
                },
              ]}
            />
          </Reveal>
        </div>
      </Section>

      {/* Community snapshot */}
      <Section labelledBy="community-title">
        <SectionHeading
          eyebrow="The community"
          title="Learn in public, get corrected in private."
          body="Members bring a trade from their journal, someone reads it properly, and the reasoning gets discussed. That is the whole mechanism."
          headingId="community-title"
          aside={
            <Button to="/community" variant="secondary" icon={ArrowRight} iconPosition="right">
              Visit the community
            </Button>
          }
        />

        <ul className="stat-strip">
          {HOME_COMMUNITY_STATS.map((stat, index) => (
            <Reveal as="li" className="stat" key={stat.label} delay={index * 0.06}>
              <span className="stat__value num">{stat.value}</span>
              <span className="stat__label">{stat.label}</span>
              <span className="stat__hint">{stat.hint}</span>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Live instrument preview */}
      <Section tone="sunken" labelledBy="preview-title">
        <SectionHeading
          eyebrow="Live markets"
          title="Study the market, not the feed."
          body="Real spot prices for gold, silver, major FX crosses, and the majors — pulled live from public providers, with the source shown on every figure."
          headingId="preview-title"
          aside={
            <Button to="/insights" variant="secondary" icon={TrendingUp} iconPosition="right">
              Open market insights
            </Button>
          }
        />

        <InstrumentGrid />

        <Reveal delay={0.2}>
          <Disclaimer className="footnote" />
        </Reveal>
      </Section>

      <section className="cta-band">
        <Sheen />
        <div className="shell cta-band__inner">
          <Reveal>
            <p className="eyebrow eyebrow--inverse">{BRAND.tagline}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2>Start with risk management, not a signal.</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="lede">
              The first track is free, and it deliberately begins with position sizing rather than
              chart patterns. Come and meet the 411 stewards who work through it together.
            </p>
          </Reveal>
          <Reveal className="hero__cta" delay={0.18}>
            <Button to="/community" variant="inverse" size="lg" icon={Users}>
              Join the Community
            </Button>
            <Button to="/about" variant="outline-inverse" size="lg">
              Our values
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  )
}
