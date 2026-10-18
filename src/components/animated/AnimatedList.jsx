import { motion, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

/**
 * Staggered entrance for a list of items.
 *
 * Adapted from ReactBits "AnimatedList" (github.com/DavidHDev/react-bits,
 * MIT). Upstream rebuilds the list on every data change and reflows existing
 * children; this version only animates on first view and leaves re-renders
 * to React, which is all the feed and event lists need.
 */
export function AnimatedList({
  children,
  className = '',
  itemClassName = '',
  stagger = 0.07,
  duration = 0.45,
  as: Tag = 'ul',
  itemAs: ItemTag = 'li',
  startDelay = 0,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const items = Array.isArray(children) ? children : [children]

  return (
    <Tag ref={ref} className={className}>
      {items.map((child, index) => {
        const key = child?.key ?? index
        if (reduce) {
          return (
            <ItemTag key={key} className={itemClassName}>
              {child}
            </ItemTag>
          )
        }
        return (
          <ItemTag key={key} className={itemClassName}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{
                duration,
                delay: startDelay + index * stagger,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {child}
            </motion.div>
          </ItemTag>
        )
      })}
    </Tag>
  )
}
