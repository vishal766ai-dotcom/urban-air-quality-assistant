import React from 'react';
import { RefreshCw, Zap } from 'lucide-react';
import { getAqiCategory } from '../utils/calculations';
import { SimulatorHeader } from './SimulatorHeader';

const PRESETS = [
  { label: 'Clean Air', aqi: 35, color: 'hover:border-emerald-500' },
  { label: 'Moderate', aqi: 85, color: 'hover:border-amber-500' },
  { label: 'Inversion Alert', aqi: 220, color: 'hover:border-purple-500' },
  { label: 'Winter Crisis', aqi: 415, color: 'hover:border-rose-500' }
];

/**
 * Interactive Ambient AQI & Emergency Scenario Simulator.
 * @param {{
 *   simulatedAqi: number | null,
 *   onSimulateAqi: (aqi: number | null) => void,
 *   currentAqi: number,
 *   isLiveSynced: boolean
 * }} props
 */
export function AqiScenarioSimulator({
  simulatedAqi,
  onSimulateAqi,
  currentAqi,
  isLiveSynced
}) {
  const activeValue = simulatedAqi !== null ? simulatedAqi : currentAqi;
  const isSimulated = simulatedAqi !== null;
  const cat = getAqiCategory(activeValue);

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-3.5 sm:p-4 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <SimulatorHeader
          isSimulated={isSimulated}
          isLiveSynced={isLiveSynced}
        />

        <div className="flex items-center gap-1.5 shrink-0">
          {PRESETS.map((p) => (
            <button
              key={p.aqi}
              onClick={() => onSimulateAqi(p.aqi)}
              className={`px-2 py-1 rounded-lg text-[11px] font-semibold bg-slate-800 border border-slate-700 text-slate-300 transition ${p.color}`}
            >
              {p.label} ({p.aqi})
            </button>
          ))}

          {isSimulated && (
            <button
              onClick={() => onSimulateAqi(null)}
              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-500/40 flex items-center gap-1 transition"
              title="Reset to Live or Default AQI"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs text-slate-400 font-mono shrink-0 whitespace-nowrap">
          MIN 20
        </span>
        <input
          type="range"
          min="20"
          max="500"
          value={activeValue}
          onChange={(e) => onSimulateAqi(Number(e.target.value))}
          className="flex-1 accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
          aria-label="Simulate Ambient AQI (Range 20 to 500)"
        />
        <span className="text-xs text-slate-500 font-mono shrink-0 whitespace-nowrap hidden sm:inline">
          MAX 500
        </span>
        <div className="flex items-center gap-1.5 shrink-0 px-3 py-1 rounded-xl bg-slate-950 border border-slate-700">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-heading font-bold text-sm" style={{ color: cat.color }}>
            {activeValue}
          </span>
          <span className="text-[10px] text-slate-400 uppercase font-semibold">
            {cat.label.split('/')[0].trim()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AqiScenarioSimulator;
