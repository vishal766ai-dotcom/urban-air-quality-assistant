import React from 'react';
import { Clock, Sun, Info } from 'lucide-react';

/**
 * Midday Safe Airing Window & Countdown Card.
 * @param {{
 *   windowStatus: { text: string, isNow: boolean },
 *   isGood: boolean,
 *   onOpenInversionModal: () => void
 * }} props
 */
export function SafeWindowCard({ windowStatus, isGood, onOpenInversionModal }) {
  return (
    <div className="lg:col-span-3 flex flex-col gap-2.5 shrink-0 min-w-0">
      <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/40 text-center shadow-lg">
        <div className="flex items-center justify-center gap-1.5 text-amber-400 text-[11px] font-bold uppercase tracking-wider mb-1">
          <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
          <span>Safe Airing Window</span>
        </div>
        <div className="text-sm font-extrabold text-white font-mono">
          {isGood ? 'All Day Ventilation' : '1:00 PM – 3:30 PM'}
        </div>
        <div className="mt-1.5">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
            windowStatus.isNow || isGood
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse' 
              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
          }`}>
            <Clock className="w-3 h-3" />
            <span>{isGood ? 'Safe Continuous Circulation' : windowStatus.text}</span>
          </span>
        </div>
      </div>

      <button
        onClick={onOpenInversionModal}
        className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition"
      >
        <Info className="w-3.5 h-3.5 text-cyan-400" />
        <span>Why Inversion Traps Smog?</span>
      </button>
    </div>
  );
}

export default SafeWindowCard;
