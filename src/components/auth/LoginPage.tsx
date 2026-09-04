import React, { useState } from 'react';
import {
  ShieldCheck,
  Eye,
  EyeOff,
  LogIn,
  Sprout,
  Sparkles,
  Bug,
  ShieldAlert,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  HelpCircle,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { LanguageCode } from '../../types';

interface LoginPageProps {
  onNavigateToSignUp: () => void;
  onNavigateToDashboard: () => void;
  language?: LanguageCode;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onNavigateToSignUp,
  onNavigateToDashboard,
}) => {
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  // Quick Demo credentials loader helper
  const handleLoadDemoCredentials = (type: 'email' | 'name') => {
    if (type === 'email') {
      setIdentifier('ramesh.farmer@example.com');
    } else {
      setIdentifier('Ramesh Patel');
    }
    setPassword('Farmer@123');
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmed = identifier.trim();
    if (!trimmed) {
      setErrorMessage('Please enter your Name or Gmail address.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsSubmitting(true);
    const res = await login(trimmed, password);
    setIsSubmitting(false);

    if (res.success) {
      onNavigateToDashboard();
    } else {
      setErrorMessage(res.error || 'Invalid name/email or password.');
    }
  };

  return (
    <div
      id="login-page"
      className="min-h-screen w-full flex flex-col lg:flex-row bg-[#f8faf9] text-neutral-900 selection:bg-emerald-500 selection:text-white"
    >
      {/* LEFT SIDE: FAR[M]ATE Branding & Agricultural Visual - Solid Pastel Theme */}
      <div className="relative w-full lg:w-1/2 min-h-[380px] lg:min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-14 bg-[#eaf3ed] border-b lg:border-b-0 lg:border-r border-emerald-200/80 text-neutral-900">
        {/* Brand Top Header */}
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#134e35] flex items-center justify-center shadow-xs text-white">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#134e35] font-mono">
                  FAR<span className="text-emerald-700">[M]</span>ATE
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 uppercase tracking-wider">
                  v2.1
                </span>
              </div>
              <p className="text-xs text-neutral-600 font-medium tracking-wide">
                Intelligent Agrochemical & Crop Protection Platform
              </p>
            </div>
          </div>
        </div>

        {/* Center Tagline and Agricultural Value Highlights */}
        <div className="my-8 lg:my-0 max-w-lg space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-2xs">
            <Sprout className="w-4 h-4 text-emerald-600" />
            <span>Smart Farming. Safer Choices. Better Harvests.</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#113a24] leading-tight tracking-tight">
            Safer Inputs for{' '}
            <span className="text-emerald-700 font-black">
              Healthier Crops
            </span>{' '}
            and Prosperous Farmers.
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
            Log in to verify agrochemicals against counterfeit batches, diagnose leaf diseases with AI,
            and calculate statutory CIBRC spray dosages tailored to your acreage.
          </p>

          {/* Core Agricultural Features Badges - Solid Pastel Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-emerald-200/80 shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Bug className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-neutral-900">AI Plant Doctor</h4>
                <p className="text-[11px] text-neutral-500 mt-0.5">Instant leaf pathology & bio-fungicide actions</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-amber-200/80 shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-neutral-900">VERIFY-X Security</h4>
                <p className="text-[11px] text-neutral-500 mt-0.5">CIBRC Gazette & hologram authenticity check</p>
              </div>
            </div>
          </div>
        </div>

        {/* Left Bottom Footer */}
        <div className="flex items-center justify-between text-xs text-neutral-500 border-t border-emerald-200/70 pt-4">
          <span>Official CIBRC Gazette Integration</span>
          <span>19 Indic Languages Supported</span>
        </div>
      </div>

      {/* RIGHT SIDE: Dedicated Login Form Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-5 sm:p-10 lg:p-14 bg-[#f8faf9]">
        <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-9 shadow-xs border border-neutral-200">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Sign In to FAR[M]ATE
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Enter your registered Name or Gmail address to continue
            </p>
          </div>

          {/* Error Message Box */}
          {errorMessage && (
            <div
              id="login-error-alert"
              className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-fade-in"
            >
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{errorMessage}</div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Field: Name or Gmail */}
            <div>
              <label
                htmlFor="login-identifier"
                className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5"
              >
                Name or Gmail <span className="text-rose-500">*</span>
              </label>
              <input
                id="login-identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. Gaurav or example@gmail.com"
                autoComplete="username"
                className="w-full px-4 py-3 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition text-neutral-900"
              />
              <p className="text-[11px] text-neutral-400 mt-1">
                Accepts either your Full Name (e.g. <span className="text-neutral-600 font-medium">Gaurav</span>) or your Gmail / Email address.
              </p>
            </div>

            {/* Field: Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="login-password"
                  className="block text-xs font-bold uppercase tracking-wider text-neutral-700"
                >
                  Password <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(true)}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full px-4 py-3 pr-11 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition text-neutral-900"
                />
                <button
                  type="button"
                  id="toggle-login-password-visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-700 transition cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                id="btn-login-submit"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-[#0b6633] hover:bg-[#084e27] text-white font-bold text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.99]"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Login to FAR[M]ATE</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Demo Pre-fill Pill for Testing */}
          <div className="mt-5 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Quick Demo Test Accounts:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleLoadDemoCredentials('email')}
                className="px-2.5 py-1 rounded-lg bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100/60 transition font-medium text-[11px] cursor-pointer shadow-2xs"
              >
                Use Gmail (ramesh.farmer@example.com)
              </button>
              <button
                type="button"
                onClick={() => handleLoadDemoCredentials('name')}
                className="px-2.5 py-1 rounded-lg bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100/60 transition font-medium text-[11px] cursor-pointer shadow-2xs"
              >
                Use Name (Ramesh Patel)
              </button>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 pt-5 border-t border-neutral-100 text-center">
            <p className="text-xs text-neutral-600">
              Don't have an account?{' '}
              <button
                id="link-to-signup"
                type="button"
                onClick={onNavigateToSignUp}
                className="font-bold text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer inline-flex items-center gap-1"
              >
                <span>Sign Up</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-xl border border-neutral-200 relative">
            <button
              onClick={() => setIsForgotModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-700 rounded-full hover:bg-neutral-100 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900">Forgot Password?</h3>
                <p className="text-xs text-neutral-500">Account recovery for FAR[M]ATE</p>
              </div>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed mb-4">
              If you forgot your password, you can reset it by contacting your local Agricultural Extension Officer
              or calling our farmer support hotline at <span className="font-bold text-emerald-700">1800-180-1551</span>.
            </p>

            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-700 space-y-1 mb-4">
              <p className="font-semibold text-neutral-900">For Testing & Demo Access:</p>
              <p>Default account password is: <span className="font-mono font-bold text-emerald-700">Farmer@123</span></p>
              <p>Or simply create a new account in 10 seconds via the Sign Up page.</p>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsForgotModalOpen(false);
                  onNavigateToSignUp();
                }}
                className="px-4 py-2 rounded-xl bg-[#0b6633] hover:bg-[#084e27] text-white text-xs font-semibold cursor-pointer shadow-xs"
              >
                Create New Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
