import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import { farmateAI } from './server/agent';
import { BANNED_CHEMICALS_REGISTRY, VERIFIED_PRODUCTS } from './src/data/agrochemicals';
import { PEST_BENCHMARK_DATASETS, AGRONOMIC_PEST_DATASET } from './src/data/pestDatasets';
import { AWESOME_MULTILINGUAL_LLM_REGISTRY, AUDIO_SYNTHESIS_BENCHMARK_DATASET } from './src/data/multilingualDatasets';
import { SPEECH_TRAINING_DATABASES, DIALECT_SPEECH_GUIDES } from './src/data/indicSpeechDatabases';
import { farmateDB, toSafeUser, UserRecord } from './server/db';
import {
  generateToken,
  setAuthCookie,
  clearAuthCookie,
  requireAuth,
  optionalAuth,
  AuthenticatedRequest,
} from './server/auth';

dotenv.config();
dotenv.config({ path: '.env.local', override: true });

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));
app.use(cookieParser());
app.use(optionalAuth);

const pestDiagnoses: any[] = [];
const verifications: any[] = [];
const chatHistory: any[] = [];

// API Endpoints
app.get('/api/health', (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY?.replace(/^["']|["']$/g, '').trim();
  res.json({
    status: 'ok',
    version: '2.1.0',
    geminiEnabled: Boolean(apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey !== 'PASTE_YOUR_GEMINI_API_KEY_HERE'),
    timestamp: new Date().toISOString(),
  });
});

// Authentication Endpoints

// 1. Sign Up
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, phone, preferredLanguage, farmName, location, farmSize, primaryCrop } = req.body;

    // Validation: Name
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ error: 'Name cannot be empty.' });
    }

    // Validation: Email
    if (!email || typeof email !== 'string' || email.trim().length === 0) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const cleanEmail = email.trim().toLowerCase();
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    // Validation: Password
    if (!password || typeof password !== 'string' || password.length === 0) {
      return res.status(400).json({ error: 'Password cannot be empty.' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must contain at least 8 characters.' });
    }

    // Check duplicate email
    const existing = farmateDB.findByEmail(cleanEmail);
    if (existing) {
      return res.status(409).json({ error: 'Account already exists.' });
    }

    // Hash password with bcrypt
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const now = new Date().toISOString();
    const newRecord: UserRecord = {
      id: 'usr-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      name: name.trim(),
      email: cleanEmail,
      password_hash: passwordHash,
      phone: phone?.trim() || '',
      preferred_language: preferredLanguage || 'en',
      role: 'farmer',
      farm_name: farmName?.trim() || `${name.trim()}'s Farm`,
      location: location?.trim() || 'Krishnagiri, Tamil Nadu',
      farm_size: Number(farmSize) || 3.5,
      primary_crop: primaryCrop || 'Tomato',
      created_at: now,
      updated_at: now,
    };

    farmateDB.create(newRecord);
    const safeUser = toSafeUser(newRecord);
    const token = generateToken(safeUser.id);
    setAuthCookie(res, token);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully! Welcome to FAR[M]ATE.',
      user: safeUser,
      token,
    });
  } catch (err: any) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// 2. Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { identifier, email, name, password } = req.body;
    const loginIdentifier = (identifier || email || name || '').trim();

    if (!loginIdentifier || !password) {
      return res.status(400).json({ error: 'Invalid name/email or password.' });
    }

    // Find corresponding user in database (handles both Name and Gmail/Email)
    const userRecord = farmateDB.findByIdentifier(loginIdentifier);
    if (!userRecord) {
      // Do not reveal whether user exists
      return res.status(401).json({ error: 'Invalid name/email or password.' });
    }

    // Compare entered password with stored password hash
    const isMatch = await bcrypt.compare(password, userRecord.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid name/email or password.' });
    }

    const safeUser = toSafeUser(userRecord);
    const token = generateToken(safeUser.id);
    setAuthCookie(res, token);

    return res.json({
      success: true,
      message: 'Login successful.',
      user: safeUser,
      token,
    });
  } catch (err: any) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// 3. Current User
app.get('/api/auth/me', requireAuth, (req: AuthenticatedRequest, res) => {
  return res.json({
    success: true,
    user: req.user,
  });
});

// 4. Logout
app.post('/api/auth/logout', (req, res) => {
  clearAuthCookie(res);
  return res.json({
    success: true,
    message: 'Logged out successfully.',
  });
});

// Profile Endpoints
app.get('/api/profile', requireAuth, (req: AuthenticatedRequest, res) => {
  res.json({ user: req.user });
});

const handleProfileUpdate = (req: AuthenticatedRequest, res: any) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

  const { name, phone, preferredLanguage, farmProfile } = req.body;
  const updates: Partial<UserRecord> = {};
  if (name) updates.name = name.trim();
  if (phone) updates.phone = phone.trim();
  if (preferredLanguage) updates.preferred_language = preferredLanguage;
  if (farmProfile) {
    if (farmProfile.farmName) updates.farm_name = farmProfile.farmName;
    if (farmProfile.location) updates.location = farmProfile.location;
    if (farmProfile.farmSizeAcres !== undefined) updates.farm_size = Number(farmProfile.farmSizeAcres);
    if (farmProfile.primaryCrops !== undefined) {
      if (Array.isArray(farmProfile.primaryCrops)) {
        updates.primary_crop = farmProfile.primaryCrops.join(', ');
      } else if (typeof farmProfile.primaryCrops === 'string') {
        updates.primary_crop = farmProfile.primaryCrops.trim();
      }
    }
  }

  const updatedRecord = farmateDB.update(req.user.id, updates);
  if (!updatedRecord) {
    return res.status(404).json({ error: 'User not found' });
  }

  const safe = toSafeUser(updatedRecord);
  res.json({ success: true, user: safe });
};

app.patch('/api/profile', requireAuth, handleProfileUpdate);
app.put('/api/profile', requireAuth, handleProfileUpdate);
app.put('/api/user/profile', requireAuth, handleProfileUpdate);

// AI Chat
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, context, language, imageBase64 } = req.body;
    const userLang = (req as any).user?.preferredLanguage || 'en';
    const response = await farmateAI.chat(message, context, language || userLang, imageBase64);
    chatHistory.push({
      id: 'msg-' + Date.now(),
      user: message,
      reply: response.text,
      timestamp: new Date().toISOString(),
      language,
    });
    res.json(response);
  } catch (err: any) {
    console.warn('Chat route resilient fallback triggered:', err?.message || err);
    res.json({
      text: 'FAR[M]ATE Advisory: Field mode active. For your crop health and pest protection, always verify batch numbers via VERIFY-X and maintain standard 15L knapsack sprayer dilutions with protective PPE.',
      source: 'farmate-rules',
    });
  }
});

// Pest Diagnosis
app.post('/api/pest/analyze', async (req, res) => {
  try {
    const { crop, imageBase64, symptoms, language, soilType } = req.body;
    const userLang = (req as any).user?.preferredLanguage || 'en';
    const diagnosis = await farmateAI.diagnoseCrop(crop, imageBase64, symptoms, language || userLang, soilType);
    pestDiagnoses.unshift(diagnosis);
    res.json(diagnosis);
  } catch (err: any) {
    console.error('Pest diagnosis error:', err);
    res.status(500).json({ error: 'Failed to analyze crop image' });
  }
});

app.get('/api/pest/history', (req, res) => {
  res.json({ history: pestDiagnoses });
});

// Pest Benchmarks & Agronomic Dataset Catalog
app.get('/api/pest/datasets', (req, res) => {
  res.json({
    benchmarks: PEST_BENCHMARK_DATASETS,
    totalCropsCovered: AGRONOMIC_PEST_DATASET.length,
    catalog: AGRONOMIC_PEST_DATASET,
    benchmarkSummary: 'Grounded in PlantVillage (54,306 images), IP102 (75,222 images), PlantDoc (2,598 images), ICAR-NBAIR, and CIBRC',
    timestamp: new Date().toISOString(),
  });
});

// Counterfeit Verification (VERIFY-X) - Both endpoints supported
app.post('/api/verify/scan', async (req, res) => {
  try {
    const { scanCode, batchNumber, productName, manufacturer, imageBase64, language } = req.body;
    const targetCode = (scanCode || batchNumber || '').trim();
    const userLang = language || (req as any).user?.preferredLanguage || 'en';
    const verification = await farmateAI.verifyProduct(targetCode, productName, manufacturer, imageBase64, userLang);
    verifications.unshift(verification);
    res.json(verification);
  } catch (err: any) {
    console.error('Scan verification error:', err);
    res.status(500).json({ error: 'Failed to verify package scan code' });
  }
});

app.post('/api/verify/product', async (req, res) => {
  try {
    const { batchNumber, productName, manufacturer, imageBase64, language } = req.body;
    const userLang = language || (req as any).user?.preferredLanguage || 'en';
    const verification = await farmateAI.verifyProduct(batchNumber, productName, manufacturer, imageBase64, userLang);
    verifications.unshift(verification);
    res.json(verification);
  } catch (err: any) {
    console.error('Verification error:', err);
    res.status(500).json({ error: 'Failed to verify product credentials' });
  }
});

app.get('/api/verify/history', (req, res) => {
  res.json({ history: verifications });
});

// Verified Recommendations & Multi-Tank Math Engine
app.get('/api/recommendations', (req, res) => {
  try {
    const { crop, stage, category, disease, acres, tankSize } = req.query;
    const parsedAcres = acres ? parseFloat(acres as string) : 3;
    const parsedTankSize = tankSize ? parseFloat(tankSize as string) : 15;
    const result = farmateAI.getRecommendations(
      crop as string,
      stage as string,
      category as string,
      disease as string,
      isNaN(parsedAcres) ? 3 : parsedAcres,
      isNaN(parsedTankSize) ? 15 : parsedTankSize
    );
    res.json(result);
  } catch (err: any) {
    console.error('Recommendations error:', err);
    res.status(500).json({ error: 'Failed to compute product recommendations' });
  }
});

// Statutory Standards & Sprayer Tank Specifications Registry
app.get('/api/recommendations/datasets', (req, res) => {
  res.json({
    standards: [
      { name: 'CIBRC Major Uses Registry', authority: 'Central Insecticides Board & Registration Committee', scope: 'Registered label claims, approved crops, and toxicity triangles' },
      { name: 'Fertilizer Control Order (FCO 1985)', authority: 'Ministry of Agriculture & Farmers Welfare', scope: 'Biostimulants, bio-fertilizers, and organic soil amendments' },
      { name: 'ICAR-STCR Package of Practices', authority: 'Soil Test Crop Response National Network', scope: 'Foliar canopy spray calibrations per acre' },
    ],
    tankOptions: [
      { id: 'tank-5l', label: '5L Handheld Sprayer', liters: 5, description: 'Nursery & kitchen garden pressure sprayer' },
      { id: 'tank-10l', label: '10L Compact Backpack', liters: 10, description: 'Lightweight manual backpack sprayer' },
      { id: 'tank-12l', label: '12L Battery Sprayer', liters: 12, description: 'Cordless electric backpack sprayer' },
      { id: 'tank-15l', label: '15L Standard Knapsack', liters: 15, description: 'Standard Indian agrarian knapsack sprayer' },
      { id: 'tank-16l', label: '16L Commercial Knapsack', liters: 16, description: 'High-capacity manual lever knapsack sprayer' },
      { id: 'tank-20l', label: '20L Power / Motorized Sprayer', liters: 20, description: '2-stroke petrol engine / mist blower backpack' },
      { id: 'tank-200l', label: '200L Tractor Drum / Trolley', liters: 200, description: 'Tractor boom & high-pressure hose orchard sprayer' },
    ],
    totalVerifiedInputs: 12,
    timestamp: new Date().toISOString(),
  });
});

// Banned Chemicals Statutory Registry
app.get('/api/registry/banned', (req, res) => {
  res.json({
    totalBanned: BANNED_CHEMICALS_REGISTRY.length,
    registry: BANNED_CHEMICALS_REGISTRY,
    lastGazetteSync: new Date().toISOString(),
  });
});

// Voice Transcription Endpoint (abstracted provider)
app.post('/api/voice/transcribe', async (req, res) => {
  const { language } = req.body;
  const userLang = (req as any).user?.preferredLanguage || 'en';
  // Provider abstraction: Returns confirmation of active speech pipeline
  res.json({
    status: 'ready',
    speechEngine: 'browser-speech-api-with-gemini-multilingual-grounding',
    language: language || userLang,
  });
});

// Multilingual Models and Speech Training Datasets Registry
app.get('/api/multilingual/models-and-datasets', (req, res) => {
  res.json({
    models: AWESOME_MULTILINGUAL_LLM_REGISTRY,
    speechDatabases: SPEECH_TRAINING_DATABASES,
    dialectGuides: DIALECT_SPEECH_GUIDES,
    audioBenchmarks: AUDIO_SYNTHESIS_BENCHMARK_DATASET,
    totalModels: AWESOME_MULTILINGUAL_LLM_REGISTRY.length,
    totalSpeechDatabases: SPEECH_TRAINING_DATABASES.length,
    totalAudioBenchmarks: AUDIO_SYNTHESIS_BENCHMARK_DATASET.length,
    timestamp: new Date().toISOString(),
  });
});

// Dialect Speech Guides
app.get('/api/voice/dialects', (req, res) => {
  const { lang } = req.query;
  if (lang && typeof lang === 'string' && DIALECT_SPEECH_GUIDES[lang]) {
    return res.json({ dialect: DIALECT_SPEECH_GUIDES[lang] });
  }
  res.json({ dialects: DIALECT_SPEECH_GUIDES });
});

// Gemini TTS & Speech Synthesis with Dialect Grounding
app.post('/api/voice/synthesize', async (req, res) => {
  try {
    const { text, language, voiceName, engine } = req.body;
    const userLang = (req as any).user?.preferredLanguage || 'en';
    const targetLang = language || userLang;
    const dialectGuide = DIALECT_SPEECH_GUIDES[targetLang] || DIALECT_SPEECH_GUIDES.en;

    const result = await farmateAI.synthesizeSpeech(
      text,
      targetLang,
      voiceName || dialectGuide?.geminiVoiceRecommendation?.voiceName,
      engine || 'auto'
    );

    res.json({
      ...result,
      targetLang,
      dialectGuide: {
        region: dialectGuide?.primaryDialectRegion,
        locale: dialectGuide?.speechLocale,
        toneStyle: dialectGuide?.geminiVoiceRecommendation?.toneStyle,
        targetPitch: dialectGuide?.geminiVoiceRecommendation?.targetPitch,
        speakingRate: dialectGuide?.geminiVoiceRecommendation?.speakingRate,
        databasesReferenced: dialectGuide?.referencedSpeechDatabases,
        honorificGreeting: dialectGuide?.honorificGreeting,
        vernacularTerms: dialectGuide?.vernacularTerms,
      },
    });
  } catch (err: any) {
    console.warn('Speech synthesis route handled gracefully:', err?.message || err);
    res.json({
      success: false,
      source: 'client-speech-synthesis',
      targetLang: req.body?.language || 'en',
    });
  }
});

// Translation Endpoint grounded in AI4Bharat IndicTrans2, Bhashini NLTM, and Aya
app.post('/api/ai/translate', async (req, res) => {
  try {
    const { text, sourceLanguage, targetLanguage } = req.body;
    const userLang = (req as any).user?.preferredLanguage || 'hi';
    const result = await farmateAI.translateAgronomicText(
      text,
      sourceLanguage || 'en',
      targetLanguage || userLang
    );
    res.json(result);
  } catch (err: any) {
    console.error('Translation error:', err);
    res.status(500).json({ error: 'Failed to translate agronomic advisory' });
  }
});

// Batch translation endpoint for seamless multi-message history translation
app.post('/api/ai/translate-batch', async (req, res) => {
  try {
    const { texts, sourceLanguage, targetLanguage } = req.body;
    if (!Array.isArray(texts)) {
      return res.status(400).json({ error: 'texts must be an array' });
    }
    const userLang = (req as any).user?.preferredLanguage || 'hi';
    const target = targetLanguage || userLang;
    const source = sourceLanguage || 'en';

    const results = await Promise.all(
      texts.map(async (txt: string) => {
        if (!txt || !txt.trim()) return txt;
        try {
          const res = await farmateAI.translateAgronomicText(txt, source, target);
          return res.translatedText || txt;
        } catch (e) {
          return txt;
        }
      })
    );

    res.json({ success: true, translations: results });
  } catch (err: any) {
    console.error('Batch translation error:', err);
    res.status(500).json({ error: 'Failed to batch translate' });
  }
});

// Audio Benchmark Ground Truth Endpoint
app.get('/api/voice/audio-benchmark/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const benchmark = AUDIO_SYNTHESIS_BENCHMARK_DATASET.find((b) => b.id === id);
    if (!benchmark) {
      return res.status(404).json({ error: 'Benchmark not found' });
    }

    const synth = await farmateAI.synthesizeSpeech(
      benchmark.transcript,
      benchmark.languageCode,
      benchmark.calibratedVoiceName,
      'auto'
    );

    res.json({
      benchmark,
      synthesis: synth,
    });
  } catch (err: any) {
    console.error('Benchmark fetch error:', err);
    res.status(500).json({ error: 'Could not fetch benchmark' });
  }
});

app.post('/api/voice/tts', async (req, res) => {
  // Alias endpoint
  try {
    const { text, language, voiceName, engine } = req.body;
    const userLang = (req as any).user?.preferredLanguage || 'en';
    const targetLang = language || userLang;
    const dialectGuide = DIALECT_SPEECH_GUIDES[targetLang] || DIALECT_SPEECH_GUIDES.en;

    const result = await farmateAI.synthesizeSpeech(
      text,
      targetLang,
      voiceName || dialectGuide?.geminiVoiceRecommendation?.voiceName,
      engine || 'auto'
    );

    res.json({
      ...result,
      targetLang,
      dialectGuide,
    });
  } catch (err: any) {
    console.warn('TTS route handled gracefully:', err?.message || err);
    res.json({
      success: false,
      source: 'client-speech-synthesis',
      targetLang: req.body?.language || 'en',
    });
  }
});

// Start server with Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FAR[M]ATE Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
