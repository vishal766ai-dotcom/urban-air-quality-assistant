import React from 'react';
import { Clock } from 'lucide-react';
import { getAqiCategory } from '../utils/calculations';

/**
 * 24-Hour Winter Inversion & Safe Ventilation Timeline.
 * @param {{ hourlyForecast: Array<{ hour: string, aqi: number, temp: number, safeVentilation: boolean }> }} props
 */
export function HourlyTimeline({ hourlyForecast }) {
  if (!hourlyForecast || !hourlyForecast.length) return null;

  return (
    <div className="rounded-2xl bg-slate-800/80 border border-slate-700/80 p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            <span>24-Hour Winter Inversion & Safe Ventilation Timeline</span>
          </h3>
          <p className="text-xs text-slate-400">
            Shows how ground warming and nighttime cooling shift hourly pollution spikes
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            Safe Airing Window
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className="w-3 h-3 rounded-full bg-rose-600 inline-block" />
            Peak Inversion Trap
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2.5">
        {hourlyForecast.map((slot, index) => {
          const slotCat = getAqiCategory(slot.aqi);
          return (
            <div 
              key={index} 
              className={`p-3 rounded-xl border flex flex-col items-center justify-between text-center transition ${
                slot.safeVentilation 
                  ? 'bg-emerald-950/50 border-emerald-500/60 ring-2 ring-emerald-500/30' 
                  : 'bg-slate-900/70 border-slate-700/60'
              }`}
            >
              <div className="text-xs font-semibold text-slate-300">{slot.hour}</div>
              <div className="my-2">
                <div 
                  className="font-heading font-black text-xl"
                  style={{ color: slotCat.color }}
                >
                  {slot.aqi}
                </div>
                <div className="text-[10px] text-slate-400">{slot.temp}°C</div>
              </div>
              
              {slot.safeVentilation ? (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold uppercase tracking-tight">
                  Open Window
                </span>
              ) : (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                  Keep Sealed
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HourlyTimeline;
