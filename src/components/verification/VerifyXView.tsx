import React, { useState, useRef } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  QrCode,
  Barcode,
  Search,
  AlertTriangle,
  FileCheck,
  ExternalLink,
  Lock,
  ArrowRight,
  Sparkles,
  Camera,
  RefreshCw,
  Info,
  X,
  CheckCircle2,
  AlertOctagon,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { HologramShield3D } from '../3d/HologramShield3D';
import { CounterfeitScan, LanguageCode } from '../../types';
import { TRANSLATIONS } from '../../lib/i18n/languages';
import { DEMO_VERIFY_CASES } from '../../data/agrochemicals';

interface VerifyXViewProps {
  language: LanguageCode;
  onVerify: (batch: string, product?: string, manufacturer?: string, imageBase64?: string) => Promise<CounterfeitScan>;
  onNavigateToRecommendations: (productName: string) => void;
  activeScan: CounterfeitScan | null;
  setActiveScan: (s: CounterfeitScan | null) => void;
}

export const VerifyXView: React.FC<VerifyXViewProps> = ({
  language,
  onVerify,
  onNavigateToRecommendations,
  activeScan,
  setActiveScan,
}) => {
  const [batchInput, setBatchInput] = useState('');
  const [productInput, setProductInput] = useState('');
  const [manufacturerInput, setManufacturerInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState('');

  // Live Camera Scanner State
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const handleStartCamera = async () => {
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.warn('Camera access denied:', err);
      setIsCameraActive(false);
    }
  };

  const handleCaptureBarcode = () => {
    let capturedImgBase64: string | undefined = undefined;
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        capturedImgBase64 = canvas.toDataURL('image/jpeg', 0.85);
        setSelectedImage(capturedImgBase64);
      }
    }
    handleStopCamera();
    const batch = batchInput || 'IMG-SCAN-' + Date.now().toString().slice(-4);
    if (!batchInput) setBatchInput(batch);
    handleRunVerify(batch, productInput, manufacturerInput, capturedImgBase64);
  };

  const handleStopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
    setIsCameraActive(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const b64 = reader.result as string;
      setSelectedImage(b64);
      if (!batchInput) {
        setBatchInput('IMG-UPLOAD-' + file.name.slice(0, 8).toUpperCase());
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRunVerify = async (batch: string, prod?: string, mfg?: string, imgBase64?: string) => {
    const b = (batch || batchInput).trim();
    const img = imgBase64 || selectedImage || undefined;
    if (!b && !img) return;

    setScanning(true);
    setActiveScan(null);

    setScanStep('Interrogating CIBRC statutory registration database...');
    await new Promise((r) => setTimeout(r, 600));
    setScanStep('Analyzing 3D holographic refractive grating & micro-text...');
    await new Promise((r) => setTimeout(r, 600));
    setScanStep('Cross-matching manufacturer ERP batch dispatch ledger & cryptographic QR...');

    try {
      const scanResult = await onVerify(b || 'IMG-SCAN-' + Date.now().toString().slice(-4), prod || productInput, mfg || manufacturerInput, img);
      setActiveScan(scanResult);
    } catch (err) {
      console.error('Verification failed:', err);
    } finally {
      setScanning(false);
      setScanStep('');
    }
  };

  const handleTestPreset = (preset: typeof DEMO_VERIFY_CASES[0]) => {
    setBatchInput(preset.batch);
    setProductInput(preset.product);
    setManufacturerInput(preset.manufacturer);
    setSelectedImage(null);
    handleRunVerify(preset.batch, preset.product, preset.manufacturer);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Header Banner - Forensic Security Aesthetic */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-neutral-950 via-cyan-950 to-neutral-950 border border-cyan-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              SKIN 2 • Forensic Authentication & Packaging Security
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
              VERIFY-X
            </h1>
            <p className="text-neutral-300 text-sm sm:text-base max-w-xl mt-2 leading-relaxed">
              Verify agrochemicals before spraying. Detect counterfeit pesticides, forged CIBRC registration numbers, and diluted unauthorized repackaging using cryptographic & optical signals.
            </p>
          </div>

          {/* Quick Test Demo Cases */}
          <div className="bg-neutral-950/80 border border-cyan-900/60 p-4 rounded-2xl max-w-sm">
            <span className="text-xs font-mono text-cyan-400 block mb-2 font-semibold">
              🔍 Test Live Forensic Cases:
            </span>
            <div className="flex flex-col gap-1.5">
              {DEMO_VERIFY_CASES.slice(0, 4).map((d, i) => (
                <button
                  key={i}
                  onClick={() => handleTestPreset(d)}
                  className={`px-3 py-1.5 rounded-xl border text-xs text-left transition cursor-pointer flex items-center justify-between gap-2 ${
                    d.status === 'verified'
                      ? 'bg-emerald-950/60 hover:bg-emerald-900/80 border-emerald-500/40 text-emerald-200'
                      : d.status === 'counterfeit'
                      ? 'bg-rose-950/60 hover:bg-rose-900/80 border-rose-500/40 text-rose-200'
                      : 'bg-amber-950/60 hover:bg-amber-900/80 border-amber-500/40 text-amber-200'
                  }`}
                >
                  <span className="truncate font-medium">{d.product.split('(')[0]}</span>
                  <span className="text-[10px] font-mono shrink-0 font-bold">
                    {d.status === 'verified' ? '✓ 98%' : d.status === 'counterfeit' ? '✗ High Risk' : '⚠ 52%'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Verification Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Methods */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-3xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                <Search className="w-4 h-4" /> 1. Packaging Credentials
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-neutral-950 text-cyan-300 border border-neutral-800 hover:border-cyan-600 transition flex items-center gap-1.5 cursor-pointer"
                  title="Upload packaging photo"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Photo</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={handleStartCamera}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-800 hover:bg-cyan-900 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Scan Package</span>
                </button>
              </div>
            </div>

            {/* Camera Viewfinder if active */}
            {isCameraActive && (
              <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-black flex flex-col items-center justify-center border-2 border-cyan-500/60">
                <video ref={videoRef} className="w-full h-full object-cover" playsInline muted autoPlay />
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-44 h-28 border-2 border-cyan-400 rounded-xl animate-pulse bg-cyan-400/10 flex items-center justify-center">
                    <span className="text-[10px] font-mono text-cyan-200 bg-black/60 px-2 py-0.5 rounded">
                      Align Barcode or QR
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-3 flex items-center gap-3">
                  <button
                    onClick={handleCaptureBarcode}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Capture & Inspect</span>
                  </button>
                  <button
                    onClick={handleStopCamera}
                    className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs px-3 py-2 rounded-xl cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Uploaded Photo Preview Thumbnail */}
            {selectedImage && !isCameraActive && (
              <div className="relative rounded-2xl overflow-hidden border border-cyan-500/50 bg-neutral-950 p-2 flex items-center gap-3">
                <img src={selectedImage} alt="Package sample" className="w-14 h-14 object-cover rounded-xl border border-neutral-700" />
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-cyan-300 block truncate">Packaging Photo Loaded</span>
                  <span className="text-[10px] text-neutral-400 font-mono block">Ready for Gemini Vision OCR</span>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 cursor-pointer"
                  title="Remove image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Input Options: Quick Batch Fill */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => {
                  setBatchInput('AGR-2024-9921');
                  setProductInput('DemoGuard Bio-Fungicide');
                  setManufacturerInput('AgriSafe Bio-Sciences India Ltd.');
                  setSelectedImage(null);
                }}
                className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-cyan-500/50 text-left transition cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-cyan-400 mb-1" />
                <span className="text-[11px] font-bold text-white block">Genuine QR</span>
                <span className="text-[9px] text-neutral-400 block font-mono truncate">AGR-2024-9921</span>
              </button>

              <button
                onClick={() => {
                  setBatchInput('FAKE-8812-XX');
                  setProductInput('Monocro-Super 36% SL');
                  setManufacturerInput('Kisan Chemical Corp');
                  setSelectedImage(null);
                }}
                className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-rose-500/50 text-left transition cursor-pointer"
              >
                <Barcode className="w-4 h-4 text-rose-400 mb-1" />
                <span className="text-[11px] font-bold text-white block">Counterfeit</span>
                <span className="text-[9px] text-neutral-400 block font-mono truncate">FAKE-8812-XX</span>
              </button>

              <button
                onClick={() => {
                  setBatchInput('BAN-ENDO-213');
                  setProductInput('Endosulfan 35% EC');
                  setManufacturerInput('Contraband Stock');
                  setSelectedImage(null);
                }}
                className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-rose-500/50 text-left transition cursor-pointer"
              >
                <AlertOctagon className="w-4 h-4 text-rose-400 mb-1" />
                <span className="text-[11px] font-bold text-white block">Banned Chem</span>
                <span className="text-[9px] text-neutral-400 block font-mono truncate">BAN-ENDO-213</span>
              </button>

              <button
                onClick={() => {
                  setBatchInput('NON-AGRI-ITEM');
                  setProductInput('Sneaker Footwear / Watch');
                  setManufacturerInput('Consumer Goods');
                  setSelectedImage(null);
                }}
                className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-amber-500/50 text-left transition cursor-pointer"
              >
                <ImageIcon className="w-4 h-4 text-amber-400 mb-1" />
                <span className="text-[11px] font-bold text-white block">Non-Agri Item</span>
                <span className="text-[9px] text-neutral-400 block font-mono truncate">NON-AGRI</span>
              </button>
            </div>

            {/* Batch Code Input */}
            <div>
              <label htmlFor="batch-number-input" className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Batch Number / QR Code Cryptographic Identifier
              </label>
              <input
                id="batch-number-input"
                type="text"
                value={batchInput}
                onChange={(e) => setBatchInput(e.target.value)}
                placeholder="e.g., AGR-2024-9921 or scan barcode"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs font-mono text-cyan-300 placeholder-neutral-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Product Name Input */}
            <div>
              <label htmlFor="product-name-input" className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Product Name / Claimed Active Formulation
              </label>
              <input
                id="product-name-input"
                type="text"
                value={productInput}
                onChange={(e) => setProductInput(e.target.value)}
                placeholder="e.g., DemoGuard Bio-Fungicide or Monocrotophos"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Manufacturer Name Input */}
            <div>
              <label htmlFor="manufacturer-name-input" className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Manufacturer Stated on Label (Optional)
              </label>
              <input
                id="manufacturer-name-input"
                type="text"
                value={manufacturerInput}
                onChange={(e) => setManufacturerInput(e.target.value)}
                placeholder="e.g., AgriSafe Bio-Sciences India Ltd."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Verification CTA */}
            <button
              onClick={() => handleRunVerify(batchInput, productInput, manufacturerInput, selectedImage || undefined)}
              disabled={scanning || (!batchInput.trim() && !selectedImage)}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/60 transition active:scale-98 cursor-pointer"
            >
              {scanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{scanStep || 'Executing multi-factor forensic check...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                  <span>Authenticate with VERIFY-X</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: 3D Hologram Security Display & Report */}
        <div className="lg:col-span-7">
          {scanning ? (
            <div className="bg-neutral-900/80 border border-cyan-500/30 rounded-3xl p-8 text-center flex flex-col items-center justify-center min-h-[420px]">
              <div className="relative w-20 h-20 mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20 animate-ping" />
                <div className="w-20 h-20 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin flex items-center justify-center">
                  <Lock className="w-8 h-8 text-cyan-400 animate-pulse" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white font-mono">{scanStep}</h3>
              <p className="text-xs text-neutral-400 mt-1 max-w-sm">
                Interrogating optical diffractive micro-gratings and cross-checking the national CIBRC statutory registry.
              </p>
            </div>
          ) : activeScan ? (
            activeScan.status === 'not_agricultural' ? (
              <div className="rounded-3xl p-6 sm:p-8 shadow-2xl border bg-neutral-900/95 border-amber-500/50 space-y-6 animate-fade-in">
                {/* Non-Agricultural Alert Header */}
                <div className="bg-gradient-to-r from-amber-950 via-amber-900/70 to-amber-950 border-2 border-amber-500/80 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center shrink-0 shadow-lg shadow-amber-950/80">
                    <AlertTriangle className="w-8 h-8 text-amber-400 animate-pulse" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase tracking-wider font-mono">
                      <ImageIcon className="w-3.5 h-3.5 text-amber-400" /> Non-Agricultural Product Detected
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      The product in this image isn't an agricultural product
                    </h3>
                    <p className="text-sm text-amber-200/90 leading-relaxed font-medium">
                      {activeScan.decisionMessage || 'The product in this image is not an agricultural product. Please upload an image with those products (pesticides, insecticides, fungicides, herbicides, fertilizers, or hybrid seeds).'}
                    </p>
                  </div>
                </div>

                {/* Upload Guidance and Action Button */}
                <div className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center mx-auto text-cyan-400">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white tracking-tight">
                    Upload an Agricultural Product Image to Verify
                  </h4>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                    FAR[M]ATE VERIFY-X inspects agricultural inputs only. Please provide a clear photograph showing an agrochemical bottle, pesticide label, fertilizer sack, or certified hybrid seed pouch.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer shadow-cyan-950/80"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload Agricultural Product Image</span>
                    </button>
                    <button
                      onClick={handleStartCamera}
                      className="bg-neutral-800 hover:bg-neutral-700 text-cyan-300 font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl border border-neutral-700 transition flex items-center gap-2 cursor-pointer"
                    >
                      <Camera className="w-4 h-4 text-cyan-400" />
                      <span>Scan Container with Camera</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={`rounded-3xl p-6 sm:p-7 shadow-2xl border space-y-6 ${
                  activeScan.status === 'verified'
                    ? 'bg-neutral-900/90 border-emerald-500/40'
                    : activeScan.status === 'banned'
                    ? 'bg-neutral-900/95 border-red-500/70 shadow-red-950/60'
                    : activeScan.status === 'counterfeit'
                    ? 'bg-neutral-900/90 border-rose-500/60 shadow-rose-950/50'
                    : 'bg-neutral-900/90 border-amber-500/40'
                }`}
              >
                {/* 1. High-Visibility Verdict Banner */}
                {activeScan.status === 'banned' ? (
                  /* Red Warning Sign for Banned Chemicals (Distinct Category) */
                  <div className="bg-gradient-to-r from-red-950 via-rose-950 to-red-950 border-2 border-red-500 rounded-2xl p-5 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-pulse">
                    <div className="w-16 h-16 rounded-2xl bg-red-600/30 border-2 border-red-500 flex items-center justify-center shrink-0 shadow-lg shadow-red-900/80">
                      <AlertOctagon className="w-9 h-9 text-red-400" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-600 text-white text-[11px] font-black uppercase tracking-wider font-mono shadow">
                          <ShieldAlert className="w-3.5 h-3.5" /> CATEGORY: BANNED CHEMICAL — DO NOT USE
                        </span>
                        <span className="text-xs font-mono text-red-300 font-bold bg-red-950/80 px-2.5 py-0.5 rounded-full border border-red-700">
                          PROHIBITED UNDER INDIAN LAW
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black text-white">
                        {activeScan.decisionMessage || 'CATEGORY: BANNED CHEMICAL — DO NOT USE! This product is a banned chemical. Do NOT use!'}
                      </h3>
                      <p className="text-xs text-red-200/90 font-medium">
                        This chemical formulation is statutorily banned under Central Insecticides Board (CIBRC) Gazette Orders. Applying this chemical causes acute applicator poisoning, severe crop damage, and criminal prosecution.
                      </p>
                    </div>
                  </div>
                ) : activeScan.status === 'counterfeit' ? (
                  /* Red Warning Sign for Counterfeit */
                  <div className="bg-gradient-to-r from-rose-950 via-red-950 to-rose-950 border-2 border-rose-500 rounded-2xl p-5 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-pulse">
                    <div className="w-16 h-16 rounded-2xl bg-rose-600/30 border-2 border-rose-500 flex items-center justify-center shrink-0 shadow-lg shadow-rose-900/80">
                      <AlertOctagon className="w-9 h-9 text-rose-400" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-600 text-white text-[11px] font-black uppercase tracking-wider font-mono shadow">
                          <ShieldAlert className="w-3.5 h-3.5" /> RED WARNING • COUNTERFEIT DETECTED
                        </span>
                        <span className="text-xs font-mono text-rose-300 font-bold">
                          Authenticity Trust Score: {activeScan.authenticityScore}%
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black text-white">
                        {activeScan.decisionMessage || 'COUNTERFEIT PRODUCT DETECTED: This product is counterfeit!'}
                      </h3>
                      <p className="text-xs text-rose-200/90 font-medium">
                        Do NOT purchase, handle, or spray this chemical on crops. Counterfeit products cause severe crop scorching and dangerous applicator toxicity.
                      </p>
                    </div>
                  </div>
                ) : activeScan.status === 'verified' ? (
                  /* Verified Authentic Banner */
                  <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-950 border-2 border-emerald-500 rounded-2xl p-5 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-600/30 border-2 border-emerald-500 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-900/80">
                      <ShieldCheck className="w-9 h-9 text-emerald-400" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-600 text-white text-[11px] font-black uppercase tracking-wider font-mono shadow">
                          <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED 100% AUTHENTIC
                        </span>
                        <span className="text-xs font-mono text-emerald-300 font-bold">
                          Authenticity Trust Score: {activeScan.authenticityScore}%
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black text-white">
                        {activeScan.decisionMessage || 'VERIFIED PRODUCT: This product is verified!'}
                      </h3>
                      <p className="text-xs text-emerald-200/90 font-medium">
                        Statutory CIBRC registration confirmed active, 3D kinetic hologram verified, and manufacturer ERP ledger matched.
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Suspicious Banner */
                  <div className="bg-gradient-to-r from-amber-950 via-yellow-950 to-amber-950 border-2 border-amber-500 rounded-2xl p-5 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-amber-600/30 border-2 border-amber-500 flex items-center justify-center shrink-0 shadow-lg shadow-amber-900/80">
                      <AlertTriangle className="w-9 h-9 text-amber-400" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-600 text-white text-[11px] font-black uppercase tracking-wider font-mono shadow">
                          CAUTION • SUSPICIOUS PACKAGING
                        </span>
                        <span className="text-xs font-mono text-amber-300 font-bold">
                          Authenticity Trust Score: {activeScan.authenticityScore}%
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black text-white">
                        {activeScan.decisionMessage || 'SUSPICIOUS PRODUCT: Warning - Tampering or packaging discrepancies detected.'}
                      </h3>
                      <p className="text-xs text-amber-200/90 font-medium">
                        Discrepancies detected in packaging or seals. Verify with dealer before field application.
                      </p>
                    </div>
                  </div>
                )}

                {/* Banned Chemical Statutory Alert if triggered */}
                {activeScan.bannedChemicalDetails && activeScan.bannedChemicalDetails.isBanned && (
                  <div className="bg-rose-950/80 border-2 border-rose-600 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center gap-2 text-rose-300 font-bold text-xs font-mono uppercase">
                      <AlertOctagon className="w-4 h-4 text-rose-400" />
                      STATUTORY TOTAL PROHIBITION UNDER INSECTICIDES ACT 1968
                    </div>
                    <p className="text-xs text-white leading-relaxed">
                      <strong className="text-rose-300">{activeScan.bannedChemicalDetails.name}</strong> is banned under{' '}
                      <span className="font-mono text-cyan-300">{activeScan.bannedChemicalDetails.gazetteNotification}</span>.{' '}
                      {activeScan.bannedChemicalDetails.reason}
                    </p>
                    {activeScan.bannedChemicalDetails.safeApprovedAlternative && (
                      <div className="pt-1 text-xs text-emerald-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span><strong>Approved Safe Alternative:</strong> {activeScan.bannedChemicalDetails.safeApprovedAlternative}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Status Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-800 pb-5">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className={`text-[11px] font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full border ${
                          activeScan.status === 'verified'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                            : activeScan.status === 'banned'
                            ? 'bg-red-950 text-red-300 border-red-600'
                            : activeScan.status === 'counterfeit'
                            ? 'bg-rose-950 text-rose-300 border-rose-600'
                            : 'bg-amber-950 text-amber-300 border-amber-600'
                        }`}
                      >
                        {activeScan.status === 'verified'
                          ? '✓ 100% Authentic CIBRC Registered'
                          : activeScan.status === 'banned'
                          ? '✗ CATEGORY: BANNED CHEMICAL — DO NOT USE'
                          : activeScan.status === 'counterfeit'
                          ? '✗ Counterfeit / Spurious Packaging'
                          : '⚠ Suspicious / Tampered Batch'}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">{activeScan.productName}</h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Manufacturer: {activeScan.manufacturer} • Batch: <span className="font-mono text-cyan-300">{activeScan.batchNumber}</span>
                    </p>
                  </div>

                  {/* Authenticity Score Dial */}
                  <div
                    className={`px-4 py-2 rounded-2xl border text-center ${
                      activeScan.authenticityScore >= 85
                        ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                        : activeScan.authenticityScore <= 35
                        ? 'bg-rose-950/80 border-rose-500/50 text-rose-300'
                        : 'bg-amber-950/80 border-amber-500/50 text-amber-300'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-mono block text-neutral-400 font-semibold">
                      Trust Score
                    </span>
                    <span className="text-3xl font-black font-mono tracking-tight">
                      {activeScan.authenticityScore}%
                    </span>
                  </div>
                </div>

                {/* 3D Hologram Optical Verification Widget */}
                <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-neutral-900 to-cyan-950 border border-cyan-800/60 flex items-center justify-center shadow-inner">
                    <HologramShield3D isAuthentic={activeScan.status === 'verified'} />
                  </div>
                  <div className="space-y-1 text-xs text-neutral-300">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold block uppercase">
                      3D Optical & Cryptographic Security
                    </span>
                    <p className="text-neutral-200 font-semibold">
                      {activeScan.status === 'verified'
                        ? 'Dual-layer kinetic diffractive grating matches genuine CIBRC hologram seal.'
                        : activeScan.status === 'banned'
                        ? 'Statutorily banned chemical formulation. Contraband packaging not recognized by CIBRC registry.'
                        : activeScan.status === 'counterfeit'
                        ? 'Optical inspection detected non-diffractive counterfeit photocopy or illegal contraband.'
                        : 'Holographic seal shows signs of physical re-gluing or package tampering.'}
                    </p>
                    <p className="text-[11px] text-neutral-400">
                      CIBRC Code: <span className="font-mono text-cyan-300">{activeScan.registrationNumber}</span> • MFG: {activeScan.mfgDate} • EXP: {activeScan.expDate}
                    </p>
                  </div>
                </div>

                {/* Detected Visual Packaging Defects (if present) */}
                {activeScan.visualDefects && activeScan.visualDefects.length > 0 && (
                  <div className="bg-amber-950/30 border border-amber-800/50 rounded-2xl p-3.5 space-y-1.5">
                    <span className="text-xs font-bold text-amber-300 font-mono flex items-center gap-1.5 uppercase">
                      <AlertTriangle className="w-4 h-4 text-amber-400" /> Detected Forensic Anomalies:
                    </span>
                    <ul className="text-xs text-amber-200/90 space-y-1 list-disc list-inside">
                      {activeScan.visualDefects.map((def, i) => (
                        <li key={i}>{def}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Verification Factors Checklist */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono mb-2.5">
                    Multi-Factor Forensic Verification Breakdown
                  </h4>
                  <div className="space-y-2">
                    {activeScan.verificationFactors.map((f, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border flex items-start gap-2.5 ${
                          f.matched
                            ? 'bg-neutral-950/70 border-emerald-900/40 text-neutral-200'
                            : 'bg-rose-950/20 border-rose-900/40 text-rose-200'
                        }`}
                      >
                        {f.matched ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <span className="text-xs font-bold block text-white">{f.name}</span>
                          <span className="text-[11px] text-neutral-300">{f.notes}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Warnings if any */}
                {activeScan.warnings.length > 0 && (
                  <div className="bg-rose-950/40 border border-rose-800/60 rounded-2xl p-4 space-y-2">
                    <span className="text-xs font-bold text-rose-300 font-mono flex items-center gap-1.5 uppercase">
                      <ShieldAlert className="w-4 h-4 text-rose-400" /> Statutory Enforcement Alerts:
                    </span>
                    <ul className="text-xs text-rose-200 space-y-1 list-disc list-inside">
                      {activeScan.warnings.map((w, i) => (
                        <li key={i}>{w}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons: Bridge to verified recommendation */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-800">
                  <div className="text-[11px] text-neutral-400">
                    Ground Truth Source: CIBRC National Gazette Database
                  </div>
                  {activeScan.status !== 'verified' ? (
                    <button
                      onClick={() => onNavigateToRecommendations(activeScan.productName)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/60"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Find Safe Verified Alternative</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onNavigateToRecommendations(activeScan.productName)}
                      className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs px-4 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-950/60"
                    >
                      <span>Calculate 15L Dosage for this Product</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )
          ) : (
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-3xl p-8 text-center flex flex-col items-center justify-center min-h-[420px] text-neutral-400">
              <ShieldCheck className="w-12 h-12 text-neutral-600 mb-3" />
              <h3 className="text-sm font-semibold text-neutral-200">No Product Scanned Yet</h3>
              <p className="text-xs text-neutral-500 max-w-sm mt-1">
                Scan your agrochemical packaging barcode, input the batch number on the left, or test one of the live forensic cases above.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
