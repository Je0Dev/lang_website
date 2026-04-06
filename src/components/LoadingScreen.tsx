import { motion } from "motion/react";

export function LoadingScreen({ isVisible }: { isVisible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0, pointerEvents: isVisible ? "auto" : "none" }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[10000] bg-brand-dark flex flex-col items-center justify-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-20 h-20 border-4 border-brand-green border-t-transparent rounded-full mb-6 absolute"
      />

      <motion.div
        initial={{ y: 10 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 mb-6"
      >
        <img 
          src="https://i.gifer.com/XOsX.gif" 
          alt="Loading Character"
          className="w-32 h-32 object-contain"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      </motion.div>

      <h2 className="text-2xl font-black text-white tracking-widest relative z-10">
        LOADING<span className="text-brand-green animate-pulse"> ...</span>
      </h2>
    </motion.div>
  );
}
