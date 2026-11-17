import React from 'react';

/**
 * Footer buttons for the API Key configuration modal.
 * @param {{ onClear: () => void, onClose: () => void }} props
 */
export function ApiKeyModalFooter({ onClear, onClose }) {
  return (
    <div className="flex items-center justify-between gap-2 pt-2">
      <button
        type="button"
        onClick={onClear}
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
          Save &amp; Connect
        </button>
      </div>
    </div>
  );
}

export default ApiKeyModalFooter;
