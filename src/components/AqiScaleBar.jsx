import React from 'react';

/**
 * EPA/WHO AQI color gradient scale bar.
 */
export function AqiScaleBar() {
  return (
    <div className="space-y-1.5 mt-2">
      <div className="flex justify-between text-xs text-slate-400 font-medium">
        <span>0 Good</span>
        <span>50</span>
        <span>100</span>
        <span>150</span>
        <span>200</span>
        <span>300+ Severe</span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-slate-700 overflow-hidden flex">
        <div className="h-full bg-emerald-500 w-[16%]" />
        <div className="h-full bg-amber-500 w-[16%]" />
        <div className="h-full bg-orange-500 w-[16%]" />
        <div className="h-full bg-red-500 w-[16%]" />
        <div className="h-full bg-purple-500 w-[20%]" />
        <div className="h-full bg-rose-900 w-[16%]" />
      </div>
    </div>
  );
}

export default AqiScaleBar;
