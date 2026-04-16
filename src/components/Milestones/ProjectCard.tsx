import React from "react";
import { motion } from "motion/react";
import { ColoredText } from "../ColoredText";
import { Project } from "../../data/milestones.tsx";

interface ProjectCardProps {
  p: Project;
  i: number;
  setCursorColor: (color: string) => void;
  setSelectedProject: (p: Project) => void;
  showDetails: { [key: string]: boolean };
  toggleProjectDetails: (key: string) => void;
  t: (key: string) => string;
}

export function ProjectCard({ p, i, setCursorColor, setSelectedProject, showDetails, toggleProjectDetails, t }: ProjectCardProps) {
  const getPreviewText = (index: number) => {
    const texts = ["Preview", "Quick look", "Sneak peek", "Teaser", "View"];
    return texts[index % texts.length];
  };

  const hexColor = p.labelColor === "bg-brand-green" ? "#58cc02" : 
                   p.labelColor === "bg-brand-yellow" ? "#ffc800" :
                   p.labelColor === "bg-brand-pink" ? "#ff4b4b" : "#ce82ff";

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.1}}
      onMouseEnter={() => setCursorColor(hexColor)}
      onMouseLeave={() => setCursorColor("#1cb0f6")}
      whileHover={{ 
        y: 0,
        scale: 1,
        rotate: i % 2 === 0 ? 1 : -1,
        boxShadow: `0 30px 60px ${hexColor}33`
      }}
      className={`duo-card ${p.color} flex flex-col bg-[var(--nav-bg)] backdrop-blur-sm overflow-hidden group relative cursor-pointer`}
      onClick={() => setSelectedProject(p)}
    >
      <div className="flex items-start justify-between mb-8">
        <motion.div 
          whileHover={{ rotate: 15, scale: 1.1 }}
          className="w-16 h-16 rounded-2xl bg-[var(--input-bg)] flex items-center justify-center group-hover:bg-[var(--input-bg)] transition-colors"
        >
          {p.icon}
        </motion.div>
        <span className={`${p.labelColor} text-brand-dark font-black px-3 py-1 rounded-lg text-[10px] uppercase tracking-widest shadow-[0_4px_0_0_rgba(0,0,0,0.2)]`}>
          {p.tag}
        </span>
      </div>
      <h3 className="text-3xl font-black mb-4">
        <ColoredText colorClass={p.labelColor.replace('bg-', 'text-')}>{p.title}</ColoredText>
      </h3>
      <p className="text-lg text-secondary mb-2 flex-grow">
        {p.desc}
      </p>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleProjectDetails(p.title);
        }}
        className="w-full mt-2 mb-4 py-2 px-3 text-xs text-tertiary hover:text-brand-yellow transition-colors border border-transparent hover:border-brand-yellow/30 rounded-lg bg-[var(--nav-bg)] hover:bg-[var(--hover-bg)]"
      >
        {showDetails[p.title] ? "▲ Hide" : `▼ ${getPreviewText(i)}`}
      </button>
      {showDetails[p.title] && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="mb-4 p-4 bg-[var(--input-bg)] rounded-xl border-2 border-brand-blue/30"
        >
          <p className="text-sm text-secondary mb-3">{p.longDesc.split('\n\n')[0]}</p>
          <p className="text-xs text-tertiary">
            {p.category === "CERTIFICATE" && "🏆 Achievement unlocked!"}
            {p.category === "IMMERSION" && "🌍 Living the language!"}
            {p.category === "CHALLENGE" && "🔥 Taking on the challenge!"}
            {p.category === "MAINTENANCE" && "💪 Keeping it fresh!"}
            {p.category === "ACHIEVEMENT" && "⭐ Another win!"}
            {p.category === "EVENT" && "🎉 Experience gained!"}
            {p.category === "JOURNEY" && "🛤️ On the path!"}
          </p>
        </motion.div>
      )}
      
      <button
        onClick={() => setSelectedProject(p)}
        className={`w-full py-3 px-4 rounded-xl border-2 border-transparent hover:border-brand-dark/20 transition-all font-bold text-sm shadow-[0_4px_0_0_var(--border-color)] hover:shadow-[0_2px_0_0_var(--border-color)] hover:translate-y-0.5 active:shadow-none active:translate-y-1 ${
          p.category === "CERTIFICATE" ? "bg-brand-green text-brand-dark" :
          p.category === "IMMERSION" ? "bg-brand-yellow text-brand-dark" :
          p.category === "CHALLENGE" ? "bg-brand-pink text-white" :
          p.category === "MAINTENANCE" ? "bg-brand-teal text-brand-dark" :
          p.category === "ACHIEVEMENT" ? "bg-brand-purple text-white" :
          p.category === "EVENT" ? "bg-brand-orange text-brand-dark" :
          "bg-brand-blue text-white"
        }`}
      >
        📖 {t("Read more")} →
      </button>
    </motion.div>
  );
}
