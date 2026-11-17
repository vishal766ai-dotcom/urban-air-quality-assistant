import React from 'react';
import { MapPin, ChevronDown, PlusCircle } from 'lucide-react';
import { getAqiCategory } from '../utils/calculations';

/**
 * City & Smog Hotspot Selector Dropdown.
 * @param {{
 *   selectedCity: import('../utils/calculations').CityModel,
 *   onSelectCity: (city: import('../utils/calculations').CityModel) => void,
 *   citiesList: import('../utils/calculations').CityModel[],
 *   isOpen: boolean,
 *   onToggle: (e: React.MouseEvent) => void,
 *   onClose: () => void,
 *   onOpenCustomCityModal: () => void
 * }} props
 */
export function CitySelectorDropdown({
  selectedCity,
  onSelectCity,
  citiesList,
  isOpen,
  onToggle,
  onClose,
  onOpenCustomCityModal
}) {
  const aqiCat = getAqiCategory(selectedCity.currentAQI);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-sm text-slate-200 transition"
        aria-expanded={isOpen}
        aria-label="Select City"
      >
        <MapPin className="w-4 h-4 text-emerald-400" />
        <span className="font-medium">{selectedCity.name}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${aqiCat.bgBadge}`}>
          AQI {selectedCity.currentAQI}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-72 rounded-xl bg-slate-800 border border-slate-700 shadow-2xl p-2 z-50 animate-fade-in">
          <div className="px-2 py-1 text-xs font-semibold uppercase text-slate-400 tracking-wider">
            Select Smog Hotspot
          </div>
          <div className="max-h-60 overflow-y-auto space-y-1">
            {citiesList.map((city) => {
              const cat = getAqiCategory(city.currentAQI);
              return (
                <button
                  key={city.id}
                  onClick={() => {
                    onSelectCity(city);
                    onClose();
                  }}
                  className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-lg text-sm transition ${
                    city.id === selectedCity.id
                      ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30'
                      : 'text-slate-300 hover:bg-slate-700/60'
                  }`}
                >
                  <div>
                    <div>{city.name}</div>
                    <div className="text-xs text-slate-400">{city.country} ({city.currency?.symbol} {city.currency?.code})</div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${cat.bgBadge}`}>
                    {city.currentAQI}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 mt-1 border-t border-slate-700">
            <button
              onClick={() => {
                onClose();
                onOpenCustomCityModal();
              }}
              className="w-full py-1.5 px-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+ Add Custom Location / Local AQI</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CitySelectorDropdown;
