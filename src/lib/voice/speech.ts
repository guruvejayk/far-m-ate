import { LanguageCode } from '../../types';
import { SUPPORTED_LANGUAGES } from '../i18n/languages';
import { DIALECT_SPEECH_GUIDES } from '../../data/indicSpeechDatabases';

export interface SpeechToTextProvider {
  startListening: (
    language: LanguageCode,
    onResult: (transcript: string) => void,
    onError: (error: string) => void
  ) => void;
  stopListening: () => void;
  isSupported: () => boolean;
}

export interface TextToSpeechProvider {
  speak: (text: string, language: LanguageCode, onEnd?: () => void) => Promise<void>;
  stop: () => void;
  isSupported: () => boolean;
}

class WebSpeechSTTProvider implements SpeechToTextProvider {
  private recognition: any = null;

  isSupported(): boolean {
    return typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
  }

  startListening(
    language: LanguageCode,
    onResult: (transcript: string) => void,
    onError: (error: string) => void
  ) {
    if (!this.isSupported()) {
      onError('Speech recognition is not natively supported in this browser session. You can type your question.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();

    const langInfo = SUPPORTED_LANGUAGES.find((l) => l.code === language);
    this.recognition.lang = langInfo?.speechLocale || 'en-US';
    this.recognition.continuous = false;
    this.recognition.interimResults = false;

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    this.recognition.onerror = (event: any) => {
      console.warn('Speech recognition event error:', event.error);
      onError(`Speech recognition notice: ${event.error || 'Check microphone permissions'}`);
    };

    try {
      this.recognition.start();
    } catch (err) {
      console.warn('Recognition start exception:', err);
    }
  }

  stopListening() {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (err) {
        // ignore
      }
    }
  }

  // Convenient aliases
  start(
    language: LanguageCode,
    onResult: (transcript: string) => void,
    onError?: (error: string) => void
  ) {
    this.startListening(language, onResult, onError || (() => {}));
  }

  stop() {
    this.stopListening();
  }
}

/**
 * Cleans text for natural human voice synthesis.
 * Strips all asterisks (*, **, ***), hashtags (#, ##, #tag), markdown annotations,
 * code markers, bracket links, and emojis so the voice never utters formatting noise.
 * Expands agricultural units, chemical formulations, and acronyms phonetically.
 */
export function cleanTextForSpeech(text: string, language: LanguageCode = 'en'): string {
  if (!text) return '';
  let clean = text;

  // 1. Strip markdown bold / italic formatting (e.g. **text**, *text*, ***text***)
  clean = clean.replace(/\*{1,4}([^*]+)\*{1,4}/g, '$1');
  // Strip any remaining stray asterisks and markdown symbols
  clean = clean.replace(/[*#_~`>\\|]/g, ' ');

  // 2. Strip headings and hashtag symbols (#, ##, ###, #tag)
  clean = clean.replace(/#{1,6}\s+/g, '');
  clean = clean.replace(/#([a-zA-Z0-9_\u0900-\u0DFF]+)/g, '$1');
  clean = clean.replace(/\b(hashtag|hashtags|asterisk|asterisks|हैशटैग|तारांकन)\b/gi, '');

  // 3. Strip code formatting and backticks
  clean = clean.replace(/`{1,3}[^`]*`{1,3}/g, '');
  clean = clean.replace(/`/g, '');

  // 4. Strip markdown links [text](url) -> text
  clean = clean.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  // 5. Strip HTML tags
  clean = clean.replace(/<[^>]*>/g, '');

  // 6. Strip bullet symbols, hyphens at line start, tildes, arrows
  clean = clean.replace(/^[ \t]*[-+•–—]\s+/gm, '');
  clean = clean.replace(/[~_=]/g, ' ');

  // 7. Strip emojis so speech engines never pronounce emoji names or code points
  clean = clean.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu, '');

  // If text is in an Indic/regional script, strip parenthetical Latin/English transliterations
  // (e.g. "(Namaskaar chaashi bhaaimaane!)") so the voice never switches accents mid-sentence
  if (language !== 'en' && /[\u0600-\u0DFF]/.test(clean)) {
    clean = clean.replace(/\([a-zA-Z0-9\s,.'’/–-]+\)/g, ' ');
  }

  // 8. Natural phonetic expansions for key agricultural abbreviations across Indic & international tongues
  clean = clean.replace(/\bCIBRC\b/gi, 
    language === 'hi' ? 'सी आई बी आर सी' : 
    language === 'te' ? 'సి ఐ బి ఆర్ సి' : 
    language === 'ta' ? 'சி ஐ பி ஆர் சி' : 
    language === 'kn' ? 'ಸಿ ಐ ಬಿ ಆರ್ ಸಿ' :
    language === 'bn' ? 'সি আই বি আর সি' : 
    language === 'or' ? 'ସି ଆଇ ବି ଆର ସି' : 'C-I-B-R-C');

  clean = clean.replace(/\b15\s*L\b|\b15-litre\b|\b15\s*litre\b/gi, 
    language === 'hi' ? '15 लीटर' : 
    language === 'te' ? '15 లీటర్ల' : 
    language === 'ta' ? '15 லிட்டர்' : 
    language === 'kn' ? '15 ಲೀಟರ್' :
    language === 'bn' ? '15 লিটার' :
    language === 'mr' ? '15 लिटर' :
    language === 'gu' ? '15 લિટર' :
    language === 'pa' ? '15 ਲੀਟਰ' :
    language === 'ml' ? '15 ലിറ്റർ' :
    language === 'or' ? '୧୫ ଲିଟର ଟାଙ୍କି' : '15 Litres');

  clean = clean.replace(/\bPPE\b/gi, 
    language === 'hi' ? 'सुरक्षा किट' : 
    language === 'te' ? 'రక్షణ కిట్' : 
    language === 'ta' ? 'பாதுகாப்பு கவசம்' : 
    language === 'kn' ? 'ರಕ್ಷಣಾ ಕಿಟ್' :
    language === 'bn' ? 'সুরক্ষা পোশাক' : 
    language === 'or' ? 'ସୁରକ୍ଷା କିଟ୍' : 'P-P-E protective kit');

  clean = clean.replace(/\bPHI\b/gi, 
    language === 'hi' ? 'कटाई पूर्व प्रतीक्षा समय' : 
    language === 'te' ? 'కోతకు ముందు వేచి ఉండే సమయం' : 
    language === 'ta' ? 'அறுவடை இடைவெளி' : 
    language === 'or' ? 'ଅମଳ ପୂର୍ବ ପ୍ରତୀକ୍ଷା ସମୟ' : 'pre-harvest waiting interval');

  // Formulations
  clean = clean.replace(/\b(\d+(?:\.\d+)?)\s*%\s*SL\b/gi, 
    language === 'hi' ? '$1 प्रतिशत एस एल' : 
    language === 'te' ? '$1 శాతం ఎస్ ఎల్' : 
    language === 'or' ? '$1 ପ୍ରତିଶତ ଏସ ଏଲ ତରଳ' : '$1 percent S-L liquid');
  clean = clean.replace(/\b(\d+(?:\.\d+)?)\s*%\s*WP\b/gi, 
    language === 'hi' ? '$1 प्रतिशत डब्लू पी' : 
    language === 'te' ? '$1 శాతం डబ్ల్యూ పి' : 
    language === 'or' ? '$1 ପ୍ରତିଶତ ଡବ୍ଲୁ ପି ପାଉଡର' : '$1 percent W-P powder');
  clean = clean.replace(/\b(\d+(?:\.\d+)?)\s*%\s*EC\b/gi, 
    language === 'hi' ? '$1 प्रतिशत ई सी' : 
    language === 'te' ? '$1 శాతం ఈ సి' : 
    language === 'or' ? '$1 ପ୍ରତିଶତ ଇ ସି ତରଳ' : '$1 percent E-C liquid');
  clean = clean.replace(/\b(\d+(?:\.\d+)?)\s*%\s*SC\b/gi, 
    language === 'hi' ? '$1 प्रतिशत एस सी' : 
    language === 'te' ? '$1 శాతం ఎస్ సి' : 
    language === 'or' ? '$1 ପ୍ରତିଶତ ଏସ ସି ସସପେନସନ' : '$1 percent S-C suspension');

  // Measurements
  clean = clean.replace(/\b(\d+(?:\.\d+)?)\s*ml\b/gi, 
    language === 'hi' ? '$1 मिलीलीटर' : 
    language === 'te' ? '$1 మిల్లీలీటర్లు' : 
    language === 'ta' ? '$1 மில்லி' : 
    language === 'kn' ? '$1 ಮಿಲಿ' : 
    language === 'or' ? '$1 ମିଲିଲିଟର' : '$1 millilitres');

  clean = clean.replace(/\b(\d+(?:\.\d+)?)\s*g(?:m|rams?)?\b/gi, 
    language === 'hi' ? '$1 ग्राम' : 
    language === 'te' ? '$1 గ్రాములు' : 
    language === 'ta' ? '$1 கிராம்' : 
    language === 'kn' ? '$1 ಗ್ರಾಂ' : 
    language === 'or' ? '$1 ଗ୍ରାମ' : '$1 grams');

  clean = clean.replace(/\b10,?000\s*ppm\b/gi, 
    language === 'hi' ? '10 हजार पीपीएम' : 
    language === 'te' ? '10 వేల పీపీఎం' : 
    language === 'ta' ? '10 ஆயிரம் பிபிஎம்' : 
    language === 'or' ? '୧୦ ହଜାର ପି ପି ଏମ' : '10,000 P-P-M');

  // 9. Normalize whitespace and punctuation
  clean = clean.replace(/[ \t]+/g, ' ');
  clean = clean.replace(/\n+/g, '. ');
  clean = clean.replace(/\.{2,}/g, '.');

  return clean.trim();
}

export class WebSpeechTTSProvider implements TextToSpeechProvider {
  private activeFallbackAudio: HTMLAudioElement | null = null;
  private activeUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // Pre-warm the voice list cache
      window.speechSynthesis.onvoiceschanged = () => {
        try {
          window.speechSynthesis.getVoices();
        } catch (_) {}
      };
      try {
        window.speechSynthesis.getVoices();
      } catch (_) {}
    }
  }

  isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  async speak(text: string, language: LanguageCode, onEnd?: () => void): Promise<void> {
    this.stop();

    if (!this.isSupported()) {
      if (onEnd) onEnd();
      return;
    }

    // Clean text strictly: no asterisks, no hashtags, no markdown noise
    const spokenText = cleanTextForSpeech(text, language);
    if (!spokenText) {
      if (onEnd) onEnd();
      return;
    }

    const langInfo = SUPPORTED_LANGUAGES.find((l) => l.code === language);
    const dialect = DIALECT_SPEECH_GUIDES[language];
    const targetLocale = dialect?.speechLocale || langInfo?.speechLocale || 'en-US';
    const isOdia = language === 'or';

    // Pick best available voice for language with preference for high-clarity natural neural accents
    const voices = window.speechSynthesis.getVoices();
    const candidateVoices = voices.filter((v) => {
      const vLang = v.lang.replace('_', '-').toLowerCase();
      const vName = v.name.toLowerCase();
      if (isOdia) {
        return (
          vLang === 'or-in' ||
          vLang === 'ory-in' ||
          vLang.startsWith('or') ||
          vLang.startsWith('ory') ||
          vName.includes('odia') ||
          vName.includes('oriya') ||
          v.name.includes('ଓଡ଼ିଆ')
        );
      }
      return (
        v.lang === targetLocale ||
        vLang.startsWith(targetLocale.toLowerCase()) ||
        vLang.startsWith(language.toLowerCase()) ||
        vName.includes(langInfo?.name.toLowerCase() || '')
      );
    });

    // 1. If an authentic native regional voice is present on the client system (e.g. Android Odia, Windows Odia),
    // use it directly with calibrated rate and pitch!
    if (candidateVoices.length > 0) {
      const utterance = new SpeechSynthesisUtterance(spokenText);
      utterance.lang = targetLocale;
      utterance.rate = isOdia ? 0.91 : (dialect?.geminiVoiceRecommendation?.speakingRate || 0.93);
      utterance.pitch = dialect?.geminiVoiceRecommendation?.targetPitch || 1.0;

      const preferredVoice = candidateVoices.find(
        (v) =>
          v.name.toLowerCase().includes('google') ||
          v.name.toLowerCase().includes('natural') ||
          v.name.toLowerCase().includes('neural') ||
          v.name.toLowerCase().includes('swara') ||
          v.name.toLowerCase().includes('india')
      ) || candidateVoices[0];

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onend = () => {
        this.activeUtterance = null;
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        console.warn('[WebSpeechTTS] Synthesis playback error:', e);
        this.activeUtterance = null;
        if (onEnd) onEnd();
      };

      this.activeUtterance = utterance;
      window.speechSynthesis.speak(utterance);
      return;
    }

    // 2. If client lacks an authentic regional voice (common on browsers without Odia voice pack),
    // request high-clarity server-side neural synthesis
    if (candidateVoices.length === 0 && language !== 'en') {
      try {
        const response = await fetch('/api/voice/synthesize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: spokenText,
            language,
            voiceName: dialect?.geminiVoiceRecommendation?.voiceName,
            engine: 'auto',
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.audioBase64) {
            const audioSrc = `data:${data.mimeType || 'audio/mp3'};base64,${data.audioBase64}`;
            const audio = new Audio(audioSrc);
            this.activeFallbackAudio = audio;
            audio.onended = () => {
              this.activeFallbackAudio = null;
              if (onEnd) onEnd();
            };
            audio.onerror = () => {
              this.activeFallbackAudio = null;
              if (onEnd) onEnd();
            };
            await audio.play();
            return;
          }
        }
      } catch (cloudErr) {
        console.warn('[WebSpeechTTS] Cloud delegate notice:', cloudErr);
      }

      // 3. Resilient fallback for Odia: If client has an Indian regional voice (e.g. hi-IN / Google हिन्दी),
      // articulate through phonetic Indic representation so syllables sound authentic rather than corrupted by an English voice
      if (isOdia) {
        const indicVoices = voices.filter((v) => {
          const l = v.lang.replace('_', '-').toLowerCase();
          return l.startsWith('hi') || l === 'en-in';
        });

        if (indicVoices.length > 0) {
          // Convert Odia script to Devanagari phonemes for authentic pronunciation
          let phoneticText = '';
          for (let i = 0; i < spokenText.length; i++) {
            const code = spokenText.charCodeAt(i);
            if (code === 0x0B33) phoneticText += '\u0933';
            else if (code === 0x0B71) phoneticText += '\u0935';
            else if (code === 0x0B5C) phoneticText += 'ड़';
            else if (code === 0x0B5D) phoneticText += 'ढ़';
            else if (code === 0x0B5F) phoneticText += 'य';
            else if (code >= 0x0B01 && code <= 0x0B70) phoneticText += String.fromCharCode(code - 0x0200);
            else phoneticText += spokenText[i];
          }

          const fallbackUtterance = new SpeechSynthesisUtterance(phoneticText);
          fallbackUtterance.lang = 'hi-IN';
          fallbackUtterance.rate = 0.98;
          fallbackUtterance.pitch = 1.04;
          fallbackUtterance.voice = indicVoices[0];
          fallbackUtterance.onend = () => {
            this.activeUtterance = null;
            if (onEnd) onEnd();
          };
          fallbackUtterance.onerror = () => {
            this.activeUtterance = null;
            if (onEnd) onEnd();
          };
          this.activeUtterance = fallbackUtterance;
          window.speechSynthesis.speak(fallbackUtterance);
          return;
        }
      }

      // Suppress English voice reading non-English scripts to avoid accent corruption
      console.warn(`[WebSpeechTTS] Suppressed English voice playback for ${language} to prevent accent corruption.`);
      if (onEnd) onEnd();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.lang = targetLocale;
    utterance.rate = dialect?.geminiVoiceRecommendation?.speakingRate || 0.93;
    utterance.pitch = dialect?.geminiVoiceRecommendation?.targetPitch || 1.0;

    // Prioritize high fidelity neural voices (Google, Microsoft, Natural)
    const preferredVoice = candidateVoices.find(
      (v) =>
        v.name.toLowerCase().includes('google') ||
        v.name.toLowerCase().includes('natural') ||
        v.name.toLowerCase().includes('neural') ||
        v.name.toLowerCase().includes('swara') ||
        v.name.toLowerCase().includes('india')
    ) || candidateVoices[0];

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis playback error:', e);
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  }

  stop() {
    if (this.activeFallbackAudio) {
      this.activeFallbackAudio.pause();
      this.activeFallbackAudio.currentTime = 0;
      this.activeFallbackAudio = null;
    }
    if (this.isSupported()) {
      window.speechSynthesis.cancel();
    }
  }
}

export type TTSEngineType = 'auto' | 'google-tts' | 'gemini-tts' | 'calibrated-client';

export class GeminiTTSProvider implements TextToSpeechProvider {
  private activeAudio: HTMLAudioElement | null = null;
  private webFallback: WebSpeechTTSProvider = new WebSpeechTTSProvider();
  private static clientCooldownUntil: number = 0;
  private static lastEngineUsed: 'google-tts' | 'gemini-tts' | 'calibrated-client' = 'google-tts';
  private static preferredEngine: TTSEngineType = 'auto';

  isSupported(): boolean {
    return true;
  }

  static setPreferredEngine(engine: TTSEngineType) {
    GeminiTTSProvider.preferredEngine = engine;
  }

  static getPreferredEngine(): TTSEngineType {
    return GeminiTTSProvider.preferredEngine;
  }

  static isCloudTTSAvailable(): boolean {
    return Date.now() >= GeminiTTSProvider.clientCooldownUntil;
  }

  static getLastEngineUsed(): 'google-tts' | 'gemini-tts' | 'calibrated-client' {
    return GeminiTTSProvider.lastEngineUsed;
  }

  async speak(
    text: string,
    language: LanguageCode,
    onEnd?: () => void,
    engineOverride?: TTSEngineType,
    playbackSpeed: number = 1.0
  ): Promise<void> {
    this.stop();

    const cleanedText = cleanTextForSpeech(text, language);
    if (!cleanedText) {
      if (onEnd) onEnd();
      return;
    }

    const engineToUse = engineOverride || GeminiTTSProvider.preferredEngine;

    // If user explicitly chose calibrated client voice (and browser has native support):
    // Note: Odia has no browser voice packs, so it always routes to high-clarity cloud voice
    if (engineToUse === 'calibrated-client' && language !== 'or') {
      GeminiTTSProvider.lastEngineUsed = 'calibrated-client';
      await this.webFallback.speak(cleanedText, language, onEnd);
      return;
    }

    const dialectGuide = DIALECT_SPEECH_GUIDES[language] || DIALECT_SPEECH_GUIDES.en;

    try {
      const response = await fetch('/api/voice/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: cleanedText,
          language,
          voiceName: dialectGuide?.geminiVoiceRecommendation?.voiceName,
          engine: engineToUse,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // If Gemini quota was reached, note it
        if (data.quotaExhausted) {
          GeminiTTSProvider.clientCooldownUntil = Date.now() + (data.cooldownSeconds ? data.cooldownSeconds * 1000 : 60000);
        }

        if (data.success && data.audioBase64) {
          const audioSrc = `data:${data.mimeType || 'audio/mp3'};base64,${data.audioBase64}`;
          const audio = new Audio(audioSrc);
          this.activeAudio = audio;

          // Set playback speed (e.g. 0.85x slow for clarity, 1.0x standard, 1.1x brisk)
          audio.playbackRate = playbackSpeed || 1.0;

          if (data.source === 'google-tts') {
            GeminiTTSProvider.lastEngineUsed = 'google-tts';
          } else if (data.source === 'gemini-tts') {
            GeminiTTSProvider.lastEngineUsed = 'gemini-tts';
          }

          audio.onended = () => {
            this.activeAudio = null;
            if (onEnd) onEnd();
          };

          audio.onerror = () => {
            this.activeAudio = null;
            GeminiTTSProvider.lastEngineUsed = 'calibrated-client';
            this.webFallback.speak(text, language, onEnd);
          };

          await audio.play();
          return;
        }
      }
    } catch (err) {
      console.warn('[TTS] Synthesis network notice, falling back to calibrated browser voice:', err);
    }

    // High quality dialect-grounded client fallback
    GeminiTTSProvider.lastEngineUsed = 'calibrated-client';
    await this.webFallback.speak(text, language, onEnd);
  }

  stop() {
    if (this.activeAudio) {
      this.activeAudio.pause();
      this.activeAudio.currentTime = 0;
      this.activeAudio = null;
    }
    this.webFallback.stop();
  }
}

export const speechSTT = new WebSpeechSTTProvider();
export const speechTTS = new GeminiTTSProvider();


