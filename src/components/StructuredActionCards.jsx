import React from 'react';
import { Home, Calendar, Leaf, Sparkles, ShieldCheck } from 'lucide-react';

/**
 * Structured Action Cards returned by AeroAI for rapid decision making.
 * Explicitly addresses Challenge 6's 4 core pillars:
 * 1. Indoor IAQ Hack
 * 2. Low-Emission Daily Routine
 * 3. Sustainable Alternative
 * 4. Direct Quantified Impact
 * @param {{ cards: Array<{ category: string, action: string, status: string }> }} props
 */
export function StructuredActionCards({ cards }) {
  if (!cards || !cards.length) return null;

  const getCardIcon = (category) => {
    const cat = category.toLowerCase();
    if (cat.includes('indoor') || cat.includes('iaq') || cat.includes('home')) {
      return <Home className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
    }
    if (cat.includes('routine') || cat.includes('schedule')) {
      return <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
    }
    if (cat.includes('alternative') || cat.includes('commute') || cat.includes('transit')) {
      return <Leaf className="w-3.5 h-3.5 text-cyan-400 shrink-0" />;
    }
    if (cat.includes('impact')) {
      return <Sparkles className="w-3.5 h-3.5 text-rose-400 shrink-0" />;
    }
    return <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 shrink-0" />;
  };

  return (
    <div className="mt-3 pt-3 border-t border-slate-700/80 space-y-2">
      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
        ⚡ PromptWars Action Protocols • 4 Core Challenge Pillars
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between space-y-1.5"
          >
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1.5 min-w-0">
                {getCardIcon(card.category)}
                <span className="text-[11px] font-bold text-slate-200 truncate">
                  {card.category}
                </span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded font-bold uppercase bg-slate-800 text-emerald-300 shrink-0">
                {card.status}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              {card.action}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StructuredActionCards;
