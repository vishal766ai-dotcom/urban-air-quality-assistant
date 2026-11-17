import React from 'react';

const SYMPTOM_DEFINITIONS = [
  { key: 'throat', label: 'Dry scratchy throat or mild pharynx irritation', severity: 'mild' },
  { key: 'eyes', label: 'Stinging, watering, or red eyes', severity: 'mild' },
  { key: 'cough', label: 'Persistent dry morning cough or throat clearing', severity: 'moderate' },
  { key: 'wheeze', label: 'Audible chest whistling, wheezing, or tightness', severity: 'severe' },
  { key: 'breathless', label: 'Shortness of breath during rest or light activity', severity: 'severe' }
];

const SEVERITY_BADGES = {
  severe: 'bg-rose-950 text-rose-300 border border-rose-800',
  moderate: 'bg-amber-950 text-amber-300 border border-amber-800',
  mild: 'bg-slate-800 text-slate-400'
};

/**
 * Renders the interactive checklist of respiratory & particulate symptoms.
 * @param {{ selectedSymptoms: Record<string, boolean>, onToggleSymptom: (key: string) => void }} props
 */
export function TriageSymptomList({ selectedSymptoms, onToggleSymptom }) {
  return (
    <div className="space-y-2 mb-4">
      {SYMPTOM_DEFINITIONS.map((item) => {
        const isChecked = Boolean(selectedSymptoms[item.key]);
        const containerClass = isChecked
          ? 'bg-slate-800 border-emerald-500/50 text-white'
          : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:bg-slate-800/40';
        const badgeClass = SEVERITY_BADGES[item.severity] || SEVERITY_BADGES.mild;

        return (
          <label
            key={item.key}
            className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition ${containerClass}`}
          >
            <div className="flex items-center gap-2.5 text-xs">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggleSymptom(item.key)}
                className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
              />
              <span>{item.label}</span>
            </div>
            <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${badgeClass}`}>
              {item.severity}
            </span>
          </label>
        );
      })}
    </div>
  );
}

export default TriageSymptomList;
