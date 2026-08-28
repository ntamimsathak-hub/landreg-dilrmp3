import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '../translations/en';
import { hi } from '../translations/hi';
import { ta } from '../translations/ta';

export type LanguageCode = 'en' | 'hi' | 'ta';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: typeof en;
  isHighContrast: boolean;
  toggleHighContrast: () => void;
  textScale: number;
  adjustTextScale: (delta: number) => void;
}

const translations = {
  en,
  hi,
  ta,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    return (localStorage.getItem('landreg_lang') as LanguageCode) || 'en';
  });

  const [isHighContrast, setIsHighContrast] = useState<boolean>(() => {
    return localStorage.getItem('landreg_high_contrast') === 'true';
  });

  const [textScale, setTextScale] = useState<number>(100);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('landreg_lang', lang);
    document.documentElement.lang = lang;
  };

  const toggleHighContrast = () => {
    setIsHighContrast((prev) => {
      const next = !prev;
      localStorage.setItem('landreg_high_contrast', String(next));
      if (next) {
        document.documentElement.classList.add('high-contrast-mode');
      } else {
        document.documentElement.classList.remove('high-contrast-mode');
      }
      return next;
    });
  };

  const adjustTextScale = (delta: number) => {
    setTextScale((prev) => {
      const next = Math.max(90, Math.min(130, prev + delta));
      document.documentElement.style.fontSize = `${(next / 100) * 16}px`;
      return next;
    });
  };

  useEffect(() => {
    if (isHighContrast) {
      document.documentElement.classList.add('high-contrast-mode');
    }
  }, [isHighContrast]);

  const value = {
    language,
    setLanguage,
    t: translations[language] || en,
    isHighContrast,
    toggleHighContrast,
    textScale,
    adjustTextScale,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
