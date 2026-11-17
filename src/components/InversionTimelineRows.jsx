import React from 'react';
import { AlertTriangle, ShieldCheck, Clock } from 'lucide-react';

/**
 * InversionTimelineRows - Renders 3-step diurnal thermal inversion guidance.
 */
export function InversionTimelineRows() {
  return (
    <div className="space-y-4">
      {/* Morning */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/70 relative">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            06:30 – 09:30 AM (Peak Thermal Inversion)
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
            Critical Inversion Trap
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Cold air locks exhaust at chest level. <strong>Strictly avoid morning running, open-air jogging, or outdoor cycling.</strong> Replace with indoor yoga. If commuting, wear a certified N95 respirator.
        </p>
      </div>

      {/* Afternoon */}
      <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 relative">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            01:00 – 03:30 PM (Golden Ventilation Window)
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
            Solar Dispersion
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Solar ground warming breaks the cold boundary layer. Outdoor AQI drops by 30-40%. <strong>Crack open opposite windows for 15-20 minutes to purge stale CO2.</strong> Best window for outdoor errands.
        </p>
      </div>

      {/* Evening & Night */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/70 relative">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            06:00 – 10:30 PM (Re-trapping &amp; Night Rest)
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
            Night Inversion
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Air cools rapidly. Seal bedroom doors and run the DIY purifier on low/medium continuous speed. Keep room humidity around 45% to prevent throat dryness.
        </p>
      </div>
    </div>
  );
}

export default InversionTimelineRows;
