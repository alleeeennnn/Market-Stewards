/**
 * Brand glyphs for social destinations.
 *
 * lucide-react v1 removed its brand icon set, which is the right call on
 * their part. These are vendored inline rather than hot-linked so there is
 * no third-party request and no dependency on a CDN staying up.
 *
 * Replace with your official brand assets before launch if your legal team
 * requires the exact current glyph set — the official usage guidelines are
 * linked in each definition.
 */

const base = {
  width: 15,
  height: 15,
  viewBox: '0 0 24 24',
  'aria-hidden': 'true',
  focusable: 'false',
}

export function Facebook(props) {
  return (
    <svg {...base} fill="currentColor" {...props}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.9h-2.33V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  )
}

export function Youtube(props) {
  return (
    <svg {...base} fill="currentColor" {...props}>
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.08 0 12 0 12s0 3.92.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
    </svg>
  )
}

export function Linkedin(props) {
  return (
    <svg {...base} fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45Z" />
    </svg>
  )
}

export function Tiktok(props) {
  return (
    <svg {...base} fill="currentColor" {...props}>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-1.84-2.48V9.74a5.87 5.87 0 1 0 4.93 5.78V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.28 4.28 0 0 1-3.24-1.48Z" />
    </svg>
  )
}

export function Instagram(props) {
  return (
    <svg {...base} fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function Discord(props) {
  return (
    <svg {...base} fill="currentColor" {...props}>
      <path d="M20.32 4.57A19.79 19.79 0 0 0 15.43 3a13.9 13.9 0 0 0-.63 1.28 18.28 18.28 0 0 0-5.6 0A13.6 13.6 0 0 0 8.57 3a19.74 19.74 0 0 0-4.89 1.57C.56 9.24-.32 13.7.15 18.1A19.9 19.9 0 0 0 6.15 21c.48-.65.9-1.34 1.27-2.06a12.9 12.9 0 0 1-2-.96l.49-.4a14.2 14.2 0 0 0 12.18 0l.5.4c-.65.38-1.32.7-2 .96.36.72.78 1.41 1.26 2.06a19.86 19.86 0 0 0 6-2.9c.56-5.13-.87-9.58-3.53-13.53ZM8.02 15.53c-1.18 0-2.15-1.08-2.15-2.4 0-1.32.95-2.4 2.15-2.4 1.21 0 2.18 1.09 2.16 2.4 0 1.32-.95 2.4-2.16 2.4Zm7.96 0c-1.18 0-2.15-1.08-2.15-2.4 0-1.32.95-2.4 2.15-2.4 1.21 0 2.18 1.09 2.16 2.4 0 1.32-.95 2.4-2.16 2.4Z" />
    </svg>
  )
}

export const BRAND_ICONS = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  tiktok: Tiktok,
  discord: Discord,
}
