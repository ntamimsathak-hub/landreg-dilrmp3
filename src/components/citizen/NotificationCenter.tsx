import React from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { useRecords } from '../../context/RecordsContext';
import { Bell, Smartphone, Mail, Sparkles, CheckCheck, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NotificationCenter: React.FC = () => {
  const { t } = useTranslation();
  const { notifications, markNotificationRead } = useRecords();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            {t.notifications} (Alerts &amp; SMS Dispatch Log)
          </h2>
          <p className="text-xs text-slate-600">
            Real-time status updates delivered via SMS Gateway and Central Land Registry Notification Engine.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-xs font-bold font-mono">
            {notifications.length} Total Alerts
          </span>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 shadow-xs overflow-hidden">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            onClick={() => markNotificationRead(notif.id)}
            className={`p-4 sm:p-5 flex items-start gap-4 transition-colors cursor-pointer ${
              notif.read ? 'bg-white hover:bg-slate-50' : 'bg-blue-50/40 hover:bg-blue-50'
            }`}
          >
            {/* Icon */}
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                notif.type === 'sms'
                  ? 'bg-amber-100 text-amber-800'
                  : notif.type === 'email'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {notif.type === 'sms' ? (
                <Smartphone className="w-5 h-5" />
              ) : notif.type === 'email' ? (
                <Mail className="w-5 h-5" />
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                  <span>{notif.title}</span>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-gov-blue-600 animate-pulse"></span>
                  )}
                </h4>
                <span className="text-[11px] text-slate-400 font-mono">
                  {notif.timestamp}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-2">
                {notif.message}
              </p>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="uppercase font-mono font-bold text-slate-400 text-[10px]">
                  Channel: {notif.type.toUpperCase()}
                </span>
                {notif.linkedRecordId && (
                  <Link
                    to="/citizen/status-tracker"
                    className="text-gov-blue-700 font-bold hover:underline inline-flex items-center gap-1"
                  >
                    View Status Timeline <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
