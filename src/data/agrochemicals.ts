import { BannedChemical, ProductRecommendation, PestDiagnosis } from '../types';

export const BANNED_CHEMICALS_REGISTRY: BannedChemical[] = [
  {
    id: 'ban-1',
    name: 'Monocrotophos',
    casNumber: '6923-22-4',
    gazetteNotification: 'S.O. 706(E) & High Court Directives under Insecticides Act',
    banType: 'Strictly Restricted Use',
    toxicityClass: 'Class Ib (Highly Hazardous)',
    reason: 'Strictly banned on all vegetables, fruits, tea, and oilseeds due to acute neurotoxicity, pollinator decline, and rapid dermal applicator toxicity.',
    safeApprovedAlternative: 'Neem-based Azadirachtin 10,000 ppm or Bacillus thuringiensis (Bt) kurstaki bio-formulations.',
  },
  {
    id: 'ban-2',
    name: 'Endosulfan',
    casNumber: '115-29-7',
    gazetteNotification: 'Supreme Court Writ Petition (Civil) No. 213/2011 Order',
    banType: 'Total Ban',
    toxicityClass: 'Class Ib (Highly Hazardous)',
    reason: 'Total nationwide ban on manufacture, sale, transport, and spraying. Persistent Organic Pollutant (POP) linked to severe congenital deformities and ecological devastation.',
    safeApprovedAlternative: 'Beauveria bassiana 1.15% WP bio-pesticide, pheromone lures, or Trichogramma egg parasitoids.',
  },
  {
    id: 'ban-3',
    name: 'Paraquat Dichloride',
    casNumber: '1910-42-5',
    gazetteNotification: 'Govt. Gazette S.O. 3951(E)',
    banType: 'Strictly Restricted Use',
    toxicityClass: 'Class II (Moderately Hazardous)',
    reason: 'Statutorily restricted non-selective contact herbicide with no clinical antidote upon accidental ingestion. Prohibited outside designated plantation crops.',
    safeApprovedAlternative: 'Organic straw mulching, tractor mechanical weeders, or targeted bio-herbicidal acetic acid formulations.',
  },
  {
    id: 'ban-4',
    name: 'Chlorpyrifos (Restricted Formulations)',
    casNumber: '2921-88-2',
    gazetteNotification: 'Statutory Gazette S.O. 3855(E)',
    banType: 'Strictly Restricted Use',
    toxicityClass: 'Class II (Moderately Hazardous)',
    reason: 'Phase-out orders across foliar food crops due to proven infant neurodevelopmental toxicity and persistent soil microbial damage.',
    safeApprovedAlternative: 'Metarhizium anisopliae soil drench or naturally derived Spinosad bacterial fermentation formulations.',
  },
  {
    id: 'ban-5',
    name: 'Diazinon',
    casNumber: '333-41-5',
    gazetteNotification: 'Statutory Notification 124(E)',
    banType: 'Total Ban',
    toxicityClass: 'Class II (Moderately Hazardous)',
    reason: 'Withdrawn from all agricultural use due to high avian mortality and deep groundwater leaching.',
    safeApprovedAlternative: 'Pseudomonas fluorescens 1.0% WP or Trichoderma viride bio-fungicide.',
  },
  {
    id: 'ban-6',
    name: 'Methyl Parathion',
    casNumber: '298-00-0',
    gazetteNotification: 'Gazette Notification 1548(E)',
    banType: 'Total Ban',
    toxicityClass: 'Class Ia (Extremely Hazardous)',
    reason: 'Extremely hazardous cholinesterase inhibitor causing immediate respiratory paralysis and lethal dermal absorption.',
    safeApprovedAlternative: 'Verticillium (Lecanicillium) lecanii bio-agent or yellow sticky insect trap networks.',
  },
  {
    id: 'ban-7',
    name: 'Phosphamidon',
    casNumber: '13171-21-6',
    gazetteNotification: 'CIBRC Statutory Gazette Review Order 2020',
    banType: 'Total Ban',
    toxicityClass: 'Class Ia (Extremely Hazardous)',
    reason: 'Prohibited across all crops due to systemic acute mammalian toxicity and high aquatic bioaccumulation.',
    safeApprovedAlternative: 'Potassium silicate foliar spray or certified organic insecticidal soaps.',
  },
  {
    id: 'ban-8',
    name: 'Dicofol',
    casNumber: '115-32-2',
    gazetteNotification: 'Stockholm Convention S.O. 4211(E)',
    banType: 'Total Ban',
    toxicityClass: 'Class II (Moderately Hazardous)',
    reason: 'Persistent bioaccumulation and trace DDT chemical precursor contamination during manufacturing synthesis.',
    safeApprovedAlternative: 'Sulfur 80% WDG or wettable agricultural sulfur applied at statutory label dilutions.',
  },
  {
    id: 'ban-9',
    name: 'Carbofuran (Granular 3G)',
    casNumber: '1563-66-2',
    gazetteNotification: 'CIBRC Standing Order S.O. 2382(E)',
    banType: 'Strictly Restricted Use',
    toxicityClass: 'Class Ib (Highly Hazardous)',
    reason: 'Highly toxic carbamate systemic insecticide prohibited on surface applications due to lethal secondary bird poisonings and aquifer infiltration.',
    safeApprovedAlternative: 'Paecilomyces lilacinus bio-nematicide and neem seed kernel cake soil amendment.',
  },
  {
    id: 'ban-10',
    name: 'Phorate (10G)',
    casNumber: '298-02-2',
    gazetteNotification: 'Ministry of Agriculture S.O. 1877(E)',
    banType: 'Total Ban',
    toxicityClass: 'Class Ia (Extremely Hazardous)',
    reason: 'Extreme acute oral and dermal toxicant causing applicator fatalities during broadcase spreading. Banned nationwide.',
    safeApprovedAlternative: 'Castor cake soil enrichment and Metarhizium anisopliae spore formulations.',
  }
];

export const VERIFIED_PRODUCTS: ProductRecommendation[] = [
  {
    id: 'prod-1',
    name: 'DemoGuard Bio-Fungicide (Trichoderma viride 1.5% WP)',
    brand: 'DemoGuard BioShield',
    manufacturer: 'AgriSafe Bio-Sciences India Ltd.',
    category: 'Bio-Fungicide',
    activeIngredient: 'Trichoderma viride strain T-12 (CFU 2 x 10^8 / gm)',
    verifiedStatus: true,
    cibrcRegNumber: 'CIBRC/BIO/2024/TR-8924',
    cropCompatibility: 98,
    problemAddressed: 'Early Blight, Root Rot, Damping Off, Fusarium Wilt, Collar Rot',
    dosagePer15LTank: '40g - 50g per 15L knapsack tank (diluted in clean water)',
    applicationMethod: 'Foliar spray and root zone drenching during early morning or overcast evening',
    frequency: 'Every 10-14 days or upon appearance of initial foliar concentric ring spots',
    preHarvestIntervalDays: 0,
    reEntryIntervalHours: 4,
    ppeRequired: ['Dust mask', 'Nitrile gloves', 'Protective apron'],
    safetyPrecautions: [
      'Do not mix directly with copper-based or synthetic chemical fungicides within 5 days.',
      'Store in cool, dry place below 30°C away from direct sunlight.',
      'Wash spray equipment thoroughly with clean water prior to preparation.',
    ],
    alternatives: ['DemoShield Neem 10000ppm', 'Pseudomonas fluorescens 1.0% WP'],
    confidence: 96,
    isDemoProduct: true,
  },
  {
    id: 'prod-2',
    name: 'DemoShield Organic Neem Solution (Azadirachtin 10,000 PPM)',
    brand: 'DemoShield Green',
    manufacturer: 'EcoProtect Agro Inputs Ltd.',
    category: 'Bio-Pesticide',
    activeIngredient: 'Azadirachtin 1.0% EC (10,000 PPM cold-pressed neem kernel extract)',
    verifiedStatus: true,
    cibrcRegNumber: 'CIBRC/NEEM/2023/AZ-4412',
    cropCompatibility: 95,
    problemAddressed: 'Aphids, Whiteflies, Thrips, Caterpillars, Leaf Miners, Jassids',
    dosagePer15LTank: '30ml - 45ml per 15L knapsack tank (2-3 ml per litre)',
    applicationMethod: 'Thorough foliar canopy drenching covering upper and undersides of leaves',
    frequency: 'Repeat every 7-10 days depending on pest population pressure',
    preHarvestIntervalDays: 3,
    reEntryIntervalHours: 6,
    ppeRequired: ['Safety goggles', 'Waterproof gloves', 'Long sleeve cotton shirt'],
    safetyPrecautions: [
      'Biodegradable but slightly irritating to fish; do not spray near open water canals.',
      'Best applied after 4:30 PM to minimize UV breakdown and protect pollinating honeybees.',
    ],
    alternatives: ['Beauveria bassiana 1.15% WP', 'Sticky insect yellow traps'],
    confidence: 94,
    isDemoProduct: true,
  },
  {
    id: 'prod-3',
    name: 'DemoCrop Copper Shield (Copper Oxychloride 50% WP)',
    brand: 'DemoCrop Protection',
    manufacturer: 'Hindustan Crop Science Corporation',
    category: 'Chemical Insecticide',
    activeIngredient: 'Copper Oxychloride 50% WP (Contact protectant fungicide & bactericide)',
    verifiedStatus: true,
    cibrcRegNumber: 'CIBRC/CHEM/2021/COC-9921',
    cropCompatibility: 91,
    problemAddressed: 'Late Blight, Downy Mildew, Leaf Spot, Bacterial Canker, Anthracnose',
    dosagePer15LTank: '35g - 40g per 15L knapsack tank (2.5g per litre)',
    applicationMethod: 'Preventative surface coating spray before high humidity / rain events',
    frequency: 'Spray at 12-15 day intervals; maximum 3 sprays per season',
    preHarvestIntervalDays: 7,
    reEntryIntervalHours: 24,
    ppeRequired: ['Chemical splash goggles', 'Rubber boots', 'Chemical resistant gloves', 'Face shield'],
    safetyPrecautions: [
      'Corrosive to brass tanks; clean knapsack sprayers immediately after usage.',
      'Toxic to aquatic life with long-lasting effects. Adhere strictly to 10-meter water buffer.',
      'Observe strict 7-day pre-harvest waiting interval before picking produce for market.',
    ],
    alternatives: ['DemoGuard Bio-Fungicide', 'Bordeaux mixture 1%'],
    confidence: 89,
    isDemoProduct: true,
  },
  {
    id: 'prod-4',
    name: 'DemoPure Bacillus Thuringiensis (Bt kurstaki 8L)',
    brand: 'DemoPure BioTech',
    manufacturer: 'Kisan Bio-Agri Solutions',
    category: 'Organic Formulation',
    activeIngredient: 'Bacillus thuringiensis var. kurstaki (16,000 IU/mg)',
    verifiedStatus: true,
    cibrcRegNumber: 'CIBRC/BIO/2022/BT-6029',
    cropCompatibility: 97,
    problemAddressed: 'Helicoverpa armigera, Spodoptera (Armyworm), Stem Borer, Diamondback Moth',
    dosagePer15LTank: '25ml - 30ml per 15L knapsack tank (1.5-2 ml per litre)',
    applicationMethod: 'Target young instar larvae feeding on tender foliage during dusk',
    frequency: 'Apply in evening at egg hatch or early larval appearance',
    preHarvestIntervalDays: 0,
    reEntryIntervalHours: 4,
    ppeRequired: ['Cotton gloves', 'Respirator mask'],
    safetyPrecautions: [
      'Completely safe for non-target beneficial predatory insects and earthworms.',
      'Keep container tightly sealed in cool shaded storage below 25°C.',
    ],
    alternatives: ['NPV Virus bio-suspension', 'Neem Azadirachtin 10000ppm'],
    confidence: 95,
    isDemoProduct: true,
  },
  {
    id: 'prod-5',
    name: 'KisanShield Pseudomonas Fluorescens (1.0% WP)',
    brand: 'KisanShield Bio',
    manufacturer: 'BioAgri Solutions India',
    category: 'Bio-Fungicide',
    activeIngredient: 'Pseudomonas fluorescens strain Pf-1 (CFU 1 x 10^8 / gm)',
    verifiedStatus: true,
    cibrcRegNumber: 'CIBRC/BIO/2023/PF-7714',
    cropCompatibility: 96,
    problemAddressed: 'Rice Blast, Sheath Blight, Bacterial Leaf Blight, Karnal Bunt, Panama Wilt',
    dosagePer15LTank: '45g - 50g per 15L knapsack tank (or 10g/kg seed treatment)',
    applicationMethod: 'Seedling root dip, foliar spray at tillering and panicle emergence stages',
    frequency: 'Apply 2 sprays at 15-day intervals during humid vegetative stages',
    preHarvestIntervalDays: 0,
    reEntryIntervalHours: 4,
    ppeRequired: ['Mask', 'Nitrile gloves'],
    safetyPrecautions: [
      'Compatible with organic fertilizers but incompatible with systemic bactericides like Streptomycin.',
      'Use spray mixture within 4 hours of reconstitution.',
    ],
    alternatives: ['Trichoderma viride 1.5% WP', 'DemoShield Neem Solution'],
    confidence: 94,
    isDemoProduct: true,
  },
  {
    id: 'prod-6',
    name: 'AgriEntoma Metarhizium Anisopliae (1.15% WP)',
    brand: 'AgriEntoma Green',
    manufacturer: 'EcoProtect Agro Inputs Ltd.',
    category: 'Bio-Pesticide',
    activeIngredient: 'Metarhizium anisopliae fungal spores (CFU 1 x 10^8 / gm)',
    verifiedStatus: true,
    cibrcRegNumber: 'CIBRC/BIO/2023/MA-5509',
    cropCompatibility: 95,
    problemAddressed: 'Fall Armyworm, White Grubs, Termites, Root Borers, Brown Planthopper',
    dosagePer15LTank: '40g - 50g per 15L knapsack tank for foliar; 2kg/acre soil drench',
    applicationMethod: 'Soil drenching around root perimeter or evening foliar spray with sticking agent',
    frequency: 'Repeat every 14 days during active soil moisture conditions',
    preHarvestIntervalDays: 0,
    reEntryIntervalHours: 6,
    ppeRequired: ['Rubber gloves', 'Protective eyewear', 'Dust mask'],
    safetyPrecautions: [
      'Maintain soil moisture for optimal fungal spore germination and cuticle penetration.',
      'Do not apply synthetic chemical fungicides for 10 days post application.',
    ],
    alternatives: ['Beauveria bassiana 1.15% WP', 'DemoPure Bacillus Thuringiensis'],
    confidence: 93,
    isDemoProduct: true,
  },
  {
    id: 'prod-7',
    name: 'EntoGuard Beauveria Bassiana (1.15% WP)',
    brand: 'EntoGuard Bio',
    manufacturer: 'AgriSafe Bio-Sciences India Ltd.',
    category: 'Bio-Pesticide',
    activeIngredient: 'Beauveria bassiana strain Bb-5a (CFU 1 x 10^8 / gm)',
    verifiedStatus: true,
    cibrcRegNumber: 'CIBRC/BIO/2024/BB-9011',
    cropCompatibility: 94,
    problemAddressed: 'Chilli Thrips, Cotton Whiteflies, Pod Borers, Diamondback Moth, Mealybugs',
    dosagePer15LTank: '40g per 15L knapsack tank with 5ml agricultural sticker',
    applicationMethod: 'Foliar spray targeted at leaf under-surfaces where nymphs congregate',
    frequency: 'Apply at 7-10 day intervals at initial pest threshold detection',
    preHarvestIntervalDays: 0,
    reEntryIntervalHours: 4,
    ppeRequired: ['Face mask', 'Gloves', 'Long pants'],
    safetyPrecautions: [
      'High humidity (>70%) enhances mycosis efficacy.',
      'Store in refrigerated or air-conditioned storage below 20°C.',
    ],
    alternatives: ['DemoShield Organic Neem', 'Lecanicillium lecanii'],
    confidence: 92,
    isDemoProduct: true,
  },
  {
    id: 'prod-8',
    name: 'CropGuard Dual-Action Systemic Protectant (Azoxystrobin 18.2% + Difenoconazole 11.4% SC)',
    brand: 'CropGuard Precision',
    manufacturer: 'Hindustan Crop Science Corporation',
    category: 'Chemical Insecticide',
    activeIngredient: 'Azoxystrobin 18.2% + Difenoconazole 11.4% SC',
    verifiedStatus: true,
    cibrcRegNumber: 'CIBRC/CHEM/2022/AZD-8819',
    cropCompatibility: 92,
    problemAddressed: 'Chilli Anthracnose & Dieback, Tomato Early/Late Blight, Rice Sheath Blight',
    dosagePer15LTank: '15ml per 15L knapsack tank (1 ml per litre)',
    applicationMethod: 'Foliar spray at first appearance of disease lesions',
    frequency: 'Maximum 2 sprays per crop cycle with 15 days minimum interval',
    preHarvestIntervalDays: 5,
    reEntryIntervalHours: 24,
    ppeRequired: ['Full protective suit', 'Nitrile gloves', 'Respirator mask', 'Chemical safety goggles'],
    safetyPrecautions: [
      'Do not apply during high wind (>18 km/h) or temperatures above 35°C.',
      'Toxic to aquatic life; adhere strictly to buffer zone boundaries.',
      'Observe statutory 5-day pre-harvest waiting interval.',
    ],
    alternatives: ['DemoGuard Bio-Fungicide', 'DemoCrop Copper Shield'],
    confidence: 90,
    isDemoProduct: true,
  },
  {
    id: 'prod-9',
    name: 'FMC Coragen (Chlorantraniliprole 18.5% SC)',
    brand: 'Coragen Insecticide',
    manufacturer: 'FMC India Pvt. Ltd.',
    category: 'Chemical Insecticide',
    activeIngredient: 'Chlorantraniliprole 18.5% w/w',
    verifiedStatus: true,
    cibrcRegNumber: 'CIR-64210/2012-Chlorantraniliprole(SC)-12',
    cropCompatibility: 98,
    problemAddressed: 'Fruit Borer, Shoot Borer, Diamond Back Moth, Stem Borer, Bollworm',
    dosagePer15LTank: '6ml per 15L knapsack sprayer tank (0.4 ml/L of water)',
    applicationMethod: 'Foliar canopy spray at early instar pest egg hatch',
    frequency: 'Maximum 2 sprays per season with minimum 21 days interval',
    preHarvestIntervalDays: 3,
    reEntryIntervalHours: 12,
    ppeRequired: ['Rubber gloves', 'Protective face mask', 'Safety goggles'],
    safetyPrecautions: [
      'Green statutory toxicity triangle; safe for honeybees when sprayed after active foraging hours.',
      'Do not exceed labeled dosage: 60 ml per acre.'
    ],
    alternatives: ['Spinosad 45% SC', 'Emamectin Benzoate 5% SG', 'Neem Azadirachtin 10000ppm'],
    confidence: 98,
    isDemoProduct: true,
  },
  {
    id: 'prod-10',
    name: 'Bayer Confidor (Imidacloprid 17.8% SL)',
    brand: 'Confidor Systemic',
    manufacturer: 'Bayer CropScience Limited',
    category: 'Chemical Insecticide',
    activeIngredient: 'Imidacloprid 17.8% SL (w/w)',
    verifiedStatus: true,
    cibrcRegNumber: 'CIR-32119/2005-Imidacloprid(SL)-44',
    cropCompatibility: 96,
    problemAddressed: 'Aphids, Whiteflies, Jassids, Thrips, Brown Planthopper',
    dosagePer15LTank: '5ml - 7.5ml per 15L knapsack tank (0.35 - 0.5 ml/L of water)',
    applicationMethod: 'Foliar spray targeting undersides of tender foliage during early morning',
    frequency: 'Apply at pest economic threshold (ETL) levels; repeat after 14 days if needed',
    preHarvestIntervalDays: 21,
    reEntryIntervalHours: 24,
    ppeRequired: ['Nitrile gloves', 'Chemical goggles', 'Mask'],
    safetyPrecautions: [
      'Yellow statutory toxicity diamond. Highly toxic to honeybees; avoid spraying during active crop bloom.',
      'Do not tank mix with alkaline copper fungicides.'
    ],
    alternatives: ['DemoShield Neem Solution 10000ppm', 'Thiamethoxam 25% WG'],
    confidence: 96,
    isDemoProduct: true,
  }
];

export const DEMO_PEST_SCENARIOS: PestDiagnosis[] = [
  {
    id: 'pest-demo-1',
    crop: 'Tomato (Solanum lycopersicum)',
    diseaseName: 'Early Blight (Alternaria solani)',
    scientificName: 'Alternaria solani Sorauer',
    confidence: 95,
    severity: 'moderate',
    symptoms: [
      'Concentric target-board rings on older lower leaves',
      'Surrounding chlorotic yellow halos around necrotic lesions',
      'Stem collar cankers and premature lower leaf drop',
      'Accelerated defoliation moving upward from ground level'
    ],
    likelyCause: 'Warm temperatures (24-29°C) combined with prolonged leaf wetness, heavy morning dew, and dense canopy splashing.',
    recommendedAction: 'Prune the lower 25cm of foliage touching moist soil. Avoid overhead irrigation. Spray verified bio-protectant Trichoderma viride or Copper Oxychloride at standard 15L dilution.',
    safetyPrecautions: [
      'Sanitize pruning shears with 70% alcohol between rows to stop spore vectoring.',
      'Wear protective gloves and eye protection during spray preparation.',
      'Observe 7-day pre-harvest waiting interval if using contact copper formulations.'
    ],
    treatmentOptions: [
      { name: 'DemoGuard Bio-Fungicide (Trichoderma viride 1.5% WP)', type: 'bio', verified: true, cibrcApproved: true },
      { name: 'DemoShield Organic Neem (10,000 PPM)', type: 'organic', verified: true, cibrcApproved: true },
      { name: 'DemoCrop Copper Shield (50% WP)', type: 'chemical', verified: true, cibrcApproved: true }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d69106093?auto=format&fit=crop&w=800&q=80',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'pest-demo-2',
    crop: 'Rice / Paddy (Oryza sativa)',
    diseaseName: 'Rice Blast (Magnaporthe oryzae)',
    scientificName: 'Magnaporthe oryzae / Pyricularia oryzae',
    confidence: 92,
    severity: 'high',
    symptoms: [
      'Spindle / diamond-shaped foliar lesions with grayish-white centers and dark brown margins',
      'Neck rot causing empty white panicle heads (chaffy grain loss)',
      'Lesions coalescing across leaf blades causing rapid desiccation and lodging'
    ],
    likelyCause: 'Excessive nitrogenous top-dressing fertilizer, prolonged cloudy humid weather (>90% RH), and dense seedling spacing.',
    recommendedAction: 'Split nitrogen fertilizer application into 3 smaller scheduled doses. Drain standing water for 48 hours to expose soil to sunlight. Spray Pseudomonas fluorescens bio-protectant.',
    safetyPrecautions: [
      'Do not apply banned or cancelled organophosphates (such as Monocrotophos).',
      'Follow statutory 15-day pre-harvest waiting interval before paddy harvesting.'
    ],
    treatmentOptions: [
      { name: 'KisanShield Pseudomonas Fluorescens (1.0% WP)', type: 'bio', verified: true, cibrcApproved: true },
      { name: 'DemoGuard Bio-Fungicide (Trichoderma viride 1.5% WP)', type: 'bio', verified: true, cibrcApproved: true },
      { name: 'CropGuard Dual-Action Systemic Protectant', type: 'chemical', verified: true, cibrcApproved: true }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=800&q=80',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'pest-demo-3',
    crop: 'Cotton (Gossypium hirsutum)',
    diseaseName: 'Whitefly Infestation & Leaf Curl Virus',
    scientificName: 'Bemisia tabaci (Gennadius) & CLCuV',
    confidence: 90,
    severity: 'high',
    symptoms: [
      'Upward curling and thickening of leaf veins with leaf-like enations',
      'Copious sticky honeydew exudate leading to dense black sooty mold',
      'Stunted terminal growth and aborted square/boll formation'
    ],
    likelyCause: 'Hot dry spells followed by humid intervals encouraging whitefly nymph population explosion; overuse of synthetic pyrethroids destroying beneficial ladybirds.',
    recommendedAction: 'Install 25 yellow sticky insect traps per acre at crop canopy level. Spray Azadirachtin 10,000 ppm or Beauveria bassiana spore suspension. Avoid banned Monocrotophos.',
    safetyPrecautions: [
      'Monocrotophos is strictly prohibited on cotton by statutory order in several agricultural states.',
      'Wear respirator mask and safety goggles during chemical tank mixing.'
    ],
    treatmentOptions: [
      { name: 'DemoShield Organic Neem (10,000 PPM)', type: 'organic', verified: true, cibrcApproved: true },
      { name: 'EntoGuard Beauveria Bassiana (1.15% WP)', type: 'bio', verified: true, cibrcApproved: true }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'pest-demo-4',
    crop: 'Wheat (Triticum aestivum)',
    diseaseName: 'Yellow / Stripe Rust (Puccinia striiformis)',
    scientificName: 'Puccinia striiformis f. sp. tritici',
    confidence: 93,
    severity: 'critical',
    symptoms: [
      'Narrow bright yellow linear stripes of powdery pustules (uredinia) on leaf blades',
      'Pustules rupturing foliar epidermis leading to rapid crop dehydration',
      'Premature shriveling of wheat grains during milky stage'
    ],
    likelyCause: 'Cool wet weather (10-15°C) with persistent fog and intermittent drizzle during heading stage.',
    recommendedAction: 'Spray bio-protectant Pseudomonas fluorescens or registered triazole systemic fungicide. Implement resistant certified seeds for next sowing cycle.',
    safetyPrecautions: [
      'Spray before midday winds exceed 15 km/h to prevent spray droplet drift.',
      'Wear rubber boots and mask while spraying dense wheat stands.'
    ],
    treatmentOptions: [
      { name: 'KisanShield Pseudomonas Fluorescens (1.0% WP)', type: 'bio', verified: true, cibrcApproved: true },
      { name: 'DemoGuard Bio-Fungicide (Trichoderma viride 1.5% WP)', type: 'bio', verified: true, cibrcApproved: true }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'pest-demo-5',
    crop: 'Maize / Corn (Zea mays)',
    diseaseName: 'Fall Armyworm (Spodoptera frugiperda)',
    scientificName: 'Spodoptera frugiperda (J.E. Smith)',
    confidence: 94,
    severity: 'critical',
    symptoms: [
      'Window-pane feeding damage on tender whorl leaves with extensive ragged tearing',
      'Dense yellowish-brown sawdust-like frass accumulated inside plant whorl',
      'Boring into tassel and developing cobs leading to secondary fungal ear rot'
    ],
    likelyCause: 'High migration flights of night-flying adult moths during early vegetative whorl stage under warm conditions.',
    recommendedAction: 'Apply dry sand/sawdust mixed with neem cake into central whorls. Spray Bacillus thuringiensis (Bt) or Metarhizium anisopliae directed directly into the central funnel whorl.',
    safetyPrecautions: [
      'Target spraying strictly between 4:30 PM and 6:30 PM when larvae emerge from whorl shelter.',
      'Never spray without protective respirator mask.'
    ],
    treatmentOptions: [
      { name: 'DemoPure Bacillus Thuringiensis (Bt kurstaki 8L)', type: 'organic', verified: true, cibrcApproved: true },
      { name: 'AgriEntoma Metarhizium Anisopliae (1.15% WP)', type: 'bio', verified: true, cibrcApproved: true },
      { name: 'DemoShield Organic Neem (10,000 PPM)', type: 'organic', verified: true, cibrcApproved: true }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'pest-demo-6',
    crop: 'Chilli / Pepper (Capsicum annuum)',
    diseaseName: 'Anthracnose / Dieback & Fruit Rot',
    scientificName: 'Colletotrichum capsici (Sydow) Butler & Bisby',
    confidence: 91,
    severity: 'high',
    symptoms: [
      'Necrotic circular sunken spots with black concentric acervuli rings on ripe chilli pods',
      'Dieback of twigs starting from tip downwards with bleached white bark',
      'Premature shedding of flowers and small immature fruit mummification'
    ],
    likelyCause: 'High humidity (>85%), warm temperatures (28-30°C), and splashing rains vectoring fungal conidia.',
    recommendedAction: 'Collect and incinerate all infected mummified pods from field. Apply preventative Copper Oxychloride or systemic azoxystrobin/difenoconazole before heavy rains.',
    safetyPrecautions: [
      'Observe strict 5 to 7 day pre-harvest interval before picking green or red chillies.',
      'Wear chemical splash goggles and nitrile gloves to avoid capsaicin and chemical irritation.'
    ],
    treatmentOptions: [
      { name: 'CropGuard Dual-Action Systemic Protectant', type: 'chemical', verified: true, cibrcApproved: true },
      { name: 'DemoCrop Copper Shield (50% WP)', type: 'chemical', verified: true, cibrcApproved: true },
      { name: 'DemoGuard Bio-Fungicide (Trichoderma viride 1.5% WP)', type: 'bio', verified: true, cibrcApproved: true }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'pest-demo-7',
    crop: 'Potato (Solanum tuberosum)',
    diseaseName: 'Late Blight (Phytophthora infestans)',
    scientificName: 'Phytophthora infestans (Mont.) de Bary',
    confidence: 96,
    severity: 'critical',
    symptoms: [
      'Water-soaked dark lesions on leaf tips and margins enlarging rapidly',
      'Delicate white fungal downy mildew growth on underside of leaves under high humidity',
      'Brown purplish tuber rot with granular copper discoloration beneath skin'
    ],
    likelyCause: 'Cool humid night weather (12-16°C) followed by cloudy overcast days with prolonged leaf moisture.',
    recommendedAction: 'Hill up soil around potato ridge to prevent sporangia from washing into tubers. Spray Copper Oxychloride preventative or verified Trichoderma viride bio-fungicide.',
    safetyPrecautions: [
      'Destroy all cull potato heaps near the farm boundary as they act as initial inoculum reservoirs.',
      'Maintain 7-day pre-harvest interval.'
    ],
    treatmentOptions: [
      { name: 'DemoCrop Copper Shield (50% WP)', type: 'chemical', verified: true, cibrcApproved: true },
      { name: 'DemoGuard Bio-Fungicide (Trichoderma viride 1.5% WP)', type: 'bio', verified: true, cibrcApproved: true }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'pest-demo-8',
    crop: 'Soybean (Glycine max)',
    diseaseName: 'Asian Soybean Rust (Phakopsora pachyrhizi)',
    scientificName: 'Phakopsora pachyrhizi Sydow & P. Sydow',
    confidence: 92,
    severity: 'high',
    symptoms: [
      'Pinpoint chlorotic spots turning into brown to reddish-brown pustules on leaf underside',
      'Volcano-shaped uredinia releasing clouds of tan powdery spores',
      'Rapid yellowing, premature defoliation, and aborted pod filling'
    ],
    likelyCause: 'Frequent monsoon showers with 6-8 hours of continuous dew wetness at temperatures of 18-26°C.',
    recommendedAction: 'Monitor lower canopy leaves closely at flowering stage. Apply verified systemic bio-protectant or registered triazole at first pustule detection.',
    safetyPrecautions: [
      'Do not enter wet fields immediately after spraying; respect 24-hour re-entry interval.',
      'Wear protective overall suit during spraying.'
    ],
    treatmentOptions: [
      { name: 'CropGuard Dual-Action Systemic Protectant', type: 'chemical', verified: true, cibrcApproved: true },
      { name: 'DemoGuard Bio-Fungicide (Trichoderma viride 1.5% WP)', type: 'bio', verified: true, cibrcApproved: true },
      { name: 'EntoGuard Beauveria Bassiana (1.15% WP)', type: 'bio', verified: true, cibrcApproved: true }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1599588647708-54892af2336c?auto=format&fit=crop&w=800&q=80',
    timestamp: new Date().toISOString(),
  }
];

export const DEMO_VERIFY_CASES = [
  {
    batch: 'CRG-2024-9102',
    product: 'FMC Coragen (Chlorantraniliprole 18.5% SC)',
    manufacturer: 'FMC India Pvt. Ltd.',
    category: 'Insecticide' as const,
    status: 'verified' as const,
    score: 98,
    mfg: '2024-04-15',
    exp: '2026-04-14',
    reg: 'CIR-64210/2012-Chlorantraniliprole(SC)-12',
    activeIngredient: 'Chlorantraniliprole 18.5% w/w',
    toxicityTriangle: { color: 'Green (Slightly Toxic)' as const, matched: true },
    hologramCheck: { status: 'Authentic 3D Kinetic' as const, notes: 'Dual-layer kinetic diffractive grating with color flip and micro-text verified.' },
    visualDefects: [],
    factors: [
      { name: 'CIBRC Statutory Registration Registry', matched: true, notes: 'Active statutory registration verified under Section 9(3) of Insecticides Act 1968.' },
      { name: '3D Hologram & Optical Security Seal', matched: true, notes: 'Authentic FMC tamper-evident kinetic hologram on bottle neck with optical shift.' },
      { name: 'Manufacturer ERP Batch Traceability', matched: true, notes: 'Authorized batch dispatch confirmed from registered Savli manufacturing plant.' },
      { name: 'Statutory Toxicity & Warning Labeling', matched: true, notes: 'Green toxicity diamond present, mandatory antidote info and crop directions compliant.' },
      { name: 'Banned / Hazardous Chemical Scan', matched: true, notes: 'Formulation 100% compliant with CIBRC approved label claims.' }
    ],
    warnings: [],
    safety: [
      'Product is 100% authentic and CIBRC certified for paddy, sugarcane, tomato, and cotton.',
      'Maintain standard dosage: 60 ml per acre (approx 6 ml per 15L knapsack sprayer tank).',
      'Wear protective rubber gloves and mask during tank mixing.'
    ],
    safeAlternatives: [],
    legalRecourse: []
  },
  {
    batch: 'FAKE-CONF-882',
    product: 'Spurious Confidor (Imidacloprid 17.8% SL) Counterfeit',
    manufacturer: 'Unknown Bootleg Lab (Claiming Bayer CropScience)',
    category: 'Insecticide' as const,
    status: 'counterfeit' as const,
    score: 16,
    mfg: '2024-02-10',
    exp: '2026-02-09',
    reg: 'FORGED-REG-CIR-32119-FAKE',
    activeIngredient: 'Unverified organophosphate solvent mix (Diluted Imidacloprid)',
    toxicityTriangle: { color: 'Missing / Non-Compliant' as const, matched: false },
    hologramCheck: { status: 'Flat Photocopy Sticker' as const, notes: 'Optical scan detected flat 2D color-printed sticker lacking refractive grating.' },
    visualDefects: [
      'Spelling error: "Imidacloprid" printed as "Imidaclopride"',
      'Flat 2D printed sticker replacing genuine 3D kinetic hologram',
      'Batch stamp printed with blurred offset ink rather than laser dot-matrix',
      'Missing mandatory statutory yellow toxicity triangle'
    ],
    factors: [
      { name: 'CIBRC Statutory Registration Registry', matched: false, notes: 'Registration code CIR-32119 is forged; mismatch with Bayer legal master database.' },
      { name: '3D Hologram & Optical Security Seal', matched: false, notes: 'Counterfeit flat sticker without multi-angle optical shift or diffractive depth.' },
      { name: 'Manufacturer ERP Batch Traceability', matched: false, notes: 'Batch serial not recognized in Bayer CropScience dispatch ledger.' },
      { name: 'Statutory Toxicity & Warning Labeling', matched: false, notes: 'Mandatory statutory toxicity diamond and first-aid instructions missing.' },
      { name: 'Active Formulation Purity', matched: false, notes: 'Suspected hazardous solvent adulteration causing severe crop foliage burning.' }
    ],
    warnings: [
      'CRITICAL: Dangerous counterfeit pesticide detected!',
      'Label features misspelled active ingredient and forged holographic seal.',
      'Applying spurious pesticides leads to severe foliar scorching, resistance buildup, and applicator toxicity.'
    ],
    safety: [
      'Do NOT spray this bottle. Quarantine container immediately in locked storage.',
      'Preserve the original purchase invoice and bottle for statutory consumer filing.',
      'Lodge formal complaint with the District Agriculture Officer under Section 29 of Insecticides Act 1968.'
    ],
    safeAlternatives: [
      'Genuine Bayer Confidor (Imidacloprid 17.8% SL) from an authorized dealer',
      'Tata Rallis Anant (Thiamethoxam 25% WG)',
      'Bio-friendly Neem Oil (Azadirachtin 10,000 ppm) @ 35ml/15L'
    ],
    legalRecourse: [
      'Mandatory reporting under Insecticides Act 1968 Section 29 (punishable with imprisonment up to 3 years)',
      'Call national Kisan Call Centre toll-free: 1800-180-1551',
      'Submit written complaint with batch photo to local Assistant Director of Agriculture (ADA)'
    ]
  },
  {
    batch: 'BAN-ENDO-213',
    product: 'Endosulfan 35% EC (Total Banned Chemical Contraband)',
    manufacturer: 'Illegal Black Market Contraband',
    category: 'Pesticide' as const,
    status: 'counterfeit' as const,
    score: 0,
    mfg: '2023-01-01',
    exp: '2025-01-01',
    reg: 'CANCELLED_SUPREME_COURT_WP213',
    activeIngredient: 'Endosulfan (Organochlorine Persistent Pollutant)',
    toxicityTriangle: { color: 'Red (Extremely Toxic)' as const, matched: false },
    hologramCheck: { status: 'Missing' as const, notes: 'No authorized security seal; illegal illicit production.' },
    visualDefects: [
      'Statutorily cancelled agrochemical prohibited nationwide',
      'No legal CIBRC or manufacturer packaging registration'
    ],
    factors: [
      { name: 'CIBRC Statutory Registration Registry', matched: false, notes: 'TOTAL STATUTORY PROHIBITION: Nationwide ban ordered by Supreme Court (WP 213/2011).' },
      { name: '3D Hologram & Optical Security Seal', matched: false, notes: 'Illegal contraband without statutory compliance seals.' },
      { name: 'Manufacturer ERP Batch Traceability', matched: false, notes: 'Manufacture, transport, and stocking constitutes criminal offense.' },
      { name: 'Statutory Toxicity & Warning Labeling', matched: false, notes: 'Class Ib persistent organochlorine linked to severe neurotoxicity and birth defects.' },
      { name: 'Banned / Restricted Chemical Scan', matched: false, notes: 'Active ingredient completely cancelled in India under Insecticides Act.' }
    ],
    warnings: [
      'CRIMINAL CONTRABAND: Total Nationwide Ban on Endosulfan!',
      'Severe neurotoxicity, congenital deformities, and environmental catastrophe.',
      'Possession or application is a non-bailable offense under the Insecticides Act 1968.'
    ],
    safety: [
      'Do not unseal, smell, or apply under any circumstances.',
      'Keep locked away from water channels, cattle sheds, and grain stores.',
      'Immediately report vendor to District Magistrate or State Agriculture Vigilance.'
    ],
    safeAlternatives: [
      'Beauveria bassiana 1.15% WP bio-pesticide',
      'Spinosad 45% SC bio-bacterial fermentation',
      'Emamectin Benzoate 5% SG'
    ],
    legalRecourse: [
      'Immediate seizure under Supreme Court Directives and Insecticides Act Section 21',
      'Toll-free reporting: 1800-180-1551 (Kisan Call Centre)'
    ]
  },
  {
    batch: 'DAP-SAND-441',
    product: 'Spurious DAP (Di-Ammonium Phosphate 18-46-0) Adulterated',
    manufacturer: 'Unlicensed Repackers (Counterfeiting IFFCO DAP Bag)',
    category: 'Fertilizer' as const,
    status: 'counterfeit' as const,
    score: 22,
    mfg: '2024-05-01',
    exp: '2027-04-30',
    reg: 'INVALID-FCO-REG-BAG',
    activeIngredient: 'Adulterated Sand, Gypsum & Inert Clay with <6% P2O5',
    toxicityTriangle: { color: 'Missing / Non-Compliant' as const, matched: false },
    hologramCheck: { status: 'Missing' as const, notes: 'Bag missing official IFFCO ultrasonic tamper-proof stitching seal.' },
    visualDefects: [
      'Bag stitching: Hand-sewn twine instead of machine ultrasonic thermo-stitching',
      'Missing Fertilizer Control Order (FCO) mandatory registration number and net weight QR',
      'Water Solubility Test Failure: Granules do not dissolve cleanly in warm water, leaving dense sandy sediment',
      'Off-color granules: Brownish-red grit mixed with clay balls'
    ],
    factors: [
      { name: 'Fertilizer Control Order (FCO) 1985 Compliance', matched: false, notes: 'Bag lacks statutory FCO registration number, dealer code, and subsidy QR stamp.' },
      { name: 'Packaging Security & Stitching Integrity', matched: false, notes: 'Secondary hand-stitched bag with reused HDPE woven sack fibers.' },
      { name: 'Manufacturer ERP Batch Traceability', matched: false, notes: 'Batch code DAP-SAND-441 not issued by IFFCO or KRIBHCO plants.' },
      { name: 'Physical Particle & Solubility Test', matched: false, notes: 'High content of sand and gypsum grit; fails 100% water solubility benchmark.' },
      { name: 'Nutrient Content Purity Standard', matched: false, notes: 'Fails mandatory 18% Nitrogen and 46% Phosphate statutory specification.' }
    ],
    warnings: [
      'CRITICAL FERTILIZER ADULTERATION: Fake DAP Fertilizer Detected!',
      'Bag is filled with inert clay and sand; applying this will cause severe nutrient starvation and soil compaction.',
      'Sale of spurious fertilizer violates Essential Commodities Act 1955 and FCO 1985.'
    ],
    safety: [
      'Do not apply to soil. It provides zero phosphorus for root establishment.',
      'Perform simple field test: Dissolve 1 spoon of granules in a glass of warm water. Genuine DAP dissolves 100%; fake DAP leaves heavy sand/dirt at bottom.',
      'Lodge complaint with Fertilizer Inspector at District Agriculture Office.'
    ],
    safeAlternatives: [
      'Genuine IFFCO DAP / KRIBHCO DAP purchased from PACS or authorized cooperative dealer',
      'Single Super Phosphate (SSP 16% P2O5) + Urea as affordable alternative',
      'Prom (Phosphate Rich Organic Manure) for organic basal nutrition'
    ],
    legalRecourse: [
      'Action under Section 7 of Essential Commodities Act 1955 (7 years imprisonment)',
      'Report directly to District Fertilizer Quality Control Laboratory'
    ]
  },
  {
    batch: 'SEED-COT-990',
    product: 'Spurious Hybrid Cotton Seed Pouch (Fake BG-II Variety)',
    manufacturer: 'Uncertified Seed Compounder (Counterfeiting Rasi Seeds)',
    category: 'Hybrid Seeds' as const,
    status: 'counterfeit' as const,
    score: 12,
    mfg: '2024-03-01',
    exp: '2025-02-28',
    reg: 'FAKE-NSC-TAG-8819',
    activeIngredient: 'Uncertified F2 Generation Seed (Suspected Illegal HT/Bt Contamination)',
    toxicityTriangle: { color: 'Missing / Non-Compliant' as const, matched: false },
    hologramCheck: { status: 'Flat Photocopy Sticker' as const, notes: 'Printed paper tag glued onto pouch with missing National Seeds Corporation holographic seal.' },
    visualDefects: [
      'Pouch lacks official National Seeds Corporation (NSC) or State Seed Certification green tag',
      'Heat seal on top has been re-pressed over an already opened pouch',
      'Germination guarantee (>75%) text printed with mismatched typewriter font',
      'Lot test date and genetic purity certificates are absent'
    ],
    factors: [
      { name: 'Seeds Act 1966 Statutory Certification', matched: false, notes: 'Missing official Blue/Green tag from State Seed Certification Agency.' },
      { name: 'GEAC (Genetic Engineering Appraisal Committee) Approval', matched: false, notes: 'Variety not registered under approved GEAC commercial hybrids.' },
      { name: 'Holographic Tamper Seal on Seed Pouch', matched: false, notes: 'Non-holographic paper print; signs of secondary manual heat sealing.' },
      { name: 'Lot Germination & Physical Purity Standards', matched: false, notes: 'Seeds show high variation in size, cracked seed coats, and poor viability.' },
      { name: 'Manufacturer Dispatch Ledger', matched: false, notes: 'Serial number not in Rasi Seeds authorized seed distribution ledger.' }
    ],
    warnings: [
      'CRITICAL: Spurious Hybrid Seed Pouch Detected!',
      'Sowing spurious seeds causes complete crop failure, poor germination (<20%), and zero boll development.',
      'May contain illegal unapproved traits leading to severe herbicide susceptibility.'
    ],
    safety: [
      'Do not sow these seeds in your field. Sowing uncertified seeds ruins an entire season.',
      'Take 50 seeds and perform a wet paper towel germination test to confirm viability.',
      'Keep seed pouch, bill, and sample intact for seed inspector verification.'
    ],
    safeAlternatives: [
      'Certified Rasi Seeds RCH-659 BG-II from authorized seed outlet',
      'Ankur 3028 BG-II or Kaveri Jadoo certified cotton seeds',
      'Buy only with official cash bill showing lot number and seed certification stamp'
    ],
    legalRecourse: [
      'File complaint under Section 19 of Seeds Act 1966',
      'Report to District Seed Inspector for immediate confiscation'
    ]
  },
  {
    batch: 'AGR-2024-9921',
    product: 'DemoGuard Bio-Fungicide (Trichoderma viride 1.5% WP)',
    manufacturer: 'AgriSafe Bio-Sciences India Ltd.',
    category: 'Fungicide' as const,
    status: 'verified' as const,
    score: 98,
    mfg: '2024-03-12',
    exp: '2026-03-11',
    reg: 'CIBRC/BIO/2024/TR-8924',
    activeIngredient: 'Trichoderma viride 1.5% WP (CFU 2 x 10^8/g min)',
    toxicityTriangle: { color: 'Green (Slightly Toxic)' as const, matched: true },
    hologramCheck: { status: 'Authentic 3D Kinetic' as const, notes: 'Dual-layer kinetic micro-text and refractive depth shift verified successfully.' },
    visualDefects: [],
    factors: [
      { name: 'CIBRC Statutory Registration Registry', matched: true, notes: 'Valid & active registration under Section 9(3B) Insecticides Act 1968.' },
      { name: '3D Tamper-Evident Hologram Security Check', matched: true, notes: 'Dual-layer kinetic micro-text and refractive depth shift verified successfully.' },
      { name: 'Manufacturer ERP Batch Traceability', matched: true, notes: 'Authorized batch dispatch confirmed from registered factory manufacturing unit.' },
      { name: 'QR Code Signature Cryptographic Hash', matched: true, notes: 'Signed ECDSA payload matches authorized factory public key infrastructure.' },
      { name: 'Banned / Hazardous Chemical Scan', matched: true, notes: 'Active formulation is 100% bio-safe and free from cancelled organophosphate adulterants.' }
    ],
    warnings: [],
    safety: [
      'Product is 100% authentic and CIBRC certified for agricultural application.',
      'Check inner foil seal integrity before unsealing.',
      'Follow standard 15L knapsack tank dosage guidelines: 40-50g per 15L tank.'
    ],
    safeAlternatives: [],
    legalRecourse: []
  }
];

export const AGRI_COUNTERFEIT_TEST_CASES = DEMO_VERIFY_CASES;

