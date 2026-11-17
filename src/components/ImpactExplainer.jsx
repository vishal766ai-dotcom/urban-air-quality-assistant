import React, { useState } from 'react';
import { 
  BarChart3, 
  TreePine, 
  Car, 
  Heart, 
  ShieldCheck, 
  Award, 
  Share2, 
  Sparkles, 
  Flame, 
  Wind,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { calculatePersonalImpact } from '../services/impactCalculator';

export function ImpactExplainer({ city, profile }) {
  const [commuteMode, setCommuteMode] = useState('metro');
  const [dailyKm, setDailyKm] = useState(20);
  const [daysPerMonth, setDaysPerMonth] = useState(22);
  const [switchedStove, setSwitchedStove] = useState(true);
  const [avoidedBiomassBurn, setAvoidedBiomassBurn] = useState(true);
  const [purifierHours, setPurifierHours] = useState(14);
  const [showCertificate, setShowCertificate] = useState(false);

  const impact = calculatePersonalImpact({
    commuteMode,
    baselineMode: 'solo-ice-car',
    dailyKm,
    daysPerMonth,
    switchedStove,
    avoidedBiomassBurn,
    diyPurifierHoursPerDay: purifierHours
  });

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950/60 border border-slate-700/80 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <BarChart3 className="w-4 h-4" />
              <span>Quantified Impact Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
              Direct Impact Explainer & Emissions Savings Calculator
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              See the exact mathematical impact of your lifestyle choices on personal lung health, family exposure, and neighborhood air quality in {city.name}.
            </p>
          </div>

          <button
            onClick={() => setShowCertificate(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold text-sm shadow-lg shadow-emerald-700/30 transition transform active:scale-95 shrink-0"
          >
            <Award className="w-4 h-4" />
            <span>Generate Clean Air Certificate</span>
          </button>
        </div>
      </div>

      {/* 2-Column: Sliders on Left (5 Cols), Live Results on Right (7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Lifestyle Toggles */}
        <div className="lg:col-span-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 p-6 shadow-xl space-y-5">
          <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
            <span>Your Daily Choices</span>
          </h3>

          {/* Commute Mode Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Alternative Commute Mode:</label>
            <select
              value={commuteMode}
              onChange={(e) => setCommuteMode(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
            >
              <option value="metro">Electric Metro / Subway (Cleanest)</option>
              <option value="ev-carpool">EV Carpool (3+ Passengers)</option>
              <option value="electric-bus">Public Transit Bus</option>
              <option value="walk-bike">Bicycle / Walking (Afternoon low-AQI hours)</option>
              <option value="motorcycle">Two-Wheeler (High personal exposure)</option>
            </select>
          </div>

          {/* Distance Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Roundtrip Distance (km/day):</span>
              <span className="font-bold text-emerald-400 font-mono">{dailyKm} km</span>
            </div>
            <input 
              type="range"
              min="4"
              max="60"
              value={dailyKm}
              onChange={(e) => setDailyKm(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Days Commuted Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Commute Days Per Month:</span>
              <span className="font-bold text-cyan-400 font-mono">{daysPerMonth} days</span>
            </div>
            <input 
              type="range"
              min="5"
              max="30"
              value={daysPerMonth}
              onChange={(e) => setDaysPerMonth(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>

          {/* DIY Purifier Hours Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">DIY / HEPA Purifier Active (hrs/day):</span>
              <span className="font-bold text-amber-400 font-mono">{purifierHours} hours</span>
            </div>
            <input 
              type="range"
              min="0"
              max="24"
              value={purifierHours}
              onChange={(e) => setPurifierHours(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Checkbox Options */}
          <div className="space-y-3 pt-2 border-t border-slate-700/60">
            <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 cursor-pointer">
              <input
                type="checkbox"
                checked={avoidedBiomassBurn}
                onChange={(e) => setAvoidedBiomassBurn(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
              />
              <div className="text-xs">
                <span className="font-semibold text-white block">Prevented Leaf / Trash Burning</span>
                <span className="text-slate-400">Avoided open biomass combustion in neighborhood</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 cursor-pointer">
              <input
                type="checkbox"
                checked={switchedStove}
                onChange={(e) => setSwitchedStove(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
              />
              <div className="text-xs">
                <span className="font-semibold text-white block">Zero-Flame Indoor Cooking</span>
                <span className="text-slate-400">Used induction & active range hood instead of gas flames</span>
              </div>
            </label>
          </div>
        </div>

        {/* Right Column: Live Mathematical Impact & Equivalents */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-lg text-center">
              <span className="text-xs text-slate-400 block font-medium">CO₂ Averted</span>
              <span className="font-heading font-black text-2xl sm:text-3xl text-emerald-400 my-1 block">
                {impact.monthly.co2Kg} kg
              </span>
              <span className="text-[10px] text-slate-400 block">per month</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-lg text-center">
              <span className="text-xs text-slate-400 block font-medium">Toxic PM2.5 Prevented</span>
              <span className="font-heading font-black text-2xl sm:text-3xl text-cyan-400 my-1 block">
                {impact.monthly.pm25Grams} g
              </span>
              <span className="text-[10px] text-slate-400 block">stops lung damage</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-lg text-center">
              <span className="text-xs text-slate-400 block font-medium">Tree Equivalent</span>
              <span className="font-heading font-black text-2xl sm:text-3xl text-teal-300 my-1 block flex items-center justify-center gap-1">
                <TreePine className="w-5 h-5 text-emerald-400 inline" />
                {impact.equivalents.trees}
              </span>
              <span className="text-[10px] text-slate-400 block">mature trees / yr</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-lg text-center">
              <span className="text-xs text-slate-400 block font-medium">Family Lung Score</span>
              <span className="font-heading font-black text-2xl sm:text-3xl text-amber-400 my-1 block">
                {impact.equivalents.familyAirSanctuaryScore}%
              </span>
              <span className="text-[10px] text-slate-400 block">indoor defense</span>
            </div>

          </div>

          {/* Plain English Direct Impact Explanation Card */}
          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Direct Impact Explanation</span>
            </div>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
              {impact.directImpactExplanation}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-700/60 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/50 flex items-start gap-2.5">
                <Car className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Car Traffic Equivalent:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Your choices eliminate <strong>{impact.equivalents.carKmAverted} km</strong> of solo car exhaust emissions annually.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/50 flex items-start gap-2.5">
                <Heart className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Alveolar Lung Sparing:</strong>
                  <p className="text-slate-400 mt-0.5">
                    Your family avoids inhaling an estimated <strong>{(impact.monthly.pm25Grams * 1000).toLocaleString()} micrograms</strong> of carcinogenic heavy metals annually.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Annual Projection Summary */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 flex items-center justify-between">
            <div>
              <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider block">
                12-Month Cumulative Projection
              </span>
              <span className="text-xl sm:text-2xl font-heading font-black text-white">
                {impact.annual.co2Kg} kg CO₂ & {impact.annual.pm25Grams}g PM2.5 Averted
              </span>
              <span className="text-xs text-slate-400 block mt-0.5">
                If 500 families in your community adopt this protocol: <strong>{(impact.annual.co2Kg * 500 / 1000).toFixed(1)} metric tons</strong> of emissions saved!
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Gamified Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-3xl max-w-xl w-full p-8 shadow-2xl relative text-center text-slate-200">
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white transition"
            >
              ✕
            </button>

            <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400 mb-3 border border-emerald-500/30">
              <Award className="w-8 h-8" />
            </div>

            <div className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-1">
              Certificate of Climate & Lung Defense
            </div>
            <h3 className="text-2xl font-heading font-black text-white">
              Clean Air Community Champion
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Issued by AeroGuardian for exemplary winter smog mitigation in {city.name}
            </p>

            <div className="my-6 p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Tailored Household:</span>
                <span className="font-semibold text-white">{profile.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Monthly Greenhouse Gas Averted:</span>
                <span className="font-bold text-emerald-400">{impact.monthly.co2Kg} kg CO₂e</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Toxic Particulate Kept from Air:</span>
                <span className="font-bold text-cyan-400">{impact.monthly.pm25Grams} g PM2.5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Community Tree Absorption Equivalent:</span>
                <span className="font-bold text-teal-300">{impact.equivalents.trees} Trees</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition"
              >
                Print / Save Certificate
              </button>
              <button
                onClick={() => setShowCertificate(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
