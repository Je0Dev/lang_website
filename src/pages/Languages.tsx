import React from "react";
import { motion } from "motion/react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext, LanguageContext } from "../context";
import { ColoredText } from "../components/ColoredText";
import { SectionLabel } from "../components/SectionLabel";
import { Mascot } from "../components/Mascot";
import { GraduationCap, Target, ChevronDown } from "lucide-react";
import { uiLanguages, learningLanguages } from "../data/languages";

const LinkedColoredText = ({ children, colorClass, to }: { children: React.ReactNode; colorClass: string; to: string }) => (
  <Link to={to} className={`${colorClass} font-bold hover:opacity-80 transition-opacity inline-block`}>
    {children}
  </Link>
);

const GradientFlagButton = ({ flag, colors, progress }: { flag: string; colors: string[]; progress: number; level: string }) => (
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
  const { setCursorColor } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);

  const renderLanguageCard = (lang: any, i: number, accentColor: string) => (
    <motion.div
      key={lang.name}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      onMouseEnter={() => setCursorColor(lang.colors[0])}
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
          <span className="font-black text-sm text-white">{lang.name}</span>
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
        className={`mt-3 flex items-center gap-2 text-sm text-secondary hover:${accentColor} transition-colors`}
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
        className="overflow-hidden w-full"
      >
        <div className="p-4 mt-2 bg-brand-dark/50 rounded-xl border border-white/10 w-full">
          <p className="text-sm text-secondary leading-relaxed mb-4">{lang.details}</p>
          {lang.levels && lang.levels.length > 0 && (
            <div className="space-y-3">
              {lang.levels.map((lvl: any, idx: number) => (
                <div key={idx} className="border-t border-white/5 pt-3">
                  <div className="text-xs font-bold text-brand-teal mb-1">{lvl.level}</div>
                  <p className="text-xs text-tertiary mb-2">{lvl.description}</p>
                  {lvl.resources && lvl.resources.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {lvl.resources.map((res: any, rIdx: number) => (
                        <a
                          key={rIdx}
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] bg-white/5 hover:bg-white/10 text-white/70 px-2 py-1 rounded transition-colors"
                        >
                          {res.text}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );

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

        <div className="mb-24">
          <h3 className="text-2xl font-black mb-12 flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-brand-teal" />
            <LinkedColoredText to="/resources" colorClass="text-brand-teal hover:underline">{t("Known Languages")}</LinkedColoredText>
          </h3>

          <div className="grid md:grid-cols-3 gap-12">
            {uiLanguages.map((lang, i) => renderLanguageCard(lang, i, "text-brand-teal"))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-black mb-12 flex items-center gap-3">
            <Target className="w-8 h-8 text-brand-orange" />
            <LinkedColoredText to="/blog" colorClass="text-brand-orange hover:underline">{t("Currently Learning")}</LinkedColoredText>
          </h3>

          <div className="grid md:grid-cols-2 gap-12">
            {learningLanguages.map((lang, i) => renderLanguageCard(lang, i, "text-brand-orange"))}
          </div>
        </div>
      </div>
    </div>
  );
}
