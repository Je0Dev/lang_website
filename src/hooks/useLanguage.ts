import { useState, useEffect } from 'react';
import { translations, type Language } from '../context';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "EN";
  });

  const t = (key: string) => {
    const langSet = translations[language] || translations["EN"];
    return langSet[key] || key;
  };

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return {
    language,
    setLanguage,
    t
  };
}