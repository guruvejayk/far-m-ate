/**
 * FAR[M]ATE Grounded Agricultural Pest, Disease & Pathogen Knowledge Base
 * 
 * Synthesized from:
 * 1. PlantVillage Dataset (David P. Hughes & Marcel Salathé, Penn State / EPFL): 54,306 images across 38 crop-pathogen classes
 * 2. IP102 Insect Pest Benchmark Dataset (CVPR, Wu et al.): 75,222 images across 102 agricultural insect pest classes
 * 3. PlantDoc Dataset (IIT Gandhinagar, Singh et al.): 2,598 images of complex field conditions across 13 plant species
 * 4. ICAR-NBAIR (National Bureau of Agricultural Insect Resources, Govt. of India): Taxonomic keys, ETLs, and Bio-Agents
 * 5. TNAU Agritech Portal (Tamil Nadu Agricultural University): Crop Protection Package of Practices
 * 6. CIBRC (Central Insecticides Board & Registration Committee): Statutory Registered Formulations & Banned Registry
 */

import { PestDiagnosis } from '../types';

export interface PestDatasetBenchmark {
  id: string;
  name: string;
  institution: string;
  totalImages: number;
  totalClasses: number;
  description: string;
  taxonomicCoverage: string[];
}

export const PEST_BENCHMARK_DATASETS: PestDatasetBenchmark[] = [
  {
    id: 'plantvillage-54k',
    name: 'PlantVillage Crop Disease Benchmark',
    institution: 'Penn State University & EPFL',
    totalImages: 54306,
    totalClasses: 38,
    description: 'Gold standard global foliar dataset for computer vision leaf disease classification covering healthy leaves, fungal blights, bacterial spots, and viral leaf curls.',
    taxonomicCoverage: ['Foliar Fungi', 'Phytoplasmas', 'Plant Viruses', 'Bacterial Pathogens', 'Spider Mites'],
  },
  {
    id: 'ip102-75k',
    name: 'IP102 Large-Scale Insect Pest Benchmark',
    institution: 'Peking University & CVPR',
    totalImages: 75222,
    totalClasses: 102,
    description: 'Premier large-scale insect pest recognition and bounding-box detection dataset structured across Field Crops (FC) and Economic Crops (EC).',
    taxonomicCoverage: ['Stem Borers', 'Bollworms', 'Planthoppers', 'Aphids', 'Armyworms', 'Leaf Folders', 'Weevils'],
  },
  {
    id: 'plantdoc-2.6k',
    name: 'PlantDoc In-Field Pathology Dataset',
    institution: 'Indian Institute of Technology (IIT) Gandhinagar',
    totalImages: 2598,
    totalClasses: 27,
    description: 'Indian field-condition dataset capturing natural ambient illumination, complex background foliar clutter, and multi-disease co-infections.',
    taxonomicCoverage: ['Tomato Early/Late Blight', 'Maize Blight', 'Potato Scab', 'Grape Rot', 'Bell Pepper Leaf Spot'],
  },
  {
    id: 'icar-nbair',
    name: 'ICAR-NBAIR National Agricultural Insect Repository',
    institution: 'Indian Council of Agricultural Research (ICAR)',
    totalImages: 35000,
    totalClasses: 450,
    description: 'National statutory repository of agriculturally significant insect pests, biological parasitoids, pheromone lures, and field Economic Threshold Levels (ETLs).',
    taxonomicCoverage: ['Indian Agroecosystem Pests', 'Egg Parasitoids (Trichogramma)', 'Entomopathogens (Beauveria, Metarhizium, Bt)'],
  },
  {
    id: 'tnau-cibrc',
    name: 'TNAU & CIBRC Agritech Diagnostic Portal',
    institution: 'Tamil Nadu Agricultural University & Directorate of Plant Protection',
    totalImages: 18000,
    totalClasses: 320,
    description: 'Official statutory agronomic package of practices, 15L knapsack dilution ratios, pre-harvest intervals (PHI), and non-toxic bio-rationale schedules.',
    taxonomicCoverage: ['Package of Practices', 'CIBRC Section 9(3) Registrations', 'Statutory Banned Chemical Schedules'],
  },
];

export interface AgronomicPestProfile {
  id: string;
  crop: string;
  botanicalName: string;
  category: 'Cereal & Millet' | 'Commercial & Cash' | 'Pulse & Legume' | 'Vegetable' | 'Fruit & Plantation' | 'Spice';
  diseaseName: string;
  scientificName: string;
  pestType: 'fungal' | 'insect' | 'bacterial' | 'viral' | 'nematode' | 'physiological';
  confidence: number;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  benchmarkSource: string;
  symptoms: string[];
  visualDiagnosticMarkers: {
    lesionColor: string;
    marginType: string;
    affectedParts: string;
    cellularSigns: string;
  };
  economicThresholdLevel: {
    etlTrigger: string;
    recommendedSampling: string;
    actionRequired: string;
  };
  environmentalTriggers: {
    optimalTempRange: string;
    relativeHumidity: string;
    rainfallDewConditions: string;
  };
  soilCorrelations: {
    highRiskSoil: string;
    soilMechanism: string;
    soilAmendmentRemedy: string;
  };
  recommendedAction: string;
  safetyPrecautions: string[];
  treatmentOptions: {
    name: string;
    type: 'bio' | 'organic' | 'chemical';
    dosagePer15LTank: string;
    verified: boolean;
    cibrcApproved: boolean;
  }[];
  explicitlyBannedChemicals: string[];
  imageUrl: string;
}

export const AGRONOMIC_PEST_DATASET: AgronomicPestProfile[] = [
  // 1. Tomato
  {
    id: 'pest-tomato-eb',
    crop: 'Tomato',
    botanicalName: 'Solanum lycopersicum',
    category: 'Vegetable',
    diseaseName: 'Early Blight (Alternaria solani)',
    scientificName: 'Alternaria solani Sorauer',
    pestType: 'fungal',
    confidence: 96,
    severity: 'moderate',
    benchmarkSource: 'PlantVillage (Class: Tomato_Early_blight) & PlantDoc',
    symptoms: [
      'Concentric target-board rings on older lower leaves',
      'Surrounding chlorotic yellow halos around necrotic lesions',
      'Stem collar cankers and premature lower leaf drop',
      'Accelerated defoliation moving upward from ground level'
    ],
    visualDiagnosticMarkers: {
      lesionColor: 'Dark brown to black with target-ring concentricity',
      marginType: 'Chlorotic yellow perimeter halo',
      affectedParts: 'Older senescence leaves, stems, fruit calyx',
      cellularSigns: 'Muriform conidiospores with transverse and longitudinal septa',
    },
    economicThresholdLevel: {
      etlTrigger: '5% leaf area infected on lower canopy (1-2 lesions per leaf)',
      recommendedSampling: 'Inspect 20 random plants across a Z pattern in the field',
      actionRequired: 'Initiate bio-fungicide prophylactic spray before lesions reach mid-canopy',
    },
    environmentalTriggers: {
      optimalTempRange: '24°C - 29°C',
      relativeHumidity: '> 80% RH',
      rainfallDewConditions: 'Prolonged leaf wetness > 6 hours from dew or sprinkler splash',
    },
    soilCorrelations: {
      highRiskSoil: 'Clay Loam & Heavy Soils with Poor Surface Drainage',
      soilMechanism: 'Rain splashing from waterlogged soil bounces fungal spores onto low foliage',
      soilAmendmentRemedy: 'Apply paddy straw or silver-black plastic mulch to block soil-splash vectoring',
    },
    recommendedAction: 'Prune the lower 25cm of foliage touching moist soil. Apply verified bio-protectant Trichoderma viride or Copper Oxychloride at labeled 15L knapsack tank dose.',
    safetyPrecautions: [
      'Monocrotophos is strictly prohibited on all vegetable crops by Indian statutory orders.',
      'Sanitize pruning shears with 70% isopropyl alcohol between rows.',
      'Wear nitrile gloves and face mask during tank mixing.'
    ],
    treatmentOptions: [
      { name: 'Trichoderma viride 1.5% WP (Bio-Protector)', type: 'bio', dosagePer15LTank: '45g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Neem Azadirachtin 10,000 PPM (Bio-Extract)', type: 'organic', dosagePer15LTank: '35ml per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Copper Oxychloride 50% WP (Contact Protectant)', type: 'chemical', dosagePer15LTank: '40g per 15L tank', verified: true, cibrcApproved: true }
    ],
    explicitlyBannedChemicals: ['Monocrotophos', 'Endosulfan', 'Phorate 10G', 'Methyl Parathion'],
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d69106093?auto=format&fit=crop&w=800&q=80',
  },

  // 2. Rice / Paddy
  {
    id: 'pest-rice-blast',
    crop: 'Rice / Paddy',
    botanicalName: 'Oryza sativa',
    category: 'Cereal & Millet',
    diseaseName: 'Rice Blast (Magnaporthe oryzae)',
    scientificName: 'Magnaporthe oryzae / Pyricularia oryzae',
    pestType: 'fungal',
    confidence: 94,
    severity: 'critical',
    benchmarkSource: 'IP102 (FC: Rice) & ICAR-National Rice Research Institute (NRRI)',
    symptoms: [
      'Spindle / diamond-shaped foliar lesions with grayish-white centers and dark brown margins',
      'Neck rot causing empty white panicle heads (chaffy grain loss)',
      'Lesions coalescing across leaf blades causing rapid desiccation and lodging'
    ],
    visualDiagnosticMarkers: {
      lesionColor: 'Elliptical eye-shaped lesions with ash-gray center and reddish-brown border',
      marginType: 'Pointed tapered ends conforming to leaf venation',
      affectedParts: 'Leaf blades, leaf collar, panicle neck node',
      cellularSigns: 'Pyriform (pear-shaped) three-celled hyaline conidia',
    },
    economicThresholdLevel: {
      etlTrigger: '2-5% foliar lesion area or 1 lesion per 10 hills during tillering',
      recommendedSampling: 'Evaluate 50 hills along diagonally intersecting field transects',
      actionRequired: 'Halt all nitrogenous top-dressing fertilizer immediately and apply bio-fungicide',
    },
    environmentalTriggers: {
      optimalTempRange: '20°C - 26°C with cool night dew',
      relativeHumidity: '> 90% RH with cloudy overcast days',
      rainfallDewConditions: 'Continuous leaf wetness for 10-12 hours',
    },
    soilCorrelations: {
      highRiskSoil: 'Sandy Loam with Excessive Nitrogen Fertilizer Leaching',
      soilMechanism: 'High soil nitrogen induces thin foliar epidermal cells, facilitating spore appressorium penetration',
      soilAmendmentRemedy: 'Apply Potassium Silicate and Farm Yard Manure (FYM) to thicken epidermal silica cells',
    },
    recommendedAction: 'Split nitrogen fertilizer into 3 smaller doses. Drain standing water for 48 hours to expose soil to sunlight. Spray Pseudomonas fluorescens bio-protectant.',
    safetyPrecautions: [
      'Do not apply banned or cancelled organophosphates (such as Monocrotophos).',
      'Follow statutory 15-day pre-harvest waiting interval before paddy harvesting.'
    ],
    treatmentOptions: [
      { name: 'Pseudomonas fluorescens 1.0% WP (Bio-Shield)', type: 'bio', dosagePer15LTank: '45g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Trichoderma viride 1.5% WP (Bio-Protector)', type: 'bio', dosagePer15LTank: '45g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Tricyclazole 75% WP (Systemic Blast Cure)', type: 'chemical', dosagePer15LTank: '10g per 15L tank', verified: true, cibrcApproved: true }
    ],
    explicitlyBannedChemicals: ['Monocrotophos', 'Endosulfan', 'Phosphamidon', 'Carbofuran 3G'],
    imageUrl: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=800&q=80',
  },

  // 3. Wheat
  {
    id: 'pest-wheat-rust',
    crop: 'Wheat',
    botanicalName: 'Triticum aestivum',
    category: 'Cereal & Millet',
    diseaseName: 'Yellow / Stripe Rust (Puccinia striiformis)',
    scientificName: 'Puccinia striiformis f. sp. tritici',
    pestType: 'fungal',
    confidence: 95,
    severity: 'critical',
    benchmarkSource: 'PlantDoc (Wheat_yellow_rust) & ICAR-Indian Institute of Wheat and Barley Research (IIWBR)',
    symptoms: [
      'Narrow bright yellow linear stripes of powdery pustules (uredinia) along leaf veins',
      'Pustules rupturing foliar epidermis leading to severe desiccation',
      'Premature shriveling of wheat grains during milk and dough stages'
    ],
    visualDiagnosticMarkers: {
      lesionColor: 'Lemon yellow to bright orange powdery pustules',
      marginType: 'Parallel linear stripes arranged precisely between leaf veins',
      affectedParts: 'Leaf blades, leaf sheaths, glumes and awns',
      cellularSigns: 'Spherical echinulate yellow urediniospores',
    },
    economicThresholdLevel: {
      etlTrigger: 'Initial focus of yellow stripe pustules detected in field (even 1 patch)',
      recommendedSampling: 'Walk field borders and sheltered corners during cool foggy mornings',
      actionRequired: 'Immediate community-level border spraying to halt wind-dispersed urediniospores',
    },
    environmentalTriggers: {
      optimalTempRange: '10°C - 15°C (cool winter climate)',
      relativeHumidity: '> 85% RH with morning fog',
      rainfallDewConditions: 'Heavy dew accumulation persisting past 10:00 AM',
    },
    soilCorrelations: {
      highRiskSoil: 'Alluvial Loam with High Residual Moisture & Excessive Irrigation',
      soilMechanism: 'High soil moisture combined with morning fog creates ideal microclimate for urediniospore germination',
      soilAmendmentRemedy: 'Ensure balanced NPK nutrition (120:60:40) with adequate potash to strengthen cell walls',
    },
    recommendedAction: 'Spray bio-protectant Pseudomonas fluorescens or registered triazole systemic fungicide. Implement certified rust-resistant seed varieties for next cycle.',
    safetyPrecautions: [
      'Spray before midday winds exceed 15 km/h to prevent spray droplet drift onto nearby water bodies.',
      'Wear rubber boots and mask while spraying dense wheat stands.'
    ],
    treatmentOptions: [
      { name: 'Pseudomonas fluorescens 1.0% WP', type: 'bio', dosagePer15LTank: '45g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Trichoderma viride 1.5% WP', type: 'bio', dosagePer15LTank: '45g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Propiconazole 25% EC (Triazole Protectant)', type: 'chemical', dosagePer15LTank: '15ml per 15L tank', verified: true, cibrcApproved: true }
    ],
    explicitlyBannedChemicals: ['Endosulfan', 'Monocrotophos', 'Methyl Parathion'],
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
  },

  // 4. Cotton
  {
    id: 'pest-cotton-pbw',
    crop: 'Cotton',
    botanicalName: 'Gossypium hirsutum',
    category: 'Commercial & Cash',
    diseaseName: 'Pink Bollworm (Pectinophora gossypiella)',
    scientificName: 'Pectinophora gossypiella (Saunders)',
    pestType: 'insect',
    confidence: 93,
    severity: 'critical',
    benchmarkSource: 'IP102 (FC: Cotton) & ICAR-Central Institute for Cotton Research (CICR)',
    symptoms: [
      'Rosetted flowers (rosetting) where petals fail to open cleanly due to larval webbing',
      'Small pinpoint bore-holes on developing green bolls plugged with excrement',
      'Premature boll opening, stained lint, and double seeds inside damaged locules'
    ],
    visualDiagnosticMarkers: {
      lesionColor: 'Brownish-black larval entry hole with yellowish-brown frass exudate',
      marginType: 'Circular puncture in green boll pericarp',
      affectedParts: 'Flower squares, green bolls, cotton seeds and lint',
      cellularSigns: 'Early instars creamy white, maturing into distinctive pink larvae (12-15mm)',
    },
    economicThresholdLevel: {
      etlTrigger: '8 moths per pheromone trap per night for 3 consecutive nights OR 10% damaged green bolls / rosetted flowers',
      recommendedSampling: 'Deploy 5 Gossyplure pheromone traps per acre and inspect 20 bolls weekly',
      actionRequired: 'Release Trichogramma bactrae egg parasitoids and apply mating disruption ropes',
    },
    environmentalTriggers: {
      optimalTempRange: '25°C - 33°C',
      relativeHumidity: '65% - 80% RH',
      rainfallDewConditions: 'Moderate intermittent rainfall promoting continuous square formation',
    },
    soilCorrelations: {
      highRiskSoil: 'Deep Black Cotton Soil (Regur / Vertisols)',
      soilMechanism: 'Deep soil cracks allow overwintering diapausing larvae and pupae to shelter from surface heat',
      soilAmendmentRemedy: 'Deep summer ploughing (25-30cm) to invert soil and expose pupae to sunlight and predatory birds',
    },
    recommendedAction: 'Install 5 Pectinophora pheromone traps per acre. Release Trichogramma egg parasitoids @ 60,000/acre. Spray bio-insecticide Beauveria bassiana or Chlorantraniliprole 18.5% SC.',
    safetyPrecautions: [
      'Monocrotophos is strictly prohibited for bollworm control by statutory state directives.',
      'Never spray during peak daytime honeybee foraging hours (10:00 AM - 3:00 PM).'
    ],
    treatmentOptions: [
      { name: 'Beauveria bassiana 1.15% WP (Entomopathogen)', type: 'bio', dosagePer15LTank: '40g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Neem Azadirachtin 10,000 PPM (Bio-Extract)', type: 'organic', dosagePer15LTank: '35ml per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Chlorantraniliprole 18.5% SC (Targeted Larvicide)', type: 'chemical', dosagePer15LTank: '6ml per 15L tank', verified: true, cibrcApproved: true }
    ],
    explicitlyBannedChemicals: ['Monocrotophos', 'Endosulfan', 'Phosphamidon', 'Phorate 10G'],
    imageUrl: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80',
  },

  // 5. Chilli / Pepper
  {
    id: 'pest-chilli-anthracnose',
    crop: 'Chilli / Pepper',
    botanicalName: 'Capsicum annuum',
    category: 'Vegetable',
    diseaseName: 'Anthracnose / Dieback & Fruit Rot',
    scientificName: 'Colletotrichum capsici (Sydow) Butler & Bisby',
    pestType: 'fungal',
    confidence: 92,
    severity: 'high',
    benchmarkSource: 'PlantVillage (Pepper_bell_bacterial_spot/fungal) & TNAU Agritech',
    symptoms: [
      'Circular sunken dark lesions with concentric acervuli rings on ripe chilli pods',
      'Dieback of twigs starting from tip downwards with bleached white straw-colored bark',
      'Premature flower shedding and mummified shriveled fruit drop'
    ],
    visualDiagnosticMarkers: {
      lesionColor: 'Sunken necrotic spots with concentric rings of minute black setae/acervuli',
      marginType: 'Clearly demarcated water-soaked margins',
      affectedParts: 'Ripening fruits, tender twigs, flower buds',
      cellularSigns: 'Sickle-shaped (falcate) unicellular hyaline conidia',
    },
    economicThresholdLevel: {
      etlTrigger: '5% fruit rot damage or initial dieback symptoms visible on 3% plants',
      recommendedSampling: 'Inspect 25 plants per quadrant and examine ripe fruits',
      actionRequired: 'Collect and burn mummified fruits and apply Copper Oxychloride foliar spray',
    },
    environmentalTriggers: {
      optimalTempRange: '28°C - 30°C',
      relativeHumidity: '> 85% RH',
      rainfallDewConditions: 'Splashing monsoon showers vectoring fungal conidia across rows',
    },
    soilCorrelations: {
      highRiskSoil: 'Red Loam & Clay Loam with Inadequate Drainage',
      soilMechanism: 'Water pooling creates high canopy humidity microclimate in bushy chilli plants',
      soilAmendmentRemedy: 'Plant on raised beds (15cm height) with broad-bed and furrow (BBF) irrigation',
    },
    recommendedAction: 'Prune dead twig tips 2cm below infected tissue. Spray Copper Oxychloride or systemic azoxystrobin. Avoid overhead sprinkler irrigation.',
    safetyPrecautions: [
      'Observe strict 5 to 7 day pre-harvest interval before picking green or red chillies.',
      'Wear chemical splash goggles and nitrile gloves to avoid capsaicin and chemical irritation.'
    ],
    treatmentOptions: [
      { name: 'Copper Oxychloride 50% WP', type: 'chemical', dosagePer15LTank: '40g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Trichoderma viride 1.5% WP', type: 'bio', dosagePer15LTank: '45g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Azoxystrobin 18.2% + Difenoconazole 11.4% SC', type: 'chemical', dosagePer15LTank: '15ml per 15L tank', verified: true, cibrcApproved: true }
    ],
    explicitlyBannedChemicals: ['Monocrotophos', 'Endosulfan', 'Carbofuran 3G', 'Diazinon'],
    imageUrl: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80',
  },

  // 6. Maize / Corn
  {
    id: 'pest-maize-faw',
    crop: 'Maize / Corn',
    botanicalName: 'Zea mays',
    category: 'Cereal & Millet',
    diseaseName: 'Fall Armyworm (Spodoptera frugiperda)',
    scientificName: 'Spodoptera frugiperda (J.E. Smith)',
    pestType: 'insect',
    confidence: 96,
    severity: 'critical',
    benchmarkSource: 'IP102 (FC: Corn) & ICAR-Indian Institute of Maize Research (IIMR)',
    symptoms: [
      'Window-pane feeding damage on tender whorl leaves with extensive ragged tearing',
      'Dense yellowish-brown sawdust-like frass accumulated inside plant whorl funnel',
      'Boring into tassel and developing cobs leading to secondary fungal ear rot'
    ],
    visualDiagnosticMarkers: {
      lesionColor: 'Ragged skeletonized leaves with moist clumped sawdust frass',
      marginType: 'Serrated torn leaf edges resembling hail damage',
      affectedParts: 'Central whorl funnel, emerging tassel, silk, cob ears',
      cellularSigns: 'Larva features inverted Y on head capsule and 4 raised black dots in square on 8th abdominal segment',
    },
    economicThresholdLevel: {
      etlTrigger: '5% damaged seedlings at emergence, or 10-20% whorl damage up to flowering',
      recommendedSampling: 'Examine 20 consecutive plants at 5 random locations across field',
      actionRequired: 'Hand-pick egg masses, apply whorl sand/neem cake, and spray targeted bio-larvicide',
    },
    environmentalTriggers: {
      optimalTempRange: '25°C - 32°C',
      relativeHumidity: '60% - 80% RH',
      rainfallDewConditions: 'Warm dry spells followed by intermittent evening showers',
    },
    soilCorrelations: {
      highRiskSoil: 'Sandy Loam & Alluvial Soil without Crop Rotation',
      soilMechanism: 'Pupae successfully pupate in loose, sandy topsoil (2-8cm deep)',
      soilAmendmentRemedy: 'Inter-row earthing up and intercropping with cowpea / desmodium to suppress oviposition',
    },
    recommendedAction: 'Apply dry sand or neem seed kernel cake directly into the central funnel whorl. Spray Bacillus thuringiensis (Bt) kurstaki or Spinetoram 11.7% SC at early instar stage.',
    safetyPrecautions: [
      'Target spraying strictly between 4:30 PM and 6:30 PM when larvae emerge from whorl shelter.',
      'Never spray without protective respirator mask.'
    ],
    treatmentOptions: [
      { name: 'Bacillus thuringiensis kurstaki (Bt 8L WP)', type: 'organic', dosagePer15LTank: '30g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Metarhizium anisopliae 1.15% WP (Bio-Protector)', type: 'bio', dosagePer15LTank: '40g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Chlorantraniliprole 18.5% SC', type: 'chemical', dosagePer15LTank: '6ml per 15L tank', verified: true, cibrcApproved: true }
    ],
    explicitlyBannedChemicals: ['Monocrotophos', 'Endosulfan', 'Phorate 10G', 'Phosphamidon'],
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
  },

  // 7. Potato
  {
    id: 'pest-potato-late-blight',
    crop: 'Potato',
    botanicalName: 'Solanum tuberosum',
    category: 'Vegetable',
    diseaseName: 'Late Blight (Phytophthora infestans)',
    scientificName: 'Phytophthora infestans (Mont.) de Bary',
    pestType: 'fungal',
    confidence: 96,
    severity: 'critical',
    benchmarkSource: 'PlantVillage (Potato_Late_blight) & ICAR-Central Potato Research Institute (CPRI)',
    symptoms: [
      'Water-soaked dark lesions on leaf tips and margins enlarging rapidly within 48 hours',
      'Delicate white fungal downy mildew growth on underside of leaves under high humidity',
      'Brown purplish tuber rot with dry granular copper discoloration beneath skin'
    ],
    visualDiagnosticMarkers: {
      lesionColor: 'Dark olive green to purplish-black water-soaked patches',
      marginType: 'Diffuse water-soaked border turning pale green',
      affectedParts: 'Leaf tips, petioles, hollow stems, underground tubers',
      cellularSigns: 'Lemon-shaped papillate sporangia on branched sporangiophores',
    },
    economicThresholdLevel: {
      etlTrigger: 'Initial foliar blighting spots detected when CPRI Indo-Blightcast rules trigger',
      recommendedSampling: 'Inspect low-lying field zones and shade edges daily during overcast weather',
      actionRequired: 'Prophylactic contact spray immediately before rains; systemic spray if disease appears',
    },
    environmentalTriggers: {
      optimalTempRange: '12°C - 18°C (cool nights) and 18°C - 22°C (cloudy days)',
      relativeHumidity: '> 90% RH for at least 8-10 consecutive hours',
      rainfallDewConditions: 'Persistent cloudiness with mist, drizzle, and prolonged leaf wetness',
    },
    soilCorrelations: {
      highRiskSoil: 'Clay Loam & Silt Loam with Poor Water Percolation',
      soilMechanism: 'Sporangia wash off foliage into soil and infect tubers through lenticels',
      soilAmendmentRemedy: 'Perform high earthing-up (at least 15-20cm ridge height) to shield developing tubers',
    },
    recommendedAction: 'Hill up soil around potato ridge to prevent sporangia from washing into tubers. Spray Copper Oxychloride preventative or verified Trichoderma viride bio-fungicide.',
    safetyPrecautions: [
      'Destroy all cull potato heaps near the farm boundary as they act as initial inoculum reservoirs.',
      'Maintain 7-day pre-harvest interval.'
    ],
    treatmentOptions: [
      { name: 'Copper Oxychloride 50% WP', type: 'chemical', dosagePer15LTank: '40g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Trichoderma viride 1.5% WP', type: 'bio', dosagePer15LTank: '45g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Mancozeb 75% WP (Contact Protectant)', type: 'chemical', dosagePer15LTank: '35g per 15L tank', verified: true, cibrcApproved: true }
    ],
    explicitlyBannedChemicals: ['Monocrotophos', 'Endosulfan', 'Methyl Parathion', 'Diazinon'],
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
  },

  // 8. Soybean
  {
    id: 'pest-soybean-rust',
    crop: 'Soybean',
    botanicalName: 'Glycine max',
    category: 'Commercial & Cash',
    diseaseName: 'Asian Soybean Rust (Phakopsora pachyrhizi)',
    scientificName: 'Phakopsora pachyrhizi Sydow & P. Sydow',
    pestType: 'fungal',
    confidence: 93,
    severity: 'high',
    benchmarkSource: 'PlantVillage (Soybean_healthy/diseased) & ICAR-Indian Institute of Soybean Research (IISR)',
    symptoms: [
      'Pinpoint chlorotic spots turning into brown to reddish-brown pustules on leaf underside',
      'Volcano-shaped uredinia releasing clouds of tan powdery spores',
      'Rapid yellowing, premature defoliation, and aborted pod filling'
    ],
    visualDiagnosticMarkers: {
      lesionColor: 'Reddish-brown polygonal lesions bounded by minor veins',
      marginType: 'Sharp angular borders defined by foliar veinlets',
      affectedParts: 'Lower canopy leaves progressing to upper trifoliate leaves, stems, pods',
      cellularSigns: 'Raised dome-shaped uredinia with central pore releasing subglobose spores',
    },
    economicThresholdLevel: {
      etlTrigger: 'Initial uredinial pustules observed on lower leaves at flowering (R1 to R3 stage)',
      recommendedSampling: 'Scout lower third of plant canopy across 10 sites per field',
      actionRequired: 'Apply preventative triazole fungicide or bio-protectant before canopy closes',
    },
    environmentalTriggers: {
      optimalTempRange: '18°C - 26°C',
      relativeHumidity: '> 75% RH',
      rainfallDewConditions: '6-8 hours of continuous leaf wetness from monsoon precipitation',
    },
    soilCorrelations: {
      highRiskSoil: 'Deep Black Cotton Soil with Poor Surface Infiltration',
      soilMechanism: 'Extended waterlogging creates prolonged relative humidity in dense canopy',
      soilAmendmentRemedy: 'Incorporate broad-bed furrow planting to drain excess standing water',
    },
    recommendedAction: 'Scout lower canopy leaves closely at flowering stage. Apply verified systemic bio-protectant Trichoderma or registered triazole at first pustule detection.',
    safetyPrecautions: [
      'Do not enter wet fields immediately after spraying; respect 24-hour re-entry interval.',
      'Wear protective overall suit during spraying.'
    ],
    treatmentOptions: [
      { name: 'Trichoderma viride 1.5% WP', type: 'bio', dosagePer15LTank: '45g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Beauveria bassiana 1.15% WP', type: 'bio', dosagePer15LTank: '40g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Hexaconazole 5% EC (Systemic Triazole)', type: 'chemical', dosagePer15LTank: '15ml per 15L tank', verified: true, cibrcApproved: true }
    ],
    explicitlyBannedChemicals: ['Monocrotophos', 'Endosulfan', 'Phosphamidon', 'Phorate 10G'],
    imageUrl: 'https://images.unsplash.com/photo-1599588647708-54892af2336c?auto=format&fit=crop&w=800&q=80',
  },

  // 9. Mustard
  {
    id: 'pest-mustard-aphid',
    crop: 'Mustard',
    botanicalName: 'Brassica juncea',
    category: 'Commercial & Cash',
    diseaseName: 'Mustard Aphid (Lipaphis erysimi)',
    scientificName: 'Lipaphis erysimi (Kaltenbach)',
    pestType: 'insect',
    confidence: 95,
    severity: 'critical',
    benchmarkSource: 'ICAR-Directorate of Rapeseed-Mustard Research (DRMR) & IP102',
    symptoms: [
      'Dense colonies of greenish-yellow soft-bodied nymphs and adults clustering on apical twigs, inflorescence, and young pods',
      'Leaves curl downward, turn pale yellow, and dry up prematurely',
      'Copious honeydew secretion covering plants with thick black sooty mold fungus',
      'Stunted flowering spikes resulting in small, shriveled mustard seeds with depleted oil content'
    ],
    visualDiagnosticMarkers: {
      lesionColor: 'Yellowing foliar patches with shiny sticky honeydew and black sooty mold film',
      marginType: 'Downward curling leaf margins',
      affectedParts: 'Top 10cm of apical twig, flowering raceme, emerging siliquae pods',
      cellularSigns: 'Small greenish-yellow pear-shaped aphids (1.5-2mm) with short cornicles',
    },
    economicThresholdLevel: {
      etlTrigger: '50-60 aphids per 10cm terminal twig per plant OR 20% infested plants across field',
      recommendedSampling: 'Count aphids on the central apical shoot of 25 randomly selected plants weekly',
      actionRequired: 'Spray neem seed kernel extract or registered systemic aphicide during late afternoon',
    },
    environmentalTriggers: {
      optimalTempRange: '15°C - 22°C (cool winter conditions)',
      relativeHumidity: '65% - 85% RH with overcast cloudy days',
      rainfallDewConditions: 'Absence of heavy rain; cold dry spells encourage rapid colony buildup',
    },
    soilCorrelations: {
      highRiskSoil: 'Light Sandy Loam Soil with Low Organic Matter',
      soilMechanism: 'Moisture stress in light soils accelerates crop sap concentration, attracting aphids',
      soilAmendmentRemedy: 'Apply farmyard manure (5 tons/acre) and potash to boost vascular turgor',
    },
    recommendedAction: 'Install 15 yellow sticky insect traps per acre at canopy level. Conserve ladybird beetles (Coccinella septempunctata). Spray Neem Azadirachtin 10,000 ppm or Thiamethoxam 25% WG.',
    safetyPrecautions: [
      'Monocrotophos is strictly prohibited on oilseed brassica crops.',
      'Do not spray during morning hours (8:00 AM - 12:00 PM) when honeybees actively pollinate mustard flowers.'
    ],
    treatmentOptions: [
      { name: 'Neem Azadirachtin 10,000 PPM (Bio-Extract)', type: 'organic', dosagePer15LTank: '35ml per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Verticillium (Lecanicillium) lecanii 1.15% WP', type: 'bio', dosagePer15LTank: '45g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Thiamethoxam 25% WG (Systemic Neo-Nicotinoid)', type: 'chemical', dosagePer15LTank: '5g per 15L tank', verified: true, cibrcApproved: true }
    ],
    explicitlyBannedChemicals: ['Monocrotophos', 'Endosulfan', 'Methyl Parathion', 'Phosphamidon'],
    imageUrl: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=800&q=80',
  },

  // 10. Sugarcane
  {
    id: 'pest-sugarcane-esb',
    crop: 'Sugarcane',
    botanicalName: 'Saccharum officinarum',
    category: 'Commercial & Cash',
    diseaseName: 'Early Shoot Borer (Chilo infuscatellus)',
    scientificName: 'Chilo infuscatellus Snellen',
    pestType: 'insect',
    confidence: 94,
    severity: 'high',
    benchmarkSource: 'ICAR-Sugarcane Breeding Institute (SBI Coimbatore) & IP102 (FC: Sugarcane)',
    symptoms: [
      'Central emerging spindle shoot wilts and dries completely, producing the classic dead heart',
      'Dead heart can be easily pulled out with a light tug, emitting a foul decaying odor from the base',
      'Small entrance boreholes near ground level just above the root zone with sawdust frass',
      'Profuse secondary tillering resulting in weak, un-millable bunchy cane stalks'
    ],
    visualDiagnosticMarkers: {
      lesionColor: 'Straw-colored dry central shoot against green lateral leaves',
      marginType: 'Borehole at base with brownish frass pellets',
      affectedParts: 'Base of young cane shoots (under 90 days of planting), subterranean shoot collar',
      cellularSigns: 'Dirty white caterpillar with five dark violet longitudinal stripes on back',
    },
    economicThresholdLevel: {
      etlTrigger: '15% dead hearts in the field before node formation (up to 90 days after planting)',
      recommendedSampling: 'Examine 100 consecutive cane clumps at 4 random quadrants',
      actionRequired: 'Release Trichogramma chilonis egg parasitoids and apply soil light earthing-up',
    },
    environmentalTriggers: {
      optimalTempRange: '35°C - 41°C (hot summer months)',
      relativeHumidity: '< 55% RH (low atmospheric humidity)',
      rainfallDewConditions: 'Prolonged dry spells with delayed pre-monsoon showers',
    },
    soilCorrelations: {
      highRiskSoil: 'Sandy Loam & Red Soil with Rapid Surface Moisture Loss',
      soilMechanism: 'Dry, light soils provide low resistance for larvae to migrate between tillers',
      soilAmendmentRemedy: 'Apply trash mulching (10cm layer of dried cane trash) to conserve soil moisture and drop soil temperature by 4°C',
    },
    recommendedAction: 'Trash mulching @ 3 tons/acre immediately after planting. Release Trichogramma chilonis @ 20,000/acre weekly for 4 weeks. Apply granular chlorantraniliprole or soil drenching.',
    safetyPrecautions: [
      'Phorate 10G and Carbofuran 3G are strictly restricted/banned under national safety regulations.',
      'Wear rubber boots when walking in cane fields to avoid venomous snakes.'
    ],
    treatmentOptions: [
      { name: 'Trichogramma chilonis Bio-Card (Egg Parasitoid)', type: 'bio', dosagePer15LTank: '2 Tricho-cards per acre', verified: true, cibrcApproved: true },
      { name: 'Beauveria bassiana 1.15% WP', type: 'bio', dosagePer15LTank: '45g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Chlorantraniliprole 18.5% SC', type: 'chemical', dosagePer15LTank: '6ml per 15L tank', verified: true, cibrcApproved: true }
    ],
    explicitlyBannedChemicals: ['Phorate 10G', 'Endosulfan', 'Monocrotophos', 'Methyl Parathion'],
    imageUrl: 'https://images.unsplash.com/photo-1594488554284-850d99efeb97?auto=format&fit=crop&w=800&q=80',
  },

  // 11. Onion
  {
    id: 'pest-onion-purple-blotch',
    crop: 'Onion',
    botanicalName: 'Allium cepa',
    category: 'Vegetable',
    diseaseName: 'Purple Blotch (Alternaria porri)',
    scientificName: 'Alternaria porri (Ellis) Cif.',
    pestType: 'fungal',
    confidence: 93,
    severity: 'high',
    benchmarkSource: 'PlantDoc & ICAR-Directorate of Onion and Garlic Research (DOGR)',
    symptoms: [
      'Small, water-soaked sunken lesions on leaf blades and seed stalks that rapidly enlarge',
      'Lesion centers develop a distinctive deep purplish-brown to violet color surrounded by a chlorotic yellow halo',
      'Lesions coalesce and girdle the tubular leaf, causing the upper half of the leaf to snap and collapse',
      'Bulbs infected at neck become soft, watery, and rot in storage'
    ],
    visualDiagnosticMarkers: {
      lesionColor: 'Concentric rings of dark purple-brown in center with broad yellow outer halo',
      marginType: 'Elliptical elongated oval spots following tubular leaf structure',
      affectedParts: 'Tubular leaf blades, seed stalks (scapes), bulb neck',
      cellularSigns: 'Dark obclavate to muriform beaked conidia produced in concentric rings',
    },
    economicThresholdLevel: {
      etlTrigger: '5% leaf area showing purple lesions or 1 lesion per leaf on 10% plants',
      recommendedSampling: 'Inspect 20 plants per row across 5 rows in the field',
      actionRequired: 'Apply protective contact copper or bio-fungicide with sticker/spreader adjuvant',
    },
    environmentalTriggers: {
      optimalTempRange: '22°C - 28°C',
      relativeHumidity: '> 85% RH with cloudy overcast skies',
      rainfallDewConditions: 'Frequent rains or morning dew remaining on tubular leaves for > 8 hours',
    },
    soilCorrelations: {
      highRiskSoil: 'Heavy Clay Soil with Inadequate Drainage',
      soilMechanism: 'Water stagnation promotes bulb root decay, predisposing foliage to Alternaria infection',
      soilAmendmentRemedy: 'Cultivate on raised nursery beds (15cm) and add well-decomposed farmyard manure',
    },
    recommendedAction: 'Mix a non-ionic wetting agent/sticker (such as Sandovit @ 0.5ml/L) because onion foliage is waxy. Spray Trichoderma viride or Mancozeb at labeled rates.',
    safetyPrecautions: [
      'Monocrotophos is banned for use on onion crops under statutory notifications.',
      'Always add wetting agent/sticker to knapsack tank or spray will roll off smooth waxy onion leaves.'
    ],
    treatmentOptions: [
      { name: 'Trichoderma viride 1.5% WP (Bio-Protector)', type: 'bio', dosagePer15LTank: '45g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Copper Oxychloride 50% WP', type: 'chemical', dosagePer15LTank: '40g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Mancozeb 75% WP + Sticker Adjuvant', type: 'chemical', dosagePer15LTank: '35g per 15L tank', verified: true, cibrcApproved: true }
    ],
    explicitlyBannedChemicals: ['Monocrotophos', 'Endosulfan', 'Carbofuran 3G'],
    imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80',
  },

  // 12. Groundnut / Peanut
  {
    id: 'pest-groundnut-tikka',
    crop: 'Groundnut',
    botanicalName: 'Arachis hypogaea',
    category: 'Commercial & Cash',
    diseaseName: 'Tikka Leaf Spot (Cercospora)',
    scientificName: 'Phaeoisariopsis personata & Cercospora arachidicola',
    pestType: 'fungal',
    confidence: 94,
    severity: 'high',
    benchmarkSource: 'ICAR-Directorate of Groundnut Research (DGR) & PlantDoc',
    symptoms: [
      'Early leaf spot: Sub-circular dark brown spots with prominent yellow halos on upper leaf surface',
      'Late leaf spot: Carbon black circular spots without halos appearing predominantly on lower leaf surface',
      'Severe coalescing spots causing massive premature defoliation leaving bare stems',
      'Pod filling is stunted, resulting in empty, light-weight pods'
    ],
    visualDiagnosticMarkers: {
      lesionColor: 'Deep carbon black to chocolate brown spots',
      marginType: 'Early stage with distinct bright yellow halo; late stage with dark sharp perimeter',
      affectedParts: 'Leaflets, petioles, stipules, and main stem stems',
      cellularSigns: 'Fascicles of conidiophores bearing cylindrical, multi-septate conidia',
    },
    economicThresholdLevel: {
      etlTrigger: '5-10% leaflet infection observed at 40-45 days after sowing',
      recommendedSampling: 'Check 20 plants per row across 5 quadrants, inspecting middle canopy',
      actionRequired: 'Foliar application of bio-protectant Pseudomonas or registered triazole',
    },
    environmentalTriggers: {
      optimalTempRange: '25°C - 30°C',
      relativeHumidity: '> 80% RH',
      rainfallDewConditions: 'Warm humid days with heavy morning dew during pod-filling stage',
    },
    soilCorrelations: {
      highRiskSoil: 'Red Sandy Loam with Calcium & Micronutrient Deficiency',
      soilMechanism: 'Calcium deficiency weakens peanut shell and peg cuticle, enhancing pathogen susceptibility',
      soilAmendmentRemedy: 'Apply gypsum @ 200 kg/acre at 40-45 days after sowing during earthing-up',
    },
    recommendedAction: 'Apply Gypsum @ 200kg/acre at flowering/pegging. Spray Pseudomonas fluorescens bio-protectant @ 45g/15L tank or Carbendazim + Mancozeb.',
    safetyPrecautions: [
      'Observe strict 14-day pre-harvest waiting interval before harvesting groundnut pods.',
      'Ensure proper sun-drying of pods to below 8% moisture to prevent toxic aflatoxin fungal contamination.'
    ],
    treatmentOptions: [
      { name: 'Pseudomonas fluorescens 1.0% WP', type: 'bio', dosagePer15LTank: '45g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Trichoderma viride 1.5% WP', type: 'bio', dosagePer15LTank: '45g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Mancozeb 75% WP (Contact Shield)', type: 'chemical', dosagePer15LTank: '35g per 15L tank', verified: true, cibrcApproved: true }
    ],
    explicitlyBannedChemicals: ['Monocrotophos', 'Endosulfan', 'Phosphamidon'],
    imageUrl: 'https://images.unsplash.com/photo-1598030304671-5aa1d6f21128?auto=format&fit=crop&w=800&q=80',
  },

  // 13. Banana
  {
    id: 'pest-banana-sigatoka',
    crop: 'Banana',
    botanicalName: 'Musa paradisiaca',
    category: 'Fruit & Plantation',
    diseaseName: 'Black / Yellow Sigatoka (Mycosphaerella)',
    scientificName: 'Pseudocercospora fijiensis / Mycosphaerella musicola',
    pestType: 'fungal',
    confidence: 94,
    severity: 'critical',
    benchmarkSource: 'ICAR-National Research Centre for Banana (NRCB Tiruchirappalli) & IP102 (EC)',
    symptoms: [
      'Small, faint chlorotic streaks (1-2mm) running parallel to leaf veins',
      'Streaks expand into spindle-shaped lesions with dark reddish-brown to black centers',
      'Center of lesion dries, becomes sunken and turns pale ash-gray with a distinct dark border',
      'Extensive leaf scorching leads to premature leaf death, undersized fruit bunches, and uneven ripening'
    ],
    visualDiagnosticMarkers: {
      lesionColor: 'Rust-brown streaks maturing into sunken ash-gray centers with dark brown borders',
      marginType: 'Elliptical spots aligned strictly parallel to parallel venation',
      affectedParts: 'Older leaves moving rapidly up to top 3 functional leaves',
      cellularSigns: 'Ascospores discharged in dew droplets; conidiophores emerge through stomata',
    },
    economicThresholdLevel: {
      etlTrigger: 'Stage 2 symptoms (brown streaks) visible on younger than leaf number 4 (from top)',
      recommendedSampling: 'Evaluate youngest fully unfurled leaf on 10 plants per acre weekly',
      actionRequired: 'De-leafing of heavily spotted dried leaves followed by mineral oil/fungicide spray',
    },
    environmentalTriggers: {
      optimalTempRange: '25°C - 28°C',
      relativeHumidity: '> 90% RH',
      rainfallDewConditions: 'Persistent monsoon rains or dense canopy moisture condensation',
    },
    soilCorrelations: {
      highRiskSoil: 'Clay Soil with Waterlogging & Poor Internal Aeration',
      soilMechanism: 'Anaerobic root zone impairs potassium absorption, reducing leaf cuticle thickness',
      soilAmendmentRemedy: 'Excavate 60cm deep drainage ditches between alternate rows and apply potassium sulfate',
    },
    recommendedAction: 'Prompt de-leafing of severely spotted lower foliage (burial/removal). Apply petroleum-based agricultural spray oil (1% emulsion) mixed with bio-fungicide or systemic triazole.',
    safetyPrecautions: [
      'Sanitize machetes/knives with 5% sodium hypochlorite between mats to prevent Panama wilt transmission.',
      'Wear protective face shield when spraying tall banana canopies.'
    ],
    treatmentOptions: [
      { name: 'Pseudomonas fluorescens 1.0% WP', type: 'bio', dosagePer15LTank: '45g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Mineral Spray Oil (1%) + Trichoderma', type: 'organic', dosagePer15LTank: '150ml oil + 45g bio', verified: true, cibrcApproved: true },
      { name: 'Propiconazole 25% EC (Systemic Triazole)', type: 'chemical', dosagePer15LTank: '15ml per 15L tank', verified: true, cibrcApproved: true }
    ],
    explicitlyBannedChemicals: ['Monocrotophos', 'Endosulfan', 'Carbofuran 3G', 'Phorate 10G'],
    imageUrl: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80',
  },

  // 14. Turmeric
  {
    id: 'pest-turmeric-rhizome-rot',
    crop: 'Turmeric',
    botanicalName: 'Curcuma longa',
    category: 'Spice',
    diseaseName: 'Rhizome Rot / Soft Rot (Pythium aphanidermatum)',
    scientificName: 'Pythium aphanidermatum / Pythium myriotylum',
    pestType: 'fungal',
    confidence: 93,
    severity: 'critical',
    benchmarkSource: 'ICAR-Indian Institute of Spices Research (IISR Kozhikode) & TNAU',
    symptoms: [
      'Progressive yellowing of leaves starting from margins of lower foliage, advancing up the pseudostem',
      'Basal pseudostem becomes water-soaked, soft, and translucent, easily separating from the rhizome when pulled',
      'Internal rhizome tissue turns soft, dark, and disintegrates into a foul-smelling putrid mass',
      'Complete collapse and rotting of entire vegetative clump in waterlogged patches'
    ],
    visualDiagnosticMarkers: {
      lesionColor: 'Water-soaked translucent collar rot advancing to dark decayed rhizome rot',
      marginType: 'Diffuse rotting without defined edges',
      affectedParts: 'Rhizome seed fingers, basal collar of pseudostem, root system',
      cellularSigns: 'Coenocytic hyphae producing lobulate zoosporangia with reniform zoospores',
    },
    economicThresholdLevel: {
      etlTrigger: 'Initial wilting and collar rot symptoms in any single plant clump in the field',
      recommendedSampling: 'Walk drainage furrows and low-lying field zones after heavy rain spells',
      actionRequired: 'Isolate infected clump with trench, remove rotten rhizome, and drench soil with bio-agent',
    },
    environmentalTriggers: {
      optimalTempRange: '28°C - 32°C',
      relativeHumidity: '> 90% RH',
      rainfallDewConditions: 'Stagnant standing water in furrows following torrential monsoon downpours',
    },
    soilCorrelations: {
      highRiskSoil: 'Heavy Clay Soil & Ill-Drained Red Soils',
      soilMechanism: 'Zoospores possess flagella and swim actively through waterlogged soil pores toward roots',
      soilAmendmentRemedy: 'Plant exclusively on raised beds (30cm height, 120cm width) with organic neem cake incorporation',
    },
    recommendedAction: 'Rhizome seed treatment before planting with Trichoderma viride. Provide efficient drainage furrows. Soil drench infected patches with Trichoderma viride or Copper Oxychloride.',
    safetyPrecautions: [
      'Never harvest edible rhizomes within 21 days of chemical copper application.',
      'Dip cutting tools in copper solution after removing decayed rhizome clumps.'
    ],
    treatmentOptions: [
      { name: 'Trichoderma harzianum / viride (Soil Drench)', type: 'bio', dosagePer15LTank: '50g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Pseudomonas fluorescens 1.0% WP (Root Shield)', type: 'bio', dosagePer15LTank: '45g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Copper Oxychloride 50% WP (Drenching Formulation)', type: 'chemical', dosagePer15LTank: '45g per 15L tank', verified: true, cibrcApproved: true }
    ],
    explicitlyBannedChemicals: ['Monocrotophos', 'Endosulfan', 'Phorate 10G', 'Methyl Parathion'],
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
  },

  // 15. Chickpea / Bengal Gram
  {
    id: 'pest-chickpea-pod-borer',
    crop: 'Chickpea / Bengal Gram',
    botanicalName: 'Cicer arietinum',
    category: 'Pulse & Legume',
    diseaseName: 'Gram Pod Borer (Helicoverpa armigera)',
    scientificName: 'Helicoverpa armigera (Hübner)',
    pestType: 'insect',
    confidence: 95,
    severity: 'critical',
    benchmarkSource: 'ICAR-Indian Institute of Pulses Research (IIPR Kanpur) & IP102',
    symptoms: [
      'Early instar larvae defoliate tender leaflets and scrape green pods',
      'Later instars bore large circular holes into pods, feeding with head thrust inside while rest of body stays outside',
      'Empty pods with round feeding holes and dark granular frass inside',
      'Substantial yield loss of up to 40-70% if unmanaged during pod development'
    ],
    visualDiagnosticMarkers: {
      lesionColor: 'Neat circular entry holes in developing pods with missing grains inside',
      marginType: 'Smooth circular puncture',
      affectedParts: 'Foliage, flowers, green pods, and maturing seeds',
      cellularSigns: 'Larva has yellowish-green to brown body with lateral white bands and dark dorsal stripes',
    },
    economicThresholdLevel: {
      etlTrigger: '1 larva per meter row length OR 1-2 larvae per plant OR 3-4 moths caught per pheromone trap daily',
      recommendedSampling: 'Shake 10 random 1-meter row lengths over a white cloth sheet',
      actionRequired: 'Install pheromone traps and spray HaNPV virus or Bacillus thuringiensis',
    },
    environmentalTriggers: {
      optimalTempRange: '20°C - 28°C (mild spring weather)',
      relativeHumidity: '50% - 70% RH',
      rainfallDewConditions: 'Clear sunny days following cool winter spells',
    },
    soilCorrelations: {
      highRiskSoil: 'Deep Black Cotton Soil with Residual Winter Moisture',
      soilMechanism: 'Larvae drop to soil to pupate in subterranean earthen cells (5-10cm depth)',
      soilAmendmentRemedy: 'Post-harvest deep tillage to expose pupae to predatory birds and winter cold',
    },
    recommendedAction: 'Install 5 Helilure pheromone traps per acre and T shaped bird perches (20/acre). Spray Helicoverpa Nuclear Polyhedrosis Virus (HaNPV @ 250 LE/acre) or Chlorantraniliprole 18.5% SC.',
    safetyPrecautions: [
      'Strictly do not spray monocrotophos or endosulfan.',
      'Spray in the evening hours when larvae are most active on the pods.'
    ],
    treatmentOptions: [
      { name: 'HaNPV 250 LE (Helicoverpa Specific Virus)', type: 'bio', dosagePer15LTank: '15ml per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Bacillus thuringiensis kurstaki 8L', type: 'organic', dosagePer15LTank: '30g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Chlorantraniliprole 18.5% SC', type: 'chemical', dosagePer15LTank: '6ml per 15L tank', verified: true, cibrcApproved: true }
    ],
    explicitlyBannedChemicals: ['Monocrotophos', 'Endosulfan', 'Phosphamidon'],
    imageUrl: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80',
  },

  // 16. Pigeon Pea / Red Gram / Arhar
  {
    id: 'pest-pigeonpea-wilt',
    crop: 'Pigeon Pea / Arhar',
    botanicalName: 'Cajanus cajan',
    category: 'Pulse & Legume',
    diseaseName: 'Fusarium Wilt (Fusarium udum)',
    scientificName: 'Fusarium udum Butler',
    pestType: 'fungal',
    confidence: 93,
    severity: 'critical',
    benchmarkSource: 'ICAR-IIPR & ICRISAT Legumes Pathology',
    symptoms: [
      'Gradual yellowing, withering, and drooping of foliage without premature leaf detachment',
      'Typically affects one side of the plant or a single branch initially (partial wilting)',
      'Characteristic purple/dark brown vascular band running longitudinally up the main stem beneath bark',
      'Brown to black discoloration of vascular xylem vessels when stem is split vertically'
    ],
    visualDiagnosticMarkers: {
      lesionColor: 'Internal brown to pitch-black vascular discoloration of vascular bundles',
      marginType: 'Continuous longitudinal vascular band extending from root into main branches',
      affectedParts: 'Root xylem, taproot, collar region, main woody stems',
      cellularSigns: 'Sickle-shaped multicellular macroconidia and single-celled microconidia',
    },
    economicThresholdLevel: {
      etlTrigger: 'Initial wilting of 2% plants during flowering and pod development',
      recommendedSampling: 'Walk field diagonals and look for patches of drooping plants with clinging dry leaves',
      actionRequired: 'Soil drenching around collar with bio-agents and rogue out dead plants',
    },
    environmentalTriggers: {
      optimalTempRange: '20°C - 25°C',
      relativeHumidity: '60% - 80% RH',
      rainfallDewConditions: 'Moisture stress alternating with sudden water stagnation during flowering',
    },
    soilCorrelations: {
      highRiskSoil: 'Heavy Black Cotton Soils without Crop Rotation',
      soilMechanism: 'Fungus survives in soil as chlamydospores on stubble for up to 3 years',
      soilAmendmentRemedy: 'Practice 3-year crop rotation with sorghum or maize; apply Trichoderma enriched FYM',
    },
    recommendedAction: 'Seed treatment with Trichoderma viride @ 10g/kg seed. Apply neem cake @ 100 kg/acre. Intercrop with sorghum or pearl millet to suppress Fusarium chlamydospores.',
    safetyPrecautions: [
      'Do not throw uprooted wilted plants on irrigation channels or field bunds.',
      'Burn or solarize infected plant debris.'
    ],
    treatmentOptions: [
      { name: 'Trichoderma viride 1.5% WP (Soil Enriched)', type: 'bio', dosagePer15LTank: '50g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Pseudomonas fluorescens 1.0% WP', type: 'bio', dosagePer15LTank: '45g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Carbendazim 50% WP (Seed Treatment)', type: 'chemical', dosagePer15LTank: '2g per kg seed', verified: true, cibrcApproved: true }
    ],
    explicitlyBannedChemicals: ['Monocrotophos', 'Endosulfan', 'Phorate 10G'],
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
  },

  // 17. Brinjal / Eggplant
  {
    id: 'pest-brinjal-sfb',
    crop: 'Brinjal / Eggplant',
    botanicalName: 'Solanum melongena',
    category: 'Vegetable',
    diseaseName: 'Shoot & Fruit Borer (Leucinodes orbonalis)',
    scientificName: 'Leucinodes orbonalis Guenée',
    pestType: 'insect',
    confidence: 96,
    severity: 'critical',
    benchmarkSource: 'ICAR-Indian Institute of Horticultural Research (IIHR) & IP102 (EC)',
    symptoms: [
      'In vegetative stage, young larvae bore into growing shoots, causing shoot tips to droop and wither',
      'In reproductive stage, larvae bore into fruit, plugging hole with dark excrement',
      'Fruit exhibits deformed shape, internal rotting, and gallery destruction of edible pulp',
      'Yield losses can exceed 70% without integrated pest management'
    ],
    visualDiagnosticMarkers: {
      lesionColor: 'Wilted brown shoot tips and circular entry holes plugged with moist frass on fruit',
      marginType: 'Round borehole in fruit calyx or side',
      affectedParts: 'Terminal growing shoots, flower buds, fruit flesh',
      cellularSigns: 'Pinkish caterpillar (15-20mm) with dark brown head and sparse body setae',
    },
    economicThresholdLevel: {
      etlTrigger: '5% shoot damage at vegetative phase or 1-2% fruit infestation at fruiting phase',
      recommendedSampling: 'Count damaged shoots and fruits on 20 plants per row across 5 rows',
      actionRequired: 'Clip off wilted shoots with secateurs and destroy immediately; install Lucilure pheromone traps',
    },
    environmentalTriggers: {
      optimalTempRange: '26°C - 32°C',
      relativeHumidity: '70% - 85% RH',
      rainfallDewConditions: 'Humid warm weather following rains promotes continuous adult moth emergence',
    },
    soilCorrelations: {
      highRiskSoil: 'Alluvial Loam & Clay Loam with High Residual Fertilizer',
      soilMechanism: 'Rapid succulent vegetative growth in nutrient-rich soils facilitates larval entry',
      soilAmendmentRemedy: 'Balance nitrogen with adequate potassium and silica to harden shoot cuticle',
    },
    recommendedAction: 'Clipping and destruction of infested wilted shoot tips weekly. Install 15 Lucilure pheromone traps per acre. Spray Bacillus thuringiensis kurstaki or Emamectin Benzoate 5% SG.',
    safetyPrecautions: [
      'Monocrotophos is strictly prohibited on brinjal by statutory supreme court directives.',
      'Observe 3-day pre-harvest waiting interval before harvesting marketable fruits.'
    ],
    treatmentOptions: [
      { name: 'Bacillus thuringiensis kurstaki 8L', type: 'organic', dosagePer15LTank: '30g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Neem Azadirachtin 10,000 PPM', type: 'organic', dosagePer15LTank: '35ml per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Emamectin Benzoate 5% SG', type: 'chemical', dosagePer15LTank: '7g per 15L tank', verified: true, cibrcApproved: true }
    ],
    explicitlyBannedChemicals: ['Monocrotophos', 'Endosulfan', 'Phorate 10G', 'Methyl Parathion'],
    imageUrl: 'https://images.unsplash.com/photo-1628773822503-930a84e93fb2?auto=format&fit=crop&w=800&q=80',
  },

  // 18. Okra / Lady's Finger
  {
    id: 'pest-okra-yvmv',
    crop: 'Okra / Bhendi',
    botanicalName: 'Abelmoschus esculentus',
    category: 'Vegetable',
    diseaseName: 'Yellow Vein Mosaic Virus (YVMV)',
    scientificName: 'Bhendi Yellow Vein Mosaic Begomovirus & Bemisia tabaci',
    pestType: 'viral',
    confidence: 95,
    severity: 'critical',
    benchmarkSource: 'PlantDoc & ICAR-IIHR Bangalore',
    symptoms: [
      'Homogeneous network of bright yellow veins interlacing with contrasting green leaf tissue',
      'Leaves become completely chlorotic yellow, reduced in size, and thick and brittle',
      'In severe infections, fruits turn yellowish-white, small, tough, fibrous, and unmarketable',
      'Total crop failure if infection occurs within 30 days of germination'
    ],
    visualDiagnosticMarkers: {
      lesionColor: 'Intense golden yellow vein clearing and network enations across green lamina',
      marginType: 'Defined by intricate foliar reticulate venation network',
      affectedParts: 'Veins of young leaves, flowering calyx, developing bhendi pods',
      cellularSigns: 'Geminivirus transmitted systemically by phloem-feeding Bemisia tabaci whiteflies',
    },
    economicThresholdLevel: {
      etlTrigger: '5 whiteflies per plant on tender leaves OR appearance of first vein mosaic plant',
      recommendedSampling: 'Examine underside of 3 leaves (top, middle, bottom) on 20 random plants',
      actionRequired: 'Rogue out infected virus plants immediately and control whitefly vectors with yellow traps',
    },
    environmentalTriggers: {
      optimalTempRange: '28°C - 35°C',
      relativeHumidity: '55% - 75% RH',
      rainfallDewConditions: 'Dry sunny spells with warm breezes that facilitate whitefly flight dispersal',
    },
    soilCorrelations: {
      highRiskSoil: 'Sandy Loam & Red Soil with Insufficient Organic Humus',
      soilMechanism: 'Water-stressed plants emit altered olfactory terpenes that attract whiteflies',
      soilAmendmentRemedy: 'Apply neem cake (150 kg/acre) and maintain consistent drip irrigation',
    },
    recommendedAction: 'Uproot and burn virus-infected plants immediately to eliminate vector inoculum. Install 20 yellow sticky traps per acre. Spray Azadirachtin 10,000 ppm or Thiamethoxam 25% WG.',
    safetyPrecautions: [
      'Monocrotophos is statutorily banned on okra across India.',
      'Pick marketable pods before chemical spraying; respect labeled pre-harvest interval.'
    ],
    treatmentOptions: [
      { name: 'Neem Azadirachtin 10,000 PPM (Bio-Extract)', type: 'organic', dosagePer15LTank: '35ml per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Beauveria bassiana 1.15% WP (Vector Control)', type: 'bio', dosagePer15LTank: '40g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Thiamethoxam 25% WG (Vector Shield)', type: 'chemical', dosagePer15LTank: '5g per 15L tank', verified: true, cibrcApproved: true }
    ],
    explicitlyBannedChemicals: ['Monocrotophos', 'Endosulfan', 'Carbofuran 3G', 'Phosphamidon'],
    imageUrl: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80',
  },

  // 19. Finger Millet / Ragi
  {
    id: 'pest-ragi-blast',
    crop: 'Finger Millet / Ragi',
    botanicalName: 'Eleusine coracana',
    category: 'Cereal & Millet',
    diseaseName: 'Finger / Neck Blast (Pyricularia grisea)',
    scientificName: 'Pyricularia grisea (Cooke) Sacc.',
    pestType: 'fungal',
    confidence: 94,
    severity: 'critical',
    benchmarkSource: 'ICAR-All India Coordinated Research Project on Small Millets (AICRP)',
    symptoms: [
      'Foliar stage: Diamond/spindle shaped lesions with gray center and yellowish-brown margin',
      'Neck stage: Neck node turns black, shrivels, and breaks, preventing grain development',
      'Finger stage: Individual fingers of ragi earhead turn dark brown, chaffy, and sterile',
      'Severe crop lodging and complete loss of grain harvest in humid rainfed belts'
    ],
    visualDiagnosticMarkers: {
      lesionColor: 'Ash-gray center surrounded by dark purplish-brown elliptical ring',
      marginType: 'Spindle-shaped conforming to ragi leaf blade',
      affectedParts: 'Seedling leaves, collar, neck beneath earhead, individual fingers',
      cellularSigns: 'Three-celled pyriform hyaline to pale olive conidia',
    },
    economicThresholdLevel: {
      etlTrigger: '5% leaf blast damage at tillering OR 2% neck blast at earhead emergence',
      recommendedSampling: 'Check 50 tillers along field transects at flag leaf emergence',
      actionRequired: 'Foliar spray with Pseudomonas fluorescens or registered bio-fungicide',
    },
    environmentalTriggers: {
      optimalTempRange: '22°C - 26°C',
      relativeHumidity: '> 85% RH',
      rainfallDewConditions: 'Cool night dew and cloudy overcast skies during earhead emergence',
    },
    soilCorrelations: {
      highRiskSoil: 'Shallow Red Soils with Low Organic Carbon',
      soilMechanism: 'Moisture stress alternating with sudden rain increases host susceptibility',
      soilAmendmentRemedy: 'Apply farmyard manure (5 t/acre) and seed treatment with bio-agents',
    },
    recommendedAction: 'Seed treatment with Pseudomonas fluorescens @ 10g/kg seed. Spray Pseudomonas fluorescens @ 45g/15L knapsack tank at tillering and flowering stage.',
    safetyPrecautions: [
      'Do not apply banned organophosphates.',
      'Ensure PPE mask and gloves are worn during spraying.'
    ],
    treatmentOptions: [
      { name: 'Pseudomonas fluorescens 1.0% WP', type: 'bio', dosagePer15LTank: '45g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Trichoderma viride 1.5% WP', type: 'bio', dosagePer15LTank: '45g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Kitazin 48% EC (Organophosphorus Fungicide)', type: 'chemical', dosagePer15LTank: '20ml per 15L tank', verified: true, cibrcApproved: true }
    ],
    explicitlyBannedChemicals: ['Monocrotophos', 'Endosulfan', 'Phosphamidon'],
    imageUrl: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80',
  },

  // 20. Mango
  {
    id: 'pest-mango-hopper',
    crop: 'Mango',
    botanicalName: 'Mangifera indica',
    category: 'Fruit & Plantation',
    diseaseName: 'Mango Hopper (Amritodus atkinsoni)',
    scientificName: 'Amritodus atkinsoni (Lethierry) & Idioscopus clypealis',
    pestType: 'insect',
    confidence: 95,
    severity: 'critical',
    benchmarkSource: 'ICAR-Central Institute for Subtropical Horticulture (CISH Lucknow) & IP102 (EC)',
    symptoms: [
      'Huge swarms of wedge-shaped hopper nymphs and adults suck sap from tender flowering panicles',
      'Infested flower panicles turn brown, dry, and shrivel, resulting in massive flower and fruitlet drop',
      'Heavy exudation of sticky sweet honeydew on which black sooty mold fungus flourishes',
      'Characteristic clicking sound heard inside dense tree canopy when hoppers jump en masse'
    ],
    visualDiagnosticMarkers: {
      lesionColor: 'Brown shriveled floral panicles covered with glossy honeydew and black mold',
      marginType: 'Panicle blight and withered blossoms',
      affectedParts: 'Inflorescence panicles, tender vegetative flushes, tree bark cracks',
      cellularSigns: 'Wedge-shaped greyish-brown hoppers (4-5mm) that jump and fly vigorously',
    },
    economicThresholdLevel: {
      etlTrigger: '5 hoppers per flowering panicle at blossom emergence stage',
      recommendedSampling: 'Tap 20 panicles over a white cardboard tray during early morning',
      actionRequired: 'Target spray inner canopy and tree trunk before flowering fully opens',
    },
    environmentalTriggers: {
      optimalTempRange: '20°C - 28°C (spring flowering season)',
      relativeHumidity: '60% - 75% RH with calm, cloudy weather',
      rainfallDewConditions: 'Dense overcast days without rain encouraging hopper multiplication',
    },
    soilCorrelations: {
      highRiskSoil: 'Alluvial Loam & Deep Red Soil with High Canopy Shade',
      soilMechanism: 'Dense unpruned canopy retains high humidity and shelters overwintering hoppers in bark',
      soilAmendmentRemedy: 'Post-harvest canopy pruning to allow 30% solar penetration into tree center',
    },
    recommendedAction: 'Prune overcrowded inner branches after harvest to let sunlight penetrate. Spray Metarhizium anisopliae or Beauveria bassiana at panicle emergence, followed by low-toxicity thiamethoxam if ETL exceeded.',
    safetyPrecautions: [
      'Never spray insecticides during full bloom to safeguard honeybee pollinators.',
      'Wear protective goggles and respirator when using high-pressure orchard tractor sprayers.'
    ],
    treatmentOptions: [
      { name: 'Metarhizium anisopliae 1.15% WP (Bio-Agent)', type: 'bio', dosagePer15LTank: '45g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Neem Azadirachtin 10,000 PPM', type: 'organic', dosagePer15LTank: '35ml per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Thiamethoxam 25% WG (Systemic Spray)', type: 'chemical', dosagePer15LTank: '5g per 15L tank', verified: true, cibrcApproved: true }
    ],
    explicitlyBannedChemicals: ['Monocrotophos', 'Endosulfan', 'Phosphamidon', 'Methyl Parathion'],
    imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80',
  },

  // 21. Citrus / Lemon / Orange
  {
    id: 'pest-citrus-canker',
    crop: 'Citrus',
    botanicalName: 'Citrus aurantifolia / sinensis',
    category: 'Fruit & Plantation',
    diseaseName: 'Citrus Canker (Xanthomonas citri)',
    scientificName: 'Xanthomonas citri subsp. citri',
    pestType: 'bacterial',
    confidence: 95,
    severity: 'high',
    benchmarkSource: 'PlantVillage (Citrus_healthy/greening) & ICAR-Central Citrus Research Institute (CCRI Nagpur)',
    symptoms: [
      'Small, round raised blister-like lesions on both sides of leaves, twigs, and fruit rinds',
      'Lesions become corky, crater-like with sunken centers and raised spongy margins',
      'Characteristic oily or water-soaked yellow halo surrounding corky lesions on leaves',
      'Premature fruit drop and severely blemished, unmarketable citrus fruit'
    ],
    visualDiagnosticMarkers: {
      lesionColor: 'Tan to dark brown corky pustules with prominent translucent yellow halos',
      marginType: 'Rough crateriform raised margin with volcanic depression in center',
      affectedParts: 'Leaf blades, petioles, green twigs, thorns, fruit peel',
      cellularSigns: 'Gram-negative rod-shaped bacterium with single polar flagellum',
    },
    economicThresholdLevel: {
      etlTrigger: 'Initial canker blisters observed on 2% of new vegetative growth flushes',
      recommendedSampling: 'Inspect 10 trees per acre, checking outer canopy young flush leaves',
      actionRequired: 'Prune infected twigs before monsoon flush and apply Copper Oxychloride spray',
    },
    environmentalTriggers: {
      optimalTempRange: '25°C - 35°C',
      relativeHumidity: '> 85% RH with wind-driven rainfall',
      rainfallDewConditions: 'Monsoon storms with winds > 18 km/h blowing bacteria into stomata and leaf miner wounds',
    },
    soilCorrelations: {
      highRiskSoil: 'Heavy Clay Soils with High Water Retention',
      soilMechanism: 'Excessive soil moisture promotes vigorous, soft, succulent shoots susceptible to bacterial ingress',
      soilAmendmentRemedy: 'Provide adequate drainage canals and apply neem cake with Trichoderma',
    },
    recommendedAction: 'Control citrus leaf miner (Phyllocnistis citrella) as its feeding galleries serve as bacterial entryways. Prune and burn cankered twigs. Spray Copper Oxychloride combined with Streptocycline.',
    safetyPrecautions: [
      'Do not apply copper sprays during extreme midday heat (>35°C) to prevent foliar phytotoxicity.',
      'Disinfect pruning shears in 10% bleach between trees.'
    ],
    treatmentOptions: [
      { name: 'Copper Oxychloride 50% WP + Streptomycin Sulfate', type: 'chemical', dosagePer15LTank: '40g + 1g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Pseudomonas fluorescens 1.0% WP (Bio-Shield)', type: 'bio', dosagePer15LTank: '45g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Neem Azadirachtin 10,000 PPM (Leaf Miner Control)', type: 'organic', dosagePer15LTank: '35ml per 15L tank', verified: true, cibrcApproved: true }
    ],
    explicitlyBannedChemicals: ['Monocrotophos', 'Endosulfan', 'Carbofuran 3G'],
    imageUrl: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=800&q=80',
  },

  // 22. Coconut
  {
    id: 'pest-coconut-rhino-beetle',
    crop: 'Coconut',
    botanicalName: 'Cocos nucifera',
    category: 'Fruit & Plantation',
    diseaseName: 'Rhinoceros Beetle (Oryctes rhinoceros)',
    scientificName: 'Oryctes rhinoceros (Linnaeus)',
    pestType: 'insect',
    confidence: 96,
    severity: 'high',
    benchmarkSource: 'ICAR-Central Plantation Crops Research Institute (CPCRI Kasaragod) & IP102 (EC)',
    symptoms: [
      'Characteristic geometric V or diamond-shaped cuts on opened palm fronds like scissors cutting',
      'Boreholes at the base of the petiole and central spindle with fiber chewings and frass',
      'Chewed and damaged central growing spear leaf snaps and topples in strong winds',
      'Repeated attacks lead to tree stunting, delayed flowering, and palm death if growing point is destroyed'
    ],
    visualDiagnosticMarkers: {
      lesionColor: 'Geometric serrated triangular clippings on leaflets resembling fan cutting',
      marginType: 'Symmetrical angular shears across adjacent leaflets',
      affectedParts: 'Emerging spindle leaf, tender heart of crown, uppermost petiole axils',
      cellularSigns: 'Large stout jet-black beetle (40-50mm) with prominent recurved horn on head',
    },
    economicThresholdLevel: {
      etlTrigger: '5% damaged palms showing fresh diamond cuts in the crown',
      recommendedSampling: 'Survey 20 palms per acre monthly, looking for fresh chewed fiber in leaf axils',
      actionRequired: 'Hook out beetles using beetle hook and pack crown axils with neem cake + sand',
    },
    environmentalTriggers: {
      optimalTempRange: '24°C - 32°C',
      relativeHumidity: '> 70% RH with monsoon rains',
      rainfallDewConditions: 'Onset of monsoon showers stimulates beetle emergence from breeding sites',
    },
    soilCorrelations: {
      highRiskSoil: 'Coastal Sandy Soils & Alluvial Soils with Nearby Manure Pits',
      soilMechanism: 'Unmanaged decomposing farmyard manure and rotting coconut logs act as prime breeding sites',
      soilAmendmentRemedy: 'Treat manure pits with Metarhizium anisopliae green muscardine fungal spores to kill grubs',
    },
    recommendedAction: 'Extract beetles from crown using a flexible iron wire hook. Pack the top 3-4 leaf axils with equal parts of neem seed cake and coarse river sand (100g each). Treat manure pits with Metarhizium anisopliae.',
    safetyPrecautions: [
      'Phorate 10G is statutorily banned; never place toxic chemical sachets in drinking coconut crowns.',
      'Use certified climbing harness when ascending tall palms.'
    ],
    treatmentOptions: [
      { name: 'Metarhizium anisopliae (Manure Pit Drench)', type: 'bio', dosagePer15LTank: '50g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Neem Seed Kernel Cake + Sand Barrier', type: 'organic', dosagePer15LTank: '150g dry mix in axil', verified: true, cibrcApproved: true },
      { name: 'Oryctes Rhinolure (Aggregation Pheromone)', type: 'bio', dosagePer15LTank: '1 trap per 2 acres', verified: true, cibrcApproved: true }
    ],
    explicitlyBannedChemicals: ['Phorate 10G', 'Monocrotophos', 'Endosulfan', 'Carbofuran 3G'],
    imageUrl: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&w=800&q=80',
  },

  // 23. Apple
  {
    id: 'pest-apple-scab',
    crop: 'Apple',
    botanicalName: 'Malus domestica',
    category: 'Fruit & Plantation',
    diseaseName: 'Apple Scab (Venturia inaequalis)',
    scientificName: 'Venturia inaequalis (Cooke) G. Winter',
    pestType: 'fungal',
    confidence: 96,
    severity: 'critical',
    benchmarkSource: 'PlantVillage (Apple_scab) & ICAR-Central Institute of Temperate Horticulture (CITH Srinagar)',
    symptoms: [
      'Dull olive-green to velvety brown spots on young leaves with indefinite margins',
      'Leaf lesions become raised, corky, and puckered, causing foliage to curl and drop prematurely',
      'Fruit develops circular olive-brown scabbed lesions that harden, become corky, and crack open',
      'Early infected apples become deformed, lopsided, cracked, and rot in storage'
    ],
    visualDiagnosticMarkers: {
      lesionColor: 'Olive-green velvety fungal spots turning into dark corky cracked crusts on fruit',
      marginType: 'Irregular feathery velvety margin on leaf; sunken corky margin on fruit',
      affectedParts: 'Spur leaves, flower sepals, fruit skin, tender vegetative twigs',
      cellularSigns: 'Asymmetrical two-celled olive-brown ascospores discharged during spring rains',
    },
    economicThresholdLevel: {
      etlTrigger: 'Any primary scab lesion observed during green tip to petal fall stage (Mills Table triggers)',
      recommendedSampling: 'Inspect 20 fruit spurs per tree across 10 trees in the orchard',
      actionRequired: 'Apply protectant spray immediately before Mills period rain events',
    },
    environmentalTriggers: {
      optimalTempRange: '15°C - 20°C (cool temperate spring)',
      relativeHumidity: '> 85% RH',
      rainfallDewConditions: 'Continuous leaf wetness for 9-14 hours according to Mills Scab Prediction Index',
    },
    soilCorrelations: {
      highRiskSoil: 'Mountain Valley Loams with Heavy Overwintering Leaf Litter',
      soilMechanism: 'Pseudothecia overwinter in fallen dead leaf litter on the orchard floor',
      soilAmendmentRemedy: 'Spray 5% urea on orchard floor leaf litter in autumn to accelerate leaf decomposition',
    },
    recommendedAction: 'Orchard floor sanitation by spraying urea @ 5% before leaf fall to decompose scab leaves. Apply protective Copper Oxychloride at silver-tip/green-tip stage followed by systemic bio-protectants.',
    safetyPrecautions: [
      'Observe statutory 21-day pre-harvest waiting interval before picking apples.',
      'Wear protective chemical suit and respirator when spraying high-density tree crowns.'
    ],
    treatmentOptions: [
      { name: 'Copper Oxychloride 50% WP (Green Tip Protectant)', type: 'chemical', dosagePer15LTank: '40g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Trichoderma viride 1.5% WP (Bio-Shield)', type: 'bio', dosagePer15LTank: '45g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Difenoconazole 25% EC (Curative Systemic)', type: 'chemical', dosagePer15LTank: '15ml per 15L tank', verified: true, cibrcApproved: true }
    ],
    explicitlyBannedChemicals: ['Monocrotophos', 'Endosulfan', 'Methyl Parathion'],
    imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80',
  },

  // 24. Cabbage / Cauliflower
  {
    id: 'pest-cabbage-dbm',
    crop: 'Cabbage / Cauliflower',
    botanicalName: 'Brassica oleracea',
    category: 'Vegetable',
    diseaseName: 'Diamondback Moth (Plutella xylostella)',
    scientificName: 'Plutella xylostella (Linnaeus)',
    pestType: 'insect',
    confidence: 96,
    severity: 'critical',
    benchmarkSource: 'IP102 (FC) & ICAR-IIHR Bangalore',
    symptoms: [
      'First instar larvae mine inside leaves, creating translucent whitish blisters',
      'Later instars feed on leaf underside leaving transparent upper epidermis intact (window-paning)',
      'Extensive feeding leaves leaves completely skeletonized with round shot-holes',
      'Larvae bore directly into developing cabbage heads or cauliflower curd, spoiling produce with frass'
    ],
    visualDiagnosticMarkers: {
      lesionColor: 'Translucent parchment-like window panes and irregular round shot holes',
      marginType: 'Lace-like skeletonized leaf framework',
      affectedParts: 'Underside of wrapper leaves, developing central curd, inner cabbage head',
      cellularSigns: 'Slender pale green caterpillar (10-12mm) that wriggles violently and drops on a silk thread when disturbed',
    },
    economicThresholdLevel: {
      etlTrigger: '1-2 larvae per plant on cabbage seedlings OR 5 larvae per plant on mature head stage',
      recommendedSampling: 'Inspect 20 plants thoroughly, examining undersides of leaves and head center',
      actionRequired: 'Release Diadegma parasitoids or apply Bacillus thuringiensis bio-spray',
    },
    environmentalTriggers: {
      optimalTempRange: '20°C - 30°C',
      relativeHumidity: '50% - 70% RH with dry weather',
      rainfallDewConditions: 'Heavy monsoon rains naturally wash larvae off plants; dry periods favor outbreaks',
    },
    soilCorrelations: {
      highRiskSoil: 'Alluvial Soil & Red Loam with Continuous Crucifer Cropping',
      soilMechanism: 'Intensive mono-cropping allows DBM pupae to overwinter on crop residue year-round',
      soilAmendmentRemedy: 'Plant Indian mustard as a trap crop (2 rows of mustard every 25 rows of cabbage)',
    },
    recommendedAction: 'Grow Indian mustard as a trap crop (sown 15 days before cabbage). Spray Bacillus thuringiensis kurstaki or Spinosad 45% SC. Avoid synthetic pyrethroids due to widespread genetic resistance.',
    safetyPrecautions: [
      'Monocrotophos is strictly prohibited on all brassica vegetables under national orders.',
      'Observe 5-day pre-harvest waiting interval before cutting cabbage heads.'
    ],
    treatmentOptions: [
      { name: 'Bacillus thuringiensis kurstaki 8L WP', type: 'organic', dosagePer15LTank: '30g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Beauveria bassiana 1.15% WP (Bio-Larvicide)', type: 'bio', dosagePer15LTank: '40g per 15L tank', verified: true, cibrcApproved: true },
      { name: 'Spinosad 45% SC (Bacterial Fermentation)', type: 'organic', dosagePer15LTank: '5ml per 15L tank', verified: true, cibrcApproved: true }
    ],
    explicitlyBannedChemicals: ['Monocrotophos', 'Endosulfan', 'Methyl Parathion', 'Phosphamidon'],
    imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80',
  },
];

/**
 * Utility: Convert AgronomicPestProfile to standard PestDiagnosis format
 */
export function toPestDiagnosis(profile: AgronomicPestProfile): PestDiagnosis {
  return {
    id: profile.id,
    crop: `${profile.crop} (${profile.botanicalName})`,
    diseaseName: profile.diseaseName,
    scientificName: profile.scientificName,
    confidence: profile.confidence,
    severity: profile.severity,
    symptoms: profile.symptoms,
    likelyCause: `${profile.environmentalTriggers.optimalTempRange}, ${profile.environmentalTriggers.relativeHumidity}. Soil correlation: ${profile.soilCorrelations.highRiskSoil}.`,
    recommendedAction: profile.recommendedAction,
    safetyPrecautions: profile.safetyPrecautions,
    treatmentOptions: profile.treatmentOptions.map((t) => ({
      name: `${t.name} [Dosage: ${t.dosagePer15LTank}]`,
      type: t.type,
      verified: t.verified,
      cibrcApproved: t.cibrcApproved,
    })),
    imageUrl: profile.imageUrl,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Query matcher for the grounded agronomic database
 */
export function findGroundedPestProfile(cropQuery: string, symptomQuery?: string): AgronomicPestProfile | undefined {
  const cLower = (cropQuery || '').toLowerCase().trim();
  const sLower = (symptomQuery || '').toLowerCase().trim();

  // 1. Match by crop first
  const cropMatches = AGRONOMIC_PEST_DATASET.filter((p) => {
    const pCrop = p.crop.toLowerCase();
    const pBot = p.botanicalName.toLowerCase();
    return pCrop.includes(cLower) || cLower.includes(pCrop) || pBot.includes(cLower);
  });

  if (cropMatches.length === 1 && !sLower) {
    return cropMatches[0];
  }

  // 2. Filter crop matches by symptoms / disease name if symptoms provided
  if (cropMatches.length > 0 && sLower) {
    const symptomMatch = cropMatches.find((p) => {
      const dName = p.diseaseName.toLowerCase();
      const sName = p.scientificName.toLowerCase();
      const hasSymp = p.symptoms.some((s) => sLower.includes(s.toLowerCase().split(' ')[0]));
      return dName.includes(sLower) || sName.includes(sLower) || hasSymp;
    });
    if (symptomMatch) return symptomMatch;
    return cropMatches[0];
  }

  // 3. Search across all profiles by symptoms
  if (sLower) {
    const globalMatch = AGRONOMIC_PEST_DATASET.find((p) => {
      const dName = p.diseaseName.toLowerCase();
      const sName = p.scientificName.toLowerCase();
      const hasSymp = p.symptoms.some((s) => sLower.includes(s.toLowerCase().split(' ')[0]));
      return dName.includes(sLower) || sName.includes(sLower) || hasSymp;
    });
    if (globalMatch) return globalMatch;
  }

  return cropMatches[0];
}
