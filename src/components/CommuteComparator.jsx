import React from 'react';
import { Train, Car, Bus, Fuel, Bike, Footprints, Sparkles } from 'lucide-react';
import { COMMUTE_MODES } from '../data/airQualityData';

/**
 * Commute Mode & Exposure Comparison Component.
 * @param {{
 *   selectedCommuteId: string,
 *   setSelectedCommuteId: (id: string) => void,
 *   dailyDistanceKm: number,
 *   setDailyDistanceKm: (dist: number) => void
 * }} props
 */
export function CommuteComparator({
  selectedCommuteId,
  setSelectedCommuteId,
  dailyDistanceKm,
  setDailyDistanceKm
}) {
  const activeMode = COMMUTE_MODES.find(m => m.id === selectedCommuteId) || COMMUTE_MODES[0];
  const dailyCo2 = (activeMode.co2PerKm * dailyDistanceKm) / 1000;
  const baselineSoloCarCo2 = (192 * dailyDistanceKm) / 1000;
  const co2SavedDaily = Math.max(0, baselineSoloCarCo2 - dailyCo2);

  const getModeIcon = (id) => {
    switch (id) {
      case 'metro': return <Train className="w-5 h-5" />;
      case 'ev-carpool': return <Car className="w-5 h-5" />;
      case 'electric-bus': return <Bus className="w-5 h-5" />;
      case 'solo-ice-car': return <Fuel className="w-5 h-5" />;
      case 'motorcycle': return <Bike className="w-5 h-5" />;
      default: return <Footprints className="w-5 h-5" />;
    }
  };

  const getBadgeClass = (id) => {
    if (id === 'metro') return 'bg-emerald-950 text-emerald-300 border border-emerald-500/30';
    if (id === 'solo-ice-car') return 'bg-rose-950 text-rose-300 border border-rose-500/30';
    if (id === 'motorcycle') return 'bg-amber-950 text-amber-300 border border-amber-500/30';
    return 'bg-slate-800 text-slate-300 border border-slate-700';
  };

  return (
    <div className="lg:col-span-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 p-6 shadow-xl space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
          <Train className="w-5 h-5 text-cyan-400" />
          <span>Commute Mode &amp; Exposure Comparison</span>
        </h3>
        <span className="text-xs text-slate-400">Select mode below</span>
      </div>

      {/* Commute Mode Cards */}
      <div className="space-y-2.5">
        {COMMUTE_MODES.map((mode) => {
          const isSelected = mode.id === selectedCommuteId;
          return (
            <button
              key={mode.id}
              onClick={() => setSelectedCommuteId(mode.id)}
              className={`w-full text-left p-3.5 rounded-xl border transition flex items-center justify-between gap-3 ${
                isSelected 
                  ? 'bg-slate-900/90 border-emerald-500 ring-2 ring-emerald-500/30' 
                  : 'bg-slate-900/40 border-slate-700/60 hover:bg-slate-700/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-300'}`}>
                  {getModeIcon(mode.id)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{mode.name}</div>
                  <div className="text-xs text-slate-400">
                    {mode.co2PerKm} g CO2e/km • {mode.pm25EmittedPerKm} g PM2.5/km
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold uppercase ${getBadgeClass(mode.id)}`}>
                  {mode.badge}
                </span>
                <div className="text-[10px] text-slate-400 mt-1">
                  {mode.passengerSmogExposure.split(' ')[0]} exposure
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Distance Slider & Daily Saving */}
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
          <span className="text-slate-400">CO2 emissions with {activeMode.name.split(' ')[0]}:</span>
          <span className="font-bold text-emerald-400">{dailyCo2.toFixed(2)} kg / day</span>
        </div>
        {co2SavedDaily > 0 && (
          <div className="text-xs text-cyan-300 font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>You avoid <strong>{co2SavedDaily.toFixed(2)} kg CO2</strong> every single day vs a solo gasoline car!</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommuteComparator;
