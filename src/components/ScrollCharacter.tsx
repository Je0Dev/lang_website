import { motion, useScroll, useTransform } from "motion/react";
import { Star } from "lucide-react";

const coldColors = ["#1cb0f6", "#58cc02", "#ce82ff"];
const warmColors = ["#ffc800", "#ff4b4b", "#dd0000"];

export function ScrollCharacter() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "90%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const colorIndex = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 2]);
  const backgroundColor = useTransform(
    colorIndex,
    [0, 1, 2],
    [
      coldColors[0],
      warmColors[Math.floor(coldColors.length / 2)],
      warmColors[coldColors.length - 1]
    ]
  );
  const borderColor = useTransform(
    colorIndex,
    [0, 1, 2],
    [
      coldColors[1],
      warmColors[0],
      warmColors[1]
    ]
  );
  const starColor = useTransform(
    colorIndex,
    [0, 1, 2],
    [
      coldColors[2],
      warmColors[0],
      warmColors[2]
    ]
  );

  return (
    <motion.div 
      className="fixed right-4 md:right-12 top-20 w-12 h-12 z-40 pointer-events-none hidden sm:flex items-center justify-center"
      style={{ y, rotate }}
    >
      <motion.div 
        className="w-full h-full rounded-full flex items-center justify-center shadow-[0_4px_0_0_#d4a017] border-2"
        style={{ backgroundColor, borderColor }}
      >
        <Star className="w-6 h-6" style={{ fill: starColor, color: starColor }} />
      </motion.div>
    </motion.div>
  );
}
