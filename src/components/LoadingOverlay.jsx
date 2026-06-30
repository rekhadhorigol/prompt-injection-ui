import { SpinnerIcon, ShieldIcon } from './Icons'

export default function LoadingOverlay() {
  return (
    <div className="glass-card p-8 flex flex-col items-center justify-center gap-4 animate-fade-in min-h-[200px]">
      <div className="relative">
        <div className="w-14 h-14 rounded-full border-2 border-blue-500/20 flex items-center justify-center">
          <ShieldIcon className="w-6 h-6 text-blue-500/50" />
        </div>
        <div className="absolute inset-0 rounded-full border-t-2 border-blue-400 animate-spin" />
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-slate-300">Running Analysis</p>
        <div className="text-xs text-slate-500 mt-2 space-y-1">
          <p>-Running XLM-R Detector</p>
          <p>-Searching FAISS Database</p>
          <p>-Computing Risk Score</p>
          <p>-Evaluating Security Policy</p>
        </div>
      </div>
    </div>
  )
}
