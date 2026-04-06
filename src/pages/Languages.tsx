import React from "react";
import { motion } from "motion/react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext, LanguageContext } from "../context";
import { ColoredText } from "../components/ColoredText";
import { SectionLabel } from "../components/SectionLabel";
import { Mascot } from "../components/Mascot";
import { Languages, Target, BookOpen, MessageCircle, GraduationCap, Globe, PenTool, Mic, Coffee, ChevronDown, Sparkles } from "lucide-react";

const LinkedColoredText = ({ children, colorClass, to }: { children: React.ReactNode; colorClass: string; to: string }) => (
  <Link to={to} className={`${colorClass} font-bold hover:opacity-80 transition-opacity inline-block`}>
    {children}
  </Link>
);

const GradientFlagButton = ({ flag, colors, progress, level }: { flag: string; colors: string[]; progress: number; level: string }) => (
  <div className="relative group">
    <motion.div 
      whileHover={{ 
        scale: [1, 1.05, 1],
        y: -5,
      }}
      whileTap={{ scale: 0.95 }}
      className="relative w-20 h-20 rounded-2xl flex items-center justify-center text-3xl shadow-lg overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
        boxShadow: `0 8px 32px ${colors[0]}40`,
      }}
    >
      <span className="relative z-10 drop-shadow-lg">{flag}</span>
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
    </motion.div>
    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${progress}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="h-full rounded-full"
        style={{
          background: `linear-gradient(90deg, ${colors[0]}, ${colors[1]})`,
        }}
      />
    </div>
  </div>
);

export function LanguagesPage() {
  const [expandedLang, setExpandedLang] = useState<string | null>(null);
  
  const uiLanguages = [
    { name: "Greek", flag: "🇬🇷", color: "bg-brand-blue", textColor: "text-brand-blue", hex: "#1cb0f6", level: "Native", progress: 100, colors: ["#001489", "#0D5EAF"], details: "My mother tongue. The foundation of my linguistic journey and the language that opened the doors to understanding other European languages. Growing up in Greece, I was immersed in Greek from birth, which gave me an intuitive understanding of the language's grammar and nuances." },
    { name: "English", flag: "🇬🇧", color: "bg-brand-green", textColor: "text-brand-green", hex: "#58cc02", level: "C1", progress: 95, colors: ["#012169", "#C8102E"], details: "Acquired through years of immersion in music, movies, and the internet. C1 certification achieved through self-study and consistent practice. Currently maintaining through daily consumption of podcasts like The Economist and YouTube tech content. The journey from B2 to C1 took about 2 years of dedicated immersion and vocabulary expansion." },
    { name: "German", flag: "🇩🇪", color: "bg-brand-purple", textColor: "text-brand-purple", hex: "#ce82ff", level: "B2", progress: 75, colors: ["#DD0000", "#000000"], details: "Goethe-Zertifikat B2 passed with distinction! Now working towards C1. The journey from A1 to B2 took about 2 years of consistent study and immersion through Netflix series like 'Dark' and podcasts. The key to German progress was daily grammar study combined with at least 1 hour of immersion content." },
  ];

  const learningLanguages = [
    { name: "Spanish", flag: "🇪🇸", color: "bg-brand-orange", textColor: "text-brand-orange", hex: "#ff9600", level: "A2", progress: 30, colors: ["#AA151B", "#F1BF00"], details: "The next big goal. Started with Dreaming Spanish for comprehensible input following the CI method. Currently at A2 level with about 30% progress towards B1. The goal is to reach B2 within the next year through daily immersion. The biggest challenge so far has been the verb conjugations and the subjunctive mood." },
    { name: "Chinese", flag: "🇨🇳", color: "bg-brand-pink", textColor: "text-brand-pink", hex: "#ff4b4b", level: "Beginner", progress: 5, colors: ["#DE2910", "#FFDE00"], details: "The ultimate challenge. Currently at HSK 1 level with 5% progress. Focusing on Pinyin and tone recognition before diving into characters. Using HelloChinese for systematic learning and Skritter for character writing practice. The transition from alphabetic to logographic thinking requires a completely different approach." },
  ];

  const { setCursorColor } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);

  return (
    <div className="min-h-screen py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20 relative">
          <Mascot color="bg-brand-teal" position="left-10 top-0" delay={1} type="star" />
          <SectionLabel text={t("UNIT 1 - Language Goals")} colorClass="bg-brand-green" hoverGif="https://i.gifer.com/Pak.gif" />
          <h2 className="text-4xl md:text-6xl font-black mt-6 mb-4">
            <ColoredText colorClass="text-brand-blue">{t("Language Hunting").split(' ')[0]}</ColoredText> <ColoredText colorClass="text-brand-pink">{t("Language Hunting").split(' ').slice(1).join(' ')}</ColoredText> 
          </h2>
          <p className="text-secondary max-w-xl mx-auto">
             {t("Here is my")} <ColoredText colorClass="text-brand-yellow">{t("List")}</ColoredText>.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-brand-teal" />
            <LinkedColoredText to="/resources" colorClass="text-brand-teal hover:underline">{t("Known Languages")}</LinkedColoredText>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {uiLanguages.map((lang, i) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setCursorColor(lang.hex)}
                onMouseLeave={() => setCursorColor("#1cb0f6")}
                className="flex flex-col items-center"
              >
                <GradientFlagButton 
                  flag={lang.flag} 
                  colors={lang.colors} 
                  progress={lang.progress}
                  level={lang.level}
                />
                <div className="mt-6 bg-brand-dark/80 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-xl shadow-lg w-full">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`font-black text-sm ${lang.textColor}`}>{lang.name}</span>
                    <span className="text-xs text-white/60 bg-white/10 px-2 py-0.5 rounded">{lang.level}</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${lang.colors[0]}, ${lang.colors[1]})`,
                      }}
                    />
                  </div>
                </div>
                
                <button 
                  onClick={() => setExpandedLang(expandedLang === lang.name ? null : lang.name)}
                  className="mt-3 flex items-center gap-2 text-sm text-secondary hover:text-brand-teal transition-colors"
                >
                  {expandedLang === lang.name ? t("Hide details") : t("Show details")}
                  <motion.div
                    animate={{ rotate: expandedLang === lang.name ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{ 
                    height: expandedLang === lang.name ? "auto" : 0,
                    opacity: expandedLang === lang.name ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 mt-2 bg-[var(--input-bg)] rounded-xl border border-[var(--border-color)] w-full">
                    <p className="text-sm text-secondary leading-relaxed">{lang.details}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
            <Target className="w-8 h-8 text-brand-orange" />
            <LinkedColoredText to="/blog" colorClass="text-brand-orange hover:underline">{t("Currently Learning")}</LinkedColoredText>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {learningLanguages.map((lang, i) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setCursorColor(lang.hex)}
                onMouseLeave={() => setCursorColor("#1cb0f6")}
                className="flex flex-col items-center"
              >
                <GradientFlagButton 
                  flag={lang.flag} 
                  colors={lang.colors} 
                  progress={lang.progress}
                  level={lang.level}
                />
                <div className="mt-6 bg-brand-dark/80 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-xl shadow-lg w-full">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`font-black text-sm ${lang.textColor}`}>{lang.name}</span>
                    <span className="text-xs text-white/60 bg-white/10 px-2 py-0.5 rounded">{lang.level}</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${lang.colors[0]}, ${lang.colors[1]})`,
                      }}
                    />
                  </div>
                </div>
                
                <button 
                  onClick={() => setExpandedLang(expandedLang === lang.name ? null : lang.name)}
                  className="mt-3 flex items-center gap-2 text-sm text-secondary hover:text-brand-orange transition-colors"
                >
                  {expandedLang === lang.name ? "Hide details" : "Show details"}
                  <motion.div
                    animate={{ rotate: expandedLang === lang.name ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{ 
                    height: expandedLang === lang.name ? "auto" : 0,
                    opacity: expandedLang === lang.name ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 mt-2 bg-[var(--input-bg)] rounded-xl border border-[var(--border-color)] w-full">
                    <p className="text-sm text-secondary leading-relaxed">{lang.details}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}