import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext, LanguageContext, type Language } from "../context";
import { Github, Gitlab, Linkedin, Sun, Moon, Menu, X, Globe, ChevronDown, ChevronRight, Mail, ExternalLink } from "lucide-react";
import { GlobalSearch } from "./GlobalSearch";

const languageColors: Record<Language, string> = {
  EL: "#1cb0f6",
  EN: "#ff4d4d",
  DE: "#ffc800",
  ES: "#ff9f1c",
  ZH: "#ff3366",
};

const socialLinks = [
  { name: "GitHub", href: "https://github.com/Je0Dev", icon: Github, color: "#ffffff", bg: "bg-[#2b2b2b]", shadow: "#1a1a1a" },
  { name: "GitLab", href: "https://gitlab.com/mag30-admin", icon: Gitlab, color: "#ffffff", bg: "bg-[#fc6d26]", shadow: "#e24329" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/geomas/", icon: Linkedin, color: "#ffffff", bg: "bg-brand-blue", shadow: "#1899d6" },
  { name: "Email", href: "mailto:giorgos_M000@hotmail.com", icon: Mail, color: "#ffffff", bg: "bg-brand-pink", shadow: "#d43b3b" },
  { name: "Website", href: "https://je0dev.github.io/personal_website/", icon: ExternalLink, color: "#ffffff", bg: "bg-brand-green", shadow: "#059669" },
];

export function Navbar() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { language, setLanguage, t } = useContext(LanguageContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMobileLangMenu, setShowMobileLangMenu] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showLangBar, setShowLangBar] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const uiLanguages = [
    { code: "EL" as Language, flag: "🇬🇷", name: "Greek" },
    { code: "EN" as Language, flag: "🇬🇧", name: "English" },
    { code: "DE" as Language, flag: "🇩🇪", name: "German" },
    { code: "ES" as Language, flag: "🇪🇸", name: "Spanish" },
    { code: "ZH" as Language, flag: "🇨🇳", name: "Chinese" },
  ];

  const currentColor = languageColors[language];

  const navItems = [
    { name: "Resources", path: "/resources" },
    { name: "Milestones", path: "/milestones" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const barItems = uiLanguages;
  const showBarItems = showLangBar && !isMenuOpen;
  const isLangBarItemSelected = (index: number) => showBarItems && selectedIndex === index;

  const getAllMenuItems = () => {
    if (isMenuOpen) {
      return [...uiLanguages, ...navItems];
    }
    return [];
  };

  useEffect(() => {
    if (selectedIndex >= 0 && menuRef.current && isMenuOpen) {
      const items = menuRef.current.querySelectorAll('[data-menu-item]');
      if (items[selectedIndex] instanceof HTMLElement) {
        items[selectedIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex, isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      setSelectedIndex(-1);
      setShowMobileLangMenu(false);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isMenuOpen) {
        const totalItems = uiLanguages.length + navItems.length;
        
        if (e.key === "ArrowDown" || e.key === "Tab") {
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % totalItems);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex(prev => prev <= 0 ? totalItems - 1 : prev - 1);
        } else if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (selectedIndex >= 0) {
            if (selectedIndex < uiLanguages.length) {
              setLanguage(uiLanguages[selectedIndex].code);
              setIsMenuOpen(false);
            } else {
              const navIndex = selectedIndex - uiLanguages.length;
              window.location.href = navItems[navIndex].path;
              setIsMenuOpen(false);
            }
          }
        } else if (e.key === "Escape") {
          setIsMenuOpen(false);
        }
        return;
      }
      
      if (!showLangBar) return;
      
      const totalItems = showBarItems ? barItems.length : 0;
      
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % totalItems);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => prev <= 0 ? totalItems - 1 : prev - 1);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (showBarItems && selectedIndex >= 0 && selectedIndex < barItems.length) {
          setLanguage(barItems[selectedIndex].code);
        }
      } else if (e.key === "Escape") {
        setShowLangBar(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen, selectedIndex, showLangBar, showBarItems]);

  const getItemCount = () => navItems.length + (showMobileLangMenu ? uiLanguages.length : 0);
  const isNavItemSelected = (index: number) => selectedIndex >= 0 && selectedIndex < navItems.length && selectedIndex === index;
  const isLangItemSelected = (index: number) => showMobileLangMenu && selectedIndex >= navItems.length && selectedIndex === navItems.length + index;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--border-color)]" role="navigation" aria-label="Main navigation">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:bg-brand-blue focus:text-white focus:rounded-lg focus:font-bold"
      >
        Skip to main content
      </a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 z-10 w-1/4">
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center"
            >
              <Globe className="text-brand-dark w-5 h-5" />
            </motion.div>
            <span className="font-black text-xl tracking-tighter hidden sm:inline-block">
              <span className="text-brand-blue">Mastro</span><span className="text-brand-purple">Languages</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center justify-center gap-1 z-10 flex-1">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path}
                className={`duo-nav-link text-sm ${isActive(item.path) ? "text-brand-blue bg-white/10" : ""}`}
              >
                {t(item.name)}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-end gap-3 z-10">
            <GlobalSearch />
            <div className="hidden md:flex items-center gap-1">
              <button
                onClick={() => setShowLangBar(!showLangBar)}
                className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg transition-all ${
                  showLangBar 
                    ? 'bg-brand-blue/20 border-2 border-brand-blue' 
                    : 'bg-[var(--input-bg)] border border-[var(--border-color)] hover:border-brand-blue/50'
                }`}
                title="Toggle language bar"
              >
                <Globe className="w-5 h-5" />
              </button>
            </div>

            <div className="hidden xl:flex items-center gap-2">
              <motion.a href="https://github.com/Je0Dev" whileHover={{ y: -1, scale: 1 }} className="w-10 h-10 bg-[var(--input-bg)] rounded-xl flex items-center justify-center border border-[var(--border-color)] hover:bg-brand-orange hover:text-brand-dark transition-all shadow-[0_4px_0_0_rgba(255,255,255,0.05)] hover:shadow-[0_4px_0_0_rgba(0,0,0,0.2)]">
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a href="https://gitlab.com/mag30-admin" whileHover={{ y: -1, scale: 1 }} className="w-10 h-10 bg-[var(--input-bg)] rounded-xl flex items-center justify-center border border-[var(--border-color)] hover:bg-brand-purple hover:text-brand-dark transition-all shadow-[0_4px_0_0_rgba(255,255,255,0.05)] hover:shadow-[0_4px_0_0_rgba(0,0,0,0.2)]">
                <Gitlab className="w-5 h-5" />
              </motion.a>
              <motion.a href="https://www.linkedin.com/in/geomas/" whileHover={{ y: -1, scale: 1 }} className="w-10 h-10 bg-[var(--input-bg)] rounded-xl flex items-center justify-center border border-[var(--border-color)] hover:bg-brand-blue hover:text-brand-dark transition-all shadow-[0_4px_0_0_rgba(255,255,255,0.05)] hover:shadow-[0_4px_0_0_rgba(0,0,0,0.2)]">
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
            
            <button onClick={toggleTheme} className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--input-bg)] border-2 border-[var(--border-color)] hover:border-brand-orange hover:bg-brand-orange/10 transition-all shadow-[0_4px_0_0_var(--border-color)] hover:shadow-[0_4px_0_0_#ff9600]">
              {isDarkMode ? <Sun className="w-5 h-5 text-brand-orange" /> : <Moon className="w-5 h-5 text-brand-blue" />}
            </button>
          
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="xl:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--input-bg)] border-2 border-[var(--border-color)] text-secondary hover:bg-[var(--hover-bg)] hover:border-brand-pink transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-[0_4px_0_0_var(--border-color)]"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close main menu" : "Open main menu"}
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                {isMenuOpen ? (
                  <X className="w-full h-full" />
                ) : (
                  <Menu className="w-full h-full" />
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {showBarItems && (
        <div className="absolute top-20 left-0 right-0 bg-[var(--nav-bg)] border-b border-[var(--border-color)] py-3 px-4 flex items-center justify-center gap-2 shadow-lg z-40">
          <span className="text-xs text-tertiary uppercase tracking-widest mr-2 hidden sm:inline">{t("Language")}:</span>
          {barItems.map((lang, idx) => {
            const isSelected = isLangBarItemSelected(idx);
            return (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isSelected 
                    ? 'bg-brand-blue/20 border-2 border-brand-blue ring-2 ring-brand-blue' 
                    : language === lang.code 
                      ? 'bg-brand-blue/10 border border-brand-blue'
                      : 'bg-[var(--input-bg)] border border-[var(--border-color)] hover:border-brand-blue/50'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className={isSelected ? "text-brand-blue font-bold" : "text-secondary"}>{lang.code}</span>
              </button>
            );
          })}
          <button 
            onClick={() => setShowLangBar(false)}
            className="ml-2 p-1 rounded hover:bg-[var(--input-bg)] text-tertiary hover:text-secondary"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      
      {isMenuOpen && (
        <div ref={menuRef} className="xl:hidden absolute top-20 left-0 right-0 bg-[var(--nav-bg)] border-b border-[var(--border-color)] p-4 flex flex-col gap-4 shadow-xl max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="text-xs text-tertiary uppercase tracking-widest mb-2 flex items-center gap-2">
            <span>{t("Language") || "Language"}</span>
            <span className="bg-[var(--input-bg)] px-1.5 py-0.5 rounded">↑↓</span>
          </div>
          
          <div className="grid grid-cols-5 gap-2 mb-2">
            {uiLanguages.map((lang, idx) => {
              const isSelected = isLangItemSelected(idx);
              const langColor = languageColors[lang.code];
              return (
                <button
                  key={lang.code}
                  data-menu-item
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsMenuOpen(false);
                  }}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all border-2 shadow-[0_4px_0_0_var(--border-color)] hover:shadow-[0_2px_0_0_var(--border-color)] hover:translate-y-0.5 ${
                    isSelected 
                      ? 'border-brand-blue bg-brand-blue/20' 
                      : language === lang.code 
                        ? `border-2`
                        : 'border border-[var(--border-color)] hover:border-brand-blue/50'
                  }`}
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
              <span>{t("Navigation") || "Navigation"}</span>
              <span className="bg-[var(--input-bg)] px-1.5 py-0.5 rounded">↑↓</span>
            </div>
            <div className="flex flex-col gap-2">
              {navItems.map((item, idx) => {
                const isSelected = selectedIndex === uiLanguages.length + idx;
                const navColors = [
                  { bg: "bg-brand-green", text: "text-brand-green", border: "border-brand-green" },
                  { bg: "bg-brand-yellow", text: "text-brand-yellow", border: "border-brand-yellow" },
                  { bg: "bg-brand-pink", text: "text-brand-pink", border: "border-brand-pink" },
                  { bg: "bg-brand-blue", text: "text-brand-blue", border: "border-brand-blue" }
                ];
                const navColor = navColors[idx % navColors.length];
                return (
                  <Link 
                    key={item.name} 
                    to={item.path}
                    data-menu-item
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMenuOpen(false);
                      setTimeout(() => navigate(item.path), 100);
                    }}
                    className={`font-black text-lg transition-all p-4 rounded-xl flex items-center justify-between border-2 shadow-[0_4px_0_0_var(--border-color)] hover:shadow-[0_2px_0_0_var(--border-color)] hover:translate-y-0.5 ${
                      isSelected 
                        ? `${navColor.bg} ${navColor.text} border-current` 
                        : isActive(item.path) 
                          ? `${navColor.bg}/20 ${navColor.text} border-current`
                          : "bg-[var(--input-bg)] text-secondary border-[var(--border-color)] hover:border-brand-dark/20"
                    }`}
                  >
                    <span className={isSelected || isActive(item.path) ? navColor.text : ""}>{t(item.name)}</span>
                    {isSelected ? <ChevronRight className="w-5 h-5" /> : <ChevronRight className="w-5 h-5 text-tertiary" />}
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
            <div className="text-xs text-tertiary uppercase tracking-widest mb-3 flex items-center gap-2">
              <span>{t("Connect") || "Connect"}</span>
            </div>
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
          
          {selectedIndex >= 0 && (
            <div className="text-xs text-tertiary text-center pt-2">
              Press <kbd className="bg-[var(--input-bg)] px-1.5 py-0.5 rounded mx-1">Enter</kbd> to select · <kbd className="bg-[var(--input-bg)] px-1.5 py-0.5 rounded mx-1">Esc</kbd> to close
            </div>
          )}
        </div>
      )}
    </nav>
  );
}