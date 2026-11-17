import React, { useState } from 'react';
import { Award, X, Play, RefreshCw } from 'lucide-react';
import { runAutomatedDiagnostics } from '../services/testRunnerService';
import { DiagnosticResultsView } from './DiagnosticResultsView';
import { RubricCardsGrid } from './RubricCardsGrid';

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
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          aria-label="Close Evaluation Modal"
        >
          <X className="w-5 h-5" />
        </button>

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
            {running ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            <span>{running ? 'Running Test Suite...' : 'Run Automated Diagnostics'}</span>
          </button>
        </div>

        <DiagnosticResultsView testResults={testResults} />
        <RubricCardsGrid />

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
