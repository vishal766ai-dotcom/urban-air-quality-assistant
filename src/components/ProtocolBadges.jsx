import React from 'react';

/**
 * Derives badge actions, colors, and recommendation texts based on atmospheric severity.
 */
function getBadgeSpecs(isGood, isModerate, profile) {
  if (isGood) {
    return {
      windowAction: 'VENTILATE',
      windowColor: 'text-emerald-300',
      outdoorAction: 'SAFE OUTDOORS',
      outdoorColor: 'text-emerald-300',
      childAction: 'OUTDOOR PLAY',
      childColor: 'text-emerald-300',
      recommendation: 'Open opposite windows to flush indoor CO2 and welcome fresh ambient air.'
    };
  }
  if (isModerate) {
    return {
      windowAction: 'SELECTIVE',
      windowColor: 'text-amber-300',
      outdoorAction: 'MASK SENSITIVE',
      outdoorColor: 'text-amber-300',
      childAction: 'INDOOR REC',
      childColor: 'text-cyan-300',
      recommendation: 'Limit high-intensity morning outdoor jogging. Keep indoor HEPA running in living areas.'
    };
  }
  return {
    windowAction: 'SEALED',
    windowColor: 'text-rose-400',
    outdoorAction: 'N95 REQUIRED',
    outdoorColor: 'text-rose-400',
    childAction: 'SEALED TRANSIT',
    childColor: 'text-cyan-300',
    recommendation: profile?.topRecommendations?.[0] || 'Seal door drafts with foam tapes and run indoor HEPA filtration.'
  };
}

/**
 * ProtocolBadges - Micro-badges for Windows, Outdoors, and Child Safety plus tailored household tip.
 * @param {{
 *   isGood: boolean,
 *   isModerate: boolean,
 *   profile: any
 * }} props
 */
export function ProtocolBadges({ isGood, isModerate, profile }) {
  const specs = getBadgeSpecs(isGood, isModerate, profile);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-700/70 text-xs">
          <span className="text-base" role="img" aria-label="Window">🪟</span>
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold uppercase leading-none">Windows</span>
            <span className={`text-xs font-bold ${specs.windowColor}`}>
              {specs.windowAction}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-700/70 text-xs">
          <span className="text-base" role="img" aria-label="Mask">😷</span>
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold uppercase leading-none">Outdoors</span>
            <span className={`text-xs font-bold ${specs.outdoorColor}`}>
              {specs.outdoorAction}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-700/70 text-xs">
          <span className="text-base" role="img" aria-label="Child">👶</span>
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold uppercase leading-none">Child Safety</span>
            <span className={`text-xs font-bold ${specs.childColor}`}>
              {specs.childAction}
            </span>
          </div>
        </div>
      </div>

      <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800 text-xs text-slate-200 break-words leading-relaxed">
        <strong className="text-emerald-400 font-semibold mr-1.5">
          🛡️ Tailored for {profile?.label || 'Household'}:
        </strong>
        <span className="break-words">
          {specs.recommendation}
        </span>
      </div>
    </div>
  );
}

export default ProtocolBadges;
