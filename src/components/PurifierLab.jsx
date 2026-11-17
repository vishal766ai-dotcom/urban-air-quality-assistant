import React, { useState } from 'react';
import { Sparkles, Wrench, Coins } from 'lucide-react';
import { DIY_PURIFIERS, INDOOR_AIR_HACKS, AIR_PLANTS_DATA, getPurifierLocalizedData } from '../data/airQualityData';
import { CadrSimulator } from './CadrSimulator';
import { PurifierBlueprintCard } from './PurifierBlueprintCard';
import { NonFilterHacksList } from './NonFilterHacksList';
import { AirPlantsList } from './AirPlantsList';

/**
 * PurifierLab & IAQ Hacks Studio.
 * @param {{ city: import('../utils/calculations').CityModel }} props
 */
export function PurifierLab({ city }) {
  const [activePurifierId, setActivePurifierId] = useState('corsi-rosenthal');
  const [roomSizeSqFt, setRoomSizeSqFt] = useState(300);

  const rawPurifier = DIY_PURIFIERS.find(p => p.id === activePurifierId) || DIY_PURIFIERS[0];
  const selectedPurifier = getPurifierLocalizedData(rawPurifier, city.currency?.code || 'INR');

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950/60 border border-slate-700/80 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
            <Wrench className="w-4 h-4" />
            <span>Engineering Indoor Clean Air</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2.5 py-1 rounded-full font-medium w-fit">
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span>Localized Pricing: {city.name} ({city.currency?.symbol} {city.currency?.code})</span>
          </div>
        </div>
        <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
          Indoor Air Quality (IAQ) Hacks &amp; DIY Purifier Lab
        </h2>
        <p className="text-sm text-slate-300 mt-1 max-w-3xl">
          During severe winter smog in {city.name}, indoor air is often worse than outdoor air due to trapped cooking fumes and dust. Build a certified clean air sanctuary for your family.
        </p>
      </div>

      {/* SECTION 1: DIY Purifier Interactive Builder */}
      <div className="rounded-2xl bg-slate-800/80 border border-slate-700/80 p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700 pb-4">
          <div>
            <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>DIY Air Purifier Blueprints</span>
            </h3>
            <p className="text-xs text-slate-400">
              Peer-reviewed open source designs that match or outperform high-end commercial HEPA units
            </p>
          </div>

          <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-700">
            {DIY_PURIFIERS.map((purifier) => (
              <button
                key={purifier.id}
                onClick={() => setActivePurifierId(purifier.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  purifier.id === activePurifierId ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                {purifier.name.split(' ')[0]} {purifier.id === 'budget-single-fan' ? 'Single-Fan' : ''}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <PurifierBlueprintCard selectedPurifier={selectedPurifier} cityName={city.name} />
          <CadrSimulator 
            roomSizeSqFt={roomSizeSqFt} 
            setRoomSizeSqFt={setRoomSizeSqFt} 
            activePurifierId={activePurifierId} 
            cityName={city.name} 
          />
        </div>
      </div>

      {/* SECTION 2 & 3: Extracted Clean Sub-components */}
      <NonFilterHacksList hacks={INDOOR_AIR_HACKS} />
      <AirPlantsList plants={AIR_PLANTS_DATA} />
    </div>
  );
}

export default PurifierLab;
