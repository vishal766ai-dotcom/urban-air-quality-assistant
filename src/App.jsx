import React, { useState, useEffect, useMemo } from 'react';
import { LayoutDashboard, Bot, Calendar, Wrench, BarChart3, Users } from 'lucide-react';
import { CITIES_DATA, LIFESTYLE_PROFILES } from './data/airQualityData';
import { getAqiCategory } from './utils/calculations';
import { fetchLiveAirQuality } from './services/openMeteoService';
import { useLocalStorage } from './hooks/useLocalStorage';

import { Navbar } from './components/Navbar';
import { WarningBanner } from './components/WarningBanner';
import { AqiScenarioSimulator } from './components/AqiScenarioSimulator';
import { SmogRadar } from './components/SmogRadar';
import { AeroAIChat } from './components/AeroAIChat';
import { RoutinesTab } from './components/RoutinesTab';
import { PurifierLab } from './components/PurifierLab';
import { ImpactCalculator } from './components/ImpactCalculator';
import { CommunityShield } from './components/CommunityShield';
import { EvaluationModal } from './components/EvaluationModal';
import { ApiKeyModal } from './components/ApiKeyModal';
import { CustomLocationModal } from './components/CustomLocationModal';
import { SymptomTriageModal } from './components/SymptomTriageModal';
import { AppFooter } from './components/AppFooter';

const getFallbackKey = () => (typeof atob !== 'undefined' ? atob('QVEuQWI4Uk42SWVzSy0wei1XalhXblR4SXAzVU9LRlM0TU5YdUpVMDN1Nkt4QU4tWlpFRXc=') : '');
export const PERMANENT_API_KEY = (import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) || getFallbackKey();

export function App() {
  const [citiesList, setCitiesList] = useState(CITIES_DATA);
  const [selectedCity, setSelectedCity] = useState(CITIES_DATA[0]);
  const [selectedProfile, setSelectedProfile] = useState(LIFESTYLE_PROFILES[0]);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [apiKey, setApiKey] = useLocalStorage('aeroguardian_gemini_key', PERMANENT_API_KEY);
  const [isLiveSynced, setIsLiveSynced] = useState(false);
  const [simulatedAqi, setSimulatedAqi] = useState(null);

  const [evalModalOpen, setEvalModalOpen] = useState(false);
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
  const [customLocationModalOpen, setCustomLocationModalOpen] = useState(false);
  const [triageModalOpen, setTriageModalOpen] = useState(false);

  const [highContrast, setHighContrast] = useState(false);
  const [largeFont, setLargeFont] = useState(false);

  const cityId = selectedCity?.id;
  const lat = selectedCity?.coordinates?.lat;
  const lon = selectedCity?.coordinates?.lon;

  // Automatically attempt to ground in live Open-Meteo Air Quality API
  useEffect(() => {
    let active = true;

    if (typeof lat === 'number' && typeof lon === 'number') {
      fetchLiveAirQuality(lat, lon).then((liveData) => {
        if (active && liveData) {
          setIsLiveSynced(true);
          setSelectedCity(prev => ({
            ...prev,
            currentAQI: liveData.currentAQI,
            category: getAqiCategory(liveData.currentAQI).label,
            color: getAqiCategory(liveData.currentAQI).color,
            pollutants: { ...prev.pollutants, ...liveData.pollutants },
            hourlyForecast: liveData.hourlyForecast || prev.hourlyForecast
          }));
        }
      });
    }
    return () => { active = false; };
  }, [cityId, lat, lon]);

  const displayCity = useMemo(() => {
    if (simulatedAqi === null) return selectedCity;
    const cat = getAqiCategory(simulatedAqi);
    const approxPm25 = Number((simulatedAqi * 0.92).toFixed(1));
    return {
      ...selectedCity,
      currentAQI: simulatedAqi,
      category: cat.label,
      color: cat.color,
      pollutants: {
        ...selectedCity.pollutants,
        pm25: approxPm25
      }
    };
  }, [selectedCity, simulatedAqi]);

  const handleAddCustomCity = (newCity) => {
    setCitiesList(prev => [newCity, ...prev]);
    setSelectedCity(newCity);
    setSimulatedAqi(null);
  };

  const tabs = [
    { id: 'dashboard', label: 'Smog Radar', icon: LayoutDashboard },
    { id: 'ai-assistant', label: 'AeroAI', icon: Bot, badge: 'GenAI' },
    { id: 'routines', label: 'Routines', icon: Calendar },
    { id: 'iaq-hacks', label: 'DIY Purifier Lab', icon: Wrench },
    { id: 'impact', label: 'Impact', icon: BarChart3 },
    { id: 'community', label: 'Community', icon: Users }
  ];

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col ${highContrast ? 'high-contrast' : ''} ${largeFont ? 'text-large' : ''}`}>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-xl focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      <Navbar
        selectedCity={displayCity}
        onSelectCity={(city) => {
          setSelectedCity(city);
          setSimulatedAqi(null);
        }}
        citiesList={citiesList}
        onOpenCustomCityModal={() => setCustomLocationModalOpen(true)}
        selectedProfile={selectedProfile}
        onSelectProfile={setSelectedProfile}
        onOpenApiKeyModal={() => setApiKeyModalOpen(true)}
        onOpenEvalModal={() => setEvalModalOpen(true)}
        onOpenTriageModal={() => setTriageModalOpen(true)}
        apiKey={apiKey}
        highContrast={highContrast}
        onToggleHighContrast={() => setHighContrast(!highContrast)}
        largeFont={largeFont}
        onToggleLargeFont={() => setLargeFont(!largeFont)}
      />

      <main id="main-content" role="main" className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-5 space-y-5">
        <AqiScenarioSimulator
          simulatedAqi={simulatedAqi}
          onSimulateAqi={setSimulatedAqi}
          currentAqi={selectedCity.currentAQI}
          isLiveSynced={isLiveSynced}
        />

        <WarningBanner 
          city={displayCity} 
          profile={selectedProfile}
          isLiveSynced={isLiveSynced}
          isSimulated={simulatedAqi !== null}
        />

        <div className="flex items-center gap-1 sm:gap-2 p-1 rounded-2xl bg-slate-900/90 border border-slate-800 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-700/25'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="whitespace-nowrap">{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                    isActive ? 'bg-white text-emerald-800' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="animate-fade-in">
          {activeTab === 'dashboard' && <SmogRadar city={displayCity} onNavigateToTab={setActiveTab} />}
          {activeTab === 'ai-assistant' && <AeroAIChat city={displayCity} profile={selectedProfile} apiKey={apiKey} />}
          {activeTab === 'routines' && <RoutinesTab city={displayCity} profile={selectedProfile} />}
          {activeTab === 'iaq-hacks' && <PurifierLab city={displayCity} />}
          {activeTab === 'impact' && <ImpactCalculator city={displayCity} profile={selectedProfile} />}
          {activeTab === 'community' && <CommunityShield city={displayCity} profile={selectedProfile} />}
        </div>
      </main>

      <AppFooter onOpenEvalModal={() => setEvalModalOpen(true)} />

      <EvaluationModal isOpen={evalModalOpen} onClose={() => setEvalModalOpen(false)} />
      <ApiKeyModal isOpen={apiKeyModalOpen} onClose={() => setApiKeyModalOpen(false)} apiKey={apiKey} onSaveApiKey={setApiKey} />
      <CustomLocationModal isOpen={customLocationModalOpen} onClose={() => setCustomLocationModalOpen(false)} onAddCity={handleAddCustomCity} />
      <SymptomTriageModal isOpen={triageModalOpen} onClose={() => setTriageModalOpen(false)} city={displayCity} profile={selectedProfile} />
    </div>
  );
}

export default App;
