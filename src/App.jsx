import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RootLayout } from './layouts/RootLayout'
import { HomePage } from './pages/HomePage'

// Route-level splitting: the home page ships in the main chunk, everything
// else loads on demand.
const CommunityPage = lazy(() => import('./pages/CommunityPage').then((m) => ({ default: m.CommunityPage })))
const InsightsPage = lazy(() => import('./pages/InsightsPage').then((m) => ({ default: m.InsightsPage })))
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const ContactPage = lazy(() => import('./pages/ContactSocial').then((m) => ({ default: m.ContactPage })))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))

/** Matches the shell background so route chunks never flash white-on-white. */
function RouteFallback() {
  return (
    <div style={{ minHeight: '60vh' }} aria-busy="true" aria-live="polite">
      <span className="visually-hidden">Loading page</span>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="insights" element={<InsightsPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
