import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal } from './Reveal'

/** Standard page section with the shared gutter and rhythm. */
export function Section({ children, id, tone = 'base', tight = false, bordered = false, labelledBy, className = '' }) {
  const classes = [
    'section',
    tone !== 'base' ? `section--${tone}` : '',
    tight ? 'section--tight' : '',
    bordered ? 'section--bordered' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section id={id} className={classes} aria-labelledby={labelledBy}>
      <div className="shell">{children}</div>
    </section>
  )
}

/**
 * Section heading block. `aside` slots a CTA or filter row on the right,
 * collapsing underneath the copy on narrow screens.
 */
export function SectionHeading({ eyebrow, title, body, aside, headingId, stack = false, className = '' }) {
  return (
    <div className={`section__head ${stack ? 'section__head--stack' : ''} ${className}`.trim()}>
      <div className="section__head-text">
        {eyebrow ? (
          <Reveal as="p" className="eyebrow" distance={8} duration={0.4}>
            {eyebrow}
          </Reveal>
        ) : null}
        <Reveal delay={0.05}>
          <h2 id={headingId}>{title}</h2>
        </Reveal>
        {body ? (
          <Reveal delay={0.1}>
            <p className="lede">{body}</p>
          </Reveal>
        ) : null}
      </div>
      {aside ? (
        <Reveal className="cluster" delay={0.14}>
          {aside}
        </Reveal>
      ) : null}
    </div>
  )
}

/** Title block that opens an inner page. */
export function PageHeader({ eyebrow, title, body, meta, actions, children }) {
  return (
    <div className="page-head">
      <div className="shell">
        <div className="page-head__inner">
          {eyebrow ? (
            <Reveal as="p" className="eyebrow" distance={8} duration={0.4}>
              {eyebrow}
            </Reveal>
          ) : null}
          <Reveal delay={0.05}>
            <h1 className="page-head__title">{title}</h1>
          </Reveal>
          {body ? (
            <Reveal delay={0.1}>
              <p className="lede">{body}</p>
            </Reveal>
          ) : null}
          {meta ? (
            <Reveal as="div" className="page-head__meta" delay={0.14}>
              {meta}
            </Reveal>
          ) : null}
          {actions ? (
            <Reveal className="cluster" delay={0.18}>
              {actions}
            </Reveal>
          ) : null}
          {children}
        </div>
      </div>
    </div>
  )
}

/** Breadcrumb trail. The final item is the current page and is not a link. */
export function Crumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="crumbs">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.label} className="cluster cluster--tight">
              {item.to && !isLast ? (
                <Link to={item.to}>{item.label}</Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined}>{item.label}</span>
              )}
              {isLast ? null : <ChevronRight size={12} aria-hidden="true" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
