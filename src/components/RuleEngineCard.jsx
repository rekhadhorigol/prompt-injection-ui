import { BoltIcon } from './Icons'

export default function RuleEngineCard({ rule_hits }) {
  const hits = Array.isArray(rule_hits) ? rule_hits : []

  return (
    <div className="glass-card p-5 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <BoltIcon className="w-4 h-4 text-yellow-400" />
        <h2 className="text-sm font-semibold text-slate-200">Rule Engine</h2>
        {hits.length > 0 && (
          <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-500/15 text-yellow-400 border border-yellow-500/30">
            {hits.length} hit{hits.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {hits.length === 0 ? (
        <p className="text-sm text-slate-600 italic">No rule violations detected.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {hits.map((hit, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                         bg-yellow-500/10 text-yellow-300 border border-yellow-500/25
                         hover:bg-yellow-500/20 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
              {hit}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
