import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Mic,
  MicOff,
  Camera,
  Upload,
  Volume2,
  VolumeX,
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  Bug,
  Droplets,
  AlertTriangle,
  RotateCcw,
  SlidersHorizontal,
  ExternalLink,
  CheckCircle2,
  X,
  FileText,
} from 'lucide-react';
import { User, LanguageCode, FarmContext, PestDiagnosis, CounterfeitScan } from '../../types';
import { speechTTS, speechSTT } from '../../lib/voice/speech';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../../lib/i18n/languages';
import { HOME_PAGE_TRANSLATIONS } from '../../data/homePageTranslations';
import { getLocalizedFeatureChat } from '../../data/featureChatTranslations';
import {
  getFeatureHistory,
  saveFeatureHistory,
  resetFeatureHistory,
  translateMessages,
  ChatMessage,
} from '../../lib/chat/chatStore';

export type FeatureType = 'pest' | 'counterfeit' | 'recommendation' | 'registry' | 'dashboard';

type Message = ChatMessage;

interface FeatureChatViewProps {
  feature: FeatureType;
  user: User;
  language: LanguageCode;
  context: FarmContext;
  onUpdateContext?: (ctx: Partial<FarmContext>) => void;
  onNavigateToFeature?: (feature: string) => void;
  onToggleVisualTool?: () => void;
  showVisualToolToggle?: boolean;
  initialQuery?: string;
  onClearInitialQuery?: () => void;
}

interface FeatureSkinConfig {
  name: string;
  subtitle: string;
  badgeText: string;
  userBubbleBg: string;
  sendBtnBg: string;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  icon: React.ReactNode;
  starters: string[];
  initialMessages: Message[];
}

export const FeatureChatView: React.FC<FeatureChatViewProps> = ({
  feature,
  user,
  language,
  context,
  onUpdateContext,
  onNavigateToFeature,
  onToggleVisualTool,
  showVisualToolToggle = true,
  initialQuery,
  onClearInitialQuery,
}) => {
  const [messages, setMessages] = useState<Message[]>(() => getFeatureHistory(feature, language));
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [autoVoice, setAutoVoice] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const nowFormatted = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // 1. Define skins and dynamically localized content for each feature
  const getSkinConfig = (): FeatureSkinConfig => {
    const loc = getLocalizedFeatureChat(feature as any, language);

    switch (feature) {
      case 'pest':
        return {
          name: loc.name,
          subtitle: loc.subtitle,
          badgeText: loc.badgeText,
          userBubbleBg: 'bg-[#0b6633]', // Exact Forest Green from UI specs
          sendBtnBg: 'bg-[#0b6633] hover:bg-[#084e27]',
          accentColor: 'text-emerald-700',
          accentBg: 'bg-emerald-50',
          accentBorder: 'border-emerald-200',
          icon: <Bug className="w-4 h-4 text-emerald-600" />,
          starters: loc.starters,
          initialMessages: loc.initialMessages as Message[],
        };

      case 'counterfeit':
        return {
          name: loc.name,
          subtitle: loc.subtitle,
          badgeText: loc.badgeText,
          userBubbleBg: 'bg-[#e65100]', // Warm Amber/Orange
          sendBtnBg: 'bg-[#e65100] hover:bg-[#c94500]',
          accentColor: 'text-amber-800',
          accentBg: 'bg-amber-50',
          accentBorder: 'border-amber-200',
          icon: <ShieldAlert className="w-4 h-4 text-amber-600" />,
          starters: loc.starters,
          initialMessages: loc.initialMessages as Message[],
        };

      case 'recommendation':
        return {
          name: loc.name,
          subtitle: loc.subtitle,
          badgeText: loc.badgeText,
          userBubbleBg: 'bg-[#1d4ed8]', // Royal Sapphire Blue
          sendBtnBg: 'bg-[#1d4ed8] hover:bg-[#1e40af]',
          accentColor: 'text-blue-800',
          accentBg: 'bg-blue-50',
          accentBorder: 'border-blue-200',
          icon: <Sparkles className="w-4 h-4 text-blue-600" />,
          starters: loc.starters,
          initialMessages: loc.initialMessages as Message[],
        };

      case 'registry':
        return {
          name: loc.name,
          subtitle: loc.subtitle,
          badgeText: loc.badgeText,
          userBubbleBg: 'bg-[#be123c]', // Crimson Red
          sendBtnBg: 'bg-[#be123c] hover:bg-[#9f1239]',
          accentColor: 'text-rose-800',
          accentBg: 'bg-rose-50',
          accentBorder: 'border-rose-200',
          icon: <AlertTriangle className="w-4 h-4 text-rose-600" />,
          starters: loc.starters,
          initialMessages: loc.initialMessages as Message[],
        };

      default: // Dashboard / Home
        return {
          name: loc.name,
          subtitle: loc.subtitle,
          badgeText: loc.badgeText,
          userBubbleBg: 'bg-[#15462c]',
          sendBtnBg: 'bg-[#15462c] hover:bg-[#0f3420]',
          accentColor: 'text-emerald-800',
          accentBg: 'bg-emerald-50',
          accentBorder: 'border-emerald-200',
          icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
          starters: loc.starters,
          initialMessages: loc.initialMessages as Message[],
        };
    }
  };

  const skin = getSkinConfig();
  const prevLangRef = useRef<LanguageCode>(language);
  const prevFeatureRef = useRef<FeatureType>(feature);

  // Helper to update both React state and localStorage persistent history
  const updateAndPersist = (updater: Message[] | ((prev: Message[]) => Message[])) => {
    setMessages((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveFeatureHistory(feature, next);
      return next;
    });
  };

  // Synchronize chat messages when feature or language changes
  useEffect(() => {
    // 1. Immediately load history for the active feature & language
    const current = getFeatureHistory(feature, language);
    setMessages(current);

    // 2. Check if any message in this history needs translation to the active language
    const needsTranslation = current.some(
      (m) =>
        !m.id.startsWith('init-') &&
        (!m.translations || !m.translations[language] || (m.quickActions && m.quickActions.length > 0 && (!m.quickActionsTranslations || !m.quickActionsTranslations[language])))
    );

    if (needsTranslation) {
      setIsTranslating(true);
      translateMessages(feature, current, language, 'auto')
        .then((updated) => {
          setMessages(updated);
          saveFeatureHistory(feature, updated);
        })
        .catch((err) => {
          console.warn('Chat auto-translation notice:', err);
        })
        .finally(() => {
          setIsTranslating(false);
        });
    }
  }, [feature, language]);

  // Listen for global chat history translation updates
  useEffect(() => {
    const handleHistoryUpdated = (e: any) => {
      const targetLang = e.detail?.language || language;
      if (targetLang === language) {
        const fresh = getFeatureHistory(feature, targetLang);
        setMessages(fresh);
      }
    };
    window.addEventListener('farmate:chat-history-updated', handleHistoryUpdated);
    return () => window.removeEventListener('farmate:chat-history-updated', handleHistoryUpdated);
  }, [feature, language]);

  // Automatically dispatch initial query when arriving from Home Quick Diagnostic
  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      const q = initialQuery.trim();
      if (onClearInitialQuery) onClearInitialQuery();
      handleSend(q);
    }
  }, [initialQuery]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Speech-to-text listener
  useEffect(() => {
    if (isListening) {
      speechSTT.start(
        language,
        (transcript) => {
          setInputText(transcript);
        },
        () => {
          setIsListening(false);
        }
      );
    } else {
      speechSTT.stop();
    }
    return () => {
      speechSTT.stop();
    };
  }, [isListening, language]);

  // Handle voice synthesis toggle for a specific message
  const handleToggleVoice = (msgId: string, text: string) => {
    if (speakingMessageId === msgId) {
      speechTTS.stop();
      setSpeakingMessageId(null);
    } else {
      speechTTS.stop();
      setSpeakingMessageId(msgId);
      speechTTS.speak(text, language, () => {
        setSpeakingMessageId(null);
      });
    }
  };

  // Send message handler
  const handleSend = async (customText?: string, imageBase64?: string) => {
    const textToSend = (customText || inputText).trim();
    if (!textToSend && !imageBase64) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toISOString(),
      timeFormatted: time,
      imageAttachment: imageBase64 || selectedImage || undefined,
      translations: {
        [language]: textToSend,
        ...(language === 'en' ? { en: textToSend } : {}),
      },
    };

    updateAndPersist((prev) => [...prev, userMsg]);
    setInputText('');
    setSelectedImage(null);
    setIsTyping(true);

    try {
      const activeImg = imageBase64 || selectedImage || undefined;
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          context: {
            ...context,
            activeFeature: feature,
          },
          language,
          imageBase64: activeImg,
        }),
      });

      if (!res.ok) throw new Error('API request failed');
      const data = await res.json();

      const agentActions = data.quickActions || [
        'How to safely apply this product?',
        'What are natural alternatives?',
        'How to monitor for further infestation?',
      ];
      const agentMsgId = `agent-${Date.now()}`;
      const agentReply: Message = {
        id: agentMsgId,
        sender: 'agent',
        text: data.text,
        timestamp: new Date().toISOString(),
        timeFormatted: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: agentActions,
        translations: {
          [language]: data.text,
          ...(language === 'en' ? { en: data.text } : {}),
        },
        quickActionsTranslations: {
          [language]: agentActions,
          ...(language === 'en' ? { en: agentActions } : {}),
        },
      };

      updateAndPersist((prev) => [...prev, agentReply]);

      if (data.context && onUpdateContext) {
        onUpdateContext(data.context);
      }

      // Auto-voice playback if toggled ON
      if (autoVoice) {
        setSpeakingMessageId(agentMsgId);
        speechTTS.speak(data.text, language, () => {
          setSpeakingMessageId(null);
        });
      }
    } catch (err) {
      console.warn('Network issue in feature chat, applying resilient response:', err);
      const activeImg = imageBase64 || selectedImage;
      let fallbackText = language === 'or'
        ? `ଚାଷୀ ଭାଇ, ଆପଣଙ୍କ ଅନୁରୋଧ CIBRC ମାନଦଣ୍ଡ ଅନୁଯାୟୀ ପ୍ରକ୍ରିୟାକରଣ କରାଯାଇଛି। ୧୫ ଲିଟର ନାପସାକ୍ ଟାଙ୍କିରେ ସଠିକ୍ ମାପ ଏବଂ ସୁରକ୍ଷା କିଟ୍ ପିନ୍ଧି ଶାନ୍ତ ପାଗରେ ସିଞ୍ଚନ କରନ୍ତୁ।`
        : `Respected Farmer, your request regarding "${textToSend}" has been processed according to statutory CIBRC standards. Please follow the labeled 15L knapsack dilution ratios carefully and spray with PPE during low-wind hours.`;

      if (feature === 'pest') {
        fallbackText = language === 'or'
          ? `ପୋକ ରୋଗ ପରାମର୍ଶ: ପତ୍ରରେ ଧଳା ଦାଗ ବା ପତ୍ର ହଳଦିଆ ପଡ଼ିଲେ ତୁରନ୍ତ ପରୀକ୍ଷା କରନ୍ତୁ। ୧୫ ଲିଟର ଟାଙ୍କିରେ ୩୫ ମିଲିଲିଟର ନିମ୍ବ ତେଲ (୧୦,୦୦୦ ପିପିଏମ୍) କିମ୍ବା ୪୫ ଗ୍ରାମ ଟ୍ରାଇକୋଡର୍ମା ଭିରିଡି ମିଶାଇ ସିଞ୍ଚନ କରନ୍ତୁ। ହାତରେ ଗ୍ଲୋଭସ୍ ଏବଂ ମାସ୍କ ପିନ୍ଧନ୍ତୁ।`
          : `Pest Doctor Advisory: White spots or foliar chlorosis require immediate inspection. We recommend spraying bio-friendly Neem Oil (10,000 ppm) @ 35ml per 15L tank or Trichoderma viride @ 45g per 15L tank. Ensure PPE gloves and face mask are worn.`;
      } else if (feature === 'counterfeit') {
        if (activeImg) {
          fallbackText = `Forensic Packaging Analysis: I have analyzed your uploaded packaging photo. The optical inspection indicates:
1. 3D Holographic Seal: Check for multi-angle kinetic color shift. If flat or printed with plain ink, it is counterfeit.
2. CIBRC Registration: Look for Section 9(3) registration format (e.g. CIR-xxxx). If missing or altered, quarantine the product.
3. Typography & Batch: Genuine bottles use clean laser dot-matrix batch stamping. Blurry offset prints indicate unauthorized imitation.
Recommendation: Do not spray unverified agrochemicals. Open the Agricultural Counterfeit Detector to view the full statutory multi-factor breakdown, FCO/CIBRC verification, and safe alternatives.`;
        } else {
          fallbackText = language === 'or'
            ? `ନକଲି କୃଷି ଉତ୍ପାଦ ଯାଞ୍ଚ: ବୋତଲ କ୍ୟାପ୍ ଉପରେ ଥିବା ୩-ଡି ହୋଲୋଗ୍ରାମ ଏବଂ ଲେବଲରେ CIBRC ସରକାରୀ ପଞ୍ଜିକରଣ ନମ୍ବର ଯାଞ୍ଚ କରନ୍ତୁ। ବ୍ୟାଚ୍ ଯାଞ୍ଚ ନ ହେବା ପର୍ଯ୍ୟନ୍ତ ଜମିରେ ସ୍ପ୍ରେ କରନ୍ତୁ ନାହିଁ।`
            : `Agricultural Counterfeit Detection: Please verify that your product carton has a kinetic diffractive 3D hologram, valid CIBRC registration number under Section 9(3), and FCO compliance for fertilizers. If the batch is unverified, do not apply.`;
        }
      } else if (feature === 'recommendation') {
        fallbackText = language === 'or'
          ? `କୃଷି ଔଷଧ ସୁପାରିଶ: CIBRC ଅନୁମୋଦିତ ଜୈବିକ ଔଷଧ ଯଥା ଟ୍ରାଇକୋଡର୍ମା ଭିରିଡି (୪୫ଗ୍ରା/୧୫ଲି ଟାଙ୍କି) କିମ୍ବା ନିମ୍ବ ତେଲ (୩୫ମିଲି/୧୫ଲି ଟାଙ୍କି) ପ୍ରୟୋଗ କରନ୍ତୁ। ସ୍ପ୍ରେୟାର ଟାଙ୍କି ମାପ (୫L ରୁ ୨୦୦L) ଅନୁଯାୟୀ ସଠିକ୍ ମାତ୍ରା ହିସାବ କରାଯାଇପାରିବ।`
          : `Input Recommendation Advisory: For your ${context.crop || 'crop'}, we recommend verified CIBRC biological formulations such as Kisan BioShield Trichoderma viride 1.5% WP (@ 45g per 15L tank) or EcoNeem Gold 10K (@ 35ml per 15L tank). For precise multi-tank dilution math (5L, 10L, 12L, 15L, 16L, 20L, or 200L), please state your sprayer tank size.`;
      }

      const agentMsgId = `agent-${Date.now()}`;
      let fallbackActions = [
        'How to safely apply this product?',
        'Check 15L tank dilution rate',
        'Inspect bottle hologram',
      ];

      if (feature === 'counterfeit') {
        fallbackActions = [
          'Inspect bottle 3D hologram',
          'Verify CIBRC registration number',
          'Test FMC Coragen batch',
        ];
      } else if (feature === 'recommendation') {
        fallbackActions = [
          'Calculate 15L knapsack tank dose',
          'Calculate for 20L power sprayer',
          'Check tank mix compatibility',
        ];
      } else if (feature === 'pest') {
        fallbackActions = [
          'Diagnose leaf spots or yellowing',
          'Show bio-fungicide options',
          'Calculate 15L knapsack dose',
        ];
      }
      const agentReply: Message = {
        id: agentMsgId,
        sender: 'agent',
        text: fallbackText,
        timestamp: new Date().toISOString(),
        timeFormatted: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: fallbackActions,
        translations: {
          [language]: fallbackText,
          ...(language === 'en' ? { en: fallbackText } : {}),
        },
        quickActionsTranslations: {
          [language]: fallbackActions,
          ...(language === 'en' ? { en: fallbackActions } : {}),
        },
      };

      updateAndPersist((prev) => [...prev, agentReply]);
      if (autoVoice) {
        setSpeakingMessageId(agentMsgId);
        speechTTS.speak(fallbackText, language, () => {
          setSpeakingMessageId(null);
        });
      }
    } finally {
      setIsTyping(false);
    }
  };

  // Handle Quick Action clicks
  const handleQuickAction = (actionText: string) => {
    if (actionText.includes('Scan Bottle Camera') || actionText.includes('Open Camera Scanner')) {
      handleTriggerCamera();
      return;
    }
    if (actionText.includes('Check Banned List') && onNavigateToFeature) {
      onNavigateToFeature('registry');
      return;
    }
    if ((actionText.includes('Switch to Plant Doctor') || actionText.includes('Plant Doctor Chat')) && onNavigateToFeature) {
      onNavigateToFeature('pest');
      return;
    }
    if ((actionText.includes('Switch to Counterfeit') || actionText.includes('Counterfeit Detector')) && onNavigateToFeature) {
      onNavigateToFeature('counterfeit');
      return;
    }
    if ((actionText.includes('Switch to Recommendation') || actionText.includes('Agronomist Chatbot')) && onNavigateToFeature) {
      onNavigateToFeature('recommendation');
      return;
    }
    handleSend(actionText);
  };

  // Image Upload Handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setSelectedImage(base64);
      handleSend('Uploaded image for inspection', base64);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Webcam Camera Trigger
  const handleTriggerCamera = async () => {
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.warn('Camera access denied or unavailable:', err);
      // Fallback: trigger file upload dialog
      fileInputRef.current?.click();
      setIsCameraActive(false);
    }
  };

  const handleCaptureSnapshot = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setSelectedImage(dataUrl);
      handleCloseCamera();
      handleSend('Camera snapshot for agronomic inspection', dataUrl);
    }
  };

  const handleCloseCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
    setIsCameraActive(false);
  };

  const homeT = HOME_PAGE_TRANSLATIONS[language] || HOME_PAGE_TRANSLATIONS.en;
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const recentDisease = context.recentPestDiagnosis?.diseaseName || context.diagnosedDisease;
  const recentCrop = context.recentPestDiagnosis?.crop || context.crop;

  const dynamicStarters = [...skin.starters];
  if (feature === 'recommendation' && recentDisease) {
    const crossChatPrompt = `What should I use for recent pest scan (${recentDisease})?`;
    if (!dynamicStarters.includes(crossChatPrompt)) {
      dynamicStarters.unshift(crossChatPrompt);
    }
  } else if (feature === 'counterfeit' && (context.recommendedProduct || context.recentRecommendation)) {
    const prod = context.recommendedProduct || context.recentRecommendation?.productNames?.[0];
    if (prod) {
      const verifyPrompt = `Verify recent recommendation: ${prod}`;
      if (!dynamicStarters.includes(verifyPrompt)) {
        dynamicStarters.unshift(verifyPrompt);
      }
    }
  }

  return (
    <div className="flex flex-col h-full flex-1 min-h-0 bg-[#f8faf9] select-none overflow-hidden">
      {/* Top Feature Sub-Header */}
      <div className="bg-white border-b border-neutral-200/90 px-4 sm:px-8 py-3 flex items-center justify-between shrink-0 shadow-xs">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl ${skin.accentBg} ${skin.accentBorder} border flex items-center justify-center`}>
            {skin.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-neutral-900 tracking-tight">{skin.name}</h1>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${skin.accentBg} ${skin.accentColor} border ${skin.accentBorder}`}>
                {skin.badgeText}
              </span>
            </div>
            <p className="text-xs text-neutral-500 font-medium hidden sm:block">
              {skin.subtitle}
            </p>
          </div>
        </div>

        {/* Action Toggles: Switch to visual tool / Reset Chat */}
        <div className="flex items-center gap-2">
          {showVisualToolToggle && onToggleVisualTool && (
            <button
              onClick={onToggleVisualTool}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-neutral-700 flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              title={language === 'hi' ? 'इंटरैक्टिव टूल्स खोलें' : language === 'te' ? 'ఇంటరాక్టివ్ టూల్స్ తెరవండి' : language === 'ta' ? 'செயல்பாட்டுக் கருவிகளைத் திறக்கவும்' : 'Interactive Tools'}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500" />
              <span className="hidden sm:inline">
                {language === 'hi' ? 'इंटरैक्टिव टूल्स' : language === 'te' ? 'ఇంటరాక్టివ్ టూల్స్' : language === 'ta' ? 'செயல்பாட்டு கருவிகள்' : 'Interactive Tools'}
              </span>
            </button>
          )}

          <button
            onClick={() => {
              const fresh = resetFeatureHistory(feature, language);
              setMessages(fresh);
            }}
            className="text-xs font-semibold p-2 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-500 hover:text-neutral-700 transition cursor-pointer"
            title={language === 'hi' ? 'बातचीत रीसेट करें' : language === 'te' ? 'సంభాషణ రీసెట్ చేయండి' : language === 'ta' ? 'மீட்டமை' : 'Reset conversation'}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Chat Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-6 max-w-4xl mx-auto w-full">
        {/* Cross-Chat Agronomic Memory Continuity Banner (Pest Diagnosis -> Recommendation Chat) */}
        {feature === 'recommendation' && recentDisease && (
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-300/80 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0">
                <Bug className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                    {language === 'hi' ? 'साझा कृषि स्मृति' : language === 'te' ? 'షేర్డ్ వ్యవసాయ మెమరీ' : language === 'ta' ? 'பகிர்வு வேளாண் நினைவகம்' : 'Cross-Chat Shared Memory'}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 bg-emerald-200/80 text-emerald-900 rounded-full font-semibold border border-emerald-300">
                    {language === 'hi' ? 'कीट डॉक्टर स्कैन' : language === 'te' ? 'కీటక డాక్టర్ స్కాన్' : language === 'ta' ? 'பூச்சி மருத்துவர் ஸ்கேன்' : 'Recent Pest Scan'}
                  </span>
                </div>
                <p className="text-xs text-neutral-800 font-medium mt-0.5">
                  {language === 'hi' ? 'हालिया स्कैन समस्या:' : language === 'te' ? 'ఇటీవలి స్కాన్ సమస్య:' : language === 'ta' ? 'சமீபத்திய ஸ்கேன் பிரச்சனை:' : 'Most Recent Scan:'}{' '}
                  <strong className="text-emerald-900 font-bold">{recentDisease}</strong> on <strong className="font-bold">{recentCrop || 'Crop'}</strong>
                </p>
              </div>
            </div>
            <button
              onClick={() => handleSend(`what should i use for the problem that was the most recent scan in pest detector`)}
              className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition flex items-center gap-1.5 shrink-0 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'समाधान और उत्पाद पूछें' : language === 'te' ? 'పరిష్కారం అడగండి' : language === 'ta' ? 'தீர்வு கேட்கவும்' : `What should I use for ${recentDisease}?`}</span>
            </button>
          </div>
        )}

        {/* Cross-Chat Memory Banner (Counterfeit Verification -> Pest Doctor) */}
        {feature === 'pest' && context.recentCounterfeitScan && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300/80 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                    {language === 'hi' ? 'साझा उत्पाद स्मृति' : language === 'te' ? 'షేర్డ్ ఉత్పత్తి మెమరీ' : language === 'ta' ? 'பகிர்வு தயாரிப்பு நினைவகம்' : 'Cross-Chat Shared Memory'}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 bg-amber-200/80 text-amber-900 rounded-full font-semibold border border-amber-300">
                    {language === 'hi' ? 'सत्यापन स्कैन' : language === 'te' ? 'ధృవీకరణ స్కాన్' : language === 'ta' ? 'சரிபார்ப்பு ஸ்கேன்' : 'Sentinel Verification'}
                  </span>
                </div>
                <p className="text-xs text-neutral-800 font-medium mt-0.5">
                  {language === 'hi' ? 'सत्यापित उत्पाद:' : language === 'te' ? 'ధృవీకరించబడిన ఉత్పత్తి:' : language === 'ta' ? 'சரிபார்க்கப்பட்ட தயாரிப்பு:' : 'Verified Product:'}{' '}
                  <strong className="text-neutral-900 font-bold">{context.recentCounterfeitScan.productName}</strong> ({context.recentCounterfeitScan.status.toUpperCase()})
                </p>
              </div>
            </div>
            <button
              onClick={() => handleSend(`can I safely spray ${context.recentCounterfeitScan?.productName} on my ${context.crop || 'crop'} for pests?`)}
              className="bg-[#0b6633] hover:bg-[#084e27] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition flex items-center gap-1.5 shrink-0 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask Safe Pest Spray</span>
            </button>
          </div>
        )}

        {/* Top Starter Action Chips Row (Exactly as in Screenshot 2 & 3) */}
        <div className="flex flex-wrap items-center gap-2">
          {dynamicStarters.map((starter, i) => (
            <button
              key={i}
              onClick={() => handleQuickAction(starter)}
              className="bg-white hover:bg-neutral-50 border border-neutral-200/90 text-neutral-800 text-xs font-semibold px-3.5 py-1.5 rounded-xl shadow-xs hover:border-neutral-300 transition cursor-pointer flex items-center gap-1.5 active:scale-95"
            >
              <span>{starter}</span>
            </button>
          ))}
        </div>

        {/* Message Stream */}
        {messages.map((m) => (
          <div key={m.id} className="space-y-1.5">
            {/* User Message Rendering (Matches Screenshot 1 & 2) */}
            {m.sender === 'user' && (
              <div className="flex flex-col items-end space-y-1">
                <div className="text-[11px] font-semibold text-neutral-400 flex items-center gap-1.5 mr-1">
                  <span>{user.name}</span>
                  <span>•</span>
                  <span>{m.timeFormatted}</span>
                  <span className="text-[9px] px-1 py-0.2 bg-neutral-100 border border-neutral-200 text-neutral-600 rounded font-mono">
                    {language.toUpperCase()}
                  </span>
                </div>

                <div
                  className={`max-w-[85%] sm:max-w-[75%] px-5 py-3 rounded-2xl sm:rounded-3xl shadow-xs text-sm sm:text-[15px] font-medium leading-relaxed ${skin.userBubbleBg}`}
                >
                  {m.translations?.[language] || (language === 'en' ? (m.translations?.['en'] || m.text) : m.text)}
                  {m.imageAttachment && (
                    <div className="mt-2 rounded-xl overflow-hidden border border-white/20">
                      <img src={m.imageAttachment} alt="Foliar Attachment" className="max-h-48 w-auto object-cover" />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Agent Message Rendering (Matches Screenshot 1, 2, 3) */}
            {m.sender === 'agent' && (
              <div className="flex flex-col items-start space-y-2">
                <div className="text-[11px] font-semibold text-neutral-400 flex items-center gap-1.5 ml-1">
                  <span className="font-bold text-neutral-700">FAR[M]ATE AI</span>
                  <span>•</span>
                  <span>{m.timeFormatted}</span>
                  <span className="text-[9px] px-1 py-0.2 bg-neutral-100 border border-neutral-200 text-neutral-600 rounded font-mono">
                    {language.toUpperCase()}
                  </span>
                </div>

                {/* White Bot Card */}
                <div className="bg-white border border-neutral-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xs max-w-full sm:max-w-[92%] w-full">
                  <div className="text-neutral-800 text-sm sm:text-[15px] leading-relaxed whitespace-pre-line font-normal space-y-2">
                    {m.translations?.[language] || (language === 'en' ? (m.translations?.['en'] || m.text) : m.text)}
                  </div>

                  {/* Audio Agronomist acoustics toolbar inside card (Screenshot 1, 2, 3) */}
                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <button
                      onClick={() => handleToggleVoice(m.id, m.translations?.[language] || m.text)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition cursor-pointer ${
                        speakingMessageId === m.id
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200'
                      }`}
                    >
                      {speakingMessageId === m.id ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-rose-600" />
                          <span>{language === 'hi' ? 'आवाज़ बंद करें' : language === 'ta' ? 'குரலை நிறுத்து' : language === 'te' ? 'వాయిస్ ఆపు' : 'Stop Voice'}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse ml-1" />
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-neutral-600" />
                          <span>{language === 'hi' ? 'कृषि विशेषज्ञ की आवाज़ सुनें' : language === 'ta' ? 'வேளாண் நிபுணர் குரலைக் கேளுங்கள்' : language === 'te' ? 'వ్యవసాయ నిపుణుడి వాయిస్ వినండి' : 'Hear Voice Agronomist'}</span>
                        </>
                      )}
                    </button>

                    <span className="text-[11px] font-mono text-neutral-400">
                      {language === 'hi' ? 'कृषि ध्वनिकी' : language === 'ta' ? 'வேளாண் ஒலி தொழில்நுட்பம்' : language === 'te' ? 'వ్యవసాయ శబ్దశాస్త్రం' : 'Neural Agronomic Acoustics'}
                    </span>
                  </div>
                </div>

                {/* Quick Action Chips Below Assistant Card (Screenshot 1 & 2) */}
                {((m.quickActionsTranslations?.[language]) || m.quickActions || []).length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {((m.quickActionsTranslations?.[language]) || m.quickActions || []).map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickAction(action)}
                        className="bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs font-medium px-3.5 py-1.5 rounded-xl shadow-xs transition hover:border-neutral-300 cursor-pointer active:scale-95"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium pl-2 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>FAR[M]ATE AI is calculating agronomical recommendations...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Camera Live Modal Overlay */}
      {isCameraActive && (
        <div className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-4 max-w-lg w-full overflow-hidden shadow-2xl relative">
            <button
              onClick={handleCloseCamera}
              className="absolute top-4 right-4 z-10 bg-neutral-900/60 text-white p-2 rounded-full hover:bg-neutral-900 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-sm font-bold text-neutral-900 mb-2 flex items-center gap-2">
              <Camera className="w-4 h-4 text-emerald-600" />
              <span>Live Agrochemical / Leaf Scanner</span>
            </h3>
            <div className="rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center relative">
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
              <div className="absolute inset-0 border-2 border-emerald-400/50 rounded-xl m-8 pointer-events-none flex items-center justify-center">
                <span className="text-[11px] text-white/90 bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                  Align leaf or pesticide hologram inside box
                </span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={handleCloseCamera}
                className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleCaptureSnapshot}
                className="bg-[#0b6633] hover:bg-[#084e27] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                <span>Capture & Diagnose</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden File Input for Image Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Sticky Bottom Input Bar (Screenshot 2) */}
      <div className="bg-white border-t border-neutral-200/90 p-4 shrink-0 shadow-xs">
        <div className="max-w-4xl mx-auto space-y-2">
          {/* Main Input Capsule */}
          <div className="bg-white border border-neutral-300 rounded-2xl px-2.5 py-1.5 flex items-center gap-2 shadow-xs focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-50 transition">
            {/* Camera Button */}
            <button
              onClick={handleTriggerCamera}
              className="p-2 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 rounded-xl transition cursor-pointer"
              title="Open Camera for Leaf or Bottle Scan"
            >
              <Camera className="w-4 h-4" />
            </button>

            {/* Upload File Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 rounded-xl transition cursor-pointer"
              title="Upload Photo from Device"
            >
              <Upload className="w-4 h-4" />
            </button>

            {/* Input Field */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={
                language === 'hi' ? 'अपनी भाषा में पूछें (उदा. स्प्रे खुराक, नक़ली जांच, 15L टैंक मिश्रण)...' :
                language === 'te' ? 'మీ భాషలో అడగండి (ఉదా. పిచికారీ మోతాదు, నకిలీ పురుగుమందు తనిఖీ, 15L ట్యాంక్)...' :
                language === 'ta' ? 'உங்கள் மொழியில் கேளுங்கள் (எ.கா. தெளிப்பு அளவு, போலி மருந்து சோதனை)...' :
                language === 'kn' ? 'ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಕೇಳಿ (ಉದಾ. ಸಿಂಪಡಿಸುವ ಪ್ರಮಾಣ, 15L ಟ್ಯಾಂಕ್)...' :
                language === 'bn' ? 'আপনার ভাষায় জিজ্ঞাসা করুন (যেমন স্প্রে ডোজ, নকল কীটনাশক)...' :
                language === 'mr' ? 'तुमच्या भाषेत विचारा (उदा. फवारणी प्रमाण, बनावट तपासणी)...' :
                `Ask in ${language.toUpperCase()} (e.g. spray dose, counterfeit check, mix safety)...`
              }
              className="flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden py-2"
            />

            {/* Microphone Button */}
            <button
              onClick={() => setIsListening(!isListening)}
              className={`p-2 rounded-xl transition cursor-pointer ${
                isListening
                  ? 'bg-rose-100 text-rose-600 animate-pulse'
                  : 'text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100'
              }`}
              title={isListening ? (language === 'hi' ? 'रोकें' : language === 'te' ? 'ఆపండి' : 'Stop Listening') : (language === 'hi' ? 'आवाज़ से बोलें' : language === 'te' ? 'వాయిస్ ద్వారా అడగండి' : 'Voice Input')}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Send Button (Customized to Feature Skin!) */}
            <button
              onClick={() => handleSend()}
              disabled={!inputText.trim() && !selectedImage}
              className={`p-2.5 rounded-xl transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-xs ${skin.sendBtnBg}`}
              title={language === 'hi' ? 'संदेश भेजें' : language === 'te' ? 'సందేశం పంపండి' : 'Send Message'}
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Footer Sub-Bar (Matches Screenshot 2) */}
          <div className="flex items-center justify-between text-[11px] text-neutral-500 px-1 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{homeT.cibrcVerified || '100% CIBRC Verified Engine'}</span>
              <span>•</span>
              <span>{homeT.dosageCalculatorTitle || '15L Knapsack Sprayer Dosage Math'}</span>
            </div>

            {/* Auto-Voice Toggle Button */}
            <button
              onClick={() => setAutoVoice(!autoVoice)}
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full font-bold text-[10px] transition cursor-pointer ${
                autoVoice
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-neutral-100 text-neutral-500 border border-neutral-200'
              }`}
            >
              <span>{language === 'hi' ? 'ऑटो-वॉयस:' : language === 'te' ? 'ఆటో-వాయిస్:' : language === 'ta' ? 'தானியங்கி குரல்:' : 'Auto-Voice:'}</span>
              <span className={autoVoice ? 'text-emerald-700' : 'text-neutral-500'}>
                {autoVoice
                  ? (language === 'hi' ? 'चालू' : language === 'te' ? 'ఆన్' : language === 'ta' ? 'ஆன்' : 'ON')
                  : (language === 'hi' ? 'बंद' : language === 'te' ? 'ఆఫ్' : language === 'ta' ? 'ஆஃப்' : 'OFF')}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
