import React from "react";
import { Search, X } from "lucide-react";
import { type ResourceType } from "../../data/resources";
import { getTypeColor } from "./ResourceItem";

interface ResourceSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  regexMode: boolean;
  setRegexMode: (mode: boolean) => void;
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  setSelectedTags: (tags: string[]) => void;
  allResourceTags: string[];
  totalResults: number;
  t: (key: string) => string;
}

export function ResourceSearch({
  searchTerm,
  setSearchTerm,
  regexMode,
  setRegexMode,
  selectedTags,
  toggleTag,
  setSelectedTags,
  allResourceTags,
  totalResults,
  t
}: ResourceSearchProps) {
  return (
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
          {totalResults} results found
          {regexMode && <span className="ml-2 text-brand-purple">(regex)</span>}
        </p>
      )}
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
  );
}
