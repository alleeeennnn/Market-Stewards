import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { ScrollProgress } from '../components/animated/ScrollProgress'
import { MarketTape } from '../components/animated/MarketTape'

/** Resets scroll on route change, but still honours in-page hash links. */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}

/**
 * Cross-fades between routes.
 *
 * Exit is deliberately faster than entrance so back/forward navigation
 * feels responsive rather than sluggish. Disabled entirely under
 * prefers-reduced-motion.
 */
function RouteTransition({ children }) {
  const { pathname } = useLocation()
  const reduce = useReducedMotion()

  if (reduce) {
    return <main id="main">{children}</main>
  }

  return (
    <main id="main">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.24, ease: [0.4, 0, 0.2, 1] } }}
          exit={{ opacity: 0, y: -4, transition: { duration: 0.14, ease: [0.4, 0, 1, 1] } }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </main>
  )
}

/** Chrome shared by every marketing and application page. */
export function RootLayout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <MarketTape />
      <RouteTransition>
        <Outlet />
      </RouteTransition>
      <Footer />
    </>
  )
}
