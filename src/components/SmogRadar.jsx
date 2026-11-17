import React from 'react';
import { Wind, Droplets, Thermometer, Info, Layers } from 'lucide-react';
import { getAqiCategory } from '../utils/calculations';
import { HourlyTimeline } from './HourlyTimeline';
import { PollutantsBreakdown } from './PollutantsBreakdown';

/**
 * SmogRadar Dashboard Overview component.
 * Displays atmospheric monitoring, microclimate data, safe ventilation timeline, and chemical pollutants.
 * @param {{ city: import('../utils/calculations').CityModel, profile: any, onNavigateToTab: (tab: string) => void }} props
 */
export function SmogRadar({ city, onNavigateToTab }) {
  const cat = getAqiCategory(city.currentAQI);

  return (
    <div className="space-y-6">
      
      {/* Top Grid: Main AQI Gauge & Core Meteorological Drivers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main AQI Card (7 Cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-slate-800/80 border border-slate-700/80 p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Real-Time Atmospheric Monitoring
                </span>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-white flex items-center gap-2">
                  <span>{city.name}</span>
                  <span className="text-sm font-normal text-slate-400">({city.country})</span>
                </h2>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${cat.bgBadge}`}>
                {cat.label}
              </span>
            </div>

            {/* AQI Big Numbers & Dial */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 my-4 p-5 rounded-xl bg-slate-900/60 border border-slate-700/50">
              <div className="flex items-baseline gap-2">
                <span 
                  className="font-heading font-black text-6xl sm:text-7xl tracking-tighter"
                  style={{ color: cat.color }}
                >
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
                  WHO 24-hr guideline is 15 µg/m³. Ambient air is <span className="text-rose-300 font-semibold">{((city.pollutants.pm25 / 15)).toFixed(1)}x over the safe threshold</span>.
                </div>
              </div>
            </div>

            {/* Scale Bar */}
            <div className="space-y-1.5 mt-2">
              <div className="flex justify-between text-xs text-slate-400 font-medium">
                <span>0 Good</span>
                <span>50</span>
                <span>100</span>
                <span>150</span>
                <span>200</span>
                <span>300+ Severe</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-700 overflow-hidden flex">
                <div className="h-full bg-emerald-500 w-[16%]" />
                <div className="h-full bg-amber-500 w-[16%]" />
                <div className="h-full bg-orange-500 w-[16%]" />
                <div className="h-full bg-red-500 w-[16%]" />
                <div className="h-full bg-purple-500 w-[20%]" />
                <div className="h-full bg-rose-900 w-[16%]" />
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed italic border-t border-slate-700/60 pt-3">
            &quot;{cat.desc}&quot;
          </p>
        </div>

        {/* Meteorological Inversion Dynamics (5 Cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-cyan-400" />
                <span>Microclimate & Stagnation</span>
              </h3>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                Live Sensor Feed
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/50">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <Thermometer className="w-4 h-4 text-cyan-400" />
                  <span>Ground Temp</span>
                </div>
                <div className="text-xl font-bold text-white">{city.weather.temp}°C</div>
                <div className="text-xs text-slate-400">Cold dense surface</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/50">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <Droplets className="w-4 h-4 text-blue-400" />
                  <span>Relative Humidity</span>
                </div>
                <div className="text-xl font-bold text-white">{city.weather.humidity}%</div>
                <div className="text-xs text-slate-400">Smog aerosol trap</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/50">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <Wind className="w-4 h-4 text-emerald-400" />
                  <span>Surface Wind</span>
                </div>
                <div className="text-xl font-bold text-white">{city.weather.windSpeed} km/h</div>
                <div className="text-xs text-rose-400 font-medium">Stagnant dispersal</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/50">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <Layers className="w-4 h-4 text-purple-400" />
                  <span>Inversion Risk</span>
                </div>
                <div className="text-xl font-bold text-rose-300">{city.weather.inversionRisk}</div>
                <div className="text-xs text-slate-400">Shallow boundary layer</div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-xs text-cyan-200 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              <strong>Cold air inversion:</strong> Low wind speed ({city.weather.windSpeed} km/h) combined with high humidity keeps toxic aerosols suspended directly at nose-height.
            </span>
          </div>
        </div>

      </div>

      {/* 24-Hour Safe Ventilation Timeline */}
      <HourlyTimeline hourlyForecast={city.hourlyForecast} />

      {/* Sub-Pollutants Grid & Local Source Apportionment */}
      <PollutantsBreakdown city={city} onNavigateToTab={onNavigateToTab} />

    </div>
  );
}

export default SmogRadar;
