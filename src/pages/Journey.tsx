import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext, LanguageContext } from "../context";
import { ColoredText } from "../components/ColoredText";
import { SectionLabel } from "../components/SectionLabel";
import { Mascot } from "../components/Mascot";
import { Cloud } from "../components/Cloud";
import { journeyItems, type JourneyItem } from "../data/milestones.tsx";
import { X, Calendar, ChevronRight, ExternalLink, Target } from "lucide-react";

export function JourneyPage() {
  const [selectedJourney, setSelectedJourney] = useState<JourneyItem | null>(null);
  const { setCursorColor } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedJourney) return;
      
      if (e.key === "Escape") {
        setSelectedJourney(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedJourney]);

const experiences = journeyItems;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedJourney) {
        setSelectedJourney(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedJourney]);

  return (
    <div className="min-h-screen py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 relative">
          <Mascot color="bg-brand-purple" position="left-20 top-10" delay={3} type="star" />
          <Cloud position="right-0 top-0" delay={2} />
          <SectionLabel text={t("UNIT 3 - The Timeline as I See It")} colorClass="bg-brand-purple" hoverGif="https://i.gifer.com/4Jnt.gif" />
          <h2 className="text-4xl md:text-6xl font-black mt-6 mb-4">
            <ColoredText colorClass="text-brand-blue">{t("The Journey").split(' ')[0]}</ColoredText> <ColoredText colorClass="text-brand-purple"> {t("The Journey").split(' ').slice(1).join(' ')}</ColoredText>
          </h2>
          <p className="text-secondary max-w-xl mx-auto">
          {t("The 3 Big Checkpoints").split(' ')[0]} <ColoredText to="/milestones" colorClass="text-brand-blue hover:underline">{t("The 3 Big Checkpoints").split(' ').slice(1).join(' ')}</ColoredText>.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onMouseEnter={() => setCursorColor(exp.hex)}
              onMouseLeave={() => setCursorColor("#1cb0f6")}
              whileHover={{ scale: 1.01 }}
              className="duo-card flex flex-col md:flex-row items-center gap-8 group hover:bg-[var(--input-bg)] transition-colors cursor-pointer"
              onClick={() => setSelectedJourney(exp)}
            >
              <div className={`w-20 h-20 rounded-2xl ${exp.color} flex items-center justify-center text-white shadow-[0_6px_0_0_rgba(0,0,0,0.3)] group-hover:scale-110 transition-transform`}>
                {exp.icon}
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h3 className="text-2xl font-black">
                    <ColoredText colorClass={exp.textColor}>{exp.title}</ColoredText>
                  </h3>
                  <span className="text-brand-yellow font-bold flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {exp.period}
                  </span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <h4 className="text-secondary font-bold">{exp.company}</h4>
                  <span className="text-brand-pink flex items-center gap-1 text-xs font-bold">
                    Click for details <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
                <p className="text-secondary">{exp.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/milestones" className="duo-button duo-button-yellow inline-flex items-center gap-2">
            <Target className="w-5 h-5" />
            View All Milestones
          </Link>
        </div>
      </div>

      {selectedJourney && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-darker/90 backdrop-blur-sm"
          onClick={() => setSelectedJourney(null)}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-3xl bg-[var(--nav-bg)] rounded-3xl border-4 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ borderColor: selectedJourney.hex }}
          >
            <div 
              className="h-2 w-full"
              style={{ background: `linear-gradient(90deg, ${selectedJourney.hex}, ${selectedJourney.hex}80)` }}
            />
            
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl ${selectedJourney.color} flex items-center justify-center text-white shadow-lg`}>
                    {selectedJourney.icon}
                  </div>
                  <div>
                    <h3 className="text-3xl font-black">{selectedJourney.title}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-secondary font-bold flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        {selectedJourney.company}
                      </span>
                      <span className="text-brand-yellow font-bold flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {selectedJourney.period}
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedJourney(null)}
                  className="w-10 h-10 rounded-full bg-[var(--input-bg)] flex items-center justify-center hover:bg-brand-pink hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 mb-8">
                {selectedJourney.longDesc.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('**') && paragraph.includes('**')) {
                    const title = paragraph.replace(/\*\*/g, '');
                    return <h4 key={idx} className="text-xl font-black text-brand-teal">{title}</h4>;
                  }
                  if (paragraph.startsWith('•')) {
                    return (
                      <ul key={idx} className="list-disc pl-6 space-y-2 text-secondary">
                        {paragraph.split('\n').map((item, i) => (
                          <li key={i}>{item.replace('• ', '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={idx} className="text-secondary leading-relaxed">{paragraph}</p>;
                })}
              </div>

              {selectedJourney.links && selectedJourney.links.length > 0 && (
                <div className="mb-6 pt-6 border-t border-[var(--border-color)]">
                  <h5 className="font-bold text-sm text-tertiary uppercase tracking-widest mb-4">Related Resources</h5>
                  <div className="flex flex-wrap gap-3">
                    {selectedJourney.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--input-bg)] rounded-xl hover:bg-brand-blue/20 hover:text-brand-blue transition-colors text-sm font-bold"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {link.text}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-[var(--border-color)] text-center">
                <p className="text-xs text-tertiary mb-3">
                  Press <kbd className="bg-[var(--input-bg)] px-2 py-1 rounded mx-1">Esc</kbd> to close
                </p>
                <button 
                  onClick={() => setSelectedJourney(null)}
                  className="duo-button duo-button-blue"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}