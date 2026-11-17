import React from 'react';
import { Gauge } from 'lucide-react';

/**
 * Breakdown of chemical pollutants and source apportionment.
 * @param {{ city: import('../utils/calculations').CityModel, onNavigateToTab: (tab: string) => void }} props
 */
export function PollutantsBreakdown({ city, onNavigateToTab }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Sub-pollutants (7 Cols) */}
      <div className="lg:col-span-7 rounded-2xl bg-slate-800/80 border border-slate-700/80 p-6 shadow-xl">
        <h3 className="font-heading font-bold text-lg text-white mb-4 flex items-center gap-2">
          <Gauge className="w-5 h-5 text-emerald-400" />
          <span>Key Winter Smog Chemical Pollutants</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/50">
            <span className="text-xs text-slate-400 font-semibold block">PM2.5 (Fine Soot)</span>
            <span className="text-2xl font-heading font-bold text-rose-400">{city.pollutants.pm25}</span>
            <span className="text-xs text-slate-400 block">µg/m³ (WHO: 15)</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/50">
            <span className="text-xs text-slate-400 font-semibold block">PM10 (Coarse Dust)</span>
            <span className="text-2xl font-heading font-bold text-amber-400">{city.pollutants.pm10}</span>
            <span className="text-xs text-slate-400 block">µg/m³ (WHO: 45)</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/50">
            <span className="text-xs text-slate-400 font-semibold block">NO₂ (Diesel / Traffic)</span>
            <span className="text-2xl font-heading font-bold text-orange-400">{city.pollutants.no2}</span>
            <span className="text-xs text-slate-400 block">µg/m³</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/50">
            <span className="text-xs text-slate-400 font-semibold block">SO₂ (Coal & Boilers)</span>
            <span className="text-2xl font-heading font-bold text-purple-400">{city.pollutants.so2}</span>
            <span className="text-xs text-slate-400 block">µg/m³</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/50">
            <span className="text-xs text-slate-400 font-semibold block">CO (Incomplete Burn)</span>
            <span className="text-2xl font-heading font-bold text-cyan-400">{city.pollutants.co}</span>
            <span className="text-xs text-slate-400 block">mg/m³</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/50">
            <span className="text-xs text-slate-400 font-semibold block">O₃ (Ground Ozone)</span>
            <span className="text-2xl font-heading font-bold text-emerald-400">{city.pollutants.o3}</span>
            <span className="text-xs text-slate-400 block">µg/m³</span>
          </div>
        </div>
      </div>

      {/* Source Apportionment (5 Cols) */}
      <div className="lg:col-span-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 p-6 shadow-xl flex flex-col justify-between">
        <div>
          <h3 className="font-heading font-bold text-lg text-white mb-2">
            Where Is This Smog Coming From?
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Scientific source apportionment for {city.name} during winter months
          </p>

          <div className="space-y-3">
            {city.sources.map((s, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span className="font-medium">{s.name}</span>
                  <span className="font-bold text-white">{s.pct}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-700 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full" 
                    style={{ width: `${s.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-300">
          <span>Need low-emission alternatives?</span>
          <button 
            onClick={() => onNavigateToTab('routines')}
            className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-2"
          >
            Explore Commute Routines →
          </button>
        </div>
      </div>

    </div>
  );
}

export default PollutantsBreakdown;
