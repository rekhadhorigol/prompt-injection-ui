import { ShieldIcon } from './Icons'

export default function Header({ onToggleSidebar }) {
  return (
    <header className="border-b border-slate-700/60 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
              <ShieldIcon className="w-5 h-5 text-blue-400" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm font-bold text-slate-100 leading-tight truncate">
                Multilingual Prompt Injection &amp; Jailbreak Prevention
              </h1>
              <p className="text-xs text-slate-500 leading-tight truncate hidden sm:block">
                Hybrid Detection · XLM-R · FAISS Retrieval · Rule Engine · Prompt Sanitization
              </p>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3 ml-4 flex-shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
              Live
            </span>
            <button
              onClick={onToggleSidebar}
              aria-label="Toggle project info panel"
              className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
