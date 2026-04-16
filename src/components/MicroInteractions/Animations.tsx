import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Zap, Heart } from "lucide-react";

interface HoverProps {
  children: React.ReactNode;
  className?: string;
}

export function Wiggle({ children, className = "" }: HoverProps) {
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

export function PopOnHover({ children, className = "" }: HoverProps) {
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

export function BounceOnHover({ children, className = "" }: HoverProps) {
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

export function ShakeOnHover({ children, className = "" }: HoverProps) {
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

export function SparkleOnHover({ children, className = "" }: HoverProps) {
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
