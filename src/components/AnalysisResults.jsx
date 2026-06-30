import { DocumentTextIcon } from './Icons'

function PromptBlock({ label, content, accent = 'blue' }) {
  const accentMap = {
    blue: 'border-l-blue-500/60 bg-blue-500/5',
    emerald: 'border-l-emerald-500/60 bg-emerald-500/5',
  }

  return (
    <div className="space-y-2">
      <span className="section-label">{label}</span>
      <div className={`border-l-2 pl-4 py-3 pr-4 rounded-r-lg ${accentMap[accent] ?? accentMap.blue}`}>
        <pre className="value-text whitespace-pre-wrap break-words leading-relaxed">
          {content || <span className="text-slate-600 italic">—</span>}
        </pre>
      </div>
    </div>
  )
}

export default function AnalysisResults({ original_prompt, sanitized_prompt }) {
  return (
    <div className="glass-card p-5 animate-fade-in space-y-5">
      <div className="flex items-center gap-2 mb-1">
        <DocumentTextIcon className="w-4 h-4 text-slate-400" />
        <h2 className="text-sm font-semibold text-slate-200">Analysis Results</h2>
      </div>

      <PromptBlock label="Original Prompt" content={original_prompt} accent="blue" />
      <PromptBlock label="Sanitized Prompt" content={sanitized_prompt} accent="emerald" />
    </div>
  )
}
