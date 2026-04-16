import React, { useState, useMemo, useEffect, useContext } from "react";
import { ThemeContext, LanguageContext } from "../context";
import { ColoredText } from "../components/ColoredText";
import { SectionLabel } from "../components/SectionLabel";
import { Mascot } from "../components/Mascot";
import { Cloud } from "../components/Cloud";
import { languageResources } from "../data/resources";
import { ResourceSearch } from "../components/Resources/ResourceSearch";
import { ResourceCategory } from "../components/Resources/ResourceCategory";
import { BackToTop } from "../components/BackToTop";

const funnyTexts = [
  "Wanna click here? 👀", "Check it out! 🔍", "Not convinced? 🤔", "Could help! 💡",
  "Just a link, no pressure 🫡", "Click or don't, I won't judge 😏", "This might be useful? 📚",
  "Take a peek! 👆", "Your call! 🙃", "Go on, be curious! 🌟", "Trust me, click it ✨",
  "Or don't... I'm just a link 🔗",
];

export function ResourcesPage() {
  const { setCursorColor } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [regexMode, setRegexMode] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [expandedLanguages, setExpandedLanguages] = useState<string[]>([]);

  useEffect(() => {
    if (searchTerm.trim()) {
      const matchingLanguages = languageResources
        .filter(cat => {
          try {
            const pattern = new RegExp(searchTerm, "gi");
            return cat.resources.some(r => pattern.test(r.name) || pattern.test(r.desc) || pattern.test(r.type));
          } catch { return false; }
        })
        .map(cat => cat.title);
      setExpandedLanguages(matchingLanguages);
    } else {
      setExpandedLanguages([]);
    }
  }, [searchTerm]);

  const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const highlightMatch = (text: string) => {
    if (!searchTerm.trim()) return text;
    try {
      const pattern = regexMode ? new RegExp(`(${searchTerm})`, "gi") : new RegExp(`(${escapeRegex(searchTerm)})`, "gi");
      const parts = text.split(pattern);
      return parts.map((part, i) => pattern.test(part) ? (
        <mark key={i} className="bg-brand-yellow/40 text-brand-yellow rounded px-0.5 font-bold">{part}</mark>
      ) : part);
    } catch { return text; }
  };

  const filteredResources = useMemo(() => {
    if (!searchTerm.trim() && selectedTags.length === 0) return languageResources;
    try {
      const pattern = searchTerm.trim() ? new RegExp(regexMode ? searchTerm : escapeRegex(searchTerm), "gi") : null;
      return languageResources.map(cat => ({
        ...cat,
        resources: cat.resources.filter(r => (!pattern || pattern.test(r.name) || pattern.test(r.desc) || pattern.test(r.type)) && (selectedTags.length === 0 || selectedTags.includes(r.type)))
      })).filter(cat => cat.resources.length > 0);
    } catch { return languageResources; }
  }, [searchTerm, regexMode, selectedTags]);

  const toggleTag = (tag: string) => setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  const toggleLanguageExpand = (name: string) => setExpandedLanguages(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);

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
            {t("Curated")} <ColoredText to="/blog" colorClass="text-brand-yellow hover:underline">{t("tools")}</ColoredText> and <ColoredText to="/blog" colorClass="text-brand-blue hover:underline">{t("materials")}</ColoredText> {t("for each language")}.
          </p>
          <ResourceSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} regexMode={regexMode} setRegexMode={setRegexMode} selectedTags={selectedTags} toggleTag={toggleTag} setSelectedTags={setSelectedTags} allResourceTags={["Video", "Podcast", "Reading", "App", "Tools", "Grammar", "AI", "Translation"]} totalResults={filteredResources.reduce((acc, cat) => acc + cat.resources.length, 0)} t={t} />
        </div>
        <div className="space-y-4">
          {filteredResources.map((cat, i) => (
            <ResourceCategory key={cat.title} cat={cat} index={i} isExpanded={expandedLanguages.includes(cat.title)} onToggle={toggleLanguageExpand} setCursorColor={setCursorColor} searchTerm={searchTerm} regexMode={regexMode} highlightMatch={highlightMatch} getFunnyText={(j) => funnyTexts[j % funnyTexts.length]} />
          ))}
        </div>
        {searchTerm && filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-secondary text-xl">No resources found for "{searchTerm}"</p>
            <button onClick={() => setSearchTerm("")} className="mt-4 text-brand-blue hover:underline">Clear search</button>
          </div>
        )}
        <BackToTop />
      </div>
    </div>
  );
}
