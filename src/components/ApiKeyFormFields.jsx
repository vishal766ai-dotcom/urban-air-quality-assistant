import React from 'react';
import { ShieldCheck, Check, RotateCcw } from 'lucide-react';

/**
 * Key input, security guarantee, and reset button.
 * @param {{
 *   keyValue: string,
 *   setKeyValue: (v: string) => void,
 *   onResetToPermanent: () => void,
 *   savedSuccess: boolean
 * }} props
 */
export function ApiKeyFormFields({
  keyValue,
  setKeyValue,
  onResetToPermanent,
  savedSuccess
}) {
  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-xs font-semibold text-slate-300">
            Gemini API Key:
          </label>
          <button
            type="button"
            onClick={onResetToPermanent}
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
    </>
  );
}

export default ApiKeyFormFields;
