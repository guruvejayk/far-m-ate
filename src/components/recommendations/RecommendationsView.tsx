import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Calculator,
  Droplets,
  Clock,
  AlertTriangle,
  ArrowRight,
  Filter,
  Check,
  Info,
  BookOpen,
  Wheat,
  Wind,
  Search,
  Shield,
  Layers,
  ChevronDown,
  ChevronUp,
  FlaskConical,
  Eye,
  MessageSquareQuote,
  Table,
} from 'lucide-react';
import { ProductRecommendation, LanguageCode, PestDiagnosis } from '../../types';
import {
  COMMON_SPRAYER_TANKS,
  VERIFIED_RECOMMENDATION_DATASET,
  calculateTankDosage,
  findVerifiedInputs,
  VerifiedAgrochemicalInput,
  TankCapacityOption,
} from '../../data/recommendationDatasets';
import { TRANSLATIONS } from '../../lib/i18n/languages';

const ALL_24_CROPS = [
  { id: 'all', name: 'All Agricultural Crops (Full Catalog)' },
  { id: 'Tomato', name: 'Tomato (Solanum lycopersicum)' },
  { id: 'Rice', name: 'Rice / Paddy (Oryza sativa)' },
  { id: 'Cotton', name: 'Cotton (Gossypium hirsutum)' },
  { id: 'Wheat', name: 'Wheat (Triticum aestivum)' },
  { id: 'Maize', name: 'Maize / Corn (Zea mays)' },
  { id: 'Chilli', name: 'Chilli / Pepper (Capsicum annuum)' },
  { id: 'Potato', name: 'Potato (Solanum tuberosum)' },
  { id: 'Soybean', name: 'Soybean (Glycine max)' },
  { id: 'Sugarcane', name: 'Sugarcane (Saccharum officinarum)' },
  { id: 'Tea', name: 'Tea (Camellia sinensis)' },
  { id: 'Coffee', name: 'Coffee (Coffea arabica)' },
  { id: 'Mango', name: 'Mango (Mangifera indica)' },
  { id: 'Banana', name: 'Banana (Musa acuminata)' },
  { id: 'Citrus', name: 'Citrus / Orange / Lime (Citrus spp.)' },
  { id: 'Grapes', name: 'Grapes (Vitis vinifera)' },
  { id: 'Apple', name: 'Apple (Malus domestica)' },
  { id: 'Groundnut', name: 'Groundnut / Peanut (Arachis hypogaea)' },
  { id: 'Mustard', name: 'Mustard / Rapeseed (Brassica juncea)' },
  { id: 'Chickpea', name: 'Chickpea / Bengal Gram (Cicer arietinum)' },
  { id: 'Pigeon Pea', name: 'Pigeon Pea / Arhar (Cajanus cajan)' },
  { id: 'Onion', name: 'Onion / Garlic (Allium cepa)' },
  { id: 'Brinjal', name: 'Brinjal / Eggplant (Solanum melongena)' },
  { id: 'Cabbage', name: 'Cabbage & Cauliflower (Brassica oleracea)' },
  { id: 'Finger Millet', name: 'Finger Millet / Ragi (Eleusine coracana)' },
];

interface RecommendationsViewProps {
  language: LanguageCode;
  activeDiagnosis?: PestDiagnosis | null;
  selectedCrop?: string;
  diagnosedDisease?: string;
  onSelectProduct?: (diagnosis: any, treatmentName: string) => void;
  onVerifyProduct: (productName: string) => void;
  onAskFarMate?: (topic: string) => void;
}

export const RecommendationsView: React.FC<RecommendationsViewProps> = ({
  language,
  activeDiagnosis,
  selectedCrop: initialCrop,
  diagnosedDisease,
  onVerifyProduct,
  onAskFarMate,
}) => {
  const [selectedCrop, setSelectedCrop] = useState<string>(
    activeDiagnosis?.crop ? activeDiagnosis.crop.split(' ')[0] : initialCrop ? initialCrop.split(' ')[0] : 'Tomato'
  );
  const [stage, setStage] = useState('Flowering & Early Fruiting');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [farmAcres, setFarmAcres] = useState<number>(3);
  const [selectedTankLiters, setSelectedTankLiters] = useState<number>(15);
  const [showMultiTankModal, setShowMultiTankModal] = useState<boolean>(false);
  const [expandedMixingId, setExpandedMixingId] = useState<string | null>(null);

  const [selectedProductForCalc, setSelectedProductForCalc] = useState<VerifiedAgrochemicalInput>(
    VERIFIED_RECOMMENDATION_DATASET[0]
  );

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Sync if activeDiagnosis changes
  useEffect(() => {
    if (activeDiagnosis?.crop) {
      setSelectedCrop(activeDiagnosis.crop.split(' ')[0]);
    }
  }, [activeDiagnosis]);

  // Filter verified products based on search, category, and crop
  const filteredProducts = VERIFIED_RECOMMENDATION_DATASET.filter((p) => {
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.activeIngredient.toLowerCase().includes(q) ||
        p.problemAddressed.toLowerCase().includes(q) ||
        p.cibrcRegNumber.toLowerCase().includes(q);
      if (!matchSearch) return false;
    }

    if (selectedCrop && selectedCrop !== 'all') {
      const cropKey = selectedCrop.toLowerCase();
      const cropMatch =
        p.targetCrops.some((tc) => tc.toLowerCase().includes(cropKey)) ||
        p.problemAddressed.toLowerCase().includes(cropKey) ||
        p.name.toLowerCase().includes(cropKey) ||
        p.cropCompatibility >= 92;
      return cropMatch;
    }

    return true;
  });

  // Calculate dynamic sprayer math for selected tank capacity & acreage
  const tankCalc = calculateTankDosage(selectedProductForCalc, selectedTankLiters, farmAcres);

  // Selected tank metadata
  const currentTank =
    COMMON_SPRAYER_TANKS.find((t) => t.liters === selectedTankLiters) || COMMON_SPRAYER_TANKS[3];

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950 via-neutral-900 to-emerald-950 border border-amber-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/60 border border-amber-500/40 text-amber-300 text-xs font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              FAR[M]ATE • CIBRC & FCO Verified Input System & Multi-Tank Math
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
              VERIFIED INPUT RECOMMENDATIONS
            </h1>
            <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mt-2 leading-relaxed">
              Statutorily registered CIBRC & FCO bio-solutions and protectants. Dosage is dynamically calculated for your specific sprayer tank (5L, 10L, 12L, 15L, 16L, 20L, or 200L). Chemical mixing instructions are strictly revealed on-demand to maintain clarity.
            </p>
          </div>

          {/* Active Context Banner if coming from Pest Doctor */}
          {(activeDiagnosis || diagnosedDisease) && (
            <div className="bg-emerald-950/80 border border-emerald-500/50 p-4 rounded-2xl max-w-xs shadow-lg">
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                Carried From Pest Doctor:
              </span>
              <p className="text-xs font-bold text-white mt-1">
                {activeDiagnosis?.crop || selectedCrop} • {activeDiagnosis?.diseaseName || diagnosedDisease}
              </p>
              <span className="text-[11px] text-emerald-300 mt-1 block">
                Filtered for verified bio & CIBRC registered solutions.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main Grid: Parameters/Calculator (Left) + Verified Products (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Farm Parameters & Multi-Tank Math Engine */}
        <div className="lg:col-span-4 space-y-5">
          {/* Farm Parameters Card */}
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-3xl p-5 shadow-lg space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-2">
              <Filter className="w-3.5 h-3.5" /> Farm & Crop Parameters
            </h2>

            {/* Search Input */}
            <div>
              <label htmlFor="search-input-field" className="block text-xs font-semibold text-neutral-300 mb-1">
                Search Input, Brand or Active Ingredient
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                <input
                  id="search-input-field"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g., Trichoderma, Neem, Bt, Coragen..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Crop Selector: All 24 Crops */}
            <div>
              <label htmlFor="crop-type-select" className="block text-xs font-semibold text-neutral-300 mb-1">
                Target Crop (24 Agronomic Crops)
              </label>
              <select
                id="crop-type-select"
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                {ALL_24_CROPS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Growth Stage */}
            <div>
              <label htmlFor="growth-stage-select" className="block text-xs font-semibold text-neutral-300 mb-1">
                Crop Growth Stage
              </label>
              <select
                id="growth-stage-select"
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Seedling / Nursery">Seedling / Nursery (0-20 days)</option>
                <option value="Vegetative Canopy Growth">Vegetative Canopy Growth (20-45 days)</option>
                <option value="Flowering & Early Fruiting">Flowering & Early Fruiting (45-75 days)</option>
                <option value="Ripening / Pre-Harvest">Ripening / Pre-Harvest (75+ days)</option>
              </select>
            </div>

            {/* Formulation Classification */}
            <div>
              <label htmlFor="category-filter-select" className="block text-xs font-semibold text-neutral-300 mb-1">
                Formulation Classification
              </label>
              <select
                id="category-filter-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="all">All Verified Formulations (CIBRC / FCO)</option>
                <option value="Bio-Fungicide">Bio-Fungicides (Trichoderma / Pseudomonas)</option>
                <option value="Bio-Pesticide">Bio-Pesticides (Neem / Metarhizium / Beauveria)</option>
                <option value="Organic Formulation">Certified Organic Larvicides (Bt)</option>
                <option value="Chemical Insecticide">CIBRC Chemical Protectants (Copper / Azoxystrobin)</option>
                <option value="Soil Conditioner">FCO Biostimulants & Soil Conditioners</option>
              </select>
            </div>
          </div>

          {/* Multi-Tank Sprayer Math Widget */}
          <div className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border border-emerald-500/40 rounded-3xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-2">
                <Calculator className="w-4 h-4" /> Sprayer Tank Math Engine
              </h2>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full font-mono">
                {selectedTankLiters}L Selected
              </span>
            </div>

            {/* Sprayer Tank Capacity Selector */}
            <div>
              <label htmlFor="tank-capacity-select" className="block text-xs font-semibold text-neutral-300 mb-1">
                Select Sprayer Tank Capacity
              </label>
              <select
                id="tank-capacity-select"
                value={selectedTankLiters}
                onChange={(e) => setSelectedTankLiters(Number(e.target.value))}
                className="w-full bg-neutral-950 border border-emerald-600/50 rounded-xl px-3 py-2 text-xs text-emerald-300 font-semibold focus:outline-none focus:border-emerald-400"
              >
                {COMMON_SPRAYER_TANKS.map((tank) => (
                  <option key={tank.id} value={tank.liters}>
                    {tank.label} ({tank.description})
                  </option>
                ))}
              </select>
            </div>

            {/* Field Area Slider */}
            <div>
              <div className="flex justify-between text-xs text-neutral-300 mb-1">
                <span>Field Area to Spray:</span>
                <span className="font-bold text-white">{farmAcres} Acres</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="25"
                step="0.5"
                value={farmAcres}
                onChange={(e) => setFarmAcres(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Live Calculation Cards */}
            <div className="grid grid-cols-2 gap-2 bg-neutral-950 p-3 rounded-2xl border border-neutral-800 text-center">
              <div>
                <span className="text-[10px] text-neutral-400 block font-mono">
                  {selectedTankLiters}L Tanks Needed
                </span>
                <span className="text-xl font-black text-emerald-400 font-mono">
                  {tankCalc.totalTanksNeeded}
                </span>
                <span className="text-[10px] text-neutral-500 block">
                  ~{(165 / selectedTankLiters).toFixed(1)} Tanks/Acre
                </span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 block font-mono">Total Spray Water</span>
                <span className="text-xl font-black text-cyan-400 font-mono">
                  {tankCalc.totalWaterLitersNeeded} L
                </span>
                <span className="text-[10px] text-neutral-500 block">Clean soft water</span>
              </div>
            </div>

            {/* Selected Product Dilution Formula */}
            <div className="bg-neutral-950 p-3.5 rounded-2xl border border-neutral-800 text-xs space-y-1.5">
              <span className="text-[10px] text-neutral-400 block font-mono uppercase">
                Active Calculation: {selectedProductForCalc.name.split('(')[0]}
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-neutral-300 text-xs">Dose per {selectedTankLiters}L Tank:</span>
                <span className="text-emerald-400 font-black text-sm font-mono">
                  {tankCalc.dosePerTank}
                </span>
              </div>
              <div className="flex items-baseline justify-between border-t border-neutral-900 pt-1">
                <span className="text-neutral-400 text-[11px]">Total for {farmAcres} Acres:</span>
                <span className="text-cyan-300 font-bold text-xs font-mono">
                  {tankCalc.totalProductNeeded}
                </span>
              </div>
            </div>

            {/* Button: View Various Litre Tanks Comparison */}
            <button
              onClick={() => setShowMultiTankModal(!showMultiTankModal)}
              className="w-full py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-emerald-500/30 text-emerald-300 text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Table className="w-3.5 h-3.5" />
              <span>
                {showMultiTankModal ? 'Hide Various Tanks Table' : 'Compare Various Litre Tanks (5L - 200L)'}
              </span>
            </button>

            {/* Weather & Safety Guidance */}
            <div className="space-y-2 text-[11px] text-neutral-300">
              <div className="flex items-center gap-2 text-amber-300 bg-amber-950/40 border border-amber-800/40 p-2.5 rounded-xl">
                <Wind className="w-4 h-4 shrink-0" />
                <span>Optimal window: 5-15 km/h wind. Avoid spraying above 20 km/h to prevent chemical drift.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Verified Products Catalog & Multi-Tank Reference Table */}
        <div className="lg:col-span-8 space-y-4">
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between text-xs text-neutral-400 px-1 gap-2">
            <span>
              Showing <span className="text-white font-bold">{filteredProducts.length}</span> Verified CIBRC/FCO Formulations
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                Statutory Gazette Grounded
              </span>
              <span className="font-mono text-[10px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                Zero Banned Chemicals
              </span>
            </div>
          </div>

          {/* Expandable Various Tanks Comparative Table */}
          {showMultiTankModal && (
            <div className="bg-neutral-950 border border-emerald-500/50 rounded-3xl p-5 shadow-2xl space-y-3 animate-fade-in">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <div>
                  <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                    <Table className="w-4 h-4 text-emerald-400" />
                    Various Litre Tanks Dosage Reference: {selectedProductForCalc.name.split('(')[0]}
                  </h3>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Calculated at base rate of {selectedProductForCalc.baseDosePerLiter.amount} {selectedProductForCalc.baseDosePerLiter.unit} per Litre of water for {farmAcres} Acres.
                  </p>
                </div>
                <button
                  onClick={() => setShowMultiTankModal(false)}
                  className="text-xs text-neutral-400 hover:text-white px-2 py-1 rounded bg-neutral-900 border border-neutral-800"
                >
                  Close
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-800 text-[10px] font-mono text-neutral-400 uppercase">
                      <th className="py-2 px-3">Tank Type</th>
                      <th className="py-2 px-3">Capacity</th>
                      <th className="py-2 px-3">Dose per Tank</th>
                      <th className="py-2 px-3">Tanks for {farmAcres} Ac</th>
                      <th className="py-2 px-3">Total Spray Water</th>
                      <th className="py-2 px-3 text-right">Total Product</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900 font-mono text-neutral-200">
                    {COMMON_SPRAYER_TANKS.map((tank) => {
                      const rowCalc = calculateTankDosage(selectedProductForCalc, tank.liters, farmAcres);
                      const isCurrent = tank.liters === selectedTankLiters;
                      return (
                        <tr
                          key={tank.id}
                          className={`transition ${
                            isCurrent
                              ? 'bg-emerald-950/40 text-emerald-300 font-bold'
                              : 'hover:bg-neutral-900/50'
                          }`}
                        >
                          <td className="py-2 px-3 flex items-center gap-2">
                            {isCurrent && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                            <span>{tank.label}</span>
                          </td>
                          <td className="py-2 px-3">{tank.liters} L</td>
                          <td className="py-2 px-3 text-emerald-400 font-bold">{rowCalc.dosePerTank}</td>
                          <td className="py-2 px-3">{rowCalc.totalTanksNeeded} tanks</td>
                          <td className="py-2 px-3 text-cyan-300">{rowCalc.totalWaterLitersNeeded} L</td>
                          <td className="py-2 px-3 text-right text-amber-300 font-bold">
                            {rowCalc.totalProductNeeded}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProducts.map((product) => {
              const isSelected = selectedProductForCalc.id === product.id;
              const isMixingExpanded = expandedMixingId === product.id;
              const productTankDose = (product.baseDosePerLiter.amount * selectedTankLiters).toFixed(1);

              return (
                <div
                  key={product.id}
                  className={`rounded-3xl p-5 border transition flex flex-col justify-between shadow-xl ${
                    isSelected
                      ? 'bg-neutral-900 border-emerald-500/70 shadow-emerald-950/40'
                      : 'bg-neutral-900/80 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Top Badges */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span
                          className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full border ${
                            product.category.includes('Bio')
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                              : product.category.includes('Organic')
                              ? 'bg-teal-950 text-teal-300 border-teal-700'
                              : product.category.includes('Conditioner')
                              ? 'bg-amber-950 text-amber-300 border-amber-700'
                              : 'bg-blue-950 text-blue-300 border-blue-700'
                          }`}
                        >
                          {product.category}
                        </span>
                        {product.fcoCompliant && (
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-700">
                            FCO 1985
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{product.confidence}% Match</span>
                      </div>
                    </div>

                    {/* Product Name & Brand */}
                    <div>
                      <h3 className="text-base font-bold text-white leading-snug">{product.name}</h3>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        Brand: <span className="text-neutral-200">{product.brand}</span> • CIBRC:{' '}
                        <span className="font-mono text-cyan-300">{product.cibrcRegNumber}</span>
                      </p>
                    </div>

                    {/* Active Ingredient & Toxicity Triangle */}
                    <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-800/80 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-neutral-400 uppercase font-mono">
                          Active Ingredient
                        </span>
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                            product.toxicityTriangleColor.includes('Green')
                              ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                              : product.toxicityTriangleColor.includes('Blue')
                              ? 'bg-blue-950 text-blue-400 border-blue-800'
                              : 'bg-yellow-950 text-yellow-400 border-yellow-800'
                          }`}
                        >
                          {product.toxicityTriangleColor}
                        </span>
                      </div>
                      <span className="text-neutral-200 font-medium block">
                        {product.activeIngredient}
                      </span>
                    </div>

                    {/* Problem Addressed */}
                    <div className="text-xs text-neutral-300">
                      <span className="text-[10px] text-neutral-400 block uppercase font-mono">
                        Target Pests / Pathogens
                      </span>
                      <span>{product.problemAddressed}</span>
                    </div>

                    {/* Exact Dosage for Currently Selected Tank */}
                    <div className="bg-emerald-950/50 border border-emerald-800/60 p-2.5 rounded-xl flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-mono text-emerald-300 uppercase block">
                          Dose for your {selectedTankLiters}L Tank:
                        </span>
                        <span className="text-emerald-400 font-black text-sm font-mono">
                          {productTankDose} {product.baseDosePerLiter.unit}
                        </span>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        @ {product.baseDosePerLiter.amount} {product.baseDosePerLiter.unit}/L water
                      </span>
                    </div>

                    {/* PHI and REI Badges */}
                    <div className="grid grid-cols-2 gap-2 text-center text-xs">
                      <div className="bg-neutral-950 p-2 rounded-xl border border-neutral-800">
                        <span className="text-[9px] text-neutral-400 block uppercase font-mono">
                          PHI (Pre-Harvest)
                        </span>
                        <span className="font-bold text-amber-300 font-mono">
                          {product.preHarvestIntervalDays} Days
                        </span>
                      </div>
                      <div className="bg-neutral-950 p-2 rounded-xl border border-neutral-800">
                        <span className="text-[9px] text-neutral-400 block uppercase font-mono">
                          REI (Re-Entry)
                        </span>
                        <span className="font-bold text-cyan-300 font-mono">
                          {product.reEntryIntervalHours} Hours
                        </span>
                      </div>
                    </div>

                    {/* On-Demand Toggle for Mixing Instructions (Farmer Choice) */}
                    <div>
                      <button
                        onClick={() =>
                          setExpandedMixingId(isMixingExpanded ? null : product.id)
                        }
                        className="w-full py-1.5 px-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-700/80 text-[11px] font-semibold text-neutral-300 hover:text-white transition flex items-center justify-between cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5">
                          <FlaskConical className="w-3.5 h-3.5 text-amber-400" />
                          {isMixingExpanded
                            ? 'Hide Mixing Instructions & Safety'
                            : 'Show Mixing Instructions & Safety Guide'}
                        </span>
                        {isMixingExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5 text-neutral-400" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                        )}
                      </button>

                      {/* Expanded Mixing Instructions & Safety Content */}
                      {isMixingExpanded && (
                        <div className="mt-2.5 p-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-xs space-y-2.5 animate-fade-in">
                          {/* Step-by-step Mixing Directions */}
                          <div>
                            <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                              1. Step-by-Step Mixing Procedure:
                            </span>
                            <p className="text-neutral-300 text-[11px] mt-0.5 leading-relaxed">
                              Pre-dissolve {productTankDose} {product.baseDosePerLiter.unit} in 1 litre of clean water in a plastic bucket. Fill sprayer tank halfway with clean water, pour solution through the filter basket, then top up to {selectedTankLiters} litres and agitate gently.
                            </p>
                          </div>

                          {/* Compatible Mixes */}
                          <div>
                            <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                              2. Compatible Tank Mixes:
                            </span>
                            <p className="text-neutral-300 text-[11px] mt-0.5">
                              {product.compatibleMixes.join(', ')}
                            </p>
                          </div>

                          {/* Incompatible Mixes */}
                          {product.incompatibleMixes.length > 0 && product.incompatibleMixes[0] !== 'None' && (
                            <div className="text-red-300 bg-red-950/30 border border-red-900/40 p-2 rounded-xl">
                              <span className="text-[10px] font-mono uppercase font-bold flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3 text-red-400" />
                                3. DO NOT MIX WITH (Incompatible):
                              </span>
                              <p className="text-[11px] mt-0.5 text-red-200">
                                {product.incompatibleMixes.join(', ')}
                              </p>
                            </div>
                          )}

                          {/* Optimal Application Window */}
                          <div>
                            <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
                              4. Optimal Spray Window:
                            </span>
                            <p className="text-neutral-300 text-[11px] mt-0.5">
                              {product.optimalApplicationWindow}
                            </p>
                          </div>

                          {/* Required PPE */}
                          <div>
                            <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold block">
                              5. Mandatory Safety Equipment:
                            </span>
                            <p className="text-neutral-300 text-[11px] mt-0.5">
                              {product.ppeRequired.join(', ')}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 mt-3 border-t border-neutral-800/80 flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setSelectedProductForCalc(product)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200'
                      }`}
                    >
                      <Calculator className="w-3.5 h-3.5" />
                      <span>{isSelected ? `Active in ${selectedTankLiters}L Math` : `Calculate ${selectedTankLiters}L`}</span>
                    </button>

                    <button
                      onClick={() => onVerifyProduct(product.name)}
                      className="py-2 px-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-cyan-800/60 text-cyan-300 hover:text-cyan-200 text-xs font-medium transition flex items-center gap-1 cursor-pointer"
                      title="Check authentic packaging seal in Counterfeit Sentinel"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      <span>Verify</span>
                    </button>

                    {onAskFarMate && (
                      <button
                        onClick={() =>
                          onAskFarMate(
                            `Please calculate the exact dosage and instructions for ${product.name} in my ${selectedTankLiters}L sprayer tank for ${farmAcres} acres of ${selectedCrop}.`
                          )
                        }
                        className="py-2 px-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-amber-800/60 text-amber-300 hover:text-amber-200 text-xs font-medium transition flex items-center gap-1 cursor-pointer"
                        title="Ask FarMate AI in chat about this product"
                      >
                        <MessageSquareQuote className="w-3.5 h-3.5" />
                        <span>Ask AI</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
