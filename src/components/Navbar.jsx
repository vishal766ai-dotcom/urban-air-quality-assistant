import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldAlert, 
  Wind, 
  Sliders, 
  Key, 
  CheckCircle2, 
  Eye, 
  Type, 
  MapPin, 
  Users, 
  Award,
  ChevronDown,
  PlusCircle,
  HeartPulse
} from 'lucide-react';
import { CITIES_DATA, getAqiCategory } from '../data/citiesData';
import { LIFESTYLE_PROFILES } from '../data/routineOptions';

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

  const aqiCat = getAqiCategory(selectedCity.currentAQI);

  // Close dropdowns on click outside
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
    setProfileDropdownOpen(false); // Mutual exclusivity: closes profile menu immediately
    setCityDropdownOpen(prev => !prev);
  };

  const toggleProfileDropdown = (e) => {
    e.stopPropagation();
    setCityDropdownOpen(false); // Mutual exclusivity: closes city menu immediately
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
                <span className="w-1.5 h-1.5 bg-slate-900 rounded-full"></span>
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
                Winter Smog Navigation, IAQ Hacks & Low-Emission Living
              </p>
            </div>
          </div>

          {/* Quick Selectors: City & Lifestyle Profile */}
          <div className="hidden lg:flex items-center gap-3">
            {/* City Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={toggleCityDropdown}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-sm text-slate-200 transition"
                aria-expanded={cityDropdownOpen}
                aria-label="Select City"
              >
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span className="font-medium">{selectedCity.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${aqiCat.bgBadge}`}>
                  AQI {selectedCity.currentAQI}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {cityDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 rounded-xl bg-slate-800 border border-slate-700 shadow-2xl p-2 z-50 animate-fade-in">
                  <div className="px-2 py-1 text-xs font-semibold uppercase text-slate-400 tracking-wider">
                    Select Smog Hotspot
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-1">
                    {citiesList.map((city) => {
                      const cat = getAqiCategory(city.currentAQI);
                      return (
                        <button
                          key={city.id}
                          onClick={() => {
                            onSelectCity(city);
                            setCityDropdownOpen(false);
                          }}
                          className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-lg text-sm transition ${
                            city.id === selectedCity.id
                              ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30'
                              : 'text-slate-300 hover:bg-slate-700/60'
                          }`}
                        >
                          <div>
                            <div>{city.name}</div>
                            <div className="text-xs text-slate-400">{city.country} ({city.currency?.symbol} {city.currency?.code})</div>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${cat.bgBadge}`}>
                            {city.currentAQI}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Add Custom Location Trigger */}
                  <div className="pt-2 mt-1 border-t border-slate-700">
                    <button
                      onClick={() => {
                        setCityDropdownOpen(false);
                        onOpenCustomCityModal();
                      }}
                      className="w-full py-1.5 px-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>+ Add Custom Location / Local AQI</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={toggleProfileDropdown}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-sm text-slate-200 transition"
                aria-expanded={profileDropdownOpen}
                aria-label="Select Demographic Profile"
              >
                <Users className="w-4 h-4 text-cyan-400" />
                <span className="font-medium truncate max-w-[160px]">{selectedProfile.label}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {profileDropdownOpen && (
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
                          setProfileDropdownOpen(false);
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
          </div>

          {/* Action Buttons: Evaluator Verification, API Key, Health Triage, Accessibility */}
          <div className="flex items-center gap-2">
            {/* PromptWars Evaluation & Diagnostics Runner */}
            <button
              onClick={onOpenEvalModal}
              title="View Challenge Rubric Verification & Automated Self-Tests"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-emerald-700/30 transition transform active:scale-95"
            >
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">Evaluation Rubric & Tests</span>
              <span className="sm:hidden">Tests</span>
            </button>

            {/* Smog Health & Respiratory Triage Button */}
            <button
              onClick={onOpenTriageModal}
              title="Smog Health & Respiratory Triage Guide"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 hover:bg-rose-900/60 text-xs font-medium transition"
            >
              <HeartPulse className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Health Triage</span>
            </button>

            {/* Gemini API Key Button */}
            <button
              onClick={onOpenApiKeyModal}
              title={apiKey ? "Gemini 1.5 Flash Connected" : "Configure Gemini API Key (or use built-in engine)"}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition ${
                apiKey
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{apiKey ? 'Gemini Active' : 'Gemini Key'}</span>
            </button>

            {/* High Contrast Toggle */}
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

            {/* Font Size Booster */}
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
