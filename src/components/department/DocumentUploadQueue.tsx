import React, { useState } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { useRecords } from '../../context/RecordsContext';
import {
  UploadCloud,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  FileCheck2,
  Trash2,
  Sliders,
  Languages,
  Key,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  OcrEngine,
  OcrLanguage,
  getStoredApiKey,
  STORAGE_KEYS
} from '../../services/ocrService';

export const DocumentUploadQueue: React.FC = () => {
  const { t } = useTranslation();
  const {
    uploadQueue,
    addFilesToUploadQueue,
    runAiOcrScan,
    isOcrProcessing,
    setSelectedRecord,
    records
  } = useRecords();
  const navigate = useNavigate();

  const [dragActive, setDragActive] = useState(false);
  const [engine, setEngine] = useState<OcrEngine>(() => {
    return (localStorage.getItem(STORAGE_KEYS.PREFERRED_ENGINE) as OcrEngine) || 'tesseract';
  });
  const [language, setLanguage] = useState<OcrLanguage>(() => {
    return (localStorage.getItem(STORAGE_KEYS.PREFERRED_LANG) as OcrLanguage) || 'tam+eng';
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFilesToUploadQueue(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFilesToUploadQueue(Array.from(e.target.files));
    }
  };

  const handleProcessScan = async (id: string) => {
    const visionKey = getStoredApiKey('google_vision');
    const geminiKey = getStoredApiKey('gemini');

    const scannedRec = await runAiOcrScan(id, {
      engine,
      language,
      googleVisionApiKey: visionKey || undefined,
      geminiApiKey: geminiKey || undefined,
    });
    setSelectedRecord(scannedRec);
    navigate('/officer/validation-workspace');
  };

  // Quick load sample regional deeds
  const handleLoadSample = async (type: 'tamil' | 'hindi' | 'maharashtra') => {
    let filePath = '/scanned_docs/sample_patta_tamil_nadu.svg';
    let fileName = 'TN_Melur_Navinipatti_Patta_Deed_194_3B.svg';

    if (type === 'hindi') {
      filePath = '/scanned_docs/sample_khasra_uttar_pradesh.svg';
      fileName = 'UP_Varanasi_Pindra_Khasra_Deed_402.svg';
      setLanguage('hin+eng');
    } else if (type === 'maharashtra') {
      filePath = '/scanned_docs/sample_712_maharashtra.svg';
      fileName = 'MH_Pune_Haveli_7_12_Extract_118.svg';
    } else {
      setLanguage('tam+eng');
    }

    try {
      const res = await fetch(filePath);
      const blob = await res.blob();
      const file = new File([blob], fileName, { type: blob.type || 'image/svg+xml' });
      addFilesToUploadQueue([file]);
    } catch (err) {
      console.warn('Could not fetch sample deed, using fallback file:', err);
      const fallback = new File(['Sample Deed'], fileName, { type: 'text/plain' });
      addFilesToUploadQueue([fallback]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            {t.uploadDocument} (Physical Deed Batch Ingest)
          </h2>
          <p className="text-xs text-slate-600">
            Ingest scanned physical land revenue deeds, settlement registers, and archival patta extracts (PDF, TIFF, PNG, JPEG up to 600 DPI).
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => handleLoadSample('tamil')}
            className="px-3 py-1.5 bg-gov-blue-50 text-gov-blue-900 hover:bg-gov-blue-100 border border-gov-blue-200 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-gov-blue-700" />
            + Tamil Patta Deed
          </button>

          <button
            type="button"
            onClick={() => handleLoadSample('hindi')}
            className="px-3 py-1.5 bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            + Hindi Khasra (UP)
          </button>

          <button
            type="button"
            onClick={() => handleLoadSample('maharashtra')}
            className="px-3 py-1.5 bg-purple-50 text-purple-900 hover:bg-purple-100 border border-purple-200 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-700" />
            + MH 7/12 Extract
          </button>
        </div>
      </div>

      {/* Preset Engine & Script Configurations for Batch Processing */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-gov-blue-700" />
            Batch OCR Engine:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'tesseract', label: 'Tesseract.js', note: 'Free on-device' },
              { id: 'google_vision', label: 'Google Vision', note: 'Dense cursive' },
              { id: 'gemini_vision', label: 'Gemini Vision', note: 'Multimodal AI' }
            ].map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => {
                  setEngine(e.id as OcrEngine);
                  localStorage.setItem(STORAGE_KEYS.PREFERRED_ENGINE, e.id);
                }}
                className={`p-2 rounded-lg text-left text-xs transition-all border ${
                  engine === e.id
                    ? 'bg-gov-blue-50 border-gov-blue-600 text-gov-blue-900 font-bold shadow-2xs ring-1 ring-gov-blue-500'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold text-[11px] truncate">{e.label}</div>
                <div className="text-[9px] text-slate-500 truncate">{e.note}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Languages className="w-3.5 h-3.5 text-gov-blue-700" />
            Batch Script / Language Model:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'tam+eng', label: 'Tamil + English', script: 'தமிழ்' },
              { id: 'hin+eng', label: 'Hindi + English', script: 'हिन्दी' },
              { id: 'tam+hin+eng', label: 'Multi-Script All', script: 'All 3' }
            ].map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => {
                  setLanguage(l.id as OcrLanguage);
                  localStorage.setItem(STORAGE_KEYS.PREFERRED_LANG, l.id);
                }}
                className={`p-2 rounded-lg text-left text-xs transition-all border ${
                  language === l.id
                    ? 'bg-gov-blue-50 border-gov-blue-600 text-gov-blue-900 font-bold shadow-2xs ring-1 ring-gov-blue-500'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold text-[11px] truncate">{l.label}</div>
                <div className="text-[9px] text-slate-500 truncate">{l.script}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Drag & Drop Upload Canvas */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all bg-white relative ${
          dragActive
            ? 'border-gov-blue-600 bg-blue-50/50 scale-[1.005]'
            : 'border-slate-300 hover:border-slate-400'
        }`}
      >
        <input
          type="file"
          multiple
          accept=".pdf,.tiff,.tif,.png,.jpg,.jpeg,.webp"
          onChange={handleFileInput}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
        />

        <div className="max-w-md mx-auto space-y-3 pointer-events-none">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-gov-blue-800 flex items-center justify-center mx-auto shadow-inner">
            <UploadCloud className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-base text-slate-800">
            Drag and drop scanned deeds here, or click to browse
          </h3>
          <p className="text-xs text-slate-500">
            Supports multi-page documents, batch TIFF folders, and color scanned historical deeds.
          </p>
          <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 font-mono pt-2">
            <span>• Max 50 MB / File</span>
            <span>• Auto Optical De-skewing</span>
            <span>• 600 DPI Target</span>
          </div>
        </div>
      </div>

      {/* Document Ingestion & Queue Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gov-blue-700" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700">
              Ingest &amp; AI Processing Queue ({uploadQueue.length})
            </h3>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            Optical OCR Engine: {engine.toUpperCase()} • {language}
          </span>
        </div>

        {uploadQueue.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            No documents currently in queue. Drag deeds above or click "+ Tamil Patta Deed" / "+ Hindi Khasra".
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {uploadQueue.map((item) => (
              <div
                key={item.id}
                className="p-4 flex flex-wrap items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-[260px]">
                  {item.previewUrl ? (
                    <img
                      src={item.previewUrl}
                      alt="Thumbnail"
                      className="w-10 h-10 rounded-lg object-cover border border-slate-200 bg-white"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 truncate max-w-xs">
                      {item.file.name}
                    </h4>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {(item.file.size / 1024).toFixed(1)} KB • Queued at {item.uploadedAt}
                    </span>
                  </div>
                </div>

                {/* Progress bar and Live stage description */}
                <div className="flex-1 min-w-[200px] max-w-xs">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-semibold text-slate-700 truncate mr-2" title={item.stage}>
                      {item.status === 'scanning'
                        ? item.stage || 'Running Multi-stage AI OCR...'
                        : item.status === 'processed'
                        ? 'Scanned & Entity BBoxes Ready'
                        : 'Ready to Process'}
                    </span>
                    <span className="font-mono font-bold text-slate-900 shrink-0">{item.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        item.status === 'processed'
                          ? 'bg-emerald-500'
                          : item.status === 'scanning'
                          ? 'bg-cyan-500'
                          : 'bg-gov-blue-600'
                      }`}
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action buttons */}
                <div>
                  {item.status === 'processed' ? (
                    <button
                      onClick={() => {
                        const targetRec = records.find((r) => r.id === item.scannedRecordId) || records[0];
                        setSelectedRecord(targetRec);
                        navigate('/officer/validation-workspace');
                      }}
                      className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Open in Validation Workspace
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleProcessScan(item.id)}
                      disabled={isOcrProcessing}
                      className="px-3.5 py-1.5 bg-gov-blue-800 hover:bg-gov-blue-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors disabled:opacity-50"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {item.status === 'scanning' ? 'Processing OCR...' : 'Run AI OCR Scan'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
