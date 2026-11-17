/**
 * @fileoverview Pure emission factors, carbon savings, and health equivalence calculations.
 * @module impactCalculations
 */

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
} = {}) {
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
