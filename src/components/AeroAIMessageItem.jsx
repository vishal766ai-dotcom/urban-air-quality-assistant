import React from 'react';
import { Bot, User, Volume2 } from 'lucide-react';
import { MarkdownMessage } from './MarkdownMessage';

/**
 * Single chat message row in AeroAI.
 * @param {{ msg: { id: string, role: string, content: string, source?: string }, speechSupported: boolean, onSpeak: (text: string) => void }} props
 */
export function AeroAIMessageItem({ msg, speechSupported, onSpeak }) {
  const isUser = msg.role === 'user';

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div 
        className={`p-2 rounded-xl shrink-0 ${isUser ? 'bg-cyan-600 text-white' : 'bg-emerald-600 text-white'}`}
        aria-hidden="true"
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      <div className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-sm leading-relaxed ${
        isUser 
          ? 'bg-cyan-600 text-white shadow-md' 
          : 'bg-slate-900/90 border border-slate-700/80 text-slate-200 shadow-md'
      }`}>
        <div className="text-xs sm:text-sm">
          <MarkdownMessage content={msg.content} />
        </div>

        {!isUser && (
          <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span className="font-mono text-[10px] text-emerald-400/80">
              ⚡ {msg.source || 'AeroGuardian Engine'}
            </span>
            {speechSupported && (
              <button
                onClick={() => onSpeak(msg.content)}
                className="flex items-center gap-1 text-slate-400 hover:text-emerald-300 transition"
                title="Listen to response"
                aria-label="Listen to response"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Read aloud</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AeroAIMessageItem;
