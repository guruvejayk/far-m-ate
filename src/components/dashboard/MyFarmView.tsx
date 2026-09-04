import React, { useState } from 'react';
import {
  Sprout,
  MapPin,
  Calendar,
  Layers,
  Droplets,
  Thermometer,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { User, LanguageCode } from '../../types';
import { IsometricFieldView } from './IsometricFieldView';

interface MyFarmViewProps {
  user: User;
  language: LanguageCode;
  onNavigateToPest: () => void;
  onNavigateToVerification: () => void;
  onNavigateToRecommendations: () => void;
}

export const MyFarmView: React.FC<MyFarmViewProps> = ({
  user,
  onNavigateToPest,
  onNavigateToVerification,
  onNavigateToRecommendations,
}) => {
  const [selectedCrop, setSelectedCrop] = useState('Tomato');

  const plots = [
    {
      name: 'Plot A — Tomato Field',
      crop: 'Tomato',
      acreage: '1.5 Acres',
      status: 'Vegetative Phase (Day 34)',
      health: '94%',
      soilMoisture: '62%',
      irrigation: 'Drip scheduled 05:30 PM',
      risk: 'Low',
    },
    {
      name: 'Plot B — Golden Wheat Block',
      crop: 'Wheat',
      acreage: '1.2 Acres',
      status: 'Tillering Phase (Day 22)',
      health: '91%',
      soilMoisture: '54%',
      irrigation: 'Completed yesterday',
      risk: 'None',
    },
    {
      name: 'Plot C — Wetland Paddy / Rice',
      crop: 'Rice',
      acreage: '1.0 Acre',
      status: 'Transplanted (Day 18)',
      health: '96%',
      soilMoisture: '88%',
      irrigation: 'Standing water maintained',
      risk: 'Stem Borer Monitoring Active',
    },
    {
      name: 'Plot D — Long Staple Cotton',
      crop: 'Cotton',
      acreage: '0.8 Acres',
      status: 'Squaring (Day 42)',
      health: '88%',
      soilMoisture: '58%',
      irrigation: 'Drip scheduled tomorrow',
      risk: 'Whitefly Sentinel Scan Active',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in select-none px-4 sm:px-8 py-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Agronomic Field Ledger • Parcel Mapping
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#113a24] tracking-tight">
            {user.farmProfile?.farmName || 'Shri Lakshmi Organic Farm'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1 flex items-center gap-1.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{user.farmProfile?.location} • {user.farmProfile?.farmSizeAcres} Total Acres</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateToPest}
            className="bg-[#15462c] hover:bg-[#0f3420] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer"
          >
            <Sprout className="w-3.5 h-3.5" />
            <span>Launch Crop Inspection</span>
          </button>
        </div>
      </div>

      {/* Field visualizer */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs">
        <h2 className="text-base font-bold text-neutral-900 mb-3">
          Field Cadastral Sentinel Map
        </h2>
        <IsometricFieldView
          activeCrop={selectedCrop}
          onSelectCrop={setSelectedCrop}
          onLaunchInspection={onNavigateToPest}
        />
      </div>

      {/* Plot cards list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plots.map((plot) => (
          <div
            key={plot.name}
            className={`p-5 rounded-2xl bg-white border transition shadow-xs flex flex-col justify-between ${
              selectedCrop === plot.crop ? 'border-emerald-600 ring-2 ring-emerald-50' : 'border-neutral-200 hover:border-neutral-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-neutral-900">
                  {plot.name}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {plot.acreage}
                </span>
              </div>
              <p className="text-xs text-neutral-500 mb-3 font-medium">
                {plot.status}
              </p>

              <div className="grid grid-cols-3 gap-2 bg-neutral-50 p-2.5 rounded-xl text-center text-xs">
                <div>
                  <span className="text-[10px] text-neutral-400 block">Health</span>
                  <span className="font-bold text-emerald-700">{plot.health}</span>
                </div>
                <div className="border-x border-neutral-200 px-1">
                  <span className="text-[10px] text-neutral-400 block">Moisture</span>
                  <span className="font-bold text-cyan-700">{plot.soilMoisture}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block">Risk</span>
                  <span className="font-bold text-amber-700">{plot.risk}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
              <span className="text-neutral-500">{plot.irrigation}</span>
              <button
                onClick={() => {
                  setSelectedCrop(plot.crop);
                  onNavigateToPest();
                }}
                className="font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
              >
                <span>Inspect Crop</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
