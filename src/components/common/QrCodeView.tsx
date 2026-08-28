import React from 'react';

interface QrCodeViewProps {
  value: string;
  size?: number;
  label?: string;
}

export const QrCodeView: React.FC<QrCodeViewProps> = ({
  value,
  size = 140,
  label = 'Scan to Verify Authenticity',
}) => {
  return (
    <div className="flex flex-col items-center bg-white p-3 rounded-lg border border-slate-200 shadow-sm inline-block">
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="rounded"
      >
        {/* QR Background */}
        <rect width="120" height="120" fill="white" />

        {/* Outer Corner Position Blocks */}
        {/* Top-Left */}
        <rect x="8" y="8" width="30" height="30" fill="#0b3b6e" rx="3" />
        <rect x="13" y="13" width="20" height="20" fill="white" />
        <rect x="17" y="17" width="12" height="12" fill="#0b3b6e" rx="1.5" />

        {/* Top-Right */}
        <rect x="82" y="8" width="30" height="30" fill="#0b3b6e" rx="3" />
        <rect x="87" y="13" width="20" height="20" fill="white" />
        <rect x="91" y="17" width="12" height="12" fill="#0b3b6e" rx="1.5" />

        {/* Bottom-Left */}
        <rect x="8" y="82" width="30" height="30" fill="#0b3b6e" rx="3" />
        <rect x="13" y="87" width="20" height="20" fill="white" />
        <rect x="17" y="91" width="12" height="12" fill="#0b3b6e" rx="1.5" />

        {/* Simulated QR Data Dots Matrix */}
        <g fill="#1e293b">
          {/* Row 1 */}
          <rect x="44" y="10" width="4" height="4" />
          <rect x="52" y="10" width="4" height="4" />
          <rect x="60" y="10" width="4" height="4" />
          <rect x="72" y="10" width="4" height="4" />

          {/* Row 2 */}
          <rect x="40" y="18" width="4" height="4" />
          <rect x="48" y="18" width="4" height="4" />
          <rect x="64" y="18" width="4" height="4" />
          <rect x="68" y="18" width="4" height="4" />

          {/* Center alignment */}
          <rect x="42" y="42" width="36" height="36" fill="#f0fdf4" rx="4" stroke="#16a34a" stroke-width="1.5" />
          <circle cx="60" cy="60" r="12" fill="#0b3b6e" />
          <text x="60" y="64" font-size="8" fill="white" text-anchor="middle" font-family="sans-serif" font-weight="bold">LR</text>

          {/* Row 3 */}
          <rect x="10" y="44" width="4" height="4" />
          <rect x="18" y="48" width="4" height="4" />
          <rect x="26" y="44" width="4" height="4" />
          <rect x="34" y="52" width="4" height="4" />

          {/* Row 4 */}
          <rect x="84" y="44" width="4" height="4" />
          <rect x="92" y="48" width="4" height="4" />
          <rect x="102" y="44" width="4" height="4" />
          <rect x="96" y="56" width="4" height="4" />

          {/* Bottom data dots */}
          <rect x="44" y="84" width="4" height="4" />
          <rect x="52" y="88" width="4" height="4" />
          <rect x="60" y="84" width="4" height="4" />
          <rect x="68" y="92" width="4" height="4" />
          <rect x="76" y="86" width="4" height="4" />

          <rect x="48" y="98" width="4" height="4" />
          <rect x="56" y="104" width="4" height="4" />
          <rect x="64" y="98" width="4" height="4" />
          <rect x="72" y="102" width="4" height="4" />
          <rect x="88" y="92" width="4" height="4" />
          <rect x="96" y="100" width="4" height="4" />
          <rect x="104" y="86" width="4" height="4" />
        </g>
      </svg>
      {label && (
        <span className="text-[10px] text-slate-500 font-medium mt-1 text-center font-mono">
          {label}
        </span>
      )}
      <span className="text-[9px] text-slate-400 font-mono tracking-tighter truncate max-w-[130px]">
        {value}
      </span>
    </div>
  );
};
