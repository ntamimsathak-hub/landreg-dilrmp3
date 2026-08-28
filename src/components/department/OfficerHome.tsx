import React from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { useRecords } from '../../context/RecordsContext';
import { mockAnalyticsData } from '../../data/mockAnalytics';
import { StatusBadge } from '../common/StatusBadge';
import {
  BrainCircuit,
  FileCheck2,
  AlertTriangle,
  TrendingUp,
  SplitSquareVertical,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  Layers,
  UploadCloud
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const OfficerHome: React.FC = () => {
  const { t } = useTranslation();
  const { records, setSelectedRecord } = useRecords();

  const flaggedRecords = records.filter(
    (r) => r.status === 'Needs Human Review' || r.unresolvedUncertaintiesCount > 0
  );

  return (
    <div className="space-y-6">
      {/* Officer Operational Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0b3b6e] to-[#047857] text-white p-6 sm:p-8 rounded-2xl shadow-md flex flex-wrap items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3 border border-emerald-400/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>DILRMP 3.0 • Sovereign AI Land Record Ingest Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            Revenue Department Officer Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Jurisdiction: <strong>Melur Taluk, Madurai District (Tamil Nadu)</strong>.
            AI OCR processing active with pixel-level uncertainty highlighting for low-confidence handwritten deeds.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/officer/upload"
            className="px-4 py-2.5 bg-white text-gov-blue-900 hover:bg-slate-100 rounded-xl text-xs font-bold shadow-xs flex items-center gap-2 transition-all"
          >
            <UploadCloud className="w-4 h-4 text-gov-blue-700" />
            Upload Deeds
          </Link>
          <Link
            to="/officer/validation-workspace"
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold shadow-xs flex items-center gap-2 transition-all"
          >
            <SplitSquareVertical className="w-4 h-4" />
            Launch Validation Workspace ({flaggedRecords.length})
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Processed */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-1">
              Documents Processed
            </span>
            <span className="text-2xl font-black text-slate-900 font-mono">
              {mockAnalyticsData.totalRecordsProcessed.toLocaleString()}
            </span>
            <span className="text-[11px] text-emerald-600 font-medium block mt-1">
              ↑ 1,240 Ingested Today
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-gov-blue-700 flex items-center justify-center">
            <FileCheck2 className="w-6 h-6" />
          </div>
        </div>

        {/* Extraction Accuracy */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-1">
              Post-Validation Accuracy
            </span>
            <span className="text-2xl font-black text-emerald-700 font-mono">
              {mockAnalyticsData.averageAccuracyRate}%
            </span>
            <span className="text-[11px] text-emerald-600 font-medium block mt-1">
              • Multilingual OCR v3.4
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        {/* Pending Cases */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-1">
              Pending Human Review
            </span>
            <span className="text-2xl font-black text-amber-800 font-mono">
              {flaggedRecords.length}
            </span>
            <span className="text-[11px] text-amber-600 font-medium block mt-1">
              • Low Confidence Flags
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        {/* State Completion */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-1">
              District Cadastral Progress
            </span>
            <span className="text-2xl font-black text-slate-900 font-mono">
              {mockAnalyticsData.digitizationCompletionPercent}%
            </span>
            <span className="text-[11px] text-slate-500 font-medium block mt-1">
              • 15,980 Villages Synced
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Middle Row: AI Learning Loop Trend + Error Category Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continuous Learning Loop Indicator */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                AI Model Continuous Learning Loop &amp; Accuracy Trend
              </h3>
              <p className="text-xs text-slate-500">
                Shows raw OCR accuracy vs human-corrected accuracy over time as officer edits train the model.
              </p>
            </div>
            <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded">
              +11.2% Gain
            </span>
          </div>

          {/* Monthly Trend Bars */}
          <div className="space-y-3 pt-2">
            {mockAnalyticsData.accuracyTrendMonthly.map((m) => (
              <div key={m.month} className="space-y-1 text-xs">
                <div className="flex items-center justify-between text-slate-700 font-medium">
                  <span className="font-bold">{m.month}</span>
                  <span className="font-mono text-[11px]">
                    Raw OCR: <strong className="text-slate-600">{m.rawOcrAccuracy}%</strong> | Post-Review: <strong className="text-emerald-700 font-bold">{m.postValidationAccuracy}%</strong> ({m.officerCorrections} Human Corrections Logged)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 flex overflow-hidden">
                  <div
                    className="bg-gov-blue-500 h-full rounded-l-full transition-all"
                    style={{ width: `${m.rawOcrAccuracy}%` }}
                    title={`Raw OCR: ${m.rawOcrAccuracy}%`}
                  ></div>
                  <div
                    className="bg-emerald-500 h-full rounded-r-full transition-all"
                    style={{ width: `${m.postValidationAccuracy - m.rawOcrAccuracy}%` }}
                    title={`Human in Loop Boost: +${(m.postValidationAccuracy - m.rawOcrAccuracy).toFixed(1)}%`}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-4 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-gov-blue-500 rounded"></span> Raw OCR Recognition
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-emerald-500 rounded"></span> Post-Human Review Verified Accuracy
            </span>
          </div>
        </div>

        {/* Error Category Breakdown */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              OCR Error Distribution
            </h3>
            <p className="text-xs text-slate-500">
              Breakdown of ambiguities flagged for human inspection.
            </p>
          </div>

          <div className="space-y-3 pt-1">
            {mockAnalyticsData.errorCategoryBreakdown.map((err) => (
              <div key={err.category} className="text-xs space-y-1">
                <div className="flex items-center justify-between text-slate-700">
                  <span className="font-medium truncate max-w-[200px]" title={err.category}>
                    {err.category}
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    {err.percentage}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full"
                    style={{ width: `${err.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Flagged Deeds Pending Human-In-The-Loop Review Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-5 bg-amber-50/60 border-b border-amber-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-700" />
            <div>
              <h3 className="font-bold text-sm text-amber-950">
                Needs Human-in-the-Loop Review Queue (DILRMP Differentiator)
              </h3>
              <p className="text-xs text-amber-800">
                Documents below threshold confidence with flagged bounding boxes on original deeds.
              </p>
            </div>
          </div>
          <Link
            to="/officer/validation-workspace"
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            Launch Split-Screen Workspace <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <th className="p-3.5">Deed Number</th>
                <th className="p-3.5">Survey Number</th>
                <th className="p-3.5">Landowner</th>
                <th className="p-3.5">Village / Taluk</th>
                <th className="p-3.5">Flagged Fields</th>
                <th className="p-3.5">AI Confidence</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.map((rec) => (
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
                    {rec.extractedData.village}, {rec.extractedData.tehsilTaluk}
                  </td>
                  <td className="p-3.5">
                    {rec.unresolvedUncertaintiesCount > 0 ? (
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                        {rec.unresolvedUncertaintiesCount} Ambiguous Boxes
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                        All Clear
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 font-mono">
                    <span className={`font-bold ${rec.overallConfidence < 80 ? 'text-amber-700' : 'text-emerald-700'}`}>
                      {rec.overallConfidence.toFixed(1)}%
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <Link
                      to="/officer/validation-workspace"
                      onClick={() => setSelectedRecord(rec)}
                      className="px-3 py-1.5 bg-gov-blue-800 hover:bg-gov-blue-900 text-white rounded-lg font-bold text-[11px] inline-flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <SplitSquareVertical className="w-3.5 h-3.5" />
                      Inspect &amp; Validate
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
