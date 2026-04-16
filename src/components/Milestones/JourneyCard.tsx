import React, { useState } from "react";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { JourneyItem } from "../../data/milestones.tsx";

interface JourneyCardProps {
  exp: JourneyItem;
  i: number;
  setCursorColor: (color: string) => void;
  setSelectedJourney: (item: JourneyItem | null) => void;
}

export function JourneyCard({ exp, i, setCursorColor, setSelectedJourney }: JourneyCardProps) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => setCursorColor(exp.hex)}
      onMouseLeave={() => setCursorColor("#1cb0f6")}
      whileHover={{ scale: 1.01 }}
      className="duo-card flex flex-col md:flex-row items-center gap-8 group hover:bg-[var(--input-bg)] transition-colors cursor-pointer"
      onClick={() => setSelectedJourney(exp)}
    >
      <div className={`w-20 h-20 rounded-2xl ${exp.color} flex items-center justify-center text-white shadow-[0_6px_0_0_rgba(0,0,0,0.3)] group-hover:scale-110 transition-transform`}>
        {exp.icon}
      </div>
      <div className="flex-1 text-center md:text-left">
        <h3 className={`text-2xl font-black ${exp.textColor}`}>{exp.title}</h3>
        <p className="text-secondary mt-1">{exp.company} • {exp.period}</p>
        <p className="text-sm text-tertiary mt-2">{exp.desc}</p>
        <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
          {exp.highlights.slice(0, 3).map((h, idx) => (
            <span key={idx} className="text-xs px-2 py-1 bg-[var(--input-bg)] rounded-lg text-tertiary">• {h}</span>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowPreview(!showPreview);
          }}
          className={`py-2 px-4 rounded-xl border-2 border-transparent hover:border-brand-dark/20 transition-all font-bold text-sm ${exp.color} text-white shadow-[0_4px_0_0_rgba(0,0,0,0.3)] hover:shadow-[0_2px_0_0_rgba(0,0,0,0.3)] hover:translate-y-0.5 active:shadow-none active:translate-y-1`}
        >
          {showPreview ? "▲ Hide" : "▼ Preview"}
        </button>
        {showPreview && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="mt-2 p-3 bg-[var(--input-bg)] rounded-xl border-2 border-brand-dark/20"
          >
            <p className="text-xs font-bold text-tertiary mb-2">Key Points:</p>
            <ul className="text-xs text-secondary space-y-1">
              {exp.highlights.map((h, idx) => (
                <li key={idx} className="flex items-start gap-1">
                  <span className={exp.textColor}>•</span> {h}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
      <ChevronRight className="w-8 h-8 text-tertiary group-hover:text-brand-blue transition-colors" />
    </motion.div>
  );
}
