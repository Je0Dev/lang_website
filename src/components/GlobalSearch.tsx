import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, Command, ChevronRight, FileText, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../context";

interface SearchResult {
  title: string;
  path: string;
  section: string;
  excerpt?: string;
  type: "page" | "resource" | "blog" | "milestone";
  highlight?: string;
}

interface SearchProps {
  onSearch?: (query: string) => void;
}

export function GlobalSearch({ onSearch }: SearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [regexMode, setRegexMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { t } = useContext(LanguageContext);

  const allContent: SearchResult[] = useMemo(() => [
    { title: "Languages", path: "/languages", section: "Main", excerpt: "Language learning progress and skills", type: "page" },
    { title: "Resources", path: "/resources", section: "Main", excerpt: "Learning resources for each language", type: "page" },
    { title: "Milestones", path: "/milestones", section: "Main", excerpt: "Achievements and challenges", type: "page" },
    { title: "Journey", path: "/journey", section: "Main", excerpt: "Language learning timeline", type: "page" },
    { title: "Blog", path: "/blog", section: "Main", excerpt: "Language learning logs", type: "page" },
    { title: "Contact", path: "/contact", section: "Main", excerpt: "Get in touch", type: "page" },
    
    { title: "Nicos Weg", path: "/resources", section: "German", excerpt: "DW's beginner German course", type: "resource", highlight: "german" },
    { title: "Easy German", path: "/resources", section: "German", excerpt: "Street interviews and grammar", type: "resource", highlight: "german" },
    { title: "DW German", path: "/resources", section: "German", excerpt: "Deutsche Welle courses A1-C1", type: "resource", highlight: "german" },
    { title: "Slow German", path: "/resources", section: "German", excerpt: "Podcast with transcripts", type: "resource", highlight: "german" },
    { title: "Lingolia German", path: "/resources", section: "German", excerpt: "Grammar explanations", type: "resource", highlight: "german" },
    
    { title: "Dreaming Spanish", path: "/resources", section: "Spanish", excerpt: "CI method from beginner to advanced", type: "resource", highlight: "spanish" },
    { title: "Hoy Hablamos", path: "/resources", section: "Spanish", excerpt: "Intermediate podcast", type: "resource", highlight: "spanish" },
    { title: "SpanishDict", path: "/resources", section: "Spanish", excerpt: "Dictionary and conjugator", type: "resource", highlight: "spanish" },
    { title: "El País", path: "/resources", section: "Spanish", excerpt: "Spanish news", type: "resource", highlight: "spanish" },
    
    { title: "HelloChinese", path: "/resources", section: "Chinese", excerpt: "Beginner app with tones", type: "resource", highlight: "chinese" },
    { title: "Mandarin Companion", path: "/resources", section: "Chinese", excerpt: "Graded readers", type: "resource", highlight: "chinese" },
    { title: "Skritter", path: "/resources", section: "Chinese", excerpt: "Writing practice", type: "resource", highlight: "chinese" },
    { title: "Bilibili", path: "/resources", section: "Chinese", excerpt: "Chinese video platform", type: "resource", highlight: "chinese" },
    { title: "HSK", path: "/resources", section: "Chinese", excerpt: "HSK vocabulary decks", type: "resource", highlight: "chinese" },
    
    { title: "TED Talks", path: "/resources", section: "English", excerpt: "Ideas worth spreading", type: "resource", highlight: "english" },
    { title: "The Economist", path: "/resources", section: "English", excerpt: "Podcasts and articles", type: "resource", highlight: "english" },
    { title: "Lingolia English", path: "/resources", section: "English", excerpt: "Grammar explanations", type: "resource", highlight: "english" },
    { title: "YouGlish", path: "/resources", section: "English", excerpt: "YouTube for pronunciation", type: "resource", highlight: "english" },
    
    { title: "Goethe B2", path: "/milestones", section: "Milestones", excerpt: "German certificate achievement", type: "milestone" },
    { title: "German Immersion", path: "/milestones", section: "Milestones", excerpt: "Daily German content consumption", type: "milestone" },
    { title: "English Mastery", path: "/milestones", section: "Milestones", excerpt: "C1 maintenance through immersion", type: "milestone" },
    { title: "Spanish Journey", path: "/milestones", section: "Milestones", excerpt: "Building Spanish foundations", type: "milestone" },
    { title: "Mandarin Challenge", path: "/milestones", section: "Milestones", excerpt: "Beginning Chinese journey", type: "milestone" },
    
    { title: "Start German", path: "/blog", section: "Blog", excerpt: "How to start learning German", type: "blog" },
    { title: "English Mastery", path: "/blog", section: "Blog", excerpt: "Beyond grammar to fluency", type: "blog" },
    { title: "Spanish Odyssey", path: "/blog", section: "Blog", excerpt: "Journey to Spanish fluency", type: "blog" },
    { title: "Mandarin Mission", path: "/blog", section: "Blog", excerpt: "Conquering Chinese characters", type: "blog" },
  ], []);

  const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const results = useMemo(() => {
    if (!query.trim()) return allContent.slice(0, 8);

    const searchTerms = query.toLowerCase().split(" ").filter(s => s);
    
    return allContent.filter(item => {
      const searchText = `${item.title} ${item.excerpt} ${item.section}`.toLowerCase();
      return searchTerms.every(term => searchText.includes(term));
    }).slice(0, 10);
  }, [query, allContent]);

  const highlightMatch = useCallback((text: string) => {
    if (!query.trim()) return text;

    const parts = text.split(new RegExp(`(${escapeRegex(query)})`, "gi"));
    
    return parts.map((part, i) => {
      if (part.toLowerCase() === query.toLowerCase()) {
        return <mark key={i} className="bg-brand-yellow/40 text-brand-yellow rounded px-0.5 font-bold">{part}</mark>;
      }
      return part;
    });
  }, [query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const scrollSelectedIntoView = useCallback(() => {
    if (resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  useEffect(() => {
    scrollSelectedIntoView();
  }, [selectedIndex, scrollSelectedIntoView]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      
      if (e.key === "Escape") {
        setIsOpen(false);
      }
      
      if (!isOpen) return;
      
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        handleSelect(results[selectedIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (result: SearchResult) => {
    navigate(result.path, { state: { highlight: result.highlight, searchQuery: query } });
    setIsOpen(false);
    setQuery("");
    onSearch?.(query);
  };

  const getTypeIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "page": return <FileText className="w-4 h-4" />;
      case "resource": return <Sparkles className="w-4 h-4" />;
      case "blog": return <Search className="w-4 h-4" />;
      case "milestone": return <ChevronRight className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: SearchResult["type"]) => {
    switch (type) {
      case "page": return "text-brand-blue";
      case "resource": return "text-brand-teal";
      case "blog": return "text-brand-pink";
      case "milestone": return "text-brand-yellow";
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--input-bg)] border-2 border-[var(--border-color)] text-tertiary hover:border-brand-blue hover:bg-brand-blue/10 transition-all shadow-[0_4px_0_0_var(--border-color)]"
        aria-label="Open search"
      >
        <Search className="w-4 h-4" />
        <span className="text-sm hidden sm:inline">Search</span>
        <kbd className="hidden md:flex items-center gap-1 text-xs bg-[var(--card-bg)] px-1.5 py-0.5 rounded" aria-hidden="true">
          <Command className="w-3 h-3" />K
        </kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-brand-darker/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 z-[101] w-full max-w-2xl bg-[var(--nav-bg)] rounded-2xl border border-[var(--border-color)] shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-3 p-4 border-b border-[var(--border-color)]">
                <Search className="w-5 h-5 text-tertiary" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search pages, resources, milestones..."
                  className="flex-1 bg-transparent outline-none text-lg placeholder:text-tertiary"
                />
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
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-[var(--input-bg)] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-tertiary" />
                </button>
              </div>

              <div ref={resultsRef} className="max-h-[400px] overflow-y-auto">
                {query && results.length === 0 && (
                  <div className="p-8 text-center text-tertiary">
                    No results found for "{query}"
                  </div>
                )}

                {results.map((result, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(result)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center gap-4 p-4 transition-all text-left border-l-4 ${
                      selectedIndex === idx 
                        ? "bg-brand-blue/10 border-brand-blue" 
                        : "hover:bg-[var(--input-bg)] border-transparent"
                    }`}
                  >
                    <span className={`${getTypeColor(result.type)}`}>
                      {getTypeIcon(result.type)}
                    </span>
                    <div className="flex-1">
                      <div className="font-bold text-primary">
                        {highlightMatch(result.title)}
                      </div>
                      <div className="text-sm text-tertiary">
                        {highlightMatch(result.excerpt || "")}
                      </div>
                    </div>
                    <div className={`text-xs text-tertiary bg-[var(--input-bg)] px-2 py-1 rounded flex items-center gap-1 ${selectedIndex === idx ? "ring-2 ring-brand-blue" : ""}`}>
                      {result.section}
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${selectedIndex === idx ? "text-brand-blue translate-x-1" : "text-tertiary"}`} />
                  </button>
                ))}

                {!query && (
                  <div className="p-4">
                    <div className="text-xs text-tertiary uppercase tracking-widest mb-2">
                      Quick Links
                    </div>
                    {allContent.slice(0, 6).map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full flex items-center gap-4 p-2 rounded-lg transition-all text-left ${
                          selectedIndex === idx 
                            ? "bg-brand-blue/10 border-l-4 border-brand-blue" 
                            : "hover:bg-[var(--input-bg)]"
                        }`}
                      >
                        <span className={getTypeColor(item.type)}>{getTypeIcon(item.type)}</span>
                        <span className="text-primary flex-1">{highlightMatch(item.title)}</span>
                        <span className="text-xs text-tertiary">{item.section}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {results.length > 0 && (
                <div className="p-3 border-t border-[var(--border-color)] text-xs text-tertiary flex items-center justify-between">
                  <span>{results.length} results</span>
                  <span className="flex items-center gap-2">
                    <kbd className="bg-[var(--input-bg)] px-1.5 py-0.5 rounded">↑↓</kbd> navigate
                    <kbd className="bg-[var(--input-bg)] px-1.5 py-0.5 rounded">↵</kbd> select
                    <kbd className="bg-[var(--input-bg)] px-1.5 py-0.5 rounded">esc</kbd> close
                  </span>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}