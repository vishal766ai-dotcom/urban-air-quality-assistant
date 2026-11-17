import React, { useState } from 'react';
import { Calendar, Clock, ShieldCheck, AlertTriangle } from 'lucide-react';
import { CommuteComparator } from './CommuteComparator';

/**
 * RoutinesTab - Low-emission daily routines and schedule optimizer.
 * @param {{ city: import('../utils/calculations').CityModel, profile?: any }} props
 */
export function RoutinesTab({ city }) {
  const [selectedCommuteId, setSelectedCommuteId] = useState('metro');
  const [dailyDistanceKm, setDailyDistanceKm] = useState(18);
  const [checkedHabits, setCheckedHabits] = useState({
    mask: true,
    recirc: true,
    shiftWalk: false,
    dampMop: false,
    sealedWindowsMorning: true
  });

  const toggleHabit = (key) => {
    setCheckedHabits(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const completedHabitsCount = Object.values(checkedHabits).filter(Boolean).length;
  const habitShieldScore = Math.round((completedHabitsCount / 5) * 100);

  return (
    <div className="space-y-6">
      
      {/* Introduction Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950/60 border border-slate-700/80 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Calendar className="w-4 h-4" />
              <span>Smart Routine Optimizer</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
              Low-Emission Daily Routines for {city.name}
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              Winter thermal inversions cause ambient air to be up to 10x more toxic at 7:00 AM than at 2:00 PM. By time-shifting physical activities and choosing clean transit, you dramatically cut personal lung intake while stopping neighborhood emission accumulation.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700 text-center shrink-0">
            <span className="text-xs text-slate-400 block font-medium">Daily Shield Score</span>
            <span className="font-heading font-black text-3xl text-emerald-400">{habitShieldScore}%</span>
            <span className="text-[11px] text-slate-400 block">{completedHabitsCount} of 5 habits active</span>
          </div>
        </div>
      </div>

      {/* 2-Column: Commute Comparison & Time-Shifted 24-hr Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Commute Comparator */}
        <CommuteComparator
          selectedCommuteId={selectedCommuteId}
          setSelectedCommuteId={setSelectedCommuteId}
          dailyDistanceKm={dailyDistanceKm}
          setDailyDistanceKm={setDailyDistanceKm}
        />

        {/* Right Column: Time-Shifted Smog Routine & Habits Checklist */}
        <div className="lg:col-span-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              <span>Optimized Winter Smog Timeline</span>
            </h3>
            <span className="text-xs text-amber-400 font-semibold">Inversion Shift</span>
          </div>

          {/* 3 Step Timeline */}
          <div className="space-y-4">
            
            {/* Morning */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/70 relative">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  06:30 – 09:30 AM (Peak Thermal Inversion)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                  Critical Inversion Trap
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cold air locks exhaust at chest level. <strong>Strictly avoid morning running, open-air jogging, or outdoor cycling.</strong> Replace with indoor yoga. If commuting, wear a certified N95 respirator.
              </p>
            </div>

            {/* Afternoon */}
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 relative">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  01:00 – 03:30 PM (Golden Ventilation Window)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
                  Solar Dispersion
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Solar ground warming breaks the cold boundary layer. Outdoor AQI drops by 30-40%. <strong>Crack open opposite windows for 15-20 minutes to purge stale CO2.</strong> Best window for outdoor grocery errands.
              </p>
            </div>

            {/* Evening & Night */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/70 relative">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  06:00 – 10:30 PM (Re-trapping &amp; Night Rest)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                  Night Inversion
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Air cools rapidly. Seal bedroom doors and run the DIY purifier on low/medium continuous speed. Keep room humidity around 45% to prevent throat dryness.
              </p>
            </div>

          </div>

          {/* Daily Smog Defense Habit Checklist */}
          <div>
            <h4 className="text-sm font-heading font-bold text-white mb-2.5 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Personal Smog Defense Checklist</span>
            </h4>

            <div className="space-y-2">
              {[
                { key: 'mask', label: 'Pack certified N95/KF94 mask for outdoor commute' },
                { key: 'recirc', label: 'Set car / taxi ventilation to "Air Recirculate"' },
                { key: 'shiftWalk', label: 'Shifted outdoor exercise to afternoon or indoor space' },
                { key: 'dampMop', label: 'Damp microfiber mopped living spaces (no dry sweeping)' },
                { key: 'sealedWindowsMorning', label: 'Windows sealed during 6:30 - 9:30 AM inversion' }
              ].map((item) => (
                <label 
                  key={item.key}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/50 border border-slate-700/50 hover:bg-slate-700/30 cursor-pointer transition"
                >
                  <input
                    type="checkbox"
                    checked={checkedHabits[item.key]}
                    onChange={() => toggleHabit(item.key)}
                    className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500 cursor-pointer"
                  />
                  <span className={`text-xs ${checkedHabits[item.key] ? 'text-slate-200 line-through opacity-75' : 'text-slate-300'}`}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default RoutinesTab;
