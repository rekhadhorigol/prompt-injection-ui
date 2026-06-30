import { DatabaseIcon } from './Icons'
import { getRiskClasses } from '../utils/risk'

function ExampleRow({ attack, risk }) {
  const riskCls = getRiskClasses(risk)
  return (
    <div className="flex items-center justify-between gap-3 py-2.5 border-b border-slate-800/50 last:border-0">
      <span className="text-sm text-slate-300 truncate">{attack || '—'}</span>
      <span className={`flex-shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${riskCls.badge}`}>
        {risk || '—'}
      </span>
    </div>
  )
}

export default function FAISSRetrieval({ prediction }) {
  if (!prediction) return null

  const { retrieval_attack, retrieved_examples } = prediction
  const examples = Array.isArray(retrieved_examples) ? retrieved_examples : []

  return (
    <div className="glass-card p-5 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <DatabaseIcon className="w-4 h-4 text-purple-400" />
        <h2 className="text-sm font-semibold text-slate-200">FAISS Retrieval</h2>
      </div>

      {/* Nearest attack */}
      <div className="mb-4">
        <span className="section-label">Nearest Retrieved Attack</span>
        <div className="mt-1.5 px-3 py-2.5 rounded-lg bg-purple-500/10 border border-purple-500/25">
          <span className="text-sm font-medium text-purple-300">{retrieval_attack || '—'}</span>
        </div>
      </div>

      {/* Examples table */}
      {examples.length > 0 && (
        <div>
          <span className="section-label">Retrieved Examples</span>
          <div className="mt-1.5 rounded-lg bg-slate-900/60 border border-slate-800 px-3">
            {examples.map((ex, i) => (
              <div
                key={i}
                className="py-3 border-b border-slate-800/50 last:border-0"
              >
                <div className="flex justify-between">
                  <span className="text-sm text-slate-300">
                    {ex.attack}
                  </span>

                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getRiskClasses(ex.risk).badge}`}
                  >
                    {ex.risk}
                  </span>
                </div>

                <p className="text-xs text-slate-500 mt-1">
                  Similarity:
                  {(ex.similarity * 100).toFixed(1)}%
                </p>
              </div>
            ))}
          </div>
          
        </div>
      )}
    </div>
  )
}
