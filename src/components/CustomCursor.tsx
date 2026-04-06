import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useContext } from "react";
import { ThemeContext } from "../context";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const { cursorColor: defaultColor, setCursorColor: setGlobalCursorColor } = useContext(ThemeContext);
  const [activeColor, setActiveColor] = useState(defaultColor);

  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, .cursor-pointer, .duo-button, .duo-social-btn');
      setIsHovering(!!isInteractive);

      const computedColor = window.getComputedStyle(target).color;
      
      if (isInteractive || target.classList.contains('text-brand-blue') || target.classList.contains('text-brand-green')) {
        setActiveColor(computedColor);
      } else {
        setActiveColor(defaultColor);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, defaultColor]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999] flex items-center justify-center"
      style={{ x: cursorXSpring, y: cursorYSpring, width: 40, height: 40 }}
      animate={{ 
        scale: isHovering ? 1.3 : 1,
        rotate: isHovering ? 12 : 0
      }}
    >
      <PngCursorIcon color={activeColor} isHovering={isHovering} />
    </motion.div>
  );
}

function PngCursorIcon({ color, isHovering }: { color: string, isHovering: boolean }) {
  return (
    <div className="relative">
      <motion.div 
        animate={{ 
          scale: isHovering ? 1.8 : 1,
          opacity: isHovering ? 0.5 : 0.2 
        }}
        className="absolute inset-0 blur-xl rounded-full"
        style={{ backgroundColor: color }}
      />
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 24 24" 
        fill={color}
        className="relative z-10 drop-shadow-lg"
        style={{ transform: 'translate(-4px, -4px)' }}
      >
        <path 
          d="M5.65 2.65l12.7 12.7a1 1 0 0 1-.16 1.51l-4.36 1.17a1 1 0 0 1-1.51-.16L2.65 8.35a1 1 0 0 1 1.51-1.51l1.49 1.49V2.65a1 1 0 0 1 .65-.98l.36.02z" 
          fill={color}
          stroke="#000"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
