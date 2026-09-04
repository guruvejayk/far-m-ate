import React from 'react';
import { Sprout, Sparkles, Eye } from 'lucide-react';
import { LanguageCode } from '../../types';
import { HOME_PAGE_TRANSLATIONS } from '../../data/homePageTranslations';

interface IsometricFieldViewProps {
  activeCrop: string;
  onSelectCrop: (crop: string) => void;
  onLaunchInspection: () => void;
  language?: LanguageCode;
}

export const IsometricFieldView: React.FC<IsometricFieldViewProps> = ({
  activeCrop,
  onSelectCrop,
  onLaunchInspection,
  language = 'en',
}) => {
  const homeT = HOME_PAGE_TRANSLATIONS[language] || HOME_PAGE_TRANSLATIONS.en;
  const cropNames: Record<string, string> = {
    Tomato: homeT.cropTomato,
    Wheat: homeT.cropWheat,
    Rice: homeT.cropRice,
    Cotton: homeT.cropCotton,
  };
  const localizedCropName = cropNames[activeCrop] || activeCrop;
  return (
    <div className="relative w-full h-[320px] sm:h-[360px] rounded-2xl bg-gradient-to-br from-[#f1f6ed] via-[#e9f2e4] to-[#dfead8] border border-emerald-900/10 overflow-hidden flex items-center justify-center select-none shadow-inner">
      {/* Background subtle grid pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="isometric-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 20 L 40 40 Z M 0 20 L 40 20"
              fill="none"
              stroke="#83a37b"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#isometric-grid)" />
      </svg>

      {/* Main Isometric SVG Field Illustration */}
      <svg
        viewBox="0 0 800 500"
        className="w-full h-full max-w-[720px] object-contain drop-shadow-md"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="plot-tomato" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b6d9a4" />
            <stop offset="100%" stopColor="#96bf81" />
          </linearGradient>
          <linearGradient id="plot-wheat" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dce8af" />
            <stop offset="100%" stopColor="#c5d88f" />
          </linearGradient>
          <linearGradient id="plot-rice" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8fb87e" />
            <stop offset="100%" stopColor="#6ea05c" />
          </linearGradient>
          <linearGradient id="plot-cotton" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a9d3b7" />
            <stop offset="100%" stopColor="#7cb690" />
          </linearGradient>

          <linearGradient id="terrace-edge" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6e8f60" />
            <stop offset="100%" stopColor="#4f6e43" />
          </linearGradient>
          <linearGradient id="canal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bfdfd3" />
            <stop offset="100%" stopColor="#9cc9b9" />
          </linearGradient>
        </defs>

        {/* Base Terraced Ground Block */}
        <g transform="translate(400, 240)">
          {/* Main isometric base polygon */}
          <polygon
            points="0,-160 320,0 0,160 -320,0"
            fill="#c4dbae"
            stroke="#a3be8c"
            strokeWidth="2"
          />

          {/* South terrace vertical extrusion */}
          <polygon
            points="0,160 320,0 320,24 0,184"
            fill="url(#terrace-edge)"
          />
          <polygon
            points="0,160 -320,0 -320,24 0,184"
            fill="#5b7c4f"
          />

          {/* Irrigation canal running through field */}
          <polygon
            points="-10,-155 310,-5 295,3 -25,-147"
            fill="url(#canal)"
            stroke="#87b6a4"
            strokeWidth="1"
          />

          {/* Plot 1: Tomato (North-West Plot) */}
          <g
            className="cursor-pointer transition-all duration-200 group"
            onClick={() => onSelectCrop('Tomato')}
          >
            <polygon
              points="-180,-60 -30,-135 70,-85 -80,-10"
              fill={activeCrop === 'Tomato' ? '#a5cf90' : 'url(#plot-tomato)'}
              stroke={activeCrop === 'Tomato' ? '#2e7d32' : '#8fae77'}
              strokeWidth={activeCrop === 'Tomato' ? '3' : '1.5'}
            />
            {/* Crop furrow lines */}
            <path
              d="M -160,-65 L -60,-15 M -140,-75 L -40,-25 M -120,-85 L -20,-35 M -100,-95 L 0,-45 M -80,-105 L 20,-55 M -60,-115 L 40,-65"
              stroke="#7da66b"
              strokeWidth="1.5"
              strokeDasharray="3 4"
            />
          </g>

          {/* Plot 2: Wheat (North-East Plot) */}
          <g
            className="cursor-pointer transition-all duration-200 group"
            onClick={() => onSelectCrop('Wheat')}
          >
            <polygon
              points="10,-60 160,-135 260,-85 110,-10"
              fill={activeCrop === 'Wheat' ? '#d6e49e' : 'url(#plot-wheat)'}
              stroke={activeCrop === 'Wheat' ? '#b45309' : '#b2c481'}
              strokeWidth={activeCrop === 'Wheat' ? '3' : '1.5'}
            />
            <path
              d="M 30,-65 L 130,-15 M 50,-75 L 150,-25 M 70,-85 L 170,-35 M 90,-95 L 190,-45 M 110,-105 L 210,-55"
              stroke="#b1bf7a"
              strokeWidth="1.5"
              strokeDasharray="3 4"
            />
          </g>

          {/* Plot 3: Rice (South-East Plot) */}
          <g
            className="cursor-pointer transition-all duration-200 group"
            onClick={() => onSelectCrop('Rice')}
          >
            <polygon
              points="10,15 110,65 240,0 140,-50"
              fill={activeCrop === 'Rice' ? '#74a761' : 'url(#plot-rice)'}
              stroke={activeCrop === 'Rice' ? '#15803d' : '#689955'}
              strokeWidth={activeCrop === 'Rice' ? '3' : '1.5'}
            />
            <path
              d="M 30,10 L 130,-40 M 50,20 L 150,-30 M 70,30 L 170,-20 M 90,40 L 190,-10"
              stroke="#538241"
              strokeWidth="1.5"
              strokeDasharray="2 3"
            />
          </g>

          {/* Plot 4: Cotton (South-West Plot) */}
          <g
            className="cursor-pointer transition-all duration-200 group"
            onClick={() => onSelectCrop('Cotton')}
          >
            <polygon
              points="-180,15 -80,-35 20,15 -80,65"
              fill={activeCrop === 'Cotton' ? '#92c5a3' : 'url(#plot-cotton)'}
              stroke={activeCrop === 'Cotton' ? '#0284c7' : '#73a584'}
              strokeWidth={activeCrop === 'Cotton' ? '3' : '1.5'}
            />
            <path
              d="M -160,10 L -60,60 M -140,0 L -40,50 M -120,-10 L -20,40 M -100,-20 L 0,30"
              stroke="#629473"
              strokeWidth="1.5"
              strokeDasharray="3 4"
            />
          </g>

          {/* Farm roadway / separator path */}
          <path
            d="M -300,-10 L 300,-10"
            stroke="#e7efdc"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M 0,-150 L 0,150"
            stroke="#e7efdc"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Subtle sensor node markers */}
          <circle cx="-50" cy="-60" r="4" fill="#15803d" />
          <circle cx="-50" cy="-60" r="10" fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.6" className="animate-ping" />

          <circle cx="150" cy="-40" r="4" fill="#ca8a04" />
          <circle cx="80" cy="30" r="4" fill="#0284c7" />
        </g>
      </svg>

      {/* Floating Interactive Badge matching the screenshot */}
      <div className="absolute top-[28%] left-[22%] sm:left-[26%] z-20">
        <button
          onClick={onLaunchInspection}
          className="group flex items-center gap-2 bg-white/95 backdrop-blur-xs border border-emerald-600/40 hover:border-emerald-600 px-4 py-2 rounded-full shadow-lg shadow-emerald-950/10 text-xs font-bold text-[#14422b] hover:text-[#0b281a] hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Sprout className="w-3.5 h-3.5 text-emerald-600 group-hover:rotate-12 transition-transform" />
          <span>{localizedCropName} — {homeT.launchInspectionBtn}</span>
        </button>
      </div>

      {/* Bottom overlay status */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-medium text-emerald-900/70 bg-white/60 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-emerald-900/10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Sentinel Mesh: Krishnagiri South Block 4</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span>Resolution: 1.2cm/px</span>
          <span>Dew Index: 0.14mm</span>
        </div>
      </div>
    </div>
  );
};
