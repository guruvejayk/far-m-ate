import { LanguageCode } from '../../types';
import { getLocalizedFeatureChat } from '../../data/featureChatTranslations';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  timeFormatted: string;
  quickActions?: string[];
  quickActionsTranslations?: Partial<Record<LanguageCode, string[]>>;
  imageAttachment?: string;
  isDiagnosis?: boolean;
  isVerification?: boolean;
  translations?: Partial<Record<LanguageCode, string>>;
}

const STORAGE_KEY = 'farmate_feature_chat_histories_v2';
const inMemoryCache: Record<string, ChatMessage[]> = {};

/**
 * Load chat history for a specific feature.
 * Automatically aligns initial system messages with the selected language
 * and applies any cached translations for the requested language.
 */
export function getFeatureHistory(feature: string, language: LanguageCode): ChatMessage[] {
  const localized = getLocalizedFeatureChat(feature as any, language);
  const localizedInitials = (localized.initialMessages || []) as ChatMessage[];

  // Retrieve raw stored messages
  let messages: ChatMessage[] = [];
  if (inMemoryCache[feature] && inMemoryCache[feature].length > 0) {
    messages = inMemoryCache[feature];
  } else {
    try {
      const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed[feature] && Array.isArray(parsed[feature]) && parsed[feature].length > 0) {
          messages = parsed[feature];
        }
      }
    } catch (e) {
      console.warn('Error reading chat store from localStorage:', e);
    }
  }

  // If no previous history exists, initialize with localized messages
  if (!messages || messages.length === 0) {
    inMemoryCache[feature] = localizedInitials;
    saveFeatureHistory(feature, localizedInitials);
    return localizedInitials;
  }

  // Update initial greeting messages and apply cached translations for the target language
  const mapped = messages.map((msg) => {
    // 1. Initial templates match official curated dictionary for the active language
    if (msg.id.startsWith('init-')) {
      const match = localizedInitials.find((im) => im.id === msg.id);
      if (match) {
        return {
          ...msg,
          text: match.text,
          quickActions: match.quickActions,
        };
      }
    }

    // 2. If cached translation exists for this language, update text and quick actions
    const updated = { ...msg };
    if (msg.translations && msg.translations[language]) {
      updated.text = msg.translations[language]!;
    }
    if (msg.quickActionsTranslations && msg.quickActionsTranslations[language]) {
      updated.quickActions = msg.quickActionsTranslations[language]!;
    }
    return updated;
  });

  inMemoryCache[feature] = mapped;
  return mapped;
}

/**
 * Save chat history for a specific feature.
 */
export function saveFeatureHistory(feature: string, messages: ChatMessage[]): void {
  inMemoryCache[feature] = messages;
  try {
    if (typeof localStorage !== 'undefined') {
      const raw = localStorage.getItem(STORAGE_KEY);
      const store = raw ? JSON.parse(raw) : {};
      store[feature] = messages;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    }
  } catch (e) {
    console.warn('Error saving chat store to localStorage:', e);
  }
}

/**
 * Clear chat history for a specific feature and reset to initial messages.
 */
export function resetFeatureHistory(feature: string, language: LanguageCode): ChatMessage[] {
  const localized = getLocalizedFeatureChat(feature as any, language);
  const initial = (localized.initialMessages || []) as ChatMessage[];
  saveFeatureHistory(feature, initial);
  return initial;
}

/**
 * Translates an array of messages to the target language.
 * Uses pre-translated initialMessages for system starters, and calls /api/ai/translate
 * or batch translation for custom user and agent dialogue.
 */
export async function translateMessages(
  feature: string,
  messages: ChatMessage[],
  targetLanguage: LanguageCode,
  sourceLanguage: LanguageCode | 'auto' = 'auto'
): Promise<ChatMessage[]> {
  if (targetLanguage === sourceLanguage) {
    return messages;
  }

  const localizedData = getLocalizedFeatureChat(feature as any, targetLanguage);
  const localizedInitials = localizedData.initialMessages as ChatMessage[];

  // 1. First pass: resolve init- messages and apply any cached translations immediately
  const intermediate: ChatMessage[] = messages.map((msg) => {
    if (msg.id.startsWith('init-')) {
      const match = localizedInitials.find((im) => im.id === msg.id);
      if (match) {
        return {
          ...msg,
          text: match.text,
          quickActions: match.quickActions,
        };
      }
    }

    const updated = { ...msg };
    if (msg.translations && msg.translations[targetLanguage]) {
      updated.text = msg.translations[targetLanguage]!;
    }
    if (msg.quickActionsTranslations && msg.quickActionsTranslations[targetLanguage]) {
      updated.quickActions = msg.quickActionsTranslations[targetLanguage];
    }
    return updated;
  });

  // 2. Identify items that still need translation (both message text and quickActions)
  interface PendingTask {
    type: 'text' | 'action';
    msgIdx: number;
    actionIdx?: number;
    textToTranslate: string;
  }

  const pendingTasks: PendingTask[] = [];

  intermediate.forEach((msg, idx) => {
    // Check main text
    if (!msg.id.startsWith('init-') && (!msg.translations || !msg.translations[targetLanguage])) {
      const canonicalText = msg.translations?.['en'] || msg.text;
      if (canonicalText && canonicalText.trim()) {
        pendingTasks.push({
          type: 'text',
          msgIdx: idx,
          textToTranslate: canonicalText,
        });
      }
    }

    // Check quickActions
    if (!msg.id.startsWith('init-') && msg.quickActions && msg.quickActions.length > 0) {
      if (!msg.quickActionsTranslations || !msg.quickActionsTranslations[targetLanguage]) {
        msg.quickActions.forEach((act, aIdx) => {
          const canonicalAct = msg.quickActionsTranslations?.['en']?.[aIdx] || act;
          if (canonicalAct && canonicalAct.trim()) {
            pendingTasks.push({
              type: 'action',
              msgIdx: idx,
              actionIdx: aIdx,
              textToTranslate: canonicalAct,
            });
          }
        });
      }
    }
  });

  if (pendingTasks.length === 0) {
    return intermediate;
  }

  // 3. Batch translate all pending tasks via high-speed batch endpoint
  try {
    const res = await fetch('/api/ai/translate-batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        texts: pendingTasks.map((t) => t.textToTranslate),
        sourceLanguage: sourceLanguage || 'auto',
        targetLanguage,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.translations && Array.isArray(data.translations)) {
        data.translations.forEach((trans: string, i: number) => {
          const task = pendingTasks[i];
          const targetMsg = intermediate[task.msgIdx];

          if (task.type === 'text') {
            const canonicalEn = targetMsg.translations?.['en'] || (sourceLanguage === 'en' ? targetMsg.text : undefined);
            intermediate[task.msgIdx] = {
              ...targetMsg,
              text: trans,
              translations: {
                ...(targetMsg.translations || {}),
                ...(canonicalEn ? { en: canonicalEn } : {}),
                [targetLanguage]: trans,
              },
            };
          } else if (task.type === 'action' && task.actionIdx !== undefined) {
            const currentActions = [...(targetMsg.quickActions || [])];
            currentActions[task.actionIdx] = trans;

            const currentActionTrans = { ...(targetMsg.quickActionsTranslations || {}) };
            const langActions = [...(currentActionTrans[targetLanguage] || targetMsg.quickActions || [])];
            langActions[task.actionIdx] = trans;
            currentActionTrans[targetLanguage] = langActions;

            intermediate[task.msgIdx] = {
              ...targetMsg,
              quickActions: currentActions,
              quickActionsTranslations: currentActionTrans,
            };
          }
        });
        return intermediate;
      }
    }
  } catch (err) {
    console.warn('Batch translation warning, falling back to individual items:', err);
  }

  // Fallback: Individual translations
  return Promise.all(
    intermediate.map(async (msg) => {
      if (msg.id.startsWith('init-') || (msg.translations && msg.translations[targetLanguage])) {
        return msg;
      }

      try {
        const canonical = msg.translations?.['en'] || msg.text;
        const res = await fetch('/api/ai/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: canonical,
            sourceLanguage: sourceLanguage || 'auto',
            targetLanguage,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.translatedText) {
            return {
              ...msg,
              text: data.translatedText,
              translations: {
                ...(msg.translations || {}),
                en: canonical,
                [targetLanguage]: data.translatedText,
              },
            };
          }
        }
      } catch (e) {
        console.warn('Individual translate notice:', e);
      }
      return msg;
    })
  );
}

/**
 * Translates all stored feature histories across the entire application
 * in parallel when the user changes app language in settings or navigation.
 */
export async function translateAllStoredHistories(
  targetLanguage: LanguageCode,
  sourceLanguage: LanguageCode | 'auto' = 'auto'
): Promise<void> {
  if (targetLanguage === sourceLanguage) return;

  const features = ['pest', 'counterfeit', 'recommendation', 'registry', 'dashboard'];
  
  await Promise.all(
    features.map(async (feat) => {
      try {
        const history = getFeatureHistory(feat, targetLanguage);
        if (history && history.length > 0) {
          const translated = await translateMessages(feat, history, targetLanguage, sourceLanguage);
          saveFeatureHistory(feat, translated);
        }
      } catch (err) {
        console.warn(`Translation error for feature ${feat}:`, err);
      }
    })
  );

  // Notify any active chat views across the app that chat histories have been updated
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('farmate:chat-history-updated', {
        detail: { language: targetLanguage },
      })
    );
  }
}

const CONTEXT_STORAGE_KEY = 'farmate_shared_farm_context_v1';

/**
 * Loads shared agronomic context and memory across all feature chats.
 */
export function getSharedFarmContext(): any {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(CONTEXT_STORAGE_KEY) : null;
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Error reading shared farm context from localStorage:', e);
  }
  return {};
}

/**
 * Persists shared agronomic context and memory across all feature chats.
 */
export function saveSharedFarmContext(ctx: any): void {
  try {
    if (typeof localStorage !== 'undefined') {
      const existing = getSharedFarmContext();
      const merged = { ...existing, ...ctx };
      localStorage.setItem(CONTEXT_STORAGE_KEY, JSON.stringify(merged));
    }
  } catch (e) {
    console.warn('Error saving shared farm context to localStorage:', e);
  }
}

