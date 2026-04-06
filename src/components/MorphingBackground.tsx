import { motion, useScroll, useTransform } from "motion/react";

export function MorphingBackground() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-10 overflow-hidden">
      <motion.div 
        className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] rounded-[100%] bg-gradient-to-b from-brand-blue to-transparent"
        style={{ y, scale, willChange: "transform" }}
      />
    </div>
  );
}
