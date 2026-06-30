import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Analyze a prompt for injection / jailbreak attacks.
 * @param {string} prompt
 * @returns {Promise<import('../types').AnalysisResult>}
 */
export async function analyzePrompt(prompt) {
  const response = await api.post('/analyze', { prompt })
  return response.data
}

export default api
