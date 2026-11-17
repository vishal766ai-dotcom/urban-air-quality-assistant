import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Info, 
  Wind, 
  ShieldAlert, 
  Clock, 
  X,
  Sun
} from 'lucide-react';
import { getAqiCategory } from '../data/citiesData';

export function WinterSmogBanner({ city, profile }) {
  const [showInversionModal, setShowInversionModal] = useState(false);
  const aqiCat = getAqiCategory(city.currentAQI);
  const whoRatio = (city.pollutants.pm25 / 15).toFixed(1); // 15 µg/m³ WHO safe standard

  const isSevere = city.currentAQI > 200;

  // Calculate live countdown to the 1:00 PM (13:00) solar ventilation window
  const [windowStatus, setWindowStatus] = useState({ text: 'Opens in ~2h 24m', isNow: false });

  useEffect(() => {
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
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 rounded-full bg-rose-500/10 blur-3xl pointer-events-none"></div>

        {/* Split Command-Center Layout (20% | 55% | 25%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          
          {/* Column 1: Vertical Hazard Pill (20% width -> lg:col-span-3 or lg:col-span-2) */}
          <div className="lg:col-span-3 flex lg:flex-col items-center justify-between lg:justify-center p-3 sm:p-4 rounded-xl bg-slate-950/70 border border-rose-500/40 shadow-inner text-center shrink-0">
            <div className="flex items-center gap-2 mb-0 lg:mb-1">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
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

          {/* Column 2: Actionable Command Center (55% width -> lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-3 min-w-0">
            {/* Header & Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-heading font-extrabold text-base sm:text-lg text-white tracking-tight">
                Winter Smog & Thermal Inversion Alert: {city.name}
              </h2>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${aqiCat.bgBadge}`}>
                {city.category}
              </span>
            </div>

            {/* 3 Crisp Icon-Led Micro-Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-700/70 text-xs">
                <span className="text-base">🪟</span>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase leading-none">Windows</span>
                  <span className="text-xs font-bold text-amber-300">SEALED</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-700/70 text-xs">
                <span className="text-base">😷</span>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase leading-none">Outdoors</span>
                  <span className="text-xs font-bold text-rose-400">N95 REQUIRED</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-700/70 text-xs">
                <span className="text-base">👶</span>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase leading-none">Child Safety</span>
                  <span className="text-xs font-bold text-cyan-300">SEALED TRANSIT</span>
                </div>
              </div>
            </div>

            {/* Demographic Tailored Recommendation (Full break-words & wrap) */}
            <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800 text-xs text-slate-200 break-words leading-relaxed">
              <strong className="text-emerald-400 font-semibold mr-1.5">
                🛡️ Tailored for {profile.label}:
              </strong>
              <span className="break-words">
                {profile.topRecommendations[0]}
              </span>
            </div>
          </div>

          {/* Column 3: Standalone Countdown Card + Inversion Info (25% width -> lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col gap-2.5 shrink-0 min-w-0">
            {/* Standalone Window Countdown Card */}
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

            {/* Why Inversion Traps Smog button */}
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

      {/* Explanatory Modal on Thermal Inversion */}
      {showInversionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-slate-200">
            <button
              onClick={() => setShowInversionModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Wind className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold text-white">Understanding Winter Thermal Inversion</h3>
                <p className="text-xs text-slate-400">Atmospheric Physics of Severe Urban Smog</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
              <p>
                In warm weather, air at ground level is warmed by the sun and rises naturally into the cooler upper atmosphere, carrying vehicle exhaust and dust away (convective dispersion).
              </p>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <h4 className="font-semibold text-amber-300 text-xs uppercase tracking-wider mb-1">
                  The Winter "Lid" Effect
                </h4>
                <p className="text-xs text-slate-300">
                  On cold winter nights, the ground rapidly chills the air directly above it. A layer of warmer, less dense air settles overhead. This warmer layer acts as a tight <strong>atmospheric lid</strong>, locking pollutants into a shallow boundary zone just 100 to 200 meters thick.
                </p>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300">
                <li><strong className="text-rose-300">6:00 AM – 9:30 AM:</strong> Coldest surface temperatures create peak inversion; pollution concentration can be 15x higher.</li>
                <li><strong className="text-emerald-300">1:00 PM – 3:30 PM:</strong> Sun warms the ground, breaking the lid and allowing fresh air circulation.</li>
              </ul>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setShowInversionModal(false)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
