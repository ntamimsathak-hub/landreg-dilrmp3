import React, { useState } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { useRecords } from '../../context/RecordsContext';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  FileCheck2,
  Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DocumentUploadQueue: React.FC = () => {
  const { t } = useTranslation();
  const { uploadQueue, addFilesToUploadQueue, runAiOcrScan, isOcrProcessing } = useRecords();
  const navigate = useNavigate();

  const [dragActive, setDragActive] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState('Patta Deed');
  const [talukName, setTalukName] = useState('Melur Taluk (Madurai)');

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
    await runAiOcrScan(id);
    navigate('/officer/validation-workspace');
  };

  // Sample quick load sample files for quick evaluation
  const handleLoadSampleDeed = () => {
    const fakeFile = new File(['Sample Deed Content'], 'TN_Melur_Navinipatti_Patta_Deed_194_3B.pdf', {
      type: 'application/pdf',
    });
    addFilesToUploadQueue([fakeFile]);
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
        <button
          type="button"
          onClick={handleLoadSampleDeed}
          className="px-3.5 py-2 bg-gov-blue-50 text-gov-blue-900 hover:bg-gov-blue-100 border border-gov-blue-200 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
        >
          <Sparkles className="w-4 h-4 text-gov-blue-700" />
          Load Demo Historical Deed
        </button>
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
          accept=".pdf,.tiff,.tif,.png,.jpg,.jpeg"
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
            Optical OCR Engine v3.4 Ready
          </span>
        </div>

        {uploadQueue.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            No documents currently in queue. Drag deeds above or click "Load Demo Historical Deed".
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {uploadQueue.map((item) => (
              <div
                key={item.id}
                className="p-4 flex flex-wrap items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-[260px]">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 truncate max-w-xs">
                      {item.file.name}
                    </h4>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {(item.file.size / 1024).toFixed(1)} KB • Queued at {item.uploadedAt}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="flex-1 min-w-[180px] max-w-xs">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-semibold text-slate-700 capitalize">
                      {item.status === 'scanning' ? 'Running Multi-stage AI OCR...' : item.status}
                    </span>
                    <span className="font-mono font-bold text-slate-900">{item.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        item.status === 'processed' ? 'bg-emerald-500' : 'bg-gov-blue-600'
                      }`}
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action */}
                <div>
                  {item.status === 'processed' ? (
                    <button
                      onClick={() => navigate('/officer/validation-workspace')}
                      className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Open in Validation Workspace
                    </button>
                  ) : (
                    <button
                      onClick={() => handleProcessScan(item.id)}
                      disabled={isOcrProcessing}
                      className="px-3.5 py-1.5 bg-gov-blue-800 hover:bg-gov-blue-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors disabled:opacity-50"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {item.status === 'scanning' ? 'Processing...' : 'Run AI OCR Scan'}
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
