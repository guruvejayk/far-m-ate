/**
 * FAR[M]ATE 2.0 Home Page & Dashboard Multilingual Translation Database
 * Dedicated interface translations for the farm overview dashboard across all 19 supported languages.
 */

import { LanguageCode } from '../types';

export interface HomePageStrings {
  farmOverview: string;
  farmSubtitle: string;
  searchPlaceholder: string;
  tabDashboard: string;
  tabMyFarm: string;
  tabCounterfeit: string;
  tabRecommendation: string;
  tabPest: string;
  weatherTemp: string;
  weatherCondition: string;
  weatherHumidity: string;
  weatherWind: string;
  sprayCautionBadge: string;
  sprayCautionNotice: string;
  
  // Feature Cards
  cardCounterfeitBadge: string;
  cardCounterfeitTitle: string;
  cardCounterfeitDesc: string;
  cardCounterfeitAction: string;

  cardRecommendationBadge: string;
  cardRecommendationTitle: string;
  cardRecommendationDesc: string;
  cardRecommendationAction: string;

  cardPestBadge: string;
  cardPestTitle: string;
  cardPestDesc: string;
  cardPestAction: string;

  cardRegistryBadge: string;
  cardRegistryTitle: string;
  cardRegistryDesc: string;
  cardRegistryAction: string;

  // Field Sentinel Section
  sentinelTitle: string;
  cropTomato: string;
  cropWheat: string;
  cropRice: string;
  cropCotton: string;

  // Diagnostics Right Panel
  diagnosticsBadge: string;
  diagnosticsHeading: string;
  diagnosticsDesc: string;
  fieldBlockLabel: string;
  cropStageLabel: string;
  cropStageValue: string;
  soilMoistureLabel: string;
  soilMoistureValue: string;
  launchInspectionBtn: string;

  // Sentinel 3D Labels
  fieldActiveStatus: string;
  driftRiskModerate: string;
  safeSprayingWindow: string;
}

export const HOME_PAGE_TRANSLATIONS: Record<LanguageCode, HomePageStrings> = {
  en: {
    farmOverview: 'Farm Overview',
    farmSubtitle: 'Real-time insights for optimal yield, chemical safety, and crop protection.',
    searchPlaceholder: 'Search farm data, pesticides, disease...',
    tabDashboard: 'Dashboard',
    tabMyFarm: 'My Farm',
    tabCounterfeit: 'Counterfeit',
    tabRecommendation: 'Recommendation System',
    tabPest: 'Pest Detection',
    weatherTemp: '29°C',
    weatherCondition: 'Partly Cloudy',
    weatherHumidity: 'Humidity: 48%',
    weatherWind: 'Wind: 19 km/h',
    sprayCautionBadge: 'Spray: CAUTION',
    sprayCautionNotice: 'Moderate wind conditions (19 km/h). Use drift-reduction nozzles.',
    
    cardCounterfeitBadge: 'HOLOGRAM & LENS',
    cardCounterfeitTitle: 'Counterfeit Detection',
    cardCounterfeitDesc: 'Inspect 3D holograms, CIBRC registration & packaging authenticity before spraying.',
    cardCounterfeitAction: 'Verify Product',

    cardRecommendationBadge: '15L KNAPSACK MATH',
    cardRecommendationTitle: 'Recommendation System',
    cardRecommendationDesc: 'Calculate exact 15L knapsack tank dilution dosages and pre-harvest intervals.',
    cardRecommendationAction: 'Calculate Dosage',

    cardPestBadge: 'PLANT DOCTOR',
    cardPestTitle: 'Pest Detection',
    cardPestDesc: 'Diagnose leaf spots, stem borers, and fungal infections with AI plant doctor.',
    cardPestAction: 'Diagnose Crop',

    cardRegistryBadge: 'STATUTORY GAZETTE',
    cardRegistryTitle: 'Banned Pesticides Registry',
    cardRegistryDesc: 'Check 50+ prohibited chemicals under the statutory Insecticides Act 1968 gazette.',
    cardRegistryAction: 'View Registry',

    sentinelTitle: 'Interactive Field Sentinel & Crop Care',
    cropTomato: 'Tomato',
    cropWheat: 'Wheat',
    cropRice: 'Rice',
    cropCotton: 'Cotton',

    diagnosticsBadge: 'Active Field Diagnostics & Precision Care',
    diagnosticsHeading: 'Launch Inspection',
    diagnosticsDesc: 'Select your crop and run instant AI inspection for leaf diseases, counterfeit verification, or tank calculations.',
    fieldBlockLabel: 'Selected Field Block:',
    cropStageLabel: 'Crop Stage:',
    cropStageValue: 'Vegetative / Flowering',
    soilMoistureLabel: 'Soil Moisture:',
    soilMoistureValue: '62% (Adequate)',
    launchInspectionBtn: 'Launch Inspection',

    fieldActiveStatus: 'Field Sentinel Active',
    driftRiskModerate: 'Moderate Drift Risk',
    safeSprayingWindow: 'Safe Window: Early Morning & Dusk',
  },

  hi: {
    farmOverview: 'खेत का समग्र अवलोकन',
    farmSubtitle: 'अधिकतम उपज, रासायनिक सुरक्षा और फसल संरक्षण के लिए सजीव जानकारी।',
    searchPlaceholder: 'खेत का डेटा, दवाइयां, रोग खोजें...',
    tabDashboard: 'डैशबोर्ड',
    tabMyFarm: 'मेरा खेत',
    tabCounterfeit: 'सत्यापन (VERIFY-X)',
    tabRecommendation: 'दवा व खुराक प्रणाली',
    tabPest: 'रोग पहचान (पेस्ट डॉक्टर)',
    weatherTemp: '29°C',
    weatherCondition: 'आंशिक बादल',
    weatherHumidity: 'नमी: 48%',
    weatherWind: 'हवा: 19 किमी/घंटा',
    sprayCautionBadge: 'छिड़काव: सावधानी',
    sprayCautionNotice: 'मध्यम हवा की गति (19 किमी/घंटा)। बहाव-रोधी नोजल का इस्तेमाल करें।',

    cardCounterfeitBadge: 'होलोग्राम एवं स्कैनर',
    cardCounterfeitTitle: 'नकली उत्पाद पहचान',
    cardCounterfeitDesc: 'छिड़कने से पहले 3D होलोग्राम, सरकारी CIBRC पंजीकरण और प्रामाणिकता की जांच करें।',
    cardCounterfeitAction: 'उत्पाद सत्यापित करें',

    cardRecommendationBadge: '15L नैपसैक टंकी माप',
    cardRecommendationTitle: 'सिफारिश एवं सटीक खुराक',
    cardRecommendationDesc: '15 लीटर नैपसैक टंकी के अनुसार सही मात्रा और तुड़ाई पूर्व प्रतीक्षा समय जानें।',
    cardRecommendationAction: 'खुराक की गणना करें',

    cardPestBadge: 'एआई फसल डॉक्टर',
    cardPestTitle: 'रोग एवं कीट पहचान',
    cardPestDesc: 'पत्तियों के धब्बे, तना छेदक और फफूंद संक्रमण का एआई द्वारा तुरंत निदान करें।',
    cardPestAction: 'फसल की जांच करें',

    cardRegistryBadge: 'सरकारी राजपत्र सूची',
    cardRegistryTitle: 'प्रतिबंधित कीटनाशक रजिस्टर',
    cardRegistryDesc: 'कीटनाशक अधिनियम 1968 के तहत 50+ पूर्ण प्रतिबंधित रसायनों की जांच करें।',
    cardRegistryAction: 'राजपत्र सूची देखें',

    sentinelTitle: 'इंटरैक्टिव खेत संतरी एवं फसल देखभाल',
    cropTomato: 'टमाटर',
    cropWheat: 'गेहूं',
    cropRice: 'धान / चावल',
    cropCotton: 'कपास',

    diagnosticsBadge: 'सक्रिय खेत निदान एवं सटीक देखभाल',
    diagnosticsHeading: 'जांच शुरू करें',
    diagnosticsDesc: 'अपनी फसल चुनें और पत्तियों के रोग, दवा सत्यापन या टंकी माप के लिए एआई जांच चलाएं।',
    fieldBlockLabel: 'चुना हुआ खेत ब्लॉक:',
    cropStageLabel: 'फसल की अवस्था:',
    cropStageValue: 'वानस्पतिक / फूल आने का समय',
    soilMoistureLabel: 'मिट्टी की नमी:',
    soilMoistureValue: '62% (पर्याप्त)',
    launchInspectionBtn: 'जांच शुरू करें',

    fieldActiveStatus: 'खेत संतरी सक्रिय',
    driftRiskModerate: 'हवा के बहाव का मध्यम जोखिम',
    safeSprayingWindow: 'सुरक्षित छिड़काव समय: सुबह जल्दी या शाम ढले',
  },

  te: {
    farmOverview: 'వ్యవసాయ క్షేత్ర అవలోకనం',
    farmSubtitle: 'గరిష్ట దిగుబడి, రసాయన భద్రత మరియు పంట రక్షణ కొరకు రియల్-టైమ్ సమాచారం.',
    searchPlaceholder: 'పంట సమాచారం, పురుగు మందులు, తెగుళ్లు వెతకండి...',
    tabDashboard: 'డాష్‌బోర్డ్',
    tabMyFarm: 'నా వ్యవసాయం',
    tabCounterfeit: 'నకిలీ మందుల గుర్తింపు',
    tabRecommendation: 'సిఫార్సుల వ్యవస్థ',
    tabPest: 'తెగుళ్ల నిర్ధారణ',
    weatherTemp: '29°C',
    weatherCondition: 'పాక్షికంగా మేఘావృతం',
    weatherHumidity: 'తేమ: 48%',
    weatherWind: 'గాలి: 19 కి.మీ/గం',
    sprayCautionBadge: 'పిచికారీ: జాగ్రత్త',
    sprayCautionNotice: 'మోస్తరు గాలి వేగం (19 కి.మీ/గం). గాలికి కొట్టుకుపోకుండా ప్రత్యేక నాజిల్‌ వాడండి.',

    cardCounterfeitBadge: 'హోలోగ్రామ్ & లెన్స్',
    cardCounterfeitTitle: 'నకిలీ మందుల గుర్తింపు (VERIFY-X)',
    cardCounterfeitDesc: 'మందు వాడేముందు 3D హోలోగ్రామ్, CIBRC లైసెన్స్ మరియు ప్యాకింగ్ అసలైనదో కాదో తనిఖీ చేయండి.',
    cardCounterfeitAction: 'మందును సరిచూడండి',

    cardRecommendationBadge: '15 లీటర్ల ట్యాంకు లెక్క',
    cardRecommendationTitle: 'సరైన మోతాదు సిఫార్సు',
    cardRecommendationDesc: '15 లీటర్ల చేతి పంపు ట్యాంకుకు సరిపడా మందు మోతాదు మరియు కోతకు ముందు వ్యవధి లెక్కించండి.',
    cardRecommendationAction: 'మోతాదు లెక్కించండి',

    cardPestBadge: 'ఏఐ ప్లాంట్ డాక్టర్',
    cardPestTitle: 'తెగుళ్లు & పురుగుల గుర్తింపు',
    cardPestDesc: 'ఆకు మచ్చలు, కాండం తొలిచే పురుగులు మరియు ఫంగల్ తెగుళ్లను ఏఐ ద్వారా వెంటనే గుర్తించండి.',
    cardPestAction: 'పంటను పరీక్షించండి',

    cardRegistryBadge: 'ప్రభుత్వ గెజిట్ జాబితా',
    cardRegistryTitle: 'నిషేధిత పురుగుమందుల రిజిస్ట్రీ',
    cardRegistryDesc: 'పురుగుమందుల చట్టం 1968 ప్రకారం నిషేధించబడిన 50 కి పైగా ప్రమాదకర మందుల వివరాలు చూడండి.',
    cardRegistryAction: 'జాబితా చూడండి',

    sentinelTitle: 'ఇంటరాక్టివ్ ఫీల్డ్ సెంటినెల్ & పంట సంరక్షణ',
    cropTomato: 'టమోటా',
    cropWheat: 'గోధుమ',
    cropRice: 'వరి',
    cropCotton: 'ప్రత్తి',

    diagnosticsBadge: 'క్షేత్రస్థాయి నిర్ధారణ & సంరక్షణ',
    diagnosticsHeading: 'పరీక్షను ప్రారంభించండి',
    diagnosticsDesc: 'మీ పంటను ఎంచుకుని ఆకు తెగుళ్లు, నకిలీ నిర్ధారణ లేదా ట్యాంక్ మోతాదు లెక్కల కోసం వెంటనే స్కాన్ చేయండి.',
    fieldBlockLabel: 'ఎంచుకున్న క్షేత్ర బ్లాక్:',
    cropStageLabel: 'పంట దశ:',
    cropStageValue: 'శాఖీయ దశ / పూత దశ',
    soilMoistureLabel: 'నేలలో తేమ:',
    soilMoistureValue: '62% (సరిపడా ఉంది)',
    launchInspectionBtn: 'పరీక్షను ప్రారంభించండి',

    fieldActiveStatus: 'ఫీల్డ్ సెంటినెల్ యాక్టివ్‌గా ఉంది',
    driftRiskModerate: 'మోస్తరు గాలి డ్రిఫ్ట్ రిస్క్',
    safeSprayingWindow: 'సురక్షిత పిచికారీ సమయం: ఉదయం వేళ లేదా సాయంత్రం',
  },

  ta: {
    farmOverview: 'பண்ணை மேலோட்டம்',
    farmSubtitle: 'உயர்ந்த மகசூல், ரசாயன பாதுகாப்பு மற்றும் பயிர் பாதுகாப்புக்கான நேரடி தகவல்கள்.',
    searchPlaceholder: 'பண்ணை தகவல்கள், மருந்துகள், நோய்களைத் தேடவும்...',
    tabDashboard: 'டாஷ்போர்டு',
    tabMyFarm: 'என் பண்ணை',
    tabCounterfeit: 'போலி மருந்து கண்டறிதல்',
    tabRecommendation: 'பரிந்துரை அமைப்பு',
    tabPest: 'பயிர் மருத்துவர்',
    weatherTemp: '29°C',
    weatherCondition: 'பகுதி மேகமூட்டம்',
    weatherHumidity: 'ஈரப்பதம்: 48%',
    weatherWind: 'காற்று: 19 கிமீ/மணி',
    sprayCautionBadge: 'தெளிப்பு: எச்சரிக்கை',
    sprayCautionNotice: 'மிதமான காற்று வேகம் (19 கிமீ/மணி). தெளிப்பு விலகலை தடுக்கும் முனைகளைப் பயன்படுத்தவும்.',

    cardCounterfeitBadge: 'ஹோலோகிராம் & லென்ஸ்',
    cardCounterfeitTitle: 'போலி மருந்து கண்டறிதல் (VERIFY-X)',
    cardCounterfeitDesc: 'தெளிப்பதற்கு முன் 3D ஹோலோகிராம், CIBRC பதிவு எண் மற்றும் பேக்கிங் உண்மைத்தன்மையை சோதிக்கவும்.',
    cardCounterfeitAction: 'மருந்தை சரிபார்க்கவும்',

    cardRecommendationBadge: '15L தெளிப்பான் தொட்டி அளவு',
    cardRecommendationTitle: 'பரிந்துரை மற்றும் சரியான அளவு',
    cardRecommendationDesc: '15 லிட்டர் கைத்தெளிப்பான் தொட்டிக்கான சரியான அளவு மற்றும் அறுவடைக்கு முந்தைய இடைவெளியை கணக்கிடுங்கள்.',
    cardRecommendationAction: 'அளவை கணக்கிடுங்கள்',

    cardPestBadge: 'AI பயிர் மருத்துவர்',
    cardPestTitle: 'பூச்சி & நோய் கண்டறிதல்',
    cardPestDesc: 'இலைப்புள்ளி, தண்டு துளைப்பான் மற்றும் பூஞ்சாண நோய்களை AI பயிர் மருத்துவர் மூலம் துல்லியமாக அறியவும்.',
    cardPestAction: 'பயிரை பரிசோதிக்கவும்',

    cardRegistryBadge: 'அரசிதழ் பட்டியல்',
    cardRegistryTitle: 'தடைசெய்யப்பட்ட பூச்சிக்கொல்லி பட்டியல்',
    cardRegistryDesc: 'பூச்சிக்கொல்லி சட்டம் 1968 இன் கீழ் இந்தியாவில் தடைசெய்யப்பட்ட 50+ நச்சு மருந்துகளை சரிபார்க்கவும்.',
    cardRegistryAction: 'பட்டியலை பார்க்கவும்',

    sentinelTitle: 'களக் கண்காணிப்பாளர் & பயிர் பராமரிப்பு',
    cropTomato: 'தக்காளி',
    cropWheat: 'கோதுமை',
    cropRice: 'நெல்',
    cropCotton: 'பருத்தி',

    diagnosticsBadge: 'நேரடி கள பரிசோதனை & துல்லிய பராமரிப்பு',
    diagnosticsHeading: 'பரிசோதனையைத் தொடங்கவும்',
    diagnosticsDesc: 'உங்கள் பயிரைத் தேர்ந்தெடுத்து இலை நோய், போலி சரிபார்ப்பு அல்லது தொட்டி கணக்கீட்டிற்கு AI பரிசோதனையை இயக்கவும்.',
    fieldBlockLabel: 'தேர்ந்தெடுக்கப்பட்ட பகுதி:',
    cropStageLabel: 'பயிர் வளர்ச்சி நிலை:',
    cropStageValue: 'வளர்ச்சி நிலை / பூக்கும் தருணம்',
    soilMoistureLabel: 'மண் ஈரப்பதம்:',
    soilMoistureValue: '62% (போதுமானது)',
    launchInspectionBtn: 'பரிசோதனையைத் தொடங்கு',

    fieldActiveStatus: 'களக் கண்காணிப்பு செயல்பாட்டில் உள்ளது',
    driftRiskModerate: 'மிதமான காற்று தெளிப்பு விலகல் அபாயம்',
    safeSprayingWindow: 'பாதுகாப்பான தெளிப்பு நேரம்: அதிகாலை அல்லது மாலை வேளை',
  },

  kn: {
    farmOverview: 'ಕೃಷಿ ಭೂಮಿ ಅವಲೋಕನ',
    farmSubtitle: 'ಉತ್ತಮ ಇಳುವರಿ, ರಾಸಾಯನಿಕ ಸುರಕ್ಷತೆ ಮತ್ತು ಬೆಳೆ ರಕ್ಷಣೆಗೆ ನೈಜ ಸಮಯದ ಮಾಹಿತಿ.',
    searchPlaceholder: 'ಬೆಳೆ ಮಾಹಿತಿ, ಕೀಟನಾಶಕಗಳು, ರೋಗಗಳನ್ನು ಹುಡುಕಿ...',
    tabDashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    tabMyFarm: 'ನನ್ನ ಜಮೀನು',
    tabCounterfeit: 'ನಕಲಿ ಪತ್ತೆ (VERIFY-X)',
    tabRecommendation: 'ಶಿಫಾರಸು ವ್ಯವಸ್ಥೆ',
    tabPest: 'ಬೆಳೆ ರೋಗ ತಪಾಸಣೆ',
    weatherTemp: '29°C',
    weatherCondition: 'ಭಾಗಶಃ ಮೋಡ ಕವಿದ ವಾತಾವರಣ',
    weatherHumidity: 'ಆರ್ದ್ರತೆ: 48%',
    weatherWind: 'ಗಾಳಿ: 19 ಕಿಮೀ/ಗಂ',
    sprayCautionBadge: 'ಸಿಂಪಡಣೆ: ಎಚ್ಚರಿಕೆ',
    sprayCautionNotice: 'ಮಧ್ಯಮ ಗಾಳಿಯ ವೇಗ (19 ಕಿಮೀ/ಗಂ). ಡ್ರಿಫ್ಟ್ ಕಡಿಮೆ ಮಾಡುವ ನಳಿಕೆ ಬಳಸಿ.',

    cardCounterfeitBadge: 'ಹೋಲೋಗ್ರಾಂ ಮತ್ತು ಲೆನ್ಸ್',
    cardCounterfeitTitle: 'ನಕಲಿ ಕೀಟನಾಶಕ ಪತ್ತೆ',
    cardCounterfeitDesc: 'ಸಿಂಪಡಿಸುವ ಮುನ್ನ 3D ಹೋಲೋಗ್ರಾಂ, CIBRC ಪರವಾನಗಿ ಮತ್ತು ಪ್ಯಾಕಿಂಗ್ ಅಸಲಿಯೇ ಎಂದು ಪರೀಕ್ಷಿಸಿ.',
    cardCounterfeitAction: 'ಉತ್ಪನ್ನ ಪರಿಶೀಲಿಸಿ',

    cardRecommendationBadge: '15L ಸಿಂಪಡಕ ಟ್ಯಾಂಕ್ ಲೆಕ್ಕ',
    cardRecommendationTitle: 'ಶಿಫಾರಸು ಮತ್ತು ನಿಖರ ಪ್ರಮಾಣ',
    cardRecommendationDesc: '15 ಲೀಟರ್ ನ್ಯಾಪ್‌ಸ್ಯಾಕ್ ಟ್ಯಾಂಕ್‌ಗೆ ಸರಿಯಾದ ಕೀಟನಾಶಕ ಪ್ರಮಾಣ ಮತ್ತು ಕೊಯ್ಲಿನ ಮುಂಚಿನ ಅವಧಿ ಲೆಕ್ಕಹಾಕಿ.',
    cardRecommendationAction: 'ಪ್ರಮಾಣ ಲೆಕ್ಕಹಾಕಿ',

    cardPestBadge: 'ಎಐ ಸಸ್ಯ ವೈದ್ಯ',
    cardPestTitle: 'ಕೀಟ ಮತ್ತು ರೋಗ ಪತ್ತೆ',
    cardPestDesc: 'ಎಲೆ ಚುಕ್ಕೆ, ಕಾಂಡ ಕೊರೆಯುವ ಕೀಟ ಮತ್ತು ಶಿಲೀಂಧ್ರ ರೋಗಗಳನ್ನು ಎಐ ಪ್ಲಾಂಟ್ ಡಾಕ್ಟರ್ ಮೂಲಕ ಪತ್ತೆಹಚ್ಚಿ.',
    cardPestAction: 'ಬೆಳೆ ಪರೀಕ್ಷಿಸಿ',

    cardRegistryBadge: 'ಸರ್ಕಾರಿ ಗೆಜೆಟ್ ಪಟ್ಟಿ',
    cardRegistryTitle: 'ನಿಷೇಧಿತ ಕೀಟನಾಶಕಗಳ ನೋಂದಣಿ',
    cardRegistryDesc: 'ಕೀಟನಾಶಕ ಕಾಯ್ದೆ 1968 ರ ಅಡಿಯಲ್ಲಿ ನಿಷೇಧಿಸಲಾದ 50 ಕ್ಕೂ ಹೆಚ್ಚು ವಿಷಕಾರಿ ರಾಸಾಯನಿಕಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.',
    cardRegistryAction: 'ಪಟ್ಟಿ ವೀಕ್ಷಿಸಿ',

    sentinelTitle: 'ಕ್ಷೇತ್ರ ಕಣ್ಗಾವಲು ಮತ್ತು ಬೆಳೆ ಆರೈಕೆ',
    cropTomato: 'ಟೊಮೆಟೊ',
    cropWheat: 'ಗೋಧಿ',
    cropRice: 'ಭತ್ತ',
    cropCotton: 'ಹತ್ತಿ',

    diagnosticsBadge: 'ಸಕ್ರಿಯ ಕ್ಷೇತ್ರ ರೋಗನಿರ್ಣಯ',
    diagnosticsHeading: 'ತಪಾಸಣೆ ಪ್ರಾರಂಭಿಸಿ',
    diagnosticsDesc: 'ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ ಮತ್ತು ಎಲೆ ರೋಗ, ನಕಲಿ ಪರಿಶೀಲನೆ ಅಥವಾ ಟ್ಯಾಂಕ್ ಲೆಕ್ಕಾಚಾರಕ್ಕಾಗಿ ತಪಾಸಣೆ ನಡೆಸಿ.',
    fieldBlockLabel: 'ಆಯ್ಕೆಮಾಡಿದ ಬ್ಲಾಕ್:',
    cropStageLabel: 'ಬೆಳೆಯ ಹಂತ:',
    cropStageValue: 'ಬೆಳವಣಿಗೆಯ ಹಂತ / ಹೂ ಬಿಡುವ ಸಮಯ',
    soilMoistureLabel: 'ಮಣ್ಣಿನ ತೇವಾಂಶ:',
    soilMoistureValue: '62% (ಸಾಕಷ್ಟು)',
    launchInspectionBtn: 'ತಪಾಸಣೆ ನಡೆಸಿ',

    fieldActiveStatus: 'ಕ್ಷೇತ್ರ ಕಣ್ಗಾವಲು ಸಕ್ರಿಯವಾಗಿದೆ',
    driftRiskModerate: 'ಮಧ್ಯಮ ಗಾಳಿಯ ಡ್ರಿಫ್ಟ್ ಅಪಾಯ',
    safeSprayingWindow: 'ಸುರಕ್ಷಿತ ಸಿಂಪಡಣೆ ಸಮಯ: ಮುಂಜಾನೆ ಅಥವಾ ಸಂಜೆ ವೇಳೆ',
  },

  bn: {
    farmOverview: 'খামারের সামগ্রিক চিত্র',
    farmSubtitle: 'সর্বোচ্চ ফলন, রাসায়নিক সুরক্ষা এবং ফসল সুরক্ষার জন্য রিয়েল-টাইম পরামর্শ।',
    searchPlaceholder: 'খামারের তথ্য, কীটনাশক, রোগ অনুসন্ধান করুন...',
    tabDashboard: 'ড্যাশবোর্ড',
    tabMyFarm: 'আমার খামার',
    tabCounterfeit: 'ভেজাল যাচাই',
    tabRecommendation: 'সুপারিশ ও মাত্রা পদ্ধতি',
    tabPest: 'রোগ নির্ণয়',
    weatherTemp: '29°C',
    weatherCondition: 'আংশিক মেঘলা',
    weatherHumidity: 'আর্দ্রতা: 48%',
    weatherWind: 'বাতাস: 19 কিমি/ঘন্টা',
    sprayCautionBadge: 'স্প্রে: সতর্কতা',
    sprayCautionNotice: 'মাঝারি বাতাসের গতি (19 কিমি/ঘণ্টা)। ড্রিফ্ট কমানোর নজল ব্যবহার করুন।',

    cardCounterfeitBadge: 'হলোগ্রাম ও লেন্স',
    cardCounterfeitTitle: 'ভেজাল কীটনাশক যাচাই',
    cardCounterfeitDesc: 'স্প্রে করার আগে 3D হলোগ্রাম, CIBRC লাইসেন্স এবং মোড়কের সত্যতা পরীক্ষা করুন।',
    cardCounterfeitAction: 'ওষুধ যাচাই করুন',

    cardRecommendationBadge: '১৫ লিটার ট্যাঙ্ক হিসাব',
    cardRecommendationTitle: 'সঠিক মাত্রার সুপারিশ',
    cardRecommendationDesc: '১৫ লিটার ন্যাপস্যাক ট্যাঙ্কের জন্য সঠিক ওষুধের অনুপাত এবং ফসল তোলার নিরাপদ ব্যবধান জানুন।',
    cardRecommendationAction: 'মাত্রা গণনা করুন',

    cardPestBadge: 'এআই ফসল ডাক্তার',
    cardPestTitle: 'কীটপতঙ্গ ও রোগ নির্ণয়',
    cardPestDesc: 'পাতার দাগ, কান্ড পচা এবং ছত্রাকজনিত রোগ এআই প্রযুক্তির মাধ্যমে শনাক্ত করুন।',
    cardPestAction: 'ফসল পরীক্ষা করুন',

    cardRegistryBadge: 'সরকারি গেজেট তালিকা',
    cardRegistryTitle: 'নিষিদ্ধ কীটনাশক রেজিস্ট্রি',
    cardRegistryDesc: 'কীটনাশক আইন ১৯৬৮ অনুযায়ী ভারতে নিষিদ্ধ ৫০টিরও বেশি ক্ষতিকর কীটনাশক দেখুন।',
    cardRegistryAction: 'গেজেট তালিকা দেখুন',

    sentinelTitle: 'ইন্টারেক্টিভ ফিল্ড সেন্টিনেল ও ফসল পরিচর্যা',
    cropTomato: 'টমেটো',
    cropWheat: 'গম',
    cropRice: 'ধান',
    cropCotton: 'তুলা',

    diagnosticsBadge: 'সক্রিয় মাঠ পরিদর্শন ও সঠিক পরিচর্যা',
    diagnosticsHeading: 'পরীক্ষা শুরু করুন',
    diagnosticsDesc: 'আপনার ফসল নির্বাচন করুন এবং পাতার রোগ, নকল যাচাই বা ট্যাঙ্ক পরিমাপের জন্য এআই স্ক্যান চালান।',
    fieldBlockLabel: 'নির্বাচিত মাঠের ব্লক:',
    cropStageLabel: 'ফসলের পর্যায়:',
    cropStageValue: 'শারীরবৃত্তীয় বৃদ্ধি / ফুল ফোটার সময়',
    soilMoistureLabel: 'মাটির আর্দ্রতা:',
    soilMoistureValue: '৬২% (পর্যাপ্ত)',
    launchInspectionBtn: 'পরীক্ষা শুরু করুন',

    fieldActiveStatus: 'ফিল্ড সেন্টিনেল সক্রিয়',
    driftRiskModerate: 'বাতাসে ওষুধ ছড়ানোর মাঝারি ঝুঁকি',
    safeSprayingWindow: 'নিরাপদ স্প্রে সময়: ভোরবেলা বা সন্ধ্যার সময়',
  },

  mr: {
    farmOverview: 'शेत सर्वसमावेशक आढावा',
    farmSubtitle: 'उत्तम उत्पादन, रासायनिक सुरक्षा आणि पीक संरक्षणासाठी थेट माहिती.',
    searchPlaceholder: 'शेताची माहिती, औषधे, रोग शोधा...',
    tabDashboard: 'डॅशबोर्ड',
    tabMyFarm: 'माझे शेत',
    tabCounterfeit: 'बनावट औषध तपासणी',
    tabRecommendation: 'शिफारस प्रणाली',
    tabPest: 'रोग व कीड निदान',
    weatherTemp: '29°C',
    weatherCondition: 'अंशतः ढगाळ',
    weatherHumidity: 'आर्द्रता: 48%',
    weatherWind: 'वारा: 19 किमी/तास',
    sprayCautionBadge: 'फवारणी: काळजी घ्या',
    sprayCautionNotice: 'मध्यम वाऱ्याचा वेग (19 किमी/तास). योग्य नोजलचा वापर करा.',

    cardCounterfeitBadge: 'होलोग्राम व लेन्स',
    cardCounterfeitTitle: 'बनावट औषध तपासणी (VERIFY-X)',
    cardCounterfeitDesc: 'फवारणीपूर्वी 3D होलोग्राम, CIBRC नोंदणी आणि पॅकिंगची सत्यता तपासा.',
    cardCounterfeitAction: 'उत्पादन तपासा',

    cardRecommendationBadge: '15L पंपाचे गणित',
    cardRecommendationTitle: 'शिफारस व अचूक प्रमाण',
    cardRecommendationDesc: '15 लिटर नॅपसॅक पंपासाठी अचूक प्रमाण आणि काढणीपूर्व प्रतीक्षा कालावधी मोजा.',
    cardRecommendationAction: 'प्रमाण मोजा',

    cardPestBadge: 'एआय पीक डॉक्टर',
    cardPestTitle: 'कीड व रोग निदान',
    cardPestDesc: 'पानावरील ठिपके, खोडकीड आणि बुरशीजन्य रोगांचे एआय द्वारे त्वरित निदान करा.',
    cardPestAction: 'पीक तपासा',

    cardRegistryBadge: 'शासकीय राजपत्र',
    cardRegistryTitle: 'प्रतिबंधित कीटकनाशके यादी',
    cardRegistryDesc: 'कीटकनाशक कायदा 1968 अंतर्गत भारतात बंदी घालण्यात आलेली 50+ रसायने तपासा.',
    cardRegistryAction: 'यादी पहा',

    sentinelTitle: 'शेत पहारेकरी आणि पीक निगा',
    cropTomato: 'टोमॅटो',
    cropWheat: 'गहू',
    cropRice: 'भात / धान',
    cropCotton: 'कापूस',

    diagnosticsBadge: 'सक्रिय शेत तपासणी व अचूक निगा',
    diagnosticsHeading: 'तपासणी सुरू करा',
    diagnosticsDesc: 'तुमचे पीक निवडा आणि पानांवरील रोग, बनावट औषध तपासणी किंवा पंपाच्या मापासाठी एआय स्कॅन चालवा.',
    fieldBlockLabel: 'निवडलेला शेत तुकडा:',
    cropStageLabel: 'पिकाची अवस्था:',
    cropStageValue: 'वाढ / फुलधारणा अवस्था',
    soilMoistureLabel: 'जमिनीतील ओलावा:',
    soilMoistureValue: '62% (पुरेसा)',
    launchInspectionBtn: 'तपासणी सुरू करा',

    fieldActiveStatus: 'शेत पहारेकरी सक्रिय',
    driftRiskModerate: 'वाऱ्यामुळे फवारणी उडण्याचा मध्यम धोका',
    safeSprayingWindow: 'सुरक्षित फवारणी वेळ: पहाटे किंवा सायंकाळी',
  },

  gu: {
    farmOverview: 'ખેતર ઓવરવ્યૂ',
    farmSubtitle: 'મહત્તમ ઉત્પાદન, રાસાયણિક સુરક્ષા અને પાક સંરક્ષણ માટે રીઅલ-ટાઇમ માર્ગદર્શન.',
    searchPlaceholder: 'ખેતીનો ડેટા, દવાઓ, રોગ શોધો...',
    tabDashboard: 'ડેશબોર્ડ',
    tabMyFarm: 'મારું ખેતર',
    tabCounterfeit: 'નકલી દવા તપાસ',
    tabRecommendation: 'ભલામણ પ્રણાલી',
    tabPest: 'રોગ નિદાન (પ્લાન્ટ ડોક્ટર)',
    weatherTemp: '29°C',
    weatherCondition: 'આંશિક વાદળછાયું',
    weatherHumidity: 'ભેજ: 48%',
    weatherWind: 'પવન: 19 કિમી/કલાક',
    sprayCautionBadge: 'છંટકાવ: સાવધાની',
    sprayCautionNotice: 'મધ્યમ પવનની ઝડપ (19 કિમી/કલાક). પવનથી દવા ન ઉડે તેવા નોઝલ વાપરો.',

    cardCounterfeitBadge: 'હોલોગ્રામ અને લેન્સ',
    cardCounterfeitTitle: 'નકલી દવા તપાસ (VERIFY-X)',
    cardCounterfeitDesc: 'છંટકાવ કરતા પહેલા 3D હોલોગ્રામ, CIBRC નોંધણી અને પેકિંગની અસલિયત ચકાસો.',
    cardCounterfeitAction: 'ઉત્પાદન ચકાસો',

    cardRecommendationBadge: '15L પંપ ગણતરી',
    cardRecommendationTitle: 'ભલામણ અને સચોટ માત્રા',
    cardRecommendationDesc: '15 લિટર નેપસેક પંપ દીઠ સાચી દવાની માત્રા અને લણણી પહેલાંનો સમયગાળો ગણો.',
    cardRecommendationAction: 'માત્રા ગણો',

    cardPestBadge: 'એઆઈ પાક ડોક્ટર',
    cardPestTitle: 'જીવાત અને રોગ નિદાન',
    cardPestDesc: 'પાનના ટપકાં, ઇયળ અને ફૂગના રોગોનું એઆઈ પાક ડોક્ટર દ્વારા સચોટ નિદાન કરો.',
    cardPestAction: 'પાક તપાસો',

    cardRegistryBadge: 'સરકારી ગેઝેટ યાદી',
    cardRegistryTitle: 'પ્રતિબંધિત જંતુનાશકોની યાદી',
    cardRegistryDesc: 'જંતુનાશક કાયદો 1968 હેઠળ ભારતમાં પ્રતિબંધિત 50 થી વધુ ઝેરી દવાઓ તપાસો.',
    cardRegistryAction: 'યાદી જુઓ',

    sentinelTitle: 'ઇન્ટરેક્ટિવ ફિલ્ડ સેન્ટીનેલ અને પાક સંભાળ',
    cropTomato: 'ટામેટાં',
    cropWheat: 'ઘઉં',
    cropRice: 'ડાંગર / ચોખા',
    cropCotton: 'કપાસ',

    diagnosticsBadge: 'સક્રિય ખેતર નિદાન અને સચોટ સારસંભાળ',
    diagnosticsHeading: 'તપાસ શરૂ કરો',
    diagnosticsDesc: 'તમારો પાક પસંદ કરો અને પાંદડાના રોગ, નકલી દવાની તપાસ અથવા પંપની ગણતરી માટે એઆઈ સ્કેન કરો.',
    fieldBlockLabel: 'પસંદ કરેલ ખેતર બ્લોક:',
    cropStageLabel: 'પાકનો તબક્કો:',
    cropStageValue: 'વાનસ્પતિક વૃદ્ધિ / ફૂલ બેસવાનો સમય',
    soilMoistureLabel: 'જમીનનો ભેજ:',
    soilMoistureValue: '62% (પૂરતો)',
    launchInspectionBtn: 'તપાસ શરૂ કરો',

    fieldActiveStatus: 'ફિલ્ડ સેન્ટીનેલ સક્રિય છે',
    driftRiskModerate: 'પવનથી દવા ઉડવાનું મધ્યમ જોખમ',
    safeSprayingWindow: 'સલામત છંટકાવ સમય: વહેલી સવારે અથવા સાંજે',
  },

  pa: {
    farmOverview: 'ਖੇਤ ਦਾ ਸੰਖੇਪ ਜਾਇਜ਼ਾ',
    farmSubtitle: 'ਚੰਗੀ ਪੈਦਾਵਾਰ, ਰਸਾਇਣਕ ਸੁਰੱਖਿਆ ਅਤੇ ਫਸਲ ਦੀ ਸੁਰੱਖਿਆ ਲਈ ਲਾਈਵ ਜਾਣਕਾਰੀ।',
    searchPlaceholder: 'ਖੇਤ ਦਾ ਡੇਟਾ, ਕੀਟਨਾਸ਼ਕ, ਬਿਮਾਰੀਆਂ ਖੋਜੋ...',
    tabDashboard: 'ਡੈਸ਼ਬੋਰਡ',
    tabMyFarm: 'ਮੇਰਾ ਖੇਤ',
    tabCounterfeit: 'ਨਕਲੀ ਦਵਾਈ ਦੀ ਪਰਖ',
    tabRecommendation: 'ਸਿਫਾਰਸ਼ ਅਤੇ ਖੁਰਾਕ ਪ੍ਰਣਾਲੀ',
    tabPest: 'ਬਿਮਾਰੀ ਤੇ ਕੀੜਾ ਪਛਾਣ',
    weatherTemp: '29°C',
    weatherCondition: 'ਅੰਸ਼ਕ ਬੱਦਲਵਾਈ',
    weatherHumidity: 'ਨਮੀ: 48%',
    weatherWind: 'ਹਵਾ: 19 ਕਿਲੋਮੀਟਰ/ਘੰਟਾ',
    sprayCautionBadge: 'ਛਿੜਕਾਅ: ਸਾਵਧਾਨੀ',
    sprayCautionNotice: 'ਦਰਮਿਆਨੀ ਹਵਾ ਦੀ ਗਤੀ (19 ਕਿਲੋਮੀਟਰ/ਘੰਟਾ)। ਹਵਾ ਰੋਕੂ ਨੋਜ਼ਲ ਦੀ ਵਰਤੋਂ ਕਰੋ।',

    cardCounterfeitBadge: 'ਹੋਲੋਗ੍ਰਾਮ ਅਤੇ ਲੈਂਸ',
    cardCounterfeitTitle: 'ਨਕਲੀ ਕੀਟਨਾਸ਼ਕ ਪਰਖ (VERIFY-X)',
    cardCounterfeitDesc: 'ਛਿੜਕਾਅ ਤੋਂ ਪਹਿਲਾਂ 3D ਹੋਲੋਗ੍ਰਾਮ, CIBRC ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਅਤੇ ਪੈਕਿੰਗ ਦੀ ਅਸਲੀਅਤ ਪਰਖੋ।',
    cardCounterfeitAction: 'ਦਵਾਈ ਪਰਖੋ',

    cardRecommendationBadge: '15 ਲੀਟਰ ਢੋਲੀ ਮਾਪ',
    cardRecommendationTitle: 'ਸਹੀ ਖੁਰਾਕ ਅਤੇ ਸਿਫਾਰਸ਼',
    cardRecommendationDesc: '15 ਲੀਟਰ ਵਾਲੀ ਢੋਲੀ ਅਨੁਸਾਰ ਸਹੀ ਮਾਤਰਾ ਅਤੇ ਵਾਢੀ ਤੋਂ ਪਹਿਲਾਂ ਉਡੀਕ ਦਾ ਸਮਾਂ ਗਿਣੋ।',
    cardRecommendationAction: 'ਖੁਰਾਕ ਦਾ ਹਿਸਾਬ ਲਗਾਓ',

    cardPestBadge: 'ਏਆਈ ਫਸਲ ਡਾਕਟਰ',
    cardPestTitle: 'ਕੀੜੇ ਅਤੇ ਰੋਗ ਪਛਾਣ',
    cardPestDesc: 'ਪੱਤਿਆਂ ਦੇ ਧੱਬੇ, ਸੁੰਡੀ ਅਤੇ ਉੱਲੀ ਦੇ ਰੋਗਾਂ ਦੀ ਏਆਈ ਰਾਹੀਂ ਤੁਰੰਤ ਪਛਾਣ ਕਰੋ।',
    cardPestAction: 'ਫਸਲ ਦੀ ਜਾਂਚ ਕਰੋ',

    cardRegistryBadge: 'ਸਰਕਾਰੀ ਗਜ਼ਟ ਸੂਚੀ',
    cardRegistryTitle: 'ਪਾਬੰਦੀਸ਼ੁਦਾ ਕੀਟਨਾਸ਼ਕ ਰਜਿਸਟਰ',
    cardRegistryDesc: 'ਕੀਟਨਾਸ਼ਕ ਐਕਟ 1968 ਅਧੀਨ ਪਾਬੰਦੀਸ਼ੁਦਾ 50 ਤੋਂ ਵੱਧ ਜ਼ਹਿਰੀਲੇ ਰਸਾਇਣਾਂ ਦੀ ਜਾਂਚ ਕਰੋ।',
    cardRegistryAction: 'ਸੂਚੀ ਦੇਖੋ',

    sentinelTitle: 'ਖੇਤ ਪਹਿਰੇਦਾਰ ਅਤੇ ਫਸਲ ਦੀ ਸੰਭਾਲ',
    cropTomato: 'ਟਮਾਟਰ',
    cropWheat: 'ਕਣਕ',
    cropRice: 'ਝੋਨਾ / ਚੌਲ',
    cropCotton: 'ਨਰਮਾ / ਕਪਾਹ',

    diagnosticsBadge: 'ਸਰਗਰਮ ਖੇਤ ਨਿਰੀਖਣ ਅਤੇ ਸੰਭਾਲ',
    diagnosticsHeading: 'ਜਾਂਚ ਸ਼ੁਰੂ ਕਰੋ',
    diagnosticsDesc: 'ਆਪਣੀ ਫਸਲ ਚੁਣੋ ਅਤੇ ਪੱਤਿਆਂ ਦੀ ਬਿਮਾਰੀ, ਨਕਲੀ ਪਰਖ ਜਾਂ ਢੋਲੀ ਦੇ ਹਿਸਾਬ ਲਈ ਏਆਈ ਸਕੈਨ ਚਲਾਓ।',
    fieldBlockLabel: 'ਚੁਣਿਆ ਗਿਆ ਖੇਤ ਬਲਾਕ:',
    cropStageLabel: 'ਫਸਲ ਦਾ ਪੜਾਅ:',
    cropStageValue: 'ਵਾਧੇ ਦਾ ਸਮਾਂ / ਫੁੱਲ ਪੈਣ ਦਾ ਸਮਾਂ',
    soilMoistureLabel: 'ਜ਼ਮੀਨ ਦੀ ਨਮੀ:',
    soilMoistureValue: '62% (ਕਾਫ਼ੀ ਹੈ)',
    launchInspectionBtn: 'ਜਾਂਚ ਸ਼ੁਰੂ ਕਰੋ',

    fieldActiveStatus: 'ਖੇਤ ਪਹਿਰੇਦਾਰ ਸਰਗਰਮ ਹੈ',
    driftRiskModerate: 'ਹਵਾ ਨਾਲ ਦਵਾਈ ਉੱਡਣ ਦਾ ਦਰਮਿਆਨਾ ਖ਼ਤਰਾ',
    safeSprayingWindow: 'ਸੁਰੱਖਿਅਤ ਛਿੜਕਾਅ ਸਮਾਂ: ਸਵੇਰੇ ਜਲਦੀ ਜਾਂ ਸ਼ਾਮ ਵੇਲੇ',
  },

  ml: {
    farmOverview: 'കൃഷിയിട അവലോകനം',
    farmSubtitle: 'മികച്ച വിളവ്, രാസസുരക്ഷ, വിള സംരക്ഷണം എന്നിവയ്ക്കായുള്ള വിവരങ്ങൾ.',
    searchPlaceholder: 'വിള വിവരങ്ങൾ, കീടനാശിനികൾ, രോഗങ്ങൾ തിരയുക...',
    tabDashboard: 'ഡാഷ്‌ബോർഡ്',
    tabMyFarm: 'എന്റെ കൃഷിയിടം',
    tabCounterfeit: 'വ്യാജ മരുന്ന് കണ്ടെത്തൽ',
    tabRecommendation: 'ശുപാർശ സംവിധാനം',
    tabPest: 'വിള രോഗ പരിശോധന',
    weatherTemp: '29°C',
    weatherCondition: 'ഭാഗികമായി മേഘാവൃതം',
    weatherHumidity: 'ഈർപ്പം: 48%',
    weatherWind: 'കാറ്റ്: 19 കിമീ/മണിക്കൂർ',
    sprayCautionBadge: 'തളിക്കൽ: ജാഗ്രത',
    sprayCautionNotice: 'മിതമായ കാറ്റിന്റെ വേഗത (19 കിമീ/മണിക്കൂർ). ഡ്രിഫ്റ്റ് കുറയ്ക്കുന്ന നോസിലുകൾ ഉപയോഗിക്കുക.',

    cardCounterfeitBadge: 'ഹോളോഗ്രാം & ലെൻസ്',
    cardCounterfeitTitle: 'വ്യാജ കീടനാശിനി കണ്ടെത്തൽ',
    cardCounterfeitDesc: 'തളിക്കുന്നതിന് മുമ്പ് 3D ഹോളോഗ്രാം, CIBRC രജിസ്ട്രേഷൻ എന്നിവ പരിശോധിച്ച് ഉറപ്പുവരുത്തുക.',
    cardCounterfeitAction: 'ഉൽപ്പന്നം പരിശോധിക്കുക',

    cardRecommendationBadge: '15L ടാങ്ക് കണക്കുകൂട്ടൽ',
    cardRecommendationTitle: 'ശുപാർശയും കൃത്യമായ അളവും',
    cardRecommendationDesc: '15 ലിറ്റർ നാപ്സാക് സ്പ്രേയറിന് ആവശ്യമായ കൃത്യമായ അളവും വിളവെടുപ്പ് ഇടവേളയും കണക്കാക്കുക.',
    cardRecommendationAction: 'അളവ് കണക്കാക്കുക',

    cardPestBadge: 'എഐ സസ്യ ഡോക്ടർ',
    cardPestTitle: 'കീട-രോഗ നിർണയം',
    cardPestDesc: 'ഇലപ്പുള്ളി, തണ്ട് തുരപ്പൻ പുഴുക്കൾ, കുമിൾ രോഗങ്ങൾ എന്നിവ എഐ വഴി കൃത്യമായി തിരിച്ചറിയുക.',
    cardPestAction: 'വിള പരിശോധിക്കുക',

    cardRegistryBadge: 'സർക്കാർ ഗസറ്റ് പട്ടിക',
    cardRegistryTitle: 'നിരോധിത കീടനാശിനി രജിസ്ട്രി',
    cardRegistryDesc: 'കീടനാശിനി നിയമം 1968 പ്രകാരം ഇന്ത്യയിൽ നിരോധിച്ച 50-ലധികം വിഷവസ്തുക്കളുടെ പട്ടിക പരിശോധിക്കുക.',
    cardRegistryAction: 'പട്ടിക കാണുക',

    sentinelTitle: 'ഫീൽഡ് സെന്റിനലും വിള സംരക്ഷണവും',
    cropTomato: 'തക്കാളി',
    cropWheat: 'ഗോതമ്പ്',
    cropRice: 'നെല്ല്',
    cropCotton: 'പരുത്തി',

    diagnosticsBadge: 'തത്സമയ വിള രോഗനിർണയം',
    diagnosticsHeading: 'പരിശോധന തുടങ്ങുക',
    diagnosticsDesc: 'നിങ്ങളുടെ വിള തിരഞ്ഞെടുത്ത് ഇല രോഗങ്ങൾ, വ്യാജ ഉൽപ്പന്ന പരിശോധന എന്നിവയ്ക്കായി എഐ പരിശോധന നടത്തുക.',
    fieldBlockLabel: 'തിരഞ്ഞെടുത്ത ബ്ലോക്ക്:',
    cropStageLabel: 'വിളയുടെ വളർച്ചാ ഘട്ടം:',
    cropStageValue: 'വളർച്ചാ ഘട്ടം / പൂവിടുന്ന സമയം',
    soilMoistureLabel: 'മണ്ണിലെ ഈർപ്പം:',
    soilMoistureValue: '62% (മതിയായ അളവ്)',
    launchInspectionBtn: 'പരിശോധന തുടങ്ങുക',

    fieldActiveStatus: 'ഫീൽഡ് സെന്റിനൽ സജീവമാണ്',
    driftRiskModerate: 'കാറ്റിൽ മരുന്ന് ഒഴുകിപ്പോകാനുള്ള മിതമായ സാധ്യത',
    safeSprayingWindow: 'സുരക്ഷിത സ്പ്രേ സമയം: അതിരാവിലെ അല്ലെങ്കിൽ വൈകുന്നേരം',
  },

  or: {
    farmOverview: 'କୃଷି କ୍ଷେତ୍ର ଅବଲୋକନ',
    farmSubtitle: 'ସର୍ବୋତ୍ତମ ଅମଳ, ରାସାୟନିକ ସୁରକ୍ଷା ଏବଂ ଫସଲ ସଂରକ୍ଷଣ ପାଇଁ ଲାଇଭ୍ ତଥ୍ୟ।',
    searchPlaceholder: 'ଫସଲ ତଥ୍ୟ, କୀଟନାଶକ, ରୋଗ ଖୋଜନ୍ତୁ...',
    tabDashboard: 'ଡ୍ୟାସବୋର୍ଡ',
    tabMyFarm: 'ମୋର କ୍ଷେତ',
    tabCounterfeit: 'ନକଲି ଔଷଧ ଯାଞ୍ଚ',
    tabRecommendation: 'ପରାମର୍ଶ ପ୍ରଣାଳୀ',
    tabPest: 'ରୋଗ ଓ କୀଟ ନିଦାନ',
    weatherTemp: '29°C',
    weatherCondition: 'ଆଂଶିକ ମେଘୁଆ',
    weatherHumidity: 'ଆର୍ଦ୍ରତା: 48%',
    weatherWind: 'ପବନ: 19 କିମି/ଘଣ୍ଟା',
    sprayCautionBadge: 'ସିଞ୍ଚନ: ସାବଧାନତା',
    sprayCautionNotice: 'ମଧ୍ୟମ ପବନର ବେଗ (19 କିମି/ଘଣ୍ଟା)। ଡ୍ରିଫ୍ଟ-ପ୍ରତିରୋଧକ ନୋଜଲ ବ୍ୟବହାର କରନ୍ତୁ।',

    cardCounterfeitBadge: 'ହୋଲୋଗ୍ରାମ ଏବଂ ଲେନ୍ସ',
    cardCounterfeitTitle: 'ନକଲି କୀଟନାଶକ ଚିହ୍ନଟ (VERIFY-X)',
    cardCounterfeitDesc: 'ସିଞ୍ଚନ ପୂର୍ବରୁ 3D ହୋଲୋଗ୍ରାମ, CIBRC ପଞ୍ଜିକରଣ ଏବଂ ପ୍ୟାକିଂ ଅସଲି କି ନୁହେଁ ଯାଞ୍ଚ କରନ୍ତୁ।',
    cardCounterfeitAction: 'ଔଷଧ ଯାଞ୍ଚ କରନ୍ତୁ',

    cardRecommendationBadge: '୧୫ ଲିଟର ଟାଙ୍କି ମାପ',
    cardRecommendationTitle: 'ସଠିକ୍ ମାତ୍ରା ଓ ପରାମର୍ଶ',
    cardRecommendationDesc: '୧୫ ଲିଟର ନାପସାକ୍ ସ୍ପ୍ରେୟାର ଟାଙ୍କି ଅନୁଯାୟୀ ସଠିକ୍ ମାତ୍ରା ଏବଂ ଅମଳ ପୂର୍ବ ବିରତି ଗଣନା କରନ୍ତୁ।',
    cardRecommendationAction: 'ମାତ୍ରା ଗଣନା କରନ୍ତୁ',

    cardPestBadge: 'ଏଆଇ ଉଦ୍ଭିଦ ଡାକ୍ତର',
    cardPestTitle: 'କୀଟ ଏବଂ ରୋଗ ନିଦାନ',
    cardPestDesc: 'ପତ୍ରପୋଡ଼ା, କାଣ୍ଡବିନ୍ଧା ପୋକ ଏବଂ ଫିମ୍ପି ରୋଗର ଏଆଇ ସାହାଯ୍ୟରେ ତୁରନ୍ତ ଚିହ୍ନଟ କରନ୍ତୁ।',
    cardPestAction: 'ଫସଲ ପରୀକ୍ଷା କରନ୍ତୁ',

    cardRegistryBadge: 'ସରକାରୀ ଗେଜେଟ୍ ତାଲିକା',
    cardRegistryTitle: 'ନିଷିଦ୍ଧ କୀଟନାଶକ ରେଜିଷ୍ଟ୍ରି',
    cardRegistryDesc: 'କୀଟନାଶକ ଆଇନ ୧୯୬୮ ଅନୁଯାୟୀ ଭାରତରେ ନିଷିଦ୍ଧ ୫୦ରୁ ଅଧିକ ବିଷାକ୍ତ ଔଷଧ ଯାଞ୍ଚ କରନ୍ତୁ।',
    cardRegistryAction: 'ତାଲିକା ଦେଖନ୍ତୁ',

    sentinelTitle: 'କ୍ଷେତ୍ର ପ୍ରହରୀ ଏବଂ ଫସଲ ଯତ୍ନ',
    cropTomato: 'ବିଲାତି ବାଇଗଣ (ଟମାଟୋ)',
    cropWheat: 'ଗହମ',
    cropRice: 'ଧାନ',
    cropCotton: 'କପା',

    diagnosticsBadge: 'ସକ୍ରିୟ କ୍ଷେତ୍ର ନିଦାନ ଏବଂ ଯତ୍ନ',
    diagnosticsHeading: 'ପରୀକ୍ଷା ଆରମ୍ଭ କରନ୍ତୁ',
    diagnosticsDesc: 'ଆପଣଙ୍କ ଫସଲ ବାଛନ୍ତୁ ଏବଂ ପତ୍ର ରୋଗ, ନକଲି ଔଷଧ ଯାଞ୍ଚ କିମ୍ବା ଟାଙ୍କି ମାପ ପାଇଁ ଏଆଇ ସ୍କାନ ଚଲାନ୍ତୁ।',
    fieldBlockLabel: 'ଚୟନିତ କ୍ଷେତ୍ର ବ୍ଲକ୍:',
    cropStageLabel: 'ଫସଲର ଅବସ୍ଥା:',
    cropStageValue: 'ବୃଦ୍ଧି ପର୍ଯ୍ୟାୟ / ଫୁଲ ଫୁଟିବା ସମୟ',
    soilMoistureLabel: 'ମାଟିର ଆର୍ଦ୍ରତା:',
    soilMoistureValue: '୬୨% (ଯଥେଷ୍ଟ)',
    launchInspectionBtn: 'ପରୀକ୍ଷା ଆରମ୍ଭ କରନ୍ତୁ',

    fieldActiveStatus: 'କ୍ଷେତ୍ର ପ୍ରହରୀ ସକ୍ରିୟ ଅଛି',
    driftRiskModerate: 'ପବନରେ ଔଷଧ ଉଡ଼ିଯିବାର ମଧ୍ୟମ ବିପଦ',
    safeSprayingWindow: 'ସୁରକ୍ଷିତ ସିଞ୍ଚନ ସମୟ: ଭୋର ସକାଳ କିମ୍ବା ସନ୍ଧ୍ୟା ବେଳେ',
  },

  ur: {
    farmOverview: 'فارم کا مجموعی جائزہ',
    farmSubtitle: 'بہترین پیداوار، کیمیائی حفاظت اور فصل کے تحفظ کے لیے حقیقی وقت کی رہنمائی۔',
    searchPlaceholder: 'فارم ڈیٹا، کیڑے مار ادویات، بیماریاں تلاش کریں...',
    tabDashboard: 'ڈیش بورڈ',
    tabMyFarm: 'میرا کھیت',
    tabCounterfeit: 'جعلی ادویات کی جانچ',
    tabRecommendation: 'تجویز و مقدار کا نظام',
    tabPest: 'پودوں کا ڈاکٹر',
    weatherTemp: '29°C',
    weatherCondition: 'جزوی طور پر ابر آلود',
    weatherHumidity: 'نمی: 48%',
    weatherWind: 'ہوا: 19 کلومیٹر فی گھنٹہ',
    sprayCautionBadge: 'سپرے: احتیاط',
    sprayCautionNotice: 'درمیانی ہوا کی رفتار (19 کلومیٹر/گھنٹہ)۔ ڈرفٹ روکنے والے نوزل استعمال کریں۔',

    cardCounterfeitBadge: 'ہولوگرام اور لینس',
    cardCounterfeitTitle: 'جعلی کیڑے مار ادویات کی جانچ (VERIFY-X)',
    cardCounterfeitDesc: 'سپرے سے پہلے 3D ہولوگرام، CIBRC رجسٹریشن اور پیکیجنگ کی اصلیت جانچیں۔',
    cardCounterfeitAction: 'پروڈکٹ کی جانچ کریں',

    cardRecommendationBadge: '15L نیپ سیک ٹینک حساب',
    cardRecommendationTitle: 'تجویز اور درست مقدار',
    cardRecommendationDesc: '15 لیٹر نیپ سیک ٹینک کے مطابق درست خوراک اور کٹائی سے قبل انتظار کا وقفہ معلوم کریں۔',
    cardRecommendationAction: 'مقدار کا حساب لگائیں',

    cardPestBadge: 'اے آئی پلانٹ ڈاکٹر',
    cardPestTitle: 'کیڑے اور بیماریوں کی تشخیص',
    cardPestDesc: 'پتوں کے دھبے، تنے کے کیڑے اور فنگس کے امراض کی اے آئی کے ذریعے فوری تشخیص کریں۔',
    cardPestAction: 'فصل کی جانچ کریں',

    cardRegistryBadge: 'سرکاری گزٹ فہرست',
    cardRegistryTitle: 'ممنوعہ کیڑے مار ادویات',
    cardRegistryDesc: 'کیڑے مار ادویات کے قانون 1968 کے تحت ممنوعہ 50 سے زائد زہریلے کیمیکلز دیکھیں۔',
    cardRegistryAction: 'فہرست دیکھیں',

    sentinelTitle: 'فیلڈ سنتری اور فصل کی نگہداشت',
    cropTomato: 'ٹماٹر',
    cropWheat: 'گندم',
    cropRice: 'دھان / چاول',
    cropCotton: 'کپاس',

    diagnosticsBadge: 'فعال فیلڈ تشخیص اور درست دیکھ بھال',
    diagnosticsHeading: 'معائنہ شروع کریں',
    diagnosticsDesc: 'اپنی فصل منتخب کریں اور پتوں کی بیماری، جعلی دوا کی جانچ یا ٹینک کے حساب کے لیے معائنہ چلائیں۔',
    fieldBlockLabel: 'منتخب کردہ فیلڈ بلاک:',
    cropStageLabel: 'فصل کا مرحلہ:',
    cropStageValue: 'بڑھوتری کا مرحلہ / پھول آنے کا وقت',
    soilMoistureLabel: 'مٹی کی نمی:',
    soilMoistureValue: '62% (مناسب)',
    launchInspectionBtn: 'معائنہ شروع کریں',

    fieldActiveStatus: 'فیلڈ سنتری فعال ہے',
    driftRiskModerate: 'ہوا کے بہاؤ کا درمیانہ خطرہ',
    safeSprayingWindow: 'محفوظ سپرے کا وقت: صبح سویرے یا شام کے وقت',
  },

  es: {
    farmOverview: 'Resumen del Campo',
    farmSubtitle: 'Información en tiempo real para un rendimiento óptimo, seguridad química y sanidad vegetal.',
    searchPlaceholder: 'Buscar datos de campo, plaguicidas, enfermedades...',
    tabDashboard: 'Panel Principal',
    tabMyFarm: 'Mi Finca',
    tabCounterfeit: 'Detección de Falsificaciones',
    tabRecommendation: 'Sistema de Recomendación',
    tabPest: 'Diagnóstico de Plagas',
    weatherTemp: '29°C',
    weatherCondition: 'Parcialmente Nublado',
    weatherHumidity: 'Humedad: 48%',
    weatherWind: 'Viento: 19 km/h',
    sprayCautionBadge: 'Aplicación: PRECAUCIÓN',
    sprayCautionNotice: 'Viento moderado (19 km/h). Utilice boquillas antideriva.',

    cardCounterfeitBadge: 'HOLOGRAMA Y ÓPTICA',
    cardCounterfeitTitle: 'Detección de Falsificaciones (VERIFY-X)',
    cardCounterfeitDesc: 'Inspeccione hologramas 3D, registros oficiales y empaques antes de fumigar.',
    cardCounterfeitAction: 'Verificar Producto',

    cardRecommendationBadge: 'CÁLCULO DE MOCHILA 15L',
    cardRecommendationTitle: 'Sistema de Recomendación',
    cardRecommendationDesc: 'Calcule dosis exactas para tanques de mochila de 15 litros y periodos de carencia.',
    cardRecommendationAction: 'Calcular Dosis',

    cardPestBadge: 'MÉDICO VEGETAL IA',
    cardPestTitle: 'Detección de Plagas y Hongos',
    cardPestDesc: 'Diagnostique tizón, barrenadores y hongos con inteligencia artificial agronómica.',
    cardPestAction: 'Diagnosticar Cultivo',

    cardRegistryBadge: 'GACETA OFICIAL',
    cardRegistryTitle: 'Registro de Químicos Prohibidos',
    cardRegistryDesc: 'Consulte más de 50 agroquímicos prohibidos por leyes sanitarias y tratados internacionales.',
    cardRegistryAction: 'Ver Registro',

    sentinelTitle: 'Centinela de Campo Interactivo y Sanidad',
    cropTomato: 'Tomate',
    cropWheat: 'Trigo',
    cropRice: 'Arroz',
    cropCotton: 'Algodón',

    diagnosticsBadge: 'Diagnóstico Activo de Parcela',
    diagnosticsHeading: 'Iniciar Inspección',
    diagnosticsDesc: 'Seleccione su cultivo y ejecute una inspección instantánea con IA.',
    fieldBlockLabel: 'Parcela Seleccionada:',
    cropStageLabel: 'Etapa del Cultivo:',
    cropStageValue: 'Vegetativa / Floración',
    soilMoistureLabel: 'Humedad del Suelo:',
    soilMoistureValue: '62% (Adecuada)',
    launchInspectionBtn: 'Iniciar Inspección',

    fieldActiveStatus: 'Centinela de Campo Activo',
    driftRiskModerate: 'Riesgo Moderado de Deriva',
    safeSprayingWindow: 'Ventana Segura: Madrugada o Atardecer',
  },

  fr: {
    farmOverview: 'Aperçu de l\'Exploitation',
    farmSubtitle: 'Données en temps réel pour un rendement optimal, la sécurité chimique et la protection des cultures.',
    searchPlaceholder: 'Rechercher parcelles, pesticides, maladies...',
    tabDashboard: 'Tableau de bord',
    tabMyFarm: 'Ma Ferme',
    tabCounterfeit: 'Détection Contrefaçons',
    tabRecommendation: 'Recommandation Dosage',
    tabPest: 'Docteur des Plantes',
    weatherTemp: '29°C',
    weatherCondition: 'Partiellement nuageux',
    weatherHumidity: 'Humidité: 48%',
    weatherWind: 'Vent: 19 km/h',
    sprayCautionBadge: 'Pulvérisation: ATTENTION',
    sprayCautionNotice: 'Vent modéré (19 km/h). Utilisez des buses anti-dérive.',

    cardCounterfeitBadge: 'HOLOGRAMME & OPTIQUE',
    cardCounterfeitTitle: 'Détection des Contrefaçons',
    cardCounterfeitDesc: 'Vérifiez les hologrammes 3D et les numéros d\'homologation avant toute pulvérisation.',
    cardCounterfeitAction: 'Vérifier Produit',

    cardRecommendationBadge: 'DOSAGE PULVÉRISATEUR 15L',
    cardRecommendationTitle: 'Système de Recommandation',
    cardRecommendationDesc: 'Calculez les dilutions précises par cuve de 15L et les délais avant récolte.',
    cardRecommendationAction: 'Calculer Dosage',

    cardPestBadge: 'DOCTEUR DES PLANTES IA',
    cardPestTitle: 'Détection des Ravageurs',
    cardPestDesc: 'Diagnostiquez les taches foliaires et attaques fongiques par vision IA.',
    cardPestAction: 'Diagnostiquer Culture',

    cardRegistryBadge: 'REGISTRE OFFICIEL',
    cardRegistryTitle: 'Pesticides Interdits',
    cardRegistryDesc: 'Consultez plus de 50 produits chimiques strictement interdits par la réglementation.',
    cardRegistryAction: 'Voir Registre',

    sentinelTitle: 'Sentinelle de Champ & Protection des Cultures',
    cropTomato: 'Tomate',
    cropWheat: 'Blé',
    cropRice: 'Riz',
    cropCotton: 'Coton',

    diagnosticsBadge: 'Diagnostic Actif de Parcelle',
    diagnosticsHeading: 'Lancer l\'Inspection',
    diagnosticsDesc: 'Sélectionnez votre culture et lancez une analyse phytosanitaire instantanée.',
    fieldBlockLabel: 'Parcelle Sélectionnée:',
    cropStageLabel: 'Stade de la Culture:',
    cropStageValue: 'Végétatif / Floraison',
    soilMoistureLabel: 'Humidité du Sol:',
    soilMoistureValue: '62% (Adéquate)',
    launchInspectionBtn: 'Lancer l\'Inspection',

    fieldActiveStatus: 'Sentinelle de Champ Active',
    driftRiskModerate: 'Risque de Dérive Modéré',
    safeSprayingWindow: 'Créneau Sûr: Tôt le matin ou crépuscule',
  },

  pt: {
    farmOverview: 'Visão Geral da Lavoura',
    farmSubtitle: 'Informações em tempo real para alta produtividade, segurança química e sanidade vegetal.',
    searchPlaceholder: 'Buscar lavoura, defensivos, pragas...',
    tabDashboard: 'Painel',
    tabMyFarm: 'Minha Fazenda',
    tabCounterfeit: 'Detecção de Falsificação',
    tabRecommendation: 'Recomendações e Dosagem',
    tabPest: 'Diagnóstico de Pragas',
    weatherTemp: '29°C',
    weatherCondition: 'Parcialmente Nublado',
    weatherHumidity: 'Umidade: 48%',
    weatherWind: 'Vento: 19 km/h',
    sprayCautionBadge: 'Pulverização: ATENÇÃO',
    sprayCautionNotice: 'Vento moderado (19 km/h). Use pontas de pulverização antideriva.',

    cardCounterfeitBadge: 'HOLOGRAMA E ÓPTICA',
    cardCounterfeitTitle: 'Detecção de Defensivos Falsificados',
    cardCounterfeitDesc: 'Inspecione selos holográficos 3D e registro oficial no ministério antes da aplicação.',
    cardCounterfeitAction: 'Verificar Produto',

    cardRecommendationBadge: 'DOSAGEM PULVERIZADOR 15L',
    cardRecommendationTitle: 'Sistema de Recomendações',
    cardRecommendationDesc: 'Calcule a dosagem exata para tanques costais de 15 litros e o período de carência.',
    cardRecommendationAction: 'Calcular Dosagem',

    cardPestBadge: 'DOUTOR DA LAVOURA IA',
    cardPestTitle: 'Diagnóstico de Pragas e Doenças',
    cardPestDesc: 'Diagnostique manchas foliares, brocas e fungos com inteligência artificial agronômica.',
    cardPestAction: 'Diagnosticar Lavoura',

    cardRegistryBadge: 'DIÁRIO OFICIAL',
    cardRegistryTitle: 'Registro de Agrotóxicos Banidos',
    cardRegistryDesc: 'Consulte mais de 50 agroquímicos proibidos pela legislação e órgãos ambientais.',
    cardRegistryAction: 'Ver Registro',

    sentinelTitle: 'Sentinela do Campo & Manejo de Culturas',
    cropTomato: 'Tomate',
    cropWheat: 'Trigo',
    cropRice: 'Arroz',
    cropCotton: 'Algodão',

    diagnosticsBadge: 'Diagnóstico em Tempo Real',
    diagnosticsHeading: 'Iniciar Inspeção',
    diagnosticsDesc: 'Selecione sua cultura e inicie o diagnóstico imediato de pragas com IA.',
    fieldBlockLabel: 'Talhão Selecionado:',
    cropStageLabel: 'Estágio da Cultura:',
    cropStageValue: 'Vegetativo / Floração',
    soilMoistureLabel: 'Umidade do Solo:',
    soilMoistureValue: '62% (Adequada)',
    launchInspectionBtn: 'Iniciar Inspeção',

    fieldActiveStatus: 'Sentinela do Campo Ativo',
    driftRiskModerate: 'Risco Moderado de Deriva',
    safeSprayingWindow: 'Janela Segura: Início da manhã ou entardecer',
  },

  sw: {
    farmOverview: 'Muhtasari wa Shamba',
    farmSubtitle: 'Taarifa za wakati halisi kwa mavuno bora, usalama wa kemikali na ulinzi wa mazao.',
    searchPlaceholder: 'Tafuta data ya shamba, viuatilifu, magonjwa...',
    tabDashboard: 'Dashibodi',
    tabMyFarm: 'Shamba Langu',
    tabCounterfeit: 'Ugunduzi wa Dawa Bandia',
    tabRecommendation: 'Mfumo wa Ushauri na Vipimo',
    tabPest: 'Daktari wa Mimea',
    weatherTemp: '29°C',
    weatherCondition: 'Mawingu kiasi',
    weatherHumidity: 'Unyevu: 48%',
    weatherWind: 'Upepo: 19 km/h',
    sprayCautionBadge: 'Kupuliza: TAHADHARI',
    sprayCautionNotice: 'Upepo wa wastani (19 km/h). Tumia nozeli za kupunguza pepo.',

    cardCounterfeitBadge: 'HOLOGRAMU NA LENSI',
    cardCounterfeitTitle: 'Ugunduzi wa Viuatilifu Bandia',
    cardCounterfeitDesc: 'Kagua hologramu za 3D na nambari za usajili kabla ya kupuliza shambani.',
    cardCounterfeitAction: 'Thibitisha Dawa',

    cardRecommendationBadge: 'KIPIMO CHA BOMBA LA 15L',
    cardRecommendationTitle: 'Mfumo wa Ushauri wa Vipimo',
    cardRecommendationDesc: 'Hesabu kipimo sahihi cha tanki la lita 15 na muda wa kusubiri kabla ya kuvuna.',
    cardRecommendationAction: 'Hesabu Kipimo',

    cardPestBadge: 'DAKTARI WA MAZAO WA AI',
    cardPestTitle: 'Utambuzi wa Wadudu na Magonjwa',
    cardPestDesc: 'Gundua madoa ya majani, viwavi na fangasi kwa uchambuzi wa picha wa AI.',
    cardPestAction: 'Chunguza Zao',

    cardRegistryBadge: 'ORODHA RASMI YA SERIKALI',
    cardRegistryTitle: 'Dawa Zilizopigwa Marufuku',
    cardRegistryDesc: 'Angalia zaidi ya kemikali 50 zilizopigwa marufuku kisheria kutokana na sumu.',
    cardRegistryAction: 'Tazama Orodha',

    sentinelTitle: 'Mlinzi wa Shamba na Utunzaji wa Mazao',
    cropTomato: 'Nyanya',
    cropWheat: 'Ngano',
    cropRice: 'Mpunga / Mchele',
    cropCotton: 'Pamba',

    diagnosticsBadge: 'Uchunguzi wa Shamba Moja kwa Moja',
    diagnosticsHeading: 'Anza Ukaguzi',
    diagnosticsDesc: 'Chagua zao lako na uanze uchunguzi wa papo hapo wa magonjwa au vipimo vya tanki.',
    fieldBlockLabel: 'Sehemu Iliyochaguliwa:',
    cropStageLabel: 'Hatua ya Zao:',
    cropStageValue: 'Ukuaji / Kuchanua Maua',
    soilMoistureLabel: 'Unyevu wa Udongo:',
    soilMoistureValue: '62% (Inatosha)',
    launchInspectionBtn: 'Anza Ukaguzi',

    fieldActiveStatus: 'Mlinzi wa Shamba Yuko Kazini',
    driftRiskModerate: 'Hatari ya Wastani ya Upepo',
    safeSprayingWindow: 'Muda Salama: Asubuhi na mapema au jioni',
  },

  vi: {
    farmOverview: 'Tổng Quan Nông Trại',
    farmSubtitle: 'Thông tin thời gian thực giúp tối ưu năng suất, an toàn hóa chất và bảo vệ mùa màng.',
    searchPlaceholder: 'Tìm kiếm dữ liệu đồng ruộng, thuốc BVTV, sâu bệnh...',
    tabDashboard: 'Bảng điều khiển',
    tabMyFarm: 'Nông Trại Của Tôi',
    tabCounterfeit: 'Chống Thuốc Giả',
    tabRecommendation: 'Khuyến Nghị Liều Lượng',
    tabPest: 'Bác Sĩ Cây Trồng',
    weatherTemp: '29°C',
    weatherCondition: 'Mây rải rác',
    weatherHumidity: 'Độ ẩm: 48%',
    weatherWind: 'Gió: 19 km/h',
    sprayCautionBadge: 'Phun thuốc: CHÚ Ý',
    sprayCautionNotice: 'Gió vừa (19 km/h). Khuyến nghị dùng đầu phun giảm tạt gió.',

    cardCounterfeitBadge: 'TEM 3D & THỊ GIÁC AI',
    cardCounterfeitTitle: 'Phát Hiện Thuốc BVTV Giả',
    cardCounterfeitDesc: 'Quét tem chống giả 3D, số đăng ký Cục BVTV và bao bì trước khi phun.',
    cardCounterfeitAction: 'Xác Minh Thuốc',

    cardRecommendationBadge: 'TÍNH TOÁN BÌNH 15L',
    cardRecommendationTitle: 'Hệ Thống Khuyến Nghị & Liều Lượng',
    cardRecommendationDesc: 'Tính toán chính xác tỷ lệ pha bình 15 lít và thời gian cách ly thu hoạch.',
    cardRecommendationAction: 'Tính Liều Lượng',

    cardPestBadge: 'BÁC SĨ CÂY TRỒNG AI',
    cardPestTitle: 'Chẩn Đoán Sâu Bệnh Hại',
    cardPestDesc: 'Chẩn đoán đốm lá, sâu đục thân và nấm bệnh qua thị giác máy tính AI.',
    cardPestAction: 'Chẩn Đoán Cây',

    cardRegistryBadge: 'CÔNG BÁO BỘ NÔNG NGHIỆP',
    cardRegistryTitle: 'Danh Mục Hóa Chất Cấm',
    cardRegistryDesc: 'Tra cứu hơn 50 hoạt chất thuốc BVTV bị cấm sử dụng theo quy định nhà nước.',
    cardRegistryAction: 'Xem Danh Mục',

    sentinelTitle: 'Trạm Giám Sát Đồng Ruộng & Chăm Sóc Cây Trồng',
    cropTomato: 'Cà chua',
    cropWheat: 'Lúa mì',
    cropRice: 'Lúa nước',
    cropCotton: 'Bông vải',

    diagnosticsBadge: 'Chẩn Đoán Trực Tiếp & Chăm Sóc Chuẩn Xác',
    diagnosticsHeading: 'Bắt Đầu Kiểm Tra',
    diagnosticsDesc: 'Chọn loại cây trồng để kiểm tra sâu bệnh, thuốc giả hoặc liều lượng bình phun.',
    fieldBlockLabel: 'Thửa ruộng đã chọn:',
    cropStageLabel: 'Giai đoạn sinh trưởng:',
    cropStageValue: 'Phát triển sinh dưỡng / Ra hoa',
    soilMoistureLabel: 'Độ ẩm đất:',
    soilMoistureValue: '62% (Đầy đủ)',
    launchInspectionBtn: 'Bắt Đầu Kiểm Tra',

    fieldActiveStatus: 'Trạm Giám Sát Đang Hoạt Động',
    driftRiskModerate: 'Nguy cơ tạt gió mức trung bình',
    safeSprayingWindow: 'Khung giờ phun an toàn: Sáng sớm hoặc chiều mát',
  },

  ar: {
    farmOverview: 'نظرة عامة على المزرعة',
    farmSubtitle: 'بيانات وإرشادات مباشرة لتحقيق أعلى إنتاجية، سلامة المبيدات، وحماية المحاصيل.',
    searchPlaceholder: 'ابحث عن بيانات المزرعة، المبيدات، أمراض النبات...',
    tabDashboard: 'لوحة التحكم',
    tabMyFarm: 'مزرعتي',
    tabCounterfeit: 'كشف المبيدات المغشوشة',
    tabRecommendation: 'نظام التوصيات والجرعات',
    tabPest: 'طبيب المحاصيل',
    weatherTemp: '29°C',
    weatherCondition: 'غائم جزئياً',
    weatherHumidity: 'الرطوبة: 48%',
    weatherWind: 'الرياح: 19 كم/س',
    sprayCautionBadge: 'الرش: تنبيه حذر',
    sprayCautionNotice: 'رياح معتدلة (19 كم/س). استخدم فوهات مضادة لانجراف الرذاذ.',

    cardCounterfeitBadge: 'الهولوجرام والعدسة',
    cardCounterfeitTitle: 'كشف المبيدات المغشوشة (VERIFY-X)',
    cardCounterfeitDesc: 'افحص الهولوجرام ثلاثي الأبعاد ورقم التسجيل المعتمد وسلامة العبوة قبل الرش.',
    cardCounterfeitAction: 'التحقق من المنتج',

    cardRecommendationBadge: 'حساب خزان الرش 15 لتر',
    cardRecommendationTitle: 'نظام التوصيات والجرعات الدقيقة',
    cardRecommendationDesc: 'احسب جرعة التخفيف بدقة لخزان الرشاشة الظهرية وفترة الأمان قبل الحصاد.',
    cardRecommendationAction: 'حساب الجرعة',

    cardPestBadge: 'طبيب المحاصيل بالذكاء الاصطناعي',
    cardPestTitle: 'تشخيص الآفات والأمراض',
    cardPestDesc: 'شخّص تبقع الأوراق وحفارات الساق والأمراض الفطرية فورياً بالرؤية الذكية.',
    cardPestAction: 'تشخيص المحصول',

    cardRegistryBadge: 'الجريدة الرسمية واللوائح',
    cardRegistryTitle: 'سجل المبيدات المحظورة',
    cardRegistryDesc: 'تحقق من أكثر من 50 مبيداً خطيراً محظوراً قانونياً لحماية سلامة المزارع والغذاء.',
    cardRegistryAction: 'عرض السجل',

    sentinelTitle: 'رادار الحقل التفاعلي والعناية بالمحاصيل',
    cropTomato: 'الطماطم',
    cropWheat: 'القمح',
    cropRice: 'الأرز',
    cropCotton: 'القطن',

    diagnosticsBadge: 'التشخيص الميداني الفعّال',
    diagnosticsHeading: 'بدء الفحص',
    diagnosticsDesc: 'اختر المحصول وابدأ الفحص الفوري لأمراض الأوراق أو كشف الغش أو حساب الجرعة.',
    fieldBlockLabel: 'حوض الحقل المحدد:',
    cropStageLabel: 'مرحلة نمو المحصول:',
    cropStageValue: 'نمو خضري / مرحلة التزهير',
    soilMoistureLabel: 'رطوبة التربة:',
    soilMoistureValue: '62% (كافية)',
    launchInspectionBtn: 'بدء الفحص',

    fieldActiveStatus: 'رادار الحقل نشط',
    driftRiskModerate: 'خطر انجراف رذاذ متوسط',
    safeSprayingWindow: 'الوقت الآمن للرش: الصباح الباكر أو عند الغروب',
  },

  id: {
    farmOverview: 'Ikhtisar Lahan Pertanian',
    farmSubtitle: 'Wawasan waktu nyata untuk hasil panen optimal, keamanan pestisida, dan perlindungan tanaman.',
    searchPlaceholder: 'Cari data lahan, pestisida, penyakit...',
    tabDashboard: 'Dasbor',
    tabMyFarm: 'Pertanian Saya',
    tabCounterfeit: 'Deteksi Pestisida Palsu',
    tabRecommendation: 'Sistem Rekomendasi & Dosis',
    tabPest: 'Dokter Tanaman',
    weatherTemp: '29°C',
    weatherCondition: 'Cerah Berawan',
    weatherHumidity: 'Kelembaban: 48%',
    weatherWind: 'Angin: 19 km/jam',
    sprayCautionBadge: 'Penyemprotan: WASPADA',
    sprayCautionNotice: 'Kecepatan angin sedang (19 km/jam). Gunakan nozel pengurang drift.',

    cardCounterfeitBadge: 'HOLOGRAM & LENSA',
    cardCounterfeitTitle: 'Deteksi Pestisida Palsu (VERIFY-X)',
    cardCounterfeitDesc: 'Periksa hologram 3D, nomor pendaftaran kementerian, dan keaslian kemasan sebelum aplikasi.',
    cardCounterfeitAction: 'Verifikasi Produk',

    cardRecommendationBadge: 'TAKIKAN TANGKI 15L',
    cardRecommendationTitle: 'Sistem Rekomendasi & Dosis',
    cardRecommendationDesc: 'Hitung dosis tepat untuk tangki semprot 15 liter dan masa tunggu sebelum panen.',
    cardRecommendationAction: 'Hitung Dosis',

    cardPestBadge: 'DOKTER TANAMAN AI',
    cardPestTitle: 'Deteksi Hama & Penyakit',
    cardPestDesc: 'Diagnosis bercak daun, penggerek batang, dan infeksi jamur dengan AI agronomi.',
    cardPestAction: 'Diagnosis Tanaman',

    cardRegistryBadge: 'GASET RESMI PEMERINTAH',
    cardRegistryTitle: 'Daftar Pestisida Terlarang',
    cardRegistryDesc: 'Cek 50+ bahan kimia terlarang berdasarkan peraturan menteri pertanian dan lingkungan hidup.',
    cardRegistryAction: 'Lihat Daftar',

    sentinelTitle: 'Pemantau Lahan Interaktif & Perawatan Tanaman',
    cropTomato: 'Tomat',
    cropWheat: 'Gandum',
    cropRice: 'Padi',
    cropCotton: 'Kapas',

    diagnosticsBadge: 'Diagnostik Lapangan Aktif',
    diagnosticsHeading: 'Mulai Inspeksi',
    diagnosticsDesc: 'Pilih tanaman Anda dan jalankan inspeksi AI instan untuk penyakit daun atau perhitungan dosis.',
    fieldBlockLabel: 'Blok Lahan Terpilih:',
    cropStageLabel: 'Fase Pertumbuhan:',
    cropStageValue: 'Vegetatif / Berbunga',
    soilMoistureLabel: 'Kelembaban Tanah:',
    soilMoistureValue: '62% (Memadai)',
    launchInspectionBtn: 'Mulai Inspeksi',

    fieldActiveStatus: 'Pemantau Lahan Aktif',
    driftRiskModerate: 'Risiko Drift Angin Sedang',
    safeSprayingWindow: 'Waktu Semprot Aman: Pagi hari atau menjelang sore',
  },
};
