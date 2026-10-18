import { useEffect, useRef, useState } from 'react'

/**
 * Counts from 0 to `target` once the element scrolls into view.
 *
 * Honours prefers-reduced-motion by rendering the final value immediately.
 * Uses requestAnimationFrame rather than a timer so the animation stays
 * aligned with the frame budget on slower devices.
 */
export function useCountUp(target, { duration = 1400, decimals = 0, start = true } = {}) {
  const [value, setValue] = useState(start ? 0 : target)
  const ref = useRef(null)
  const frame = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return undefined
    }

    if (!('IntersectionObserver' in window)) {
      setValue(target)
      return undefined
    }

    let started = false

    const run = () => {
      if (started) return
      started = true
      const t0 = performance.now()

      const tick = (now) => {
        const progress = Math.min((now - t0) / duration, 1)
        // easeOutExpo: fast start, gentle settle.
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
        setValue(Number((target * eased).toFixed(decimals)))
        if (progress < 1) frame.current = requestAnimationFrame(tick)
      }

      frame.current = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            run()
            observer.disconnect()
          }
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(element)
    return () => {
      observer.disconnect()
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [target, duration, decimals, start])

  return [value, ref]
}
