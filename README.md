# Market Stewards

A market research site and community hub. React + Vite, plain JavaScript, hand-written CSS.

## Run it

```bash
npm install
npm run dev
```

If `npm` is not on your PATH (Node lives in `C:\Program Files\nodejs` and was not added during
install), double-click `dev.cmd` instead — it puts Node on the PATH and starts the same server.

```bash
npm run build     # production build into dist/
npm run preview   # serve the production build
npm run lint      # oxlint
```

## Live market data

The site ships working without an API key: every price is generated locally and the badge in the
header reads **DEMO DATA** instead of **LIVE**, so generated numbers are never passed off as real
ones.

To get real quotes:

1. Register for a free key at <https://finnhub.io> (no card required, 60 calls/minute).
2. Copy `.env.example` to `.env`.
3. Paste the key: `VITE_FINNHUB_TOKEN=your_key_here`
4. Restart the dev server.

If the key is missing, wrong, or rejected, the site falls back to generated data rather than
breaking. Rate limiting keeps the last good quotes on screen and shows **DELAYED**.

> `VITE_` variables are inlined into the client bundle, so this key is public. That is fine for a
> free-tier key. Never put a paid Finnhub key in here.

## Editing the content

**All copy lives in section 1 of `src/App.jsx`**, at the top of the file — `SITE`, `NAV`, `HERO`,
`STATS`, `MISSION`, `VISION`, `VALUES`, `CEO`, `TEAM`, `COMMUNITY`, `CONTACT`, `WATCHLIST`. Search
for `TODO` to find every placeholder. Nothing else needs to change.

## Structure of `src/App.jsx`

| Section | Contents |
| --- | --- |
| 1. Content | All copy and the tracked symbol list |
| 2. Formatting | Price, percent, and age formatters |
| 3. Market data | Finnhub client, mock generator, `useQuotes` / `useCandles` |
| 4. UI kit | `Reveal`, `Section`, `SectionHeading`, `PersonCard` |
| 5. Market UI | `TickerTape`, `MarketStatus`, `QuoteGrid`, `PriceCell`, `MarketChart` |
| 6. Layout | `Navbar`, `Footer`, `ScrollToTop`, `PageTransition` |
| 7. Pages | `HomePage`, `AboutPageImpl`, `MarketPageImpl`, `ContactPageImpl` |
| 8. App | Routes |

Styles: `src/index.css` holds the design tokens and base type, `src/App.css` holds every component
style. The palette is deep green `#1b4332`, silver `#bdbbbb`, and white `#ffffff` on a near-black
ground. Montserrat for text, IBM Plex Mono for all prices and figures.

## Routes

- `/` — hero, stats, mission, vision, CEO, live market preview, community, CTA
- `/about` — mission, vision, values, CEO and team, community
- `/market` — candlestick chart with range selector, full quote grid
- `/contact` — email, office, social links (display only, no form)

## Logo

`public/logo.svg` is a placeholder. Replace that file with your real logo — the same filename keeps
every reference working. `public/favicon.svg` is the browser tab icon.

## Notes

- The chart library is imported dynamically, so it only loads on `/market` and the initial bundle
  stays around 420 kB.
- All animation collapses to no-ops under `prefers-reduced-motion: reduce`.
- The ticker tape is `aria-hidden` with a static duplicate exposed to screen readers, so assistive
  tech reads the prices once instead of an endless marquee.
- Nothing here is investment advice.
