export default function Footer() {
  return (
    <footer className="border-t border-slate-800/60 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p>Built for Prompt Injection &amp; Jailbreak Prevention Research</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60" />
              XLM-R
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500/60" />
              FAISS
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
              Rule Engine
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
              Sanitizer
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
