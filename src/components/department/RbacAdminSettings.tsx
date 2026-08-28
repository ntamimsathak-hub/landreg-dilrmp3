import React, { useState } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import {
  ShieldAlert,
  UserCheck,
  KeyRound,
  Lock,
  CheckCircle2,
  Building,
  Plus,
  Edit,
  Shield,
  Sparkles
} from 'lucide-react';

interface OfficerUser {
  id: string;
  name: string;
  employeeId: string;
  role: 'Tehsildar / Registrar' | 'Revenue Inspector (RI)' | 'Village Administrative Officer (VAO)' | 'District Super Admin';
  jurisdiction: string;
  permissions: string[];
  status: 'Active' | 'Suspended';
}

export const RbacAdminSettings: React.FC = () => {
  const { t } = useTranslation();

  const [officers, setOfficers] = useState<OfficerUser[]>([
    {
      id: 'off-1',
      name: 'V. Meenakshi Sundaram',
      employeeId: 'TN-REV-8402',
      role: 'Tehsildar / Registrar',
      jurisdiction: 'Melur Taluk (Madurai)',
      permissions: ['OCR Validation', 'Approve Digitization', 'Order Re-scan', 'Resolve Grievance'],
      status: 'Active'
    },
    {
      id: 'off-2',
      name: 'S. Shanmugam',
      employeeId: 'TN-VAO-1190',
      role: 'Village Administrative Officer (VAO)',
      jurisdiction: 'Navinipatti Village',
      permissions: ['Physical Verification', 'Grievance Inspection', 'Cadastral Resurvey'],
      status: 'Active'
    },
    {
      id: 'off-3',
      name: 'K. Rajasekaran (IAS)',
      employeeId: 'TN-ADM-001',
      role: 'District Super Admin',
      jurisdiction: 'Madurai District',
      permissions: ['Full Master Ledger Access', 'User Provisioning', 'Audit Rollback', 'API Configuration'],
      status: 'Active'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            {t.rbacSettings} (Role-Based Access Control &amp; Jurisdiction Assignment)
          </h2>
          <p className="text-xs text-slate-600">
            Administer officer roles, digital signing certificate authorizations, and district-level operational boundaries.
          </p>
        </div>

        <button className="px-3.5 py-2 bg-gov-blue-800 hover:bg-gov-blue-900 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors">
          <Plus className="w-4 h-4" />
          Provision New Officer
        </button>
      </div>

      {/* Officers List Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700">
            Active Jurisdictional Officers ({officers.length})
          </h3>
          <span className="text-[11px] text-emerald-700 font-mono font-bold flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" />
            2FA &amp; DSC Hardware Token Enforced
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/75 border-b border-slate-200 text-slate-600 font-bold">
                <th className="p-3.5">Officer Name</th>
                <th className="p-3.5">Employee ID</th>
                <th className="p-3.5">Designated Role</th>
                <th className="p-3.5">Assigned Jurisdiction</th>
                <th className="p-3.5">Granted Capabilities</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {officers.map((off) => (
                <tr key={off.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900">
                    {off.name}
                  </td>
                  <td className="p-3.5 font-mono text-gov-blue-900 font-bold">
                    {off.employeeId}
                  </td>
                  <td className="p-3.5 font-semibold text-slate-800">
                    {off.role}
                  </td>
                  <td className="p-3.5 text-slate-600">
                    {off.jurisdiction}
                  </td>
                  <td className="p-3.5">
                    <div className="flex flex-wrap gap-1">
                      {off.permissions.map((p, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-blue-50 text-blue-900 border border-blue-200">
                          {p}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {off.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
