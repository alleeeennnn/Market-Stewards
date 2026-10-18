import { motion } from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'

/**
 * Word-by-word blur reveal.
 *
 * Adapted from ReactBits "BlurText" (github.com/DavidHDev/react-bits, MIT).
 * Defaults are retuned for the brand: the upstream travel is 50px, which is
 * far too much for a 56px headline and reads as a swoosh rather than a fade.
 */
export function BlurText({
  text = '',
  delay = 90,
  className = '',
  animateBy = 'words',
  direction = 'bottom',
  threshold = 0.15,
  rootMargin = '0px',
  stepDuration = 0.28,
  as: Tag = 'span',
}) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('')
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return undefined

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  const from = useMemo(
    () => ({ filter: 'blur(9px)', opacity: 0, y: direction === 'top' ? -18 : 18 }),
    [direction],
  )
  const to = useMemo(
    () => [
      { filter: 'blur(4px)', opacity: 0.5, y: direction === 'top' ? 3 : -3 },
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ],
    [direction],
  )

  const times = [0, 0.6, 1]
  const totalDuration = stepDuration * (times.length - 1)

  return (
    <Tag ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {elements.map((segment, index) => (
        <motion.span
          key={`${segment}-${index}`}
          style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
          initial={from}
          animate={inView ? to : from}
          transition={{
            duration: totalDuration,
            times,
            delay: (index * delay) / 1000,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {segment === ' ' ? '\u00A0' : segment}
          {animateBy === 'words' && index < elements.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </Tag>
  )
}
