/**
 * Continuous horizontal ticker.
 *
 * Adapted from Magic UI "Marquee" (magicuidesign/magicui, MIT).
 * Upstream expects Tailwind's `animate-marquee` theme entry; the keyframes
 * live in animated.css here instead.
 *
 * The content is duplicated once so the loop has no visible seam. The
 * duplicate is aria-hidden so screen readers do not read everything twice.
 */
export function Marquee({
  children,
  className = '',
  reverse = false,
  pauseOnHover = true,
  durationSeconds = 42,
}) {
  return (
    <div className={`marquee ${className}`.trim()} data-pause={pauseOnHover ? 'true' : 'false'}>
      <div
        className="marquee__track"
        style={{
          '--marquee-duration': `${durationSeconds}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        <div className="marquee__group">{children}</div>
        <div className="marquee__group" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}