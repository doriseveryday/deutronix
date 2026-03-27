"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import en from './translations/en.json';
import zh from './translations/zh.json';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, any> = {
  en,
  zh,
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Get user's preferred language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language | null;
    const browserLanguage = navigator.language.startsWith('zh') ? 'zh' : 'en';
    const preferredLanguage = savedLanguage || browserLanguage;
    setLanguageState(preferredLanguage);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const getNestedValue = (obj: any, keys: string[]): string => {
    let current = obj;
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return keys.join('.');
      }
    }
    return typeof current === 'string' ? current : keys.join('.');
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    return getNestedValue(translations[language], keys);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
