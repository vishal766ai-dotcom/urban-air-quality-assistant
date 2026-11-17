import React, { useState } from 'react';
import { Users, MapPin, ShieldAlert, Flame } from 'lucide-react';
import { CommunityReportForm } from './CommunityReportForm';

/**
 * CommunitySmogShield - Collective neighborhood action and live incident reporting.
 * @param {{ city: import('../utils/calculations').CityModel, profile?: any }} props
 */
export function CommunityShield({ city }) {
  const [reports, setReports] = useState([
    {
      id: 1,
      type: 'Biomass / Leaf Burning',
      location: 'Central Park West Perimeter',
      time: '18 mins ago',
      status: 'Flagged to Municipal Squad',
      verified: true,
      votes: 14
    },
    {
      id: 2,
      type: 'Heavy Truck Idling Near Primary School',
      location: 'South Avenue Junction',
      time: '42 mins ago',
      status: 'Community Alert Broadcasted',
      verified: true,
      votes: 28
    },
    {
      id: 3,
      type: 'Construction Dust (Uncovered Debris)',
      location: 'Sector 8 Flyover Underpass',
      time: '1 hour ago',
      status: 'Investigation Pending',
      verified: false,
      votes: 9
    }
  ]);

  const handleAddReport = ({ type, location }) => {
    const newEntry = {
      id: Date.now(),
      type,
      location,
      time: 'Just now',
      status: 'Broadcasted to Neighborhood',
      verified: true,
      votes: 1
    };
    setReports(prev => [newEntry, ...prev]);
  };

  const handleVote = (id) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, votes: r.votes + 1 } : r));
  };

  return (
    <div className="space-y-6">
      
      {/* Community Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950/60 border border-slate-700/80 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Users className="w-4 h-4" />
              <span>Collective Neighborhood Action</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
              Community Smog Shield: {city.name}
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              Winter smog is an ambient crisis that requires collective vigilance. Report local burning flare-ups, coordinate low-emission school transit pods, and safeguard vulnerable community members together.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700 text-center shrink-0">
            <span className="text-xs text-slate-400 block font-medium">Active Neighborhood Protectors</span>
            <span className="font-heading font-black text-3xl text-indigo-400">1,480+</span>
            <span className="text-[11px] text-emerald-400 block">3.4 Metric Tons CO₂ averted</span>
          </div>
        </div>
      </div>

      {/* 2-Column: Report Form & Live Community Incident Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Report Form */}
        <CommunityReportForm onAddReport={handleAddReport} cityName={city.name} />

        {/* Right Column: Live Incident Feed */}
        <div className="lg:col-span-7 rounded-2xl bg-slate-800/80 border border-slate-700/80 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              <span>Real-Time Neighborhood Incident Feed</span>
            </h3>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-700 text-slate-300">
              {reports.length} Reports Logged
            </span>
          </div>

          <div className="space-y-3">
            {reports.map((report) => (
              <div
                key={report.id}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 shrink-0 mt-0.5">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{report.type}</span>
                      {report.verified && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{report.location}</span>
                      <span>•</span>
                      <span>{report.time}</span>
                    </div>
                    <div className="text-[11px] text-amber-300/90 font-medium mt-1">
                      Status: {report.status}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button 
                    onClick={() => handleVote(report.id)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-300 flex items-center gap-1 transition"
                    aria-label={`Upvote report: ${report.type}`}
                  >
                    <span>▲</span>
                    <span>{report.votes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Notice something suspicious in your sector?</span>
            <span className="text-indigo-400 font-semibold">Emergency City Smog Hotline: 1800-SMOG-ALERT</span>
          </div>
        </div>

      </div>

    </div>
  );
}

export default CommunityShield;
