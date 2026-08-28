import React, { useState } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { useRecords } from '../../context/RecordsContext';
import { StatusBadge } from '../common/StatusBadge';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  FileUp,
  BrainCircuit,
  ShieldCheck,
  UserCheck,
  Award,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ValidationStatusTracker: React.FC = () => {
  const { t } = useTranslation();
  const { records } = useRecords();

  const [selectedRecordId, setSelectedRecordId] = useState<string>(records[0]?.id || '');
  const activeRecord = records.find((r) => r.id === selectedRecordId) || records[0];

  const steps = [
    {
      step: 1,
      title: 'Physical Deed Digitization & Upload',
      desc: 'High-resolution 600 DPI scan ingested from Taluk Sub-Registrar repository.',
      date: '2026-08-20 09:30 AM',
      status: 'completed',
      officer: 'Ingest Queue Agent #4'
    },
    {
      step: 2,
      title: 'AI Multi-Lingual OCR & Script Recognition',
      desc: 'De-skewing, character segmentation, Devanagari & Tamil script parsing with NLP entity extraction.',
      date: '2026-08-20 10:14 AM',
      status: 'completed',
      officer: 'Sovereign AI OCR v3.4 (Overall Confidence: 76.4%)'
    },
    {
      step: 3,
      title: 'AI Algorithmic Rule & Boundary Validation',
      desc: 'Cross-checked survey subdivision mathematical balance, cadastral geometry, and duplicate deed detection.',
      date: '2026-08-20 10:15 AM',
      status: 'completed',
      officer: 'DILRMP Rules Engine'
    },
    {
      step: 4,
      title: 'Department Officer Visual Review',
      desc: activeRecord.status === 'Verified'
        ? 'Officer inspected flagged bounding boxes, verified handwriting nuances, and granted validation seal.'
        : 'Assigned to Tahsildar / Revenue Inspector for manual verification of flagged fields (Survey No 142/7A).',
      date: activeRecord.status === 'Verified' ? '2026-08-20 11:00 AM' : 'In Progress (Estimated SLA: ~4 Hours)',
      status: activeRecord.status === 'Verified' ? 'completed' : 'current',
      officer: 'V. Meenakshi Sundaram (Tahsildar Melur)'
    },
    {
      step: 5,
      title: 'Digitized Central Land Ledger Committal',
      desc: activeRecord.status === 'Verified'
        ? 'Record committed to national blockchain-backed DILRMP ledger. Digital Patta generated.'
        : 'Awaiting completion of Officer review stage.',
      date: activeRecord.status === 'Verified' ? '2026-08-20 11:05 AM' : 'Pending',
      status: activeRecord.status === 'Verified' ? 'completed' : 'upcoming',
      officer: 'NIC Central Ledger'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            {t.statusTracker} (End-to-End Lifecycle)
          </h2>
          <p className="text-xs text-slate-600">
            Track the real-time 5-stage progress of legacy land document digitization, AI OCR recognition, uncertainty reviews, and officer approval.
          </p>
        </div>

        {/* Parcel selector */}
        <div className="pt-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Select Land Record / Request ID
          </label>
          <select
            value={selectedRecordId}
            onChange={(e) => setSelectedRecordId(e.target.value)}
            className="w-full sm:w-96 px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-gov-blue-500 font-medium"
          >
            {records.map((r) => (
              <option key={r.id} value={r.id}>
                {r.documentNumber} • Survey {r.extractedData.surveyNumber} ({r.extractedData.landownerName})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Record Summary Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-[#0b3b6e] text-white p-5 rounded-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[11px] text-blue-200 font-mono">
            {activeRecord.documentNumber}
          </span>
          <h3 className="font-bold text-base text-white">
            Survey No: {activeRecord.extractedData.surveyNumber} • {activeRecord.extractedData.village}, {activeRecord.extractedData.district}
          </h3>
          <span className="text-xs text-slate-300">
            Landowner: <strong>{activeRecord.extractedData.landownerName}</strong> ({activeRecord.extractedData.plotAreaHectares} Ha)
          </span>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={activeRecord.status} size="lg" />
          {activeRecord.status === 'Verified' && (
            <Link
              to="/citizen/patta-chitta"
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5"
            >
              <Award className="w-4 h-4" />
              Get Patta
            </Link>
          )}
        </div>
      </div>

      {/* 5-Step Lifecycle Stepper UI */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs">
        <h3 className="font-bold text-sm text-slate-800 mb-6 flex items-center gap-2">
          <Clock className="w-4 h-4 text-gov-blue-700" />
          Verification Lifecycle Stepper
        </h3>

        <div className="relative pl-6 sm:pl-8 space-y-8 border-l-2 border-slate-200 ml-4">
          {steps.map((s, index) => {
            const isDone = s.status === 'completed';
            const isCurrent = s.status === 'current';

            return (
              <div key={s.step} className="relative group">
                {/* Step Circle Node */}
                <div
                  className={`absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs border-2 transition-all ${
                    isDone
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-amber-500 border-amber-600 text-white animate-pulse'
                      : 'bg-slate-100 border-slate-300 text-slate-400'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : s.step}
                </div>

                {/* Step Content */}
                <div
                  className={`p-4 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-amber-50/70 border-amber-300 shadow-xs'
                      : isDone
                      ? 'bg-slate-50/70 border-slate-200'
                      : 'bg-slate-50/30 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <span>{s.title}</span>
                      {isCurrent && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900 animate-pulse">
                          Active Stage
                        </span>
                      )}
                    </h4>
                    <span className="text-xs font-mono font-medium text-slate-500">
                      {s.date}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-2">
                    {s.desc}
                  </p>

                  <div className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                    <span className="font-semibold text-slate-700">Handler:</span>
                    <span>{s.officer}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
