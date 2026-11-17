import React from 'react';

/**
 * Habit toggles for biomass burning avoidance and clean cooking.
 * @param {{
 *   avoidedBiomassBurn: boolean,
 *   setAvoidedBiomassBurn: (b: boolean) => void,
 *   switchedStove: boolean,
 *   setSwitchedStove: (s: boolean) => void
 * }} props
 */
export function ImpactHabitToggles({
  avoidedBiomassBurn,
  setAvoidedBiomassBurn,
  switchedStove,
  setSwitchedStove
}) {
  return (
    <div className="space-y-3 pt-2 border-t border-slate-700/60">
      <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 cursor-pointer">
        <input
          type="checkbox"
          checked={avoidedBiomassBurn}
          onChange={(e) => setAvoidedBiomassBurn(e.target.checked)}
          className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
        />
        <div className="text-xs">
          <span className="font-semibold text-white block">Prevented Leaf / Trash Burning</span>
          <span className="text-slate-400">Avoided open biomass combustion in neighborhood</span>
        </div>
      </label>

      <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 cursor-pointer">
        <input
          type="checkbox"
          checked={switchedStove}
          onChange={(e) => setSwitchedStove(e.target.checked)}
          className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
        />
        <div className="text-xs">
          <span className="font-semibold text-white block">Zero-Flame Indoor Cooking</span>
          <span className="text-slate-400">Used induction &amp; active range hood instead of gas flames</span>
        </div>
      </label>
    </div>
  );
}

export default ImpactHabitToggles;
