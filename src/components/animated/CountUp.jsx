import { useInView, useMotionValue, useSpring } from 'motion/react'
import { useCallback, useEffect, useRef } from 'react'

/**
 * Spring-driven count-up.
 *
 * Adapted from ReactBits "CountUp" (github.com/DavidHDev/react-bits, MIT).
 * The spring settles rather than stopping dead, which reads as more
 * deliberate. Locale is pinned to en-PH here because the site formats its
 * figures for the Philippines.
 */
export function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  locale = 'en-PH',
  decimals,
  prefix = '',
  suffix = '',
}) {
  const ref = useRef(null)
  const motionValue = useMotionValue(direction === 'down' ? to : from)

  const damping = 20 + 40 * (1 / duration)
  const stiffness = 100 * (1 / duration)
  const springValue = useSpring(motionValue, { damping, stiffness })

  const isInView = useInView(ref, { once: true, margin: '0px' })

  const resolvedDecimals =
    decimals ??
    Math.max(
      (String(from).split('.')[1] ?? '').length,
      (String(to).split('.')[1] ?? '').length,
    )

  const format = useCallback(
    (value) => {
      const safe = Number.isFinite(value) ? value : from
      return (
        prefix +
        new Intl.NumberFormat(locale, {
          minimumFractionDigits: resolvedDecimals,
          maximumFractionDigits: resolvedDecimals,
        }).format(safe) +
        suffix
      )
    },
    [locale, resolvedDecimals, prefix, suffix, from],
  )

  useEffect(() => {
    if (ref.current) ref.current.textContent = format(direction === 'down' ? to : from)
  }, [from, to, direction, format])

  useEffect(() => {
    if (!isInView) return undefined
    const startTimer = setTimeout(() => motionValue.set(direction === 'down' ? from : to), delay * 1000)
    return () => clearTimeout(startTimer)
  }, [isInView, delay, motionValue, direction, from, to])

  useEffect(
    () =>
      springValue.on('change', (latest) => {
        if (ref.current) ref.current.textContent = format(latest)
      }),
    [springValue, format],
  )

  return <span className={className} ref={ref} />
}
