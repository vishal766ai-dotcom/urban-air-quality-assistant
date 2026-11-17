import React from 'react';
import { Send, Mic, MicOff } from 'lucide-react';

/**
 * Chat input bar with voice recognition and send button.
 * @param {{
 *   inputQuery: string,
 *   setInputQuery: (q: string) => void,
 *   onSend: () => void,
 *   onVoiceInput: () => void,
 *   loading: boolean,
 *   isListening: boolean,
 *   recognitionSupported: boolean,
 *   cityName: string
 * }} props
 */
export function ChatInputBar({
  inputQuery,
  setInputQuery,
  onSend,
  onVoiceInput,
  loading,
  isListening,
  recognitionSupported,
  cityName
}) {
  return (
    <div className="p-4 bg-slate-900 border-t border-slate-700">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
        }}
        className="flex items-center gap-2"
      >
        {recognitionSupported && (
          <button
            type="button"
            onClick={onVoiceInput}
            title={isListening ? "Listening..." : "Click to speak"}
            aria-label={isListening ? "Listening" : "Click to speak"}
            className={`p-3 rounded-xl border transition ${
              isListening 
                ? 'bg-rose-600 text-white border-rose-500 animate-pulse' 
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-emerald-300'
            }`}
          >
            {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>
        )}

        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder={`Ask AeroAI about smog protection, DIY hacks, schedules, or commute in ${cityName}...`}
          className="flex-1 bg-slate-800 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-400 outline-none transition"
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading || !inputQuery.trim()}
          className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-lg shadow-emerald-700/30 transition transform active:scale-95"
          aria-label="Send Query"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}

export default ChatInputBar;
