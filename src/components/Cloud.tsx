import { motion } from "motion/react";

export function Cloud({ position, delay = 0 }: { position: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute ${position} opacity-20 pointer-events-none`}
      animate={{ x: [-20, 20, -20] }}
      transition={{ duration: 10, repeat: Infinity, delay }}
      style={{ willChange: "transform" }}
    >
      <div className="w-32 h-12 bg-white rounded-full relative">
        <div className="absolute -top-6 left-4 w-16 h-16 bg-white rounded-full" />
        <div className="absolute -top-4 right-4 w-12 h-12 bg-white rounded-full" />
      </div>
    </motion.div>
  );
}
