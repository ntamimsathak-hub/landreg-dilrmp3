import React from 'react';
import { RecordStatus, FieldValidationStatus } from '../../types/landRecord';
import { CheckCircle2, Clock, XCircle, BrainCircuit, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';

interface StatusBadgeProps {
  status: RecordStatus | FieldValidationStatus | string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showIcon = true,
}) => {
  const { t } = useTranslation();

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 gap-2 font-semibold',
  };

  switch (status) {
    case 'Verified':
      return (
        <span className={`inline-flex items-center rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 ${sizeClasses[size]}`}>
          {showIcon && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
          {t.statusVerified}
        </span>
      );
    case 'Pending':
      return (
        <span className={`inline-flex items-center rounded-full bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 ${sizeClasses[size]}`}>
          {showIcon && <Clock className="w-3.5 h-3.5 text-amber-600" />}
          {t.statusPending}
        </span>
      );
    case 'Rejected':
      return (
        <span className={`inline-flex items-center rounded-full bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 ${sizeClasses[size]}`}>
          {showIcon && <XCircle className="w-3.5 h-3.5 text-rose-600" />}
          {t.statusRejected}
        </span>
      );
    case 'Under AI Review':
      return (
        <span className={`inline-flex items-center rounded-full bg-blue-100 text-blue-800 border border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 ${sizeClasses[size]}`}>
          {showIcon && <BrainCircuit className="w-3.5 h-3.5 text-blue-600 animate-pulse" />}
          {t.statusUnderAiReview}
        </span>
      );
    case 'Needs Human Review':
      return (
        <span className={`inline-flex items-center rounded-full bg-orange-100 text-orange-800 border border-orange-300 dark:bg-orange-950/60 dark:text-orange-300 ${sizeClasses[size]}`}>
          {showIcon && <AlertTriangle className="w-3.5 h-3.5 text-orange-600" />}
          {t.statusNeedsHumanReview}
        </span>
      );
    case 'ai_uncertain':
      return (
        <span className={`inline-flex items-center rounded-full bg-amber-100 text-amber-900 border border-amber-400 font-semibold ${sizeClasses[size]}`}>
          {showIcon && <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />}
          {t.statusAiUncertain}
        </span>
      );
    case 'manually_verified':
      return (
        <span className={`inline-flex items-center rounded-full bg-teal-100 text-teal-900 border border-teal-400 font-semibold ${sizeClasses[size]}`}>
          {showIcon && <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />}
          {t.statusManuallyVerified}
        </span>
      );
    case 'ai_predicted':
      return (
        <span className={`inline-flex items-center rounded-full bg-slate-100 text-slate-700 border border-slate-300 ${sizeClasses[size]}`}>
          {showIcon && <BrainCircuit className="w-3.5 h-3.5 text-slate-500" />}
          AI Predicted
        </span>
      );
    default:
      return (
        <span className={`inline-flex items-center rounded-full bg-slate-100 text-slate-800 border border-slate-200 ${sizeClasses[size]}`}>
          {status}
        </span>
      );
  }
};
