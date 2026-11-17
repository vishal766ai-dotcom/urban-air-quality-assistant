import React from 'react';

/**
 * SustainableAlternativesGrid component for indoor cooking and heating choices.
 */
export function SustainableAlternativesGrid() {
  return (
    <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/60 space-y-2">
      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
        🌿 Key Sustainable Household Alternatives
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
          <span className="text-[10px] text-slate-400 block font-semibold uppercase">Cooking Alternative</span>
          <span className="text-white font-medium">Induction vs Gas Stove</span>
          <span className="text-[10px] text-emerald-400 block mt-0.5">-100% Indoor NO2 / Soot Spikes</span>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
          <span className="text-[10px] text-slate-400 block font-semibold uppercase">Winter Heating</span>
          <span className="text-white font-medium">Heat Pump vs Biomass / Coal</span>
          <span className="text-[10px] text-emerald-400 block mt-0.5">-120g PM2.5/month Saved</span>
        </div>
      </div>
    </div>
  );
}

export default SustainableAlternativesGrid;
