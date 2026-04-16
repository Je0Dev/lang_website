import React from "react";
import { motion } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ResourceItem } from "./ResourceItem";
import { type ResourceType } from "../../data/resources";

interface ResourceCategoryProps {
  cat: {
    title: string;
    flag: string;
    hex: string;
    textColor: string;
    resources: Array<{
      name: string;
      desc: string;
      url: string;
      type: ResourceType;
    }>;
  };
  index: number;
  isExpanded: boolean;
  onToggle: (title: string) => void;
  setCursorColor: (color: string) => void;
  searchTerm: string;
  regexMode: boolean;
  highlightMatch: (text: string) => React.ReactNode;
  getFunnyText: (index: number) => string;
}

export function ResourceCategory({
  cat,
  index,
  isExpanded,
  onToggle,
  setCursorColor,
  searchTerm,
  regexMode,
  highlightMatch,
  getFunnyText
}: ResourceCategoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setCursorColor(cat.hex)}
      onMouseLeave={() => setCursorColor("#1cb0f6")}
      className="duo-card border-2 rounded-2xl overflow-hidden bg-[var(--nav-bg)]"
    >
      <div 
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => onToggle(cat.title)}
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
            {cat.resources.map((res, j) => (
              <ResourceItem
                key={j}
                res={res}
                catTitle={cat.title}
                searchTerm={searchTerm}
                regexMode={regexMode}
                highlightMatch={highlightMatch}
                getFunnyText={getFunnyText}
                index={j}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
