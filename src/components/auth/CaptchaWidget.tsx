import React, { useState, useEffect } from 'react';
import { RotateCw, ShieldCheck } from 'lucide-react';

interface CaptchaWidgetProps {
  onVerify: (isValid: boolean) => void;
}

export const CaptchaWidget: React.FC<CaptchaWidgetProps> = ({ onVerify }) => {
  const [captchaCode, setCaptchaCode] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [isMatch, setIsMatch] = useState<boolean>(false);

  const generateCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setUserInput('');
    setIsMatch(false);
    onVerify(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    setUserInput(val);
    if (val === captchaCode) {
      setIsMatch(true);
      onVerify(true);
    } else {
      setIsMatch(false);
      onVerify(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-slate-700">
        Security Verification (CAPTCHA)
      </label>
      <div className="flex items-center gap-3">
        {/* Visual CAPTCHA graphic with noise lines */}
        <div className="relative select-none bg-slate-200 border-2 border-slate-300 rounded px-4 py-2 flex items-center justify-center font-mono font-black text-lg tracking-widest text-slate-800 shadow-inner overflow-hidden w-36 h-10">
          <span className="relative z-10 italic">{captchaCode}</span>
          {/* Noise strikethrough lines */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <svg className="w-full h-full">
              <line x1="0" y1="5" x2="100%" y2="35" stroke="#475569" strokeWidth="1.5" />
              <line x1="0" y1="35" x2="100%" y2="10" stroke="#0b3b6e" strokeWidth="1.5" strokeDasharray="4,2" />
            </svg>
          </div>
        </div>

        {/* Refresh CAPTCHA */}
        <button
          type="button"
          onClick={generateCaptcha}
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors"
          title="Refresh CAPTCHA code"
          aria-label="Refresh CAPTCHA"
        >
          <RotateCw className="w-4 h-4" />
        </button>

        {/* User Input */}
        <div className="relative flex-1">
          <input
            type="text"
            maxLength={5}
            value={userInput}
            onChange={handleInputChange}
            placeholder="Type code"
            className={`w-full px-3 py-2 border rounded text-xs font-mono tracking-wider uppercase focus:outline-none focus:ring-2 ${
              isMatch
                ? 'border-emerald-500 bg-emerald-50 text-emerald-900 focus:ring-emerald-400'
                : 'border-slate-300 focus:ring-gov-blue-500'
            }`}
          />
          {isMatch && (
            <ShieldCheck className="w-4 h-4 text-emerald-600 absolute right-2.5 top-2.5 pointer-events-none" />
          )}
        </div>
      </div>
    </div>
  );
};
