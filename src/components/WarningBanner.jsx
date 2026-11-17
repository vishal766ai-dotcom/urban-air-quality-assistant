import React, { useState, useEffect } from 'react';
import { Info, Clock, Sun } from 'lucide-react';
import { getAqiCategory } from '../utils/calculations';
import { InversionExplainerModal } from './InversionExplainerModal';

/**
 * Split Command-Center Winter Smog & Thermal Inversion Warning Banner.
 * @param {{ city: import('../utils/calculations').CityModel, profile: any }} props
 */
export function WarningBanner({ city, profile }) {
  const [showInversionModal, setShowInversionModal] = useState(false);
  const aqiCat = getAqiCategory(city.currentAQI);
  const whoRatio = (city.pollutants.pm25 / 15).toFixed(1);
  const isSevere = city.currentAQI > 200;

  const [windowStatus, setWindowStatus] = useState({ text: 'Opens in ~2h 24m', isNow: false });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMin = now.getMinutes();

      if (currentHour >= 13 && (currentHour < 15 || (currentHour === 15 && currentMin <= 30))) {
        setWindowStatus({ text: 'Active Safe Window', isNow: true });
      } else {
        let hoursUntil = 13 - currentHour;
        let minsUntil = 0 - currentMin;
        if (minsUntil < 0) {
          minsUntil += 60;
          hoursUntil -= 1;
        }
        if (hoursUntil < 0) {
          hoursUntil += 24;
        }
        setWindowStatus({ 
          text: `Opens in ${hoursUntil}h ${minsUntil}m`, 
          isNow: false 
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <div 
        className={`relative overflow-hidden rounded-2xl border p-4 sm:p-5 transition-all shadow-xl ${
          isSevere 
            ? 'bg-gradient-to-r from-rose-950/85 via-slate-900 to-amber-950/75 border-rose-600/40 text-rose-100'
            : 'bg-gradient-to-r from-amber-950/65 via-slate-900 to-emerald-950/65 border-amber-600/30 text-amber-100'
        }`}
      >
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />

        {/* Command Center Layout: Left (20%), Middle (55%), Right (25%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          
          {/* Left Hazard Pill */}
          <div className="lg:col-span-3 flex lg:flex-col items-center justify-between lg:justify-center p-3 sm:p-4 rounded-xl bg-slate-950/70 border border-rose-500/40 shadow-inner text-center shrink-0">
            <div className="flex items-center gap-2 mb-0 lg:mb-1">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-rose-300">
                Live Hazard
              </span>
            </div>

            <div className="flex items-baseline lg:flex-col justify-center gap-1.5 my-0.5">
              <span className="font-heading font-black text-3xl sm:text-4xl text-rose-400 tracking-tight">
                {whoRatio}x
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                WHO Limit
              </span>
            </div>

            <span className="text-[10px] text-slate-400 hidden lg:block mt-0.5">
              {city.pollutants.pm25} µg/m³ fine soot
            </span>
          </div>

          {/* Middle: Headline, Action Badges & Tailored Protocol */}
          <div className="lg:col-span-6 space-y-3 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-heading font-extrabold text-base sm:text-lg text-white tracking-tight">
                Winter Smog & Thermal Inversion Alert: {city.name}
              </h2>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${aqiCat.bgBadge}`}>
                {city.category}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-700/70 text-xs">
                <span className="text-base" role="img" aria-label="Window">🪟</span>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase leading-none">Windows</span>
                  <span className="text-xs font-bold text-amber-300">SEALED</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-700/70 text-xs">
                <span className="text-base" role="img" aria-label="Mask">😷</span>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase leading-none">Outdoors</span>
                  <span className="text-xs font-bold text-rose-400">N95 REQUIRED</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-700/70 text-xs">
                <span className="text-base" role="img" aria-label="Child">👶</span>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase leading-none">Child Safety</span>
                  <span className="text-xs font-bold text-cyan-300">SEALED TRANSIT</span>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800 text-xs text-slate-200 break-words leading-relaxed">
              <strong className="text-emerald-400 font-semibold mr-1.5">
                🛡️ Tailored for {profile?.label || 'Household'}:
              </strong>
              <span className="break-words">
                {profile?.topRecommendations?.[0] || 'Seal door drafts with foam tapes and run indoor HEPA filtration.'}
              </span>
            </div>
          </div>

          {/* Right: Countdown Card & Inversion Explainer Trigger */}
          <div className="lg:col-span-3 flex flex-col gap-2.5 shrink-0 min-w-0">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/40 text-center shadow-lg">
              <div className="flex items-center justify-center gap-1.5 text-amber-400 text-[11px] font-bold uppercase tracking-wider mb-1">
                <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
                <span>Safe Airing Window</span>
              </div>
              <div className="text-sm font-extrabold text-white font-mono">
                1:00 PM – 3:30 PM
              </div>
              <div className="mt-1.5">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  windowStatus.isNow 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse' 
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}>
                  <Clock className="w-3 h-3" />
                  <span>{windowStatus.text}</span>
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowInversionModal(true)}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition"
            >
              <Info className="w-3.5 h-3.5 text-cyan-400" />
              <span>Why Inversion Traps Smog?</span>
            </button>
          </div>

        </div>
      </div>

      <InversionExplainerModal 
        isOpen={showInversionModal} 
        onClose={() => setShowInversionModal(false)} 
      />
    </div>
  );
}

export default WarningBanner;
