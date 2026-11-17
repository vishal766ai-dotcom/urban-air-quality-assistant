import React from 'react';

/**
 * StatusHazardPill - Left-column hazard badge showing WHO multiple and live danger dot.
 * @param {{
 *   whoRatio: number | string,
 *   isGood: boolean,
 *   isModerate: boolean,
 *   pm25: number
 * }} props
 */
export function StatusHazardPill({ whoRatio, isGood, isModerate, pm25 }) {
  const getPillTheme = () => {
    if (isGood) {
      return {
        pingBg: 'bg-emerald-400',
        dotBg: 'bg-emerald-500',
        labelColor: 'text-emerald-300',
        label: 'Safe Air',
        ratioColor: 'text-emerald-400'
      };
    }
    if (isModerate) {
      return {
        pingBg: 'bg-amber-400',
        dotBg: 'bg-amber-500',
        labelColor: 'text-amber-300',
        label: 'Caution',
        ratioColor: 'text-amber-400'
      };
    }
    return {
      pingBg: 'bg-rose-400',
      dotBg: 'bg-rose-500',
      labelColor: 'text-rose-300',
      label: 'Live Hazard',
      ratioColor: 'text-rose-400'
    };
  };

  const theme = getPillTheme();

  return (
    <div className="lg:col-span-3 flex lg:flex-col items-center justify-between lg:justify-center p-3 sm:p-4 rounded-xl bg-slate-950/70 border border-slate-700/60 shadow-inner text-center shrink-0">
      <div className="flex items-center gap-2 mb-0 lg:mb-1">
        <span className="relative flex h-3 w-3">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${theme.pingBg}`} />
          <span className={`relative inline-flex rounded-full h-3 w-3 ${theme.dotBg}`} />
        </span>
        <span className={`text-[10px] font-bold uppercase tracking-widest ${theme.labelColor}`}>
          {theme.label}
        </span>
      </div>

      <div className="flex items-baseline lg:flex-col justify-center gap-1.5 my-0.5">
        <span className={`font-heading font-black text-3xl sm:text-4xl tracking-tight ${theme.ratioColor}`}>
          {whoRatio}x
        </span>
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
          WHO Limit
        </span>
      </div>

      <span className="text-[10px] text-slate-400 hidden lg:block mt-0.5">
        {pm25} µg/m³ fine soot
      </span>
    </div>
  );
}

export default StatusHazardPill;
