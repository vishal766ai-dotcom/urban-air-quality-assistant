import React, { useState, useEffect, useRef } from 'react';
import { CITIES_DATA } from '../data/airQualityData';
import { NavbarBrand } from './NavbarBrand';
import { CitySelectorDropdown } from './CitySelectorDropdown';
import { ProfileSelectorDropdown } from './ProfileSelectorDropdown';
import { NavbarActions } from './NavbarActions';

/**
 * Global Navigation Header.
 * @param {{
 *   selectedCity: import('../utils/calculations').CityModel,
 *   onSelectCity: (c: import('../utils/calculations').CityModel) => void,
 *   citiesList?: import('../utils/calculations').CityModel[],
 *   selectedProfile: any,
 *   onSelectProfile: (p: any) => void,
 *   apiKey?: string,
 *   modals: any
 * }} props
 */
export function Navbar({
  selectedCity,
  onSelectCity,
  citiesList = CITIES_DATA,
  selectedProfile,
  onSelectProfile,
  apiKey,
  modals
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

  const toggleCity = (e) => {
    e.stopPropagation();
    setProfileDropdownOpen(false);
    setCityDropdownOpen(prev => !prev);
  };

  const toggleProfile = (e) => {
    e.stopPropagation();
    setCityDropdownOpen(false);
    setProfileDropdownOpen(prev => !prev);
  };

  return (
    <header ref={navRef} className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          <NavbarBrand />

          <div className="hidden lg:flex items-center gap-3">
            <CitySelectorDropdown
              selectedCity={selectedCity}
              onSelectCity={onSelectCity}
              citiesList={citiesList}
              isOpen={cityDropdownOpen}
              onToggle={toggleCity}
              onClose={() => setCityDropdownOpen(false)}
              onOpenCustomCityModal={() => modals.setCustomLocationModalOpen(true)}
            />

            <ProfileSelectorDropdown
              selectedProfile={selectedProfile}
              onSelectProfile={onSelectProfile}
              isOpen={profileDropdownOpen}
              onToggle={toggleProfile}
              onClose={() => setProfileDropdownOpen(false)}
            />
          </div>

          <NavbarActions
            onOpenEvalModal={() => modals.setEvalModalOpen(true)}
            onOpenTriageModal={() => modals.setTriageModalOpen(true)}
            onOpenApiKeyModal={() => modals.setApiKeyModalOpen(true)}
            apiKey={apiKey}
            highContrast={modals.highContrast}
            onToggleHighContrast={modals.toggleHighContrast}
            largeFont={modals.largeFont}
            onToggleLargeFont={modals.toggleLargeFont}
          />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
