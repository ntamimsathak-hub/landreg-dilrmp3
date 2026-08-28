import React from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  UploadCloud,
  BrainCircuit,
  SplitSquareVertical,
  MapPin,
  BarChart3,
  Archive,
  ShieldAlert,
  Server,
  Building2,
  AlertTriangle,
  Ruler
} from 'lucide-react';
import { useRecords } from '../../context/RecordsContext';

export const OfficerSidebar: React.FC = () => {
  const { t } = useTranslation();
  const { records, uploadQueue, manigarRequests } = useRecords();

  const pendingHumanReview = records.filter(
    (r) => r.status === 'Needs Human Review' || r.unresolvedUncertaintiesCount > 0
  ).length;

  const pendingManigarAllocations = manigarRequests.filter(
    (r) => r.status === 'Requested' || r.status === 'Inspection Scheduled'
  ).length;

  const navItems = [
    { to: '/officer', label: t.home, icon: LayoutDashboard, end: true },
    { to: '/officer/validation-workspace', label: t.validationWorkspace, icon: SplitSquareVertical, badge: pendingHumanReview > 0 ? `${pendingHumanReview} Flagged` : null, highlight: true },
    { to: '/officer/manigar', label: t.manigar, icon: Ruler, badge: pendingManigarAllocations > 0 ? `${pendingManigarAllocations} Survey` : null },
    { to: '/officer/upload', label: t.uploadDocument, icon: UploadCloud },
    { to: '/officer/ai-ocr', label: t.aiOcrModule, icon: BrainCircuit },
    { to: '/officer/advanced-search', label: t.findOldRecords, icon: Search },
    { to: '/officer/gis-map', label: t.gisMap, icon: MapPin },
    { to: '/officer/reports', label: t.reportsAnalytics, icon: BarChart3 },
    { to: '/officer/repository', label: t.docRepository, icon: Archive },
    { to: '/officer/rbac', label: t.rbacSettings, icon: ShieldAlert },
    { to: '/officer/api-integrations', label: t.apiIntegrations, icon: Server },
  ];

  return (
    <aside className="w-full md:w-64 bg-slate-900 text-slate-200 flex-shrink-0 p-4 space-y-6 border-r border-slate-800">
      {/* Officer Identification Banner */}
      <div className="bg-gradient-to-br from-emerald-900 to-slate-950 p-4 rounded-xl border border-emerald-700/40 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-emerald-600/30 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold text-sm">
            <Building2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white leading-tight">V. M. Sundaram</h4>
            <span className="text-[11px] text-emerald-400 font-mono">Tahsildar / Registrar</span>
          </div>
        </div>
        <div className="text-[11px] text-slate-300 flex items-center gap-1.5 pt-2 border-t border-emerald-800/40">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Melur Circle, Madurai Dist</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-1">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
          Department Operations
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-xs border border-emerald-600'
                    : item.highlight
                    ? 'bg-amber-950/40 text-amber-300 border border-amber-800/60 hover:bg-amber-950/70'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${item.highlight ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 font-mono">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Uncertainty Attention Notice */}
      {pendingHumanReview > 0 && (
        <div className="p-3 bg-amber-950/60 border border-amber-700/50 rounded-lg text-amber-200 text-xs space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-amber-300">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Attention Required</span>
          </div>
          <p className="text-[11px] text-amber-200/80">
            {pendingHumanReview} deed(s) contain low-confidence handwritten fields requiring split-screen review.
          </p>
        </div>
      )}
    </aside>
  );
};
