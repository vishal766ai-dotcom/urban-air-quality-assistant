import React from 'react';
import { Award, HeartPulse, Key, Eye, Type } from 'lucide-react';

/**
 * Navbar action buttons: Evaluation rubric modal, Triage modal, API key modal, and accessibility toggles.
 * @param {{
 *   onOpenEvalModal: () => void,
 *   onOpenTriageModal: () => void,
 *   onOpenApiKeyModal: () => void,
 *   apiKey?: string,
 *   highContrast: boolean,
 *   onToggleHighContrast: () => void,
 *   largeFont: boolean,
 *   onToggleLargeFont: () => void
 * }} props
 */
export function NavbarActions({
  onOpenEvalModal,
  onOpenTriageModal,
  onOpenApiKeyModal,
  apiKey,
  highContrast,
  onToggleHighContrast,
  largeFont,
  onToggleLargeFont
}) {
  const keyBtnClass = apiKey
    ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700';

  const contrastBtnClass = highContrast
    ? 'bg-amber-400 text-slate-900 border-amber-300'
    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200';

  const fontBtnClass = largeFont
    ? 'bg-cyan-500 text-white border-cyan-400'
    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200';

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onOpenEvalModal}
        title="View Challenge Rubric Verification & Automated Self-Tests"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-emerald-700/30 transition transform active:scale-95"
      >
        <Award className="w-4 h-4" />
        <span className="hidden sm:inline">Evaluation Rubric &amp; Tests</span>
        <span className="sm:hidden">Tests</span>
      </button>

      <button
        onClick={onOpenTriageModal}
        title="Smog Health & Respiratory Triage Guide"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 hover:bg-rose-900/60 text-xs font-medium transition"
      >
        <HeartPulse className="w-3.5 h-3.5" />
        <span className="hidden xl:inline">Health Triage</span>
      </button>

      <button
        onClick={onOpenApiKeyModal}
        title={apiKey ? 'Gemini 1.5 Flash Connected' : 'Configure Gemini API Key'}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition ${keyBtnClass}`}
      >
        <Key className="w-3.5 h-3.5" />
        <span className="hidden md:inline">{apiKey ? 'Gemini Active' : 'Gemini Key'}</span>
      </button>

      <button
        onClick={onToggleHighContrast}
        title="Toggle High Contrast (WCAG Accessibility)"
        className={`p-2 rounded-lg border transition ${contrastBtnClass}`}
        aria-label="Toggle High Contrast Mode"
      >
        <Eye className="w-4 h-4" />
      </button>

      <button
        onClick={onToggleLargeFont}
        title="Toggle Large Text"
        className={`p-2 rounded-lg border transition ${fontBtnClass}`}
        aria-label="Toggle Larger Font Size"
      >
        <Type className="w-4 h-4" />
      </button>
    </div>
  );
}

export default NavbarActions;
