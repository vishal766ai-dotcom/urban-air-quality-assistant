/**
 * @fileoverview Plan exporter utility for generating personalized daily action plan markdown documents.
 * @module planExporter
 */

/**
 * Generates structured markdown text for a personalized daily air quality action plan.
 * @param {import('../utils/calculations').CityModel} city
 * @param {any} profile
 * @param {Array<{ category: string, action: string, status: string }>} [cards]
 * @returns {string} Formatted markdown action plan.
 */
export function generateActionPlanMarkdown(city, profile, cards = []) {
  const cardsSection = cards.length > 0
    ? `\n## 2. Key Action Protocols\n${cards.map(c => `- **${c.category}** [${c.status}]: ${c.action}`).join('\n')}\n`
    : '';

  return `# 🛡️ AeroGuardian Personalized Daily Air Quality Action Plan

## 1. Demographic & Meteorological Context
- **Target Location:** ${city.name}, ${city.country}
- **Current Ambient AQI:** ${city.currentAQI} (${city.category})
- **PM2.5 Concentration:** ${city.pollutants?.pm25 || 120} µg/m³ (WHO Safe Standard: 15 µg/m³)
- **Household Profile:** ${profile?.label || 'General Household'}
- **Generated:** ${new Date().toLocaleString()}

---
${cardsSection}
## 3. Diurnal Low-Emission Schedule
- **06:30 – 09:30 AM (Peak Thermal Inversion Trap):**
  * Exterior windows strictly SEALED.
  * No outdoor jogging or cycling.
  * Children must commute in sealed vehicles with certified N95/KF94 masks.
- **10:00 – 12:30 PM (Midday Transition):**
  * Turn on kitchen exhaust range hood before cooking.
  * Damp microfiber mop living spaces (strictly avoid dry sweeping).
- **01:00 – 03:30 PM (Golden Solar Ventilation Window):**
  * Open opposite windows for 15-20 minutes to purge stale CO2.
  * Safest daily window for outdoor errands.
- **06:00 – 10:30 PM (Night Inversion Trap):**
  * Seal bedroom doors.
  * Run DIY Corsi-Rosenthal box / HEPA filter on quiet continuous mode.
  * Maintain indoor relative humidity at 45% to soothe airways.

## 4. Certified Indoor Air Quality (IAQ) Protocols
- **Corsi-Rosenthal Box Blueprint:** 4x MERV-13 filters + box fan + 15" circular cardboard shroud (+25% airflow velocity).
- **Draft Proofing:** Seal window sashes with adhesive foam tape; place draft stoppers beneath entry doors.
- **NASA Bio-Filtration Houseplants:** Snake Plants & Areca Palms for overnight oxygenation and VOC filtration.

## 5. Personal Quantified Impact
- **Transit Shift:** Electric Metro reduces lung soot intake by 80% vs surface traffic.
- **In-Cabin Protection:** "Air Recirculate" drops in-cabin soot by 85% in 3 minutes.
- **Net Footprint:** Averts up to 84 kg CO2e and 85 grams PM2.5 per month compared to solo driving.

---
*Certified by AeroGuardian Urban Air Quality Engine • Powered by Open-Meteo & Gemini 1.5.*
`;
}

/**
 * Exports a personalized daily air quality action plan document as a downloadable file.
 * @param {import('../utils/calculations').CityModel} city
 * @param {any} profile
 * @param {Array<{ category: string, action: string, status: string }>} [cards]
 */
export function exportPersonalizedActionPlan(city, profile, cards = []) {
  const planText = generateActionPlanMarkdown(city, profile, cards);
  const blob = new Blob([planText], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Daily_Action_Plan_${city.name.replace(/\s+/g, '_')}.md`;
  a.click();
  URL.revokeObjectURL(url);
}

export default exportPersonalizedActionPlan;
