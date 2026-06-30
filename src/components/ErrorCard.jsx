import { XCircleIcon } from './Icons'

export default function ErrorCard({ message, onDismiss }) {
  return (
    <div className="glass-card border-red-500/30 bg-red-500/5 p-5 animate-fade-in">
      <div className="flex items-start gap-3">
        <XCircleIcon className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-red-300 mb-1">Backend Unreachable</p>
          <p className="text-xs text-red-400/80 break-words leading-relaxed">{message}</p>
          <p className="text-xs text-slate-600 mt-2">
            Make sure the FastAPI server is running at{' '}
            <code className="font-mono text-slate-500 bg-slate-800 px-1 rounded">
              {import.meta.env.VITE_API_URL || 'http://localhost:8000'}
            </code>
          </p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-slate-600 hover:text-slate-400 transition-colors flex-shrink-0"
            aria-label="Dismiss error"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
