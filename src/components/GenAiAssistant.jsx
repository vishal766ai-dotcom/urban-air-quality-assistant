import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Mic, 
  MicOff, 
  Download, 
  Trash2, 
  User, 
  CheckCircle,
  HelpCircle,
  Compass,
  ArrowRight
} from 'lucide-react';
import { askGenAiAssistant } from '../services/geminiService';
import { SMART_PROMPT_SUGGESTIONS } from '../data/knowledgeBase';
import { useSpeech } from '../hooks/useSpeech';

export function GenAiAssistant({ city, profile, apiKey, onOpenApiKeyModal }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I'm your **AeroGuardian GenAI Assistant**. 

I am actively tracking ambient conditions in **${city.name}** (Current AQI: **${city.currentAQI}** - ${city.category}) with personalized defense protocols calibrated for **${profile.label}**.

How can I help you today? You can choose one of the smart prompt cards below, speak with the mic, or type any question!`,
      source: 'AeroGuardian GenAI Engine'
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { speak, stopSpeaking, isSpeaking, startListening, isListening, speechSupported, recognitionSupported } = useSpeech();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (queryToSend) => {
    const q = (queryToSend || inputQuery).trim();
    if (!q || loading) return;

    const userMsg = {
      id: Date.now().toString(),
      role: 'user',
      content: q
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const response = await askGenAiAssistant({
        userMessage: q,
        apiKey,
        cityData: city,
        lifestyleProfile: profile,
        conversationHistory: messages
      });

      const aiMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text,
        source: response.source
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Sorry, I encountered an issue generating an answer. Please check your network connection and try again.',
          source: 'Error'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if (isListening) return;
    startListening((transcript) => {
      setInputQuery(transcript);
      handleSend(transcript);
    });
  };

  const handleClearHistory = () => {
    stopSpeaking();
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Chat history reset. Ready with live guidance for **${city.name}**!`,
        source: 'AeroGuardian GenAI Engine'
      }
    ]);
  };

  const handleDownloadPlan = () => {
    const content = messages
      .map(m => `--- ${m.role.toUpperCase()} (${m.source || 'User'}) ---\n${m.content}\n`)
      .join('\n');
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AeroGuardian_Smog_Plan_${city.name.replace(/\s+/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col h-[750px]">
      
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-700 bg-slate-900/80 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                AeroGuardian AI Assistant
              </h3>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {apiKey ? 'Gemini 1.5 Live' : 'Intelligent Dual-Engine'}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Context: {city.name} (AQI {city.currentAQI}) • {profile.label}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isSpeaking ? (
            <button
              onClick={stopSpeaking}
              className="p-2 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-medium flex items-center gap-1.5 transition"
              title="Stop Speech Readout"
            >
              <VolumeX className="w-4 h-4 animate-pulse" />
              <span className="hidden sm:inline">Mute</span>
            </button>
          ) : null}

          <button
            onClick={handleDownloadPlan}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs transition"
            title="Download Plan as Markdown"
            aria-label="Download Plan"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={handleClearHistory}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-rose-400 text-xs transition"
            title="Clear Chat History"
            aria-label="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`p-2 rounded-xl shrink-0 ${isUser ? 'bg-cyan-600 text-white' : 'bg-emerald-600 text-white'}`}>
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-sm leading-relaxed ${
                isUser 
                  ? 'bg-cyan-600 text-white shadow-md' 
                  : 'bg-slate-900/90 border border-slate-700/80 text-slate-200 shadow-md'
              }`}>
                {/* Message text with basic markdown formatting */}
                <div className="prose prose-invert max-w-none text-xs sm:text-sm whitespace-pre-line space-y-2">
                  {msg.content}
                </div>

                {/* Footer bar for AI responses */}
                {!isUser && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-mono text-[10px] text-emerald-400/80">
                      ⚡ {msg.source || 'AeroGuardian Engine'}
                    </span>
                    {speechSupported && (
                      <button
                        onClick={() => speak(msg.content)}
                        className="flex items-center gap-1 text-slate-400 hover:text-emerald-300 transition"
                        title="Listen to response"
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
        })}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-600 text-white animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 text-slate-400 text-xs flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
              <span>Synthesizing tailored smog navigation protocol...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Smart Prompt Suggestions Chips */}
      <div className="px-4 py-2 bg-slate-900/70 border-t border-slate-800/80 overflow-x-auto flex items-center gap-2 scrollbar-none">
        <span className="text-[11px] text-slate-400 font-semibold shrink-0 uppercase tracking-wider flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          Smart Prompts:
        </span>
        {SMART_PROMPT_SUGGESTIONS.map((item, index) => (
          <button
            key={index}
            onClick={() => handleSend(item.prompt)}
            disabled={loading}
            className="shrink-0 px-2.5 py-1 rounded-full text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1.5"
          >
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-4 bg-slate-900 border-t border-slate-700">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          {recognitionSupported && (
            <button
              type="button"
              onClick={handleVoiceInput}
              title={isListening ? "Listening..." : "Click to speak"}
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
            placeholder={`Ask AeroAI about smog protection, DIY hacks, schedules, or commute in ${city.name}...`}
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

    </div>
  );
}
