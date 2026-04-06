import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext, LanguageContext } from "../context";
import { ColoredText } from "../components/ColoredText";
import { SectionLabel } from "../components/SectionLabel";
import { Mascot } from "../components/Mascot";
import { MessageCircle, Headphones, BookOpen, Mic, X, GraduationCap, ExternalLink, ChevronDown, ChevronUp, ArrowUp } from "lucide-react";

interface LanguageLevel {
  level: string;
  description: string;
  resources: { text: string; url: string }[];
  blogLinks: { text: string; url: string }[];
}

interface LanguageDetail {
  name: string;
  flag: string;
  level: string;
  progress: number;
  colors: string[];
  details: string;
  levels: LanguageLevel[];
}

export function Hero() {
  const [isJumping, setIsJumping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageDetail | null>(null);
  const [expandedLanguages, setExpandedLanguages] = useState<string[]>([]);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedTip, setSelectedTip] = useState<{title: string; icon: React.ReactNode; color: string; colorHex: string; borderColor: string; content: string; points: string[]; links: {text: string; url: string}[]} | null>(null);
  const { setCursorColor } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);
  const navigate = useNavigate();

  const tipsData = [
    {
      title: t("Conversation is the key to Fluency"),
      key: "conversation",
      icon: <MessageCircle className="w-10 h-10" />,
      color: "text-brand-green",
      colorHex: "#58cc02",
      borderColor: "duo-border-green",
      content: "Conversation is the key to fluency because it forces you to think on your feet. Speaking with native speakers helps you internalize grammar patterns naturally and build confidence.",
      points: [
        "Find language exchange partners",
        "Practice with native speakers daily",
        "Don't fear making mistakes",
        "Focus on communication over perfection"
      ],
      links: [
        { text: "How to Start Learning German", url: "/blog" },
        { text: "Building a Language Routine", url: "/blog" },
        { text: "The Power of Anki", url: "/blog" }
      ]
    },
    {
      title: t("Immersion is the hardest part, but the most rewarding"),
      key: "immersion",
      icon: <Headphones className="w-10 h-10" />,
      color: "text-brand-pink",
      colorHex: "#ff4b4b",
      borderColor: "duo-border-pink",
      content: "Immersion is challenging because it requires constant exposure to the target language. But the rewards are immense - you'll develop an ear for natural speech patterns and improve rapidly.",
      points: [
        "Watch movies/TV in target language",
        "Listen to podcasts daily",
        "Change phone language to target",
        "Read books in the language"
      ],
      links: [
        { text: "Best German Movies", url: "/blog" },
        { text: "Spanish TV Series", url: "/blog" },
        { text: "Language Learning Books", url: "/blog" }
      ]
    },
    {
      title: t("Don't try to master Grammar, just have solid foundations"),
      key: "grammar",
      icon: <BookOpen className="w-10 h-10" />,
      color: "text-brand-blue",
      colorHex: "#1cb0f6",
      borderColor: "duo-border-blue",
      content: "Grammar is important, but you don't need to master it to communicate. Having solid foundations is enough - you'll learn the rest naturally through input and practice.",
      points: [
        "Learn core structures first",
        "Don't memorize every rule",
        "Use grammar as a guide, not a law",
        "Trust the input method"
      ],
      links: [
        { text: "Mastering English: Beyond Grammar", url: "/blog" },
        { text: "The Spanish Odyssey", url: "/blog" },
        { text: "The Mandarin Mission", url: "/blog" }
      ]
    },
    {
      title: t("Pronunciation is key, but not the goal"),
      key: "pronunciation",
      icon: <Mic className="w-10 h-10" />,
      color: "text-brand-purple",
      colorHex: "#ce82ff",
      borderColor: "duo-border-purple",
      content: "Good pronunciation helps you be understood, but it's not the ultimate goal. Focus on communication first - you can always refine your accent later.",
      points: [
        "Listen to native speakers",
        "Practice tongue positions",
        "Use shadowing technique",
        "Record yourself and compare"
      ],
      links: [
        { text: "How to Start Learning German", url: "/blog" },
        { text: "Building a Language Routine", url: "/blog" },
        { text: "Resources Page", url: "/resources" }
      ]
    }
  ];

  const toggleLanguageExpand = (name: string) => {
    setExpandedLanguages(prev => 
      prev.includes(name) 
        ? prev.filter(n => n !== name)
        : [...prev, name]
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const uiLanguages: LanguageDetail[] = [
    { 
      name: "Greek", 
      flag: "🇬🇷", 
      level: "Native", 
      progress: 100, 
      colors: ["#001489", "#0D5EAF"], 
      details: "My mother tongue. The foundation of my linguistic journey.",
      levels: [
        {
          level: "Native",
          description: "Born and raised in Greece, Greek is my natural language.",
          resources: [
            { text: "Ελληνικά Radio", url: "https://www.radio.gr/" },
            { text: "Greek News", url: "https://www.in.gr/" }
          ],
          blogLinks: []
        }
      ]
    },
    { 
      name: "English", 
      flag: "🇬🇧", 
      level: "C1", 
      progress: 95, 
      colors: ["#012169", "#C8102E"], 
      details: "Acquired through immersion. C1 certified.",
      levels: [
        {
          level: "B2 - Advanced",
          description: "Can understand complex texts and express ideas fluently.",
          resources: [
            { text: "TED Talks", url: "https://www.ted.com/talks" },
            { text: "The Economist", url: "https://www.economist.com/podcasts" },
            { text: "Lingolia", url: "https://english.lingolia.com/en/" }
          ],
          blogLinks: [
            { text: "Mastering English: Beyond Grammar", url: "/blog" }
          ]
        },
        {
          level: "C1 - Mastery",
          description: "Native-level comprehension and expression.",
          resources: [
            { text: "Cambridge Dictionary", url: "https://dictionary.cambridge.org/" },
            { text: "YouGlish", url: "https://youglish.com/" }
          ],
          blogLinks: []
        }
      ]
    },
    { 
      name: "German", 
      flag: "🇩🇪", 
      level: "B2", 
      progress: 75, 
      colors: ["#DD0000", "#000000"], 
      details: "Goethe B2 certified. Working towards C1.",
      levels: [
        {
          level: "A1-A2",
          description: "Basic communication and everyday situations.",
          resources: [
            { text: "Nicos Weg (DW)", url: "https://learngerman.dw.com/en/nicos-weg/c-36519789" },
            { text: "Duolingo German", url: "https://duolingo.com" }
          ],
          blogLinks: [
            { text: "How to Start Learning German", url: "/blog" }
          ]
        },
        {
          level: "B1-B2",
          description: "Intermediate - handle most situations while traveling.",
          resources: [
            { text: "Easy German", url: "https://www.youtube.com/@easygerman" },
            { text: "Slow German", url: "https://slowgerman.com/" },
            { text: "Nachrichten Leicht", url: "https://www.nachrichtenleicht.de/" }
          ],
          blogLinks: [
            { text: "German Movies for Learners", url: "/blog" }
          ]
        },
        {
          level: "C1",
          description: "Advanced - near-native proficiency.",
          resources: [
            { text: "Dark (Netflix)", url: "https://www.netflix.com/title/80100123" },
            { text: "Lingolia Grammar", url: "https://www.lingolia.de/" }
          ],
          blogLinks: []
        }
      ]
    },
  ];

  const learningLanguages: LanguageDetail[] = [
    { 
      name: "Spanish", 
      flag: "🇪🇸", 
      level: "A2", 
      progress: 30, 
      colors: ["#AA151B", "#F1BF00"], 
      details: "Started with Dreaming Spanish. Currently building foundations.",
      levels: [
        {
          level: "A1-A2",
          description: "Beginner basics and simple conversations.",
          resources: [
            { text: "Dreaming Spanish", url: "https://www.dreamingspanish.com/" },
            { text: "Duolingo Spanish", url: "https://duolingo.com" },
            { text: "Coffee Break Spanish", url: "https://coffeebreakacademies.com/coffee-break-spanish/" }
          ],
          blogLinks: [
            { text: "The Spanish Odyssey", url: "/blog" }
          ]
        },
        {
          level: "B1-B2",
          description: "Intermediate - can hold conversations on familiar topics.",
          resources: [
            { text: "Hoy Hablamos", url: "https://www.hoyhablamos.com/" },
            { text: "Luisito Comunica", url: "https://www.youtube.com/@LuisitoComunica" }
          ],
          blogLinks: [
            { text: "Spanish TV Series", url: "/blog" }
          ]
        }
      ]
    },
    { 
      name: "Chinese", 
      flag: "🇨🇳", 
      level: "Beginner", 
      progress: 5, 
      colors: ["#DE2910", "#FFDE00"], 
      details: "Focusing on Pinyin and tones before characters.",
      levels: [
        {
          level: "HSK 1-2",
          description: "Basic vocabulary and sentence structures.",
          resources: [
            { text: "HelloChinese", url: "https://www.hellochinese.cc/" },
            { text: "Anki HSK", url: "https://ankiweb.net/shared/decks/chinese" }
          ],
          blogLinks: [
            { text: "The Mandarin Mission", url: "/blog" }
          ]
        },
        {
          level: "HSK 3-5",
          description: "Intermediate - handling everyday situations.",
          resources: [
            { text: "Mandarin Companion", url: "https://mandarincompanion.com/" },
            { text: "Skritter", url: "https://skritter.com/" }
          ],
          blogLinks: []
        }
      ]
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !selectedLanguage) {
        e.preventDefault();
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 500);
      }
      if (e.key === "Escape" && selectedLanguage) {
        setSelectedLanguage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedLanguage]);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto"
      >
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onMouseEnter={() => setCursorColor("#1cb0f6")}
            onMouseLeave={() => setCursorColor("#1cb0f6")}
          >
            <SectionLabel text={t("UNIT 0: THE BEGINNING")} colorClass="bg-brand-blue" hoverGif="https://i.gifer.com/4Jnt.gif" />
            <h1 className="text-5xl md:text-8xl font-black leading-tight mb-6">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <ColoredText colorClass="text-brand-blue">{t("Personal Language Learning")}</ColoredText>
              </motion.span>
              <br />
              <ColoredText colorClass="text-brand-green">{t("Tips")}</ColoredText>
            </h1>
            <p className="text-xl text-secondary mb-8 max-w-lg leading-relaxed">
              <ColoredText to="/resources" colorClass="text-brand-blue">Exploring</ColoredText> languages, <ColoredText to="/journey" colorClass="text-brand-green">cultures</ColoredText>, and <ColoredText to="/blog" colorClass="text-brand-pink">continuous learning</ColoredText>.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <button 
                onClick={() => {
                  setIsJumping(true);
                  setTimeout(() => setIsJumping(false), 500);
                }}
                className="duo-button duo-button-blue"
                aria-label={isJumping ? t("Wow!") : t("Press Space")}
              >
                {isJumping ? t("Wow!") : t("Press Space")}
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative mt-16"
            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
            animate={{ 
              opacity: 1, 
              scale: isJumping ? 1.1 : 1, 
              rotate: isJumping ? -1 : 0,
              y: isJumping ? -20 : 0
            }}
            transition={{ 
              duration: isJumping ? 0.2 : 1, 
              type: "spring",
              stiffness: 500
            }}
          >
            <Mascot color="bg-brand-pink" position="-top-20 -left-30" delay={0} type="star" />
            <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {tipsData.map((tip, idx) => (
                <motion.div 
                  key={tip.key}
                  whileHover={{ y: -10, scale: 1.02 }} 
                  onMouseEnter={() => setCursorColor(tip.colorHex)}
                  onMouseLeave={() => setCursorColor("#1cb0f6")}
                  className={`duo-card ${tip.borderColor} cursor-pointer`}
                  style={{ transform: `rotate(${idx % 2 === 0 ? '-3deg' : '2deg'})` }}
                  onClick={() => setSelectedTip(tip)}
                >
                  <div className={tip.color}>{tip.icon}</div>
                  <div 
                    className="inline-block mt-2 px-3 py-1 rounded-lg font-black text-sm"
                    style={{ backgroundColor: tip.colorHex, color: '#000', textShadow: '1px 1px 0 rgba(255,255,255,0.3)' }}
                  >
                    {tip.key === 'conversation' && '💬 Conversation'}
                    {tip.key === 'immersion' && '🎧 Immersion'}
                    {tip.key === 'grammar' && '📝 Grammar'}
                    {tip.key === 'pronunciation' && '🎤 Pronunciation'}
                  </div>
                  <div 
                    className="inline-block mt-2 px-3 py-1.5 rounded-xl font-bold text-xs cursor-pointer transition-all hover:translate-y-0.5"
                    style={{ 
                      backgroundColor: 'var(--input-bg)', 
                      color: tip.colorHex,
                      boxShadow: '0 2px 0 var(--border-color)'
                    }}
                  >
                    Check more →
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div 
              animate={{ 
                scale: [1, 1, 1],
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-blue/10 blur-[100px] rounded-full -z-10" 
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="max-w-7xl mx-auto mt-16"
          >
            <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-brand-teal" />
              <ColoredText colorClass="text-brand-teal">{t("Known Languages")}</ColoredText>
            </h3>
            <div className="space-y-4">
              {[...uiLanguages, ...learningLanguages].map((lang, i) => {
                const isExpanded = expandedLanguages.includes(lang.name);
                return (
                  <motion.div
                    key={lang.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="duo-card overflow-hidden"
                    style={{ borderColor: lang.colors[0] }}
                  >
                    <div 
                      className="flex items-center justify-between p-4 cursor-pointer"
                      onClick={() => toggleLanguageExpand(lang.name)}
                      onMouseEnter={() => setCursorColor(lang.colors[0])}
                      onMouseLeave={() => setCursorColor("#1cb0f6")}
                    >
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-[0_4px_0_0_rgba(0,0,0,0.2)]"
                          style={{
                            background: `linear-gradient(135deg, ${lang.colors[0]} 0%, ${lang.colors[1]} 100%)`,
                          }}
                        >
                          {lang.flag}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-black text-lg" style={{ color: lang.colors[0] }}>{lang.name}</h4>
                            <span 
                              className="px-2 py-0.5 rounded-lg text-xs font-black"
                              style={{ backgroundColor: lang.colors[0], color: '#fff', textShadow: '1px 1px 0 rgba(0,0,0,0.2)' }}
                            >
                              {lang.level}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-secondary">{lang.progress}%</p>
                            <div className="w-20 h-2 bg-[var(--input-bg)] rounded-full overflow-hidden">
                              <div 
                                className="h-full rounded-full shadow-[0_2px_0_0_rgba(0,0,0,0.2)]"
                                style={{
                                  background: `linear-gradient(90deg, ${lang.colors[0]}, ${lang.colors[1]})`,
                                  width: `${lang.progress}%`
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-tertiary">{lang.levels?.length || 0} levels</span>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-tertiary" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-tertiary" />
                        )}
                      </div>
                    </div>
                    
                    {isExpanded && lang.levels && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-[var(--border-color)]"
                      >
                        <div className="p-4 space-y-4">
                          {lang.levels.map((level, idx) => (
                            <div key={idx} className="bg-[var(--input-bg)] rounded-xl p-4">
                              <h5 className="font-black mb-2" style={{ color: lang.colors[0] }}>{level.level}</h5>
                              <p className="text-sm text-secondary mb-3">{level.description}</p>
                              
                              {level.resources.length > 0 && (
                                <div className="mb-2">
                                  <p className="text-xs text-tertiary uppercase tracking-widest mb-2">Resources</p>
                                  <div className="flex flex-wrap gap-2">
                                    {level.resources.map((res, rIdx) => (
                                      <a
                                        key={rIdx}
                                        href={res.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 px-3 py-1 bg-[var(--nav-bg)] rounded-lg text-xs font-bold hover:bg-brand-blue/20 hover:text-brand-blue transition-colors"
                                      >
                                        {res.text}
                                        <ExternalLink className="w-3 h-3" />
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {level.blogLinks.length > 0 && (
                                <div>
                                  <p className="text-xs text-tertiary uppercase tracking-widest mb-2">Related Posts</p>
                                  <div className="flex flex-wrap gap-2">
                                    {level.blogLinks.map((link, lIdx) => (
                                      <a
                                        key={lIdx}
                                        href={link.url}
                                        onClick={(e) => {
                                          e.preventDefault();
                                          navigate(link.url);
                                        }}
                                        className="flex items-center gap-1 px-3 py-1 bg-[var(--nav-bg)] rounded-lg text-xs font-bold hover:bg-brand-pink/20 hover:text-brand-pink transition-colors"
                                      >
                                        {link.text}
                                        <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: showBackToTop ? 1 : 0 }}
            style={{ pointerEvents: showBackToTop ? "auto" : "none" }}
          >
            <ArrowUp className="w-6 h-6 text-brand-dark" />
          </motion.button>

          {selectedTip && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setSelectedTip(null)}
                className="absolute inset-0 bg-brand-darker/90 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="relative w-full max-w-2xl bg-[var(--nav-bg)] rounded-3xl border-4 shadow-[0_12px_0_0_rgba(0,0,0,0.3)] overflow-hidden max-h-[90vh] flex flex-col"
                style={{ borderColor: selectedTip.colorHex }}
              >
                <div className="h-2 shrink-0" style={{ background: selectedTip.colorHex }} />
                <div className="p-8 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 20px)' }}>
                  <div className="flex items-center justify-between mb-6 shrink-0">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-[0_4px_0_0_rgba(0,0,0,0.2)]"
                        style={{ background: selectedTip.colorHex }}
                      >
                        <div className="text-white">{selectedTip.icon}</div>
                      </div>
                      <div>
                        <div 
                          className="inline-block px-3 py-1 rounded-lg font-black text-sm mb-1"
                          style={{ backgroundColor: selectedTip.colorHex, color: '#000', textShadow: '1px 1px 0 rgba(255,255,255,0.3)' }}
                        >
                          {selectedTip.key === 'conversation' && '💬 Conversation'}
                          {selectedTip.key === 'immersion' && '🎧 Immersion'}
                          {selectedTip.key === 'grammar' && '📝 Grammar'}
                          {selectedTip.key === 'pronunciation' && '🎤 Pronunciation'}
                        </div>
                        <p className="text-sm text-tertiary">Click outside to close</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedTip(null)}
                      className="w-10 h-10 rounded-xl bg-[var(--input-bg)] flex items-center justify-center hover:bg-brand-pink hover:text-white transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <p className="text-lg text-secondary leading-relaxed mb-6">
                    {selectedTip.content}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-black uppercase tracking-widest text-tertiary mb-3">Key Points</h4>
                    <div className="space-y-2">
                      {selectedTip.points.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-3 bg-[var(--input-bg)] rounded-xl border-2 border-brand-dark/10 shadow-[0_2px_0_0_var(--border-color)]">
                          <span className="text-lg font-bold" style={{ color: selectedTip.colorHex }}>•</span>
                          <span className="text-sm font-bold text-secondary">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-widest text-tertiary mb-3">Related Content</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {selectedTip.links.map((link, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            if (link.url.startsWith('/')) {
                              navigate(link.url);
                              setSelectedTip(null);
                            } else {
                              window.open(link.url, '_blank');
                            }
                          }}
                          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-transparent hover:border-brand-dark/20 transition-all font-bold text-sm shadow-[0_4px_0_0_var(--border-color)] hover:shadow-[0_2px_0_0_var(--border-color)] hover:translate-y-0.5 active:shadow-none active:translate-y-1"
                          style={{ backgroundColor: selectedTip.colorHex, color: selectedTip.key === 'pronunciation' ? '#fff' : '#000' }}
                        >
                          {link.text}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
      </motion.div>
    </div>
  );
}