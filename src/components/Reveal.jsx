import { motion, useReducedMotion } from 'motion/react'

/**
 * Scroll-triggered entrance.
 *
 * Restrained by design: 14px of travel, 500ms, fires once. Anything larger
 * reads as a slide rather than a fade and starts to feel like a template.
 * Under prefers-reduced-motion the element renders in its final position.
 *
 * For staggering a list, use RevealList from ./Primitives — it handles the
 * index-to-delay mapping and keying for you.
 */
export function Reveal({ children, as = 'div', delay = 0, distance = 14, duration = 0.5, className = '', ...rest }) {
  const reduce = useReducedMotion()

  if (reduce) {
    const Plain = as
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    )
  }

  const Component = motion[as] ?? motion.div

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-72px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Component>
  )
}
