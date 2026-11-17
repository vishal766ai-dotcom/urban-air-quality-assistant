import React from 'react';
import { Train } from 'lucide-react';
import { COMMUTE_MODES } from '../data/airQualityData';
import { CommuteModeList } from './CommuteModeList';
import { CommuteDistanceSlider } from './CommuteDistanceSlider';
import { SustainableAlternativesGrid } from './SustainableAlternativesGrid';

/**
 * Commute Mode & Exposure Comparison Component.
 * @param {{
 *   selectedCommuteId: string,
 *   setSelectedCommuteId: (id: string) => void,
 *   dailyDistanceKm: number,
 *   setDailyDistanceKm: (dist: number) => void
 * }} props
 */
export function CommuteComparator({
  selectedCommuteId,
  setSelectedCommuteId,
  dailyDistanceKm,
  setDailyDistanceKm
}) {
  const activeMode = COMMUTE_MODES.find(m => m.id === selectedCommuteId) || COMMUTE_MODES[0];
  const dailyCo2 = (activeMode.co2PerKm * dailyDistanceKm) / 1000;
  const baselineSoloCarCo2 = (192 * dailyDistanceKm) / 1000;
  const co2SavedDaily = Math.max(0, baselineSoloCarCo2 - dailyCo2);

  return (
    <div className="lg:col-span-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 p-6 shadow-xl space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
          <Train className="w-5 h-5 text-cyan-400" />
          <span>Commute Mode &amp; Exposure Comparison</span>
        </h3>
        <span className="text-xs text-slate-400">Select mode below</span>
      </div>

      <CommuteModeList
        selectedCommuteId={selectedCommuteId}
        onSelectMode={setSelectedCommuteId}
      />

      <CommuteDistanceSlider
        dailyDistanceKm={dailyDistanceKm}
        setDailyDistanceKm={setDailyDistanceKm}
        activeModeName={activeMode.name}
        dailyCo2={dailyCo2}
        co2SavedDaily={co2SavedDaily}
      />

      <SustainableAlternativesGrid />
    </div>
  );
}

export default CommuteComparator;
