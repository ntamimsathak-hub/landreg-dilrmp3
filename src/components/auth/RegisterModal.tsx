import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../context/LanguageContext';
import { X, UserCheck, Shield, CheckCircle } from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { registerCitizen } = useAuth();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    aadhaarLast4: '',
    address: '',
    state: 'Tamil Nadu',
    district: 'Madurai',
    tehsil: 'Melur',
    village: 'Navinipatti',
    pincode: '625106'
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 800));
    await registerCitizen(formData);
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      onSuccess();
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#0b3b6e] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base">{t.registerTitle}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {success ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
            <h4 className="text-lg font-bold text-slate-800">Registration Complete!</h4>
            <p className="text-sm text-slate-600">
              Welcome to LandReg DILRMP 3.0. Linking your landholdings automatically...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div className="bg-blue-50 border border-blue-200 rounded p-3 text-blue-900 flex items-start gap-2">
              <Shield className="w-4 h-4 text-blue-700 mt-0.5 flex-shrink-0" />
              <span>
                KYC-Lite allows instant lookup of landholdings linked to your mobile and Aadhaar last 4 digits.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">{t.fullName} *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. K. R. Sundaralingam"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-gov-blue-500 outline-none text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">{t.mobileNumber} *</label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="10-digit mobile"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-gov-blue-500 outline-none text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">{t.aadhaarLast4} *</label>
                <input
                  type="text"
                  required
                  maxLength={4}
                  placeholder="XXXX-XXXX-8842"
                  value={formData.aadhaarLast4}
                  onChange={(e) => setFormData({ ...formData, aadhaarLast4: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-gov-blue-500 outline-none text-xs font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">{t.address} *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Street / Door No / Landmark"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-gov-blue-500 outline-none text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">{t.selectState} *</label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-2 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-gov-blue-500 outline-none text-xs"
                >
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Karnataka">Karnataka</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">{t.selectDistrict} *</label>
                <input
                  type="text"
                  required
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-gov-blue-500 outline-none text-xs"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded text-slate-600 hover:bg-slate-100 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 rounded bg-gov-blue-800 hover:bg-gov-blue-900 text-white font-bold transition-colors shadow-sm disabled:opacity-50"
              >
                {loading ? 'Registering...' : t.registerBtn}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
