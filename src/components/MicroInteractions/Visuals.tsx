import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flame } from "lucide-react";

export function Confetti({ show }: { show: boolean }) {
  if (!show) return null;

  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ["#58cc02", "#1cb0f6", "#ff4b4b", "#ffc800", "#ce82ff"][i % 5],
    delay: Math.random() * 0.3,
    rotation: Math.random() * 360,
  }));

  return (
    <AnimatePresence>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, y: -20, x: `${p.x}%`, rotate: 0 }}
          animate={{ opacity: 0, y: 100, rotate: p.rotation }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, delay: p.delay }}
          className="absolute w-2 h-2 rounded-full pointer-events-none"
          style={{ background: p.color }}
        />
      ))}
    </AnimatePresence>
  );
}

export function StreakFlame({ count }: { count: number }) {
  if (count < 7) return null;

  return (
    <motion.div
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ repeat: Infinity, duration: 0.8 }}
      className="inline-flex items-center gap-1 text-brand-orange"
    >
      <Flame className="w-4 h-4" />
      <span className="font-bold text-sm">{count}</span>
    </motion.div>
  );
}

export function ProgressFill({ progress, color = "#58cc02" }: { progress: number; color?: string }) {
  return (
    <div className="h-full bg-[var(--input-bg)] rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{ background: color }}
      />
    </div>
  );
}

export function PulseDot({ color = "#ff4b4b" }: { color?: string }) {
  return (
    <motion.span
      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
      transition={{ repeat: Infinity, duration: 1 }}
      className="w-2 h-2 rounded-full inline-block"
      style={{ background: color }}
    />
  );
}

export function FlipCard({ front, back, isFlipped }: { front: React.ReactNode; back: React.ReactNode; isFlipped: boolean }) {
  return (
    <div className="relative w-full h-64 perspective-1000">
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full preserve-3d"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute w-full h-full backface-hidden">{front}</div>
        <div 
          className="absolute w-full h-full backface-hidden rotate-y-180" 
          style={{ transform: "rotateY(180deg)" }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
}

export function Typewriter({ text, speed = 50 }: { text: string; speed?: number }) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplay(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return <span>{display}</span>;
}
