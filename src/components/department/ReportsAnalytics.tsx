import React from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { mockAnalyticsData } from '../../data/mockAnalytics';
import {
  BarChart3,
  TrendingUp,
  Download,
  Award,
  CheckCircle2,
  AlertTriangle,
  Building,
  Users,
  ShieldCheck
} from 'lucide-react';

export const ReportsAnalytics: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            {t.reportsAnalytics} (State &amp; National Digitization Intelligence)
          </h2>
          <p className="text-xs text-slate-600">
            Real-time telemetry across DILRMP 3.0 digitization pipelines, OCR error convergence, and officer resolution SLAs.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-gov-blue-800 hover:bg-gov-blue-900 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-2 transition-colors"
        >
          <Download className="w-4 h-4" />
          Generate Executive PDF Summary
        </button>
      </div>

      {/* State-Wise Digitization Progress Matrix */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <Building className="w-4 h-4 text-gov-blue-700" />
          State-Wise Cadastral &amp; Revenue Record Digitization Progress
        </h3>

        <div className="space-y-4 pt-1">
          {mockAnalyticsData.stateProgress.map((state) => (
            <div key={state.state} className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between font-medium text-slate-800">
                <span className="font-bold text-sm">{state.state}</span>
                <span className="font-mono text-xs">
                  <strong>{state.digitizedVillages.toLocaleString()}</strong> / {state.totalVillages.toLocaleString()} Villages ({state.percentage}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${state.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Officer Productivity & Throughput */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-gov-blue-700" />
            Jurisdiction Officer Productivity Metrics
          </h3>

          <div className="space-y-3 pt-1 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900">V. Meenakshi Sundaram (Tahsildar)</h4>
                <span className="text-slate-500 text-[11px]">Melur Taluk, Madurai</span>
              </div>
              <div className="text-right font-mono">
                <span className="font-bold text-emerald-700 text-sm">482 Validated</span>
                <span className="text-[10px] text-slate-400 block">Avg Time: 1.4 min/deed</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900">S. Shanmugam (VAO)</h4>
                <span className="text-slate-500 text-[11px]">Navinipatti Village</span>
              </div>
              <div className="text-right font-mono">
                <span className="font-bold text-emerald-700 text-sm">319 Inspected</span>
                <span className="text-[10px] text-slate-400 block">Avg Time: 2.1 min/deed</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900">Rajeshwar Nath Pandey (Tehsildar)</h4>
                <span className="text-slate-500 text-[11px]">Bakshi Ka Talab, Lucknow</span>
              </div>
              <div className="text-right font-mono">
                <span className="font-bold text-emerald-700 text-sm">620 Validated</span>
                <span className="text-[10px] text-slate-400 block">Avg Time: 1.1 min/deed</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Uncertainty Reduction Efficiency */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            Human-in-the-Loop Efficiency Impact
          </h3>

          <div className="space-y-4 pt-1 text-xs">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
              <span className="text-[11px] font-bold text-emerald-950 uppercase">Time Saved Per Land Registry</span>
              <p className="text-2xl font-black text-emerald-800 font-mono">
                84.5% Faster
              </p>
              <p className="text-xs text-emerald-700">
                Reduced average manual deed entry time from 18 minutes down to 2.2 minutes with AI pixel attention.
              </p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-1">
              <span className="text-[11px] font-bold text-blue-950 uppercase">Zero Lost Deed Guarantee</span>
              <p className="text-2xl font-black text-gov-blue-900 font-mono">
                100% Archival Integrity
              </p>
              <p className="text-xs text-blue-700">
                All historical deeds permanently preserved with dual 600 DPI lossless master copies and cryptographic hashes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
