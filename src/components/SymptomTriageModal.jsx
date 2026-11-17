import React, { useState } from 'react';
import { HeartPulse, X, AlertTriangle, ShieldCheck } from 'lucide-react';

export function SymptomTriageModal({ isOpen, onClose, city, profile }) {
  const [selectedSymptoms, setSelectedSymptoms] = useState({
    throat: true,
    eyes: false,
    cough: false,
    wheeze: false,
    breathless: false
  });

  if (!isOpen) return null;

  const toggleSymptom = (key) => {
    setSelectedSymptoms(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isCritical = selectedSymptoms.breathless || selectedSymptoms.wheeze;
  const isModerate = selectedSymptoms.cough;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative text-slate-200">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 text-white shadow-md shadow-rose-500/20">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-bold text-white">Smog Health & Respiratory Triage</h3>
            <p className="text-xs text-slate-400">Clinical guidance for {city.name} (AQI {city.currentAQI}) • {profile.label}</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          Select any symptoms currently experienced by household members to evaluate particulate-induced airway strain:
        </p>

        {/* Checkbox Grid */}
        <div className="space-y-2 mb-4">
          {[
            { key: 'throat', label: 'Dry scratchy throat or mild pharynx irritation', severity: 'mild' },
            { key: 'eyes', label: 'Stinging, watering, or red eyes', severity: 'mild' },
            { key: 'cough', label: 'Persistent dry morning cough or throat clearing', severity: 'moderate' },
            { key: 'wheeze', label: 'Audible chest whistling, wheezing, or tightness', severity: 'severe' },
            { key: 'breathless', label: 'Shortness of breath during rest or light activity', severity: 'severe' }
          ].map((item) => (
            <label
              key={item.key}
              className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition ${
                selectedSymptoms[item.key]
                  ? 'bg-slate-800 border-emerald-500/50 text-white'
                  : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center gap-2.5 text-xs">
                <input
                  type="checkbox"
                  checked={selectedSymptoms[item.key]}
                  onChange={() => toggleSymptom(item.key)}
                  className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
                />
                <span>{item.label}</span>
              </div>
              <span className={`text-[10px] uppercase font-bold px-1.5 py-0.2 rounded ${
                item.severity === 'severe' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                item.severity === 'moderate' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                'bg-slate-800 text-slate-400'
              }`}>
                {item.severity}
              </span>
            </label>
          ))}
        </div>

        {/* Result Action Box */}
        <div className={`p-4 rounded-2xl border space-y-2 ${
          isCritical 
            ? 'bg-rose-950/60 border-rose-500/50 text-rose-100' 
            : isModerate 
            ? 'bg-amber-950/50 border-amber-500/40 text-amber-100'
            : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-100'
        }`}>
          <div className="flex items-center gap-2 font-bold text-sm">
            {isCritical ? (
              <>
                <AlertTriangle className="w-5 h-5 text-rose-400 animate-pulse" />
                <span>Level 3: Bronchial Spasm Warning</span>
              </>
            ) : isModerate ? (
              <>
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <span>Level 2: Active Airway Inflammation</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Level 1: Mild Surface Irritation</span>
              </>
            )}
          </div>

          <ul className="text-xs space-y-1 list-disc pl-5 opacity-90 leading-relaxed">
            {isCritical ? (
              <>
                <li><strong>Administer prescribed rescue inhaler</strong> (e.g. Salbutamol / Albuterol) if prescribed by your physician.</li>
                <li>Immediately transition to a room with continuous HEPA/DIY filtration active.</li>
                <li>If breathing does not ease within 15 minutes, <strong>consult a pulmonologist or emergency department.</strong></li>
              </>
            ) : isModerate ? (
              <>
                <li>Use a gentle isotonic saline nasal rinse morning and bedtime to clear soot from cilia.</li>
                <li>Maintain bedroom relative humidity at 45–50% to prevent mucosal cracking.</li>
                <li>Drink warm turmeric milk with black pepper or ginger infusion to quiet cytokine cascades.</li>
              </>
            ) : (
              <>
                <li>Rinse eyes with fresh cool water or lubricating artificial tears.</li>
                <li>Wear a certified airtight N95/KF94 mask for all outdoor transitions.</li>
                <li>Keep indoor air purifiers running to prevent overnight symptom escalation.</li>
              </>
            )}
          </ul>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
          >
            Close Triage Guide
          </button>
        </div>

      </div>
    </div>
  );
}
