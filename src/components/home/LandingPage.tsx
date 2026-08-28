import React from 'react';
import { useTranslation } from '../../context/LanguageContext';
import {
  Sparkles,
  ShieldCheck,
  SplitSquareVertical,
  MapPin,
  FileCheck2,
  Award,
  ArrowRight,
  BrainCircuit,
  Building2,
  Lock,
  Search,
  CheckCircle2,
  Layers,
  Globe,
  Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section with National E-Governance Aesthetic */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0b3b6e] via-[#082d54] to-slate-900 text-white pt-12 pb-20 px-4 sm:px-8 border-b-4 border-gov-saffron-500">
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto text-center space-y-6 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold border border-white/20 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Digital India Land Records Modernization Programme (DILRMP 3.0)</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
            AI-Assisted Land Record Digitization &amp; <span className="text-emerald-400">Pixel Uncertainty Validation</span>
          </h1>

          {/* Tagline */}
          <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
            The next-generation sovereign platform featuring AI handwriting attention overlays, split-screen legacy deed validation, Cadastral GIS mapping, and QR-certified citizen Patta certificates.
          </p>

          {/* Primary Dual Role Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/login?tab=citizen"
              className="px-6 py-3.5 bg-gov-saffron-500 hover:bg-gov-saffron-600 text-white font-black text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 hover:scale-[1.02]"
            >
              <span>{t.userLogin}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/login?tab=officer"
              className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm rounded-xl shadow-lg border border-emerald-500/50 transition-all flex items-center gap-2 hover:scale-[1.02]"
            >
              <Building2 className="w-4 h-4" />
              <span>{t.deptLogin}</span>
            </Link>

            <Link
              to="/officer/validation-workspace"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl border border-white/30 backdrop-blur-xs transition-all flex items-center gap-2"
            >
              <SplitSquareVertical className="w-4 h-4 text-amber-300" />
              <span>Explore AI Validation Workspace</span>
            </Link>
          </div>

          {/* Feature Highlight Pills */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-blue-200 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Multilingual (EN / HI / TA)
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Pixel-Level Uncertainty Overlays
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Cadastral 2D &amp; Satellite GIS
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Cryptographic QR E-Patta
            </span>
          </div>
        </div>
      </section>

      {/* Core Differentiator: AI Uncertainty Layer */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-br from-amber-500/10 via-emerald-500/10 to-blue-500/10 border border-amber-300/80 rounded-2xl p-6 sm:p-10 shadow-sm">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            The Core Differentiator over Legacy DILRMP
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-3">
            Why OCR is Never 100% Accurate — And How LandReg 3.0 Solves It
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 max-w-3xl">
            Legacy systems silently fail or produce silent errors when encountering faded ink, archival wormholes, or ambiguous handwritten numerals (such as a '7' resembling a '1' or '9').
            LandReg 3.0 visually highlights uncertainties <strong>directly onto the scanned document image</strong> with alternate readings and synced form fields for instant officer review.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-bold text-sm text-slate-900">Pixel Attention Boxes</h3>
              <p className="text-slate-600 leading-relaxed">
                Color-coded bounding boxes directly surround ambiguous text regions on the original deed, showing confidence scores and alternative OCR hypotheses.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-bold text-sm text-slate-900">Bidirectional Field Sync</h3>
              <p className="text-slate-600 leading-relaxed">
                Clicking any highlighted image box automatically focuses the matching attribute in the extracted form, and vice versa.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-bold text-sm text-slate-900">Continuous Learning Loop</h3>
              <p className="text-slate-600 leading-relaxed">
                Every officer override is logged in the cryptographic audit trail, feeding continuous active learning to increase long-term recognition accuracy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Portal Features Breakdown */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Integrated Portals for Citizens &amp; Revenue Officers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Engineered to fulfill all 19 core workflows of the DILRMP 3.0 e-governance specification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Citizen Portal Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-gov-blue-800 flex items-center justify-center shadow-xs">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Citizen Services Portal</h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <strong>Find Old Records:</strong> Query historical settlement registers &amp; Khasras.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <strong>My Records:</strong> Auto-link parcels with mobile and Aadhaar KYC-lite.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <strong>Patta / Chitta:</strong> Download printable digital certificates with QR code.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <strong>Status Tracker:</strong> 5-stage lifecycle tracker from upload to approval.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <strong>Grievance Redressal:</strong> Flag spelling mistakes and area discrepancies.
                </li>
              </ul>
            </div>

            <Link
              to="/citizen"
              className="mt-4 py-2.5 px-4 bg-gov-blue-800 hover:bg-gov-blue-900 text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              Enter Citizen Portal <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Department Portal Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shadow-xs">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Department Officer Workspace</h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <strong>Split-Screen Workspace:</strong> Scanned deed on left, editable form on right.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <strong>Batch Deed Upload:</strong> Multi-page ingestion with queue management.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <strong>Cadastral GIS:</strong> 2D revenue blueprint &amp; satellite layer toggle.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <strong>Automated Cross-Checks:</strong> Duplicate checks &amp; area balance rules.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <strong>RBAC &amp; API Monitor:</strong> Role permissions and state gateway health.
                </li>
              </ul>
            </div>

            <Link
              to="/officer"
              className="mt-4 py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              Enter Officer Portal <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
