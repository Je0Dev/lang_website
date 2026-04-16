import React from "react";
import { motion } from "motion/react";
import { X, ExternalLink } from "lucide-react";
import { JourneyItem } from "../../data/milestones.tsx";

interface JourneyModalProps {
  journey: JourneyItem;
  onClose: () => void;
}

export function JourneyModal({ journey, onClose }: JourneyModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
        className="absolute inset-0"
        style={{ backgroundColor: 'var(--bg-color)', opacity: 0.95 }}
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-2xl bg-[var(--card-bg)] rounded-3xl border-4 shadow-[0_12px_0_0_rgba(0,0,0,0.3)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ borderColor: journey.hex }}
      >
        <div 
          className="h-2 w-full"
          style={{ background: journey.hex }}
        />
        <div className="p-8 overflow-y-auto max-h-[80vh]">
          <div className="flex items-center justify-between mb-6 shrink-0">
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-[0_4px_0_0_rgba(0,0,0,0.3)]"
                style={{ background: journey.hex }}
              >
                <div className="text-white">{journey.icon}</div>
              </div>
              <div>
                <h3 className="text-2xl font-black">{journey.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{journey.company} • {journey.period}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-[var(--input-bg)] flex items-center justify-center hover:bg-brand-pink hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
            {journey.longDesc}
          </p>

          {journey.links && journey.links.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-6">
              {journey.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--input-bg)] rounded-xl hover:bg-brand-blue/20 hover:text-brand-blue transition-colors text-sm font-bold"
                >
                  <ExternalLink className="w-4 h-4" />
                  {link.text}
                </a>
              ))}
            </div>
          )}

          <p className="text-xs text-tertiary text-center">
            Press <kbd className="bg-[var(--input-bg)] px-1.5 py-0.5 rounded mx-1">Esc</kbd> to close
          </p>
        </div>
      </motion.div>
    </div>
  );
}
