import React, { useState, useRef } from 'react';
import { Cpu, Send, Mic, Volume2, Globe, RefreshCw, User, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';

interface AiFarmingAssistantProps {
  language: 'en' | 'te';
  setLanguage: (lang: 'en' | 'te') => void;
}

export const AiFarmingAssistant: React.FC<AiFarmingAssistantProps> = ({
  language,
  setLanguage,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_1',
      sender: 'assistant',
      text: language === 'te'
        ? 'నమస్కారం! నేను గ్రీన్ గ్రో AI వ్యవసాయ సహాయకుడిని. పంట తెగుళ్లు, నీటి ఆదా, సేంద్రీయ ఎరువుల గురించి నన్ను అడగండి.'
        : 'Hello! I am your GreenGrow AI Farming Assistant. Ask me anything about crop diseases, water management, organic fertilizers, or seasonal soil care.',
      language,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputQuery, setInputQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const quickPrompts = language === 'te' ? [
    'టమాటా ఆకు మచ్చల నివారణ ఎలా?',
    'వరి పొలంలో నీటి పొదుపు మార్గాలు',
    'వేపపిండి వాడకం వివరాలు',
    'వర్షపాతం హెచ్చరికలు'
  ] : [
    'How to prevent Early Blight on Tomatoes?',
    'Drip irrigation water saving tips',
    'Organic bio-fertilizer neem cake formula',
    'Micro-climate disease advisories'
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text: query,
      language,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const resp = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          language,
          generateSpeech: true,
        }),
      });

      const data = await resp.json();
      setLoading(false);

      if (data.success && data.text) {
        const assistantMsg: ChatMessage = {
          id: 'msg_' + (Date.now() + 1),
          sender: 'assistant',
          text: data.text,
          language,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          audioBase64: data.audioBase64,
        };
        setMessages(prev => [...prev, assistantMsg]);
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (err) {
      console.error('Chat error:', err);
      setLoading(false);
    }
  };

  const playAudio = (audioBase64?: string) => {
    if (!audioBase64) return;
    try {
      const audio = new Audio(`data:audio/wav;base64,${audioBase64}`);
      audio.play();
    } catch (err) {
      console.error('Audio playback error:', err);
    }
  };

  const simulateMicInput = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      const voiceText = language === 'te' 
        ? 'టమాటా తెగులు నివారణకు ఎలాంటి సేంద్రీయ మందు చల్లాలి?'
        : 'What organic remedy stops tomato leaf fungus?';
      setInputQuery(voiceText);
    }, 2500);
  };

  return (
    <div id="ai-assistant-container" className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 bg-slate-950 text-slate-100 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-semibold uppercase tracking-wide mb-1">
            <Cpu className="w-3.5 h-3.5" />
            <span>Module 14: Multilingual Voice & AI Assistant</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            GreenGrow AI Voice & Chat Assistant
          </h1>
        </div>

        {/* Language Switch */}
        <button
          onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
          className="px-3 py-1.5 rounded-xl bg-slate-900 border border-emerald-700/60 text-emerald-300 text-xs font-bold flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <Globe className="w-4 h-4 text-emerald-400" />
          <span>{language === 'en' ? 'English' : 'తెలుగు (Telugu)'}</span>
        </button>
      </div>

      {/* Quick Prompt Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(p)}
            className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-600 text-slate-300 text-xs font-medium transition-all"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Chat Messages Box */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 sm:p-6 h-[480px] overflow-y-auto space-y-4 shadow-xl">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-700/60 flex items-center justify-center text-emerald-400 shrink-0 mt-1">
                <Cpu className="w-4 h-4" />
              </div>
            )}

            <div className={`max-w-xl rounded-2xl p-4 text-xs leading-relaxed space-y-2 ${
              msg.sender === 'user'
                ? 'bg-emerald-600 text-emerald-950 font-semibold rounded-tr-none'
                : 'bg-slate-950 text-slate-200 border border-slate-800 rounded-tl-none'
            }`}>
              <p>{msg.text}</p>
              
              <div className="flex items-center justify-between text-[10px] opacity-70 pt-1">
                <span>{msg.timestamp}</span>
                {msg.audioBase64 && (
                  <button
                    onClick={() => playAudio(msg.audioBase64)}
                    className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 font-bold"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Play Voice</span>
                  </button>
                )}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-1">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-2 text-xs text-emerald-400 p-2">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>AI Agronomist generating advice...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Field Bar */}
      <div className="flex items-center space-x-2">
        <button
          onClick={simulateMicInput}
          className={`p-3 rounded-xl border transition-all ${
            isRecording
              ? 'bg-rose-950 border-rose-500 text-rose-300 animate-pulse'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-emerald-400'
          }`}
          title="Voice Input"
        >
          <Mic className="w-5 h-5" />
        </button>

        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder={language === 'te' ? 'తెలుగులో ఏదైనా అడగండి...' : 'Ask your farming question in English...'}
          className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!inputQuery.trim()}
          className="p-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold disabled:opacity-50 transition-all shadow-md shadow-emerald-500/20"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
