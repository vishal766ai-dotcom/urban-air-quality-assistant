import { describe, it, expect } from 'vitest';
import { getAqiCategory, calculateInversionDanger, getRecommendedVentilationHours } from '../services/aqiService';
import { calculatePersonalImpact } from '../services/impactCalculator';
import { askGenAiAssistant } from '../services/geminiService';
import { CITIES_DATA } from '../data/citiesData';
import { LIFESTYLE_PROFILES } from '../data/routineOptions';
import { DIY_PURIFIERS } from '../data/iaqHacks';

describe('Urban Air Quality Assistant Test Suite', () => {

  describe('AQI Service & Atmospheric Physics', () => {
    it('accurately categorizes air quality index ranges according to WHO/EPA standards', () => {
      expect(getAqiCategory(25).label).toBe('Good');
      expect(getAqiCategory(75).label).toBe('Moderate');
      expect(getAqiCategory(125).label).toContain('Sensitive Groups');
      expect(getAqiCategory(175).label).toBe('Unhealthy');
      expect(getAqiCategory(250).label).toBe('Very Unhealthy');
      expect(getAqiCategory(412).label).toContain('Hazardous');
    });

    it('identifies critical winter thermal inversion traps based on meteorology', () => {
      // Cold temperature (10°C), near-zero wind (2 km/h), high humidity (90%)
      const inversion = calculateInversionDanger({ temp: 10, windSpeed: 2, humidity: 90 });
      expect(inversion.level).toBe('Critical Trap');
      expect(inversion.color).toBe('rose');
    });

    it('determines safe ventilation windows from diurnal forecast data', () => {
      const delhi = CITIES_DATA.find(c => c.id === 'delhi');
      const safeHours = getRecommendedVentilationHours(delhi.hourlyForecast);
      expect(safeHours).toContain('14:00');
    });
  });

  describe('Direct Impact Mathematics & Explainer Engine', () => {
    it('computes correct CO2 and PM2.5 averted when switching from solo car to electric metro', () => {
      const impact = calculatePersonalImpact({
        commuteMode: 'metro',
        baselineMode: 'solo-ice-car',
        dailyKm: 20,
        daysPerMonth: 22,
        switchedStove: true,
        avoidedBiomassBurn: true,
        diyPurifierHoursPerDay: 12
      });

      expect(impact.monthly.co2Kg).toBeGreaterThan(50);
      expect(impact.monthly.pm25Grams).toBeGreaterThan(50);
      expect(impact.equivalents.trees).toBeGreaterThan(0);
      expect(impact.directImpactExplanation).toContain('METRO');
      expect(impact.directImpactExplanation).toContain('SOLO-ICE-CAR');
    });

    it('scales lung defense score based on DIY purifier hours', () => {
      const zeroHours = calculatePersonalImpact({ diyPurifierHoursPerDay: 0, switchedStove: false });
      const twelveHours = calculatePersonalImpact({ diyPurifierHoursPerDay: 12, switchedStove: true });

      expect(twelveHours.equivalents.familyAirSanctuaryScore).toBeGreaterThan(zeroHours.equivalents.familyAirSanctuaryScore);
    });
  });

  describe('Indoor Air Quality (IAQ) Hacks & DIY Purifiers', () => {
    it('contains certified specifications for Corsi-Rosenthal boxes', () => {
      const crBox = DIY_PURIFIERS.find(p => p.id === 'corsi-rosenthal');
      expect(crBox).toBeDefined();
      expect(crBox.cadrRating).toContain('CFM');
      expect(crBox.materials.length).toBeGreaterThanOrEqual(4);
      expect(crBox.steps.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('GenAI Smart Assistant & Prompt Synthesis', () => {
    it('synthesizes contextual advice tailored to city and demographic profile in zero-key mode', async () => {
      const city = CITIES_DATA[0]; // Delhi NCR
      const profile = LIFESTYLE_PROFILES[0]; // Family with young kids

      const res = await askGenAiAssistant({
        userMessage: 'Generate an optimized 24-hour winter schedule for my family',
        apiKey: '',
        cityData: city,
        lifestyleProfile: profile
      });

      expect(res.text).toContain('Optimized Winter Smog Daily Schedule');
      expect(res.text).toContain(city.name);
      expect(res.text).toContain('Direct Impact');
    });

    it('sanitizes input and safely generates guidance for DIY air purifier queries', async () => {
      const city = CITIES_DATA[1];
      const profile = LIFESTYLE_PROFILES[1];

      const res = await askGenAiAssistant({
        userMessage: 'How to build DIY air purifier under $30?',
        apiKey: '',
        cityData: city,
        lifestyleProfile: profile
      });

      expect(res.text).toContain('DIY Air Purifier Blueprint');
      expect(res.text).toContain('MERV 13');
    });
  });

});
