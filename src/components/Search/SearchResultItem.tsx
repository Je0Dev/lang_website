import React from "react";
import { ChevronRight, FileText, Sparkles, BookOpen, GraduationCap, Search } from "lucide-react";
import { type SearchResult } from "../../hooks/useGlobalSearch";

interface SearchResultItemProps {
  result: SearchResult;
  index: number;
  selectedIndex: number;
  onSelect: (result: SearchResult) => void;
  onMouseEnter: (index: number) => void;
  highlightMatch: (text: string) => React.ReactNode;
}

export const getTypeIcon = (type: SearchResult["type"]) => {
  switch (type) {
    case "page": return <FileText className="w-4 h-4" />;
    case "resource": return <Sparkles className="w-4 h-4" />;
    case "blog": return <BookOpen className="w-4 h-4" />;
    case "milestone": return <GraduationCap className="w-4 h-4" />;
    case "language": return <Search className="w-4 h-4" />;
  }
};

export const getTypeColor = (type: SearchResult["type"]) => {
  switch (type) {
    case "page": return "text-brand-blue";
    case "resource": return "text-brand-teal";
    case "blog": return "text-brand-pink";
    case "milestone": return "text-brand-yellow";
    case "language": return "text-brand-purple";
  }
};

export function SearchResultItem({ result, index, selectedIndex, onSelect, onMouseEnter, highlightMatch }: SearchResultItemProps) {
  const isSelected = selectedIndex === index;
  return (
    <button
      onClick={() => onSelect(result)}
      onMouseEnter={() => onMouseEnter(index)}
      className={`w-full flex items-center gap-4 p-4 transition-all text-left border-l-4 ${
        isSelected ? "bg-brand-blue/10 border-brand-blue" : "hover:bg-[var(--input-bg)] border-transparent"
      }`}
    >
      <span className={getTypeColor(result.type)}>{getTypeIcon(result.type)}</span>
      <div className="flex-1">
        <div className="font-bold text-primary">{highlightMatch(result.title)}</div>
        <div className="text-sm text-tertiary line-clamp-1">{highlightMatch(result.excerpt || "")}</div>
      </div>
      <div className={`text-xs text-tertiary bg-[var(--input-bg)] px-2 py-1 rounded flex items-center gap-1 ${isSelected ? "ring-2 ring-brand-blue" : ""}`}>
        {result.section}
      </div>
      <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? "text-brand-blue translate-x-1" : "text-tertiary"}`} />
    </button>
  );
}
