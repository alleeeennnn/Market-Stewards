/**
 * Luxury primitives for the members-club theme.
 * ConciergeCard, GoldRule, MemberSeal, QuoteMark — small, reused,
 * no new dependencies.
 */

export function GoldRule({ className = '' }) {
  return <span className={`gold-rule ${className}`.trim()} aria-hidden="true" />
}

export function MemberSeal({ children = 'Members only', className = '' }) {
  return (
    <span className={`member-seal ${className}`.trim()}>
      <span className="member-seal__dot" aria-hidden="true" />
      {children}
    </span>
  )
}

/** Drop-cap style serif quote mark used above testimonials / statements. */
export function QuoteMark({ className = '' }) {
  return (
    <span className={`quote-mark ${className}`.trim()} aria-hidden="true">
      &ldquo;
    </span>
  )
}

/**
 * ConciergeCard: a bordered noir panel with a champagne hairline on top.
 * Use for membership tiers, circles, sessions — the "private desk" feel.
 */
export function ConciergeCard({ eyebrow, title, body, meta, action, className = '', children }) {
  return (
    <article className={`concierge ${className}`.trim()}>
      {eyebrow ? <p className="eyebrow eyebrow--plain concierge__eyebrow">{eyebrow}</p> : null}
      {title ? <h3 className="concierge__title">{title}</h3> : null}
      {body ? <p className="concierge__body">{body}</p> : null}
      {children}
      {(meta || action) && (
        <div className="concierge__foot">
          {meta ? <span className="concierge__meta">{meta}</span> : null}
          {action}
        </div>
      )}
    </article>
  )
}
