import React from 'react';
import { TreePine, Car, Heart, Sparkles } from 'lucide-react';

/**
 * Display grid for mathematical impact, equivalents, and 12-month projections.
 * @param {{ impact: any }} props
 */
export function ImpactDisplay({ impact }) {
  return (
    <div className="lg:col-span-7 space-y-6">
      {/* 4 Metric Cards */}
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

      {/* Narrative Card */}
      <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Direct Impact Explanation</span>
        </div>

        <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
          {impact.directImpactExplanation}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-700/60 text-xs text-slate-300">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/50 flex items-start gap-2.5">
            <Car className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Car Traffic Equivalent:</strong>
              <p className="text-slate-400 mt-0.5">
                Your choices eliminate <strong>{impact.equivalents.carKmAverted} km</strong> of solo car exhaust emissions annually.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/50 flex items-start gap-2.5">
            <Heart className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Alveolar Lung Sparing:</strong>
              <p className="text-slate-400 mt-0.5">
                Your family avoids inhaling an estimated <strong>{(impact.monthly.pm25Grams * 1000).toLocaleString()} micrograms</strong> of carcinogenic heavy metals annually.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Annual Summary */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 flex items-center justify-between">
        <div>
          <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider block">
            12-Month Cumulative Projection
          </span>
          <span className="text-xl sm:text-2xl font-heading font-black text-white">
            {impact.annual.co2Kg} kg CO₂ &amp; {impact.annual.pm25Grams}g PM2.5 Averted
          </span>
          <span className="text-xs text-slate-400 block mt-0.5">
            If 500 families in your community adopt this protocol: <strong>{(impact.annual.co2Kg * 500 / 1000).toFixed(1)} metric tons</strong> of emissions saved!
          </span>
        </div>
      </div>
    </div>
  );
}

export default ImpactDisplay;
