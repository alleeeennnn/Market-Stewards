import { Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BRAND, COMMUNITY_GROUP, FOOTER_COLUMNS, SOCIAL_LINKS } from '../data/site'
import { BRAND_ICONS } from './BrandIcons'
import { Disclaimer } from './Disclaimer'

const SOCIAL_ICONS = {
  ...BRAND_ICONS,
  telegram: Send,
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="shell footer__top">
        <div className="footer__brand">
          <Link to="/" className="brand brand--logo-only" aria-label={`${BRAND.name} home`}>
            <img
              src={BRAND.logoWhite}
              alt="Market Stewards logo"
              width={320}
              height={62}
              className="brand__mark brand__mark--wordmark brand__mark--inverse"
            />
          </Link>
          <p className="footer__tagline">{BRAND.tagline}</p>
          <p className="footer__desc">{BRAND.summary}</p>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <nav key={column.heading} className="footer__col" aria-label={column.heading}>
            <h2 className="footer__heading">{column.heading}</h2>
            <ul className="footer__list">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="shell" style={{ paddingBottom: 'var(--sp-8)' }}>
        <Disclaimer variant="inverse" />
      </div>

      <div className="shell footer__base">
        <p>
          © {year} {BRAND.name}. All rights reserved.
        </p>
        <p className="cluster cluster--tight">
          {SOCIAL_LINKS.slice(0, 3).map((social) => {
            const Icon = SOCIAL_ICONS[social.icon]
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${BRAND.name} on ${social.label}`}
                className="cluster cluster--tight"
                style={{ color: 'inherit' }}
              >
                {Icon ? <Icon width={15} height={15} /> : null}
                {social.label}
              </a>
            )
          })}
          {COMMUNITY_GROUP.href ? (
            <a
              href={COMMUNITY_GROUP.href}
              target="_blank"
              rel="noreferrer noopener"
              className="cluster cluster--tight"
              style={{ color: 'var(--ms-green-200)' }}
            >
              <Send size={15} aria-hidden="true" />
              Community group
            </a>
          ) : null}
        </p>
      </div>
    </footer>
  )
}
