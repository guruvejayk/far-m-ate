import { LanguageCode, FeatureMode } from '../types';
import { HOME_PAGE_TRANSLATIONS } from './homePageTranslations';
import { TRANSLATIONS } from '../lib/i18n/languages';

export interface LocalizedMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  timeFormatted: string;
  quickActions?: string[];
}

export interface LocalizedFeatureChatData {
  name: string;
  subtitle: string;
  badgeText: string;
  starters: string[];
  initialMessages: LocalizedMessage[];
}

export const FEATURE_CHAT_TRANSLATIONS: Partial<Record<LanguageCode, Record<string, LocalizedFeatureChatData>>> = {
  en: {
    pest: {
      name: 'Pest Doctor',
      subtitle: 'Foliar pathology, disease identification & IPM biological controls',
      badgeText: 'AI Plant Doctor',
      starters: [
        'Paddy Stem Borer Dosage',
        'Chilli Leaf Curl & Mites',
        'Cotton Bollworm Control',
        'Tomato Early Blight',
      ],
      initialMessages: [
        {
          id: 'init-pest-agent',
          sender: 'agent',
          text: 'Hello! I am your Pest Doctor and Crop Health Specialist. Describe your crop symptoms or upload a leaf photo to diagnose diseases, identify insect pests, and get immediate organic or IPM treatment recommendations.',
          timestamp: new Date().toISOString(),
          timeFormatted: '07:00 AM',
          quickActions: [
            'Diagnose leaf spots or yellowing',
            'Paddy Stem Borer remedy',
            'Chilli Leaf Curl & Mites control',
          ],
        },
      ],
    },
    counterfeit: {
      name: 'Counterfeit Detection',
      subtitle: 'CIBRC gazette validation, 3D holographic lens & batch verification',
      badgeText: 'Sentinel Lens & Verification',
      starters: [
        'Scan Bottle Camera',
        'Test Genuine FMC Coragen',
        'Test Fake CORAJEN',
        'Check Banned Pesticides List',
      ],
      initialMessages: [
        {
          id: 'init-cf-agent',
          sender: 'agent',
          text: 'Hello! I am your Counterfeit Detection & Batch Verification Assistant (VERIFY-X). Upload a photo of your pesticide container or enter a batch number, CIBRC registration number, or product name to verify 3D holograms, optical seals, and genuine manufacturer credentials.',
          timestamp: new Date().toISOString(),
          timeFormatted: '07:00 AM',
          quickActions: [
            'Inspect bottle 3D hologram',
            'Verify CIBRC registration number',
            'Test FMC Coragen batch',
          ],
        },
      ],
    },
    recommendation: {
      name: 'Recommendation System',
      subtitle: 'CIBRC & FCO verified input advisor with custom multi-tank math (5L to 200L)',
      badgeText: 'Multi-Tank Math Engine',
      starters: [
        'Verified Inputs for Tomato',
        'Calculate Dose for 16L Knapsack',
        'Calculate Dose for 20L Power Sprayer',
        'Dosage for Various Tanks (5L to 200L)',
      ],
      initialMessages: [
        {
          id: 'init-rec-agent',
          sender: 'agent',
          text: 'Hello! I am your Input Recommendation & Sprayer Math Advisor. Tell me your crop, pest/disease issue, or sprayer tank size (5L, 10L, 12L, 15L, 16L, 20L, or 200L) to get verified CIBRC/FCO inputs and precise dilution math.',
          timestamp: new Date().toISOString(),
          timeFormatted: '07:00 AM',
          quickActions: [
            'Verified inputs for my crop',
            'Calculate 15L knapsack tank dose',
            'Show dose for various tanks (5L to 200L)',
          ],
        },
      ],
    },
    registry: {
      name: 'Banned Agrochemicals',
      subtitle: 'Statutory prohibited list, neurotoxicity alerts & safer bio-alternatives',
      badgeText: 'Statutory Gazette Sentinel',
      starters: [
        'Check Monocrotophos Vegetables Ban',
        'Chlorpyrifos Gazette Order',
        '2026 Gazette Prohibited List',
        'CIBRC Approved Bio-Alternatives',
      ],
      initialMessages: [
        {
          id: 'init-reg-agent',
          sender: 'agent',
          text: 'Hello! I am your Statutory Gazette & Banned Chemicals Advisor. Ask me about prohibited pesticides under the Insecticides Act 1968, gazette restriction orders, or approved legal biological alternatives.',
          timestamp: new Date().toISOString(),
          timeFormatted: '07:00 AM',
          quickActions: [
            'Check Monocrotophos ban on vegetables',
            'Endosulfan statutory prohibition',
            'Show approved biological alternatives',
          ],
        },
      ],
    },
    dashboard: {
      name: 'FAR[M]ATE AI Agronomist',
      subtitle: 'Holistic crop intelligence, input safety & precision advisory',
      badgeText: 'Agricultural Sentinel',
      starters: [
        'Paddy Stem Borer Dosage',
        'Chilli Leaf Curl & Mites',
        'Scan Bottle Camera',
        'Test Genuine FMC Coragen',
      ],
      initialMessages: [
        {
          id: 'init-home-agent',
          sender: 'agent',
          text: 'Hello Farmer! I am FAR[M]ATE, your agricultural companion. How may I assist your crop health, disease diagnosis, product verification, or sprayer dosage today?',
          timestamp: new Date().toISOString(),
          timeFormatted: '07:00 AM',
          quickActions: [
            'Diagnose crop leaf symptoms',
            'Verify pesticide authenticity',
            'Calculate sprayer tank dosage',
          ],
        },
      ],
    },
  },

  hi: {
    pest: {
      name: 'रोग पहचान (पेस्ट डॉक्टर)',
      subtitle: 'पत्तियों के रोग, कीट पहचान और जैविक नियंत्रण सलाह',
      badgeText: 'एआई प्लांट डॉक्टर',
      starters: [
        'धान तना छेदक खुराक',
        'मिर्च मरोड़िया व माइट्स',
        'कपास सुंडी नियंत्रण',
        'टमाटर अगेती झुलसा',
      ],
      initialMessages: [
        {
          id: 'init-pest-agent',
          sender: 'agent',
          text: 'नमस्ते! मैं आपका कीट एवं फसल रोग विशेषज्ञ (पेस्ट डॉक्टर) हूँ। अपनी फसल के लक्षण बताएं या पत्ती की फोटो अपलोड करें ताकि तुरंत बीमारी की पहचान और जैविक या रासायनिक उपचार सलाह मिल सके।',
          timestamp: new Date().toISOString(),
          timeFormatted: '07:00 AM',
          quickActions: [
            'पत्तियों पर धब्बे या पीलापन',
            'धान तना छेदक का उपचार',
            'मिर्च मरोड़िया व माइट्स नियंत्रण',
          ],
        },
      ],
    },
    counterfeit: {
      name: 'सत्यापन (VERIFY-X)',
      subtitle: 'CIBRC गजट जांच, 3D होलोग्राम व बैच कोड सत्यापन',
      badgeText: 'सुरक्षा एवं सत्यापन लेंस',
      starters: [
        'कैमरा से बोतल स्कैन करें',
        'असली FMC कोराजन जांचें',
        'नकली कोराजन की पहचान',
        'प्रतिबंधित कीटनाशक सूची',
      ],
      initialMessages: [
        {
          id: 'init-cf-agent',
          sender: 'agent',
          text: 'नमस्ते! मैं आपका नकली उत्पाद पहचान एवं बैच सत्यापन सहायक (VERIFY-X) हूँ। कीटनाशक की बोतल की फोटो अपलोड करें या बैच नंबर/CIBRC पंजीकरण नंबर साझा करें ताकि 3D होलोग्राम और निर्माण की सत्यता जांची जा सके।',
          timestamp: new Date().toISOString(),
          timeFormatted: '07:00 AM',
          quickActions: [
            'बोतल का 3D होलोग्राम जांचें',
            'CIBRC पंजीकरण संख्या सत्यापित करें',
            'FMC कोराजन बैच की जांच',
          ],
        },
      ],
    },
    recommendation: {
      name: 'दवा व खुराक प्रणाली',
      subtitle: 'सत्यापित CIBRC/FCO उत्पाद व विभिन्न लीटर टंकी (5L से 200L) खुराक कैलकुलेटर',
      badgeText: 'मल्टी-टंकी खुराक कैलकुलेटर',
      starters: [
        'टमाटर के लिए सत्यापित उत्पाद बताएं',
        '16 लीटर नैपसैक टंकी की खुराक निकालें',
        '20 लीटर पावर स्प्रेयर की खुराक बताएं',
        'विभिन्न टंकियों (5L से 200L) की खुराक सूची',
      ],
      initialMessages: [
        {
          id: 'init-rec-agent',
          sender: 'agent',
          text: 'नमस्ते! मैं आपका कृषि आदान अनुशंसा एवं स्प्रेयर टंकी गणित सलाहकार हूँ। अपनी फसल, बीमारी या टंकी क्षमता (5L, 10L, 12L, 15L, 16L, 20L या 200L) बताएं और CIBRC सत्यापित उत्पाद व सटीक घोल की मात्रा जानें।',
          timestamp: new Date().toISOString(),
          timeFormatted: '07:00 AM',
          quickActions: [
            'मेरी फसल के लिए अनुशंसित उत्पाद',
            '15 लीटर नैपसैक टंकी की खुराक',
            'विभिन्न टंकियों (5L-200L) की खुराक',
          ],
        },
      ],
    },
    registry: {
      name: 'प्रतिबंधित कीटनाशक सूची',
      subtitle: 'सरकारी प्रतिबंधित सूची, विषाक्तता चेतावनी व सुरक्षित विकल्प',
      badgeText: 'सरकारी गजट संतरी',
      starters: [
        'सब्जियों पर मोनोक्रोटोफॉस प्रतिबंध',
        'क्लोरपायरीफॉस गजट आदेश',
        '2026 प्रतिबंधित रासायनिक सूची',
        'CIBRC स्वीकृत जैविक विकल्प',
      ],
      initialMessages: [
        {
          id: 'init-reg-agent',
          sender: 'agent',
          text: 'नमस्ते! मैं आपका वैधानिक गजट एवं प्रतिबंधित रसायन सलाहकार हूँ। कीटनाशक अधिनियम 1968 के तहत प्रतिबंधित दवाओं, सरकारी आदेशों और सुरक्षित कानूनी जैविक विकल्पों की जानकारी के लिए पूछें।',
          timestamp: new Date().toISOString(),
          timeFormatted: '07:00 AM',
          quickActions: [
            'सब्जियों पर मोनोक्रोटोफॉस प्रतिबंध',
            'एंडोसल्फान पर पूर्ण प्रतिबंध',
            'स्वीकृत जैविक विकल्प',
          ],
        },
      ],
    },
    dashboard: {
      name: 'FAR[M]ATE कृषि सलाहकार',
      subtitle: 'संपूर्ण फसल स्वास्थ्य, इनपुट सुरक्षा और सटीक मार्गदर्शन',
      badgeText: 'कृषि संतरी',
      starters: [
        'धान तना छेदक खुराक',
        'मिर्च मरोड़िया व माइट्स',
        'कैमरा से बोतल स्कैन करें',
        'असली FMC कोराजन जांचें',
      ],
      initialMessages: [
        {
          id: 'init-home-agent',
          sender: 'agent',
          text: 'नमस्ते किसान भाई! मैं FAR[M]ATE कृषि साथी हूँ। आज मैं आपकी फसल सुरक्षा, रोग पहचान, उत्पाद सत्यापन या टंकी खुराक में कैसे सहायता कर सकता हूँ?',
          timestamp: new Date().toISOString(),
          timeFormatted: '07:00 AM',
          quickActions: [
            'पत्तियों के रोग की पहचान करें',
            'कीटनाशक बोतल की असलियत जांचें',
            '15 लीटर टंकी की खुराक निकालें',
          ],
        },
      ],
    },
  },

  te: {
    pest: {
      name: 'తెగుళ్ల నిర్ధారణ',
      subtitle: 'ఆకుల వ్యాధులు, తెగుళ్ల గుర్తింపు మరియు జీవ నియంత్రణ',
      badgeText: 'ఏఐ ప్లాంట్ డాక్టర్',
      starters: [
        'వరి కాండం తొలిచే పురుగు మోతాదు',
        'మిరప ముడత మరియు నల్లి',
        'పత్తి గులాబీ రంగు పురుగు నివారణ',
        'టమోటా ఆకుమచ్చ తెగులు',
      ],
      initialMessages: [
        {
          id: 'init-pest-agent',
          sender: 'agent',
          text: 'నమస్కారం! నేను మీ తెగుళ్ల నిపుణుడు మరియు పంట ఆరోగ్య సలహాదారుని (పెస్ట్ డాక్టర్). తెగుళ్లు, ఆకు మచ్చలు గుర్తించడానికి మరియు సరైన నివారణలను పొందడానికి పంట లక్షణాలను వివరించండి లేదా ఆకు ఫోటోను అప్‌లోడ్ చేయండి.',
          timestamp: new Date().toISOString(),
          timeFormatted: '07:00 AM',
          quickActions: [
            'ఆకు మచ్చలు లేదా పసుపు రంగు నిర్ధారణ',
            'వరి కాండం తొలుచు పురుగు నివారణ',
            'మిరప ఆకు ముడుత మరియు నల్లి నివారణ',
          ],
        },
      ],
    },
    counterfeit: {
      name: 'నకిలీ మందుల గుర్తింపు',
      subtitle: 'CIBRC గెజిట్ తనిఖీ, 3D హోలోగ్రామ్ మరియు బ్యాచ్ ధృవీకరణ',
      badgeText: 'రక్షణ మరియు ధృవీకరణ లెన్స్',
      starters: [
        'కెమెరాతో బాటిల్ స్కాన్ చేయండి',
        'అసలైన FMC కొరాజెన్ పరీక్షించండి',
        'నకిలీ కొరాజెన్ గుర్తింపు',
        'నిషేధిత పురుగుమందుల జాబితా',
      ],
      initialMessages: [
        {
          id: 'init-cf-agent',
          sender: 'agent',
          text: 'నమస్కారం! నేను మీ నకిలీ పురుగుమందుల గుర్తింపు మరియు బ్యాచ్ ధృవీకరణ సహాయకుడిని (VERIFY-X). బాటిల్ ఫోటోను అప్‌లోడ్ చేయండి లేదా 3D హోలోగ్రామ్, CIBRC రిజిస్ట్రేషన్ మరియు తయారీదారు వివరాలను ధృవీకరించడానికి బ్యాచ్ నంబర్‌ను నమోదు చేయండి.',
          timestamp: new Date().toISOString(),
          timeFormatted: '07:00 AM',
          quickActions: [
            'బాటిల్ 3D హోలోగ్రామ్ తనిఖీ',
            'CIBRC రిజిస్ట్రేషన్ సంఖ్య ధృవీకరణ',
            'FMC కొరాజెన్ బ్యాచ్ తనిఖీ',
          ],
        },
      ],
    },
    recommendation: {
      name: 'సిఫార్సుల వ్యవస్థ',
      subtitle: 'ధృవీకరించబడిన CIBRC/FCO ఉత్పత్తులు మరియు వివిధ లీటర్ల ట్యాంకుల (5L నుండి 200L) మోతాదు ఇంజిన్',
      badgeText: 'మల్టీ-ట్యాంక్ మోతాదు ఇంజిన్',
      starters: [
        'టమోటాకు ధృవీకరించబడిన మందులు',
        '16 లీటర్ల నాప్‌సాక్ ట్యాంక్ మోతాదు',
        '20 లీటర్ల పవర్ స్ప్రేయర్ మోతాదు',
        'వివిధ ట్యాంకుల (5L నుండి 200L) మోతాదు పట్టిక',
      ],
      initialMessages: [
        {
          id: 'init-rec-agent',
          sender: 'agent',
          text: 'నమస్కారం! నేను మీ ఇన్‌పుట్ సిఫార్సు మరియు స్ప్రేయర్ ట్యాంక్ లెక్కల సలహాదారుని. ధృవీకరించబడిన CIBRC మందులు మరియు ఖచ్చితమైన మోతాదు లెక్కల కోసం మీ పంట, తెగులు లేదా ట్యాంక్ సామర్థ్యాన్ని (5L నుండి 200L) తెలియజేయండి.',
          timestamp: new Date().toISOString(),
          timeFormatted: '07:00 AM',
          quickActions: [
            'నా పంటకు ధృవీకరించబడిన మందులు',
            '15L నాప్‌సాక్ ట్యాంక్ మోతాదు లెక్కింపు',
            'వివిధ ట్యాంకుల (5L-200L) మోతాదులు',
          ],
        },
      ],
    },
    registry: {
      name: 'నిషేధిత పురుగుమందులు',
      subtitle: 'చట్టబద్ధమైన నిషేధాల జాబితా, విషపూరిత హెచ్చరికలు మరియు సురక్షిత ప్రత్యామ్నాయాలు',
      badgeText: 'గెజిట్ భద్రతా నిఘా',
      starters: [
        'కూరగాయలపై మోనోక్రోటోఫాస్ నిషేధం',
        'క్లోర్‌పైరిఫాస్ ప్రభుత్వ ఉత్తర్వు',
        '2026 నిషేధిత రసాయనాల జాబితా',
        'CIBRC ఆమోదిత జీవ ప్రత్యామ్నాయాలు',
      ],
      initialMessages: [
        {
          id: 'init-reg-agent',
          sender: 'agent',
          text: 'నమస్కారం! నేను మీ నిషేధిత పురుగుమందుల గెజిట్ సలహాదారుని. కీటకనాశనుల చట్టం 1968 ప్రకారం నిషేధించబడిన మందులు, ప్రభుత్వ నిబంధనలు మరియు సురక్షితమైన జీవసంబంధ ప్రత్యామ్నాయాల గురించి అడగండి.',
          timestamp: new Date().toISOString(),
          timeFormatted: '07:00 AM',
          quickActions: [
            'కూరగాయలపై మోనోక్రోటోఫాస్ నిషేధం',
            'ఎండోసల్ఫాన్ పూర్తి నిషేధం',
            'ఆమోదించబడిన జీవ ప్రత్యామ్నాయాలు',
          ],
        },
      ],
    },
    dashboard: {
      name: 'FAR[M]ATE వ్యవసాయ సలహాదారు',
      subtitle: 'సమగ్ర పంట సమాచారం, రసాయన భద్రత మరియు ఖచ్చితమైన సలహాలు',
      badgeText: 'వ్యవసాయ రక్షకుడు',
      starters: [
        'వరి కాండం తొలిచే పురుగు మోతాదు',
        'మిరప ముడత మరియు నల్లి',
        'కెమెరాతో బాటిల్ స్కాన్ చేయండి',
        'అసలైన FMC కొరాజెన్ పరీక్షించండి',
      ],
      initialMessages: [
        {
          id: 'init-home-agent',
          sender: 'agent',
          text: 'రైతు సోదరులకు నమస్కారం! నేను మీ వ్యవసాయ సహచరుడు FAR[M]ATE. ఈరోజు మీ పంట రక్షణ, రోగ నిర్ధారణ, ఉత్పత్తి ధృవీకరణ లేదా ట్యాంక్ మోతాదులో నేను ఎలా సహాయపడగలను?',
          timestamp: new Date().toISOString(),
          timeFormatted: '07:00 AM',
          quickActions: [
            'ఆకు తెగుళ్లను గుర్తించండి',
            'పురుగుమందు బాటిల్ అసలైనదో కాదో తనిఖీ చేయండి',
            '15 లీటర్ల ట్యాంక్ మోతాదు లెక్కించండి',
          ],
        },
      ],
    },
  },

  ta: {
    pest: {
      name: 'பயிர் மருத்துவர்',
      subtitle: 'இலை நோய்கள், பூச்சி கண்டறிதல் மற்றும் இயற்கை மேலாண்மை',
      badgeText: 'ஏஐ பயிர் மருத்துவர்',
      starters: [
        'நெல் தண்டு துளைப்பான் அளவு',
        'மிளகாய் இலை சுருட்டல் & சிலந்தி',
        'பருத்தி காய்ப்புழு கட்டுப்பாடு',
        'தக்காளி முன் பருவ கருகல்',
      ],
      initialMessages: [
        {
          id: 'init-pest-agent',
          sender: 'agent',
          text: 'வணக்கம்! நான் உங்கள் பூச்சி மற்றும் பயிர் நோய் மருத்துவ நிபுணர் (பெஸ்ட் டாக்டர்). பயிர் நோய்களைக் கண்டறிந்து சரியான மேலாண்மை முறைகளைப் பெற உங்கள் பயிர் அறிகுறிகளை விவரிக்கவும் அல்லது இலை புகைப்படத்தை பதிவேற்றவும்.',
          timestamp: new Date().toISOString(),
          timeFormatted: '07:00 AM',
          quickActions: [
            'இலை புள்ளிகள் அல்லது மஞ்சள் நிறம் கண்டறி',
            'நெல் தண்டு துளைப்பான் தீர்வு',
            'மிளகாய் இலை சுருட்டல் மற்றும் பேன் கட்டுப்பாடு',
          ],
        },
      ],
    },
    counterfeit: {
      name: 'போலி மருந்து கண்டறிதல்',
      subtitle: 'CIBRC அரசு பதிவு சரிபார்ப்பு, 3D ஹோலோகிராம் மற்றும் பேட்ச் ஆய்வு',
      badgeText: 'பாதுகாப்பு & சரிபார்ப்பு லென்ஸ்',
      starters: [
        'கேமராவில் பாட்டிலை ஸ்கேன் செய்',
        'அசல் FMC கோராஜென் சோதி',
        'போலி கோராஜென் கண்டறிதல்',
        'தடைசெய்யப்பட்ட மருந்துகள் பட்டியல்',
      ],
      initialMessages: [
        {
          id: 'init-cf-agent',
          sender: 'agent',
          text: 'வணக்கம்! நான் உங்கள் போலி பூச்சிக்கொல்லி கண்டறிதல் மற்றும் பேட்ச் சரிபார்ப்பு உதவியாளர் (VERIFY-X). 3D ஹோலோகிராம், CIBRC பதிவு எண் மற்றும் தயாரிப்பு நம்பகத்தன்மையை சரிபார்க்க பாட்டிலின் புகைப்படத்தை பதிவேற்றவும் அல்லது பேட்ச் எண்ணைப் பகிரவும்.',
          timestamp: new Date().toISOString(),
          timeFormatted: '07:00 AM',
          quickActions: [
            'பாட்டிலின் 3D ஹோலோகிராம் சரிபார்',
            'CIBRC பதிவு எண்ணை சரிபார்',
            'FMC கோராஜென் பேட்ச் சோதனை',
          ],
        },
      ],
    },
    recommendation: {
      name: 'பரிந்துரை அமைப்பு',
      subtitle: 'சரிபார்க்கப்பட்ட CIBRC/FCO தயாரிப்புகள் & பல்வேறு லிட்டர் தொட்டி (5L முதல் 200L) கணக்கீடு',
      badgeText: 'பல்வேறு தொட்டி அளவு கணக்கீடு',
      starters: [
        'தக்காளிக்கான அரசு அங்கீகரிக்கப்பட்ட மருந்துகள்',
        '16 லிட்டர் நேப்சாக் தொட்டி அளவு கணக்கிடு',
        '20 லிட்டர் பவர் ஸ்ப்ரேயர் அளவு',
        'பல்வேறு தொட்டிகளுக்கான (5L-200L) அளவு அட்டவணை',
      ],
      initialMessages: [
        {
          id: 'init-rec-agent',
          sender: 'agent',
          text: 'வணக்கம்! நான் உங்கள் பரிந்துரை மற்றும் தெளிப்பான் தொட்டி கணித ஆலோசகர். அங்கீகரிக்கப்பட்ட CIBRC உள்ளீடுகள் மற்றும் துல்லியமான அளவீடுகளைப் பெற உங்கள் பயிர், நோய் அல்லது தெளிப்பான் தொட்டி அளவைக் (5L முதல் 200L) குறிப்பிடவும்.',
          timestamp: new Date().toISOString(),
          timeFormatted: '07:00 AM',
          quickActions: [
            'என் பயிருக்கான பரிந்துரைக்கப்பட்ட மருந்துகள்',
            '15L தெளிப்பான் தொட்டி மருந்தளவு',
            'பல்வேறு தொட்டிகளுக்கான (5L-200L) அளவுகள்',
          ],
        },
      ],
    },
    registry: {
      name: 'தடைசெய்யப்பட்ட மருந்துகள்',
      subtitle: 'அரசு தடை பட்டியல், நச்சு எச்சரிக்கைகள் மற்றும் மாற்று வழிகள்',
      badgeText: 'சட்டரீதியான பாதுகாப்பு கண்காணிப்பு',
      starters: [
        'காய்கறிகளில் மோனோக்ரோட்டோபாஸ் தடை',
        'குளோர்பைரிபாஸ் அரசு உத்தரவு',
        '2026 தடைசெய்யப்பட்ட மருந்துகள் பட்டியல்',
        'CIBRC அங்கீகரிக்கப்பட்ட இயற்கை மாற்றுகள்',
      ],
      initialMessages: [
        {
          id: 'init-reg-agent',
          sender: 'agent',
          text: 'வணக்கம்! நான் உங்கள் தடைசெய்யப்பட்ட இரசாயனங்கள் மற்றும் சட்டப்பூர்வ அரசிதழ் ஆலோசகர். பூச்சிக்கொல்லி சட்டம் 1968 இன் கீழ் தடைசெய்யப்பட்ட மருந்துகள் மற்றும் பாதுகாப்பான உயிரியல் மாற்றுகளைப் பற்றி கேளுங்கள்.',
          timestamp: new Date().toISOString(),
          timeFormatted: '07:00 AM',
          quickActions: [
            'காய்கறிகளில் மோனோக்ரோட்டோபாஸ் தடை',
            'எண்டோசல்பான் முழுமையான தடை',
            'அங்கீகரிக்கப்பட்ட இயற்கை தீர்வுகள்',
          ],
        },
      ],
    },
    dashboard: {
      name: 'FAR[M]ATE விவசாய வழிகாட்டி',
      subtitle: 'முழுமையான பயிர் அறிவு, ரசாயன பாதுகாப்பு மற்றும் துல்லிய ஆலோசனை',
      badgeText: 'விவசாய பாதுகாப்பு காவலன்',
      starters: [
        'நெல் தண்டு துளைப்பான் அளவு',
        'மிளகாய் இலை சுருட்டல் & சிலந்தி',
        'கேமராவில் பாட்டிலை ஸ்கேன் செய்',
        'அசல் FMC கோராஜென் சோதி',
      ],
      initialMessages: [
        {
          id: 'init-home-agent',
          sender: 'agent',
          text: 'வணக்கம் விவசாய நண்பரே! நான் உங்கள் விவசாய உதவியாளர் FAR[M]ATE. இன்று உங்கள் பயிர் பாதுகாப்பு, நோய் கண்டறிதல், தயாரிப்பு சரிபார்ப்பு அல்லது தொட்டி அளவீட்டில் எவ்வாறு உதவ முடியும்?',
          timestamp: new Date().toISOString(),
          timeFormatted: '07:00 AM',
          quickActions: [
            'இலை நோய்களை கண்டறியவும்',
            'பூச்சிக்கொல்லி அசல் தன்மை சரிபார்க்கவும்',
            '15 லிட்டர் தெளிப்பான் அளவு கணக்கிடவும்',
          ],
        },
      ],
    },
  },

  or: {
    pest: {
      name: 'ରୋଗ ଓ ପୋକ ନିର୍ଣ୍ଣୟ ଡାକ୍ତର',
      subtitle: 'କମ୍ପ୍ୟୁଟର ଭିଜନ ଓ କୃଷି ବିଜ୍ଞାନ ଦ୍ୱାରା ପତ୍ର ରୋଗ ଏବଂ କୀଟ ଚିହ୍ନଟ',
      badgeText: 'ଏଆଇ ଉଦ୍ଭିଦ ରୋଗ ନିର୍ଣ୍ଣୟକାରୀ',
      starters: [
        'ପତ୍ରରେ ଧଳା ଦାଗ ଦେଖାଯାଉଛି',
        'କମ୍ ଖର୍ଚ୍ଚର ଜୈବିକ ଉପାୟ ଦେଖାନ୍ତୁ',
        'ସାଧାରଣ ରାସାୟନିକ ବିକଳ୍ପ ଦେଖାନ୍ତୁ',
        '୧୫ ଲିଟର ଟାଙ୍କି ମାତ୍ରା ହିସାବ କରନ୍ତୁ',
      ],
      initialMessages: [
        {
          id: 'init-pest-agent',
          sender: 'agent',
          text: 'ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କ ଫସଲ ପୋକ ରୋଗ ବିଶେଷଜ୍ଞ (ପେଷ୍ଟ୍ ଡାକ୍ତର) । ଫସଲର ରୋଗ ଚିହ୍ନଟ କରିବା ଏବଂ ତୁରନ୍ତ ସମାଧାନ ପାଇବା ପାଇଁ ପତ୍ରର ଫଟୋ ଅପଲୋଡ କରନ୍ତୁ କିମ୍ବା ଲକ୍ଷଣ ବର୍ଣ୍ଣନା କରନ୍ତୁ।',
          timestamp: new Date().toISOString(),
          timeFormatted: '07:00 AM',
          quickActions: [
            'ପତ୍ରରେ ଦାଗ ବା ହଳଦିଆ ପଡ଼ିବା ଯାଞ୍ଚ',
            'ଧାନ କାଣ୍ଡବିନ୍ଧା ପୋକ ନିୟନ୍ତ୍ରଣ',
            'ଲଙ୍କା ପତ୍ର ମୋଡ଼ା ଓ ଉକୁଣୀ ନିୟନ୍ତ୍ରଣ',
          ],
        },
      ],
    },
    counterfeit: {
      name: 'ନକଲି ଔଷଧ ଯାଞ୍ଚ ପରୀକ୍ଷାଗାର',
      subtitle: 'ସରକାରୀ ସିଆଇବିଆରସି ମଞ୍ଜୁରୀ, ହୋଲୋଗ୍ରାମ ଏବଂ ବ୍ୟାଚ୍ କୋଡ୍ ଯାଞ୍ଚ',
      badgeText: 'କୀଟନାଶକ ସୁରକ୍ଷା ଯାଞ୍ଚ',
      starters: [
        'ବୋତଲ କ୍ୟାମେରାରେ ସ୍କାନ କରନ୍ତୁ',
        'ଅସଲି FMC କୋରାଜେନ୍ ଯାଞ୍ଚ କରନ୍ତୁ',
        'ନକଲି CORAJEN ଯାଞ୍ଚ କରନ୍ତୁ',
        'ନିଷିଦ୍ଧ କୀଟନାଶକ ତାଲିକା ଦେଖନ୍ତୁ',
      ],
      initialMessages: [
        {
          id: 'init-cf-agent',
          sender: 'agent',
          text: 'ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କ ନକଲି କୀଟନାଶକ ଚିହ୍ନଟ ଏବଂ ବ୍ୟାଚ୍ ଯାଞ୍ଚ ସହାୟକ (VERIFY-X) । ୩-ଡି ହୋଲୋଗ୍ରାମ୍, CIBRC ପଞ୍ଜିକରଣ ଏବଂ ପ୍ରକୃତ ଉତ୍ପାଦନକାରୀ ତଥ୍ୟ ଯାଞ୍ଚ କରିବା ପାଇଁ ବୋତଲର ଫଟୋ ଅପଲୋଡ କରନ୍ତୁ କିମ୍ବା ବ୍ୟାଚ୍ ନମ୍ବର ଲେଖନ୍ତୁ।',
          timestamp: new Date().toISOString(),
          timeFormatted: '07:00 AM',
          quickActions: [
            'ବୋତଲର ୩-ଡି ହୋଲୋଗ୍ରାମ୍ ଯାଞ୍ଚ',
            'CIBRC ପଞ୍ଜିକରଣ ନମ୍ବର ଯାଞ୍ଚ',
            'ଅସଲି FMC କୋରାଜେନ୍ ପରୀକ୍ଷା',
          ],
        },
      ],
    },
    recommendation: {
      name: 'କୃଷି ଔଷଧ ସୁପାରିଶ',
      subtitle: 'ସରକାରୀ CIBRC/FCO ସ୍ୱୀକୃତ ଔଷଧ ଏବଂ ବିଭିନ୍ନ ଲିଟର ଟାଙ୍କି (୫ଲି ରୁ ୨୦୦ଲି) ହିସାବ',
      badgeText: 'ବିଭିନ୍ନ ଟାଙ୍କି ମାତ୍ରା ଇଞ୍ଜିନ୍',
      starters: [
        'ଟମାଟୋ ପାଇଁ ସରକାରୀ ସ୍ୱୀକୃତ ଔଷଧ',
        '୧୬ ଲିଟର ନାପସାକ୍ ଟାଙ୍କି ହିସାବ କରନ୍ତୁ',
        '୨୦ ଲିଟର ପାୱାର ସ୍ପ୍ରେୟାର ମାତ୍ରା',
        'ବିଭିନ୍ନ ଟାଙ୍କିର (୫ଲି ରୁ ୨୦୦ଲି) ମାତ୍ରା ତାଲିକା',
      ],
      initialMessages: [
        {
          id: 'init-rec-agent',
          sender: 'agent',
          text: 'ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କ କୃଷି ଔଷଧ ସୁପାରିଶ ଏବଂ ସ୍ପ୍ରେୟାର ଟାଙ୍କି ମାପ ପରାମର୍ଶଦାତା । ସରକାରୀ ଅନୁମୋଦିତ CIBRC ଔଷଧ ଏବଂ ସଠିକ୍ ଡୋଜ୍ ପାଇଁ ଆପଣଙ୍କ ଫସଲ, ରୋଗ କିମ୍ବା ସ୍ପ୍ରେୟାର ଟାଙ୍କି ମାପ (୫L ରୁ ୨୦୦L) ଜଣାନ୍ତୁ।',
          timestamp: new Date().toISOString(),
          timeFormatted: '07:00 AM',
          quickActions: [
            'ମୋ ଫସଲ ପାଇଁ ସଠିକ୍ ଔଷଧ ସୁପାରିଶ',
            '୧୫ ଲିଟର ନାପସାକ୍ ଟାଙ୍କି ମାତ୍ରା ହିସାବ',
            'ବିଭିନ୍ନ ଟାଙ୍କି (୫L-୨୦୦L) ର ମାତ୍ରା',
          ],
        },
      ],
    },
    registry: {
      name: 'ନିଷିଦ୍ଧ କୀଟନାଶକ ତାଲିକା ଯାଞ୍ଚ',
      subtitle: 'ଭାରତ ସରକାର ଏବଂ ସିଆଇବିଆରସି ଦ୍ୱାରା ବ୍ୟାନ୍ କରାଯାଇଥିବା ବିଷାକ୍ତ କୀଟନାଶକ',
      badgeText: 'ସରକାରୀ ନିଷେଧାଦେଶ',
      starters: [
        'ନିଷିଦ୍ଧ ରାସାୟନିକ ତାଲିକା ଦେଖନ୍ତୁ',
        'ମୋନୋକ୍ରୋଟୋଫସ କାହିଁକି ବ୍ୟାନ୍ ହୋଇଛି?',
        'ସୁରକ୍ଷିତ ଜୈବିକ ବିକଳ୍ପ ଖୋଜନ୍ତୁ',
        'ସିଆଇବିଆରସି ନିୟମାବଳୀ',
      ],
      initialMessages: [
        {
          id: 'init-reg-agent',
          sender: 'agent',
          text: 'ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କ ସରକାରୀ ଗେଜେଟ୍ ଏବଂ ନିଷିଦ୍ଧ କୀଟନାଶକ ପରାମର୍ଶଦାତା । କୀଟନାଶକ ଆଇନ ୧୯୬୮ ଅନୁଯାୟୀ ବ୍ୟାନ୍ ହୋଇଥିବା ଔଷଧ, ନିୟମାବଳୀ ଏବଂ ସୁରକ୍ଷିତ ଜୈବିକ ବିକଳ୍ପ ବିଷୟରେ ପଚାରନ୍ତୁ।',
          timestamp: new Date().toISOString(),
          timeFormatted: '07:00 AM',
          quickActions: [
            'ପନିପରିବାରେ ମୋନୋକ୍ରୋଟୋଫସ୍ ନିଷେଧ',
            'ଏଣ୍ଡୋସଲଫାନ୍ ସମ୍ପୂର୍ଣ୍ଣ ବ୍ୟାନ୍',
            'ଅନୁମୋଦିତ ସୁରକ୍ଷିତ ଜୈବିକ ବିକଳ୍ପ',
          ],
        },
      ],
    },
    dashboard: {
      name: 'FAR[M]ATE କୃଷି ସହାୟକ',
      subtitle: 'ସମସ୍ତ ଫସଲ ଜ୍ଞାନ, କୀଟନାଶକ ସୁରକ୍ଷା ଏବଂ ସଠିକ୍ ପରାମର୍ଶ',
      badgeText: 'କୃଷି ସୁରକ୍ଷା କବଚ',
      starters: [
        'ଧାନ କାଣ୍ଡବିନ୍ଧା ପୋକ ମାତ୍ରା',
        'ଲଙ୍କା ପତ୍ର କୁଞ୍ଚୁଡ଼ା ଓ ଉକୁଣିଆ',
        'କ୍ୟାମେରାରେ ବୋତଲ ସ୍କାନ କରନ୍ତୁ',
        'ଅସଲି FMC କୋରାଜେନ୍ ଯାଞ୍ଚ କରନ୍ତୁ',
      ],
      initialMessages: [
        {
          id: 'init-home-agent',
          sender: 'agent',
          text: 'ନମସ୍କାର ଚାଷୀ ଭାଇ! ମୁଁ ଆପଣଙ୍କର FAR[M]ATE କୃଷି ସହାୟକ। ଆଜି ଆପଣଙ୍କ ଫସଲ ସୁରକ୍ଷା, ରୋଗ ଚିହ୍ନଟ, ଔଷଧ ଯାଞ୍ଚ କିମ୍ବା ଟାଙ୍କି ଡୋଜ୍ ପାଇଁ ମୁଁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?',
          timestamp: new Date().toISOString(),
          timeFormatted: '07:00 AM',
          quickActions: [
            'ପତ୍ର ରୋଗ ନିର୍ଣ୍ଣୟ କରନ୍ତୁ',
            'କୀଟନାଶକ ଅସଲି କି ନୁହେଁ ଯାଞ୍ଚ କରନ୍ତୁ',
            '୧୫ ଲିଟର ଟାଙ୍କି ମାତ୍ରା ହିସାବ କରନ୍ତୁ',
          ],
        },
      ],
    },
  },
};

/**
 * Returns localized configuration for the given feature and language,
 * ensuring all supported languages receive native titles, badges, starters, and personalized feature chat messages.
 */
export function getLocalizedFeatureChat(feature: string, language: LanguageCode = 'en'): LocalizedFeatureChatData {
  const featureKey = (feature === 'home' || feature === 'myfarm') ? 'dashboard' : feature;

  if (FEATURE_CHAT_TRANSLATIONS[language] && FEATURE_CHAT_TRANSLATIONS[language]![featureKey]) {
    return FEATURE_CHAT_TRANSLATIONS[language]![featureKey];
  }

  // If specific dialect translation block is not present, fall back cleanly using base English config for that exact feature
  const baseEn = (FEATURE_CHAT_TRANSLATIONS.en && FEATURE_CHAT_TRANSLATIONS.en[featureKey]) || FEATURE_CHAT_TRANSLATIONS.en!.dashboard;
  const homeT = HOME_PAGE_TRANSLATIONS[language] || HOME_PAGE_TRANSLATIONS.en;
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const titleMap: Record<string, string> = {
    pest: homeT.tabPest || t.pestDoctor || baseEn.name,
    counterfeit: homeT.tabCounterfeit || t.verifyX || baseEn.name,
    recommendation: homeT.tabRecommendation || t.recommendations || baseEn.name,
    registry: homeT.sentinelTitle || 'Banned Agrochemicals',
    dashboard: homeT.tabDashboard || t.dashboard || baseEn.name,
  };

  const localizedTitle = titleMap[featureKey] || baseEn.name;

  return {
    name: localizedTitle,
    subtitle: baseEn.subtitle,
    badgeText: baseEn.badgeText,
    starters: baseEn.starters,
    initialMessages: baseEn.initialMessages,
  };
}
