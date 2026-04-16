import React from "react";
import { X } from "lucide-react";
import { uiLanguages } from "../../data/navbar";

interface LanguageBarProps {
  language: string;
  setLanguage: (lang: string) => void;
  setShowLangBar: (show: boolean) => void;
  selectedIndex: number;
  t: (key: string) => string;
}

export function LanguageBar({ language, setLanguage, setShowLangBar, selectedIndex, t }: LanguageBarProps) {
  return (
    <div className="absolute top-20 left-0 right-0 bg-[var(--nav-bg)] border-b border-[var(--border-color)] py-3 px-4 flex items-center justify-center gap-2 shadow-lg z-40">
      <span className="text-xs text-tertiary uppercase tracking-widest mr-2 hidden sm:inline">{t("Language")}:</span>
      {uiLanguages.map((lang, idx) => {
        const isSelected = selectedIndex === idx;
        const active = language === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${isSelected ? 'bg-brand-blue/20 border-2 border-brand-blue ring-2 ring-brand-blue' : active ? 'bg-brand-blue/10 border border-brand-blue' : 'bg-[var(--input-bg)] border border-[var(--border-color)] hover:border-brand-blue/50'}`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className={isSelected ? "text-brand-blue font-bold" : "text-secondary"}>{lang.code}</span>
          </button>
        );
      })}
      <button onClick={() => setShowLangBar(false)} className="ml-2 p-1 rounded hover:bg-[var(--input-bg)] text-tertiary hover:text-secondary">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
