import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext, LanguageContext } from "../context";
import { ColoredText } from "../components/ColoredText";
import { SectionLabel } from "../components/SectionLabel";
import { Mascot } from "../components/Mascot";
import { Cloud } from "../components/Cloud";
import { GraduationCap, Globe, BookOpen, ChevronRight, ChevronLeft, Zap, MessageCircle, ArrowUpRight, Calendar, Target, Clock, X, ExternalLink } from "lucide-react";

interface Project {
  title: string;
  desc: string;
  color: string;
  icon: React.ReactNode;
  tag: string;
  labelColor: string;
  category: string;
  longDesc: string;
  date: string;
  links?: { text: string; url: string }[];
}

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
  highlights: string[];
  tips: string[];
}

interface JourneyCardProps {
  exp: JourneyItem;
  i: number;
  setCursorColor: (color: string) => void;
  setSelectedJourney: (item: JourneyItem | null) => void;
  key?: React.Key;
}

function JourneyCard({ exp, i, setCursorColor, setSelectedJourney }: JourneyCardProps) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <motion.div
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
        <h3 className={`text-2xl font-black ${exp.textColor}`}>{exp.title}</h3>
        <p className="text-secondary mt-1">{exp.company} • {exp.period}</p>
        <p className="text-sm text-tertiary mt-2">{exp.desc}</p>
        <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
          {exp.highlights.slice(0, 3).map((h, idx) => (
            <span key={idx} className="text-xs px-2 py-1 bg-[var(--input-bg)] rounded-lg text-tertiary">• {h}</span>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowPreview(!showPreview);
          }}
          className={`py-2 px-4 rounded-xl border-2 border-transparent hover:border-brand-dark/20 transition-all font-bold text-sm ${exp.color} text-white shadow-[0_4px_0_0_rgba(0,0,0,0.3)] hover:shadow-[0_2px_0_0_rgba(0,0,0,0.3)] hover:translate-y-0.5 active:shadow-none active:translate-y-1`}
        >
          {showPreview ? "▲ Hide" : "▼ Preview"}
        </button>
        {showPreview && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="mt-2 p-3 bg-[var(--input-bg)] rounded-xl border-2 border-brand-dark/20"
          >
            <p className="text-xs font-bold text-tertiary mb-2">Key Points:</p>
            <ul className="text-xs text-secondary space-y-1">
              {exp.highlights.map((h, idx) => (
                <li key={idx} className="flex items-start gap-1">
                  <span className={exp.textColor}>•</span> {h}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
      <ChevronRight className="w-8 h-8 text-tertiary group-hover:text-brand-blue transition-colors" />
    </motion.div>
  );
}

export function MilestonesPage() {
  const [filter, setFilter] = useState<string[]>(["ALL"]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedJourney, setSelectedJourney] = useState<JourneyItem | null>(null);
  const [activeTab, setActiveTab] = useState<"milestones" | "journey">("milestones");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showDetails, setShowDetails] = useState<{ [key: string]: boolean }>({});
  const { setCursorColor } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);

  const getPreviewText = (index: number) => {
    const texts = ["Preview", "Quick look", "Sneak peek", "Teaser", " peek"];
    return texts[index % texts.length];
  };

  const toggleProjectDetails = (key: string) => {
    setShowDetails(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const allCategories = ["ALL", "CERTIFICATE", "IMMERSION", "CHALLENGE", "MAINTENANCE", "LEARNING", "ACHIEVEMENT", "EVENT", "JOURNEY"];

  const toggleFilter = (cat: string) => {
    if (cat === "ALL") {
      setFilter(["ALL"]);
    } else {
      const newFilter = filter.includes(cat) 
        ? filter.filter(f => f !== cat)
        : [...filter.filter(f => f !== "ALL"), cat];
      setFilter(newFilter.length === 0 ? ["ALL"] : newFilter);
    }
  };

  const projects: Project[] = [
    {
      title: "Goethe Zertifikat B2",
      desc: "Passed the official German language certification. A significant milestone achieved through dedicated study and immersion.",
      color: "duo-border-green",
      icon: <GraduationCap className="text-brand-green" />,
      tag: "CERTIFICATE",
      labelColor: "bg-brand-green",
      category: "CERTIFICATE",
      longDesc: "After years of consistent study, I finally achieved my goal of passing the Goethe-Zertifikat B2 exam. This certification represents a solid intermediate level in German. The preparation involved intensive grammar review, vocabulary building through Anki, and daily immersion through podcasts and Netflix. The next goal is the C1 Sprachdiplom to reach advanced proficiency.",
      date: "2024",
      links: [{ text: "Goethe Institute", url: "https://www.goethe.de/" }]
    },
    {
      title: "German Immersion",
      desc: "Daily consumption of German content including films, series, video games, articles, and textbooks.",
      color: "duo-border-yellow",
      icon: <Globe className="text-brand-yellow" />,
      tag: "IMMERSION",
      labelColor: "bg-brand-yellow",
      category: "IMMERSION",
      longDesc: "Immersion is the cornerstone of my German learning journey. I consume German content daily through various mediums: Netflix series like 'Dark' and 'How to Sell Drugs Online', YouTube channels like 'Easy German', podcasts like 'Nachrichtenleicht' for listening practice, and video games in German. I've visited Frankfurt a few times, but the real progress comes from consistent daily immersion. The key is to make German a part of your daily life, even if you can't live in a German-speaking country.",
      date: "Ongoing",
      links: [{ text: "Easy German YouTube", url: "https://www.youtube.com/@easygerman" }, { text: "Dark Netflix", url: "https://www.netflix.com/title/80100123" }]
    },
    {
      title: "Spanish Journey",
      desc: "Currently building foundations in Spanish through comprehensible input and consistent practice.",
      color: "duo-border-pink",
      icon: <BookOpen className="text-brand-pink" />,
      tag: "LEARNING",
      labelColor: "bg-brand-pink",
      category: "CHALLENGE",
      longDesc: "Spanish is my current focus as the next language to add to my toolkit. I started with Dreaming Spanish following the comprehensible input method, which helped develop my 'Spanish ear' before diving into grammar. Currently at A2 level with about 30% progress towards B1. The strategy involves daily input through YouTube, podcasts like 'Hoy Hablamos', and eventually consuming native content. The goal is to reach B2 within the next year.",
      date: "2024-Present"
    },
    {
      title: "Mandarin Challenge",
      desc: "Beginning the journey into Chinese, focusing on tones, Pinyin, and character recognition.",
      color: "duo-border-pink",
      icon: <BookOpen className="text-brand-pink" />,
      tag: "LEARNING",
      labelColor: "bg-brand-pink",
      category: "CHALLENGE",
      longDesc: "Chinese represents the ultimate challenge in my language learning journey. The transition from alphabetic to logographic writing requires a different type of memory. Currently at HSK 1 level with 5% progress. Using HelloChinese for systematic learning and Skritter for character writing practice. The focus is on mastering Pinyin and the four tones before diving deeper into characters. This is a long-term goal requiring patience and persistence.",
      date: "2024-Present",
      links: [{ text: "HelloChinese", url: "https://www.hellochinese.cc/" }, { text: "Skritter", url: "https://skritter.com/" }]
    },
    {
      title: "English Mastery",
      desc: "Maintaining C1 proficiency through daily consumption of podcasts, YouTube, and conversations.",
      color: "duo-border-green",
      icon: <Globe className="text-brand-green" />,
      tag: "MAINTENANCE",
      labelColor: "bg-brand-green",
      category: "IMMERSION",
      longDesc: "English was acquired from a young age through music, movies, and the internet, eventually achieving C1 certification. Now the focus is on maintenance and continuous improvement. Daily consumption includes TED Talks, The Economist podcasts, YouTube tech content, and occasional conversations to keep pronunciation and vocabulary sharp. The key to maintaining a language is using it regularly.",
      date: "Ongoing"
    },
    {
      title: "100-Day Anki Streak",
      desc: "Building vocabulary consistently with daily Anki reviews for over 100 consecutive days.",
      color: "duo-border-teal",
      icon: <GraduationCap className="text-brand-teal" />,
      tag: "STREAK",
      labelColor: "bg-brand-teal",
      category: "ACHIEVEMENT",
      longDesc: "The 100-day streak was a game-changer for my vocabulary. This consistent daily habit helped me build a solid foundation of 2000+ words in German alone. The key was setting a minimum of just 10 cards per day—small enough to never skip, but enough to compound over time. Missing a day meant starting over, which created powerful motivation to maintain the streak.",
      date: "2023"
    },
    {
      title: "First German Conversation",
      desc: "Successfully held a 30-minute conversation entirely in German with a native speaker.",
      color: "duo-border-blue",
      icon: <MessageCircle className="text-brand-blue" />,
      tag: "MILESTONE",
      labelColor: "bg-brand-blue",
      category: "ACHIEVEMENT",
      longDesc: "After 8 months of studying, I finally had my first real conversation in German. It wasn't perfect—there were awkward pauses and mistaken words—but it was exhilarating. The key insight was that you don't need perfect grammar to communicate. Native speakers are patient and appreciative of any effort. This experience motivated me to seek more conversation practice.",
      date: "2023"
    },
    {
      title: "German B1 Breakthrough",
      desc: "Reached B1 level in German after 6 months of intensive study and immersion.",
      color: "duo-border-purple",
      icon: <GraduationCap className="text-brand-purple" />,
      tag: "CERTIFICATE",
      labelColor: "bg-brand-purple",
      category: "CERTIFICATE",
      longDesc: "Reaching B1 was my first major milestone in German. It felt like crossing a threshold where I could finally understand simple conversations, read basic articles, and express myself on familiar topics. The journey from A2 to B1 took about 6 months with 1-2 hours of daily study plus immersion. This gave me the confidence to push for B2.",
      date: "2022"
    },
    {
      title: "Polyglot Conference",
      desc: "Attended my first polyglot conference and connected with fellow language enthusiasts.",
      color: "duo-border-orange",
      icon: <Globe className="text-brand-orange" />,
      tag: "EVENT",
      labelColor: "bg-brand-orange",
      category: "EVENT",
      longDesc: "Attending the Polyglot Conference was eye-opening. Meeting people who speak 10+ languages and hearing their stories and methods inspired me to continue my journey. The key takeaway was that there's no single 'right' way to learn a language—what matters is finding what works for you and staying consistent.",
      date: "2024"
    },
    {
      title: "Language Learning Journey",
      desc: "My complete timeline from beginner to where I am now, with all the ups and downs along the way.",
      color: "duo-border-blue",
      icon: <Target className="text-brand-blue" />,
      tag: "JOURNEY",
      labelColor: "bg-brand-blue",
      category: "JOURNEY",
      longDesc: `My language learning journey began with English as a child, naturally acquired through music, movies, and the internet. German became my first serious target language around 2021, starting from zero. After two years of consistent study and immersion, I achieved B2 certification. Currently, I'm working on Spanish and Chinese as my next challenges.\n\n**Key Phases:**\n\n• **2021-2022**: German A1-B1 - Foundation building with Duolingo, Nicos Weg, and daily YouTube\n• **2022-2023**: German B1-B2 - Intensive study, Anki vocabulary, first conversations, Goethe B2 preparation\n• **2024**: Spanish A1-A2 - Started with Dreaming Spanish, currently building foundations\n• **2024**: Chinese HSK1 - Beginning the Mandarin journey with HelloChinese\n\n**Lessons Learned:**\n\n1. Consistency beats intensity - 30 minutes daily is better than 3 hours once a week\n2. Comprehensible input is king - Start with content you can understand 70-80%\n3. Don't skip grammar entirely - A little goes a long way\n4. Find your method - What works for others might not work for you\n5. Enjoy the process - Language learning is a marathon, not a sprint`,
      date: "2021-Present",
      links: [
        { text: "View Full Journey", url: "/journey" },
        { text: "Nicos Weg", url: "https://learngerman.dw.com/en/nicos-weg/c-36519789" },
        { text: "Dreaming Spanish", url: "https://www.dreamingspanish.com/" }
      ]
    },
  ];

  const experiences: JourneyItem[] = [
    {
      id: 1,
      title: "Advanced Fluency (C1-C2)",
      company: "The Final Boss",
      period: "Endgame",
      desc: "This is the stage where you breathe and think like a native.",
      longDesc: `This is the stage where you breathe and think like a native. You've proven your commitment, and now it's about refining your skills to near-native levels. Complex conversations without hesitation, reading literature and technical documents, expressing nuanced opinions, and thinking directly in the target language.`,
      icon: <GraduationCap className="w-10 h-10" />,
      color: "bg-brand-blue",
      textColor: "text-brand-blue",
      hex: "#1cb0f6",
      links: [
        { text: "TED Talks", url: "https://www.ted.com/talks" },
        { text: "The Economist", url: "https://www.economist.com/podcasts" }
      ],
      highlights: [
        "Complex conversations without hesitation",
        "Reading literature and technical documents",
        "Expressing nuanced opinions",
        "Thinking directly in the target language"
      ],
      tips: [
        "Native media consumption daily",
        "Write practice (journals, essays)",
        "Focus on idioms and colloquialisms",
        "Language exchange partners"
      ]
    },
    {
      id: 2,
      title: "Intermediate Plateau (B1-B2)",
      company: "Getting Deeper",
      period: "After mastering the basics",
      desc: "This is where things get serious. Immersion becomes crucial.",
      longDesc: `This is where things get serious. Immersion through vocabulary that's actually being used in real contexts becomes crucial. Can hold conversations on familiar topics, understand main ideas of complex texts, deal with most situations while traveling, and write clear, detailed texts.`,
      icon: <MessageCircle className="w-10 h-10" />,
      color: "bg-brand-green",
      textColor: "text-brand-green",
      hex: "#58cc02",
      links: [
        { text: "Easy Languages YouTube", url: "https://www.youtube.com" }
      ],
      highlights: [
        "Hold conversations on familiar topics",
        "Understand main ideas of complex texts",
        "Deal with most travel situations",
        "Write clear, detailed texts"
      ],
      tips: [
        "Watch native content with subtitles",
        "Start reading graded readers",
        "Practice writing daily",
        "Find conversation partners"
      ]
    },
    {
      id: 3,
      title: "The Beginning (A1-A2)",
      company: "First Steps",
      period: "When you have time",
      desc: "Just start—10 or 30 minutes doesn't matter. Be consistent.",
      longDesc: `Just start—10 or 30 minutes doesn't matter. Be consistent and set mini goals to progress from the beginner phase. Can introduce yourself and others, ask and answer questions about personal details, interact in a simple way if the other person talks slowly.`,
      icon: <Zap className="w-10 h-10" />,
      color: "bg-brand-purple",
      textColor: "text-brand-purple",
      hex: "#ce82ff",
      highlights: [
        "Introduce yourself and others",
        "Ask/answer personal questions",
        "Simple interactions when spoken slowly",
        "Basic vocabulary of 500-1000 words"
      ],
      tips: [
        "Use Duolingo or similar apps",
        "Watch children's content",
        "Learn core grammar structures",
        "Build daily habit (even 10 min!)"
      ]
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProject) {
        const currentIndex = projects.findIndex(p => p.title === selectedProject.title);
        
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % projects.length;
          setSelectedProject(projects[nextIndex]);
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          const prevIndex = currentIndex <= 0 ? projects.length - 1 : currentIndex - 1;
          setSelectedProject(projects[prevIndex]);
        } else if (e.key === "Escape") {
          setSelectedProject(null);
        }
      }
      
      if (selectedJourney) {
        if (e.key === "Escape") {
          setSelectedJourney(null);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, selectedJourney, projects]);

  const filteredProjects = filter.includes("ALL") || filter.length === 0 
    ? projects 
    : projects.filter(p => filter.includes(p.category));

  return (
    <div className="min-h-screen py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 relative">
          <Mascot color="bg-brand-orange" position="right-10 top-0" delay={2} type="star" />
          <Cloud position="left-0 top-10" delay={1} />
          <SectionLabel text={t("UNIT 2 - Personal Milestones")} colorClass="bg-brand-pink" hoverGif="https://i.gifer.com/4OKl.gif" />
          <h2 className="text-4xl md:text-6xl font-black mt-6 mb-4">
            <ColoredText colorClass="text-brand-pink">{t("Language Victories").split(' ')[0]}</ColoredText> <ColoredText colorClass="text-brand-blue">{t("Language Victories").split(' ').slice(1).join(' ')}</ColoredText>
          </h2>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab("milestones")}
              className={`duo-button ${activeTab === "milestones" ? "duo-button-yellow" : "bg-[var(--input-bg)] text-secondary shadow-none border border-[var(--border-color)]"} py-3 px-8 text-sm font-bold`}
            >
              {t("Milestones")}
            </button>
            <button
              onClick={() => setActiveTab("journey")}
              className={`duo-button ${activeTab === "journey" ? "duo-button-yellow" : "bg-[var(--input-bg)] text-secondary shadow-none border border-[var(--border-color)]"} py-3 px-8 text-sm font-bold`}
            >
              {t("Journey")}
            </button>
          </div>
          
          {activeTab === "milestones" && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleFilter(cat)}
                className={`duo-button ${filter.includes(cat) ? "duo-button-yellow" : "bg-[var(--input-bg)] text-secondary shadow-none border border-[var(--border-color)]"} py-2 px-4 text-xs`}
              >
                {cat}
              </button>
            ))}
          </div>
          )}
        </div>
        
        {activeTab === "milestones" && (
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((p, i) => {
            const hexColor = p.labelColor === "bg-brand-green" ? "#58cc02" : 
                             p.labelColor === "bg-brand-yellow" ? "#ffc800" :
                             p.labelColor === "bg-brand-pink" ? "#ff4b4b" : "#ce82ff";
            
            return (
              <motion.div 
                key={p.title}
                layout
                initial={{ opacity: 0, y: 1 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.1}}
                onMouseEnter={() => setCursorColor(hexColor)}
                onMouseLeave={() => setCursorColor("#1cb0f6")}
                whileHover={{ 
                  y: 0,
                  scale: 1,
                  rotate: i % 2 === 0 ? 1 : -1,
                  boxShadow: `0 30px 60px ${hexColor}33`
                }}
                className={`duo-card ${p.color} flex flex-col bg-[var(--nav-bg)] backdrop-blur-sm overflow-hidden group relative cursor-pointer`}
                onClick={() => setSelectedProject(p)}
              >
                <div className="flex items-start justify-between mb-8">
                  <motion.div 
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    className="w-16 h-16 rounded-2xl bg-[var(--input-bg)] flex items-center justify-center group-hover:bg-[var(--input-bg)] transition-colors"
                  >
                    {p.icon}
                  </motion.div>
                  <span className={`${p.labelColor} text-brand-dark font-black px-3 py-1 rounded-lg text-[10px] uppercase tracking-widest shadow-[0_4px_0_0_rgba(0,0,0,0.2)]`}>
                    {p.tag}
                  </span>
                </div>
                <h3 className="text-3xl font-black mb-4">
                  <ColoredText colorClass={p.labelColor.replace('bg-', 'text-')}>{p.title}</ColoredText>
                </h3>
                <p className="text-lg text-secondary mb-2 flex-grow">
                  {p.desc}
                </p>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleProjectDetails(p.title);
                  }}
                  className="w-full py-2 px-3 text-xs text-tertiary hover:text-brand-yellow transition-colors border border-transparent hover:border-brand-yellow/30 rounded-lg bg-[var(--nav-bg)] hover:bg-[var(--hover-bg)]"
                >
                  {showDetails[p.title] ? "▲ Hide" : `▼ ${getPreviewText(i)}`}
                </button>
                {showDetails[p.title] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="mt-3 p-4 bg-[var(--input-bg)] rounded-xl border-2 border-brand-blue/30"
                  >
                    <p className="text-sm text-secondary mb-3">{p.longDesc.split('\n\n')[0]}</p>
                    <p className="text-xs text-tertiary">
                      {p.category === "CERTIFICATE" && "🏆 Achievement unlocked!"}
                      {p.category === "IMMERSION" && "🌍 Living the language!"}
                      {p.category === "CHALLENGE" && "🔥 Taking on the challenge!"}
                      {p.category === "MAINTENANCE" && "💪 Keeping it fresh!"}
                      {p.category === "ACHIEVEMENT" && "⭐ Another win!"}
                      {p.category === "EVENT" && "🎉 Experience gained!"}
                      {p.category === "JOURNEY" && "🛤️ On the path!"}
                    </p>
                  </motion.div>
                )}
                
                <button
                  onClick={() => setSelectedProject(p)}
                  className={`w-full py-3 px-4 rounded-xl border-2 border-transparent hover:border-brand-dark/20 transition-all font-bold text-sm shadow-[0_4px_0_0_var(--border-color)] hover:shadow-[0_2px_0_0_var(--border-color)] hover:translate-y-0.5 active:shadow-none active:translate-y-1 ${
                    p.category === "CERTIFICATE" ? "bg-brand-green text-brand-dark" :
                    p.category === "IMMERSION" ? "bg-brand-yellow text-brand-dark" :
                    p.category === "CHALLENGE" ? "bg-brand-pink text-white" :
                    p.category === "MAINTENANCE" ? "bg-brand-teal text-brand-dark" :
                    p.category === "ACHIEVEMENT" ? "bg-brand-purple text-white" :
                    p.category === "EVENT" ? "bg-brand-orange text-brand-dark" :
                    "bg-brand-blue text-white"
                  }`}
                >
                  📖 {t("Read more")} →
                </button>
              </motion.div>
            );
          })}
        </div>
        )}

        {activeTab === "journey" && (
          <div className="space-y-8">
            {experiences.map((exp, i) => {
              return (
              <JourneyCard
                key={exp.id}
                exp={exp}
                i={i}
                setCursorColor={setCursorColor}
                setSelectedJourney={setSelectedJourney}
              />
            );
            })}
          </div>
        )}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedProject(null)}
            className="absolute inset-0 bg-brand-darker/90 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className={`relative w-full max-w-3xl duo-card border-4 ${selectedProject.color} p-8 shadow-2xl max-h-[90vh] overflow-y-auto`}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[var(--input-bg)] flex items-center justify-center">
                  {selectedProject.icon}
                </div>
                <div>
                  <h3 className="text-3xl font-black">{selectedProject.title}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <span className={`${selectedProject.labelColor} text-brand-dark font-black px-3 py-1 rounded-lg text-[10px] uppercase tracking-widest`}>
                      {selectedProject.tag}
                    </span>
                    {selectedProject.date && (
                      <span className="flex items-center gap-1 text-sm text-tertiary">
                        <Calendar className="w-4 h-4" />
                        {selectedProject.date}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedProject(null)}
                className="w-10 h-10 rounded-full bg-[var(--input-bg)] flex items-center justify-center hover:bg-brand-pink hover:text-white transition-colors"
              >
                <Zap className="w-6 h-6 rotate-45" />
              </button>
            </div>
            
            <div className="space-y-6">
              {selectedProject.longDesc.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return <h4 key={idx} className="text-xl font-black text-brand-teal">{paragraph.replace(/\*\*/g, '')}</h4>;
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
                return <p key={idx} className="text-lg text-secondary leading-relaxed">{paragraph}</p>;
              })}
            </div>
            
            {selectedProject.links && selectedProject.links.length > 0 && (
              <div className="mt-8 pt-6 border-t border-[var(--border-color)]">
                <h5 className="font-bold text-sm text-tertiary uppercase tracking-widest mb-4">Related Resources</h5>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-[var(--input-bg)] rounded-xl hover:bg-brand-blue/20 hover:text-brand-blue transition-colors text-sm font-bold"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                      {link.text}
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-8 pt-6 border-t border-[var(--border-color)] text-center">
              <p className="text-xs text-tertiary mb-3">
                Use <kbd className="bg-[var(--input-bg)] px-2 py-1 rounded mx-1">←→</kbd> to navigate · <kbd className="bg-[var(--input-bg)] px-2 py-1 rounded mx-1">Esc</kbd> to close
              </p>
              <button 
                onClick={() => setSelectedProject(null)}
                className="duo-button duo-button-blue py-3 px-8"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {selectedJourney && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedJourney(null)}
            className="absolute inset-0"
            style={{ backgroundColor: 'var(--bg-color)', opacity: 0.95 }}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-2xl bg-[var(--card-bg)] rounded-3xl border-4 shadow-[0_12px_0_0_rgba(0,0,0,0.3)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{ borderColor: selectedJourney.hex }}
          >
            <div 
              className="h-2 w-full"
              style={{ background: selectedJourney.hex }}
            />
            <div className="p-8 overflow-y-auto max-h-[80vh]">
              <div className="flex items-center justify-between mb-6 shrink-0">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-[0_4px_0_0_rgba(0,0,0,0.3)]"
                    style={{ background: selectedJourney.hex }}
                  >
                    <div className="text-white">{selectedJourney.icon}</div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black">{selectedJourney.title}</h3>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{selectedJourney.company} • {selectedJourney.period}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedJourney(null)}
                  className="w-10 h-10 rounded-full bg-[var(--input-bg)] flex items-center justify-center hover:bg-brand-pink hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                {selectedJourney.longDesc}
              </p>

              {selectedJourney.links && selectedJourney.links.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-6">
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
              )}

              <p className="text-xs text-tertiary text-center">
                Press <kbd className="bg-[var(--input-bg)] px-1.5 py-0.5 rounded mx-1">Esc</kbd> to close
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
