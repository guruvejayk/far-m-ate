import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  AlertTriangle,
  FileText,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { BANNED_CHEMICALS_REGISTRY } from '../../data/agrochemicals';
import { LanguageCode } from '../../types';
import { TRANSLATIONS } from '../../lib/i18n/languages';

interface BannedChemicalsViewProps {
  language: LanguageCode;
  onNavigateToRecommendations: () => void;
}

export const BannedChemicalsView: React.FC<BannedChemicalsViewProps> = ({
  language,
  onNavigateToRecommendations,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const filtered = BANNED_CHEMICALS_REGISTRY.filter((chem) => {
    const matchesSearch =
      chem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chem.casNumber.includes(searchTerm) ||
      chem.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || chem.banType === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-950 via-neutral-900 to-rose-950 border border-rose-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-900/60 border border-rose-500/40 text-rose-300 text-xs font-mono mb-3">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              Statutory Gazette Database • Insecticides Act 1968
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
              BANNED PESTICIDES REGISTRY
            </h1>
            <p className="text-neutral-300 text-sm sm:text-base max-w-xl mt-2 leading-relaxed">
              Official gazette registry of cancelled, prohibited, and hazardous agrochemicals. Prevent illegal applicator poisoning and environmental contamination by switching to approved bio-alternatives.
            </p>
          </div>

          <button
            onClick={onNavigateToRecommendations}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-2xl text-xs font-bold transition shadow-lg shadow-emerald-950/50 cursor-pointer shrink-0"
          >
            <span>Browse Safe Bio-Alternatives</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search chemical name (e.g. Monocrotophos, Endosulfan, Paraquat)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-neutral-400">Filter By Ban Status:</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
          >
            <option value="all">All Registry Entries</option>
            <option value="Total Ban">Total Nationwide Ban</option>
            <option value="Strictly Restricted Use">Strictly Restricted Use</option>
          </select>
        </div>
      </div>

      {/* Chemical Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((chem) => (
          <div
            key={chem.id}
            className="bg-neutral-900/90 border border-neutral-800 hover:border-rose-500/40 rounded-3xl p-5 shadow-xl transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                    {chem.name}
                  </h3>
                  <span className="text-[11px] font-mono text-neutral-400">
                    CAS Registry: {chem.casNumber}
                  </span>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase shrink-0 ${
                    chem.banType === 'Total Ban'
                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                      : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}
                >
                  {chem.banType}
                </span>
              </div>

              <div className="mt-3 space-y-2 text-xs">
                <div className="bg-neutral-950 p-3 rounded-2xl border border-neutral-800/80">
                  <span className="text-[10px] font-mono text-rose-400 block font-semibold">
                    Toxicity & Reason for Prohibition:
                  </span>
                  <p className="text-neutral-300 mt-0.5 leading-relaxed">
                    {chem.reason}
                  </p>
                  <span className="text-[10px] font-mono text-neutral-500 mt-1 block">
                    Gazette Citation: {chem.gazetteNotification}
                  </span>
                </div>

                <div className="bg-emerald-950/40 p-3 rounded-2xl border border-emerald-900/40">
                  <span className="text-[10px] font-mono text-emerald-400 block font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Statutory Safe Biological Alternative:
                  </span>
                  <p className="text-emerald-200 mt-0.5 leading-relaxed">
                    {chem.safeApprovedAlternative}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800 text-[11px] text-neutral-400 flex items-center justify-between">
              <span>Class: {chem.toxicityClass}</span>
              <span className="text-rose-400 font-semibold">Do Not Spray</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
