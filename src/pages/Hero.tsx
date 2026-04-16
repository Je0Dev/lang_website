import React, { useState, useEffect, useContext } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ThemeContext, LanguageContext } from "../context";
import { ColoredText } from "../components/ColoredText";
import { SectionLabel } from "../components/SectionLabel";
import { Mascot } from "../components/Mascot";
import { uiLanguages, learningLanguages, tipsData } from "../data/languages.tsx";
import { GraduationCap, ArrowUp } from "lucide-react";
import { HeroLanguageCard } from "../components/Hero/HeroLanguageCard";
import { HeroTipCard } from "../components/Hero/HeroTipCard";
import { HeroTipModal } from "../components/Hero/HeroTipModal";

export function Hero() {
  const [isJumping, setIsJumping] = useState(false);
  const [expandedLanguages, setExpandedLanguages] = useState<string[]>([]);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedTip, setSelectedTip] = useState<any>(null);
  const { setCursorColor } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space" && !selectedTip) { e.preventDefault(); setIsJumping(true); setTimeout(() => setIsJumping(false), 500); }
      if (e.key === "Escape") setSelectedTip(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedTip]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <SectionLabel text={t("UNIT 0: THE BEGINNING")} colorClass="bg-brand-blue" hoverGif="https://i.gifer.com/4Jnt.gif" />
          <h1 className="text-5xl md:text-8xl font-black leading-tight mb-6">
            <ColoredText colorClass="text-brand-blue">{t("Personal Language Learning")}</ColoredText><br />
            <ColoredText colorClass="text-brand-green">{t("Tips")}</ColoredText>
          </h1>
          <p className="text-xl text-secondary mb-8 max-w-lg leading-relaxed">
            <ColoredText to="/resources" colorClass="text-brand-blue">Exploring</ColoredText> languages, <ColoredText to="/journey" colorClass="text-brand-green">cultures</ColoredText>, and <ColoredText to="/blog" colorClass="text-brand-pink">continuous learning</ColoredText>.
          </p>
          <button onClick={() => { setIsJumping(true); setTimeout(() => setIsJumping(false), 500); }} className="duo-button duo-button-blue">{isJumping ? t("Wow!") : t("Press Space")}</button>
        </motion.div>
        
        <motion.div className="relative mt-16" animate={{ scale: isJumping ? 1.1 : 1, rotate: isJumping ? -1 : 0, y: isJumping ? -20 : 0 }}>
          <Mascot color="bg-brand-pink" position="-top-20 -left-30" delay={0} type="star" />
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {tipsData.map((tip, idx) => <HeroTipCard key={tip.key} tip={tip} idx={idx} setCursorColor={setCursorColor} onClick={() => setSelectedTip(tip)} />)}
          </div>
        </motion.div>

        <div className="mt-16">
          <h3 className="text-2xl font-black mb-6 flex items-center gap-3"><GraduationCap className="w-8 h-8 text-brand-teal" /><ColoredText colorClass="text-brand-teal">{t("Known Languages")}</ColoredText></h3>
          <div className="space-y-4">
            {[...uiLanguages, ...learningLanguages].map((lang, i) => (
              <HeroLanguageCard key={lang.name} lang={lang} isExpanded={expandedLanguages.includes(lang.name)} onToggle={() => setExpandedLanguages(prev => prev.includes(lang.name) ? prev.filter(n => n !== lang.name) : [...prev, lang.name])} setCursorColor={setCursorColor} onNavigate={navigate} />
            ))}
          </div>
        </div>

        <motion.button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-8 right-8 w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center shadow-lg hover:scale-110 z-50" animate={{ opacity: showBackToTop ? 1 : 0 }} style={{ pointerEvents: showBackToTop ? "auto" : "none" }}><ArrowUp className="w-6 h-6 text-brand-dark" /></motion.button>
        {selectedTip && <HeroTipModal tip={selectedTip} onClose={() => setSelectedTip(null)} onNavigate={navigate} />}
      </motion.div>
    </div>
  );
}
