import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext, LanguageContext } from "../context";
import { ColoredText } from "../components/ColoredText";
import { SectionLabel } from "../components/SectionLabel";
import { Mascot } from "../components/Mascot";
import { Cloud } from "../components/Cloud";
import { GraduationCap, MessageCircle, Zap, ArrowUpRight, X, Calendar, Target, BookOpen, Globe, ChevronRight, ExternalLink } from "lucide-react";

interface JourneyItem {
  id: number;
  title: string;
  company: string;
  period: string;
  desc: string;
  longDesc: string;
  icon: React.ReactNode;
  color: string;
  textColor: string;
  hex: string;
  links?: { text: string; url: string }[];
}

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

  const experiences: JourneyItem[] = [
    {
      id: 1,
      title: "Advanced Fluency (C1-C2)",
      company: "The Final Boss",
      period: "Endgame",
      desc: "This is the stage where you breathe and think like a native.",
      longDesc: `This is the stage where you breathe and think like a native. You've proven your commitment, and now it's about refining your skills to near-native levels.

**What it means:**
• Complex conversations without hesitation
• Reading literature and technical documents
• Expressing nuanced opinions
• Thinking directly in the target language

**My approach:**
• Native media consumption (movies, podcasts, books)
• Writing practice (journals, essays)
• Speaking with native speakers regularly
• Focusing on idioms and colloquialisms

**Resources:**
• Advanced grammar books
• Native literature (start with simplier works)
• Discussion groups and forums
• Language exchange partners

In my opinion, chasing the C2 diploma isn't always worth it—fluency matters more than certification. You've come so far; one last push remains!`,
      icon: <GraduationCap className="w-10 h-10" />,
      color: "bg-brand-blue",
      textColor: "text-brand-blue",
      hex: "#1cb0f6",
      links: [
        { text: "TED Talks", url: "https://www.ted.com/talks" },
        { text: "The Economist", url: "https://www.economist.com/podcasts" }
      ]
    },
    {
      id: 2,
      title: "Intermediate Plateau (B1-B2)",
      company: "Getting Deeper",
      period: "After mastering the basics",
      desc: "This is where things get serious. Immersion becomes crucial.",
      longDesc: `This is where things get serious. Immersion through vocabulary that's actually being used in real contexts becomes crucial.

**What it means:**
• Can hold conversations on familiar topics
• Understand main ideas of complex texts
• Deal with most situations while traveling
• Write clear, detailed texts

**My approach:**
• 70% input, 30% active study ratio
• Start watching TV shows without subtitles
• Read graded readers and simple novels
• Practice speaking with language partners

**Resources:**
• Netflix with target language (Dark, Money Heist)
• Graded readers (Mandarin Companion, easy readers)
• Grammar books for intermediate learners
• Language exchange apps (Tandem, HelloTalk)

This is the make-or-break phase where many learners plateau—push through it! The key is consistent daily immersion even if it's just 30 minutes.`,
      icon: <MessageCircle className="w-10 h-10" />,
      color: "bg-brand-green",
      textColor: "text-brand-green",
      hex: "#58cc02",
      links: [
        { text: "Easy Languages YouTube", url: "https://www.youtube.com" },
        { text: "Language Transfer", url: "https://www.languagetransfer.org" }
      ]
    },
    {
      id: 3,
      title: "The Beginning (A1-A2)",
      company: "First Steps",
      period: "When you have time",
      desc: "Just start—10 or 30 minutes doesn't matter. Be consistent.",
      longDesc: `Just start—10 or 30 minutes doesn't matter. Be consistent and set mini goals to progress from the beginner phase.

**What it means:**
• Can introduce yourself and others
• Ask and answer questions about personal details
• Interact in a simple way if the other person talks slowly
• Understand familiar names, words, and basic phrases

**My approach:**
• Start with pronunciation (this is crucial!)
• Learn the 1000 most common words
• Use spaced repetition (Anki)
• Don't worry about grammar initially
• Focus on patterns, not rules

**Resources:**
• YouTube tutorials for basics
• Duolingo or similar apps for gamification
• Basic grammar books
• Children's shows (easier to follow)
• Music in target language

You really don't need to spend money when just starting out. If you can't find time to scavenge the internet, use apps that connect you with native speakers from day one. The most important thing is to START!`,
      icon: <Zap className="w-10 h-10" />,
      color: "bg-brand-purple",
      textColor: "text-brand-purple",
      hex: "#ce82ff",
      links: [
        { text: "Anki", url: "https://apps.ankiweb.net" },
        { text: "Basic Phrasebooks", url: "https://www.amazon.com" }
      ]
    },
  ];

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