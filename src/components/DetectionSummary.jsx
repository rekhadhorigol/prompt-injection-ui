import { getRiskClasses, fmtConfidence } from '../utils/risk'
import { ShieldIcon } from './Icons'
import { useState } from 'react'

function Badge({ children, className }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${className}`}>
      {children}
    </span>
  )
}

function StatRow({ label, value, mono = false }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-slate-800/60 last:border-0">
      <span className="text-xs text-slate-500 flex-shrink-0 pt-0.5">{label}</span>
      <span className={`text-sm text-slate-200 text-right ${mono ? 'font-mono' : 'font-medium'}`}>{value ?? '—'}</span>
    </div>
  )
}

export default function DetectionSummary({ prediction }) {
  if (!prediction) return null

  const [copied, setCopied] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

  const { attack_detected, predicted_attack, confidence, risk } = prediction
  const riskCls = getRiskClasses(risk)

function downloadReport() {

  const blob = new Blob(
    [JSON.stringify(prediction, null, 2)],
    { type: "application/json" }
  )

  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")

  a.href = url

  a.download = "security_report.json"

  a.click()

  URL.revokeObjectURL(url)

  setDownloaded(true)

  setTimeout(() => {
    setDownloaded(false)
  }, 2000)
}

function copyJson() {

  navigator.clipboard.writeText(
    JSON.stringify(prediction, null, 2)
  )

  setCopied(true)

  setTimeout(() => {
    setCopied(false)
  }, 2000)
}

  return (
    <div className="glass-card p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShieldIcon className="w-4 h-4 text-slate-400" />
          <h2 className="text-sm font-semibold text-slate-200">Detection Summary</h2>
        </div>
        
        <Badge className={riskCls.badge}>{risk || 'UNKNOWN'}</Badge>
      </div>
      <div className="flex gap-2 mb-2">
        
        <button
          onClick={copyJson}
          className="
            px-3 py-1
            text-xs font-medium
            rounded-lg
            border border-slate-700
            bg-slate-800/60
            text-slate-300
            hover:bg-slate-700/70
            transition
          "
        >
          Copy JSON
        </button>

        <button
          onClick={downloadReport}
          className="
            px-3 py-1
            text-xs font-medium
            rounded-lg
            border border-slate-700
            bg-slate-800/60
            text-slate-300
            hover:bg-slate-700/70
            transition
          "
        >
          Download Report
        </button>

      </div>
      {copied && (
        <p className="text-green-400 text-xs mt-2">
          Copied to clipboard
        </p>
      )}

      {downloaded && (
        <p className="text-blue-400 text-xs mt-2">
          Report downloaded
        </p>
      )}

      {/* Attack detected banner */}
      

      <div className={`flex items-center gap-3 rounded-lg px-4 py-3 mb-4 border
        ${attack_detected
          ? 'bg-red-500/10 border-red-500/30'
          : 'bg-emerald-500/10 border-emerald-500/30'}`}>
        <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${attack_detected ? 'bg-red-400 animate-pulse' : 'bg-emerald-400'}`} />
        <span className={`text-sm font-semibold ${attack_detected ? 'text-red-300' : 'text-emerald-300'}`}>
          {attack_detected ? 'Attack Detected' : 'No Attack Detected'}
        </span>
      </div>

      <div className="mt-3">
        <Badge
          className={
            prediction.action === "ALLOW"
              ? "bg-green-500/20 border-green-500/30 text-green-300"
              : prediction.action === "WARN"
              ? "bg-yellow-500/20 border-yellow-500/30 text-yellow-300"
              : prediction.action === "SANITIZE"
              ? "bg-orange-500/20 border-orange-500/30 text-orange-300"
              : "bg-red-500/20 border-red-500/30 text-red-300"
          }
        >
          {prediction.action}
        </Badge>
      </div>

      <div className="divide-y divide-slate-800/60">
        <StatRow label="Predicted Attack" value={predicted_attack} />
        <StatRow label="Confidence" value={fmtConfidence(confidence)} mono />
        <div className="flex items-start justify-between gap-4 py-2.5">
          <span className="text-xs text-slate-500 flex-shrink-0 pt-0.5">Risk Level</span>
          <Badge className={riskCls.badge}>{risk || '—'}</Badge>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs text-slate-400 mb-1">
          Reason
        </p>

        <p className="text-sm text-slate-200">
          {prediction.reason}
        </p>
      </div>
    </div>
  )
}
