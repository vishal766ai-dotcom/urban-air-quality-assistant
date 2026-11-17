import React from 'react';
import { getAqiCategory } from '../utils/calculations';
import { MainAqiCard } from './MainAqiCard';
import { MeteorologicalCard } from './MeteorologicalCard';
import { HourlyTimeline } from './HourlyTimeline';
import { PollutantsBreakdown } from './PollutantsBreakdown';

/**
 * SmogRadar Dashboard Overview component.
 * Displays atmospheric monitoring, microclimate data, safe ventilation timeline, and chemical pollutants.
 * @param {{ city: import('../utils/calculations').CityModel, profile?: any, onNavigateToTab: (tab: string) => void }} props
 */
export function SmogRadar({ city, onNavigateToTab }) {
  const cat = getAqiCategory(city.currentAQI);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <MainAqiCard city={city} cat={cat} />
        <MeteorologicalCard weather={city.weather} />
      </div>

      <HourlyTimeline hourlyForecast={city.hourlyForecast} />
      <PollutantsBreakdown city={city} onNavigateToTab={onNavigateToTab} />
    </div>
  );
}

export default SmogRadar;
