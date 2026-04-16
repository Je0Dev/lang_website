import React from "react";
import { motion } from "motion/react";

interface HeroTipCardProps {
  tip: any;
  idx: number;
  setCursorColor: (color: string) => void;
  onClick: () => void;
}

export function HeroTipCard({ tip, idx, setCursorColor, onClick }: HeroTipCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -10, scale: 1.02 }} 
      onMouseEnter={() => setCursorColor(tip.colorHex)}
      onMouseLeave={() => setCursorColor("#1cb0f6")}
      className={`duo-card ${tip.borderColor} cursor-pointer`}
      style={{ transform: `rotate(${idx % 2 === 0 ? '-3deg' : '2deg'})` }}
      onClick={onClick}
    >
      <div className={tip.color}>{tip.icon}</div>
      <div 
        className="inline-block mt-2 px-3 py-1 rounded-lg font-black text-sm"
        style={{ backgroundColor: tip.colorHex, color: '#000', textShadow: '1px 1px 0 rgba(255,255,255,0.3)' }}
      >
        {tip.key === 'conversation' && '💬 Conversation'}
        {tip.key === 'immersion' && '🎧 Immersion'}
        {tip.key === 'grammar' && '📝 Grammar'}
        {tip.key === 'pronunciation' && '🎤 Pronunciation'}
      </div>
      <div 
        className="inline-block mt-2 px-3 py-1.5 rounded-xl font-bold text-xs cursor-pointer transition-all hover:translate-y-0.5"
        style={{ 
          backgroundColor: 'var(--input-bg)', 
          color: tip.colorHex,
          boxShadow: '0 2px 0 var(--border-color)'
        }}
      >
        Check more →
      </div>
    </motion.div>
  );
}
