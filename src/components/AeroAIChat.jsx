import React, { useState, useRef, useEffect } from 'react';
import { Bot } from 'lucide-react';
import { askGenAiAssistant } from '../services/geminiService';
import { useSpeech } from '../hooks/useSpeech';
import { exportPersonalizedActionPlan } from '../utils/planExporter';
import { AeroAIMessageItem } from './AeroAIMessageItem';
import { SmartPromptBar } from './SmartPromptBar';
import { ChatInputBar } from './ChatInputBar';
import { ChatHeaderBar } from './ChatHeaderBar';

/**
 * AeroAIChat GenAI Assistant conversational interface.
 * @param {{ city: import('../utils/calculations').CityModel, profile: any, apiKey?: string }} props
 */
export function AeroAIChat({ city, profile, apiKey }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I'm your **AeroGuardian GenAI Assistant**. 

I am actively tracking ambient conditions in **${city.name}** (Current AQI: **${city.currentAQI}** - ${city.category}) with personalized defense protocols calibrated for **${profile.label}**.

How can I help you today? You can choose one of the smart prompt cards below, speak with the mic, or generate a 1-click personalized daily action plan!`,
      source: 'AeroGuardian GenAI Engine',
      actionCards: [
        {
          category: 'Immediate Indoor Action',
          action: city.currentAQI > 200 
            ? 'Seal windows and keep DIY Corsi-Rosenthal / HEPA filtration running.' 
            : 'Prepare for 1:00 PM – 3:30 PM safe airing window.',
          status: city.currentAQI > 200 ? 'Critical' : 'Safe Window'
        },
        {
          category: 'Commute Shift Protocol',
          action: 'Switch to electric metro or carpool with cabin recirculate enabled.',
          status: '-80% Soot'
        },
        {
          category: 'Mask & Filter Spec',
          action: 'Use certified NIOSH N95 / KF94 respirator with snug facial seal.',
          status: 'Mandatory'
        }
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { speak, stopSpeaking, isSpeaking, startListening, isListening, speechSupported, recognitionSupported } = useSpeech();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (queryToSend) => {
    const q = (queryToSend || inputQuery).trim();
    if (!q || loading) return;

    const userMsg = { id: Date.now().toString(), role: 'user', content: q };
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
        source: response.source,
        actionCards: response.actionCards
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch {
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

  const handleDownloadChat = () => {
    const content = messages
      .map(m => `--- ${m.role.toUpperCase()} (${m.source || 'User'}) ---\n${m.content}\n`)
      .join('\n');
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AeroGuardian_Chat_${city.name.replace(/\s+/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col h-[750px]">
      <ChatHeaderBar
        cityName={city.name}
        currentAQI={city.currentAQI}
        profileLabel={profile.label}
        apiKey={apiKey}
        isSpeaking={isSpeaking}
        onStopSpeaking={stopSpeaking}
        onGeneratePlan={() => exportPersonalizedActionPlan(city, profile)}
        onDownloadPlan={handleDownloadChat}
        onClearHistory={handleClearHistory}
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => (
          <AeroAIMessageItem key={msg.id} msg={msg} speechSupported={speechSupported} onSpeak={speak} />
        ))}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-600 text-white animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 text-slate-400 text-xs flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Synthesizing tailored smog navigation protocol...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <SmartPromptBar onSelectPrompt={handleSend} disabled={loading} />

      <ChatInputBar
        inputQuery={inputQuery}
        setInputQuery={setInputQuery}
        onSend={handleSend}
        onVoiceInput={handleVoiceInput}
        loading={loading}
        isListening={isListening}
        recognitionSupported={recognitionSupported}
        cityName={city.name}
      />
    </div>
  );
}

export default AeroAIChat;
