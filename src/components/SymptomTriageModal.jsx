import React, { useState } from 'react';
import { HeartPulse, X } from 'lucide-react';
import { TriageSymptomList } from './TriageSymptomList';
import { TriageResultBox } from './TriageResultBox';

/**
 * Smog Health & Respiratory Triage Modal.
 * @param {{ isOpen: boolean, onClose: () => void, city: any, profile: any }} props
 */
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

  const isCritical = Boolean(selectedSymptoms.breathless || selectedSymptoms.wheeze);
  const isModerate = Boolean(selectedSymptoms.cough);

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
            <h3 className="text-lg font-heading font-bold text-white">Smog Health &amp; Respiratory Triage</h3>
            <p className="text-xs text-slate-400">Clinical guidance for {city.name} (AQI {city.currentAQI}) • {profile.label}</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          Select any symptoms currently experienced by household members to evaluate particulate-induced airway strain:
        </p>

        <TriageSymptomList
          selectedSymptoms={selectedSymptoms}
          onToggleSymptom={toggleSymptom}
        />

        <TriageResultBox
          isCritical={isCritical}
          isModerate={isModerate}
        />

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

export default SymptomTriageModal;
