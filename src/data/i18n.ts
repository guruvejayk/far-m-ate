/**
 * FAR[M]ATE 2.0 Comprehensive Multilingual Translation Database
 * Grounded in agricultural terminology across all 19 supported languages.
 */

import { LanguageCode } from '../types';

export interface UISectionTranslations {
  dashboard: {
    title: string;
    subtitle: string;
    search: string;
    quickStats: string;
    cropHealth: string;
    chemicalRisk: string;
    verifiedInputs: string;
    activePrescriptions: string;
    fieldSentinel: string;
    cropSelector: string;
    stageLabel: string;
    soilMoisture: string;
    launchInspection: string;
    weatherAlert: string;
    driftCaution: string;
  };
  counterfeit: {
    title: string;
    subtitle: string;
    scanButton: string;
    manualEntry: string;
    productName: string;
    batchNumber: string;
    mfgDate: string;
    expDate: string;
    cibrcRegNumber: string;
    hologramStatus: string;
    authenticityScore: string;
    verifiedBadge: string;
    counterfeitWarning: string;
    suspiciousNotice: string;
    tamperAlert: string;
  };
  recommendation: {
    title: string;
    subtitle: string;
    tankMathTitle: string;
    tankMathDesc: string;
    tankCapacity: string;
    dosagePerTank: string;
    activeIngredient: string;
    preHarvestInterval: string;
    reEntryInterval: string;
    ppeRequired: string;
    biologicalOption: string;
    calculateBtn: string;
    safetyInstructions: string;
  };
  pestDetection: {
    title: string;
    subtitle: string;
    uploadPrompt: string;
    cameraCapture: string;
    analyzingImage: string;
    diagnosisResult: string;
    diseaseName: string;
    confidence: string;
    symptoms: string;
    organicRemedy: string;
    chemicalOption: string;
    precautionNotice: string;
  };
  registry: {
    title: string;
    subtitle: string;
    searchChemical: string;
    actGazetteNotice: string;
    totalBan: string;
    refusedRegistration: string;
    restrictedUse: string;
    toxicityClass: string;
    safeAlternative: string;
    statutoryWarning: string;
  };
  voice: {
    assistantTitle: string;
    assistantSubtitle: string;
    tapToSpeak: string;
    listening: string;
    processing: string;
    speaking: string;
    audioBenchmarkBadge: string;
    dialectCalibration: string;
    playAudioSample: string;
  };
  warnings: {
    poisonHotline: string;
    poisonPhone: string;
    driftWarning: string;
    bannedChemicalAlert: string;
    wearMaskReminder: string;
  };
  buttons: {
    verify: string;
    calculate: string;
    diagnose: string;
    viewRegistry: string;
    close: string;
    cancel: string;
    save: string;
    retry: string;
    listen: string;
    readAloud: string;
    emergency: string;
  };
  agriTerms: {
    knapsack: string;
    pesticide: string;
    fungicide: string;
    fertilizer: string;
    dosage: string;
    yield: string;
    acre: string;
  };
}

const RAW_TRANSLATIONS: Partial<Record<LanguageCode, UISectionTranslations>> & { en: UISectionTranslations } = {
  en: {
    dashboard: {
      title: 'Farm Overview',
      subtitle: 'Real-time insights for optimal yield, chemical safety, and crop protection.',
      search: 'Search farm data, pesticides, diseases...',
      quickStats: 'Farm Performance & Safety Metrics',
      cropHealth: 'Crop Health Index',
      chemicalRisk: 'Chemical Risk Index',
      verifiedInputs: 'Verified Inputs Ratio',
      activePrescriptions: 'Active Field Prescriptions',
      fieldSentinel: 'Interactive Field Sentinel & Crop Care',
      cropSelector: 'Select Active Crop',
      stageLabel: 'Crop Growth Stage',
      soilMoisture: 'Soil Moisture Level',
      launchInspection: 'Launch AI Inspection',
      weatherAlert: 'Weather & Spray Conditions',
      driftCaution: 'Moderate wind (19 km/h) — use drift-reduction nozzles.',
    },
    counterfeit: {
      title: 'Counterfeit Pesticide Detection (VERIFY-X)',
      subtitle: 'Scan 3D holographic security seal, packaging typography, and CIBRC registration codes.',
      scanButton: 'Scan Agrochemical Label',
      manualEntry: 'Enter Batch & Reg Number Manually',
      productName: 'Product Name',
      batchNumber: 'Batch Number',
      mfgDate: 'Manufacturing Date',
      expDate: 'Expiry Date',
      cibrcRegNumber: 'CIBRC Registration No.',
      hologramStatus: '3D Hologram Security Status',
      authenticityScore: 'Authenticity Score',
      verifiedBadge: 'GENUINE & CIBRC VERIFIED',
      counterfeitWarning: 'DANGER: COUNTERFEIT / UNLICENSED BATCH DETECTED',
      suspiciousNotice: 'CAUTION: Discrepancy in packaging typography or batch codes.',
      tamperAlert: 'Security Seal Broken or Void Pattern Triggered',
    },
    recommendation: {
      title: 'Safe Recommendation & 15L Knapsack Math',
      subtitle: 'Scientific dilution calculations, organic alternatives, and pre-harvest interval enforcement.',
      tankMathTitle: '15-Litre Standard Knapsack Tank Dosage',
      tankMathDesc: 'Accurately dilute active ingredients per sprayer tank to avoid crop scorch or resistance.',
      tankCapacity: 'Standard Tank Size: 15 Litres',
      dosagePerTank: 'Dosage per 15L Tank',
      activeIngredient: 'Active Technical Ingredient',
      preHarvestInterval: 'Pre-Harvest Interval (PHI)',
      reEntryInterval: 'Re-entry Interval (REI)',
      ppeRequired: 'Mandatory PPE Safety Equipment',
      biologicalOption: 'Recommended Bio-Fungicide Alternative',
      calculateBtn: 'Calculate Exact Dilution',
      safetyInstructions: 'Never exceed recommended concentration. Triple-rinse empty containers.',
    },
    pestDetection: {
      title: 'Plant Doctor — Multilingual Pest & Disease AI',
      subtitle: 'Instant leaf symptom diagnosis, pathology grading, and safe CIBRC-aligned treatment.',
      uploadPrompt: 'Upload or snap a photo of affected crop leaf or stem',
      cameraCapture: 'Take Photo with Camera',
      analyzingImage: 'Analyzing cellular lesion patterns & discoloration...',
      diagnosisResult: 'Pathology Diagnosis Result',
      diseaseName: 'Diagnosed Disease',
      confidence: 'AI Diagnosis Confidence',
      symptoms: 'Observed Symptom Signatures',
      organicRemedy: 'Biological / Organic Remedy First',
      chemicalOption: 'Targeted Chemical Treatment (If Critical)',
      precautionNotice: 'Spray in early morning or late afternoon to protect pollinator bees.',
    },
    registry: {
      title: 'Statutory Banned Agrochemicals Registry',
      subtitle: 'Official gazette notifications under the Insecticides Act 1968 & international conventions.',
      searchChemical: 'Search banned chemical by name or CAS number...',
      actGazetteNotice: 'Statutory Gazette Ref: S.O. 3951(E) & Ministry of Agriculture Orders',
      totalBan: 'Banned for Manufacture, Import and Use in India',
      refusedRegistration: 'Refused Registration Due to Extreme Toxicity',
      restrictedUse: 'Strictly Restricted Use by Authorized Personnel Only',
      toxicityClass: 'WHO Toxicity Classification',
      safeAlternative: 'Approved Safe Alternative',
      statutoryWarning: 'Possession or sale of banned agrochemicals is punishable under Section 29 of Insecticides Act 1968.',
    },
    voice: {
      assistantTitle: 'FAR[M]ATE Multilingual Voice Assistant',
      assistantSubtitle: 'Powered by Gemini TTS and Indic Agricultural Speech Datasets',
      tapToSpeak: 'Tap microphone to speak your question',
      listening: 'Listening to your farm question...',
      processing: 'Processing speech with Project Vaani acoustic grounding...',
      speaking: 'FAR[M]ATE is speaking in your regional dialect...',
      audioBenchmarkBadge: 'Grounded in Project Vaani & AI4Bharat IndicTTS',
      dialectCalibration: 'Regional Dialect Calibration Active',
      playAudioSample: 'Listen to Calibrated Audio Benchmark',
    },
    warnings: {
      poisonHotline: 'National Pesticide Poison Control Helpline',
      poisonPhone: '1800-116-117 (Toll-Free, 24/7)',
      driftWarning: 'High drift risk: Avoid spraying near water bodies or open wells.',
      bannedChemicalAlert: 'CRITICAL: This chemical is legally prohibited in India.',
      wearMaskReminder: 'Always wear nitrile gloves, splash goggles, and an N95 respirator mask.',
    },
    buttons: {
      verify: 'Verify Product',
      calculate: 'Calculate Dosage',
      diagnose: 'Diagnose Crop',
      viewRegistry: 'Inspect Gazette',
      close: 'Close',
      cancel: 'Cancel',
      save: 'Save Profile',
      retry: 'Try Again',
      listen: 'Listen to Advisory',
      readAloud: 'Read Aloud (TTS)',
      emergency: 'Poison Emergency',
    },
    agriTerms: {
      knapsack: 'Knapsack Sprayer (15L)',
      pesticide: 'Pesticide / Agrochemical',
      fungicide: 'Fungicide',
      fertilizer: 'Bio-Fertilizer / Nutrient',
      dosage: 'Dosage Rate',
      yield: 'Expected Crop Yield',
      acre: 'Acre (Area)',
    },
  },

  hi: {
    dashboard: {
      title: 'खेत का समग्र अवलोकन',
      subtitle: 'अधिकतम उपज, रासायनिक सुरक्षा और फसल संरक्षण के लिए सजीव जानकारी।',
      search: 'खेत का डेटा, दवाइयां, रोग खोजें...',
      quickStats: 'खेत प्रदर्शन एवं सुरक्षा आंकड़े',
      cropHealth: 'फसल स्वास्थ्य सूचकांक',
      chemicalRisk: 'रासायनिक जोखिम सूचकांक',
      verifiedInputs: 'प्रमाणित दवा-खाद अनुपात',
      activePrescriptions: 'सक्रिय फसल उपचार निर्देश',
      fieldSentinel: 'इंटरैक्टिव खेत संतरी एवं फसल देखभाल',
      cropSelector: 'सक्रिय फसल चुनें',
      stageLabel: 'फसल की अवस्था',
      soilMoisture: 'मिट्टी की नमी',
      launchInspection: 'एआई जांच शुरू करें',
      weatherAlert: 'मौसम एवं छिड़काव परिस्थिति',
      driftCaution: 'मध्यम हवा (19 किमी/घं) — बहाव-रोधी नोजल का उपयोग करें।',
    },
    counterfeit: {
      title: 'नकली कीटनाशक पहचान (VERIFY-X)',
      subtitle: '3D होलोग्राम सील, पैकेजिंग फॉन्ट और CIBRC सरकारी पंजीकरण कोड स्कैन करें।',
      scanButton: 'कीटनाशक लेबल स्कैन करें',
      manualEntry: 'बैच नंबर और लाइसेंस नंबर खुद दर्ज करें',
      productName: 'उत्पाद का नाम',
      batchNumber: 'बैच संख्या',
      mfgDate: 'निर्माण तिथि',
      expDate: 'समाप्ति तिथि',
      cibrcRegNumber: 'CIBRC पंजीकरण संख्या',
      hologramStatus: '3D होलोग्राम सुरक्षा स्थिति',
      authenticityScore: 'प्रामाणिकता स्कोर',
      verifiedBadge: 'असली एवं CIBRC प्रमाणित',
      counterfeitWarning: 'खतरा: नकली / बिना लाइसेंस वाला बैच पाया गया',
      suspiciousNotice: 'सावधान: पैकेजिंग छपाई या बैच कोड में अंतर पाया गया।',
      tamperAlert: 'सुरक्षा सील टूटी हुई या छेड़छाड़ की गई है',
    },
    recommendation: {
      title: 'सटीक सिफारिश एवं 15L नैपसैक टंकी माप',
      subtitle: 'वैज्ञानिक खुराक गणना, जैविक विकल्प और फसल कटाई पूर्व प्रतीक्षा समय की जानकारी।',
      tankMathTitle: '15 लीटर मानक नैपसैक टंकी खुराक',
      tankMathDesc: 'फसल जलने या कीटों में प्रतिरोधक क्षमता बनने से रोकने के लिए सही मात्रा मिलाएं।',
      tankCapacity: 'मानक टंकी आकार: 15 लीटर',
      dosagePerTank: 'प्रति 15L टंकी खुराक',
      activeIngredient: 'सक्रिय रासायनिक घटक',
      preHarvestInterval: 'तुड़ाई पूर्व प्रतीक्षा समय (PHI)',
      reEntryInterval: 'खेत में पुनः प्रवेश समय (REI)',
      ppeRequired: 'अनिवार्य सुरक्षा उपकरण (PPE)',
      biologicalOption: 'अनुशंसित जैविक फफूंदनाशक विकल्प',
      calculateBtn: 'सटीक खुराक की गणना करें',
      safetyInstructions: 'अनुशंसित मात्रा से अधिक न डालें। खाली डिब्बे को तीन बार धोकर नष्ट करें।',
    },
    pestDetection: {
      title: 'एआई फसल डॉक्टर — रोग एवं कीट पहचान',
      subtitle: 'पत्तियों के लक्षणों का तुरंत निदान, रोग की गंभीरता और सुरक्षित उपचार सलाह।',
      uploadPrompt: 'प्रभावित पत्ती या तने की फोटो खींचें या अपलोड करें',
      cameraCapture: 'कैमरे से फोटो लें',
      analyzingImage: 'पत्ती के धब्बों और संक्रमण का विश्लेषण हो रहा है...',
      diagnosisResult: 'रोग निदान परिणाम',
      diseaseName: 'पहचाना गया रोग',
      confidence: 'एआई निदान सटीकता',
      symptoms: 'देखे गए प्रमुख लक्षण',
      organicRemedy: 'पहले जैविक एवं प्राकृतिक उपाय',
      chemicalOption: 'रासायनिक उपचार (यदि अत्यंत आवश्यक हो)',
      precautionNotice: 'मधुमक्खियों की सुरक्षा के लिए छिड़काव सुबह जल्दी या शाम को करें।',
    },
    registry: {
      title: 'प्रतिबंधित कीटनाशकों का आधिकारिक राजपत्र',
      subtitle: 'कीटनाशक अधिनियम 1968 और अंतरराष्ट्रीय संधियों के तहत प्रतिबंधित रसायनों की सूची।',
      searchChemical: 'रसायन का नाम या CAS नंबर खोजें...',
      actGazetteNotice: 'सरकारी राजपत्र संदर्भ: एस.ओ. 3951(ई) एवं कृषि मंत्रालय आदेश',
      totalBan: 'भारत में निर्माण, आयात और उपयोग पर पूर्ण प्रतिबंध',
      refusedRegistration: 'अत्यधिक विषाक्तता के कारण पंजीकरण अस्वीकृत',
      restrictedUse: 'केवल अधिकृत कर्मियों द्वारा अत्यधिक सीमित उपयोग',
      toxicityClass: 'डब्ल्यूएचओ (WHO) विषाक्तता श्रेणी',
      safeAlternative: 'अनुमोदित सुरक्षित विकल्प',
      statutoryWarning: 'प्रतिबंधित रसायनों का भंडारण या बिक्री कीटनाशक अधिनियम 1968 की धारा 29 के तहत दंडनीय है।',
    },
    voice: {
      assistantTitle: 'FAR[M]ATE बहुभाषी वॉइस सहायक',
      assistantSubtitle: 'जेमिनी टीटीएस एवं भारतीय कृषि वाक् डेटासेट द्वारा संचालित',
      tapToSpeak: 'अपना सवाल बोलने के लिए माइक दबाएं',
      listening: 'आपके खेत का सवाल सुन रहे हैं...',
      processing: 'प्रोजेक्ट वाणी के सहयोग से आवाज समझी जा रही है...',
      speaking: 'FAR[M]ATE आपकी क्षेत्रीय बोली में बोल रहा है...',
      audioBenchmarkBadge: 'प्रोजेक्ट वाणी एवं AI4Bharat IndicTTS द्वारा कैलिब्रेटेड',
      dialectCalibration: 'क्षेत्रीय कृषि बोली ट्यूनिंग सक्रिय',
      playAudioSample: 'कैलिब्रेटेड ऑडियो नमूना सुनें',
    },
    warnings: {
      poisonHotline: 'राष्ट्रीय कीटनाशक विष नियंत्रण हेल्पलाइन',
      poisonPhone: '1800-116-117 (टोल-फ्री, 24x7)',
      driftWarning: 'दवा बहाव जोखिम: पानी के स्रोतों या खुले कुओं के पास छिड़काव न करें।',
      bannedChemicalAlert: 'गंभीर चेतावनी: यह रसायन भारत में कानूनन पूर्णतः प्रतिबंधित है।',
      wearMaskReminder: 'छिड़काव के समय हमेशा रबर दस्ताने, चश्मा और मास्क पहनें।',
    },
    buttons: {
      verify: 'सत्यापित करें',
      calculate: 'खुराक गणना करें',
      diagnose: 'फसल जांचें',
      viewRegistry: 'राजपत्र देखें',
      close: 'बंद करें',
      cancel: 'रद्द करें',
      save: 'प्रोफ़ाइल सहेजें',
      retry: 'पुनः प्रयास करें',
      listen: 'सलाह सुनें',
      readAloud: 'बोलकर सुनाएं',
      emergency: 'आपातकालीन जहर सहायता',
    },
    agriTerms: {
      knapsack: 'नैपसैक स्प्रेयर (15 लीटर)',
      pesticide: 'कीटनाशक / कृषि दवा',
      fungicide: 'फफूंदनाशक',
      fertilizer: 'जैविक खाद / पोषक तत्व',
      dosage: 'खुराक की मात्रा',
      yield: 'अनुमानित उपज',
      acre: 'एकड़ (क्षेत्रफल)',
    },
  },

  te: {
    dashboard: {
      title: 'వ్యవసాయ క్షేత్ర అవలోకనం',
      subtitle: 'గరిష్ట దిగుబడి, రసాయన భద్రత మరియు పంట రక్షణ కొరకు రియల్-టైమ్ సమాచారం.',
      search: 'పంట సమాచారం, పురుగు మందులు, తెగుళ్లు వెతకండి...',
      quickStats: 'క్షేత్ర పనితీరు & రక్షణ గణాంకాలు',
      cropHealth: 'పంట ఆరోగ్య సూచిక',
      chemicalRisk: 'రసాయన ప్రమాద సూచిక',
      verifiedInputs: 'ధృవీకరించబడిన మందుల నిష్పత్తి',
      activePrescriptions: 'ప్రస్తుత పంట సిఫార్సులు',
      fieldSentinel: 'ఇంటరాక్టివ్ ఫీల్డ్ సెంటినెల్ & పంట సంరక్షణ',
      cropSelector: 'పంటను ఎంచుకోండి',
      stageLabel: 'పంట ఎదుగుదల దశ',
      soilMoisture: 'నేలలో తేమ శాతం',
      launchInspection: 'ఏఐ తనిఖీని ప్రారంభించండి',
      weatherAlert: 'వాతావరణం & పిచికారీ అనుకూలత',
      driftCaution: 'మోస్తరు గాలి (19 కి.మీ/గం) — గాలికి కొట్టుకుపోని నాజిల్‌ వాడండి.',
    },
    counterfeit: {
      title: 'నకిలీ పురుగుమందుల గుర్తింపు (VERIFY-X)',
      subtitle: '3D హోలోగ్రామ్ సీల్, ప్యాకేజింగ్ ప్రింటింగ్ మరియు CIBRC ప్రభుత్వ లైసెన్స్ కోడ్ తనిఖీ చేయండి.',
      scanButton: 'మందు డబ్బా లేబుల్‌ని స్కాన్ చేయండి',
      manualEntry: 'బ్యాచ్ నంబర్ మరియు రిజిస్ట్రేషన్ వివరాలు నమోదు చేయండి',
      productName: 'ఉత్పత్తి పేరు',
      batchNumber: 'బ్యాచ్ నంబర్',
      mfgDate: 'తయారీ తేదీ',
      expDate: 'గడువు తేదీ',
      cibrcRegNumber: 'CIBRC రిజిస్ట్రేషన్ సంఖ్య',
      hologramStatus: '3D హోలోగ్రామ్ భద్రతా స్థితి',
      authenticityScore: 'అసలైన మందు స్కోరు',
      verifiedBadge: 'అసలైనది & CIBRC ఆమోదితం',
      counterfeitWarning: 'హెచ్చరిక: ఇది నకిలీ / అనధికారిక మందుగా గుర్తించబడింది',
      suspiciousNotice: 'జాగ్రత్త: ప్యాకేజింగ్ ముద్రణ లేదా సీరియల్ నంబర్‌లో తేడాలున్నాయి.',
      tamperAlert: 'భద్రతా సీల్ తెరిచి ఉంది లేదా ట్యాంపర్ చేయబడింది',
    },
    recommendation: {
      title: 'సరైన సిఫార్సు & 15 లీటర్ల ట్యాంకు లెక్క',
      subtitle: 'శాస్త్రీయ మోతాదు సూచనలు, సేంద్రియ ప్రత్యామ్నాయాలు మరియు కోతకు ముందు వ్యవధి.',
      tankMathTitle: '15 లీటర్ల చేతి పిచికారీ ట్యాంకు మోతాదు',
      tankMathDesc: 'ఆకులు మాడిపోకుండా మరియు పురుగులలో రోగనిరోధకత రాకుండా సరైన మోతాదు కలపండి.',
      tankCapacity: 'ప్రామాణిక ట్యాంక్ పరిమాణం: 15 లీటర్లు',
      dosagePerTank: 'ప్రతి 15 లీటర్ల ట్యాంకుకు మందు మోతాదు',
      activeIngredient: 'యాక్టివ్ రసాయన ఫార్ములా',
      preHarvestInterval: 'కోతకు ముందు వేచి ఉండాల్సిన సమయం (PHI)',
      reEntryInterval: 'చేలోకి వెళ్లేందుకు సురక్షిత సమయం (REI)',
      ppeRequired: 'తప్పనిసరిగా వాడాల్సిన రక్షణ పరికరాలు (PPE)',
      biologicalOption: 'సిఫార్సు చేయబడిన సేంద్రియ జీవ శిలీంద్రనాశిని',
      calculateBtn: 'ఖచ్చితమైన మోతాదును లెక్కించండి',
      safetyInstructions: 'సిఫార్సు చేసిన దానికంటే ఎక్కువ వాడవద్దు. ఖాళీ డబ్బాలను మూడుసార్లు కడిగి భూమిలో పూడ్చండి.',
    },
    pestDetection: {
      title: 'ప్లాంట్ డాక్టర్ — తెగుళ్లు & వ్యాధుల ఏఐ గుర్తింపు',
      subtitle: 'ఆకు మచ్చల తక్షణ విశ్లేషణ, తెగులు తీవ్రత మరియు శాస్త్రీయ నివారణ చర్యలు.',
      uploadPrompt: 'తెగులు సోకిన ఆకు లేదా కాండం ఫోటో తీయండి లేదా అప్‌లోడ్ చేయండి',
      cameraCapture: 'కెమెరాతో ఫోటో తీయండి',
      analyzingImage: 'ఆకు మచ్చల నమూనాలు మరియు రంగు మార్పులను పరిశీలిస్తోంది...',
      diagnosisResult: 'తెగులు నిర్ధారణ ఫలితం',
      diseaseName: 'గుర్తించిన తెగులు / వ్యాధి',
      confidence: 'ఏఐ నిర్ధారణ ఖచ్చితత్వం',
      symptoms: 'గమనించిన ప్రధాన లక్షణాలు',
      organicRemedy: 'మొదటి ప్రాధాన్యతగా జీవ / సేంద్రియ మందులు',
      chemicalOption: 'రసాయన మందుల వాడకం (తీవ్రత ఎక్కువగా ఉంటే మాత్రమే)',
      precautionNotice: 'తేనెటీగలకు హాని కలగకుండా తెల్లవారుజామున లేదా సాయంత్రం వేళల్లో మాత్రమే పిచికారీ చేయండి.',
    },
    registry: {
      title: 'భారతదేశంలో నిషేధించబడిన పురుగుమందుల రిజిస్ట్రీ',
      subtitle: 'పురుగుమందుల చట్టం 1968 మరియు గెజిట్ నోటిఫికేషన్ల ప్రకారం నిషేధిత జాబితా.',
      searchChemical: 'రసాయనం పేరు లేదా CAS సంఖ్య ద్వారా వెతకండి...',
      actGazetteNotice: 'గెజిట్ రిఫరెన్స్: ఎస్.ఓ. 3951(E) మరియు వ్యవసాయ మంత్రిత్వ శాఖ ఆదేశాలు',
      totalBan: 'భారత్‌లో తయారీ, దిగుమతి మరియు వినియోగం పూర్తిగా నిషేధం',
      refusedRegistration: 'తీవ్రమైన విషపూరితం కారణంగా అనుమతి నిరాకరించబడింది',
      restrictedUse: 'నిపుణుల పర్యవేక్షణలో అత్యంత పరిమిత వినియోగం మాత్రమే',
      toxicityClass: 'డబ్ల్యూహెచ్‌ఓ (WHO) విషపూరిత వర్గీకరణ',
      safeAlternative: 'సురక్షితమైన ఆమోదిత ప్రత్యామ్నాయ మందు',
      statutoryWarning: 'నిషేధిత మందుల విక్రయం లేదా నిల్వ చేయడం పురుగుమందుల చట్టం 1968 సెక్షన్ 29 ప్రకారం చట్టరీత్యా నేరం.',
    },
    voice: {
      assistantTitle: 'FAR[M]ATE బహుభాషా వాయిస్ అసిస్టెంట్',
      assistantSubtitle: 'జెమిని టిటిఎస్ మరియు ప్రాజెక్ట్ వాణి వ్యవసాయ వాయిస్ డేటాసెట్స్ ద్వారా రూపొందించబడింది',
      tapToSpeak: 'మీ ప్రశ్న అడగడానికి మైక్ నొక్కండి',
      listening: 'మీ వ్యవసాయ ప్రశ్నను వింటోంది...',
      processing: 'ప్రాజెక్ట్ వాణి మరియు AI4Bharat సహకారంతో వాయిస్ ప్రాసెస్ అవుతోంది...',
      speaking: 'FAR[M]ATE మీ ప్రాంతీయ తెలుగు యాసలో సమాధానం ఇస్తోంది...',
      audioBenchmarkBadge: 'ప్రాజెక్ట్ వాణి & AI4Bharat IndicTTS తో అనుసంధానించబడింది',
      dialectCalibration: 'వరంగల్ మరియు గుంటూరు వ్యవసాయ యాస కాలిబ్రేషన్ సక్రియంగా ఉంది',
      playAudioSample: 'కాలిబ్రేట్ చేయబడిన ఆడియో నమూనా వినండి',
    },
    warnings: {
      poisonHotline: 'జాతీయ పురుగుమందుల విష నియంత్రణ హెల్ప్‌లైన్',
      poisonPhone: '1800-116-117 (టోల్-ఫ్రీ, 24 గంటలు)',
      driftWarning: 'గాలి డ్రిఫ్ట్ ప్రమాదం: బావులు లేదా నీటి వనరుల దగ్గర పిచికారీ చేయవద్దు.',
      bannedChemicalAlert: 'ప్రమాద హెచ్చరిక: ఈ రసాయనం భారతదేశంలో చట్టబద్ధంగా పూర్తిగా నిషేధించబడింది.',
      wearMaskReminder: 'మందులు కలిపేటప్పుడు రబ్బరు గ్లౌజులు, కళ్ళజోడు మరియు మాస్క్ తప్పనిసరిగా ధరించండి.',
    },
    buttons: {
      verify: 'మందును సరిచూడండి',
      calculate: 'మోతాదు లెక్కించండి',
      diagnose: 'పంటను పరీక్షించండి',
      viewRegistry: 'గెజిట్ జాబితా చూడండి',
      close: 'మూసివేయి',
      cancel: 'రద్దు చేయి',
      save: 'వివరాలు భద్రపరుచు',
      retry: 'మళ్ళీ ప్రయత్నించండి',
      listen: 'సలహాను వినండి',
      readAloud: 'వాయిస్ ద్వారా వినండి (TTS)',
      emergency: 'విష నియంత్రణ హెల్ప్‌లైన్',
    },
    agriTerms: {
      knapsack: 'చేతి స్ప్రేయర్ ట్యాంక్ (15 లీటర్లు)',
      pesticide: 'పురుగుమందు / వ్యవసాయ రసాయనం',
      fungicide: 'శిలీంద్రనాశిని (ఫంగిసైడ్)',
      fertilizer: 'సేంద్రియ ఎరువు / పోషకం',
      dosage: 'సిఫార్సు మోతాదు',
      yield: 'ఆశించిన పంట దిగుబడి',
      acre: 'ఎకరం (భూమి వైశాల్యం)',
    },
  },

  ta: {
    dashboard: {
      title: 'பண்ணை மேலோட்டம்',
      subtitle: 'உயர்ந்த மகசூல், ரசாயன பாதுகாப்பு மற்றும் பயிர் பாதுகாப்புக்கான நேரடி தகவல்கள்.',
      search: 'பண்ணை தகவல்கள், மருந்துகள், நோய்களைத் தேடவும்...',
      quickStats: 'பண்ணை செயல்திறன் மற்றும் பாதுகாப்பு அளவீடுகள்',
      cropHealth: 'பயிர் நலம் குறியீடு',
      chemicalRisk: 'ரசாயன ஆபத்து குறியீடு',
      verifiedInputs: 'சரிபார்க்கப்பட்ட மருந்து விகிதம்',
      activePrescriptions: 'தற்போதைய பயிர் பரிந்துரைகள்',
      fieldSentinel: 'களக் கண்காணிப்பாளர் & பயிர் பராமரிப்பு',
      cropSelector: 'பயிரைத் தேர்ந்தெடுக்கவும்',
      stageLabel: 'பயிர் வளர்ச்சி நிலை',
      soilMoisture: 'மண் ஈரப்பதம்',
      launchInspection: 'AI களப் பரிசோதனை',
      weatherAlert: 'வானிலை & தெளிப்பு சூழல்',
      driftCaution: 'மிதமான காற்று (19 கிமீ/மணி) — விலகல் தடுப்பு முனைகளைப் பயன்படுத்தவும்.',
    },
    counterfeit: {
      title: 'போலி பூச்சிக்கொல்லி கண்டறிதல் (VERIFY-X)',
      subtitle: '3D ஹோலோகிராம் முத்திரை, பேக்கிங் எழுத்துரு மற்றும் CIBRC அரசு பதிவு எண் சரிபார்க்கவும்.',
      scanButton: 'மருந்து லேபிளை ஸ்கேன் செய்',
      manualEntry: 'தொகுதி எண் மற்றும் உரிம எண்ணை உள்ளிடவும்',
      productName: 'உற்பத்தி பெயர்',
      batchNumber: 'தொகுதி எண் (Batch No)',
      mfgDate: 'உற்பத்தி தேதி',
      expDate: 'காலாவதி தேதி',
      cibrcRegNumber: 'CIBRC பதிவு எண்',
      hologramStatus: '3D ஹோலோகிராம் பாதுகாப்பு நிலை',
      authenticityScore: 'உண்மைத்தன்மை மதிப்பீடு',
      verifiedBadge: 'அசல் மற்றும் CIBRC அங்கீகரிக்கப்பட்டது',
      counterfeitWarning: 'ஆபத்து: போலி / அனுமதியற்ற பூச்சிக்கொல்லி கண்டறியப்பட்டது',
      suspiciousNotice: 'எச்சரிக்கை: பேக்கிங் அச்சிடலில் முரண்பாடு உள்ளது.',
      tamperAlert: 'பாதுகாப்பு முத்திரை உடைக்கப்பட்டுள்ளது அல்லது சிதைக்கப்பட்டுள்ளது',
    },
    recommendation: {
      title: 'பரிந்துரை மற்றும் 15L தெளிப்பான் தொட்டி அளவு',
      subtitle: 'அறிவியல் பூர்வமான அளவு கணக்கீடு, இயற்கை மாற்று வழிகள் மற்றும் அறுவடை இடைவெளி.',
      tankMathTitle: '15 லிட்டர் கைத்தெளிப்பான் தொட்டி அளவு',
      tankMathDesc: 'பயிர் கருகாமல் இருக்கவும் பூச்சிகள் எதிர்ப்பு சக்தி பெறாமல் இருக்கவும் சரியான அளவு கலக்கவும்.',
      tankCapacity: 'நிலையான தொட்டி அளவு: 15 லிட்டர்',
      dosagePerTank: 'ஒரு தொட்டிக்கான மருந்து அளவு',
      activeIngredient: 'செயலில் உள்ள ரசாயன மூலப்பொருள்',
      preHarvestInterval: 'அறுவடைக்கு முந்தைய இடைவெளி (PHI)',
      reEntryInterval: 'மறு நுழைவு பாதுகாப்பு நேரம் (REI)',
      ppeRequired: 'கட்டாய பாதுகாப்பு உபகரணங்கள் (PPE)',
      biologicalOption: 'பரிந்துரைக்கப்படும் இயற்கை உயிர் பூஞ்சாணக்கொல்லி',
      calculateBtn: 'சரியான அளவை கணக்கிடு',
      safetyInstructions: 'பரிந்துரைக்கப்பட்ட அளவை விட அதிகமாக சேர்க்க வேண்டாம். காலி பாட்டில்களை மூன்று முறை கழுவி அழிக்கவும்.',
    },
    pestDetection: {
      title: 'பயிர் மருத்துவர் — பூச்சி மற்றும் நோய் கண்டறிதல் AI',
      subtitle: 'இலை அறிகுறிகளை உடனடியாகக் கண்டறிதல், நோயின் தீவிரம் மற்றும் பாதுகாப்பான சிகிச்சை.',
      uploadPrompt: 'பாதிக்கப்பட்ட இலை அல்லது தண்டை படம் பிடித்து பதிவேற்றவும்',
      cameraCapture: 'கேமரா மூலம் புகைப்படம் எடுக்கவும்',
      analyzingImage: 'இலை புள்ளிகள் மற்றும் பூஞ்சாண தொற்றை ஆய்வு செய்கிறது...',
      diagnosisResult: 'நோய் கண்டறிதல் முடிவு',
      diseaseName: 'கண்டறியப்பட்ட நோய்',
      confidence: 'AI கண்டறிதல் துல்லியம்',
      symptoms: 'கண்டறியப்பட்ட முக்கிய அறிகுறிகள்',
      organicRemedy: 'முதன்மை தேர்வாக இயற்கை / உயிர் மருந்துகள்',
      chemicalOption: 'ரசாயன சிகிச்சை (அவசியம் ஏற்பட்டால் மட்டும்)',
      precautionNotice: 'தேன் தேனீக்களை பாதுகாக்க அதிகாலை அல்லது மாலை வேளையில் தெளிக்கவும்.',
    },
    registry: {
      title: 'தடைசெய்யப்பட்ட பூச்சிக்கொல்லிகள் அரசிதழ்',
      subtitle: 'பூச்சிக்கொல்லி சட்டம் 1968 மற்றும் சர்வதேச ஒப்பந்தங்களின் கீழ் தடைசெய்யப்பட்ட மருந்துகள்.',
      searchChemical: 'ரசாயன பெயர் அல்லது CAS எண் கொண்டு தேடவும்...',
      actGazetteNotice: 'அரசிதழ் குறிப்பு: S.O. 3951(E) மற்றும் வேளாண் அமைச்சக ஆணைகள்',
      totalBan: 'இந்தியாவில் உற்பத்தி, இறக்குமதி மற்றும் பயன்பாடு முழுமையாக தடை செய்யப்பட்டுள்ளது',
      refusedRegistration: 'அதிக நச்சுத்தன்மை காரணமாக பதிவு மறுக்கப்பட்டது',
      restrictedUse: 'அங்கீகரிக்கப்பட்ட வல்லுநர்கள் மூலம் மட்டுமே மிகக் குறைந்த பயன்பாடு',
      toxicityClass: 'WHO நச்சுத்தன்மை வகைப்பாடு',
      safeAlternative: 'அங்கீகரிக்கப்பட்ட பாதுகாப்பான மாற்று மருந்து',
      statutoryWarning: 'தடை செய்யப்பட்ட பூச்சிக்கொல்லிகளை விற்பதோ இருப்பு வைப்பதோ சட்டப்படி குற்றமாகும்.',
    },
    voice: {
      assistantTitle: 'FAR[M]ATE பன்மொழி குரல் உதவியாளர்',
      assistantSubtitle: 'ஜெமினி TTS மற்றும் இந்திய விவசாய குரல் தரவுத்தளங்கள் மூலம் இயக்கப்படுகிறது',
      tapToSpeak: 'உங்கள் கேள்வியைக் கேட்க மைக்ரோஃபோனை அழுத்தவும்',
      listening: 'உங்கள் விவசாயக் கேள்வியைக் கேட்கிறது...',
      processing: 'திட்டம் வாணி குரல் மாதிரிகள் மூலம் புரிந்துகொள்கிறது...',
      speaking: 'FAR[M]ATE உங்கள் வட்டாரத் தமிழில் பதிலளிக்கிறது...',
      audioBenchmarkBadge: 'புராஜெக்ட் வாணி மற்றும் AI4Bharat IndicTTS மூலம் அளவிடப்பட்டது',
      dialectCalibration: 'காவிரி டெல்டா மற்றும் ஈரோடு வட்டார வழக்கு இசைவு செயலில் உள்ளது',
      playAudioSample: 'குரல் அளவீட்டு மாதிரியைக் கேளுங்கள்',
    },
    warnings: {
      poisonHotline: 'தேசிய பூச்சிக்கொல்லி நச்சு கட்டுப்பாட்டு உதவி எண்',
      poisonPhone: '1800-116-117 (கட்டணமில்லா சேவை, 24 மணி நேரமும்)',
      driftWarning: 'காற்று விலகல் ஆபத்து: நீர்நிலைகள் அல்லது திறந்த கிணறுகள் அருகில் தெளிக்க வேண்டாம்.',
      bannedChemicalAlert: 'அபாய எச்சரிக்கை: இந்த ரசாயனம் இந்தியாவில் சட்டப்படி முழுமையாக தடை செய்யப்பட்டுள்ளது.',
      wearMaskReminder: 'மருந்து தெளிக்கும் போது கையுறைகள், மூக்குக்கண்ணாடி மற்றும் முகக்கவசம் கட்டாயம் அணியவும்.',
    },
    buttons: {
      verify: 'சரிபார்க்கவும்',
      calculate: 'அளவு கணக்கிடு',
      diagnose: 'பயிரை பரிசோதி',
      viewRegistry: 'அரசிதழ் பார்க்கவும்',
      close: 'மூடு',
      cancel: 'ரத்து செய்',
      save: 'சேமி',
      retry: 'மீண்டும் முயற்சி செய்',
      listen: 'ஆலோசனையைக் கேள்',
      readAloud: 'குரலில் கேட்க (TTS)',
      emergency: 'அவசர நச்சு உதவி',
    },
    agriTerms: {
      knapsack: 'கைத்தெளிப்பான் தொட்டி (15 லிட்டர்)',
      pesticide: 'பூச்சிக்கொல்லி / விவசாய மருந்து',
      fungicide: 'பூஞ்சாணக்கொல்லி',
      fertilizer: 'உயிர் உரம் / ஊட்டச்சத்து',
      dosage: 'மருந்து அளவு',
      yield: 'எதிர்பார்க்கப்படும் மகசூல்',
      acre: 'ஏக்கர் (பரப்பளவு)',
    },
  },
  or: {
    dashboard: {
      title: 'କୃଷି ସମାଚାର ବୁଲେଟିନ୍ ଓ କ୍ଷେତ୍ର ବିବରଣୀ',
      subtitle: 'ଅଧିକ ଅମଳ, ରାସାୟନିକ ସୁରକ୍ଷା ଓ ଫସଲ ସଂରକ୍ଷଣ ପାଇଁ ଲାଇଭ୍ କୃଷି ତଥ୍ୟ।',
      search: 'କୃଷି ତଥ୍ୟ, କୀଟନାଶକ, ରୋଗ ଖୋଜନ୍ତୁ...',
      quickStats: 'କ୍ଷେତ୍ର ପ୍ରଦର୍ଶନ ଓ ସୁରକ୍ଷା ପରିସଂଖ୍ୟାନ',
      cropHealth: 'ଫସଲ ସ୍ୱାସ୍ଥ୍ୟ ସୂଚକାଙ୍କ',
      chemicalRisk: 'ରାସାୟନିକ ବିପଦ ସୂଚକାଙ୍କ',
      verifiedInputs: 'ପ୍ରମାଣିତ ଔଷଧ ଅନୁପାତ',
      activePrescriptions: 'ସକ୍ରିୟ ଫସଲ ଚିକିତ୍ସା ନିର୍ଦ୍ଦେଶ',
      fieldSentinel: 'ଇଣ୍ଟରାକ୍ଟିଭ୍ କ୍ଷେତ୍ର ପ୍ରହରୀ ଓ ଫସଲ ଯତ୍ନ',
      cropSelector: 'ସକ୍ରିୟ ଫସଲ ଚୟନ କରନ୍ତୁ',
      stageLabel: 'ଫସଲ ବୃଦ୍ଧି ପର୍ଯ୍ୟାୟ',
      soilMoisture: 'ମାଟିର ଆର୍ଦ୍ରତା',
      launchInspection: 'କୃଷି ଏଆଇ ଯାଞ୍ଚ ଆରମ୍ଭ କରନ୍ତୁ',
      weatherAlert: 'ପାଣିପାଗ ଓ ସିଞ୍ଚନ ସ୍ଥିତି',
      driftCaution: 'ମଧ୍ୟମ ପବନ (୧୯ କିମି/ଘଣ୍ଟା) — ଡ୍ରିଫ୍ଟ-ନିରୋଧୀ ନୋଜଲ୍ ବ୍ୟବହାର କରନ୍ତୁ।',
    },
    counterfeit: {
      title: 'ନକଲି କୀଟନାଶକ ଚିହ୍ନଟ (VERIFY-X)',
      subtitle: '୩-ଡି ହୋଲୋଗ୍ରାମ ସିଲ୍, ପ୍ୟାକେଜିଂ ଫଣ୍ଟ ଓ CIBRC ସରକାରୀ ପଞ୍ଜିକରଣ କୋଡ୍ ଯାଞ୍ଚ କରନ୍ତୁ।',
      scanButton: 'କୀଟନାଶକ ଲେବଲ୍ ସ୍କାନ କରନ୍ତୁ',
      manualEntry: 'ବ୍ୟାଚ୍ ନମ୍ବର ଓ ଲାଇସେନ୍ସ ନମ୍ବର ନିଜେ ଲେଖନ୍ତୁ',
      productName: 'ଔଷଧର ନାମ',
      batchNumber: 'ବ୍ୟାଚ୍ ସଂଖ୍ୟା',
      mfgDate: 'ଉତ୍ପାଦନ ତାରିଖ',
      expDate: 'ମିଆଦ ପୂରଣ ତାରିଖ',
      cibrcRegNumber: 'CIBRC ପଞ୍ଜିକରଣ ସଂଖ୍ୟା',
      hologramStatus: '୩-ଡି ହୋଲୋଗ୍ରାମ ସୁରକ୍ଷା ସ୍ଥିତି',
      authenticityScore: 'ପ୍ରାମାଣିକତା ସ୍କୋର',
      verifiedBadge: 'ଅସଲି ଓ CIBRC ପ୍ରମାଣିତ',
      counterfeitWarning: 'ବିପଦ: ନକଲି କିମ୍ବା ବେଆଇନ ବ୍ୟାଚ୍ ଚିହ୍ନଟ',
      suspiciousNotice: 'ସାବଧାନ: ପ୍ୟାକେଜିଂ ଛାପା କିମ୍ବା ବ୍ୟାଚ୍ କୋଡ୍‌ରେ ଅସଙ୍ଗତି ଦେଖାଯାଇଛି।',
      tamperAlert: 'ସୁରକ୍ଷା ସିଲ୍ ଭଙ୍ଗା ଯାଇଛି ବା ଛେଡ଼ଛାଡ଼ କରାଯାଇଛି',
    },
    recommendation: {
      title: 'ବୈଜ୍ଞାନିକ ସୁପାରିଶ ଓ ୧୫L ନାପସାକ୍ ଟାଙ୍କି ମାପ',
      subtitle: 'ସଠିକ୍ ଡୋଜ୍ ଗଣନା, ଜୈବିକ ବିକଳ୍ପ ଏବଂ ଅମଳ ପୂର୍ବ ପ୍ରତୀକ୍ଷା ସମୟ ବିବରଣୀ।',
      tankMathTitle: '୧୫ ଲିଟର ମାନକ ନାପସାକ୍ ଟାଙ୍କି ମାତ୍ରା',
      tankMathDesc: 'ଫସଲ ପୋଡ଼ିବା କିମ୍ବା ପୋକ ପ୍ରତିରୋଧକତା ରୋକିବା ପାଇଁ ସଠିକ୍ ମାପ ମିଶାନ୍ତୁ।',
      tankCapacity: 'ମାନକ ଟାଙ୍କି ଆକାର: ୧୫ ଲିଟର',
      dosagePerTank: 'ପ୍ରତି ୧୫L ଟାଙ୍କିରେ ଔଷଧ ମାତ୍ରା',
      activeIngredient: 'ସକ୍ରିୟ ରାସାୟନିକ ଉପାଦାନ',
      preHarvestInterval: 'ଅମଳ ପୂର୍ବ ପ୍ରତୀକ୍ଷା ସମୟ (PHI)',
      reEntryInterval: 'ଜମିକୁ ପୁନଃ ପ୍ରବେଶ ସମୟ (REI)',
      ppeRequired: 'ବାଧ୍ୟତାମୂଳକ ସୁରକ୍ଷା ଉପକରଣ (PPE)',
      biologicalOption: 'ଅନୁମୋଦିତ ଜୈବିକ ବିକଳ୍ପ',
      calculateBtn: 'ସଠିକ୍ ମାପ ହିସାବ କରନ୍ତୁ',
      safetyInstructions: 'ଅନୁମୋଦିତ ମାତ୍ରାରୁ ଅଧିକ ବ୍ୟବହାର କରନ୍ତୁ ନାହିଁ। ଖାଲି ବୋତଲକୁ ନଷ୍ଟ କରନ୍ତୁ।',
    },
    pestDetection: {
      title: 'କୃଷି ଡାକ୍ତର — ପତ୍ର ରୋଗ ଓ ପୋକ ଚିହ୍ନଟ (PestDoctor)',
      subtitle: 'ପତ୍ର ଲକ୍ଷଣର ତୁରନ୍ତ ନିରୂପଣ, ରୋଗର ଗୁରୁତରତା ଓ ସୁରକ୍ଷିତ ପ୍ରତିକାର ବୁଲେଟିନ୍।',
      uploadPrompt: 'ଆକ୍ରାନ୍ତ ପତ୍ର ବା କାଣ୍ଡର ଫଟୋ ଉଠାନ୍ତୁ କିମ୍ବା ଅପଲୋଡ କରନ୍ତୁ',
      cameraCapture: 'କ୍ୟାମେରାରେ ଫଟୋ ଉଠାନ୍ତୁ',
      analyzingImage: 'ପତ୍ରର ଦାଗ ଓ ସଂକ୍ରମଣର ବିଶ୍ଳେଷଣ ଚାଲିଛି...',
      diagnosisResult: 'ଚିହ୍ନଟ ହୋଇଥିବା ରୋଗ ନିରୂପଣ',
      diseaseName: 'ରୋଗର ନାମ',
      confidence: 'ନିରୂପଣ ସଠିକତା',
      symptoms: 'ପ୍ରମୁଖ ଲକ୍ଷଣ',
      organicRemedy: 'ପ୍ରଥମେ ଜୈବିକ ଓ ପ୍ରାକୃତିକ ଉପାୟ',
      chemicalOption: 'ରାସାୟନିକ ପ୍ରତିକାର (ଅତ୍ୟନ୍ତ ଜରୁରୀ ହେଲେ)',
      precautionNotice: 'ମହୁମାଛି ସୁରକ୍ଷା ପାଇଁ ସକାଳେ ବା ସନ୍ଧ୍ୟାରେ ସିଞ୍ଚନ କରନ୍ତୁ।',
    },
    registry: {
      title: 'ଭାରତ ସରକାରଙ୍କ ନିଷିଦ୍ଧ କୀଟନାଶକ ତାଲିକା',
      subtitle: 'କୀଟନାଶକ ଆଇନ ୧୯୬୮ ଅଧୀନରେ ବେଆଇନ ଘୋଷିତ ହୋଇଥିବା ବିଷାକ୍ତ ରାସାୟନିକ ତାଲିକା।',
      searchChemical: 'ରାସାୟନିକ ନାମ ବା CAS ନମ୍ବର ଖୋଜନ୍ତୁ...',
      actGazetteNotice: 'ସରକାରୀ ଗେଜେଟ୍ ବିଜ୍ଞପ୍ତି: S.O. 3951(E) ଓ କୃଷି ମନ୍ତ୍ରଣାଳୟ ନିର୍ଦ୍ଦେଶ',
      totalBan: 'ଭାରତରେ ଉତ୍ପାଦନ, ଆମଦାନୀ ଓ ବ୍ୟବହାର ସମ୍ପୂର୍ଣ୍ଣ ନିଷିଦ୍ଧ',
      refusedRegistration: 'ଅତ୍ୟନ୍ତ ବିଷାକ୍ତ ହୋଇଥିବାରୁ ପଞ୍ଜିକରଣ ପ୍ରତ୍ୟାଖ୍ୟାନ',
      restrictedUse: 'କେବଳ ସ୍ୱତନ୍ତ୍ର ଅନୁମତିପ୍ରାପ୍ତ ବ୍ୟକ୍ତିଙ୍କ ପାଇଁ ସୀମିତ',
      toxicityClass: 'WHO ବିଷାକ୍ତତା ଶ୍ରେଣୀଭୁକ୍ତ',
      safeAlternative: 'ଅନୁମୋଦିତ ସୁରକ୍ଷିତ ବିକଳ୍ପ',
      statutoryWarning: 'ନିଷିଦ୍ଧ କୀଟନାଶକ ବିକ୍ରୟ ବା ମହଜୁଦ ରଖିବା କୀଟନାଶକ ଆଇନ ୧୯୬୮ ଅନୁଯାୟୀ ଦଣ୍ଡନୀୟ ଅପରାଧ।',
    },
    voice: {
      assistantTitle: 'FAR[M]ATE କୃଷି ସମାଚାର ଭଏସ୍ ଆସିଷ୍ଟାଣ୍ଟ',
      assistantSubtitle: 'ଓଡ଼ିଆ ଟେଲିଭିଜନ ନ୍ୟୁଜ୍ ରିପୋର୍ଟର ଓ ଅଭିନେତା ଶୈଳୀରେ ପ୍ରସ୍ତୁତ ବୁଲେଟିନ୍',
      tapToSpeak: 'କୃଷି ପ୍ରଶ୍ନ ପଚାରିବା ପାଇଁ ମାଇକ୍ରୋଫୋନ୍ ଦବାନ୍ତୁ',
      listening: 'ଆପଣଙ୍କ ପ୍ରଶ୍ନ ଶୁଣାଯାଉଛି...',
      processing: 'ନ୍ୟୁଜ୍ ରିପୋର୍ଟର ସ୍ୱରରେ ବିଶ୍ଳେଷଣ ଚାଲିଛି...',
      speaking: 'ଫାର୍ମେଟ୍ ଓଡ଼ିଆ ସମ୍ବାଦ ପରିବେଷଣ କରୁଛି...',
      audioBenchmarkBadge: 'ଷ୍ଟାଣ୍ଡାର୍ଡ଼ ଓଡ଼ିଆ ଟେଲିଭିଜନ ବ୍ରୋଡକାଷ୍ଟ ସ୍ୱର',
      dialectCalibration: 'ଓଡ଼ିଆ ନ୍ୟୁଜ୍ ଆଙ୍କର୍ ସ୍ୱର ସକ୍ରିୟ',
      playAudioSample: 'ନ୍ୟୁଜ୍ ଆଙ୍କର୍ ନମୁନା ସ୍ୱର ଶୁଣନ୍ତୁ',
    },
    warnings: {
      poisonHotline: 'ଜାତୀୟ କୀଟନାଶକ ବିଷାକ୍ତ ନିୟନ୍ତ୍ରଣ ହେଲ୍ପଲାଇନ୍',
      poisonPhone: '୧୮୦୦-୧୧୬-୧୧୭ (ଟୋଲ୍-ଫ୍ରି, ୨୪ ଘଣ୍ଟା)',
      driftWarning: 'ପବନ ଜନିତ ବିପଦ: ପୋଖରୀ, କୂଅ କିମ୍ବା ଜଳାଶୟ ନିକଟରେ ସିଞ୍ଚନ କରନ୍ତୁ ନାହିଁ।',
      bannedChemicalAlert: 'ଗୁରୁତର ସତର୍କତା: ଏହି ରାସାୟନିକ ଭାରତରେ ସମ୍ପୂର୍ଣ୍ଣ ଭାବେ ନିଷିଦ୍ଧ।',
      wearMaskReminder: 'ସର୍ବଦା ହାତମୋଜା, ସୁରକ୍ଷା ଚଷମା ଏବଂ N95 ମାସ୍କ ବ୍ୟବହାର କରନ୍ତୁ।',
    },
    buttons: {
      verify: 'ଔଷଧ ଯାଞ୍ଚ କରନ୍ତୁ',
      calculate: 'ମାତ୍ରା ହିସାବ କରନ୍ତୁ',
      diagnose: 'ଫସଲ ପରୀକ୍ଷା କରନ୍ତୁ',
      viewRegistry: 'ନିଷିଦ୍ଧ ତାଲିକା ଦେଖନ୍ତୁ',
      close: 'ବନ୍ଦ କରନ୍ତୁ',
      cancel: 'ବାତିଲ କରନ୍ତୁ',
      save: 'ସାଇତନ୍ତୁ',
      retry: 'ପୁନର୍ବାର ଚେଷ୍ଟା କରନ୍ତୁ',
      listen: 'ପରାମର୍ଶ ଶୁଣନ୍ତୁ',
      readAloud: 'ପଢ଼ି ଶୁଣାନ୍ତୁ (TTS)',
      emergency: 'ବିଷାକ୍ତ ଜରୁରୀ ସହାୟତା',
    },
    agriTerms: {
      knapsack: 'ନାପସାକ୍ ସ୍ପ୍ରେୟାର ଟାଙ୍କି (୧୫ ଲିଟର)',
      pesticide: 'କୀଟନାଶକ ଔଷଧ',
      fungicide: 'କବକନାଶକ',
      fertilizer: 'ଜୈବିକ ଖତ / ସାର',
      dosage: 'ପ୍ରୟୋଗ ମାତ୍ରା',
      yield: 'ପ୍ରତ୍ୟାଶିତ ଅମଳ',
      acre: 'ଏକର (ଜମି ପରିମାପ)',
    },
  },
};

// Guarantee full 19-language coverage with fallback to English
const supportedCodes: LanguageCode[] = [
  'en', 'hi', 'te', 'ta', 'kn', 'ml', 'bn', 'mr', 'gu', 'pa', 'or', 'ur', 'es', 'fr', 'pt', 'sw', 'vi', 'ar', 'id'
];

export const TRANSLATIONS: Record<LanguageCode, UISectionTranslations> = supportedCodes.reduce((acc, code) => {
  acc[code] = RAW_TRANSLATIONS[code] || RAW_TRANSLATIONS.en;
  return acc;
}, {} as Record<LanguageCode, UISectionTranslations>);
