import React from 'react';
import { Sparkles } from 'lucide-react';
import { SMART_PROMPT_SUGGESTIONS } from '../data/airQualityData';

/**
 * Smart Prompt Suggestions Bar for quick AI queries.
 * @param {{ onSelectPrompt: (prompt: string) => void, disabled: boolean }} props
 */
export function SmartPromptBar({ onSelectPrompt, disabled }) {
  return (
    <div className="px-4 py-2 bg-slate-900/70 border-t border-slate-800/80 overflow-x-auto flex items-center gap-2 scrollbar-none">
      <span className="text-[11px] text-slate-400 font-semibold shrink-0 uppercase tracking-wider flex items-center gap-1">
        <Sparkles className="w-3 h-3 text-amber-400" />
        Smart Prompts:
      </span>
      {SMART_PROMPT_SUGGESTIONS.map((item, index) => (
        <button
          key={index}
          onClick={() => onSelectPrompt(item.prompt)}
          disabled={disabled}
          className="shrink-0 px-2.5 py-1 rounded-full text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1.5"
        >
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}

export default SmartPromptBar;
