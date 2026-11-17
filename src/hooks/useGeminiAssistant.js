/**
 * @fileoverview Custom hook for managing AeroGuardian GenAI assistant conversation state,
 * Google Gemini API requests, fallback responses, and plan exports.
 * @module useGeminiAssistant
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { askGenAiAssistant } from '../services/geminiService';
import { exportPersonalizedActionPlan } from '../utils/planExporter';

/**
 * Creates the initial welcome message with structured action cards.
 */
function createInitialWelcomeMessage(city, profile) {
  const isHighAqi = city.currentAQI > 200;
  return {
    id: 'welcome',
    role: 'assistant',
    content: `Hello! I'm your **AeroGuardian GenAI Assistant**. 

I am actively tracking ambient conditions in **${city.name}** (Current AQI: **${city.currentAQI}** - ${city.category}) with personalized defense protocols calibrated for **${profile?.label || 'Household'}**.

How can I help you today? You can choose one of the smart prompt cards below, speak with the mic, or generate a 1-click personalized daily action plan!`,
    source: 'AeroGuardian GenAI Engine',
    actionCards: [
      {
        category: 'Indoor IAQ Hack',
        action: isHighAqi 
          ? 'Seal windows and keep DIY Corsi-Rosenthal / HEPA filtration running.' 
          : 'Prepare for 1:00 PM – 3:30 PM safe airing window.',
        status: isHighAqi ? 'Critical' : 'Safe Window'
      },
      {
        category: 'Low-Emission Routine',
        action: 'Avoid morning 6:30–9:30 AM inversion; shift exercise to midday.',
        status: 'Time-Shifted'
      },
      {
        category: 'Sustainable Alternative',
        action: 'Switch to electric metro or carpool with cabin recirculate enabled.',
        status: '-80% Soot'
      },
      {
        category: 'Direct Impact',
        action: 'Averts ~84 kg CO2e & 85g PM2.5/mo (4 mature tree equivalents).',
        status: 'Quantified'
      }
    ]
  };
}

/**
 * Custom hook for AeroAI conversational state and intelligence orchestration.
 * @param {{
 *   city: import('../utils/calculations').CityModel,
 *   profile: any,
 *   apiKey?: string
 * }} params
 */
export function useGeminiAssistant({ city, profile, apiKey }) {
  const [messages, setMessages] = useState(() => [createInitialWelcomeMessage(city, profile)]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = useCallback(async (queryToSend) => {
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
          content: 'Sorry, I encountered an issue generating an answer. Please check your connection and try again.',
          source: 'Error'
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, [inputQuery, loading, apiKey, city, profile, messages]);

  const handleClearHistory = useCallback(() => {
    setMessages([]);
  }, []);

  const handleExportPlan = useCallback(() => {
    const latestAiMessage = [...messages].reverse().find(m => m.role === 'assistant' && m.actionCards?.length);
    const cards = latestAiMessage?.actionCards || [];
    exportPersonalizedActionPlan(city, profile, cards);
  }, [city, profile, messages]);

  return {
    messages,
    inputQuery,
    setInputQuery,
    loading,
    messagesEndRef,
    handleSend,
    handleClearHistory,
    handleExportPlan
  };
}

export default useGeminiAssistant;
