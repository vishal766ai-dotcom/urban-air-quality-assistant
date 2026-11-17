import { useState, useEffect } from 'react';

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) setSpeechSupported(true);
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        setRecognitionSupported(true);
      }
    }
  }, []);

  const speak = (text) => {
    if (!speechSupported || !text) return;
    window.speechSynthesis.cancel(); // cancel any ongoing speech

    // Clean markdown hashes/stars before speaking
    const cleanText = text
      .replace(/[#*`_>]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (speechSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const startListening = (onResultCallback) => {
    if (!recognitionSupported) return;
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (onResultCallback) onResultCallback(transcript);
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  return {
    speak,
    stopSpeaking,
    isSpeaking,
    startListening,
    isListening,
    speechSupported,
    recognitionSupported
  };
}
