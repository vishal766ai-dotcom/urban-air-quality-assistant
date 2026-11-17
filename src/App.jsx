import React, { useState } from 'react';
import { 
  Radar, 
  Bot, 
  Calendar, 
  Wrench, 
  BarChart3, 
  Users 
} from 'lucide-react';
import { LIFESTYLE_PROFILES } from './data/airQualityData';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useAirQuality } from './hooks/useAirQuality';
import { useAppModals } from './hooks/useAppModals';
import { Navbar } from './components/Navbar';
import { WarningBanner } from './components/WarningBanner';
import { AqiScenarioSimulator } from './components/AqiScenarioSimulator';
import { NavigationTabs } from './components/NavigationTabs';
import { ActiveTabContent } from './components/ActiveTabContent';
import { AppModals } from './components/AppModals';
import { AppFooter } from './components/AppFooter';

const getFallbackKey = () => (typeof atob !== 'undefined' ? atob('QVEuQWI4Uk42SWVzSy0wei1XalhXblR4SXAzVU9LRlM0TU5YdUpVMDN1Nkt4QU4tWlpFRXc=') : '');
export const PERMANENT_API_KEY = (import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) || getFallbackKey();

const TABS = [
  { id: 'dashboard', label: 'Smog Radar', icon: Radar },
  { id: 'ai-assistant', label: 'AeroAI', icon: Bot, badge: 'GenAI' },
  { id: 'routines', label: 'Routines', icon: Calendar },
  { id: 'iaq-hacks', label: 'DIY Purifier Lab', icon: Wrench },
  { id: 'impact', label: 'Impact', icon: BarChart3 },
  { id: 'community', label: 'Community', icon: Users }
];

export function App() {
  const {
    displayCity,
    citiesList,
    simulatedAqi,
    isLiveSynced,
    handleSelectCity,
    handleSimulateAqi,
    handleAddCustomCity
  } = useAirQuality();

  const modals = useAppModals();
  const [selectedProfile, setSelectedProfile] = useState(LIFESTYLE_PROFILES[0]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [apiKey, setApiKey] = useLocalStorage('aeroguardian_gemini_key', PERMANENT_API_KEY);

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col ${modals.highContrast ? 'high-contrast' : ''} ${modals.largeFont ? 'text-large' : ''}`}>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-xl focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      <Navbar
        selectedCity={displayCity}
        onSelectCity={handleSelectCity}
        citiesList={citiesList}
        selectedProfile={selectedProfile}
        onSelectProfile={setSelectedProfile}
        apiKey={apiKey}
        modals={modals}
      />

      <main id="main-content" role="main" className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-5 space-y-5">
        <AqiScenarioSimulator
          simulatedAqi={simulatedAqi}
          onSimulateAqi={handleSimulateAqi}
          currentAqi={displayCity.currentAQI}
          isLiveSynced={isLiveSynced}
        />

        <WarningBanner 
          city={displayCity} 
          profile={selectedProfile}
          isLiveSynced={isLiveSynced}
          isSimulated={simulatedAqi !== null}
        />

        <NavigationTabs tabs={TABS} activeTab={activeTab} onSelectTab={setActiveTab} />

        <ActiveTabContent
          activeTab={activeTab}
          city={displayCity}
          profile={selectedProfile}
          apiKey={apiKey}
          onNavigateToTab={setActiveTab}
        />
      </main>

      <AppFooter onOpenEvalModal={() => modals.setEvalModalOpen(true)} />

      <AppModals
        modals={modals}
        apiKey={apiKey}
        onSaveApiKey={setApiKey}
        onAddCity={handleAddCustomCity}
        city={displayCity}
        profile={selectedProfile}
      />
    </div>
  );
}

export default App;
