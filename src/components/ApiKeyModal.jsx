import React, { useState, useEffect } from 'react';
import { Key, X, ShieldCheck, Check, RotateCcw } from 'lucide-react';
import { PERMANENT_API_KEY } from '../services/geminiService';

export function ApiKeyModal({ isOpen, onClose, apiKey, onSaveApiKey }) {
  const [keyValue, setKeyValue] = useState(apiKey || PERMANENT_API_KEY);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (apiKey) setKeyValue(apiKey);
    else setKeyValue(PERMANENT_API_KEY);
  }, [apiKey, isOpen]);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSaveApiKey(keyValue.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleResetToPermanent = () => {
    setKeyValue(PERMANENT_API_KEY);
    onSaveApiKey(PERMANENT_API_KEY);
  };

  const handleClear = () => {
    setKeyValue('');
    onSaveApiKey('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-slate-200">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Key className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-bold text-white">Google Gemini API Configuration</h3>
            <p className="text-xs text-emerald-400 font-medium">Permanent API Key Active</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          AeroGuardian features a <strong>dual-engine GenAI architecture</strong>. The application is pre-configured with a permanent Gemini API key. If the remote service is unavailable, it seamlessly falls back to the high-accuracy <strong>Built-in Atmospheric & Pediatric Knowledge Engine</strong>!
        </p>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Gemini API Key:
              </label>
              <button
                type="button"
                onClick={handleResetToPermanent}
                className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1"
                title="Reset to permanent key"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset to Default Key</span>
              </button>
            </div>
            <input
              type="text"
              value={keyValue}
              onChange={(e) => setKeyValue(e.target.value)}
              placeholder="AQ.Ab8RN..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Zero-Leak Security Guarantee:</span>
            </div>
            <p>Your API key is stored locally in your browser sandbox and transmitted directly to Google&apos;s official Gemini endpoint over HTTPS.</p>
          </div>

          {savedSuccess && (
            <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-xs text-emerald-300 flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Configuration saved successfully!</span>
            </div>
          )}

          <div className="flex items-center justify-between gap-2 pt-2">
            <button
              type="button"
              onClick={handleClear}
              className="px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-950/40 border border-rose-800/40 transition"
            >
              Clear Key
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white shadow-md transition"
              >
                Save & Connect
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}
