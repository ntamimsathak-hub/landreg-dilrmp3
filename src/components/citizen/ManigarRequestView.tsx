import React, { useState } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { useRecords } from '../../context/RecordsContext';
import { useAuth } from '../../context/AuthContext';
import {
  Compass,
  Ruler,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  Phone,
  ShieldCheck,
  Send,
  Sparkles,
  AlertTriangle,
  UserCheck,
  Building,
  Award
} from 'lucide-react';

export const ManigarRequestView: React.FC = () => {
  const { t } = useTranslation();
  const { records, manigarRequests, addManigarRequest } = useRecords();
  const { citizen } = useAuth();

  const myParcels = records.filter(
    (r) => r.extractedData.district.toLowerCase() === 'madurai' || r.citizenAadhaarLast4 === '8842'
  );

  const [selectedSurveyNo, setSelectedSurveyNo] = useState(myParcels[0]?.extractedData.surveyNumber || '142/7A');
  const [surveyReason, setSurveyReason] = useState('Boundary & Size Accuracy Certification');
  const [preferredDate, setPreferredDate] = useState('2026-09-05');
  const [contactMobile, setContactMobile] = useState(citizen?.mobile || '9876543210');
  const [isSuccess, setIsSuccess] = useState(false);
  const [newReqId, setNewReqId] = useState('');

  const selectedParcel = records.find((r) => r.extractedData.surveyNumber === selectedSurveyNo) || records[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addManigarRequest({
      citizenId: citizen?.id || 'cit-9842',
      citizenName: citizen?.name || 'K. R. Sundaralingam',
      citizenMobile: contactMobile,
      surveyNumber: selectedParcel.extractedData.surveyNumber,
      khasraNumber: selectedParcel.extractedData.khasraNumber,
      village: selectedParcel.extractedData.village,
      district: selectedParcel.extractedData.district,
      state: selectedParcel.extractedData.state,
      deedAreaHectares: selectedParcel.extractedData.plotAreaHectares,
      scheduledInspectionDate: preferredDate,
      inspectionNotes: `Citizen requested on-site scaling for ${surveyReason}.`
    });

    setNewReqId(`MNG-TN-MDU-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    setIsSuccess(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0b3b6e] via-[#047857] to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-md space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold border border-white/20">
          <Ruler className="w-3.5 h-3.5 text-gov-saffron-300" />
          <span>Village Land Revenue Surveyor • Manigar Allocation Desk</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
          {t.manigarCitizenTitle}
        </h1>
        <p className="text-xs sm:text-sm text-blue-100 max-w-3xl leading-relaxed">
          A <strong>Manigar (மணியக்காரர் / Revenue Surveyor)</strong> is an authorized field officer who physically visits your land parcel with DGPS &amp; Electronic Total Station (ETS) instruments to scale the land boundaries, establish corner stones, and certify the true measured acreage against your registered deed.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Request Form (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-gov-blue-700" />
              Request Manigar Allocation
            </h3>
            <p className="text-xs text-slate-500">
              Submit your parcel to the Taluk Revenue Office for field measurement.
            </p>
          </div>

          {isSuccess ? (
            <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-xl text-center space-y-3 animate-in fade-in">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
              <h4 className="font-bold text-base text-emerald-950">
                Manigar Allocation Requested!
              </h4>
              <p className="text-xs text-emerald-800">
                Your request ID is <strong className="font-mono text-sm bg-emerald-100 px-2 py-0.5 rounded">{newReqId}</strong>.
                The Melur Taluk Revenue office will assign a designated field Manigar shortly.
              </p>
              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                className="mt-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
              >
                Request for Another Parcel
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Select Land Parcel to Scale *
                </label>
                <select
                  value={selectedSurveyNo}
                  onChange={(e) => setSelectedSurveyNo(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-medium focus:ring-2 focus:ring-gov-blue-500 outline-none text-xs"
                >
                  {myParcels.map((p) => (
                    <option key={p.id} value={p.extractedData.surveyNumber}>
                      Survey {p.extractedData.surveyNumber} ({p.extractedData.plotAreaHectares} Ha • {p.extractedData.village})
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-[11px] text-slate-600">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-500">Deed Recorded Area:</span>
                  <span className="font-bold font-mono text-slate-900">{selectedParcel.extractedData.plotAreaHectares} Hectares</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-500">Classification:</span>
                  <span className="font-semibold text-emerald-800">{selectedParcel.extractedData.landClassification}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-500">Village &amp; Taluk:</span>
                  <span>{selectedParcel.extractedData.village}, {selectedParcel.extractedData.tehsilTaluk}</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Reason for Land Size Scaling *
                </label>
                <select
                  value={surveyReason}
                  onChange={(e) => setSurveyReason(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-gov-blue-500 outline-none text-xs"
                >
                  <option value="Boundary & Size Accuracy Certification">Boundary &amp; Size Accuracy Certification</option>
                  <option value="Partition & Family Settlement Subdivision">Partition &amp; Family Settlement Subdivision</option>
                  <option value="Adjoining Plot Encroachment Verification">Adjoining Plot Encroachment Verification</option>
                  <option value="Bank Loan / Mortgage Valuation Demarcation">Bank Loan / Mortgage Valuation Demarcation</option>
                  <option value="Physical Fencing / Stone Marker Installation">Physical Fencing / Stone Marker Installation</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-2.5 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gov-blue-500 outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Contact Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={contactMobile}
                    onChange={(e) => setContactMobile(e.target.value)}
                    className="w-full px-2.5 py-2 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-gov-blue-500 outline-none text-xs"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-gov-blue-800 hover:bg-gov-blue-900 text-white rounded-lg font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {t.requestManigarBtn}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Existing Manigar Allocations & Size Verification Status (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Ruler className="w-4 h-4 text-emerald-700" />
                My Land Scaling &amp; Manigar Verification Status
              </h3>
              <p className="text-xs text-slate-500">
                Track assigned revenue surveyors and view certified field measurements.
              </p>
            </div>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-full text-xs font-bold font-mono">
              {manigarRequests.length} Active Requests
            </span>
          </div>

          <div className="space-y-4">
            {manigarRequests.map((req) => {
              const isVerified = req.status === 'Size Accuracy Verified';
              const isScheduled = req.status === 'Inspection Scheduled';

              return (
                <div
                  key={req.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isVerified
                      ? 'border-emerald-300 bg-emerald-50/40 shadow-2xs'
                      : isScheduled
                      ? 'border-amber-300 bg-amber-50/40'
                      : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  {/* Top Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-2.5 mb-2.5">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 font-mono block">
                        {req.requestNumber}
                      </span>
                      <h4 className="font-bold text-sm text-gov-blue-900 font-mono">
                        Survey No: {req.surveyNumber} ({req.village}, {req.district})
                      </h4>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 ${
                        isVerified
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-400'
                          : 'bg-amber-100 text-amber-900 border border-amber-400'
                      }`}
                    >
                      {isVerified ? (
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
                      )}
                      {req.status}
                    </span>
                  </div>

                  {/* Allocated Manigar Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                    <div className="space-y-1">
                      <span className="text-[11px] text-slate-500 block">Allocated Manigar / Surveyor:</span>
                      <span className="font-bold text-slate-900 block">
                        {req.allocatedManigarName || 'Awaiting Taluk Officer Allocation'}
                      </span>
                      {req.allocatedManigarContact && (
                        <span className="text-[11px] text-slate-600 font-mono flex items-center gap-1">
                          <Phone className="w-3 h-3 text-gov-blue-700" />
                          {req.allocatedManigarContact}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] text-slate-500 block">Inspection Date &amp; Instrument:</span>
                      <span className="font-medium text-slate-800 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        {req.scheduledInspectionDate || 'To be scheduled'}
                      </span>
                      {req.surveyToolUsed && (
                        <span className="text-[10px] font-mono text-emerald-700 block">
                          Tool: {req.surveyToolUsed}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Measurement & Accuracy Section (if verified) */}
                  {isVerified && req.measuredAreaHectares && (
                    <div className="p-3 bg-white rounded-lg border border-emerald-200 text-xs space-y-2">
                      <div className="flex items-center justify-between font-mono">
                        <div>
                          <span className="text-[10px] text-slate-400 block">Deed Area</span>
                          <span className="font-bold text-slate-700">{req.deedAreaHectares} Ha</span>
                        </div>
                        <div className="text-center">
                          <span className="text-[10px] text-emerald-600 font-bold block">Manigar Measured Area</span>
                          <span className="font-black text-emerald-800 text-sm">{req.measuredAreaHectares} Ha</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block">Accuracy Match</span>
                          <span className="font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                            {req.areaAccuracyPercentage}%
                          </span>
                        </div>
                      </div>

                      {/* GPS Boundary Pins */}
                      {req.gpsCoordinates && (
                        <div className="pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-600 grid grid-cols-2 gap-1">
                          <span>NW: {req.gpsCoordinates.northWest}</span>
                          <span>NE: {req.gpsCoordinates.northEast}</span>
                          <span>SW: {req.gpsCoordinates.southWest}</span>
                          <span>SE: {req.gpsCoordinates.southEast}</span>
                        </div>
                      )}

                      <p className="text-[11px] text-slate-600 italic border-t border-slate-100 pt-1.5">
                        "{req.inspectionNotes}" — Verified by <strong>{req.verifiedByOfficer}</strong>
                      </p>
                    </div>
                  )}

                  {!isVerified && req.inspectionNotes && (
                    <div className="p-2.5 bg-white rounded border border-slate-200 text-[11px] text-slate-600">
                      <strong>Notes:</strong> {req.inspectionNotes}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
