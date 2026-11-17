import React from 'react';
import { Wind } from 'lucide-react';

/**
 * Global App Footer.
 * @param {{ onOpenEvalModal: () => void }} props
 */
export function AppFooter({ onOpenEvalModal }) {
  return (
    <footer className="mt-12 border-t border-slate-800/80 bg-slate-900/60 py-8 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4 text-emerald-400" />
          <span className="font-heading font-bold text-white text-sm">AeroGuardian</span>
          <span>— PromptWars [Challenge 6] Urban Air Quality Assistant</span>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <button onClick={onOpenEvalModal} className="text-emerald-400 hover:underline font-semibold">
            Verify Challenge Rubric &amp; Diagnostics
          </button>
          <span>•</span>
          <span>Live Open-Meteo Grounding</span>
          <span>•</span>
          <span>Zero-Leak Architecture</span>
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;
