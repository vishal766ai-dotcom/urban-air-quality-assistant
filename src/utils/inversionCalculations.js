/**
 * @fileoverview Pure calculations for room ventilation CADR, ACH, thermal inversion danger, and solar airing windows.
 * @module inversionCalculations
 */

/**
 * Calculates the minutes required for one complete air exchange in a room based on CADR.
 * Includes complete division-by-zero protection for roomSize = 0 or CADR = 0, and handles negative inputs safely.
 * @param {number} roomSizeSqFt - Room floor surface area in square feet.
 * @param {number} cadrCfm - Clean Air Delivery Rate in Cubic Feet per Minute.
 * @param {number} [ceilingHeightFt=8.5] - Ceiling height in feet (defaults to 8.5ft).
 * @returns {number} Estimated minutes per complete air turnover (or 0 for zero/invalid inputs).
 */
export function calculateTurnoverMinutes(roomSizeSqFt, cadrCfm, ceilingHeightFt = 8.5) {
  const numericSqFt = Number(roomSizeSqFt);
  const numericCadr = Number(cadrCfm);

  // Safe boundary and division-by-zero protection
  if (isNaN(numericSqFt) || numericSqFt <= 0) return 0;
  if (isNaN(numericCadr) || numericCadr <= 0) return 0;

  const sqFt = Math.max(1, numericSqFt);
  const cadr = Math.max(1, numericCadr);
  const height = Math.max(1, Number(ceilingHeightFt) || 8.5);
  const roomVolumeCuFt = sqFt * height;
  return Math.max(3, Math.round(roomVolumeCuFt / cadr));
}

/**
 * Computes Air Changes per Hour (ACH) for clinical and indoor air quality standards.
 * Guaranteed division-by-zero protection against zero CADR or zero room size.
 * @param {number} roomSizeSqFt - Room floor surface area in square feet.
 * @param {number} cadrCfm - Clean Air Delivery Rate in Cubic Feet per Minute.
 * @param {number} [ceilingHeightFt=8.5] - Ceiling height in feet.
 * @returns {number} Decimal Air Changes per Hour (e.g., 5.2 ACH, or 0 for zero inputs).
 */
export function calculateAirChangesPerHour(roomSizeSqFt, cadrCfm, ceilingHeightFt = 8.5) {
  const turnoverMinutes = calculateTurnoverMinutes(roomSizeSqFt, cadrCfm, ceilingHeightFt);
  if (turnoverMinutes <= 0) return 0;
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
 * @param {number} [params.temp=15] - Ambient surface temperature in Celsius.
 * @param {number} [params.windSpeed=3] - Surface wind speed in km/h.
 * @param {number} [params.humidity=75] - Relative humidity percentage (0 - 100).
 * @returns {InversionDangerRating} Computed inversion stagnation rating.
 */
export function calculateInversionDanger({ temp = 15, windSpeed = 3, humidity = 75 } = {}) {
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

/**
 * Returns formatted ventilation hours based on hourly forecast data.
 * @param {Array<{ hour: string, safeVentilation: boolean }>} [hourlyForecast=[]]
 * @returns {string} Safe ventilation window description
 */
export function getRecommendedVentilationHours(hourlyForecast = []) {
  const safeSlots = hourlyForecast.filter(h => h.safeVentilation);
  if (safeSlots.length > 0) {
    return safeSlots.map(s => s.hour).join(', ');
  }
  return '1:00 PM – 3:30 PM (Midday solar dispersion only)';
}
