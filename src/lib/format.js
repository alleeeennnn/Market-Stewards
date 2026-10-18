/**
 * Formatting and small pure helpers shared across pages.
 * Kept dependency-free so they can move to a shared package later.
 */

const php = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const phpWhole = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  maximumFractionDigits: 0,
})

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const number = new Intl.NumberFormat('en-PH')

/** PHP with a currency symbol, e.g. ₱1,234.50 */
export function formatPeso(value) {
  if (value == null || !Number.isFinite(value)) return '—'
  return php.format(value)
}

/** PHP rounded to the whole peso, for headline figures. */
export function formatPesoWhole(value) {
  if (value == null || !Number.isFinite(value)) return '—'
  return phpWhole.format(value)
}

export function formatUsd(value) {
  if (value == null || !Number.isFinite(value)) return '—'
  return usd.format(value)
}

export function formatNumber(value) {
  if (value == null || !Number.isFinite(value)) return '—'
  return number.format(value)
}

/** Signed percentage, e.g. +1.42% / -0.38% */
export function formatPercent(value, digits = 2) {
  if (value == null || !Number.isFinite(value)) return '—'
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(digits)}%`
}

/** Signed money, e.g. +₱1,250.00 */
export function formatSignedPeso(value) {
  if (value == null || !Number.isFinite(value)) return '—'
  const sign = value > 0 ? '+' : value < 0 ? '−' : ''
  return `${sign}${php.format(Math.abs(value))}`
}

export function formatDate(isoString, options = {}) {
  const date = new Date(isoString)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString('en-PH', { day: 'numeric', month: 'short', year: 'numeric', ...options })
}

export function formatShortDate(isoString) {
  const date = new Date(isoString)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString('en-PH', { day: 'numeric', month: 'short' })
}

export function formatTime(isoString) {
  const date = new Date(isoString)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleTimeString('en-PH', { hour: 'numeric', minute: '2-digit', hour12: true })
}

/** 'up' | 'down' | 'flat' — used for colour and arrow direction together. */
export function directionOf(value) {
  if (value == null || !Number.isFinite(value) || value === 0) return 'flat'
  return value > 0 ? 'up' : 'down'
}

export function formatR(value, digits = 2) {
  if (value == null || !Number.isFinite(value)) return '—'
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(digits)}R`
}

/**
 * Formats a live quote at the instrument's own precision.
 * Deliberately not currency-formatted: instruments here are quoted in USD
 * regardless of the reader's locale, and a "US$4,184.80" prefix on a spot
 * gold quote adds noise without adding information.
 */
export function formatPrice(value, precision = 2) {
  if (value == null || !Number.isFinite(value)) return '—'
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(value)
}

/** "updated 3s ago" — relative age of the last successful fetch. */
export function timeAgoShort(timestamp, now = Date.now()) {
  if (!timestamp) return ''
  const seconds = Math.max(0, Math.round((now - timestamp) / 1000))
  if (seconds < 60) return `${seconds}s ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  return `${Math.floor(minutes / 60)}h ago`
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export function percentOf(part, whole) {
  if (!whole) return 0
  return clamp((part / whole) * 100, 0, 100)
}

/** Title-cases a slug: 'risk-management' -> 'Risk management' */
export function humanise(slug) {
  if (!slug) return ''
  const text = String(slug).replace(/-/g, ' ')
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function sum(values) {
  return values.reduce((total, value) => total + (Number(value) || 0), 0)
}

export function average(values) {
  if (!values.length) return 0
  return sum(values) / values.length
}
