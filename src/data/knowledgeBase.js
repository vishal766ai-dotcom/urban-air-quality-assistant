export const SMOG_KNOWLEDGE_TOPICS = {
  inversion: {
    title: 'Why Winter Smog is So Dangerous (Thermal Inversion)',
    explanation: 'Normally, warm air near the ground rises into the colder atmosphere, carrying pollutants away (convective dispersion). In winter, radiation cooling during calm clear nights chills the ground rapidly. A layer of warmer air forms above the cold ground layer, creating an atmospheric "lid" or cap called a Thermal Inversion. This traps vehicle exhaust, biomass smoke, dust, and industrial sulfur dioxide within just 100-200 meters of the surface, causing particulate concentrations to spike 10x-20x higher than summer levels.',
    keyRules: [
      'Morning hours (6:00 - 9:30 AM) have the lowest boundary layer and peak inversion trap.',
      'Sunlight breaks the inversion around midday (1:00 - 3:30 PM), making afternoon the safest time for essential errands or brief home ventilation.',
      'Evening cools down rapidly after 7:00 PM, re-trapping emissions overnight.'
    ]
  },
  masks: {
    title: 'Mask Filtration Efficacy (N95 vs Surgical vs Cloth)',
    explanation: 'PM2.5 particles are 30 times smaller than a human hair and enter deep into lung alveoli and the bloodstream. Cloth bandanas and standard blue surgical masks only filter 10-30% of PM2.5 because they lack electrostatic melt-blown filtration layers and have large side leaks. Certified N95, KN95, or FFP2 respirators filter at least 95% of airborne particles down to 0.3 microns when fitted snugly with an airtight nose bridge seal.',
    tips: [
      'Look for NIOSH N95, EN 149 FFP2, or GB2626 KN95 certification.',
      'Perform a seal check: Inhale sharply; the mask should collapse slightly inwards without air hissing past your cheeks or eyes.',
      'Cloth masks do not protect lungs against winter toxic smog.'
    ]
  },
  pediatric: {
    title: 'Protecting Children & Babies',
    explanation: 'Children breathe twice as much air per pound of body weight than adults and their immune and respiratory systems are still developing. Prolonged PM2.5 exposure reduces adult lung capacity by 10-20% and triggers pediatric asthma.',
    tips: [
      'Never take babies in open strollers along main roadways during morning rush hour (strollers sit directly at exhaust pipe height!).',
      'Use certified pediatric masks with adjustable ear loops for kids over 2 years old.',
      'Turn the child’s bedroom into a clean air sanctuary with continuous filtration.'
    ]
  },
  nutrition: {
    title: 'Dietary Defense against Toxic Air',
    explanation: 'Inhaled particulate matter generates intense oxidative stress and systemic inflammation. Nutritional science demonstrates that antioxidants protect cellular lung lining and reduce systemic vascular strain.',
    tips: [
      'Vitamin C (Amla/Indian gooseberry, citrus, bell peppers) restores alveolar fluid antioxidants.',
      'Curcumin / Turmeric with warm milk or black pepper acts as a potent anti-inflammatory agent for bronchial passages.',
      'Jaggery (traditional unrefined cane sugar) has been demonstrated in respiratory workers to facilitate dust expulsion from the upper pharynx.',
      'Omega-3 fatty acids (flaxseeds, walnuts, chia seeds, fish oil) counter cardiovascular inflammation from PM2.5.'
    ]
  },
  diyCorsi: {
    title: 'Corsi-Rosenthal Box Performance & Physics',
    explanation: 'Invented by Dr. Richard Corsi and Jim Rosenthal, this open-source design uses 4 MERV-13 pleated HVAC filters assembled in a cube with a standard 20-inch box fan pulling air through the filters and exhausting upward. Because 4 filters provide 16 to 20 square feet of surface area, air resistance (pressure drop) is tiny. This allows the fan to deliver over 500-600 CFM of purified air — outperforming commercial $600 HEPA units at a fraction of the initial and filter replacement cost.',
    tips: [
      'Always install a cardboard circular shroud on the fan face: it stops air from recirculating backwards at the blade tips, boosting CADR by ~25%.',
      'Filters last 6 months even in heavy winter smog because the massive surface area distributes the dust loading.'
    ]
  }
};

export const SMART_PROMPT_SUGGESTIONS = [
  {
    icon: 'Calendar',
    label: '24-Hour Smog-Safe Schedule',
    prompt: 'Generate an optimized 24-hour winter daily schedule for my family to avoid peak smog inversion hours and minimize exposure.'
  },
  {
    icon: 'Hammer',
    label: 'Build DIY Air Purifier (<₹4,500)',
    prompt: 'Give me exact step-by-step instructions to build a high-performance DIY air purifier under ₹4,500 using a regular fan and filter.'
  },
  {
    icon: 'Baby',
    label: 'Child & Baby Smog Shield',
    prompt: 'What are the top 5 medical & lifestyle rules to protect young children and toddlers during severe hazardous winter smog?'
  },
  {
    icon: 'Salad',
    label: 'Dietary Lung Protection Protocol',
    prompt: 'What foods, drinks, and antioxidant supplements scientifically reduce lung inflammation and oxidative stress from PM2.5?'
  },
  {
    icon: 'Car',
    label: 'Commute & Travel Exposure Hacks',
    prompt: 'How can I reduce toxic particulate inhalation by 80% during my daily work commute without quitting my job?'
  }
];
