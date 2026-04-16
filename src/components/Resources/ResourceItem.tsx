import React, { useState } from "react";
import { motion } from "motion/react";
import { ExternalLink, Search, Book, Video, Headphones, AppWindow, Languages, Bot, Globe } from "lucide-react";
import { type ResourceType } from "../../data/resources";

interface ResourceItemProps {
  res: {
    name: string;
    desc: string;
    url: string;
    type: ResourceType;
  };
  catTitle: string;
  searchTerm: string;
  regexMode: boolean;
  highlightMatch: (text: string) => React.ReactNode;
  getFunnyText: (index: number) => string;
  index: number;
}

export const getTypeIcon = (type: ResourceType) => {
  switch (type) {
    case "Video": return <Video className="w-4 h-4" />;
    case "Podcast": return <Headphones className="w-4 h-4" />;
    case "Reading": return <Book className="w-4 h-4" />;
    case "App": return <AppWindow className="w-4 h-4" />;
    case "Tools": return <Search className="w-4 h-4" />;
    case "Grammar": return <Languages className="w-4 h-4" />;
    case "AI": return <Bot className="w-4 h-4" />;
    case "Translation": return <Globe className="w-4 h-4" />;
  }
};

export const getTypeColor = (type: ResourceType) => {
  switch (type) {
    case "Video": return "text-brand-pink";
    case "Podcast": return "text-brand-orange";
    case "Reading": return "text-brand-blue";
    case "App": return "text-brand-green";
    case "Tools": return "text-brand-purple";
    case "Grammar": return "text-brand-teal";
    case "AI": return "text-brand-blue";
    case "Translation": return "text-brand-yellow";
  }
};

export function ResourceItem({ res, catTitle, highlightMatch, getFunnyText, index }: ResourceItemProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <div className="relative">
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
          setIsDetailsOpen(!isDetailsOpen);
        }}
        className="w-full mt-1 py-1 px-2 text-xs text-tertiary hover:text-brand-yellow transition-colors text-left border border-transparent hover:border-brand-yellow/30 rounded-lg bg-[var(--nav-bg)] hover:bg-[var(--hover-bg)]"
      >
        {isDetailsOpen ? "▲ Hide details" : `▼ ${getFunnyText(index)}`}
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
            {res.type === "AI" && "🤖 Harness the power of AI!"}
            {res.type === "Translation" && "🌐 Translation tools for context!"}
          </p>
        </motion.div>
      )}
    </div>
  );
}
