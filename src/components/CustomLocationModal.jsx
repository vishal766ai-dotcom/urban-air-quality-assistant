import React, { useState } from 'react';
import { MapPin, X } from 'lucide-react';
import { createCustomCity } from '../data/airQualityData';
import { CustomLocationInputs } from './CustomLocationInputs';
import { CustomLocationFooter } from './CustomLocationFooter';

/**
 * Modal to input and activate a custom city or neighborhood.
 * @param {{ isOpen: boolean, onClose: () => void, onAddCity: (c: any) => void }} props
 */
export function CustomLocationModal({ isOpen, onClose, onAddCity }) {
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [aqiValue, setAqiValue] = useState(280);
  const [currencyCode, setCurrencyCode] = useState('INR');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cityName.trim()) return;

    const newCity = createCustomCity({
      name: cityName.trim(),
      country: country.trim() || 'Local Area',
      aqi: Number(aqiValue) || 250,
      currencyCode
    });

    onAddCity(newCity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-slate-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/20">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-bold text-white">Add Custom Location</h3>
            <p className="text-xs text-slate-400">Tailor AeroGuardian to your exact neighborhood</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <CustomLocationInputs
            cityName={cityName}
            setCityName={setCityName}
            country={country}
            setCountry={setCountry}
            aqiValue={aqiValue}
            setAqiValue={setAqiValue}
            currencyCode={currencyCode}
            setCurrencyCode={setCurrencyCode}
          />

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400">
            AeroGuardian will automatically synthesize personalized diurnal thermal inversion forecasts, diurnal safe airing windows, and localized DIY purifier specs for your custom zone.
          </div>

          <CustomLocationFooter onClose={onClose} />
        </form>
      </div>
    </div>
  );
}

export default CustomLocationModal;
