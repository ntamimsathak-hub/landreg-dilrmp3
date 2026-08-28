import React from 'react';

interface ConfidenceMeterProps {
  confidence: number; // 0 to 100
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({
  confidence,
  showLabel = true,
  size = 'md',
}) => {
  const getBadgeStyle = () => {
    if (confidence >= 90) {
      return {
        bg: 'bg-emerald-50 text-emerald-700 border-emerald-300',
        bar: 'bg-emerald-500',
        text: 'High Confidence',
      };
    } else if (confidence >= 70) {
      return {
        bg: 'bg-amber-50 text-amber-800 border-amber-300',
        bar: 'bg-amber-500',
        text: 'Moderate / Review',
      };
    } else {
      return {
        bg: 'bg-rose-50 text-rose-800 border-rose-300',
        bar: 'bg-rose-500',
        text: 'Low / Flagged',
      };
    }
  };

  const style = getBadgeStyle();

  return (
    <div className="inline-flex items-center gap-2">
      <div className={`px-2 py-0.5 rounded border text-xs font-bold font-mono ${style.bg}`}>
        {confidence.toFixed(1)}%
      </div>
      {showLabel && (
        <span className="text-xs text-slate-500 font-medium">
          {style.text}
        </span>
      )}
    </div>
  );
};
