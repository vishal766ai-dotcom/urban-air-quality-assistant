/**
 * @fileoverview Central calculations module for AeroGuardian.
 * Re-exports modular pure atmospheric, ventilation, and emission calculation utilities.
 * @module calculations
 */

export {
  AQI_CATEGORIES,
  getAqiCategory,
  calculateWhoMultiple
} from './aqiCalculations';

export {
  calculateTurnoverMinutes,
  calculateAirChangesPerHour,
  calculateInversionDanger,
  calculateAiringCountdown
} from './inversionCalculations';

export {
  calculatePersonalImpact
} from './impactCalculations';
