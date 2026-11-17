import React from 'react';
import { Gauge } from 'lucide-react';
import { SourceApportionmentPanel } from './SourceApportionmentPanel';

/**
 * Breakdown of chemical pollutants and source apportionment.
 * @param {{ city: import('../utils/calculations').CityModel, onNavigateToTab: (tab: string) => void }} props
 */
export function PollutantsBreakdown({ city, onNavigateToTab }) {
  const pollutantCards = [
    { label: 'PM2.5 (Fine Soot)', val: city.pollutants.pm25, unit: 'µg/m³ (WHO: 15)', color: 'text-rose-400' },
    { label: 'PM10 (Coarse Dust)', val: city.pollutants.pm10, unit: 'µg/m³ (WHO: 45)', color: 'text-amber-400' },
    { label: 'NO₂ (Diesel / Traffic)', val: city.pollutants.no2, unit: 'µg/m³', color: 'text-orange-400' },
    { label: 'SO₂ (Coal & Boilers)', val: city.pollutants.so2, unit: 'µg/m³', color: 'text-purple-400' },
    { label: 'CO (Incomplete Burn)', val: city.pollutants.co, unit: 'mg/m³', color: 'text-cyan-400' },
    { label: 'O₃ (Ground Ozone)', val: city.pollutants.o3, unit: 'µg/m³', color: 'text-emerald-400' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 rounded-2xl bg-slate-800/80 border border-slate-700/80 p-6 shadow-xl">
        <h3 className="font-heading font-bold text-lg text-white mb-4 flex items-center gap-2">
          <Gauge className="w-5 h-5 text-emerald-400" />
          <span>Key Winter Smog Chemical Pollutants</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {pollutantCards.map((p, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/50">
              <span className="text-xs text-slate-400 font-semibold block">{p.label}</span>
              <span className={`text-2xl font-heading font-bold ${p.color}`}>{p.val}</span>
              <span className="text-xs text-slate-400 block">{p.unit}</span>
            </div>
          ))}
        </div>
      </div>

      <SourceApportionmentPanel city={city} onNavigateToTab={onNavigateToTab} />
    </div>
  );
}

export default PollutantsBreakdown;
