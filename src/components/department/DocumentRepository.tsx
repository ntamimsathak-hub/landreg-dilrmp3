import React, { useState } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { useRecords } from '../../context/RecordsContext';
import { StatusBadge } from '../common/StatusBadge';
import {
  Archive,
  Search,
  FileText,
  Eye,
  Download,
  Calendar,
  Layers,
  History,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const DocumentRepository: React.FC = () => {
  const { t } = useTranslation();
  const { records, setSelectedRecord } = useRecords();
  const [searchTerm, setSearchTerm] = useState('');
  const [docTypeFilter, setDocTypeFilter] = useState('');

  const filteredDocs = records.filter((r) => {
    if (docTypeFilter && r.documentType !== docTypeFilter) return false;
    if (searchTerm) {
      const matchNumber = r.documentNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchOwner = r.extractedData.landownerName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchSurvey = r.extractedData.surveyNumber.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchNumber && !matchOwner && !matchSurvey) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            {t.docRepository} (Sovereign Archival Vault)
          </h2>
          <p className="text-xs text-slate-600">
            Immutable document library containing high-resolution 600 DPI master scans, metadata ledgers, and SHA-256 audit logs.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>WORM Compliant (Write Once, Read Many)</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-[280px]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by Document Number, Survey No, or Landowner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-gov-blue-500"
            />
          </div>

          <select
            value={docTypeFilter}
            onChange={(e) => setDocTypeFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white outline-none focus:ring-2 focus:ring-gov-blue-500"
          >
            <option value="">All Document Types</option>
            <option value="Patta Deed">Patta Deed</option>
            <option value="Khasra / Khatauni">Khasra / Khatauni</option>
            <option value="Settlement Register (A-Register)">Settlement A-Register</option>
          </select>
        </div>

        <span className="text-xs text-slate-500 font-medium">
          Showing <strong>{filteredDocs.length}</strong> archived deeds
        </span>
      </div>

      {/* Vault Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-gov-blue-400 transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Top Row */}
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
                    {doc.documentType}
                  </span>
                  <h3 className="font-bold text-xs text-gov-blue-900 font-mono">
                    {doc.documentNumber}
                  </h3>
                </div>
                <StatusBadge status={doc.status} size="sm" />
              </div>

              {/* Attributes */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Landowner:</span>
                  <span className="font-bold text-slate-900 truncate max-w-[150px]">{doc.extractedData.landownerName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Survey No:</span>
                  <span className="font-bold font-mono text-slate-900">{doc.extractedData.surveyNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Extent:</span>
                  <span className="font-bold font-mono text-slate-900">{doc.extractedData.plotAreaHectares} Ha</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Uploaded Date:</span>
                  <span className="font-mono">{doc.uploadDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Uploaded By:</span>
                  <span className="truncate max-w-[140px]">{doc.uploadedBy}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono text-slate-400">
                SHA-256 Verified
              </span>
              <Link
                to="/officer/validation-workspace"
                onClick={() => setSelectedRecord(doc)}
                className="px-3 py-1.5 bg-gov-blue-800 hover:bg-gov-blue-900 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                Inspect Deed
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
