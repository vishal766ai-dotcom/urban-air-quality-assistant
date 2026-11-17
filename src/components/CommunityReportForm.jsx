import React, { useState } from 'react';
import { Megaphone, CheckCircle2, Send } from 'lucide-react';

/**
 * Community Hotspot Incident Reporting Form.
 * @param {{ onAddReport: (report: { type: string, location: string }) => void, cityName: string }} props
 */
export function CommunityReportForm({ onAddReport, cityName }) {
  const [newReportType, setNewReportType] = useState('Biomass / Leaf Burning');
  const [newReportLocation, setNewReportLocation] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReportLocation.trim()) return;

    onAddReport({
      type: newReportType,
      location: newReportLocation.trim()
    });

    setNewReportLocation('');
    setReportSuccess(true);
    setTimeout(() => setReportSuccess(false), 4000);
  };

  return (
    <div className="lg:col-span-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 p-6 shadow-xl space-y-4">
      <div className="flex items-center gap-2">
        <Megaphone className="w-5 h-5 text-amber-400" />
        <h3 className="font-heading font-bold text-lg text-white">
          Report Pollution Hotspot
        </h3>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed">
        Spotted leaf burning, construction dust without water sprays, or unvented diesel generators? Broadcast it immediately to protect nearby asthmatic children.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3.5 pt-2">
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Hazard Category:</label>
          <select
            value={newReportType}
            onChange={(e) => setNewReportType(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
          >
            <option value="Biomass / Leaf Burning">Biomass / Leaf / Waste Burning</option>
            <option value="Heavy Truck Idling">Heavy Commercial Vehicle Idling</option>
            <option value="Construction Dust Plume">Uncontained Construction Dust</option>
            <option value="Industrial Smokestack Flare">Industrial Boiler / Brick Kiln Smoke</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Location or Landmark:</label>
          <input
            type="text"
            value={newReportLocation}
            onChange={(e) => setNewReportLocation(e.target.value)}
            placeholder="e.g. Ring Road Crossing, Near School Gate..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-400 outline-none focus:border-indigo-500"
            required
          />
        </div>

        {reportSuccess && (
          <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Incident broadcasted! Municipal enforcement &amp; 148 nearby neighbors notified.</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-semibold text-sm shadow-lg shadow-rose-900/30 transition transform active:scale-95 flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span>Broadcast Neighborhood Alert</span>
        </button>
      </form>

      {/* Clean Air Carpool Pods Initiative */}
      <div className="pt-4 border-t border-slate-700/60 space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
          Community Carpool Pods
        </h4>
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/50 text-xs text-slate-300 space-y-1.5">
          <div className="font-semibold text-white">Join the {cityName} Electric School Run Pod</div>
          <p className="text-slate-400 text-[11px]">
            4 families combine morning school drop-offs into 1 shared electric vehicle, eliminating 3 cold-start exhaust plumes right at the school gate!
          </p>
          <span className="inline-block px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">
            12 Pods Active
          </span>
        </div>
      </div>
    </div>
  );
}

export default CommunityReportForm;
