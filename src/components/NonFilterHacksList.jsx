import React from 'react';
import { ShieldCheck } from 'lucide-react';

/**
 * NonFilterHacksList component displaying behavioral and non-filter IAQ hacks.
 * @param {{ hacks: Array<{ id: string, category: string, title: string, impact: string, problem: string, action: string }> }} props
 */
export function NonFilterHacksList({ hacks }) {
  return (
    <div className="rounded-2xl bg-slate-800/80 border border-slate-700/80 p-6 shadow-xl space-y-5">
      <div>
        <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <span>Essential Non-Filter Indoor Air Hacks</span>
        </h3>
        <p className="text-xs text-slate-400">
          Crucial behavioral and environmental protocols that prevent indoor pollution spikes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hacks.map((hack) => (
          <div 
            key={hack.id}
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/60 hover:border-slate-600 transition flex flex-col justify-between space-y-3"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                {hack.category}
              </span>
              <h4 className="text-sm font-bold text-white mt-1 mb-2">
                {hack.title}
              </h4>
              <div className="text-xs px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-medium inline-block mb-2">
                ⚡ {hack.impact}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                <strong className="text-slate-300">Hazard:</strong> {hack.problem}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800 text-xs text-slate-200">
              <strong className="text-emerald-400">Solution:</strong> {hack.action}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NonFilterHacksList;
