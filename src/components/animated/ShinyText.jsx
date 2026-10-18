import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'motion/react'

/**
 * Travelling specular highlight across text.
 *
 * Adapted from ReactBits "ShinyText" (github.com/DavidHDev/react-bits, MIT).
 * Upstream renders the shine on `useAnimationFrame` for every instance; this
 * version pauses when the element is off screen or the tab is hidden, which
 * matters when several sit on one page.
 *
 * Used for the brand tagline only. A shine across body copy reads as a
 * rendering glitch, so keep it to one or two short strings per page.
 */
export function ShinyText({
  text,
  disabled = false,
  speed = 3.4,
  className = '',
  color = 'var(--ms-green-700)',
  shineColor = 'var(--ms-green-400)',
  spread = 110,
  pauseOnHover = false,
  yoyo = true,
  delay = 0,
}) {
  const [isPaused, setIsPaused] = useState(disabled)
  const [isVisible, setIsVisible] = useState(false)
  const progress = useMotionValue(0)
  const elapsedRef = useRef(0)
  const lastTimeRef = useRef(null)
  const containerRef = useRef(null)

  const animationDuration = speed * 1000
  const delayDuration = delay * 1000

  useEffect(() => {
    const node = containerRef.current
    if (!node) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsPaused(true)
      progress.set(0)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [progress])

  useAnimationFrame((time) => {
    if (disabled || isPaused || !isVisible || document.hidden) {
      lastTimeRef.current = null
      return
    }

    if (lastTimeRef.current === null) {
      lastTimeRef.current = time
      return
    }

    elapsedRef.current += time - lastTimeRef.current
    lastTimeRef.current = time

    const cycle = animationDuration + delayDuration
    const fullCycle = yoyo ? cycle * 2 : cycle
    const t = elapsedRef.current % fullCycle

    let p
    if (!yoyo) {
      p = t < animationDuration ? (t / animationDuration) * 100 : 0
    } else if (t < animationDuration) {
      p = (t / animationDuration) * 100
    } else if (t < cycle) {
      p = 100
    } else if (t < cycle + animationDuration) {
      p = 100 - ((t - cycle) / animationDuration) * 100
    } else {
      p = 0
    }

    progress.set(p)
  })

  // Sweeps right-to-left: 150% -> -50%.
  const backgroundPosition = useTransform(progress, (p) => `${150 - p * 2}% center`)

  const handleEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true)
  }, [pauseOnHover])

  const handleLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false)
  }, [pauseOnHover])

  return (
    <motion.span
      ref={containerRef}
      className={`shiny-text ${className}`.trim()}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 38%, ${shineColor} 50%, ${color} 62%, ${color} 100%)`,
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundPosition,
      }}
    >
      {text}
    </motion.span>
  )
}
