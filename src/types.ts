export type LanguageCode =
  | 'en'
  | 'hi'
  | 'bn'
  | 'te'
  | 'ta'
  | 'kn'
  | 'ml'
  | 'mr'
  | 'pa'
  | 'gu'
  | 'or'
  | 'ur'
  | 'es'
  | 'fr'
  | 'pt'
  | 'sw'
  | 'vi'
  | 'ar'
  | 'id';

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
  speechLocale: string;
}

export type FeatureMode = 'pest' | 'counterfeit' | 'recommendation' | 'registry';

export type VerificationStatus = 'verified' | 'suspicious' | 'counterfeit' | 'banned' | 'unknown' | 'not_agricultural';

export type Severity = 'low' | 'moderate' | 'high' | 'critical';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  preferredLanguage: LanguageCode;
  role: 'farmer' | 'agronomist' | 'admin';
  farmProfile?: FarmerProfile;
  createdAt: string;
}

export interface FarmerProfile {
  farmName: string;
  location: string;
  stateOrRegion: string;
  farmSizeAcres: number;
  primaryCrops: string[];
  soilType: string;
  irrigationType: string;
  experienceYears?: number;
}

export type SpeciesCategory =
  | 'human'
  | 'beneficial'
  | 'harmful_pest'
  | 'harmful_wildlife'
  | 'domestic_animal'
  | 'agrochemical_packaging'
  | 'crop_pathology'
  | 'non_farm_object';

export interface SpeciesClassification {
  isCropOrPest: boolean;
  detectedSpecies: string;
  scientificName?: string;
  speciesCategory: SpeciesCategory;
  isHarmfulToFarm: boolean;
  ecologicalRole?: string;
  damageAssessment?: string;
  managementAdvice?: string;
  redirectFeature?: 'counterfeit' | 'pest' | 'recommendation';
}

export interface PestDiagnosis {
  id: string;
  crop: string;
  diseaseName: string;
  scientificName?: string;
  confidence: number;
  severity: Severity;
  symptoms: string[];
  likelyCause: string;
  recommendedAction: string;
  safetyPrecautions: string[];
  treatmentOptions: {
    name: string;
    type: 'bio' | 'organic' | 'chemical';
    verified: boolean;
    cibrcApproved: boolean;
  }[];
  economicThresholdLevel?: string;
  soilCorrelation?: string;
  benchmarkGrounding?: string;
  explicitlyBannedChemicals?: string[];
  speciesClassification?: SpeciesClassification;
  imageUrl?: string;
  timestamp: string;
}

export interface CounterfeitScan {
  id: string;
  productName: string;
  manufacturer: string;
  batchNumber: string;
  mfgDate: string;
  expDate: string;
  registrationNumber: string;
  status: VerificationStatus;
  authenticityScore: number;
  isAgriculturalProduct?: boolean;
  decisionMessage?: string;
  bannedChemicalDetails?: {
    isBanned: boolean;
    name: string;
    reason: string;
    gazetteNotification?: string;
    toxicityClass?: string;
    safeApprovedAlternative?: string;
  };
  recognitionDetails?: {
    detectedText?: string;
    activeIngredients?: string;
    detectedCategory?: string;
  };
  productCategory?: 'Banned Chemical' | 'Pesticide' | 'Insecticide' | 'Fungicide' | 'Herbicide' | 'Fertilizer' | 'Hybrid Seeds' | 'Biostimulant' | 'Non-Agricultural Item';
  activeIngredient?: string;
  toxicityTriangle?: {
    color: 'Red (Extremely Toxic)' | 'Yellow (Highly Toxic)' | 'Blue (Moderately Toxic)' | 'Green (Slightly Toxic)' | 'Missing / Non-Compliant';
    matched: boolean;
  };
  hologramCheck?: {
    status: 'Authentic 3D Kinetic' | 'Flat Photocopy Sticker' | 'Tampered / Re-glued' | 'Missing';
    notes: string;
  };
  visualDefects?: string[];
  verificationFactors: {
    name: string;
    matched: boolean;
    notes: string;
  }[];
  warnings: string[];
  safetyGuidance: string[];
  safeAlternatives?: string[];
  legalRecourse?: string[];
  imageUrl?: string;
  timestamp: string;
  source?: string;
  modelUsed?: string;
}

export interface ProductRecommendation {
  id: string;
  name: string;
  brand: string;
  manufacturer: string;
  category: 'Bio-Fungicide' | 'Bio-Pesticide' | 'Chemical Insecticide' | 'Organic Formulation' | 'Soil Conditioner';
  activeIngredient: string;
  verifiedStatus: boolean;
  cibrcRegNumber: string;
  cropCompatibility: number;
  problemAddressed: string;
  dosagePer15LTank: string;
  applicationMethod: string;
  frequency: string;
  preHarvestIntervalDays: number;
  reEntryIntervalHours: number;
  ppeRequired: string[];
  safetyPrecautions: string[];
  alternatives: string[];
  confidence: number;
  isDemoProduct?: boolean;
  baseDosePerLiter?: { amount: number; unit: 'ml' | 'g' };
  toxicityTriangleColor?: string;
  cibrcSection?: string;
  fcoCompliant?: boolean;
  targetCrops?: string[];
  compatibleMixes?: string[];
  incompatibleMixes?: string[];
  optimalApplicationWindow?: string;
  variousTanksDosage?: Record<string, string>;
}

export interface BannedChemical {
  id: string;
  name: string;
  casNumber: string;
  gazetteNotification: string;
  banType: 'Total Ban' | 'Refused Registration' | 'Strictly Restricted Use';
  toxicityClass: 'Class Ia (Extremely Hazardous)' | 'Class Ib (Highly Hazardous)' | 'Class II (Moderately Hazardous)';
  reason: string;
  safeApprovedAlternative: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  mode?: FeatureMode;
  contextSnapshot?: {
    crop?: string;
    pest?: string;
    verifiedProduct?: string;
  };
  audioBase64?: string;
  quickActions?: {
    label: string;
    action: string;
    payload?: any;
  }[];
}

export type VoiceState = 'idle' | 'listening' | 'processing' | 'thinking' | 'speaking' | 'error';

export interface LiveWeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  sprayCautionBadge: string;
  sprayCautionNotice: string;
  isLive: boolean;
  latitude?: number;
  longitude?: number;
  updatedAt: string;
}

export interface RecentPestScanMemory {
  crop: string;
  diseaseName: string;
  scientificName?: string;
  symptoms?: string[];
  severity?: string;
  economicThresholdLevel?: string;
  recommendedAction?: string;
  treatmentOptions?: { name: string; type: string }[];
  timestamp?: string;
  source?: 'visual_scan' | 'pest_chat';
}

export interface RecentCounterfeitScanMemory {
  productName: string;
  manufacturer?: string;
  batchNumber?: string;
  status: VerificationStatus;
  authenticityScore?: number;
  decisionMessage?: string;
  timestamp?: string;
}

export interface RecentRecommendationMemory {
  crop: string;
  disease?: string;
  productNames: string[];
  tankCapacityLiters?: number;
  timestamp?: string;
}

export interface FarmContext {
  crop?: string;
  stage?: string;
  pestIssue?: string;
  diagnosedDisease?: string;
  recommendedProduct?: string;
  verificationStatus?: VerificationStatus;
  location?: string;
  soilType?: string;
  weatherAlert?: string;
  language?: string;
  activeFeature?: string;
  temperature?: number;
  weatherCondition?: string;
  windSpeedKmH?: number;
  humidityPercent?: number;
  sprayAdvisory?: string;
  tankSizeLiters?: number;
  recentPestDiagnosis?: RecentPestScanMemory;
  recentCounterfeitScan?: RecentCounterfeitScanMemory;
  recentRecommendation?: RecentRecommendationMemory;
  crossChatNote?: string;
}
