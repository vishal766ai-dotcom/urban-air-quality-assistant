/**
 * Impact Calculator Service
 * Computes exact emission savings (CO2, PM2.5, toxic particulates) and family health impact
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
    'solo-ice-car': { co2: 192, pm25: 0.18 }, // g/km
    'motorcycle': { co2: 84, pm25: 0.12 },
    'electric-bus': { co2: 35, pm25: 0.03 },
    'ev-carpool': { co2: 25, pm25: 0.015 },
    'metro': { co2: 18, pm25: 0.005 },
    'walk-bike': { co2: 0, pm25: 0 }
  };

  const baseline = emissionFactors[baselineMode] || emissionFactors['solo-ice-car'];
  const current = emissionFactors[commuteMode] || emissionFactors['metro'];

  const monthlyKm = dailyKm * daysPerMonth;

  // Commute emission savings per month
  const commuteCo2SavedGrams = Math.max(0, (baseline.co2 - current.co2) * monthlyKm);
  const commutePm25SavedGrams = Math.max(0, (baseline.pm25 - current.pm25) * monthlyKm);

  // Lifestyle additions
  // Switched from biomass/gas heating or avoided 1 backyard trash/leaf fire per month
  const biomassCo2SavedGrams = avoidedBiomassBurn ? 18000 : 0; // ~18 kg CO2
  const biomassPm25SavedGrams = avoidedBiomassBurn ? 120 : 0; // ~120 g fine soot

  // Stove optimization (induction vs unvented combustion)
  const stoveCo2SavedGrams = switchedStove ? 6500 : 0; // ~6.5 kg CO2
  const stovePm25SavedGrams = switchedStove ? 15 : 0;

  // Total monthly savings
  const totalCo2SavedKg = ((commuteCo2SavedGrams + biomassCo2SavedGrams + stoveCo2SavedGrams) / 1000);
  const totalPm25SavedGrams = (commutePm25SavedGrams + biomassPm25SavedGrams + stovePm25SavedGrams);

  // Annualized
  const annualCo2SavedKg = totalCo2SavedKg * 12;
  const annualPm25SavedGrams = totalPm25SavedGrams * 12;

  // Equivalents
  const treeEquivalents = (annualCo2SavedKg / 22); // 1 urban tree absorbs ~22kg CO2/year
  const carKmEquivalents = (annualCo2SavedKg / 0.192); // solo ICE car km avoided
  
  // Indoor Family Lung Exposure Reduction
  // Running DIY purifier for 12 hours/day removes ~85-95% of PM2.5 in living quarters
  const indoorExposureCutPct = Math.min(92, Math.round((diyPurifierHoursPerDay / 16) * 90));
  const familyAirSanctuaryScore = Math.min(100, Math.round(50 + (indoorExposureCutPct * 0.4) + (switchedStove ? 10 : 0)));

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
