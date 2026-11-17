/**
 * @fileoverview Pure Air Quality Index (AQI) threshold and classification utilities.
 * Conforms to WHO and US EPA standard atmospheric health categories.
 * @module aqiCalculations
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
