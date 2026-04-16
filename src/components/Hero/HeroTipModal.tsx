import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface HeroTipModalProps {
  tip: any;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export function HeroTipModal({ tip, onClose, onNavigate }: HeroTipModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose} className="absolute inset-0 bg-brand-darker/90 backdrop-blur-sm" />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-2xl bg-[var(--nav-bg)] rounded-3xl border-4 shadow-[0_12px_0_0_rgba(0,0,0,0.3)] overflow-hidden max-h-[90vh] flex flex-col"
        style={{ borderColor: tip.colorHex }}
      >
        <div className="h-2 shrink-0" style={{ background: tip.colorHex }} />
        <div className="p-8 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 20px)' }}>
          <div className="flex items-center justify-between mb-6 shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-[0_4px_0_0_rgba(0,0,0,0.2)]" style={{ background: tip.colorHex }}>
                <div className="text-white">{tip.icon}</div>
              </div>
              <div>
                <div className="inline-block px-3 py-1 rounded-lg font-black text-sm mb-1" style={{ backgroundColor: tip.colorHex, color: '#000', textShadow: '1px 1px 0 rgba(255,255,255,0.3)' }}>
                  {tip.key === 'conversation' && '💬 Conversation'}
                  {tip.key === 'immersion' && '🎧 Immersion'}
                  {tip.key === 'grammar' && '📝 Grammar'}
                  {tip.key === 'pronunciation' && '🎤 Pronunciation'}
                </div>
                <p className="text-sm text-tertiary">Click outside to close</p>
              </div>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-xl bg-[var(--input-bg)] flex items-center justify-center hover:bg-brand-pink hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <p className="text-lg text-secondary leading-relaxed mb-6">{tip.content}</p>
          
          <div className="mb-6">
            <h4 className="text-sm font-black uppercase tracking-widest text-tertiary mb-3">Key Points</h4>
            <div className="space-y-2">
              {tip.points.map((point: string, idx: number) => (
                <div key={idx} className="flex items-start gap-2 p-3 bg-[var(--input-bg)] rounded-xl border-2 border-brand-dark/10 shadow-[0_2px_0_0_var(--border-color)]">
                  <span className="text-lg font-bold" style={{ color: tip.colorHex }}>•</span>
                  <span className="text-sm font-bold text-secondary">{point}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-tertiary mb-3">Related Content</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {tip.links.map((link: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (link.url.startsWith('/')) {
                      onNavigate(link.url);
                      onClose();
                    } else {
                      window.open(link.url, '_blank');
                    }
                  }}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-transparent hover:border-brand-dark/20 transition-all font-bold text-sm shadow-[0_4px_0_0_var(--border-color)] hover:shadow-[0_2px_0_0_var(--border-color)] hover:translate-y-0.5 active:shadow-none active:translate-y-1"
                  style={{ backgroundColor: tip.colorHex, color: tip.key === 'pronunciation' ? '#fff' : '#000' }}
                >
                  {link.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
