import React from 'react';

/**
 * Sliders for daily distance, monthly commute days, and purifier hours.
 * @param {{
 *   dailyKm: number,
 *   setDailyKm: (d: number) => void,
 *   daysPerMonth: number,
 *   setDaysPerMonth: (d: number) => void,
 *   purifierHours: number,
 *   setPurifierHours: (h: number) => void
 * }} props
 */
export function ImpactSliderInputs({
  dailyKm,
  setDailyKm,
  daysPerMonth,
  setDaysPerMonth,
  purifierHours,
  setPurifierHours
}) {
  return (
    <>
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
    </>
  );
}

export default ImpactSliderInputs;
