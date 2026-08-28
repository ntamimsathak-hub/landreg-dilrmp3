import React, { useState } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { useRecords } from '../../context/RecordsContext';
import { StatusBadge } from '../common/StatusBadge';
import {
  Search,
  Download,
  FileSpreadsheet,
  FileText,
  RotateCcw,
  Eye,
  Filter,
  SplitSquareVertical
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const AdvancedSearchDept: React.FC = () => {
  const { t } = useTranslation();
  const { records, setSelectedRecord } = useRecords();
  const navigate = useNavigate();

  const [stateFilter, setStateFilter] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');
  const [villageFilter, setVillageFilter] = useState('');
  const [surveyNumber, setSurveyNumber] = useState('');
  const [mutationId, setMutationId] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredRecords = records.filter((r) => {
    if (stateFilter && r.extractedData.state !== stateFilter) return false;
    if (districtFilter && !r.extractedData.district.toLowerCase().includes(districtFilter.toLowerCase())) return false;
    if (villageFilter && !r.extractedData.village.toLowerCase().includes(villageFilter.toLowerCase())) return false;
    if (surveyNumber && !r.extractedData.surveyNumber.toLowerCase().includes(surveyNumber.toLowerCase())) return false;
    if (mutationId && !r.extractedData.mutationRecordId.toLowerCase().includes(mutationId.toLowerCase())) return false;
    if (statusFilter && r.status !== statusFilter) return false;
    return true;
  });

  const exportCSV = () => {
    const headers = ['DocumentNumber', 'SurveyNumber', 'Landowner', 'Village', 'District', 'State', 'AreaHectares', 'Classification', 'Status'];
    const rows = filteredRecords.map((r) => [
      r.documentNumber,
      r.extractedData.surveyNumber,
      `"${r.extractedData.landownerName}"`,
      r.extractedData.village,
      r.extractedData.district,
      r.extractedData.state,
      r.extractedData.plotAreaHectares,
      r.extractedData.landClassification,
      r.status
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `DILRMP_Land_Records_Export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetFilters = () => {
    setStateFilter('');
    setDistrictFilter('');
    setVillageFilter('');
    setSurveyNumber('');
    setMutationId('');
    setStatusFilter('');
  };

  return (
    <div className="space-y-6">
      {/* Header & Export Toolbar */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            {t.findOldRecords} (Department Legacy Master Database)
          </h2>
          <p className="text-xs text-slate-600">
            Query across state-wide settlement registers, khasra maps, and mutation orders with bulk export.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Bulk Export CSV
          </button>
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export PDF Report
          </button>
        </div>
      </div>

      {/* Advanced Filter Matrix */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 border-b border-slate-100 pb-2">
          <Filter className="w-3.5 h-3.5 text-gov-blue-700" />
          Advanced Query Parameters
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">State</label>
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="w-full px-2.5 py-2 border border-slate-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-gov-blue-500"
            >
              <option value="">All States</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">District</label>
            <input
              type="text"
              placeholder="e.g. Madurai, Lucknow"
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="w-full px-2.5 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-gov-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Village</label>
            <input
              type="text"
              placeholder="e.g. Navinipatti"
              value={villageFilter}
              onChange={(e) => setVillageFilter(e.target.value)}
              className="w-full px-2.5 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-gov-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Survey / Subdivision</label>
            <input
              type="text"
              placeholder="e.g. 142/7A"
              value={surveyNumber}
              onChange={(e) => setSurveyNumber(e.target.value)}
              className="w-full px-2.5 py-2 border border-slate-300 rounded-lg font-mono outline-none focus:ring-2 focus:ring-gov-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Mutation ID</label>
            <input
              type="text"
              placeholder="e.g. MUT-2026"
              value={mutationId}
              onChange={(e) => setMutationId(e.target.value)}
              className="w-full px-2.5 py-2 border border-slate-300 rounded-lg font-mono outline-none focus:ring-2 focus:ring-gov-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-2.5 py-2 border border-slate-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-gov-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="Verified">Verified</option>
              <option value="Needs Human Review">Needs Human Review</option>
              <option value="Under AI Review">Under AI Review</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-slate-500">
            Matching records: <strong>{filteredRecords.length}</strong>
          </span>
          <button
            onClick={resetFilters}
            className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg flex items-center gap-1 font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/75 border-b border-slate-200 text-slate-600 font-bold">
                <th className="p-3.5">Document #</th>
                <th className="p-3.5">Survey &amp; Sub-div</th>
                <th className="p-3.5">Landowner Name</th>
                <th className="p-3.5">Village / District</th>
                <th className="p-3.5">Area (Ha)</th>
                <th className="p-3.5">Mutation Ref</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-gov-blue-900">
                    {rec.documentNumber}
                  </td>
                  <td className="p-3.5 font-mono font-bold text-slate-900">
                    {rec.extractedData.surveyNumber}
                  </td>
                  <td className="p-3.5 font-medium text-slate-900">
                    {rec.extractedData.landownerName}
                  </td>
                  <td className="p-3.5 text-slate-600">
                    {rec.extractedData.village}, {rec.extractedData.district}
                  </td>
                  <td className="p-3.5 font-mono text-slate-800">
                    {rec.extractedData.plotAreaHectares} Ha
                  </td>
                  <td className="p-3.5 font-mono text-slate-600">
                    {rec.extractedData.mutationRecordId}
                  </td>
                  <td className="p-3.5">
                    <StatusBadge status={rec.status} size="sm" />
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => {
                        setSelectedRecord(rec);
                        navigate('/officer/validation-workspace');
                      }}
                      className="px-3 py-1.5 bg-gov-blue-800 hover:bg-gov-blue-900 text-white rounded-lg font-bold text-[11px] inline-flex items-center gap-1.5 shadow-2xs transition-colors"
                    >
                      <SplitSquareVertical className="w-3.5 h-3.5" />
                      Validate
                    </button>
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
