import { getRiskClasses, fmtConfidence } from '../utils/risk'

const RISK_LEVELS = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']
const RISK_PERCENT = { LOW: 25, MEDIUM: 50, HIGH: 75, CRITICAL: 100 }

export default function RiskVisualization({ prediction }) {
  if (!prediction) return null

  const { risk, confidence } = prediction
  const riskCls = getRiskClasses(risk)
  const riskIndex = RISK_LEVELS.indexOf(risk?.toUpperCase())
  const confPercent = confidence != null ? Math.round(Number(confidence) * 100) : 0

  return (
    <div className="glass-card p-5 animate-fade-in">
      <div className="section-label mb-4">Risk Visualization</div>

      {/* Segmented risk meter */}
      <div className="mb-5">
        <div className="flex justify-between text-xs text-slate-600 mb-2 font-mono">
          {RISK_LEVELS.map((lvl) => {
            const cls = getRiskClasses(lvl)
            const active = lvl === risk?.toUpperCase()
            return (
              <span
                key={lvl}
                className={`transition-all duration-300 px-2 py-0.5 rounded ${
                  active ? `${cls.badge} border font-bold scale-105` : ''
                }`}
              >
                {lvl}
              </span>
            )
          })}
        </div>

        {/* Bar segments */}
        <div className="flex gap-1 h-3 rounded-full overflow-hidden">
          {RISK_LEVELS.map((lvl, i) => {
            const cls = getRiskClasses(lvl)
            const filled = riskIndex >= 0 && i <= riskIndex
            return (
              <div
                key={lvl}
                className={`flex-1 rounded-full transition-all duration-500 ${
                  filled ? cls.bar : 'bg-slate-800'
                }`}
                style={filled ? { opacity: 0.3 + (i / (RISK_LEVELS.length - 1)) * 0.7 } : {}}
              />
            )
          })}
        </div>
      </div>

      {/* Confidence arc-style progress */}
      <div className="mt-4">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-slate-500">Model Confidence</span>
          <span className={`font-mono font-bold ${riskCls.text}`}>{fmtConfidence(confidence)}</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${riskCls.bar}`}
            style={{ width: `${confPercent}%` }}
          />
        </div>
      </div>
    </div>
  )
}
