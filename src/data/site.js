/**
 * Brand constants and site-wide navigation.
 * Single source of truth for identity, routing and footer content.
 */

export const BRAND = {
  name: 'Market Stewards',
  wordmark: 'Market Stewards',
  tagline: 'Discipline. Purpose. Impact.',
  mission:
    'To teach trading with integrity, biblical stewardship, and life-changing financial principles — empowering people to manage God’s blessings responsibly and generously.',
  vision:
    'To raise financially wise, disciplined, and purpose-driven Filipino traders who honor God with their resources and transform their families, communities, and future generations.',
  summary:
    'Market Stewards helps people understand finance, trading, and wealth-building through structured education and consultancy.',
  logo: '/Market-Stewards/logo.svg',
  logoWhite: '/Market-Stewards/logo-white.svg',
  email: 'hello@marketstewards.ph',
  supportEmail: 'support@marketstewards.ph',
  location: 'Makati City, Metro Manila, Philippines',
  locale: 'en-PH',
  currency: 'PHP',
}

/** The exact wording used wherever a legal-style notice appears. */
export const DISCLAIMER =
  'Market Stewards provides educational and community resources and does not guarantee trading results. Trading involves risk, and past performance does not guarantee future results.'

export const SHORT_DISCLAIMER =
  'Educational content only. Not investment advice. Trading involves risk of loss.'

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Community', to: '/community' },
  { label: 'Insights', to: '/insights' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

/** Secondary routes surfaced in the footer and secondary call to actions. */
export const SECONDARY_LINKS = [
  { label: 'Community guidelines', to: '/community#guidelines' },
  { label: 'Market insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
]

export const FOOTER_COLUMNS = [
  {
    heading: 'Community',
    links: [
      { label: 'Community feed', to: '/community' },
      { label: 'Community guidelines', to: '/community#guidelines' },
      { label: 'How members join', to: '/community#join-title' },
      { label: 'What we ask of you', to: '/community#expect-title' },
    ],
  },
  {
    heading: 'Insights',
    links: [
      { label: 'Market overview', to: '/insights' },
      { label: 'Watchlist', to: '/insights#watchlist-title' },
      { label: 'Economic calendar', to: '/insights#overview-title' },
      { label: 'Educational analysis', to: '/insights#overview-title' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Market Stewards', to: '/about' },
      { label: 'Our mission', to: '/about#mission' },
      { label: 'Our values', to: '/about#values-title' },
      { label: 'Contact', to: '/contact' },
    ],
  },
]

/**
 * The community message group.
 *
 * This is the single channel for announcements — every session, workshop,
 * circle, and signal is posted here first. The link is not final yet, so
 * `href` is null and the UI renders a clearly-marked pending state rather
 * than a dead link. Drop the real URL into `href` and it lights up.
 */
export const COMMUNITY_GROUP = {
  name: 'Market Stewards Community Group',
  platform: 'Discord',
  handle: 'market-stewards',
  href: null,
  description:
    'Every announcement, workshop, review circle, and signal is posted here first. If you are in the community, this is the channel.',
}

/** Social and community destinations — the real Market Stewards profiles. */
export const SOCIAL_LINKS = [
  { label: 'Facebook', handle: 'Market Stewards', href: 'https://www.facebook.com/share/14oZzPwvwV4/?mibextid=wwXIfr', icon: 'facebook' },
  { label: 'Instagram', handle: '@marketstewards.ph', href: 'https://www.instagram.com/marketstewards.ph?igsh=Y2Z1NGNyOXBiZjVk', icon: 'instagram' },
  { label: 'TikTok', handle: '@market.stewards', href: 'https://www.tiktok.com/@market.stewards?_r=1&_t=ZS-97rXKXbMS2e', icon: 'tiktok' },
]

/** Value propositions used on the home page and membership page. */
export const PILLARS = [
  {
    key: 'discipline',
    title: 'Discipline',
    body: 'Develop consistency, risk management, and emotional control.',
    detail:
      'A written plan, followed every session, beats a clever strategy followed only when the market feels right.',
  },
  {
    key: 'purpose',
    title: 'Purpose',
    body: 'Understand why you trade and build financial habits aligned with your values.',
    detail:
      'Money is a tool, not an identity. We help you decide what it is for before you decide how to grow it.',
  },
  {
    key: 'impact',
    title: 'Impact',
    body: 'Use financial wisdom to create meaningful long-term impact.',
    detail:
      'Wealth measured only by a balance sheet is incomplete. We talk about families, communities, and legacy.',
  },
]

/**
 * Provenance for market figures.
 *
 * Prices on this site are fetched live from public providers at runtime —
 * see lib/marketApi.js for the endpoints and their CORS posture. Nothing
 * here is sampled or pre-baked. The remaining caveats are about freshness,
 * not authenticity, and are stated wherever a figure appears.
 */
export const DATA_PROVENANCE = {
  isLive: true,
  label: 'Live market data',
  note: 'Prices are fetched directly from public market data providers and refreshed every 30 seconds. FX reference rates are published by the ECB once per working day. Live prices are provided for education only and are not investment advice.',
}
