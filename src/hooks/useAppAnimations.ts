import { useScroll, useSpring, useTransform, MotionValue } from "motion/react";
import { RefObject } from "react";

export function useAppAnimations(containerRef: RefObject<HTMLDivElement | null>, isDarkMode: boolean) {
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  const backgroundColor = useTransform(
    smoothProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    isDarkMode 
      ? ["#0a0a0a", "#131f24", "#1a2a30", "#131f24", "#1a2a30", "#0a0a0a"]
      : ["#fdf5e6", "#ffffff", "#f0f0f0", "#ffffff", "#f0f0f0", "#fdf5e6"]
  );

  const tealOpacity = useTransform(smoothProgress, [0.1, 0.3, 0.5], [0, 0.1, 0]);
  const pinkOpacity = useTransform(smoothProgress, [0.4, 0.6, 0.8], [0, 0.1, 0]);
  const orangeOpacity = useTransform(smoothProgress, [0.7, 0.9, 1], [0, 0.1, 0]);
  const rotationAmount = useTransform(smoothProgress, [0, 0.5, 1], [0, 1, 0]);

  return {
    scrollYProgress,
    smoothProgress,
    backgroundColor,
    tealOpacity,
    pinkOpacity,
    orangeOpacity,
    rotationAmount
  };
}
