/**
 * Market data client.
 *
 * Three key-less public providers, each returning `Access-Control-Allow-Origin: *`
 * so the browser can call them directly with no proxy and no API key:
 *
 *   metals  api.gold-api.com        — LBMA spot
 *   FX      api.frankfurter.app     — ECB reference rates, published once daily
 *   crypto  api.coingecko.com       — aggregated spot
 *
 * Every function resolves to normalised numbers and throws on failure, so the
 * caller can tell "no data" apart from "stale data". Nothing here invents a
 * value: if a request fails, the UI shows the last good quote with its
 * timestamp, or an offline state. It never substitutes a placeholder.
 */

const GOLD_BASE = 'https://api.gold-api.com/price'
/**
 * api.frankfurter.app is deprecated; its own `deprecation` and `link` headers
 * point at the v2 successor on frankfurter.dev, which is what this uses.
 * The v2 endpoint returns a flat array of every quote for the base currency
 * and does not support a `symbols` filter.
 */
const FX_BASE = 'https://api.frankfurter.dev/v2/rates'
const COINGECKO_BASE = 'https://api.coingecko.com/api/v3'
const FINNHUB_BASE = 'https://finnhub.io/api/v1'
const FINNHUB_TOKEN = (import.meta.env?.VITE_FINNHUB_TOKEN ?? '').trim()

const TIMEOUT_MS = 8000

/** fetch + timeout + JSON, with an explicit error on either failure mode. */
async function getJSON(url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const response = await fetch(url, { signal: controller.signal })
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
    return await response.json()
  } finally {
    clearTimeout(timer)
  }
}

/** Gold and silver spot. Two tiny requests, run concurrently. */
export async function fetchMetals() {
  const [gold, silver] = await Promise.all([
    getJSON(`${GOLD_BASE}/XAU`),
    getJSON(`${GOLD_BASE}/XAG`),
  ])

  return {
    xauusd: {
      price: Number(gold.price),
      providerTime: gold.updatedAt ?? null,
    },
    xagusd: {
      price: Number(silver.price),
      providerTime: silver.updatedAt ?? null,
    },
  }
}

/**
 * FX spot against USD, from ECB reference rates.
 *
 * Published once per working day at roughly 16:00 CET, so these do not move
 * intraday. The UI labels them as reference rates rather than implying a
 * tick-by-tick feed.
 *
 * The endpoint returns "1 USD = N foreign", so USD/JPY and USD/PHP map
 * directly while EUR/USD and GBP/USD are reciprocals.
 */
export async function fetchFx() {
  const rows = await getJSON(`${FX_BASE}?base=USD`)

  const byQuote = Object.fromEntries(rows.map((row) => [row.quote, { rate: Number(row.rate), date: row.date }]))
  const need = ['EUR', 'GBP', 'JPY', 'PHP']

  for (const code of need) {
    if (!byQuote[code]?.rate) throw new Error(`missing FX quote: ${code}`)
  }

  return {
    eurusd: { price: 1 / byQuote.EUR.rate, providerTime: byQuote.EUR.date },
    gbpusd: { price: 1 / byQuote.GBP.rate, providerTime: byQuote.GBP.date },
    usdjpy: { price: byQuote.JPY.rate, providerTime: byQuote.JPY.date },
    usdphp: { price: byQuote.PHP.rate, providerTime: byQuote.PHP.date },
  }
}

/** Crypto spot. */
export async function fetchCrypto() {
  const ids = 'bitcoin,ethereum'
  const data = await getJSON(`${COINGECKO_BASE}/simple/price?ids=${ids}&vs_currencies=usd`)

  return {
    btcusd: { price: Number(data.bitcoin.usd), providerTime: null },
    ethusd: { price: Number(data.ethereum.usd), providerTime: null },
  }
}

/**
 * Optional Finnhub upgrade path.
 * Only used when VITE_FINNHUB_TOKEN is set. Finnhub spot crypto
 * complements the key-less metals/FX/crypto base — it never replaces it,
 * so a missing or invalid key degrades silently to the free providers.
 * (Free-tier keys cover Binance spot only; OANDA spot needs a paid plan.)
 */
export async function fetchFinnhubSpot() {
  if (!FINNHUB_TOKEN) return {}

  // Free-tier Finnhub keys do not include OANDA spot (OANDA:XAU_USD,
  // OANDA:XAG_USD and OANDA:EUR_USD all return 403 on the free tier), so
  // only the Binance BTC spot is requested here. Metals and FX keep coming
  // from the key-less Gold-API and Frankfurter base. Re-add the OANDA
  // symbols if this key is ever upgraded to a paid Finnhub plan.
  const symbols = ['BINANCE:BTCUSDT']
  const settled = await Promise.allSettled(
    symbols.map((symbol) => getJSON(`${FINNHUB_BASE}/quote?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_TOKEN}`)),
  )

  const [btc] = settled.map((result) => (result.status === 'fulfilled' ? result.value : null))
  const quotes = {}

  if (Number.isFinite(btc?.c) && btc.c > 0) quotes.btcusd = { price: Number(btc.c), providerTime: btc.t ? btc.t * 1000 : null, source: 'Finnhub (Binance spot)' }

  return quotes
}

/** Whether the optional keyed upgrade is active. */
export function hasFinnhubToken() {
  return Boolean(FINNHUB_TOKEN)
}

/**
 * Recent history for one crypto instrument.
 * Returns `[{ t: epochMs, p: price }]` ordered oldest → newest.
 *
 * There is no key-less history source for metals or FX here: Stooq serves
 * CSV without CORS headers, so a browser cannot read it. Metal and FX charts
 * are therefore built from samples collected while the page is open, and
 * labelled as such — see useLiveMarket.
 */
export async function fetchCryptoHistory(coinGeckoId, days = 30) {
  const data = await getJSON(
    `${COINGECKO_BASE}/coins/${coinGeckoId}/market_chart?vs_currency=usd&days=${days}`,
  )

  return data.prices.map(([t, p]) => ({ t, p: Number(p) }))
}

/** Fetches every spot source, tolerating individual failures. */
export async function fetchAllSpot() {
  const settled = await Promise.allSettled([fetchMetals(), fetchFx(), fetchCrypto(), fetchFinnhubSpot()])

  const merged = {}
  let anyFailed = false

  for (const result of settled) {
    if (result.status === 'fulfilled') {
      Object.assign(merged, result.value)
    } else {
      anyFailed = true
    }
  }

  return { quotes: merged, partial: anyFailed && Object.keys(merged).length > 0, upgraded: hasFinnhubToken() && Object.keys(merged).length > 0 }
}