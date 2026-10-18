import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { X } from 'lucide-react'
import { BRAND, NAV_LINKS } from '../data/site'

/**
 * Primary navigation.
 *
 * Desktop shows a full link row plus the join CTA. Below 64rem the row
 * collapses to a full-height drawer. The drawer locks body scroll while
 * open and closes on route change.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Any navigation dismisses the drawer.
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''}`.trim()}>
        <div className="shell nav__inner">
          <Link to="/" className="brand brand--logo-only" aria-label={`${BRAND.name} home`}>
            <img
              src={BRAND.logo}
              alt="Market Stewards logo"
              width={320}
              height={64}
              className="brand__mark brand__mark--wordmark"
            />
          </Link>

          <nav className="nav__links" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`.trim()}
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <motion.span
                      className="nav__underline"
                      aria-hidden="true"
                      initial={false}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{ originX: 0 }}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Only the join CTA lives here. Adding a text link pushed the
              row past the shell width and overflowed the page. */}
          <div className="nav__actions">
            <Link to="/community" className="btn btn--primary btn--sm">
              Join the Community
            </Link>
          </div>

          <button
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
            {open ? (
              <X size={20} aria-hidden="true" />
            ) : (
              <span className="burger" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            )}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-drawer"
            className="drawer"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Mobile">
              <ul className="drawer__list">
                {NAV_LINKS.map((link, index) => (
                  <motion.li
                    key={link.to}
                    initial={reduce ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + index * 0.035, duration: 0.26 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      className={({ isActive }) => `drawer__link ${isActive ? 'is-active' : ''}`.trim()}
                    >
                      {link.label}
                    </NavLink>
                  </motion.li>
                ))}
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) => `drawer__link ${isActive ? 'is-active' : ''}`.trim()}
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) => `drawer__link ${isActive ? 'is-active' : ''}`.trim()}
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </nav>

            <div className="drawer__actions">
              <Link to="/community" className="btn btn--primary btn--block btn--lg">
                Join the Community
              </Link>
              <Link to="/insights" className="btn btn--ghost btn--block">
                Market insights
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
