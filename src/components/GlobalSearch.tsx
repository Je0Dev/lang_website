import React, { useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, Command } from "lucide-react";
import { useGlobalSearch } from "../hooks/useGlobalSearch";
import { SearchResultItem, getTypeColor, getTypeIcon } from "./Search/SearchResultItem";

interface SearchProps { onSearch?: (query: string) => void; }

export function GlobalSearch({ onSearch }: SearchProps) {
  const { isOpen, setIsOpen, query, setQuery, selectedIndex, setSelectedIndex, regexMode, setRegexMode, results, allContent, inputRef, resultsRef, handleSelect, t } = useGlobalSearch(onSearch);

  const highlightMatch = useCallback((text: string) => {
    if (!query.trim()) return text;
    try {
      const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = regexMode ? query : escapeRegex(query);
      const parts = text.split(new RegExp(`(${pattern})`, "gi"));
      return parts.map((part, i) => {
        const isMatch = regexMode ? new RegExp(`^${query}$`, "i").test(part) : part.toLowerCase() === query.toLowerCase();
        return isMatch ? <mark key={i} className="bg-brand-yellow/40 text-brand-yellow rounded px-0.5 font-bold">{part}</mark> : part;
      });
    } catch (e) { return text; }
  }, [query, regexMode]);

  useEffect(() => {
    if (resultsRef.current) {
      const selected = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selected) selected.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [selectedIndex, resultsRef]);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--input-bg)] border-2 border-[var(--border-color)] text-tertiary hover:border-brand-blue hover:bg-brand-blue/10 transition-all shadow-[0_4px_0_0_var(--border-color)]" aria-label="Open search">
        <Search className="w-4 h-4" /> <span className="text-sm hidden sm:inline">{t("Search")}</span>
        <kbd className="hidden md:flex items-center gap-1 text-xs bg-[var(--card-bg)] px-1.5 py-0.5 rounded" aria-hidden="true"><Command className="w-3 h-3" />K</kbd>
      </button>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-brand-darker/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -20 }} className="fixed top-20 left-1/2 -translate-x-1/2 z-[101] w-full max-w-2xl bg-[var(--nav-bg)] rounded-2xl border border-[var(--border-color)] shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 p-4 border-b border-[var(--border-color)]">
                <Search className="w-5 h-5 text-tertiary" />
                <input ref={inputRef} type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("Search pages, resources, milestones...")} className="flex-1 bg-transparent outline-none text-lg placeholder:text-tertiary" />
                <button onClick={() => setRegexMode(!regexMode)} className={`px-2 py-1 text-xs font-mono rounded transition-colors ${regexMode ? "bg-brand-purple text-white" : "bg-[var(--input-bg)] text-tertiary hover:text-brand-purple"}`} title="Toggle regex mode">.*</button>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-[var(--input-bg)] rounded-lg transition-colors"><X className="w-5 h-5 text-tertiary" /></button>
              </div>
              <div ref={resultsRef} className="max-h-[400px] overflow-y-auto">
                {query && results.length === 0 && <div className="p-8 text-center text-tertiary">{t("No results found for")} "{query}"</div>}
                {results.map((res, idx) => <SearchResultItem key={idx} result={res} index={idx} selectedIndex={selectedIndex} onSelect={handleSelect} onMouseEnter={setSelectedIndex} highlightMatch={highlightMatch} />)}
                {!query && (
                  <div className="p-4"><div className="text-xs text-tertiary uppercase tracking-widest mb-2">{t("Quick Links")}</div>
                    {allContent.slice(0, 6).map((item, idx) => (
                      <button key={idx} onClick={() => handleSelect(item)} onMouseEnter={() => setSelectedIndex(idx)} className={`w-full flex items-center gap-4 p-2 rounded-lg transition-all text-left ${selectedIndex === idx ? "bg-brand-blue/10 border-l-4 border-brand-blue" : "hover:bg-[var(--input-bg)]"}`}>
                        <span className={getTypeColor(item.type)}>{getTypeIcon(item.type)}</span> <span className="text-primary flex-1">{item.title}</span> <span className="text-xs text-tertiary">{item.section}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {results.length > 0 && (
                <div className="p-3 border-t border-[var(--border-color)] text-xs text-tertiary flex items-center justify-between">
                  <span>{results.length} {t("results")}</span>
                  <span className="flex items-center gap-2"><kbd className="bg-[var(--input-bg)] px-1.5 py-0.5 rounded">↑↓</kbd> {t("navigate")} <kbd className="bg-[var(--input-bg)] px-1.5 py-0.5 rounded">↵</kbd> {t("select")} <kbd className="bg-[var(--input-bg)] px-1.5 py-0.5 rounded">esc</kbd> {t("close")}</span>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
