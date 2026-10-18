import { useCallback, useRef } from 'react'

/**
 * Cursor-following spotlight card.
 *
 * Adapted from ReactBits "SpotlightCard" (github.com/DavidHDev/react-bits,
 * MIT). Upstream ships a dark card (#111 surface, #222 border, 1.5rem
 * radius) with a fixed 2rem padding; this version removes the baked-in
 * surface entirely so it composes with the site's existing `.card` class
 * and its own border, radius, padding and elevation.
 *
 * It also writes the CSS custom properties once up front rather than on
 * every pointer move, so the per-move work is two property writes.
 */
export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgb(27 67 50 / 0.10)',
  radius = 190,
  as: Tag = 'div',
  ...rest
}) {
  const ref = useRef(null)

  const handlePointerMove = useCallback(
    (event) => {
      const node = ref.current
      if (!node) return

      // Touch fires pointermove too; a stationary finger should not
      // leave a spotlight parked under it.
      if (event.pointerType === 'touch') return

      const rect = node.getBoundingClientRect()
      node.style.setProperty('--spotlight-x', `${event.clientX - rect.left}px`)
      node.style.setProperty('--spotlight-y', `${event.clientY - rect.top}px`)
    },
    [],
  )

  return (
    <Tag
      ref={ref}
      onPointerMove={handlePointerMove}
      className={`spotlight ${className}`.trim()}
      style={{ '--spotlight-color': spotlightColor, '--spotlight-radius': `${radius}px` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
