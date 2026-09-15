import React, { useState } from 'react';
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
  Phone,
  ChevronDown,
  ChevronUp,
  UserPlus,
  Compass,
  HelpCircle,
  FileText,
  AlertTriangle,
  Check,
  ArrowDown,
  Shield,
  FileSpreadsheet,
  QrCode,
  User
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface LandingPageProps {
  onOpenRegisterModal?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenRegisterModal }) => {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqs = [
    {
      q: "What is the purpose of LandReg DILRMP 3.0?",
      a: "LandReg DILRMP 3.0 is India's sovereign platform designed to modernize, digitize, and authenticate land ownership records. It resolves centuries-old paper record ambiguities by combining high-resolution scanning, AI-driven handwriting uncertainty highlighting, Cadastral GIS mapping, and on-site village surveyor (Manigar) validations into one transparent digital registry."
    },
    {
      q: "Who can use this website?",
      a: "The portal serves two primary groups: (1) Citizens and Landowners who wish to search historical deeds, verify property boundaries, request surveyor allocations, download legal digital E-Patta certificates, or lodge grievances; and (2) Revenue Department Officers (Tahsildars, VAOs, Surveyors) who validate deeds, review AI OCR uncertainties, and approve title records."
    },
    {
      q: "Is the digital E-Patta / Chitta downloaded here legally valid?",
      a: "Yes. Every E-Patta and Chitta issued through LandReg is cryptographically signed with a dynamic, tamper-evident QR code and unique 16-character Digital Land Parcel Identifier (ULPIN). It is recognized by state registration departments, civil courts, and financial institutions across India under the IT Act 2000 and DPDPA 2023."
    },
    {
      q: "What is a Manigar and when should I request one?",
      a: "A 'Manigar' (Village Land Revenue Surveyor / கிராம கணக்காளர்) is a certified government revenue officer responsible for physical land boundary measurement and parcel scaling. Citizens can request a Manigar through this portal whenever there is a boundary dispute, partition, mutation, or need for physical verification before deed registration."
    },
    {
      q: "How does the AI Pixel Uncertainty Detection protect me from errors?",
      a: "Traditional OCR software guesses words and frequently causes silent errors (such as reading '15 Acres' as '1.5 Acres' or misreading Telugu/Tamil numerals). LandReg's AI draws colored attention boxes directly around ambiguous handwritten characters on the scanned deed image. Revenue officers must explicitly review and confirm these low-confidence areas before the record can ever be approved."
    },
    {
      q: "How do I register as a citizen on LandReg?",
      a: "Citizen registration is 100% free and takes less than 60 seconds using our 'KYC-Lite' flow. Click the 'Register' button at the top right, enter your Name, 10-digit mobile number, Aadhaar last 4 digits, and village address. All land parcels linked to your mobile and Aadhaar will be automatically indexed into your dashboard."
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO SECTION: Welcoming Banner with Clear Purpose */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#072444] via-[#0b3b6e] to-[#0d4782] text-white pt-14 pb-24 px-4 sm:px-8 border-b-4 border-gov-saffron-500 shadow-lg">
        {/* Subtle geometric dot pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60"></div>

        {/* Decorative ambient light glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center space-y-7 relative z-10">
          {/* Official Program Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-emerald-300 text-xs sm:text-sm font-semibold border border-white/20 shadow-inner backdrop-blur-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Digital India Land Records Modernization Programme (DILRMP 3.0)</span>
          </div>

          {/* Welcoming Headline */}
          <div className="space-y-3">
            <p className="text-amber-300 font-bold uppercase tracking-wider text-xs sm:text-sm">
              Welcome to the Sovereign Land Records Portal
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto drop-shadow-xs">
              AI-Powered Land Record Digitization &amp; <span className="text-emerald-400">Pixel Uncertainty Validation</span>
            </h1>
          </div>

          {/* Clear Plain-Language Explanation of What the Website Is For */}
          <p className="text-base sm:text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed font-normal">
            LandReg is the official public e-governance platform connecting <strong className="text-white font-bold">citizens</strong> and <strong className="text-white font-bold">revenue officials</strong> to search historical land records, request certified village surveyors (Manigars), resolve deed uncertainties with AI handwriting assistance, and download verifiable <strong className="text-white font-bold">digital E-Patta certificates</strong>.
          </p>

          {/* Primary Action Buttons (Register & Logins) */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {/* Quick Citizen Register */}
            {onOpenRegisterModal && (
              <button
                type="button"
                onClick={onOpenRegisterModal}
                className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-950 font-black text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 hover:scale-[1.02] border border-amber-300"
              >
                <UserPlus className="w-4 h-4 text-amber-950" />
                <span>New Citizen? Register Free</span>
              </button>
            )}

            {/* Citizen Login */}
            <Link
              to="/login?tab=citizen"
              className="px-6 py-3.5 bg-gov-saffron-500 hover:bg-gov-saffron-600 text-white font-black text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 hover:scale-[1.02]"
            >
              <User className="w-4 h-4" />
              <span>{t.userLogin}</span>
            </Link>

            {/* Department Officer Login */}
            <Link
              to="/login?tab=officer"
              className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm rounded-xl shadow-lg border border-emerald-500/50 transition-all flex items-center gap-2 hover:scale-[1.02]"
            >
              <Building2 className="w-4 h-4" />
              <span>{t.deptLogin}</span>
            </Link>
          </div>

          {/* Scroll Down Invitation Button */}
          <div className="pt-6">
            <button
              onClick={() => scrollToSection('what-is-landreg')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-blue-200 hover:text-white text-xs font-semibold border border-white/20 transition-all cursor-pointer group"
            >
              <span>Scroll down to see what this website does</span>
              <ArrowDown className="w-3.5 h-3.5 text-amber-400 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Trust & Capability Badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-blue-200 font-medium border-t border-blue-400/20">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Multilingual (EN / हिंदी / தமிழ்)
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Pixel Uncertainty Overlays
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Certified Manigar Allocation
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Cryptographic QR E-Patta
            </span>
          </div>
        </div>
      </section>

      {/* 2. "WHAT IS THIS WEBSITE FOR?" EXPLAINER */}
      <section id="what-is-landreg" className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gov-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            <Compass className="w-3.5 h-3.5 text-gov-blue-700" />
            <span>Platform Overview</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            What Can You Do on This Website?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Whether you are a citizen managing family land or a revenue officer validating deeds, LandReg provides dedicated tools tailored for your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: For Citizens & Landowners */}
          <div className="bg-gradient-to-b from-white to-blue-50/40 rounded-2xl border-2 border-blue-200/80 p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase text-blue-700 tracking-wider">For Citizens &amp; Landowners</span>
                  <h3 className="text-xl font-black text-slate-900">Protect &amp; Verify Your Land</h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Skip long queues at Taluk offices. Access your land records from home, download digitally certified revenue documents, and verify parcel boundaries directly with field officers.
              </p>

              <div className="space-y-2.5 pt-2 text-xs text-slate-700 font-medium">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Search 1950–Present Records:</strong> Look up parent deeds, survey numbers, and Khasra passbooks with side-by-side previews.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Request On-Site Manigar:</strong> Schedule a certified village land surveyor to physically inspect and scale your land.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Download QR E-Patta / Chitta:</strong> Instant official ownership certificates ready for banks and legal registration.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>5-Stage Status Tracking:</strong> Real-time transparent tracking for deed mutation and boundary requests.</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-blue-100 flex flex-wrap items-center gap-3">
              <Link
                to="/citizen"
                className="flex-1 py-2.5 px-4 bg-gov-blue-800 hover:bg-gov-blue-900 text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <span>Enter Citizen Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              {onOpenRegisterModal && (
                <button
                  type="button"
                  onClick={onOpenRegisterModal}
                  className="py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold transition-colors"
                >
                  Register (KYC-Lite)
                </button>
              )}
            </div>
          </div>

          {/* Card 2: For Department Officers & Surveyors */}
          <div className="bg-gradient-to-b from-white to-emerald-50/40 rounded-2xl border-2 border-emerald-200/80 p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-md">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase text-emerald-700 tracking-wider">For Revenue Officers &amp; VAOs</span>
                  <h3 className="text-xl font-black text-slate-900">Digitize &amp; Validate with AI</h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                An enterprise suite for Tahsildars, Village Administrative Officers, and Surveyors to process legacy deeds with zero silent OCR errors and full cadastral integrity.
              </p>

              <div className="space-y-2.5 pt-2 text-xs text-slate-700 font-medium">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>AI Uncertainty Heatmaps:</strong> Visual pixel attention boxes highlight degraded ink, torn paper, or cursive ambiguities.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Split-Screen Workspace:</strong> Scanned archival deed on the left, synchronized editable data form on the right.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Manigar Field Dispatch:</strong> Review surveyor field notes, GPS boundary points, and upload signed certifications.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Cadastral GIS Mapping:</strong> Real-time vector parcel boundaries overlaid with high-resolution satellite imagery.</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-emerald-100">
              <Link
                to="/officer"
                className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <span>Enter Officer Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STEP-BY-STEP: HOW THE PROCESS WORKS */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              End-to-End Workflow
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              How Land Records Move Through LandReg
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              A transparent 4-stage pipeline from aged paper documents to legally certified digital land ownership.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700 relative space-y-4 hover:border-slate-500 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-mono font-bold text-base border border-blue-500/30">
                01
              </div>
              <h3 className="font-bold text-base text-white">Archival Ingestion</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Historical physical deeds (dating back to 1950) are scanned at 600 DPI and stored in tamper-proof immutable cloud storage.
              </p>
              <div className="text-[11px] text-blue-300 font-semibold flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" /> High-Resolution 600 DPI
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700 relative space-y-4 hover:border-slate-500 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-base border border-amber-500/30">
                02
              </div>
              <h3 className="font-bold text-base text-white">Pixel Uncertainty AI</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                AI extracts multilingual cursive text. Any faded, smudged, or ambiguous numeral is highlighted directly in color-coded boxes on the image.
              </p>
              <div className="text-[11px] text-amber-300 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> No Blind OCR Guesses
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700 relative space-y-4 hover:border-slate-500 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-base border border-emerald-500/30">
                03
              </div>
              <h3 className="font-bold text-base text-white">Dual Verification</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tahsildars review uncertainties side-by-side with the scan. For physical discrepancies, an on-site Manigar surveyor validates coordinates on the ground.
              </p>
              <div className="text-[11px] text-emerald-300 font-semibold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> On-Site Manigar Survey
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700 relative space-y-4 hover:border-slate-500 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-mono font-bold text-base border border-purple-500/30">
                04
              </div>
              <h3 className="font-bold text-base text-white">QR E-Patta Issuance</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                A digitally signed, legally binding E-Patta / Chitta certificate is issued with an encrypted QR code and unique ULPIN land identifier.
              </p>
              <div className="text-[11px] text-purple-300 font-semibold flex items-center gap-1">
                <QrCode className="w-3.5 h-3.5" /> Instant QR Verification
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE SERVICES CATALOG GRID */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <Award className="w-3.5 h-3.5 text-emerald-700" />
            <span>Key Platform Services</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Explore Citizen &amp; Department Features
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Quick access to the most frequently used land revenue capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Service 1 */}
          <Link
            to="/citizen/find-old-records"
            className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-400 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-700 transition-colors">
                Find Old Records (1950–Present)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Search archived settlement registers, Khasra passbooks, and original sale deeds by district, taluk, and survey number.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-blue-700 gap-1">
              Search Records <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Service 2 */}
          <Link
            to="/citizen/manigar"
            className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-700 transition-colors">
                Manigar Land Survey Booking
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Request an authorized government revenue surveyor to physically measure, scale, and demarcate parcel boundaries on-site.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-emerald-700 gap-1">
              Request Survey <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Service 3 */}
          <Link
            to="/citizen/patta-chitta"
            className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-amber-700 transition-colors">
                Digital E-Patta / Chitta
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                View, verify, and download official land title certificates complete with tamper-proof cryptographic QR codes.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-amber-700 gap-1">
              View E-Patta <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Service 4 */}
          <Link
            to="/officer/gis-map"
            className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-purple-400 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-purple-700 transition-colors">
                Cadastral GIS Revenue Map
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Explore interactive 2D cadastral village blueprints seamlessly overlaid on high-resolution satellite imagery.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-purple-700 gap-1">
              Open GIS Map <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Service 5 */}
          <Link
            to="/officer/validation-workspace"
            className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-rose-400 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <SplitSquareVertical className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-rose-700 transition-colors">
                AI Validation Workspace
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Test the split-screen officer workspace with pixel uncertainty bounding boxes and bidirectional field synchronization.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-rose-700 gap-1">
              Test AI Workspace <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Service 6 */}
          <Link
            to="/citizen/grievance"
            className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-400 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-slate-800 transition-colors">
                Grievance &amp; Correction Redressal
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Flag spelling mistakes in owner names, submit area dispute petitions, or report discrepancies directly to Tahsildars.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-slate-700 gap-1">
              File Grievance <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 5. WHY AI UNCERTAINTY IS CRITICAL: Visual Comparison */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-br from-amber-50 via-white to-blue-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-200/60 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>The Technical Innovation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Why Pixel Uncertainty Detection Prevents Land Disputes
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Historical deeds are often written with faded ink, regional cursive scripts, or archival insect damage. Traditional OCR software guesses blindly, creating silent errors that lead to protracted court battles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* The Danger of Regular OCR */}
            <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Ordinary OCR (Silent Errors)</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span>Reads ambiguous handwritten <strong>'7'</strong> as <strong>'1'</strong> or <strong>'9'</strong> without informing anyone.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span>Faded decimal point turns <strong>15.0 Acres</strong> into <strong>150 Acres</strong> in the database.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span>Requires expensive civil court cases to correct errors years later.</span>
                </li>
              </ul>
            </div>

            {/* The LandReg 3.0 Solution */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase">
                <Check className="w-4 h-4 text-emerald-700" />
                <span>LandReg 3.0 AI (Human-in-the-Loop)</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span><strong>Pixel Attention Bounding Boxes:</strong> Highlights exact low-confidence spots directly on the document image.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span><strong>Alternative Hypotheses:</strong> Displays secondary possibilities (e.g. 7 vs 1) for officer confirmation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span><strong>Continuous Learning:</strong> Every officer confirmation refines the AI model for regional village scripts.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CITIZEN & OFFICER FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            <HelpCircle className="w-3.5 h-3.5 text-slate-600" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Everything you need to know about using the LandReg platform.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-sm text-slate-800 hover:text-gov-blue-900 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-gov-blue-700 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. BOTTOM CALL TO ACTION BANNER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-r from-[#072444] via-[#0b3b6e] to-[#082d54] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl border border-blue-900 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Ready to Access or Manage Your Land Records?
            </h2>
            <p className="text-xs sm:text-sm text-blue-200">
              Join thousands of citizens across India. Registration is free and takes under a minute.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {onOpenRegisterModal && (
              <button
                type="button"
                onClick={onOpenRegisterModal}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Register as Citizen (Free)</span>
              </button>
            )}

            <Link
              to="/login?tab=citizen"
              className="px-6 py-3 bg-gov-saffron-500 hover:bg-gov-saffron-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>{t.userLogin}</span>
            </Link>

            <Link
              to="/login?tab=officer"
              className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              <span>{t.deptLogin}</span>
            </Link>
          </div>

          <div className="pt-4 text-[11px] text-blue-300 flex items-center justify-center gap-2">
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>National Revenue Helpline: <strong>1800-180-LAND</strong> (24x7 Toll-Free)</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

