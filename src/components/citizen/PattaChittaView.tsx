import React, { useState } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { useRecords } from '../../context/RecordsContext';
import { QrCodeView } from '../common/QrCodeView';
import { StatusBadge } from '../common/StatusBadge';
import {
  Award,
  Printer,
  Download,
  Search,
  CheckCircle2,
  ShieldCheck,
  Building,
  QrCode,
  Sparkles,
  MapPin
} from 'lucide-react';

export const PattaChittaView: React.FC = () => {
  const { t } = useTranslation();
  const { records } = useRecords();

  const [selectedRecordId, setSelectedRecordId] = useState<string>(records[0]?.id || '');
  const [searchPattaNo, setSearchPattaNo] = useState('');

  const currentRecord = records.find((r) => r.id === selectedRecordId) || records[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Search & Selection Bar */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 print:hidden">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            {t.pattaChittaTitle}
          </h2>
          <p className="text-xs text-slate-600">
            {t.pattaChittaSubtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <div className="flex-1 min-w-[240px]">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Linked Land Parcel
            </label>
            <select
              value={selectedRecordId}
              onChange={(e) => setSelectedRecordId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-emerald-500 font-medium"
            >
              {records.map((r) => (
                <option key={r.id} value={r.id}>
                  Survey {r.extractedData.surveyNumber} • {r.extractedData.landownerName} ({r.extractedData.village}, {r.extractedData.state})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end gap-2 self-end">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-gov-blue-800 hover:bg-gov-blue-900 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              {t.printCert}
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4" />
              {t.savePdf}
            </button>
          </div>
        </div>
      </div>

      {/* Official Certificate Canvas Container (Government Certified Template) */}
      <div className="bg-white rounded-2xl border-2 border-slate-300 shadow-lg p-6 sm:p-10 max-w-4xl mx-auto relative overflow-hidden text-slate-800 print:shadow-none print:border-none print:p-2">
        {/* Certificate Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
          <div className="w-[500px] h-[500px] rounded-full border-[20px] border-black flex items-center justify-center text-5xl font-black text-center rotate-[-30deg]">
            GOVERNMENT OF INDIA • DILRMP 3.0 • VERIFIED PATTA
          </div>
        </div>

        {/* Certificate Header */}
        <div className="text-center border-b-2 border-slate-800 pb-6 mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            {/* National Emblem SVG */}
            <div className="w-12 h-14">
              <svg viewBox="0 0 100 120" className="w-full h-full text-[#0b3b6e]" fill="currentColor">
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
          </div>

          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 uppercase">
            Government of {currentRecord.extractedData.state}
          </h1>
          <h2 className="text-sm font-bold text-slate-700 mt-1">
            Department of Revenue and Land Administration
          </h2>
          <div className="inline-block bg-slate-900 text-white px-4 py-1 rounded-md text-xs font-bold tracking-widest mt-2 uppercase">
            Official E-Patta / Chitta Record of Rights (DILRMP 3.0)
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-mono">
            Certificate Ref: DILRMP/E-PATTA/{currentRecord.extractedData.state.substring(0, 2).toUpperCase()}/{currentRecord.extractedData.pattaNumber}
          </p>
        </div>

        {/* Certificate Body */}
        <div className="space-y-6 text-xs sm:text-sm">
          {/* Metadata Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div>
              <span className="text-[11px] text-slate-500 block uppercase font-bold">State</span>
              <span className="font-bold text-slate-900">{currentRecord.extractedData.state}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block uppercase font-bold">District</span>
              <span className="font-bold text-slate-900">{currentRecord.extractedData.district}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block uppercase font-bold">Taluk / Tehsil</span>
              <span className="font-bold text-slate-900">{currentRecord.extractedData.tehsilTaluk}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block uppercase font-bold">Village / Mouza</span>
              <span className="font-bold text-slate-900">{currentRecord.extractedData.village}</span>
            </div>
          </div>

          {/* Landowner & Title Section */}
          <div className="border border-slate-300 rounded-xl overflow-hidden">
            <div className="bg-slate-100 px-4 py-2 font-bold text-xs uppercase tracking-wider text-slate-700 border-b border-slate-300">
              1. Landowner (Pattadar) Particulars
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-slate-500 block">Registered Pattadar Name:</span>
                <span className="text-base font-bold text-slate-900">{currentRecord.extractedData.landownerName}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Father / Husband / Guardian:</span>
                <span className="text-base font-bold text-slate-900">{currentRecord.extractedData.fatherHusbandName}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Patta / Khata Number:</span>
                <span className="text-sm font-bold font-mono text-gov-blue-900">{currentRecord.extractedData.pattaNumber}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Ownership Nature:</span>
                <span className="text-sm font-semibold text-slate-800">{currentRecord.extractedData.ownershipType}</span>
              </div>
            </div>
          </div>

          {/* Survey & Area Table */}
          <div className="border border-slate-300 rounded-xl overflow-hidden">
            <div className="bg-slate-100 px-4 py-2 font-bold text-xs uppercase tracking-wider text-slate-700 border-b border-slate-300">
              2. Land Parcel Schedule &amp; Classification
            </div>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-300 font-bold text-slate-700">
                  <th className="p-3">Survey No</th>
                  <th className="p-3">Subdivision</th>
                  <th className="p-3">Land Type</th>
                  <th className="p-3">Area (Hectares)</th>
                  <th className="p-3">Area (Cents / Acre)</th>
                  <th className="p-3">Annual Land Tax</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                <tr>
                  <td className="p-3 font-bold text-gov-blue-900">
                    {currentRecord.extractedData.surveyNumber.split('/')[0]}
                  </td>
                  <td className="p-3 font-bold text-gov-blue-900">
                    {currentRecord.extractedData.surveyNumber.split('/')[1] || '1'}
                  </td>
                  <td className="p-3 font-sans font-semibold text-emerald-800">
                    {currentRecord.extractedData.landClassification}
                  </td>
                  <td className="p-3 font-bold text-slate-900">
                    {currentRecord.extractedData.plotAreaHectares} Ha
                  </td>
                  <td className="p-3 text-slate-800">
                    {currentRecord.extractedData.plotAreaCents} Cents
                  </td>
                  <td className="p-3 text-slate-800">
                    ₹ 14.80
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Four Boundaries (Chathur Seemai) */}
          <div className="border border-slate-300 rounded-xl p-4 bg-slate-50/50">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-2">
              3. Four Boundaries (Chathur Seemai)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <p><strong>North:</strong> {currentRecord.extractedData.boundaryNorth}</p>
              <p><strong>South:</strong> {currentRecord.extractedData.boundarySouth}</p>
              <p><strong>East:</strong> {currentRecord.extractedData.boundaryEast}</p>
              <p><strong>West:</strong> {currentRecord.extractedData.boundaryWest}</p>
            </div>
          </div>

          {/* Dynamic Verification QR Code & Digital Signature */}
          <div className="border-t-2 border-slate-300 pt-6 flex flex-wrap items-center justify-between gap-6">
            {/* Left: QR Code */}
            <div className="flex items-center gap-4">
              <QrCodeView value={currentRecord.qrVerificationCode} size={110} />
              <div className="max-w-xs space-y-1">
                <span className="text-xs font-bold text-slate-900 block flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Sovereign Cryptographic QR
                </span>
                <p className="text-[11px] text-slate-500 leading-tight">
                  {t.qrVerificationNote}
                </p>
              </div>
            </div>

            {/* Right: Digital Signature Block */}
            <div className="text-right space-y-1">
              <div className="inline-block p-2 bg-emerald-50 border border-emerald-300 rounded text-[11px] text-emerald-900 font-mono text-left mb-2">
                <span className="font-bold block">✓ Digitally Signed &amp; Sealed</span>
                <span>Tahsildar &amp; Executive Magistrate</span>
                <br />
                <span>Timestamp: 2026-08-20 10:14:25 UTC</span>
              </div>
              <p className="text-xs font-bold text-slate-800">
                Authorized Revenue Authority (Melur Taluk)
              </p>
              <p className="text-[10px] text-slate-500">
                This document is generated by DILRMP 3.0 and legally valid under the IT Act 2000.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
