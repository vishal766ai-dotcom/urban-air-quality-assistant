import React from 'react';
import { 
  Wind, 
  Droplets, 
  Thermometer, 
  Gauge, 
  ShieldCheck, 
  AlertCircle, 
  Clock, 
  Check, 
  Info,
  Layers
} from 'lucide-react';
import { getAqiCategory } from '../data/citiesData';

export function DashboardOverview({ city, profile, onNavigateToTab }) {
  const cat = getAqiCategory(city.currentAQI);

  return (
    <div className="space-y-6">
      
      {/* Top Grid: Main AQI Gauge & Core Meteorological Drivers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main AQI Card (7 Cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-slate-800/80 border border-slate-700/80 p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none"></div>

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

              <div className="h-12 w-px bg-slate-700 hidden sm:block"></div>

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
                <div className="h-full bg-emerald-500 w-[16%]"></div>
                <div className="h-full bg-amber-500 w-[16%]"></div>
                <div className="h-full bg-orange-500 w-[16%]"></div>
                <div className="h-full bg-red-500 w-[16%]"></div>
                <div className="h-full bg-purple-500 w-[20%]"></div>
                <div className="h-full bg-rose-900 w-[16%]"></div>
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed italic border-t border-slate-700/60 pt-3">
            "{cat.desc}"
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

      {/* 24-Hour Winter Smog & Thermal Inversion Timeline */}
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
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              Safe Airing Window
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-3 h-3 rounded-full bg-rose-600 inline-block"></span>
              Peak Inversion Trap
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2.5">
          {city.hourlyForecast.map((slot, index) => {
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

      {/* Sub-Pollutants Grid & Local Source Apportionment */}
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
                    ></div>
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

    </div>
  );
}
