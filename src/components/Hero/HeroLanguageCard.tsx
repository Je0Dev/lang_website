import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { type LanguageDetail } from "../../data/languages.tsx";

interface HeroLanguageCardProps {
  lang: LanguageDetail;
  isExpanded: boolean;
  onToggle: () => void;
  setCursorColor: (color: string) => void;
  onNavigate: (path: string) => void;
}

export function HeroLanguageCard({ lang, isExpanded, onToggle, setCursorColor, onNavigate }: HeroLanguageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="duo-card overflow-hidden"
      style={{ borderColor: lang.colors[0] }}
    >
      <div 
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={onToggle}
        onMouseEnter={() => setCursorColor(lang.colors[0])}
        onMouseLeave={() => setCursorColor("#1cb0f6")}
      >
        <div className="flex items-center gap-4">
          <div 
            className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
            style={{ backgroundColor: lang.colors[0] }}
          >
            {lang.flag}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-black text-lg" style={{ color: lang.colors[0] }}>{lang.name}</h4>
              <span 
                className="px-2 py-0.5 rounded-lg text-xs font-black"
                style={{ backgroundColor: lang.colors[0], color: '#fff', textShadow: '1px 1px 0 rgba(0,0,0,0.2)' }}
              >
                {lang.level}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm text-secondary">{lang.progress}%</p>
              <div className="w-20 h-2 bg-[var(--input-bg)] rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: lang.colors[0],
                    width: `${lang.progress}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-tertiary">{lang.levels?.length || 0} levels</span>
          {isExpanded ? <ChevronUp className="w-5 h-5 text-tertiary" /> : <ChevronDown className="w-5 h-5 text-tertiary" />}
        </div>
      </div>
      
      <AnimatePresence>
        {isExpanded && lang.levels && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-[var(--border-color)]"
          >
            <div className="p-4 space-y-4">
              {lang.levels.map((level, idx) => (
                <div key={idx} className="bg-[var(--input-bg)] rounded-xl p-4">
                  <h5 className="font-black mb-2" style={{ color: lang.colors[0] }}>{level.level}</h5>
                  <p className="text-sm text-secondary mb-3">{level.description}</p>
                  
                  {level.resources.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs text-tertiary uppercase tracking-widest mb-2">Resources</p>
                      <div className="flex flex-wrap gap-2">
                        {level.resources.map((res, rIdx) => (
                          <a key={rIdx} href={res.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-1 bg-[var(--nav-bg)] rounded-lg text-xs font-bold hover:bg-brand-blue/20 hover:text-brand-blue transition-colors">
                            {res.text} <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {level.blogLinks.length > 0 && (
                    <div>
                      <p className="text-xs text-tertiary uppercase tracking-widest mb-2">Related Posts</p>
                      <div className="flex flex-wrap gap-2">
                        {level.blogLinks.map((link, lIdx) => (
                          <a key={lIdx} href={link.url} onClick={(e) => { e.preventDefault(); onNavigate(link.url); }} className="flex items-center gap-1 px-3 py-1 bg-[var(--nav-bg)] rounded-lg text-xs font-bold hover:bg-brand-pink/20 hover:text-brand-pink transition-colors">
                            {link.text} <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
