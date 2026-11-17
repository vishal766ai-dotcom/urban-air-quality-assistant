export const COMMUTE_MODES = [
  {
    id: 'metro',
    name: 'Electric Metro / Subway Train',
    icon: 'Train',
    co2PerKm: 18, // grams CO2e per passenger-km
    pm25EmittedPerKm: 0.005, // grams PM2.5
    passengerSmogExposure: 'Lowest (Underground/closed air filtration stations)',
    exposureFactor: 0.2, // 80% lower than open street
    badge: 'Cleanest Choice',
    color: 'emerald'
  },
  {
    id: 'ev-carpool',
    name: 'Electric Vehicle (EV) Carpool (3+ people)',
    icon: 'Car',
    co2PerKm: 25,
    pm25EmittedPerKm: 0.015, // mainly tire wear
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
    exposureFactor: 1.0, // 100% full direct exposure
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
    exposureFactor: 1.4, // Deep lung alveolar deposition due to physical exertion
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
