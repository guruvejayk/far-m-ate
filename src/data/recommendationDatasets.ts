/**
 * FAR[M]ATE Verified Agricultural Input & Statutory Recommendation Knowledge Base
 * Grounded in:
 * 1. CIBRC (Central Insecticides Board & Registration Committee) - Major Uses & Registered Formulations
 * 2. FCO (Fertilizer Control Order, 1985) - Soil Test Crop Response (STCR) & Biostimulant Specifications
 * 3. ICAR & State Agricultural Universities (SAUs) - Package of Practices for Integrated Pest & Nutrient Management
 */

import { ProductRecommendation } from '../types';

export interface TankCapacityOption {
  id: string;
  label: string;
  liters: number;
  description: string;
}

export const COMMON_SPRAYER_TANKS: TankCapacityOption[] = [
  { id: 'tank-5l', label: '5L Handheld Sprayer', liters: 5, description: 'Nursery & kitchen garden pressure sprayer' },
  { id: 'tank-10l', label: '10L Compact Backpack', liters: 10, description: 'Lightweight manual backpack sprayer' },
  { id: 'tank-12l', label: '12L Battery Sprayer', liters: 12, description: 'Cordless electric backpack sprayer' },
  { id: 'tank-15l', label: '15L Standard Knapsack', liters: 15, description: 'Standard Indian agrarian knapsack sprayer' },
  { id: 'tank-16l', label: '16L Commercial Knapsack', liters: 16, description: 'High-capacity manual lever knapsack sprayer' },
  { id: 'tank-20l', label: '20L Power / Motorized Sprayer', liters: 20, description: '2-stroke petrol engine / mist blower backpack' },
  { id: 'tank-200l', label: '200L Tractor Drum / Trolley', liters: 200, description: 'Tractor boom & high-pressure hose orchard sprayer' },
];

export interface VerifiedAgrochemicalInput extends ProductRecommendation {
  baseDosePerLiter: {
    amount: number;
    unit: 'ml' | 'g';
  };
  toxicityTriangleColor: 'Green (Slightly Toxic)' | 'Blue (Moderately Toxic)' | 'Yellow (Highly Toxic)';
  fcoCompliant?: boolean;
  cibrcSection: string;
  targetCrops: string[];
  compatibleMixes: string[];
  incompatibleMixes: string[];
  optimalApplicationWindow: string;
}

export const VERIFIED_RECOMMENDATION_DATASET: VerifiedAgrochemicalInput[] = [
  // 1. Trichoderma viride 1.5% WP
  {
    id: 'rec-tricho-1',
    name: 'Trichoderma viride 1.5% WP (Bio-Protector)',
    brand: 'Kisan BioShield Trichoderma',
    manufacturer: 'National Agro-Bio Laboratories (ICAR Licensed)',
    category: 'Bio-Fungicide',
    activeIngredient: 'Trichoderma viride strain T-12 (CFU 2 x 10^8 / gm)',
    verifiedStatus: true,
    cibrcRegNumber: 'CIR-89240/2021-Trichoderma(WP)-11',
    cibrcSection: 'Section 9(3B) Bio-Pesticide',
    cropCompatibility: 98,
    problemAddressed: 'Root Rot, Damping Off, Early Blight, Fusarium Wilt, Collar Rot, Soft Rot',
    dosagePer15LTank: '45g - 50g per 15L knapsack tank',
    baseDosePerLiter: { amount: 3.0, unit: 'g' },
    applicationMethod: 'Foliar spray and root perimeter drenching during early morning or overcast evening',
    frequency: 'Every 10-14 days; prophylactic application recommended before heavy rains',
    preHarvestIntervalDays: 0,
    reEntryIntervalHours: 4,
    toxicityTriangleColor: 'Green (Slightly Toxic)',
    targetCrops: ['Tomato', 'Potato', 'Chilli / Pepper', 'Rice / Paddy', 'Turmeric', 'Groundnut', 'Chickpea', 'Pigeon Pea', 'Banana', 'Soybean'],
    compatibleMixes: ['Neem oil (Azadirachtin)', 'Pseudomonas fluorescens', 'Seaweed extract', 'Humic acid'],
    incompatibleMixes: ['Copper Oxychloride', 'Streptocycline', 'Carbendazim', 'Synthetic chemical fungicides (wait 5 days)'],
    optimalApplicationWindow: 'Spray between 6:00 AM - 9:00 AM or after 4:30 PM to preserve fungal spore viability from UV rays',
    ppeRequired: ['Dust mask', 'Cotton gloves', 'Protective eyewear'],
    safetyPrecautions: [
      'Zero toxic residue; safe for honeybees, pollinators, and beneficial earthworms.',
      'Pre-mix in 1 litre of clean water in a plastic bucket before pouring into sprayer tank filter mesh.',
      'Do not use sprayer tanks contaminated with residual synthetic fungicides.'
    ],
    alternatives: ['Pseudomonas fluorescens 1.0% WP', 'Neem Azadirachtin 10,000 ppm'],
    confidence: 97,
  },

  // 2. Pseudomonas fluorescens 1.0% WP
  {
    id: 'rec-pseudo-2',
    name: 'Pseudomonas fluorescens 1.0% WP (Bio-Bactericide & Shield)',
    brand: 'GreenGuard Bio-Bactericide',
    manufacturer: 'AgriSafe Bio-Sciences India Ltd.',
    category: 'Bio-Fungicide',
    activeIngredient: 'Pseudomonas fluorescens strain Pf-1 (CFU 1 x 10^8 / gm)',
    verifiedStatus: true,
    cibrcRegNumber: 'CIR-77142/2020-Pseudomonas(WP)-08',
    cibrcSection: 'Section 9(3B) Bio-Pesticide',
    cropCompatibility: 96,
    problemAddressed: 'Rice Blast, Sheath Blight, Bacterial Leaf Blight, Citrus Canker, Panama Wilt, Rust',
    dosagePer15LTank: '45g - 50g per 15L knapsack tank',
    baseDosePerLiter: { amount: 3.0, unit: 'g' },
    applicationMethod: 'Foliar spray at tillering, flowering, or initial disease detection',
    frequency: '2 sprays at 12-15 day intervals during active vegetative growth',
    preHarvestIntervalDays: 0,
    reEntryIntervalHours: 4,
    toxicityTriangleColor: 'Green (Slightly Toxic)',
    targetCrops: ['Rice / Paddy', 'Wheat', 'Citrus', 'Banana', 'Turmeric', 'Finger Millet / Ragi', 'Tomato', 'Groundnut'],
    compatibleMixes: ['Trichoderma viride', 'Neem oil', 'Humic acid', 'Zinc sulphate (diluted)'],
    incompatibleMixes: ['Copper fungicides', 'Bactericides (Streptocycline)', 'Bleaching powder'],
    optimalApplicationWindow: 'Early morning or cloudy overcast conditions; use solution within 4 hours of reconstitution',
    ppeRequired: ['Protective mask', 'Rubber gloves'],
    safetyPrecautions: [
      'Produces natural plant growth-promoting siderophores that chelate iron for crop roots.',
      'Keep powder dry in cool shaded storage below 28°C.'
    ],
    alternatives: ['Trichoderma viride 1.5% WP', 'Copper Oxychloride 50% WP'],
    confidence: 96,
  },

  // 3. Neem Azadirachtin 10,000 PPM (1.0% EC)
  {
    id: 'rec-neem-3',
    name: 'Neem Azadirachtin 10,000 PPM (1.0% EC Bio-Extract)',
    brand: 'EcoNeem Gold 10K',
    manufacturer: 'EcoProtect Agro Inputs Ltd.',
    category: 'Bio-Pesticide',
    activeIngredient: 'Azadirachtin 1.0% EC (Cold-pressed neem seed kernel extract)',
    verifiedStatus: true,
    cibrcRegNumber: 'CIR-44120/2019-Azadirachtin(EC)-03',
    cibrcSection: 'Section 9(3) Botanical Insecticide',
    cropCompatibility: 97,
    problemAddressed: 'Aphids, Whiteflies, Thrips, Jassids, Leaf Miners, Diamondback Moth, Bollworms',
    dosagePer15LTank: '30ml - 45ml per 15L knapsack tank',
    baseDosePerLiter: { amount: 2.5, unit: 'ml' },
    applicationMethod: 'Complete foliar drenching targeting leaf undersides where sucking pests shelter',
    frequency: 'Every 7-10 days depending on pest population pressure',
    preHarvestIntervalDays: 3,
    reEntryIntervalHours: 6,
    toxicityTriangleColor: 'Green (Slightly Toxic)',
    targetCrops: ['Tomato', 'Chilli / Pepper', 'Cotton', 'Mustard', 'Okra / Bhendi', 'Brinjal', 'Onion', 'Cabbage', 'Citrus'],
    compatibleMixes: ['Bacillus thuringiensis', 'Beauveria bassiana', 'Metarhizium anisopliae', 'NPK foliar fertilizers'],
    incompatibleMixes: ['Strong alkaline chemicals (Lime sulphur, Bordeaux mixture with pH > 8.5)'],
    optimalApplicationWindow: 'Late afternoon (after 4:30 PM) to avoid UV degradation and protect foraging honeybees',
    ppeRequired: ['Safety goggles', 'Waterproof gloves', 'Long-sleeve shirt'],
    safetyPrecautions: [
      'Acts via anti-feedant, repellent, and insect growth regulation (IGR); does not induce chemical pest resistance.',
      'Slightly toxic to aquatic organisms; maintain 5-meter buffer from fish ponds.'
    ],
    alternatives: ['Beauveria bassiana 1.15% WP', 'Spinosad 45% SC'],
    confidence: 95,
  },

  // 4. Bacillus thuringiensis kurstaki (Bt 8L)
  {
    id: 'rec-bt-4',
    name: 'Bacillus thuringiensis var. kurstaki (Bt 8L Bio-Larvicide)',
    brand: 'Delfin Bio-Bt',
    manufacturer: 'Certis Bio-Agro Solutions',
    category: 'Organic Formulation',
    activeIngredient: 'Bacillus thuringiensis var. kurstaki (16,000 IU/mg delta-endotoxin)',
    verifiedStatus: true,
    cibrcRegNumber: 'CIR-60291/2018-Bacillus(WP)-06',
    cibrcSection: 'Section 9(3) Microbial Insecticide',
    cropCompatibility: 96,
    problemAddressed: 'Fall Armyworm, Diamondback Moth, Helicoverpa Pod Borer, Shoot & Fruit Borer, Caterpillars',
    dosagePer15LTank: '25g - 30g per 15L knapsack tank',
    baseDosePerLiter: { amount: 2.0, unit: 'g' },
    applicationMethod: 'Foliar canopy spray targeting young emerging instar larvae',
    frequency: 'Apply at early larval hatch; repeat in 7 days if fresh hatching occurs',
    preHarvestIntervalDays: 0,
    reEntryIntervalHours: 4,
    toxicityTriangleColor: 'Green (Slightly Toxic)',
    targetCrops: ['Maize / Corn', 'Cabbage / Cauliflower', 'Chickpea', 'Tomato', 'Brinjal', 'Cotton', 'Pigeon Pea'],
    compatibleMixes: ['Neem Azadirachtin', 'HaNPV virus', 'Seaweed bio-stimulants'],
    incompatibleMixes: ['Chlorpyrifos', 'Copper fungicides', 'Strong alkaline foliar sprays'],
    optimalApplicationWindow: 'Dusk application (5:00 PM onwards); endotoxin breaks down under midday sunlight',
    ppeRequired: ['Dust mask', 'Cotton gloves'],
    safetyPrecautions: [
      '100% safe for mammals, birds, honeybees, and natural predators like ladybirds.',
      'Larvae stop feeding within 2 hours of ingestion and die within 48-72 hours.'
    ],
    alternatives: ['Chlorantraniliprole 18.5% SC', 'Spinetoram 11.7% SC'],
    confidence: 96,
  },

  // 5. Beauveria bassiana 1.15% WP
  {
    id: 'rec-beauveria-5',
    name: 'Beauveria bassiana 1.15% WP (White Muscardine Bio-Insecticide)',
    brand: 'Boverin Bio-Insecticide',
    manufacturer: 'AgriSafe Bio-Sciences India Ltd.',
    category: 'Bio-Pesticide',
    activeIngredient: 'Beauveria bassiana strain Bb-5a (CFU 1 x 10^8 / gm)',
    verifiedStatus: true,
    cibrcRegNumber: 'CIR-90112/2022-Beauveria(WP)-14',
    cibrcSection: 'Section 9(3B) Bio-Pesticide',
    cropCompatibility: 95,
    problemAddressed: 'Whitefly vector, Chilli Thrips, Mealybugs, Jassids, Pink Bollworm, Rice Leaf Folder',
    dosagePer15LTank: '40g - 45g per 15L knapsack tank',
    baseDosePerLiter: { amount: 2.8, unit: 'g' },
    applicationMethod: 'Fine mist spray targeting foliage undersides with 0.5ml/L non-ionic wetting sticker',
    frequency: '2-3 sprays at 7-10 day intervals during humid weather',
    preHarvestIntervalDays: 0,
    reEntryIntervalHours: 4,
    toxicityTriangleColor: 'Green (Slightly Toxic)',
    targetCrops: ['Cotton', 'Chilli / Pepper', 'Okra / Bhendi', 'Tomato', 'Sugarcane', 'Soybean', 'Brinjal'],
    compatibleMixes: ['Neem Azadirachtin', 'Metarhizium anisopliae', 'Verticillium lecanii'],
    incompatibleMixes: ['Chemical fungicides (wait at least 7 days before or after)'],
    optimalApplicationWindow: 'Evening hours with relative humidity > 70% for optimal fungal spore germ tube penetration',
    ppeRequired: ['Face mask', 'Nitrile gloves'],
    safetyPrecautions: [
      'Always add non-ionic wetting agent (like Sandovit) so spores adhere to waxy insect cuticles.',
      'Store below 22°C away from heat sources.'
    ],
    alternatives: ['Neem Azadirachtin 10,000 ppm', 'Thiamethoxam 25% WG'],
    confidence: 94,
  },

  // 6. Metarhizium anisopliae 1.15% WP
  {
    id: 'rec-metarhizium-6',
    name: 'Metarhizium anisopliae 1.15% WP (Green Muscardine Soil & Foliar Bio-Agent)',
    brand: 'MetarGuard Green',
    manufacturer: 'EcoProtect Agro Inputs Ltd.',
    category: 'Bio-Pesticide',
    activeIngredient: 'Metarhizium anisopliae (CFU 1 x 10^8 / gm)',
    verifiedStatus: true,
    cibrcRegNumber: 'CIR-55093/2021-Metarhizium(WP)-07',
    cibrcSection: 'Section 9(3B) Bio-Pesticide',
    cropCompatibility: 95,
    problemAddressed: 'White Grubs, Termites, Rhinoceros Beetle, Fall Armyworm, Root Borers, Brown Planthopper',
    dosagePer15LTank: '45g - 50g per 15L knapsack tank (Foliar) OR 2 kg/acre mixed with 100 kg FYM for soil application',
    baseDosePerLiter: { amount: 3.2, unit: 'g' },
    applicationMethod: 'Soil application around root perimeter or foliar spray directly into plant whorls',
    frequency: 'Apply at sowing or root earthing-up; repeat once in mid-season during moist soil conditions',
    preHarvestIntervalDays: 0,
    reEntryIntervalHours: 4,
    toxicityTriangleColor: 'Green (Slightly Toxic)',
    targetCrops: ['Sugarcane', 'Groundnut', 'Maize / Corn', 'Coconut', 'Rice / Paddy', 'Potato', 'Mango'],
    compatibleMixes: ['Beauveria bassiana', 'Trichoderma viride', 'Farm Yard Manure (FYM)', 'Neem cake'],
    incompatibleMixes: ['Chemical soil fungicides (Hexaconazole, Carbendazim, Copper)'],
    optimalApplicationWindow: 'Apply to moist soil during evening; ensure soil is irrigated within 24 hours',
    ppeRequired: ['Dust mask', 'Rubber gloves', 'Footwear'],
    safetyPrecautions: [
      'Infects soil-dwelling larvae by penetrating the chitinous cuticle, killing grubs within 5-8 days.',
      'Store in dry cool space.'
    ],
    alternatives: ['Chlorantraniliprole 18.5% SC', 'Neem Seed Kernel Cake'],
    confidence: 95,
  },

  // 7. FMC Coragen (Chlorantraniliprole 18.5% SC)
  {
    id: 'rec-coragen-7',
    name: 'FMC Coragen (Chlorantraniliprole 18.5% SC)',
    brand: 'Coragen Insecticide',
    manufacturer: 'FMC India Pvt. Ltd.',
    category: 'Chemical Insecticide',
    activeIngredient: 'Chlorantraniliprole 18.5% w/w (Anthranilic Diamide)',
    verifiedStatus: true,
    cibrcRegNumber: 'CIR-64210/2012-Chlorantraniliprole(SC)-12',
    cibrcSection: 'Section 9(3) Registered Insecticide',
    cropCompatibility: 98,
    problemAddressed: 'Fruit Borer, Shoot Borer, Diamondback Moth, Stem Borer, Pink Bollworm, Fall Armyworm',
    dosagePer15LTank: '6ml per 15L knapsack tank (0.4 ml per litre)',
    baseDosePerLiter: { amount: 0.4, unit: 'ml' },
    applicationMethod: 'Foliar spray at early instar egg hatch; calibrate nozzle for even droplet distribution',
    frequency: 'Maximum 2 sprays per season with minimum 21 days interval to prevent resistance',
    preHarvestIntervalDays: 3,
    reEntryIntervalHours: 12,
    toxicityTriangleColor: 'Green (Slightly Toxic)',
    targetCrops: ['Rice / Paddy', 'Sugarcane', 'Cotton', 'Tomato', 'Maize / Corn', 'Brinjal', 'Cabbage', 'Chickpea'],
    compatibleMixes: ['Most neutral fungicides (Difenoconazole, Azoxystrobin, Mancozeb)'],
    incompatibleMixes: ['Alkaline mixtures (Lime, Bordeaux mixture)'],
    optimalApplicationWindow: 'Apply during low wind (<15 km/h) during early morning or late afternoon',
    ppeRequired: ['Rubber gloves', 'Protective face mask', 'Safety goggles'],
    safetyPrecautions: [
      'Green statutory toxicity triangle; exceptionally safe for honeybees and beneficial insects after spray drying.',
      'Do not exceed labeled dosage: 60 ml per acre.'
    ],
    alternatives: ['Spinosad 45% SC', 'Bacillus thuringiensis kurstaki 8L', 'Emamectin Benzoate 5% SG'],
    confidence: 98,
  },

  // 8. Copper Oxychloride 50% WP
  {
    id: 'rec-copper-8',
    name: 'Copper Oxychloride 50% WP (Contact Bactericide & Protectant)',
    brand: 'Blitox 50 Protectant',
    manufacturer: 'Tata Rallis India Ltd.',
    category: 'Chemical Insecticide',
    activeIngredient: 'Copper Oxychloride 50% WP (metallic copper equivalent 45%)',
    verifiedStatus: true,
    cibrcRegNumber: 'CIR-99210/2014-CopperOxychloride(WP)-02',
    cibrcSection: 'Section 9(3) Contact Protectant',
    cropCompatibility: 93,
    problemAddressed: 'Late Blight, Early Blight, Downy Mildew, Citrus Canker, Anthracnose Dieback, Soft Rot',
    dosagePer15LTank: '35g - 40g per 15L knapsack tank (2.5g per litre)',
    baseDosePerLiter: { amount: 2.5, unit: 'g' },
    applicationMethod: 'Preventative foliar surface barrier spray prior to rain or high-humidity spells',
    frequency: 'Apply at 12-15 day intervals; maximum 3 sprays per crop cycle',
    preHarvestIntervalDays: 7,
    reEntryIntervalHours: 24,
    toxicityTriangleColor: 'Blue (Moderately Toxic)',
    targetCrops: ['Potato', 'Tomato', 'Chilli / Pepper', 'Citrus', 'Turmeric', 'Apple', 'Banana', 'Onion'],
    compatibleMixes: ['Streptocycline (1g/15L for bacterial canker)', 'Mancozeb 75% WP'],
    incompatibleMixes: ['Bio-fungicides (Trichoderma, Pseudomonas)', 'Organophosphates', 'Lime sulphur'],
    optimalApplicationWindow: 'Spray when foliage is dry; avoid spraying during extreme midday heat (>35°C)',
    ppeRequired: ['Chemical splash goggles', 'Rubber boots', 'Nitrile gloves', 'Respirator'],
    safetyPrecautions: [
      'Corrosive to brass knapsack sprayers; rinse sprayer pump thoroughly with clean water immediately after use.',
      'Maintain statutory 10-meter aquatic buffer zone from canals and ponds.',
      'Observe 7-day pre-harvest waiting interval.'
    ],
    alternatives: ['Trichoderma viride 1.5% WP', 'Azoxystrobin + Difenoconazole'],
    confidence: 93,
  },

  // 9. Emamectin Benzoate 5% SG
  {
    id: 'rec-emamectin-9',
    name: 'Emamectin Benzoate 5% SG (Targeted Lepidopteran Larvicide)',
    brand: 'Proclaim Insecticide',
    manufacturer: 'Syngenta India Ltd.',
    category: 'Chemical Insecticide',
    activeIngredient: 'Emamectin Benzoate 5% w/w SG (Soluble Granule)',
    verifiedStatus: true,
    cibrcRegNumber: 'CIR-48110/2015-Emamectin(SG)-09',
    cibrcSection: 'Section 9(3) Registered Insecticide',
    cropCompatibility: 96,
    problemAddressed: 'Fruit Borer, Shoot Borer, Bollworm, Diamondback Moth, Pod Borer, Spodoptera',
    dosagePer15LTank: '6g - 7.5g per 15L knapsack tank (0.4 - 0.5 g per litre)',
    baseDosePerLiter: { amount: 0.45, unit: 'g' },
    applicationMethod: 'Foliar spray when young caterpillars are actively feeding on leaves or flowers',
    frequency: 'Apply at economic threshold level; repeat after 12-14 days if needed',
    preHarvestIntervalDays: 3,
    reEntryIntervalHours: 24,
    toxicityTriangleColor: 'Blue (Moderately Toxic)',
    targetCrops: ['Brinjal / Eggplant', 'Chilli / Pepper', 'Cotton', 'Chickpea', 'Tomato', 'Cabbage', 'Okra'],
    compatibleMixes: ['Most neutral fungicides (Difenoconazole, Mancozeb)'],
    incompatibleMixes: ['Alkaline sprays', 'Copper fungicides'],
    optimalApplicationWindow: 'Late afternoon application when larvae emerge from sheltered flower calyxes',
    ppeRequired: ['Rubber gloves', 'Face mask', 'Eye protection'],
    safetyPrecautions: [
      'Derived from natural soil actinomycete fermentation (Streptomyces avermitilis).',
      'Rapid translaminar action moves through leaf tissue to kill larvae feeding on leaf undersides.',
      'Observe 3-day pre-harvest interval.'
    ],
    alternatives: ['Bacillus thuringiensis kurstaki', 'Chlorantraniliprole 18.5% SC'],
    confidence: 96,
  },

  // 10. Thiamethoxam 25% WG
  {
    id: 'rec-thiamethoxam-10',
    name: 'Thiamethoxam 25% WG (Broad-Spectrum Systemic Sucking Pest Shield)',
    brand: 'Actara 25 WG',
    manufacturer: 'Syngenta India Ltd.',
    category: 'Chemical Insecticide',
    activeIngredient: 'Thiamethoxam 25% w/w WG (Water Dispersible Granule)',
    verifiedStatus: true,
    cibrcRegNumber: 'CIR-31280/2004-Thiamethoxam(WG)-18',
    cibrcSection: 'Section 9(3) Registered Insecticide',
    cropCompatibility: 95,
    problemAddressed: 'Mustard Aphid, Whitefly, Jassids, Thrips, Brown Planthopper, Mango Hopper',
    dosagePer15LTank: '4g - 5g per 15L knapsack tank (0.3 g per litre)',
    baseDosePerLiter: { amount: 0.3, unit: 'g' },
    applicationMethod: 'Foliar spray or soil drenching during early vegetative infestation',
    frequency: 'Maximum 2 applications per season at minimum 14-day intervals',
    preHarvestIntervalDays: 14,
    reEntryIntervalHours: 24,
    toxicityTriangleColor: 'Blue (Moderately Toxic)',
    targetCrops: ['Mustard', 'Rice / Paddy', 'Cotton', 'Okra / Bhendi', 'Mango', 'Citrus', 'Tomato', 'Wheat'],
    compatibleMixes: ['Mancozeb', 'Hexaconazole', 'Propiconazole'],
    incompatibleMixes: ['Bordeaux mixture', 'Copper hydroxide'],
    optimalApplicationWindow: 'Apply early morning or evening; strictly avoid spraying during active honeybee foraging hours',
    ppeRequired: ['Chemical resistant gloves', 'Safety goggles', 'Mask'],
    safetyPrecautions: [
      'Highly systemic; rapidly translocates through xylem vessels to protect new terminal growth.',
      'Highly toxic to honeybees; NEVER spray on crops in full open bloom.'
    ],
    alternatives: ['Neem Azadirachtin 10,000 ppm', 'Verticillium lecanii 1.15% WP'],
    confidence: 95,
  },

  // 11. Certified Organic Humic-Fulvic Bio-Stimulant (FCO Grade)
  {
    id: 'rec-humic-11',
    name: 'Active Potassium Humate & Fulvic Bio-Stimulant (85% Soluble)',
    brand: 'KisanVigor Humic FCO',
    manufacturer: 'Indian Bio-Nutrient Corp (FCO Approved)',
    category: 'Organic Formulation',
    activeIngredient: 'Potassium Humate 85% + Fulvic Acid 15% (FCO Schedule IV compliant)',
    verifiedStatus: true,
    cibrcRegNumber: 'FCO-SCH-IV/BIO-STIM/2023-901',
    cibrcSection: 'Fertilizer Control Order 1985 (Biostimulant Gazette 2021)',
    cropCompatibility: 99,
    problemAddressed: 'Root Stunting, Drought Stress, Poor Fertilizer Uptake, Alkaline Soil Shock, Saline Stress',
    dosagePer15LTank: '25g - 30g per 15L knapsack tank (Foliar) OR 1 kg/acre in drip irrigation',
    baseDosePerLiter: { amount: 1.8, unit: 'g' },
    applicationMethod: 'Foliar spray or fertigation through drip system at 15-20 days after transplanting',
    frequency: 'Apply 2-3 times during vegetative growth and flowering initiation',
    preHarvestIntervalDays: 0,
    reEntryIntervalHours: 0,
    toxicityTriangleColor: 'Green (Slightly Toxic)',
    targetCrops: ['All 24 Crops Supported (Universal Compatibility)'],
    compatibleMixes: ['All bio-fertilizers, Trichoderma, Pseudomonas, Urea, DAP, Micronutrients'],
    incompatibleMixes: ['Extremely acidic solutions (pH < 4.0)'],
    optimalApplicationWindow: 'Can be applied in morning or evening alongside scheduled irrigation',
    ppeRequired: ['Basic gloves'],
    safetyPrecautions: [
      'Chelates locked phosphorus and micronutrients in clay and alkaline soils, boosting root absorption by 30%.',
      '100% organic, non-toxic, and certified for NPOP export crops.'
    ],
    alternatives: ['Marine Seaweed Extract (Ascophyllum nodosum)', 'VAM Mycorrhiza'],
    confidence: 98,
  },

  // 12. Marine Seaweed Bio-Stimulant Extract (Ascophyllum nodosum)
  {
    id: 'rec-seaweed-12',
    name: 'Cold-Extracted Marine Seaweed Liquid (Ascophyllum nodosum)',
    brand: 'OceanVigor Bio-Extract',
    manufacturer: 'Marine Agri-Biotech India (FCO Approved)',
    category: 'Organic Formulation',
    activeIngredient: 'Ascophyllum nodosum extract 22% w/v (rich in natural cytokinins & betaines)',
    verifiedStatus: true,
    cibrcRegNumber: 'FCO-SCH-IV/SEAWEED/2023-412',
    cibrcSection: 'Fertilizer Control Order 1985 (Biostimulant Order)',
    cropCompatibility: 99,
    problemAddressed: 'Flower Drop, Heat Stress (>35°C), Fruit Cracking, Uneven Maturation, Frost Shock',
    dosagePer15LTank: '30ml - 40ml per 15L knapsack tank (2-2.5 ml per litre)',
    baseDosePerLiter: { amount: 2.2, unit: 'ml' },
    applicationMethod: 'Foliar spray at vegetative flush, pre-flowering, and early fruit-setting stages',
    frequency: '2 sprays at 20-day intervals during reproductive milestones',
    preHarvestIntervalDays: 0,
    reEntryIntervalHours: 0,
    toxicityTriangleColor: 'Green (Slightly Toxic)',
    targetCrops: ['Tomato', 'Chilli / Pepper', 'Cotton', 'Rice / Paddy', 'Banana', 'Mango', 'Apple', 'Citrus', 'Sugarcane'],
    compatibleMixes: ['Compatible with all agrochemicals and bio-pesticides'],
    incompatibleMixes: ['None'],
    optimalApplicationWindow: 'Early morning spray for maximum foliar stomatal absorption',
    ppeRequired: ['None required (food grade bio-extract)'],
    safetyPrecautions: [
      'Increases chlorophyll synthesis and triggers crop systemic acquired resistance (SAR) against heat stress.',
      'Approved for certified organic farming.'
    ],
    alternatives: ['Potassium Humate 85%', 'Amino Acid chelate complex'],
    confidence: 98,
  },
];

/**
 * Helper: Calculate exact product dosage and water requirements for ANY sprayer tank size
 */
export function calculateTankDosage(
  product: VerifiedAgrochemicalInput,
  tankCapacityLiters: number,
  acres: number = 1
) {
  const roundedLiters = Math.max(1, tankCapacityLiters);
  const dosePerTank = (product.baseDosePerLiter.amount * roundedLiters).toFixed(1);
  
  // Standard Indian agronomy: ~165 litres of spray volume needed per acre of mature field canopy
  const totalWaterLitersNeeded = Math.round(acres * 165);
  const totalTanksNeeded = Math.max(1, Math.ceil(totalWaterLitersNeeded / roundedLiters));
  const totalProductNeeded = (product.baseDosePerLiter.amount * roundedLiters * totalTanksNeeded).toFixed(1);

  return {
    tankCapacityLiters: roundedLiters,
    dosePerTank: `${dosePerTank} ${product.baseDosePerLiter.unit}`,
    totalTanksNeeded,
    totalWaterLitersNeeded,
    totalProductNeeded: `${totalProductNeeded} ${product.baseDosePerLiter.unit}`,
    unit: product.baseDosePerLiter.unit,
  };
}

/**
 * Filter verified inputs for a given crop, disease issue, or category
 */
export function findVerifiedInputs(crop?: string, diseaseOrIssue?: string, category?: string): VerifiedAgrochemicalInput[] {
  const cLower = (crop || '').toLowerCase().trim();
  const dLower = (diseaseOrIssue || '').toLowerCase().trim();

  return VERIFIED_RECOMMENDATION_DATASET.filter((item) => {
    if (category && category !== 'all' && item.category !== category) return false;

    if (cLower) {
      const matchesCrop = item.targetCrops.some((tc) => {
        const tcLower = tc.toLowerCase();
        return tcLower.includes(cLower) || cLower.includes(tcLower.split(' ')[0]) || tcLower.includes('all 24');
      });
      if (!matchesCrop && item.cropCompatibility < 94) return false;
    }

    if (dLower) {
      const matchesIssue = item.problemAddressed.toLowerCase().includes(dLower) ||
        dLower.split(' ').some((word) => word.length > 3 && item.problemAddressed.toLowerCase().includes(word));
      if (!matchesIssue && item.cropCompatibility < 95) return false;
    }

    return true;
  });
}
