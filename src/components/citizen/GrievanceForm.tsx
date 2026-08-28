import React, { useState } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { useRecords } from '../../context/RecordsContext';
import { useAuth } from '../../context/AuthContext';
import {
  HelpCircle,
  FileUp,
  CheckCircle,
  AlertCircle,
  Clock,
  ShieldCheck,
  Send,
  Building2,
  FileText
} from 'lucide-react';

export const GrievanceForm: React.FC = () => {
  const { t } = useTranslation();
  const { grievances, addGrievance, records } = useRecords();
  const { citizen } = useAuth();

  const [surveyNumber, setSurveyNumber] = useState('142/7A');
  const [village, setVillage] = useState('Navinipatti');
  const [district, setDistrict] = useState('Madurai');
  const [issueCategory, setIssueCategory] = useState<any>('Spelling Error in Name / Father Name');
  const [description, setDescription] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    addGrievance({
      citizenName: citizen?.name || 'K. R. Sundaralingam',
      citizenMobile: citizen?.mobile || '9876543210',
      surveyNumber,
      village,
      district,
      issueCategory,
      description,
      attachedFileName: attachedFile?.name
    });

    const newId = `GRV-TN-MDU-2026-${Math.floor(100 + Math.random() * 900)}`;
    setSubmittedId(newId);
    setIsSubmitted(true);
    setDescription('');
    setAttachedFile(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 mb-1">
          {t.raiseGrievance} (Land Record Correction Redressal)
        </h2>
        <p className="text-xs text-slate-600">
          Flag spelling mistakes, area discrepancies, or missing mutation entries directly to your jurisdictional Tahsildar / VAO.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Column */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <HelpCircle className="w-4 h-4 text-gov-blue-700" />
            Submit New Data Correction Request
          </h3>

          {isSubmitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-base text-emerald-950">
                Grievance Acknowledged &amp; Registered!
              </h4>
              <p className="text-xs text-emerald-800">
                Your Tracking ID is <strong className="font-mono text-sm bg-emerald-100 px-2 py-0.5 rounded">{submittedId}</strong>.
                An SMS confirmation has been dispatched to your mobile.
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="mt-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Survey / Parcel No *</label>
                  <input
                    type="text"
                    required
                    value={surveyNumber}
                    onChange={(e) => setSurveyNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-gov-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Village *</label>
                  <input
                    type="text"
                    required
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gov-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">District *</label>
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gov-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Correction Category *</label>
                <select
                  value={issueCategory}
                  onChange={(e) => setIssueCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-gov-blue-500 outline-none text-xs"
                >
                  <option value="Spelling Error in Name / Father Name">Spelling Error in Landowner / Father Name</option>
                  <option value="Area Discrepancy">Area / Extent Measurement Discrepancy</option>
                  <option value="Incorrect Survey Boundary">Incorrect Boundary / Neighboring Survey Details</option>
                  <option value="Missing Mutation Record">Missing Mutation / Inheritance Order</option>
                  <option value="Classification Error (Wet/Dry)">Classification Error (Wetland vs Dryland)</option>
                  <option value="Other Discrepancy">Other Land Record Discrepancy</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Detailed Description of Correction Needed *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Explain clearly what value appears in the document vs what should be corrected, citing supporting registered deed numbers..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gov-blue-500 outline-none text-xs"
                />
              </div>

              {/* File Attachment */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Attach Supporting Document (Sale Deed, Partition Deed, Aadhaar - PDF/JPG max 10MB)
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:bg-slate-50 transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setAttachedFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <FileUp className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                  <span className="font-semibold text-slate-700 block">
                    {attachedFile ? attachedFile.name : 'Click to select supporting document'}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {attachedFile ? `${(attachedFile.size / 1024).toFixed(1)} KB` : 'Supports PDF, PNG, JPEG'}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-gov-blue-800 hover:bg-gov-blue-900 text-white rounded-lg font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Submit Grievance to Revenue Officer
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Existing Grievances History */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-slate-900 flex items-center justify-between border-b border-slate-100 pb-3">
            <span>My Grievance History</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 font-mono">
              {grievances.length} Records
            </span>
          </h3>

          <div className="space-y-3">
            {grievances.map((g) => (
              <div
                key={g.id}
                className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2 hover:border-gov-blue-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono font-bold text-gov-blue-900 block text-[11px]">
                      {g.grievanceNumber}
                    </span>
                    <span className="text-slate-500 text-[10px]">Submitted: {g.submittedDate}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      g.status === 'Resolved'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                  >
                    {g.status}
                  </span>
                </div>

                <p className="text-slate-800 font-medium line-clamp-2">
                  {g.description}
                </p>

                <div className="text-[11px] text-slate-500 border-t border-slate-200 pt-1.5 font-mono">
                  <span>Assigned: <strong>{g.assignedOfficer}</strong></span>
                </div>

                {g.resolutionRemarks && (
                  <div className="p-2 bg-emerald-50 text-emerald-900 rounded border border-emerald-200 text-[11px]">
                    <strong>Remarks:</strong> {g.resolutionRemarks}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
