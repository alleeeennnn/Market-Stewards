import { useMemo, useState } from 'react'
import { CalendarClock, Info, Star } from 'lucide-react'
import { PageHeader, Section, SectionHeading } from '../components/Layout'
import { PriceChart } from '../components/PriceChart'
import { Sparkline } from '../components/Charts'
import { Delta } from '../components/Indicators'
import { Button } from '../components/Button'
import { Disclaimer } from '../components/Disclaimer'
import { LiveBadge, MarketDataNotice } from '../components/LiveBadge'
import { EmptyState, FilterChips } from '../components/Primitives'
import { SpotlightCard } from '../components/animated/SpotlightCard'
import { Reveal } from '../components/Reveal'
import { useCryptoHistory, useLiveMarket } from '../hooks/useLiveMarket'
import { ANALYSES, ECONOMIC_CALENDAR, IMPACT_LABEL, INSTRUMENTS, KIND_LABEL } from '../data/instruments'
import { formatDate, formatPrice } from '../lib/format'

const CALENDAR_FILTERS = [
  { id: 'all', label: 'All regions' },
  { id: 'Philippines', label: 'Philippines' },
  { id: 'United States', label: 'United States' },
]

export function InsightsPage() {
  const [region, setRegion] = useState('all')
  const [notice, setNotice] = useState(null)
  const { rows, status, lastUpdated, error, sources } = useLiveMarket()
  const { series: btcHistory, status: btcStatus } = useCryptoHistory('bitcoin', 30)

  const calendar = region === 'all' ? ECONOMIC_CALENDAR : ECONOMIC_CALENDAR.filter((e) => e.region === region)
  const gold = rows.find((row) => row.id === 'xauusd')

  const grouped = useMemo(() => {
    return rows.reduce((groups, row) => {
      groups[row.kind] = groups[row.kind] ?? []
      groups[row.kind].push(row)
      return groups
    }, {})
  }, [rows])

  return (
    <>
      <PageHeader
        eyebrow="Market insights"
        title="Study the market, not the feed."
        body="Live spot prices for gold, silver, major FX crosses, and the two largest digital assets. Pulled directly from public market data providers, refreshed every 30 seconds, with the source shown on every figure."
        meta={
          <>
            <LiveBadge status={status} lastUpdated={lastUpdated} />
            <span>{rows.filter((row) => row.quote).length} instruments connected</span>
          </>
        }
        actions={
          <Button to="/community" variant="secondary">
            Discuss a setup in the community
          </Button>
        }
      />

      {/* Live gold overview */}
      <Section labelledBy="overview-title">
        <SectionHeading
          eyebrow="Market overview"
          title="Gold, the instrument most often misused."
          body="The live spot price, and what the chart can and cannot tell you about it. The window below is every price observed since this page loaded — not a daily history."
          headingId="overview-title"
        />

        {error ? (
          <div className="notice notice--warn" role="status" style={{ marginBottom: 'var(--sp-6)' }}>
            <Info size={16} aria-hidden="true" />
            <span>{error}</span>
          </div>
        ) : null}

        <div className="with-rail">
          <div className="stack stack--lg">
            <Reveal className="panel">
              <div className="panel__head">
                <div className="stack" style={{ gap: '0.125rem' }}>
                  <span className="panel__title">XAU/USD · Gold spot</span>
                  <span className="xs subtle">{gold?.source}</span>
                </div>
                <div className="stack" style={{ gap: 0, textAlign: 'right' }}>
                  <span className="strong num" style={{ fontSize: 'var(--fs-2xl)' }}>
                    {formatPrice(gold?.quote?.price, 2)}
                  </span>
                  <LiveBadge status={status} lastUpdated={lastUpdated} size="sm" />
                </div>
              </div>
              <div className="panel__body">
                <PriceChart
                  series={gold?.series ?? []}
                  precision={2}
                  label="Gold spot price observed since page load"
                  status={status}
                />
              </div>
              <div className="panel__foot">
                There is no free, browser-callable historical feed for spot gold, so this chart is
                built from prices collected while the page is open — typically a few minutes. It is
                not a daily chart and should not be read as one.
              </div>
            </Reveal>

            {/* Bitcoin — the one instrument with real history available */}
            <Reveal className="panel" delay={0.08}>
              <div className="panel__head">
                <div className="stack" style={{ gap: '0.125rem' }}>
                  <span className="panel__title">BTC/USD · Bitcoin</span>
                  <span className="xs subtle">CoinGecko · last 30 days</span>
                </div>
                <span className={`badge ${btcStatus === 'live' ? 'badge--primary' : 'badge--warn'}`}>
                  {btcStatus === 'live' ? '30-day history' : 'history unavailable'}
                </span>
              </div>
              <div className="panel__body">
                <PriceChart
                  series={btcHistory}
                  precision={0}
                  label="Bitcoin price over the last 30 days"
                  caption={`${btcHistory.length} daily closes · real historical data`}
                  status={btcStatus}
                  emptyHint="Loading 30-day history…"
                />
              </div>
              <div className="panel__foot">
                Crypto trades continuously, so this is a genuine daily series — the exception on this
                page, because it is the only instrument here with a key-less history feed.
              </div>
            </Reveal>

            {/* Educational analysis */}
            <Reveal className="panel" delay={0.12}>
              <div className="panel__head">
                <h2 className="panel__title">Educational analysis</h2>
                <span className="badge badge--info">Study notes, not calls</span>
              </div>
              <div className="panel__body">
                <div className="stack stack--lg">
                  {ANALYSES.map((analysis) => (
                    <article key={analysis.id} className="analysis">
                      <div className="cluster" style={{ justifyContent: 'space-between' }}>
                        <h3 style={{ fontSize: 'var(--fs-md)' }}>{analysis.title}</h3>
                        <span className="xs subtle num">{analysis.readMinutes} min read</span>
                      </div>
                      <p className="small muted">{analysis.body}</p>
                      <div className="cluster" style={{ justifyContent: 'space-between' }}>
                        <div className="analysis__tags">
                          {analysis.tags.map((tag) => (
                            <span key={tag} className="badge badge--outline">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="xs subtle">
                          {analysis.author} · {formatDate(analysis.date, { year: undefined })}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Sidebar */}
          <aside className="rail rail--sticky" aria-label="Market information">
            <div className="panel">
              <div className="panel__head">
                <h2 className="panel__title">Connection</h2>
                <LiveBadge status={status} lastUpdated={lastUpdated} size="sm" />
              </div>
              <div className="panel__body">
                <MarketDataNotice sources={sources} />
              </div>
            </div>

            <div className="panel">
              <div className="panel__head">
                <h2 className="panel__title">
                  <CalendarClock size={16} aria-hidden="true" style={{ display: 'inline', marginRight: 8, color: 'var(--c-primary)' }} />
                  Economic calendar
                </h2>
              </div>
              <div className="panel__body">
                <FilterChips
                  options={CALENDAR_FILTERS}
                  value={region}
                  onChange={setRegion}
                  label="Filter calendar by region"
                  className="feed-filters--wrap"
                />
                <ul className="calendar" style={{ marginTop: 'var(--sp-4)' }}>
                  {calendar.map((entry) => {
                    const impact = IMPACT_LABEL[entry.impact]
                    return (
                      <li key={entry.id} className="calendar__row">
                        <span className="calendar__date">
                          {formatDate(entry.date, { year: undefined })}
                          <br />
                          <span className="calendar__time">{entry.time}</span>
                        </span>
                        <span className="calendar__body">
                          <span className="calendar__title">{entry.title}</span>
                          <span className="calendar__meta">
                            <span>{entry.region}</span>
                            <span className={`impact impact--${impact.tone}`}>
                              <span className="impact__dot" aria-hidden="true" />
                              {impact.label}
                            </span>
                          </span>
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div className="panel__foot">
                Illustrative schedule showing the expected format. Not a live economic calendar.
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* Watchlist, grouped by asset class */}
      <Section tone="tint" labelledBy="watchlist-title">
        <SectionHeading
          eyebrow="Watchlist"
          title="Every instrument we track."
          body="Seven live instruments across three asset classes. Each card shows the last price fetched, its direction of travel since page load, and the provider it came from."
          headingId="watchlist-title"
          aside={
            <Button variant="secondary" size="sm" onClick={() => setNotice('Personal watchlists are not stored in this build.')}>
              Manage watchlist
            </Button>
          }
        />

        {notice ? (
          <div className="notice notice--info" role="status" style={{ marginBottom: 'var(--sp-5)' }}>
            <Star size={16} aria-hidden="true" />
            <span>{notice}</span>
          </div>
        ) : null}

        <div className="stack stack--lg">
          {Object.entries(grouped).map(([kind, items]) => (
            <div key={kind} className="stack stack--lg">
              <h3 style={{ fontSize: 'var(--fs-lg)' }}>{KIND_LABEL[kind]}</h3>
              <ul className="grid grid--3">
                {items.map((row, i) => {
                  const move =
                    row.series.length > 1 && row.series[0] !== 0
                      ? ((row.series[row.series.length - 1] - row.series[0]) / row.series[0]) * 100
                      : null

                  return (
                    <Reveal as="li" key={row.id} delay={i * 0.04}>
                      <SpotlightCard as="article" className="card">
                        <div className="card__head">
                          <div className="stack" style={{ gap: 0 }}>
                            <span className="card__title num">{row.symbol}</span>
                            <span className="xs subtle">{row.name}</span>
                          </div>
                          {row.series.length > 1 ? (
                            <Sparkline
                              series={row.series}
                              direction={move >= 0 ? 'up' : 'down'}
                              width={72}
                              height={24}
                            />
                          ) : null}
                        </div>

                        <span className="num" style={{ fontSize: 'var(--fs-2xl)', fontWeight: 700, letterSpacing: 'var(--ls-tightest)' }}>
                          {formatPrice(row.quote?.price, row.precision)}
                        </span>

                        {move != null ? (
                          <Delta value={move} percent={move} />
                        ) : (
                          <span className="xs subtle">awaiting first sample</span>
                        )}

                        <div className="card__foot">
                          <span className="xs subtle">{row.source}</span>
                          <span className="xs subtle num">{row.series.length} samples</span>
                        </div>
                      </SpotlightCard>
                    </Reveal>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        {!rows.length ? (
          <EmptyState title="No instruments connected" body="The market data providers did not respond." />
        ) : null}
      </Section>

      <Section tight tone="sunken">
        <Disclaimer />
        <p className="footnote">
          Live prices are provided for education and discussion. Market Stewards does not execute
          trades, does not connect to your broker, and does not recommend positions. FX rates from
          the ECB are published once per working day and will not move intraday.
        </p>
        <p className="footnote">
          Instruments tracked: {INSTRUMENTS.map((i) => i.symbol).join(', ')}.
        </p>
      </Section>
    </>
  )
}