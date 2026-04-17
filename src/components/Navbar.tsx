import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Sun, Moon, Menu, X, Globe, Github, Gitlab, Linkedin } from "lucide-react";
import { GlobalSearch } from "./GlobalSearch";
import { navItems } from "../data/navbar";
import { useNavbar } from "../hooks/useNavbar";
import { NavbarMobile } from "./Navbar/NavbarMobile";
import { LanguageBar } from "./Navbar/LanguageBar";

export function Navbar() {
  const { isDarkMode, toggleTheme, language, setLanguage, t, isMenuOpen, setIsMenuOpen, showLangBar, setShowLangBar, selectedIndex, setSelectedIndex, isActive, menuRef, navigate } = useNavbar();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--border-color)]" role="navigation" aria-label="Main navigation">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:bg-brand-blue focus:text-white focus:rounded-lg focus:font-bold">Skip to main content</a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 z-10 w-1/4">
            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }} className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center"><Globe className="text-brand-dark w-5 h-5" /></motion.div>
            <span className="font-black text-xl tracking-tighter hidden sm:inline-block"><span className="text-brand-blue">Mastro</span><span className="text-brand-purple">Languages</span></span>
          </Link>
          <div className="hidden lg:flex items-center justify-center gap-1 z-10 flex-1">
            {navItems.map((item) => (
              <Link key={item.name} to={item.path} className={`duo-nav-link text-sm ${isActive(item.path) ? "text-brand-blue bg-white/10" : ""}`}>{t(item.name)}</Link>
            ))}
          </div>
          <div className="flex items-center justify-end gap-3 z-10">
            <GlobalSearch />
            <button onClick={() => setShowLangBar(!showLangBar)} className={`hidden md:flex w-9 h-9 rounded-lg items-center justify-center text-lg transition-all ${showLangBar ? 'bg-brand-blue/20 border-2 border-brand-blue' : 'bg-[var(--input-bg)] border border-[var(--border-color)] hover:border-brand-blue/50'}`} title="Toggle language bar"><Globe className="w-5 h-5" /></button>
            <div className="hidden xl:flex items-center gap-2">
              {[ { href: "https://github.com/Je0Dev", icon: Github, bg: "hover:bg-brand-orange" }, { href: "https://gitlab.com/mag30-admin", icon: Gitlab, bg: "hover:bg-brand-purple" }, { href: "https://www.linkedin.com/in/geomas/", icon: Linkedin, bg: "hover:bg-brand-blue" } ].map((s, i) => (
                <motion.a key={i} href={s.href} whileHover={{ y: -1, scale: 1 }} className={`w-10 h-10 bg-[var(--input-bg)] rounded-xl flex items-center justify-center border border-[var(--border-color)] ${s.bg} hover:text-brand-dark transition-all shadow-[0_4px_0_0_rgba(255,255,255,0.05)]`}>
                  <s.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            <button onClick={toggleTheme} className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--input-bg)] border-2 border-[var(--border-color)] hover:border-brand-orange hover:bg-brand-orange/10 transition-all shadow-[0_4px_0_0_var(--border-color)]">{isDarkMode ? <Sun className="w-5 h-5 text-brand-orange" /> : <Moon className="w-5 h-5 text-brand-blue" />}</button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="xl:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--input-bg)] border-2 border-[var(--border-color)] text-secondary hover:border-brand-pink transition-all shadow-[0_4px_0_0_var(--border-color)]" aria-expanded={isMenuOpen}>{isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
          </div>
        </div>
      </div>
      {showLangBar && !isMenuOpen && <LanguageBar language={language} setLanguage={setLanguage} setShowLangBar={setShowLangBar} selectedIndex={selectedIndex} t={t} />}
      {isMenuOpen && <NavbarMobile menuRef={menuRef} language={language} setLanguage={setLanguage} setIsMenuOpen={setIsMenuOpen} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} isActive={isActive} navigate={navigate} t={t} />}
    </nav>
  );
}
