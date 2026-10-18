import { toPolyline } from '../lib/chartMath'

/**
 * Thin trend line for instrument rows and the market tape.
 *
 * Drawn from prices observed while the page has been open, so it is
 * explicitly a short window rather than a session or daily chart. The
 * candle, equity and sector charts that earlier pages used were removed
 * along with the synthetic data they were built from.
 */
export function Sparkline({ series, direction = 'flat', width = 88, height = 26, className = '' }) {
  if (!series || series.length < 2) return null

  const points = toPolyline(series, width, height, 2)

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role="img"
      aria-label={`Trend since page load, ${direction === 'up' ? 'rising' : direction === 'down' ? 'falling' : 'flat'}`}
      style={{ overflow: 'visible', flex: 'none' }}
    >
      <polyline
        points={points}
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`spark spark--${direction}`}
      />
    </svg>
  )
}