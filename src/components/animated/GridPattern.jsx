import { useId } from 'react'

/**
 * Masked grid lines.
 *
 * Adapted from Magic UI "GridPattern" (magicuidesign/magicui, MIT).
 * The upstream version leans on Tailwind for fill/stroke; here the colours
 * come from CSS custom properties so the grid can be re-tinted per surface.
 *
 * The radial mask is what makes it read as deliberate rather than as a
 * spreadsheet: lines fade out toward the edges instead of tiling flat.
 */
export function GridPattern({
  width = 56,
  height = 56,
  x = -1,
  y = -1,
  strokeDasharray = '0',
  className = '',
  style,
}) {
  const id = useId().replace(/:/g, '')

  return (
    <svg
      aria-hidden="true"
      className={`grid-pattern ${className}`.trim()}
      style={style}
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" strokeDasharray={strokeDasharray} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  )
}