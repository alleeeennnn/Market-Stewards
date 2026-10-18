import { directionOf, formatPercent, formatSignedPeso } from '../lib/format'

/**
 * Signed value indicator.
 *
 * Direction is always carried by an arrow as well as colour, so the
 * information does not depend on hue alone. Everything else that used to
 * live in this file (progress rings, metric tiles, difficulty meters)
 * belonged to the deleted journal and education pages.
 */
export function Delta({ value, percent, showArrow = true }) {
  const direction = directionOf(value ?? percent)
  const arrow = direction === 'up' ? '▲' : direction === 'down' ? '▼' : '—'
  const text = percent != null ? formatPercent(percent) : formatSignedPeso(value)

  return (
    <span className={`delta delta--${direction}`}>
      {showArrow ? (
        <span aria-hidden="true" style={{ fontSize: '0.7em' }}>
          {arrow}
        </span>
      ) : null}
      {text}
    </span>
  )
}