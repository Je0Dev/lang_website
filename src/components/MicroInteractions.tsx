import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Zap, Heart, Star, Flame } from "lucide-react";

interface BouncyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  color?: "green" | "blue" | "pink" | "yellow" | "purple";
  className?: string;
}

const colorMap = {
  green: "hover:bg-brand-green hover:shadow-[0_4px_0_0_#58cc02] hover:translate-y-0.5",
  blue: "hover:bg-brand-blue hover:shadow-[0_4px_0_0_#1cb0f6] hover:translate-y-0.5",
  pink: "hover:bg-brand-pink hover:shadow-[0_4px_0_0_#ff4b4b] hover:translate-y-0.5",
  yellow: "hover:bg-brand-yellow hover:shadow-[0_4px_0_0_#ffc800] hover:translate-y-0.5",
  purple: "hover:bg-brand-purple hover:shadow-[0_4px_0_0_#ce82ff] hover:translate-y-0.5",
};

export function BouncyButton({ children, onClick, color = "green", className = "" }: BouncyButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      whileHover={{ y: -2 }}
      className={`duo-button duo-button-${color} ${colorMap[color]} ${className} touch-none`}
    >
      {children}
    </motion.button>
  );
}

interface WiggleProps {
  children: React.ReactNode;
  className?: string;
}

export function Wiggle({ children, className = "" }: WiggleProps) {
  return (
    <motion.div
      whileHover={{ rotate: [0, -3, 3, -3, 3, 0] }}
      transition={{ duration: 0.4 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface PopOnHoverProps {
  children: React.ReactNode;
  className?: string;
}

export function PopOnHover({ children, className = "" }: PopOnHoverProps) {
  return (
    <motion.div
      whileHover={{ scale: [1, 1.1, 1.05, 1] }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ConfettiProps {
  show: boolean;
}

export function Confetti({ show }: ConfettiProps) {
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

interface StreakFlameProps {
  count: number;
}

export function StreakFlame({ count }: StreakFlameProps) {
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

interface ProgressFillProps {
  progress: number;
  color?: string;
}

export function ProgressFill({ progress, color = "#58cc02" }: ProgressFillProps) {
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

interface BounceOnHoverProps {
  children: React.ReactNode;
  className?: string;
}

export function BounceOnHover({ children, className = "" }: BounceOnHoverProps) {
  return (
    <motion.div
      whileHover={{ y: [0, -8, -4, -8, 0] }}
      transition={{ duration: 0.4 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface WiggleProps {
  children: React.ReactNode;
  className?: string;
}

export function ShakeOnHover({ children, className = "" }: WiggleProps) {
  return (
    <motion.div
      whileHover={{ x: [-2, 2, -2, 2, 0] }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
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

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  isFlipped: boolean;
}

export function FlipCard({ front, back, isFlipped }: FlipCardProps) {
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

interface TypewriterProps {
  text: string;
  speed?: number;
}

export function Typewriter({ text, speed = 50 }: TypewriterProps) {
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

export function SparkleOnHover({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [show, setShow] = useState(false);

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <>
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-1 -right-1 text-yellow-400"
            >
              <Sparkles className="w-3 h-3" />
            </motion.span>
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="absolute -bottom-1 -left-1 text-pink-400"
            >
              <Heart className="w-3 h-3" />
            </motion.span>
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute top-1 left-1 text-brand-green"
            >
              <Zap className="w-3 h-3" />
            </motion.span>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}