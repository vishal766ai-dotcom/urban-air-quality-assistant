import React from 'react';
import { ShieldCheck } from 'lucide-react';

const HABIT_ITEMS = [
  { key: 'mask', label: 'Pack certified N95/KF94 mask for outdoor commute' },
  { key: 'recirc', label: 'Set car / taxi ventilation to "Air Recirculate"' },
  { key: 'shiftWalk', label: 'Shifted outdoor exercise to afternoon or indoor space' },
  { key: 'dampMop', label: 'Damp microfiber mopped living spaces (no dry sweeping)' },
  { key: 'sealedWindowsMorning', label: 'Windows sealed during 6:30 - 9:30 AM inversion' }
];

/**
 * HabitsChecklistCard component.
 * @param {{
 *   checkedHabits: Record<string, boolean>,
 *   onToggleHabit: (key: string) => void
 * }} props
 */
export function HabitsChecklistCard({ checkedHabits, onToggleHabit }) {
  return (
    <div>
      <h4 className="text-sm font-heading font-bold text-white mb-2.5 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>Personal Smog Defense Checklist</span>
      </h4>

      <div className="space-y-2">
        {HABIT_ITEMS.map((item) => (
          <label 
            key={item.key}
            className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/50 border border-slate-700/50 hover:bg-slate-700/30 cursor-pointer transition"
          >
            <input
              type="checkbox"
              checked={checkedHabits[item.key]}
              onChange={() => onToggleHabit(item.key)}
              className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500 cursor-pointer"
            />
            <span className={`text-xs ${checkedHabits[item.key] ? 'text-slate-200 line-through opacity-75' : 'text-slate-300'}`}>
              {item.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default HabitsChecklistCard;
