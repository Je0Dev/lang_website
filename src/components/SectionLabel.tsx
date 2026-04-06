import { useState } from "react";
import { motion } from "motion/react";

export function SectionLabel({ text, colorClass, hoverGif }: { text: string; colorClass: string; hoverGif?: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative cursor-pointer inline-block`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={`duo-label ${colorClass} text-white font-black text-sm tracking-widest px-4 py-2 rounded-lg shadow-[0_4px_0_0_rgba(0,0,0,0.3)]`}>
        {text}
      </span>
      {hoverGif && isHovered && (
        <motion.img 
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          src={hoverGif} 
          alt="Unit GIF" 
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-20 h-20 object-contain z-50 pointer-events-none"
        />
      )}
    </motion.div>
  );
}
