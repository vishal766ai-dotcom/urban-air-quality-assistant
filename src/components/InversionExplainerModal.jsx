import React from 'react';
import { Wind, X } from 'lucide-react';

/**
 * Modal component explaining atmospheric thermal inversion physics during winter smog.
 * @param {{ isOpen: boolean, onClose: () => void }} props
 */
export function InversionExplainerModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inversion-modal-title"
    >
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-slate-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition focus:outline-none focus:ring-2 focus:ring-cyan-500"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Wind className="w-6 h-6" />
          </div>
          <div>
            <h3 id="inversion-modal-title" className="text-lg font-heading font-bold text-white">
              Understanding Winter Thermal Inversion
            </h3>
            <p className="text-xs text-slate-400">Atmospheric Physics of Severe Urban Smog</p>
          </div>
        </div>

        <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
          <p>
            In warm weather, air at ground level is warmed by the sun and rises naturally into the cooler upper atmosphere, carrying vehicle exhaust and dust away (convective dispersion).
          </p>
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
            <h4 className="font-semibold text-amber-300 text-xs uppercase tracking-wider mb-1">
              The Winter &quot;Lid&quot; Effect
            </h4>
            <p className="text-xs text-slate-300">
              On cold winter nights, the ground rapidly chills the air directly above it. A layer of warmer, less dense air settles overhead. This warmer layer acts as a tight <strong>atmospheric lid</strong>, locking pollutants into a shallow boundary zone just 100 to 200 meters thick.
            </p>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300">
            <li><strong className="text-rose-300">6:00 AM – 9:30 AM:</strong> Coldest surface temperatures create peak inversion; pollution concentration can be 15x higher.</li>
            <li><strong className="text-emerald-300">1:00 PM – 3:30 PM:</strong> Sun warms the ground, breaking the lid and allowing fresh air circulation.</li>
          </ul>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}

export default InversionExplainerModal;
