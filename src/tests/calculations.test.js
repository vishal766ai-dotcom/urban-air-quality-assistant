import { describe, it, expect } from 'vitest';
import {
  getAqiCategory,
  calculateTurnoverMinutes,
  calculateAirChangesPerHour,
  calculateInversionDanger,
  calculatePersonalImpact,
  calculateAiringCountdown
} from '../utils/calculations';

describe('Pure Calculation Functions Unit Tests', () => {

  describe('calculateTurnoverMinutes', () => {
    it('computes accurate minutes for 300 sq ft room with 580 CFM Corsi-Rosenthal box', () => {
      // 300 * 8.5 / 580 = 2550 / 580 = 4.39 -> rounded to 4 minutes
      const mins = calculateTurnoverMinutes(300, 580);
      expect(mins).toBe(4);
    });

    it('enforces a minimum turnover time of 3 minutes', () => {
      const mins = calculateTurnoverMinutes(50, 1000);
      expect(mins).toBe(3);
    });

    it('handles large halls correctly', () => {
      // 800 * 8.5 / 220 = 6800 / 220 = 30.9 -> 31 mins
      const mins = calculateTurnoverMinutes(800, 220);
      expect(mins).toBe(31);
    });
  });

  describe('calculateAirChangesPerHour', () => {
    it('calculates ACH correctly from room size and CADR', () => {
      // 300 sq ft, 580 CFM -> 4 mins turnover -> 60 / 4 = 15.0 ACH
      expect(calculateAirChangesPerHour(300, 580)).toBe(15);
      // 800 sq ft, 220 CFM -> 31 mins turnover -> 60 / 31 = 1.9 ACH
      expect(calculateAirChangesPerHour(800, 220)).toBe(1.9);
    });
  });

  describe('calculateAiringCountdown', () => {
    it('returns active status during afternoon solar window (13:00 to 15:30)', () => {
      const afternoon = new Date(2026, 0, 1, 14, 0);
      const result = calculateAiringCountdown(afternoon);
      expect(result.isNow).toBe(true);
      expect(result.text).toBe('Active Safe Window');
    });

    it('calculates countdown hours and minutes before window opens', () => {
      const morning = new Date(2026, 0, 1, 10, 15);
      const result = calculateAiringCountdown(morning);
      expect(result.isNow).toBe(false);
      expect(result.text).toBe('Opens in 2h 45m');
    });

    it('handles night hours past window by counting into next day', () => {
      const evening = new Date(2026, 0, 1, 16, 0);
      const result = calculateAiringCountdown(evening);
      expect(result.isNow).toBe(false);
      expect(result.text).toBe('Opens in 21h 0m');
    });
  });

  describe('calculateInversionDanger', () => {
    it('identifies critical inversion with cold surface, low wind, and high humidity', () => {
      const danger = calculateInversionDanger({ temp: 8, windSpeed: 2, humidity: 92 });
      expect(danger.level).toBe('Critical Trap');
      expect(danger.color).toBe('rose');
    });

    it('identifies high inversion under intermediate conditions', () => {
      const danger = calculateInversionDanger({ temp: 13, windSpeed: 4, humidity: 75 });
      expect(danger.level).toBe('High Inversion');
      expect(danger.color).toBe('amber');
    });

    it('identifies low inversion when dispersion is active', () => {
      const danger = calculateInversionDanger({ temp: 24, windSpeed: 18, humidity: 45 });
      expect(danger.level).toBe('Low Inversion');
      expect(danger.color).toBe('emerald');
    });
  });

  describe('calculatePersonalImpact Math Rigor', () => {
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
  });

  describe('getAqiCategory Scale Correctness', () => {
    it('accurately looks up categories and thresholds', () => {
      expect(getAqiCategory(10).label).toBe('Good');
      expect(getAqiCategory(80).label).toBe('Moderate');
      expect(getAqiCategory(130).label).toBe('Unhealthy for Sensitive Groups');
      expect(getAqiCategory(180).label).toBe('Unhealthy');
      expect(getAqiCategory(260).label).toBe('Very Unhealthy');
      expect(getAqiCategory(350).label).toContain('Hazardous');
    });
  });

});
