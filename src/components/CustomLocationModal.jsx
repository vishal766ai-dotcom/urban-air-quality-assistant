import React, { useState } from 'react';
import { MapPin, X, PlusCircle, Check, Sparkles, Navigation } from 'lucide-react';
import { createCustomCity } from '../data/citiesData';

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
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              City or Neighborhood Name:
            </label>
            <input
              type="text"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              placeholder="e.g. Gurugram Sector 56, South Delhi, Noida Extension..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Region or Country:
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="e.g. India, Pakistan, USA..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Current Local AQI:
              </label>
              <input
                type="number"
                min="10"
                max="999"
                value={aqiValue}
                onChange={(e) => setAqiValue(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Currency:
              </label>
              <select
                value={currencyCode}
                onChange={(e) => setCurrencyCode(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
              >
                <option value="INR">₹ INR (India)</option>
                <option value="USD">$ USD (US/Global)</option>
                <option value="PKR">Rs PKR (Pakistan)</option>
                <option value="EUR">€ EUR (Europe)</option>
                <option value="GBP">£ GBP (UK)</option>
                <option value="CNY">¥ CNY (China)</option>
              </select>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400">
            AeroGuardian will automatically synthesize personalized diurnal thermal inversion forecasts, diurnal safe airing windows, and localized DIY purifier specs for your custom zone.
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white shadow-md transition flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Activate Location</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
