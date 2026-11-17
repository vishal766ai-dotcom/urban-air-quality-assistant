import React from 'react';
import { Leaf } from 'lucide-react';

/**
 * AirPlantsList component displaying NASA clean air study houseplant specifications.
 * @param {{ plants: Array<{ name: string, nickname: string, purificationType: string, careLevel: string, petsSafe: string, density: string }> }} props
 */
export function AirPlantsList({ plants }) {
  return (
    <div className="rounded-2xl bg-slate-800/80 border border-slate-700/80 p-6 shadow-xl space-y-5">
      <div>
        <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
          <Leaf className="w-5 h-5 text-emerald-400" />
          <span>NASA Clean Air Study Houseplants Guide</span>
        </h3>
        <p className="text-xs text-slate-400">
          Natural bio-filtration for indoor toxins, natural winter humidity, and bedroom oxygenation
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {plants.map((plant, i) => (
          <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/60 space-y-2.5">
            <div>
              <h4 className="text-sm font-bold text-white">{plant.name}</h4>
              <span className="text-[11px] text-emerald-400 italic">&quot;{plant.nickname}&quot;</span>
            </div>

            <div className="space-y-1 text-xs">
              <div className="text-slate-300">
                <strong className="text-slate-400">Filters:</strong> {plant.purificationType}
              </div>
              <div className="text-slate-300">
                <strong className="text-slate-400">Care:</strong> {plant.careLevel}
              </div>
              <div className="text-slate-300">
                <strong className="text-slate-400">Pet Safety:</strong>{' '}
                <span className={plant.petsSafe.includes('Toxic') ? 'text-amber-400' : 'text-emerald-400'}>
                  {plant.petsSafe}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-800 italic">
              {plant.density}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AirPlantsList;
