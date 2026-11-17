/**
 * @fileoverview Pure atmospheric, ventilation, and emission calculation utilities for AeroGuardian.
 * Contains mathematical formulas for AQI categorization, ACH turnover, CO2/PM2.5 averted, and solar inversion timing.
 * @module calculations
 */

/**
 * @typedef {Object} AqiCategoryDefinition
 * @property {number} min - Lower AQI threshold
 * @property {number} max - Upper AQI threshold
 * @property {string} label - Human-readable severity label
 * @property {string} color - Hex color code for graphical indicators
 * @property {string} textColor - Tailwind text utility class
 * @property {string} bgBadge - Tailwind badge background and border classes
 * @property {string} desc - Comprehensive medical advisory description
 */

/**
 * Standard WHO and US EPA Air Quality Index classification categories.
 * @type {Record<string, AqiCategoryDefinition>}
 */
export const AQI_CATEGORIES = {
  good: {
    min: 0,
    max: 50,
    label: 'Good',
    color: '#10b981',
    textColor: 'text-emerald-400',
    bgBadge: 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300',
    desc: 'Air quality is satisfactory; air pollution poses little or no risk.'
  },
  moderate: {
    min: 51,
    max: 100,
    label: 'Moderate',
    color: '#f59e0b',
    textColor: 'text-amber-400',
    bgBadge: 'bg-amber-950/70 border-amber-500/40 text-amber-300',
    desc: 'Air quality is acceptable; unusually sensitive people may experience minor symptoms.'
  },
  sensitive: {
    min: 101,
    max: 150,
    label: 'Unhealthy for Sensitive Groups',
    color: '#f97316',
    textColor: 'text-orange-400',
    bgBadge: 'bg-orange-950/70 border-orange-500/40 text-orange-300',
    desc: 'Members of sensitive groups (children, elderly, asthmatics) may experience health effects.'
  },
  unhealthy: {
    min: 151,
    max: 200,
    label: 'Unhealthy',
    color: '#ef4444',
    textColor: 'text-red-400',
    bgBadge: 'bg-red-950/70 border-red-500/40 text-red-300',
    desc: 'Everyone may begin to experience health effects; sensitive groups may experience more serious effects.'
  },
  veryUnhealthy: {
    min: 201,
    max: 300,
    label: 'Very Unhealthy',
    color: '#8b5cf6',
    textColor: 'text-purple-400',
    bgBadge: 'bg-purple-950/70 border-purple-500/40 text-purple-300',
    desc: 'Health alert: The risk of health effects is increased for everyone.'
  },
  hazardous: {
    min: 301,
    max: 999,
    label: 'Hazardous / Severe Winter Smog',
    color: '#881337',
    textColor: 'text-rose-300',
    bgBadge: 'bg-rose-950/80 border-rose-500/50 text-rose-200',
    desc: 'Emergency health warning of severe conditions. Entire population is likely to be affected.'
  }
};

/**
 * Maps a numeric Air Quality Index (AQI) value to its standard health threshold category.
 * @param {number} aqi - Numeric AQI value (0 - 999).
 * @returns {AqiCategoryDefinition} The matching classification category.
 */
export function getAqiCategory(aqi) {
  const numericAqi = Number(aqi) || 0;
  if (numericAqi <= 50) return AQI_CATEGORIES.good;
  if (numericAqi <= 100) return AQI_CATEGORIES.moderate;
  if (numericAqi <= 150) return AQI_CATEGORIES.sensitive;
  if (numericAqi <= 200) return AQI_CATEGORIES.unhealthy;
  if (numericAqi <= 300) return AQI_CATEGORIES.veryUnhealthy;
  return AQI_CATEGORIES.hazardous;
}

/**
 * Calculates the minutes required for one complete air exchange in a room based on CADR.
 * @param {number} roomSizeSqFt - Room floor surface area in square feet.
 * @param {number} cadrCfm - Clean Air Delivery Rate in Cubic Feet per Minute.
 * @param {number} [ceilingHeightFt=8.5] - Ceiling height in feet (defaults to 8.5ft).
 * @returns {number} Estimated minutes per complete air turnover.
 */
export function calculateTurnoverMinutes(roomSizeSqFt, cadrCfm, ceilingHeightFt = 8.5) {
  const sqFt = Math.max(50, Number(roomSizeSqFt) || 300);
  const cadr = Math.max(50, Number(cadrCfm) || 200);
  const roomVolumeCuFt = sqFt * ceilingHeightFt;
  return Math.max(3, Math.round(roomVolumeCuFt / cadr));
}

/**
 * Computes Air Changes per Hour (ACH) for clinical and indoor air quality standards.
 * @param {number} roomSizeSqFt - Room floor surface area in square feet.
 * @param {number} cadrCfm - Clean Air Delivery Rate in Cubic Feet per Minute.
 * @param {number} [ceilingHeightFt=8.5] - Ceiling height in feet.
 * @returns {number} Decimal Air Changes per Hour (e.g., 5.2 ACH).
 */
export function calculateAirChangesPerHour(roomSizeSqFt, cadrCfm, ceilingHeightFt = 8.5) {
  const turnoverMinutes = calculateTurnoverMinutes(roomSizeSqFt, cadrCfm, ceilingHeightFt);
  return Number((60 / turnoverMinutes).toFixed(1));
}

/**
 * @typedef {Object} InversionDangerRating
 * @property {'Critical Trap' | 'High Inversion' | 'Low Inversion'} level - Inversion risk level
 * @property {'rose' | 'amber' | 'emerald'} color - Visual badge color identifier
 * @property {string} desc - Meteorological explanation of atmospheric stagnation
 */

/**
 * Evaluates winter boundary layer thermal inversion danger based on microclimate variables.
 * @param {Object} params - Weather inputs.
 * @param {number} params.temp - Ambient surface temperature in Celsius.
 * @param {number} params.windSpeed - Surface wind speed in km/h.
 * @param {number} params.humidity - Relative humidity percentage (0 - 100).
 * @returns {InversionDangerRating} Computed inversion stagnation rating.
 */
export function calculateInversionDanger({ temp = 15, windSpeed = 3, humidity = 75 }) {
  let score = 0;
  if (windSpeed < 3.0) score += 40;
  else if (windSpeed < 6.0) score += 20;

  if (humidity > 80) score += 30;
  else if (humidity > 60) score += 15;

  if (temp < 15) score += 30;
  else if (temp < 22) score += 15;

  if (score >= 80) {
    return {
      level: 'Critical Trap',
      color: 'rose',
      desc: 'Severe cold stagnant air boundary layer traps ground pollutants.'
    };
  }
  if (score >= 50) {
    return {
      level: 'High Inversion',
      color: 'amber',
      desc: 'Moderate cold air lid preventing vertical dispersion.'
    };
  }
  return {
    level: 'Low Inversion',
    color: 'emerald',
    desc: 'Active wind or solar thermal currents assisting dispersion.'
  };
}

/**
 * @typedef {Object} PersonalImpactResult
 * @property {Object} monthly - Monthly savings in kg CO2 and grams PM2.5
 * @property {number} monthly.co2Kg - kg CO2e emissions prevented per month
 * @property {number} monthly.pm25Grams - grams of PM2.5 prevented from entering ambient air
 * @property {Object} annual - 12-month projected cumulative savings
 * @property {number} annual.co2Kg - kg CO2e averted annually
 * @property {number} annual.pm25Grams - grams PM2.5 averted annually
 * @property {Object} equivalents - Real-world tangible equivalence metrics
 * @property {number} equivalents.trees - Equivalent mature trees absorbing carbon
 * @property {number} equivalents.carKmAverted - Equivalent passenger vehicle km averted
 * @property {number} equivalents.indoorExposureCutPct - Indoor particulate exposure reduction percentage
 * @property {number} equivalents.familyAirSanctuaryScore - Family lung defense sanctuary index (0 - 100)
 * @property {string} directImpactExplanation - Comprehensive plain-language mathematical explanation
 */

/**
 * Computes exact quantified environmental and respiratory health impacts of lifestyle choices.
 * @param {Object} options - Lifestyle parameters.
 * @param {string} [options.commuteMode='metro'] - Selected alternative commute mode.
 * @param {string} [options.baselineMode='solo-ice-car'] - Reference baseline vehicle mode.
 * @param {number} [options.dailyKm=20] - Daily roundtrip travel distance in kilometers.
 * @param {number} [options.daysPerMonth=22] - Working commute days per month.
 * @param {boolean} [options.switchedStove=true] - Clean induction cooking adopted.
 * @param {boolean} [options.avoidedBiomassBurn=true] - Prevented open biomass / leaf burning.
 * @param {number} [options.diyPurifierHoursPerDay=12] - Daily active indoor air purifier runtime.
 * @returns {PersonalImpactResult} Comprehensive emissions and health impact metrics.
 */
export function calculatePersonalImpact({
  commuteMode = 'metro',
  baselineMode = 'solo-ice-car',
  dailyKm = 20,
  daysPerMonth = 22,
  switchedStove = true,
  avoidedBiomassBurn = true,
  diyPurifierHoursPerDay = 12
}) {
  const emissionFactors = {
    'solo-ice-car': { co2: 192, pm25: 0.18 },
    'motorcycle': { co2: 84, pm25: 0.12 },
    'electric-bus': { co2: 35, pm25: 0.03 },
    'ev-carpool': { co2: 25, pm25: 0.015 },
    'metro': { co2: 18, pm25: 0.005 },
    'walk-bike': { co2: 0, pm25: 0 }
  };

  const baseline = emissionFactors[baselineMode] || emissionFactors['solo-ice-car'];
  const current = emissionFactors[commuteMode] || emissionFactors['metro'];

  const monthlyKm = Math.max(0, Number(dailyKm) || 0) * Math.max(0, Number(daysPerMonth) || 0);

  const commuteCo2SavedGrams = Math.max(0, (baseline.co2 - current.co2) * monthlyKm);
  const commutePm25SavedGrams = Math.max(0, (baseline.pm25 - current.pm25) * monthlyKm);

  const biomassCo2SavedGrams = avoidedBiomassBurn ? 18000 : 0;
  const biomassPm25SavedGrams = avoidedBiomassBurn ? 120 : 0;

  const stoveCo2SavedGrams = switchedStove ? 6500 : 0;
  const stovePm25SavedGrams = switchedStove ? 15 : 0;

  const totalCo2SavedKg = (commuteCo2SavedGrams + biomassCo2SavedGrams + stoveCo2SavedGrams) / 1000;
  const totalPm25SavedGrams = commutePm25SavedGrams + biomassPm25SavedGrams + stovePm25SavedGrams;

  const annualCo2SavedKg = totalCo2SavedKg * 12;
  const annualPm25SavedGrams = totalPm25SavedGrams * 12;

  const treeEquivalents = annualCo2SavedKg / 22;
  const carKmEquivalents = annualCo2SavedKg / 0.192;

  const indoorExposureCutPct = Math.min(92, Math.round((Math.max(0, diyPurifierHoursPerDay) / 16) * 90));
  const familyAirSanctuaryScore = Math.min(
    100,
    Math.round(50 + indoorExposureCutPct * 0.4 + (switchedStove ? 10 : 0))
  );

  return {
    monthly: {
      co2Kg: Number(totalCo2SavedKg.toFixed(1)),
      pm25Grams: Number(totalPm25SavedGrams.toFixed(1))
    },
    annual: {
      co2Kg: Number(annualCo2SavedKg.toFixed(1)),
      pm25Grams: Number(annualPm25SavedGrams.toFixed(1))
    },
    equivalents: {
      trees: Number(treeEquivalents.toFixed(1)),
      carKmAverted: Math.round(carKmEquivalents),
      indoorExposureCutPct,
      familyAirSanctuaryScore
    },
    directImpactExplanation: `By choosing ${commuteMode.toUpperCase()} over ${baselineMode.toUpperCase()} and adopting clean indoor air practices, you eliminate approximately ${totalCo2SavedKg.toFixed(1)} kg of greenhouse gas emissions and keep ${totalPm25SavedGrams.toFixed(1)} grams of toxic fine particulate matter out of your neighborhood air each month. That is equivalent to the carbon absorption of ${treeEquivalents.toFixed(1)} mature trees!`
  };
}

/**
 * @typedef {Object} SafeAiringCountdown
 * @property {string} text - Human-readable countdown or active window label
 * @property {boolean} isNow - Whether current time is within the midday ventilation window (13:00 - 15:30)
 * @property {number} hoursUntil - Hours remaining until next solar window
 * @property {number} minsUntil - Minutes remaining until next solar window
 */

/**
 * Calculates countdown status to the optimal midday solar dispersion window (1:00 PM - 3:30 PM).
 * @param {Date} [now=new Date()] - Reference timestamp.
 * @returns {SafeAiringCountdown} Computed window timing information.
 */
export function calculateAiringCountdown(now = new Date()) {
  const currentHour = now.getHours();
  const currentMin = now.getMinutes();

  if (currentHour >= 13 && (currentHour < 15 || (currentHour === 15 && currentMin <= 30))) {
    return {
      text: 'Active Safe Window',
      isNow: true,
      hoursUntil: 0,
      minsUntil: 0
    };
  }

  let hoursUntil = 13 - currentHour;
  let minsUntil = 0 - currentMin;
  if (minsUntil < 0) {
    minsUntil += 60;
    hoursUntil -= 1;
  }
  if (hoursUntil < 0) {
    hoursUntil += 24;
  }

  return {
    text: `Opens in ${hoursUntil}h ${minsUntil}m`,
    isNow: false,
    hoursUntil,
    minsUntil
  };
}
