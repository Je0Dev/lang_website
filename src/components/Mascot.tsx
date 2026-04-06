import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useContext } from "react";
import { ThemeContext } from "../context";
import { useMousePosition } from "./useMousePosition";

export function Mascot({ color, position, delay = 0, type = "apple" }: { color: string; position: string; delay?: number; type?: "apple" | "star" | "bird" }) {
  const mousePos = useMousePosition();
  const [isBlinking, setIsBlinking] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState(0);
  const { setCursorColor } = useContext(ThemeContext);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const angle = Math.atan2(mousePos.y - centerY, mousePos.x - centerX) * (180 / Math.PI);
      setRotate(angle / 15);
    }
  }, [mousePos]);

  const colorMap: { [key: string]: string } = {
    "bg-brand-green": "#58cc02",
    "bg-brand-blue": "#1cb0f6",
    "bg-brand-yellow": "#ffc800",
    "bg-brand-pink": "#ff4b4b",
    "bg-brand-purple": "#ce82ff",
    "bg-brand-orange": "#ff9600",
    "bg-brand-teal": "#00ffc8",
  };

  const hexColor = colorMap[color] || "#1cb0f6";

  return (
    <motion.div 
      ref={ref}
      onMouseEnter={() => setCursorColor(hexColor)}
      onMouseLeave={() => setCursorColor("#1cb0f6")}
      whileHover={{ 
        scale: [1, 1, 1, 1, 1],
        rotate: [rotate, rotate - 5, rotate + 5, rotate],
        y: -30,
        transition: { duration: 0.5 }
      }}
      className={`absolute ${position} w-24 h-24 z-20 hidden md:block cursor-pointer`}
      animate={{ 
        y: [0, -15, 0],
        rotate: [rotate, rotate + 5, rotate - 5, rotate],
        scale: [1, 1, 1, 1]
      }}
      transition={{ 
        duration: 1, 
        repeat: Infinity, 
        delay,
        ease: "easeInOut"
      }}
      style={{ willChange: "transform" }}
    >
      {type === "apple" ? (
        <div className={`relative w-full h-full ${color} rounded-full shadow-[0_8px_0_0_rgba(0,0,0,0.3)] border-4 border-brand-dark flex items-center justify-center`}>
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-3 h-8 bg-brand-green rounded-full" />
          <div className="flex gap-3">
            <motion.div 
              animate={{ scaleY: isBlinking ? 0.1 : 1 }}
              className="w-3 h-3 bg-brand-dark rounded-full" 
            />
            <motion.div 
              animate={{ scaleY: isBlinking ? 0.1 : 1 }}
              className="w-3 h-3 bg-brand-dark rounded-full" 
            />
          </div>
        </div>
      ) : type === "star" ? (
        <div className={`relative w-full h-full ${color} rounded-2xl rotate-45 shadow-[0_8px_0_0_rgba(0,0,0,0.3)] border-4 border-brand-dark flex items-center justify-center`}>
          <div className="-rotate-45 flex flex-col items-center gap-1">
            <div className="flex gap-2">
              <motion.div animate={{ scaleY: isBlinking ? 0.1 : 1 }} className="w-2 h-2 bg-brand-dark rounded-full" />
              <motion.div animate={{ scaleY: isBlinking ? 0.1 : 1 }} className="w-2 h-2 bg-brand-dark rounded-full" />
            </div>
            <div className="w-4 h-1 bg-brand-dark rounded-full" />
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div 
            animate={{ 
              scale: [1, 1, 1],
              rotate: [-1, 1, -1]
            }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className={`w-16 h-10 ${color} rounded-full relative shadow-[0_6px_0_0_rgba(0,0,0,0.2)] border-2 border-brand-dark`}
          >
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-inherit border-2 border-brand-dark rounded-full rotate-45" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
              <motion.div animate={{ scaleY: isBlinking ? 0.1 : 1 }} className="w-2 h-2 bg-brand-dark rounded-full" />
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
