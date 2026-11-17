import React, { useState } from 'react';
import { 
  Sparkles, 
  Wrench, 
  Leaf, 
  Wind, 
  ShieldCheck, 
  CheckCircle2, 
  DollarSign, 
  Volume2, 
  Gauge, 
  AlertCircle,
  HelpCircle,
  ExternalLink,
  Coins
} from 'lucide-react';
import { DIY_PURIFIERS, INDOOR_AIR_HACKS, AIR_PLANTS_DATA, getPurifierLocalizedData } from '../data/iaqHacks';

export function IaqHacksStudio({ city, profile }) {
  const [activePurifierId, setActivePurifierId] = useState('corsi-rosenthal');
  const [roomSizeSqFt, setRoomSizeSqFt] = useState(300);

  const rawPurifier = DIY_PURIFIERS.find(p => p.id === activePurifierId) || DIY_PURIFIERS[0];
  const selectedPurifier = getPurifierLocalizedData(rawPurifier, city.currency?.code || 'INR');

  // Air cleaning time simulation
  // Room Volume = roomSizeSqFt * 8.5 ft ceiling = cubic feet
  // Time for 1 air exchange = Room Volume / CADR
  const roomVolume = roomSizeSqFt * 8.5;
  const cadrNum = activePurifierId === 'corsi-rosenthal' ? 580 : activePurifierId === 'budget-single-fan' ? 220 : 160;
  const minutesPerAirChange = Math.max(4, Math.round((roomVolume / cadrNum)));
  const airChangesPerHour = (60 / minutesPerAirChange).toFixed(1);

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
          Indoor Air Quality (IAQ) Hacks & DIY Purifier Lab
        </h2>
        <p className="text-sm text-slate-300 mt-1 max-w-3xl">
          During severe winter smog in {city.name}, indoor air is often <strong>worse than outdoor air</strong> due to trapped cooking fumes, resuspension of dust, and draft infiltration. Use these open-source engineering hacks and natural solutions to build a certified clean air sanctuary for your family.
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

          {/* Model Switcher Tabs */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-700">
            {DIY_PURIFIERS.map((purifier) => (
              <button
                key={purifier.id}
                onClick={() => setActivePurifierId(purifier.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  purifier.id === activePurifierId
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {purifier.name.split(' ')[0]} {purifier.id === 'budget-single-fan' ? 'Single-Fan' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Purifier Details & Interactive CADR Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Blueprint Specs & Steps (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-heading font-bold text-white">
                  {selectedPurifier.name}
                </h4>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  {selectedPurifier.difficulty}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{selectedPurifier.recommendedFor}</p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-center">
              <div>
                <span className="text-[11px] text-slate-400 block">Total Cost</span>
                <span className="text-base font-bold text-emerald-400">{selectedPurifier.cost}</span>
                <span className="text-[10px] text-slate-400 line-through block">{selectedPurifier.commercialEquivCost}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Airflow CADR</span>
                <span className="text-base font-bold text-cyan-400">{selectedPurifier.cadrRating.split(' ')[0]} CFM</span>
                <span className="text-[10px] text-slate-400 block">Massive volume</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Acoustic Hum</span>
                <span className="text-base font-bold text-amber-400">
                  {selectedPurifier.soundLevel.split('(')[0].trim()}
                </span>
                <span className="text-[10px] text-slate-400 block">Low white noise</span>
              </div>
            </div>

            {/* Bill of Materials */}
            <div>
              <h5 className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-2">
                Materials Required (Hardware / E-Commerce Available in {city.name}):
              </h5>
              <ul className="space-y-1 text-xs text-slate-300">
                {selectedPurifier.materials.map((mat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Step-by-Step Assembly */}
            <div>
              <h5 className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-2">
                Assembly Instructions:
              </h5>
              <div className="space-y-2">
                {selectedPurifier.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-900/50 border border-slate-700/40 text-xs text-slate-200">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold shrink-0 text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Clean Air Simulator in Your Room (5 Cols) */}
          <div className="lg:col-span-5 rounded-xl bg-slate-900/80 border border-slate-700/80 p-5 flex flex-col justify-between space-y-4">
            <div>
              <h4 className="font-heading font-bold text-base text-white flex items-center gap-2 mb-2">
                <Gauge className="w-4 h-4 text-emerald-400" />
                <span>Clean Air Delivery Simulator</span>
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Test how fast this purifier scrubs winter smog in your specific room size.
              </p>

              {/* Room Size Slider */}
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Your Room Size:</span>
                  <span className="font-bold text-white font-mono">{roomSizeSqFt} sq ft</span>
                </div>
                <input 
                  type="range"
                  min="100"
                  max="800"
                  step="25"
                  value={roomSizeSqFt}
                  onChange={(e) => setRoomSizeSqFt(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Simulation Result Output */}
              <div className="mt-5 p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Complete Air Turnover:</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono">Every {minutesPerAirChange} mins</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Air Changes Per Hour (ACH):</span>
                  <span className="text-sm font-bold text-cyan-400 font-mono">{airChangesPerHour} ACH</span>
                </div>
                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300 leading-relaxed">
                  {airChangesPerHour >= 5 ? (
                    <span className="text-emerald-300 font-medium">
                      ✅ <strong>Medical Grade Standard:</strong> Exceeds CDC & Harvard guidelines for clean indoor air exchange.
                    </span>
                  ) : (
                    <span className="text-amber-300">
                      ⚠️ Acceptable, but consider running on high speed or adding a second unit for very large halls.
                    </span>
                  )}
                </div>
              </div>

              {/* Shroud Lifehack Note */}
              <div className="mt-4 p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200">
                <strong>💡 The 25% Boost Shroud Hack:</strong> Box fans have dead zones at the blade corners. Taping a 15-inch circular cardboard shroud over the front increases velocity and prevents dirty air from swirling back into the room!
              </div>
            </div>

            <div className="text-[11px] text-slate-400 italic">
              *Filter lifespan in severe winter smog ({city.name}): Replace MERV 13 / H11 filters every 5–6 months.
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 2: Top IAQ Hacks Grid */}
      <div className="rounded-2xl bg-slate-800/80 border border-slate-700/80 p-6 shadow-xl space-y-5">
        <div>
          <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <span>Essential Non-Filter Indoor Air Hacks</span>
          </h3>
          <p className="text-xs text-slate-400">
            Crucial behavioral and environmental protocols that prevent indoor pollution spikes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {INDOOR_AIR_HACKS.map((hack) => (
            <div 
              key={hack.id}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/60 hover:border-slate-600 transition flex flex-col justify-between space-y-3"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                  {hack.category}
                </span>
                <h4 className="text-sm font-bold text-white mt-1 mb-2">
                  {hack.title}
                </h4>
                <div className="text-xs px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-medium inline-block mb-2">
                  ⚡ {hack.impact}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  <strong className="text-slate-300">Hazard:</strong> {hack.problem}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800 text-xs text-slate-200">
                <strong className="text-emerald-400">Solution:</strong> {hack.action}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: Natural Air Purifying Houseplants */}
      <div className="rounded-2xl bg-slate-800/80 border border-slate-700/80 p-6 shadow-xl space-y-5">
        <div>
          <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-400" />
            <span>NASA Clean Air Study Houseplants Guide</span>
          </h3>
          <p className="text-xs text-slate-400">
            Natural bio-filtration for indoor toxins, natural winter humidity, and bedroom oxygenation
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {AIR_PLANTS_DATA.map((plant, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/60 space-y-2.5">
              <div>
                <h4 className="text-sm font-bold text-white">{plant.name}</h4>
                <span className="text-[11px] text-emerald-400 italic">"{plant.nickname}"</span>
              </div>

              <div className="space-y-1 text-xs">
                <div className="text-slate-300">
                  <strong className="text-slate-400">Filters:</strong> {plant.purificationType}
                </div>
                <div className="text-slate-300">
                  <strong className="text-slate-400">Care:</strong> {plant.careLevel}
                </div>
                <div className="text-slate-300">
                  <strong className="text-slate-400">Pet Safety:</strong> <span className={plant.petsSafe.includes('Toxic') ? 'text-amber-400' : 'text-emerald-400'}>{plant.petsSafe}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-800 italic">
                {plant.density}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
