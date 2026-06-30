import { useState, useCallback, useRef } from 'react'
import { analyzePrompt } from '../services/api'

/**
 * Custom hook — wraps the /analyze call with loading / error state.
 */
export function useAnalysis() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const abortRef = useRef(null)

  const analyze = useCallback(async (prompt) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const data = await analyzePrompt(prompt)
      setResult(data)
      return data
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        err?.message ||
        'Failed to reach the analysis backend.'
      setError(msg)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setResult(null)
    setError(null)
    setLoading(false)
  }, [])

  return { result, loading, error, analyze, reset }
}
