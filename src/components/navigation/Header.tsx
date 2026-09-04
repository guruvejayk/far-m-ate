import React from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Bug,
  Sparkles,
  Globe,
  Sun,
  MapPin,
  Settings,
  PhoneCall,
  ChevronDown,
  Layers,
  CheckCircle2,
  Sprout,
  LogOut,
  RefreshCw,
  CloudRain,
  CloudSun,
} from 'lucide-react';
import { LanguageCode, FeatureMode, User, LiveWeatherData } from '../../types';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../../lib/i18n/languages';
import { HOME_PAGE_TRANSLATIONS } from '../../data/homePageTranslations';

interface HeaderProps {
  currentMode: string;
  onSelectMode: (mode: FeatureMode | 'dashboard' | 'myfarm' | 'registry' | 'settings') => void;
  language: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  onOpenVoice: () => void;
  user: User;
  onOpenAuth: () => void;
  onOpenPoisonModal?: () => void;
  onLogout?: () => void;
  weather?: LiveWeatherData;
  onRefreshLocation?: () => void;
  weatherLoading?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onSelectMode,
  language,
  onSelectLanguage,
  user,
  onOpenAuth,
  onOpenPoisonModal,
  onLogout,
  weather,
  onRefreshLocation,
  weatherLoading,
}) => {
  const homeT = HOME_PAGE_TRANSLATIONS[language] || HOME_PAGE_TRANSLATIONS.en;
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 h-16 flex items-center justify-between gap-2">
        {/* Left: Brand Identity */}
        <div
          onClick={() => onSelectMode('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#0b6633] text-white flex items-center justify-center font-black text-xl shadow-xs group-hover:bg-[#084e27] transition shrink-0">
            F
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-[#084e27] font-sans">
                FAR[M]ATE
              </span>
              <span className="hidden sm:inline bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded-md border border-emerald-200">
                2.1
              </span>
            </div>
            <p className="hidden 2xl:block text-[11px] text-neutral-500 font-medium">
              National Agro-Intelligence Platform
            </p>
          </div>
        </div>

        {/* Center: Core Feature Nav - Visible on 2xl screens (Desktop Sidebar handles standard screens) */}
        <nav className="hidden 2xl:flex items-center gap-1 bg-neutral-100/80 p-1 rounded-2xl border border-neutral-200/70">
          <button
            onClick={() => onSelectMode('counterfeit')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              currentMode === 'counterfeit'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span>{homeT.navCounterfeit}</span>
          </button>

          <button
            onClick={() => onSelectMode('pest')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              currentMode === 'pest'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Bug className="w-3.5 h-3.5 text-amber-600" />
            <span>{homeT.navPestDoctor}</span>
          </button>

          <button
            onClick={() => onSelectMode('recommendation')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              currentMode === 'recommendation'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{homeT.navInputGuide}</span>
          </button>

          <button
            onClick={() => onSelectMode('registry')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              currentMode === 'registry'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>Registry</span>
          </button>

          <button
            onClick={() => onSelectMode('myfarm')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              currentMode === 'myfarm'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Sprout className="w-3.5 h-3.5 text-emerald-600" />
            <span>My Farm</span>
          </button>
        </nav>

        {/* Right: Controls & Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Emergency SOS Hotline */}
          {onOpenPoisonModal && (
            <button
              onClick={onOpenPoisonModal}
              className="flex items-center gap-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/80 px-2 sm:px-2.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer shrink-0"
              title="CIBRC Poison Emergency Hotline (1800-180-1551)"
            >
              <PhoneCall className="w-3 h-3 text-rose-600 shrink-0" />
              <span className="hidden lg:inline text-[11px]">SOS 1800-180-1551</span>
              <span className="lg:hidden text-[11px]">SOS</span>
            </button>
          )}

          {/* Compact Language Selector */}
          <div className="flex items-center bg-white border border-neutral-200 rounded-full px-2 py-1 shadow-2xs shrink-0">
            <Globe className="w-3 h-3 text-neutral-500 mr-1 shrink-0" />
            <div className="relative inline-flex items-center">
              <select
                value={language}
                onChange={(e) => onSelectLanguage(e.target.value as LanguageCode)}
                className="bg-transparent text-xs text-neutral-800 font-bold focus:outline-none cursor-pointer pr-0.5"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-white text-neutral-900">
                    {lang.nativeName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Live Location & Temperature Pill - ALWAYS VISIBLE */}
          <button
            type="button"
            onClick={onRefreshLocation}
            title={weather ? `Live Weather: ${weather.location} (${weather.condition}, ${weather.temperature}°C, Wind ${weather.windSpeed} km/h). Click to detect GPS location.` : 'Click to detect GPS location and weather'}
            className="flex items-center gap-1.5 bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-emerald-300 px-2 sm:px-2.5 py-1.5 rounded-full text-xs text-neutral-700 shadow-2xs shrink-0 cursor-pointer transition select-none group"
          >
            <MapPin className={`w-3 h-3 ${weather?.isLive ? 'text-emerald-600' : 'text-neutral-400'} shrink-0`} />
            <span className="font-bold text-neutral-900 text-xs flex items-center gap-1">
              <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0 group-hover:rotate-12 transition-transform" />
              <span>{weather ? `${weather.temperature}°C` : '28°C'}</span>
            </span>
            <span className="hidden md:inline text-[11px] text-neutral-600 font-medium max-w-[90px] truncate">
              {weather?.location ? weather.location.split(',')[0] : 'Local'}
            </span>
            {weatherLoading ? (
              <RefreshCw className="w-2.5 h-2.5 text-emerald-600 animate-spin shrink-0" />
            ) : (
              <span className="hidden lg:inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="hidden 2xl:inline">{weather?.condition || 'Live'}</span>
              </span>
            )}
          </button>

          {/* User Profile Badge - ALWAYS VISIBLE! */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 bg-emerald-50/90 border border-emerald-300/80 hover:bg-emerald-100 px-2.5 sm:px-3 py-1.5 rounded-full text-xs text-neutral-800 shadow-2xs transition cursor-pointer shrink-0"
            title="View Account Profile & Farm Details"
          >
            <div className="w-5 h-5 rounded-full bg-[#134e35] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <span className="font-bold text-neutral-800 max-w-[70px] sm:max-w-[110px] truncate text-xs">
              {user.name}
            </span>
          </button>

          {/* Logout button */}
          {onLogout && (
            <button
              id="btn-header-logout"
              onClick={onLogout}
              className="flex items-center gap-1 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-700 px-2 sm:px-2.5 py-1.5 rounded-full text-xs font-semibold shadow-2xs transition cursor-pointer shrink-0"
              title="Logout from FAR[M]ATE"
            >
              <LogOut className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden lg:inline text-[11px]">Logout</span>
            </button>
          )}

          {/* Emergency Poison Hotline Button */}
          <button
            onClick={onOpenPoisonModal || (() => window.open('tel:1800116117'))}
            className="flex items-center gap-1 sm:gap-1.5 bg-[#e11d48] hover:bg-[#be123c] text-white px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold shadow-sm transition active:scale-95 cursor-pointer shrink-0"
            title="Emergency Poison Control Helpline (1800-116-117)"
          >
            <PhoneCall className="w-3.5 h-3.5 fill-white shrink-0" />
            <span className="hidden xl:inline text-[11px]">1800-116-117</span>
            <span className="xl:hidden text-[11px]">SOS</span>
          </button>
        </div>
      </div>
    </header>
  );
};
