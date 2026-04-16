import React from "react";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { ColoredText } from "../ColoredText";
import { type BlogPost } from "../../data/blogPosts";

interface BlogCardProps {
  post: BlogPost;
  index: number;
  isSelected: boolean;
  isDetailsOpen: boolean;
  onSelect: (post: BlogPost) => void;
  onToggleDetails: (id: number) => void;
  onMouseEnter: (index: number, color: string) => void;
  onMouseLeave: () => void;
  searchQuery: string;
  selectedTags: string[];
  getFunnyText: (index: number) => string;
  t: (key: string) => string;
}

export function BlogCard({ post, index, isSelected, isDetailsOpen, onSelect, onToggleDetails, onMouseEnter, onMouseLeave, searchQuery, selectedTags, getFunnyText, t }: BlogCardProps) {
  const highlightText = (text: string, query: string): React.ReactNode => {
    if (!query.trim()) return text;
    try {
      const regex = new RegExp(`(${query})`, 'gi');
      const parts = text.split(regex);
      return parts.map((part, i) => regex.test(part) ? (<mark key={i} className="bg-brand-yellow/40 text-brand-yellow px-0.5 rounded">{part}</mark>) : part);
    } catch { return text; }
  };

  const labelColor = post.labelColor.replace('bg-', 'text-');

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => onMouseEnter(index, labelColor)}
      onMouseLeave={onMouseLeave}
      className={`duo-card ${post.color} flex flex-col bg-[var(--nav-bg)] cursor-pointer transition-all duration-300 ${isSelected ? "hover:-translate-y-3 scale-[1.02]" : "hover:-translate-y-2"}`}
      onClick={() => onSelect(post)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-[var(--input-bg)] flex items-center justify-center">{post.icon}</div>
      </div>
      <h3 className="text-2xl font-black mb-2">
        <ColoredText colorClass={labelColor}>{highlightText(post.title, searchQuery)}</ColoredText>
      </h3>
      <p className="text-secondary mb-3 flex-grow">{post.excerpt}</p>
      <div className="flex flex-wrap gap-1 mb-3">
        {post.tags.slice(0, 4).map(tag => (
          <span key={tag} className={`px-2 py-0.5 rounded text-[10px] font-bold ${selectedTags.includes(tag) ? "bg-brand-yellow text-brand-dark" : "bg-[var(--input-bg)] text-tertiary"}`}>{tag}</span>
        ))}
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onToggleDetails(post.id); }}
        className="w-full py-2 px-3 text-xs text-tertiary hover:text-brand-yellow transition-colors border border-transparent hover:border-brand-yellow/30 rounded-lg bg-[var(--nav-bg)] hover:bg-[var(--hover-bg)] mb-2"
      >
        {isDetailsOpen ? "▲ Hide details" : `▼ ${getFunnyText(index)}`}
      </button>
      {isDetailsOpen && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="mt-2 p-3 bg-[var(--input-bg)] rounded-xl border-2 border-brand-orange/30">
          <p className="text-xs text-secondary mb-2">Click Read more to see the full content!</p>
          <p className="text-xs text-tertiary">
            {post.category === "article" && "📝 Great read ahead!"}
            {post.category === "media" && post.mediaType === "movie" && "🎬 Movie time!"}
            {post.category === "media" && post.mediaType === "series" && "📺 Binge mode!"}
            {post.category === "media" && post.mediaType === "book" && "📖 Bookworm vibes!"}
          </p>
        </motion.div>
      )}
      <div className="text-brand-blue font-bold flex items-center text-sm group cursor-pointer">{t("Read more")} <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" /></div>
    </motion.div>
  );
}
