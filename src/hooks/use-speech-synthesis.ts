'use client';
import { useState, useEffect, useCallback } from 'react';

export function useSpeechSynthesis() {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;
    setSupported(isSupported);
  }, []);

  const speak = useCallback((text: string, lang: string = 'hi-IN') => {
    if (!supported || !text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    
    // A small delay to ensure any previous speech is cancelled before starting a new one.
    setTimeout(() => {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }, 100);

  }, [supported]);
  
  useEffect(() => {
    const cancelSpeech = () => {
      if(supported) window.speechSynthesis.cancel();
    };
    window.addEventListener('beforeunload', cancelSpeech);
    return () => {
      window.removeEventListener('beforeunload', cancelSpeech);
      cancelSpeech();
    };
  }, [supported]);

  return { speak, speaking, supported };
}
