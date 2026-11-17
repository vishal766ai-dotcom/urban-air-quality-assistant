import { describe, it, expect } from 'vitest';
import {
  getAqiCategory,
  calculateWhoMultiple,
  calculateTurnoverMinutes,
  calculateAirChangesPerHour,
  calculateInversionDanger,
  calculatePersonalImpact,
  calculateAiringCountdown
} from '../utils/calculations';

describe('Pure Calculation Functions & Edge Cases Suite', () => {

  describe('WHO Multiple Calculation & Edge Cases', () => {
    it('calculates exact WHO multiple for standard and severe pollution levels', () => {
      // Standard WHO guideline for PM2.5 is 15 µg/m³
      expect(calculateWhoMultiple(15)).toBe(1.0);
      expect(calculateWhoMultiple(30)).toBe(2.0);
      expect(calculateWhoMultiple(382.5)).toBe(25.5);
      expect(calculateWhoMultiple(75)).toBe(5.0);
    });

    it('handles clean air below WHO threshold', () => {
      expect(calculateWhoMultiple(7.5)).toBe(0.5);
      expect(calculateWhoMultiple(3.0)).toBe(0.2);
    });

    it('handles edge cases safely: 0, negative values, NaN, and undefined', () => {
      expect(calculateWhoMultiple(0)).toBe(0.0);
      expect(calculateWhoMultiple(-15)).toBe(0.0);
      expect(calculateWhoMultiple(-500)).toBe(0.0);
      expect(calculateWhoMultiple(NaN)).toBe(0.0);
      expect(calculateWhoMultiple(undefined)).toBe(0.0);
      expect(calculateWhoMultiple(null)).toBe(0.0);
    });
  });

  describe('AQI Severity Classification & Scale Boundaries', () => {
    it('accurately classifies standard WHO/EPA index thresholds', () => {
      expect(getAqiCategory(25).label).toBe('Good');
      expect(getAqiCategory(75).label).toBe('Moderate');
      expect(getAqiCategory(125).label).toBe('Unhealthy for Sensitive Groups');
      expect(getAqiCategory(175).label).toBe('Unhealthy');
      expect(getAqiCategory(250).label).toBe('Very Unhealthy');
      expect(getAqiCategory(380).label).toContain('Hazardous');
    });

    it('handles exact threshold transition boundary values', () => {
      expect(getAqiCategory(50).label).toBe('Good');
      expect(getAqiCategory(51).label).toBe('Moderate');
      expect(getAqiCategory(100).label).toBe('Moderate');
      expect(getAqiCategory(101).label).toBe('Unhealthy for Sensitive Groups');
      expect(getAqiCategory(150).label).toBe('Unhealthy for Sensitive Groups');
      expect(getAqiCategory(151).label).toBe('Unhealthy');
      expect(getAqiCategory(200).label).toBe('Unhealthy');
      expect(getAqiCategory(201).label).toBe('Very Unhealthy');
      expect(getAqiCategory(300).label).toBe('Very Unhealthy');
      expect(getAqiCategory(301).label).toContain('Hazardous');
    });

    it('handles critical edge cases: AQI = 0, AQI = 500, extreme values, and negatives', () => {
      // AQI = 0
      expect(getAqiCategory(0).label).toBe('Good');
      expect(getAqiCategory(0).textColor).toBe('text-emerald-400');

      // AQI = 500
      expect(getAqiCategory(500).label).toContain('Hazardous');
      expect(getAqiCategory(500).color).toBe('#881337');

      // Extreme values (e.g. 999 or beyond)
      expect(getAqiCategory(999).label).toContain('Hazardous');
      expect(getAqiCategory(1200).label).toContain('Hazardous');

      // Negative values and invalid inputs
      expect(getAqiCategory(-50).label).toBe('Good');
      expect(getAqiCategory(NaN).label).toBe('Good');
      expect(getAqiCategory(undefined).label).toBe('Good');
      expect(getAqiCategory(null).label).toBe('Good');
    });
  });

  describe('Clean Air Delivery Rate (CADR) & ACH Room Turnover', () => {
    it('computes accurate minutes for 300 sq ft room with 580 CFM Corsi-Rosenthal box', () => {
      // 300 * 8.5 / 580 = 2550 / 580 = 4.39 -> rounded to 4 minutes
      const mins = calculateTurnoverMinutes(300, 580);
      expect(mins).toBe(4);
    });

    it('enforces a minimum turnover time of 3 minutes for valid rooms', () => {
      const mins = calculateTurnoverMinutes(50, 1000);
      expect(mins).toBe(3);
    });

    it('handles large halls correctly', () => {
      // 800 * 8.5 / 220 = 6800 / 220 = 30.9 -> 31 mins
      const mins = calculateTurnoverMinutes(800, 220);
      expect(mins).toBe(31);
    });

    it('calculates ACH correctly from room size and CADR', () => {
      // 300 sq ft, 580 CFM -> 4 mins turnover -> 60 / 4 = 15.0 ACH
      expect(calculateAirChangesPerHour(300, 580)).toBe(15);
      // 800 sq ft, 220 CFM -> 31 mins turnover -> 60 / 31 = 1.9 ACH
      expect(calculateAirChangesPerHour(800, 220)).toBe(1.9);
    });

    it('provides division-by-zero protection for roomSize = 0 or CADR = 0', () => {
      // roomSize = 0
      expect(calculateTurnoverMinutes(0, 550)).toBe(0);
      expect(calculateAirChangesPerHour(0, 550)).toBe(0);

      // CADR = 0
      expect(calculateTurnoverMinutes(300, 0)).toBe(0);
      expect(calculateAirChangesPerHour(300, 0)).toBe(0);

      // Both 0
      expect(calculateTurnoverMinutes(0, 0)).toBe(0);
      expect(calculateAirChangesPerHour(0, 0)).toBe(0);
    });

    it('handles negative inputs safely without NaN or infinite values', () => {
      expect(calculateTurnoverMinutes(-200, 500)).toBe(0);
      expect(calculateTurnoverMinutes(300, -500)).toBe(0);
      expect(calculateTurnoverMinutes(-100, -100)).toBe(0);
      expect(calculateAirChangesPerHour(-200, 500)).toBe(0);
      expect(calculateAirChangesPerHour(300, -500)).toBe(0);
    });
  });

  describe('CO2 and PM2.5 Savings & Negative Input Protection', () => {
    it('calculates tree equivalents and annual projections accurately', () => {
      const impact = calculatePersonalImpact({
        commuteMode: 'metro',
        baselineMode: 'solo-ice-car',
        dailyKm: 25,
        daysPerMonth: 20,
        switchedStove: true,
        avoidedBiomassBurn: true,
        diyPurifierHoursPerDay: 16
      });

      expect(impact.monthly.co2Kg).toBeGreaterThan(0);
      expect(impact.annual.co2Kg).toBeCloseTo(impact.monthly.co2Kg * 12, 1);
      expect(impact.monthly.pm25Grams).toBeGreaterThan(0);
      expect(impact.annual.pm25Grams).toBeCloseTo(impact.monthly.pm25Grams * 12, 1);
      expect(impact.equivalents.trees).toBeGreaterThan(0);
      expect(impact.equivalents.carKmAverted).toBeGreaterThan(5000);
      expect(impact.equivalents.familyAirSanctuaryScore).toBeGreaterThanOrEqual(90);
    });

    it('handles zero distance and inactive habits safely', () => {
      const impact = calculatePersonalImpact({
        commuteMode: 'metro',
        baselineMode: 'solo-ice-car',
        dailyKm: 0,
        daysPerMonth: 0,
        switchedStove: false,
        avoidedBiomassBurn: false,
        diyPurifierHoursPerDay: 0
      });

      expect(impact.monthly.co2Kg).toBe(0);
      expect(impact.monthly.pm25Grams).toBe(0);
      expect(impact.annual.co2Kg).toBe(0);
      expect(impact.annual.pm25Grams).toBe(0);
    });

    it('protects against negative inputs (negative dailyKm, negative days, negative purifier hours)', () => {
      const impact = calculatePersonalImpact({
        commuteMode: 'metro',
        baselineMode: 'solo-ice-car',
        dailyKm: -50,
        daysPerMonth: -20,
        switchedStove: false,
        avoidedBiomassBurn: false,
        diyPurifierHoursPerDay: -12
      });

      expect(impact.monthly.co2Kg).toBe(0);
      expect(impact.monthly.pm25Grams).toBe(0);
      expect(impact.equivalents.familyAirSanctuaryScore).toBeGreaterThanOrEqual(50);
    });

    it('falls back safely for unrecognized commute modes', () => {
      const impact = calculatePersonalImpact({
        commuteMode: 'unknown-teleporter',
        baselineMode: 'unknown-flying-car',
        dailyKm: 20,
        daysPerMonth: 22
      });

      expect(impact.monthly.co2Kg).toBeGreaterThanOrEqual(0);
      expect(impact.directImpactExplanation).toBeDefined();
    });
  });

  describe('Safe Airing Window Countdown & Edge Cases', () => {
    it('returns active status during afternoon solar window (13:00 to 15:30)', () => {
      // 13:00 start
      expect(calculateAiringCountdown(new Date(2026, 0, 1, 13, 0)).isNow).toBe(true);
      // 14:15 middle
      expect(calculateAiringCountdown(new Date(2026, 0, 1, 14, 15)).isNow).toBe(true);
      // 15:30 end
      expect(calculateAiringCountdown(new Date(2026, 0, 1, 15, 30)).isNow).toBe(true);
    });

    it('calculates countdown hours and minutes before window opens in morning', () => {
      const morning = new Date(2026, 0, 1, 10, 15);
      const result = calculateAiringCountdown(morning);
      expect(result.isNow).toBe(false);
      expect(result.text).toBe('Opens in 2h 45m');
      expect(result.hoursUntil).toBe(2);
      expect(result.minsUntil).toBe(45);
    });

    it('handles exact minute right after window closes (15:31)', () => {
      const justAfter = new Date(2026, 0, 1, 15, 31);
      const result = calculateAiringCountdown(justAfter);
      expect(result.isNow).toBe(false);
      expect(result.hoursUntil).toBe(21);
      expect(result.minsUntil).toBe(29);
      expect(result.text).toBe('Opens in 21h 29m');
    });

    it('handles midnight rollover (00:00) smoothly', () => {
      const midnight = new Date(2026, 0, 1, 0, 0);
      const result = calculateAiringCountdown(midnight);
      expect(result.isNow).toBe(false);
      expect(result.hoursUntil).toBe(13);
      expect(result.minsUntil).toBe(0);
      expect(result.text).toBe('Opens in 13h 0m');
    });

    it('handles evening hours by counting into next solar cycle', () => {
      const evening = new Date(2026, 0, 1, 18, 0);
      const result = calculateAiringCountdown(evening);
      expect(result.isNow).toBe(false);
      expect(result.hoursUntil).toBe(19);
      expect(result.text).toBe('Opens in 19h 0m');
    });
  });

  describe('Thermal Inversion Stagnation Physics', () => {
    it('identifies critical inversion with cold surface, calm wind, and high humidity', () => {
      const danger = calculateInversionDanger({ temp: 8, windSpeed: 2, humidity: 92 });
      expect(danger.level).toBe('Critical Trap');
      expect(danger.color).toBe('rose');
    });

    it('identifies high inversion under intermediate boundary layer conditions', () => {
      const danger = calculateInversionDanger({ temp: 13, windSpeed: 4, humidity: 75 });
      expect(danger.level).toBe('High Inversion');
      expect(danger.color).toBe('amber');
    });

    it('identifies low inversion when convective dispersion is active', () => {
      const danger = calculateInversionDanger({ temp: 24, windSpeed: 18, humidity: 45 });
      expect(danger.level).toBe('Low Inversion');
      expect(danger.color).toBe('emerald');
    });

    it('handles sub-zero winter temperatures with calm winds', () => {
      const extreme = calculateInversionDanger({ temp: -4, windSpeed: 1.0, humidity: 90 });
      expect(extreme.level).toBe('Critical Trap');
      expect(extreme.color).toBe('rose');
    });
  });

});
