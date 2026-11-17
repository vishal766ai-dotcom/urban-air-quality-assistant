import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { RoutinesHeaderBanner } from './RoutinesHeaderBanner';
import { CommuteComparator } from './CommuteComparator';
import { InversionTimelineRows } from './InversionTimelineRows';
import { HabitsChecklistCard } from './HabitsChecklistCard';

/**
 * RoutinesTab - Low-emission daily routines and schedule optimizer tailored to location and lifestyle.
 * @param {{ city: import('../utils/calculations').CityModel, profile?: any }} props
 */
export function RoutinesTab({ city, profile }) {
  const [selectedCommuteId, setSelectedCommuteId] = useState('metro');
  const [dailyDistanceKm, setDailyDistanceKm] = useState(18);
  const [checkedHabits, setCheckedHabits] = useState({
    mask: true,
    recirc: true,
    shiftWalk: false,
    dampMop: false,
    sealedWindowsMorning: true
  });

  const toggleHabit = (key) => setCheckedHabits(prev => ({ ...prev, [key]: !prev[key] }));
  const completedHabitsCount = Object.values(checkedHabits).filter(Boolean).length;
  const habitShieldScore = Math.round((completedHabitsCount / 5) * 100);

  return (
    <div className="space-y-6">
      <RoutinesHeaderBanner
        cityName={city.name}
        profile={profile}
        habitShieldScore={habitShieldScore}
        completedHabitsCount={completedHabitsCount}
      />

      {/* 2-Column: Commute Comparison & Time-Shifted 24-hr Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <CommuteComparator
          selectedCommuteId={selectedCommuteId}
          setSelectedCommuteId={setSelectedCommuteId}
          dailyDistanceKm={dailyDistanceKm}
          setDailyDistanceKm={setDailyDistanceKm}
        />

        <div className="lg:col-span-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              <span>Optimized Winter Smog Timeline</span>
            </h3>
            <span className="text-xs text-amber-400 font-semibold">Inversion Shift</span>
          </div>

          <InversionTimelineRows />
          <HabitsChecklistCard checkedHabits={checkedHabits} onToggleHabit={toggleHabit} />
        </div>
      </div>
    </div>
  );
}

export default RoutinesTab;
