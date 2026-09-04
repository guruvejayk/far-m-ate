import React, { useState } from 'react';
import {
  Search,
  Globe,
  Bell,
  MapPin,
  Sun,
  Droplets,
  Wind,
  ShieldCheck,
  ShieldAlert,
  Lightbulb,
  Bug,
  AlertTriangle,
  ArrowRight,
  Sprout,
  Sparkles,
  Layers,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { speechTTS } from '../../lib/voice/speech';
import { IsometricFieldView } from './IsometricFieldView';
import { User, LanguageCode, FeatureMode, LiveWeatherData } from '../../types';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../../lib/i18n/languages';
import { HOME_PAGE_TRANSLATIONS } from '../../data/homePageTranslations';

interface DashboardViewProps {
  user: User;
  language: LanguageCode;
  onSelectMode: (mode: FeatureMode | 'dashboard' | 'myfarm' | 'registry') => void;
  onOpenVoice: () => void;
  onSelectLanguage?: (lang: LanguageCode) => void;
  weather?: LiveWeatherData;
  onRefreshLocation?: () => void;
  weatherLoading?: boolean;
  onAskPestDoctor?: (crop: string, soilType: string, question: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  language,
  onSelectMode,
  onOpenVoice,
  onSelectLanguage,
  weather,
  onRefreshLocation,
  weatherLoading,
  onAskPestDoctor,
}) => {
  const [activeCrop, setActiveCrop] = useState('Tomato');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'counterfeit' | 'recommendation' | 'pest'>('dashboard');
  const [playingTab, setPlayingTab] = useState<string | null>(null);

  // Quick Pest Doctor Query with Crop & Soil Type
  const [quickCrop, setQuickCrop] = useState(user.farmProfile?.primaryCrops?.[0] || 'Tomato');
  const [quickSoil, setQuickSoil] = useState(user.farmProfile?.soilType || 'Black Cotton Soil (Heavy Clay / Regur)');
  const [quickQuestion, setQuickQuestion] = useState('');

  const handleSubmitQuickPestQuestion = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const questionText =
      quickQuestion.trim() ||
      `What are the major pest and disease risks for ${quickCrop} grown in ${quickSoil}, and what is the exact knapsack tank dosage?`;
    if (onAskPestDoctor) {
      onAskPestDoctor(quickCrop, quickSoil, questionText);
    } else {
      onSelectMode('pest');
    }
  };

  const handleSpeakTab = (tabKey: string, textToSpeak: string) => {
    if (playingTab === tabKey) {
      speechTTS.stop();
      setPlayingTab(null);
      return;
    }
    speechTTS.stop();
    setPlayingTab(tabKey);
    speechTTS.speak(textToSpeak, language, () => {
      setPlayingTab((curr) => (curr === tabKey ? null : curr));
    });
  };

  // Stop any playing audio if the user switches language
  React.useEffect(() => {
    speechTTS.stop();
    setPlayingTab(null);
  }, [language]);

  const homeT = HOME_PAGE_TRANSLATIONS[language] || HOME_PAGE_TRANSLATIONS.en;
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const cropNames: Record<string, string> = {
    Tomato: homeT.cropTomato,
    Wheat: homeT.cropWheat,
    Rice: homeT.cropRice,
    Cotton: homeT.cropCotton,
  };

  const handleTabClick = (tab: 'dashboard' | 'counterfeit' | 'recommendation' | 'pest') => {
    setActiveTab(tab);
    if (tab !== 'dashboard') {
      onSelectMode(tab as FeatureMode);
    }
  };

  const handleLaunchInspection = () => {
    onSelectMode('pest');
  };

  return (
    <div className="space-y-6 animate-fade-in select-none">
      {/* 1. Sub-Header Section: Search + Tabs + Language + Profile */}
      <div className="bg-white border-b border-neutral-200/80 px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Search Bar & Primary Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-4 lg:gap-8 flex-1">
          {/* Search Input */}
          <div className="relative w-full sm:w-72 lg:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={homeT.searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 bg-neutral-50/70 border border-neutral-200 rounded-xl text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
            />
          </div>

          {/* Sub-Header Horizontal Tabs */}
          <div className="flex items-center gap-4 sm:gap-6 text-sm font-semibold overflow-x-auto py-1">
            <button
              onClick={() => handleTabClick('dashboard')}
              className={`pb-1 transition cursor-pointer relative ${
                activeTab === 'dashboard'
                  ? 'text-[#113a24] font-bold'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <span>{homeT.tabDashboard}</span>
              {activeTab === 'dashboard' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#113a24] rounded-full" />
              )}
            </button>

            <button
              onClick={() => onSelectMode('myfarm')}
              className="pb-1 text-neutral-500 hover:text-neutral-800 transition cursor-pointer"
            >
              <span>{homeT.tabMyFarm || t.myFarm || 'My Farm'}</span>
            </button>

            <button
              onClick={() => handleTabClick('counterfeit')}
              className="pb-1 text-neutral-500 hover:text-neutral-800 transition cursor-pointer"
            >
              <span>{homeT.tabCounterfeit}</span>
            </button>

            <button
              onClick={() => handleTabClick('recommendation')}
              className="pb-1 text-neutral-500 hover:text-neutral-800 transition cursor-pointer"
            >
              <span>{homeT.tabRecommendation}</span>
            </button>

            <button
              onClick={() => handleTabClick('pest')}
              className="pb-1 text-neutral-500 hover:text-neutral-800 transition cursor-pointer"
            >
              <span>{homeT.tabPest}</span>
            </button>
          </div>
        </div>

        {/* Right Controls: Language Selector, Bell, Profile Badge */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Language selector dropdown */}
          <div className="flex items-center gap-1.5 bg-white border border-neutral-200 px-3 py-1.5 rounded-full text-xs text-neutral-700 shadow-2xs">
            <Globe className="w-3.5 h-3.5 text-neutral-500" />
            <select
              aria-label="Select preferred language"
              value={language}
              onChange={(e) => onSelectLanguage && onSelectLanguage(e.target.value as LanguageCode)}
              className="bg-transparent text-xs font-semibold text-neutral-800 focus:outline-none cursor-pointer pr-1"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeName} ({lang.name})
                </option>
              ))}
            </select>
          </div>

          {/* Bell Notifications */}
          <button
            aria-label="Notifications"
            className="w-8 h-8 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-600 hover:bg-neutral-50 relative cursor-pointer shadow-2xs"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
          </button>

          {/* User Profile Card */}
          <div className="flex items-center gap-2.5 pl-1">
            <div className="w-8 h-8 rounded-full bg-[#113a24] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              {user.name.charAt(0)}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-neutral-900 leading-tight">
                {user.name}
              </span>
              <span className="text-[10px] text-neutral-500 flex items-center gap-0.5 leading-tight">
                <MapPin className="w-2.5 h-2.5 text-emerald-600" />
                <span>{user.farmProfile?.location || 'Krishnagiri, Tamil Nadu'}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Page Content Container */}
      <div className="px-4 sm:px-8 space-y-6">
        {/* Welcome, [User Name]! Banner - Solid Pastel Theme */}
        <div
          id="dashboard-welcome-banner"
          className="rounded-2xl bg-emerald-50 text-neutral-900 p-4 sm:p-5 shadow-xs border border-emerald-200"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#113a24]">
                  Welcome, {user.name}!
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Authenticated Farmer</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 font-normal">
                Your FAR[M]ATE dashboard is live. Manage crop protection, verify agrochemicals, and monitor your farm.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onSelectMode('counterfeit')}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-300 text-xs font-bold text-neutral-700 shadow-2xs transition cursor-pointer flex items-center gap-1.5"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                <span>Verify Inputs</span>
              </button>
              <button
                onClick={() => onSelectMode('pest')}
                className="px-3.5 py-2 rounded-xl bg-[#0b6633] hover:bg-[#084e27] text-xs font-bold text-white shadow-xs transition cursor-pointer flex items-center gap-1.5"
              >
                <Bug className="w-3.5 h-3.5" />
                <span>Scan Leaf Disease</span>
              </button>
            </div>
          </div>
        </div>

        {/* Farm Overview Title & Weather Widget Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#113a24] tracking-tight">
              {homeT.farmOverviewTitle}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>
                {weather?.location || user.farmProfile?.location || 'Krishnagiri, Tamil Nadu'}: {homeT.farmSubtitle}
              </span>
              {onRefreshLocation && (
                <button
                  onClick={onRefreshLocation}
                  className="text-[11px] text-emerald-700 hover:text-emerald-800 underline font-semibold ml-1 cursor-pointer"
                  title="Detect GPS coordinates and fetch live local weather"
                >
                  {weatherLoading ? 'Detecting...' : 'Detect GPS'}
                </button>
              )}
            </p>
          </div>

          {/* Dynamic Weather Widget Card */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-3.5 sm:px-5 sm:py-3 shadow-xs flex items-center justify-between sm:justify-start gap-4 sm:gap-6 self-start lg:self-auto">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 shadow-2xs">
                <Sun className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-black text-neutral-900">
                    {weather ? `${weather.temperature}°C` : homeT.weatherTemp}
                  </span>
                  <span className="text-xs font-semibold text-neutral-600">
                    {weather?.condition || homeT.weatherCondition}
                  </span>
                  {weather?.isLive && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-0.5" title="Live sensor data"></span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-[11px] text-neutral-500 mt-0.5">
                  <span className="flex items-center gap-1 font-medium">
                    <Droplets className="w-3 h-3 text-cyan-500" />
                    <span>Humidity: {weather ? `${weather.humidity}%` : homeT.weatherHumidity}</span>
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <Wind className="w-3 h-3 text-neutral-400" />
                    <span>Wind: {weather ? `${weather.windSpeed} km/h` : homeT.weatherWind}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="border-l border-neutral-200 pl-4 flex flex-col items-end sm:items-start max-w-[210px]">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                weather?.windSpeed && weather.windSpeed > 20
                  ? 'bg-rose-50 text-rose-800 border-rose-300'
                  : weather?.windSpeed && weather.windSpeed >= 5 && weather.windSpeed <= 15
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-amber-50 text-amber-800 border-amber-300'
              }`}>
                {weather?.sprayCautionBadge || homeT.sprayCautionBadge}
              </span>
              <span className="text-[10px] text-neutral-500 mt-1 leading-tight line-clamp-2">
                {weather?.sprayCautionNotice || homeT.sprayCautionNotice}
              </span>
            </div>
          </div>
        </div>

        {/* 3. Four Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Card 1: Counterfeit Detection */}
          <div
            onClick={() => onSelectMode('counterfeit')}
            className="group bg-white rounded-2xl border border-neutral-200 hover:border-emerald-500/50 p-5 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                  {homeT.cardCounterfeitBadge}
                </span>
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-base font-bold text-neutral-900 mt-3.5 mb-1.5 group-hover:text-emerald-800 transition-colors">
                {homeT.cardCounterfeitTitle}
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {homeT.cardCounterfeitDesc}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
              <div className="flex items-center text-xs font-bold text-emerald-800 group-hover:translate-x-0.5 transition-transform">
                <span>{homeT.cardCounterfeitAction}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>

              {/* Speak Card Details Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSpeakTab(
                    'counterfeit',
                    `${homeT.cardCounterfeitTitle}. ${homeT.cardCounterfeitDesc}`
                  );
                }}
                className={`px-2 py-1 rounded-xl border transition cursor-pointer flex items-center gap-1.5 text-xs shrink-0 ${
                  playingTab === 'counterfeit'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs animate-pulse'
                    : 'bg-neutral-50 hover:bg-emerald-50 text-neutral-600 hover:text-emerald-800 border-neutral-200'
                }`}
                title={playingTab === 'counterfeit' ? 'Stop audio' : `Listen: ${homeT.cardCounterfeitTitle}`}
              >
                {playingTab === 'counterfeit' ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-white" />
                    <span className="text-[10px] font-bold">Stop</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-medium">Listen</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Card 2: Recommendation System */}
          <div
            onClick={() => onSelectMode('recommendation')}
            className="group bg-white rounded-2xl border border-neutral-200 hover:border-amber-500/50 p-5 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60">
                  {homeT.cardRecommendationBadge}
                </span>
                <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-base font-bold text-neutral-900 mt-3.5 mb-1.5 group-hover:text-amber-800 transition-colors">
                {homeT.cardRecommendationTitle}
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {homeT.cardRecommendationDesc}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
              <div className="flex items-center text-xs font-bold text-amber-800 group-hover:translate-x-0.5 transition-transform">
                <span>{homeT.cardRecommendationAction}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>

              {/* Speak Card Details Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSpeakTab(
                    'recommendation',
                    `${homeT.cardRecommendationTitle}. ${homeT.cardRecommendationDesc}`
                  );
                }}
                className={`px-2 py-1 rounded-xl border transition cursor-pointer flex items-center gap-1.5 text-xs shrink-0 ${
                  playingTab === 'recommendation'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-2xs animate-pulse'
                    : 'bg-neutral-50 hover:bg-amber-50 text-neutral-600 hover:text-amber-800 border-neutral-200'
                }`}
                title={playingTab === 'recommendation' ? 'Stop audio' : `Listen: ${homeT.cardRecommendationTitle}`}
              >
                {playingTab === 'recommendation' ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-white" />
                    <span className="text-[10px] font-bold">Stop</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-medium">Listen</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Card 3: Pest Detection */}
          <div
            onClick={() => onSelectMode('pest')}
            className="group bg-white rounded-2xl border border-neutral-200 hover:border-green-500/50 p-5 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-green-50 text-green-800 border border-green-200/60">
                  {homeT.cardPestBadge}
                </span>
                <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                  <Bug className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-base font-bold text-neutral-900 mt-3.5 mb-1.5 group-hover:text-green-800 transition-colors">
                {homeT.cardPestTitle}
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {homeT.cardPestDesc}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
              <div className="flex items-center text-xs font-bold text-green-800 group-hover:translate-x-0.5 transition-transform">
                <span>{homeT.cardPestAction}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>

              {/* Speak Card Details Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSpeakTab(
                    'pest',
                    `${homeT.cardPestTitle}. ${homeT.cardPestDesc}`
                  );
                }}
                className={`px-2 py-1 rounded-xl border transition cursor-pointer flex items-center gap-1.5 text-xs shrink-0 ${
                  playingTab === 'pest'
                    ? 'bg-green-600 text-white border-green-600 shadow-2xs animate-pulse'
                    : 'bg-neutral-50 hover:bg-green-50 text-neutral-600 hover:text-green-800 border-neutral-200'
                }`}
                title={playingTab === 'pest' ? 'Stop audio' : `Listen: ${homeT.cardPestTitle}`}
              >
                {playingTab === 'pest' ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-white" />
                    <span className="text-[10px] font-bold">Stop</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-medium">Listen</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Card 4: Banned Pesticides Registry */}
          <div
            onClick={() => onSelectMode('registry')}
            className="group bg-white rounded-2xl border border-neutral-200 hover:border-rose-500/50 p-5 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200/60">
                  {homeT.cardRegistryBadge}
                </span>
                <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-base font-bold text-neutral-900 mt-3.5 mb-1.5 group-hover:text-rose-800 transition-colors">
                {homeT.cardRegistryTitle}
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {homeT.cardRegistryDesc}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
              <div className="flex items-center text-xs font-bold text-rose-800 group-hover:translate-x-0.5 transition-transform">
                <span>{homeT.cardRegistryAction}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>

              {/* Speak Card Details Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSpeakTab(
                    'registry',
                    `${homeT.cardRegistryTitle}. ${homeT.cardRegistryDesc}`
                  );
                }}
                className={`px-2 py-1 rounded-xl border transition cursor-pointer flex items-center gap-1.5 text-xs shrink-0 ${
                  playingTab === 'registry'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-2xs animate-pulse'
                    : 'bg-neutral-50 hover:bg-rose-50 text-neutral-600 hover:text-rose-800 border-neutral-200'
                }`}
                title={playingTab === 'registry' ? 'Stop audio' : `Listen: ${homeT.cardRegistryTitle}`}
              >
                {playingTab === 'registry' ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-white" />
                    <span className="text-[10px] font-bold">Stop</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-medium">Listen</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 4. Lower Section: Interactive Field Sentinel & Crop Care */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left Card: Interactive Field Sentinel */}
          <div className="lg:col-span-8 bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            {/* Field Sentinel Header with Crop Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h2 className="text-base font-bold text-neutral-900">
                {homeT.sentinelTitle}
              </h2>

              {/* Crop selection pill buttons */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {/* Tomato */}
                <button
                  onClick={() => setActiveCrop('Tomato')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                    activeCrop === 'Tomato'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs'
                      : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>{cropNames.Tomato}</span>
                </button>

                {/* Wheat */}
                <button
                  onClick={() => setActiveCrop('Wheat')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                    activeCrop === 'Wheat'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200 shadow-2xs'
                      : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>{cropNames.Wheat}</span>
                </button>

                {/* Rice */}
                <button
                  onClick={() => setActiveCrop('Rice')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                    activeCrop === 'Rice'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs'
                      : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>{cropNames.Rice}</span>
                </button>

                {/* Cotton */}
                <button
                  onClick={() => setActiveCrop('Cotton')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                    activeCrop === 'Cotton'
                      ? 'bg-sky-50 text-sky-700 border border-sky-200 shadow-2xs'
                      : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  <span>{cropNames.Cotton}</span>
                </button>
              </div>
            </div>

            {/* Isometric Field Sentinel Component */}
            <div className="w-full">
              <IsometricFieldView
                activeCrop={activeCrop}
                onSelectCrop={setActiveCrop}
                onLaunchInspection={handleLaunchInspection}
                language={language}
              />
            </div>
          </div>

          {/* Right Card: Ask Pest Doctor with Crop & Soil Selection */}
          <div className="lg:col-span-4 bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
            <form onSubmit={handleSubmitQuickPestQuestion} className="space-y-3.5">
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#14422b]">
                  <Bug className="w-4 h-4 text-emerald-600" />
                  <span>
                    {language === 'hi' ? 'कीट डॉक्टर त्वरित परामर्श' :
                     language === 'ta' ? 'பூச்சி மருத்துவர் விரைவு ஆலோசனை' :
                     language === 'te' ? 'కీటక నిపుణుల సలహా' :
                     'Pest Doctor Quick Consultation'}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                  {language === 'hi' ? 'फसल + मिट्टी केंद्रित' :
                   language === 'ta' ? 'பயிர் + மண்' :
                   language === 'te' ? 'పంట + నేల' :
                   'Crop + Soil Targeted'}
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-neutral-900 tracking-tight mb-1">
                  {language === 'hi' ? 'फसल और मिट्टी चुनकर सवाल पूछें' :
                   language === 'ta' ? 'பயிர் மற்றும் மண் வகையைத் தேர்வுசெய்க' :
                   language === 'te' ? 'పంట & నేల రకం ఎంచుకుని అడగండి' :
                   'Ask Pest Doctor with Crop & Soil'}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {language === 'hi' ? 'अपनी फसल और मिट्टी का प्रकार चुनें ताकि एआई कीट डॉक्टर सही खुराक और उपचार बता सके।' :
                   language === 'ta' ? 'பூச்சி மருத்துவர் துல்லியமான சிகிச்சை மற்றும் அளவை பரிந்துரைக்க பயிர் மற்றும் மண் வகையைத் தேர்ந்தெடுக்கவும்.' :
                   language === 'te' ? 'సరైన మోతాదు మరియు చిట్కాలు పొందడానికి పంట మరియు నేల రకాన్ని ఎంచుకోండి.' :
                   'Select your specific crop and soil type to get tailored diagnosis, knapsack tank dosage, and spray timings.'}
                </p>
              </div>

              {/* 1. Crop Selection */}
              <div>
                <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                  {language === 'hi' ? '1. फसल का प्रकार चुनें' :
                   language === 'ta' ? '1. பயிரைத் தேர்வுசெய்க' :
                   language === 'te' ? '1. పంట రకాన్ని ఎంచుకోండి' :
                   '1. Select Crop Type'}
                </label>
                <select
                  value={quickCrop}
                  onChange={(e) => setQuickCrop(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs font-semibold text-neutral-800 focus:bg-white focus:outline-none focus:border-emerald-600 transition"
                >
                  <option value="Tomato">Tomato (Solanum lycopersicum)</option>
                  <option value="Rice / Paddy">Rice / Paddy (Oryza sativa)</option>
                  <option value="Wheat">Wheat (Triticum aestivum)</option>
                  <option value="Cotton">Cotton (Gossypium)</option>
                  <option value="Chilli / Pepper">Chilli / Pepper (Capsicum)</option>
                  <option value="Maize / Corn">Maize / Corn (Zea mays)</option>
                  <option value="Potato">Potato (Solanum tuberosum)</option>
                  <option value="Soybean">Soybean (Glycine max)</option>
                  <option value="Mustard">Mustard (Brassica)</option>
                  <option value="Sugarcane">Sugarcane (Saccharum)</option>
                  <option value="Onion">Onion (Allium cepa)</option>
                  <option value="Groundnut">Groundnut / Peanut (Arachis hypogaea)</option>
                  <option value="Banana">Banana (Musa)</option>
                  <option value="Turmeric">Turmeric (Curcuma longa)</option>
                </select>
              </div>

              {/* 2. Soil Type Selection */}
              <div>
                <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                  {language === 'hi' ? '2. मिट्टी का प्रकार चुनें' :
                   language === 'ta' ? '2. மண் வகையைத் தேர்வுசெய்க' :
                   language === 'te' ? '2. నేల రకాన్ని ఎంచుకోండి' :
                   '2. Select Soil Type'}
                </label>
                <select
                  value={quickSoil}
                  onChange={(e) => setQuickSoil(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs font-semibold text-neutral-800 focus:bg-white focus:outline-none focus:border-emerald-600 transition"
                >
                  <option value="Black Cotton Soil (Heavy Clay / Regur)">Black Cotton Soil (Heavy Clay / Regur)</option>
                  <option value="Red Loam Soil (P-Fixing / Aerated)">Red Loam Soil (P-Fixing / Aerated)</option>
                  <option value="Alluvial Soil (High Fertility Loam)">Alluvial Soil (High Fertility Loam)</option>
                  <option value="Laterite Soil (Porous & Acidic)">Laterite Soil (Porous & Acidic)</option>
                  <option value="Sandy Loam Soil (Fast Leaching)">Sandy Loam Soil (Fast Leaching)</option>
                  <option value="Clay Loam Soil (Moisture Retentive)">Clay Loam Soil (Moisture Retentive)</option>
                  <option value="Saline / Alkaline Soil">Saline / Alkaline Soil</option>
                  <option value="Peaty / Organic Soil">Peaty / Organic Soil</option>
                </select>
              </div>

              {/* 3. Question Input */}
              <div>
                <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                  {language === 'hi' ? '3. लक्षण या सवाल लिखें' :
                   language === 'ta' ? '3. அறிகுறிகள் அல்லது கேள்வியை எழுதுங்கள்' :
                   language === 'te' ? '3. లక్షణాలు లేదా ప్రశ్న రాయండి' :
                   '3. Ask One Question / Describe Symptoms'}
                </label>
                <textarea
                  rows={2}
                  value={quickQuestion}
                  onChange={(e) => setQuickQuestion(e.target.value)}
                  placeholder={
                    language === 'hi' ? 'उदा. पत्तियों पर पीले धब्बे, या 15L टंकी में सही खुराक...' :
                    language === 'ta' ? 'எ.கா. இலைகளில் மஞ்சள் புள்ளிகள், 15L தெளிப்பான் மருந்தளவு...' :
                    language === 'te' ? 'ఉదా. ఆకులపై పసుపు మచ్చలు, 15L ట్యాంకు మోతాదు...' :
                    'e.g. Lower leaves turning yellow with brown spots, or stem borer dosage per 15L tank...'
                  }
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-800 focus:bg-white focus:outline-none focus:border-emerald-600 transition resize-none"
                />

                {/* Quick chip prompts */}
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {[
                    'Leaf curl & yellow mosaic',
                    'Stem borer 15L tank dose',
                    'Fungal blight & dark spots',
                    'Root rot & damping off',
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setQuickQuestion(preset)}
                      className="text-[10px] bg-neutral-100 hover:bg-emerald-50 text-neutral-600 hover:text-emerald-800 px-2 py-0.5 rounded-md border border-neutral-200/80 transition cursor-pointer"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#164e33] hover:bg-[#103b26] text-white text-xs sm:text-sm font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs transition active:scale-[0.99] cursor-pointer"
                >
                  <Bug className="w-4 h-4" />
                  <span>
                    {language === 'hi' ? 'कीट डॉक्टर से पूछें' :
                     language === 'ta' ? 'பூச்சி மருத்துவரிடம் கேட்கவும்' :
                     language === 'te' ? 'కీటక నిపుణులను అడగండి' :
                     'Ask Pest Doctor'}
                  </span>
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
