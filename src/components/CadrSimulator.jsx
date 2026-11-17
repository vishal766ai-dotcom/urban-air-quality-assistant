import React from 'react';
import { Gauge } from 'lucide-react';
import { calculateTurnoverMinutes, calculateAirChangesPerHour } from '../utils/calculations';

/**
 * Interactive Clean Air Delivery Rate (CADR) & Room Turnover Simulator.
 * @param {{
 *   roomSizeSqFt: number,
 *   setRoomSizeSqFt: (size: number) => void,
 *   activePurifierId: string,
 *   cityName: string
 * }} props
 */
const CADR_PRESETS = {
  'corsi-rosenthal': 580,
  'budget-single-fan': 220
};

export function CadrSimulator({ roomSizeSqFt, setRoomSizeSqFt, activePurifierId, cityName }) {
  const cadrNum = CADR_PRESETS[activePurifierId] || 160;
  const minutesPerAirChange = calculateTurnoverMinutes(roomSizeSqFt, cadrNum);
  const airChangesPerHour = calculateAirChangesPerHour(roomSizeSqFt, cadrNum);

  return (
    <div className="lg:col-span-5 rounded-xl bg-slate-900/80 border border-slate-700/80 p-5 flex flex-col justify-between space-y-4">
      <div>
        <h4 className="font-heading font-bold text-base text-white flex items-center gap-2 mb-2">
          <Gauge className="w-4 h-4 text-emerald-400" />
          <span>Clean Air Delivery Simulator</span>
        </h4>
        <p className="text-xs text-slate-400 leading-relaxed">
          Test how fast this purifier scrubs winter smog in your specific room size.
        </p>

        {/* Room Size Slider */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300">Your Room Size:</span>
            <span className="font-bold text-white font-mono">{roomSizeSqFt} sq ft</span>
          </div>
          <input 
            type="range"
            min="100"
            max="800"
            step="25"
            value={roomSizeSqFt}
            onChange={(e) => setRoomSizeSqFt(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
            aria-label="Room size in square feet"
          />
        </div>

        {/* Simulation Result Output */}
        <div className="mt-5 p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Complete Air Turnover:</span>
            <span className="text-sm font-bold text-emerald-400 font-mono">Every {minutesPerAirChange} mins</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Air Changes Per Hour (ACH):</span>
            <span className="text-sm font-bold text-cyan-400 font-mono">{airChangesPerHour} ACH</span>
          </div>
          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300 leading-relaxed">
            {airChangesPerHour >= 5 ? (
              <span className="text-emerald-300 font-medium">
                ✅ <strong>Medical Grade Standard:</strong> Exceeds CDC &amp; Harvard guidelines for clean indoor air exchange.
              </span>
            ) : (
              <span className="text-amber-300">
                ⚠️ Acceptable, but consider running on high speed or adding a second unit for very large halls.
              </span>
            )}
          </div>
        </div>

        {/* Shroud Lifehack Note */}
        <div className="mt-4 p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200">
          <strong>💡 The 25% Boost Shroud Hack:</strong> Box fans have dead zones at the blade corners. Taping a 15-inch circular cardboard shroud over the front increases velocity and prevents dirty air from swirling back into the room!
        </div>
      </div>

      <div className="text-[11px] text-slate-400 italic">
        *Filter lifespan in severe winter smog ({cityName}): Replace MERV 13 / H11 filters every 5–6 months.
      </div>
    </div>
  );
}

export default CadrSimulator;
