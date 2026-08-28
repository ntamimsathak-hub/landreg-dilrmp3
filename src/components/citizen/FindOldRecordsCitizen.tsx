import React, { useState } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { useRecords } from '../../context/RecordsContext';
import { LandRecord } from '../../types/landRecord';
import { StatusBadge } from '../common/StatusBadge';
import { ConfidenceMeter } from '../common/ConfidenceMeter';
import {
  Search,
  Filter,
  Eye,
  FileText,
  X,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  Award,
  Download,
  RotateCcw
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const FindOldRecordsCitizen: React.FC = () => {
  const { t } = useTranslation();
  const { records } = useRecords();

  const [stateFilter, setStateFilter] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');
  const [villageFilter, setVillageFilter] = useState('');
  const [surveyQuery, setSurveyQuery] = useState('');
  const [ownerQuery, setOwnerQuery] = useState('');

  const [previewRecord, setPreviewRecord] = useState<LandRecord | null>(null);

  const filteredRecords = records.filter((r) => {
    if (stateFilter && r.extractedData.state !== stateFilter) return false;
    if (districtFilter && !r.extractedData.district.toLowerCase().includes(districtFilter.toLowerCase())) return false;
    if (villageFilter && !r.extractedData.village.toLowerCase().includes(villageFilter.toLowerCase())) return false;
    if (surveyQuery && !r.extractedData.surveyNumber.toLowerCase().includes(surveyQuery.toLowerCase())) return false;
    if (ownerQuery && !r.extractedData.landownerName.toLowerCase().includes(ownerQuery.toLowerCase())) return false;
    return true;
  });

  const resetFilters = () => {
    setStateFilter('');
    setDistrictFilter('');
    setVillageFilter('');
    setSurveyQuery('');
    setOwnerQuery('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 mb-1">
          {t.findOldRecords} (Historical Land Ledger Search)
        </h2>
        <p className="text-xs text-slate-600">
          Query legacy land survey registers, settlement A-registers, and Patta records across all Indian states and districts.
        </p>

        {/* Multi-Parameter Search Form */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">{t.selectState}</label>
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-gov-blue-500 outline-none"
            >
              <option value="">All States</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">{t.selectDistrict}</label>
            <input
              type="text"
              placeholder="e.g. Madurai, Lucknow, Pune"
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-gov-blue-500 outline-none"
            >
            </input>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">{t.selectVillage}</label>
            <input
              type="text"
              placeholder="e.g. Navinipatti, Bhaisamau"
              value={villageFilter}
              onChange={(e) => setVillageFilter(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-gov-blue-500 outline-none"
            >
            </input>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">{t.surveyNumber} / Khasra</label>
            <input
              type="text"
              placeholder="e.g. 142/7A, 219/3"
              value={surveyQuery}
              onChange={(e) => setSurveyQuery(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono focus:ring-2 focus:ring-gov-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">{t.ownerName}</label>
            <input
              type="text"
              placeholder="e.g. Sundaralingam, Tiwari"
              value={ownerQuery}
              onChange={(e) => setOwnerQuery(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-gov-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
          <span className="text-xs text-slate-500 font-medium">
            Found <strong>{filteredRecords.length}</strong> matching land records
          </span>
          <button
            type="button"
            onClick={resetFilters}
            className="px-3 py-1.5 rounded text-xs text-slate-600 hover:bg-slate-100 flex items-center gap-1 font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {t.resetFilters}
          </button>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700">
            Archival Land Records Database
          </h3>
          <span className="text-[11px] text-slate-500">
            Click "View Side-by-Side" to inspect scanned deed &amp; AI extracted fields
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/75 border-b border-slate-200 text-slate-600 font-bold">
                <th className="p-3.5">Document #</th>
                <th className="p-3.5">Deed Title</th>
                <th className="p-3.5">Survey / Khasra</th>
                <th className="p-3.5">Owner Name</th>
                <th className="p-3.5">Jurisdiction</th>
                <th className="p-3.5">Area (Ha)</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-blue-50/40 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-gov-blue-900">
                    {rec.documentNumber}
                  </td>
                  <td className="p-3.5 font-semibold text-slate-800">
                    {rec.documentTitle}
                  </td>
                  <td className="p-3.5 font-mono font-bold text-slate-900">
                    {rec.extractedData.surveyNumber}
                  </td>
                  <td className="p-3.5 font-medium text-slate-900">
                    {rec.extractedData.landownerName}
                  </td>
                  <td className="p-3.5 text-slate-600">
                    {rec.extractedData.village}, {rec.extractedData.district} ({rec.extractedData.state})
                  </td>
                  <td className="p-3.5 font-mono text-slate-800">
                    {rec.extractedData.plotAreaHectares} Ha
                  </td>
                  <td className="p-3.5">
                    <StatusBadge status={rec.status} size="sm" />
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => setPreviewRecord(rec)}
                      className="px-3 py-1.5 bg-gov-blue-800 hover:bg-gov-blue-900 text-white rounded-lg font-bold text-[11px] shadow-xs inline-flex items-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View Record
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Side-by-Side Record Detailed View Modal */}
      {previewRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="bg-[#0b3b6e] text-white px-6 py-3.5 flex items-center justify-between border-b border-blue-900">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="font-bold text-sm leading-tight">
                    {previewRecord.documentTitle} — {previewRecord.documentNumber}
                  </h3>
                  <span className="text-[11px] text-blue-200">
                    {previewRecord.extractedData.village}, {previewRecord.extractedData.district}, {previewRecord.extractedData.state}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={previewRecord.status} size="sm" />
                <button
                  onClick={() => setPreviewRecord(null)}
                  className="p-1 rounded text-blue-200 hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Split Screen Preview */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 overflow-y-auto p-5 gap-6">
              {/* Left Column: Scanned Deed Image Preview */}
              <div className="space-y-2 flex flex-col">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Scanned Historical Deed (High-Resolution)</span>
                  <span className="text-[11px] text-slate-400 font-mono">600 DPI Master Scan</span>
                </div>
                <div className="flex-1 bg-slate-100 border border-slate-300 rounded-xl overflow-hidden shadow-inner p-2 flex items-center justify-center min-h-[380px]">
                  <img
                    src={previewRecord.scannedDocumentUrl}
                    alt="Scanned Deed Document"
                    className="max-w-full max-h-[500px] object-contain rounded shadow-xs"
                  />
                </div>
              </div>

              {/* Right Column: AI Extracted Structured Data */}
              <div className="space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-gov-blue-600" />
                      Extracted Land Ledger Attributes
                    </h4>
                    <ConfidenceMeter confidence={previewRecord.overallConfidence} />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div>
                      <span className="text-[11px] text-slate-500 block font-medium">Landowner Name</span>
                      <span className="font-bold text-slate-900">{previewRecord.extractedData.landownerName}</span>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-500 block font-medium">Father / Husband</span>
                      <span className="font-bold text-slate-900">{previewRecord.extractedData.fatherHusbandName}</span>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-500 block font-medium">Survey / Subdivision</span>
                      <span className="font-mono font-bold text-gov-blue-900">{previewRecord.extractedData.surveyNumber}</span>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-500 block font-medium">Patta / Khata Number</span>
                      <span className="font-mono font-bold text-slate-900">{previewRecord.extractedData.pattaNumber}</span>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-500 block font-medium">Total Area</span>
                      <span className="font-mono font-bold text-slate-900">{previewRecord.extractedData.plotAreaHectares} Ha ({previewRecord.extractedData.plotAreaCents} Cents)</span>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-500 block font-medium">Land Classification</span>
                      <span className="font-bold text-slate-900">{previewRecord.extractedData.landClassification}</span>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-500 block font-medium">Ownership Structure</span>
                      <span className="font-medium text-slate-800">{previewRecord.extractedData.ownershipType}</span>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-500 block font-medium">Registration Deed Ref</span>
                      <span className="font-mono text-slate-800">{previewRecord.extractedData.registrationNumber} ({previewRecord.extractedData.registrationYear})</span>
                    </div>
                  </div>

                  {/* Boundary descriptions */}
                  <div className="mt-3 p-3 bg-white rounded-lg border border-slate-200 text-xs space-y-1">
                    <span className="font-bold text-slate-800 block text-[11px]">Parcel Boundaries (Chathur Seemai):</span>
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                      <p><strong>N:</strong> {previewRecord.extractedData.boundaryNorth}</p>
                      <p><strong>S:</strong> {previewRecord.extractedData.boundarySouth}</p>
                      <p><strong>E:</strong> {previewRecord.extractedData.boundaryEast}</p>
                      <p><strong>W:</strong> {previewRecord.extractedData.boundaryWest}</p>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons inside Modal */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                  <Link
                    to="/citizen/patta-chitta"
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-xs shadow-xs flex items-center gap-2 transition-colors"
                  >
                    <Award className="w-4 h-4" />
                    Generate Patta Certificate
                  </Link>
                  <button
                    onClick={() => setPreviewRecord(null)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold text-xs transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
