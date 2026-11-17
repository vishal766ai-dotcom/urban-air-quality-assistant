import React from 'react';
import { Award, X } from 'lucide-react';

/**
 * Gamified Clean Air Community Champion Certificate Modal.
 * @param {{
 *   isOpen: boolean,
 *   onClose: () => void,
 *   profile: any,
 *   impact: any,
 *   cityName: string
 * }} props
 */
export function CleanAirCertificateModal({ isOpen, onClose, profile, impact, cityName }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
    >
      <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-3xl max-w-xl w-full p-8 shadow-2xl relative text-center text-slate-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white transition"
          aria-label="Close certificate"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400 mb-3 border border-emerald-500/30">
          <Award className="w-8 h-8" />
        </div>

        <div className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-1">
          Certificate of Climate &amp; Lung Defense
        </div>
        <h3 id="cert-modal-title" className="text-2xl font-heading font-black text-white">
          Clean Air Community Champion
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Issued by AeroGuardian for exemplary winter smog mitigation in {cityName}
        </p>

        <div className="my-6 p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-sm text-left">
          <div className="flex justify-between">
            <span className="text-slate-400">Tailored Household:</span>
            <span className="font-semibold text-white">{profile?.label || 'General Household'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Monthly Greenhouse Gas Averted:</span>
            <span className="font-bold text-emerald-400">{impact.monthly.co2Kg} kg CO₂e</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Toxic Particulate Kept from Air:</span>
            <span className="font-bold text-cyan-400">{impact.monthly.pm25Grams} g PM2.5</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Community Tree Absorption Equivalent:</span>
            <span className="font-bold text-teal-300">{impact.equivalents.trees} Trees</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => window.print()}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition shadow-lg shadow-emerald-700/30"
          >
            Print / Save Certificate
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default CleanAirCertificateModal;
