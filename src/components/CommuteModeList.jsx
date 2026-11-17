import React from 'react';
import { Train, Car, Bus, Fuel, Bike, Footprints } from 'lucide-react';
import { COMMUTE_MODES } from '../data/airQualityData';

const MODE_ICONS = {
  metro: <Train className="w-5 h-5" />,
  'ev-carpool': <Car className="w-5 h-5" />,
  'electric-bus': <Bus className="w-5 h-5" />,
  'solo-ice-car': <Fuel className="w-5 h-5" />,
  motorcycle: <Bike className="w-5 h-5" />
};

const BADGE_CLASSES = {
  metro: 'bg-emerald-950 text-emerald-300 border border-emerald-500/30',
  'solo-ice-car': 'bg-rose-950 text-rose-300 border border-rose-500/30',
  motorcycle: 'bg-amber-950 text-amber-300 border border-amber-500/30'
};

/**
 * List of commute modes with CO2, PM2.5, and exposure ratings.
 * @param {{ selectedCommuteId: string, onSelectMode: (id: string) => void }} props
 */
export function CommuteModeList({ selectedCommuteId, onSelectMode }) {
  return (
    <div className="space-y-2.5">
      {COMMUTE_MODES.map((mode) => {
        const isSelected = mode.id === selectedCommuteId;
        const icon = MODE_ICONS[mode.id] || <Footprints className="w-5 h-5" />;
        const badgeClass = BADGE_CLASSES[mode.id] || 'bg-slate-800 text-slate-300 border border-slate-700';

        return (
          <button
            key={mode.id}
            onClick={() => onSelectMode(mode.id)}
            className={`w-full text-left p-3.5 rounded-xl border transition flex items-center justify-between gap-3 ${
              isSelected 
                ? 'bg-slate-900/90 border-emerald-500 ring-2 ring-emerald-500/30' 
                : 'bg-slate-900/40 border-slate-700/60 hover:bg-slate-700/40'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-300'}`}>
                {icon}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{mode.name}</div>
                <div className="text-xs text-slate-400">
                  {mode.co2PerKm} g CO2e/km • {mode.pm25EmittedPerKm} g PM2.5/km
                </div>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold uppercase ${badgeClass}`}>
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
  );
}

export default CommuteModeList;
