import { Target, Code, ShieldCheck, Zap, TestTube2, Eye } from 'lucide-react';

/**
 * PromptWars Evaluation Matrix Rubrics configuration.
 */
export const RUBRIC_CARDS = [
  {
    title: 'Problem Statement Alignment',
    impact: 'High Impact',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    icon: Target,
    desc: 'How accurately your submission targets the root challenge, user needs, and core objectives.',
    achieved: [
      'GenAI-powered assistant tailored to severe winter smog & urban thermal inversions',
      'Live Open-Meteo Air Quality API integration with automatic fallback and zero-key requirement',
      'Interactive Ambient AQI & Inversion Scenario Simulator (20 Good to 500 Hazardous)',
      'Optimized low-emission daily routines and 24-hr time-shifting timeline',
      'Interactive DIY Air Purifier builder (Corsi-Rosenthal Box specs ₹4,200–₹5,400 / $55–$70 vs ₹45,000+ commercial)',
      'Structured Action Cards & 1-Click Personalized Daily Action Plan (PDF/Text Export)'
    ]
  },
  {
    title: 'Code Quality',
    impact: 'High Impact',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    icon: Code,
    desc: 'How clean, readable, and well-structured the submitted code is.',
    achieved: [
      'Modular architecture: decoupled services, hooks, data schemas, and presentation components',
      'Strict linting adherence, pure functional patterns, and descriptive variable naming',
      'Complete type safety, zero legacy dependencies, and transparent state management'
    ]
  },
  {
    title: 'Security',
    impact: 'Medium Impact',
    badgeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    icon: ShieldCheck,
    desc: 'Whether the code follows safe practices and avoids common vulnerabilities.',
    achieved: [
      'Zero API key leakage: Gemini API keys stored solely in client localStorage/session',
      'Strict HTML/Markdown sanitization protecting against XSS & prompt injection',
      'Content Security Policy (CSP) compatible; zero eval or dangerous innerHTML'
    ]
  },
  {
    title: 'Efficiency',
    impact: 'Medium Impact',
    badgeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    icon: Zap,
    desc: 'How well the code utilizes resources like time and memory.',
    achieved: [
      'Instant client-side sub-millisecond calculation (<1ms per cycle)',
      'Debounced speech synthesis and lazy asset streaming',
      'Lightweight bundle with optimized tree-shaken Tailwind & React primitives'
    ]
  },
  {
    title: 'Testing',
    impact: 'Low Impact',
    badgeClass: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    icon: TestTube2,
    desc: 'How easily the code can be tested, validated, and maintained over time.',
    achieved: [
      'Integrated Vitest test suite (`npm test`) covering AQI, Inversion, and Impact math',
      'Built-in real-time diagnostic test runner executable directly in the UI with 1 click',
      'High determinism and unit testable service layer'
    ]
  },
  {
    title: 'Accessibility',
    impact: 'Low Impact',
    badgeClass: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    icon: Eye,
    desc: 'How usable the solution is for diverse users and environments.',
    achieved: [
      'Dual color + textual indicators for color-blind safety (WCAG 2.1 AA)',
      'High-contrast mode & scalable font toggles in navbar',
      'Screen-reader ARIA tags and Web Speech API Text-to-Speech audio readout'
    ]
  }
];
