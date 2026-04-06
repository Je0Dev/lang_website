import React, { useState, useMemo, useEffect } from "react";
import { motion } from "motion/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext, LanguageContext } from "../context";
import { ColoredText } from "../components/ColoredText";
import { SectionLabel } from "../components/SectionLabel";
import { Mascot } from "../components/Mascot";
import { Cloud } from "../components/Cloud";
import { FolderOpen, ExternalLink, Search, Book, Video, Headphones, AppWindow, Languages, X, ChevronDown, ChevronUp, ArrowUp } from "lucide-react";

type ResourceType = "Video" | "Podcast" | "Reading" | "App" | "Tools" | "Grammar";

interface Resource {
  name: string;
  desc: string;
  url: string;
  type: ResourceType;
}

interface LanguageResources {
  title: string;
  flag: string;
  color: string;
  textColor: string;
  hex: string;
  link: string;
  resources: Resource[];
}

export function ResourcesPage() {
  const { setCursorColor } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [regexMode, setRegexMode] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [expandedLanguages, setExpandedLanguages] = useState<string[]>([]);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showDetails, setShowDetails] = useState<{ [key: string]: boolean }>({});

  const funnyTexts = [
    "Wanna click here? 👀",
    "Check it out! 🔍",
    "Not convinced? 🤔",
    "Could help! 💡",
    "Just a link, no pressure 🫡",
    "Click or don't, I won't judge 😏",
    "This might be useful? 📚",
    "Take a peek! 👆",
    "Your call! 🙃",
    "Go on, be curious! 🌟",
    "Trust me, click it ✨",
    "Or don't... I'm just a link 🔗",
  ];

  useEffect(() => {
    if (searchTerm.trim()) {
      const matchingLanguages = resourceCategories
        .filter(cat => {
          try {
            const pattern = new RegExp(searchTerm, "gi");
            return cat.resources.some(r => 
              pattern.test(r.name) || pattern.test(r.desc) || pattern.test(r.type)
            );
          } catch {
            return false;
          }
        })
        .map(cat => cat.title);
      
      setExpandedLanguages(matchingLanguages);
    } else {
      setExpandedLanguages([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getFunnyText = (index: number) => funnyTexts[index % funnyTexts.length];

  const toggleResourceDetails = (key: string) => {
    setShowDetails(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleLanguageExpand = (name: string) => {
    setExpandedLanguages(prev => 
      prev.includes(name) 
        ? prev.filter(n => n !== name)
        : [...prev, name]
    );
  };

  const resourceCategories: LanguageResources[] = [
    {
      title: "German",
      flag: "🇩🇪",
      color: "bg-brand-purple",
      textColor: "text-brand-purple",
      hex: "#ce82ff",
      link: "/languages",
      resources: [
        { name: "Nicos Weg", desc: "DW's beginner series with interactive lessons", url: "https://learngerman.dw.com/en/nicos-weg/c-36519789", type: "Video" },
        { name: "Easy German", desc: "Street interviews and grammar explanations", url: "https://www.youtube.com/@easygerman", type: "Video" },
        { name: "Nachrichten Leicht", desc: "Simple news articles in easy German", url: "https://www.nachrichtenleicht.de/", type: "Reading" },
        { name: "Slow German", desc: "Podcast with transcripts by Annik Rubens", url: "https://slowgerman.com/", type: "Podcast" },
        { name: "Lingolia", desc: "Comprehensive grammar explanations and exercises", url: "https://www.lingolia.de/", type: "Grammar" },
        { name: "Anki Decks", desc: "Shared vocabulary decks for all levels", url: "https://ankiweb.net/shared/decks/german", type: "Tools" },
        { name: "Deutsche Welle", desc: "Complete German courses A1-C1", url: "https://www.dw.com/en/learn-german/s-3111", type: "App" },
        { name: "Podcasts Deutsch", desc: "German podcasts for learners", url: "https://www.podcast.de/podcast-deutsch-lernen", type: "Podcast" },
      ]
    },
    {
      title: "Spanish",
      flag: "🇪🇸",
      color: "bg-brand-orange",
      textColor: "text-brand-orange",
      hex: "#ff9600",
      link: "/languages",
      resources: [
        { name: "Dreaming Spanish", desc: "CI method from beginner to advanced", url: "https://www.dreamingspanish.com/", type: "Video" },
        { name: "Hoy Hablamos", desc: "Intermediate podcast with transcripts", url: "https://www.hoyhablamos.com/", type: "Podcast" },
        { name: "Luisito Comunica", desc: "Latin American content and travel vlogs", url: "https://www.youtube.com/@LuisitoComunica", type: "Video" },
        { name: "El País", desc: "Spanish news and opinion articles", url: "https://elpais.com/", type: "Reading" },
        { name: "SpanishDict", desc: "Dictionary, conjugator, and translations", url: "https://www.spanishdict.com/", type: "Tools" },
        { name: "Nate Gentile", desc: "High-level Peninsular Spanish tech content", url: "https://www.youtube.com/@NateGentile7", type: "Video" },
        { name: "Duolingo", desc: "Gamified learning for basics", url: "https://duolingo.com", type: "App" },
        { name: "Coffee Break Spanish", desc: "Podcast series from beginner to intermediate", url: "https://coffeebreakacademies.com/coffee-break-spanish/", type: "Podcast" },
      ]
    },
    {
      title: "Chinese",
      "flag": "🇨🇳",
      color: "bg-brand-pink",
      textColor: "text-brand-pink",
      hex: "#ff4b4b",
      link: "/languages",
      resources: [
        { name: "HelloChinese", desc: "Beginner app with tone training", url: "https://www.hellochinese.cc/", type: "App" },
        { name: "Mandarin Companion", desc: "Graded readers for intermediate learners", url: "https://mandarincompanion.com/", type: "Reading" },
        { name: "Bilibili", desc: "Chinese video platform with diverse content", url: "https://www.bilibili.com/", type: "Video" },
        { name: "Skritter", desc: "Character writing practice with stroke order", url: "https://skritter.com/", type: "App" },
        { name: "Anki HSK", desc: "HSK vocabulary flashcards", url: "https://ankiweb.net/shared/decks/chinese", type: "Tools" },
        { name: "Pleco", desc: "Ultimate Chinese dictionary app", url: "https://pleco.com/", type: "Tools" },
        { name: "ChinesePod", desc: "Lessons from beginner to advanced", url: "https://chinesepod.com/", type: "Podcast" },
        { name: "Dong Yu Hui", desc: "Poetic viral livestreams for advanced learners", url: "https://www.bilibili.com/video/BV1WY411P7vS/", type: "Video" },
      ]
    },
    {
      title: "English",
      flag: "🇬🇧",
      color: "bg-brand-green",
      textColor: "text-brand-green",
      hex: "#58cc02",
      link: "/languages",
      resources: [
        { name: "TED Talks", desc: "Ideas worth spreading in English", url: "https://www.ted.com/talks", type: "Video" },
        { name: "The Economist", desc: "Podcasts and articles for advanced learners", url: "https://www.economist.com/podcasts", type: "Podcast" },
        { name: "Lingolia", desc: "Grammar explanations and exercises", url: "https://english.lingolia.com/en/", type: "Grammar" },
        { name: "YouGlish", desc: "Use YouTube for pronunciation context", url: "https://youglish.com/", type: "Tools" },
        { name: "Cambridge Dict.", desc: "Definitions with audio examples", url: "https://dictionary.cambridge.org/", type: "Tools" },
        { name: "BBC Learning English", desc: "Comprehensive free English courses", url: "https://www.bbc.co.uk/learningenglish", type: "App" },
        { name: "English with Lucy", desc: "British English pronunciation and grammar", url: "https://www.youtube.com/@EnglishwithLucy", type: "Video" },
        { name: "6 Minute English", desc: "BBC learning podcast episodes", url: "https://www.bbc.co.uk/learningenglish/english/features/6-minute-english", type: "Podcast" },
      ]
    }
  ];

  const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const highlightMatch = (text: string) => {
    if (!searchTerm.trim()) return text;
    
    try {
      const pattern = regexMode 
        ? new RegExp(`(${searchTerm})`, "gi")
        : new RegExp(`(${escapeRegex(searchTerm)})`, "gi");
      
      const parts = text.split(pattern);
      
      return parts.map((part, i) => {
        if (pattern.test(part)) {
          return <mark key={i} className="bg-brand-yellow/40 text-brand-yellow rounded px-0.5 font-bold">{part}</mark>;
        }
        return part;
      });
    } catch {
      return text;
    }
  };

  const filteredResources = useMemo(() => {
    if (!searchTerm.trim() && selectedTags.length === 0) return resourceCategories;

    try {
      const searchPattern = regexMode 
        ? searchTerm 
        : escapeRegex(searchTerm);
      
      const pattern = searchTerm.trim() ? new RegExp(searchPattern, "gi") : null;
      
      return resourceCategories.map(cat => ({
        ...cat,
        resources: cat.resources.filter(r => {
          const matchesSearch = !pattern || 
            pattern.test(r.name) ||
            pattern.test(r.desc) ||
            pattern.test(r.type);
          
          const matchesTags = selectedTags.length === 0 || 
            selectedTags.includes(r.type);
          
          return matchesSearch && matchesTags;
        })
      })).filter(cat => cat.resources.length > 0);
    } catch {
      return resourceCategories;
    }
  }, [searchTerm, regexMode, selectedTags]);

  const allResourceTags = ["Video", "Podcast", "Reading", "App", "Tools", "Grammar"];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const getTypeIcon = (type: ResourceType) => {
    switch (type) {
      case "Video": return <Video className="w-4 h-4" />;
      case "Podcast": return <Headphones className="w-4 h-4" />;
      case "Reading": return <Book className="w-4 h-4" />;
      case "App": return <AppWindow className="w-4 h-4" />;
      case "Tools": return <Search className="w-4 h-4" />;
      case "Grammar": return <Languages className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: ResourceType) => {
    switch (type) {
      case "Video": return "text-brand-pink";
      case "Podcast": return "text-brand-orange";
      case "Reading": return "text-brand-blue";
      case "App": return "text-brand-green";
      case "Tools": return "text-brand-purple";
      case "Grammar": return "text-brand-teal";
    }
  };

  return (
    <div className="min-h-screen py-32 px-4" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 relative">
          <Mascot color="bg-brand-blue" position="right-20 top-0" delay={2} type="star" />
          <Cloud position="left-0 top-10" delay={1} />
          <SectionLabel text={t("UNIT 2.5 - Resource Hub")} colorClass="bg-brand-teal" hoverGif="https://i.gifer.com/Pak.gif" />
          <h2 className="text-4xl md:text-6xl font-black mt-6 mb-4">
            <ColoredText colorClass="text-brand-teal">{t("Learning Resources").split(' ')[0]}</ColoredText> <ColoredText colorClass="text-brand-pink">{t("Learning Resources").split(' ').slice(1).join(' ')}</ColoredText>
          </h2>
          <p className="text-secondary max-w-xl mx-auto mb-10">
            {t("Curated")} <ColoredText to="/blog" colorClass="text-brand-yellow hover:underline">{t("tools")}</ColoredText> and <ColoredText to="/blog" colorClass="text-brand-blue hover:underline">{t("materials")}</ColoredText> {t("for each language") || "for each language"}.
          </p>
          
          <div className="max-w-md mx-auto mb-12">
            <div className="relative flex items-center">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-tertiary" />
              <input 
                type="text" 
                placeholder={t("Search...")} 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[var(--input-bg)] border-2 border-[var(--border-color)] rounded-2xl pl-12 pr-24 py-4 text-primary focus:outline-none focus:border-brand-teal transition-colors"
              />
              <div className="absolute right-3 flex items-center gap-1">
                <button
                  onClick={() => setRegexMode(!regexMode)}
                  className={`px-2 py-1 text-xs font-mono rounded transition-colors ${
                    regexMode 
                      ? "bg-brand-purple text-white" 
                      : "bg-[var(--input-bg)] text-tertiary hover:text-brand-purple"
                  }`}
                  title="Toggle regex mode"
                >
                  .*
                </button>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="p-1 hover:bg-[var(--input-bg)] rounded-lg transition-colors"
                    title="Clear search"
                  >
                    <X className="w-4 h-4 text-tertiary hover:text-brand-pink" />
                  </button>
                )}
              </div>
            </div>
            {searchTerm && (
              <p className="text-xs text-tertiary mt-2 text-right">
                {filteredResources.reduce((acc, cat) => acc + cat.resources.length, 0)} results found
                {regexMode && <span className="ml-2 text-brand-purple">(regex)</span>}
              </p>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {allResourceTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  selectedTags.includes(tag)
                    ? getTypeColor(tag as ResourceType).replace('text-', 'bg-') + " text-white"
                    : "bg-[var(--input-bg)] text-secondary border border-[var(--border-color)] hover:border-brand-blue"
                }`}
              >
                {tag}
              </button>
            ))}
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="px-3 py-1 text-xs text-tertiary hover:text-brand-pink"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {filteredResources.map((cat, i) => {
            const isExpanded = expandedLanguages.includes(cat.title);
            return (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setCursorColor(cat.hex)}
              onMouseLeave={() => setCursorColor("#1cb0f6")}
              className="duo-card border-2 rounded-2xl overflow-hidden bg-[var(--nav-bg)]"
            >
              <div 
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => toggleLanguageExpand(cat.title)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{cat.flag}</span>
                  <div>
                    <h3 className={`text-xl font-black ${cat.textColor}`}>{cat.title}</h3>
                    <p className="text-xs text-tertiary">{cat.resources.length} resources</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-tertiary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-tertiary" />
                  )}
                </div>
              </div>
              
              {isExpanded && (
                <div className="border-t border-[var(--border-color)] p-4">
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {cat.resources.map((res, j) => {
                      const detailKey = `${cat.title}-${res.name}`;
                      const isDetailsOpen = showDetails[detailKey];
                      return (
                        <div key={j} className="relative">
                          <a
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 rounded-xl bg-[var(--input-bg)] hover:bg-[var(--hover-bg)] transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <span className={getTypeColor(res.type)}>{getTypeIcon(res.type)}</span>
                              <div>
                                <p className="font-bold text-sm group-hover:text-brand-blue transition-colors">{highlightMatch(res.name)}</p>
                                <p className="text-xs text-tertiary">{highlightMatch(res.desc)}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-tertiary bg-brand-dark/50 px-2 py-1 rounded flex items-center gap-1">
                                {getTypeIcon(res.type)}
                              </span>
                              <ExternalLink className="w-4 h-4 text-tertiary group-hover:text-brand-blue transition-colors" />
                            </div>
                          </a>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              toggleResourceDetails(detailKey);
                            }}
                            className="w-full mt-1 py-1 px-2 text-xs text-tertiary hover:text-brand-yellow transition-colors text-left border border-transparent hover:border-brand-yellow/30 rounded-lg bg-[var(--nav-bg)] hover:bg-[var(--hover-bg)]"
                          >
                            {isDetailsOpen ? "▲ Hide details" : `▼ ${getFunnyText(j)}`}
                          </button>
                          {isDetailsOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              className="mt-2 p-3 bg-[var(--nav-bg)] rounded-xl border-2 border-brand-teal/50"
                            >
                              <p className="text-xs text-secondary">
                                Type: <span className="font-bold text-brand-teal">{res.type}</span>
                              </p>
                              <p className="text-xs text-tertiary mt-1">
                                {res.type === "Video" && "🎬 Watch and learn!"}
                                {res.type === "Podcast" && "🎧 Listen while you commute!"}
                                {res.type === "Reading" && "📖 Read to expand vocabulary!"}
                                {res.type === "App" && "📱 Learn on the go!"}
                                {res.type === "Tools" && "🔧 Super useful tool!"}
                                {res.type === "Grammar" && "📝 Grammar made fun!"}
                              </p>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          );
          })}
        </div>
        
        {searchTerm && filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-secondary text-xl">No resources found for "{searchTerm}"</p>
            <button 
              onClick={() => setSearchTerm("")}
              className="mt-4 text-brand-blue hover:underline"
            >
              Clear search
            </button>
          </div>
        )}

        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: showBackToTop ? 1 : 0 }}
          style={{ pointerEvents: showBackToTop ? "auto" : "none" }}
        >
          <ArrowUp className="w-6 h-6 text-brand-dark" />
        </motion.button>
      </div>
    </div>
  );
}