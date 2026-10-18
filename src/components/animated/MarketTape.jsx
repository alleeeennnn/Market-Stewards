import { Marquee } from './Marquee'
import { Sparkline } from '../Charts'
import { LiveBadge } from '../LiveBadge'
import { useLiveMarket } from '../../hooks/useLiveMarket'
import { formatPrice } from '../../lib/format'

/**
 * Live market tape.
 *
 * Real quotes from the providers in `marketApi.js`, polled every 30s. Each
 * item shows the last observed price and its direction of travel since the
 * previous poll, plus a sparkline of everything collected while the page has
 * been open.
 *
 * The connection badge is always visible — a tape with no provenance is
 * indistinguishable from a tape of invented numbers.
 */
export function MarketTape() {
  const { rows, status, lastUpdated } = useLiveMarket()
  const ready = rows.filter((row) => row.quote)

  // Repeat the set so the scroll reads as continuous rather than as a loop.
  const items = ready.length ? [...ready, ...ready] : []

  return (
    <div className="tape">
      <LiveBadge
        status={status}
        lastUpdated={lastUpdated}
        source={status === 'live' ? 'Live' : null}
        size="sm"
      />

      <div className="tape__scroll">
        {items.length ? (
          <Marquee durationSeconds={78} pauseOnHover={false}>
            {items.map((row, index) => (
              <span key={`${row.id}-${index}`} className="tape__item">
                <span className="tape__sym">{row.short}</span>
                <span className="tape__last num">{formatPrice(row.quote.price, row.precision)}</span>
                {row.series.length > 1 ? (
                  <Sparkline
                    series={row.series}
                    direction={row.series[row.series.length - 1] >= row.series[0] ? 'up' : 'down'}
                    width={48}
                    height={16}
                    className="tape__spark"
                  />
                ) : null}
              </span>
            ))}
          </Marquee>
        ) : (
          <span className="tape__waiting">Connecting to market data providers…</span>
        )}
      </div>
    </div>
  )
}