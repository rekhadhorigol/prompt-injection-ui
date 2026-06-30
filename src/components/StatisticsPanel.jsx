import { getRiskClasses, fmtConfidence } from '../utils/risk'
import { ShieldIcon } from './Icons'

function StatCard({ label, value, sub, accent = 'slate' }) {
  const accentBorder = {
    blue: 'border-blue-500/30 bg-blue-500/5',
    red: 'border-red-500/30 bg-red-500/5',
    green: 'border-emerald-500/30 bg-emerald-500/5',
    yellow: 'border-yellow-500/30 bg-yellow-500/5',
    orange: 'border-orange-500/30 bg-orange-500/5',
    slate: 'border-slate-700/50 bg-slate-900/40',
  }
  return (
    <div className={`rounded-xl border px-4 py-4 ${accentBorder[accent] || accentBorder.slate}`}>
      <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider">{label}</p>
      <p className="text-xl font-bold text-slate-100 leading-tight truncate">{value ?? '—'}</p>
      {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
    </div>
  )
}

export default function StatisticsPanel({ prediction,latency }) {
  if (!prediction) return null

  const { confidence, risk, predicted_attack, attack_detected, action} = prediction
  const riskCls = getRiskClasses(risk)

  const riskAccent = {
    LOW: 'green',
    MEDIUM: 'yellow',
    HIGH: 'orange',
    CRITICAL: 'red',
  }

  return (
    <div className="glass-card p-5 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <ShieldIcon className="w-4 h-4 text-slate-400" />
        <h2 className="text-sm font-semibold text-slate-200">Statistics</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <StatCard
          label="Confidence"
          value={fmtConfidence(confidence)}
          sub="Model certainty score"
          accent="blue"
        />
        <StatCard
          label="Risk Level"
          value={risk || '—'}
          sub={`${fmtConfidence(confidence)} confidence`}
          accent={riskAccent[risk?.toUpperCase()] || 'slate'}
        />
        <StatCard
          label="Detected Attack"
          value={predicted_attack || '—'}
          sub={attack_detected ? 'Attack confirmed' : 'No threat detected'}
          accent={attack_detected ? 'red' : 'green'}
        />
        <StatCard
          label="Decision"
          value={action || '—'}
          sub="Security decision"
          accent={
            action === "ALLOW"
              ? "green"
              : action === "WARN"
              ? "yellow"
              : action === "SANITIZE"
              ? "orange"
              : "red"
          }
        />
        <StatCard
          label="Latency"
          value={`${latency?.toFixed(0)} ms`}
          sub="Processing time"
          accent="blue"
        />
      </div>
    </div>
  )
}
