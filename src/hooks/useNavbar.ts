import { useState, useEffect, useRef, useContext, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeContext, LanguageContext } from "../context";
import { uiLanguages, navItems } from "../data/navbar";

export function useNavbar() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { language, setLanguage, t } = useContext(LanguageContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLangBar, setShowLangBar] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    if (selectedIndex >= 0 && menuRef.current && isMenuOpen) {
      const items = menuRef.current.querySelectorAll('[data-menu-item]');
      if (items[selectedIndex] instanceof HTMLElement) items[selectedIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex, isMenuOpen]);

  useEffect(() => { if (!isMenuOpen) setSelectedIndex(-1); }, [isMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isMenuOpen) {
        const totalItems = uiLanguages.length + navItems.length;
        if (e.key === "ArrowDown" || e.key === "Tab") { e.preventDefault(); setSelectedIndex(prev => (prev + 1) % totalItems); }
        else if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIndex(prev => prev <= 0 ? totalItems - 1 : prev - 1); }
        else if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (selectedIndex >= 0) {
            if (selectedIndex < uiLanguages.length) { setLanguage(uiLanguages[selectedIndex].code); setIsMenuOpen(false); }
            else { navigate(navItems[selectedIndex - uiLanguages.length].path); setIsMenuOpen(false); }
          }
        } else if (e.key === "Escape") setIsMenuOpen(false);
        return;
      }
      if (!showLangBar) return;
      if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIndex(prev => (prev + 1) % uiLanguages.length); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIndex(prev => prev <= 0 ? uiLanguages.length - 1 : prev - 1); }
      else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < uiLanguages.length) setLanguage(uiLanguages[selectedIndex].code);
      } else if (e.key === "Escape") setShowLangBar(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen, selectedIndex, showLangBar, setLanguage, navigate]);

  return { isDarkMode, toggleTheme, language, setLanguage, t, isMenuOpen, setIsMenuOpen, showLangBar, setShowLangBar, selectedIndex, setSelectedIndex, isActive, menuRef, navigate };
}
