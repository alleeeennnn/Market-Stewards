import { SearchX } from 'lucide-react'
import { Reveal } from './Reveal'

/** Initials avatar. Colour tone varies so the feed does not look monotonous. */
export function Avatar({ name, initials, tone = 0, size = 'md', className = '' }) {
  const label = initials ?? name?.slice(0, 2) ?? '?'
  return (
    <span
      className={`avatar ${size === 'sm' ? 'avatar--sm' : size === 'lg' ? 'avatar--lg' : ''} ${
        tone ? `avatar--alt-${tone}` : ''
      } ${className}`.trim()}
      aria-hidden="true"
    >
      {label}
    </span>
  )
}

/** Generic card shell. */
export function Card({ children, className = '', as: Tag = 'div', interactive = false, ...rest }) {
  return (
    <Tag className={`card ${interactive ? 'card--interactive' : ''} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  )
}

/** Icon + title + body feature item, used across marketing sections. */
export function FeatureList({ items, className = '' }) {
  return (
    <ul className={`feature-list ${className}`.trim()}>
      {items.map((item) => {
        const Icon = item.icon
        return (
          <li key={item.title} className="feature-list__item">
            <span className="feature-list__icon">
              <Icon size={18} aria-hidden="true" />
            </span>
            <div>
              <h3 className="feature-list__title">{item.title}</h3>
              <p className="feature-list__body">{item.body}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

/** Empty state for feeds and filtered lists. */
export function EmptyState({ title, body, action }) {
  return (
    <div className="empty">
      <span className="empty__icon">
        <SearchX size={20} aria-hidden="true" />
      </span>
      <h3 style={{ fontSize: 'var(--fs-md)' }}>{title}</h3>
      <p className="small muted" style={{ maxWidth: '34ch' }}>
        {body}
      </p>
      {action}
    </div>
  )
}

/**
 * Row of filter chips. Selection is a controlled prop so the parent owns
 * the filter state and can persist it to a URL later.
 */
export function FilterChips({ options, value, onChange, label, className = '' }) {
  return (
    <div className={`feed-filters ${className}`.trim()} role="group" aria-label={label}>
      {options.map((option) => {
        const isActive = option.id === value
        return (
          <button
            key={option.id}
            type="button"
            className="chip"
            aria-pressed={isActive}
            onClick={() => onChange(option.id)}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

/** Section wrapper that animates its children in sequence. */
export function RevealList({ items, render, step = 0.07, as: Tag = 'div', className = '', itemClassName = '' }) {
  return (
    <Tag className={className}>
      {items.map((item, index) => {
        const key = item?.id ?? item?.slug ?? index
        return (
          <Reveal key={key} delay={index * step} className={itemClassName}>
            {render(item, index)}
          </Reveal>
        )
      })}
    </Tag>
  )
}
