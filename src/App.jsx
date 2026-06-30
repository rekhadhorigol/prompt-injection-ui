import { useState, useCallback } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import SidePanel from './components/SidePanel'
import PromptInput from './components/PromptInput'
import AnalysisResults from './components/AnalysisResults'
import DetectionSummary from './components/DetectionSummary'
import RuleEngineCard from './components/RuleEngineCard'
import FAISSRetrieval from './components/FAISSRetrieval'
import HybridDetection from './components/HybridDetection'
import RiskVisualization from './components/RiskVisualization'
import StatisticsPanel from './components/StatisticsPanel'
import LoadingOverlay from './components/LoadingOverlay'
import ErrorCard from './components/ErrorCard'
import Toast from './components/Toast'
import { useAnalysis } from './hooks/useAnalysis'

export default function App() {
  const { result, loading, error, analyze, reset } = useAnalysis()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [toast, setToast] = useState(null)

  const handleAnalyze = useCallback(async (prompt) => {
    const data = await analyze(prompt)
    if (data) {
      setToast({ message: 'Analysis complete.', type: 'success' })
    }
  }, [analyze])

  const hasResult = !!result

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Header onToggleSidebar={() => setSidebarOpen((v) => !v)} />
      <SidePanel open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Grid layout: left column (main) + right column (sidebar detail) */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* ── LEFT / MAIN COLUMN ── */}
          <div className="xl:col-span-2 space-y-5">

            {/* Prompt Input */}
            <PromptInput onSubmit={handleAnalyze} loading={loading} />

            {/* Loading State */}
            {loading && <LoadingOverlay />}

            {/* Error State */}
            {!loading && error && (
              <ErrorCard message={error} onDismiss={reset} />
            )}

            {/* Analysis Results — prompt comparison */}
            {!loading && hasResult && (
              <AnalysisResults
                original_prompt={result.original_prompt}
                sanitized_prompt={result.sanitized_prompt}
              />
            )}

            {/* Hybrid Detection card */}
            {!loading && hasResult && (
              <HybridDetection prediction={result.prediction} />
            )}

            {/* Rule Engine */}
            {!loading && hasResult && (
              <RuleEngineCard rule_hits={result.rule_hits} />
            )}

            {/* FAISS Retrieval */}
            {!loading && hasResult && (
              <FAISSRetrieval prediction={result.prediction} />
            )}

            {/* Gemini Response */}
            {hasResult && result.llm_response && (
              <div className="glass-card p-5 animate-fade-in">
                <h2 className="text-sm font-semibold text-slate-200 mb-3">
                  Gemini Response
                </h2>

                <p className="text-slate-100 whitespace-pre-wrap">
                  {result.llm_response}
                </p>
              </div>
            )}
          </div>

          {/* ── RIGHT / DETAIL COLUMN ── */}
          <div className="xl:col-span-1 space-y-5">

            {/* Detection Summary */}
            {!loading && hasResult && (
              <DetectionSummary prediction={result.prediction} />
            )}

            {/* Risk Visualization */}
            {!loading && hasResult && (
              <RiskVisualization prediction={result.prediction} />
            )}

            {/* Statistics Panel */}
            {!loading && hasResult && (
              <StatisticsPanel 
                prediction={result.prediction}
                latency={result.latency_ms}
              />
            )}

            {/* Empty-state placeholder for right column */}
            {!loading && !hasResult && !error && (
              <div className="glass-card p-8 flex flex-col items-center justify-center text-center gap-4 min-h-[280px] opacity-60">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                  <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Awaiting analysis</p>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed">Submit a prompt to see<br />detection results here.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* Toast notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}
