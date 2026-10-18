/**
 * Live instrument catalogue.
 *
 * Every entry maps to a key-less, CORS-enabled public endpoint. There is no
 * API key in this build and no proxy — each provider below sets
 * `Access-Control-Allow-Origin: *`, so the browser can call them directly.
 *
 * `precision` drives decimal places. Spot FX quotes at 4–5dp, equity indices
 * at 2dp: showing gold to the cent implies a tick that does not exist.
 */

export const SOURCES = {
  GOLD: 'Gold-API (LBMA spot)',
  FX: 'Frankfurter v2 (ECB reference rates)',
  CRYPTO: 'CoinGecko (aggregated spot)',
}

export const INSTRUMENTS = [
  {
    id: 'xauusd',
    symbol: 'XAU/USD',
    short: 'XAUUSD',
    name: 'Gold / US Dollar',
    kind: 'metal',
    source: SOURCES.GOLD,
    precision: 2,
    currency: 'USD',
  },
  {
    id: 'xagusd',
    symbol: 'XAG/USD',
    short: 'XAGUSD',
    name: 'Silver / US Dollar',
    kind: 'metal',
    source: SOURCES.GOLD,
    precision: 3,
    currency: 'USD',
  },
  {
    id: 'eurusd',
    symbol: 'EUR/USD',
    short: 'EURUSD',
    name: 'Euro / US Dollar',
    kind: 'fx',
    source: SOURCES.FX,
    precision: 4,
    currency: 'USD',
  },
  {
    id: 'gbpusd',
    symbol: 'GBP/USD',
    short: 'GBPUSD',
    name: 'British Pound / US Dollar',
    kind: 'fx',
    source: SOURCES.FX,
    precision: 4,
    currency: 'USD',
  },
  {
    id: 'usdjpy',
    symbol: 'USD/JPY',
    short: 'USDJPY',
    name: 'US Dollar / Japanese Yen',
    kind: 'fx',
    source: SOURCES.FX,
    precision: 2,
    currency: 'JPY',
  },
  {
    id: 'usdphp',
    symbol: 'USD/PHP',
    short: 'USDPHP',
    name: 'US Dollar / Philippine Peso',
    kind: 'fx',
    source: SOURCES.FX,
    precision: 2,
    currency: 'PHP',
  },
  {
    id: 'btcusd',
    symbol: 'BTC/USD',
    short: 'BTCUSD',
    name: 'Bitcoin / US Dollar',
    kind: 'crypto',
    source: SOURCES.CRYPTO,
    cgId: 'bitcoin',
    precision: 0,
    currency: 'USD',
  },
  {
    id: 'ethusd',
    symbol: 'ETH/USD',
    short: 'ETHUSD',
    name: 'Ether / US Dollar',
    kind: 'crypto',
    source: SOURCES.CRYPTO,
    cgId: 'ethereum',
    precision: 2,
    currency: 'USD',
  },
]

export const getInstrument = (id) => INSTRUMENTS.find((i) => i.id === id)

/** Instrument used for the hero panel. */
export const HERO_INSTRUMENT = getInstrument('xauusd')

/** Shortlist shown on the Insights page. */
export const WATCHLIST_IDS = [
  'xauusd',
  'xagusd',
  'eurusd',
  'gbpusd',
  'usdjpy',
  'usdphp',
  'btcusd',
  'ethusd',
]

export const KIND_LABEL = {
  metal: 'Precious metals',
  fx: 'FX spot',
  crypto: 'Digital assets',
}

/**
 * Editorial content on the Insights page. Kept separate from the price data
 * because commentary does not become stale every tick.
 */
export const ANALYSES = [
  {
    id: 'an-1',
    title: 'Reading breadth before you read a single chart',
    author: 'Clara Mendoza',
    role: 'Mentor',
    date: '2026-09-28',
    readMinutes: 7,
    tags: ['Market structure', 'Breadth'],
    body: 'A rising index made of two advancing sectors is a thinner signal than it looks. Before loading a chart, count how many sectors participate and how many are declining. Then ask whether the move is led by something that has an obvious reason to reverse. Breadth is context, and context is what keeps a single candle from becoming a decision.',
  },
  {
    id: 'an-2',
    title: 'Why the economic calendar matters more than headlines',
    author: 'Daniel Santiago',
    role: 'Community lead',
    date: '2026-09-26',
    readMinutes: 6,
    tags: ['Macro', 'Risk management'],
    body: 'The number matters less than your exposure into the release. If you are flat going into a CPI print, the headline can teach you something. If you are carrying a full position, the same headline mostly teaches you how your stomach works. Deciding exposure in advance is the whole point of the calendar.',
  },
  {
    id: 'an-3',
    title: 'Gold as a portfolio diversifier, and when that story breaks',
    author: 'Grace Lim',
    role: 'Steward mentor',
    date: '2026-09-24',
    readMinutes: 9,
    tags: ['Macro', 'Risk management'],
    body: 'Gold is often described as a hedge against everything, which is why it is worth asking what actually breaks it: a sustained rise in real rates, a sudden need for cash, or a market that simply decides something else is expensive. Holding a diversifier because it has not failed yet is not a thesis. Know the conditions that would invalidate yours before you rely on it.',
  },
]

/** Illustrative calendar format. Replace with a real economic calendar feed. */
export const ECONOMIC_CALENDAR = [
  { id: 'cal-1', date: '2026-10-01', time: '10:00', title: 'Philippine CPI release', region: 'Philippines', impact: 'high' },
  { id: 'cal-2', date: '2026-10-02', time: '08:30', title: 'US Non-Farm Payrolls', region: 'United States', impact: 'high' },
  { id: 'cal-3', date: '2026-10-05', time: '14:00', title: 'Philippine cash reserve ratio decision', region: 'Philippines', impact: 'medium' },
  { id: 'cal-4', date: '2026-10-08', time: '10:00', title: 'Philippine trade balance', region: 'Philippines', impact: 'medium' },
  { id: 'cal-5', date: '2026-10-09', time: '20:30', title: 'US FOMC minutes', region: 'United States', impact: 'high' },
  { id: 'cal-6', date: '2026-10-13', time: '08:30', title: 'US CPI release', region: 'United States', impact: 'high' },
  { id: 'cal-7', date: '2026-10-15', time: '17:00', title: 'Philippine BSP policy rate decision', region: 'Philippines', impact: 'high' },
  { id: 'cal-8', date: '2026-10-20', time: '10:00', title: 'Philippine GDP growth (Q3)', region: 'Philippines', impact: 'high' },
]

export const IMPACT_LABEL = {
  high: { label: 'High', tone: 'loss' },
  medium: { label: 'Medium', tone: 'warn' },
  low: { label: 'Low', tone: 'info' },
}