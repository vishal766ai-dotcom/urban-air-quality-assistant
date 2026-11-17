import React, { useState, useEffect } from 'react';
import { Radio } from 'lucide-react';
import { getAqiCategory, calculateAiringCountdown, calculateWhoMultiple } from '../utils/calculations';
import { InversionExplainerModal } from './InversionExplainerModal';
import { SafeWindowCard } from './SafeWindowCard';

/**
 * Split Command-Center Winter Smog & Thermal Inversion Warning Banner.
 * Dynamically shifts between Green (Clean Air), Amber (Caution), and Crimson (Critical Lockdown).
 * @param {{
 *   city: import('../utils/calculations').CityModel,
 *   profile: any,
 *   isLiveSynced?: boolean,
 *   isSimulated?: boolean
 * }} props
 */
export function WarningBanner({ city, profile, isLiveSynced = false, isSimulated = false }) {
  const [showInversionModal, setShowInversionModal] = useState(false);
  const aqiCat = getAqiCategory(city.currentAQI);
  const whoRatio = calculateWhoMultiple(city.pollutants.pm25);
  
  const aqi = city.currentAQI;
  const isGood = aqi <= 50;
  const isModerate = aqi > 50 && aqi <= 200;

  const [windowStatus, setWindowStatus] = useState(() => calculateAiringCountdown());

  useEffect(() => {
    const updateCountdown = () => {
      setWindowStatus(calculateAiringCountdown());
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  const getContainerStyle = () => {
    if (isGood) {
      return 'bg-gradient-to-r from-emerald-950/85 via-slate-900 to-teal-950/75 border-emerald-500/50 text-emerald-100';
    }
    if (isModerate) {
      return 'bg-gradient-to-r from-amber-950/75 via-slate-900 to-slate-900 border-amber-500/40 text-amber-100';
    }
    return 'bg-gradient-to-r from-rose-950/85 via-slate-900 to-amber-950/75 border-rose-600/50 text-rose-100';
  };

  return (
    <div className="w-full">
      <div className={`relative overflow-hidden rounded-2xl border p-4 sm:p-5 transition-all shadow-xl ${getContainerStyle()}`}>
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          
          {/* Left Hazard Pill */}
          <div className="lg:col-span-3 flex lg:flex-col items-center justify-between lg:justify-center p-3 sm:p-4 rounded-xl bg-slate-950/70 border border-slate-700/60 shadow-inner text-center shrink-0">
            <div className="flex items-center gap-2 mb-0 lg:mb-1">
              <span className="relative flex h-3 w-3">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isGood ? 'bg-emerald-400' : isModerate ? 'bg-amber-400' : 'bg-rose-400'
                }`} />
                <span className={`relative inline-flex rounded-full h-3 w-3 ${
                  isGood ? 'bg-emerald-500' : isModerate ? 'bg-amber-500' : 'bg-rose-500'
                }`} />
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${
                isGood ? 'text-emerald-300' : isModerate ? 'text-amber-300' : 'text-rose-300'
              }`}>
                {isGood ? 'Safe Air' : isModerate ? 'Caution' : 'Live Hazard'}
              </span>
            </div>

            <div className="flex items-baseline lg:flex-col justify-center gap-1.5 my-0.5">
              <span className={`font-heading font-black text-3xl sm:text-4xl tracking-tight ${
                isGood ? 'text-emerald-400' : isModerate ? 'text-amber-400' : 'text-rose-400'
              }`}>
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
                {isGood ? 'Safe Air Quality & Clear Skies' : isModerate ? 'Moderate Winter Smog Caution' : 'Thermal Inversion Lockdown'}: {city.name}
              </h2>

              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${aqiCat.bgBadge}`}>
                {city.category}
              </span>

              {isSimulated ? (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Simulated Scenario
                </span>
              ) : isLiveSynced ? (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  <Radio className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
                  <span>Live API Synced</span>
                </span>
              ) : null}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-700/70 text-xs">
                <span className="text-base" role="img" aria-label="Window">🪟</span>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase leading-none">Windows</span>
                  <span className={`text-xs font-bold ${isGood ? 'text-emerald-300' : isModerate ? 'text-amber-300' : 'text-rose-400'}`}>
                    {isGood ? 'VENTILATE' : isModerate ? 'SELECTIVE' : 'SEALED'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-700/70 text-xs">
                <span className="text-base" role="img" aria-label="Mask">😷</span>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase leading-none">Outdoors</span>
                  <span className={`text-xs font-bold ${isGood ? 'text-emerald-300' : isModerate ? 'text-amber-300' : 'text-rose-400'}`}>
                    {isGood ? 'SAFE OUTDOORS' : isModerate ? 'MASK SENSITIVE' : 'N95 REQUIRED'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-700/70 text-xs">
                <span className="text-base" role="img" aria-label="Child">👶</span>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase leading-none">Child Safety</span>
                  <span className={`text-xs font-bold ${isGood ? 'text-emerald-300' : isModerate ? 'text-cyan-300' : 'text-cyan-300'}`}>
                    {isGood ? 'OUTDOOR PLAY' : isModerate ? 'INDOOR REC' : 'SEALED TRANSIT'}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800 text-xs text-slate-200 break-words leading-relaxed">
              <strong className="text-emerald-400 font-semibold mr-1.5">
                🛡️ Tailored for {profile?.label || 'Household'}:
              </strong>
              <span className="break-words">
                {isGood 
                  ? 'Open opposite windows to flush indoor CO2 and welcome fresh ambient air.' 
                  : isModerate
                  ? 'Limit high-intensity morning outdoor jogging. Keep indoor HEPA running in living areas.'
                  : (profile?.topRecommendations?.[0] || 'Seal door drafts with foam tapes and run indoor HEPA filtration.')}
              </span>
            </div>
          </div>

          {/* Right: Countdown Card & Inversion Trigger */}
          <SafeWindowCard
            windowStatus={windowStatus}
            isGood={isGood}
            onOpenInversionModal={() => setShowInversionModal(true)}
          />

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
