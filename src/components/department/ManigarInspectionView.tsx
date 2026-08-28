import React, { useState } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { useRecords } from '../../context/RecordsContext';
import { useAuth } from '../../context/AuthContext';
import { ManigarRequest } from '../../types/manigar';
import {
  Ruler,
  Compass,
  CheckCircle2,
  Clock,
  UserCheck,
  AlertTriangle,
  MapPin,
  Calendar,
  Phone,
  ShieldCheck,
  Building,
  Check,
  Sparkles,
  Filter,
  X
} from 'lucide-react';

export const ManigarInspectionView: React.FC = () => {
  const { t } = useTranslation();
  const { manigarRequests, allocateManigarToRequest, verifyLandSizeByManigar } = useRecords();
  const { officer } = useAuth();

  const [statusFilter, setStatusFilter] = useState('');
  const [allocatingReq, setAllocatingReq] = useState<ManigarRequest | null>(null);
  const [verifyingReq, setVerifyingReq] = useState<ManigarRequest | null>(null);

  // Allocation modal states
  const [selectedManigar, setSelectedManigar] = useState('P. Muthuramalingam (Senior Manigar / Revenue Surveyor)');
  const [manigarPhone, setManigarPhone] = useState('+91 98421 77320');
  const [inspectionDate, setInspectionDate] = useState('2026-09-02');

  // Verification modal states
  const [measuredAreaInput, setMeasuredAreaInput] = useState<number>(1.838);
  const [officerNotesInput, setOfficerNotesInput] = useState('On-site DGPS boundary measurement completed. All 4 boundary stones intact and verified against FMB.');

  const filteredRequests = manigarRequests.filter((r) => {
    if (statusFilter && r.status !== statusFilter) return false;
    return true;
  });

  const availableManigars = [
    { name: 'P. Muthuramalingam (Senior Manigar / Revenue Surveyor)', contact: '+91 98421 77320' },
    { name: 'S. Shanmugam (Village Revenue Manigar / VAO)', contact: '+91 94433 22110' },
    { name: 'K. Thirunavukkarasu (Field Cadastral Surveyor)', contact: '+91 98422 66100' },
    { name: 'Chandra Prakash Yadav (Lekhpal / Revenue Surveyor)', contact: '+91 94150 99881' }
  ];

  const handleOpenAllocate = (req: ManigarRequest) => {
    setAllocatingReq(req);
    setSelectedManigar(availableManigars[0].name);
    setManigarPhone(availableManigars[0].contact);
  };

  const handleSaveAllocate = () => {
    if (!allocatingReq) return;
    allocateManigarToRequest(allocatingReq.id, selectedManigar, manigarPhone, inspectionDate);
    setAllocatingReq(null);
  };

  const handleOpenVerify = (req: ManigarRequest) => {
    setVerifyingReq(req);
    setMeasuredAreaInput(req.deedAreaHectares);
  };

  const handleSaveVerify = () => {
    if (!verifyingReq) return;
    const diff = Math.abs(verifyingReq.deedAreaHectares - measuredAreaInput);
    const accuracy = Math.max(90, Number((100 - (diff / verifyingReq.deedAreaHectares) * 100).toFixed(2)));

    verifyLandSizeByManigar(
      verifyingReq.id,
      measuredAreaInput,
      accuracy,
      officerNotesInput,
      officer?.name || 'V. Meenakshi Sundaram (Tahsildar Melur)'
    );
    setVerifyingReq(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            {t.manigarDeptTitle}
          </h2>
          <p className="text-xs text-slate-600">
            {t.manigarDeptSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-emerald-50 text-emerald-900 px-3 py-1.5 rounded-lg border border-emerald-300">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>DGPS Cadastral Accuracy Standard (±0.5% Tolerance)</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <span className="font-bold text-slate-700">Filter Status:</span>
          <button
            onClick={() => setStatusFilter('')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              statusFilter === '' ? 'bg-gov-blue-800 text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All ({manigarRequests.length})
          </button>
          <button
            onClick={() => setStatusFilter('Requested')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              statusFilter === 'Requested' ? 'bg-gov-blue-800 text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Pending Allocation ({manigarRequests.filter((r) => r.status === 'Requested').length})
          </button>
          <button
            onClick={() => setStatusFilter('Inspection Scheduled')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              statusFilter === 'Inspection Scheduled' ? 'bg-gov-blue-800 text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Inspection Scheduled ({manigarRequests.filter((r) => r.status === 'Inspection Scheduled').length})
          </button>
          <button
            onClick={() => setStatusFilter('Size Accuracy Verified')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              statusFilter === 'Size Accuracy Verified' ? 'bg-gov-blue-800 text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Size Accuracy Verified ({manigarRequests.filter((r) => r.status === 'Size Accuracy Verified').length})
          </button>
        </div>

        <span className="text-slate-500 font-medium">
          Showing <strong>{filteredRequests.length}</strong> scaling records
        </span>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/75 border-b border-slate-200 text-slate-600 font-bold">
                <th className="p-3.5">Request #</th>
                <th className="p-3.5">Survey &amp; Location</th>
                <th className="p-3.5">Citizen Name</th>
                <th className="p-3.5">Deed Area (Ha)</th>
                <th className="p-3.5">Assigned Manigar</th>
                <th className="p-3.5">Measured Area &amp; Accuracy</th>
                <th className="p-3.5">Verification Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRequests.map((req) => {
                const isVerified = req.status === 'Size Accuracy Verified';
                const isScheduled = req.status === 'Inspection Scheduled';

                return (
                  <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-gov-blue-900">
                      {req.requestNumber}
                    </td>
                    <td className="p-3.5">
                      <span className="font-mono font-bold text-slate-900 block">
                        Survey {req.surveyNumber}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {req.village}, {req.district}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="font-bold text-slate-900 block">{req.citizenName}</span>
                      <span className="text-[11px] text-slate-400 font-mono">{req.citizenMobile}</span>
                    </td>
                    <td className="p-3.5 font-mono font-bold text-slate-800">
                      {req.deedAreaHectares} Ha
                    </td>
                    <td className="p-3.5">
                      {req.allocatedManigarName ? (
                        <div>
                          <span className="font-bold text-slate-800 block">{req.allocatedManigarName}</span>
                          <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                            <Phone className="w-3 h-3 text-gov-blue-700" /> {req.allocatedManigarContact}
                          </span>
                        </div>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">
                          Unassigned
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 font-mono">
                      {isVerified && req.measuredAreaHectares ? (
                        <div>
                          <span className="font-bold text-emerald-800 block text-xs">
                            {req.measuredAreaHectares} Ha
                          </span>
                          <span className="text-[10px] text-emerald-700 font-semibold">
                            {req.areaAccuracyPercentage}% Accurate
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Awaiting Survey</span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                          isVerified
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : isScheduled
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-slate-100 text-slate-700 border border-slate-300'
                        }`}
                      >
                        {isVerified && <ShieldCheck className="w-3 h-3 text-emerald-700" />}
                        {isScheduled && <Clock className="w-3 h-3 text-amber-700 animate-pulse" />}
                        {req.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      {!req.allocatedManigarName && (
                        <button
                          onClick={() => handleOpenAllocate(req)}
                          className="px-3 py-1.5 bg-gov-blue-800 hover:bg-gov-blue-900 text-white rounded-lg font-bold text-[11px] shadow-2xs transition-colors"
                        >
                          Allocate Manigar
                        </button>
                      )}
                      {req.allocatedManigarName && !isVerified && (
                        <button
                          onClick={() => handleOpenVerify(req)}
                          className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-[11px] shadow-2xs transition-colors inline-flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" />
                          Verify Accuracy
                        </button>
                      )}
                      {isVerified && (
                        <span className="text-[11px] text-emerald-700 font-bold font-mono">
                          ✓ Verified
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Allocate Manigar Modal */}
      {allocatingReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 w-full max-w-lg p-6 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-gov-blue-700" />
                <h3 className="font-bold text-base text-slate-900">
                  Allocate Manigar / Surveyor (Survey {allocatingReq.surveyNumber})
                </h3>
              </div>
              <button
                onClick={() => setAllocatingReq(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
              <span className="font-bold text-slate-800">Land Parcel:</span>
              <p>Survey {allocatingReq.surveyNumber} ({allocatingReq.deedAreaHectares} Ha) • {allocatingReq.village}, {allocatingReq.district}</p>
              <p className="text-slate-500">Citizen: <strong>{allocatingReq.citizenName}</strong> ({allocatingReq.citizenMobile})</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Select Certified Revenue Manigar / Surveyor *
                </label>
                <select
                  value={selectedManigar}
                  onChange={(e) => {
                    const sel = availableManigars.find((m) => m.name === e.target.value);
                    if (sel) {
                      setSelectedManigar(sel.name);
                      setManigarPhone(sel.contact);
                    }
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-gov-blue-500"
                >
                  {availableManigars.map((m, i) => (
                    <option key={i} value={m.name}>
                      {m.name} ({m.contact})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Schedule Field Survey Date *
                </label>
                <input
                  type="date"
                  value={inspectionDate}
                  onChange={(e) => setInspectionDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-gov-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setAllocatingReq(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveAllocate}
                className="px-4 py-2 bg-gov-blue-800 hover:bg-gov-blue-900 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5"
              >
                <UserCheck className="w-4 h-4" />
                Assign &amp; Schedule Survey
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Verify Size Accuracy Modal */}
      {verifyingReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 w-full max-w-lg p-6 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-base text-slate-900">
                  Verify Manigar Land Size Accuracy (Survey {verifyingReq.surveyNumber})
                </h3>
              </div>
              <button
                onClick={() => setVerifyingReq(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
              <div>
                <span className="text-[11px] text-slate-500 block">Deed Stated Area:</span>
                <span className="font-bold font-mono text-sm text-slate-800">{verifyingReq.deedAreaHectares} Ha</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">Surveyor Manigar:</span>
                <span className="font-bold text-slate-800 truncate block">{verifyingReq.allocatedManigarName}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Physical Measured Land Extent (Hectares) *
                </label>
                <input
                  type="number"
                  step="0.001"
                  value={measuredAreaInput}
                  onChange={(e) => setMeasuredAreaInput(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border-2 border-emerald-500 rounded-lg font-mono font-bold text-sm outline-none focus:ring-2 focus:ring-emerald-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Field Survey &amp; Boundary Stone Verification Notes *
                </label>
                <textarea
                  rows={3}
                  value={officerNotesInput}
                  onChange={(e) => setOfficerNotesInput(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setVerifyingReq(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveVerify}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                Certify &amp; Approve Size Accuracy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
