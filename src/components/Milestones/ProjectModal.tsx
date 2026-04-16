import React from "react";
import { motion } from "motion/react";
import { Calendar, Zap, ArrowUpRight } from "lucide-react";
import { Project } from "../../data/milestones.tsx";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  t: (key: string) => string;
}

export function ProjectModal({ project, onClose, t }: ProjectModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-darker/90 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className={`relative w-full max-w-3xl duo-card border-4 ${project.color} p-8 shadow-2xl max-h-[90vh] overflow-y-auto`}
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[var(--input-bg)] flex items-center justify-center">
              {project.icon}
            </div>
            <div>
              <h3 className="text-3xl font-black">{project.title}</h3>
              <div className="flex items-center gap-4 mt-2">
                <span className={`${project.labelColor} text-brand-dark font-black px-3 py-1 rounded-lg text-[10px] uppercase tracking-widest`}>
                  {project.tag}
                </span>
                {project.date && (
                  <span className="flex items-center gap-1 text-sm text-tertiary">
                    <Calendar className="w-4 h-4" />
                    {project.date}
                  </span>
                )}
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[var(--input-bg)] flex items-center justify-center hover:bg-brand-pink hover:text-white transition-colors"
          >
            <Zap className="w-6 h-6 rotate-45" />
          </button>
        </div>
        
        <div className="space-y-6">
          {project.longDesc.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
              return <h4 key={idx} className="text-xl font-black text-brand-teal">{paragraph.replace(/\*\*/g, '')}</h4>;
            }
            if (paragraph.startsWith('•')) {
              return (
                <ul key={idx} className="list-disc pl-6 space-y-2 text-secondary">
                  {paragraph.split('\n').map((item, i) => (
                    <li key={i}>{item.replace('• ', '')}</li>
                  ))}
                </ul>
              );
            }
            return <p key={idx} className="text-lg text-secondary leading-relaxed">{paragraph}</p>;
          })}
        </div>
        
        {project.links && project.links.length > 0 && (
          <div className="mt-8 pt-6 border-t border-[var(--border-color)]">
            <h5 className="font-bold text-sm text-tertiary uppercase tracking-widest mb-4">Related Resources</h5>
            <div className="flex flex-wrap gap-3">
              {project.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--input-bg)] rounded-xl hover:bg-brand-blue/20 hover:text-brand-blue transition-colors text-sm font-bold"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-8 pt-6 border-t border-[var(--border-color)] text-center">
          <p className="text-xs text-tertiary mb-3">
            Use <kbd className="bg-[var(--input-bg)] px-2 py-1 rounded mx-1">←→</kbd> to navigate · <kbd className="bg-[var(--input-bg)] px-2 py-1 rounded mx-1">Esc</kbd> to close
          </p>
          <button 
            onClick={onClose}
            className="duo-button duo-button-blue py-3 px-8"
          >
            {t("Close")}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
