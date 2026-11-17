import React from 'react';
import { Bot, VolumeX, Download, Trash2 } from 'lucide-react';

/**
 * Chat Header Bar with status badge, mute readout, download plan, and clear history.
 * @param {{
 *   cityName: string,
 *   currentAQI: number,
 *   profileLabel: string,
 *   apiKey?: string,
 *   isSpeaking: boolean,
 *   onStopSpeaking: () => void,
 *   onDownloadPlan: () => void,
 *   onClearHistory: () => void
 * }} props
 */
export function ChatHeaderBar({
  cityName,
  currentAQI,
  profileLabel,
  apiKey,
  isSpeaking,
  onStopSpeaking,
  onDownloadPlan,
  onClearHistory
}) {
  return (
    <div className="p-4 sm:p-5 border-b border-slate-700 bg-slate-900/80 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/20">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-heading font-bold text-base sm:text-lg text-white">
              AeroGuardian AI Assistant
            </h3>
            <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              {apiKey ? 'Gemini 1.5 Live' : 'Intelligent Dual-Engine'}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Context: {cityName} (AQI {currentAQI}) • {profileLabel}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isSpeaking && (
          <button
            onClick={onStopSpeaking}
            className="p-2 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-medium flex items-center gap-1.5 transition"
            title="Stop Speech Readout"
            aria-label="Stop Speech Readout"
          >
            <VolumeX className="w-4 h-4 animate-pulse" />
            <span className="hidden sm:inline">Mute</span>
          </button>
        )}

        <button
          onClick={onDownloadPlan}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs transition"
          title="Download Plan as Markdown"
          aria-label="Download Plan"
        >
          <Download className="w-4 h-4" />
        </button>

        <button
          onClick={onClearHistory}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-rose-400 text-xs transition"
          title="Clear Chat History"
          aria-label="Clear Chat History"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default ChatHeaderBar;
