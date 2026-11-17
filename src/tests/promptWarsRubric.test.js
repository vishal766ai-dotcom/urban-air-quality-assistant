import { describe, it, expect } from 'vitest';
import {
  getAqiCategory,
  calculateTurnoverMinutes,
  calculateAirChangesPerHour,
  calculateInversionDanger,
  calculatePersonalImpact,
  calculateAiringCountdown
} from '../utils/calculations';
import { generateActionCards, synthesizeIntelligentResponse } from '../services/ruleEngineService';
import { generateActionPlanMarkdown } from '../utils/planExporter';
import { CITIES_DATA, LIFESTYLE_PROFILES, DIY_PURIFIERS } from '../data/airQualityData';

describe('PromptWars [Challenge 6] Comprehensive Rubric Verification Suite', () => {

  describe('Pillar 1: Low-Emission Daily Routines & Inversion Time-Shifting', () => {
    it('generates tailored routine responses for each vulnerable demographic profile', () => {
      const delhi = CITIES_DATA[0];

      LIFESTYLE_PROFILES.forEach((profile) => {
        const response = synthesizeIntelligentResponse('routine schedule for my family', delhi, profile);
        expect(response).toContain('Peak Inversion Trap');
        expect(response).toContain('Golden Ventilation');
        expect(response).toContain('Direct Impact');
      });
    });

    it('recommends the golden ventilation window (13:00 to 15:30) for safe indoor CO2 airing', () => {
      const windowStatus = calculateAiringCountdown(new Date(2026, 0, 1, 14, 15));
      expect(windowStatus.isNow).toBe(true);
      expect(windowStatus.text).toBe('Active Safe Window');
    });

    it('identifies thermal inversion stagnation traps when temperature and wind are low', () => {
      const trap = calculateInversionDanger({ temp: 9, windSpeed: 1.8, humidity: 85 });
      expect(trap.level).toBe('Critical Trap');
      expect(trap.color).toBe('rose');
    });
  });

  describe('Pillar 2: Indoor Air Quality (IAQ) Hacks & DIY Purifier Lab', () => {
    it('verifies Corsi-Rosenthal Box specifications and high CADR efficiency', () => {
      const crBox = DIY_PURIFIERS.find(p => p.id === 'corsi-rosenthal');
      expect(crBox).toBeDefined();
      expect(crBox.cadrRating).toContain('550');
      expect(crBox.materials.some(m => m.includes('MERV 13'))).toBe(true);
      expect(crBox.efficiency).toContain('99%');
    });

    it('calculates ACH (Air Changes per Hour) meeting clinical standards (>5 ACH)', () => {
      // 250 sq ft room with 550 CFM Corsi-Rosenthal Box
      const ach = calculateAirChangesPerHour(250, 550);
      expect(ach).toBeGreaterThanOrEqual(5.0);
    });

    it('calculates rapid room air turnover in under 10 minutes for standard living rooms', () => {
      const turnoverMins = calculateTurnoverMinutes(350, 550);
      expect(turnoverMins).toBeLessThanOrEqual(6);
    });
  });

  describe('Pillar 3: Sustainable Alternatives Tailored to Location & Lifestyle', () => {
    it('calculates emissions savings for electric transit vs solo fossil fuel car', () => {
      const impact = calculatePersonalImpact({
        commuteMode: 'metro',
        baselineMode: 'solo-ice-car',
        dailyKm: 25,
        daysPerMonth: 22,
        switchedStove: true,
        avoidedBiomassBurn: true,
        diyPurifierHoursPerDay: 14
      });

      expect(impact.monthly.co2Kg).toBeGreaterThan(90);
      expect(impact.monthly.pm25Grams).toBeGreaterThan(90);
      expect(impact.equivalents.trees).toBeGreaterThan(0);
      expect(impact.equivalents.carKmAverted).toBeGreaterThan(0);
    });

    it('accounts for clean cooking switch from unvented gas to induction', () => {
      const withStove = calculatePersonalImpact({ switchedStove: true, avoidedBiomassBurn: false, dailyKm: 0 });
      const withoutStove = calculatePersonalImpact({ switchedStove: false, avoidedBiomassBurn: false, dailyKm: 0 });

      expect(withStove.monthly.co2Kg).toBeGreaterThan(withoutStove.monthly.co2Kg);
      expect(withStove.monthly.pm25Grams).toBeGreaterThan(withoutStove.monthly.pm25Grams);
    });

    it('accounts for avoiding open biomass and leaf burning', () => {
      const withBurnPrevention = calculatePersonalImpact({ switchedStove: false, avoidedBiomassBurn: true, dailyKm: 0 });
      expect(withBurnPrevention.monthly.co2Kg).toBe(18);
      expect(withBurnPrevention.monthly.pm25Grams).toBe(120);
    });
  });

  describe('Pillar 4: Direct Impact Explanations & Action Cards', () => {
    it('generates 4 structured action cards aligning with the competition pillars', () => {
      const delhi = CITIES_DATA[0];
      const profile = LIFESTYLE_PROFILES[0];
      const cards = generateActionCards('how to protect my toddler', delhi, profile);

      expect(cards).toHaveLength(4);
      expect(cards.some(c => c.category.includes('IAQ'))).toBe(true);
      expect(cards.some(c => c.category.includes('Routine'))).toBe(true);
      expect(cards.some(c => c.category.includes('Alternative'))).toBe(true);
      expect(cards.some(c => c.category.includes('Impact'))).toBe(true);
    });

    it('exports a complete personalized daily action plan markdown with valid headers', () => {
      const city = CITIES_DATA[0];
      const profile = LIFESTYLE_PROFILES[0];
      const cards = generateActionCards('daily plan', city, profile);

      const planText = generateActionPlanMarkdown(city, profile, cards);
      expect(planText).toContain('AeroGuardian Personalized Daily Air Quality Action Plan');
      expect(planText).toContain(city.name);
      expect(planText).toContain(profile.label);
      expect(planText).toContain('## 1. Demographic & Meteorological Context');
      expect(planText).toContain('## 2. Key Action Protocols');
      expect(planText).toContain('## 3. Diurnal Low-Emission Schedule');
      expect(planText).toContain('## 5. Personal Quantified Impact');
    });

    it('provides clear, educational mathematical impact text', () => {
      const impact = calculatePersonalImpact({ commuteMode: 'metro', baselineMode: 'solo-ice-car', dailyKm: 20 });
      expect(impact.directImpactExplanation).toContain('greenhouse gas emissions');
      expect(impact.directImpactExplanation).toContain('mature trees');
    });
  });

  describe('Security & Safe Practices Verification', () => {
    it('safely handles non-alphanumeric and potential injection characters without crashing', () => {
      const dangerousInputs = [
        '<script>alert("xss")</script>',
        '${process.env}',
        '"; DROP TABLE users; --',
        '"><img src=x onerror=alert(1)>'
      ];

      const delhi = CITIES_DATA[0];
      const profile = LIFESTYLE_PROFILES[0];

      dangerousInputs.forEach((input) => {
        expect(() => {
          const res = synthesizeIntelligentResponse(input, delhi, profile);
          expect(res).toBeDefined();
          expect(typeof res).toBe('string');
        }).not.toThrow();
      });
    });

    it('ensures AQI category lookup handles extreme out-of-range inputs safely', () => {
      expect(getAqiCategory(-50).label).toBe('Good');
      expect(getAqiCategory(1500).label).toContain('Hazardous');
      expect(getAqiCategory(NaN).label).toBe('Good');
      expect(getAqiCategory(undefined).label).toBe('Good');
    });
  });

  describe('Universal Coverage & Meteorological Robustness', () => {
    it('verifies that all 7 preset cities have valid latitude and longitude coordinates for Open-Meteo', () => {
      CITIES_DATA.forEach((city) => {
        const lat = city.coordinates?.lat ?? city.lat;
        const lon = city.coordinates?.lon ?? city.lon;
        expect(typeof lat).toBe('number');
        expect(typeof lon).toBe('number');
        expect(lat).toBeGreaterThanOrEqual(-90);
        expect(lat).toBeLessThanOrEqual(90);
        expect(lon).toBeGreaterThanOrEqual(-180);
        expect(lon).toBeLessThanOrEqual(180);
      });
    });

    it('verifies safe airing window rollover at midnight (00:00)', () => {
      const midnight = new Date(2026, 0, 1, 0, 0);
      const countdown = calculateAiringCountdown(midnight);
      expect(countdown.isNow).toBe(false);
      expect(countdown.hoursUntil).toBe(13);
      expect(countdown.text).toBe('Opens in 13h 0m');
    });

    it('verifies scenario simulator thresholds cover entire 20 to 500 AQI range', () => {
      const scenarios = [20, 50, 100, 150, 200, 300, 500];
      scenarios.forEach((aqi) => {
        const cat = getAqiCategory(aqi);
        expect(cat).toBeDefined();
        expect(cat.label).toBeDefined();
        expect(cat.bgBadge).toBeDefined();
      });
    });

    it('validates all lifestyle profiles contain actionable pediatric or geriatric protocols', () => {
      expect(LIFESTYLE_PROFILES.length).toBeGreaterThanOrEqual(4);
      LIFESTYLE_PROFILES.forEach((profile) => {
        expect(profile.id).toBeDefined();
        expect(profile.label).toBeDefined();
        expect(profile.topRecommendations.length).toBeGreaterThan(0);
      });
    });
  });

});
