import { CITIES_DATA } from '../data/citiesData';
import { getAqiCategory, calculateInversionDanger } from '../utils/calculations';

export { getAqiCategory, calculateInversionDanger };

export function getCityById(id) {
  return CITIES_DATA.find(c => c.id === id) || CITIES_DATA[0];
}

export function searchCities(query) {
  if (!query) return CITIES_DATA;
  const q = query.toLowerCase();
  return CITIES_DATA.filter(c => 
    c.name.toLowerCase().includes(q) || 
    c.country.toLowerCase().includes(q) ||
    c.region.toLowerCase().includes(q)
  );
}

export function getRecommendedVentilationHours(hourlyForecast = []) {
  const safeSlots = hourlyForecast.filter(h => h.safeVentilation);
  if (safeSlots.length > 0) {
    return safeSlots.map(s => s.hour).join(', ');
  }
  return '1:00 PM – 3:30 PM (Midday solar dispersion only)';
}

export function getHealthAdvisoriesForAQI(aqi) {
  const cat = getAqiCategory(aqi);

  const baseTips = [];
  if (aqi <= 50) {
    baseTips.push('Air quality is pristine. Great time for outdoor family exercise and open-window home airing.');
  } else if (aqi <= 100) {
    baseTips.push('Moderate quality. Sensitive individuals should consider reducing intense prolonged exertion near busy roads.');
  } else if (aqi <= 150) {
    baseTips.push('Vulnerable groups (children, pregnant mothers, seniors) should limit outdoor heavy exercise.');
    baseTips.push('Keep windows closed during morning rush hour.');
  } else if (aqi <= 200) {
    baseTips.push('Wear a certified N95 or KF94 respirator outdoors.');
    baseTips.push('Run indoor air purifiers or DIY Corsi-Rosenthal boxes on medium/high speed.');
    baseTips.push('Move children physical activities indoors.');
  } else {
    baseTips.push('HAZARDOUS WINTER SMOG EMERGENCY: Keep all exterior doors and windows sealed.');
    baseTips.push('Strictly avoid early morning walking or jogging (peak inversion particulate trap).');
    baseTips.push('Wear airtight N95/FFP2 masks for any essential outdoor transit.');
    baseTips.push('Damp mop living areas; do not dry sweep or burn incense/candles.');
  }

  return {
    category: cat,
    tips: baseTips
  };
}
