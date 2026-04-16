import React, { useState } from "react";
import { motion } from "motion/react";

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
