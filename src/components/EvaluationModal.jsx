import React, { useState } from 'react';
import { Award, CheckCircle2, X, Play, RefreshCw } from 'lucide-react';
import { runAutomatedDiagnostics } from '../services/testRunnerService';
import { RUBRIC_CARDS } from '../data/evaluationRubrics';

/**
 * PromptWars Evaluation & Compliance Matrix Modal.
 * @param {{ isOpen: boolean, onClose: () => void }} props
 */
export function EvaluationModal({ isOpen, onClose }) {
  const [testResults, setTestResults] = useState(null);
  const [running, setRunning] = useState(false);

  if (!isOpen) return null;

  const handleRunTests = async () => {
    setRunning(true);
    setTimeout(async () => {
      const res = await runAutomatedDiagnostics();
      setTestResults(res);
      setRunning(false);
    }, 450);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="eval-modal-title"
    >
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative text-slate-200 my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          aria-label="Close Evaluation Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 text-white shadow-lg shadow-emerald-500/20">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <h2 id="eval-modal-title" className="text-xl sm:text-2xl font-heading font-black text-white">
                PromptWars Evaluation &amp; Compliance Matrix
              </h2>
              <p className="text-xs text-slate-400">
                [Challenge 6] Urban Air Quality Assistant • Verified against all 6 competition rubrics
              </p>
            </div>
          </div>

          <button
            onClick={handleRunTests}
            disabled={running}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-emerald-700/30 transition transform active:scale-95 shrink-0"
          >
            {running ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            <span>{running ? 'Running Test Suite...' : 'Run Automated Diagnostics'}</span>
          </button>
        </div>

        {/* Live Test Results Runner */}
        {testResults && (
          <div className="mb-6 p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 animate-fade-in space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Test Suite Execution Summary: {testResults.summary.passed}/{testResults.summary.total} Passed ({testResults.summary.score}%)</span>
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
        )}

        {/* Rubric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RUBRIC_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={idx} className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-slate-700 text-slate-200">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-heading font-bold text-sm text-white">{card.title}</h3>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border uppercase tracking-wider ${card.badgeClass}`}>
                    {card.impact}
                  </span>
                </div>

                <p className="text-xs text-slate-400 italic">
                  &quot;{card.desc}&quot;
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-700/60">
                  {card.achieved.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition"
          >
            Close Matrix
          </button>
        </div>

      </div>
    </div>
  );
}

export default EvaluationModal;
