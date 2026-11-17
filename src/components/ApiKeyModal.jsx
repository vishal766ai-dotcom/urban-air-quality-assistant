import React, { useState, useEffect } from 'react';
import { Key, X } from 'lucide-react';
import { PERMANENT_API_KEY } from '../services/geminiService';
import { ApiKeyFormFields } from './ApiKeyFormFields';
import { ApiKeyModalFooter } from './ApiKeyModalFooter';

/**
 * Modal for Gemini API configuration and verification.
 * @param {{ isOpen: boolean, onClose: () => void, apiKey?: string, onSaveApiKey: (k: string) => void }} props
 */
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

  const handleReset = () => {
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
          AeroGuardian features a <strong>dual-engine GenAI architecture</strong>. The application is pre-configured with a permanent Gemini API key. If the remote service is unavailable, it seamlessly falls back to the high-accuracy <strong>Built-in Atmospheric &amp; Pediatric Knowledge Engine</strong>!
        </p>

        <form onSubmit={handleSave} className="space-y-4">
          <ApiKeyFormFields
            keyValue={keyValue}
            setKeyValue={setKeyValue}
            onResetToPermanent={handleReset}
            savedSuccess={savedSuccess}
          />

          <ApiKeyModalFooter onClear={handleClear} onClose={onClose} />
        </form>
      </div>
    </div>
  );
}

export default ApiKeyModal;
