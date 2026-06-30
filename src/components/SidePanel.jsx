import { ChevronLeftIcon, ChevronRightIcon, ShieldIcon } from './Icons'

const TEAM_MEMBERS = [
  // Replace with actual team member names
  'Rekha Dhorigol, PES1UG24CS370',
  'CH Yashwitha, PES1UG24CS121',
  'Karanam Srujana, PES1UG24AM128'
]

const METRICS = [
  { label: 'Model Accuracy',      value: '93.7%'   },
  { label: 'FAISS Accuracy',      value: '88.3%'   },
  { label: 'XLM-R Accuracy',      value: '92.7%'   },
  { label: 'Languages Supported', value: '10+'     },
  { label: 'Attack Classes',      value: '13'      },
  { label: 'Dataset Size',        value: '31,000+' },
  { label: 'ASR',                 value: '0.54%'   },
  { label: 'DSR',                 value: '99.46%'  },
  { label: 'FPR',                 value: '1.69%'   },
  { label: 'FNR',                 value: '0.54%'   },
]

const TECHNOLOGIES = [
  { name: 'XLM-R', desc: 'Multilingual attack classifier' },
  { name: 'FAISS', desc: 'Vector similarity retrieval engine' },
  { name: 'Rule Engine', desc: 'Pattern-based heuristic rules' },
  { name: 'Prompt Sanitizer', desc: 'Malicious content neutralisation' },
  { name: 'FastAPI', desc: 'High-performance REST backend' },
  { name: 'React + Vite', desc: 'Modern reactive UI' },
  { name: 'TailwindCSS', desc: 'Utility-first styling' },
]

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 pb-2 border-b border-slate-800">
        {title}
      </h3>
      {children}
    </div>
  )
}

export default function SidePanel({ open, onClose }) {
  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-slate-900 border-l border-slate-700/60
                    z-50 flex flex-col shadow-2xl shadow-black/50
                    transition-transform duration-300 ease-in-out
                    ${open ? 'translate-x-0' : 'translate-x-full'}`}
        aria-label="Project information panel"
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-2">
            <ShieldIcon className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-slate-200">Project Info</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors"
            aria-label="Close panel"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-5">

          <Section title="Project Information">
            <p className="text-sm text-slate-300 font-semibold leading-snug mb-2">
              Multilingual Prompt Injection &amp; Jailbreak Prevention
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              An enterprise-grade hybrid detection system for identifying and preventing
              prompt injection and jailbreak attacks in large language models across
              multiple languages.
            </p>
          </Section>

          <Section title="Key Metrics">
            <div className="grid grid-cols-2 gap-2">
              {METRICS.map((m) => (
                <div key={m.label} className="bg-slate-800/60 border border-slate-700/50 rounded-lg px-3 py-2.5">
                  <p className="text-lg font-bold text-blue-400 leading-none">{m.value}</p>
                  <p className="text-xs text-slate-500 mt-1 leading-snug">{m.label}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Research Objective">
            <p className="text-xs text-slate-400 leading-relaxed">
              To design and evaluate a multi-layered defence system that combines
              fine-tuned transformer classification (XLM-R), semantic vector retrieval
              (FAISS), pattern-based rule matching, and prompt sanitisation to achieve
              robust multilingual attack detection.
            </p>
          </Section>

          <Section title="Team Members">
            <ul className="space-y-2">
              {TEAM_MEMBERS.map((m, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                  <span className="w-6 h-6 rounded-full bg-blue-600/20 border border-blue-500/30
                                   flex items-center justify-center text-xs text-blue-400 font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  {m}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Technologies Used">
            <ul className="space-y-2.5">
              {TECHNOLOGIES.map((t) => (
                <li key={t.name} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-medium text-slate-300">{t.name}</span>
                    <p className="text-xs text-slate-600">{t.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Version Information">
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-600">Dashboard</span>
                <span className="text-slate-400">v1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">API</span>
                <span className="text-slate-400">FastAPI 0.x</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Model</span>
                <span className="text-slate-400">XLM-R Base</span>
              </div>
            </div>
          </Section>

          <Section title="Credits">
            <p className="text-xs text-slate-500 leading-relaxed">
              Built as an internship research project on LLM security.
              Detection pipeline powered by HuggingFace Transformers and
              Facebook FAISS. UI crafted with React, Vite, and TailwindCSS.
            </p>
          </Section>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-800 flex-shrink-0">
          <p className="text-xs text-slate-600 text-center">
            Prompt Injection &amp; Jailbreak Prevention Research
          </p>
        </div>
      </aside>
    </>
  )
}
