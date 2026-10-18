import { Clock, MessageCircle, Radio } from 'lucide-react'
import { COMMUNITY_GROUP, SOCIAL_LINKS } from '../data/site'
import { BRAND_ICONS } from './BrandIcons'
import { Button } from './Button'

const ICONS = { ...BRAND_ICONS }

/**
 * The announcement channel notice.
 *
 * Events are announced in the community message group, so this block is
 * repeated on the events page, the community page, and the contact page
 * rather than stated once. While `COMMUNITY_GROUP.href` is null the button
 * is disabled and labelled as pending, so we never render a dead link.
 */
export function GroupAnnouncement({ title, body, className = '' }) {
  const ready = Boolean(COMMUNITY_GROUP.href)

  return (
    <div className={`group-notice ${className}`.trim()}>
      <span className="group-notice__icon" aria-hidden="true">
        <MessageCircle size={20} />
      </span>

      <div className="group-notice__body">
        <p className="group-notice__label">
          <Radio size={12} aria-hidden="true" />
          Announcements
        </p>
        <h3 className="group-notice__title">{title ?? `Everything is announced in the ${COMMUNITY_GROUP.name}`}</h3>
        <p className="group-notice__text">{body ?? COMMUNITY_GROUP.description}</p>
        <p className="group-notice__meta">
          {ready ? (
            <span>Available to members on {COMMUNITY_GROUP.platform}.</span>
          ) : (
            <span className="badge badge--warn">
              <Clock size={11} aria-hidden="true" />
              Invite link coming soon
            </span>
          )}
        </p>
      </div>

      <div className="group-notice__action">
        {ready ? (
          <Button href={COMMUNITY_GROUP.href} variant="inverse" size="sm" iconPosition="right">
            Open the group
          </Button>
        ) : (
          /* outline variant, not quiet: this block sits on the dark
             surface, where a light grey fill would glare. */
          <Button variant="outline-inverse" size="sm" disabled aria-describedby="group-pending-note">
            Open the group
          </Button>
        )}
        <p className="group-notice__hint" id="group-pending-note">
          {ready ? 'Opens in a new tab.' : 'Link will be added as soon as it is available.'}
        </p>
      </div>
    </div>
  )
}

/** Social row. Placeholder profiles are marked as such rather than linked silently. */
export function SocialRow({ title = 'Find the community', description, className = '' }) {
  return (
    <div className={`social-block ${className}`.trim()}>
      {title ? <h3 className="social-block__title">{title}</h3> : null}
      {description ? <p className="social-block__desc">{description}</p> : null}

      <ul className="social-row">
        {SOCIAL_LINKS.map((social) => {
          const Icon = ICONS[social.icon]
          return (
            <li key={social.label}>
              <a
                className="social-link"
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Market Stewards on ${social.label}`}
              >
                {Icon ? <Icon width={15} height={15} /> : null}
                <span className="social-link__label">{social.label}</span>
                <span className="social-link__handle">{social.handle}</span>
              </a>
            </li>
          )
        })}
      </ul>

      <p className="social-block__note">
        Follow the real community — new posts, session clips, and announcements.
      </p>
    </div>
  )
}
