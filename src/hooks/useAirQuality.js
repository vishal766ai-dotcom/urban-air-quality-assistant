/**
 * @fileoverview Custom hook for managing atmospheric air quality state, Open-Meteo live API integration,
 * and real-time AQI scenario simulation.
 * @module useAirQuality
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { CITIES_DATA } from '../data/airQualityData';
import { fetchLiveAirQuality } from '../services/openMeteoService';
import { getAqiCategory } from '../utils/calculations';

/**
 * Computes active display city object with optional simulated AQI overlay.
 */
function computeDisplayCity(selectedCity, simulatedAqi) {
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
}

/**
 * Custom hook for air quality data, real-time API syncing, and scenario simulation.
 * @returns {{
 *   selectedCity: any,
 *   displayCity: any,
 *   citiesList: any[],
 *   simulatedAqi: number | null,
 *   isLiveSynced: boolean,
 *   handleSelectCity: (city: any) => void,
 *   handleSimulateAqi: (aqi: number | null) => void,
 *   handleAddCustomCity: (newCity: any) => void
 * }}
 */
export function useAirQuality() {
  const [citiesList, setCitiesList] = useState(CITIES_DATA);
  const [selectedCity, setSelectedCity] = useState(CITIES_DATA[0]);
  const [isLiveSynced, setIsLiveSynced] = useState(false);
  const [simulatedAqi, setSimulatedAqi] = useState(null);

  const cityId = selectedCity?.id;
  const lat = selectedCity?.coordinates?.lat ?? selectedCity?.lat;
  const lon = selectedCity?.coordinates?.lon ?? selectedCity?.lon;

  // Ground in live Open-Meteo Air Quality API with abort & safety cleanup
  useEffect(() => {
    let isSubscribed = true;

    async function syncAtmosphericData() {
      if (typeof lat !== 'number' || typeof lon !== 'number') {
        if (isSubscribed) setIsLiveSynced(false);
        return;
      }

      try {
        const liveData = await fetchLiveAirQuality(lat, lon);
        if (isSubscribed && liveData) {
          setIsLiveSynced(true);
          setSelectedCity(prev => ({
            ...prev,
            currentAQI: liveData.currentAQI,
            category: getAqiCategory(liveData.currentAQI).label,
            color: getAqiCategory(liveData.currentAQI).color,
            pollutants: { ...prev.pollutants, ...liveData.pollutants },
            hourlyForecast: liveData.hourlyForecast || prev.hourlyForecast
          }));
        } else if (isSubscribed) {
          setIsLiveSynced(false);
        }
      } catch {
        if (isSubscribed) setIsLiveSynced(false);
      }
    }

    syncAtmosphericData();
    return () => { isSubscribed = false; };
  }, [cityId, lat, lon]);

  const handleSelectCity = useCallback((city) => {
    setSelectedCity(city);
    setSimulatedAqi(null);
  }, []);

  const handleSimulateAqi = useCallback((aqi) => {
    setSimulatedAqi(aqi);
  }, []);

  const handleAddCustomCity = useCallback((newCity) => {
    setCitiesList(prev => [newCity, ...prev]);
    setSelectedCity(newCity);
    setSimulatedAqi(null);
  }, []);

  const displayCity = useMemo(
    () => computeDisplayCity(selectedCity, simulatedAqi),
    [selectedCity, simulatedAqi]
  );

  return {
    selectedCity,
    displayCity,
    citiesList,
    simulatedAqi,
    isLiveSynced,
    handleSelectCity,
    handleSimulateAqi,
    handleAddCustomCity
  };
}

export default useAirQuality;
