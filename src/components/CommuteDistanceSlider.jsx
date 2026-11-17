import React from 'react';
import { Sparkles } from 'lucide-react';

/**
 * CommuteDistanceSlider component.
 * @param {{
 *   dailyDistanceKm: number,
 *   setDailyDistanceKm: (dist: number) => void,
 *   activeModeName: string,
 *   dailyCo2: number,
 *   co2SavedDaily: number
 * }} props
 */
export function CommuteDistanceSlider({
  dailyDistanceKm,
  setDailyDistanceKm,
  activeModeName,
  dailyCo2,
  co2SavedDaily
}) {
  return (
    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/80 space-y-3">
      <div className="flex justify-between items-center text-xs">
        <span className="text-slate-300 font-medium">Daily Commute Distance:</span>
        <span className="font-bold text-white font-mono">{dailyDistanceKm} km roundtrip</span>
      </div>
      <input 
        type="range"
        min="5"
        max="60"
        value={dailyDistanceKm}
        onChange={(e) => setDailyDistanceKm(Number(e.target.value))}
        className="w-full accent-emerald-500 cursor-pointer"
        aria-label="Daily Commute Distance"
      />

      <div className="pt-2 border-t border-slate-800 flex justify-between text-xs">
        <span className="text-slate-400">CO2 emissions with {activeModeName.split(' ')[0]}:</span>
        <span className="font-bold text-emerald-400">{dailyCo2.toFixed(2)} kg / day</span>
      </div>
      {co2SavedDaily > 0 && (
        <div className="text-xs text-cyan-300 font-medium flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>You avoid <strong>{co2SavedDaily.toFixed(2)} kg CO2</strong> every single day vs a solo gasoline car!</span>
        </div>
      )}
    </div>
  );
}

export default CommuteDistanceSlider;
