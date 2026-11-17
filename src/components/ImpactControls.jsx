import React from 'react';
import { ImpactSliderInputs } from './ImpactSliderInputs';
import { ImpactHabitToggles } from './ImpactHabitToggles';

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

      <ImpactSliderInputs
        dailyKm={dailyKm}
        setDailyKm={setDailyKm}
        daysPerMonth={daysPerMonth}
        setDaysPerMonth={setDaysPerMonth}
        purifierHours={purifierHours}
        setPurifierHours={setPurifierHours}
      />

      <ImpactHabitToggles
        avoidedBiomassBurn={avoidedBiomassBurn}
        setAvoidedBiomassBurn={setAvoidedBiomassBurn}
        switchedStove={switchedStove}
        setSwitchedStove={setSwitchedStove}
      />
    </div>
  );
}

export default ImpactControls;
