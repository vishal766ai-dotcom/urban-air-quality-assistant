import React from 'react';
import { Calendar } from 'lucide-react';

const PROFILE_TIPS = {
  toddlers: { icon: '👶', text: 'Strollers sit at car exhaust height (~2 ft). Carry infants or use sealed bus transit before 11 AM.' },
  asthma: { icon: '🫁', text: 'Cold morning soot triggers bronchospasms. Keep rescue inhaler on hand and run bedroom HEPA 24/7.' },
  commuter: { icon: '🚇', text: 'Shift commute past 9:30 AM or ride electric Metro with car ventilation on Recirculate.' },
  athlete: { icon: '🏃', text: 'Heavy exertion multiplies lung soot deposition by 400%. Shift training to 1:00 PM or indoor gym.' }
};

/**
 * Top banner for Routines tab explaining inversion time-shifting and profile tips.
 * @param {{ cityName: string, profile?: any, habitShieldScore: number, completedHabitsCount: number }} props
 */
export function RoutinesHeaderBanner({ cityName, profile, habitShieldScore, completedHabitsCount }) {
  const profileTip = profile
    ? PROFILE_TIPS[profile.id] || { icon: '🛡️', text: profile.topRecommendations?.[0] || 'Keep windows sealed during morning inversion.' }
    : null;

  return (
    <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950/60 border border-slate-700/80 p-6 shadow-xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Calendar className="w-4 h-4" />
            <span>Smart Routine Optimizer</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
            Low-Emission Daily Routines for {cityName}
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-3xl">
            Winter thermal inversions cause ambient air to be up to 10x more toxic at 7:00 AM than at 2:00 PM. By time-shifting physical activities and choosing clean transit, you cut lung intake while stopping neighborhood emission accumulation.
          </p>
          {profileTip && (
            <div className="mt-3 flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
              <span className="text-base">{profileTip.icon}</span>
              <span><strong>Tailored for {profile.label}:</strong> {profileTip.text}</span>
            </div>
          )}
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700 text-center shrink-0">
          <span className="text-xs text-slate-400 block font-medium">Daily Shield Score</span>
          <span className="font-heading font-black text-3xl text-emerald-400">{habitShieldScore}%</span>
          <span className="text-[11px] text-slate-400 block">{completedHabitsCount} of 5 habits active</span>
        </div>
      </div>
    </div>
  );
}

export default RoutinesHeaderBanner;
