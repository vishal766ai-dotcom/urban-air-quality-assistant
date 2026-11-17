export const CITIES_DATA = [
  {
    id: 'delhi',
    name: 'Delhi NCR',
    country: 'India',
    region: 'South Asia',
    currency: { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    currentAQI: 412,
    category: 'Hazardous',
    color: '#881337', // Maroon
    weather: {
      temp: 14,
      condition: 'Dense Winter Smog & Fog',
      humidity: 88,
      windSpeed: 3.2,
      inversionStatus: 'Severe Inversion Trap (<200m boundary layer)',
      inversionRisk: 'Critical'
    },
    pollutants: {
      pm25: 382.4, // µg/m³ (Safe limit is 15 µg/m³ WHO)
      pm10: 512.0,
      no2: 89.5,
      so2: 24.1,
      co: 4.8, // mg/m³
      o3: 31.0
    },
    sources: [
      { name: 'Vehicular Emissions', pct: 38 },
      { name: 'Biomass & Stubble Burning', pct: 31 },
      { name: 'Industrial & Dust', pct: 21 },
      { name: 'Domestic Solid Fuel & Waste', pct: 10 }
    ],
    hourlyForecast: [
      { hour: '00:00', aqi: 420, temp: 13, safeVentilation: false, inversion: 'High' },
      { hour: '03:00', aqi: 435, temp: 11, safeVentilation: false, inversion: 'Critical' },
      { hour: '06:00', aqi: 460, temp: 10, safeVentilation: false, inversion: 'Peak Trap' },
      { hour: '09:00', aqi: 440, temp: 14, safeVentilation: false, inversion: 'Severe' },
      { hour: '12:00', aqi: 360, temp: 19, safeVentilation: false, inversion: 'Moderate' },
      { hour: '14:00', aqi: 290, temp: 21, safeVentilation: true, inversion: 'Low Dispersion' }, // Best window
      { hour: '16:00', aqi: 320, temp: 20, safeVentilation: false, inversion: 'Moderate' },
      { hour: '18:00', aqi: 380, temp: 17, safeVentilation: false, inversion: 'High' },
      { hour: '21:00', aqi: 415, temp: 15, safeVentilation: false, inversion: 'Critical' }
    ],
    advisory: 'Emergency Smog Protocol: Keep all windows sealed. High-efficiency HEPA filtration active. Avoid all morning outdoor jogging or children play.'
  },
  {
    id: 'lahore',
    name: 'Lahore',
    country: 'Pakistan',
    region: 'South Asia',
    currency: { code: 'PKR', symbol: 'Rs', name: 'Pakistani Rupee' },
    currentAQI: 438,
    category: 'Hazardous',
    color: '#881337',
    weather: {
      temp: 13,
      condition: 'Toxic Winter Smog Blanket',
      humidity: 91,
      windSpeed: 2.1,
      inversionStatus: 'Stagnant Cold Air Pool',
      inversionRisk: 'Critical'
    },
    pollutants: {
      pm25: 415.0,
      pm10: 560.2,
      no2: 95.0,
      so2: 30.2,
      co: 5.2,
      o3: 28.0
    },
    sources: [
      { name: 'Transport Exhaust', pct: 43 },
      { name: 'Industrial Brick Kilns', pct: 28 },
      { name: 'Crop Residue Smoke', pct: 19 },
      { name: 'Waste Burning', pct: 10 }
    ],
    hourlyForecast: [
      { hour: '00:00', aqi: 430, temp: 12, safeVentilation: false, inversion: 'Critical' },
      { hour: '04:00', aqi: 455, temp: 10, safeVentilation: false, inversion: 'Critical' },
      { hour: '08:00', aqi: 470, temp: 12, safeVentilation: false, inversion: 'Peak Trap' },
      { hour: '12:00', aqi: 390, temp: 18, safeVentilation: false, inversion: 'Severe' },
      { hour: '15:00', aqi: 310, temp: 20, safeVentilation: true, inversion: 'Moderate' },
      { hour: '18:00', aqi: 410, temp: 16, safeVentilation: false, inversion: 'Critical' },
      { hour: '21:00', aqi: 440, temp: 14, safeVentilation: false, inversion: 'Critical' }
    ],
    advisory: 'Severe Winter Inversion alert: Fine particulates are trapped at ground level. N95/FFP2 masks strictly recommended for any unavoidable commute.'
  },
  {
    id: 'salt-lake',
    name: 'Salt Lake City',
    country: 'USA',
    region: 'North America',
    currency: { code: 'USD', symbol: '$', name: 'US Dollar' },
    currentAQI: 158,
    category: 'Unhealthy',
    color: '#ef4444',
    weather: {
      temp: -2,
      condition: 'Valley Thermal Inversion',
      humidity: 74,
      windSpeed: 1.5,
      inversionStatus: 'Wasatch Mountain Basin Trap',
      inversionRisk: 'High'
    },
    pollutants: {
      pm25: 68.2,
      pm10: 95.0,
      no2: 44.0,
      so2: 6.2,
      co: 1.9,
      o3: 40.0
    },
    sources: [
      { name: 'Mobile Sources (Cars/Trucks)', pct: 48 },
      { name: 'Area Sources (Home Wood/Gas Heating)', pct: 39 },
      { name: 'Point Sources (Refineries/Industry)', pct: 13 }
    ],
    hourlyForecast: [
      { hour: '00:00', aqi: 155, temp: -3, safeVentilation: false, inversion: 'High' },
      { hour: '06:00', aqi: 172, temp: -5, safeVentilation: false, inversion: 'Severe' },
      { hour: '12:00', aqi: 145, temp: 1, safeVentilation: true, inversion: 'Moderate' },
      { hour: '15:00', aqi: 130, temp: 3, safeVentilation: true, inversion: 'Low' },
      { hour: '18:00', aqi: 160, temp: 0, safeVentilation: false, inversion: 'High' },
      { hour: '21:00', aqi: 165, temp: -2, safeVentilation: false, inversion: 'High' }
    ],
    advisory: 'Winter Valley Inversion: Cold dense air trapped under warm ridge. Voluntary no-burn day in effect. Transit passes subsidized.'
  },
  {
    id: 'beijing',
    name: 'Beijing',
    country: 'China',
    region: 'East Asia',
    currency: { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
    currentAQI: 174,
    category: 'Unhealthy',
    color: '#ef4444',
    weather: {
      temp: 3,
      condition: 'Winter Heating Season Smog',
      humidity: 62,
      windSpeed: 2.8,
      inversionStatus: 'North China Plain Low Pressure Inversion',
      inversionRisk: 'High'
    },
    pollutants: {
      pm25: 98.5,
      pm10: 160.0,
      no2: 58.0,
      so2: 12.0,
      co: 2.1,
      o3: 35.0
    },
    sources: [
      { name: 'District Heating Coal/Gas', pct: 35 },
      { name: 'Regional Transport & Heavy Trucks', pct: 32 },
      { name: 'Industrial Boilers', pct: 22 },
      { name: 'Dust', pct: 11 }
    ],
    hourlyForecast: [
      { hour: '00:00', aqi: 180, temp: 2, safeVentilation: false, inversion: 'High' },
      { hour: '06:00', aqi: 195, temp: 0, safeVentilation: false, inversion: 'Severe' },
      { hour: '12:00', aqi: 160, temp: 6, safeVentilation: true, inversion: 'Moderate' },
      { hour: '15:00', aqi: 145, temp: 7, safeVentilation: true, inversion: 'Low' },
      { hour: '18:00', aqi: 175, temp: 4, safeVentilation: false, inversion: 'High' },
      { hour: '21:00', aqi: 185, temp: 2, safeVentilation: false, inversion: 'High' }
    ],
    advisory: 'Yellow Air Pollution Alert: Heavy diesel vehicle restrictions active. Public schools shifting gym classes indoors.'
  },
  {
    id: 'milan',
    name: 'Milan',
    country: 'Italy',
    region: 'Europe (Po Valley)',
    currency: { code: 'EUR', symbol: '€', name: 'Euro' },
    currentAQI: 162,
    category: 'Unhealthy',
    color: '#ef4444',
    weather: {
      temp: 5,
      condition: 'Po Valley Basin Smog & Fog',
      humidity: 85,
      windSpeed: 1.8,
      inversionStatus: 'Alpine Thermal Trap',
      inversionRisk: 'High'
    },
    pollutants: {
      pm25: 75.0,
      pm10: 105.0,
      no2: 65.0,
      so2: 7.0,
      co: 1.7,
      o3: 25.0
    },
    sources: [
      { name: 'Diesel Commuter Traffic', pct: 45 },
      { name: 'Pellet & Wood Heating Stoves', pct: 35 },
      { name: 'Intensive Agriculture & Ammonia', pct: 20 }
    ],
    hourlyForecast: [
      { hour: '00:00', aqi: 160, temp: 4, safeVentilation: false, inversion: 'High' },
      { hour: '07:00', aqi: 175, temp: 3, safeVentilation: false, inversion: 'Severe' },
      { hour: '13:00', aqi: 140, temp: 8, safeVentilation: true, inversion: 'Moderate' },
      { hour: '16:00', aqi: 135, temp: 9, safeVentilation: true, inversion: 'Moderate' },
      { hour: '20:00', aqi: 168, temp: 5, safeVentilation: false, inversion: 'High' }
    ],
    advisory: 'Po Valley stagnation: Euro 4 diesel bans active. Recommend avoiding wood pellet stoves during stagnant wind days.'
  },
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    region: 'Europe',
    currency: { code: 'GBP', symbol: '£', name: 'British Pound' },
    currentAQI: 78,
    category: 'Moderate',
    color: '#f59e0b',
    weather: {
      temp: 7,
      condition: 'Chilly Haze & Wood Smoke',
      humidity: 82,
      windSpeed: 8.5,
      inversionStatus: 'Mild Boundary Trap',
      inversionRisk: 'Low'
    },
    pollutants: {
      pm25: 25.4,
      pm10: 38.0,
      no2: 42.0,
      so2: 4.0,
      co: 0.8,
      o3: 45.0
    },
    sources: [
      { name: 'Domestic Wood Burners', pct: 40 },
      { name: 'Road Transport', pct: 35 },
      { name: 'Commercial & Construction', pct: 25 }
    ],
    hourlyForecast: [
      { hour: '00:00', aqi: 80, temp: 6, safeVentilation: true, inversion: 'Low' },
      { hour: '08:00', aqi: 92, temp: 6, safeVentilation: false, inversion: 'Moderate' },
      { hour: '12:00', aqi: 70, temp: 9, safeVentilation: true, inversion: 'Low' },
      { hour: '18:00', aqi: 88, temp: 7, safeVentilation: true, inversion: 'Moderate' }
    ],
    advisory: 'Clean Air Zone advisory: Avoid burning wet wood or open fireplaces to protect asthmatic neighbors.'
  },
  {
    id: 'newyork',
    name: 'New York City',
    country: 'USA',
    region: 'North America',
    currency: { code: 'USD', symbol: '$', name: 'US Dollar' },
    currentAQI: 55,
    category: 'Moderate',
    color: '#f59e0b',
    weather: {
      temp: 2,
      condition: 'Brisk & Clear',
      humidity: 50,
      windSpeed: 12.0,
      inversionStatus: 'Clear Dispersion',
      inversionRisk: 'Minimal'
    },
    pollutants: {
      pm25: 14.2,
      pm10: 24.0,
      no2: 32.0,
      so2: 3.1,
      co: 0.6,
      o3: 52.0
    },
    sources: [
      { name: 'Heavy Transit / Highway Canyons', pct: 52 },
      { name: 'Building Oil/Gas Heating', pct: 36 },
      { name: 'Other', pct: 12 }
    ],
    hourlyForecast: [
      { hour: '00:00', aqi: 50, temp: 1, safeVentilation: true, inversion: 'Minimal' },
      { hour: '08:00', aqi: 65, temp: 0, safeVentilation: true, inversion: 'Low' },
      { hour: '12:00', aqi: 52, temp: 4, safeVentilation: true, inversion: 'Minimal' },
      { hour: '18:00', aqi: 58, temp: 3, safeVentilation: true, inversion: 'Minimal' }
    ],
    advisory: 'Air quality is acceptable. Sensitive individuals should monitor roadside particulate exposure during rush hours.'
  }
];

export const AQI_CATEGORIES = {
  good: { min: 0, max: 50, label: 'Good', color: '#10b981', textColor: 'text-emerald-400', bgBadge: 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300', desc: 'Air quality is satisfactory; air pollution poses little or no risk.' },
  moderate: { min: 51, max: 100, label: 'Moderate', color: '#f59e0b', textColor: 'text-amber-400', bgBadge: 'bg-amber-950/70 border-amber-500/40 text-amber-300', desc: 'Air quality is acceptable; unusually sensitive people may experience minor symptoms.' },
  sensitive: { min: 101, max: 150, label: 'Unhealthy for Sensitive Groups', color: '#f97316', textColor: 'text-orange-400', bgBadge: 'bg-orange-950/70 border-orange-500/40 text-orange-300', desc: 'Members of sensitive groups (children, elderly, asthmatics) may experience health effects.' },
  unhealthy: { min: 151, max: 200, label: 'Unhealthy', color: '#ef4444', textColor: 'text-red-400', bgBadge: 'bg-red-950/70 border-red-500/40 text-red-300', desc: 'Everyone may begin to experience health effects; sensitive groups may experience more serious effects.' },
  veryUnhealthy: { min: 201, max: 300, label: 'Very Unhealthy', color: '#8b5cf6', textColor: 'text-purple-400', bgBadge: 'bg-purple-950/70 border-purple-500/40 text-purple-300', desc: 'Health alert: The risk of health effects is increased for everyone.' },
  hazardous: { min: 301, max: 999, label: 'Hazardous / Severe Winter Smog', color: '#881337', textColor: 'text-rose-300', bgBadge: 'bg-rose-950/80 border-rose-500/50 text-rose-200', desc: 'Emergency health warning of severe conditions. Entire population is likely to be affected.' }
};

export function getAqiCategory(aqi) {
  if (aqi <= 50) return AQI_CATEGORIES.good;
  if (aqi <= 100) return AQI_CATEGORIES.moderate;
  if (aqi <= 150) return AQI_CATEGORIES.sensitive;
  if (aqi <= 200) return AQI_CATEGORIES.unhealthy;
  if (aqi <= 300) return AQI_CATEGORIES.veryUnhealthy;
  return AQI_CATEGORIES.hazardous;
}

export function createCustomCity({ name, country = 'Local Zone', aqi = 250, currencyCode = 'INR' }) {
  const numAqi = Math.max(1, Math.min(999, Number(aqi) || 250));
  const cat = getAqiCategory(numAqi);
  const approxPm25 = Number((numAqi * 0.92).toFixed(1));

  const currencies = {
    INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    USD: { code: 'USD', symbol: '$', name: 'US Dollar' },
    PKR: { code: 'PKR', symbol: 'Rs', name: 'Pakistani Rupee' },
    EUR: { code: 'EUR', symbol: '€', name: 'Euro' },
    GBP: { code: 'GBP', symbol: '£', name: 'British Pound' },
    CNY: { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' }
  };

  return {
    id: `custom-${Date.now()}`,
    name: name.trim() || 'My Neighborhood',
    country: country.trim() || 'Custom Location',
    region: 'User Configured',
    currency: currencies[currencyCode] || currencies.INR,
    currentAQI: numAqi,
    category: cat.label,
    color: cat.color,
    weather: {
      temp: 15,
      condition: numAqi > 200 ? 'Winter Smog Inversion' : 'Moderate Urban Haze',
      humidity: 82,
      windSpeed: 2.8,
      inversionStatus: numAqi > 200 ? 'Surface Boundary Trap Active' : 'Moderate Dispersal',
      inversionRisk: numAqi > 200 ? 'High' : 'Moderate'
    },
    pollutants: {
      pm25: approxPm25,
      pm10: Number((approxPm25 * 1.4).toFixed(1)),
      no2: 65.0,
      so2: 18.0,
      co: 3.2,
      o3: 32.0
    },
    sources: [
      { name: 'Vehicular & Transit Emissions', pct: 42 },
      { name: 'Biomass & Domestic Burning', pct: 28 },
      { name: 'Road Dust & Construction', pct: 18 },
      { name: 'Industrial & Power Boilers', pct: 12 }
    ],
    hourlyForecast: [
      { hour: '00:00', aqi: Math.round(numAqi * 1.02), temp: 13, safeVentilation: false, inversion: 'High' },
      { hour: '06:00', aqi: Math.round(numAqi * 1.15), temp: 11, safeVentilation: false, inversion: 'Peak Trap' },
      { hour: '09:00', aqi: Math.round(numAqi * 1.08), temp: 14, safeVentilation: false, inversion: 'Severe' },
      { hour: '12:00', aqi: Math.round(numAqi * 0.85), temp: 18, safeVentilation: false, inversion: 'Moderate' },
      { hour: '14:00', aqi: Math.round(numAqi * 0.70), temp: 20, safeVentilation: true, inversion: 'Low Dispersion' },
      { hour: '18:00', aqi: Math.round(numAqi * 0.95), temp: 16, safeVentilation: false, inversion: 'High' },
      { hour: '21:00', aqi: Math.round(numAqi * 1.05), temp: 14, safeVentilation: false, inversion: 'Critical' }
    ],
    advisory: `Custom Air Quality Profile: Maintain continuous indoor air filtration. Utilize the 1:00 PM – 3:30 PM solar window for essential errands.`
  };
}
