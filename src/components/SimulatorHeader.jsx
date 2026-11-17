import React from 'react';
import { Sliders } from 'lucide-react';

/**
 * Header bar for the AQI Scenario Simulator showing live vs simulation mode.
 * @param {{ isSimulated: boolean, isLiveSynced: boolean }} props
 */
export function SimulatorHeader({ isSimulated, isLiveSynced }) {
  const getBadge = () => {
    if (isSimulated) {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
          Simulation Mode
        </span>
      );
    }
    if (isLiveSynced) {
      return (
        <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          <span>Live Feed</span>
        </span>
      );
    }
    return null;
  };

  const iconBg = isSimulated ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400';

  return (
    <div className="flex items-center gap-2">
      <div className={`p-1.5 rounded-lg ${iconBg}`}>
        <Sliders className="w-4 h-4" />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-heading font-bold text-white uppercase tracking-wider">
            Interactive Ambient AQI Simulator
          </span>
          {getBadge()}
        </div>
        <span className="text-[11px] text-slate-400">
          Drag slider to watch the Warning Banner, Safe Airing status, and Defense Protocols adapt dynamically
        </span>
      </div>
    </div>
  );
}

export default SimulatorHeader;
