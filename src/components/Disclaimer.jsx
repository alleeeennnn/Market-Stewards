import { ShieldAlert } from 'lucide-react'
import { DISCLAIMER, SHORT_DISCLAIMER } from '../data/site'

/**
 * The required financial-safety notice.
 *
 * Present on every page: the home page, community, insights, about and
 * contact. `compact` is the footer-scale variant; `inverse` sits on dark
 * surfaces.
 *
 * The former SimulatedDataNotice lived here too and was removed when market
 * figures became live; provenance is now handled by LiveBadge and
 * MarketDataNotice, which name the actual data sources.
 */
export function Disclaimer({ variant = 'full', className = '' }) {
  const isCompact = variant === 'compact'
  const text = isCompact ? SHORT_DISCLAIMER : DISCLAIMER

  return (
    <p className={`disclaimer ${isCompact ? 'disclaimer--compact' : ''} disclaimer--${variant} ${className}`.trim()}>
      <ShieldAlert size={isCompact ? 14 : 16} aria-hidden="true" />
      <span>{text}</span>
    </p>
  )
}