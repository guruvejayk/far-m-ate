import React, { useState, useEffect } from 'react';
import {
  X,
  Mic,
  Volume2,
  AlertCircle,
  RefreshCw,
  Send,
  Radio,
  Sparkles,
  Globe,
  Play,
  Languages,
  Sliders,
  CheckCircle2,
  BookOpen,
  VolumeX,
  Bot,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { AIOrb3D } from '../3d/AIOrb3D';
import { LanguageCode, VoiceState, FarmContext } from '../../types';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../../lib/i18n/languages';
import { speechSTT, speechTTS, GeminiTTSProvider, TTSEngineType } from '../../lib/voice/speech';
import { DIALECT_SPEECH_GUIDES, SPEECH_TRAINING_DATABASES } from '../../data/indicSpeechDatabases';
import { AUDIO_SYNTHESIS_BENCHMARK_DATASET, AWESOME_MULTILINGUAL_LLM_REGISTRY } from '../../data/multilingualDatasets';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  context: FarmContext;
  onSendMessage: (text: string) => Promise<string>;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  language,
  onSelectLanguage,
  context,
  onSendMessage,
}) => {
  const [activeTab, setActiveTab] = useState<'voice' | 'studio'>('voice');
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [transcript, setTranscript] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [manualText, setManualText] = useState<string>('');
  const [isPlayingSample, setIsPlayingSample] = useState<boolean>(false);

  // Studio State
  const [selectedEngine, setSelectedEngine] = useState<TTSEngineType>('auto');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.95);
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

  // Live Translation Studio State
  const [translationInput, setTranslationInput] = useState<string>('Mix 30ml Chlorpyrifos in 15L knapsack tank with safety gloves.');
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [translationResult, setTranslationResult] = useState<{
    translatedText: string;
    phoneticPronunciation?: string;
    dialectRegion?: string;
    vernacularKeyTerms?: Array<{ term: string; translated: string; phonetic: string }>;
    groundedDatasets?: string[];
  } | null>(null);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const dialectGuide = DIALECT_SPEECH_GUIDES[language] || DIALECT_SPEECH_GUIDES.en;
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  // Benchmark for this language
  const benchmarkItem = AUDIO_SYNTHESIS_BENCHMARK_DATASET.find((b) => b.languageCode === language) ||
    AUDIO_SYNTHESIS_BENCHMARK_DATASET[0];

  useEffect(() => {
    if (!isOpen) {
      speechSTT.stopListening();
      speechTTS.stop();
      setVoiceState('idle');
      setIsPlayingSample(false);
      setActiveAudioId(null);
    }
  }, [isOpen]);

  useEffect(() => {
    GeminiTTSProvider.setPreferredEngine(selectedEngine);
  }, [selectedEngine]);

  if (!isOpen) return null;

  const handleStartListening = () => {
    setErrorMsg(null);
    setVoiceState('listening');
    setTranscript('');
    setAiResponse('');

    speechSTT.startListening(
      language,
      async (spokenText) => {
        setTranscript(spokenText);
        setVoiceState('thinking');

        try {
          const reply = await onSendMessage(spokenText);
          setAiResponse(reply);
          setVoiceState('speaking');

          await speechTTS.speak(
            reply,
            language,
            () => {
              setVoiceState('idle');
            },
            selectedEngine,
            playbackSpeed
          );
        } catch (err: any) {
          setErrorMsg('Could not process voice query.');
          setVoiceState('error');
        }
      },
      (error) => {
        setErrorMsg(error);
        setVoiceState('error');
      }
    );
  };

  const handleStopListening = () => {
    speechSTT.stopListening();
    if (voiceState === 'listening') {
      setVoiceState('idle');
    }
  };

  const handlePlayDialectGreeting = async () => {
    if (isPlayingSample) {
      speechTTS.stop();
      setIsPlayingSample(false);
      return;
    }

    setIsPlayingSample(true);
    const sampleText = dialectGuide.honorificGreeting || `Welcome, farmer friend!`;
    setAiResponse(sampleText);
    setVoiceState('speaking');

    try {
      await speechTTS.speak(
        sampleText,
        language,
        () => {
          setIsPlayingSample(false);
          setVoiceState('idle');
        },
        selectedEngine,
        playbackSpeed
      );
    } catch {
      setIsPlayingSample(false);
      setVoiceState('idle');
    }
  };

  const handlePlayCustomPhrase = async (phrase: string, id: string) => {
    if (activeAudioId === id) {
      speechTTS.stop();
      setActiveAudioId(null);
      return;
    }

    setActiveAudioId(id);
    setVoiceState('speaking');
    try {
      await speechTTS.speak(
        phrase,
        language,
        () => {
          setActiveAudioId(null);
          setVoiceState('idle');
        },
        selectedEngine,
        playbackSpeed
      );
    } catch {
      setActiveAudioId(null);
      setVoiceState('idle');
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualText.trim()) return;

    const query = manualText;
    setManualText('');
    setTranscript(query);
    setVoiceState('thinking');

    try {
      const reply = await onSendMessage(query);
      setAiResponse(reply);
      setVoiceState('speaking');

      await speechTTS.speak(
        reply,
        language,
        () => {
          setVoiceState('idle');
        },
        selectedEngine,
        playbackSpeed
      );
    } catch (err) {
      setErrorMsg('Error contacting farm AI agent.');
      setVoiceState('error');
    }
  };

  const handleTranslateAndSpeak = async () => {
    if (!translationInput.trim()) return;
    setIsTranslating(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: translationInput,
          sourceLanguage: 'en',
          targetLanguage: language,
        }),
      });

      if (!res.ok) throw new Error('Translation failed');
      const data = await res.json();
      setTranslationResult(data);

      if (data.translatedText) {
        setVoiceState('speaking');
        await speechTTS.speak(
          data.translatedText,
          language,
          () => {
            setVoiceState('idle');
          },
          selectedEngine,
          playbackSpeed
        );
      }
    } catch (err: any) {
      console.warn('Live translation error:', err);
      setErrorMsg('Translation failed. Check network.');
    } finally {
      setIsTranslating(false);
    }
  };

  const getStateDescription = () => {
    switch (voiceState) {
      case 'listening':
        return t.voiceListening || 'Listening... Please speak now';
      case 'processing':
        return t.voiceProcessing || 'Processing voice audio...';
      case 'thinking':
        return t.voiceThinking || 'AI Consulting Agricultural Knowledge Base...';
      case 'speaking':
        return `${t.voiceSpeaking || 'Speaking via'} ${
          GeminiTTSProvider.getLastEngineUsed() === 'google-tts'
            ? 'Google TTS (Regional Human Accent)'
            : GeminiTTSProvider.getLastEngineUsed() === 'gemini-tts'
            ? `Gemini 3.1 Flash Voice (${dialectGuide.geminiVoiceRecommendation.voiceName})`
            : 'Dialect Calibrated Voice'
        }`;
      case 'error':
        return errorMsg || t.voiceError || 'Audio notice occurred';
      default:
        return t.voiceIdle || 'Ready. Click microphone to speak';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-emerald-500/30 rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden flex flex-col text-neutral-100 max-h-[92vh]">
        {/* Top Bar with Close */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-700/80 flex items-center justify-center text-white font-mono font-bold text-sm">
              <Sparkles className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-mono leading-tight">
                FAR[M]ATE Voice & Dialect Studio
              </h2>
              <p className="text-[11px] text-emerald-400 font-medium">
                Multilingual Speech Datasets & Agricultural Grounding
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab switch buttons */}
            <div className="flex items-center bg-neutral-950 p-1 rounded-xl border border-neutral-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('voice')}
                className={`px-3 py-1 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'voice'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Voice Advisor</span>
              </button>
              <button
                onClick={() => setActiveTab('studio')}
                className={`px-3 py-1 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'studio'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Accent & Datasets</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-full bg-neutral-800 hover:bg-neutral-700 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Language Selection & Active Engine Status Banner */}
        <div className="flex flex-wrap items-center justify-between gap-2 py-2.5 px-3 bg-neutral-950/80 border-b border-neutral-800 text-xs">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-neutral-400 font-medium">Language:</span>
            <select
              aria-label="Change voice language"
              value={language}
              onChange={(e) => onSelectLanguage(e.target.value as LanguageCode)}
              className="bg-neutral-800 border border-neutral-700 text-white font-bold rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-neutral-900 text-white">
                  {lang.name} ({lang.nativeName})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-neutral-300 font-mono text-[11px]">
              Engine: <strong className="text-emerald-400">{
                selectedEngine === 'auto'
                  ? 'Auto (Google TTS / Gemini)'
                  : selectedEngine === 'google-tts'
                  ? 'Google TTS (Crisp Human Accent)'
                  : selectedEngine === 'gemini-tts'
                  ? `Gemini 3.1 Flash (${dialectGuide.geminiVoiceRecommendation.voiceName})`
                  : 'Calibrated Dialect Speech'
              }</strong>
            </span>
          </div>
        </div>

        {/* Modal Body Container with Scroll */}
        <div className="flex-1 overflow-y-auto py-3 space-y-4 text-center">
          {activeTab === 'voice' ? (
            /* TAB 1: LIVE VOICE ASSISTANT */
            <div className="flex flex-col items-center">
              {/* Odia TV News Anchor / Actor Special Badge */}
              {language === 'or' && (
                <div className="w-full bg-amber-950/40 border border-amber-500/40 rounded-2xl p-3 flex items-center justify-between text-left text-xs mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center shrink-0 text-base">
                      🎙️
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-amber-300 font-bold text-xs">
                          ଓଡ଼ିଆ ଟେଲିଭିଜନ ନ୍ୟୁଜ୍ ରିପୋର୍ଟର ଓ ଅଭିନେତା ଶୈଳୀ
                        </span>
                        <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                          OTV / DD Odia Style
                        </span>
                      </div>
                      <span className="text-neutral-400 text-[11px] block mt-0.5">
                        Authoritative TV anchor cadence • Crisp retroflexes (ଡ଼, ଢ଼, ଳ) • Strict distinction from Bengali
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handlePlayDialectGreeting}
                    className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-500 text-white px-2.5 py-1.5 rounded-xl text-xs font-semibold shadow-sm transition active:scale-95 shrink-0 cursor-pointer"
                    title="Audition TV news anchor delivery"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isPlayingSample ? 'ବନ୍ଦ କରନ୍ତୁ' : 'ନ୍ୟୁଜ୍ ସ୍ୱର ଶୁଣନ୍ତୁ'}</span>
                  </button>
                </div>
              )}

              {/* Dialect region card */}
              <div className="w-full bg-neutral-950/70 border border-emerald-900/30 rounded-2xl p-3 flex items-center justify-between text-left text-xs mb-2">
                <div>
                  <span className="text-emerald-400 font-semibold block text-sm">
                    {dialectGuide.primaryDialectRegion}
                  </span>
                  <span className="text-neutral-400 text-[11px]">
                    Cadence: {dialectGuide.geminiVoiceRecommendation.toneStyle}
                  </span>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-neutral-500 font-mono">
                    <span>Datasets:</span>
                    <span className="text-emerald-500/90 font-medium">
                      {dialectGuide.referencedSpeechDatabases.slice(0, 2).join(' • ')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handlePlayDialectGreeting}
                    className="flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl text-xs font-semibold shadow-sm transition active:scale-95 cursor-pointer"
                    title="Audition native farmer greeting"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isPlayingSample ? 'Stop' : 'Test Accent'}</span>
                  </button>
                </div>
              </div>

              {/* 3D Visualizer Orb */}
              <div className="w-36 h-36 my-2 flex items-center justify-center">
                <AIOrb3D state={voiceState} />
              </div>

              {/* Audio State / Transcript / Response Card */}
              <div className="w-full bg-neutral-950/95 border border-neutral-800 rounded-2xl p-4 min-h-[100px] flex flex-col justify-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
                  {getStateDescription()}
                </p>

                {transcript && (
                  <p className="text-sm text-neutral-200 italic mb-2">
                    "{transcript}"
                  </p>
                )}

                {aiResponse && (
                  <div className="text-xs text-neutral-200 text-left bg-neutral-900/90 border border-emerald-900/40 p-3 rounded-xl max-h-36 overflow-y-auto leading-relaxed">
                    <span className="font-semibold text-emerald-400 block mb-1">
                      FAR[M]ATE ({currentLangObj.name}):
                    </span>
                    {aiResponse}
                  </div>
                )}

                {voiceState === 'speaking' && (
                  <div className="flex items-center justify-center gap-1.5 mt-2">
                    <span className="w-1 h-3 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 h-5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 h-6 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="w-1 h-4 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '100ms' }} />
                    <span className="w-1 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '250ms' }} />
                  </div>
                )}
              </div>

              {/* Microphone & Stop Action Buttons */}
              <div className="flex items-center gap-4 my-3">
                {voiceState !== 'listening' ? (
                  <button
                    onClick={handleStartListening}
                    className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white px-7 py-3 rounded-full font-bold shadow-xl shadow-emerald-950/60 transition active:scale-95 cursor-pointer"
                  >
                    <Mic className="w-5 h-5" />
                    <span>{t.voiceStartSpeaking || 'Start Speaking'}</span>
                  </button>
                ) : (
                  <button
                    onClick={handleStopListening}
                    className="flex items-center gap-2.5 bg-rose-600 hover:bg-rose-500 text-white px-7 py-3 rounded-full font-bold shadow-xl shadow-rose-950/60 transition active:scale-95 cursor-pointer animate-pulse"
                  >
                    <Mic className="w-5 h-5" />
                    <span>{t.voiceStopSpeaking || 'Stop Listening'}</span>
                  </button>
                )}

                {voiceState === 'speaking' && (
                  <button
                    onClick={() => {
                      speechTTS.stop();
                      setVoiceState('idle');
                      setIsPlayingSample(false);
                      setActiveAudioId(null);
                    }}
                    className="p-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-full transition cursor-pointer"
                    title="Mute Audio"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Fallback Text Input Form */}
              <form onSubmit={handleManualSubmit} className="w-full flex items-center gap-2 mt-1">
                <input
                  type="text"
                  placeholder={
                    language === 'hi'
                      ? 'या कृषि प्रश्न यहाँ टाइप करें...'
                      : language === 'te'
                      ? 'లేదా మీ వ్యవసాయ ప్రశ్నను ఇక్కడ టైప్ చేయండి...'
                      : language === 'ta'
                      ? 'அல்லது உங்கள் கேள்வியை தட்டச்சு செய்க...'
                      : 'Or type agricultural question...'
                  }
                  value={manualText}
                  onChange={(e) => setManualText(e.target.value)}
                  className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* Quick Prompt Chips */}
              <div className="w-full flex flex-wrap items-center justify-center gap-1.5 mt-3">
                {[
                  language === 'or' ? 'କୃଷି ସମାଚାର ବୁଲେଟିନ୍ ପଚାରନ୍ତୁ' : (dialectGuide.honorificGreeting?.slice(0, 32) || 'Hello Farmer'),
                  language === 'or' ? 'ଧାନ କାଣ୍ଡବିନ୍ଧା ପୋକ ନିୟନ୍ତ୍ରଣ' :
                  language === 'te' ? 'వరి కాండం తొలుచు పురుగు నివారణ' :
                  language === 'hi' ? 'टमाटर की अगेती झुलसा का उपचार' :
                  language === 'ta' ? 'பூச்சிக்கொல்லி சரிபார்ப்பு' :
                  'Pesticide dilution in 15L tank',
                  language === 'or' ? '୧୫ ଲିଟର ଟାଙ୍କି ସଠିକ୍ ମାପ' : 'How to verify genuine CIBRC seal?',
                  language === 'or' ? 'ନକଲି କୀଟନାଶକ ସତର୍କତା' : 'Pesticide dilution in 15L tank',
                ].map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setManualText(chip);
                    }}
                    className="text-[11px] bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 px-2.5 py-1 rounded-lg transition cursor-pointer"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* TAB 2: DIALECT & ACCENT STUDIO */
            <div className="space-y-4 text-left">
              {/* Section 1: Engine & Cadence Controls */}
              <div className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                      Speech Synthesis Engine & Cadence
                    </h3>
                  </div>
                  <span className="text-[11px] text-neutral-400">
                    Voice: <strong className="text-amber-300">{dialectGuide.geminiVoiceRecommendation.voiceName}</strong>
                  </span>
                </div>

                {/* Engine Selector Radio Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    {
                      id: 'auto',
                      title: 'Auto Multi-Engine',
                      desc: 'Google TTS + Gemini 3.1 Flash fallback',
                      badge: 'Recommended',
                    },
                    {
                      id: 'google-tts',
                      title: 'Google TTS',
                      desc: 'High clarity native human regional accents',
                      badge: 'Crisp Accent',
                    },
                    {
                      id: 'gemini-tts',
                      title: 'Gemini 3.1 Flash Voice',
                      desc: `Models Puck, Zephyr, Kore, Charon (${dialectGuide.geminiVoiceRecommendation.voiceName})`,
                      badge: 'Neural AI',
                    },
                    {
                      id: 'calibrated-client',
                      title: 'Calibrated Dialect Speech',
                      desc: 'SpeechSynthesis tuned with pitch & rate offsets',
                      badge: 'Offline Safe',
                    },
                  ].map((engine) => (
                    <div
                      key={engine.id}
                      onClick={() => setSelectedEngine(engine.id as TTSEngineType)}
                      className={`p-2.5 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                        selectedEngine === engine.id
                          ? 'bg-emerald-950/70 border-emerald-500 text-white'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs">{engine.title}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                          selectedEngine === engine.id
                            ? 'bg-emerald-600 text-white'
                            : 'bg-neutral-800 text-neutral-400'
                        }`}>
                          {engine.badge}
                        </span>
                      </div>
                      <p className="text-[10px] text-neutral-400 leading-tight">
                        {engine.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Speed Controls */}
                <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80 text-xs">
                  <span className="text-neutral-400 font-medium">Cadence / Speaking Speed:</span>
                  <div className="flex items-center gap-1.5">
                    {[
                      { rate: 0.85, label: '0.85x (Slow & Clear for Field)' },
                      { rate: 0.95, label: '0.95x (Farmer Cadence)' },
                      { rate: 1.05, label: '1.05x (Brisk)' },
                    ].map((sp) => (
                      <button
                        key={sp.rate}
                        onClick={() => setPlaybackSpeed(sp.rate)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                          playbackSpeed === sp.rate
                            ? 'bg-emerald-600 text-white'
                            : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
                        }`}
                      >
                        {sp.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 2: Ground-Truth Audio Benchmark for Active Language */}
              <div className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-amber-400" />
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                      Ground-Truth Audio Synthesis Benchmark
                    </h3>
                  </div>
                  <span className="text-[10px] bg-amber-950/80 text-amber-300 border border-amber-700/60 font-mono font-bold px-2 py-0.5 rounded-full">
                    Benchmark {benchmarkItem.id}
                  </span>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-white truncate max-w-[280px]">
                      {benchmarkItem.speakerProfile} • {benchmarkItem.regionalDialect}
                    </span>
                    <span className="text-emerald-400 font-mono font-bold shrink-0">
                      MOS Score: {benchmarkItem.targetMOS}/5.0 • Clarity: {benchmarkItem.phonemeClarityIndex}%
                    </span>
                  </div>

                  <p className="text-neutral-300 italic text-[11px] bg-neutral-950/60 p-2.5 rounded-lg border border-neutral-800/80">
                    "{benchmarkItem.transcript}"
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="text-[10px] text-neutral-400">
                      Noise profile: <span className="text-neutral-300">{benchmarkItem.acousticEnvironment}</span> • Terminology: <span className="text-emerald-400 font-bold">{benchmarkItem.agriculturalTerminologyAccuracy}%</span>
                    </div>

                    <button
                      onClick={() => handlePlayCustomPhrase(benchmarkItem.transcript, 'benchmark')}
                      className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold px-3 py-1.5 rounded-lg text-xs transition active:scale-95 cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{activeAudioId === 'benchmark' ? 'Stop Benchmark' : 'Audition Benchmark'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Section 3: Vernacular Agronomic Terms & Phonetic Accents */}
              <div className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                      Regional Vernacular Terms & Phonetics ({currentLangObj.name})
                    </h3>
                  </div>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    {dialectGuide.speechLocale}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {dialectGuide.vernacularTerms.map((term, idx) => (
                    <div
                      key={idx}
                      className="bg-neutral-900 border border-neutral-800/90 rounded-xl p-2.5 flex items-center justify-between gap-2 hover:border-emerald-800/60 transition"
                    >
                      <div className="min-w-0">
                        <span className="text-emerald-300 font-bold text-xs block truncate">
                          {term.regionalVernacular}
                        </span>
                        <span className="text-neutral-400 text-[10px] block">
                          {term.standardEnglish}
                        </span>
                        <span className="text-neutral-500 text-[10px] font-mono italic block">
                          [{term.phoneticPronunciation}]
                        </span>
                      </div>

                      <button
                        onClick={() => handlePlayCustomPhrase(term.regionalVernacular, `term-${idx}`)}
                        className="p-2 bg-neutral-800 hover:bg-emerald-800 text-white rounded-lg transition active:scale-95 shrink-0 cursor-pointer"
                        title={`Listen to pronunciation of ${term.regionalVernacular}`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Phonetic & Rural Intonation Notes */}
                <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-3 text-[11px] space-y-1 text-neutral-300">
                  <p>
                    <strong className="text-emerald-400">Phonetic Articulation:</strong>{' '}
                    {dialectGuide.phoneticGuidelines}
                  </p>
                  <p>
                    <strong className="text-amber-400">Rural Intonation Notes:</strong>{' '}
                    {dialectGuide.ruralIntonationNotes}
                  </p>
                </div>
              </div>

              {/* Section 4: Live Agricultural Translator & Speech Synthesis */}
              <div className="bg-neutral-950/80 border border-emerald-900/30 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Languages className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                      Live Multilingual Agronomic Translator
                    </h3>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono">
                    Grounded in AI4Bharat IndicTrans2 & Bhashini
                  </span>
                </div>

                <p className="text-[11px] text-neutral-400">
                  Type any crop advisory, dosage formula, or safety warning in English and hear it accurately translated and spoken with authentic local accent:
                </p>

                <div className="space-y-2">
                  <textarea
                    rows={2}
                    value={translationInput}
                    onChange={(e) => setTranslationInput(e.target.value)}
                    placeholder="Enter English advisory to translate and synthesize..."
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 font-sans"
                  />

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-[10px] text-neutral-500">
                      <span>Presets:</span>
                      <button
                        onClick={() => setTranslationInput('Spray 15L knapsack tank with 30ml Chlorpyrifos using safety gloves and goggles.')}
                        className="text-emerald-400 hover:underline cursor-pointer"
                      >
                        15L Tank Dilution
                      </button>
                      <span>•</span>
                      <button
                        onClick={() => setTranslationInput('Check the 3D diffractive hologram seal for authentic CIBRC registration number.')}
                        className="text-emerald-400 hover:underline cursor-pointer"
                      >
                        Counterfeit Verification
                      </button>
                    </div>

                    <button
                      onClick={handleTranslateAndSpeak}
                      disabled={isTranslating}
                      className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition active:scale-95 disabled:opacity-50 cursor-pointer"
                    >
                      {isTranslating ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Translating...</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Translate & Speak in {currentLangObj.name}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Translation Output Card */}
                {translationResult && (
                  <div className="bg-neutral-900 border border-emerald-800/50 rounded-xl p-3.5 space-y-2 animate-fade-in text-xs">
                    <div className="flex items-center justify-between text-[11px] text-emerald-400 font-semibold border-b border-neutral-800 pb-1.5">
                      <span>Native Output ({currentLangObj.nativeName}):</span>
                      <button
                        onClick={() => handlePlayCustomPhrase(translationResult.translatedText, 'trans')}
                        className="flex items-center gap-1 text-emerald-300 hover:text-white cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Replay Audio</span>
                      </button>
                    </div>

                    <p className="text-sm font-bold text-white leading-relaxed">
                      {translationResult.translatedText}
                    </p>

                    {translationResult.phoneticPronunciation && (
                      <p className="text-[11px] text-neutral-400 font-mono italic">
                        Phonetic: "{translationResult.phoneticPronunciation}"
                      </p>
                    )}

                    {translationResult.groundedDatasets && (
                      <div className="text-[10px] text-neutral-500 pt-1 flex items-center gap-1 flex-wrap">
                        <span>Grounded in:</span>
                        {translationResult.groundedDatasets.map((ds, i) => (
                          <span key={i} className="bg-neutral-800 text-emerald-300 px-1.5 py-0.5 rounded text-[9px] font-mono">
                            {ds}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Section 5: Grounded Datasets Directory References */}
              <div className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Referenced Agronomic Speech Corpora
                  </h3>
                </div>

                <p className="text-[11px] text-neutral-400">
                  This system integrates acoustic, phonetic, and translation corpora specifically calibrated for rural smallholders:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {dialectGuide.referencedSpeechDatabases.map((db, i) => (
                    <div key={i} className="bg-neutral-900 border border-neutral-800 p-2 rounded-xl flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="text-[11px] text-neutral-200">{db}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info strip */}
        <div className="pt-3 border-t border-neutral-800 text-[11px] text-neutral-500 flex flex-wrap justify-between items-center gap-2">
          <span>
            {t.crop || 'Crop'}: <strong className="text-neutral-300">{context.crop || 'All Crops'}</strong> •{' '}
            Advisory: <strong className="text-neutral-300">{context.diagnosedDisease || 'General Agronomy'}</strong>
          </span>
          <span className="text-emerald-400 font-mono">
            {dialectGuide.speechLocale} • {dialectGuide.primaryDialectRegion.slice(0, 30)}...
          </span>
        </div>
      </div>
    </div>
  );
};

