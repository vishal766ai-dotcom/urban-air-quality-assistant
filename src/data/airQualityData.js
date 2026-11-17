/**
 * @fileoverview Centralized Air Quality, Meteorological, Demographic & IAQ Datasets.
 * Consolidates all global smog hotspot presets, pollutant threshold scales, commute modes,
 * lifestyle profiles, and DIY air filtration blueprints.
 * @module airQualityData
 */

import { getAqiCategory, AQI_CATEGORIES } from '../utils/calculations';

export { getAqiCategory, AQI_CATEGORIES };

export const CITIES_DATA = [
  {
    id: 'delhi',
    name: 'Delhi NCR',
    country: 'India',
    region: 'South Asia',
    coordinates: { lat: 28.61, lon: 77.20 },
    currency: { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    currentAQI: 412,
    category: 'Hazardous',
    color: '#881337',
    weather: {
      temp: 14,
      condition: 'Dense Winter Smog & Fog',
      humidity: 88,
      windSpeed: 3.2,
      inversionStatus: 'Severe Inversion Trap (<200m boundary layer)',
      inversionRisk: 'Critical'
    },
    pollutants: {
      pm25: 382.4,
      pm10: 512.0,
      no2: 89.5,
      so2: 24.1,
      co: 4.8,
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
      { hour: '14:00', aqi: 290, temp: 21, safeVentilation: true, inversion: 'Low Dispersion' },
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
    coordinates: { lat: 31.52, lon: 74.35 },
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
    coordinates: { lat: 40.76, lon: -111.89 },
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
    coordinates: { lat: 39.90, lon: 116.40 },
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
    coordinates: { lat: 45.46, lon: 9.19 },
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
    coordinates: { lat: 51.50, lon: -0.12 },
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
    coordinates: { lat: 40.71, lon: -74.00 },
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

export const COMMUTE_MODES = [
  {
    id: 'metro',
    name: 'Electric Metro / Subway Train',
    icon: 'Train',
    co2PerKm: 18,
    pm25EmittedPerKm: 0.005,
    passengerSmogExposure: 'Lowest (Underground/closed air filtration stations)',
    exposureFactor: 0.2,
    badge: 'Cleanest Choice',
    color: 'emerald'
  },
  {
    id: 'ev-carpool',
    name: 'Electric Vehicle (EV) Carpool (3+ people)',
    icon: 'Car',
    co2PerKm: 25,
    pm25EmittedPerKm: 0.015,
    passengerSmogExposure: 'Low (With HEPA recirculate on)',
    exposureFactor: 0.35,
    badge: 'Eco-Smart',
    color: 'cyan'
  },
  {
    id: 'electric-bus',
    name: 'Electric or CNG Public Bus',
    icon: 'Bus',
    co2PerKm: 35,
    pm25EmittedPerKm: 0.03,
    passengerSmogExposure: 'Moderate',
    exposureFactor: 0.55,
    badge: 'Community Saver',
    color: 'blue'
  },
  {
    id: 'solo-ice-car',
    name: 'Solo Gasoline / Diesel Car',
    icon: 'Fuel',
    co2PerKm: 192,
    pm25EmittedPerKm: 0.18,
    passengerSmogExposure: 'Moderate (Depends on cabin filter quality)',
    exposureFactor: 0.65,
    badge: 'High Emitter',
    color: 'rose'
  },
  {
    id: 'motorcycle',
    name: 'Two-Wheeler / Motorbike / Scooter',
    icon: 'Bike',
    co2PerKm: 84,
    pm25EmittedPerKm: 0.12,
    passengerSmogExposure: 'Extreme (Direct tailpipe & ambient exhaust plume breathing)',
    exposureFactor: 1.0,
    badge: 'Severe Exposure Risk',
    color: 'amber'
  },
  {
    id: 'walk-bike',
    name: 'Walking or Cycling along Arterial Roads',
    icon: 'Footprints',
    co2PerKm: 0,
    pm25EmittedPerKm: 0,
    passengerSmogExposure: 'Extreme during smog peaks (Heavy lung ventilation 4-6x)',
    exposureFactor: 1.4,
    badge: 'Avoid during AQI > 150',
    color: 'purple'
  }
];

export const LIFESTYLE_PROFILES = [
  {
    id: 'family-young-kids',
    label: 'Family with Young Children / Infants',
    icon: 'Baby',
    description: 'Children breathe 2x faster than adults per body weight and their lungs are actively developing.',
    criticalVulnerability: 'PM2.5 crosses into blood circulation causing airway inflammation and reduced lung capacity growth.',
    topRecommendations: [
      'Keep school runs inside filtered transit or sealed vehicles; avoid open e-rickshaws or motorcycles during 7-9 AM inversion.',
      'Shift physical outdoor playtime strictly between 1:30 PM - 3:30 PM if AQI is below 200.',
      'Operate DIY Corsi-Rosenthal or HEPA purifier in the children bedroom continuously.',
      'Provide well-fitted KF94 or pediatric N95 masks for outdoor transitions.'
    ]
  },
  {
    id: 'elderly-respiratory',
    label: 'Elderly or Asthmatic / COPD Household',
    icon: 'HeartPulse',
    description: 'High risk of acute broncho-constriction, heart strain, and cardiovascular triggers during cold inversion.',
    criticalVulnerability: 'Fine carbon soot causes arterial stiffening and micro-vascular inflammation in elderly adults.',
    topRecommendations: [
      'Strictly avoid 6:00 AM - 9:00 AM morning walks. Substitute with indoor stretching or seated yoga.',
      'Ensure rescue inhalers and humidifiers are readily accessible.',
      'Keep indoor relative humidity between 40% and 50% to prevent mucosal drying in cold weather.',
      'Install draft seals on bedroom doors to maintain a clean-air sanctuary room.'
    ]
  },
  {
    id: 'daily-commuter',
    label: 'Daily Urban Office / Campus Commuter',
    icon: 'Briefcase',
    description: 'Spends 1.5 to 3 hours daily traversing dense traffic corridors and intersections.',
    criticalVulnerability: 'Peak exposure to black carbon and nitrogen dioxide (NO2) at traffic choke points.',
    topRecommendations: [
      'Time-shift departure: Leaving 30 minutes earlier or later avoids stationary idle queues where PM2.5 spikes by 400%.',
      'Wear tight-seal N95 mask on platforms, bus stops, and walking connections.',
      'Toggle car AC to recirculate at all times in tunnels and congestion.',
      'Choose metro rail transit over road routes whenever possible.'
    ]
  },
  {
    id: 'home-chef-wellness',
    label: 'Home Chef / Indoor Wellness Focused',
    icon: 'Home',
    description: 'Focuses on clean living, indoor cooking emissions, and holistic family nutrition against smog.',
    criticalVulnerability: 'Deep-frying, high-heat oil sautéing, and biomass stoves generate PM2.5 exceeding 600 µg/m³ indoors.',
    topRecommendations: [
      'Run kitchen range hood 5 minutes before and 10 minutes after cooking; keep kitchen door closed from living rooms.',
      'Incorporate antioxidant-rich foods (Vitamin C, Vitamin E, Omega-3s, Curcumin/turmeric) to mitigate oxidative lung stress.',
      'Replace all paraffin candles and incense with essential oil water diffusers.',
      'Adopt damp microfiber cleaning twice weekly.'
    ]
  }
];

export const DIY_PURIFIERS = [
  {
    id: 'corsi-rosenthal',
    name: 'Corsi-Rosenthal Box (Gold Standard DIY)',
    difficulty: 'Moderate (20-30 mins)',
    soundLevel: '51 dB (Quiet hum)',
    cadrRating: '550 - 650 CFM (Cleans a 500 sq ft room in 12 mins)',
    efficiency: '99% particulate capture down to 0.3 microns at high air volume',
    cost: '₹4,200 – ₹5,400',
    commercialEquivCost: '₹35,000 – ₹55,000',
    materials: [
      '1x 16-20" High-Flow Box or Pedestal Fan (₹1,800)',
      '4x MERV 13 / H11 Panel Filters (₹2,600)',
      '1x Cardboard base & circular donut shroud (₹0 / Upcycled)',
      '1x Heavy-duty duct tape or packaging tape (₹150)'
    ],
    pricing: {
      INR: {
        cost: '₹4,200 – ₹5,400',
        commercialEquivCost: '₹35,000 – ₹55,000',
        materials: [
          '1x 16-20" High-Flow Box or Pedestal Fan (₹1,800)',
          '4x MERV 13 / H11 Panel Filters (₹2,600)',
          '1x Cardboard base & circular donut shroud (₹0 / Upcycled)',
          '1x Heavy-duty duct tape or packaging tape (₹150)'
        ]
      },
      PKR: {
        cost: 'Rs 12,500 – Rs 16,000',
        commercialEquivCost: 'Rs 110,000 – Rs 160,000',
        materials: [
          '1x High-Velocity Fan (Rs 5,500)',
          '4x MERV 13 Filters (Rs 8,000)',
          '1x Cardboard bottom & top shroud (Rs 0)',
          '1x Heavy duct tape (Rs 500)'
        ]
      },
      USD: {
        cost: '$55 – $70',
        commercialEquivCost: '$450 – $650',
        materials: [
          '1x 20-inch box fan ($20)',
          '4x MERV 13 furnace filters ($38)',
          '1x Cardboard bottom & cardboard top shroud ($0)',
          '1x Heavy-duty duct tape or gaffer tape ($5)'
        ]
      },
      EUR: {
        cost: '€50 – €65',
        commercialEquivCost: '€400 – €600',
        materials: [
          '1x 40-50cm Box / Window fan (€20)',
          '4x MERV 13 / ePM1 filters (€35)',
          '1x Cardboard shroud (€0)',
          '1x Duct tape (€5)'
        ]
      },
      GBP: {
        cost: '£45 – £60',
        commercialEquivCost: '£350 – £520',
        materials: [
          '1x High-speed box fan (£18)',
          '4x MERV 13 filters (£32)',
          '1x Cardboard shroud (£0)',
          '1x Duct tape (£4)'
        ]
      },
      CNY: {
        cost: '¥380 – ¥490',
        commercialEquivCost: '¥2,800 – ¥4,500',
        materials: [
          '1x 20-inch fan (¥120)',
          '4x MERV 13 / H11 filter panels (¥240)',
          '1x Cardboard shroud (¥0)',
          '1x Heavy tape (¥20)'
        ]
      }
    },
    steps: [
      'Tape 4 MERV 13 filters together in a cube shape with the air-flow arrows pointing INWARD toward the center.',
      'Cut a cardboard square for the bottom base and tape tightly to eliminate all air leaks.',
      'Place the 20" box fan on top with air blowing UPWARD out of the box.',
      'Cut a cardboard circular donut shroud (15" diameter hole) and tape to the fan face to eliminate corner backpressure and increase CFM by 25%.',
      'Seal all seams with duct tape. Plug into low/medium speed for continuous winter filtration.'
    ],
    lifespanMonths: 6,
    recommendedFor: 'Living rooms, classrooms, shared community centers, large family apartments.'
  },
  {
    id: 'budget-single-fan',
    name: 'The Emergency Single-Filter Hack',
    difficulty: 'Easy (5 mins)',
    soundLevel: '48 dB (Gentle breeze)',
    cadrRating: '180 - 240 CFM',
    efficiency: '85-92% PM2.5 reduction in a closed bedroom in 30 minutes',
    cost: '₹1,800 – ₹2,400',
    commercialEquivCost: '₹12,000 – ₹18,000',
    materials: [
      '1x Standard table/box fan (₹1,200)',
      '1x MERV 13 / True HEPA panel filter (₹700)',
      'Painter tape or bungee cords (₹80)'
    ],
    pricing: {
      INR: {
        cost: '₹1,800 – ₹2,400',
        commercialEquivCost: '₹12,000 – ₹18,000',
        materials: [
          '1x Standard table/box fan (₹1,200)',
          '1x MERV 13 / True HEPA panel filter (₹700)',
          'Painter tape or bungee cords (₹80)'
        ]
      },
      PKR: {
        cost: 'Rs 5,500 – Rs 7,200',
        commercialEquivCost: 'Rs 35,000 – Rs 55,000',
        materials: [
          '1x Standard Fan (Rs 3,800)',
          '1x MERV 13 panel filter (Rs 2,200)',
          'Tape or cord (Rs 200)'
        ]
      },
      USD: {
        cost: '$25 – $32',
        commercialEquivCost: '$150 – $220',
        materials: [
          '1x 20-inch box fan or pedestal fan ($18)',
          '1x MERV 13 (20x20x1) panel filter ($10)',
          'Painter tape or bungee cords ($2)'
        ]
      },
      EUR: {
        cost: '€24 – €30',
        commercialEquivCost: '€140 – €190',
        materials: [
          '1x Box fan (€17)',
          '1x MERV 13 filter (€10)',
          'Tape (€2)'
        ]
      },
      GBP: {
        cost: '£22 – £28',
        commercialEquivCost: '£120 – £170',
        materials: [
          '1x Box fan (£15)',
          '1x MERV 13 filter (£9)',
          'Tape (£2)'
        ]
      },
      CNY: {
        cost: '¥160 – ¥220',
        commercialEquivCost: '¥900 – ¥1,400',
        materials: [
          '1x Fan (¥110)',
          '1x MERV 13 filter (¥60)',
          'Tape (¥10)'
        ]
      }
    },
    steps: [
      'Identify the intake side (the back) of the fan.',
      'Align the MERV 13 filter against the back, verifying the arrow points towards the front.',
      'Tape all 4 edges flush with painters tape or strap with 2 bungee cords.',
      'Position at least 1 foot away from the wall to ensure unhindered airflow.'
    ],
    lifespanMonths: 3,
    recommendedFor: 'Bedrooms, dorms, home offices, acute emergency smog spikes.'
  },
  {
    id: 'pc-fan-silent',
    name: 'Ultra-Silent Multi-PC Fan Purifier',
    difficulty: 'Advanced (45 mins)',
    soundLevel: '32 dB (Near whisper silent)',
    cadrRating: '160 CFM',
    efficiency: 'High efficiency with near-zero energy consumption (under 8W)',
    cost: '₹3,200 – ₹3,900',
    commercialEquivCost: '₹18,000 – ₹26,000',
    materials: [
      '4x 120mm 12V high-static-pressure PC fans (₹1,800)',
      '1x 12V 2A power adapter with barrel jack (₹450)',
      '1x Mini HEPA or MERV 13 filter block (₹950)',
      'Zip ties & foam seal (₹100)'
    ],
    pricing: {
      INR: {
        cost: '₹3,200 – ₹3,900',
        commercialEquivCost: '₹18,000 – ₹26,000',
        materials: [
          '4x 120mm 12V high-static-pressure PC fans (₹1,800)',
          '1x 12V 2A power adapter with barrel jack (₹450)',
          '1x Mini HEPA or MERV 13 filter block (₹950)',
          'Zip ties & foam seal (₹100)'
        ]
      },
      PKR: {
        cost: 'Rs 9,800 – Rs 12,000',
        commercialEquivCost: 'Rs 50,000 – Rs 75,000',
        materials: [
          '4x 120mm 12V PC fans (Rs 5,500)',
          '1x 12V 2A adapter (Rs 1,400)',
          '1x HEPA filter block (Rs 3,000)',
          'Zip ties (Rs 300)'
        ]
      },
      USD: {
        cost: '$45 – $52',
        commercialEquivCost: '$220 – $280',
        materials: [
          '4x 120mm 12V Arctic/Noctua high-static-pressure PC fans ($25)',
          '1x 12V 2A power adapter with barrel jack ($8)',
          '1x Mini HEPA or MERV 13 filter block ($12)',
          'Zip ties ($2)'
        ]
      },
      EUR: {
        cost: '€42 – €48',
        commercialEquivCost: '€200 – €260',
        materials: [
          '4x 120mm PC fans (€24)',
          '1x 12V power adapter (€7)',
          '1x HEPA filter block (€11)',
          'Zip ties (€2)'
        ]
      },
      GBP: {
        cost: '£38 – £44',
        commercialEquivCost: '£180 – £240',
        materials: [
          '4x 120mm PC fans (£20)',
          '1x 12V adapter (£6)',
          '1x HEPA filter block (£10)',
          'Zip ties (£2)'
        ]
      },
      CNY: {
        cost: '¥280 – ¥340',
        commercialEquivCost: '¥1,500 – ¥2,000',
        materials: [
          '4x 120mm fans (¥150)',
          '1x 12V adapter (¥40)',
          '1x HEPA filter block (¥80)',
          'Zip ties (¥10)'
        ]
      }
    },
    steps: [
      'Daisy chain the 4 PC fans into a 2x2 grid using zip ties.',
      'Splice or connect positive/negative wires to the 12V DC power brick.',
      'Affix firmly over the filter intake with foam weatherstripping gasket.',
      'Ideal for night-time nurseries or asthmatic children bedrooms.'
    ],
    lifespanMonths: 6,
    recommendedFor: 'Nurseries, light sleepers, night-time bedside filtration.'
  }
];

export function getPurifierLocalizedData(purifier, currencyCode = 'INR') {
  const code = (currencyCode || 'INR').toUpperCase();
  const pricing = purifier.pricing[code] || purifier.pricing.INR || purifier.pricing.USD;
  return {
    ...purifier,
    cost: pricing.cost,
    commercialEquivCost: pricing.commercialEquivCost,
    materials: pricing.materials
  };
}

export const INDOOR_AIR_HACKS = [
  {
    id: 'damp-cleaning',
    title: 'Damp Microfiber Mopping (Never Dry Sweep)',
    category: 'Dust & Particulate Control',
    icon: 'Sparkles',
    impact: 'Reduces resuspended indoor PM2.5 by up to 60%',
    problem: 'Dry broom sweeping or feather dusting aerosolizes settled toxic heavy metals and fine soot directly into family breathing zones.',
    action: 'Always use a slightly damp microfiber cloth or mop. The water film traps ultrafine particulates instead of kicking them up into the air.'
  },
  {
    id: 'thermal-inversion-venting',
    title: 'Precision Inversion Ventilation Timing',
    category: 'Ventilation Protocols',
    icon: 'Wind',
    impact: 'Avoids 70% of peak outdoor toxic spike entry',
    problem: 'In winter, thermal inversion traps smog at ground level between 6:00 AM - 10:00 AM and 8:00 PM - midnight.',
    action: 'Never open windows during morning or late evening. Only air out the house briefly between 1:00 PM and 3:30 PM when surface solar warming breaks the inversion boundary and dispersion peaks.'
  },
  {
    id: 'zero-indoor-combustion',
    title: 'Eliminate Indoor Combustion Triggers',
    category: 'Indoor Source Elimination',
    icon: 'Flame',
    impact: 'Eliminates indoor spikes that often exceed outdoor smog (>500 µg/m³)',
    problem: 'Burning 1 stick of incense (agarbatti) produces PM2.5 equivalent to smoking 2-3 cigarettes. Paraffin candles and unvented gas cooktops release benzene, formaldehyde, and ultrafine soot.',
    action: 'Enforce a strict zero-open-flame rule indoors during winter smog season. Switch to electric diffusers or simmer cinnamon/orange peels in water for fragrance, and always turn on range hoods when boiling or cooking.'
  },
  {
    id: 'door-window-weatherstripping',
    title: 'DIY Foam & Silicone Smog Weatherstripping',
    category: 'Envelope Sealing',
    icon: 'ShieldCheck',
    impact: 'Cuts draft leakage of outdoor particulate by 45%',
    problem: 'Winter drafts carry toxic PM2.5 through minute door thresholds and window sliding tracks.',
    action: 'Install affordable adhesive foam tape along window sashes and place a rolled towel or twin-draft-stopper beneath exterior entrance doors.'
  },
  {
    id: 'car-cabin-recirc',
    title: 'The 30-Second Car Cabin Filter Hack',
    category: 'Commute & Mobility',
    icon: 'Car',
    impact: 'Drops in-cabin PM2.5 from 350 µg/m³ to under 30 µg/m³ in 4 minutes',
    problem: 'Sitting in highway traffic pulls diesel exhaust and brake dust straight through your car dashboard.',
    action: 'Press the "Air Recirculation" button (curved arrow) immediately upon starting the car. Replace standard cabin filter with an activated carbon / HEPA-grade auto filter (₹600–₹1,200 DIY).'
  }
];

export const AIR_PLANTS_DATA = [
  {
    name: 'Snake Plant (Sansevieria trifasciata)',
    nickname: "Mother-in-Law's Tongue",
    purificationType: 'Benzene, Formaldehyde, NO2, Night-time O2',
    careLevel: 'Very Low (Survives in low winter light, water every 2-3 weeks)',
    petsSafe: 'Toxic if ingested by cats/dogs (place on high shelf)',
    density: '2 large plants per 100 sq ft for measurable VOC freshening'
  },
  {
    name: 'Spider Plant (Chlorophytum comosum)',
    nickname: 'Ribbon Plant',
    purificationType: 'Carbon Monoxide, Xylene, Formaldehyde',
    careLevel: 'Extremely Low',
    petsSafe: '100% Non-toxic & Pet Safe',
    density: 'Ideal for bedrooms and children rooms'
  },
  {
    name: 'Peace Lily (Spathiphyllum)',
    nickname: 'White Sails',
    purificationType: 'Ammonia, Trichloroethylene, Mold spores',
    careLevel: 'Moderate (Loves indirect light & humid soil)',
    petsSafe: 'Toxic to pets',
    density: 'Bathrooms and living areas away from pets'
  },
  {
    name: 'Areca Palm (Dypsis lutescens)',
    nickname: 'Butterfly Palm',
    purificationType: 'Natural Winter Humidifier & Toluene filter',
    careLevel: 'Moderate (Needs bright filtered winter sun)',
    petsSafe: '100% Non-toxic to cats & dogs',
    density: 'Adds up to 1 liter of natural clean moisture into dry winter air daily'
  }
];

export const SMOG_KNOWLEDGE_TOPICS = {
  inversion: {
    title: 'Why Winter Smog is So Dangerous (Thermal Inversion)',
    explanation: 'Normally, warm air near the ground rises into the colder atmosphere, carrying pollutants away (convective dispersion). In winter, radiation cooling during calm clear nights chills the ground rapidly. A layer of warmer air forms above the cold ground layer, creating an atmospheric "lid" or cap called a Thermal Inversion. This traps vehicle exhaust, biomass smoke, dust, and industrial sulfur dioxide within just 100-200 meters of the surface, causing particulate concentrations to spike 10x-20x higher than summer levels.',
    keyRules: [
      'Morning hours (6:00 - 9:30 AM) have the lowest boundary layer and peak inversion trap.',
      'Sunlight breaks the inversion around midday (1:00 - 3:30 PM), making afternoon the safest time for essential errands or brief home ventilation.',
      'Evening cools down rapidly after 7:00 PM, re-trapping emissions overnight.'
    ]
  },
  masks: {
    title: 'Mask Filtration Efficacy (N95 vs Surgical vs Cloth)',
    explanation: 'PM2.5 particles are 30 times smaller than a human hair and enter deep into lung alveoli and the bloodstream. Cloth bandanas and standard blue surgical masks only filter 10-30% of PM2.5 because they lack electrostatic melt-blown filtration layers and have large side leaks. Certified N95, KN95, or FFP2 respirators filter at least 95% of airborne particles down to 0.3 microns when fitted snugly with an airtight nose bridge seal.',
    tips: [
      'Look for NIOSH N95, EN 149 FFP2, or GB2626 KN95 certification.',
      'Perform a seal check: Inhale sharply; the mask should collapse slightly inwards without air hissing past your cheeks or eyes.',
      'Cloth masks do not protect lungs against winter toxic smog.'
    ]
  },
  pediatric: {
    title: 'Protecting Children & Babies',
    explanation: 'Children breathe twice as much air per pound of body weight than adults and their immune and respiratory systems are still developing. Prolonged PM2.5 exposure reduces adult lung capacity by 10-20% and triggers pediatric asthma.',
    tips: [
      'Never take babies in open strollers along main roadways during morning rush hour (strollers sit directly at exhaust pipe height!).',
      'Use certified pediatric masks with adjustable ear loops for kids over 2 years old.',
      'Turn the child’s bedroom into a clean air sanctuary with continuous filtration.'
    ]
  },
  nutrition: {
    title: 'Dietary Defense against Toxic Air',
    explanation: 'Inhaled particulate matter generates intense oxidative stress and systemic inflammation. Nutritional science demonstrates that antioxidants protect cellular lung lining and reduce systemic vascular strain.',
    tips: [
      'Vitamin C (Amla/Indian gooseberry, citrus, bell peppers) restores alveolar fluid antioxidants.',
      'Curcumin / Turmeric with warm milk or black pepper acts as a potent anti-inflammatory agent for bronchial passages.',
      'Jaggery (traditional unrefined cane sugar) has been demonstrated in respiratory workers to facilitate dust expulsion from the upper pharynx.',
      'Omega-3 fatty acids (flaxseeds, walnuts, chia seeds, fish oil) counter cardiovascular inflammation from PM2.5.'
    ]
  },
  diyCorsi: {
    title: 'Corsi-Rosenthal Box Performance & Physics',
    explanation: 'Invented by Dr. Richard Corsi and Jim Rosenthal, this open-source design uses 4 MERV-13 pleated HVAC filters assembled in a cube with a standard 20-inch box fan pulling air through the filters and exhausting upward. Because 4 filters provide 16 to 20 square feet of surface area, air resistance (pressure drop) is tiny. This allows the fan to deliver over 500-600 CFM of purified air — outperforming commercial $600 HEPA units at a fraction of the initial and filter replacement cost.',
    tips: [
      'Always install a cardboard circular shroud on the fan face: it stops air from recirculating backwards at the blade tips, boosting CADR by ~25%.',
      'Filters last 6 months even in heavy winter smog because the massive surface area distributes the dust loading.'
    ]
  }
};

export const SMART_PROMPT_SUGGESTIONS = [
  {
    icon: 'Calendar',
    label: '24-Hour Smog-Safe Schedule',
    prompt: 'Generate an optimized 24-hour winter daily schedule for my family to avoid peak smog inversion hours and minimize exposure.'
  },
  {
    icon: 'Hammer',
    label: 'Build DIY Air Purifier (<₹4,500)',
    prompt: 'Give me exact step-by-step instructions to build a high-performance DIY air purifier under ₹4,500 using a regular fan and filter.'
  },
  {
    icon: 'Baby',
    label: 'Child & Baby Smog Shield',
    prompt: 'What are the top 5 medical & lifestyle rules to protect young children and toddlers during severe hazardous winter smog?'
  },
  {
    icon: 'Salad',
    label: 'Dietary Lung Protection Protocol',
    prompt: 'What foods, drinks, and antioxidant supplements scientifically reduce lung inflammation and oxidative stress from PM2.5?'
  },
  {
    icon: 'Car',
    label: 'Commute & Travel Exposure Hacks',
    prompt: 'How can I reduce toxic particulate inhalation by 80% during my daily work commute without quitting my job?'
  }
];
