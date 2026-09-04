import React from 'react';
import { PhoneCall, AlertTriangle, X, ShieldAlert, HeartPulse, CheckCircle2 } from 'lucide-react';

interface PoisonControlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PoisonControlModal: React.FC<PoisonControlModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in select-none">
      <div className="bg-white rounded-3xl border border-neutral-200 max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-700 p-1.5 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 text-rose-600 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-700 block">
              Emergency Chemical Safety Protocol
            </span>
            <h2 className="text-xl font-black text-neutral-900">
              Poison Information Centre
            </h2>
          </div>
        </div>

        <p className="text-xs text-neutral-600 mb-6 leading-relaxed">
          In case of accidental pesticide ingestion, skin splash, or respiratory exposure, follow immediate emergency decontamination and call national helplines immediately.
        </p>

        {/* Big Call Button */}
        <a
          href="tel:1800116117"
          className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-md shadow-rose-600/20 text-sm mb-5 transition"
        >
          <PhoneCall className="w-5 h-5 fill-white" />
          <span>Call 1800-116-117 (24x7 Toll-Free)</span>
        </a>

        {/* Immediate First Aid Actions */}
        <div className="space-y-3 bg-neutral-50 rounded-2xl p-4 border border-neutral-200/80 text-xs">
          <h3 className="font-bold text-neutral-900 flex items-center gap-1.5">
            <HeartPulse className="w-4 h-4 text-rose-600" />
            <span>Immediate First-Aid Protocols:</span>
          </h3>

          <div className="space-y-2 text-neutral-600">
            <div className="flex items-start gap-2">
              <span className="font-bold text-neutral-900">1. Skin Splash:</span>
              <span>Remove contaminated clothes immediately. Drench skin with copious clean running water for 15+ minutes. Do not use soap harshly.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-neutral-900">2. Eye Contact:</span>
              <span>Hold eyelids open and flush gently with clean water for 15 minutes. Do not apply eye drops or oil.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-neutral-900">3. Inhalation:</span>
              <span>Move victim to fresh open air immediately. Loosen tight collar or belt. Keep warm.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-neutral-900">4. Chemical Container:</span>
              <span>Carry the product bottle / label to the hospital to identify active organophosphate or synthetic pyrethroid ingredients.</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-5 py-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-600 hover:bg-neutral-50 transition cursor-pointer"
        >
          Close Advisory
        </button>
      </div>
    </div>
  );
};
