import React from 'react';
import { CheckCircle2 } from 'lucide-react';

/**
 * Renders the test suite execution results summary and detail items.
 * @param {{ testResults: { summary: { passed: number, total: number, score: number, durationMs: number }, results: Array<{ test: string, detail: string }> } }} props
 */
export function DiagnosticResultsView({ testResults }) {
  if (!testResults) return null;

  return (
    <div className="mb-6 p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 animate-fade-in space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <CheckCircle2 className="w-5 h-5" />
          <span>
            Test Suite Execution Summary: {testResults.summary.passed}/{testResults.summary.total} Passed ({testResults.summary.score}%)
          </span>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          Duration: {testResults.summary.durationMs}ms
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        {testResults.results.map((res, i) => (
          <div key={i} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">{res.test}</strong>
              <span className="text-slate-400 text-[11px]">{res.detail}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiagnosticResultsView;
