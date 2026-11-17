import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

const TRIAGE_CONFIGS = {
  critical: {
    boxClass: 'bg-rose-950/60 border-rose-500/50 text-rose-100',
    title: 'Level 3: Bronchial Spasm Warning',
    icon: <AlertTriangle className="w-5 h-5 text-rose-400 animate-pulse" />,
    guidance: [
      { id: 'c1', bold: 'Administer prescribed rescue inhaler', rest: ' (e.g. Salbutamol / Albuterol) if prescribed by your physician.' },
      { id: 'c2', bold: 'Transition immediately', rest: ' to a room with continuous HEPA/DIY filtration active.' },
      { id: 'c3', bold: 'Emergency caution:', rest: ' If breathing does not ease within 15 minutes, consult a pulmonologist or emergency department.' }
    ]
  },
  moderate: {
    boxClass: 'bg-amber-950/50 border-amber-500/40 text-amber-100',
    title: 'Level 2: Active Airway Inflammation',
    icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
    guidance: [
      { id: 'm1', bold: 'Nasal hygiene:', rest: ' Use a gentle isotonic saline nasal rinse morning and bedtime to clear soot from cilia.' },
      { id: 'm2', bold: 'Maintain humidity:', rest: ' Keep bedroom relative humidity at 45–50% to prevent mucosal cracking.' },
      { id: 'm3', bold: 'Anti-inflammatory:', rest: ' Drink warm turmeric milk with black pepper or ginger infusion to quiet cytokine cascades.' }
    ]
  },
  mild: {
    boxClass: 'bg-emerald-950/40 border-emerald-500/40 text-emerald-100',
    title: 'Level 1: Mild Surface Irritation',
    icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    guidance: [
      { id: 'l1', bold: 'Eye care:', rest: ' Rinse eyes with fresh cool water or lubricating artificial tears.' },
      { id: 'l2', bold: 'Mask protocol:', rest: ' Wear a certified airtight N95/KF94 mask for all outdoor transitions.' },
      { id: 'l3', bold: 'Indoor filtration:', rest: ' Keep indoor air purifiers running to prevent overnight symptom escalation.' }
    ]
  }
};

/**
 * Renders the clinical guidance recommendation box based on active triage level.
 * @param {{ isCritical: boolean, isModerate: boolean }} props
 */
export function TriageResultBox({ isCritical, isModerate }) {
  const levelKey = isCritical ? 'critical' : isModerate ? 'moderate' : 'mild';
  const config = TRIAGE_CONFIGS[levelKey];

  return (
    <div className={`p-4 rounded-2xl border space-y-2 ${config.boxClass}`}>
      <div className="flex items-center gap-2 font-bold text-sm">
        {config.icon}
        <span>{config.title}</span>
      </div>

      <ul className="text-xs space-y-1 list-disc pl-5 opacity-90 leading-relaxed">
        {config.guidance.map((item) => (
          <li key={item.id}>
            <strong>{item.bold}</strong>{item.rest}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TriageResultBox;
