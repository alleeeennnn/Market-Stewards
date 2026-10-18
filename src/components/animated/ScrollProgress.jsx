import { motion, useScroll, useSpring } from 'motion/react'

/**
 * Reading-progress bar pinned to the top of the viewport.
 *
 * Written locally: ReactBits had no ScrollProgress component on `main` at
 * the time of extraction. Spring-damped so it settles rather than snapping
 * to a jittery value during fast scrolls.
 */
export function ScrollProgress({ className = '' }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { damping: 30, stiffness: 220, mass: 0.4 })

  return (
    <motion.div
      className={`scroll-progress ${className}`.trim()}
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}
