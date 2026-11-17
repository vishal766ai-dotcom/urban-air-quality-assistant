import React from 'react';

/**
 * Community Clean Air Carpool Pods info card.
 * @param {{ cityName: string }} props
 */
export function CommunityCarpoolPodCard({ cityName }) {
  return (
    <div className="pt-4 border-t border-slate-700/60 space-y-2">
      <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
        Community Carpool Pods
      </h4>
      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/50 text-xs text-slate-300 space-y-1.5">
        <div className="font-semibold text-white">Join the {cityName} Electric School Run Pod</div>
        <p className="text-slate-400 text-[11px]">
          4 families combine morning school drop-offs into 1 shared electric vehicle, eliminating 3 cold-start exhaust plumes right at the school gate!
        </p>
        <span className="inline-block px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">
          12 Pods Active
        </span>
      </div>
    </div>
  );
}

export default CommunityCarpoolPodCard;
