/**
 * FAR[M]ATE 2.0 Speech Training Database & Dialect Speech Guides
 * Calibrating Gemini TTS and multi-lingual voice synthesis with authentic regional agricultural speech datasets.
 */

export interface SpeechDatabaseEntry {
  id: string;
  name: string;
  institution: string;
  type: 'Speech Corpus' | 'Text-to-Speech Engine' | 'Crowdsourced Audio' | 'Open Benchmark' | 'Extension Audio Glossary';
  coverage: string;
  acousticHours: string;
  samplingRate: string;
  agriculturalSuitability: string;
  description: string;
  keyFeatures: string[];
  accessUrl: string;
}

export const SPEECH_TRAINING_DATABASES: SpeechDatabaseEntry[] = [
  {
    id: 'project-vaani',
    name: 'Project Vaani Spoken Language Corpus',
    institution: 'Indian Institute of Science (IISc), ARTPARK & Google Research',
    type: 'Speech Corpus',
    coverage: 'Over 80 districts across India covering diverse regional dialects and agrarian accents',
    acousticHours: '14,000+ hours of natural spontaneous speech across 80+ districts',
    samplingRate: '16 kHz / 24 kHz high-fidelity studio & field acoustic captures',
    agriculturalSuitability: 'Highest. Recorded in rural farm fields, rural markets, and village councils with authentic dialect variations and ambient acoustics.',
    description: 'A pioneering initiative capturing the true acoustic landscape of spoken India across socio-economic strata, with heavy representation from agricultural workers and women self-help groups.',
    keyFeatures: [
      'Authentic spontaneous speech from 80+ rural districts',
      'Phonetic transcriptions calibrated against regional colloquial terms',
      'Heavy agrarian vocabulary for crop stages, weeds, and weather',
      'Tolerant to outdoor wind, tractor drone, and bird ambient acoustics',
    ],
    accessUrl: 'https://vaani.iisc.ac.in',
  },
  {
    id: 'ai4bharat-indictts',
    name: 'AI4Bharat IndicTTS & IndicSpeech Corpus',
    institution: 'AI4Bharat, IIT Madras & Ministry of Electronics and IT (MeitY)',
    type: 'Text-to-Speech Engine',
    coverage: '13 major Indian languages with both male and female native speaker models',
    acousticHours: '100+ hours of studio-quality phonetically balanced recordings per language',
    samplingRate: '24 kHz & 48 kHz high-definition studio audio',
    agriculturalSuitability: 'Excellent for high-clarity synthesized guidance on dilution ratios, knapsack tank math, and emergency antidote advice.',
    description: 'Open-source state-of-the-art TTS models built on FastSpeech2 and VITS architectures, trained on phonetically balanced corpora of native Indian speakers.',
    keyFeatures: [
      'Multi-speaker native prosody models for 13 languages',
      'Zero-shot voice cloning and accent modulation',
      'Fine-tuned for technical numbers, chemical formulations, and ratios',
      'SSML support for prosody, pause, and emphatic stress injection',
    ],
    accessUrl: 'https://ai4bharat.iitm.ac.in/indictts',
  },
  {
    id: 'bhashini-ulca',
    name: 'Bhashini ULCA — Universal Language Contribution API',
    institution: 'National Language Translation Mission (NLTM), MeitY, Govt of India',
    type: 'Crowdsourced Audio',
    coverage: '22 Constitutionally recognized Indian languages across 36 states and union territories',
    acousticHours: '25,000+ hours of validated multi-speaker audio across diverse domains',
    samplingRate: '16 kHz - 48 kHz multi-tiered acoustic repository',
    agriculturalSuitability: 'Direct integration with national agricultural schemes like PM-KISAN, Kisan Call Center (1800-180-1551), and mKisan portals.',
    description: 'Central open-data platform orchestrating speech, translation, and text datasets contributed by academic institutions, research labs, and Indian citizens.',
    keyFeatures: [
      'Crowdsourced dialect validation pipeline with peer verification',
      'Standardized metadata schema for gender, age, and regional dialect zone',
      'Official benchmarks for government agro-advisory speech synthesis',
      'Direct statutory alignment with e-NAM and Digital Agriculture Mission',
    ],
    accessUrl: 'https://bhashini.gov.in/ulca',
  },
  {
    id: 'openslr-indic',
    name: 'OpenSLR Indic Speech & Language Resource Corpus',
    institution: 'OpenSLR & Google Speech Research Group',
    type: 'Open Benchmark',
    coverage: 'SLR69 (Hindi), SLR71 (Tamil), SLR72 (Telugu), SLR79 (Kannada), SLR64 (Marathi), SLR78 (Gujarati), SLR63 (Malayalam), SLR68 (Punjabi), SLR80 (Odia), SLR37 (Bengali), SLR67 (Urdu)',
    acousticHours: '3,500+ hours of validated studio & high-density spoken corpora',
    samplingRate: '48 kHz / 24 kHz uncompressed lossless PCM wav format',
    agriculturalSuitability: 'Standard acoustic gold-standard for cross-referencing phoneme timing, fundamental frequency (F0) curves, and vowel duration in agricultural guidance.',
    description: 'Open Speech and Language Resources archive hosting peer-reviewed speech datasets used globally by speech researchers to train baseline acoustic and TTS models.',
    keyFeatures: [
      'Free, unrestricted open research licensing',
      'Precise phoneme-level alignments and phonetic dictionaries',
      'Controlled recording conditions for pitch and formants benchmarking',
      'Universally reproducible acoustic reference baselines',
    ],
    accessUrl: 'https://www.openslr.org',
  },
  {
    id: 'sau-extension-glossaries',
    name: 'State Agricultural Universities (SAU) Extension Audio-Spoken Glossaries',
    institution: 'ICAR, ANGRAU, TNAU, UAS Bangalore, IARI Pusa, PAU Ludhiana, MPKV Rahuri, AAU Anand, BCKV Mohanpur, KAU Thrissur, OUAT Bhubaneswar',
    type: 'Extension Audio Glossary',
    coverage: 'Regional agricultural terminology covering local pest names, soil idioms, and traditional farming practices in 15+ agro-climatic zones',
    acousticHours: '1,200+ hours of agricultural radio broadcasts, Kisan Vani, and extension scientist village lectures',
    samplingRate: '22.05 kHz / 44.1 kHz broadcast archives',
    agriculturalSuitability: 'Essential for ensuring the AI speaks the exact word the farmer uses in their district (e.g. "Cheeda-Peeda" vs "Keet", "Kasan" vs "Rythu").',
    description: 'Curated repository of broadcast and extension voice recordings from India\'s top State Agricultural Universities, preserving agrarian spoken dialect terminology.',
    keyFeatures: [
      'Authentic vernacular crop pest and disease names',
      'Respectful traditional farmer honorifics and greeting conventions',
      'Calibrated for Knapsack sprayer terminology (tank, nozzle, hand-lance, pressure chamber)',
      'Localized harvest timing idioms and monsoon wind descriptions',
    ],
    accessUrl: 'https://icar.org.in',
  },
];

export interface DialectGuideEntry {
  languageCode: string;
  languageName: string;
  nativeName: string;
  primaryDialectRegion: string;
  referencedSpeechDatabases: string[];
  speechLocale: string;
  geminiVoiceRecommendation: {
    voiceName: string;
    targetPitch: number;
    speakingRate: number;
    toneStyle: string;
  };
  vernacularTerms: {
    standardEnglish: string;
    regionalVernacular: string;
    phoneticPronunciation: string;
  }[];
  honorificGreeting: string;
  phoneticGuidelines: string;
  ruralIntonationNotes: string;
}

export const DIALECT_SPEECH_GUIDES: Record<string, DialectGuideEntry> = {
  te: {
    languageCode: 'te',
    languageName: 'Telugu',
    nativeName: 'తెలుగు',
    primaryDialectRegion: 'Warangal, Guntur & Krishna-Godavari Delta',
    referencedSpeechDatabases: [
      'Project Vaani — Warangal & Guntur',
      'AI4Bharat IndicTTS Telugu (IIT Madras)',
      'ANGRAU Rythu Vani Spoken Extension Corpus',
      'OpenSLR SLR72 Telugu Speech Dataset',
    ],
    speechLocale: 'te-IN',
    geminiVoiceRecommendation: {
      voiceName: 'Aoede',
      targetPitch: 1.02,
      speakingRate: 0.93,
      toneStyle: 'Warm, respectful, rhythmic agricultural cadence with gentle elongation of terminal interrogatives',
    },
    vernacularTerms: [
      { standardEnglish: 'Farmer / Brother', regionalVernacular: 'రైతు సోదరా / అన్నగారు', phoneticPronunciation: 'Rythu sodhara / Anna-gaaru' },
      { standardEnglish: 'Early Blight', regionalVernacular: 'ముందస్తు ఆకు మాడు తెగులు', phoneticPronunciation: 'Mundhusthu aaku maadu thegulu' },
      { standardEnglish: 'Pesticide / Medicine', regionalVernacular: 'మందు / పురుగుల మందు', phoneticPronunciation: 'Mandhu / Purugula mandhu' },
      { standardEnglish: '15L Knapsack Tank', regionalVernacular: '15 లీటర్ల చేతి పిచికారీ ట్యాంకు', phoneticPronunciation: 'Padihenu leetarla chethi pichikaari tanku' },
      { standardEnglish: 'Spray Caution / Drift', regionalVernacular: 'గాలి వేగం - పిచికారీ జాగ్రత్త', phoneticPronunciation: 'Gaali vegam - pichikaari jaagratha' },
      { standardEnglish: 'Counterfeit / Fake', regionalVernacular: 'నకిలీ మందు / మోసం', phoneticPronunciation: 'Nakili mandhu / Mosam' },
    ],
    honorificGreeting: 'నమస్కారం రైతు సోదరులారా! మీ పంట సంరక్షణకు నేను ఎలా సహాయపడగలను?',
    phoneticGuidelines: 'Clear aspiration on retroflex plosives (ట, ఠ, డ, ఢ). Preserve geminate consonants in words like "ట్యాంకు" (t-yaanku). Maintain natural rising intonation at phrase boundaries for reassurance.',
    ruralIntonationNotes: 'In Warangal and Guntur regions, farmers respond strongly to the respectful suffix "-garu" and clear, unhurried cadence when explaining spray tank ratios.',
  },

  hi: {
    languageCode: 'hi',
    languageName: 'Hindi',
    nativeName: 'हिन्दी',
    primaryDialectRegion: 'Rohtak, Meerut & Western UP Indo-Gangetic Belt',
    referencedSpeechDatabases: [
      'Project Vaani — Rohtak, Meerut & Patna',
      'AI4Bharat IndicTTS Hindi (IIT Madras)',
      'IARI Kisan Vani Spoken Archive (Pusa Institute)',
      'OpenSLR SLR69 High-Density Hindi Corpus',
    ],
    speechLocale: 'hi-IN',
    geminiVoiceRecommendation: {
      voiceName: 'Puck',
      targetPitch: 0.98,
      speakingRate: 0.95,
      toneStyle: 'Grounded, empathetic, elder-brotherly farmer guide with crisp stop consonants',
    },
    vernacularTerms: [
      { standardEnglish: 'Farmer Friend', regionalVernacular: 'किसान भाई / आदरणीय किसान', phoneticPronunciation: 'Kisaan bhai / Aadarneey kisaan' },
      { standardEnglish: 'Early Blight', regionalVernacular: 'अगेती झुलसा रोग', phoneticPronunciation: 'Ageti jhoolsaa rog' },
      { standardEnglish: 'Fungicide / Agrochemical', regionalVernacular: 'फफूंदनाशक दवा / कीटनाशक', phoneticPronunciation: 'Phafoond-naashak dawa / Keetnashak' },
      { standardEnglish: '15L Knapsack Sprayer', regionalVernacular: '15 लीटर वाली नैपसैक टंकी / ढोली', phoneticPronunciation: 'Pandrah liter waali knapsack tanki' },
      { standardEnglish: 'Safety Gloves & PPE', regionalVernacular: 'सुरक्षा दस्ताने, चश्मा और मास्क', phoneticPronunciation: 'Suraksha dastane, chashma aur mask' },
      { standardEnglish: 'Counterfeit Batch', regionalVernacular: 'नकली कीटनाशक / फर्जी लॉट', phoneticPronunciation: 'Nakli keetnashak / Farzi lot' },
    ],
    honorificGreeting: 'राम-राम किसान भाई! आपकी फसल सुरक्षा में आज मैं क्या सहायता करूँ?',
    phoneticGuidelines: 'Pronounce schwa vowels naturally without overly theatrical Sanskritization. Emphasize dental plosives (त, थ, द, ध) and avoid synthetic English accents on terms like "Litre" (लीटर) and "Gram" (ग्राम).',
    ruralIntonationNotes: 'Western UP and Haryana farmers prefer direct, practical numbers first: state the grams per tank immediately, followed by the safety reason.',
  },

  ta: {
    languageCode: 'ta',
    languageName: 'Tamil',
    nativeName: 'தமிழ்',
    primaryDialectRegion: 'Cauvery Delta (Thanjavur, Tiruvarur) & Erode Agrarian Zone',
    referencedSpeechDatabases: [
      'Project Vaani — Cauvery Delta & Erode',
      'AI4Bharat IndicTTS Tamil (IIT Madras)',
      'TNAU Agritech Spoken Portal Audio Glossary',
      'OpenSLR SLR71 Tamil Speech Corpus',
    ],
    speechLocale: 'ta-IN',
    geminiVoiceRecommendation: {
      voiceName: 'Kore',
      targetPitch: 1.05,
      speakingRate: 0.93,
      toneStyle: 'Respectful, lucid, melodious Tamil cadence with distinct alveolar and retroflex liquid clarity',
    },
    vernacularTerms: [
      { standardEnglish: 'Farmer / Dear Farmer', regionalVernacular: 'விவசாய தோழரே / அய்யா', phoneticPronunciation: 'Vivasaya thozhare / Ayya' },
      { standardEnglish: 'Early Blight', regionalVernacular: 'முன்கூட்டிய இலைக்கருகல் நோய்', phoneticPronunciation: 'Munkoottiya ilaik-karukal noi' },
      { standardEnglish: 'Biopesticide / Medicine', regionalVernacular: 'உயிர் பூஞ்சாணக்கொல்லி மருந்து', phoneticPronunciation: 'Uyir poonjana-kolli marunthu' },
      { standardEnglish: '15L Hand Tank Sprayer', regionalVernacular: '15 லிட்டர் கைத்தெளிப்பான் தொட்டி', phoneticPronunciation: 'Patinainthu lit-tar kai-thelippaan thotti' },
      { standardEnglish: 'Pre-Harvest Waiting Period', regionalVernacular: 'அறுவடைக்கு முந்தைய இடைவெளி', phoneticPronunciation: 'Aruvadaikku munthaiya idaiveli' },
      { standardEnglish: 'Fake / Bogus Agrochemical', regionalVernacular: 'போலி மருந்து / அங்கீகாரமற்றது', phoneticPronunciation: 'Poli marunthu / Ankeegaaram-attrathu' },
    ],
    honorificGreeting: 'வணக்கம் உழவர் பெருமக்களே! உங்கள் பயிர் பாதுகாப்புக்கு நான் எவ்வாறு உதவட்டும்?',
    phoneticGuidelines: 'Precise realization of the retroflex approximant ழ் (ḻ / zha in உழவர் and தமிழ்நாடு). Clear distinction between ர (r) and ற (ṟ). Soften intervocalic unvoiced stops appropriately.',
    ruralIntonationNotes: 'Delta farmers appreciate references to TNAU (Tamil Nadu Agricultural University) recommendations and practical tank measures like "மூடி அளவு" (cap measurement).',
  },

  kn: {
    languageCode: 'kn',
    languageName: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    primaryDialectRegion: 'Dharwad, Belagavi & Mandya Agrarian Belts',
    referencedSpeechDatabases: [
      'Project Vaani — Dharwad & Mandya',
      'AI4Bharat IndicTTS Kannada (IIT Madras)',
      'UAS Bangalore & Dharwad Krishi Vani Audio Archive',
      'OpenSLR SLR79 Kannada Speech Corpus',
    ],
    speechLocale: 'kn-IN',
    geminiVoiceRecommendation: {
      voiceName: 'Fenrir',
      targetPitch: 0.96,
      speakingRate: 0.94,
      toneStyle: 'Friendly, dignified rural cadence with melodic sentence-terminal vowels',
    },
    vernacularTerms: [
      { standardEnglish: 'Farmer Brother', regionalVernacular: 'ರೈತ ಬಾಂಧವರೇ / ಅಣ್ಣಾವ್ರೇ', phoneticPronunciation: 'Rytha baandhavare / Annavre' },
      { standardEnglish: 'Early Blight', regionalVernacular: 'ಮುಂಚಿನ ಎಲೆ ಮಚ್ಚೆ ರೋಗ', phoneticPronunciation: 'Munchina ele machhe roga' },
      { standardEnglish: 'Pesticide / Medicine', regionalVernacular: 'ಕೀಟನಾಶಕ / ಕೃಷಿ ಔಷಧ', phoneticPronunciation: 'Keetanaashaka / Krushi oushadha' },
      { standardEnglish: '15L Knapsack Tank', regionalVernacular: '15 ಲೀಟರ್ ನ್ಯಾಪ್‌ಸ್ಯಾಕ್ ಸಿಂಪಡಕ ಟ್ಯಾಂಕ್', phoneticPronunciation: 'Hadinaidu leetar knapsack simpadaka tank' },
      { standardEnglish: 'PPE Safety Gear', regionalVernacular: 'ರಕ್ಷಣಾ ಕೈಗವಸು ಮತ್ತು ಮುಖಗವಸು', phoneticPronunciation: 'Rakshanaa kaigavasu matthu mukhagavasu' },
      { standardEnglish: 'Duplicate / Counterfeit', regionalVernacular: 'ನಕಲಿ ಕೀಟನಾಶಕ / ಪರವಾನಗಿ ರಹಿತ', phoneticPronunciation: 'Nakali keetanaashaka / Paravaanagi rahitha' },
    ],
    honorificGreeting: 'ನಮಸ್ಕಾರ ರೈತ ಬಾಂಧವರೇ! ನಿಮ್ಮ ಬೆಳೆ ರಕ್ಷಣೆಗೆ ನಾನು ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?',
    phoneticGuidelines: 'Clear articulation of retroflex plosives (ಟ, ಠ, ಡ, ಢ) and lateral approximants (ಳ). Ensure correct nasalization in "ಬಾಂಧವರೇ".',
    ruralIntonationNotes: 'In North Karnataka (Dharwad/Belagavi), speech rhythm is crisp and rhythmic; in Mandya/Cauvery basin, vowels are slightly more prolonged.',
  },

  bn: {
    languageCode: 'bn',
    languageName: 'Bengali',
    nativeName: 'বাংলা',
    primaryDialectRegion: 'Nadia, Burdwan & Coastal South 24 Parganas',
    referencedSpeechDatabases: [
      'Project Vaani — Nadia & Burdwan',
      'AI4Bharat IndicTTS Bengali',
      'BCKV Krishi Katha Audio Extension Repository',
      'OpenSLR SLR37 Bengali Spoken Corpus',
    ],
    speechLocale: 'bn-IN',
    geminiVoiceRecommendation: {
      voiceName: 'Aoede',
      targetPitch: 1.04,
      speakingRate: 0.93,
      toneStyle: 'Sweet, rounded, encouraging agricultural cadence with soft open-mid vowels',
    },
    vernacularTerms: [
      { standardEnglish: 'Farmer Brother', regionalVernacular: 'কৃষক ভাই / চাষী বন্ধু', phoneticPronunciation: 'Krishok bhai / Chaashi bondhu' },
      { standardEnglish: 'Early Blight', regionalVernacular: 'আগাম পাতা ঝলসানো রোগ', phoneticPronunciation: 'Aagaam paataa jholshaano rog' },
      { standardEnglish: 'Bio-fungicide', regionalVernacular: 'জৈব ছত্রাকনাশক ওষুধ', phoneticPronunciation: 'Jaibo chhatraak-naashok oshudh' },
      { standardEnglish: '15L Knapsack Tank', regionalVernacular: '১৫ লিটার ন্যাপস্যাক স্প্রেয়ার ড্রাম', phoneticPronunciation: 'Ponaero leetaar knapsack sprayer drum' },
      { standardEnglish: 'Banned Toxic Chemical', regionalVernacular: 'সরকারিভাবে নিষিদ্ধ বিষাক্ত কীটনাশক', phoneticPronunciation: 'Sorkaaribhabe nishiddho bishaakto keetnaashok' },
    ],
    honorificGreeting: 'নমস্কার কৃষক ভাই! আপনার ফসল ও কীটনাশক সুরক্ষায় আমি কিভাবে সাহায্য করতে পারি?',
    phoneticGuidelines: 'Pronounce initial "vowel-a" with characteristic Bengali rounded "o" coloration [ɔ]. Soft dental plosives without harsh friction.',
    ruralIntonationNotes: 'Burdwan and Nadia farmers appreciate gentle, conversational reassurance followed by exact tank ml/gram measurements.',
  },

  mr: {
    languageCode: 'mr',
    languageName: 'Marathi',
    nativeName: 'मराठी',
    primaryDialectRegion: 'Nashik, Pune & Vidarbha Cotton-Soybean Valley',
    referencedSpeechDatabases: [
      'Project Vaani — Nashik & Vidarbha',
      'AI4Bharat IndicTTS Marathi',
      'MPKV Rahuri Sheti Vani Spoken Broadcasts',
      'OpenSLR SLR64 Marathi Speech Corpus',
    ],
    speechLocale: 'mr-IN',
    geminiVoiceRecommendation: {
      voiceName: 'Charon',
      targetPitch: 0.97,
      speakingRate: 0.95,
      toneStyle: 'Crisp, resolute, supportive agrarian voice with natural nasalization and clear stop releases',
    },
    vernacularTerms: [
      { standardEnglish: 'Farmer Friend', regionalVernacular: 'शेतकरी मित्र / भाऊ', phoneticPronunciation: 'Shetkari mitra / Bhaau' },
      { standardEnglish: 'Early Blight', regionalVernacular: 'टोमॅटोवरील लवकर येणारा करपा रोग', phoneticPronunciation: 'Tomatovaril lavkar yenara karpa rog' },
      { standardEnglish: 'Organic Fungicide', regionalVernacular: 'जैविक बुरशीनाशक औषध', phoneticPronunciation: 'Jaivik burshinaashak aushadh' },
      { standardEnglish: '15L Sprayer Pump', regionalVernacular: '१५ लिटर नॅपसॅक फवारणी पंप', phoneticPronunciation: 'Pंधरा litar knapsack favaarani pump' },
      { standardEnglish: 'Authentic 3D Hologram', regionalVernacular: 'अस्सल सरकारी ३डी होलोग्राम सील', phoneticPronunciation: 'Assal sarkari 3D hologram seal' },
    ],
    honorificGreeting: 'राम राम शेतकरी बांधवांनो! आपल्या पिकाच्या संरक्षणासाठी मी काय मदत करू?',
    phoneticGuidelines: 'Accurate retroflex lateral ळ (ḷ) in words like फवारणी (favāraṇī) and शेतात (shetāt). Distinct aspirated affricates (छ, झ).',
    ruralIntonationNotes: 'Nashik vineyard and vegetable growers appreciate direct references to CIBRC approvals and pre-harvest withholding safety days.',
  },

  gu: {
    languageCode: 'gu',
    languageName: 'Gujarati',
    nativeName: 'ગુજરાતી',
    primaryDialectRegion: 'Anand, Kheda & Saurashtra Agricultural Corridor',
    referencedSpeechDatabases: [
      'Project Vaani — Anand & Saurashtra',
      'AI4Bharat IndicTTS Gujarati',
      'AAU Anand Krishi Vani Audio Archives',
      'OpenSLR SLR78 Gujarati Speech Corpus',
    ],
    speechLocale: 'gu-IN',
    geminiVoiceRecommendation: {
      voiceName: 'Puck',
      targetPitch: 1.01,
      speakingRate: 0.95,
      toneStyle: 'Friendly, clear, business-savvy agrarian advice with distinct murmur vowels',
    },
    vernacularTerms: [
      { standardEnglish: 'Farmer Brother', regionalVernacular: 'ખેડૂત મિત્ર / ભાઈ', phoneticPronunciation: 'Khedut mitra / Bhai' },
      { standardEnglish: 'Early Blight', regionalVernacular: 'આગોતરો સુકારો રોગ', phoneticPronunciation: 'Aagotaro sukaaro rog' },
      { standardEnglish: 'Pesticide / Medicine', regionalVernacular: 'જંતુનાશક દવા', phoneticPronunciation: 'Jantunaashak dava' },
      { standardEnglish: '15L Knapsack Tank', regionalVernacular: '૧૫ લિટર સ્પ્રે પંપ / ટાંકી', phoneticPronunciation: 'Pandhar leetar spray pump / taanki' },
      { standardEnglish: 'Counterfeit Agrochemical', regionalVernacular: 'બનાવતી / નકલી દવાનો વેપલો', phoneticPronunciation: 'Banaavati / Nakli davaano vepalo' },
    ],
    honorificGreeting: 'જય શ્રી કૃષ્ણ ખેડૂત ભાઈ! તમારા પાકની સુરક્ષા માટે હું શી મદદ કરી શકું?',
    phoneticGuidelines: 'Clear breathy-voice murmur vowels typical of Saurashtra agrarian speech. Distinct retroflex nasal ણ (ṇ).',
    ruralIntonationNotes: 'Gujarati growers value practical return-on-investment advice and exact dosage per bigha/tank.',
  },

  pa: {
    languageCode: 'pa',
    languageName: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    primaryDialectRegion: 'Malwa, Majha & Ludhiana Agrarian Heartlands',
    referencedSpeechDatabases: [
      'Project Vaani — Ludhiana & Malwa',
      'AI4Bharat IndicTTS Punjabi',
      'PAU Kheti Sandesh Spoken Archives (Punjab Agricultural University)',
      'OpenSLR SLR68 Punjabi Speech Corpus',
    ],
    speechLocale: 'pa-IN',
    geminiVoiceRecommendation: {
      voiceName: 'Fenrir',
      targetPitch: 0.95,
      speakingRate: 0.96,
      toneStyle: 'Energetic, resonant, warm rural tone preserving Punjabi pitch tonal contours',
    },
    vernacularTerms: [
      { standardEnglish: 'Farmer Brother', regionalVernacular: 'ਕਿਸਾਨ ਵੀਰੋ / ਸਰਦਾਰ ਜੀ', phoneticPronunciation: 'Kisaan veero / Sardar ji' },
      { standardEnglish: 'Early Blight', regionalVernacular: 'ਅਗੇਤੀ ਝੁਲਸ ਰੋਗ', phoneticPronunciation: 'Ageti jhulas rog' },
      { standardEnglish: 'Pesticide / Spray', regionalVernacular: 'ਕੀਟਨਾਸ਼ਕ ਦਵਾਈ ਦਾ ਛਿੜਕਾਅ', phoneticPronunciation: 'Keetnaashak dawai da chhidkaa' },
      { standardEnglish: '15L Knapsack Dholi', regionalVernacular: '੧੫ ਲੀਟਰ ਵਾਲੀ ਸਪਰੇਅ ਢੋਲੀ', phoneticPronunciation: 'Pandraan leetar waali spray dholi' },
      { standardEnglish: 'Banned Chemicals', regionalVernacular: 'ਸਰਕਾਰ ਵੱਲੋਂ ਪਾਬੰਦੀਸ਼ੁਦਾ ਜ਼ਹਿਰਾਂ', phoneticPronunciation: 'Sarkaar wallon paabandishuda zahiraan' },
    ],
    honorificGreeting: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਕਿਸਾਨ ਵੀਰੋ! ਤੁਹਾਡੀ ਫ਼ਸਲ ਦੀ ਸੁਰੱਖਿਆ ਲਈ ਮੈਂ ਕੀ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?',
    phoneticGuidelines: 'Maintain Punjabi tone pitch shifts on historical voiced aspirates (ਘ, ਝ, ਢ, ਧ, ਭ). Crisp alveolar flaps.',
    ruralIntonationNotes: 'Punjab farmers respond warmly to PAU recommendations and practical tank math using the traditional term "ਢੋਲੀ" (dholi).',
  },

  ml: {
    languageCode: 'ml',
    languageName: 'Malayalam',
    nativeName: 'മലയാളം',
    primaryDialectRegion: 'Wayanad, Palakkad & Kuttanad Agro-Climatic Zones',
    referencedSpeechDatabases: [
      'Project Vaani — Wayanad & Palakkad',
      'AI4Bharat IndicTTS Malayalam',
      'KAU Krishi Patam Spoken Glossaries (Kerala Agricultural University)',
      'OpenSLR SLR63 Malayalam Speech Corpus',
    ],
    speechLocale: 'ml-IN',
    geminiVoiceRecommendation: {
      voiceName: 'Kore',
      targetPitch: 1.03,
      speakingRate: 0.93,
      toneStyle: 'Fluid, respectful, rhythmic South-West coastal cadence with distinct gemination',
    },
    vernacularTerms: [
      { standardEnglish: 'Dear Farmer', regionalVernacular: 'കർഷക സുഹൃത്തേ / ചേട്ടാ', phoneticPronunciation: 'Karshaka suhruthe / Chetta' },
      { standardEnglish: 'Early Blight', regionalVernacular: 'തക്കാളിയിലെ ആദ്യകാല ഇലപ്പുള്ളി രോഗം', phoneticPronunciation: 'Aadyakaala ilappulli rogam' },
      { standardEnglish: 'Biopesticide', regionalVernacular: 'ജൈവ കീടനാശിനി പ്രയോഗം', phoneticPronunciation: 'Jaiva keedanaashini prayogam' },
      { standardEnglish: '15L Sprayer Tank', regionalVernacular: '15 ലിറ്റർ നാപ്സാക് സ്പ്രേയർ ടാങ്ക്', phoneticPronunciation: 'Pathinañchu leetar knapsack sprayer tank' },
      { standardEnglish: 'Pre-Harvest Safety', regionalVernacular: 'വിളവെടുപ്പിന് മുമ്പുള്ള സുരക്ഷാ കാലാവധി', phoneticPronunciation: 'Vilaveduppinu mumbulla surakshaa kaalaavadhi' },
    ],
    honorificGreeting: 'നമസ്കാരം കർഷക സുഹൃത്തുക്കളെ! വിള സംരക്ഷണത്തിൽ ഞാൻ എങ്ങനെ സഹായിക്കണം?',
    phoneticGuidelines: 'Careful preservation of retroflex liquids (ള, ഴ) and alveolar nasals (ണ). Avoid merging soft palatals.',
    ruralIntonationNotes: 'Kerala planters highly prioritize organic inputs, KAU package of practices, and ecological stream safety.',
  },

  or: {
    languageCode: 'or',
    languageName: 'Odia',
    nativeName: 'ଓଡ଼ିଆ',
    primaryDialectRegion: 'Standard Odia Television Broadcast & Media Cadence (Bhubaneswar-Cuttack Media Standard / DD Odia, OTV, Kanak News)',
    referencedSpeechDatabases: [
      'Project Vaani — Bhubaneswar & Cuttack Broadcast Audio',
      'AI4Bharat IndicTTS Odia Neural Benchmark',
      'OUAT Krushi Katha Extension Audio Records',
      'Doordarshan Odia & Prime Television Agrarian Archives',
    ],
    speechLocale: 'or-IN',
    geminiVoiceRecommendation: {
      voiceName: 'Charon',
      targetPitch: 1.04,
      speakingRate: 0.98,
      toneStyle: 'Authoritative, energetic, and articulate Odia television news anchor / TV actor cadence with distinct inherent vowels [ɔ], sharp retroflexes, and dynamic headline-driven inflections (strictly distinct from Bengali)',
    },
    vernacularTerms: [
      { standardEnglish: 'Viewers & Farmer Brothers', regionalVernacular: 'ଦର୍ଶକ ବନ୍ଧୁ ତଥା ଚାଷୀ ଭାଇମାନେ', phoneticPronunciation: 'Darshaka bandhu tatha chaashi bhaaimaane' },
      { standardEnglish: 'Agricultural News Bulletin', regionalVernacular: 'କୃଷି ସମାଚାର ବିଶେଷ ବୁଲେଟିନ୍', phoneticPronunciation: 'Krushi samachara bishesha bulletin' },
      { standardEnglish: 'Early Blight Foliar Alert', regionalVernacular: 'ଆଗୁଆ ପତ୍ରପୋଡ଼ା ରୋଗ ସତର୍କତା', phoneticPronunciation: 'Aaguaa patrapodaa roga satarkataa' },
      { standardEnglish: 'Pesticide Application Advisory', regionalVernacular: 'କୀଟନାଶକ ଔଷଧ ସିଞ୍ଚନ ପରାମର୍ଶ', phoneticPronunciation: 'Keetanaashaka aushadha sinchana paraamarsha' },
      { standardEnglish: '15L Spray Tank Dosage', regionalVernacular: '୧୫ ଲିଟର ନାପସାକ ସ୍ପ୍ରେୟାର ଟାଙ୍କି ମାପ', phoneticPronunciation: 'Pandar leetar knapsack sprayer taanki maapa' },
      { standardEnglish: 'Counterfeit Agrochemical Warning', regionalVernacular: 'ନକଲି ଅସାଧୁ ଔଷଧ ସତର୍କତା ରିପୋର୍ଟ', phoneticPronunciation: 'Nakali asaadhu aushadha satarkataa report' },
    ],
    honorificGreeting: 'ନମସ୍କାର ଦର୍ଶକ ବନ୍ଧୁ ତଥା ଚାଷୀ ଭାଇ ଓ ଭଉଣୀମାନେ! ମୁଁ ଫାର୍ମେଟ୍ କୃଷି ସମାଚାର ବୁଲେଟିନ୍‌ରୁ। ଆପଣଙ୍କ ଫସଲର ସୁରକ୍ଷା ଓ ଉନ୍ନତ ଅମଳ ପାଇଁ ଆଜିର ମୁଖ୍ୟ ପରାମର୍ଶ କଣ ଜାଣିବାକୁ ଚାହାନ୍ତି?',
    phoneticGuidelines: 'Articulate, dramatic enunciation of Odia TV actors and news presenters. Strict preservation of open inherent vowels [ɔ] (never round vowels into "o" like in Bengali). Full non-schwa deletion on word endings. Crisp contrast between dental "ତ" [t̪] and retroflex "ଟ" [ʈ]. Sharp consonant releases and dramatic headline cadences.',
    ruralIntonationNotes: 'Modeled after leading Odia broadcast journalists (OTV, Kanak News, Doordarshan Odia). Delivers urgent pest alerts and verified agrochemical recommendations with high clarity, dynamic vocal inflection, and prime-time broadcast polish.',
  },

  ur: {
    languageCode: 'ur',
    languageName: 'Urdu',
    nativeName: 'اردو',
    primaryDialectRegion: 'Indo-Gangetic & Deccan Agrarian Belt',
    referencedSpeechDatabases: [
      'AI4Bharat IndicTTS Urdu',
      'SKUAST Shalimar & PAU Agricultural Archives',
      'OpenSLR SLR67 Urdu Spoken Corpus',
      'Project Vaani Gangetic Basin Dialect Corpus',
    ],
    speechLocale: 'ur-PK',
    geminiVoiceRecommendation: {
      voiceName: 'Charon',
      targetPitch: 0.98,
      speakingRate: 0.95,
      toneStyle: 'Courteous, dignified, articulate agrarian advisor with clear uvular and aspirated consonants',
    },
    vernacularTerms: [
      { standardEnglish: 'Respected Farmer', regionalVernacular: 'محترم کسان بھائی / جناب', phoneticPronunciation: 'Mohtaram kisaan bhai / Janaab' },
      { standardEnglish: 'Early Blight', regionalVernacular: 'ٹماٹر کی اگیتی جھلسار کی بیماری', phoneticPronunciation: 'Ageti jhoolsaar ki beemaari' },
      { standardEnglish: 'Biopesticide', regionalVernacular: 'حیاتیاتی کیڑے مار دوا', phoneticPronunciation: 'Hayaatiyaati keeday-maar dawa' },
      { standardEnglish: '15L Knapsack Tank', regionalVernacular: '15 لیٹر نیپ سیک ٹینک سپرے', phoneticPronunciation: 'Pandrah leetar knapsack tank spray' },
      { standardEnglish: 'Banned Dangerous Poison', regionalVernacular: 'سرکاری طور پر ممنوعہ زہریلی ادویات', phoneticPronunciation: 'Sarkaari taur par mamnooa zehreeli adviyaat' },
    ],
    honorificGreeting: 'السلام علیکم محترم کسان بھائی! آپ کی فصل کے تحفظ میں میں کیسے مدد کر سکتا ہوں؟',
    phoneticGuidelines: 'Crisp articulation of pharyngeal and uvular fricatives (خ, غ, ق) and soft dental plosives.',
    ruralIntonationNotes: 'Farmer communication emphasizes polite respect ("Aap"), exact dilution ratios, and safety protocols.',
  },

  en: {
    languageCode: 'en',
    languageName: 'English',
    nativeName: 'English',
    primaryDialectRegion: 'Indian English Agrarian Extension & Global Standard',
    referencedSpeechDatabases: [
      'ICAR Extension Scientist Audio Lectures',
      'AI4Bharat English-Indic Acoustic Corpus',
      'CAB International Agricultural Spoken Glossaries',
      'OpenSLR Indic English Benchmarks',
    ],
    speechLocale: 'en-IN',
    geminiVoiceRecommendation: {
      voiceName: 'Puck',
      targetPitch: 1.00,
      speakingRate: 0.94,
      toneStyle: 'Authoritative, clear, empathetic agricultural specialist accent with crisp Indian English articulation',
    },
    vernacularTerms: [
      { standardEnglish: 'Farmer', regionalVernacular: 'Progressive Farmer / Grower', phoneticPronunciation: 'Pro-gressive far-mer' },
      { standardEnglish: 'Knapsack Tank', regionalVernacular: '15-Litre Standard Knapsack Sprayer', phoneticPronunciation: 'Fif-teen lee-ter knap-sack spray-er' },
      { standardEnglish: 'Blight', regionalVernacular: 'Early Blight (Alternaria solani)', phoneticPronunciation: 'Al-ter-na-ria so-la-ni' },
      { standardEnglish: 'CIBRC', regionalVernacular: 'Central Insecticides Board & Registration Committee', phoneticPronunciation: 'C-I-B-R-C' },
    ],
    honorificGreeting: 'Welcome, Farmer! FAR[M]ATE is here to protect your harvest.',
    phoneticGuidelines: 'Clear retroflex plosives [ʈ, ɖ] characteristic of Indian English, perfectly tuned for farmers who listen to English agricultural radio.',
    ruralIntonationNotes: 'Direct, confident, highlighting safety equipment and legal gazette authenticity.',
  },

  es: {
    languageCode: 'es',
    languageName: 'Spanish',
    nativeName: 'Español',
    primaryDialectRegion: 'Latin American Smallholder Agro-Cadence (Oaxaca & Bajío)',
    referencedSpeechDatabases: [
      'Aya Multilingual Instruction Dataset (Cohere For AI)',
      'Bactrian-X Spanish Agronomy SFT Corpus',
      'FAO Agro-Voc Multilingual Spoken Corpus',
      'OpenSLR SLR61 Spanish Speech Corpus',
    ],
    speechLocale: 'es-ES',
    geminiVoiceRecommendation: {
      voiceName: 'Kore',
      targetPitch: 1.00,
      speakingRate: 0.94,
      toneStyle: 'Warm, clear, instructional agro-specialist cadence with crisp sibilants and open vowels',
    },
    vernacularTerms: [
      { standardEnglish: 'Farmer / Colleague', regionalVernacular: 'Estimado agricultor / Compañero productor', phoneticPronunciation: 'Es-ti-ma-do a-gri-cul-tor' },
      { standardEnglish: 'Early Blight', regionalVernacular: 'Tizón temprano (Alternaria solani)', phoneticPronunciation: 'Ti-zon tem-pra-no' },
      { standardEnglish: 'Biopesticide', regionalVernacular: 'Biofungicida y plaguicida orgánico', phoneticPronunciation: 'Bio-fun-gi-ci-da or-ga-ni-co' },
      { standardEnglish: '15L Sprayer Backpack', regionalVernacular: 'Mochila fumigadora o aspersor de 15 litros', phoneticPronunciation: 'Mo-chi-la fu-mi-ga-do-ra de quin-ce li-tros' },
      { standardEnglish: 'Counterfeit Agrochemical', regionalVernacular: 'Insumo adulterado o lote apócrifo', phoneticPronunciation: 'In-su-mo a-dul-te-ra-do' },
      { standardEnglish: 'Safety Gloves & Goggles', regionalVernacular: 'Guantes de nitrilo, mascarilla y gafas protectoras', phoneticPronunciation: 'Guan-tes de ni-tri-lo y mas-ca-ri-lla' },
    ],
    honorificGreeting: '¡Saludos, productor agrícola! FAR[M]ATE le asiste para proteger sus cultivos.',
    phoneticGuidelines: 'Clean Spanish syllable timing, distinct rolled and tap "r" consonants, no syllable swallowing on dosage numbers.',
    ruralIntonationNotes: 'Smallholder farmers in Latin America value empathetic, respectful terminology with exact dilution per 15L backpack tank.',
  },

  fr: {
    languageCode: 'fr',
    languageName: 'French',
    nativeName: 'Français',
    primaryDialectRegion: 'West African & Maghreb Agrarian French (Dakar / Sahel / Casablanca)',
    referencedSpeechDatabases: [
      'Aya Multilingual Agronomy Dataset',
      'CGIAR Francophone Agricultural Vocabularies',
      'Bactrian-X French Agronomic Instruction Archive',
      'OpenSLR SLR57 French Spoken Audio',
    ],
    speechLocale: 'fr-FR',
    geminiVoiceRecommendation: {
      voiceName: 'Charon',
      targetPitch: 0.98,
      speakingRate: 0.94,
      toneStyle: 'Measured, precise, extension-officer diction with well-enunciated nasal vowels',
    },
    vernacularTerms: [
      { standardEnglish: 'Farmer / Friend', regionalVernacular: 'Cher agriculteur / Producteur', phoneticPronunciation: 'Cher a-gri-cul-teur' },
      { standardEnglish: 'Early Blight', regionalVernacular: 'Alternariose de la tomate (mildiou hâtif)', phoneticPronunciation: 'Al-ter-na-ri-ose' },
      { standardEnglish: 'Biopesticide', regionalVernacular: 'Biopesticide homologué', phoneticPronunciation: 'Bio-pes-ti-ci-de ho-mo-lo-gué' },
      { standardEnglish: '15L Knapsack Sprayer', regionalVernacular: 'Pulvérisateur à dos de 15 litres', phoneticPronunciation: 'Pul-vé-ri-sa-teur à dos de quinze litres' },
      { standardEnglish: 'Counterfeit Pesticide', regionalVernacular: 'Pesticide contrefait ou non homologué', phoneticPronunciation: 'Pes-ti-ci-de con-tre-fait' },
      { standardEnglish: 'PPE Protection', regionalVernacular: 'Équipement de protection individuelle (gants, masque, lunettes)', phoneticPronunciation: 'É-qui-pe-ment de pro-tec-tion' },
    ],
    honorificGreeting: 'Bienvenue, cher producteur ! FAR[M]ATE vous conseille pour la santé de votre récolte.',
    phoneticGuidelines: 'Standard international French with crisp liaison on numbers (e.g., "quinze litres"), clear nasalization (en/an, on, in), and calm, reassuring pacing.',
    ruralIntonationNotes: 'Francophone African farmers prefer clearly separated steps for pesticide preparation with prominent protective equipment emphasis.',
  },

  pt: {
    languageCode: 'pt',
    languageName: 'Portuguese',
    nativeName: 'Português',
    primaryDialectRegion: 'Brazilian Cerrado & Rural Agrarian Cadence (Goiás / Mato Grosso)',
    referencedSpeechDatabases: [
      'Embrapa Agricultural Speech & Lexicon Archive',
      'Aya Multilingual Instruction Dataset',
      'Bactrian-X Portuguese Crop Protection Corpus',
      'OpenSLR SLR84 Portuguese Speech Dataset',
    ],
    speechLocale: 'pt-BR',
    geminiVoiceRecommendation: {
      voiceName: 'Aoede',
      targetPitch: 1.00,
      speakingRate: 0.94,
      toneStyle: 'Friendly, encouraging, practical agronomist cadence with melodic intonation',
    },
    vernacularTerms: [
      { standardEnglish: 'Farmer / Producer', regionalVernacular: 'Prezado produtor rural / Amigo do campo', phoneticPronunciation: 'Pre-za-do pro-du-tor ru-ral' },
      { standardEnglish: 'Early Blight', regionalVernacular: 'Pinta-preta do tomateiro (Alternaria)', phoneticPronunciation: 'Pin-ta pre-ta do to-ma-tei-ro' },
      { standardEnglish: 'Biological Input', regionalVernacular: 'Defensivo biológico registrado', phoneticPronunciation: 'De-fen-si-vo bio-ló-gi-co' },
      { standardEnglish: '15L Backpack Sprayer', regionalVernacular: 'Pulverizador costal de 15 litros', phoneticPronunciation: 'Pul-ve-ri-za-dor cos-tal de quin-ze li-tros' },
      { standardEnglish: 'Counterfeit / Illegal', regionalVernacular: 'Agrotóxico clandestino ou lote falsificado', phoneticPronunciation: 'Fal-si-fi-ca-do' },
      { standardEnglish: 'Protective Gear', regionalVernacular: 'EPI completo: luvas impermeáveis e máscara facial', phoneticPronunciation: 'E-P-I com-ple-to' },
    ],
    honorificGreeting: 'Olá, amigo produtor! FAR[M]ATE está ao seu lado para defender sua lavoura.',
    phoneticGuidelines: 'Brazilian Portuguese open vowels, gentle palatalization of "di" and "ti", melodious intonation with clear stress on dosage measurements.',
    ruralIntonationNotes: 'Cerrado growers appreciate direct application metrics, tank cleanliness guidance, and certified seal inspection tips.',
  },

  sw: {
    languageCode: 'sw',
    languageName: 'Swahili',
    nativeName: 'Kiswahili',
    primaryDialectRegion: 'East African Rift Valley Smallholder Accent (Arusha / Morogoro / Nakuru)',
    referencedSpeechDatabases: [
      'KALRO Agricultural Audio Glossaries (Kenya)',
      'Aya Multilingual Swahili Agronomy Corpus',
      'Bactrian-X Swahili Smallholder Knowledge Set',
      'OpenSLR SLR25 East African Swahili Speech',
    ],
    speechLocale: 'sw-KE',
    geminiVoiceRecommendation: {
      voiceName: 'Puck',
      targetPitch: 0.96,
      speakingRate: 0.94,
      toneStyle: 'Empathetic, steady, communal elder cadence with deliberate penultimate syllable stress',
    },
    vernacularTerms: [
      { standardEnglish: 'Farmer / Brother', regionalVernacular: 'Mkulima mpendwa / Ndugu mkulima', phoneticPronunciation: 'M-ku-li-ma m-pen-dwa' },
      { standardEnglish: 'Early Blight', regionalVernacular: 'Ugonjwa wa ukungu / madoa ya jani (bakatua)', phoneticPronunciation: 'U-gon-jwa wa u-ku-ngu' },
      { standardEnglish: 'Organic / Bio Medicine', regionalVernacular: 'Dawa asilia / dawa ya kibiolojia ya kuua viua wadudu', phoneticPronunciation: 'Da-wa ya ki-bio-lo-ji-a' },
      { standardEnglish: '15L Knapsack Tank', regionalVernacular: 'Bomba la mgongoni la lita kumi na tano', phoneticPronunciation: 'Bom-ba la mgo-ngo-ni la li-ta ku-mi na ta-no' },
      { standardEnglish: 'Fake / Harmful Chemical', regionalVernacular: 'Dawa feki hatari isiyo na usajili', phoneticPronunciation: 'Da-wa fe-ki ha-ta-ri' },
      { standardEnglish: 'Protective Clothing', regionalVernacular: 'Mavazi ya kujikinga: glovu, miwani na barakoa', phoneticPronunciation: 'Ma-va-zi ya ku-ji-ki-nga' },
    ],
    honorificGreeting: 'Habari za shamba ndugu mkulima! FAR[M]ATE ipo hapa kukusaidia kulinda mazao yako.',
    phoneticGuidelines: 'Clear penultimate stress (characteristic of Bantu languages), pure vowels (a, e, i, o, u), and distinct articulation of prenasalized stops (mb, nd, ng).',
    ruralIntonationNotes: 'East African smallholders prioritize respectful greetings ("Shikamoo" / "Habari za shamba"), clear water-to-chemical tank mixing steps, and safety for grazing animals.',
  },

  vi: {
    languageCode: 'vi',
    languageName: 'Vietnamese',
    nativeName: 'Tiếng Việt',
    primaryDialectRegion: 'Mekong Delta & Red River Agricultural Belts (Can Tho / Tien Giang)',
    referencedSpeechDatabases: [
      'Mekong Rice & Vegetable Extension Audio Repository',
      'Aya Multilingual Vietnamese Instruction Set',
      'Bactrian-X Vietnamese Agro-Extension Dataset',
      'OpenSLR SLR114 Vietnamese Spoken Corpus',
    ],
    speechLocale: 'vi-VN',
    geminiVoiceRecommendation: {
      voiceName: 'Kore',
      targetPitch: 1.02,
      speakingRate: 0.93,
      toneStyle: 'Clear tonal precision, courteous and practical Southern/Northern delta agronomist voice',
    },
    vernacularTerms: [
      { standardEnglish: 'Farmer / Uncle', regionalVernacular: 'Bà con nông dân / Chú bác làm vườn', phoneticPronunciation: 'Ba con nong dan' },
      { standardEnglish: 'Early Blight', regionalVernacular: 'Bệnh đốm vòng / cháy lá sớm (Alternaria)', phoneticPronunciation: 'Benh dom vong cay ca chua' },
      { standardEnglish: 'Biological Fungicide', regionalVernacular: 'Thuốc trừ nấm sinh học an toàn', phoneticPronunciation: 'Thuoc tru nam sinh hoc' },
      { standardEnglish: '15L Sprayer Tank', regionalVernacular: 'Bình xịt đeo lưng 15 lít', phoneticPronunciation: 'Binh xit deo lung muoi lam lit' },
      { standardEnglish: 'Counterfeit Pesticide', regionalVernacular: 'Thuốc bảo vệ thực vật giả / kém chất lượng', phoneticPronunciation: 'Thuoc gia kem chat luong' },
      { standardEnglish: 'Protective Equipment', regionalVernacular: 'Đồ bảo hộ lao động: găng tay, khẩu trang và kính che', phoneticPronunciation: 'Do bao ho lao dong' },
    ],
    honorificGreeting: 'Kính chào bà con nông dân! FAR[M]ATE đồng hành bảo vệ mùa màng bội thu.',
    phoneticGuidelines: 'Precise 6-tone distinction (ngang, huyền, sắc, hỏi, ngã, nặng), crisp final stops (-p, -t, -k, -c), deliberate cadence without slurring technical terms.',
    ruralIntonationNotes: 'Mekong Delta farmers respond warmest to polite addressing ("Kính chào bà con") and exact dilution per 15L backpack tank or 200L drum.',
  },

  ar: {
    languageCode: 'ar',
    languageName: 'Arabic',
    nativeName: 'العربية',
    primaryDialectRegion: 'Nile Valley & Levant Agrarian Dialect (Delta / Ghor / Gezira)',
    referencedSpeechDatabases: [
      'ACSAD Spoken Agricultural Advisory Records',
      'Aya Multilingual Arabic Agronomy Corpus',
      'Bactrian-X Arabic Crop Protection Instruction Set',
      'OpenSLR SLR32 Modern Arabic Speech Corpus',
    ],
    speechLocale: 'ar-SA',
    geminiVoiceRecommendation: {
      voiceName: 'Fenrir',
      targetPitch: 0.98,
      speakingRate: 0.92,
      toneStyle: 'Dignified, eloquent, reassuring agrarian advisor with crisp emphatic consonants',
    },
    vernacularTerms: [
      { standardEnglish: 'Respected Farmer', regionalVernacular: 'أخي المزارع الكريم / حياك الله', phoneticPronunciation: 'Akhi al-muzari al-kareem' },
      { standardEnglish: 'Early Blight', regionalVernacular: 'مرض اللفحة المبكرة على الطماطم', phoneticPronunciation: 'Al-lafhah al-mubakkirah' },
      { standardEnglish: 'Biopesticide', regionalVernacular: 'مبيد فطري حيوي مرخص', phoneticPronunciation: 'Mubeed fitri hayawi murakh-khas' },
      { standardEnglish: '15L Knapsack Sprayer', regionalVernacular: 'رشاشة الظهر سعة 15 لتراً', phoneticPronunciation: 'Rash-shashat az-zahr se-at khamsata ashar letran' },
      { standardEnglish: 'Adulterated Pesticide', regionalVernacular: 'مبيد مغشوش أو غير مسجل رسمياً', phoneticPronunciation: 'Mubeed magh-shoosh' },
      { standardEnglish: 'Safety PPE', regionalVernacular: 'معدات الوقاية: قفازات نيتريل وكمامة ونظارات', phoneticPronunciation: 'Moo-id-daat al-wiqayah' },
    ],
    honorificGreeting: 'أهلاً بك أخي المزارع! منظومة FAR[M]ATE في خدمتك لحماية محاصيلك الزراعية.',
    phoneticGuidelines: 'Crisp articulation of pharyngeal and emphatic letters (ع, ح, ص, ض, ط, ظ, ق), clear voweling, avoiding rushed speech on pesticide concentrations.',
    ruralIntonationNotes: 'Arab world farmers appreciate classical respect ("Akhi al-muzari") followed by immediate, clear knapsack dosage instructions and safety warnings.',
  },

  id: {
    languageCode: 'id',
    languageName: 'Indonesian',
    nativeName: 'Bahasa Indonesia',
    primaryDialectRegion: 'Java & Sumatra Agricultural Highland Dialect (Bandung / Malang / Karo)',
    referencedSpeechDatabases: [
      'Balitbangtan Agricultural Spoken Research Corpus',
      'Aya Multilingual Indonesian Agronomy Dataset',
      'Bactrian-X Indonesian Smallholder Crop Guidance',
      'OpenSLR SLR36 Indonesian Speech Corpus',
    ],
    speechLocale: 'id-ID',
    geminiVoiceRecommendation: {
      voiceName: 'Aoede',
      targetPitch: 1.00,
      speakingRate: 0.94,
      toneStyle: 'Polite, clear, friendly agricultural extension officer cadence',
    },
    vernacularTerms: [
      { standardEnglish: 'Farmer Friend', regionalVernacular: 'Sahabat petani / Petani teladan', phoneticPronunciation: 'Sa-ha-bat pe-ta-ni' },
      { standardEnglish: 'Early Blight', regionalVernacular: 'Penyakit bercak kering / hawar daun tomat', phoneticPronunciation: 'Pen-ya-kit ber-cak ke-ring' },
      { standardEnglish: 'Biofungicide', regionalVernacular: 'Fungisida hayati terdaftar resmi', phoneticPronunciation: 'Fun-gi-si-da ha-ya-ti' },
      { standardEnglish: '15L Backpack Tank', regionalVernacular: 'Tangki semprot punggung kapasitas 15 liter', phoneticPronunciation: 'Tang-ki sem-prot 15 li-ter' },
      { standardEnglish: 'Counterfeit Chemical', regionalVernacular: 'Pestisida palsu atau tanpa izin edar kementan', phoneticPronunciation: 'Pes-ti-si-da pal-su' },
      { standardEnglish: 'Safety PPE', regionalVernacular: 'Alat pelindung diri: sarung tangan nitril dan masker', phoneticPronunciation: 'A-lat pe-lin-dung di-ri' },
    ],
    honorificGreeting: 'Selamat datang, sahabat petani! FAR[M]ATE siap mendampingi perlindungan tanaman Anda.',
    phoneticGuidelines: 'Even syllable-timed rhythm, clean rolled "r", unambiguous vowels, clear pronunciation of numerals and milliliters.',
    ruralIntonationNotes: 'Indonesian farmers value polite courtesy ("Selamat datang, sahabat petani"), clear dosage per tangki semprot, and environmental safety reminders.',
  },
};

