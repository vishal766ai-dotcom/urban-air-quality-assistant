import React from 'react';
import { Users, ChevronDown } from 'lucide-react';
import { LIFESTYLE_PROFILES } from '../data/airQualityData';

/**
 * Demographic Profile Selector Dropdown.
 * @param {{
 *   selectedProfile: any,
 *   onSelectProfile: (profile: any) => void,
 *   isOpen: boolean,
 *   onToggle: (e: React.MouseEvent) => void,
 *   onClose: () => void
 * }} props
 */
export function ProfileSelectorDropdown({
  selectedProfile,
  onSelectProfile,
  isOpen,
  onToggle,
  onClose
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-sm text-slate-200 transition"
        aria-expanded={isOpen}
        aria-label="Select Demographic Profile"
      >
        <Users className="w-4 h-4 text-cyan-400" />
        <span className="font-medium truncate max-w-[160px]">{selectedProfile.label}</span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-xl bg-slate-800 border border-slate-700 shadow-2xl p-2 z-50 animate-fade-in">
          <div className="px-2 py-1 text-xs font-semibold uppercase text-slate-400 tracking-wider">
            Tailor for Household
          </div>
          <div className="space-y-1">
            {LIFESTYLE_PROFILES.map((profile) => (
              <button
                key={profile.id}
                onClick={() => {
                  onSelectProfile(profile);
                  onClose();
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                  profile.id === selectedProfile.id
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-slate-700/60'
                }`}
              >
                <div className="font-medium">{profile.label}</div>
                <div className="text-xs text-slate-400 line-clamp-1">{profile.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileSelectorDropdown;
