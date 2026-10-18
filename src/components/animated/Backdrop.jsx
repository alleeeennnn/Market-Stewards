import { GridPattern } from './GridPattern'

/**
 * Layered section backdrop.
 *
 * Four layers, back to front:
 *   1. A base tint and three slow-drifting radial washes — the depth
 *   2. Masked grid lines, faded at the edges — the "precision" read
 *   3. A conic sweep at very low opacity, to keep large flat areas alive
 *   4. Fine grain, so nothing reads as plastic
 *
 * The earlier interactive dot field is gone. At full-bleed scale its dots
 * read as texture noise rather than structure, which was the opposite of
 * the intended effect.
 *
 * Everything is aria-hidden. `tone="light"` sits on white, `tone="inverse"`
 * on the dark surface. All motion stops under prefers-reduced-motion, but
 * the tint, grid and grain remain so the section keeps its depth.
 */
export function Backdrop({
  tone = 'light',
  grid = true,
  sweep = true,
  grain = true,
  gridWidth = 56,
  className = '',
}) {
  return (
    <div className={`backdrop backdrop--${tone} ${className}`.trim()} aria-hidden="true">
      <div className="backdrop__base" />
      <div className="backdrop__mesh">
        <span className="backdrop__blob backdrop__blob--1" />
        <span className="backdrop__blob backdrop__blob--2" />
        <span className="backdrop__blob backdrop__blob--3" />
      </div>
      {sweep ? <div className="backdrop__sweep" /> : null}
      {grid ? (
        <GridPattern width={gridWidth} height={gridWidth} className="backdrop__grid" strokeDasharray="0" />
      ) : null}
      {grain ? <div className="backdrop__grain" /> : null}
    </div>
  )
}

/**
 * A slow specular band for dark sections. Separate from Backdrop because it
 * needs to sit above the surface colour rather than tint it.
 */
export function Sheen({ className = '' }) {
  return <div className={`backdrop__sheen ${className}`.trim()} aria-hidden="true" />
}