import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { RUBRIC_CARDS } from '../data/evaluationRubrics';

/**
 * Grid rendering all PromptWars Challenge 6 evaluation rubrics.
 */
export function RubricCardsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {RUBRIC_CARDS.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div key={idx} className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-slate-700 text-slate-200">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-bold text-sm text-white">{card.title}</h3>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border uppercase tracking-wider ${card.badgeClass}`}>
                {card.impact}
              </span>
            </div>

            <p className="text-xs text-slate-400 italic">
              &quot;{card.desc}&quot;
            </p>

            <div className="space-y-1.5 pt-2 border-t border-slate-700/60">
              {card.achieved.map((pt, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RubricCardsGrid;
