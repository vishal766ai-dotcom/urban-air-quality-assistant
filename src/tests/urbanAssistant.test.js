import { describe, it, expect } from 'vitest';
import { getAqiCategory, calculateInversionDanger, getRecommendedVentilationHours } from '../services/aqiService';
import { calculatePersonalImpact } from '../services/impactCalculator';
import { askGenAiAssistant } from '../services/geminiService';
import { CITIES_DATA, createCustomCity } from '../data/citiesData';
import { LIFESTYLE_PROFILES } from '../data/routineOptions';
import { DIY_PURIFIERS, getPurifierLocalizedData } from '../data/iaqHacks';

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

    it('handles boundary conditions: AQI = 0 and AQI > 500', () => {
      expect(getAqiCategory(0).label).toBe('Good');
      expect(getAqiCategory(500).label).toContain('Hazardous');
      expect(getAqiCategory(999).label).toContain('Hazardous');
    });

    it('identifies critical winter thermal inversion traps based on meteorology', () => {
      // Cold temperature (10°C), near-zero wind (2 km/h), high humidity (90%)
      const inversion = calculateInversionDanger({ temp: 10, windSpeed: 2, humidity: 90 });
      expect(inversion.level).toBe('Critical Trap');
      expect(inversion.color).toBe('rose');
    });

    it('identifies low inversion when wind is high and weather is warm', () => {
      const activeDispersion = calculateInversionDanger({ temp: 25, windSpeed: 14, humidity: 40 });
      expect(activeDispersion.level).toBe('Low Inversion');
      expect(activeDispersion.color).toBe('emerald');
    });

    it('determines safe ventilation windows from diurnal forecast data', () => {
      const delhi = CITIES_DATA.find(c => c.id === 'delhi');
      const safeHours = getRecommendedVentilationHours(delhi.hourlyForecast);
      expect(safeHours).toContain('14:00');
    });

    it('generates a complete custom city model with inversion and hourly forecast', () => {
      const custom = createCustomCity({
        name: 'Sector 56 Gurugram',
        country: 'India',
        aqi: 320,
        currencyCode: 'INR'
      });
      expect(custom.name).toBe('Sector 56 Gurugram');
      expect(custom.currentAQI).toBe(320);
      expect(custom.currency.code).toBe('INR');
      expect(custom.hourlyForecast.length).toBeGreaterThanOrEqual(7);
      expect(custom.category).toContain('Hazardous');
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

    it('handles zero-distance commute without negative savings', () => {
      const zeroKm = calculatePersonalImpact({
        commuteMode: 'metro',
        baselineMode: 'solo-ice-car',
        dailyKm: 0,
        daysPerMonth: 0,
        switchedStove: false,
        avoidedBiomassBurn: false
      });
      expect(zeroKm.monthly.co2Kg).toBe(0);
      expect(zeroKm.monthly.pm25Grams).toBe(0);
    });

    it('scales lung defense score based on DIY purifier hours', () => {
      const zeroHours = calculatePersonalImpact({ diyPurifierHoursPerDay: 0, switchedStove: false });
      const twelveHours = calculatePersonalImpact({ diyPurifierHoursPerDay: 12, switchedStove: true });

      expect(twelveHours.equivalents.familyAirSanctuaryScore).toBeGreaterThan(zeroHours.equivalents.familyAirSanctuaryScore);
    });
  });

  describe('Indoor Air Quality (IAQ) Hacks & Localization', () => {
    it('contains certified specifications for Corsi-Rosenthal boxes', () => {
      const crBox = DIY_PURIFIERS.find(p => p.id === 'corsi-rosenthal');
      expect(crBox).toBeDefined();
      expect(crBox.cadrRating).toContain('CFM');
      expect(crBox.materials.length).toBeGreaterThanOrEqual(4);
      expect(crBox.steps.length).toBeGreaterThanOrEqual(5);
    });

    it('contains acoustic hum in dB across all purifier designs', () => {
      DIY_PURIFIERS.forEach(purifier => {
        expect(purifier.soundLevel).toContain('dB');
      });
    });

    it('dynamically localizes pricing into INR for Indian cities', () => {
      const crBox = DIY_PURIFIERS[0];
      const localized = getPurifierLocalizedData(crBox, 'INR');
      expect(localized.cost).toContain('₹');
      expect(localized.commercialEquivCost).toContain('₹');
    });

    it('dynamically localizes pricing into USD for North American cities', () => {
      const crBox = DIY_PURIFIERS[0];
      const localized = getPurifierLocalizedData(crBox, 'USD');
      expect(localized.cost).toContain('$');
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

    it('synthesizes pediatric rules tailored to children and infant vulnerabilities', async () => {
      const city = CITIES_DATA[0];
      const profile = LIFESTYLE_PROFILES[0];

      const res = await askGenAiAssistant({
        userMessage: 'How to protect newborn baby and toddlers from winter smog?',
        apiKey: '',
        cityData: city,
        lifestyleProfile: profile
      });

      expect(res.text).toContain('Pediatric Winter Smog Shield');
      expect(res.text).toContain('Stroller');
    });

    it('synthesizes dietary and nutritional antioxidant protocols', async () => {
      const city = CITIES_DATA[0];
      const profile = LIFESTYLE_PROFILES[0];

      const res = await askGenAiAssistant({
        userMessage: 'What antioxidant diet or drinks protect lungs from PM2.5?',
        apiKey: '',
        cityData: city,
        lifestyleProfile: profile
      });

      expect(res.text).toContain('Nutritional Defense Protocol');
      expect(res.text).toContain('Curcumin');
      expect(res.text).toContain('Vitamin C');
    });

    it('sanitizes input and safely generates guidance for DIY air purifier queries with INR pricing', async () => {
      const city = CITIES_DATA[0]; // Delhi NCR
      const profile = LIFESTYLE_PROFILES[0];

      const res = await askGenAiAssistant({
        userMessage: '<script>alert("xss")</script>How to build DIY air purifier under ₹4,500?',
        apiKey: '',
        cityData: city,
        lifestyleProfile: profile
      });

      expect(res.text).toContain('DIY Air Purifier Blueprint');
      expect(res.text).not.toContain('<script>');
      expect(res.text).toContain('₹');
    });
  });

});
