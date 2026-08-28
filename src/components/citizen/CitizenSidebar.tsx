import React from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  FileCheck2,
  Award,
  Clock,
  HelpCircle,
  Bell,
  MapPin,
  ShieldAlert,
  Ruler
} from 'lucide-react';
import { useRecords } from '../../context/RecordsContext';

export const CitizenSidebar: React.FC = () => {
  const { t } = useTranslation();
  const { notifications } = useRecords();
  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const navItems = [
    { to: '/citizen', label: t.home, icon: LayoutDashboard, end: true },
    { to: '/citizen/find-old-records', label: t.findOldRecords, icon: Search },
    { to: '/citizen/my-records', label: t.myRecords, icon: FileCheck2 },
    { to: '/citizen/manigar', label: t.manigar, icon: Ruler, highlight: true },
    { to: '/citizen/patta-chitta', label: t.pattaChitta, icon: Award },
    { to: '/citizen/status-tracker', label: t.statusTracker, icon: Clock },
    { to: '/citizen/grievance', label: t.raiseGrievance, icon: HelpCircle },
    {
      to: '/citizen/notifications',
      label: t.notifications,
      icon: Bell,
      badge: unreadNotifs > 0 ? unreadNotifs : null,
    },
  ];

  return (
    <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex-shrink-0 p-4 space-y-6">
      {/* Citizen Profile Card */}
      <div className="bg-gradient-to-br from-blue-900 to-[#0b3b6e] text-white p-4 rounded-xl shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center font-bold text-sm">
            KS
          </div>
          <div>
            <h4 className="font-bold text-sm leading-tight">K. R. Sundaralingam</h4>
            <span className="text-[11px] text-blue-200 font-mono">Aadhaar: **** 8842</span>
          </div>
        </div>
        <div className="text-[11px] text-blue-100 flex items-center gap-1 mt-2 pt-2 border-t border-white/15">
          <MapPin className="w-3 h-3 text-gov-saffron-300" />
          <span>Navinipatti, Melur, Madurai</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-1">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
          Citizen Services
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
                    ? 'bg-gov-blue-50 text-gov-blue-900 border border-gov-blue-200 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <Icon className="w-4 h-4 text-gov-blue-700" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-gov-saffron-500 text-white">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Quick Helpline Box */}
      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-xs space-y-1">
        <div className="font-bold flex items-center gap-1.5 text-amber-950">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
          <span>Need Revenue Assistance?</span>
        </div>
        <p className="text-[11px] text-amber-800">
          Contact Village Administrative Officer (VAO) Navinipatti: <strong>+91 94433 22110</strong>
        </p>
      </div>
    </aside>
  );
};
