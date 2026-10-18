import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { fetchAllSpot, fetchCryptoHistory } from '../lib/marketApi'
import { INSTRUMENTS, SOURCES } from '../data/instruments'

/**
 * Live market quotes.
 *
 * Polls the providers on an interval and keeps the last good quote per
 * instrument, so a transient network failure degrades to "stale" rather than
 * to zero, blank, or invented data.
 *
 * Two connection states are surfaced separately, because they mean different
 * things to a trader:
 *   live   — at least one instrument updated in the current poll
 *   stale  — we have a quote but the latest poll did not succeed
 *
 * `samples` accumulates observed prices per instrument so a chart can be
 * drawn for metals and FX, which have no key-less history source. The chart
 * is labelled "since page load" because that is exactly what it contains.
 */

const POLL_MS = 30_000
const MAX_SAMPLES = 120

export function useLiveMarket({ pollMs = POLL_MS } = {}) {
  const [quotes, setQuotes] = useState({})
  const [status, setStatus] = useState('connecting') // connecting | live | stale
  const [lastUpdated, setLastUpdated] = useState(null)
  const [error, setError] = useState(null)
  const [samples, setSamples] = useState({})
  const mounted = useRef(true)

  const record = useCallback((incoming) => {
    setQuotes((current) => {
      const next = { ...current }
      for (const [id, quote] of Object.entries(incoming)) {
        if (Number.isFinite(quote.price)) next[id] = quote
      }
      return next
    })

    setSamples((current) => {
      const next = { ...current }
      for (const [id, quote] of Object.entries(incoming)) {
        if (!Number.isFinite(quote.price)) continue
        const series = next[id] ? [...next[id], quote.price] : [quote.price]
        next[id] = series.length > MAX_SAMPLES ? series.slice(-MAX_SAMPLES) : series
      }
      return next
    })
  }, [])

  const poll = useCallback(async () => {
    try {
      const { quotes: incoming, partial } = await fetchAllSpot()
      if (!mounted.current) return

      record(incoming)
      setLastUpdated(Date.now())
      setStatus(partial ? 'stale' : 'live')
      setError(partial ? 'Some sources did not respond. Figures shown are the last successful fetch.' : null)
    } catch {
      if (!mounted.current) return
      setStatus('stale')
      setError(
        'Could not reach the market data providers. Figures shown are the last successfully fetched values.',
      )
    }
  }, [record])

  useEffect(() => {
    mounted.current = true
    void poll()
    const timer = setInterval(poll, pollMs)

    // Pause while the tab is hidden; a background tab polling three APIs
    // every 30s is wasted quota and burns mobile battery.
    const onVisibility = () => {
      if (!document.hidden) void poll()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      mounted.current = false
      clearInterval(timer)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [poll, pollMs])

  /** Instruments joined to their latest quote. */
  const rows = useMemo(
    () =>
      INSTRUMENTS.map((instrument) => ({
        ...instrument,
        quote: quotes[instrument.id] ?? null,
        series: samples[instrument.id] ?? [],
      })),
    [quotes, samples],
  )

  const ready = status !== 'connecting'

  return {
    rows,
    status,
    isLive: status === 'live',
    isStale: status === 'stale',
    isConnecting: status === 'connecting',
    lastUpdated,
    error,
    sources: SOURCES,
    refresh: poll,
    ready,
  }
}

/**
 * Historical crypto series, fetched once. Separate from the poll loop
 * because it is 30–90 days of data, not a spot quote.
 */
export function useCryptoHistory(coinGeckoId, days = 30) {
  const [series, setSeries] = useState([])
  const [status, setStatus] = useState('connecting')

  useEffect(() => {
    let active = true

    fetchCryptoHistory(coinGeckoId, days)
      .then((points) => {
        if (!active) return
        setSeries(points.map((point) => point.p))
        setStatus('live')
      })
      .catch(() => {
        if (active) setStatus('error')
      })

    return () => {
      active = false
    }
  }, [coinGeckoId, days])

  return { series, status }
}