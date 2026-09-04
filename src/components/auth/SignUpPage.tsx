import React, { useState } from 'react';
import {
  ShieldCheck,
  Eye,
  EyeOff,
  UserPlus,
  Sprout,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  ChevronDown,
  ChevronUp,
  MapPin,
  Phone,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { LanguageCode } from '../../types';

interface SignUpPageProps {
  onNavigateToLogin: () => void;
  onNavigateToDashboard: () => void;
  language?: LanguageCode;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({
  onNavigateToLogin,
  onNavigateToDashboard,
}) => {
  const { signup } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Optional Farm Profile fields
  const [showFarmDetails, setShowFarmDetails] = useState(false);
  const [phone, setPhone] = useState('');
  const [farmName, setFarmName] = useState('');
  const [location, setLocation] = useState('Krishnagiri, Tamil Nadu');
  const [farmSize, setFarmSize] = useState('3.5');
  const [primaryCrop, setPrimaryCrop] = useState('');

  // Status & Feedback states
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    // 1. Name validation
    if (!name.trim()) {
      errors.name = 'Full Name cannot be empty.';
    }

    // 2. Email validation
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      errors.email = 'Email is required.';
    } else {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(trimmedEmail)) {
        errors.email = 'Invalid email address. Please enter a valid Gmail/Email address.';
      }
    }

    // 3. Password validation
    if (!password) {
      errors.password = 'Password cannot be empty.';
    } else if (password.length < 8) {
      errors.password = 'Password must contain at least 8 characters.';
    }

    // 4. Confirm password validation
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password.';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);
    setSuccessMessage(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const res = await signup({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      phone: phone.trim() || undefined,
      farmName: farmName.trim() || undefined,
      location: location.trim() || undefined,
      farmSize: Number(farmSize) || 3.5,
      primaryCrop: primaryCrop.trim() || undefined,
    });
    setIsSubmitting(false);

    if (res.success) {
      setSuccessMessage(res.message || 'Account created successfully! Welcome to FAR[M]ATE.');
      // Short delay for user to read success message before navigating to dashboard
      setTimeout(() => {
        onNavigateToDashboard();
      }, 1200);
    } else {
      if (res.error?.includes('already exists')) {
        setGeneralError('Account already exists. Please log in or use a different email.');
      } else {
        setGeneralError(res.error || 'Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div
      id="signup-page"
      className="min-h-screen w-full flex flex-col lg:flex-row bg-[#f8faf9] text-neutral-900 selection:bg-emerald-500 selection:text-white"
    >
      {/* LEFT SIDE: FAR[M]ATE Branding & Agricultural Visual - Solid Pastel Theme */}
      <div className="relative w-full lg:w-1/2 min-h-[360px] lg:min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-14 bg-[#eaf3ed] border-b lg:border-b-0 lg:border-r border-emerald-200/80 text-neutral-900">
        {/* Brand Header */}
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
                  Registration
                </span>
              </div>
              <p className="text-xs text-neutral-600 font-medium tracking-wide">
                Smart Farming. Safer Inputs. Better Harvests.
              </p>
            </div>
          </div>
        </div>

        {/* Center Visual Text & Value Proposition */}
        <div className="my-8 lg:my-0 max-w-lg space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-2xs">
            <Sprout className="w-4 h-4 text-emerald-600" />
            <span>Join 150,000+ Protected Farmers Across India</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#113a24] leading-tight tracking-tight">
            Create Your Account for{' '}
            <span className="text-emerald-700 font-black">
              Verified Agri-Inputs
            </span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
            Sign up to securely track your farm profile, access real-time CIBRC pesticide clearance registries,
            and protect your investment from fraudulent or banned inputs.
          </p>

          <div className="space-y-2.5 pt-2">
            <div className="flex items-center gap-3 text-xs text-neutral-700">
              <div className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              </div>
              <span>End-to-end encrypted authentication with salted bcrypt hashing</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-neutral-700">
              <div className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              </div>
              <span>Real-time anti-counterfeit batch lookup in statutory gazettes</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-neutral-700">
              <div className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              </div>
              <span>Custom dosage advisory for knapsack tanks with zero pesticide drift</span>
            </div>
          </div>
        </div>

        {/* Bottom Stat Footer */}
        <div className="flex items-center justify-between text-xs text-neutral-500 border-t border-emerald-200/70 pt-4">
          <span>Zero Plaintext Password Storage</span>
          <span>Statutory CIBRC Compliance</span>
        </div>
      </div>

      {/* RIGHT SIDE: Create Account Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-5 sm:p-10 lg:p-14 bg-[#f8faf9] overflow-y-auto">
        <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-9 shadow-xs border border-neutral-200">
          {/* Form Header */}
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Create an Account
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Join FAR[M]ATE today for smarter, safer agricultural decisions
            </p>
          </div>

          {/* Success Message Banner */}
          {successMessage && (
            <div
              id="signup-success-alert"
              className="mb-5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5 animate-fade-in"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="font-semibold">{successMessage}</div>
            </div>
          )}

          {/* General Error Banner */}
          {generalError && (
            <div
              id="signup-error-alert"
              className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-fade-in"
            >
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="font-medium">{generalError}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Field: Full Name */}
            <div>
              <label
                htmlFor="signup-name"
                className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5"
              >
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="signup-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: '' });
                }}
                placeholder="e.g. Gaurav or Ramesh Patel"
                autoComplete="name"
                className={`w-full px-4 py-3 text-sm bg-neutral-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 transition ${
                  fieldErrors.name
                    ? 'border-rose-300 focus:ring-rose-500/30 focus:border-rose-500'
                    : 'border-neutral-200 focus:ring-emerald-500/30 focus:border-emerald-600'
                }`}
              />
              {fieldErrors.name && (
                <p className="text-[11px] text-rose-600 mt-1 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {fieldErrors.name}
                </p>
              )}
            </div>

            {/* Field: Gmail / Email */}
            <div>
              <label
                htmlFor="signup-email"
                className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5"
              >
                Gmail / Email <span className="text-rose-500">*</span>
              </label>
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' });
                }}
                placeholder="e.g. gaurav@gmail.com"
                autoComplete="email"
                className={`w-full px-4 py-3 text-sm bg-neutral-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 transition ${
                  fieldErrors.email
                    ? 'border-rose-300 focus:ring-rose-500/30 focus:border-rose-500'
                    : 'border-neutral-200 focus:ring-emerald-500/30 focus:border-emerald-600'
                }`}
              />
              {fieldErrors.email && (
                <p className="text-[11px] text-rose-600 mt-1 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Field: Password */}
            <div>
              <label
                htmlFor="signup-password"
                className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5"
              >
                Password (min 8 characters) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: '' });
                  }}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  className={`w-full px-4 py-3 pr-11 text-sm bg-neutral-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 transition ${
                    fieldErrors.password
                      ? 'border-rose-300 focus:ring-rose-500/30 focus:border-rose-500'
                      : 'border-neutral-200 focus:ring-emerald-500/30 focus:border-emerald-600'
                  }`}
                />
                <button
                  type="button"
                  id="toggle-signup-password-visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-700 transition cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-[11px] text-rose-600 mt-1 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {fieldErrors.password}
                </p>
              )}
            </div>

            {/* Field: Confirm Password */}
            <div>
              <label
                htmlFor="signup-confirm-password"
                className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5"
              >
                Confirm Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="signup-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (fieldErrors.confirmPassword) setFieldErrors({ ...fieldErrors, confirmPassword: '' });
                  }}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  className={`w-full px-4 py-3 pr-11 text-sm bg-neutral-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 transition ${
                    fieldErrors.confirmPassword
                      ? 'border-rose-300 focus:ring-rose-500/30 focus:border-rose-500'
                      : 'border-neutral-200 focus:ring-emerald-500/30 focus:border-emerald-600'
                  }`}
                />
                <button
                  type="button"
                  id="toggle-signup-confirm-password-visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-700 transition cursor-pointer"
                  title={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {fieldErrors.confirmPassword && (
                <p className="text-[11px] text-rose-600 mt-1 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {fieldErrors.confirmPassword}
                </p>
              )}
            </div>

            {/* Optional Farm Details Collapsible Section */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowFarmDetails(!showFarmDetails)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-xs font-semibold text-neutral-700 transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Sprout className="w-4 h-4 text-emerald-600" />
                  <span>Optional: Add Farm & Crop Details (Can be updated later)</span>
                </div>
                {showFarmDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showFarmDetails && (
                <div className="mt-3 p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3 animate-fade-in text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-neutral-600 mb-1">Mobile Phone</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-neutral-600 mb-1">Farm Name</label>
                      <input
                        type="text"
                        value={farmName}
                        onChange={(e) => setFarmName(e.target.value)}
                        placeholder="e.g. Green Valley Farm"
                        className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-neutral-600 mb-1">Location / District</label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="District, State"
                        className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-neutral-600 mb-1">Target Crop (Optional)</label>
                      <select
                        value={primaryCrop}
                        onChange={(e) => setPrimaryCrop(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg text-xs"
                      >
                        <option value="">None / General (All Crops - Default)</option>
                        <option value="Tomato">Tomato</option>
                        <option value="Rice / Paddy">Rice / Paddy</option>
                        <option value="Cotton">Cotton</option>
                        <option value="Wheat">Wheat</option>
                        <option value="Chilli">Chilli / Pepper</option>
                        <option value="Maize">Maize</option>
                        <option value="Soybean">Soybean</option>
                        <option value="Sugarcane">Sugarcane</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Create Account Button */}
            <div className="pt-3">
              <button
                id="btn-signup-submit"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-[#0b6633] hover:bg-[#084e27] text-white font-bold text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.99]"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Create Account</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-6 pt-5 border-t border-neutral-100 text-center">
            <p className="text-xs text-neutral-600">
              Already have an account?{' '}
              <button
                id="link-to-login"
                type="button"
                onClick={onNavigateToLogin}
                className="font-bold text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer inline-flex items-center gap-1"
              >
                <span>Login</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
