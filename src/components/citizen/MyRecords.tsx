import React from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { useRecords } from '../../context/RecordsContext';
import { StatusBadge } from '../common/StatusBadge';
import { ConfidenceMeter } from '../common/ConfidenceMeter';
import {
  FileText,
  Award,
  MapPin,
  Compass,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  Clock,
  Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const MyRecords: React.FC = () => {
  const { t } = useTranslation();
  const { records } = useRecords();

  const myRecords = records.filter(
    (r) => r.extractedData.district.toLowerCase() === 'madurai' || r.citizenAadhaarLast4 === '8842'
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            {t.myRecords} (Linked Landholdings)
          </h2>
          <p className="text-xs text-slate-600">
            Parcels automatically matched and authenticated using your registered Aadhaar (**** 8842) and Mobile number.
          </p>
        </div>
        <div className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-bold flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Central Land Ledger Synced</span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {myRecords.map((rec) => (
          <div
            key={rec.id}
            className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-gov-blue-400 transition-all p-5 space-y-4 flex flex-col justify-between"
          >
            <div>
              {/* Card Top Row */}
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    {rec.documentType}
                  </span>
                  <h3 className="font-bold text-base text-gov-blue-900 font-mono">
                    Survey No: {rec.extractedData.surveyNumber}
                  </h3>
                </div>
                <StatusBadge status={rec.status} size="sm" />
              </div>

              {/* Attributes Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs py-3">
                <div>
                  <span className="text-[11px] text-slate-500 block">Patta / Khata No:</span>
                  <span className="font-bold font-mono text-slate-800">{rec.extractedData.pattaNumber}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">Total Extent:</span>
                  <span className="font-bold font-mono text-slate-800">
                    {rec.extractedData.plotAreaHectares} Ha ({rec.extractedData.plotAreaCents} Cents)
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">Village &amp; Taluk:</span>
                  <span className="font-medium text-slate-800">
                    {rec.extractedData.village}, {rec.extractedData.tehsilTaluk}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">Land Classification:</span>
                  <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded inline-block">
                    {rec.extractedData.landClassification}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">Ownership Structure:</span>
                  <span className="font-medium text-slate-700">{rec.extractedData.ownershipType}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">AI Accuracy Score:</span>
                  <ConfidenceMeter confidence={rec.overallConfidence} />
                </div>
              </div>

              {/* Boundary Summary */}
              <div className="p-2.5 bg-slate-50 rounded-lg text-[11px] text-slate-600 border border-slate-200">
                <span className="font-bold text-slate-700 block mb-0.5">Four Boundaries:</span>
                <p className="line-clamp-1">
                  N: {rec.extractedData.boundaryNorth} | S: {rec.extractedData.boundarySouth}
                </p>
              </div>
            </div>

            {/* Card Action Buttons */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Link
                  to="/citizen/status-tracker"
                  className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {t.statusTracker}
                </Link>
                <Link
                  to="/citizen/grievance"
                  className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  Flag Issue
                </Link>
              </div>

              <Link
                to="/citizen/patta-chitta"
                className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <Award className="w-3.5 h-3.5" />
                Download Patta
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
