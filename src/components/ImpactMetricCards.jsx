import React from 'react';
import { TreePine } from 'lucide-react';

/**
 * 4 key metric cards: CO2 Averted, PM2.5 Prevented, Tree Equivalent, Family Lung Score.
 * @param {{ impact: any }} props
 */
export function ImpactMetricCards({ impact }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-lg text-center">
        <span className="text-xs text-slate-400 block font-medium">CO₂ Averted</span>
        <span className="font-heading font-black text-2xl sm:text-3xl text-emerald-400 my-1 block">
          {impact.monthly.co2Kg} kg
        </span>
        <span className="text-[10px] text-slate-400 block">per month</span>
      </div>

      <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-lg text-center">
        <span className="text-xs text-slate-400 block font-medium">Toxic PM2.5 Prevented</span>
        <span className="font-heading font-black text-2xl sm:text-3xl text-cyan-400 my-1 block">
          {impact.monthly.pm25Grams} g
        </span>
        <span className="text-[10px] text-slate-400 block">stops lung damage</span>
      </div>

      <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-lg text-center">
        <span className="text-xs text-slate-400 block font-medium">Tree Equivalent</span>
        <span className="font-heading font-black text-2xl sm:text-3xl text-teal-300 my-1 block flex items-center justify-center gap-1">
          <TreePine className="w-5 h-5 text-emerald-400 inline" />
          {impact.equivalents.trees}
        </span>
        <span className="text-[10px] text-slate-400 block">mature trees / yr</span>
      </div>

      <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-lg text-center">
        <span className="text-xs text-slate-400 block font-medium">Family Lung Score</span>
        <span className="font-heading font-black text-2xl sm:text-3xl text-amber-400 my-1 block">
          {impact.equivalents.familyAirSanctuaryScore}%
        </span>
        <span className="text-[10px] text-slate-400 block">indoor defense</span>
      </div>
    </div>
  );
}

export default ImpactMetricCards;
