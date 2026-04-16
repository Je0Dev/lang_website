import { useState, useRef, useEffect, useMemo, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../context";
import { blogPosts } from "../data/blogPosts";
import { projects } from "../data/milestones";
import { uiLanguages, learningLanguages } from "../data/languages";
import { languageResources } from "../data/resources";
import { navItems } from "../data/navbar";

export interface SearchResult {
  title: string;
  path: string;
  section: string;
  excerpt?: string;
  type: "page" | "resource" | "blog" | "milestone" | "language";
  highlight?: string;
}

export function useGlobalSearch(onSearch?: (query: string) => void) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [regexMode, setRegexMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { t } = useContext(LanguageContext);

  const allContent: SearchResult[] = useMemo(() => {
    const results: SearchResult[] = [];
    navItems.forEach(item => results.push({ title: t(item.nameKey), path: item.path, section: "Navigation", excerpt: `Visit the ${item.name} page`, type: "page" }));
    [...uiLanguages, ...learningLanguages].forEach(lang => results.push({ title: lang.name, path: "/languages", section: "Languages", excerpt: lang.details, type: "language", highlight: lang.name.toLowerCase() }));
    languageResources.forEach(cat => cat.resources.forEach(res => results.push({ title: res.name, path: "/resources", section: cat.title, excerpt: res.desc, type: "resource", highlight: cat.title.toLowerCase() })));
    blogPosts.forEach(post => results.push({ title: post.title, path: "/blog", section: "Blog", excerpt: post.excerpt, type: "blog", highlight: post.id.toString() }));
    projects.forEach(project => results.push({ title: project.title, path: "/milestones", section: "Milestones", excerpt: project.desc, type: "milestone" }));
    return results;
  }, [t]);

  const results = useMemo(() => {
    if (!query.trim()) return allContent.slice(0, 8);
    try {
      if (regexMode) {
        const regex = new RegExp(query, "gi");
        return allContent.filter(item => regex.test(item.title) || regex.test(item.excerpt || "") || regex.test(item.section)).slice(0, 10);
      }
    } catch (e) {}
    const searchTerms = query.toLowerCase().split(" ").filter(s => s);
    return allContent.filter(item => {
      const searchText = `${item.title} ${item.excerpt} ${item.section}`.toLowerCase();
      return searchTerms.every(term => searchText.includes(term));
    }).slice(0, 10);
  }, [query, allContent, regexMode]);

  const handleSelect = useCallback((result: SearchResult) => {
    navigate(result.path, { state: { highlight: result.highlight, searchQuery: query } });
    setIsOpen(false);
    setQuery("");
    onSearch?.(query);
  }, [navigate, query, onSearch]);

  useEffect(() => { setSelectedIndex(0); }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setIsOpen(true); }
      if (e.key === "Escape") setIsOpen(false);
      if (!isOpen) return;
      if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIndex(prev => Math.min(prev + 1, results.length - 1)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIndex(prev => Math.max(prev - 1, 0)); }
      else if (e.key === "Enter" && results[selectedIndex]) { e.preventDefault(); handleSelect(results[selectedIndex]); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, handleSelect]);

  useEffect(() => { if (isOpen && inputRef.current) inputRef.current.focus(); }, [isOpen]);

  const highlightMatch = useCallback((text: string) => {
    if (!query.trim()) return text;
    try {
      const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = regexMode ? query : escapeRegex(query);
      const parts = text.split(new RegExp(`(${pattern})`, "gi"));
      return parts.map((part, i) => {
        const isMatch = regexMode ? new RegExp(`^${query}$`, "i").test(part) : part.toLowerCase() === query.toLowerCase();
        return isMatch ? part : part; // Logic for highlight will be in component to keep it simple with JSX
      });
    } catch (e) { return [text]; }
  }, [query, regexMode]);

  return { isOpen, setIsOpen, query, setQuery, selectedIndex, setSelectedIndex, regexMode, setRegexMode, results, allContent, inputRef, resultsRef, handleSelect, t, highlightMatch };
}
