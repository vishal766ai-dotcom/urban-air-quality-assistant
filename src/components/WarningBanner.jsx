import React, { useState, useEffect } from 'react';
import { Radio } from 'lucide-react';
import { getAqiCategory, calculateAiringCountdown, calculateWhoMultiple } from '../utils/calculations';
import { InversionExplainerModal } from './InversionExplainerModal';
import { SafeWindowCard } from './SafeWindowCard';
import { StatusHazardPill } from './StatusHazardPill';
import { ProtocolBadges } from './ProtocolBadges';

function getContainerStyle(isGood, isModerate) {
  if (isGood) {
    return 'bg-gradient-to-r from-emerald-950/85 via-slate-900 to-teal-950/75 border-emerald-500/50 text-emerald-100';
  }
  if (isModerate) {
    return 'bg-gradient-to-r from-amber-950/75 via-slate-900 to-slate-900 border-amber-500/40 text-amber-100';
  }
  return 'bg-gradient-to-r from-rose-950/85 via-slate-900 to-amber-950/75 border-rose-600/50 text-rose-100';
}

function getBannerHeadline(isGood, isModerate) {
  if (isGood) return 'Safe Air Quality & Clear Skies';
  if (isModerate) return 'Moderate Winter Smog Caution';
  return 'Thermal Inversion Lockdown';
}

function renderSyncBadge(isSimulated, isLiveSynced) {
  if (isSimulated) {
    return (
      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
        Simulated Scenario
      </span>
    );
  }
  if (isLiveSynced) {
    return (
      <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
        <Radio className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
        <span>Live API Synced</span>
      </span>
    );
  }
  return null;
}

/**
 * Split Command-Center Winter Smog & Thermal Inversion Warning Banner.
 * @param {{
 *   city: import('../utils/calculations').CityModel,
 *   profile: any,
 *   isLiveSynced?: boolean,
 *   isSimulated?: boolean
 * }} props
 */
export function WarningBanner({ city, profile, isLiveSynced = false, isSimulated = false }) {
  const [showInversionModal, setShowInversionModal] = useState(false);
  const aqiCat = getAqiCategory(city.currentAQI);
  const whoRatio = calculateWhoMultiple(city.pollutants.pm25);
  
  const aqi = city.currentAQI;
  const isGood = aqi <= 50;
  const isModerate = aqi > 50 && aqi <= 200;

  const [windowStatus, setWindowStatus] = useState(() => calculateAiringCountdown());

  useEffect(() => {
    const updateCountdown = () => setWindowStatus(calculateAiringCountdown());
    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <div className={`relative overflow-hidden rounded-2xl border p-4 sm:p-5 transition-all shadow-xl ${getContainerStyle(isGood, isModerate)}`}>
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          <StatusHazardPill whoRatio={whoRatio} isGood={isGood} isModerate={isModerate} pm25={city.pollutants.pm25} />

          <div className="lg:col-span-6 space-y-3 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-heading font-extrabold text-base sm:text-lg text-white tracking-tight">
                {getBannerHeadline(isGood, isModerate)}: {city.name}
              </h2>

              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${aqiCat.bgBadge}`}>
                {city.category}
              </span>

              {renderSyncBadge(isSimulated, isLiveSynced)}
            </div>

            <ProtocolBadges isGood={isGood} isModerate={isModerate} profile={profile} />
          </div>

          <SafeWindowCard
            windowStatus={windowStatus}
            isGood={isGood}
            onOpenInversionModal={() => setShowInversionModal(true)}
          />
        </div>
      </div>

      <InversionExplainerModal 
        isOpen={showInversionModal} 
        onClose={() => setShowInversionModal(false)} 
      />
    </div>
  );
}

export default WarningBanner;
