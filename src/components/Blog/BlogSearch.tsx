import React from "react";
import { Search, X, XCircle } from "lucide-react";

interface BlogSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTags: string[];
  allTags: string[];
  toggleTag: (tag: string) => void;
  clearTags: () => void;
  totalResults: number;
  t: (key: string) => string;
}

export function BlogSearch({ searchQuery, setSearchQuery, selectedTags, allTags, toggleTag, clearTags, totalResults, t }: BlogSearchProps) {
  return (
    <div className="text-center mb-12 relative">
      <div className="max-w-md mx-auto mb-6 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-tertiary" />
        <input 
          type="text" 
          placeholder={t("Search articles by title or keyword...")} 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[var(--input-bg)] border-2 border-[var(--border-color)] rounded-2xl pl-12 pr-6 py-4 text-primary focus:outline-none focus:border-brand-orange transition-colors shadow-[0_4px_0_0_var(--border-color)] focus:shadow-[0_4px_0_0_var(--color-brand-orange)]"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-tertiary hover:text-brand-pink transition-colors">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${selectedTags.includes(tag) ? "bg-brand-yellow text-brand-dark" : "bg-[var(--input-bg)] text-secondary border border-[var(--border-color)] hover:border-brand-yellow"}`}
            >
              {tag}
            </button>
          ))}
        </div>
        {selectedTags.length > 0 && (
          <button onClick={clearTags} className="mt-3 text-xs text-tertiary hover:text-brand-pink flex items-center gap-1 mx-auto">
            <XCircle className="w-3 h-3" /> Clear filters
          </button>
        )}
      </div>
      
      {(searchQuery || selectedTags.length > 0) && (
        <p className="text-sm text-tertiary mb-4">
          {totalResults} {totalResults === 1 ? "result" : "results"}
          {searchQuery && ` for "${searchQuery}"`}
          {selectedTags.length > 0 && ` in ${selectedTags.length} tag${selectedTags.length > 1 ? 's' : ''}`}
        </p>
      )}
    </div>
  );
}
