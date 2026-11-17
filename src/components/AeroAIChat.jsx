import React from 'react';
import { Bot } from 'lucide-react';
import { useSpeech } from '../hooks/useSpeech';
import { useGeminiAssistant } from '../hooks/useGeminiAssistant';
import { exportChatTranscript } from '../utils/planExporter';
import { AeroAIMessageItem } from './AeroAIMessageItem';
import { SmartPromptBar } from './SmartPromptBar';
import { ChatInputBar } from './ChatInputBar';
import { ChatHeaderBar } from './ChatHeaderBar';

/**
 * AeroAIChat GenAI Assistant conversational interface.
 * @param {{ city: import('../utils/calculations').CityModel, profile: any, apiKey?: string }} props
 */
export function AeroAIChat({ city, profile, apiKey }) {
  const {
    messages,
    inputQuery,
    setInputQuery,
    loading,
    messagesEndRef,
    handleSend,
    handleClearHistory,
    handleExportPlan
  } = useGeminiAssistant({ city, profile, apiKey });

  const {
    speak,
    stopSpeaking,
    isSpeaking,
    startListening,
    isListening,
    speechSupported,
    recognitionSupported
  } = useSpeech();

  const handleVoiceInput = () => {
    if (isListening) return;
    startListening((transcript) => {
      setInputQuery(transcript);
      handleSend(transcript);
    });
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
        onGeneratePlan={handleExportPlan}
        onDownloadPlan={() => exportChatTranscript(messages, city.name)}
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
