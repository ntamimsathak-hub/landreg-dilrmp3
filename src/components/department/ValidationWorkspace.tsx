import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { useRecords } from '../../context/RecordsContext';
import { useAuth } from '../../context/AuthContext';
import { BoundingBox, ExtractedLandData } from '../../types/landRecord';
import { StatusBadge } from '../common/StatusBadge';
import { ConfidenceMeter } from '../common/ConfidenceMeter';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Edit3,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileCheck2,
  History,
  Layers,
  Check,
  RefreshCw,
  Info,
  SlidersHorizontal,
  Contrast,
  Send,
  X
} from 'lucide-react';

export const ValidationWorkspace: React.FC = () => {
  const { t } = useTranslation();
  const {
    records,
    selectedRecord,
    setSelectedRecord,
    activeBoundingBoxId,
    setActiveBoundingBoxId,
    updateFieldCorrection,
    acceptBoundingBox,
    rejectBoundingBox,
    approveRecord,
    rejectRecordForRescan
  } = useRecords();
  const { officer } = useAuth();

  const record = selectedRecord || records[0];

  // Zoom & Pan state for document viewer
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isHighContrastDoc, setIsHighContrastDoc] = useState<boolean>(false);
  const [editingBoxId, setEditingBoxId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [editNotes, setEditNotes] = useState<string>('');

  // Tooltip hover state
  const [hoveredBoxId, setHoveredBoxId] = useState<string | null>(null);
  const [showAuditModal, setShowAuditModal] = useState<boolean>(false);
  const [showRescanModal, setShowRescanModal] = useState<boolean>(false);
  const [rescanReason, setRescanReason] = useState<string>('Unreadable archival damage on boundary text');
  const [isApprovedSuccess, setIsApprovedSuccess] = useState<boolean>(false);

  const activeBox = record.boundingBoxes.find((b) => b.id === activeBoundingBoxId);

  // Uncertain boxes for sequential navigation
  const uncertainBoxes = record.boundingBoxes.filter(
    (b) => b.isUncertain && b.status === 'ai_uncertain'
  );

  const handleNextFlagged = () => {
    if (uncertainBoxes.length === 0) return;
    const currentIndex = uncertainBoxes.findIndex((b) => b.id === activeBoundingBoxId);
    const nextIndex = (currentIndex + 1) % uncertainBoxes.length;
    setActiveBoundingBoxId(uncertainBoxes[nextIndex].id);
  };

  const handlePrevFlagged = () => {
    if (uncertainBoxes.length === 0) return;
    const currentIndex = uncertainBoxes.findIndex((b) => b.id === activeBoundingBoxId);
    const prevIndex = (currentIndex - 1 + uncertainBoxes.length) % uncertainBoxes.length;
    setActiveBoundingBoxId(uncertainBoxes[prevIndex].id);
  };

  const handleStartEdit = (box: BoundingBox) => {
    setEditingBoxId(box.id);
    const currentVal = (record.extractedData as any)[box.fieldKey] || box.primaryReading;
    setEditValue(String(currentVal));
    setEditNotes(box.notes || '');
  };

  const handleSaveEdit = (boxId: string) => {
    if (!editValue.trim()) return;
    updateFieldCorrection(record.id, boxId, editValue, editNotes);
    setEditingBoxId(null);
  };

  const handleApprove = () => {
    approveRecord(
      record.id,
      officer?.employeeId || 'TN-REV-8402',
      officer?.name || 'V. Meenakshi Sundaram (Tahsildar)'
    );
    setIsApprovedSuccess(true);
    setTimeout(() => setIsApprovedSuccess(false), 4000);
  };

  const handleRescan = () => {
    rejectRecordForRescan(record.id, officer?.employeeId || 'TN-REV-8402', rescanReason);
    setShowRescanModal(false);
  };

  return (
    <div className="space-y-4">
      {/* Top Workspace Header & Record Selector */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gov-blue-900 text-white flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                {t.workspaceTitle}
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gov-blue-100 text-gov-blue-900 uppercase">
                DILRMP 3.0 Core
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Interactive pixel uncertainty overlay with synchronized field cross-linking
            </p>
          </div>
        </div>

        {/* Record Dropdown Switcher */}
        <div className="flex items-center gap-3">
          <select
            value={record.id}
            onChange={(e) => {
              const r = records.find((x) => x.id === e.target.value);
              if (r) setSelectedRecord(r);
            }}
            className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold bg-slate-50 focus:ring-2 focus:ring-gov-blue-500"
          >
            {records.map((r) => (
              <option key={r.id} value={r.id}>
                {r.documentNumber} ({r.extractedData.village} • Survey {r.extractedData.surveyNumber})
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowAuditModal(true)}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <History className="w-3.5 h-3.5" />
            Audit Trail ({record.auditLogs.length})
          </button>
        </div>
      </div>

      {/* Flagged Fields Navigation Bar */}
      <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-700 animate-pulse" />
          <span className="font-bold text-amber-950">
            {uncertainBoxes.length > 0
              ? `${uncertainBoxes.length} ${t.uncertainFieldsBadge}`
              : 'All uncertain fields have been verified by officer!'}
          </span>
          <span className="text-amber-800">
            (Highlighted in amber boxes on the scanned deed)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevFlagged}
            disabled={uncertainBoxes.length === 0}
            className="px-3 py-1 bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 rounded font-semibold text-xs flex items-center gap-1 disabled:opacity-40 transition-colors shadow-2xs"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            {t.prevField}
          </button>
          <button
            onClick={handleNextFlagged}
            disabled={uncertainBoxes.length === 0}
            className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded font-bold text-xs flex items-center gap-1 disabled:opacity-40 transition-colors shadow-xs"
          >
            {t.nextField}
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {isApprovedSuccess && (
        <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-xl text-emerald-950 flex items-center gap-3 animate-in fade-in slide-in-from-top">
          <CheckCircle2 className="w-6 h-6 text-emerald-700 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-sm">Record Successfully Approved &amp; Digitized!</h4>
            <p className="text-xs text-emerald-800">
              Deed #{record.documentNumber} has been cryptographically signed and committed to the DILRMP 3.0 sovereign state ledger.
            </p>
          </div>
        </div>
      )}

      {/* MAIN SPLIT-SCREEN WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[680px]">
        {/* LEFT COLUMN: SCANNED ORIGINAL DOCUMENT WITH BOUNDING BOX OVERLAYS (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-300 shadow-xs flex flex-col overflow-hidden">
          {/* Document Viewer Toolbar */}
          <div className="p-3 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-400" />
                Original Scanned Document
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                [600 DPI • Archival Scan]
              </span>
            </div>

            {/* Viewer Zoom & Contrast Tools */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setZoomLevel((z) => Math.max(70, z - 15))}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors"
                title={t.zoomOut}
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[11px] px-1 text-slate-300 min-w-[42px] text-center">
                {zoomLevel}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(220, z + 15))}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors"
                title={t.zoomIn}
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomLevel(100)}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors text-[11px]"
                title={t.resetZoom}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <span className="text-slate-600">|</span>

              {/* High Contrast Scan Invert */}
              <button
                onClick={() => setIsHighContrastDoc((prev) => !prev)}
                className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                  isHighContrastDoc
                    ? 'bg-amber-400 text-black font-bold'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
                title="Binarize & Invert Faded Handwritten Ink"
              >
                <Contrast className="w-3.5 h-3.5" />
                <span>{t.invertDoc}</span>
              </button>
            </div>
          </div>

          {/* Scanned Image Canvas with Interactive Bounding Boxes */}
          <div className="flex-1 bg-slate-200 overflow-auto relative p-4 flex items-center justify-center min-h-[560px]">
            <div
              className={`relative shadow-2xl transition-all select-none rounded bg-white ${
                isHighContrastDoc ? 'filter invert contrast-200 brightness-90' : ''
              }`}
              style={{
                width: `${zoomLevel * 7.5}px`,
                maxWidth: 'none',
              }}
            >
              {/* Document Image Asset */}
              <img
                src={record.scannedDocumentUrl}
                alt="Scanned Land Deed"
                className="w-full h-auto block rounded"
              />

              {/* Bounding Box Overlays */}
              {record.boundingBoxes.map((box) => {
                const isActive = activeBoundingBoxId === box.id;
                const isHovered = hoveredBoxId === box.id;
                const isUncertain = box.isUncertain && box.status === 'ai_uncertain';
                const isVerified = box.status === 'manually_verified';

                return (
                  <div
                    key={box.id}
                    onClick={() => setActiveBoundingBoxId(box.id)}
                    onMouseEnter={() => setHoveredBoxId(box.id)}
                    onMouseLeave={() => setHoveredBoxId(null)}
                    style={{
                      left: `${box.x}%`,
                      top: `${box.y}%`,
                      width: `${box.width}%`,
                      height: `${box.height}%`,
                    }}
                    className={`absolute rounded cursor-pointer transition-all z-20 ${
                      isActive
                        ? 'ring-4 ring-gov-blue-600 bg-gov-blue-500/25 border-2 border-gov-blue-700 shadow-lg'
                        : isUncertain
                        ? 'border-2 border-amber-500 bg-amber-400/25 ring-2 ring-amber-400/50 animate-pulse-subtle'
                        : isVerified
                        ? 'border-2 border-teal-500 bg-teal-400/20'
                        : 'border-2 border-dashed border-blue-400/80 bg-blue-300/10 hover:bg-blue-400/25'
                    }`}
                  >
                    {/* Bounding Box Header Label Badge */}
                    <div
                      className={`absolute -top-5 left-0 px-1.5 py-0.2 text-[9px] font-bold rounded-t whitespace-nowrap shadow-xs flex items-center gap-1 ${
                        isActive
                          ? 'bg-gov-blue-900 text-white'
                          : isUncertain
                          ? 'bg-amber-600 text-white'
                          : isVerified
                          ? 'bg-teal-700 text-white'
                          : 'bg-slate-700 text-white'
                      }`}
                    >
                      <span>{box.label}</span>
                      <span className="font-mono">({box.confidence}%)</span>
                    </div>

                    {/* Tooltip on Hover or Active (showing AI prediction & alternatives) */}
                    {(isActive || isHovered) && (
                      <div
                        className="absolute bottom-full left-0 mb-2 z-50 bg-slate-950/95 text-white p-3 rounded-lg shadow-2xl border border-slate-700 text-xs w-64 pointer-events-auto backdrop-blur-md animate-in fade-in zoom-in-95"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-between border-b border-slate-700 pb-1.5 mb-2">
                          <span className="font-bold text-amber-300 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-400" />
                            AI Handwriting Analysis
                          </span>
                          <span className="font-mono text-[10px] text-slate-300">
                            {box.confidence}% Conf.
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          <div>
                            <span className="text-[10px] text-slate-400 block">AI Best Reading:</span>
                            <span className="font-bold font-mono text-sm text-emerald-400">
                              {box.primaryReading}
                            </span>
                          </div>

                          {box.alternativeReadings.length > 1 && (
                            <div>
                              <span className="text-[10px] text-slate-400 block mb-1">Alternative Interpretations:</span>
                              <div className="space-y-1">
                                {box.alternativeReadings.slice(1).map((alt, i) => (
                                  <div key={i} className="flex items-center justify-between bg-slate-800 px-2 py-0.5 rounded text-[11px]">
                                    <span className="font-mono">{alt.text}</span>
                                    <span className="text-slate-400 text-[10px]">{alt.confidence}%</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {box.notes && (
                            <p className="text-[10px] text-amber-200/90 pt-1 border-t border-slate-800 italic">
                              💡 Note: {box.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: AI EXTRACTED STRUCTURED DATA & VALIDATION WORKBENCH (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-300 shadow-xs flex flex-col justify-between overflow-hidden">
          {/* Header */}
          <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-gov-blue-700" />
              {t.extractedFormTitle}
            </h3>
            <StatusBadge status={record.status} size="sm" />
          </div>

          {/* Form Fields List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[580px]">
            {record.boundingBoxes.map((box) => {
              const isSelected = activeBoundingBoxId === box.id;
              const isEditing = editingBoxId === box.id;
              const isUncertain = box.isUncertain && box.status === 'ai_uncertain';
              const isVerified = box.status === 'manually_verified';
              const currentFieldValue = (record.extractedData as any)[box.fieldKey] || box.primaryReading;

              return (
                <div
                  key={box.id}
                  id={`field-${box.id}`}
                  onClick={() => setActiveBoundingBoxId(box.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-gov-blue-600 bg-gov-blue-50/70 ring-2 ring-gov-blue-400/40 shadow-xs'
                      : isUncertain
                      ? 'border-amber-400 bg-amber-50/50 hover:bg-amber-50'
                      : isVerified
                      ? 'border-teal-300 bg-teal-50/30'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  {/* Field Header */}
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                      {box.label}
                      {isUncertain && (
                        <span className="px-1.5 py-0.2 text-[9px] font-bold bg-amber-200 text-amber-900 rounded">
                          AI Uncertain
                        </span>
                      )}
                      {isVerified && (
                        <span className="px-1.5 py-0.2 text-[9px] font-bold bg-teal-200 text-teal-900 rounded">
                          Manually Verified
                        </span>
                      )}
                    </span>
                    <ConfidenceMeter confidence={box.confidence} showLabel={false} />
                  </div>

                  {/* Field Value / Inline Editor */}
                  {isEditing ? (
                    <div className="mt-2 space-y-2" onClick={(e) => e.stopPropagation()}>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                          Correct Value:
                        </label>
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs font-mono font-bold border-2 border-gov-blue-500 rounded bg-white outline-none focus:ring-2 focus:ring-gov-blue-200"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                          Audit Correction Note:
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Corrected stroke based on registered deed index"
                          value={editNotes}
                          onChange={(e) => setEditNotes(e.target.value)}
                          className="w-full px-2 py-1 text-xs border border-slate-300 rounded bg-white"
                        />
                      </div>
                      <div className="flex items-center justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setEditingBoxId(null)}
                          className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-200 rounded font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(box.id)}
                          className="px-3 py-1 text-xs bg-emerald-700 hover:bg-emerald-800 text-white rounded font-bold flex items-center gap-1 shadow-xs"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Save &amp; Mark Verified
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-2 mt-1">
                      <span className="font-mono font-bold text-sm text-slate-900 truncate">
                        {currentFieldValue}
                      </span>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {isUncertain && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              acceptBoundingBox(record.id, box.id);
                            }}
                            className="px-2 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded text-[11px] font-bold transition-colors"
                            title="Accept Primary AI Reading"
                          >
                            Accept AI
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartEdit(box);
                          }}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors"
                          title="Manual Edit / Override"
                        >
                          <Edit3 className="w-3 h-3" />
                          Edit
                        </button>
                      </div>
                    </div>
                  )}

                  {box.alternativeReadings.length > 1 && !isEditing && (
                    <div className="text-[10px] text-slate-400 mt-1 font-mono">
                      Alternative: {box.alternativeReadings.slice(1).map((a) => `${a.text} (${a.confidence}%)`).join(', ')}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Automated Cross-Checks Report Panel */}
            <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50 space-y-2 mt-4">
              <h4 className="font-bold text-xs text-slate-800 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  {t.autoCrossChecksTitle}
                </span>
                <span className="text-[10px] text-emerald-700 font-mono font-bold">
                  DILRMP Rules Engine
                </span>
              </h4>

              <div className="space-y-2 pt-1">
                {record.crossChecks.map((chk) => (
                  <div
                    key={chk.id}
                    className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-slate-800 text-[11px]">{chk.title}</span>
                      <span
                        className={`px-1.5 py-0.2 rounded text-[10px] font-bold uppercase ${
                          chk.status === 'passed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {chk.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">{chk.description}</p>
                    {chk.suggestedCorrection && (
                      <span className="text-[10px] text-amber-800 font-medium block">
                        💡 Suggestion: {chk.suggestedCorrection}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Officer Final Decision Action Bar */}
          <div className="p-4 bg-slate-100 border-t border-slate-300 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setShowRescanModal(true)}
              className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 rounded-lg text-xs font-bold transition-colors"
            >
              {t.sendForRescan}
            </button>

            <button
              type="button"
              onClick={handleApprove}
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-md flex items-center gap-1.5 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              {t.approveAndDigitize}
            </button>
          </div>
        </div>
      </div>

      {/* Audit Trail Drawer Modal */}
      {showAuditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-sm">
                  Document Audit Trail Log ({record.documentNumber})
                </h3>
              </div>
              <button
                onClick={() => setShowAuditModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-3 text-xs divide-y divide-slate-100">
              {record.auditLogs.map((log) => (
                <div key={log.id} className="pt-3 first:pt-0 space-y-1">
                  <div className="flex items-center justify-between text-slate-500 font-mono text-[11px]">
                    <span className="font-bold text-slate-800">{log.officerName}</span>
                    <span>{log.timestamp}</span>
                  </div>
                  <p className="text-slate-700">{log.action}</p>
                  {log.fieldChanged && (
                    <div className="bg-slate-50 p-2 rounded border border-slate-200 font-mono text-[11px]">
                      <span className="text-slate-500">Field: {log.fieldChanged}</span> | Old: <span className="text-rose-700 line-through">{log.oldValue}</span> → New: <span className="text-emerald-700 font-bold">{log.newValue}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Re-Scan Order Modal */}
      {showRescanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 w-full max-w-md p-6 space-y-4 animate-in fade-in">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              Order Physical Document Re-Scan
            </h3>
            <p className="text-xs text-slate-600">
              Specify reason for dispatching record back to the Sub-Registrar archival scanning desk.
            </p>
            <textarea
              rows={3}
              value={rescanReason}
              onChange={(e) => setRescanReason(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-rose-500"
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowRescanModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 font-semibold hover:bg-slate-100 rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRescan}
                className="px-4 py-1.5 bg-rose-700 hover:bg-rose-800 text-white rounded text-xs font-bold"
              >
                Confirm Re-scan Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
