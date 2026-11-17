import React from 'react';
import { CheckCircle2 } from 'lucide-react';

/**
 * Technical specification and assembly blueprint card for DIY purifiers.
 * @param {{ selectedPurifier: any, cityName: string }} props
 */
export function PurifierBlueprintCard({ selectedPurifier, cityName }) {
  return (
    <div className="lg:col-span-7 space-y-4">
      <div>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-heading font-bold text-white">
            {selectedPurifier.name}
          </h4>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
            {selectedPurifier.difficulty}
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">{selectedPurifier.recommendedFor}</p>
      </div>

      {/* Quick Metrics Bar */}
      <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-center">
        <div>
          <span className="text-[11px] text-slate-400 block">Total Cost</span>
          <span className="text-base font-bold text-emerald-400">{selectedPurifier.cost}</span>
          <span className="text-[10px] text-slate-400 line-through block">{selectedPurifier.commercialEquivCost}</span>
        </div>
        <div>
          <span className="text-[11px] text-slate-400 block">Airflow CADR</span>
          <span className="text-base font-bold text-cyan-400">{selectedPurifier.cadrRating.split(' ')[0]} CFM</span>
          <span className="text-[10px] text-slate-400 block">Massive volume</span>
        </div>
        <div>
          <span className="text-[11px] text-slate-400 block">Acoustic Hum</span>
          <span className="text-base font-bold text-amber-400">
            {selectedPurifier.soundLevel.split('(')[0].trim()}
          </span>
          <span className="text-[10px] text-slate-400 block">Low white noise</span>
        </div>
      </div>

      {/* Bill of Materials */}
      <div>
        <h5 className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-2">
          Materials Required (Hardware / E-Commerce Available in {cityName}):
        </h5>
        <ul className="space-y-1 text-xs text-slate-300">
          {selectedPurifier.materials.map((mat, i) => (
            <li key={i} className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{mat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Step-by-Step Assembly */}
      <div>
        <h5 className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-2">
          Assembly Instructions:
        </h5>
        <div className="space-y-2">
          {selectedPurifier.steps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-900/50 border border-slate-700/40 text-xs text-slate-200">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold shrink-0 text-[10px]">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PurifierBlueprintCard;
