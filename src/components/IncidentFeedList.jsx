import React from 'react';
import { ShieldAlert, Flame, MapPin } from 'lucide-react';

/**
 * IncidentFeedList component displaying live neighborhood smog reports.
 * @param {{
 *   reports: Array<{ id: number, type: string, location: string, time: string, status: string, verified: boolean, votes: number }>,
 *   onVote: (id: number) => void
 * }} props
 */
export function IncidentFeedList({ reports, onVote }) {
  return (
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
                onClick={() => onVote(report.id)}
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
  );
}

export default IncidentFeedList;
