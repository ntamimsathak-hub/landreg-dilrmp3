import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../context/LanguageContext';
import { OtpInput } from './OtpInput';
import { CaptchaWidget } from './CaptchaWidget';
import { RegisterModal } from './RegisterModal';
import { User, Shield, ArrowRight, CheckCircle2, AlertCircle, Smartphone, Building2, Sparkles, KeyRound } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const { loginCitizen, loginOfficer, quickLoginCitizen, quickLoginOfficer } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState<'citizen' | 'officer'>(
    searchParams.get('tab') === 'officer' ? 'officer' : 'citizen'
  );

  // Form states
  const [mobile, setMobile] = useState('9876543210');
  const [otp, setOtp] = useState('');
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Officer specific states
  const [employeeId, setEmployeeId] = useState('TN-REV-8402');
  const [stateName, setStateName] = useState('Tamil Nadu');
  const [district, setDistrict] = useState('Madurai');
  const [tehsil, setTehsil] = useState('Melur');

  // Register modal state
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  useEffect(() => {
    let interval: any;
    if (otpSent && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleSendOtp = () => {
    if (!mobile || mobile.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!isCaptchaValid) {
      setErrorMsg('Please enter the correct security CAPTCHA');
      return;
    }

    setErrorMsg('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setTimer(30);
      setOtp('123456'); // Pre-fill mock OTP for smooth evaluation
    }, 600);
  };

  const handleVerifyAndLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (otp.length < 6) {
      setErrorMsg('Please enter the 6-digit OTP');
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    if (activeTab === 'citizen') {
      const ok = await loginCitizen(mobile, otp);
      setLoading(false);
      if (ok) {
        navigate('/citizen');
      } else {
        setErrorMsg('Invalid OTP. Use demo OTP: 123456');
      }
    } else {
      const ok = await loginOfficer(employeeId, mobile, otp, {
        state: stateName,
        district,
        tehsil,
      });
      setLoading(false);
      if (ok) {
        navigate('/officer');
      } else {
        setErrorMsg('Invalid Officer Credentials. Use demo OTP: 123456');
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Top Header Badge */}
        <div className="bg-[#0b3b6e] text-white p-6 text-center relative">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 border border-white/20 mb-3 shadow-inner">
            {activeTab === 'citizen' ? (
              <User className="w-6 h-6 text-gov-saffron-300" />
            ) : (
              <Building2 className="w-6 h-6 text-emerald-300" />
            )}
          </div>
          <h2 className="text-xl font-black tracking-tight">
            {activeTab === 'citizen' ? t.userLogin : t.deptLogin}
          </h2>
          <p className="text-xs text-blue-100 mt-1">
            Digital India Land Records Modernization Programme (DILRMP 3.0)
          </p>
        </div>

        {/* Tab Toggle: Citizen / Department */}
        <div className="flex border-b border-slate-200 bg-slate-50 p-1">
          <button
            type="button"
            onClick={() => {
              setActiveTab('citizen');
              setOtpSent(false);
              setErrorMsg('');
            }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${
              activeTab === 'citizen'
                ? 'bg-white text-gov-blue-900 shadow-xs border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-4 h-4" />
            {t.userLogin}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('officer');
              setOtpSent(false);
              setErrorMsg('');
            }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${
              activeTab === 'officer'
                ? 'bg-white text-gov-green-800 shadow-xs border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Shield className="w-4 h-4" />
            {t.deptLogin}
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleVerifyAndLogin} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-xs flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Department Officer extra jurisdiction fields */}
          {activeTab === 'officer' && (
            <div className="space-y-3 p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg text-xs">
              <div className="flex items-center gap-1.5 text-emerald-900 font-bold mb-1">
                <KeyRound className="w-3.5 h-3.5 text-emerald-700" />
                <span>Officer Identification &amp; Jurisdiction</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{t.employeeId}</label>
                  <input
                    type="text"
                    required
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white font-mono uppercase focus:ring-1 focus:ring-emerald-500 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{t.selectState}</label>
                  <select
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded bg-white text-xs"
                  >
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{t.selectDistrict}</label>
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{t.selectTehsil}</label>
                  <input
                    type="text"
                    required
                    value={tehsil}
                    onChange={(e) => setTehsil(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Mobile Number Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t.mobileNumber} *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400 font-mono">
                +91
              </span>
              <input
                type="tel"
                maxLength={10}
                value={mobile}
                disabled={otpSent}
                onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder={t.enter10DigitMobile}
                className="w-full pl-12 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm font-mono tracking-wider focus:ring-2 focus:ring-gov-blue-500 focus:border-gov-blue-600 outline-none disabled:bg-slate-100"
              />
              <Smartphone className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          {/* CAPTCHA Widget before sending OTP */}
          {!otpSent && (
            <CaptchaWidget onVerify={(valid) => setIsCaptchaValid(valid)} />
          )}

          {/* OTP Input Section (Once Sent) */}
          {otpSent ? (
            <div className="space-y-3 pt-2 animate-in fade-in">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">
                  {t.enterOtp} <span className="font-mono font-bold">(Demo: 123456)</span>
                </span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> OTP Sent
                </span>
              </div>

              <OtpInput value={otp} onChange={setOtp} length={6} />

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                {timer > 0 ? (
                  <span>
                    {t.resendOtpIn} <strong className="font-mono text-gov-blue-800">{timer}{t.seconds}</strong>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setTimer(30);
                      setOtp('123456');
                    }}
                    className="text-gov-blue-800 font-bold hover:underline"
                  >
                    {t.resendOtp}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="text-slate-500 hover:text-slate-800"
                >
                  Change Mobile
                </button>
              </div>

              <button
                type="submit"
                disabled={loading || otp.length < 6}
                className="w-full py-3 bg-gov-blue-800 hover:bg-gov-blue-900 text-white rounded-lg font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
              >
                {loading ? 'Verifying...' : t.verifyOtp}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loading || !mobile || mobile.length < 10 || !isCaptchaValid}
              className="w-full py-2.5 bg-[#0b3b6e] hover:bg-gov-blue-950 text-white rounded-lg font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending OTP...' : t.sendOtp}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {/* Quick Demo Login Buttons */}
          <div className="pt-3 border-t border-slate-200 space-y-2">
            <p className="text-[11px] text-center text-slate-400 font-medium">
              ⚡ Instant Demo Evaluation Shortcuts
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  quickLoginCitizen();
                  navigate('/citizen');
                }}
                className="py-1.5 px-2 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 rounded text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
              >
                <User className="w-3 h-3 text-blue-700" />
                Quick Citizen
              </button>
              <button
                type="button"
                onClick={() => {
                  quickLoginOfficer();
                  navigate('/officer');
                }}
                className="py-1.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
              >
                <Shield className="w-3 h-3 text-emerald-700" />
                Quick Officer
              </button>
            </div>
          </div>

          {/* Citizen Registration Link */}
          {activeTab === 'citizen' && (
            <div className="text-center pt-2 text-xs text-slate-600">
              <span>{t.newCitizenPrompt} </span>
              <button
                type="button"
                onClick={() => setIsRegisterOpen(true)}
                className="text-gov-blue-800 font-bold hover:underline"
              >
                {t.registerHere}
              </button>
            </div>
          )}
        </form>
      </div>

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSuccess={() => navigate('/citizen')}
      />
    </div>
  );
};
