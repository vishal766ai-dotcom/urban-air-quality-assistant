import React from 'react';
import { calculateWhoMultiple } from '../utils/calculations';
import { AqiScaleBar } from './AqiScaleBar';

/**
 * MainAqiCard - Big AQI indicator, EPA/WHO scale bar, and primary hazard alert.
 * @param {{
 *   city: import('../utils/calculations').CityModel,
 *   cat: import('../utils/calculations').AqiCategoryDefinition
 * }} props
 */
export function MainAqiCard({ city, cat }) {
  const whoRatio = calculateWhoMultiple(city.pollutants.pm25);

  return (
    <div className="lg:col-span-7 rounded-2xl bg-slate-800/80 border border-slate-700/80 p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Real-Time Atmospheric Monitoring
              </span>
              {city.isSimulated ? (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Simulated AQI
                </span>
              ) : (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                  </span>
                  <span>Live Open-Meteo Synced</span>
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-white flex items-center gap-2">
              <span>{city.name}</span>
              <span className="text-sm font-normal text-slate-400">({city.country})</span>
            </h2>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${cat.bgBadge}`}>
            {cat.label}
          </span>
        </div>

        {/* AQI Big Numbers */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 my-4 p-5 rounded-xl bg-slate-900/60 border border-slate-700/50">
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-black text-6xl sm:text-7xl tracking-tighter" style={{ color: cat.color }}>
              {city.currentAQI}
            </span>
            <div className="flex flex-col">
              <span className="text-xs uppercase font-bold text-slate-400">Air Quality Index</span>
              <span className="text-xs text-slate-400">US EPA / WHO Standard</span>
            </div>
          </div>

          <div className="h-12 w-px bg-slate-700 hidden sm:block" />

          <div className="space-y-1.5 text-sm">
            <div className="text-slate-300">
              Dominant Hazard: <strong className="text-rose-400 font-bold">PM2.5 ({city.pollutants.pm25} µg/m³)</strong>
            </div>
            <div className="text-xs text-slate-400 leading-relaxed">
              WHO 24-hr guideline is 15 µg/m³. Ambient air is <span className="text-rose-300 font-semibold">{whoRatio}x over safe threshold</span>.
            </div>
          </div>
        </div>

        <AqiScaleBar />
      </div>

      <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed italic border-t border-slate-700/60 pt-3">
        &quot;{cat.desc}&quot;
      </p>
    </div>
  );
}

export default MainAqiCard;
