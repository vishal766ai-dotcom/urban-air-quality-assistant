import React, { useState } from 'react';
import { BarChart3, Award } from 'lucide-react';
import { calculatePersonalImpact } from '../utils/calculations';
import { CleanAirCertificateModal } from './CleanAirCertificateModal';
import { ImpactControls } from './ImpactControls';
import { ImpactDisplay } from './ImpactDisplay';

/**
 * Quantified Impact Engine & Emissions Savings Calculator.
 * @param {{ city: import('../utils/calculations').CityModel, profile?: any }} props
 */
export function ImpactCalculator({ city, profile }) {
  const [commuteMode, setCommuteMode] = useState('metro');
  const [dailyKm, setDailyKm] = useState(20);
  const [daysPerMonth, setDaysPerMonth] = useState(22);
  const [switchedStove, setSwitchedStove] = useState(true);
  const [avoidedBiomassBurn, setAvoidedBiomassBurn] = useState(true);
  const [purifierHours, setPurifierHours] = useState(14);
  const [showCertificate, setShowCertificate] = useState(false);

  const impact = calculatePersonalImpact({
    commuteMode,
    baselineMode: 'solo-ice-car',
    dailyKm,
    daysPerMonth,
    switchedStove,
    avoidedBiomassBurn,
    diyPurifierHoursPerDay: purifierHours
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950/60 border border-slate-700/80 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <BarChart3 className="w-4 h-4" />
              <span>Quantified Impact Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
              Direct Impact Explainer &amp; Emissions Savings Calculator
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              See the exact mathematical impact of your lifestyle choices on personal lung health, family exposure, and neighborhood air quality in {city.name}.
            </p>
          </div>

          <button
            onClick={() => setShowCertificate(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold text-sm shadow-lg shadow-emerald-700/30 transition transform active:scale-95 shrink-0"
          >
            <Award className="w-4 h-4" />
            <span>Generate Clean Air Certificate</span>
          </button>
        </div>
      </div>

      {/* 2-Column: Sliders on Left (5 Cols), Live Results on Right (7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <ImpactControls
          commuteMode={commuteMode}
          setCommuteMode={setCommuteMode}
          dailyKm={dailyKm}
          setDailyKm={setDailyKm}
          daysPerMonth={daysPerMonth}
          setDaysPerMonth={setDaysPerMonth}
          purifierHours={purifierHours}
          setPurifierHours={setPurifierHours}
          avoidedBiomassBurn={avoidedBiomassBurn}
          setAvoidedBiomassBurn={setAvoidedBiomassBurn}
          switchedStove={switchedStove}
          setSwitchedStove={setSwitchedStove}
        />

        <ImpactDisplay impact={impact} />
      </div>

      <CleanAirCertificateModal
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
        profile={profile}
        impact={impact}
        cityName={city.name}
      />
    </div>
  );
}

export default ImpactCalculator;
