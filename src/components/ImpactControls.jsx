import React from 'react';

/**
 * Interactive Controls for Lifestyle Choices (Commute, Distance, Days, Purifier Hours, Stoves).
 * @param {{
 *   commuteMode: string,
 *   setCommuteMode: (m: string) => void,
 *   dailyKm: number,
 *   setDailyKm: (d: number) => void,
 *   daysPerMonth: number,
 *   setDaysPerMonth: (d: number) => void,
 *   purifierHours: number,
 *   setPurifierHours: (h: number) => void,
 *   avoidedBiomassBurn: boolean,
 *   setAvoidedBiomassBurn: (b: boolean) => void,
 *   switchedStove: boolean,
 *   setSwitchedStove: (s: boolean) => void
 * }} props
 */
export function ImpactControls({
  commuteMode,
  setCommuteMode,
  dailyKm,
  setDailyKm,
  daysPerMonth,
  setDaysPerMonth,
  purifierHours,
  setPurifierHours,
  avoidedBiomassBurn,
  setAvoidedBiomassBurn,
  switchedStove,
  setSwitchedStove
}) {
  return (
    <div className="lg:col-span-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 p-6 shadow-xl space-y-5">
      <h3 className="font-heading font-bold text-lg text-white">Your Daily Choices</h3>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300">Alternative Commute Mode:</label>
        <select
          value={commuteMode}
          onChange={(e) => setCommuteMode(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
        >
          <option value="metro">Electric Metro / Subway (Cleanest)</option>
          <option value="ev-carpool">EV Carpool (3+ Passengers)</option>
          <option value="electric-bus">Public Transit Bus</option>
          <option value="walk-bike">Bicycle / Walking (Afternoon low-AQI hours)</option>
          <option value="motorcycle">Two-Wheeler (High personal exposure)</option>
        </select>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-slate-300">Roundtrip Distance (km/day):</span>
          <span className="font-bold text-emerald-400 font-mono">{dailyKm} km</span>
        </div>
        <input 
          type="range"
          min="4"
          max="60"
          value={dailyKm}
          onChange={(e) => setDailyKm(Number(e.target.value))}
          className="w-full accent-emerald-500 cursor-pointer"
          aria-label="Daily roundtrip distance in kilometers"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-slate-300">Commute Days Per Month:</span>
          <span className="font-bold text-cyan-400 font-mono">{daysPerMonth} days</span>
        </div>
        <input 
          type="range"
          min="5"
          max="30"
          value={daysPerMonth}
          onChange={(e) => setDaysPerMonth(Number(e.target.value))}
          className="w-full accent-cyan-500 cursor-pointer"
          aria-label="Commute days per month"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-slate-300">DIY / HEPA Purifier Active (hrs/day):</span>
          <span className="font-bold text-amber-400 font-mono">{purifierHours} hours</span>
        </div>
        <input 
          type="range"
          min="0"
          max="24"
          value={purifierHours}
          onChange={(e) => setPurifierHours(Number(e.target.value))}
          className="w-full accent-amber-500 cursor-pointer"
          aria-label="Purifier operating hours per day"
        />
      </div>

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
    </div>
  );
}

export default ImpactControls;
