import React from 'react';
import { PlusCircle } from 'lucide-react';

/**
 * Footer buttons for Custom Location Modal.
 * @param {{ onClose: () => void }} props
 */
export function CustomLocationFooter({ onClose }) {
  return (
    <div className="flex items-center justify-end gap-2 pt-2">
      <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white shadow-md transition flex items-center gap-1.5"
      >
        <PlusCircle className="w-4 h-4" />
        <span>Activate Location</span>
      </button>
    </div>
  );
}

export default CustomLocationFooter;
