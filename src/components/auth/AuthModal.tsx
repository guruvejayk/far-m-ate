import React, { useState } from 'react';
import { X, User as UserIcon, Mail, Phone, MapPin, Check, Globe, Plus, Sparkles, Sprout, Layers } from 'lucide-react';
import { User, LanguageCode } from '../../types';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../../lib/i18n/languages';
import { HOME_PAGE_TRANSLATIONS } from '../../data/homePageTranslations';

const PRESET_CROPS = [
  'Tomato',
  'Rice / Paddy',
  'Wheat',
  'Cotton',
  'Maize / Corn',
  'Chilli / Pepper',
  'Soybean',
  'Mustard',
  'Sugarcane',
  'Potato',
  'Onion',
  'Groundnut',
  'Pulses / Gram',
  'Turmeric',
  'Banana',
  'Horticulture & Fruits',
];

const PRESET_SOIL_TYPES = [
  'Black Cotton Soil (Heavy Clay / Regur)',
  'Red Loam Soil (P-Fixing / Aerated)',
  'Alluvial Soil (High Fertility Loam)',
  'Laterite Soil (Porous & Acidic)',
  'Sandy Loam Soil (Fast Leaching)',
  'Clay Loam Soil (Moisture Retentive)',
  'Saline / Alkaline Soil',
  'Peaty / Organic Soil',
];

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onUpdateUser: (u: User) => void;
  language: LanguageCode;
  onSelectLanguage: (l: LanguageCode) => void;
  onLogout?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
  language,
  onSelectLanguage,
  onLogout,
}) => {
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [farmName, setFarmName] = useState(user.farmProfile?.farmName || '');
  const [location, setLocation] = useState(user.farmProfile?.location || 'Krishnagiri, Tamil Nadu');
  const [farmSize, setFarmSize] = useState(user.farmProfile?.farmSizeAcres ?? 3.5);
  const [selectedCrops, setSelectedCrops] = useState<string[]>(user.farmProfile?.primaryCrops || []);
  const [newCropText, setNewCropText] = useState('');
  const [soilType, setSoilType] = useState(user.farmProfile?.soilType || '');
  const [customSoilText, setCustomSoilText] = useState('');

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const homeT = HOME_PAGE_TRANSLATIONS[language] || HOME_PAGE_TRANSLATIONS.en;

  if (!isOpen) return null;

  const handleTogglePresetCrop = (cropName: string) => {
    if (selectedCrops.some((c) => c.toLowerCase() === cropName.toLowerCase())) {
      setSelectedCrops(selectedCrops.filter((c) => c.toLowerCase() !== cropName.toLowerCase()));
    } else {
      setSelectedCrops([...selectedCrops, cropName]);
    }
  };

  const handleAddCustomCrop = () => {
    const trimmed = newCropText.trim();
    if (!trimmed) return;
    if (!selectedCrops.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
      setSelectedCrops([...selectedCrops, trimmed]);
    }
    setNewCropText('');
  };

  const handleRemoveCrop = (cropToRemove: string) => {
    setSelectedCrops(selectedCrops.filter((c) => c !== cropToRemove));
  };

  const handleClearAllCrops = () => {
    setSelectedCrops([]);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: User = {
      ...user,
      name,
      email,
      phone,
      preferredLanguage: language,
      farmProfile: {
        ...(user.farmProfile || {}),
        farmName,
        location,
        farmSizeAcres: Number(farmSize),
        primaryCrops: selectedCrops,
        soilType: soilType.trim() || 'Red Loam',
        stateOrRegion: user.farmProfile?.stateOrRegion || 'Tamil Nadu',
        irrigationType: user.farmProfile?.irrigationType || 'Drip & Borewell',
      },
    };
    onUpdateUser(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-900/50 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg max-h-[92vh] flex flex-col bg-white border border-neutral-200 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-100 flex items-center justify-between shrink-0 bg-neutral-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#134e35] text-white flex items-center justify-center font-bold shadow-xs">
              <UserIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 font-sans">
                {language === 'hi' ? 'किसान प्रोफ़ाइल एवं फसल सेटिंग्स' :
                 language === 'ta' ? 'விவசாயி சுயவிவரம் & பயிர் அமைப்புகள்' :
                 language === 'te' ? 'రైతు ప్రొఫైల్ & పంట సెట్టింగ్‌లు' :
                 'Farmer Profile & Crop Settings'}
              </h3>
              <p className="text-xs text-neutral-500">
                {homeT.cibrcVerified} • {homeT.tagline}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-700 rounded-full bg-neutral-100 hover:bg-neutral-200 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-700 font-semibold mb-1">
                {language === 'hi' ? 'किसान का नाम' : language === 'ta' ? 'விவசாயி பெயர்' : language === 'te' ? 'రైతు పేరు' : 'Farmer Name'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-900 focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30 transition"
              />
            </div>
            <div>
              <label className="block text-neutral-700 font-semibold mb-1">
                {language === 'hi' ? 'मोबाइल नंबर' : language === 'ta' ? 'கைபேசி எண்' : language === 'te' ? 'మొబైల్ సంఖ్య' : 'Mobile Phone'}
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-900 focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-neutral-700 font-semibold mb-1">
              {language === 'hi' ? 'खेत का नाम' : language === 'ta' ? 'பண்ணை பெயர்' : language === 'te' ? 'వ్యవసాయ క్షేత్రం పేరు' : 'Farm Name'}
            </label>
            <input
              type="text"
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-900 focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30 transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-700 font-semibold mb-1">
                {language === 'hi' ? 'स्थान / जिला' : language === 'ta' ? 'மாவட்டம் / இடம்' : language === 'te' ? 'జిల్లా / ప్రాంతం' : 'District / Location'}
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-900 focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30 transition"
              />
            </div>
            <div>
              <label className="block text-neutral-700 font-semibold mb-1">
                {language === 'hi' ? 'खेत का आकार (एकड़)' : language === 'ta' ? 'பண்ணை பரப்பளவு (ஏக்கர்)' : language === 'te' ? 'విస్తీర్ణం (ఎకరాలు)' : 'Holding Size (Acres)'}
              </label>
              <input
                type="number"
                step="0.5"
                value={farmSize}
                onChange={(e) => setFarmSize(parseFloat(e.target.value))}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-900 focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30 transition"
              />
            </div>
          </div>

          {/* Multi-Crop Selection & Custom Crop Typing */}
          <div className="space-y-2 pt-1 border-t border-neutral-100">
            <div className="flex items-center justify-between">
              <label className="block text-neutral-800 font-bold">
                {language === 'hi' ? 'फसलें (एकाधिक चुनें या टाइप करें)' :
                 language === 'ta' ? 'பயிர்கள் (பலவற்றைத் தேர்வுசெய்க அல்லது தட்டச்சு செய்க)' :
                 language === 'te' ? 'పంటలు (బహుళ ఎంపిక చేయండి లేదా టైప్ చేయండి)' :
                 'Target Crops (Select Multiple or Type In)'}
              </label>
              {selectedCrops.length > 0 ? (
                <button
                  type="button"
                  onClick={handleClearAllCrops}
                  className="text-[11px] text-rose-600 hover:text-rose-700 font-bold underline cursor-pointer"
                >
                  Clear (Focus on All Crops)
                </button>
              ) : (
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Default: None (All Crops)
                </span>
              )}
            </div>

            {/* AI Crop Scope Indicator Banner */}
            <div className={`p-2.5 rounded-xl border text-xs flex items-start gap-2.5 transition ${
              selectedCrops.length === 0
                ? 'bg-emerald-50/80 border-emerald-200/80 text-emerald-900'
                : 'bg-neutral-50 border-neutral-200 text-neutral-700'
            }`}>
              <Sparkles className={`w-4 h-4 shrink-0 mt-0.5 ${selectedCrops.length === 0 ? 'text-emerald-600' : 'text-amber-500'}`} />
              <div className="text-[11px] leading-relaxed">
                {selectedCrops.length === 0 ? (
                  <span>
                    <strong>Universal Agriculture Mode (Default):</strong> No specific crops selected. FAR[M]ATE AI will provide broad agronomic advice across <em>all agricultural crops</em> without restricting answers to only one crop.
                  </span>
                ) : (
                  <span>
                    <strong>Focused on {selectedCrops.length} {selectedCrops.length === 1 ? 'Crop' : 'Crops'}:</strong> AI advice, disease checks, and knapsack sprayer dosages will focus on: <span className="font-bold text-neutral-900">{selectedCrops.join(', ')}</span>.
                  </span>
                )}
              </div>
            </div>

            {/* Currently Selected Crops as Dismissible Tags */}
            {selectedCrops.length > 0 && (
              <div className="flex flex-wrap gap-1.5 p-2 bg-neutral-50 rounded-xl border border-neutral-200 max-h-24 overflow-y-auto">
                {selectedCrops.map((crop) => (
                  <span
                    key={crop}
                    className="inline-flex items-center gap-1 bg-[#134e35] text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-2xs animate-fade-in"
                  >
                    <span>{crop}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCrop(crop)}
                      className="hover:bg-emerald-800 rounded-full p-0.5 transition cursor-pointer"
                      title={`Remove ${crop}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Type-in Custom Crop Input */}
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={newCropText}
                onChange={(e) => setNewCropText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomCrop();
                  }
                }}
                placeholder={
                  language === 'hi' ? 'अन्य फसल टाइप करें (उदा. हल्दी, केला, इलायची)...' :
                  language === 'ta' ? 'வேறு பயிரைத் தட்டச்சு செய்க (எ.கா. மஞ்சள், வாழை)...' :
                  language === 'te' ? 'ఇతర పంటను టైప్ చేయండి (ఉదా. పసుపు, అరటి)...' :
                  'Type any custom crop name (e.g. Cardamom, Turmeric, Ginger)...'
                }
                className="flex-1 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-1.5 text-xs text-neutral-900 focus:bg-white focus:outline-none focus:border-emerald-600 transition"
              />
              <button
                type="button"
                onClick={handleAddCustomCrop}
                disabled={!newCropText.trim()}
                className="bg-[#134e35] hover:bg-[#0d3b27] text-white px-3 py-1.5 rounded-xl font-bold text-xs disabled:opacity-40 transition cursor-pointer shrink-0"
              >
                + Add Crop
              </button>
            </div>

            {/* Quick Toggle Popular Crops Pills */}
            <div className="pt-1">
              <span className="text-[10px] text-neutral-500 font-semibold block mb-1">
                Quick Toggle Presets:
              </span>
              <div className="flex flex-wrap gap-1 max-h-28 overflow-y-auto">
                {PRESET_CROPS.map((crop) => {
                  const isSelected = selectedCrops.some((c) => c.toLowerCase() === crop.toLowerCase());
                  return (
                    <button
                      key={crop}
                      type="button"
                      onClick={() => handleTogglePresetCrop(crop)}
                      className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border transition cursor-pointer flex items-center gap-1 ${
                        isSelected
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-400 font-bold'
                          : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-100'
                      }`}
                    >
                      {isSelected ? <Check className="w-2.5 h-2.5 text-emerald-700" /> : <Plus className="w-2.5 h-2.5 text-neutral-400" />}
                      <span>{crop}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Soil Type Selection & Custom Input */}
          <div className="space-y-2 pt-2 border-t border-neutral-100">
            <div className="flex items-center justify-between">
              <label className="block text-neutral-800 font-bold">
                {language === 'hi' ? 'खेत की मिट्टी का प्रकार (सटीक खाद एवं सिंचाई के लिए)' :
                 language === 'ta' ? 'பண்ணை மண் வகை (துல்லியமான உரம் & பாசனத்திற்கு)' :
                 language === 'te' ? 'పొలం నేల రకం (ఎరువు మోతాదు & నీటిపారుదల కోసం)' :
                 'Farm Soil Type (For Fertilizer & Irrigation)'}
              </label>
              {soilType && (
                <button
                  type="button"
                  onClick={() => setSoilType('')}
                  className="text-[11px] text-rose-600 hover:text-rose-700 font-bold underline cursor-pointer"
                >
                  Clear Soil
                </button>
              )}
            </div>

            <div className="p-2.5 rounded-xl border text-xs flex items-start gap-2.5 bg-neutral-50 border-neutral-200 text-neutral-700">
              <Layers className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                {soilType ? (
                  <span>
                    <strong>Selected Soil: <span className="text-[#134e35] font-bold">{soilType}</span>.</strong> The AI will tailor basal fertilizer doses, top-dressing intervals (Urea/DAP/MOP), and irrigation schedules to this soil profile.
                  </span>
                ) : (
                  <span>
                    <strong>Soil Type Not Specified (Default):</strong> The AI will ask you what soil type your crop is grown in when you ask for fertilizer dosage or irrigation instructions.
                  </span>
                )}
              </div>
            </div>

            {/* Custom Soil Input */}
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={customSoilText}
                onChange={(e) => setCustomSoilText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (customSoilText.trim()) {
                      setSoilType(customSoilText.trim());
                      setCustomSoilText('');
                    }
                  }
                }}
                placeholder="Type custom soil (e.g. Silt Loam, Coastal Sandy)..."
                className="flex-1 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-1.5 text-xs text-neutral-900 focus:bg-white focus:outline-none focus:border-emerald-600 transition"
              />
              <button
                type="button"
                onClick={() => {
                  if (customSoilText.trim()) {
                    setSoilType(customSoilText.trim());
                    setCustomSoilText('');
                  }
                }}
                disabled={!customSoilText.trim()}
                className="bg-[#134e35] hover:bg-[#0d3b27] text-white px-3 py-1.5 rounded-xl font-bold text-xs disabled:opacity-40 transition cursor-pointer shrink-0"
              >
                Set Soil
              </button>
            </div>

            {/* Quick Soil Presets */}
            <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto pt-1">
              {PRESET_SOIL_TYPES.map((soil) => {
                const isSelected = soilType === soil;
                return (
                  <button
                    key={soil}
                    type="button"
                    onClick={() => setSoilType(isSelected ? '' : soil)}
                    className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border transition cursor-pointer flex items-center gap-1 ${
                      isSelected
                        ? 'bg-amber-100 text-amber-900 border-amber-400 font-bold'
                        : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-100'
                    }`}
                  >
                    {isSelected ? <Check className="w-2.5 h-2.5 text-amber-800" /> : <Plus className="w-2.5 h-2.5 text-neutral-400" />}
                    <span>{soil}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-neutral-700 font-semibold mb-1">
              {language === 'hi' ? 'भाषा प्राथमिकता (19 भाषाएँ)' :
               language === 'ta' ? 'மொழி விருப்பம் (19 மொழிகள்)' :
               language === 'te' ? 'భాషా ప్రాధాన్యత (19 భాషలు)' :
               'Language Preference (19 Languages)'}
            </label>
            <select
              value={language}
              onChange={(e) => onSelectLanguage(e.target.value as LanguageCode)}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-neutral-900 focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30 transition"
            >
              {SUPPORTED_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.nativeName} ({l.name})
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              className="flex-1 bg-[#0b6633] hover:bg-[#084e27] text-white font-bold py-2.5 rounded-xl transition shadow-xs cursor-pointer text-xs"
            >
              {language === 'hi' ? 'सेटिंग्स सहेजें' : language === 'ta' ? 'சுயவிவரத்தை சேமிக்கவும்' : language === 'te' ? 'ప్రొఫైల్‌ను భద్రపరచు' : 'Save Settings'}
            </button>
            {onLogout && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onLogout();
                }}
                className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold rounded-xl transition cursor-pointer text-xs"
              >
                Logout
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
