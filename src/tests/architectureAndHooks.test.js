import { describe, it, expect } from 'vitest';
import {
  calculateWhoMultiple,
  calculateAirChangesPerHour,
  calculateTurnoverMinutes,
  calculatePersonalImpact,
  calculateAiringCountdown
} from '../utils/calculations';
import {
  generateActionPlanMarkdown
} from '../utils/planExporter';
import { runAutomatedDiagnostics } from '../services/testRunnerService';
import { CITIES_DATA, LIFESTYLE_PROFILES, DIY_PURIFIERS } from '../data/airQualityData';
import { synthesizeIntelligentResponse, generateActionCards } from '../services/ruleEngineService';

describe('Architecture & Unit Test Expansion (100% Quality & Testing Target)', () => {
  describe('Mathematical Boundary Robustness', () => {
    it('handles negative and non-numeric WHO multiples gracefully', () => {
      expect(calculateWhoMultiple(0)).toBe(0);
      expect(calculateWhoMultiple(-15)).toBe(0);
      expect(calculateWhoMultiple(null)).toBe(0);
      expect(calculateWhoMultiple(undefined)).toBe(0);
      expect(calculateWhoMultiple(NaN)).toBe(0);
    });

    it('ensures room turnover minutes handles zero and negative room size safely', () => {
      expect(calculateTurnoverMinutes(0, 550)).toBe(0);
      expect(calculateTurnoverMinutes(-100, 550)).toBe(0);
      expect(calculateTurnoverMinutes(300, 0)).toBe(0);
      expect(calculateTurnoverMinutes(300, -50)).toBe(0);
    });

    it('ensures ACH calculations do not crash on edge inputs', () => {
      expect(calculateAirChangesPerHour(0, 500)).toBe(0);
      expect(calculateAirChangesPerHour(250, 0)).toBe(0);
      expect(calculateAirChangesPerHour(-250, 500)).toBe(0);
      expect(calculateAirChangesPerHour(250, -500)).toBe(0);
    });

    it('correctly calculates personal impact with maximum commuting inputs', () => {
      const maxImpact = calculatePersonalImpact({
        commuteMode: 'metro',
        baselineMode: 'solo-ice-car',
        dailyKm: 60,
        daysPerMonth: 30,
        switchedStove: true,
        avoidedBiomassBurn: true,
        diyPurifierHoursPerDay: 24
      });

      expect(maxImpact.monthly.co2Kg).toBeGreaterThan(200);
      expect(maxImpact.annual.co2Kg).toBeGreaterThan(2500);
      expect(maxImpact.equivalents.trees).toBeGreaterThan(10);
      expect(maxImpact.equivalents.familyAirSanctuaryScore).toBeGreaterThanOrEqual(90);
    });

    it('correctly calculates safe airing countdown around the 13:00 to 15:30 window', () => {
      // 12:59 PM (1 minute before opening)
      const beforeOpen = new Date(2026, 0, 1, 12, 59);
      const resBefore = calculateAiringCountdown(beforeOpen);
      expect(resBefore.isNow).toBe(false);
      expect(resBefore.minsUntil).toBe(1);

      // 13:01 PM (inside opening window)
      const during = new Date(2026, 0, 1, 13, 1);
      const resDuring = calculateAiringCountdown(during);
      expect(resDuring.isNow).toBe(true);
      expect(resDuring.text).toBe('Active Safe Window');

      // 15:31 PM (window just closed, next is tomorrow)
      const afterClose = new Date(2026, 0, 1, 15, 31);
      const resAfter = calculateAiringCountdown(afterClose);
      expect(resAfter.isNow).toBe(false);
      expect(resAfter.hoursUntil).toBe(21);
    });
  });

  describe('Automated Diagnostics Test Runner Service', () => {
    it('executes in-app automated self-diagnostics and reports 100% passing tests', async () => {
      const diag = await runAutomatedDiagnostics();
      expect(diag.summary.total).toBe(9);
      expect(diag.summary.passed).toBe(9);
      expect(diag.summary.score).toBe(100);
      expect(diag.results.length).toBe(9);
    });
  });

  describe('Dataset Integrity & Localization', () => {
    it('confirms all cities have localized currency symbol and valid coordinates', () => {
      CITIES_DATA.forEach((c) => {
        expect(c.currency).toBeDefined();
        expect(typeof c.currency.symbol).toBe('string');
        expect(c.coordinates.lat).toBeTypeOf('number');
        expect(c.coordinates.lon).toBeTypeOf('number');
        expect(c.sources.length).toBeGreaterThan(0);
      });
    });

    it('verifies Corsi-Rosenthal specifications have authentic Indian localization', () => {
      const cr = DIY_PURIFIERS.find(p => p.id === 'corsi-rosenthal');
      expect(cr.pricing.INR.cost).toContain('₹');
      expect(cr.materials.length).toBeGreaterThanOrEqual(4);
    });

    it('validates action card synthesis for high AQI vs low AQI', () => {
      const highAqiCity = { ...CITIES_DATA[0], currentAQI: 350 };
      const lowAqiCity = { ...CITIES_DATA[0], currentAQI: 40 };
      const profile = LIFESTYLE_PROFILES[0];

      const highCards = generateActionCards('action plan', highAqiCity, profile);
      const lowCards = generateActionCards('action plan', lowAqiCity, profile);

      expect(highCards.find(c => c.category.includes('IAQ'))?.status).toBe('Critical');
      expect(lowCards.find(c => c.category.includes('IAQ'))?.status).toBe('Safe Window');
    });

    it('verifies rule engine response synthesis contains medical and atmospheric guidance', () => {
      const city = CITIES_DATA[0];
      const elderlyProfile = LIFESTYLE_PROFILES.find(p => p.id === 'elderly-respiratory');
      const response = synthesizeIntelligentResponse('how to avoid morning attacks', city, elderlyProfile);

      expect(response).toContain('thermal inversion');
      expect(response).toContain('Corsi-Rosenthal');
      expect(response).toContain('Elderly');

      const scheduleResponse = synthesizeIntelligentResponse('routine schedule for my day', city, elderlyProfile);
      expect(scheduleResponse).toContain('Peak Inversion Trap');
      expect(scheduleResponse).toContain('Golden Ventilation');
    });

    it('generates valid markdown action plan structure with empty or populated action cards', () => {
      const city = CITIES_DATA[0];
      const profile = LIFESTYLE_PROFILES[0];
      const emptyPlan = generateActionPlanMarkdown(city, profile, []);
      expect(emptyPlan).toContain('AeroGuardian');
      expect(emptyPlan).not.toContain('## 2. Key Action Protocols');

      const fullPlan = generateActionPlanMarkdown(city, profile, [
        { category: 'IAQ', status: 'CRITICAL', action: 'Seal door sashes' }
      ]);
      expect(fullPlan).toContain('## 2. Key Action Protocols');
      expect(fullPlan).toContain('Seal door sashes');
    });
  });
});
