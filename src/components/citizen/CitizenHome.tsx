import React from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { useRecords } from '../../context/RecordsContext';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../common/StatusBadge';
import {
  FileText,
  Clock,
  CheckCircle2,
  Award,
  Search,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Sparkles,
  AlertCircle,
  Ruler
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const CitizenHome: React.FC = () => {
  const { t } = useTranslation();
  const { records, grievances, manigarRequests } = useRecords();
  const { citizen } = useAuth();

  const myRecords = records.filter(
    (r) => r.extractedData.district.toLowerCase() === 'madurai' || r.citizenAadhaarLast4 === '8842'
  );

  const pendingValidations = records.filter(
    (r) => r.status === 'Needs Human Review' || r.status === 'Under AI Review'
  ).length;

  const resolvedGrievances = grievances.filter((g) => g.status === 'Resolved').length;

  return (
    <div className="space-y-6">
      {/* Welcome Banner with National E-Gov Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0b3b6e] via-[#104b86] to-[#047857] text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-xs font-semibold mb-3 border border-white/20">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>Digital India Land Records • Aadhaar KYC-Lite Verified</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            {t.welcomeCitizen}, {citizen?.name || 'K. R. Sundaralingam'}!
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed mb-4">
            Access your sovereign land deeds, track real-time AI validation progress for Survey parcels, and download QR-certified Patta / Chitta extracts instantly.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <Link
              to="/citizen/find-old-records"
              className="px-4 py-2 bg-white text-gov-blue-900 hover:bg-blue-50 font-bold rounded-lg shadow-sm transition-all flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-gov-blue-700" />
              {t.findOldRecords}
            </Link>
            <Link
              to="/citizen/patta-chitta"
              className="px-4 py-2 bg-gov-saffron-500 hover:bg-gov-saffron-600 text-white font-bold rounded-lg shadow-sm transition-all flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              {t.pattaChitta}
            </Link>
          </div>
        </div>

        {/* Decorative background element */}
        <div className="absolute right-[-20px] bottom-[-30px] opacity-10 pointer-events-none">
          <Award className="w-64 h-64 text-white" />
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Linked Records */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-gov-blue-400 transition-all flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-1">
              {t.citizenStatsRecords}
            </span>
            <span className="text-2xl font-black text-slate-900 font-mono">
              {myRecords.length} Parcels
            </span>
            <span className="text-[11px] text-emerald-600 font-medium block mt-1">
              • 6.38 Total Hectares
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-gov-blue-700 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        {/* Pending Validations */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-amber-400 transition-all flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-1">
              {t.citizenStatsPending}
            </span>
            <span className="text-2xl font-black text-amber-900 font-mono">
              {pendingValidations}
            </span>
            <span className="text-[11px] text-amber-600 font-medium block mt-1">
              • AI OCR Review in Progress
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Resolved Grievances */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-emerald-400 transition-all flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-1">
              {t.citizenStatsResolved}
            </span>
            <span className="text-2xl font-black text-emerald-900 font-mono">
              {resolvedGrievances}
            </span>
            <span className="text-[11px] text-emerald-600 font-medium block mt-1">
              • 1 Under VAO Inspection
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Services Grid */}
      <div>
        <h3 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gov-blue-600" />
          {t.quickServices}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <Link
            to="/citizen/find-old-records"
            className="p-4 bg-white rounded-xl border border-slate-200 hover:shadow-md hover:border-gov-blue-400 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-gov-blue-700 flex items-center justify-center mb-3 group-hover:bg-gov-blue-800 group-hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-xs text-slate-900 mb-1">{t.findOldRecords}</h4>
            <p className="text-[11px] text-slate-500">
              Look up historical survey maps and A-register ledgers.
            </p>
          </Link>

          <Link
            to="/citizen/manigar"
            className="p-4 bg-white rounded-xl border border-slate-200 hover:shadow-md hover:border-emerald-500 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
              <Ruler className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-xs text-slate-900 mb-1">{t.manigar}</h4>
            <p className="text-[11px] text-slate-500">
              Request land surveyor to scale boundaries &amp; certify size accuracy.
            </p>
          </Link>

          <Link
            to="/citizen/patta-chitta"
            className="p-4 bg-white rounded-xl border border-slate-200 hover:shadow-md hover:border-gov-blue-400 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-gov-blue-800 flex items-center justify-center mb-3 group-hover:bg-gov-blue-900 group-hover:text-white transition-colors">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-xs text-slate-900 mb-1">{t.pattaChitta}</h4>
            <p className="text-[11px] text-slate-500">
              Generate QR-certified digital ownership certificates.
            </p>
          </Link>

          <Link
            to="/citizen/status-tracker"
            className="p-4 bg-white rounded-xl border border-slate-200 hover:shadow-md hover:border-gov-blue-400 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-3 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-xs text-slate-900 mb-1">{t.statusTracker}</h4>
            <p className="text-[11px] text-slate-500">
              View stage-by-stage lifecycle of your validation requests.
            </p>
          </Link>

          <Link
            to="/citizen/grievance"
            className="p-4 bg-white rounded-xl border border-slate-200 hover:shadow-md hover:border-gov-blue-400 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center mb-3 group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-xs text-slate-900 mb-1">{t.raiseGrievance}</h4>
            <p className="text-[11px] text-slate-500">
              Flag incorrect spelling or area discrepancies for review.
            </p>
          </Link>
        </div>
      </div>

      {/* Linked Land Records Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-sm text-slate-900">
              My Linked Landholdings (Melur Taluk, Madurai)
            </h3>
            <p className="text-xs text-slate-500">
              Automated ledger matching via Mobile &amp; Aadhaar linkage
            </p>
          </div>
          <Link
            to="/citizen/my-records"
            className="text-xs font-bold text-gov-blue-700 hover:underline flex items-center gap-1"
          >
            View All ({myRecords.length}) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="p-3">Survey &amp; Sub-div</th>
                <th className="p-3">Khata / Patta No</th>
                <th className="p-3">Village / Taluk</th>
                <th className="p-3">Extent (Area)</th>
                <th className="p-3">Classification</th>
                <th className="p-3">Validation Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {myRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-mono font-bold text-gov-blue-900">
                    {rec.extractedData.surveyNumber}
                  </td>
                  <td className="p-3 font-mono text-slate-700">
                    {rec.extractedData.pattaNumber}
                  </td>
                  <td className="p-3 text-slate-700">
                    {rec.extractedData.village}, {rec.extractedData.tehsilTaluk}
                  </td>
                  <td className="p-3 font-mono font-medium text-slate-800">
                    {rec.extractedData.plotAreaHectares} Ha ({rec.extractedData.plotAreaCents} Cents)
                  </td>
                  <td className="p-3 text-slate-700">
                    {rec.extractedData.landClassification}
                  </td>
                  <td className="p-3">
                    <StatusBadge status={rec.status} size="sm" />
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <Link
                      to="/citizen/patta-chitta"
                      className="px-2.5 py-1 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300 rounded font-semibold text-[11px] inline-flex items-center gap-1"
                    >
                      <Award className="w-3 h-3 text-emerald-600" />
                      Patta
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
