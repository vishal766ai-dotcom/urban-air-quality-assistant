import React, { useState, useEffect, useRef } from 'react';
import { Wind, Key, Eye, Type, Award, HeartPulse } from 'lucide-react';
import { CITIES_DATA } from '../data/airQualityData';
import { CitySelectorDropdown } from './CitySelectorDropdown';
import { ProfileSelectorDropdown } from './ProfileSelectorDropdown';

/**
 * Global Navigation Header.
 * @param {{
 *   selectedCity: import('../utils/calculations').CityModel,
 *   onSelectCity: (c: import('../utils/calculations').CityModel) => void,
 *   citiesList?: import('../utils/calculations').CityModel[],
 *   onOpenCustomCityModal: () => void,
 *   selectedProfile: any,
 *   onSelectProfile: (p: any) => void,
 *   onOpenApiKeyModal: () => void,
 *   onOpenEvalModal: () => void,
 *   onOpenTriageModal: () => void,
 *   apiKey?: string,
 *   highContrast: boolean,
 *   onToggleHighContrast: () => void,
 *   largeFont: boolean,
 *   onToggleLargeFont: () => void
 * }} props
 */
export function Navbar({
  selectedCity,
  onSelectCity,
  citiesList = CITIES_DATA,
  onOpenCustomCityModal,
  selectedProfile,
  onSelectProfile,
  onOpenApiKeyModal,
  onOpenEvalModal,
  onOpenTriageModal,
  apiKey,
  highContrast,
  onToggleHighContrast,
  largeFont,
  onToggleLargeFont
}) {
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setCityDropdownOpen(false);
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleCityDropdown = (e) => {
    e.stopPropagation();
    setProfileDropdownOpen(false);
    setCityDropdownOpen(prev => !prev);
  };

  const toggleProfileDropdown = (e) => {
    e.stopPropagation();
    setCityDropdownOpen(false);
    setProfileDropdownOpen(prev => !prev);
  };

  return (
    <header ref={navRef} className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 shadow-lg shadow-emerald-500/20 text-white font-bold">
              <Wind className="w-6 h-6 animate-pulse" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-900 flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                  AeroGuardian
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  GenAI Urban Assistant
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Winter Smog Navigation, IAQ Hacks &amp; Low-Emission Living
              </p>
            </div>
          </div>

          {/* Quick Selectors: City & Lifestyle Profile */}
          <div className="hidden lg:flex items-center gap-3">
            <CitySelectorDropdown
              selectedCity={selectedCity}
              onSelectCity={onSelectCity}
              citiesList={citiesList}
              isOpen={cityDropdownOpen}
              onToggle={toggleCityDropdown}
              onClose={() => setCityDropdownOpen(false)}
              onOpenCustomCityModal={onOpenCustomCityModal}
            />

            <ProfileSelectorDropdown
              selectedProfile={selectedProfile}
              onSelectProfile={onSelectProfile}
              isOpen={profileDropdownOpen}
              onToggle={toggleProfileDropdown}
              onClose={() => setProfileDropdownOpen(false)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenEvalModal}
              title="View Challenge Rubric Verification & Automated Self-Tests"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-emerald-700/30 transition transform active:scale-95"
            >
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">Evaluation Rubric &amp; Tests</span>
              <span className="sm:hidden">Tests</span>
            </button>

            <button
              onClick={onOpenTriageModal}
              title="Smog Health & Respiratory Triage Guide"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 hover:bg-rose-900/60 text-xs font-medium transition"
            >
              <HeartPulse className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Health Triage</span>
            </button>

            <button
              onClick={onOpenApiKeyModal}
              title={apiKey ? "Gemini 1.5 Flash Connected" : "Configure Gemini API Key"}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition ${
                apiKey
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{apiKey ? 'Gemini Active' : 'Gemini Key'}</span>
            </button>

            <button
              onClick={onToggleHighContrast}
              title="Toggle High Contrast (WCAG Accessibility)"
              className={`p-2 rounded-lg border transition ${
                highContrast 
                  ? 'bg-amber-400 text-slate-900 border-amber-300' 
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
              aria-label="Toggle High Contrast Mode"
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              onClick={onToggleLargeFont}
              title="Toggle Large Text"
              className={`p-2 rounded-lg border transition ${
                largeFont 
                  ? 'bg-cyan-500 text-white border-cyan-400' 
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
              aria-label="Toggle Larger Font Size"
            >
              <Type className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Navbar;
