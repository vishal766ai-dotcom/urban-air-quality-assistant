import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { CommunityReportForm } from './CommunityReportForm';
import { IncidentFeedList } from './IncidentFeedList';

const INITIAL_REPORTS = [
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
];

/**
 * CommunityShield - Collective neighborhood action and live incident reporting.
 * @param {{ city: import('../utils/calculations').CityModel, profile?: any }} props
 */
export function CommunityShield({ city }) {
  const [reports, setReports] = useState(INITIAL_REPORTS);

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
              Winter smog is an ambient crisis that requires collective vigilance. Report local burning flare-ups, coordinate low-emission transit pods, and safeguard vulnerable community members together.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700 text-center shrink-0">
            <span className="text-xs text-slate-400 block font-medium">Active Protectors</span>
            <span className="font-heading font-black text-3xl text-indigo-400">1,480+</span>
            <span className="text-[11px] text-emerald-400 block">3.4 Tons CO₂ averted</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <CommunityReportForm onAddReport={handleAddReport} cityName={city.name} />
        <IncidentFeedList reports={reports} onVote={handleVote} />
      </div>
    </div>
  );
}

export default CommunityShield;
