import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { uiLanguages, navItems, socialLinks, languageColors } from "../../data/navbar";

interface NavbarMobileProps {
  menuRef: React.RefObject<HTMLDivElement | null>;
  language: string;
  setLanguage: (lang: string) => void;
  setIsMenuOpen: (open: boolean) => void;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  isActive: (path: string) => boolean;
  navigate: (path: string) => void;
  t: (key: string) => string;
}

export function NavbarMobile({ menuRef, language, setLanguage, setIsMenuOpen, selectedIndex, setSelectedIndex, isActive, navigate, t }: NavbarMobileProps) {
  return (
    <div ref={menuRef} className="xl:hidden absolute top-20 left-0 right-0 bg-[var(--nav-bg)] border-b border-[var(--border-color)] p-4 flex flex-col gap-4 shadow-xl max-h-[calc(100vh-80px)] overflow-y-auto">
      <div className="text-xs text-tertiary uppercase tracking-widest mb-2 flex items-center gap-2">
        <span>{t("Language")}</span> <span className="bg-[var(--input-bg)] px-1.5 py-0.5 rounded">↑↓</span>
      </div>
      <div className="grid grid-cols-5 gap-2 mb-2">
        {uiLanguages.map((lang, idx) => {
          const isSelected = selectedIndex === idx;
          const langColor = languageColors[lang.code as keyof typeof languageColors];
          return (
            <button
              key={lang.code}
              data-menu-item
              onClick={() => { setLanguage(lang.code); setIsMenuOpen(false); }}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all border-2 shadow-[0_4px_0_0_var(--border-color)] hover:shadow-[0_2px_0_0_var(--border-color)] hover:translate-y-0.5 ${isSelected ? 'border-brand-blue bg-brand-blue/20' : language === lang.code ? `border-2` : 'border border-[var(--border-color)] hover:border-brand-blue/50'}`}
              style={language === lang.code && !isSelected ? { borderColor: langColor } : undefined}
            >
              <span className="text-2xl">{lang.flag}</span>
              <span className={`text-xs font-black ${isSelected ? "text-brand-blue" : "text-secondary"}`}>{lang.code}</span>
            </button>
          );
        })}
      </div>

      <div className="border-t border-[var(--border-color)] pt-4">
        <div className="text-xs text-tertiary uppercase tracking-widest mb-2 flex items-center gap-2">
          <span>{t("Navigation")}</span> <span className="bg-[var(--input-bg)] px-1.5 py-0.5 rounded">↑↓</span>
        </div>
        <div className="flex flex-col gap-2">
          {navItems.map((item, idx) => {
            const currentIdx = uiLanguages.length + idx;
            const isSelected = selectedIndex === currentIdx;
            const navColors = [
              { bg: "bg-brand-green", text: "text-brand-green" },
              { bg: "bg-brand-yellow", text: "text-brand-yellow" },
              { bg: "bg-brand-pink", text: "text-brand-pink" },
              { bg: "bg-brand-blue", text: "text-brand-blue" }
            ];
            const navColor = navColors[idx % navColors.length];
            const active = isActive(item.path);
            return (
              <Link 
                key={item.name} 
                to={item.path}
                data-menu-item
                onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); setTimeout(() => navigate(item.path), 100); }}
                className={`font-black text-lg transition-all p-4 rounded-xl flex items-center justify-between border-2 shadow-[0_4px_0_0_var(--border-color)] hover:shadow-[0_2px_0_0_var(--border-color)] hover:translate-y-0.5 ${isSelected ? `${navColor.bg} ${navColor.text} border-current` : active ? `${navColor.bg}/20 ${navColor.text} border-current` : "bg-[var(--input-bg)] text-secondary border-[var(--border-color)] hover:border-brand-dark/20"}`}
              >
                <span className={isSelected || active ? navColor.text : ""}>{t(item.name)}</span>
                <ChevronRight className={`w-5 h-5 ${isSelected ? "" : "text-tertiary"}`} />
              </Link>
            );
          })}
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
        <div className="text-xs text-tertiary uppercase tracking-widest mb-3">{t("Connect")}</div>
        <div className="grid grid-cols-3 gap-2">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl border-2 border-transparent hover:border-brand-dark/20 transition-all ${social.bg} shadow-[0_4px_0_0_${social.shadow}] hover:shadow-[0_2px_0_0_${social.shadow}] hover:translate-y-0.5 active:shadow-none active:translate-y-1`}
            >
              <social.icon className="w-5 h-5" style={{ color: social.color }} />
              <span className="text-xs font-bold" style={{ color: social.color }}>{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
