import { Link } from 'react-router-dom'
import { PageHeader, Section } from '../components/Layout'
import { Button } from '../components/Button'
import { Disclaimer } from '../components/Disclaimer'
import { NAV_LINKS } from '../data/site'

/** One line of orientation per destination, keyed by route. */
const ROUTE_BLURBS = {
  '/': 'Start with the pillars: discipline, purpose, and impact.',
  '/community': 'Discussions, questions, journals, and the guidelines we hold to.',
  '/insights': 'Market overview, watchlist, analysis, and the economic calendar.',
  '/about': 'Our mission, vision, and the four commitments we hold to.',
  '/contact': 'Reach the team, or find us on the community group.',
}

export function NotFoundPage() {
  return (
    <>
      <PageHeader
        eyebrow="Error 404"
        title="That page isn’t part of Market Stewards."
        body="The address you followed does not exist. Here is where most people were heading."
      />

      <Section>
        <ul className="grid grid--3">
          {NAV_LINKS.map((link) => (
            <li key={link.to} className="card card--interactive card--flat">
              <h2 style={{ fontSize: 'var(--fs-md)' }}>{link.label}</h2>
              <p className="card__body">{ROUTE_BLURBS[link.to]}</p>
              <Link to={link.to} className="link">
                Go to {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="cluster" style={{ marginTop: 'var(--sp-10)' }}>
          <Button to="/" variant="primary">
            Back to home
          </Button>
          <Button to="/contact" variant="ghost">
            Report a broken link
          </Button>
        </div>

        <Disclaimer className="footnote" />
      </Section>
    </>
  )
}