import { CpuChipIcon, ExclamationIcon } from './Icons'

function ModelBadge({ label, value, color = 'blue' }) {
  const colorMap = {
    blue: 'bg-blue-500/10 border-blue-500/25 text-blue-300',
    purple: 'bg-purple-500/10 border-purple-500/25 text-purple-300',
  }
  return (
    <div className="flex-1 min-w-0 rounded-lg p-3 bg-slate-900/60 border border-slate-800">
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className={`text-sm font-semibold truncate px-2 py-1 rounded border inline-block ${colorMap[color]}`}>
        {value || '—'}
      </p>
    </div>
  )
}

export default function HybridDetection({ prediction }) {
  if (!prediction) return null

  const { predicted_attack, retrieval_attack, disagreement } = prediction

  return (
    <div className="glass-card p-5 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <CpuChipIcon className="w-4 h-4 text-blue-400" />
        <h2 className="text-sm font-semibold text-slate-200">Hybrid Detection</h2>
        <span className={`ml-auto text-xs px-2 py-0.5 rounded-full border font-semibold
          ${disagreement
            ? 'bg-orange-500/15 border-orange-500/30 text-orange-400'
            : 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'}`}>
          {disagreement ? 'Disagreement' : 'Agreement'}
        </span>
      </div>

      <div className="flex gap-3 mb-4">
        <ModelBadge label="Model Prediction" value={predicted_attack} color="blue" />
        <ModelBadge label="Retrieval Prediction" value={retrieval_attack} color="purple" />
      </div>

      {disagreement && (
        <div className="flex items-start gap-3 rounded-lg px-4 py-3 bg-orange-500/10 border border-orange-500/30 animate-fade-in">
          <ExclamationIcon className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-orange-300">Hybrid Disagreement Detected</p>
            <p className="text-xs text-orange-400/80 mt-0.5">
              Model and retrieval predictions differ. Manual review recommended.
            </p>
          </div>
        </div>
      )}

      {!disagreement && (
        <div className="flex items-center gap-3 rounded-lg px-4 py-3 bg-emerald-500/10 border border-emerald-500/25">
          <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-emerald-300 font-medium">
            Both detectors agree — high confidence result.
          </p>
        </div>
      )}
    </div>
  )
}
