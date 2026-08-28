import React, { useState } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { useRecords } from '../../context/RecordsContext';
import { ConfidenceMeter } from '../common/ConfidenceMeter';
import { StatusBadge } from '../common/StatusBadge';
import {
  BrainCircuit,
  Sparkles,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Play,
  ArrowRight,
  SplitSquareVertical,
  Scan,
  RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AiOcrScanModule: React.FC = () => {
  const { t } = useTranslation();
  const { records, selectedRecord, setSelectedRecord } = useRecords();
  const navigate = useNavigate();

  const record = selectedRecord || records[0];
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);

  const scanPipelineSteps = [
    'Stage 1: Document De-skewing & Gaussian Binarization...',
    'Stage 2: Multi-Script Character Segmentation (Devanagari / Tamil / Modi)...',
    'Stage 3: Handwritten Digit Recognition & Numerical Boundary Parsing...',
    'Stage 4: Entity Relation Extraction & Cross-Table Mapping...',
    'Stage 5: Confidence Scoring & Uncertainty Flagging Complete!'
  ];

  const handleStartScanSimulation = () => {
    setIsScanning(true);
    setScanStep(0);

    const interval = setInterval(() => {
      setScanStep((prev) => {
        if (prev >= scanPipelineSteps.length - 1) {
          clearInterval(interval);
          setIsScanning(false);
          return prev;
        }
        return prev + 1;
      });
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            {t.aiOcrModule} (Multi-Lingual Script &amp; Handwriting Engine)
          </h2>
          <p className="text-xs text-slate-600">
            Simulate the deep neural OCR pipeline that converts historical handwritten land deeds into structured DILRMP data records.
          </p>
        </div>

        <button
          onClick={handleStartScanSimulation}
          disabled={isScanning}
          className="px-4 py-2 bg-gov-blue-800 hover:bg-gov-blue-900 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          {isScanning ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          {isScanning ? 'Running Sovereign OCR...' : 'Trigger AI OCR Scan'}
        </button>
      </div>

      {/* Main Scan Simulation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Scanned Document with animated laser beam scanner */}
        <div className="lg:col-span-6 bg-slate-900 rounded-xl p-4 flex flex-col items-center justify-center relative overflow-hidden border border-slate-800 shadow-lg min-h-[500px]">
          {/* Animated Scanning Laser Beam */}
          {isScanning && (
            <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between">
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-scan-line"></div>
            </div>
          )}

          <div className="relative max-w-sm rounded overflow-hidden shadow-2xl bg-white">
            <img
              src={record.scannedDocumentUrl}
              alt="Archival Land Deed"
              className="w-full h-auto object-contain block"
            />
          </div>

          {/* Scanner Overlay Status */}
          <div className="mt-4 w-full bg-slate-950/80 p-3 rounded-lg border border-slate-800 text-xs text-cyan-300 font-mono flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Scan className="w-4 h-4 animate-pulse text-cyan-400" />
              {isScanning ? scanPipelineSteps[scanStep] : 'Pipeline Ready for Ingest'}
            </span>
            <span className="font-bold text-white">
              {isScanning ? `${((scanStep + 1) * 20)}%` : '100%'}
            </span>
          </div>
        </div>

        {/* Right: Extracted Structured Fields & Confidence Breakdown */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 shadow-xs p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gov-blue-700" />
                Live Extracted Land Attributes
              </h3>
              <ConfidenceMeter confidence={record.overallConfidence} />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Landowner Name</span>
                <span className="font-bold text-slate-900 text-sm">{record.extractedData.landownerName}</span>
                <span className="text-[10px] text-emerald-600 font-mono block mt-0.5">Confidence: 94%</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Father / Husband</span>
                <span className="font-bold text-slate-900 text-sm">{record.extractedData.fatherHusbandName}</span>
                <span className="text-[10px] text-emerald-600 font-mono block mt-0.5">Confidence: 91%</span>
              </div>

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-300">
                <span className="text-[11px] text-amber-800 block font-bold">Survey / Sub-div (Flagged)</span>
                <span className="font-bold font-mono text-slate-900 text-sm">{record.extractedData.surveyNumber}</span>
                <span className="text-[10px] text-amber-700 font-mono font-bold block mt-0.5">Confidence: 62% (Needs Review)</span>
              </div>

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-300">
                <span className="text-[11px] text-amber-800 block font-bold">Plot Area (Ha) (Flagged)</span>
                <span className="font-bold font-mono text-slate-900 text-sm">{record.extractedData.plotAreaHectares} Ha</span>
                <span className="text-[10px] text-amber-700 font-mono font-bold block mt-0.5">Confidence: 68% (Needs Review)</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Classification</span>
                <span className="font-bold text-slate-900">{record.extractedData.landClassification}</span>
                <span className="text-[10px] text-emerald-600 font-mono block mt-0.5">Confidence: 96%</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Patta Number</span>
                <span className="font-bold font-mono text-slate-900">{record.extractedData.pattaNumber}</span>
                <span className="text-[10px] text-amber-600 font-mono block mt-0.5">Confidence: 72%</span>
              </div>
            </div>
          </div>

          {/* Action Link to Flagship Validation Workspace */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              {record.unresolvedUncertaintiesCount} low-confidence fields require officer inspection
            </span>
            <button
              type="button"
              onClick={() => navigate('/officer/validation-workspace')}
              className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shadow-md flex items-center gap-2 transition-all"
            >
              <SplitSquareVertical className="w-4 h-4" />
              Open Split-Screen Workspace
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
