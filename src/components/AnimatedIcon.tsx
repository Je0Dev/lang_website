import { ReactNode } from "react";
import { motion } from "motion/react";

export function AnimatedIcon({ children, color, ...props }: { children: ReactNode; color: string; [key: string]: any }) {
  return (
    <motion.div
      {...props}
      whileHover={{ 
        scale: 1, 
        rotate: [0, -1, 1, 0]
      }}
      whileTap={{ scale: 0.95 }}
      className="cursor-pointer"
    >
      {children}
    </motion.div>
  );
}
