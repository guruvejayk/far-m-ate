import React from 'react';
import {
  LayoutDashboard,
  Sprout,
  ShieldAlert,
  Sparkles,
  Bug,
  BookOpen,
} from 'lucide-react';
import { FeatureMode, LanguageCode } from '../../types';
import { HOME_PAGE_TRANSLATIONS } from '../../data/homePageTranslations';
import { TRANSLATIONS } from '../../lib/i18n/languages';

interface SidebarProps {
  currentMode: string;
  onSelectMode: (mode: FeatureMode | 'dashboard' | 'myfarm' | 'registry') => void;
  language?: LanguageCode;
  isOpen?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentMode,
  onSelectMode,
  language = 'en',
}) => {
  const homeT = HOME_PAGE_TRANSLATIONS[language] || HOME_PAGE_TRANSLATIONS.en;
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const navItems = [
    { id: 'dashboard', label: homeT.tabDashboard, icon: LayoutDashboard },
    { id: 'myfarm', label: homeT.tabMyFarm || t.myFarm || 'My Farm', icon: Sprout },
    { id: 'counterfeit', label: homeT.tabCounterfeit, icon: ShieldAlert },
    { id: 'recommendation', label: homeT.tabRecommendation, icon: Sparkles },
    { id: 'pest', label: homeT.tabPest, icon: Bug },
  ];

  return (
    <aside className="w-56 lg:w-64 bg-white border-r border-neutral-200/80 flex flex-col shrink-0 min-h-screen select-none">
      {/* Brand Header */}
      <div className="p-6 pb-5">
        <h2 className="text-xl font-extrabold text-[#113a24] tracking-tight">
          AgriShield AI
        </h2>
        <p className="text-xs font-medium text-neutral-400 mt-0.5 tracking-wide">
          {language === 'hi' ? 'उन्नत कृषि परिशुद्धता' : language === 'ta' ? 'மேம்பட்ட பண்ணை துல்லியம்' : language === 'te' ? 'ఉన్నత వ్యవసాయ ఖచ్చితత్వం' : 'Enterprise Precision'}
        </p>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 space-y-1.5">
        {navItems.map((item) => {
          const isActive = currentMode === item.id || (item.id === 'dashboard' && currentMode === 'home');
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSelectMode(item.id as any)}
              className={`w-full text-left flex items-center px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-[#15462c] text-white shadow-sm shadow-emerald-950/20'
                  : 'text-neutral-700 hover:text-[#15462c] hover:bg-neutral-100/80'
              }`}
            >
              <Icon className={`w-4 h-4 mr-3 shrink-0 ${isActive ? 'text-white' : 'text-neutral-500'}`} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
