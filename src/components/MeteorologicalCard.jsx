import React from 'react';
import { Wind, Droplets, Thermometer, Info, Layers } from 'lucide-react';

/**
 * MeteorologicalCard - Renders surface temperature, humidity, wind velocity, and inversion risk.
 * @param {{ weather: { temp: number, humidity: number, windSpeed: number, inversionRisk: string } }} props
 */
export function MeteorologicalCard({ weather }) {
  return (
    <div className="lg:col-span-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 p-6 shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-cyan-400" />
            <span>Microclimate &amp; Stagnation</span>
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
            <div className="text-xl font-bold text-white">{weather.temp}°C</div>
            <div className="text-xs text-slate-400">Cold dense surface</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/50">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <Droplets className="w-4 h-4 text-blue-400" />
              <span>Relative Humidity</span>
            </div>
            <div className="text-xl font-bold text-white">{weather.humidity}%</div>
            <div className="text-xs text-slate-400">Smog aerosol trap</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/50">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <Wind className="w-4 h-4 text-emerald-400" />
              <span>Surface Wind</span>
            </div>
            <div className="text-xl font-bold text-white">{weather.windSpeed} km/h</div>
            <div className="text-xs text-rose-400 font-medium">Stagnant dispersal</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/50">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>Inversion Risk</span>
            </div>
            <div className="text-xl font-bold text-rose-300">{weather.inversionRisk}</div>
            <div className="text-xs text-slate-400">Shallow boundary layer</div>
          </div>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-xs text-cyan-200 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <span>
          <strong>Cold air inversion:</strong> Low wind speed ({weather.windSpeed} km/h) combined with high humidity keeps toxic aerosols suspended directly at nose-height.
        </span>
      </div>
    </div>
  );
}

export default MeteorologicalCard;
