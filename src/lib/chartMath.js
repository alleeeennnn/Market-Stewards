/**
 * Chart geometry helpers.
 *
 * Isolated from any data source so the chart components stay agnostic about
 * where their series came from — whether that is a live poll, a historical
 * API response, or something assembled in the view.
 */

/**
 * Converts a number series into an SVG polyline point string, normalised into
 * the given viewBox. Callers scale the SVG responsively via CSS, so the
 * viewBox is the only coordinate space that matters.
 */
export function toPolyline(series, width, height, padding = 0) {
  if (!series || series.length < 2) return ''

  const min = Math.min(...series)
  const max = Math.max(...series)
  const innerWidth = width - padding * 2
  const innerHeight = height - padding * 2

  // Flat series (every sample identical, e.g. a closed market): centre the
  // line instead of pinning it to the bottom edge where it reads as missing.
  if (max === min) {
    const y = padding + innerHeight / 2
    return series
      .map((_, index) => {
        const x = padding + (index / (series.length - 1)) * innerWidth
        return `${x.toFixed(2)},${y.toFixed(2)}`
      })
      .join(' ')
  }

  const span = max - min

  return series
    .map((value, index) => {
      const x = padding + (index / (series.length - 1)) * innerWidth
      const y = padding + innerHeight - ((value - min) / span) * innerHeight
      return `${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')
}

/** Percentage move from the first to the last value in a series. */
export function seriesChangePercent(series) {
  if (!series || series.length < 2 || !series[0]) return null
  const first = series[0]
  const last = series[series.length - 1]
  return ((last - first) / first) * 100
}