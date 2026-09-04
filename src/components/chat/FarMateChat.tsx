import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User as UserIcon,
  ShieldCheck,
  Bug,
  AlertTriangle,
  RotateCcw,
  Volume2
} from 'lucide-react';
import { ChatMessage, FarmContext, LanguageCode } from '../../types';
import { TRANSLATIONS } from '../../lib/i18n/languages';
import { speechTTS } from '../../lib/voice/speech';

interface FarMateChatProps {
  isOpen: boolean;
  onClose: () => void;
  context: FarmContext;
  language: LanguageCode;
  currentMode?: string;
  onSendMessage: (msg: string) => Promise<string>;
  onNavigateTo: (view: 'pest' | 'counterfeit' | 'recommendation' | 'registry') => void;
}

export const FarMateChat: React.FC<FarMateChatProps> = ({
  isOpen,
  onClose,
  context,
  language,
  currentMode = 'pest',
  onSendMessage,
  onNavigateTo,
}) => {
  // Theme styling based on feature mode
  const getTheme = () => {
    switch (currentMode) {
      case 'counterfeit':
        return {
          title: 'VERIFY-X Sentinel Chat',
          badge: 'Anti-Counterfeit',
          headerBg: 'from-amber-900/90 to-orange-950/90',
          borderColor: 'border-amber-500/40',
          iconBg: 'bg-amber-500/20 border-amber-400/40 text-amber-300',
          bubbleBg: 'bg-[#e65100]',
          sendBtn: 'bg-[#e65100] hover:bg-[#c94500]',
          activePill: 'bg-amber-950 text-amber-300 border-amber-800',
        };
      case 'recommendation':
        return {
          title: 'Dosage Math AI Engine',
          badge: '15L Knapsack',
          headerBg: 'from-blue-900/90 to-indigo-950/90',
          borderColor: 'border-blue-500/40',
          iconBg: 'bg-blue-500/20 border-blue-400/40 text-blue-300',
          bubbleBg: 'bg-[#1d4ed8]',
          sendBtn: 'bg-[#1d4ed8] hover:bg-[#1e40af]',
          activePill: 'bg-blue-950 text-blue-300 border-blue-800',
        };
      case 'registry':
        return {
          title: 'Banned Chemicals Advisor',
          badge: 'Statutory Gazette',
          headerBg: 'from-rose-900/90 to-red-950/90',
          borderColor: 'border-rose-500/40',
          iconBg: 'bg-rose-500/20 border-rose-400/40 text-rose-300',
          bubbleBg: 'bg-[#be123c]',
          sendBtn: 'bg-[#be123c] hover:bg-[#9f1239]',
          activePill: 'bg-rose-950 text-rose-300 border-rose-800',
        };
      case 'pest':
      default:
        return {
          title: 'Pest Doctor AI Companion',
          badge: 'Plant Doctor',
          headerBg: 'from-emerald-900/90 to-teal-950/90',
          borderColor: 'border-emerald-500/40',
          iconBg: 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300',
          bubbleBg: 'bg-[#0b6633]',
          sendBtn: 'bg-[#0b6633] hover:bg-[#084e27]',
          activePill: 'bg-emerald-950 text-emerald-300 border-emerald-800',
        };
    }
  };

  const getDefaultMessage = (mode: string): ChatMessage => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    switch (mode) {
      case 'counterfeit':
        return {
          id: 'init-cf',
          sender: 'agent',
          text: 'Hello! I am your Counterfeit Detection & Batch Verification Assistant (VERIFY-X). Upload a photo of your container or enter a batch number, CIBRC registration number, or product name to verify bottle holograms and manufacturer credentials.',
          timestamp: time,
          quickActions: [
            { label: '🛡️ Check Bottle Hologram', action: 'counterfeit' },
            { label: '🔍 Verify Batch Number', action: 'counterfeit' },
            { label: '📋 CIBRC Registration Check', action: 'counterfeit' },
          ],
        };
      case 'recommendation':
        return {
          id: 'init-rec',
          sender: 'agent',
          text: 'Hello! I am your Input Recommendation & Sprayer Math Advisor. Ask me for verified CIBRC/FCO inputs for your crop, or exact dosage calculations for your sprayer tank (5L, 10L, 12L, 15L, 16L, 20L, or 200L).',
          timestamp: time,
          quickActions: [
            { label: '🧪 15L Knapsack Math', action: 'recommendation' },
            { label: '⚡ 20L Power Sprayer Math', action: 'recommendation' },
            { label: '💧 Multi-Tank Dosages (5L-200L)', action: 'recommendation' },
          ],
        };
      case 'registry':
        return {
          id: 'init-reg',
          sender: 'agent',
          text: 'Hello! I am your Statutory Gazette Advisor. Ask me about prohibited pesticides under the Insecticides Act 1968, gazette restriction orders, or approved legal biological alternatives.',
          timestamp: time,
          quickActions: [
            { label: '⚠️ Banned Pesticides List', action: 'registry' },
            { label: '🚫 Monocrotophos Vegetables Ban', action: 'registry' },
            { label: '🌱 Approved Bio-Alternatives', action: 'registry' },
          ],
        };
      case 'pest':
      default:
        return {
          id: 'init-pest',
          sender: 'agent',
          text: 'Hello! I am your Pest Doctor and Crop Health Specialist. Describe your crop symptoms or upload a leaf photo to diagnose diseases, identify insect pests, and get immediate organic or IPM treatments.',
          timestamp: time,
          quickActions: [
            { label: '🍅 Diagnose Leaf Spots', action: 'pest' },
            { label: '🐛 Stem Borer Control', action: 'pest' },
            { label: '🌿 Bio-Fungicide Solutions', action: 'pest' },
          ],
        };
    }
  };

  const theme = getTheme();
  const [messages, setMessages] = useState<ChatMessage[]>(() => [getDefaultMessage(currentMode)]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update initial greeting when currentMode changes if user hasn't engaged in dialogue yet
  useEffect(() => {
    setMessages((prev) => {
      const isInitialOnly = prev.length <= 1 && prev.every((m) => m.id.startsWith('init-'));
      if (isInitialOnly) {
        return [getDefaultMessage(currentMode)];
      }
      return prev;
    });
  }, [currentMode]);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const messageText = (textToSend || input).trim();
    if (!messageText || loading) return;

    setInput('');
    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const reply = await onSendMessage(messageText);
      const agentMsg: ChatMessage = {
        id: 'agent-' + Date.now(),
        sender: 'agent',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        contextSnapshot: {
          crop: context.crop,
          pest: context.diagnosedDisease,
          verifiedProduct: context.recommendedProduct,
        },
      };
      setMessages((prev) => [...prev, agentMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          sender: 'agent',
          text: 'Notice: Could not reach central agricultural service. Please review your connection.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeak = (text: string) => {
    speechTTS.speak(text, language);
  };

  if (!isOpen) return null;

  return (
    <aside className={`fixed bottom-4 right-4 z-50 w-full max-w-md h-[580px] bg-neutral-900/95 backdrop-blur-xl border ${theme.borderColor} rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up`}>
      {/* Header */}
      <div className={`bg-gradient-to-r ${theme.headerBg} border-b border-neutral-800/40 p-3.5 flex items-center justify-between`}>
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-lg ${theme.iconBg} flex items-center justify-center`}>
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white font-mono">{theme.title}</h3>
              <span className={`text-[10px] ${theme.activePill} px-1.5 py-0.2 rounded border`}>
                {theme.badge}
              </span>
            </div>
            <p className="text-[10px] text-neutral-300">
              Context: {context.crop || 'Field Crop'} {context.diagnosedDisease ? `• ${context.diagnosedDisease}` : ''}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800/80 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-end gap-1.5 max-w-[85%]">
              {m.sender === 'agent' && (
                <div className="w-6 h-6 rounded-full bg-neutral-900 border border-neutral-700/50 flex items-center justify-center text-neutral-300 shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`p-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                  m.sender === 'user'
                    ? `${theme.bubbleBg} text-white rounded-br-none shadow-md`
                    : 'bg-neutral-950 border border-neutral-800 text-neutral-200 rounded-bl-none'
                }`}
              >
                {m.text}

                {/* Audio playback button for agent responses */}
                {m.sender === 'agent' && (
                  <button
                    onClick={() => handleSpeak(m.text)}
                    className="mt-2 flex items-center gap-1 text-[10px] text-emerald-400 hover:text-emerald-300 transition"
                    title="Listen in your language"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>Listen</span>
                  </button>
                )}
              </div>
            </div>

            {/* Quick Actions (if present) */}
            {m.quickActions && (
              <div className="flex flex-wrap gap-1.5 mt-2 ml-8">
                {m.quickActions.map((qa, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      onNavigateTo(qa.action as any);
                    }}
                    className="bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200 hover:text-white border border-neutral-700/60 px-2.5 py-1 rounded-full text-[11px] transition cursor-pointer"
                  >
                    {qa.label}
                  </button>
                ))}
              </div>
            )}

            <span className="text-[9px] text-neutral-500 mt-1 px-1">{m.timestamp}</span>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-neutral-400 text-xs italic bg-neutral-950/60 p-2.5 rounded-xl border border-neutral-800 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            FarMate AI is consulting agronomic databases...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-neutral-950 border-t border-neutral-800 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about leaf spots, dosages, or chemical safety..."
          className="flex-1 bg-neutral-900 border border-neutral-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className={`p-2.5 ${theme.sendBtn} disabled:opacity-50 text-white rounded-xl transition cursor-pointer`}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </aside>
  );
};
