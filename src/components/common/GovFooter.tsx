import React from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { Phone, Shield, Sparkles, HelpCircle, ExternalLink, Award, FileText, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const GovFooter: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t-4 border-[#0b3b6e] text-sm mt-auto">
      {/* Top Helpline Banner */}
      <div className="bg-[#0b3b6e] py-3 px-4 sm:px-8 text-white flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2 font-semibold">
          <Phone className="w-4 h-4 text-gov-saffron-300" />
          <span>{t.helpline}</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/citizen/grievance"
            className="text-white hover:underline flex items-center gap-1 font-medium underline underline-offset-4 decoration-amber-400"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            {t.grievanceLink}
          </Link>
          <span className="hidden sm:inline opacity-50">|</span>
          <span className="inline-flex items-center gap-1.5 bg-emerald-950/80 text-emerald-300 px-2.5 py-0.5 rounded-full text-xs font-mono border border-emerald-700/50">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            {t.poweredByAi}
          </span>
        </div>
      </div>

      {/* Main Footer Links & Accreditation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs text-slate-400">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-white font-bold text-xs">
              🇮🇳
            </div>
            <h4 className="text-white font-bold text-sm">LandReg DILRMP 3.0</h4>
          </div>
          <p className="leading-relaxed mb-3">
            An advanced National E-Governance platform for seamless cadastral mapping, OCR-driven legacy deed translation, and pixel-uncertainty validation.
          </p>
          <div className="flex items-center gap-2 text-emerald-400 font-medium">
            <Shield className="w-3.5 h-3.5" />
            <span>MeitY &amp; NIC Sovereign Cloud Certified</span>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm mb-3">Citizen Online Services</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/citizen/find-old-records" className="hover:text-white transition-colors">
                • Search Old Legacy Land Records
              </Link>
            </li>
            <li>
              <Link to="/citizen/patta-chitta" className="hover:text-white transition-colors">
                • Download Certified Patta / Chitta
              </Link>
            </li>
            <li>
              <Link to="/citizen/status-tracker" className="hover:text-white transition-colors">
                • 5-Stage Verification Status Tracker
              </Link>
            </li>
            <li>
              <Link to="/citizen/grievance" className="hover:text-white transition-colors">
                • Submit Land Data Correction / Grievance
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm mb-3">Department &amp; Officer Tools</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/officer/validation-workspace" className="hover:text-white transition-colors">
                • AI Document Validation Workspace (Split-Screen)
              </Link>
            </li>
            <li>
              <Link to="/officer/ai-ocr" className="hover:text-white transition-colors">
                • Multi-Lingual OCR &amp; Handwriting Scanner
              </Link>
            </li>
            <li>
              <Link to="/officer/gis-map" className="hover:text-white transition-colors">
                • 2D Cadastral &amp; Satellite GIS Layer
              </Link>
            </li>
            <li>
              <Link to="/officer/api-integrations" className="hover:text-white transition-colors">
                • LRMS, DILRMP &amp; Bhunaksha Interop Monitor
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm mb-3">Legal &amp; Compliance</h4>
          <p className="leading-relaxed mb-2">
            Built in compliance with the Digital Personal Data Protection Act (DPDPA 2023) and ISO 27001 Information Security standards.
          </p>
          <div className="p-2.5 rounded bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300">
            <span className="font-semibold text-white block mb-1">State Integration Nodes:</span>
            Tamil Nadu (Tamil Nilam), UP (Bhulekh), Maharashtra (MahaBhulekh), Karnataka (Bhoomi).
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-slate-950 py-3 px-4 sm:px-8 text-center text-[11px] text-slate-400 border-t border-slate-800">
        <p>{t.copyright}</p>
      </div>
    </footer>
  );
};
