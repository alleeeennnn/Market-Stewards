import { Radio, WifiOff } from 'lucide-react'

/**
 * Connection state for the market feed.
 *
 * States are distinguished deliberately:
 *   live      — the last poll succeeded
 *   stale     — showing a quote, but the newest poll failed
 *   connecting — first request still in flight
 *
 * Every state names the data source. A price with no visible provenance
 * should not be trusted, and "live" without a source is just a claim.
 */
export function LiveBadge({ status, lastUpdated, source, size = 'md' }) {
  const isLive = status === 'live'
  const isStale = status === 'stale'

  const tone = isLive ? 'live' : isStale ? 'stale' : 'connecting'
  const label = isLive ? 'Live' : isStale ? 'Stale' : 'Connecting'

  return (
    <span className={`live live--${tone} ${size === 'sm' ? 'live--sm' : ''}`.trim()}>
      {isStale ? <WifiOff size={11} aria-hidden="true" /> : <Radio size={11} aria-hidden="true" />}

      <span className="live__label">{label}</span>
      {source ? <span className="live__source">{source}</span> : null}

      {lastUpdated && isLive ? (
        <time className="live__time" dateTime={new Date(lastUpdated).toISOString()}>
          as of{' '}
          {new Date(lastUpdated).toLocaleTimeString('en-PH', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          })}
        </time>
      ) : null}

      <span className="visually-hidden" aria-live="polite">
        Market data {label.toLowerCase()}
        {source ? ` from ${source}` : ''}
        {lastUpdated && isLive ? `, updated ${new Date(lastUpdated).toLocaleTimeString()}` : ''}
      </span>
    </span>
  )
}

/**
 * Full-width provenance panel. Replaces the old "simulated data" notice and
 * states plainly what the numbers are, where they come from, and what they
 * are not allowed to be used for.
 */
export function MarketDataNotice({ sources, className = '' }) {
  return (
    <div className={`data-notice ${className}`.trim()}>
      <p className="data-notice__title">About this data</p>
      <ul className="data-notice__list">
        <li>
          <strong>Live.</strong> Prices are fetched directly from the providers named below, from
          your browser, every 30 seconds. There is no cached or sample feed behind them.
        </li>
        <li>
          <strong>Sources.</strong> {sources.gold}. {sources.fx}. {sources.crypto}. Metals and FX
          are spot/reference rates; crypto is an aggregate of exchanges.
        </li>
        <li>
          <strong>Timeliness.</strong> Metals and crypto trade continuously. FX reference rates are
          published by the ECB once per working day, so they do not move intraday.
        </li>
        <li>
          <strong>Not advice.</strong> A live price is still just a price. Nothing on this site
          connects to your broker, places an order, or recommends a trade.
        </li>
      </ul>
    </div>
  )
}