import React from 'react';

/**
 * Source apportionment breakdown panel for winter smog.
 * @param {{
 *   city: import('../utils/calculations').CityModel,
 *   onNavigateToTab: (tab: string) => void
 * }} props
 */
export function SourceApportionmentPanel({ city, onNavigateToTab }) {
  return (
    <div className="lg:col-span-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 p-6 shadow-xl flex flex-col justify-between">
      <div>
        <h3 className="font-heading font-bold text-lg text-white mb-2">
          Where Is This Smog Coming From?
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Scientific source apportionment for {city.name} during winter months
        </p>

        <div className="space-y-3">
          {city.sources.map((s, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs text-slate-300">
                <span className="font-medium">{s.name}</span>
                <span className="font-bold text-white">{s.pct}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-700 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full" 
                  style={{ width: `${s.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-300">
        <span>Need low-emission alternatives?</span>
        <button 
          onClick={() => onNavigateToTab('routines')}
          className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-2"
        >
          Explore Commute Routines →
        </button>
      </div>
    </div>
  );
}

export default SourceApportionmentPanel;
