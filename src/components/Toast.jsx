import { useEffect } from 'react'
import { CheckCircleIcon, XCircleIcon } from './Icons'

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000)
    return () => clearTimeout(t)
  }, [onClose])

  const styles = {
    success: {
      wrap: 'bg-slate-900 border-emerald-500/40',
      icon: <CheckCircleIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" />,
      text: 'text-emerald-300',
    },
    error: {
      wrap: 'bg-slate-900 border-red-500/40',
      icon: <XCircleIcon className="w-5 h-5 text-red-400 flex-shrink-0" />,
      text: 'text-red-300',
    },
  }
  const s = styles[type] || styles.success

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl
                  border shadow-2xl shadow-black/40 animate-slide-in max-w-sm ${s.wrap}`}
    >
      {s.icon}
      <p className={`text-sm font-medium ${s.text}`}>{message}</p>
      <button
        onClick={onClose}
        className="ml-2 text-slate-600 hover:text-slate-400 transition-colors"
        aria-label="Dismiss"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
