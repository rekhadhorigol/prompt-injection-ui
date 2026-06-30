/**
 * Returns Tailwind colour classes based on risk level string.
 */
export function getRiskClasses(risk) {
  switch (risk?.toUpperCase()) {
    case 'LOW':
      return {
        badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
        dot: 'bg-emerald-400',
        bar: 'bg-emerald-500',
        text: 'text-emerald-400',
        percent: 25,
      }
    case 'MEDIUM':
      return {
        badge: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
        dot: 'bg-yellow-400',
        bar: 'bg-yellow-500',
        text: 'text-yellow-400',
        percent: 50,
      }
    case 'HIGH':
      return {
        badge: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
        dot: 'bg-orange-400',
        bar: 'bg-orange-500',
        text: 'text-orange-400',
        percent: 75,
      }
    case 'CRITICAL':
      return {
        badge: 'bg-red-500/15 text-red-400 border-red-500/30',
        dot: 'bg-red-500',
        bar: 'bg-red-500',
        text: 'text-red-400',
        percent: 100,
      }
    default:
      return {
        badge: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
        dot: 'bg-slate-400',
        bar: 'bg-slate-500',
        text: 'text-slate-400',
        percent: 0,
      }
  }
}

/**
 * Formats a decimal confidence (0-1) as a percentage string.
 */
export function fmtConfidence(val) {
  if (val == null) return '—'
  return `${(Number(val) * 100).toFixed(1)}%`
}

/**
 * Truncates a string to maxLen characters with ellipsis.
 */
export function truncate(str, maxLen = 120) {
  if (!str) return ''
  return str.length > maxLen ? str.slice(0, maxLen) + '…' : str
}
