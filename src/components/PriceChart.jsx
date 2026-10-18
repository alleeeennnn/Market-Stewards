import { useId } from 'react'
import { toPolyline } from '../lib/chartMath'

/**
 * Line / area chart for live price series.
 * Luxury pass: unique gradient id per instance (no collisions), honest
 * empty/loading/error states, keyboard-readable summary, reduced-motion safe.
 */
export function PriceChart({
  series,
  height = 240,
  precision = 2,
  label = 'Price series',
  caption,
  _stroke = 'var(--c-primary)',
  area = true,
  status = 'live',
  emptyHint = 'Collecting prices… a chart appears after the second sample.',
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const id = `price-fill-${uid}`

  if (status === 'error') {
    return (
      <div className="chart__state" role="status">
        <p className="chart__empty">Price history is unavailable right now.</p>
        <p className="chart__caption">The feed will retry automatically — your quotes stay on screen.</p>
      </div>
    )
  }

  if (!series || series.length < 2) {
    return (
      <div className="chart__state" role="status" aria-live="polite">
        <div className="chart__skeleton" aria-hidden="true">
          <span className="chart__skeleton-line" />
          <span className="chart__skeleton-line chart__skeleton-line--short" />
        </div>
        <p className="chart__empty">{emptyHint}</p>
      </div>
    )
  }

  const VIEW_W = 600
  const rawMin = Math.min(...series)
  const rawMax = Math.max(...series)
  // Flat series (every sample identical, e.g. a closed market): open a small
  // symmetric window around the price so the line and its dot sit mid-chart
  // instead of pinned to the bottom edge where they read as missing.
  const flat = rawMax === rawMin
  const windowSpan = Math.abs(rawMax) * 0.002 || 1
  const min = flat ? rawMin - windowSpan / 2 : rawMin
  const max = flat ? rawMax + windowSpan / 2 : rawMax
  const span = max - min
  const pad = 14

  const points = toPolyline(series, VIEW_W, height, pad)
  const areaPoints = `${pad},${height - pad} ${points} ${VIEW_W - pad},${height - pad}`

  const yFor = (value) => pad + (height - pad * 2) - ((value - min) / span) * (height - pad * 2)
  const first = series[0]
  const last = series[series.length - 1]
  const rising = last >= first
  const lineColor = rising ? 'var(--c-gain)' : 'var(--c-loss)'
  const move = first ? ((last - first) / first) * 100 : 0

  return (
    <figure className="chart">
      <svg viewBox={`0 0 ${VIEW_W} ${height}`} role="img" aria-label={`${label}. ${rising ? 'Up' : 'Down'} ${Math.abs(move).toFixed(2)} percent across ${series.length} samples.`}>
        <title>{label}</title>

        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0.22" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = pad + (height - pad * 2) * ratio
          const value = max - span * ratio
          return (
            <g key={ratio}>
              <line className="chart__grid-line" x1="0" y1={y} x2={VIEW_W} y2={y} />
              <text className="chart__axis-label" x={VIEW_W} y={y - 4} textAnchor="end">
                {value.toFixed(precision)}
              </text>
            </g>
          )
        })}

        {area ? <polygon points={areaPoints} fill={`url(#${id})`} /> : null}

        <polyline
          points={points}
          fill="none"
          stroke={lineColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="chart__line-draw"
          pathLength="1"
        />

        <circle cx={VIEW_W - pad} cy={yFor(last)} r="4" fill={lineColor} />

        <text className="chart__axis-label" x="0" y={height - 6}>
          {first.toFixed(precision)}
        </text>
      </svg>

      {/* caption="" hides the disclaimer (used by the hero panel);
          an omitted caption keeps the honest default. */}
      {caption !== '' && (
        <figcaption className="chart__caption">
          {caption ?? `${series.length} samples since page load · not a full trading history`}
        </figcaption>
      )}
    </figure>
  )
}