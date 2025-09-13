"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';
import { getTranslations, type Translations, type LanguageCode, availableLanguages } from '@/lib/site-config';

interface LanguageContextType {
  language: LanguageCode;
  t: (key: string, options?: { returnObjects: boolean }) => any;
  setLanguage: (language: LanguageCode) => void;
  availableLanguages: { code: string, name: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>('en');

  useEffect(() => {
    const storedLang = localStorage.getItem('language') as LanguageCode;
    if (storedLang && availableLanguages.some(l => l.code === storedLang)) {
      setLanguageState(storedLang);
    }
  }, []);
  
  const setLanguage = (lang: LanguageCode) => {
    localStorage.setItem('language', lang);
    setLanguageState(lang);
  };
  
  const t = (key: string, options: { returnObjects: boolean } = { returnObjects: false }) => {
    const translations = getTranslations(language);
    const keys = key.split('.');
    let result: any = translations;

    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        // Fallback to English if key not found
        const fallbackTranslations = getTranslations('en');
        let fallbackResult: any = fallbackTranslations;
        for (const fk of keys) {
            if (fallbackResult && typeof fallbackResult === 'object' && fk in fallbackResult) {
                fallbackResult = fallbackResult[fk];
            } else {
                return key; // Return key if not found in English either
            }
        }
        return fallbackResult;
      }
    }
    
    if (options.returnObjects === true) {
      return result;
    }

    if (typeof result === 'string') {
        return result;
    }

    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
