import { Link } from 'react-router-dom'

/**
 * Polymorphic button.
 *
 * Renders an <a> when given `to` or `href`, a <button> otherwise, so CTAs
 * keep correct semantics and native keyboard behaviour without duplicating
 * markup at the call site.
 */
export function Button({
  children,
  to,
  href,
  variant = 'primary',
  size,
  block = false,
  className = '',
  icon: Icon,
  iconPosition = 'left',
  ...rest
}) {
  const classes = [
    'btn',
    `btn--${variant}`,
    size ? `btn--${size}` : '',
    block ? 'btn--block' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {Icon && iconPosition === 'left' ? <Icon size={16} className="btn__icon" aria-hidden="true" /> : null}
      {children}
      {Icon && iconPosition === 'right' ? <Icon size={16} className="btn__icon" aria-hidden="true" /> : null}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    const external = href.startsWith('http')
    return (
      <a href={href} className={classes} {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}
