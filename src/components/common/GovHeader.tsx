import React from 'react';
import { TricolorBar } from './TricolorBar';
import { useTranslation, LanguageCode } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import {
  Globe,
  Eye,
  Shield,
  User,
  LogOut,
  Landmark,
  Sparkles,
  Search,
  Bell,
  Building2,
  FileCheck2,
  Layers,
  HelpCircle,
  FileText
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface GovHeaderProps {
  onOpenLoginModal?: () => void;
}

export const GovHeader: React.FC<GovHeaderProps> = ({ onOpenLoginModal }) => {
  const { language, setLanguage, t, isHighContrast, toggleHighContrast, adjustTextScale } = useTranslation();
  const { role, citizen, officer, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isCitizenPath = location.pathname.startsWith('/citizen');
  const isOfficerPath = location.pathname.startsWith('/officer');

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <TricolorBar />

      {/* Top Utility Bar (WCAG & Gov Bar) */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 sm:px-8 flex flex-wrap items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-slate-300 hidden sm:inline flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {t.govOfIndia} • {t.ministryName}
          </span>
          <span className="text-slate-400 hidden md:inline">|</span>
          <span className="text-slate-300 text-[11px] font-mono">
            24x7 Helpline: <strong className="text-gov-saffron-400">1800-180-LAND</strong>
          </span>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {/* Accessibility Font Size Control */}
          <div className="flex items-center gap-1 bg-slate-800 rounded px-1.5 py-0.5 text-[11px]">
            <button
              onClick={() => adjustTextScale(-5)}
              className="px-1 hover:text-white transition-colors"
              title="Decrease Font Size"
              aria-label="Decrease Font Size"
            >
              A-
            </button>
            <button
              onClick={() => adjustTextScale(0)}
              className="px-1 font-bold text-white"
              title="Reset Font Size"
              aria-label="Reset Font Size"
            >
              A
            </button>
            <button
              onClick={() => adjustTextScale(5)}
              className="px-1 hover:text-white transition-colors"
              title="Increase Font Size"
              aria-label="Increase Font Size"
            >
              A+
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={toggleHighContrast}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              isHighContrast
                ? 'bg-amber-400 text-black font-bold'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
            title="Toggle High Contrast Mode (WCAG AAA)"
          >
            <Eye className="w-3 h-3" />
            <span className="hidden sm:inline">{t.highContrast}</span>
          </button>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-slate-800 rounded px-1.5 py-0.5">
            <Globe className="w-3 h-3 text-slate-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              className="bg-transparent text-white text-xs border-none outline-none cursor-pointer pr-1 font-medium focus:ring-0"
              aria-label="Select Language"
            >
              <option value="en" className="bg-slate-900 text-white">English (EN)</option>
              <option value="hi" className="bg-slate-900 text-white">हिंदी (Hindi)</option>
              <option value="ta" className="bg-slate-900 text-white">தமிழ் (Tamil)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Government Portal Header */}
      <div className="px-4 sm:px-8 py-3 flex items-center justify-between gap-4 bg-gradient-to-r from-white via-slate-50 to-white">
        {/* Emblem & Portal Branding */}
        <Link to="/" className="flex items-center gap-3.5 group">
          {/* Ashok Stambh Stylized Vector Emblem */}
          <div className="w-11 h-12 flex-shrink-0 bg-slate-100 rounded-md border border-slate-300 p-1 flex items-center justify-center shadow-xs">
            <svg viewBox="0 0 100 120" className="w-full h-full text-[#0b3b6e]" fill="currentColor">
              {/* Stylized Indian National Emblem */}
              <circle cx="50" cy="20" r="12" fill="#0b3b6e" opacity="0.9" />
              <rect x="42" y="32" width="16" height="28" rx="2" fill="#0b3b6e" />
              <circle cx="30" cy="38" r="10" fill="#0b3b6e" opacity="0.8" />
              <circle cx="70" cy="38" r="10" fill="#0b3b6e" opacity="0.8" />
              <path d="M 20 70 Q 50 62 80 70 L 85 92 Q 50 86 15 92 Z" fill="#0b3b6e" />
              <circle cx="50" cy="80" r="7" fill="#f97316" />
              <rect x="25" y="98" width="50" height="8" rx="2" fill="#065f46" />
              <text x="50" y="116" font-size="9" text-anchor="middle" font-family="sans-serif" font-weight="bold" fill="#0b3b6e">सत्यमेव जयते</text>
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0b3b6e]">
                LandReg <span className="text-gov-green-600 font-bold">DILRMP 3.0</span>
              </span>
              <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                <Sparkles className="w-3 h-3 text-blue-600" />
                AI-Powered Validation
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium tracking-tight line-clamp-1">
              {t.programSub}
            </p>
          </div>
        </Link>

        {/* Action Controls / Auth Status */}
        <div className="flex items-center gap-2 sm:gap-3">
          {role ? (
            <div className="flex items-center gap-3">
              {/* Role badge */}
              <div className="hidden sm:flex flex-col items-end text-right">
                <span className="text-xs font-bold text-slate-800">
                  {role === 'citizen' ? citizen?.name : officer?.name}
                </span>
                <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                  {role === 'citizen' ? (
                    <span className="text-blue-700 font-semibold">Citizen (Madurai, TN)</span>
                  ) : (
                    <span className="text-emerald-700 font-semibold">{officer?.designation} ({officer?.tehsilTaluk})</span>
                  )}
                </span>
              </div>

              {/* Portal switcher shortcut */}
              {role === 'citizen' ? (
                <Link
                  to="/citizen"
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                    isCitizenPath
                      ? 'bg-gov-blue-800 text-white border-gov-blue-900 shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-300'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.citizenPortal}</span>
                </Link>
              ) : (
                <Link
                  to="/officer"
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                    isOfficerPath
                      ? 'bg-gov-green-700 text-white border-gov-green-800 shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-300'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.officerPortal}</span>
                </Link>
              )}

              {/* Logout Button */}
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 flex items-center gap-1 transition-colors"
                title={t.logout}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.logout}</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login?tab=citizen"
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-gov-blue-900 bg-gov-blue-50 hover:bg-gov-blue-100 border border-gov-blue-200 transition-colors flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-gov-blue-700" />
                {t.userLogin}
              </Link>
              <Link
                to="/login?tab=officer"
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-gov-green-700 hover:bg-gov-green-800 shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5" />
                {t.deptLogin}
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
